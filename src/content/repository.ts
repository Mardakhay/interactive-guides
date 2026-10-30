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

const searchDocumentsByLocale = new Map<SupportedLocale, Promise<StructuredLessonSearchDocument[]>>();

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

function blockSearchText(block: LessonContentBlock): string {
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

export function getStructuredLessonSearchDocuments(locale: SupportedLocale): Promise<StructuredLessonSearchDocument[]> {
  const cached = searchDocumentsByLocale.get(locale);
  if (cached) return cached;
  const pending = Promise.all(getStructuredLessonIds().map(async (id) => {
    const lesson = await getStructuredLesson(id, locale);
    const metadata = getStructuredLessonMetadata(id, locale);
    if (!lesson || !metadata) return null;
    return {
      ...metadata,
      description: lesson.description,
      difficulty: lesson.difficulty,
      estimatedMinutes: lesson.estimatedMinutes,
      tags: lesson.tags,
      learningOutcomes: lesson.learningOutcomes,
      searchText: [lesson.description, lesson.tags.join(' '), lesson.learningOutcomes.join(' '), lesson.blocks.map(blockSearchText).join(' ')].join(' '),
    } satisfies StructuredLessonSearchDocument;
  })).then((documents) => documents.filter((document): document is StructuredLessonSearchDocument => document !== null));
  const cachedPromise = pending.catch((error: unknown) => { searchDocumentsByLocale.delete(locale); throw error; });
  searchDocumentsByLocale.set(locale, cachedPromise);
  return cachedPromise;
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
  readonly starterCode: string;
  readonly successCriteria: string[];
  readonly estimatedMinutes: number;
  readonly difficulty: LessonTranslation['difficulty'];
}

const practiceExercisesByLocale = new Map<SupportedLocale, Promise<StructuredPracticeExercise[]>>();

/**
 * Lists authored coding exercises for the practice hub.
 * Hints and worked solutions are deliberately not copied into this learner-facing index.
 */
export function getStructuredPracticeExercises(locale: SupportedLocale): Promise<StructuredPracticeExercise[]> {
  const cached = practiceExercisesByLocale.get(locale);
  if (cached) return cached;

  const pending = Promise.all(getStructuredLessonIds().map(async (lessonId) => {
    const lesson = await getStructuredLesson(lessonId, locale);
    const metadata = getStructuredLessonMetadata(lessonId, locale);
    if (!lesson || !metadata) return [];
    return lesson.blocks.flatMap((block) => block.type === 'codingExercise' ? [{
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      locale,
      lessonStatus: lesson.status,
      exerciseId: block.id,
      title: block.title,
      language: block.language,
      context: block.context,
      instructions: block.instructions,
      requirements: block.requirements,
      starterCode: block.starterCode,
      successCriteria: block.successCriteria,
      estimatedMinutes: lesson.estimatedMinutes,
      difficulty: lesson.difficulty,
    } satisfies StructuredPracticeExercise] : []);
  })).then((groups) => groups.flat());

  const cachedPromise = pending.catch((error: unknown) => {
    practiceExercisesByLocale.delete(locale);
    throw error;
  });
  practiceExercisesByLocale.set(locale, cachedPromise);
  return cachedPromise;
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
