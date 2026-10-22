import { afterEach, describe, expect, it } from 'vitest';
import { STORAGE_KEYS } from '@/lib/constants';
import { STRUCTURED_LEARNING_STORAGE_KEY } from '@/features/structured-lesson/schemas';
import {
  createLearningDataBackup,
  mergeLearningDataBackup,
  parseLearningDataBackup,
} from './backup';

afterEach(() => {
  localStorage.clear();
});

describe('learning data backups', () => {
  it('exports a versioned backup containing current local learning data', () => {
    localStorage.setItem(
      STORAGE_KEYS.PROGRESS,
      JSON.stringify({
        lessons: {
          'html.document-structure': {
            status: 'completed',
            startedAt: '2026-10-20T10:00:00.000Z',
            completedAt: '2026-10-20T11:00:00.000Z',
          },
        },
        lastOpenedLessonId: 'html.document-structure',
        lastOpenedAt: '2026-10-20T11:00:00.000Z',
      }),
    );

    const backup = createLearningDataBackup(localStorage, '2026-10-22T09:00:00.000Z');

    expect(backup.format).toBe('interactive-guides-local-data');
    expect(backup.version).toBe(1);
    expect(backup.data.progress.lessons['html.document-structure']?.status).toBe('completed');
    expect(backup.data.structuredLearning.quizAttempts).toEqual({});
  });

  it('rejects malformed JSON and unsupported backup versions', () => {
    expect(() => parseLearningDataBackup('{not json')).toThrow('valid JSON');

    const backup = createLearningDataBackup(new MemoryStorage(), '2026-10-22T09:00:00.000Z');
    expect(() =>
      parseLearningDataBackup(JSON.stringify({ ...backup, version: 99 })),
    ).toThrow('unsupported format');
  });

  it('merges progress and bookmarks without removing local records', () => {
    localStorage.setItem(
      STORAGE_KEYS.PROGRESS,
      JSON.stringify({
        lessons: {
          'html.document-structure': {
            status: 'in-progress',
            startedAt: '2026-10-21T10:00:00.000Z',
            completedAt: null,
          },
        },
        lastOpenedLessonId: 'html.document-structure',
        lastOpenedAt: '2026-10-21T10:00:00.000Z',
      }),
    );
    localStorage.setItem(
      STORAGE_KEYS.BOOKMARKS,
      JSON.stringify({ lessons: { 'existing.lesson': { createdAt: '2026-10-20T10:00:00.000Z' } } }),
    );

    const imported = createLearningDataBackup(localStorage, '2026-10-22T08:00:00.000Z');
    imported.data.bookmarks.lessons['new.lesson'] = { createdAt: '2026-10-22T08:00:00.000Z' };
    imported.data.progress.lessons['html.document-structure'] = {
      status: 'completed',
      startedAt: '2026-10-19T10:00:00.000Z',
      completedAt: '2026-10-22T08:00:00.000Z',
    };

    const result = mergeLearningDataBackup(localStorage, imported);

    expect(result.data.progress.lessons['html.document-structure']?.status).toBe('completed');
    expect(result.data.progress.lessons['html.document-structure']?.startedAt).toBe('2026-10-19T10:00:00.000Z');
    expect(Object.keys(result.data.bookmarks.lessons).sort()).toEqual(['existing.lesson', 'new.lesson']);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) ?? '{}').lessons['html.document-structure'].status).toBe('completed');
  });

  it('keeps the newest note and combines structured quiz history without duplicates', () => {
    localStorage.setItem(
      STORAGE_KEYS.NOTES,
      JSON.stringify({
        lessons: { 'html.document-structure': { content: 'Current note', updatedAt: '2026-10-22T08:00:00.000Z' } },
      }),
    );
    localStorage.setItem(
      STRUCTURED_LEARNING_STORAGE_KEY,
      JSON.stringify({
        quizAttempts: {
          'html.document-structure::knowledge-check-1': [
            { selectedOptionIds: ['a'], isCorrect: true, submittedAt: '2026-10-21T08:00:00.000Z' },
          ],
        },
        codeDrafts: {},
        practiceChecklists: {},
      }),
    );

    const imported = createLearningDataBackup(localStorage, '2026-10-22T09:00:00.000Z');
    imported.data.notes.lessons['html.document-structure'] = {
      content: 'Newer imported note',
      updatedAt: '2026-10-22T09:00:00.000Z',
    };
    imported.data.structuredLearning.quizAttempts['html.document-structure::knowledge-check-1'] = [
      { selectedOptionIds: ['a'], isCorrect: true, submittedAt: '2026-10-21T08:00:00.000Z' },
      { selectedOptionIds: ['b'], isCorrect: false, submittedAt: '2026-10-22T09:00:00.000Z' },
    ];

    const result = mergeLearningDataBackup(localStorage, imported);

    expect(result.data.notes.lessons['html.document-structure']?.content).toBe('Newer imported note');
    expect(result.data.structuredLearning.quizAttempts['html.document-structure::knowledge-check-1']).toHaveLength(2);
  });

  it('does not change malformed local data while validating an import', () => {
    localStorage.setItem(STORAGE_KEYS.NOTES, '{broken');

    const backup = createLearningDataBackup(new MemoryStorage(), '2026-10-22T09:00:00.000Z');
    expect(() => mergeLearningDataBackup(localStorage, backup)).toThrow('could not be read');
    expect(localStorage.getItem(STORAGE_KEYS.NOTES)).toBe('{broken');
  });

  it('attempts to restore previous records if a storage write fails', () => {
    const storage = new FailingStorage(STORAGE_KEYS.NOTES);
    storage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify({
      lessons: {},
      lastOpenedLessonId: null,
      lastOpenedAt: null,
    }));
    const beforeProgress = storage.getItem(STORAGE_KEYS.PROGRESS);
    const backup = createLearningDataBackup(new MemoryStorage(), '2026-10-22T09:00:00.000Z');

    expect(() => mergeLearningDataBackup(storage, backup)).toThrow('storage is unavailable or full');
    expect(storage.getItem(STORAGE_KEYS.PROGRESS)).toBe(beforeProgress);
    expect(storage.getItem(STORAGE_KEYS.NOTES)).toBeNull();
  });
});

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();
  get length(): number { return this.values.size; }
  clear(): void { this.values.clear(); }
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  key(index: number): string | null { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string): void { this.values.delete(key); }
  setItem(key: string, value: string): void { this.values.set(key, value); }
}

class FailingStorage extends MemoryStorage {
  constructor(private readonly failingKey: string) { super(); }
  override setItem(key: string, value: string): void {
    if (key === this.failingKey) throw new Error('Quota exceeded');
    super.setItem(key, value);
  }
}
