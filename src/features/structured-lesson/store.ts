import { create } from 'zustand';
import { readStructuredLearningState, saveStructuredLearningState } from './persistence';
import {
  type CodeDraft,
  type PracticeChecklist,
  type QuizAttempt,
  type StructuredLearningState,
} from './schemas';

type PersistedState = StructuredLearningState;
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
  setSectionComplete: (lessonId: string, sectionId: string, completed: boolean) => void;
}

function loadInitialState(): PersistedState {
  return readStructuredLearningState().state;
}

function entryKey(lessonId: string, blockId: string): string {
  return `${lessonId}::${blockId}`;
}

function persist(state: PersistedState): void {
  saveStructuredLearningState(state);
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
        sectionProgress: state.sectionProgress,
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
        sectionProgress: state.sectionProgress,
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
        sectionProgress: state.sectionProgress,
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
        sectionProgress: state.sectionProgress,
      };
      persist(next);
      return next;
    });
  },

  setSectionComplete: (lessonId, sectionId, completed) => {
    set((state) => {
      const current = state.sectionProgress[lessonId]?.completedBlockIds ?? [];
      const sectionIds = new Set(current);
      if (completed) sectionIds.add(sectionId);
      else sectionIds.delete(sectionId);

      const next: PersistedState = {
        quizAttempts: state.quizAttempts,
        codeDrafts: state.codeDrafts,
        practiceChecklists: state.practiceChecklists,
        sectionProgress: {
          ...state.sectionProgress,
          [lessonId]: {
            completedBlockIds: [...sectionIds],
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