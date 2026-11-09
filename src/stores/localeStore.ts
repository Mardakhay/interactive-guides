import { create } from 'zustand';
import { isAppLocale, LOCALE_STORAGE_KEY, type AppLocale } from '@/lib/i18n';

function getInitialLocale(): AppLocale {
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isAppLocale(saved)) return saved;
    return window.navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
  } catch {
    return 'en';
  }
}

interface LocaleState {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: getInitialLocale(),
  setLocale: (locale) => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Keep language switching usable when browser storage is unavailable.
    }
    set({ locale });
  },
}));
