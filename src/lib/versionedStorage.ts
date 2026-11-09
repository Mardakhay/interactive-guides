import { z } from 'zod';
import { reportStorageError } from './storage';

export const LOCAL_STORE_FORMAT = 'interactive-guides-local-store' as const;
export const LOCAL_STORE_SCHEMA_VERSION = 1 as const;

export const localStoreRecordSchema = z.object({
  format: z.literal(LOCAL_STORE_FORMAT),
  schemaVersion: z.number().int().positive(),
  data: z.unknown(),
}).strict();

export type LocalStoreRecord = z.infer<typeof localStoreRecordSchema>;
export type VersionedReadSource = 'current' | 'migrated-legacy' | 'legacy' | 'empty' | 'invalid';

export interface VersionedReadResult<T> {
  readonly data: T;
  readonly source: VersionedReadSource;
  readonly invalid: boolean;
}

export function createLocalStoreRecord<T>(data: T): {
  format: typeof LOCAL_STORE_FORMAT;
  schemaVersion: typeof LOCAL_STORE_SCHEMA_VERSION;
  data: T;
} {
  return { format: LOCAL_STORE_FORMAT, schemaVersion: LOCAL_STORE_SCHEMA_VERSION, data };
}

function resolveStorage(storage?: Storage): Storage | null {
  if (storage) return storage;
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

function invalidResult<T>(fallback: T): VersionedReadResult<T> {
  return { data: fallback, source: 'invalid', invalid: true };
}

/**
 * Reads either the current versioned envelope or the previous raw JSON shape.
 * A legacy value is replaced only after its versioned copy is written successfully.
 */
export function readVersionedJSON<T>(
  key: string,
  schema: z.ZodType<T>,
  fallback: T,
  storage?: Storage,
): VersionedReadResult<T> {
  const target = resolveStorage(storage);
  if (!target) {
    reportStorageError(key, 'read');
    return { data: fallback, source: 'empty', invalid: false };
  }

  let raw: string | null;
  try {
    raw = target.getItem(key);
  } catch {
    reportStorageError(key, 'read');
    return { data: fallback, source: 'empty', invalid: false };
  }
  if (raw === null) return { data: fallback, source: 'empty', invalid: false };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    reportStorageError(key, 'read');
    return invalidResult(fallback);
  }

  const isLocalEnvelope = typeof parsed === 'object' && parsed !== null
    && 'format' in parsed && parsed.format === LOCAL_STORE_FORMAT;
  if (isLocalEnvelope) {
    const envelope = localStoreRecordSchema.safeParse(parsed);
    if (!envelope.success || envelope.data.schemaVersion !== LOCAL_STORE_SCHEMA_VERSION) {
      reportStorageError(key, 'read');
      return invalidResult(fallback);
    }
    const state = schema.safeParse(envelope.data.data);
    if (!state.success) {
      reportStorageError(key, 'read');
      return invalidResult(fallback);
    }
    return { data: state.data, source: 'current', invalid: false };
  }

  const legacyState = schema.safeParse(parsed);
  if (!legacyState.success) {
    reportStorageError(key, 'read');
    return invalidResult(fallback);
  }

  try {
    target.setItem(key, JSON.stringify(createLocalStoreRecord(legacyState.data)));
    return { data: legacyState.data, source: 'migrated-legacy', invalid: false };
  } catch {
    // The original raw value is still present because setItem is a single-key replace.
    reportStorageError(key, 'write');
    return { data: legacyState.data, source: 'legacy', invalid: false };
  }
}

/** Writes validated data in the current envelope; the UI can keep running if storage fails. */
export function saveVersionedJSON<T>(
  key: string,
  value: unknown,
  schema: z.ZodType<T>,
  storage?: Storage,
): boolean {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    reportStorageError(key, 'write');
    return false;
  }
  const target = resolveStorage(storage);
  if (!target) {
    reportStorageError(key, 'write');
    return false;
  }
  try {
    target.setItem(key, JSON.stringify(createLocalStoreRecord(parsed.data)));
    return true;
  } catch {
    reportStorageError(key, 'write');
    return false;
  }
}