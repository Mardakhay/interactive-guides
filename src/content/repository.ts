import englishCurriculum from './curriculum/bootcamp-core.en.json';
import russianCurriculum from './curriculum/bootcamp-core.ru.json';
import { bootcampCurriculumSchema } from './schemas/curriculum';
import { lessonTranslationSchema, type LessonTranslation } from './schemas/lessonContent';
import { STRUCTURED_LESSON_MANIFEST } from './lessonManifest';

export const SUPPORTED_LOCALES = ['en', 'ru'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export interface StructuredLessonMetadata {
  readonly id: string;
  readonly locale: SupportedLocale;
  readonly title: string;
}

type LessonFileMetadata = StructuredLessonMetadata & { readonly filePath: string };

// Only the compact translated manifest is eager. Each complete lesson is a separate lazy chunk.
const lessonBodies = import.meta.glob<unknown>('./lessons/**/*.json', { import: 'default' });
const lessonFiles: LessonFileMetadata[] = STRUCTURED_LESSON_MANIFEST.flatMap((entry) =>
  (['en', 'ru'] as const).map((locale) => ({
    id: entry.id,
    locale,
    title: entry.titles[locale],
    filePath: `./lessons/${entry.folder}/${locale}.json`,
  })),
);
const lessonFilesByKey = new Map(lessonFiles.map((entry) => [`${entry.locale}:${entry.id}`, entry]));

const curricula = {
  en: bootcampCurriculumSchema.parse(englishCurriculum),
  ru: bootcampCurriculumSchema.parse(russianCurriculum),
} as const;

/** Returns a lightweight lesson summary without loading its full content body. */
export function getStructuredLessonMetadata(id: string, locale: SupportedLocale): StructuredLessonMetadata | undefined {
  const entry = lessonFilesByKey.get(`${locale}:${id}`);
  if (!entry) return undefined;
  return { id: entry.id, locale: entry.locale, title: entry.title };
}

/** Loads and validates one lesson body on demand so opening one lesson does not download all lessons. */
export async function getStructuredLesson(id: string, locale: SupportedLocale): Promise<LessonTranslation | undefined> {
  const entry = lessonFilesByKey.get(`${locale}:${id}`);
  if (!entry) return undefined;
  const load = lessonBodies[entry.filePath];
  if (!load) return undefined;
  const lesson = lessonTranslationSchema.parse(await load());
  if (lesson.id !== id || lesson.locale !== locale) {
    throw new Error(`Lesson manifest mismatch for ${locale}:${id}`);
  }
  return lesson;
}

/** Returns the complete curriculum in the requested locale. */
export function getBootcampCurriculum(locale: SupportedLocale) {
  return curricula[locale];
}

/** Resolves the curriculum week that owns a lesson, preserving syllabus order. */
export function getWeekForLesson(lessonId: string, locale: SupportedLocale) {
  const curriculum = curricula[locale];
  return curriculum.months
    .flatMap((month) => month.weeks)
    .find((week) => week.lessonIds.includes(lessonId));
}

/** Resolves a supplementary track that owns a lesson, if it is outside the core syllabus. */
export function getSupplementaryTrackForLesson(lessonId: string, locale: SupportedLocale) {
  return curricula[locale].supplementaryTracks.find((track) => track.lessonIds.includes(lessonId));
}

/** Resolves a supplementary track by its stable identifier. */
export function getSupplementaryTrackById(trackId: string, locale: SupportedLocale) {
  return curricula[locale].supplementaryTracks.find((track) => track.id === trackId);
}

/** Returns the canonical week record by its stable identifier. */
export function getCurriculumWeek(weekId: string, locale: SupportedLocale) {
  return curricula[locale].months
    .flatMap((month) => month.weeks)
    .find((week) => week.id === weekId);
}

export function getStructuredLessonIds() {
  return [...new Set(lessonFiles.map((lesson) => lesson.id))];
}

/** Finds neighboring lessons using lightweight metadata, never loading their full bodies. */
export function getAdjacentStructuredLessons(lessonId: string, locale: SupportedLocale): {
  previous: StructuredLessonMetadata | undefined;
  next: StructuredLessonMetadata | undefined;
} {
  const coreWeek = getWeekForLesson(lessonId, locale);
  const supplementaryTrack = coreWeek ? undefined : getSupplementaryTrackForLesson(lessonId, locale);
  const ids = coreWeek
    ? curricula[locale].months.flatMap((month) => month.weeks).flatMap((week) => week.lessonIds)
    : supplementaryTrack?.lessonIds ?? [];
  const orderedLessons = ids
    .map((id) => getStructuredLessonMetadata(id, locale))
    .filter((lesson): lesson is StructuredLessonMetadata => lesson !== undefined);
  const index = orderedLessons.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? orderedLessons[index - 1] : undefined,
    next: index < orderedLessons.length - 1 ? orderedLessons[index + 1] : undefined,
  };
}
