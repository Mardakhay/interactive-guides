import { afterEach, describe, expect, it } from 'vitest';
import { STORAGE_KEYS } from '@/lib/constants';
import { clearLastStorageError } from '@/lib/storage';
import { BACKUP_FORMAT, BACKUP_SCHEMA_VERSION, BackupError, createLocalBackup, getBackupSummary, parseBackup, restoreLocalBackup, serializeBackup } from './backup';
import { LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, STRUCTURED_LEARNING_STORAGE_KEY } from '@/features/structured-lesson/schemas';
import { createLocalStoreRecord, LOCAL_STORE_FORMAT } from '@/lib/versionedStorage';

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length(): number { return this.values.size; }
  clear(): void { this.values.clear(); }
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  key(index: number): string | null { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string): void { this.values.delete(key); }
  setItem(key: string, value: string): void { this.values.set(key, value); }
}

class FailOnceStorage extends MemoryStorage {
  private failKey: string | null = null;
  failNextWrite(key: string): void { this.failKey = key; }
  override setItem(key: string, value: string): void {
    if (this.failKey === key) { this.failKey = null; throw new DOMException('Quota exceeded', 'QuotaExceededError'); }
    super.setItem(key, value);
  }
}

afterEach(() => clearLastStorageError());

function createPopulatedStorage(): MemoryStorage {
  const storage = new MemoryStorage();
  storage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify({ lessons: {
    'html-basics': { status: 'completed', startedAt: '2026-10-01T10:00:00.000Z', completedAt: '2026-10-01T10:20:00.000Z' },
    'css-layout': { status: 'in-progress', startedAt: '2026-10-02T10:00:00.000Z', completedAt: null },
  }, lastOpenedLessonId: 'css-layout', lastOpenedAt: '2026-10-02T10:00:00.000Z' }));
  storage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify({ lessons: { 'html-basics': { createdAt: '2026-10-01T10:00:00.000Z' } } }));
  storage.setItem(STORAGE_KEYS.NOTES, JSON.stringify({ lessons: { 'html-basics': { content: 'Review semantic elements', updatedAt: '2026-10-01T10:30:00.000Z' } } }));
  storage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify({ quizzes: { 'html-quiz': { answers: { q1: 1 }, score: 1, total: 1, completedAt: '2026-10-01T10:25:00.000Z' } } }));
  storage.setItem(STRUCTURED_LEARNING_STORAGE_KEY, JSON.stringify({ schemaVersion: 2, data: {
    quizAttempts: { 'html-basics::check-1': [{ selectedOptionIds: ['b'], isCorrect: true, submittedAt: '2026-10-01T10:15:00.000Z' }] },
    codeDrafts: { 'html-basics::exercise-1': { code: 'const total = 3;', updatedAt: '2026-10-01T10:15:00.000Z' } },
    practiceChecklists: { 'html-basics::exercise-1': { checkedCriteria: [0], updatedAt: '2026-10-01T10:15:00.000Z' } },
    sectionProgress: { 'html-basics': { completedBlockIds: ['intro', 'practice-1'], updatedAt: '2026-10-01T10:15:00.000Z' } },
  } }));
  return storage;
}

describe('local learning data backups', () => {
  it('creates and round-trips a versioned snapshot of all current learner data', () => {
    const backup = createLocalBackup(createPopulatedStorage(), new Date('2026-10-27T10:00:00.000Z'));
    expect(backup.format).toBe(BACKUP_FORMAT);
    expect(backup.schemaVersion).toBe(BACKUP_SCHEMA_VERSION);
    expect(backup.data.progress.lessons['html-basics'].status).toBe('completed');
    expect(backup.data.bookmarks.lessons['html-basics']).toBeDefined();
    expect(backup.data.notes.lessons['html-basics'].content).toContain('semantic');
    expect(backup.data.quizResults.quizzes['html-quiz'].score).toBe(1);
    expect(backup.data.structuredLearning.codeDrafts['html-basics::exercise-1'].code).toContain('total');
    expect(parseBackup(serializeBackup(backup))).toEqual(backup);
  });

  it('uses defaults for absent datasets and reads legacy structured data without migrating it', () => {
    const storage = new MemoryStorage();
    storage.setItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, JSON.stringify({ quizAttempts: {}, codeDrafts: {}, practiceChecklists: {} }));
    const backup = createLocalBackup(storage);
    expect(backup.data.progress.lessons).toEqual({});
    expect(backup.data.structuredLearning.sectionProgress).toEqual({});
    expect(storage.getItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY)).not.toBeNull();
    expect(storage.getItem(STRUCTURED_LEARNING_STORAGE_KEY)).toBeNull();
  });

  it('rejects invalid stored data instead of exporting an incomplete backup', () => {
    const storage = new MemoryStorage();
    storage.setItem(STORAGE_KEYS.NOTES, '{bad-json');
    expect(() => createLocalBackup(storage)).toThrowError(BackupError);
    try { createLocalBackup(storage); } catch (error) { expect((error as BackupError).code).toBe('stored-data-invalid'); }
  });

  it('rejects malformed or unsupported backup files without changing storage', () => {
    const storage = createPopulatedStorage();
    const before = storage.getItem(STORAGE_KEYS.NOTES);
    expect(() => restoreLocalBackup('{not json', storage)).toThrowError(BackupError);
    try { parseBackup(JSON.stringify({ format: BACKUP_FORMAT, schemaVersion: 999 })); } catch (error) { expect((error as BackupError).code).toBe('unsupported-format'); }
    expect(storage.getItem(STORAGE_KEYS.NOTES)).toBe(before);
  });

  it('replaces learner data and writes the current structured-learning envelope', () => {
    const backup = serializeBackup(createLocalBackup(createPopulatedStorage()));
    const target = new MemoryStorage();
    target.setItem(STORAGE_KEYS.NOTES, JSON.stringify({ lessons: { stale: { content: 'old', updatedAt: 'now' } } }));
    target.setItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, JSON.stringify({ quizAttempts: {}, codeDrafts: {}, practiceChecklists: {} }));
    const restored = restoreLocalBackup(backup, target);
    expect(restored.data.notes.lessons['html-basics'].content).toContain('semantic');
    expect(JSON.parse(target.getItem(STORAGE_KEYS.NOTES) ?? '{}').data.lessons.stale).toBeUndefined();
    expect(JSON.parse(target.getItem(STORAGE_KEYS.NOTES) ?? '{}').schemaVersion).toBe(1);
    expect(JSON.parse(target.getItem(STRUCTURED_LEARNING_STORAGE_KEY) ?? '{}').schemaVersion).toBe(2);
    expect(target.getItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY)).toBeNull();
  });

  it('rolls back every affected key if one write fails', () => {
    const rawBackup = serializeBackup(createLocalBackup(createPopulatedStorage()));
    const target = new FailOnceStorage();
    const keys = [STORAGE_KEYS.PROGRESS, STORAGE_KEYS.BOOKMARKS, STORAGE_KEYS.NOTES, STORAGE_KEYS.QUIZ_RESULTS, STRUCTURED_LEARNING_STORAGE_KEY, LEGACY_STRUCTURED_LEARNING_STORAGE_KEY];
    const before = new Map(keys.map((key) => [key, `before:${key}`]));
    for (const [key, value] of before) target.setItem(key, value);
    target.failNextWrite(STORAGE_KEYS.NOTES);
    expect(() => restoreLocalBackup(rawBackup, target)).toThrowError(BackupError);
    for (const key of keys) expect(target.getItem(key)).toBe(before.get(key));
  });

  it('summarizes records for a confirmation preview', () => {
    const summary = getBackupSummary(createLocalBackup(createPopulatedStorage()));
    expect(summary).toEqual({ progressRecords: 2, completedLessons: 1, bookmarks: 1, notes: 1, quizResults: 1, structuredQuizAttempts: 1, codeDrafts: 1, practiceChecklists: 1, sectionProgress: 2 });
  });
  it('surfaces storage read errors instead of treating an unavailable store as empty', () => {
    class ReadFailStorage extends MemoryStorage {
      override getItem(key: string): string | null {
        throw new DOMException(`Storage denied for ${key}`, 'SecurityError');
      }
    }
    let caught: unknown;
    try { createLocalBackup(new ReadFailStorage()); } catch (error) { caught = error; }
    expect(caught).toBeInstanceOf(BackupError);
    expect((caught as BackupError).code).toBe('storage-read-failed');
  });

  it('reports when restoring the old snapshot also fails', () => {
    class FailCountStorage extends MemoryStorage {
      private failures = new Map<string, number>();
      failWrites(key: string, count: number): void { this.failures.set(key, count); }
      override setItem(key: string, value: string): void {
        const remaining = this.failures.get(key) ?? 0;
        if (remaining > 0) {
          this.failures.set(key, remaining - 1);
          throw new DOMException('Quota exceeded', 'QuotaExceededError');
        }
        super.setItem(key, value);
      }
    }
    const target = new FailCountStorage();
    const keys = [STORAGE_KEYS.PROGRESS, STORAGE_KEYS.BOOKMARKS, STORAGE_KEYS.NOTES, STORAGE_KEYS.QUIZ_RESULTS, STRUCTURED_LEARNING_STORAGE_KEY, LEGACY_STRUCTURED_LEARNING_STORAGE_KEY];
    for (const key of keys) target.setItem(key, `before:${key}`);
    target.failWrites(STORAGE_KEYS.NOTES, 2);
    const rawBackup = serializeBackup(createLocalBackup(createPopulatedStorage()));
    let caught: unknown;
    try { restoreLocalBackup(rawBackup, target); } catch (error) { caught = error; }
    expect(caught).toBeInstanceOf(BackupError);
    expect((caught as BackupError).code).toBe('rollback-failed');
  });
  it('exports versioned store envelopes and restores every legacy dataset as a current envelope', () => {
    const source = new MemoryStorage();
    const progress = { lessons: {
      'semantic-html': { status: 'completed' as const, startedAt: '2026-10-10T10:00:00.000Z', completedAt: '2026-10-10T10:20:00.000Z' },
    }, lastOpenedLessonId: 'semantic-html', lastOpenedAt: '2026-10-10T10:20:00.000Z' };
    source.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(createLocalStoreRecord(progress)));
    const backup = createLocalBackup(source);
    expect(backup.data.progress.lessons['semantic-html'].status).toBe('completed');
    const target = new MemoryStorage();
    restoreLocalBackup(serializeBackup(backup), target);
    for (const key of [STORAGE_KEYS.PROGRESS, STORAGE_KEYS.BOOKMARKS, STORAGE_KEYS.NOTES, STORAGE_KEYS.QUIZ_RESULTS]) {
      const record = JSON.parse(target.getItem(key) ?? '{}') as { format?: string; schemaVersion?: number; data?: unknown };
      expect(record.format).toBe(LOCAL_STORE_FORMAT);
      expect(record.schemaVersion).toBe(1);
      expect(record.data).toBeDefined();
    }
  });
  it('rejects a backup with an invalid creation timestamp', () => {
    const valid = createLocalBackup(createPopulatedStorage());
    const invalid = { ...valid, createdAt: 'not-a-timestamp' };
    expect(() => parseBackup(JSON.stringify(invalid))).toThrowError(BackupError);
  });
});