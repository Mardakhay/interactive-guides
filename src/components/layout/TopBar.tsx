import { Search, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '@/stores/uiStore';
import { ROUTE_PATHS } from '@/app/router/routes';
import { translate, useLocaleStore, useUiLocale } from '@/features/localization';

export function TopBar() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const locale = useUiLocale();
  const setLocale = useLocaleStore((state) => state.setLocale);
  const navigate = useNavigate();
  const location = useLocation();

  function switchLanguage() {
    const nextLocale = locale === 'en' ? 'ru' : 'en';
    setLocale(nextLocale);
    const structuredRoute = /^\/(en|ru)(\/structured-lessons(?:\/.*)?)$/.exec(location.pathname);
    if (structuredRoute) navigate(`/${nextLocale}${structuredRoute[2]}`);
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-neutral-200 bg-white/95 px-4 backdrop-blur lg:px-6">
      <button
        className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
        onClick={toggleSidebar}
        aria-label={translate(locale, 'openMenu')}
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100"
        onClick={() => navigate(ROUTE_PATHS.SEARCH)}
        aria-label={translate(locale, 'search')}
      >
        <Search className="h-4 w-4" />
        <span>{translate(locale, 'searchPlaceholder')}</span>
      </button>
      <button
        type="button"
        onClick={switchLanguage}
        className="shrink-0 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
        aria-label={translate(locale, locale === 'en' ? 'switchToRussian' : 'switchToEnglish')}
        title={translate(locale, locale === 'en' ? 'switchToRussian' : 'switchToEnglish')}
      >
        {locale === 'en' ? 'RU' : 'EN'}
      </button>
    </header>
  );
}
