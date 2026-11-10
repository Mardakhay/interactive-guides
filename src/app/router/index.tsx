import { lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet, type RouteObject, useParams } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/feedback';
import { LegacyPathRedirect, LocalizedAppLayout } from './LocalizedRouteLayout';

/* eslint-disable react-refresh/only-export-components -- This module intentionally exports a router made from lazy page components. */
const DashboardPage = lazy(() => import('@/app/pages/DashboardPage'));
const StructuredCurriculumPage = lazy(() => import('@/app/pages/StructuredCurriculumPage'));
const StructuredLessonPage = lazy(() => import('@/app/pages/StructuredLessonPage'));
const LearningPathsPage = lazy(() => import('@/app/pages/LearningPathsPage'));
const LearningPathDetailPage = lazy(() => import('@/app/pages/LearningPathDetailPage'));
const BookmarksPage = lazy(() => import('@/app/pages/BookmarksPage'));
const NotesPage = lazy(() => import('@/app/pages/NotesPage'));
const PracticePage = lazy(() => import('@/app/pages/PracticePage'));
const SearchPage = lazy(() => import('@/app/pages/SearchPage'));
const BackupPage = lazy(() => import('@/app/pages/BackupPage'));
const SettingsPage = lazy(() => import('@/app/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('@/app/pages/NotFoundPage'));

function LegacyLessonCatalogRedirect() {
  const { locale } = useParams<{ locale: string }>();
  const targetLocale = locale === 'ru' ? 'ru' : 'en';
  return <Navigate to={`/${targetLocale}/structured-lessons`} replace />;
}

const localizedChildren: RouteObject[] = [
  { index: true, element: <DashboardPage />, errorElement: <RouteErrorBoundary /> },
  // Old catalog and standalone HTML lesson URLs now lead to the single text-based curriculum.
  { path: 'courses', element: <LegacyLessonCatalogRedirect /> },
  { path: 'courses/:categoryId', element: <LegacyLessonCatalogRedirect /> },
  { path: 'lessons/:lessonId', element: <LegacyLessonCatalogRedirect /> },
  { path: 'structured-lessons', element: <StructuredCurriculumPage />, errorElement: <RouteErrorBoundary /> },
  { path: 'structured-lessons/:lessonId', element: <StructuredLessonPage />, errorElement: <RouteErrorBoundary /> },
  { path: 'paths', element: <LearningPathsPage />, errorElement: <RouteErrorBoundary /> },
  { path: 'paths/:pathId', element: <LearningPathDetailPage />, errorElement: <RouteErrorBoundary /> },
  { path: 'bookmarks', element: <BookmarksPage />, errorElement: <RouteErrorBoundary /> },
  { path: 'notes', element: <NotesPage />, errorElement: <RouteErrorBoundary /> },
  { path: 'practice', element: <PracticePage />, errorElement: <RouteErrorBoundary /> },
  { path: 'search', element: <SearchPage />, errorElement: <RouteErrorBoundary /> },
  { path: 'backup', element: <BackupPage />, errorElement: <RouteErrorBoundary /> },
  { path: 'settings', element: <SettingsPage />, errorElement: <RouteErrorBoundary /> },
  { path: '*', element: <NotFoundPage /> },
];

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: '/', element: <LegacyPathRedirect /> },
      { path: '/courses', element: <LegacyPathRedirect /> },
      { path: '/structured-lessons', element: <LegacyPathRedirect /> },
      { path: '/courses/:categoryId', element: <LegacyPathRedirect /> },
      { path: '/lessons/:lessonId', element: <LegacyPathRedirect /> },
      { path: '/paths', element: <LegacyPathRedirect /> },
      { path: '/paths/:pathId', element: <LegacyPathRedirect /> },
      { path: '/bookmarks', element: <LegacyPathRedirect /> },
      { path: '/notes', element: <LegacyPathRedirect /> },
      { path: '/practice', element: <LegacyPathRedirect /> },
      { path: '/search', element: <LegacyPathRedirect /> },
      { path: '/backup', element: <LegacyPathRedirect /> },
      { path: '/settings', element: <LegacyPathRedirect /> },
    ],
  },
  {
    path: '/:locale',
    element: <LocalizedAppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: localizedChildren,
  },
]);
