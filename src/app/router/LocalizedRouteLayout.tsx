import { useEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLocaleStore } from '@/features/localization/localeStore';
import { localizedPath } from './routes';

function isSupportedLocale(value: string | undefined): value is 'en' | 'ru' {
  return value === 'en' || value === 'ru';
}

/** Redirects pre-locale URLs to the saved language while preserving query and hash. */
export function LegacyPathRedirect() {
  const location = useLocation();
  const locale = useLocaleStore((state) => state.locale);

  return (
    <Navigate
      to={{
        pathname: localizedPath(location.pathname, locale),
        search: location.search,
        hash: location.hash,
      }}
      replace
    />
  );
}

/** The locale segment is authoritative for a shareable app route. */
export function LocalizedAppLayout() {
  const { locale: routeLocale } = useParams<{ locale: string }>();
  const location = useLocation();
  const preferredLocale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  useEffect(() => {
    if (isSupportedLocale(routeLocale) && routeLocale !== preferredLocale) {
      setLocale(routeLocale);
    }
  }, [preferredLocale, routeLocale, setLocale]);

  if (!isSupportedLocale(routeLocale)) {
    return (
      <Navigate
        to={{
          pathname: localizedPath(location.pathname, preferredLocale),
          search: location.search,
          hash: location.hash,
        }}
        replace
      />
    );
  }

  return <AppLayout />;
}
