import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const manifest = JSON.parse(
  readFileSync(new URL('../../public/manifest.webmanifest', import.meta.url), 'utf8'),
) as {
  name: string;
  start_url: string;
  scope: string;
  display: string;
  icons: Array<{ src: string; sizes: string; type: string; purpose: string }>;
};

const serviceWorker = readFileSync(new URL('../../public/sw.js', import.meta.url), 'utf8');

describe('PWA static contract', () => {
  it('declares a standalone app manifest with scalable icons', () => {
    expect(manifest.name).toBe('Interactive Guides');
    expect(manifest.start_url).toBe('/');
    expect(manifest.scope).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons.some((icon) => icon.src === '/icons/icon-192.svg' && icon.sizes === 'any')).toBe(true);
    expect(manifest.icons.some((icon) => icon.src === '/icons/icon-512.svg' && icon.purpose === 'maskable')).toBe(true);
  });

  it('provides an offline SPA fallback and caches public lesson documents', () => {
    expect(serviceWorker).toContain("request.mode === 'navigate'");
    expect(serviceWorker).toContain("networkFirst(request, '/index.html')");
    expect(serviceWorker).toContain("url.pathname.startsWith('/lessons/')");
    expect(serviceWorker).toContain("self.clients.claim()");
  });

  it('does not intercept private or dynamic API routes for caching', () => {
    expect(serviceWorker).toContain("'/api/'");
    expect(serviceWorker).toContain("'/auth/v1/'");
    expect(serviceWorker).toContain("'/rest/v1/'");
    expect(serviceWorker).toContain("'/functions/v1/'");
    expect(serviceWorker).toContain("'/storage/v1/'");
    expect(serviceWorker).toContain("'/realtime/v1/'");
  });
});
