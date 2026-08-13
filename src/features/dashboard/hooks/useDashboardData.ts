import { useMemo } from 'react';
import { getLessons, getLessonById, getCategoryById } from '@/features/content';
import { useProgressStore, computeProgressStats } from '@/features/progress';
import { useBookmarkStore } from '@/features/bookmarks';
import { useNoteStore } from '@/features/notes';
import { buildRecommendations } from '../lib';
import type {
  DashboardData,
  DashboardActivityItem,
  DashboardContinueLearning,
} from '../types';

const MAX_ACTIVITY_ITEMS = 5;

export function useDashboardData(): DashboardData {
  const allLessonIds = useMemo(() => getLessons().map((l) => l.id), []);
  const progressLessons = useProgressStore((s) => s.lessons);
  const lastOpenedLessonId = useProgressStore((s) => s.lastOpenedLessonId);
  const bookmarkLessons = useBookmarkStore((s) => s.lessons);
  const noteLessons = useNoteStore((s) => s.lessons);

  const progress = useMemo(
    () => computeProgressStats(progressLessons, allLessonIds),
    [progressLessons, allLessonIds],
  );

  const continueLearning = useMemo<DashboardContinueLearning | null>(() => {
    if (!lastOpenedLessonId) return null;
    const lesson = getLessonById(lastOpenedLessonId);
    if (!lesson) return null;
    const category = getCategoryById(lesson.categoryId);
    const status = progressLessons[lesson.id]?.status ?? 'not-started';
    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      categoryId: lesson.categoryId,
      categoryName: category?.name ?? '',
      categoryIcon: category?.icon ?? 'compass',
      status,
    };
  }, [lastOpenedLessonId, progressLessons]);

  const activity = useMemo<DashboardActivityItem[]>(() => {
    const items: DashboardActivityItem[] = [];

    for (const [lessonId, entry] of Object.entries(bookmarkLessons)) {
      const lesson = getLessonById(lessonId);
      if (!lesson) continue;
      const category = getCategoryById(lesson.categoryId);
      items.push({
        kind: 'bookmark',
        lessonId,
        lessonTitle: lesson.title,
        categoryId: lesson.categoryId,
        categoryName: category?.name ?? '',
        timestamp: entry.createdAt,
      });
    }

    for (const [lessonId, entry] of Object.entries(noteLessons)) {
      const lesson = getLessonById(lessonId);
      if (!lesson) continue;
      const category = getCategoryById(lesson.categoryId);
      items.push({
        kind: 'note',
        lessonId,
        lessonTitle: lesson.title,
        categoryId: lesson.categoryId,
        categoryName: category?.name ?? '',
        timestamp: entry.updatedAt,
        preview: entry.content.slice(0, 120),
      });
    }

    return items.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, MAX_ACTIVITY_ITEMS);
  }, [bookmarkLessons, noteLessons]);

  const recommendations = useMemo(
    () => buildRecommendations(progressLessons),
    [progressLessons],
  );

  return { progress, continueLearning, activity, recommendations };
}
