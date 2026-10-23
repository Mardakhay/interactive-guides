import { Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Spinner } from '@/components/ui';
import { useRouteFocus } from '@/hooks/useRouteFocus';
import { translate, useUiLocale } from '@/features/localization';
import { ServiceWorkerUpdatePrompt } from '@/pwa/ServiceWorkerUpdatePrompt';

export function AppLayout() {
  const locale = useUiLocale();
  useRouteFocus();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <a href="#main-content" className="skip-link">{translate(locale, 'skipToContent')}</a>
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar />
        <main id="main-content" className="min-h-[calc(100vh-4rem)] p-4 pb-20 lg:p-6 lg:pb-6">
          <div className="mx-auto max-w-6xl">
            <Suspense
              fallback={
                <div className="flex min-h-[50vh] items-center justify-center">
                  <Spinner className="h-8" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
      <MobileNav />
      <ServiceWorkerUpdatePrompt />
    </div>
  );
}
