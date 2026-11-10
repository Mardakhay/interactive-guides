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
  "completedProgress": "{completed}/{total} completed",
  "pathListDescription": "Follow a curated sequence of lessons from start to finish. Each path guides you through a skill step by step, with progress tracked along the way.",
  "viewPath": "View path",
  "hourUnit": "h",
  "savedLessonsSummary": "{count} saved",
  "savedLessonsFallback": "Your saved lessons will appear here.",
  "bookmarksEmptyTitle": "No bookmarks yet",
  "bookmarksEmptyMessage": "Bookmark a lesson while you're reading it and it'll show up here for quick access later.",
  "completed": "Completed",
  "inProgress": "In progress",
  "notesSummary": "{count} across your lessons",
  "notesSummaryEmpty": "Your lesson notes will appear here.",
  "notesEmptyTitle": "No notes yet",
  "notesEmptyMessage": "Open any lesson and jot something down — it'll show up here, organized by course.",
  "searchNotesPlaceholder": "Search notes...",
  "searchNotesAria": "Search notes",
  "filterByCourse": "Filter by course",
  "allCourses": "All courses",
  "noMatchingNotesTitle": "No matching notes",
  "noMatchingNotesMessage": "Try a different search term or course filter.",
  "updated": "Updated",
  "delete": "Delete",
  "catalog": "Catalog",
  "categoryNotFound": "Category not found",
  "categoryNotFoundMessage": "The category you're looking for doesn't exist.",
  "backToCatalog": "Back to catalog",
  "categoryProgress": "{completed} of {total} lessons completed",
  "lessons": "Lessons",
  "lessonsWord": "lessons",
  "hourEstimated": "{hours}h estimated",
  "minuteUnit": "m",
  "allResults": "All",
  "filterResultsByType": "Filter results by type",
  "lessonType": "Lesson",
  "courseType": "Course",
  "noteType": "Note",
  "clearSearch": "Clear search",
  "searchPageDescription": "Find lessons, courses, and your notes across the platform.",
  "searching": "Searching…",
  "noSearchResultsTitle": "No results found",
  "noSearchResultsMessage": "Nothing matched “{query}”. Try a different term or broaden your filter.",
  "searchStartTitle": "Start typing to search",
  "searchStartMessage": "Search across all lessons, courses, and your personal notes. Results update as you type.",
  "result": "result",
  "results": "results",
  "pathNotFoundTitle": "Learning path not found",
  "pathNotFoundMessage": "The path you're looking for doesn't exist.",
  "pathCompletedMessage": "You've completed this learning path! Pick a new path to keep growing.",
  "allPaths": "All paths",
  "browseAllPaths": "Browse all paths",
  "continueWith": "Continue with {title}",
  "updateAvailable": "Update available",
  "updatePromptMessage": "A new version of Interactive Guides is ready. Update when you are ready.",
  "updateNow": "Update now",
  "notFoundPageTitle": "Page not found",
  "notFoundPageMessage": "The page you're looking for doesn't exist.",
  "backToDashboard": "Back to dashboard",
  "lessonNotFoundTitle": "Lesson not found",
  "lessonNotFoundMessage": "The lesson you're looking for doesn't exist or may have been removed.",
  "markIncomplete": "Mark incomplete",
  "finishedThisLesson": "Finished this lesson?",
  "completedMovingNext": "Completed — moving to the next lesson…",
  "youCompletedLesson": "You completed this lesson",
  "markComplete": "Mark complete",
  "notStarted": "Not started",
  "allLessons": "All lessons",
  "dashboardCompletedLabel": "Completed",
  "dashboardInProgressLabel": "In progress",
  "dashboardTotalLessons": "Total lessons",
  "dashboardOverallProgress": "Overall progress — {completed} of {total} lessons",
  "noLessonsStartedTitle": "No lessons started yet",
  "noLessonsStartedMessage": "Head to Start Here for an orientation, or browse the full catalog to jump right in.",
  "startHere": "Start here",
  "noActivityTitle": "No activity yet",
  "noActivityMessage": "Bookmark a lesson or add a note while you learn — it'll show up here.",
  "caughtUpTitle": "You're all caught up",
  "caughtUpMessage": "You've made progress across every course and path we have.",
  "recommendationPath": "Learning path",
  "recommendationCourse": "Course",
  "continueAction": "Continue",
  "startAction": "Start",
  "percentComplete": "{percent}% complete",
  "recommendationPathStart": "{hours}h · {lessons}",
  "recommendationCategoryStart": "{lessons} · not started",
  "lessonStatusLabel": "Status",
  "lessonDifficultyLabel": "Difficulty",
  "lessonDurationLabel": "Duration",
  "lessonCategoryLabel": "Category",
  "lessonTagsLabel": "Tags",
  "lessonNavigationAria": "Lesson navigation",
  "previousLesson": "Previous",
  "nextLesson": "Next",
  "lessonTreeAria": "Lesson tree",
  "lessonDurationValue": "{minutes} minutes",
  "myNotesTitle": "My notes",
  "deleteNote": "Delete",
  "lessonNotesPlaceholder": "Jot down anything worth remembering about this lesson...",
  "lessonNotesAria": "Lesson notes",
  "savedAt": "Saved · {date}",
  "autosavesAsYouType": "Autosaves as you type",
  "addBookmark": "Add bookmark",
  "removeBookmark": "Remove bookmark",
  "bookmark": "Bookmark",
  "bookmarked": "Bookmarked",
  "quizScore": "{score} / {total} correct · {percent}%",
  "retryQuiz": "Retry quiz",
  "yourAnswer": "Your answer",
  "answeredCount": "{answered} / {total} answered",
  "submitQuiz": "Submit quiz"
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
  "completedProgress": "Завершено: {completed} из {total}",
  "pathListDescription": "Проходите подобранную последовательность уроков от начала до конца. Каждый маршрут пошагово развивает навык, а прогресс сохраняется по мере обучения.",
  "viewPath": "Открыть маршрут",
  "hourUnit": "ч",
  "savedLessonsSummary": "В закладках: {count}",
  "savedLessonsFallback": "Сохранённые уроки появятся здесь.",
  "bookmarksEmptyTitle": "Пока нет закладок",
  "bookmarksEmptyMessage": "Добавляйте уроки в закладки во время чтения — здесь они будут доступны для быстрого перехода.",
  "completed": "Завершено",
  "inProgress": "В процессе",
  "notesSummary": "заметок к урокам: {count}",
  "notesSummaryEmpty": "Ваши заметки к урокам появятся здесь.",
  "notesEmptyTitle": "Пока нет заметок",
  "notesEmptyMessage": "Откройте любой урок и запишите мысль — заметка появится здесь и будет сгруппирована по курсу.",
  "searchNotesPlaceholder": "Поиск по заметкам...",
  "searchNotesAria": "Поиск по заметкам",
  "filterByCourse": "Фильтр по курсу",
  "allCourses": "Все курсы",
  "noMatchingNotesTitle": "Подходящих заметок нет",
  "noMatchingNotesMessage": "Попробуйте изменить запрос или выбрать другой курс.",
  "updated": "Обновлено",
  "delete": "Удалить",
  "catalog": "Каталог",
  "categoryNotFound": "Категория не найдена",
  "categoryNotFoundMessage": "Такой категории не существует.",
  "backToCatalog": "Вернуться в каталог",
  "categoryProgress": "Завершено уроков: {completed} из {total}",
  "lessons": "Уроки",
  "lessonsWord": "уроков",
  "hourEstimated": "Оценка: {hours} ч",
  "minuteUnit": " мин",
  "allResults": "Все",
  "filterResultsByType": "Фильтр результатов по типу",
  "lessonType": "Урок",
  "courseType": "Курс",
  "noteType": "Заметка",
  "clearSearch": "Очистить поиск",
  "searchPageDescription": "Ищите уроки, курсы и свои заметки по всей платформе.",
  "searching": "Ищем…",
  "noSearchResultsTitle": "Ничего не найдено",
  "noSearchResultsMessage": "По запросу «{query}» ничего не найдено. Попробуйте изменить запрос или фильтр.",
  "searchStartTitle": "Начните вводить запрос",
  "searchStartMessage": "Ищите по урокам, курсам и личным заметкам. Результаты обновляются по мере ввода.",
  "result": "результат",
  "results": "результатов",
  "pathNotFoundTitle": "Учебный маршрут не найден",
  "pathNotFoundMessage": "Такого учебного маршрута не существует.",
  "pathCompletedMessage": "Вы завершили этот учебный маршрут! Выберите новый, чтобы продолжить развиваться.",
  "allPaths": "Все маршруты",
  "browseAllPaths": "Посмотреть все маршруты",
  "continueWith": "Продолжить: {title}",
  "updateAvailable": "Доступно обновление",
  "updatePromptMessage": "Новая версия Interactive Guides готова. Обновите приложение, когда будете готовы.",
  "updateNow": "Обновить",
  "notFoundPageTitle": "Страница не найдена",
  "notFoundPageMessage": "Такой страницы не существует.",
  "backToDashboard": "Вернуться к обзору",
  "lessonNotFoundTitle": "Урок не найден",
  "lessonNotFoundMessage": "Урок, который вы ищете, не существует или был удалён.",
  "markIncomplete": "Отметить незавершённым",
  "finishedThisLesson": "Вы закончили урок?",
  "completedMovingNext": "Урок завершён — переходим к следующему…",
  "youCompletedLesson": "Вы завершили этот урок",
  "markComplete": "Отметить завершённым",
  "notStarted": "Не начат",
  "allLessons": "Все уроки",
  "dashboardCompletedLabel": "Завершено",
  "dashboardInProgressLabel": "В процессе",
  "dashboardTotalLessons": "Всего уроков",
  "dashboardOverallProgress": "Общий прогресс — {completed} из {total} уроков",
  "noLessonsStartedTitle": "Вы ещё не начали обучение",
  "noLessonsStartedMessage": "Начните с вводного раздела или выберите тему в каталоге.",
  "startHere": "С чего начать",
  "noActivityTitle": "Пока нет активности",
  "noActivityMessage": "Добавляйте уроки в закладки или делайте заметки — здесь появятся ваши действия.",
  "caughtUpTitle": "Всё просмотрено",
  "caughtUpMessage": "Вы продвинулись по всем доступным курсам и учебным маршрутам.",
  "recommendationPath": "Учебный маршрут",
  "recommendationCourse": "Курс",
  "continueAction": "Продолжить",
  "startAction": "Начать",
  "percentComplete": "Завершено: {percent}%",
  "recommendationPathStart": "{hours} ч · {lessons}",
  "recommendationCategoryStart": "{lessons} · не начат",
  "lessonStatusLabel": "Статус",
  "lessonDifficultyLabel": "Сложность",
  "lessonDurationLabel": "Длительность",
  "lessonCategoryLabel": "Категория",
  "lessonTagsLabel": "Теги",
  "lessonNavigationAria": "Навигация по урокам",
  "previousLesson": "Назад",
  "nextLesson": "Далее",
  "lessonTreeAria": "Список уроков",
  "lessonDurationValue": "{minutes} мин",
  "myNotesTitle": "Мои заметки",
  "deleteNote": "Удалить",
  "lessonNotesPlaceholder": "Запишите здесь всё, что стоит запомнить об этом уроке...",
  "lessonNotesAria": "Заметки к уроку",
  "savedAt": "Сохранено · {date}",
  "autosavesAsYouType": "Сохраняется автоматически при вводе",
  "addBookmark": "Добавить в закладки",
  "removeBookmark": "Убрать из закладок",
  "bookmark": "В закладки",
  "bookmarked": "В закладках",
  "quizScore": "Правильных ответов: {score} из {total} · {percent}%",
  "retryQuiz": "Повторить тест",
  "yourAnswer": "Ваш ответ",
  "answeredCount": "Отвечено: {answered} из {total}",
  "submitQuiz": "Отправить ответы"
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

const learningPathTranslations: Record<string, { title: string; description: string }> = {
  "frontend-foundations": {
    "title": "Основы frontend",
    "description": "Путь от нуля до первой веб-страницы. Разберитесь, как работает интернет, изучите HTML и CSS и освоите DOM — три основы перед переходом к фреймворкам."
  },
  "javascript-mastery": {
    "title": "Мастерство JavaScript",
    "description": "Изучите JavaScript от фундаментальных принципов до асинхронных шаблонов: основной язык, объекты и прототипы, память и асинхронный код."
  },
  "react-developer": {
    "title": "Путь React-разработчика",
    "description": "Освойте разработку на React: начните с useState и хуков, изучите формы и API, маршрутизацию SPA, производительность и доступность."
  },
  "full-stack-tooling": {
    "title": "Инструменты и публикация",
    "description": "Настройте профессиональный процесс разработки: окружение, Git, CI/CD и публикацию приложений в production."
  },
  "production-ready": {
    "title": "Frontend для production",
    "description": "Углубите навыки: архитектура frontend, комплексное тестирование, аутентификация и безопасность production-приложений."
  }
};

export function getLocalizedLearningPathCopy(
  locale: Locale,
  id: string,
  fallbackTitle: string,
  fallbackDescription: string,
): { title: string; description: string } {
  if (locale === 'en') return { title: fallbackTitle, description: fallbackDescription };
  return learningPathTranslations[id] ?? { title: fallbackTitle, description: fallbackDescription };
}

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


export function formatNoteCount(locale: Locale, count: number): string {
  if (locale === 'en') return `${count} ${count === 1 ? 'note' : 'notes'}`;
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const word = lastDigit === 1 && lastTwoDigits !== 11
    ? 'заметка'
    : [2, 3, 4].includes(lastDigit) && (lastTwoDigits < 12 || lastTwoDigits > 14)
      ? 'заметки'
      : 'заметок';
  return `${count} ${word}`;
}

export function getLocalizedDifficulty(locale: Locale, level: string): string {
  if (locale === 'en') return ({ beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' } as Record<string, string>)[level] ?? level;
  return ({ beginner: 'Начальный', intermediate: 'Средний', advanced: 'Продвинутый' } as Record<string, string>)[level] ?? level;
}

export function formatResultCount(locale: Locale, count: number): string {
  if (locale === 'en') return `${count} ${count === 1 ? 'result' : 'results'}`;
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const word = lastDigit === 1 && lastTwoDigits !== 11
    ? 'результат'
    : [2, 3, 4].includes(lastDigit) && (lastTwoDigits < 12 || lastTwoDigits > 14)
      ? 'результата'
      : 'результатов';
  return `${count} ${word}`;
}
