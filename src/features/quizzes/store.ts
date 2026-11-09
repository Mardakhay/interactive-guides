import { create } from 'zustand';
import { readVersionedJSON, saveVersionedJSON } from '@/lib/versionedStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import { quizResultsStateSchema } from './schemas';
import type { QuizAttempt, QuizResultsState } from './types';

const DEFAULT_STATE: QuizResultsState = {
  quizzes: {},
};

function loadInitialState(): QuizResultsState {
  return readVersionedJSON(STORAGE_KEYS.QUIZ_RESULTS, quizResultsStateSchema, DEFAULT_STATE).data;
}

function persist(state: QuizResultsState): void {
  saveVersionedJSON(STORAGE_KEYS.QUIZ_RESULTS, state, quizResultsStateSchema);
}

interface QuizResultsStore extends QuizResultsState {
  /** Saves (or overwrites, on retry) the attempt for a quiz. */
  saveAttempt: (quizId: string, attempt: QuizAttempt) => void;
  /** Clears a stored attempt, used when the user starts a retry. */
  clearAttempt: (quizId: string) => void;
  /** Non-reactive snapshot read. Prefer a selector inside components. */
  getAttempt: (quizId: string) => QuizAttempt | undefined;
}

export const useQuizResultsStore = create<QuizResultsStore>((set, get) => ({
  ...loadInitialState(),

  saveAttempt: (quizId, attempt) => {
    set((state) => {
      const next: QuizResultsState = {
        quizzes: { ...state.quizzes, [quizId]: attempt },
      };
      persist(next);
      return next;
    });
  },

  clearAttempt: (quizId) => {
    set((state) => {
      if (!state.quizzes[quizId]) return state;
      const { [quizId]: _removed, ...rest } = state.quizzes;
      const next: QuizResultsState = { quizzes: rest };
      persist(next);
      return next;
    });
  },

  getAttempt: (quizId) => get().quizzes[quizId],
}));
