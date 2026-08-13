import { useMemo } from 'react';
import {
  getLessons,
  getLessonById,
  getCategoryById,
  getCategories,
  getLessonsByCategory,
} from '@/features/content';
import type { Lesson } from '@/features/content';
import { useProgressStore, computeProgressStats } from '@/features/progress';
import type { LessonProgressEntry } from '@/features/progress';
import { useBookmarkStore } from '@/features/bookmarks';
import type { BookmarkEntry } from '@/features/bookmarks';
import { useNoteStore } from '@/features/notes';
import type { NoteEntry } from '@/features/notes';
import { getLearningPaths, getLearningPathLessonIds } from '@/features/learning-paths';
import { coursePath, learningPathDetailPath } from '@/app/router/routes';
import type { ActivityItem, ContinueLearningInfo, DashboardData, RecommendedItem } from '../types';

const RECENT_ACTIVITY_LIMIT = 5;
const RECOMMENDATION_LIMIT = 3;
const NOTE_PREVIEW_LENGTH = 80;

export function useDashboardData(): DashboardData {
  const progressLessons = useProgressStore((s) => s.lessons);
  const lastOpenedLessonId = useProgressStore((s) => s.lastOpenedLessonId);
  const bookmarkLessons = useBookmarkStore((s) => s.lessons);
  const noteLessons = useNoteStore((s) => s.lessons);

  return useMemo(() => {
    const allLessonIds = getLessons().map((l) => l.id);
    const stats = computeProgressStats(progressLessons, allLessonIds);

    return {
      completed: stats.completed,
      inProgress: stats.inProgress,
      total: stats.total,
      percent: stats.percent,
      continueLearning: buildContinueLearning(lastOpenedLessonId, progressLessons),
      recentActivity: buildRecentActivity(bookmarkLessons, noteLessons),
      recommendations: buildRecommendations(progressLessons),
    };
  }, [progressLessons, lastOpenedLessonId, bookmarkLessons, noteLessons]);
}

function buildContinueLearning(
  lastOpenedLessonId: string | null,
  progressLessons: Record<string, LessonProgressEntry>,
): ContinueLearningInfo | null {
  const lesson = lastOpenedLessonId ? getLessonById(lastOpenedLessonId) : undefined;
  if (!lesson) return null;

  const category = getCategoryById(lesson.categoryId);
  if (!category) return null;

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    categoryId: category.id,
    categoryName: category.name,
    categoryIcon: category.icon,
    status: progressLessons[lesson.id]?.status ?? 'not-started',
  };
}

function buildRecentActivity(
  bookmarkLessons: Record<string, BookmarkEntry>,
  noteLessons: Record<string, NoteEntry>,
): ActivityItem[] {
  const items: ActivityItem[] = [];

  for (const [lessonId, entry] of Object.entries(bookmarkLessons)) {
    const lesson = getLessonById(lessonId);
    if (!lesson) continue;
    items.push({
      kind: 'bookmark',
      lessonId,
      lessonTitle: lesson.title,
      categoryName: getCategoryById(lesson.categoryId)?.name ?? '',
      timestamp: entry.createdAt,
    });
  }

  for (const [lessonId, entry] of Object.entries(noteLessons)) {
    const lesson = getLessonById(lessonId);
    if (!lesson) continue;
    items.push({
      kind: 'note',
      lessonId,
      lessonTitle: lesson.title,
      categoryName: getCategoryById(lesson.categoryId)?.name ?? '',
      timestamp: entry.updatedAt,
      notePreview:
        entry.content.length > NOTE_PREVIEW_LENGTH
          ? `${entry.content.slice(0, NOTE_PREVIEW_LENGTH)}…`
          : entry.content,
    });
  }

  return items
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, RECENT_ACTIVITY_LIMIT);
}

/**
 * Recommendation priority:
 * 1. A learning path already in progress (continue it).
 * 2. Otherwise, the not-yet-started path with the smallest time commitment.
 * 3. Started-but-incomplete categories, ordered by lowest completion first.
 * 4. Not-yet-started categories, to fill remaining recommendation slots.
 */
export function buildRecommendations(progressLessons: Record<string, LessonProgressEntry>): RecommendedItem[] {
  const recommendations: RecommendedItem[] = [];

  const pathsWithStats = getLearningPaths().map((path) => ({
    path,
    stats: computeProgressStats(progressLessons, getLearningPathLessonIds(path.id)),
  }));

  const inProgressPath = pathsWithStats.find((p) => p.stats.completed > 0 && p.stats.completed < p.stats.total);

  if (inProgressPath) {
    recommendations.push({
      kind: 'continue-path',
      id: inProgressPath.path.id,
      title: inProgressPath.path.title,
      description: `${inProgressPath.stats.percent}% complete`,
      href: learningPathDetailPath(inProgressPath.path.id),
      percent: inProgressPath.stats.percent,
    });
  } else {
    const nextPath = pathsWithStats
      .filter((p) => p.stats.completed === 0)
      .sort((a, b) => a.path.estimatedHours - b.path.estimatedHours)[0];

    if (nextPath) {
      recommendations.push({
        kind: 'start-path',
        id: nextPath.path.id,
        title: nextPath.path.title,
        description: `${nextPath.path.estimatedHours}h · ${nextPath.stats.total} lessons`,
        href: learningPathDetailPath(nextPath.path.id),
        percent: 0,
      });
    }
  }

  const categoryStats = getCategories().map((category) => ({
    category,
    stats: computeProgressStats(
      progressLessons,
      getLessonsByCategory(category.id).map((l: Lesson) => l.id),
    ),
  }));

  const startedCategories = categoryStats
    .filter((c) => c.stats.completed > 0 && c.stats.completed < c.stats.total)
    .sort((a, b) => a.stats.percent - b.stats.percent);

  for (const { category, stats } of startedCategories) {
    if (recommendations.length >= RECOMMENDATION_LIMIT) break;
    recommendations.push({
      kind: 'continue-category',
      id: category.id,
      title: category.name,
      description: `${stats.percent}% complete`,
      href: coursePath(category.id),
      percent: stats.percent,
    });
  }

  if (recommendations.length < RECOMMENDATION_LIMIT) {
    const notStartedCategories = categoryStats.filter((c) => c.stats.completed === 0 && c.stats.total > 0);
    for (const { category, stats } of notStartedCategories) {
      if (recommendations.length >= RECOMMENDATION_LIMIT) break;
      recommendations.push({
        kind: 'start-category',
        id: category.id,
        title: category.name,
        description: `${stats.total} lessons · Not started`,
        href: coursePath(category.id),
        percent: 0,
      });
    }
  }

  return recommendations.slice(0, RECOMMENDATION_LIMIT);
}
