import { Languages, Menu, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '@/stores/uiStore';
import { ROUTE_PATHS } from '@/app/router/routes';
import { getLocaleFromPathname, getOtherLocale, UI_COPY } from '@/lib/i18n';
import { useLocaleStore } from '@/stores/localeStore';

export function TopBar() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);
  const location = useLocation();
  const navigate = useNavigate();
  const copy = UI_COPY[locale];

  const switchLanguage = () => {
    const nextLocale = getOtherLocale(locale);
    if (getLocaleFromPathname(location.pathname)) {
      const localizedPath = location.pathname.replace(/^\/(en|ru)(?=\/|$)/, `/${nextLocale}`);
      navigate(`${localizedPath}${location.search}${location.hash}`, { replace: true });
      return;
    }
    setLocale(nextLocale);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b border-neutral-200 bg-white/95 px-3 backdrop-blur sm:gap-3 sm:px-4 lg:px-6">
      <button className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden" onClick={toggleSidebar} aria-label={copy.navigation.openMenu}>
        <Menu className="h-5 w-5" />
      </button>
      <button
        className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-neutral-500 hover:bg-neutral-100 sm:px-3"
        onClick={() => navigate(ROUTE_PATHS.SEARCH)}
        aria-label={copy.search.buttonLabel}
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="truncate">{copy.search.placeholder}</span>
      </button>
      <button
        type="button"
        onClick={switchLanguage}
        className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 text-xs font-semibold text-neutral-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 sm:gap-2 sm:px-3 sm:text-sm"
        aria-label={copy.language.buttonLabel}
        title={copy.language.buttonLabel}
      >
        <Languages className="h-4 w-4" aria-hidden="true" /><span>{copy.language.shortLabel}</span>
      </button>
    </header>
  );
}
