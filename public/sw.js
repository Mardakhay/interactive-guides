/* global self, caches, URL, fetch, Response */
/* App-shell offline fallback; never cache cross-origin or private API responses. */
const CACHE_PREFIX = 'interactive-guides';
const VERSION = 'v2';
const SHELL_CACHE = `${CACHE_PREFIX}-shell-${VERSION}`;
const ASSET_CACHE = `${CACHE_PREFIX}-assets-${VERSION}`;
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest', '/favicon.svg', '/pwa-icon.svg', '/pwa-180.png', '/pwa-192.png', '/pwa-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith(CACHE_PREFIX) && key !== SHELL_CACHE && key !== ASSET_CACHE)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.headers.has('authorization') || url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(SHELL_CACHE).then((cache) => cache.put('/index.html', copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match('/index.html')) || Response.error()),
    );
    return;
  }

  // Restrict runtime caching to static build assets. Do not intercept arbitrary
  // same-origin document/data requests that may contain private learner state.
  if (!/\.(?:js|css|svg|png|jpe?g|webp|ico|woff2?|ttf|otf|json)$/i.test(url.pathname)) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          void caches.open(ASSET_CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }),
  );
});
