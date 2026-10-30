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

/** Returns a lightweight lesson summary without loading its full content body. */
export function getStructuredLessonMetadata(id: string, locale: SupportedLocale): StructuredLessonMetadata | undefined {
  const entry = lessonFilesByKey.get(`${locale}:${id}`);
  if (!entry) return undefined;
  return { id: entry.id, locale: entry.locale, title: entry.title, status: entry.status };
}

/** Loads and validates one lesson body on demand so opening one lesson does not download all lessons. */
export async function getStructuredLesson(id: string, locale: SupportedLocale): Promise<LessonTranslation | undefined> {
  const entry = lessonFilesByKey.get(`${locale}:${id}`);
  if (!entry) return undefined;
  if (entry.status === 'draft') return undefined;
  const load = lessonBodies[entry.filePath];
  if (!load) return undefined;
  const lesson = lessonTranslationSchema.parse(await load());
  if (lesson.id !== id || lesson.locale !== locale) {
    throw new Error(`Lesson manifest mismatch for ${locale}:${id}`);
  }
  if (lesson.status !== entry.status) {
    throw new Error(`Publication status mismatch for ${locale}:${id}; update lessonManifest.ts with the reviewed status.`);
  }
  return lesson;
}

export function getSearchableContentBlockText(block: LessonContentBlock): string {
  switch (block.type) {
    case 'heading':
    case 'paragraph':
      return block.text;
    case 'list':
      return block.items.join(' ');
    case 'commandReference':
      return block.categories.map((category) => category.title + ' ' + category.items.map((item) => item.command + ' ' + item.description).join(' ')).join(' ');
    case 'callout':
      return block.title + ' ' + block.text;
    case 'code':
      return block.language + ' ' + (block.caption ?? '') + ' ' + block.code;
    case 'codeWalkthrough':
      return block.language + ' ' + block.code + ' ' + block.steps.map((step) => step.title + ' ' + step.explanation).join(' ');
    case 'knowledgeCheck':
      return block.prompt;
    case 'codingExercise':
      return block.title + ' ' + block.context + ' ' + block.instructions.join(' ') + ' ' + block.requirements.join(' ') + ' ' + block.successCriteria.join(' ');
    case 'references':
      return block.items.map((item) => item.title + ' ' + item.url).join(' ');
    default:
      return '';
  }
}


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

/** A bounded generated search-index part. Full lesson bodies remain independently lazy. */
interface GeneratedStructuredSearchIndexPart {
  readonly searchDocuments: StructuredLessonSearchDocument[];
}

interface GeneratedStructuredPracticeIndex {
  readonly practiceExercises: StructuredPracticeExercise[];
}

const SEARCH_INDEX_PART_COUNT = 6;

const structuredSearchIndexLoaders: Record<SupportedLocale, Array<() => Promise<GeneratedStructuredSearchIndexPart>>> = {
  en: [
    () => import('./generated/structured-search-index.en.0.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.en.1.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.en.2.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.en.3.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.en.4.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.en.5.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
  ],
  ru: [
    () => import('./generated/structured-search-index.ru.0.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.ru.1.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.ru.2.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.ru.3.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.ru.4.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
    () => import('./generated/structured-search-index.ru.5.json').then((module) => module.default as GeneratedStructuredSearchIndexPart),
  ],
};

const structuredPracticeIndexLoaders: Record<SupportedLocale, () => Promise<GeneratedStructuredPracticeIndex>> = {
  en: () => import('./generated/structured-practice-index.en.json').then((module) => module.default as GeneratedStructuredPracticeIndex),
  ru: () => import('./generated/structured-practice-index.ru.json').then((module) => module.default as GeneratedStructuredPracticeIndex),
};

const searchIndexPromisesByLocale = new Map<SupportedLocale, Promise<StructuredLessonSearchDocument[]>>();
const practiceIndexPromisesByLocale = new Map<SupportedLocale, Promise<StructuredPracticeExercise[]>>();

function cacheLocaleIndex<T>(
  cache: Map<SupportedLocale, Promise<T>>,
  locale: SupportedLocale,
  load: () => Promise<T>,
): Promise<T> {
  const cached = cache.get(locale);
  if (cached) return cached;
  const pending = load();
  const cachedPromise = pending.catch((error: unknown) => {
    cache.delete(locale);
    throw error;
  });
  cache.set(locale, cachedPromise);
  return cachedPromise;
}

/** Loads bounded search parts for one locale; this never requests full lesson body chunks. */
export function getStructuredLessonSearchDocuments(locale: SupportedLocale): Promise<StructuredLessonSearchDocument[]> {
  return cacheLocaleIndex(searchIndexPromisesByLocale, locale, async () => {
    const parts = await Promise.all(structuredSearchIndexLoaders[locale].map((load) => load()));
    if (parts.length !== SEARCH_INDEX_PART_COUNT) {
      throw new Error('Incomplete generated search index for locale ' + locale);
    }
    return parts.flatMap((part) => part.searchDocuments);
  });
}

/** Loads only the exercise summary projection, not the much larger search text index. */
export function getStructuredPracticeExercises(locale: SupportedLocale): Promise<StructuredPracticeExercise[]> {
  return cacheLocaleIndex(practiceIndexPromisesByLocale, locale, async () => {
    const index = await structuredPracticeIndexLoaders[locale]();
    return index.practiceExercises;
  });
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
