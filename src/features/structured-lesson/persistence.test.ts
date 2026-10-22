import { describe, expect, it } from 'vitest';
import {
  LEGACY_STRUCTURED_LEARNING_STORAGE_KEY,
  STRUCTURED_LEARNING_STORAGE_KEY,
} from './schemas';
import { readStructuredLearningState, saveStructuredLearningState } from './persistence';

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length(): number { return this.values.size; }
  clear(): void { this.values.clear(); }
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  key(index: number): string | null { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string): void { this.values.delete(key); }
  setItem(key: string, value: string): void { this.values.set(key, value); }
}

class FailingStorage extends MemoryStorage {
  override setItem(key: string, value: string): void {
    if (key === STRUCTURED_LEARNING_STORAGE_KEY) throw new Error('Quota exceeded');
    super.setItem(key, value);
  }
}

describe('structured learning persistence migration', () => {
  it('starts with an empty record when neither current nor legacy data exists', () => {
    const storage = new MemoryStorage();
    const result = readStructuredLearningState(storage);

    expect(result.source).toBe('empty');
    expect(result.invalid).toBe(false);
    expect(result.state).toEqual({
      quizAttempts: {},
      codeDrafts: {},
      practiceChecklists: {},
      sectionProgress: {},
    });
  });

  it('keeps invalid legacy data intact instead of silently deleting or overwriting it', () => {
    const storage = new MemoryStorage();
    storage.setItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, '{invalid-json');

    const result = readStructuredLearningState(storage);

    expect(result.source).toBe('invalid');
    expect(result.invalid).toBe(true);
    expect(storage.getItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY)).toBe('{invalid-json');
    expect(storage.getItem(STRUCTURED_LEARNING_STORAGE_KEY)).toBeNull();
  });

  it('does not remove the v1 record when writing the migrated copy fails', () => {
    const storage = new FailingStorage();
    storage.setItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, JSON.stringify({
      quizAttempts: {},
      codeDrafts: {},
      practiceChecklists: {},
    }));

    const result = readStructuredLearningState(storage);

    expect(result.state.sectionProgress).toEqual({});
    expect(storage.getItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY)).not.toBeNull();
    expect(storage.getItem(STRUCTURED_LEARNING_STORAGE_KEY)).toBeNull();
  });

  it('saves future changes in the versioned v2 envelope', () => {
    const storage = new MemoryStorage();
    const result = readStructuredLearningState(storage);

    expect(saveStructuredLearningState({
      ...result.state,
      codeDrafts: {
        'lesson::exercise': { code: 'const total = 7;', updatedAt: '2026-10-22T10:00:00.000Z' },
      },
    }, storage)).toBe(true);

    const saved = JSON.parse(storage.getItem(STRUCTURED_LEARNING_STORAGE_KEY) ?? '{}');
    expect(saved.schemaVersion).toBe(2);
    expect(saved.data.codeDrafts['lesson::exercise'].code).toBe('const total = 7;');
  });
});
