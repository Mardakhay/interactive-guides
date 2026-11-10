import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ROUTES } from './routes';

const DashboardPage = lazy(() => import('@/app/pages/DashboardPage'));
const CoursesPage = lazy(() => import('@/app/pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('@/app/pages/CourseDetailPage'));
const LessonViewerPage = lazy(() => import('@/app/pages/LessonViewerPage'));
const LearningPathsPage = lazy(() => import('@/app/pages/LearningPathsPage'));
const LearningPathDetailPage = lazy(() => import('@/app/pages/LearningPathDetailPage'));
const BookmarksPage = lazy(() => import('@/app/pages/BookmarksPage'));
const NotesPage = lazy(() => import('@/app/pages/NotesPage'));
const SearchPage = lazy(() => import('@/app/pages/SearchPage'));
const NotFoundPage = lazy(() => import('@/app/pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.COURSES, element: <CoursesPage /> },
      { path: ROUTES.COURSE_DETAIL, element: <CourseDetailPage /> },
      { path: ROUTES.LESSON_VIEWER, element: <LessonViewerPage /> },
      { path: ROUTES.LEARNING_PATHS, element: <LearningPathsPage /> },
      { path: ROUTES.LEARNING_PATH_DETAIL, element: <LearningPathDetailPage /> },
      { path: ROUTES.BOOKMARKS, element: <BookmarksPage /> },
      { path: ROUTES.NOTES, element: <NotesPage /> },
      { path: ROUTES.SEARCH, element: <SearchPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
