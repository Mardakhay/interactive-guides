/**
 * Register the service worker only for production builds.
 * Vite's development server should stay un-controlled while debugging.
 */
export function registerServiceWorker(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  window.addEventListener(
    'load',
    () => {
      void navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error: unknown) => {
        console.warn('Interactive Guides could not register its service worker.', error);
      });
    },
    { once: true },
  );
}
