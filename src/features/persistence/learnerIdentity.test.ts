import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useBookmarkStore } from '@/features/bookmarks/store';
import { useNoteStore } from '@/features/notes/store';
import { useProgressStore } from '@/features/progress/store';
import { useQuizResultsStore } from '@/features/quizzes/store';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';
import { STORAGE_KEYS } from '@/lib/constants';
import { clearLastStorageError } from '@/lib/storage';
import { STRUCTURED_LEARNING_STORAGE_KEY } from '@/features/structured-lesson/schemas';

const classicId = 'tl-004';
const structuredId = 'deployment.production-hosting';

function resetStores() {
  useProgressStore.setState({ lessons: {}, lastOpenedLessonId: null, lastOpenedAt: null });
  useBookmarkStore.setState({ lessons: {} });
  useNoteStore.setState({ lessons: {} });
  useQuizResultsStore.setState({ quizzes: {} });
  useStructuredLearningStore.setState({
    quizAttempts: {},
    codeDrafts: {},
    practiceChecklists: {},
    sectionProgress: {},
  });
}

function readRecord<T>(key: string): { data: T } {
  const raw = localStorage.getItem(key);
  if (raw === null) throw new Error(`Expected persisted record ${key}`);
  return JSON.parse(raw) as { data: T };
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

describe('learner state keeps classic and structured identities separate', () => {
  it('keeps progress under each original lesson ID without fanning out completion', () => {
    useProgressStore.getState().markLessonCompleted(classicId);
    useProgressStore.getState().markLessonOpened(structuredId);

    expect(useProgressStore.getState().getLessonStatus(classicId)).toBe('completed');
    expect(useProgressStore.getState().getLessonStatus(structuredId)).toBe('in-progress');
    expect(Object.keys(useProgressStore.getState().lessons).sort()).toEqual([classicId, structuredId].sort());

    const record = readRecord<{ lessons: Record<string, { status: string }> }>(STORAGE_KEYS.PROGRESS);
    expect(record.data.lessons[classicId]?.status).toBe('completed');
    expect(record.data.lessons[structuredId]?.status).toBe('in-progress');
  });

  it('keeps bookmarks and notes attached to their own lesson IDs', () => {
    useBookmarkStore.getState().addBookmark(classicId);
    useBookmarkStore.getState().addBookmark(structuredId);
    useNoteStore.getState().setNote(classicId, 'Note from the original deployment lesson');
    useNoteStore.getState().setNote(structuredId, 'Note from the structured deployment lesson');

    const bookmarks = readRecord<{ lessons: Record<string, { createdAt: string }> }>(STORAGE_KEYS.BOOKMARKS);
    const notes = readRecord<{ lessons: Record<string, { content: string; updatedAt: string }> }>(STORAGE_KEYS.NOTES);

    expect(Object.keys(bookmarks.data.lessons).sort()).toEqual([classicId, structuredId].sort());
    expect(notes.data.lessons[classicId]?.content).toBe('Note from the original deployment lesson');
    expect(notes.data.lessons[structuredId]?.content).toBe('Note from the structured deployment lesson');
  });

  it('does not conflate quiz-ID results with structured lesson/block attempts', () => {
    const catalogQuizId = 'tl-004-final-assessment';
    useQuizResultsStore.getState().saveAttempt(catalogQuizId, {
      answers: { q1: 2 },
      score: 1,
      total: 1,
      completedAt: '2026-10-29T08:00:00.000Z',
    });
    useStructuredLearningStore.getState().recordQuizAttempt(
      structuredId,
      'deploy-rollback-check',
      ['restore-known-good'],
      true,
    );

    const catalogResults = readRecord<{ quizzes: Record<string, { answers: Record<string, number>; score: number }> }>(
      STORAGE_KEYS.QUIZ_RESULTS,
    );
    const structuredRaw = localStorage.getItem(STRUCTURED_LEARNING_STORAGE_KEY);
    if (structuredRaw === null) throw new Error('Expected structured learning record');
    const structured = JSON.parse(structuredRaw) as {
      schemaVersion: number;
      data: { quizAttempts: Record<string, Array<{ selectedOptionIds: string[]; isCorrect: boolean }>> };
    };

    expect(catalogResults.data.quizzes[catalogQuizId]?.score).toBe(1);
    expect(structured.schemaVersion).toBe(2);
    expect(structured.data.quizAttempts[`${structuredId}::deploy-rollback-check`]?.[0]).toMatchObject({
      selectedOptionIds: ['restore-known-good'],
      isCorrect: true,
    });
    expect(catalogResults.data.quizzes).not.toHaveProperty(`${structuredId}::deploy-rollback-check`);
  });
});
