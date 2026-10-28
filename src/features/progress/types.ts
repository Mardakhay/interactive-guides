import type { LessonStatus } from '@/types/common';

export interface LessonProgressEntry {
  readonly status: LessonStatus;
  readonly startedAt: string | null;
  readonly completedAt: string | null;
}

export interface ProgressState {
  readonly lessons: Record<string, LessonProgressEntry>;
  readonly lastOpenedLessonId: string | null;
  readonly lastOpenedAt: string | null;
}

export interface ProgressStats {
  readonly completed: number;
  readonly inProgress: number;
  readonly total: number;
  readonly percent: number;
}
