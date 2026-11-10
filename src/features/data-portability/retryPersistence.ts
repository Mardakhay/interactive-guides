import { STORAGE_KEYS } from '@/lib/constants';
import { useBookmarkStore } from '@/features/bookmarks/store';
import { useNoteStore } from '@/features/notes/store';
import { useProgressStore } from '@/features/progress';
import { useQuizResultsStore } from '@/features/quizzes/store';
import { saveJSON, clearLastStorageError, reportStorageError } from '@/lib/storage';
import { STRUCTURED_LEARNING_STORAGE_KEY } from '@/features/structured-lesson/schemas';
import { saveStructuredLearningState } from '@/features/structured-lesson/persistence';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';

export interface RetryPersistenceResult {
  readonly success: boolean;
  readonly failedKeys: string[];
}

/**
 * Retries persistence using the current in-memory Zustand snapshots.
 * This is for write failures only; corrupt/unreadable records must not be
 * overwritten automatically by a retry.
 */
export function retryPersistedLearningData(): RetryPersistenceResult {
  const failedKeys: string[] = [];

  const progress = useProgressStore.getState();
  if (!saveJSON(STORAGE_KEYS.PROGRESS, {
    lessons: progress.lessons,
    lastOpenedLessonId: progress.lastOpenedLessonId,
    lastOpenedAt: progress.lastOpenedAt,
  })) failedKeys.push(STORAGE_KEYS.PROGRESS);

  const bookmarks = useBookmarkStore.getState();
  if (!saveJSON(STORAGE_KEYS.BOOKMARKS, { lessons: bookmarks.lessons })) {
    failedKeys.push(STORAGE_KEYS.BOOKMARKS);
  }

  const notes = useNoteStore.getState();
  if (!saveJSON(STORAGE_KEYS.NOTES, { lessons: notes.lessons })) {
    failedKeys.push(STORAGE_KEYS.NOTES);
  }

  const quizResults = useQuizResultsStore.getState();
  if (!saveJSON(STORAGE_KEYS.QUIZ_RESULTS, { quizzes: quizResults.quizzes })) {
    failedKeys.push(STORAGE_KEYS.QUIZ_RESULTS);
  }

  const structured = useStructuredLearningStore.getState();
  try {
    const saved = saveStructuredLearningState({
      quizAttempts: structured.quizAttempts,
      codeDrafts: structured.codeDrafts,
      practiceChecklists: structured.practiceChecklists,
      sectionProgress: structured.sectionProgress,
    });
    if (!saved) failedKeys.push(STRUCTURED_LEARNING_STORAGE_KEY);
  } catch {
    reportStorageError(STRUCTURED_LEARNING_STORAGE_KEY, 'write');
    failedKeys.push(STRUCTURED_LEARNING_STORAGE_KEY);
  }

  const result = { success: failedKeys.length === 0, failedKeys };
  if (result.success) clearLastStorageError();
  return result;
}
