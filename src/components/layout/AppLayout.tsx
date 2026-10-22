import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Spinner } from '@/components/ui';
import { useRouteFocus } from '@/hooks/useRouteFocus';
import { NetworkStatusBanner } from '@/components/feedback/NetworkStatusBanner';
import { StorageWarningBanner } from '@/components/feedback/StorageWarningBanner';
import { PWAInstallPrompt } from '@/components/feedback/PWAInstallPrompt';
import { getLocaleFromPathname } from '@/lib/i18n';
import { useLocaleStore } from '@/stores/localeStore';

export function AppLayout() {
  useRouteFocus();
  const location = useLocation();
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  useEffect(() => {
    const routeLocale = getLocaleFromPathname(location.pathname);
    if (routeLocale && routeLocale !== locale) setLocale(routeLocale);
    document.documentElement.lang = routeLocale ?? locale;
  }, [location.pathname, locale, setLocale]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <a href="#main-content" className="skip-link">{locale === 'ru' ? 'Перейти к содержимому' : 'Skip to content'}</a>
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar />
        <NetworkStatusBanner />
        <StorageWarningBanner />
        <PWAInstallPrompt />
        <main id="main-content" className="min-h-[calc(100vh-4rem)] p-4 pb-20 lg:p-6 lg:pb-6">
          <div className="mx-auto max-w-6xl">
            <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-8" /></div>}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
