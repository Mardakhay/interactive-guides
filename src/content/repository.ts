import englishCurriculum from './curriculum/bootcamp-core.en.json';
import russianCurriculum from './curriculum/bootcamp-core.ru.json';
import { bootcampCurriculumSchema } from './schemas/curriculum';
import { lessonTranslationSchema, type LessonContentBlock, type LessonTranslation, type LessonPublicationStatus } from './schemas/lessonContent';
import { STRUCTURED_LESSON_MANIFEST } from './lessonManifest';

export const SUPPORTED_LOCALES = ['en', 'ru'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export interface StructuredLessonMetadata {
  readonly id: string;
  readonly locale: SupportedLocale;
  readonly title: string;
  readonly status: LessonPublicationStatus;
}

export interface StructuredLessonSearchDocument extends StructuredLessonMetadata {
  readonly description: string;
  readonly difficulty: LessonTranslation['difficulty'];
  readonly estimatedMinutes: number;
  readonly tags: LessonTranslation['tags'];
  readonly learningOutcomes: LessonTranslation['learningOutcomes'];
  readonly searchText: string;
}

type LessonFileMetadata = StructuredLessonMetadata & { readonly filePath: string };

// Only the compact translated manifest is eager. Each complete lesson is a separate lazy chunk.
const lessonBodies = import.meta.glob<unknown>('./lessons/**/*.json', { import: 'default' });
const lessonFiles: LessonFileMetadata[] = STRUCTURED_LESSON_MANIFEST.flatMap((entry) =>
  entry.status === 'draft' ? [] : (['en', 'ru'] as const).map((locale) => ({
    id: entry.id,
    locale,
    title: entry.titles[locale],
    status: entry.status,
    filePath: `./lessons/${entry.folder}/${locale}.json`,
  })),
);
const lessonFilesByKey = new Map(lessonFiles.map((entry) => [`${entry.locale}:${entry.id}`, entry]));

const curricula = {
  en: bootcampCurriculumSchema.parse(englishCurriculum),
  ru: bootcampCurriculumSchema.parse(russianCurriculum),
} as const;

export interface StructuredPracticeExercise {
  readonly lessonId: string;
  readonly lessonTitle: string;
  readonly locale: SupportedLocale;
  readonly lessonStatus: LessonPublicationStatus;
  readonly exerciseId: string;
  readonly title: string;
  readonly language: string;
  readonly context: string;
  readonly instructions: string[];
  readonly requirements: string[];
  readonly successCriteria: string[];
}

/** Build-time generated, locale-specific projection. Full lesson bodies remain independently lazy. */
interface GeneratedStructuredContentIndex {
  readonly searchDocuments: StructuredLessonSearchDocument[];
  readonly practiceExercises: StructuredPracticeExercise[];
}

const structuredContentIndexLoaders: Record<SupportedLocale, () => Promise<GeneratedStructuredContentIndex>> = {
  en: () => import('./generated/structured-content-index.en.json').then((module) => module.default as GeneratedStructuredContentIndex),
  ru: () => import('./generated/structured-content-index.ru.json').then((module) => module.default as GeneratedStructuredContentIndex),
};
const structuredContentIndexPromises = new Map<SupportedLocale, Promise<GeneratedStructuredContentIndex>>();

function getGeneratedStructuredContentIndex(locale: SupportedLocale): Promise<GeneratedStructuredContentIndex> {
  const cached = structuredContentIndexPromises.get(locale);
  if (cached) return cached;

  const pending = structuredContentIndexLoaders[locale]();
  const cachedPromise = pending.catch((error: unknown) => {
    structuredContentIndexPromises.delete(locale);
    throw error;
  });
  structuredContentIndexPromises.set(locale, cachedPromise);
  return cachedPromise;
}

/** Loads one compact generated locale index; it does not request the 44 full lesson chunks. */
export function getStructuredLessonSearchDocuments(locale: SupportedLocale): Promise<StructuredLessonSearchDocument[]> {
  return getGeneratedStructuredContentIndex(locale).then((index) => index.searchDocuments);
}

/** Lists coding exercises from the compact locale index without loading full lesson bodies. */
export function getStructuredPracticeExercises(locale: SupportedLocale): Promise<StructuredPracticeExercise[]> {
  return getGeneratedStructuredContentIndex(locale).then((index) => index.practiceExercises);
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
