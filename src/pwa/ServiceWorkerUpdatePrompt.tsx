import { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { translate, useUiLocale } from '@/features/localization';

export function ServiceWorkerUpdatePrompt() {
  const locale = useUiLocale();
  const [updateReady, setUpdateReady] = useState(false);
  const waitingWorkerRef = useRef<ServiceWorker | null>(null);
  const reloadAfterUpdateRef = useRef(false);

  useEffect(() => {
    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

    let active = true;
    let registration: ServiceWorkerRegistration | undefined;
    let installingWorker: ServiceWorker | null = null;
    let onInstallingStateChange: (() => void) | null = null;

    const checkWaitingWorker = () => {
      if (!active || !registration?.waiting || !navigator.serviceWorker.controller) return;
      waitingWorkerRef.current = registration.waiting;
      setUpdateReady(true);
    };

    const onUpdateFound = () => {
      if (installingWorker && onInstallingStateChange) {
        installingWorker.removeEventListener('statechange', onInstallingStateChange);
      }
      installingWorker = registration?.installing ?? null;
      if (!installingWorker) return;

      onInstallingStateChange = () => {
        if (installingWorker?.state === 'installed') checkWaitingWorker();
        if (installingWorker && ['activated', 'redundant'].includes(installingWorker.state)) {
          installingWorker.removeEventListener('statechange', onInstallingStateChange!);
          onInstallingStateChange = null;
        }
      };
      installingWorker.addEventListener('statechange', onInstallingStateChange);
    };

    const onControllerChange = () => {
      if (!reloadAfterUpdateRef.current) return;
      reloadAfterUpdateRef.current = false;
      window.location.reload();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && registration) {
        checkWaitingWorker();
        void registration.update().catch(() => {
          // Background update checks are best-effort and must not interrupt learning.
        });
      }
    };

    const registerWorker = () => {
      void navigator.serviceWorker.register('/sw.js')
        .then((nextRegistration) => {
          if (!active) return;
          registration = nextRegistration;
          registration.addEventListener('updatefound', onUpdateFound);
          checkWaitingWorker();
          onUpdateFound();
        })
        .catch((error: unknown) => {
          // Offline support is progressive enhancement; registration errors are non-fatal.
          console.error('Service worker registration failed', error);
        });
    };

    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (document.readyState === 'complete') {
      registerWorker();
    } else {
      window.addEventListener('load', registerWorker, { once: true });
    }

    return () => {
      active = false;
      window.removeEventListener('load', registerWorker);
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      registration?.removeEventListener('updatefound', onUpdateFound);
      if (installingWorker && onInstallingStateChange) {
        installingWorker.removeEventListener('statechange', onInstallingStateChange);
      }
    };
  }, []);

  function applyUpdate() {
    const waitingWorker = waitingWorkerRef.current;
    if (!waitingWorker) return;
    reloadAfterUpdateRef.current = true;
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  }

  function deferUpdate() {
    // Leave the new worker waiting. It will be offered again when the learner
    // returns to the app or reloads into a page that checks registration.waiting.
    setUpdateReady(false);
  }

  if (!updateReady) return null;

  return (
    <aside
      role="status"
      aria-labelledby="service-worker-update-title"
      className="fixed inset-x-4 bottom-20 z-50 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-96"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="service-worker-update-title" className="text-sm font-semibold text-neutral-900">
            {translate(locale, 'updateAvailable')}
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            {translate(locale, 'updatePromptMessage')}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={applyUpdate}
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
            >
              {translate(locale, 'updateNow')}
            </button>
            <button
              type="button"
              onClick={deferUpdate}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
            >
              {translate(locale, 'updateLater')}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
