export type AppLocale = 'en' | 'ru';

export const ROUTES = {
  DASHBOARD: '/',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:categoryId',
  LESSON_VIEWER: '/lessons/:lessonId',
  LEARNING_PATHS: '/paths',
  LEARNING_PATH_DETAIL: '/paths/:pathId',
  BOOKMARKS: '/bookmarks',
  NOTES: '/notes',
  PRACTICE: '/practice',
  SEARCH: '/search',
  BACKUP: '/backup',
  SETTINGS: '/settings',
} as const;

export const ROUTE_PATHS = {
  DASHBOARD: '/',
  COURSES: '/courses',
  LEARNING_PATHS: '/paths',
  BOOKMARKS: '/bookmarks',
  NOTES: '/notes',
  PRACTICE: '/practice',
  SEARCH: '/search',
  BACKUP: '/backup',
  SETTINGS: '/settings',
} as const;

/** Adds the selected locale to any current or legacy app path without double-prefixing it. */
export function localizedPath(path: string, locale: AppLocale): string {
  const normalizedPath = path.startsWith('/') ? path : '/' + path;
  const unprefixedPath = normalizedPath.replace(/^\/(?:en|ru)(?=\/|$)/, '') || '/';
  return unprefixedPath === '/' ? '/' + locale : '/' + locale + unprefixedPath;
}

export function coursePath(categoryId: string): string {
  return `/courses/${categoryId}`;
}

export function lessonPath(lessonId: string): string {
  return `/lessons/${lessonId}`;
}

export function learningPathDetailPath(pathId: string): string {
  return `/paths/${pathId}`;
}
