import { useMemo } from 'react';
import { useProgressStore, computeProgressStats } from '@/features/progress';
import type { LessonProgressEntry } from '@/features/progress';
import { useBookmarkStore } from '@/features/bookmarks';
import type { BookmarkEntry } from '@/features/bookmarks';
import { useNoteStore } from '@/features/notes';
import type { NoteEntry } from '@/features/notes';
import { getLearningPaths, getLearningPathLessonIds } from '@/features/learning-paths';
import { learningPathDetailPath } from '@/app/router/routes';
import {
  getStructuredLessonIds,
  getStructuredLessonMetadata,
  type SupportedLocale,
} from '@/content/repository';
import type { ActivityItem, ContinueLearningInfo, DashboardData, RecommendedItem } from '../types';

const RECENT_ACTIVITY_LIMIT = 5;
const RECOMMENDATION_LIMIT = 3;
const NOTE_PREVIEW_LENGTH = 80;

export function useDashboardData(locale: SupportedLocale = 'en'): DashboardData {
  const progressLessons = useProgressStore((s) => s.lessons);
  const lastOpenedLessonId = useProgressStore((s) => s.lastOpenedLessonId);
  const bookmarkLessons = useBookmarkStore((s) => s.lessons);
  const noteLessons = useNoteStore((s) => s.lessons);

  return useMemo(() => {
    const structuredProgress = computeProgressStats(progressLessons, getStructuredLessonIds());
    return {
      completed: structuredProgress.completed,
      inProgress: structuredProgress.inProgress,
      total: structuredProgress.total,
      percent: structuredProgress.percent,
      structuredProgress,
      continueLearning: buildContinueLearning(lastOpenedLessonId, progressLessons, locale),
      recentActivity: buildRecentActivity(bookmarkLessons, noteLessons, locale),
      recommendations: buildRecommendations(progressLessons),
    };
  }, [progressLessons, lastOpenedLessonId, bookmarkLessons, noteLessons, locale]);
}

function buildContinueLearning(
  lastOpenedLessonId: string | null,
  progressLessons: Record<string, LessonProgressEntry>,
  locale: SupportedLocale,
): ContinueLearningInfo | null {
  if (!lastOpenedLessonId) return null;
  const lesson = getStructuredLessonMetadata(lastOpenedLessonId, locale);
  if (!lesson) return null;

  return {
    kind: 'structured',
    href: `/${locale}/structured-lessons/${lesson.id}`,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    categoryId: 'structured-curriculum',
    categoryName: locale === 'ru' ? 'Структурированная программа' : 'Structured curriculum',
    categoryIcon: 'book-open',
    status: progressLessons[lesson.id]?.status ?? 'not-started',
  };
}

function buildRecentActivity(
  bookmarkLessons: Record<string, BookmarkEntry>,
  noteLessons: Record<string, NoteEntry>,
  locale: SupportedLocale,
): ActivityItem[] {
  const items: ActivityItem[] = [];

  // Old local records are deliberately retained in storage but are not presented as active lessons.
  for (const [lessonId, entry] of Object.entries(bookmarkLessons)) {
    const lesson = getStructuredLessonMetadata(lessonId, locale);
    if (!lesson) continue;
    items.push({
      kind: 'bookmark',
      lessonId,
      lessonTitle: lesson.title,
      href: `/${locale}/structured-lessons/${lesson.id}`,
      categoryName: locale === 'ru' ? 'Структурированная программа' : 'Structured curriculum',
      categoryId: 'structured-curriculum',
      timestamp: entry.createdAt,
    });
  }

  for (const [lessonId, entry] of Object.entries(noteLessons)) {
    const lesson = getStructuredLessonMetadata(lessonId, locale);
    if (!lesson) continue;
    items.push({
      kind: 'note',
      lessonId,
      lessonTitle: lesson.title,
      href: `/${locale}/structured-lessons/${lesson.id}`,
      categoryName: locale === 'ru' ? 'Структурированная программа' : 'Structured curriculum',
      categoryId: 'structured-curriculum',
      timestamp: entry.updatedAt,
      notePreview: entry.content.length > NOTE_PREVIEW_LENGTH
        ? `${entry.content.slice(0, NOTE_PREVIEW_LENGTH)}…`
        : entry.content,
    });
  }

  return items
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, RECENT_ACTIVITY_LIMIT);
}

/** Recommendations include only learning paths whose every step is a structured text lesson. */
export function buildRecommendations(progressLessons: Record<string, LessonProgressEntry>): RecommendedItem[] {
  const pathsWithStats = getLearningPaths().map((path) => ({
    path,
    stats: computeProgressStats(progressLessons, getLearningPathLessonIds(path.id)),
  }));
  const inProgressPath = pathsWithStats.find((item) =>
    item.stats.completed > 0 && item.stats.completed < item.stats.total,
  );

  if (inProgressPath) {
    return [{
      kind: 'continue-path',
      id: inProgressPath.path.id,
      title: inProgressPath.path.title,
      description: `${inProgressPath.stats.percent}% complete`,
      href: learningPathDetailPath(inProgressPath.path.id),
      percent: inProgressPath.stats.percent,
    }];
  }

  return pathsWithStats
    .filter((item) => item.stats.completed === 0)
    .sort((a, b) => a.path.estimatedHours - b.path.estimatedHours)
    .slice(0, RECOMMENDATION_LIMIT)
    .map(({ path, stats }) => ({
      kind: 'start-path',
      id: path.id,
      title: path.title,
      description: `${path.estimatedHours}h · ${stats.total} lessons`,
      href: learningPathDetailPath(path.id),
      percent: 0,
    }));
}
