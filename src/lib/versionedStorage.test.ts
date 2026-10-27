import { afterEach, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { clearLastStorageError, getLastStorageError } from './storage';
import { createLocalStoreRecord, LOCAL_STORE_FORMAT, LOCAL_STORE_SCHEMA_VERSION, readVersionedJSON, saveVersionedJSON } from './versionedStorage';

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length(): number { return this.values.size; }
  clear(): void { this.values.clear(); }
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  key(index: number): string | null { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string): void { this.values.delete(key); }
  setItem(key: string, value: string): void { this.values.set(key, value); }
}

class FailWritesStorage extends MemoryStorage {
  override setItem(key: string, value: string): void {
    throw new DOMException(`Quota exceeded while writing ${key} (${value.length} chars)`, 'QuotaExceededError');
  }
}

const stateSchema = z.object({ count: z.number().int().nonnegative() });
const fallback = { count: 0 };
afterEach(() => clearLastStorageError());

describe('versioned local JSON storage', () => {
  it('migrates a valid raw record to a versioned envelope', () => {
    const storage = new MemoryStorage();
    storage.setItem('ig:versioned-test', JSON.stringify({ count: 4 }));
    const result = readVersionedJSON('ig:versioned-test', stateSchema, fallback, storage);
    expect(result).toEqual({ data: { count: 4 }, source: 'migrated-legacy', invalid: false });
    expect(JSON.parse(storage.getItem('ig:versioned-test') ?? '{}')).toEqual({
      format: LOCAL_STORE_FORMAT, schemaVersion: LOCAL_STORE_SCHEMA_VERSION, data: { count: 4 },
    });
  });

  it('keeps the original raw record when migration cannot write the envelope', () => {
    const storage = new FailWritesStorage();
    const raw = JSON.stringify({ count: 4 });
    // Seed via the parent implementation so only the migration write is rejected.
    MemoryStorage.prototype.setItem.call(storage, 'ig:versioned-test', raw);
    const result = readVersionedJSON('ig:versioned-test', stateSchema, fallback, storage);
    expect(result).toEqual({ data: { count: 4 }, source: 'legacy', invalid: false });
    expect(storage.getItem('ig:versioned-test')).toBe(raw);
    expect(getLastStorageError()).toEqual({ key: 'ig:versioned-test', operation: 'write' });
  });

  it('rejects unknown envelope versions without overwriting the record', () => {
    const storage = new MemoryStorage();
    const raw = JSON.stringify({ ...createLocalStoreRecord({ count: 8 }), schemaVersion: 99 });
    storage.setItem('ig:versioned-test', raw);
    const result = readVersionedJSON('ig:versioned-test', stateSchema, fallback, storage);
    expect(result).toEqual({ data: fallback, source: 'invalid', invalid: true });
    expect(storage.getItem('ig:versioned-test')).toBe(raw);
  });

  it('reads current envelopes and validates their data', () => {
    const storage = new MemoryStorage();
    storage.setItem('ig:versioned-test', JSON.stringify(createLocalStoreRecord({ count: 9 })));
    expect(readVersionedJSON('ig:versioned-test', stateSchema, fallback, storage)).toEqual({ data: { count: 9 }, source: 'current', invalid: false });
    storage.setItem('ig:versioned-test', JSON.stringify(createLocalStoreRecord({ count: -1 })));
    expect(readVersionedJSON('ig:versioned-test', stateSchema, fallback, storage)).toEqual({ data: fallback, source: 'invalid', invalid: true });
  });

  it('writes envelopes only for schema-valid state', () => {
    const storage = new MemoryStorage();
    expect(saveVersionedJSON('ig:versioned-test', { count: 2 }, stateSchema, storage)).toBe(true);
    expect(JSON.parse(storage.getItem('ig:versioned-test') ?? '{}').schemaVersion).toBe(1);
    expect(saveVersionedJSON('ig:versioned-test', { count: -3 }, stateSchema, storage)).toBe(false);
  });
  it('reports storage read failures instead of silently claiming that the saved state is empty', () => {
    class ReadFailStorage extends MemoryStorage {
      override getItem(key: string): string | null {
        throw new DOMException(`Storage denied for ${key}`, 'SecurityError');
      }
    }
    const result = readVersionedJSON('ig:versioned-test', stateSchema, fallback, new ReadFailStorage());
    expect(result).toEqual({ data: fallback, source: 'empty', invalid: false });
    expect(getLastStorageError()).toEqual({ key: 'ig:versioned-test', operation: 'read' });
  });

  it('reports failed writes while leaving the in-memory state usable', () => {
    const storage = new FailWritesStorage();
    expect(saveVersionedJSON('ig:versioned-test', { count: 5 }, stateSchema, storage)).toBe(false);
    expect(getLastStorageError()).toEqual({ key: 'ig:versioned-test', operation: 'write' });
  });
});
