/* Interactive Guides service worker.
 * Cache only the app shell, versioned build assets and public lesson files.
 * Requests to APIs/auth/storage are deliberately never cached.
 */
const CACHE_PREFIX = 'interactive-guides-';
const SHELL_CACHE = `${CACHE_PREFIX}shell-v1`;
const RUNTIME_CACHE = `${CACHE_PREFIX}runtime-v1`;
const SHELL_URLS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.webmanifest',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
];

function isPrivateOrDynamicApi(pathname) {
  return [
    '/api/',
    '/auth/v1/',
    '/rest/v1/',
    '/functions/v1/',
    '/storage/v1/',
    '/realtime/v1/',
  ].some((prefix) => pathname.startsWith(prefix));
}

async function cacheIfPublic(cache, request, response) {
  if (!response || !response.ok || response.type !== 'basic') return response;
  try {
    await cache.put(request, response.clone());
  } catch {
    // Quota or storage failures should not fail the underlying request.
  }
  return response;
}

async function networkFirst(request, fallbackRequest) {
  try {
    const response = await fetch(request);
    if (response.ok && response.type === 'basic') {
      const cache = await caches.open(RUNTIME_CACHE);
      await cacheIfPublic(cache, request, response);
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (fallbackRequest) {
      const fallback = await caches.match(fallbackRequest);
      if (fallback) return fallback;
    }
    return Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const networkUpdate = fetch(request)
    .then((response) => cacheIfPublic(cache, request, response))
    .catch(() => null);
  return cached || (await networkUpdate) || Response.error();
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    return await cacheIfPublic(cache, request, response);
  } catch {
    return Response.error();
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await Promise.all(SHELL_URLS.map(async (url) => {
      try {
        const response = await fetch(url, { cache: 'reload' });
        if (response.ok && response.type === 'basic') {
          await cache.put(url, response);
        }
      } catch {
        // Continue install if one optional shell asset is not available.
      }
    }));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter((name) => name.startsWith(CACHE_PREFIX) && name !== SHELL_CACHE && name !== RUNTIME_CACHE)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ACTIVATE_UPDATE') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isPrivateOrDynamicApi(url.pathname)) return;

  if (request.mode === 'navigate') {
    // Legacy lessons are public HTML documents inside sandboxed iframes.
    // Cache those documents by URL, not as the SPA's index.html fallback.
    if (url.pathname.startsWith('/lessons/')) {
      event.respondWith(networkFirst(request));
      return;
    }

    event.respondWith(networkFirst(request, '/index.html'));
    return;
  }

  // Vite production assets use content-hashed filenames and can be cached
  // until a new build produces different URLs.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // These are public, versioned learning resources—not authenticated data.
  if (
    url.pathname.startsWith('/lessons/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/favicon.svg' ||
    url.pathname === '/manifest.webmanifest'
  ) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
