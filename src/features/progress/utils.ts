import type { LessonStatus } from '@/types/common';
import type { LessonProgressEntry, ProgressStats } from './types';

/**
 * Computes completion stats for an arbitrary set of lesson ids (e.g. all lessons
 * in a category, or every lesson in the app). Takes the raw progress map so it
 * has no dependency on the content feature's Lesson type.
 */
export function computeProgressStats(
  progressLessons: Record<string, LessonProgressEntry>,
  lessonIds: readonly string[],
): ProgressStats {
  let completed = 0;
  let inProgress = 0;

  for (const id of lessonIds) {
    const status = progressLessons[id]?.status ?? 'not-started';
    if (status === 'completed') completed += 1;
    else if (status === 'in-progress') inProgress += 1;
  }

  const total = lessonIds.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { completed, inProgress, total, percent };
}

export const STATUS_LABELS: Record<LessonStatus, string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  completed: 'Completed',
};

export const STATUS_BADGE_VARIANTS: Record<LessonStatus, 'neutral' | 'warning' | 'success'> = {
  'not-started': 'neutral',
  'in-progress': 'warning',
  completed: 'success',
};
