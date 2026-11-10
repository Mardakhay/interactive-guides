import { create } from 'zustand';
import { loadJSON, saveJSON } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';
import type { LessonStatus } from '@/types/common';
import { progressStateSchema } from './schemas';
import type { LessonProgressEntry, ProgressState } from './types';

const DEFAULT_STATE: ProgressState = {
  lessons: {},
  lastOpenedLessonId: null,
  lastOpenedAt: null,
};

function loadInitialState(): ProgressState {
  const raw = loadJSON<ProgressState>(STORAGE_KEYS.PROGRESS, DEFAULT_STATE);
  const parsed = progressStateSchema.safeParse(raw);
  return parsed.success ? parsed.data : DEFAULT_STATE;
}

function persist(state: ProgressState): void {
  saveJSON(STORAGE_KEYS.PROGRESS, state);
}

interface ProgressStore extends ProgressState {
  /** Marks a lesson as opened. Starts it (in-progress) if it has no status yet. */
  markLessonOpened: (lessonId: string) => void;
  markLessonCompleted: (lessonId: string) => void;
  markLessonIncomplete: (lessonId: string) => void;
  /** Non-reactive snapshot read. Prefer a selector (e.g. `useProgressStore(s => s.lessons[id])`) inside components. */
  getLessonStatus: (lessonId: string) => LessonStatus;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...loadInitialState(),

  markLessonOpened: (lessonId) => {
    set((state) => {
      const now = new Date().toISOString();
      const existing = state.lessons[lessonId];
      const entry: LessonProgressEntry =
        existing ?? { status: 'in-progress', startedAt: now, completedAt: null };

      const next: ProgressState = {
        lessons: existing ? state.lessons : { ...state.lessons, [lessonId]: entry },
        lastOpenedLessonId: lessonId,
        lastOpenedAt: now,
      };
      persist(next);
      return next;
    });
  },

  markLessonCompleted: (lessonId) => {
    set((state) => {
      const now = new Date().toISOString();
      const existing = state.lessons[lessonId];
      const entry: LessonProgressEntry = {
        status: 'completed',
        startedAt: existing?.startedAt ?? now,
        completedAt: now,
      };
      const next: ProgressState = {
        ...state,
        lessons: { ...state.lessons, [lessonId]: entry },
      };
      persist(next);
      return next;
    });
  },

  markLessonIncomplete: (lessonId) => {
    set((state) => {
      const existing = state.lessons[lessonId];
      const entry: LessonProgressEntry = {
        status: 'in-progress',
        startedAt: existing?.startedAt ?? new Date().toISOString(),
        completedAt: null,
      };
      const next: ProgressState = {
        ...state,
        lessons: { ...state.lessons, [lessonId]: entry },
      };
      persist(next);
      return next;
    });
  },

  getLessonStatus: (lessonId) => get().lessons[lessonId]?.status ?? 'not-started',
}));
