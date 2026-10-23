export type Locale = 'en' | 'ru';

const en = {
  "skipToContent": "Skip to content",
  "mainNavigation": "Main navigation",
  "closeSidebar": "Close sidebar",
  "dashboard": "Dashboard",
  "courses": "Courses",
  "learningPaths": "Learning Paths",
  "bookmarks": "Bookmarks",
  "notes": "Notes",
  "search": "Search",
  "home": "Home",
  "openMenu": "Open menu",
  "searchPlaceholder": "Search lessons, courses, notes...",
  "switchToRussian": "Switch language to Russian",
  "switchToEnglish": "Switch language to English",
  "dashboardDescription": "Your learning progress and recommendations.",
  "continueLearning": "Continue Learning",
  "browseCatalog": "Browse full catalog",
  "recommendedForYou": "Recommended for you",
  "recentActivity": "Recent activity",
  "lessonCatalog": "Lesson Catalog",
  "browseLessonsSummary": "Browse {lessonCount} across {categoryCount}. Start anywhere, learn at your pace.",
  "structuredLabel": "Structured · English / Русский",
  "bootcampTitle": "24-week Frontend Development Bootcamp",
  "bootcampDescription": "A complete, bilingual curriculum with guided lessons, worked examples, knowledge checks, coding practice and separate supplementary tracks.",
  "openCurriculum": "Open structured curriculum",
  "exploreCategory": "Explore category",
  "completedProgress": "{completed}/{total} completed"
} as const;
const ru: Record<keyof typeof en, string> = {
  "skipToContent": "Перейти к содержимому",
  "mainNavigation": "Главная навигация",
  "closeSidebar": "Закрыть боковую панель",
  "dashboard": "Обзор",
  "courses": "Курсы",
  "learningPaths": "Учебные маршруты",
  "bookmarks": "Закладки",
  "notes": "Заметки",
  "search": "Поиск",
  "home": "Главная",
  "openMenu": "Открыть меню",
  "searchPlaceholder": "Поиск уроков, курсов и заметок...",
  "switchToRussian": "Переключить язык на русский",
  "switchToEnglish": "Переключить язык на английский",
  "dashboardDescription": "Ваш прогресс в обучении и рекомендации.",
  "continueLearning": "Продолжить обучение",
  "browseCatalog": "Открыть весь каталог",
  "recommendedForYou": "Рекомендации для вас",
  "recentActivity": "Недавняя активность",
  "lessonCatalog": "Каталог уроков",
  "browseLessonsSummary": "В каталоге — {lessonCount} в {categoryCount}. Начните с любой темы и учитесь в своём темпе.",
  "structuredLabel": "Структурированная программа · English / Русский",
  "bootcampTitle": "24-недельный буткемп по frontend-разработке",
  "bootcampDescription": "Полная двуязычная программа: объяснения, разобранные примеры, проверка знаний, практика с кодом и отдельные дополнительные треки.",
  "openCurriculum": "Открыть структурированную программу",
  "exploreCategory": "Изучить категорию",
  "completedProgress": "Завершено: {completed} из {total}"
};

export const translations: Record<Locale, Record<keyof typeof en, string>> = { en, ru };
export type TranslationKey = keyof typeof en;

const categoryTranslations: Record<string, { name: string; description: string }> = {
  "start-here": {
    "name": "С чего начать",
    "description": "Впервые в Interactive Guides? Начните с вводного руководства, которое даст обзор всей области frontend-разработки."
  },
  "web-basics": {
    "name": "Основы веба",
    "description": "Разберитесь, как работает интернет, и изучите базовые веб-технологии: HTML, CSS и DOM."
  },
  "javascript": {
    "name": "JavaScript",
    "description": "Освойте JavaScript: от основных конструкций до объектов, управления памятью и асинхронного программирования."
  },
  "react": {
    "name": "React",
    "description": "Создавайте современные интерфейсы с хуками, формами, API, маршрутизацией, оптимизацией и доступностью."
  },
  "ui-design": {
    "name": "UI и дизайн",
    "description": "Изучите основы дизайн-систем, проектирование компонентов с токенами и вариантами, а также Material UI."
  },
  "tooling": {
    "name": "Инструменты",
    "description": "Настройте среду разработки, освойте Git и CI/CD, научитесь публиковать приложения в production."
  },
  "quality": {
    "name": "Качество",
    "description": "Пишите поддерживаемый код: изучите архитектуру frontend-проектов, планирование и тестирование от unit до E2E."
  },
  "security": {
    "name": "Безопасность",
    "description": "Защищайте приложения: frontend-аутентификация, JWT, OAuth, безопасное хранение токенов и защита маршрутов."
  },
  "data": {
    "name": "Данные",
    "description": "Эффективно работайте с данными: от SELECT и JOIN до агрегирования и основ проектирования баз данных."
  }
};

export function translate(
  locale: Locale,
  key: TranslationKey,
  values: Record<string, string | number> = {},
): string {
  return translations[locale][key].replace(/\{([a-zA-Z]+)\}/g, (placeholder, name: string) => {
    const value = values[name];
    return value === undefined ? placeholder : String(value);
  });
}

export function formatLessonCount(locale: Locale, count: number): string {
  if (locale === 'en') return `${count} ${count === 1 ? 'lesson' : 'lessons'}`;
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const word = lastDigit === 1 && lastTwoDigits !== 11
    ? 'урок'
    : [2, 3, 4].includes(lastDigit) && (lastTwoDigits < 12 || lastTwoDigits > 14)
      ? 'урока'
      : 'уроков';
  return `${count} ${word}`;
}

export function formatCategoryCount(locale: Locale, count: number): string {
  if (locale === 'en') return `${count} ${count === 1 ? 'category' : 'categories'}`;
  return `${count} ${count % 10 === 1 && count % 100 !== 11 ? 'категории' : 'категориях'}`;
}

export function getLocalizedCategoryCopy(
  locale: Locale,
  id: string,
  fallbackName: string,
  fallbackDescription: string,
): { name: string; description: string } {
  if (locale === 'en') return { name: fallbackName, description: fallbackDescription };
  return categoryTranslations[id] ?? { name: fallbackName, description: fallbackDescription };
}
