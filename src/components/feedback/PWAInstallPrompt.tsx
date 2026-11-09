import { useEffect, useRef, useState } from 'react';
import { Download, RefreshCw, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface InstallChoice {
  outcome: 'accepted' | 'dismissed';
  platform: string;
}

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallChoice>;
}

export function PWAInstallPrompt() {
  const { pathname } = useLocation();
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const reloadOnControllerChange = useRef(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
      setDismissed(false);
    };
    const handleAppInstalled = () => setInstallEvent(null);
    const handleControllerChange = () => {
      if (reloadOnControllerChange.current) window.location.reload();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    }

    let active = true;
    let observedRegistration: ServiceWorkerRegistration | null = null;
    let handleUpdateFound: (() => void) | null = null;

    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.getRegistration().then((foundRegistration) => {
        if (!active || !foundRegistration) return;
        observedRegistration = foundRegistration;
        setRegistration(foundRegistration);
        if (foundRegistration.waiting && navigator.serviceWorker.controller) {
          setUpdateAvailable(true);
        }

        handleUpdateFound = () => {
          const installing = foundRegistration.installing;
          if (!installing) return;
          const handleStateChange = () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          };
          installing.addEventListener('statechange', handleStateChange);
        };
        foundRegistration.addEventListener('updatefound', handleUpdateFound);
      }).catch(() => {
        // PWA enhancements are optional; the rest of the app remains usable.
      });
    }

    return () => {
      active = false;
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      }
      if (observedRegistration && handleUpdateFound) {
        observedRegistration.removeEventListener('updatefound', handleUpdateFound);
      }
    };
  }, []);

  const isRussian = pathname.startsWith('/ru/');
  if (dismissed || (!installEvent && !updateAvailable)) return null;

  const install = async () => {
    if (!installEvent) return;
    try {
      await installEvent.prompt();
      await installEvent.userChoice;
    } catch {
      // The browser owns the install dialog and may reject a dismissed prompt.
    } finally {
      setInstallEvent(null);
    }
  };

  const applyUpdate = () => {
    if (!registration?.waiting) {
      setUpdateAvailable(false);
      return;
    }
    reloadOnControllerChange.current = true;
    registration.waiting.postMessage({ type: 'ACTIVATE_UPDATE' });
  };

  return (
    <section
      aria-label={isRussian ? 'Установка и обновление приложения' : 'App installation and update'}
      className="flex flex-col gap-3 border-b border-primary-200 bg-primary-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-primary-950">
          {updateAvailable
            ? (isRussian ? 'Доступна новая версия' : 'An app update is available')
            : (isRussian ? 'Установи Interactive Guides' : 'Install Interactive Guides')}
        </p>
        <p className="mt-0.5 text-sm leading-5 text-primary-900">
          {updateAvailable
            ? (isRussian ? 'Обнови оболочку приложения. Твои локальные черновики уже сохранены.' : 'Update the app shell. Your local exercise drafts are saved.')
            : (isRussian ? 'Добавь учебную платформу на главный экран для отдельного окна приложения.' : 'Add the learning platform to your home screen for an app-like window.')}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {updateAvailable ? (
          <button
            type="button"
            onClick={applyUpdate}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
          >
            <RefreshCw className="h-4 w-4" />
            {isRussian ? 'Обновить' : 'Update'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void install()}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
          >
            <Download className="h-4 w-4" />
            {isRussian ? 'Установить' : 'Install'}
          </button>
        )}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={isRussian ? 'Скрыть уведомление' : 'Dismiss notification'}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-800 transition hover:bg-primary-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
