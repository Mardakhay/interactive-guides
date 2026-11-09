import { reportStorageError } from '@/lib/storage';
import {
  EMPTY_STRUCTURED_LEARNING_STATE,
  LEGACY_STRUCTURED_LEARNING_STORAGE_KEY,
  STRUCTURED_LEARNING_STORAGE_KEY,
  STRUCTURED_LEARNING_SCHEMA_VERSION,
  structuredLearningStateSchema,
  structuredLearningStorageRecordSchema,
  type StructuredLearningState,
  type StructuredLearningStorageRecord,
} from './schemas';

export interface StructuredLearningReadResult {
  readonly state: StructuredLearningState;
  readonly source: 'current' | 'migrated-current' | 'migrated-legacy' | 'legacy' | 'empty' | 'invalid';
  readonly invalid: boolean;
}

function getDefaultStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

function parseJSON(raw: string): unknown | null {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function createStructuredLearningStorageRecord(
  state: StructuredLearningState,
): StructuredLearningStorageRecord {
  return structuredLearningStorageRecordSchema.parse({
    schemaVersion: STRUCTURED_LEARNING_SCHEMA_VERSION,
    data: state,
  });
}

function writeRecord(
  storage: Storage,
  key: string,
  record: StructuredLearningStorageRecord,
): boolean {
  try {
    storage.setItem(key, JSON.stringify(record));
    return true;
  } catch {
    reportStorageError(key, 'write');
    return false;
  }
}

/**
 * Read the current versioned record or migrate the historical raw v1 shape.
 * The legacy source is only removed after the v2 record has been stored.
 */
export function readStructuredLearningState(storage?: Storage): StructuredLearningReadResult {
  const target = storage ?? getDefaultStorage();
  if (!target) {
    reportStorageError(STRUCTURED_LEARNING_STORAGE_KEY, 'read');
    return { state: EMPTY_STRUCTURED_LEARNING_STATE, source: 'empty', invalid: false };
  }

  let currentRaw: string | null;
  try {
    currentRaw = target.getItem(STRUCTURED_LEARNING_STORAGE_KEY);
  } catch {
    reportStorageError(STRUCTURED_LEARNING_STORAGE_KEY, 'read');
    return { state: EMPTY_STRUCTURED_LEARNING_STATE, source: 'empty', invalid: false };
  }

  if (currentRaw !== null) {
    const parsed = parseJSON(currentRaw);
    if (parsed === null) {
      reportStorageError(STRUCTURED_LEARNING_STORAGE_KEY, 'read');
      return { state: EMPTY_STRUCTURED_LEARNING_STATE, source: 'invalid', invalid: true };
    }

    const currentRecord = structuredLearningStorageRecordSchema.safeParse(parsed);
    if (currentRecord.success) {
      return { state: currentRecord.data.data, source: 'current', invalid: false };
    }

    // Also recover if an intermediate build wrote the old raw shape to the new key.
    const transitionalRaw = structuredLearningStateSchema.safeParse(parsed);
    if (transitionalRaw.success) {
      const record = createStructuredLearningStorageRecord(transitionalRaw.data);
      const saved = writeRecord(target, STRUCTURED_LEARNING_STORAGE_KEY, record);
      return {
        state: transitionalRaw.data,
        source: saved ? 'migrated-current' : 'current',
        invalid: false,
      };
    }

    reportStorageError(STRUCTURED_LEARNING_STORAGE_KEY, 'read');
    return { state: EMPTY_STRUCTURED_LEARNING_STATE, source: 'invalid', invalid: true };
  }

  let legacyRaw: string | null;
  try {
    legacyRaw = target.getItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY);
  } catch {
    reportStorageError(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, 'read');
    return { state: EMPTY_STRUCTURED_LEARNING_STATE, source: 'empty', invalid: false };
  }
  if (legacyRaw === null) {
    return { state: EMPTY_STRUCTURED_LEARNING_STATE, source: 'empty', invalid: false };
  }

  const legacyParsed = parseJSON(legacyRaw);
  const legacyState = legacyParsed === null
    ? null
    : structuredLearningStateSchema.safeParse(legacyParsed);
  if (!legacyState || !legacyState.success) {
    reportStorageError(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, 'read');
    return { state: EMPTY_STRUCTURED_LEARNING_STATE, source: 'invalid', invalid: true };
  }

  const record = createStructuredLearningStorageRecord(legacyState.data);
  const saved = writeRecord(target, STRUCTURED_LEARNING_STORAGE_KEY, record);
  if (saved) {
    try {
      target.removeItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY);
    } catch {
      reportStorageError(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, 'remove');
    }
  }

  return {
    state: legacyState.data,
    source: saved ? 'migrated-legacy' : 'legacy',
    invalid: false,
  };
}

export function saveStructuredLearningState(
  state: StructuredLearningState,
  storage?: Storage,
): boolean {
  const target = storage ?? getDefaultStorage();
  if (!target) {
    reportStorageError(STRUCTURED_LEARNING_STORAGE_KEY, 'write');
    return false;
  }

  const record = createStructuredLearningStorageRecord(state);
  const saved = writeRecord(target, STRUCTURED_LEARNING_STORAGE_KEY, record);
  if (!saved) return false;

  try {
    target.removeItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY);
  } catch {
    reportStorageError(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, 'remove');
  }
  return true;
}

/** Removes a leftover legacy copy after a multi-key backup import succeeded. */
export function clearLegacyStructuredLearningRecord(storage: Storage): void {
  try {
    storage.removeItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY);
  } catch {
    reportStorageError(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, 'remove');
  }
}