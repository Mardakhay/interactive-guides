export type AppLocale = 'en' | 'ru';
export const LOCALE_STORAGE_KEY = 'ig:locale';

export const UI_COPY = {
  en: {
    navigation: {
      dashboard: 'Dashboard', courses: 'Courses', learningPaths: 'Learning Paths',
      bookmarks: 'Bookmarks', notes: 'Notes', search: 'Search', dataManagement: 'Data & Backup',
      mainLabel: 'Main navigation', mobileLabel: 'Mobile navigation',
      openMenu: 'Open menu', closeSidebar: 'Close sidebar',
      skipToContent: 'Skip to content', appVersion: 'Interactive Guides · learning preview',
    },
    search: { buttonLabel: 'Search lessons, courses, and notes', placeholder: 'Search lessons, courses, notes...' },
    language: { targetName: 'Russian', buttonLabel: 'Switch interface language to Russian', shortLabel: 'RU' },
  },
  ru: {
    navigation: {
      dashboard: 'Главная', courses: 'Курсы', learningPaths: 'Учебные траектории',
      bookmarks: 'Закладки', notes: 'Заметки', search: 'Поиск', dataManagement: 'Данные и резервная копия',
      mainLabel: 'Основная навигация', mobileLabel: 'Мобильная навигация',
      openMenu: 'Открыть меню', closeSidebar: 'Закрыть боковую панель',
      skipToContent: 'Перейти к содержимому', appVersion: 'Interactive Guides · учебная версия',
    },
    search: { buttonLabel: 'Искать уроки, курсы и заметки', placeholder: 'Поиск уроков, курсов, заметок...' },
    language: { targetName: 'English', buttonLabel: 'Переключить язык интерфейса на English', shortLabel: 'EN' },
  },
} as const;

export function isAppLocale(value: unknown): value is AppLocale {
  return value === 'en' || value === 'ru';
}

export function getLocaleFromPathname(pathname: string): AppLocale | undefined {
  const match = pathname.match(/^\/(en|ru)(?:\/|$)/);
  return match && isAppLocale(match[1]) ? match[1] : undefined;
}

export function getOtherLocale(locale: AppLocale): AppLocale {
  return locale === 'en' ? 'ru' : 'en';
}
