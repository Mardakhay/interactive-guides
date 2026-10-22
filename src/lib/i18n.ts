export type AppLocale = 'en' | 'ru';

export const LOCALE_STORAGE_KEY = 'ig:locale';

interface NavigationCopy {
  dashboard: string; courses: string; learningPaths: string; bookmarks: string; notes: string; search: string;
  dataManagement: string; mainLabel: string; mobileLabel: string; openMenu: string; closeSidebar: string;
  skipToContent: string; appVersion: string; breadcrumbLabel: string;
}
interface CategoryCopy { name: string; description: string; }
interface LearningPathCopy { title: string; description: string; stepNotes: Record<string, string>; }
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
  difficulty: { beginner: string; intermediate: string; advanced: string; };
  courseDetail: { catalog: string; categoryNotFound: string; categoryNotFoundMessage: string; backToCatalog: string; statusCompleted: string; statusInProgress: string; };
  searchPage: {
    title: string; description: string; searching: string; noResults: string; noResultsMessage: string;
    resultCount: string; startTyping: string; startTypingMessage: string; filterLabel: string;
    all: string; lessons: string; courses: string; notes: string; clearSearch: string;
    resultTypes: { lesson: string; course: string; note: string; };
  };
  bookmarksPage: {
    title: string; summary: string; emptyTitle: string; emptyMessage: string; browseCatalog: string;
    statusCompleted: string; statusInProgress: string; durationUnit: string;
  };
  notesPage: {
    title: string; summary: string; emptyTitle: string; emptyMessage: string; browseCatalog: string;
    searchPlaceholder: string; searchLabel: string; filterLabel: string; allCourses: string;
    noMatchesTitle: string; noMatchesMessage: string; updated: string; delete: string;
  };
  learningPathsPage: {
    title: string; description: string; completed: string; estimated: string; viewPath: string;
    continueLearning: string; pathComplete: string; pathCompleteMessage: string; allPaths: string;
    continueWith: string;
  };
  notFoundPage: { title: string; message: string; backHome: string; };
  learningPathItems: Record<string, LearningPathCopy>;
  categories: Record<string, CategoryCopy>;
}

export const UI_COPY: Record<AppLocale, AppCopy> = {
  en: {
    navigation: {
      dashboard: 'Dashboard', courses: 'Courses', learningPaths: 'Learning Paths', bookmarks: 'Bookmarks', notes: 'Notes',
      search: 'Search', dataManagement: 'Data & Backup', mainLabel: 'Main navigation', mobileLabel: 'Mobile navigation',
      openMenu: 'Open menu', closeSidebar: 'Close sidebar', skipToContent: 'Skip to content',
      appVersion: 'Interactive Guides · learning preview', breadcrumbLabel: 'Breadcrumb',
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
    difficulty: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    courseDetail: {
      catalog: 'Lesson catalog', categoryNotFound: 'Category not found',
      categoryNotFoundMessage: "The category you're looking for doesn't exist.", backToCatalog: 'Back to catalog',
      statusCompleted: 'Completed', statusInProgress: 'In progress',
    },
    searchPage: {
      title: 'Search', description: 'Find lessons, courses, and your notes across the platform.',
      searching: 'Searching…', noResults: 'No results found',
      noResultsMessage: 'Nothing matched "{query}". Try a different term or broaden your filter.',
      resultCount: '{count} results', startTyping: 'Start typing to search',
      startTypingMessage: 'Search across all lessons, courses, and your personal notes. Results update as you type.',
      filterLabel: 'Filter results by type', all: 'All', lessons: 'Lessons', courses: 'Courses', notes: 'Notes',
      clearSearch: 'Clear search', resultTypes: { lesson: 'Lesson', course: 'Course', note: 'Note' },
    },
    bookmarksPage: {
      title: 'Bookmarks', summary: 'Saved lessons: {count}', emptyTitle: 'No bookmarks yet',
      emptyMessage: "Bookmark a lesson while you're reading it and it'll show up here for quick access later.",
      browseCatalog: 'Browse catalog', statusCompleted: 'Completed', statusInProgress: 'In progress', durationUnit: 'm',
    },
    notesPage: {
      title: 'Notes', summary: 'Notes across your lessons: {count}', emptyTitle: 'No notes yet',
      emptyMessage: "Open any lesson and jot something down — it'll show up here, organized by course.",
      browseCatalog: 'Browse catalog', searchPlaceholder: 'Search notes...', searchLabel: 'Search notes',
      filterLabel: 'Filter by course', allCourses: 'All courses', noMatchesTitle: 'No matching notes',
      noMatchesMessage: 'Try a different search term or course filter.', updated: 'Updated', delete: 'Delete',
    },
    learningPathsPage: {
      title: 'Learning Paths',
      description: 'Follow a curated sequence of lessons from start to finish. Each path guides you through a skill step by step, with progress tracked along the way.',
      completed: 'completed', estimated: 'estimated', viewPath: 'View path', continueLearning: 'Continue learning',
      pathComplete: "You've completed this learning path!",
      pathCompleteMessage: 'Pick a new path to keep growing.', allPaths: 'All paths', continueWith: 'Continue with',
    },
    notFoundPage: { title: 'Page Not Found', message: "The page you're looking for doesn't exist.", backHome: 'Back to Dashboard' },
    learningPathItems: {
      'frontend-foundations': {
        title: 'Frontend Foundations',
        description: 'Go from zero to building your first web page. Learn how the internet works, master HTML and CSS, and get comfortable with the DOM before touching a framework.',
        stepNotes: {
          'sh-001': 'Start with a bird’s-eye view of frontend engineering.',
          'wb-001': 'Understand how the internet and browsers work.',
          'wb-002': 'Learn the structure of a web page.',
          'wb-003': 'Style pages and master layout.',
          'wb-004': 'Bring pages to life by manipulating the DOM.',
        },
      },
      'javascript-mastery': {
        title: 'JavaScript Mastery',
        description: 'Progress from core syntax to asynchronous programming, objects, prototypes, memory concepts, Promises and async/await.',
        stepNotes: {
          'js-001': 'Build a strong foundation in JavaScript syntax.',
          'js-002': 'Understand objects, prototypes and classes.',
          'js-003': 'Explore memory, the stack and the heap.',
          'js-004': 'Study the event loop, Promises and async/await.',
        },
      },
      'react-developer': {
        title: 'React Developer Track',
        description: 'Build React skills through state, Hooks, forms, API integration, routing, performance and accessibility.',
        stepNotes: {
          're-001': 'Start with the essential useState Hook.',
          're-002': 'Study the Hooks API and common patterns.',
          're-003': 'Build and validate forms.',
          're-004': 'Integrate APIs with custom Hooks and error handling.',
          're-005': 'Add routing and navigation to a SPA.',
          're-006': 'Improve performance and accessibility.',
        },
      },
      'full-stack-tooling': {
        title: 'Full-Stack Tooling & Deployment',
        description: 'Configure a professional workflow, use Git and CI/CD, and deploy applications to production.',
        stepNotes: {
          'tl-003': 'Set up the development environment.',
          'tl-001': 'Learn everyday Git workflows.',
          'tl-002': 'Use branches, pull requests and CI/CD.',
          'tl-004': 'Deploy an application using hosting and DNS.',
        },
      },
      'production-ready': {
        title: 'Production-Ready Frontend',
        description: 'Develop production-minded skills through architecture, comprehensive testing, authentication and security.',
        stepNotes: {
          'qa-001': 'Plan and architect a maintainable frontend.',
          'qa-002': 'Test at unit, integration and end-to-end levels.',
          'sec-001': 'Learn authentication, JWT, OAuth and route protection.',
        },
      },
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
      appVersion: 'Interactive Guides · учебная версия', breadcrumbLabel: 'Навигационная цепочка',
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
    difficulty: { beginner: 'Начальный', intermediate: 'Средний', advanced: 'Продвинутый' },
    courseDetail: {
      catalog: 'Каталог уроков', categoryNotFound: 'Раздел не найден',
      categoryNotFoundMessage: 'Такого раздела не существует.', backToCatalog: 'Вернуться в каталог',
      statusCompleted: 'Завершено', statusInProgress: 'В процессе',
    },
    searchPage: {
      title: 'Поиск', description: 'Ищи уроки, курсы и свои заметки по всему приложению.',
      searching: 'Ищем…', noResults: 'Ничего не найдено',
      noResultsMessage: 'По запросу «{query}» совпадений нет. Попробуй другое слово или измени фильтр.',
      resultCount: 'Результатов: {count}', startTyping: 'Начни вводить запрос',
      startTypingMessage: 'Ищи по урокам, курсам и личным заметкам. Результаты обновляются по мере ввода.',
      filterLabel: 'Фильтровать результаты по типу', all: 'Всё', lessons: 'Уроки', courses: 'Курсы', notes: 'Заметки',
      clearSearch: 'Очистить поиск', resultTypes: { lesson: 'Урок', course: 'Курс', note: 'Заметка' },
    },
    bookmarksPage: {
      title: 'Закладки', summary: 'Сохранено уроков: {count}', emptyTitle: 'Закладок пока нет',
      emptyMessage: 'Добавляй уроки в закладки во время чтения — здесь они будут под рукой.',
      browseCatalog: 'Открыть каталог', statusCompleted: 'Завершено', statusInProgress: 'В процессе', durationUnit: 'мин',
    },
    notesPage: {
      title: 'Заметки', summary: 'Заметок в уроках: {count}', emptyTitle: 'Заметок пока нет',
      emptyMessage: 'Открой любой урок и запиши мысль — заметка появится здесь, в списке по курсам.',
      browseCatalog: 'Открыть каталог', searchPlaceholder: 'Поиск заметок...', searchLabel: 'Поиск заметок',
      filterLabel: 'Фильтр по курсу', allCourses: 'Все курсы', noMatchesTitle: 'Подходящих заметок нет',
      noMatchesMessage: 'Попробуй изменить поисковый запрос или фильтр курса.', updated: 'Обновлено', delete: 'Удалить',
    },
    learningPathsPage: {
      title: 'Учебные траектории',
      description: 'Следуй подобранной последовательности уроков от начала до конца. Каждая траектория последовательно развивает навык и сохраняет прогресс.',
      completed: 'завершено', estimated: 'примерно', viewPath: 'Открыть траекторию', continueLearning: 'Продолжить обучение',
      pathComplete: 'Учебная траектория завершена!',
      pathCompleteMessage: 'Выбери следующую траекторию для развития.', allPaths: 'Все траектории', continueWith: 'Продолжить с урока',
    },
    notFoundPage: { title: 'Страница не найдена', message: 'Такой страницы не существует.', backHome: 'На главную' },
    learningPathItems: {
      'frontend-foundations': {
        title: 'Основы frontend-разработки',
        description: 'Пройди путь от первых шагов до своей веб-страницы: пойми работу интернета, освой HTML и CSS и научись работать с DOM.',
        stepNotes: {
          'sh-001': 'Начни с общей картины frontend-разработки.',
          'wb-001': 'Разберись, как работают интернет и браузеры.',
          'wb-002': 'Изучи структуру веб-страницы.',
          'wb-003': 'Освой стилизацию и компоновку.',
          'wb-004': 'Добавь интерактивность через DOM.',
        },
      },
      'javascript-mastery': {
        title: 'Углублённый JavaScript',
        description: 'Пройди от базового синтаксиса к асинхронности, объектам, прототипам, памяти, Promise и async/await.',
        stepNotes: {
          'js-001': 'Закрепи основы синтаксиса JavaScript.',
          'js-002': 'Разберись в объектах, прототипах и классах.',
          'js-003': 'Изучи память, стек и кучу.',
          'js-004': 'Разберись в event loop, Promise и async/await.',
        },
      },
      'react-developer': {
        title: 'Траектория React-разработчика',
        description: 'Развивай навыки React: состояние, Hooks, формы, API, маршрутизация, производительность и доступность.',
        stepNotes: {
          're-001': 'Начни с основного хука useState.',
          're-002': 'Изучи Hooks API и распространённые шаблоны.',
          're-003': 'Научись создавать формы и проверять данные.',
          're-004': 'Подключай API через custom Hooks и обрабатывай ошибки.',
          're-005': 'Добавь маршрутизацию в SPA.',
          're-006': 'Улучши производительность и доступность.',
        },
      },
      'full-stack-tooling': {
        title: 'Инструменты и развёртывание',
        description: 'Настрой профессиональный workflow, освой Git и CI/CD, а затем разверни приложение в production.',
        stepNotes: {
          'tl-003': 'Настрой окружение разработки.',
          'tl-001': 'Изучи повседневные рабочие процессы Git.',
          'tl-002': 'Освой ветки, pull request и CI/CD.',
          'tl-004': 'Разверни приложение с помощью хостинга и DNS.',
        },
      },
      'production-ready': {
        title: 'Frontend для production',
        description: 'Освой архитектуру, всестороннее тестирование, аутентификацию и безопасность production-приложений.',
        stepNotes: {
          'qa-001': 'Планируй поддерживаемую архитектуру frontend.',
          'qa-002': 'Пиши unit-, integration- и end-to-end-тесты.',
          'sec-001': 'Изучи аутентификацию, JWT, OAuth и защиту маршрутов.',
        },
      },
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

export function getCategoryCopyByName(locale: AppLocale, englishName: string): CategoryCopy | undefined {
  const match = Object.entries(UI_COPY.en.categories).find(([, category]) => category.name === englishName);
  return match ? UI_COPY[locale].categories[match[0]] : undefined;
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

export function getDifficultyLabel(locale: AppLocale, difficulty: string): string {
  if (difficulty === 'beginner' || difficulty === 'intermediate' || difficulty === 'advanced') {
    return UI_COPY[locale].difficulty[difficulty];
  }
  return difficulty;
}


export function getLearningPathCopy(locale: AppLocale, pathId: string): LearningPathCopy | undefined {
  return UI_COPY[locale].learningPathItems[pathId];
}

export function getLearningPathStepNote(locale: AppLocale, pathId: string, lessonId: string, fallback = ''): string {
  return UI_COPY[locale].learningPathItems[pathId]?.stepNotes[lessonId] ?? fallback;
}
