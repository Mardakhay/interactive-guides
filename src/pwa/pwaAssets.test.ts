import { readFileSync } from 'node:fs';
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
  icons: ManifestIcon[];
};

const publicUrl = (path: string) => new URL(`../../public/${path}`, import.meta.url);
const readPublicText = (path: string) => readFileSync(publicUrl(path), 'utf8');
const manifest = JSON.parse(readPublicText('manifest.webmanifest')) as WebManifest;

describe('PWA asset contract', () => {
  it('declares installable metadata and real PNG assets at required sizes', () => {
    expect(manifest.start_url).toBe('/');
    expect(manifest.scope).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons.some((icon) => icon.sizes === '192x192' && icon.purpose === 'any')).toBe(true);
    expect(manifest.icons.some((icon) => icon.sizes === '512x512' && icon.purpose?.includes('maskable'))).toBe(true);

    for (const icon of manifest.icons) {
      expect(icon.type).toBe('image/png');
      const bytes = readFileSync(publicUrl(icon.src.replace(/^\//, '')));
      expect(bytes.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
      const width = bytes.readUInt32BE(16);
      const height = bytes.readUInt32BE(20);
      const [expectedWidth, expectedHeight] = icon.sizes.split('x').map(Number);
      expect([width, height]).toEqual([expectedWidth, expectedHeight]);
    }
  });

  it('wires the iOS touch icon and host-side SPA fallback', () => {
    expect(readPublicText('pwa-180.png')).toBeDefined();
    expect(readPublicText('../index.html')).toContain('rel="apple-touch-icon" href="/pwa-180.png"');
    expect(readPublicText('_redirects').trim()).toBe('/* /index.html 200');
  });

  it('keeps service-worker caches versioned and scoped away from private APIs', () => {
    const worker = readPublicText('sw.js');
    expect(worker).toContain("const VERSION = 'v2';");
    for (const path of ['/pwa-180.png', '/pwa-192.png', '/pwa-512.png']) {
      expect(worker).toContain(path);
    }
    expect(worker).toContain("request.method !== 'GET' || url.origin !== self.location.origin");
    expect(worker).toContain("request.headers.has('authorization') || url.pathname.startsWith('/api/')");
    expect(worker).toContain("test(url.pathname)");
  });
});
