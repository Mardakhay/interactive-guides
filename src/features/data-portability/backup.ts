import { z } from 'zod';
import { STORAGE_KEYS } from '@/lib/constants';
import { bookmarksStateSchema } from '@/features/bookmarks/schemas';
import { notesStateSchema } from '@/features/notes/schemas';
import { progressStateSchema } from '@/features/progress/schemas';
import { quizResultsStateSchema } from '@/features/quizzes/schemas';
import {
  EMPTY_STRUCTURED_LEARNING_STATE,
  STRUCTURED_LEARNING_STORAGE_KEY,
  structuredLearningStateSchema,
  type StructuredLearningState,
} from '@/features/structured-lesson/schemas';

const emptyProgress = {
  lessons: {},
  lastOpenedLessonId: null,
  lastOpenedAt: null,
};

const emptyBookmarks = { lessons: {} };
const emptyNotes = { lessons: {} };
const emptyQuizResults = { quizzes: {} };

const backupDataSchema = z.object({
  progress: progressStateSchema,
  bookmarks: bookmarksStateSchema,
  notes: notesStateSchema,
  quizResults: quizResultsStateSchema,
  structuredLearning: structuredLearningStateSchema,
  lastLesson: z.string().nullable(),
  theme: z.string().nullable(),
});

export const learningDataBackupSchema = z.object({
  format: z.literal('interactive-guides-local-data'),
  version: z.literal(1),
  exportedAt: z.string().datetime(),
  data: backupDataSchema,
});

export type LearningDataBackup = z.infer<typeof learningDataBackupSchema>;
export type LearningDataSnapshot = LearningDataBackup['data'];

export interface BackupSummary {
  trackedLessons: number;
  bookmarks: number;
  notes: number;
  quizResults: number;
  structuredQuizAttempts: number;
  codeDrafts: number;
  practiceChecklists: number;
}

function readStoredJson<T>(
  storage: Storage,
  key: string,
  schema: z.ZodType<T>,
  fallback: T,
): T {
  const raw = storage.getItem(key);
  if (raw === null) return fallback;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('Saved learning data could not be read. No data was changed.');
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    throw new Error('Saved learning data failed validation. Recover or export current browser data before importing.');
  }
  return result.data;
}

function readOptionalString(storage: Storage, key: string): string | null {
  const raw = storage.getItem(key);
  if (raw === null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return typeof parsed === 'string' ? parsed : raw;
  } catch {
    return raw;
  }
}

function readCurrentSnapshot(storage: Storage): LearningDataSnapshot {
  return {
    progress: readStoredJson(storage, STORAGE_KEYS.PROGRESS, progressStateSchema, emptyProgress),
    bookmarks: readStoredJson(storage, STORAGE_KEYS.BOOKMARKS, bookmarksStateSchema, emptyBookmarks),
    notes: readStoredJson(storage, STORAGE_KEYS.NOTES, notesStateSchema, emptyNotes),
    quizResults: readStoredJson(storage, STORAGE_KEYS.QUIZ_RESULTS, quizResultsStateSchema, emptyQuizResults),
    structuredLearning: readStoredJson(
      storage,
      STRUCTURED_LEARNING_STORAGE_KEY,
      structuredLearningStateSchema,
      EMPTY_STRUCTURED_LEARNING_STATE,
    ),
    lastLesson: readOptionalString(storage, STORAGE_KEYS.LAST_LESSON),
    theme: readOptionalString(storage, STORAGE_KEYS.THEME),
  };
}

export function createLearningDataBackup(
  storage: Storage,
  exportedAt: string = new Date().toISOString(),
): LearningDataBackup {
  return learningDataBackupSchema.parse({
    format: 'interactive-guides-local-data',
    version: 1,
    exportedAt,
    data: readCurrentSnapshot(storage),
  });
}

export function parseLearningDataBackup(serialized: string): LearningDataBackup {
  let parsed: unknown;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new Error('This file is not valid JSON.');
  }

  const result = learningDataBackupSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error('This backup has an unsupported format or invalid data. Your current learning data has not been changed.');
  }
  return result.data;
}

function dateValue(value: string | null | undefined): number {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function earliestDate(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return dateValue(a) <= dateValue(b) ? a : b;
}

function latestDate(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return dateValue(a) >= dateValue(b) ? a : b;
}

function isNewer(candidate: string | null, current: string | null): boolean {
  return dateValue(candidate) > dateValue(current);
}

function mergeProgress(
  current: LearningDataSnapshot['progress'],
  incoming: LearningDataSnapshot['progress'],
): LearningDataSnapshot['progress'] {
  const lessons = { ...current.lessons };

  for (const [lessonId, imported] of Object.entries(incoming.lessons)) {
    const existing = lessons[lessonId];
    if (!existing) {
      lessons[lessonId] = imported;
      continue;
    }

    const status =
      existing.status === 'completed' || imported.status === 'completed'
        ? 'completed'
        : existing.status === 'in-progress' || imported.status === 'in-progress'
          ? 'in-progress'
          : 'not-started';

    lessons[lessonId] = {
      status,
      startedAt: earliestDate(existing.startedAt, imported.startedAt),
      completedAt: latestDate(existing.completedAt, imported.completedAt),
    };
  }

  const importedIsNewer = isNewer(incoming.lastOpenedAt, current.lastOpenedAt);
  return {
    lessons,
    lastOpenedLessonId: importedIsNewer ? incoming.lastOpenedLessonId : current.lastOpenedLessonId,
    lastOpenedAt: latestDate(current.lastOpenedAt, incoming.lastOpenedAt),
  };
}

function mergeBookmarks(
  current: LearningDataSnapshot['bookmarks'],
  incoming: LearningDataSnapshot['bookmarks'],
): LearningDataSnapshot['bookmarks'] {
  const lessons = { ...current.lessons };
  for (const [lessonId, imported] of Object.entries(incoming.lessons)) {
    const existing = lessons[lessonId];
    lessons[lessonId] = existing
      ? { createdAt: earliestDate(existing.createdAt, imported.createdAt) ?? existing.createdAt }
      : imported;
  }
  return { lessons };
}

function mergeNotes(
  current: LearningDataSnapshot['notes'],
  incoming: LearningDataSnapshot['notes'],
): LearningDataSnapshot['notes'] {
  const lessons = { ...current.lessons };
  for (const [lessonId, imported] of Object.entries(incoming.lessons)) {
    const existing = lessons[lessonId];
    if (!existing || isNewer(imported.updatedAt, existing.updatedAt)) {
      lessons[lessonId] = imported;
    }
  }
  return { lessons };
}

function mergeQuizResults(
  current: LearningDataSnapshot['quizResults'],
  incoming: LearningDataSnapshot['quizResults'],
): LearningDataSnapshot['quizResults'] {
  const quizzes = { ...current.quizzes };
  for (const [quizId, imported] of Object.entries(incoming.quizzes)) {
    const existing = quizzes[quizId];
    if (!existing || isNewer(imported.completedAt, existing.completedAt)) {
      quizzes[quizId] = imported;
    }
  }
  return { quizzes };
}

function mergeStructuredLearning(
  current: StructuredLearningState,
  incoming: StructuredLearningState,
): StructuredLearningState {
  const quizAttempts: StructuredLearningState['quizAttempts'] = {};

  for (const key of new Set([...Object.keys(current.quizAttempts), ...Object.keys(incoming.quizAttempts)])) {
    const attempts = [...(current.quizAttempts[key] ?? []), ...(incoming.quizAttempts[key] ?? [])];
    const deduplicated = new Map<string, (typeof attempts)[number]>();
    for (const attempt of attempts) {
      const signature = JSON.stringify([attempt.submittedAt, attempt.selectedOptionIds, attempt.isCorrect]);
      deduplicated.set(signature, attempt);
    }
    quizAttempts[key] = [...deduplicated.values()]
      .sort((a, b) => dateValue(b.submittedAt) - dateValue(a.submittedAt))
      .slice(0, 100);
  }

  const codeDrafts = { ...current.codeDrafts };
  for (const [key, imported] of Object.entries(incoming.codeDrafts)) {
    const existing = codeDrafts[key];
    if (!existing || isNewer(imported.updatedAt, existing.updatedAt)) {
      codeDrafts[key] = imported;
    }
  }

  const practiceChecklists = { ...current.practiceChecklists };
  for (const [key, imported] of Object.entries(incoming.practiceChecklists)) {
    const existing = practiceChecklists[key];
    if (!existing || isNewer(imported.updatedAt, existing.updatedAt)) {
      practiceChecklists[key] = imported;
    }
  }

  return { quizAttempts, codeDrafts, practiceChecklists };
}

function mergeSnapshots(current: LearningDataSnapshot, incoming: LearningDataSnapshot): LearningDataSnapshot {
  return {
    progress: mergeProgress(current.progress, incoming.progress),
    bookmarks: mergeBookmarks(current.bookmarks, incoming.bookmarks),
    notes: mergeNotes(current.notes, incoming.notes),
    quizResults: mergeQuizResults(current.quizResults, incoming.quizResults),
    structuredLearning: mergeStructuredLearning(current.structuredLearning, incoming.structuredLearning),
    lastLesson: current.lastLesson ?? incoming.lastLesson,
    theme: current.theme ?? incoming.theme,
  };
}

function summarizeData(data: LearningDataSnapshot): BackupSummary {
  return {
    trackedLessons: Object.keys(data.progress.lessons).length,
    bookmarks: Object.keys(data.bookmarks.lessons).length,
    notes: Object.keys(data.notes.lessons).length,
    quizResults: Object.keys(data.quizResults.quizzes).length,
    structuredQuizAttempts: Object.values(data.structuredLearning.quizAttempts).reduce(
      (total, attempts) => total + attempts.length,
      0,
    ),
    codeDrafts: Object.keys(data.structuredLearning.codeDrafts).length,
    practiceChecklists: Object.keys(data.structuredLearning.practiceChecklists).length,
  };
}

export function getBackupSummary(backup: LearningDataBackup): BackupSummary {
  return summarizeData(backup.data);
}

/**
 * Merge an already validated backup into the browser's current learner data.
 * All candidate data is validated before the first write; existing values are
 * saved so a quota/write failure can be rolled back on a best-effort basis.
 */
export function mergeLearningDataBackup(storage: Storage, backupInput: unknown): {
  data: LearningDataSnapshot;
  summary: BackupSummary;
} {
  const backup = learningDataBackupSchema.parse(backupInput);
  const current = readCurrentSnapshot(storage);
  const merged = mergeSnapshots(current, backup.data);

  const jsonWrites: Array<[string, string]> = [
    [STORAGE_KEYS.PROGRESS, JSON.stringify(merged.progress)],
    [STORAGE_KEYS.BOOKMARKS, JSON.stringify(merged.bookmarks)],
    [STORAGE_KEYS.NOTES, JSON.stringify(merged.notes)],
    [STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(merged.quizResults)],
    [STRUCTURED_LEARNING_STORAGE_KEY, JSON.stringify(merged.structuredLearning)],
  ];

  if (current.lastLesson === null && merged.lastLesson !== null) {
    jsonWrites.push([STORAGE_KEYS.LAST_LESSON, JSON.stringify(merged.lastLesson)]);
  }
  if (current.theme === null && merged.theme !== null) {
    jsonWrites.push([STORAGE_KEYS.THEME, JSON.stringify(merged.theme)]);
  }

  const previousValues = new Map(jsonWrites.map(([key]) => [key, storage.getItem(key)]));
  const appliedKeys: string[] = [];

  try {
    for (const [key, value] of jsonWrites) {
      storage.setItem(key, value);
      appliedKeys.push(key);
    }
  } catch {
    for (const key of appliedKeys.reverse()) {
      try {
        const previous = previousValues.get(key);
        if (previous === null || previous === undefined) storage.removeItem(key);
        else storage.setItem(key, previous);
      } catch {
        // Best-effort rollback; the import error remains the primary failure.
      }
    }
    throw new Error('Import could not be saved because browser storage is unavailable or full. Existing data was restored where possible.');
  }

  return { data: merged, summary: summarizeData(merged) };
}
