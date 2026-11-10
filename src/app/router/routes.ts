export type AppLocale = 'en' | 'ru';

export const ROUTES = {
  DASHBOARD: '/',
  COURSES: '/structured-lessons',
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
  COURSES: '/structured-lessons',
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

export function coursePath(_categoryId: string): string {
  // Kept as a compatibility helper for stale bookmarks/links; all catalog links use the structured curriculum.
  return '/structured-lessons';
}

export function lessonPath(_lessonId: string): string {
  // Standalone legacy lesson URLs no longer resolve to HTML lesson documents.
  return '/structured-lessons';
}

export function learningPathDetailPath(pathId: string): string {
  return `/paths/${pathId}`;
}
