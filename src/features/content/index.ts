export type { Category, CatalogCategory, Lesson, LessonDifficulty } from './types';
export {
  getCategories,
  getCategoryById,
  getLessons,
  getLessonById,
  getLessonBySlug,
  getLessonsByCategory,
  getCatalog,
  getTotalLessonCount,
  getAdjacentLessons,
  type LessonNavigationResult,
} from './api';
export { getCategoryIcon } from './icons';
export { LessonSidebarTree, LessonMetadata, LessonNavigation } from './components';
