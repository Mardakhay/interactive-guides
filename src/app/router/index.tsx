import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { RouteErrorBoundary } from '@/components/feedback';
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
    // Fallback for errors thrown outside any child route (e.g. inside the
    // layout chrome itself). Individual routes below have their own
    // errorElement so the sidebar/topbar stay visible for in-page errors.
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage />, errorElement: <RouteErrorBoundary /> },
      { path: ROUTES.COURSES, element: <CoursesPage />, errorElement: <RouteErrorBoundary /> },
      { path: ROUTES.COURSE_DETAIL, element: <CourseDetailPage />, errorElement: <RouteErrorBoundary /> },
      { path: ROUTES.LESSON_VIEWER, element: <LessonViewerPage />, errorElement: <RouteErrorBoundary /> },
      { path: ROUTES.LEARNING_PATHS, element: <LearningPathsPage />, errorElement: <RouteErrorBoundary /> },
      {
        path: ROUTES.LEARNING_PATH_DETAIL,
        element: <LearningPathDetailPage />,
        errorElement: <RouteErrorBoundary />,
      },
      { path: ROUTES.BOOKMARKS, element: <BookmarksPage />, errorElement: <RouteErrorBoundary /> },
      { path: ROUTES.NOTES, element: <NotesPage />, errorElement: <RouteErrorBoundary /> },
      { path: ROUTES.SEARCH, element: <SearchPage />, errorElement: <RouteErrorBoundary /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
