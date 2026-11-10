export const ROUTES = {
  DASHBOARD: '/',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:courseId',
  LESSON_VIEWER: '/lessons/:lessonId',
  LEARNING_PATHS: '/paths',
  LEARNING_PATH_DETAIL: '/paths/:pathId',
  BOOKMARKS: '/bookmarks',
  NOTES: '/notes',
  SEARCH: '/search',
} as const;

export const ROUTE_PATHS = {
  DASHBOARD: '/',
  COURSES: '/courses',
  LEARNING_PATHS: '/paths',
  BOOKMARKS: '/bookmarks',
  NOTES: '/notes',
  SEARCH: '/search',
} as const;
