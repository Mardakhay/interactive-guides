import { create } from 'zustand';
import { useLocation } from 'react-router-dom';
import type { Locale } from './translations';

const STORAGE_KEY = 'interactive-guides.ui-locale';

function readInitialLocale(): Locale {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'ru' ? 'ru' : 'en';
  } catch {
    return 'en';
  }
}

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: readInitialLocale(),
  setLocale: (locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Keep the language switch usable even when storage is unavailable.
    }
    set({ locale });
  },
}));

/** Every application route carries a locale; the saved preference is the fallback for legacy URLs. */
export function useUiLocale(): Locale {
  const { pathname } = useLocation();
  const preferredLocale = useLocaleStore((state) => state.locale);
  const match = /^\/(en|ru)(?:\/|$)/.exec(pathname);
  return match?.[1] === 'ru' ? 'ru' : match?.[1] === 'en' ? 'en' : preferredLocale;
}
