import { create } from 'zustand';
import { z } from 'zod';
import { loadJSON, saveJSON } from '@/lib/storage';

const STORAGE_KEY = 'interactive-guides:structured-learning:v1';

const quizAttemptSchema = z.object({
  selectedOptionIds: z.array(z.string()),
  isCorrect: z.boolean(),
  submittedAt: z.string(),
});

const codeDraftSchema = z.object({
  code: z.string(),
  updatedAt: z.string(),
});

const practiceChecklistSchema = z.object({
  checkedCriteria: z.array(z.number().int().nonnegative()),
  updatedAt: z.string(),
});

const persistedStateSchema = z.object({
  quizAttempts: z.record(z.string(), z.array(quizAttemptSchema)),
  codeDrafts: z.record(z.string(), codeDraftSchema),
  practiceChecklists: z.record(z.string(), practiceChecklistSchema),
});

type QuizAttempt = z.infer<typeof quizAttemptSchema>;
type CodeDraft = z.infer<typeof codeDraftSchema>;
type PracticeChecklist = z.infer<typeof practiceChecklistSchema>;
type PersistedState = z.infer<typeof persistedStateSchema>;

interface StructuredLearningStore extends PersistedState {
  recordQuizAttempt: (
    lessonId: string,
    blockId: string,
    selectedOptionIds: string[],
    isCorrect: boolean,
  ) => void;
  saveCodeDraft: (lessonId: string, blockId: string, code: string) => void;
  resetCodeDraft: (lessonId: string, blockId: string) => void;
  setPracticeCriterion: (
    lessonId: string,
    blockId: string,
    criterionIndex: number,
    checked: boolean,
  ) => void;
}

const EMPTY_STATE: PersistedState = {
  quizAttempts: {},
  codeDrafts: {},
  practiceChecklists: {},
};

function loadInitialState(): PersistedState {
  const raw = loadJSON<PersistedState>(STORAGE_KEY, EMPTY_STATE);
  const parsed = persistedStateSchema.safeParse(raw);
  return parsed.success ? parsed.data : EMPTY_STATE;
}

function entryKey(lessonId: string, blockId: string): string {
  return `${lessonId}::${blockId}`;
}

function persist(state: PersistedState): void {
  saveJSON(STORAGE_KEY, state);
}

export const useStructuredLearningStore = create<StructuredLearningStore>((set) => ({
  ...loadInitialState(),

  recordQuizAttempt: (lessonId, blockId, selectedOptionIds, isCorrect) => {
    set((state) => {
      const key = entryKey(lessonId, blockId);
      const current = state.quizAttempts[key] ?? [];
      const newAttempt: QuizAttempt = {
        selectedOptionIds: [...selectedOptionIds],
        isCorrect,
        submittedAt: new Date().toISOString(),
      };
      const next: PersistedState = {
        quizAttempts: {
          ...state.quizAttempts,
          [key]: [newAttempt, ...current].slice(0, 100),
        },
        codeDrafts: state.codeDrafts,
        practiceChecklists: state.practiceChecklists,
      };
      persist(next);
      return next;
    });
  },

  saveCodeDraft: (lessonId, blockId, code) => {
    set((state) => {
      const key = entryKey(lessonId, blockId);
      const next: PersistedState = {
        quizAttempts: state.quizAttempts,
        codeDrafts: {
          ...state.codeDrafts,
          [key]: { code, updatedAt: new Date().toISOString() },
        },
        practiceChecklists: state.practiceChecklists,
      };
      persist(next);
      return next;
    });
  },

  resetCodeDraft: (lessonId, blockId) => {
    set((state) => {
      const key = entryKey(lessonId, blockId);
      const codeDrafts = { ...state.codeDrafts };
      delete codeDrafts[key];
      const next: PersistedState = {
        quizAttempts: state.quizAttempts,
        codeDrafts,
        practiceChecklists: state.practiceChecklists,
      };
      persist(next);
      return next;
    });
  },

  setPracticeCriterion: (lessonId, blockId, criterionIndex, checked) => {
    set((state) => {
      const key = entryKey(lessonId, blockId);
      const current = state.practiceChecklists[key]?.checkedCriteria ?? [];
      const criteria = new Set(current);
      if (checked) criteria.add(criterionIndex);
      else criteria.delete(criterionIndex);
      const next: PersistedState = {
        quizAttempts: state.quizAttempts,
        codeDrafts: state.codeDrafts,
        practiceChecklists: {
          ...state.practiceChecklists,
          [key]: {
            checkedCriteria: [...criteria].sort((a, b) => a - b),
            updatedAt: new Date().toISOString(),
          },
        },
      };
      persist(next);
      return next;
    });
  },
}));

export type { CodeDraft, PracticeChecklist, QuizAttempt };
