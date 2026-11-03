import { z } from 'zod';
import { STORAGE_KEYS } from '@/lib/constants';
import { reportStorageError } from '@/lib/storage';
import { createLocalStoreRecord, LOCAL_STORE_FORMAT, LOCAL_STORE_SCHEMA_VERSION, localStoreRecordSchema } from '@/lib/versionedStorage';
import { bookmarksStateSchema } from '@/features/bookmarks/schemas';
import type { BookmarksState } from '@/features/bookmarks/types';
import { notesStateSchema } from '@/features/notes/schemas';
import type { NotesState } from '@/features/notes/types';
import { progressStateSchema } from '@/features/progress/schemas';
import type { ProgressState } from '@/features/progress/types';
import { quizResultsStateSchema } from '@/features/quizzes/schemas';
import type { QuizResultsState } from '@/features/quizzes/types';
import {
  EMPTY_STRUCTURED_LEARNING_STATE,
  LEGACY_STRUCTURED_LEARNING_STORAGE_KEY,
  STRUCTURED_LEARNING_SCHEMA_VERSION,
  STRUCTURED_LEARNING_STORAGE_KEY,
  structuredLearningStateSchema,
  structuredLearningStorageRecordSchema,
  type StructuredLearningState,
} from '@/features/structured-lesson/schemas';

export const BACKUP_FORMAT = 'interactive-guides-backup' as const;
export const BACKUP_SCHEMA_VERSION = 1 as const;
export const MAX_BACKUP_FILE_BYTES = 10 * 1024 * 1024;

export type BackupErrorCode =
  | 'storage-unavailable'
  | 'storage-read-failed'
  | 'stored-data-invalid'
  | 'file-too-large'
  | 'invalid-json'
  | 'unsupported-format'
  | 'invalid-backup'
  | 'storage-write-failed'
  | 'rollback-failed';

export class BackupError extends Error {
  constructor(readonly code: BackupErrorCode) {
    super(code);
    this.name = 'BackupError';
  }
}

const backupDataSchema = z.object({
  progress: progressStateSchema,
  bookmarks: bookmarksStateSchema,
  notes: notesStateSchema,
  quizResults: quizResultsStateSchema,
  structuredLearning: structuredLearningStateSchema,
}).strict();

export const backupPayloadSchema = z.object({
  format: z.literal(BACKUP_FORMAT),
  schemaVersion: z.literal(BACKUP_SCHEMA_VERSION),
  createdAt: z.string().datetime(),
  data: backupDataSchema,
}).strict();

export type BackupPayload = z.infer<typeof backupPayloadSchema>;

export interface BackupSummary {
  readonly progressRecords: number;
  readonly completedLessons: number;
  readonly bookmarks: number;
  readonly notes: number;
  readonly quizResults: number;
  readonly structuredQuizAttempts: number;
  readonly codeDrafts: number;
  readonly practiceChecklists: number;
  readonly sectionProgress: number;
}

const EMPTY_PROGRESS: ProgressState = { lessons: {}, lastOpenedLessonId: null, lastOpenedAt: null };
const EMPTY_BOOKMARKS: BookmarksState = { lessons: {} };
const EMPTY_NOTES: NotesState = { lessons: {} };
const EMPTY_QUIZ_RESULTS: QuizResultsState = { quizzes: {} };

function resolveStorage(storage?: Storage): Storage {
  if (storage) return storage;
  try {
    if (typeof window !== 'undefined') return window.localStorage;
  } catch {
    // Access to localStorage can itself be denied by the browser.
  }
  throw new BackupError('storage-unavailable');
}

function readRaw(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    reportStorageError(key, 'read');
    throw new BackupError('storage-read-failed');
  }
}

function parseStoredJSON(raw: string, key: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    reportStorageError(key, 'read');
    throw new BackupError('stored-data-invalid');
  }
}

function readValidated<T>(storage: Storage, key: string, schema: z.ZodType<T>, fallback: T): T {
  const raw = readRaw(storage, key);
  if (raw === null) return fallback;
  const parsedRaw = parseStoredJSON(raw, key);
  const isVersionedEnvelope = typeof parsedRaw === 'object' && parsedRaw !== null
    && 'format' in parsedRaw && parsedRaw.format === LOCAL_STORE_FORMAT;
  let candidate: unknown = parsedRaw;
  if (isVersionedEnvelope) {
    const envelope = localStoreRecordSchema.safeParse(parsedRaw);
    if (!envelope.success || envelope.data.schemaVersion !== LOCAL_STORE_SCHEMA_VERSION) {
      reportStorageError(key, 'read');
      throw new BackupError('stored-data-invalid');
    }
    candidate = envelope.data.data;
  }
  const parsed = schema.safeParse(candidate);
  if (!parsed.success) {
    reportStorageError(key, 'read');
    throw new BackupError('stored-data-invalid');
  }
  return parsed.data;
}

/** Reads structured learning data without changing keys or performing a migration. */
function readStructuredLearning(storage: Storage): StructuredLearningState {
  const currentRaw = readRaw(storage, STRUCTURED_LEARNING_STORAGE_KEY);
  if (currentRaw !== null) {
    const parsed = parseStoredJSON(currentRaw, STRUCTURED_LEARNING_STORAGE_KEY);
    const envelope = structuredLearningStorageRecordSchema.safeParse(parsed);
    if (envelope.success) return envelope.data.data;
    // Support the short-lived transitional build that wrote the unwrapped shape to the v2 key.
    const transitional = structuredLearningStateSchema.safeParse(parsed);
    if (transitional.success) return transitional.data;
    reportStorageError(STRUCTURED_LEARNING_STORAGE_KEY, 'read');
    throw new BackupError('stored-data-invalid');
  }
  const legacyRaw = readRaw(storage, LEGACY_STRUCTURED_LEARNING_STORAGE_KEY);
  if (legacyRaw === null) return EMPTY_STRUCTURED_LEARNING_STATE;
  const legacy = structuredLearningStateSchema.safeParse(parseStoredJSON(legacyRaw, LEGACY_STRUCTURED_LEARNING_STORAGE_KEY));
  if (!legacy.success) {
    reportStorageError(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, 'read');
    throw new BackupError('stored-data-invalid');
  }
  return legacy.data;
}

/** Creates a validated, versioned snapshot without mutating existing local storage. */
export function createLocalBackup(storage?: Storage, now = new Date()): BackupPayload {
  const target = resolveStorage(storage);
  const payload = {
    format: BACKUP_FORMAT,
    schemaVersion: BACKUP_SCHEMA_VERSION,
    createdAt: now.toISOString(),
    data: {
      progress: readValidated(target, STORAGE_KEYS.PROGRESS, progressStateSchema, EMPTY_PROGRESS),
      bookmarks: readValidated(target, STORAGE_KEYS.BOOKMARKS, bookmarksStateSchema, EMPTY_BOOKMARKS),
      notes: readValidated(target, STORAGE_KEYS.NOTES, notesStateSchema, EMPTY_NOTES),
      quizResults: readValidated(target, STORAGE_KEYS.QUIZ_RESULTS, quizResultsStateSchema, EMPTY_QUIZ_RESULTS),
      structuredLearning: readStructuredLearning(target),
    },
  };
  const validated = backupPayloadSchema.safeParse(payload);
  if (!validated.success) throw new BackupError('invalid-backup');
  return validated.data;
}

export function serializeBackup(backup: BackupPayload): string {
  const validated = backupPayloadSchema.safeParse(backup);
  if (!validated.success) throw new BackupError('invalid-backup');
  return JSON.stringify(validated.data, null, 2);
}

/** Validates the whole file before restore code is allowed to touch storage. */
export function parseBackup(raw: string): BackupPayload {
  const byteLength = typeof TextEncoder === 'undefined' ? raw.length : new TextEncoder().encode(raw).byteLength;
  if (byteLength > MAX_BACKUP_FILE_BYTES) throw new BackupError('file-too-large');
  let parsed: unknown;
  try { parsed = JSON.parse(raw) as unknown; }
  catch { throw new BackupError('invalid-json'); }
  if (typeof parsed !== 'object' || parsed === null || !('format' in parsed) || parsed.format !== BACKUP_FORMAT || !('schemaVersion' in parsed) || parsed.schemaVersion !== BACKUP_SCHEMA_VERSION) {
    throw new BackupError('unsupported-format');
  }
  const result = backupPayloadSchema.safeParse(parsed);
  if (!result.success) throw new BackupError('invalid-backup');
  return result.data;
}

function rollbackSnapshot(storage: Storage, snapshots: ReadonlyMap<string, string | null>): boolean {
  let succeeded = true;
  for (const [key, previousValue] of [...snapshots.entries()].reverse()) {
    try {
      if (previousValue === null) storage.removeItem(key);
      else storage.setItem(key, previousValue);
    } catch {
      reportStorageError(key, previousValue === null ? 'remove' : 'write');
      succeeded = false;
    }
  }
  return succeeded;
}

/**
 * Replaces learner-owned local data. Validation runs before writes. If a write fails,
 * original raw values are restored; the browser Storage API has no transaction.
 */
export function restoreLocalBackup(raw: string, storage?: Storage): BackupPayload {
  const backup = parseBackup(raw);
  const target = resolveStorage(storage);
  const keys = [STORAGE_KEYS.PROGRESS, STORAGE_KEYS.BOOKMARKS, STORAGE_KEYS.NOTES, STORAGE_KEYS.QUIZ_RESULTS, STRUCTURED_LEARNING_STORAGE_KEY, LEGACY_STRUCTURED_LEARNING_STORAGE_KEY];
  const snapshots = new Map<string, string | null>();
  for (const key of keys) snapshots.set(key, readRaw(target, key));
  const operations: { key: string; value: string | null }[] = [
    { key: STORAGE_KEYS.PROGRESS, value: JSON.stringify(createLocalStoreRecord(backup.data.progress)) },
    { key: STORAGE_KEYS.BOOKMARKS, value: JSON.stringify(createLocalStoreRecord(backup.data.bookmarks)) },
    { key: STORAGE_KEYS.NOTES, value: JSON.stringify(createLocalStoreRecord(backup.data.notes)) },
    { key: STORAGE_KEYS.QUIZ_RESULTS, value: JSON.stringify(createLocalStoreRecord(backup.data.quizResults)) },
    { key: STRUCTURED_LEARNING_STORAGE_KEY, value: JSON.stringify({ schemaVersion: STRUCTURED_LEARNING_SCHEMA_VERSION, data: backup.data.structuredLearning }) },
    { key: LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, value: null },
  ];
  try {
    for (const operation of operations) {
      try {
        if (operation.value === null) target.removeItem(operation.key);
        else target.setItem(operation.key, operation.value);
      } catch {
        reportStorageError(operation.key, operation.value === null ? 'remove' : 'write');
        throw new BackupError('storage-write-failed');
      }
    }
  } catch {
    if (!rollbackSnapshot(target, snapshots)) throw new BackupError('rollback-failed');
    throw new BackupError('storage-write-failed');
  }
  return backup;
}

export function getBackupSummary(backup: BackupPayload): BackupSummary {
  const data = backup.data;
  return {
    progressRecords: Object.keys(data.progress.lessons).length,
    completedLessons: Object.values(data.progress.lessons).filter((entry) => entry.status === 'completed').length,
    bookmarks: Object.keys(data.bookmarks.lessons).length,
    notes: Object.keys(data.notes.lessons).length,
    quizResults: Object.keys(data.quizResults.quizzes).length,
    structuredQuizAttempts: Object.values(data.structuredLearning.quizAttempts).reduce((total, attempts) => total + attempts.length, 0),
    codeDrafts: Object.keys(data.structuredLearning.codeDrafts).length,
    practiceChecklists: Object.keys(data.structuredLearning.practiceChecklists).length,
    sectionProgress: Object.values(data.structuredLearning.sectionProgress).reduce((total, entry) => total + entry.completedBlockIds.length, 0),
  };
}