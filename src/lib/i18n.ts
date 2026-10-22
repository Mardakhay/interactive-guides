export type AppLocale = 'en' | 'ru';

export const LOCALE_STORAGE_KEY = 'ig:locale';

interface NavigationCopy {
  dashboard: string; courses: string; learningPaths: string; bookmarks: string; notes: string; search: string;
  dataManagement: string; mainLabel: string; mobileLabel: string; openMenu: string; closeSidebar: string;
  skipToContent: string; appVersion: string;
}
interface CategoryCopy { name: string; description: string; }
interface AppCopy {
  navigation: NavigationCopy;
  search: { buttonLabel: string; placeholder: string };
  language: { targetName: string; buttonLabel: string; shortLabel: string };
  dashboard: {
    title: string; subtitle: string; continueLearning: string; browseCatalog: string;
    newContentFormat: string; previewStructuredLesson: string; previewDescription: string;
    openEnglishLesson: string; openRussianLesson: string; recommendedForYou: string; recentActivity: string;
    completed: string; inProgress: string; totalLessons: string; overallProgress: string;
    noLessonsStarted: string; noLessonsStartedMessage: string; startHere: string;
    noActivity: string; noActivityMessage: string; allCaughtUp: string; allCaughtUpMessage: string;
    learningPath: string; course: string; continue: string; start: string;
    bookmarkActivity: string; noteActivity: string; justNow: string; minutesAgo: string; hoursAgo: string; daysAgo: string;
  };
  catalog: { title: string; description: string; exploreCategory: string; completed: string; };
  categories: Record<string, CategoryCopy>;
}

export const UI_COPY: Record<AppLocale, AppCopy> = {
  en: {
    navigation: {
      dashboard: 'Dashboard', courses: 'Courses', learningPaths: 'Learning Paths', bookmarks: 'Bookmarks', notes: 'Notes',
      search: 'Search', dataManagement: 'Data & Backup', mainLabel: 'Main navigation', mobileLabel: 'Mobile navigation',
      openMenu: 'Open menu', closeSidebar: 'Close sidebar', skipToContent: 'Skip to content',
      appVersion: 'Interactive Guides · learning preview',
    },
    search: { buttonLabel: 'Search lessons, courses, and notes', placeholder: 'Search lessons, courses, notes...' },
    language: { targetName: 'Russian', buttonLabel: 'Switch interface language to Russian', shortLabel: 'RU' },
    dashboard: {
      title: 'Dashboard', subtitle: 'Your learning progress and recommendations.', continueLearning: 'Continue learning',
      browseCatalog: 'Browse full catalog', newContentFormat: 'New content format', previewStructuredLesson: 'Preview a structured lesson',
      previewDescription: "A bilingual lesson rendered by shared React components, with worked examples, knowledge checks, and coding practice. Existing HTML lessons are still available.",
      openEnglishLesson: 'Open English lesson', openRussianLesson: 'Открыть на русском', recommendedForYou: 'Recommended for you',
      recentActivity: 'Recent activity', completed: 'Completed', inProgress: 'In progress', totalLessons: 'Total lessons',
      overallProgress: 'Overall progress — {completed} of {total} lessons',
      noLessonsStarted: 'No lessons started yet', noLessonsStartedMessage: 'Head to Start Here for an orientation, or browse the full catalog to jump right in.',
      startHere: 'Start Here', noActivity: 'No activity yet', noActivityMessage: "Bookmark a lesson or add a note while you learn — it'll show up here.",
      allCaughtUp: "You're all caught up", allCaughtUpMessage: "You've made progress across every course and path we have.",
      learningPath: 'Learning path', course: 'Course', continue: 'Continue', start: 'Start',
      bookmarkActivity: 'Bookmarked a lesson', noteActivity: 'Added a note',
      justNow: 'just now', minutesAgo: 'm ago', hoursAgo: 'h ago', daysAgo: 'd ago',
    },
    catalog: {
      title: 'Lesson catalog',
      description: 'Browse {lessons} interactive lessons across {categories} categories. Start anywhere and learn at your own pace.',
      exploreCategory: 'Explore category', completed: 'completed',
    },
    categories: {
      'start-here': { name: 'Start Here', description: "New to Interactive Guides? Begin with this orientation handbook to get a bird's-eye view of the frontend landscape." },
      'web-basics': { name: 'Web Basics', description: 'Understand how the internet works and master the foundational technologies of the web — HTML, CSS, and the DOM.' },
      javascript: { name: 'JavaScript', description: 'Master JavaScript from core fundamentals to objects, memory management, and asynchronous programming.' },
      react: { name: 'React', description: 'Build modern user interfaces with hooks, forms, API integration, routing, performance optimization, and accessibility.' },
      'ui-design': { name: 'UI / Design', description: 'Learn design system fundamentals, component design with tokens and variants, and Material UI.' },
      tooling: { name: 'Tooling', description: 'Set up your dev environment, master Git and CI/CD workflows, and learn how to deploy applications to production.' },
      quality: { name: 'Quality', description: 'Learn frontend architecture and planning, plus testing strategies from unit tests to end-to-end tests.' },
      security: { name: 'Security', description: 'Protect applications with frontend authentication, JWT, OAuth, secure token storage, and route protection.' },
      data: { name: 'Data', description: 'Work with data using SQL queries, joins, aggregations, and database design fundamentals.' },
    },
  },
  ru: {
    navigation: {
      dashboard: 'Главная', courses: 'Курсы', learningPaths: 'Учебные траектории', bookmarks: 'Закладки', notes: 'Заметки',
      search: 'Поиск', dataManagement: 'Данные и резервная копия', mainLabel: 'Основная навигация', mobileLabel: 'Мобильная навигация',
      openMenu: 'Открыть меню', closeSidebar: 'Закрыть боковую панель', skipToContent: 'Перейти к содержимому',
      appVersion: 'Interactive Guides · учебная версия',
    },
    search: { buttonLabel: 'Искать уроки, курсы и заметки', placeholder: 'Поиск уроков, курсов, заметок...' },
    language: { targetName: 'English', buttonLabel: 'Переключить язык интерфейса на English', shortLabel: 'EN' },
    dashboard: {
      title: 'Главная', subtitle: 'Твой прогресс обучения и рекомендации.', continueLearning: 'Продолжить обучение',
      browseCatalog: 'Открыть полный каталог', newContentFormat: 'Новый формат материалов', previewStructuredLesson: 'Открой структурированный урок',
      previewDescription: 'Двуязычный урок на общих React-компонентах: разобранные примеры, вопросы для проверки знаний и практика с кодом. Старые HTML-уроки также доступны.',
      openEnglishLesson: 'Открыть на английском', openRussianLesson: 'Открыть на русском', recommendedForYou: 'Рекомендуем тебе',
      recentActivity: 'Недавняя активность', completed: 'Завершено', inProgress: 'В процессе', totalLessons: 'Всего уроков',
      overallProgress: 'Общий прогресс — {completed} из {total} уроков',
      noLessonsStarted: 'Ты ещё не начал уроки', noLessonsStartedMessage: 'Начни с вводного раздела или открой полный каталог и выбери интересную тему.',
      startHere: 'Начать здесь', noActivity: 'Активности пока нет', noActivityMessage: 'Добавляй уроки в закладки или делай заметки во время обучения — они появятся здесь.',
      allCaughtUp: 'Всё просмотрено', allCaughtUpMessage: 'У тебя есть прогресс по всем доступным курсам и учебным траекториям.',
      learningPath: 'Учебная траектория', course: 'Курс', continue: 'Продолжить', start: 'Начать',
      bookmarkActivity: 'Добавлен урок в закладки', noteActivity: 'Добавлена заметка',
      justNow: 'только что', minutesAgo: ' мин. назад', hoursAgo: ' ч. назад', daysAgo: ' дн. назад',
    },
    catalog: {
      title: 'Каталог уроков',
      description: '{lessons} интерактивных уроков в {categories} направлениях. Начни с любой темы и учись в своём темпе.',
      exploreCategory: 'Открыть раздел', completed: 'завершено',
    },
    categories: {
      'start-here': { name: 'Начни здесь', description: 'Впервые в Interactive Guides? Начни с вводного руководства, которое показывает общую картину frontend-разработки.' },
      'web-basics': { name: 'Основы веба', description: 'Разберись, как работает интернет, и изучи базовые веб-технологии: HTML, CSS и DOM.' },
      javascript: { name: 'JavaScript', description: 'Изучи основы JavaScript, объекты, управление памятью и асинхронное программирование.' },
      react: { name: 'React', description: 'Создавай современные интерфейсы с hooks, формами, API, маршрутизацией, оптимизацией и доступностью.' },
      'ui-design': { name: 'UI и дизайн', description: 'Изучи дизайн-системы, компоненты, токены, варианты и Material UI.' },
      tooling: { name: 'Инструменты', description: 'Настрой окружение разработки, изучи Git, CI/CD и развёртывание приложений.' },
      quality: { name: 'Качество', description: 'Изучи архитектуру frontend-приложений, планирование и тестирование от unit до end-to-end.' },
      security: { name: 'Безопасность', description: 'Защищай приложения с помощью аутентификации, JWT, OAuth, безопасного хранения токенов и защиты маршрутов.' },
      data: { name: 'Данные', description: 'Работай с данными через SQL, JOIN, агрегации и основы проектирования баз данных.' },
    },
  },
};

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

export function formatLessonCount(locale: AppLocale, count: number): string {
  if (locale === 'en') return `${count} ${count === 1 ? 'lesson' : 'lessons'}`;
  const mod10 = count % 10;
  const mod100 = count % 100;
  const noun = mod10 === 1 && mod100 !== 11 ? 'урок'
    : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'урока'
    : 'уроков';
  return `${count} ${noun}`;
}

export function getCategoryCopy(locale: AppLocale, categoryId: string): CategoryCopy | undefined {
  return UI_COPY[locale].categories[categoryId];
}

export function formatOverallProgress(locale: AppLocale, completed: number, total: number): string {
  return UI_COPY[locale].dashboard.overallProgress
    .replace('{completed}', String(completed))
    .replace('{total}', String(total));
}

export function formatCatalogDescription(locale: AppLocale, lessons: number, categories: number): string {
  return UI_COPY[locale].catalog.description
    .replace('{lessons}', String(lessons))
    .replace('{categories}', String(categories));
}
