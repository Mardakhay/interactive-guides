import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

type ManifestIcon = {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
};

type WebManifest = {
  start_url: string;
  scope: string;
  display: string;
  theme_color: string;
  icons: ManifestIcon[];
};

const publicPath = (path: string) => resolve(process.cwd(), 'public', path);
const readPublicText = (path: string) => readFileSync(publicPath(path), 'utf8');
const readRootText = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const manifest = JSON.parse(readPublicText('manifest.webmanifest')) as WebManifest;
const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
const canonicalIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="7" fill="#0284c7"/>
  <path d="M8 10.5C8 9.67 8.67 9 9.5 9H16V23H9.5C8.67 23 8 22.33 8 21.5V10.5Z" fill="white" fill-opacity="0.95"/>
  <path d="M16 9H22.5C23.33 9 24 9.67 24 10.5V21.5C24 22.33 23.33 23 22.5 23H16V9Z" fill="white" fill-opacity="0.8"/>
  <path d="M12 13.5L14 15.5L12 17.5" stroke="#0284c7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

function expectPngSize(path: string, expected: number) {
  const bytes = readFileSync(publicPath(path));
  expect([...bytes.subarray(0, 8)]).toEqual(pngSignature);
  expect(bytes[24]).toBe(8);
  expect(bytes[25]).toBe(6); // RGBA preserves clean, antialiased SVG edges.
  expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([expected, expected]);
}

describe('PWA asset contract', () => {
  it('declares installable metadata and the canonical SVG with compatible PNG sizes', () => {
    expect(manifest.start_url).toBe('/');
    expect(manifest.scope).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.theme_color).toBe('#0284c7');
    expect(manifest.icons).toContainEqual({
      src: '/pwa-icon.svg',
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any',
    });
    expect(manifest.icons.some((icon) => icon.sizes === '192x192' && icon.purpose === 'any')).toBe(true);
    expect(manifest.icons.some((icon) => icon.sizes === '512x512' && icon.purpose?.includes('maskable'))).toBe(true);

    for (const icon of manifest.icons) {
      if (icon.type === 'image/svg+xml') {
        expect(icon.src).toBe('/pwa-icon.svg');
        expect(icon.sizes).toBe('any');
        expect(readPublicText(icon.src.replace(/^\//, ''))).toBe(canonicalIcon);
        continue;
      }
      expect(icon.type).toBe('image/png');
      const iconPath = icon.src.replace(/^\//, '');
      const bytes = readFileSync(publicPath(iconPath));
      expect([...bytes.subarray(0, 8)]).toEqual(pngSignature);
      const [expectedWidth, expectedHeight] = icon.sizes.split('x').map(Number);
      expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([expectedWidth, expectedHeight]);
    }
    expectPngSize('pwa-180.png', 180);
  });

  it('uses the exact same SVG for browser and PWA, with matching iOS/theme wiring', () => {
    const html = readRootText('index.html');
    expect(html).toContain('rel="icon" type="image/svg+xml" href="/favicon.svg"');
    expect(html).toContain('rel="apple-touch-icon" href="/pwa-180.png"');
    expect(html).toContain('name="theme-color" content="#0284c7"');
    expect(readPublicText('favicon.svg')).toBe(canonicalIcon);
    expect(readPublicText('pwa-icon.svg')).toBe(canonicalIcon);
    expect(readPublicText('_redirects').trim()).toBe('/* /index.html 200');
  });

  it('keeps service-worker caches versioned and scoped away from private APIs', () => {
    const worker = readPublicText('sw.js');
    expect(worker).toContain("const VERSION = 'v6';");
    for (const path of ['/favicon.svg', '/pwa-icon.svg', '/pwa-180.png', '/pwa-192.png', '/pwa-512.png']) {
      expect(worker).toContain(path);
    }
    expect(worker).toContain("request.method !== 'GET' || url.origin !== self.location.origin");
    expect(worker).toContain("request.headers.has('authorization') || url.pathname.startsWith('/api/')");
    const assetScopeGuard = worker.indexOf("if (!url.pathname.startsWith('/assets/')) return;");
    const extensionGuard = worker.indexOf('test(url.pathname)');
    expect(assetScopeGuard).toBeGreaterThan(-1);
    expect(extensionGuard).toBeGreaterThan(assetScopeGuard);
    expect(worker).toContain("event.data?.type === 'SKIP_WAITING'");
    expect(worker).not.toContain(".then(() => self.skipWaiting())");
    const updatePrompt = readRootText('src/pwa/ServiceWorkerUpdatePrompt.tsx');
    expect(updatePrompt).toContain("postMessage({ type: 'SKIP_WAITING' })");
    expect(updatePrompt).toContain("window.location.reload()");
  });
});
