import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { STORAGE_KEYS } from '@/lib/constants';
import { clearLastStorageError } from '@/lib/storage';
import { useBookmarkStore } from '@/features/bookmarks/store';
import { useNoteStore } from '@/features/notes/store';
import { useProgressStore } from '@/features/progress/store';
import { useQuizResultsStore } from '@/features/quizzes/store';
import { LOCAL_STORE_FORMAT, LOCAL_STORE_SCHEMA_VERSION } from '@/lib/versionedStorage';

interface StoredEnvelope<T> {
  readonly format: string;
  readonly schemaVersion: number;
  readonly data: T;
}

function readEnvelope<T>(key: string): StoredEnvelope<T> {
  const raw = localStorage.getItem(key);
  if (raw === null) throw new Error(`Expected ${key} to be persisted`);
  return JSON.parse(raw) as StoredEnvelope<T>;
}

function resetStores(): void {
  useProgressStore.setState({ lessons: {}, lastOpenedLessonId: null, lastOpenedAt: null });
  useBookmarkStore.setState({ lessons: {} });
  useNoteStore.setState({ lessons: {} });
  useQuizResultsStore.setState({ quizzes: {} });
}

beforeEach(() => {
  localStorage.clear();
  clearLastStorageError();
  resetStores();
});

afterEach(() => {
  resetStores();
  localStorage.clear();
  clearLastStorageError();
});

describe('learner stores persist versioned records', () => {
  it('persists progress actions through a schema-v1 envelope', () => {
    const store = useProgressStore.getState();
    store.markLessonOpened('html-semantic-structure');
    store.markLessonCompleted('html-semantic-structure');
    const record = readEnvelope<typeof store extends never ? never : { lessons: Record<string, { status: string; startedAt: string | null; completedAt: string | null }>; lastOpenedLessonId: string | null; lastOpenedAt: string | null }>(STORAGE_KEYS.PROGRESS);
    expect(record.format).toBe(LOCAL_STORE_FORMAT);
    expect(record.schemaVersion).toBe(LOCAL_STORE_SCHEMA_VERSION);
    expect(record.data.lessons['html-semantic-structure'].status).toBe('completed');
    expect(record.data.lastOpenedLessonId).toBe('html-semantic-structure');
  });

  it('persists bookmark add/toggle actions without duplicate records', () => {
    useBookmarkStore.getState().addBookmark('html-semantic-structure');
    useBookmarkStore.getState().addBookmark('html-semantic-structure');
    expect(useBookmarkStore.getState().isBookmarked('html-semantic-structure')).toBe(true);
    let record = readEnvelope<{ lessons: Record<string, { createdAt: string }> }>(STORAGE_KEYS.BOOKMARKS);
    expect(Object.keys(record.data.lessons)).toEqual(['html-semantic-structure']);
    useBookmarkStore.getState().toggleBookmark('html-semantic-structure');
    record = readEnvelope<{ lessons: Record<string, { createdAt: string }> }>(STORAGE_KEYS.BOOKMARKS);
    expect(record.data.lessons).toEqual({});
  });

  it('persists note edits and deletes blank notes', () => {
    useNoteStore.getState().setNote('html-semantic-structure', 'Keep semantic meaning in markup');
    let record = readEnvelope<{ lessons: Record<string, { content: string; updatedAt: string }> }>(STORAGE_KEYS.NOTES);
    expect(record.data.lessons['html-semantic-structure'].content).toBe('Keep semantic meaning in markup');
    useNoteStore.getState().setNote('html-semantic-structure', '   ');
    record = readEnvelope<{ lessons: Record<string, { content: string; updatedAt: string }> }>(STORAGE_KEYS.NOTES);
    expect(record.data.lessons).toEqual({});
  });

  it('persists quiz results in the versioned envelope', () => {
    useQuizResultsStore.getState().saveAttempt('html-basic-quiz', {
      answers: { q1: 2 },
      score: 1,
      total: 1,
      completedAt: '2026-10-27T10:00:00.000Z',
    });
    const record = readEnvelope<{ quizzes: Record<string, { answers: Record<string, number>; score: number; total: number; completedAt: string }> }>(STORAGE_KEYS.QUIZ_RESULTS);
    expect(record.format).toBe(LOCAL_STORE_FORMAT);
    expect(record.schemaVersion).toBe(LOCAL_STORE_SCHEMA_VERSION);
    expect(record.data.quizzes['html-basic-quiz'].score).toBe(1);
    useQuizResultsStore.getState().clearAttempt('html-basic-quiz');
    expect(readEnvelope<{ quizzes: Record<string, unknown> }>(STORAGE_KEYS.QUIZ_RESULTS).data.quizzes).toEqual({});
  });
});
