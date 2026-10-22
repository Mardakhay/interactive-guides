import englishPilot from './lessons/html-document-structure/en.json';
import russianPilot from './lessons/html-document-structure/ru.json';
import englishForms from './lessons/html.forms-accessibility/en.json';
import russianForms from './lessons/html.forms-accessibility/ru.json';
import englishCss from './lessons/css.fundamentals/en.json';
import russianCss from './lessons/css.fundamentals/ru.json';
import englishLayout from './lessons/css.flexbox-grid-responsive/en.json';
import russianLayout from './lessons/css.flexbox-grid-responsive/ru.json';
import englishJsBasics from './lessons/js.basics-types-control-flow/en.json';
import russianJsBasics from './lessons/js.basics-types-control-flow/ru.json';
import englishCurriculum from './curriculum/bootcamp-core.en.json';
import russianCurriculum from './curriculum/bootcamp-core.ru.json';
import { bootcampCurriculumSchema } from './schemas/curriculum';
import { lessonTranslationSchema, type LessonTranslation } from './schemas/lessonContent';

export const SUPPORTED_LOCALES = ['en', 'ru'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const lessonTranslations = [
  lessonTranslationSchema.parse(englishPilot),
  lessonTranslationSchema.parse(russianPilot),
  lessonTranslationSchema.parse(englishForms),
  lessonTranslationSchema.parse(russianForms),
  lessonTranslationSchema.parse(englishCss),
  lessonTranslationSchema.parse(russianCss),
  lessonTranslationSchema.parse(englishLayout),
  lessonTranslationSchema.parse(russianLayout),
  lessonTranslationSchema.parse(englishJsBasics),
  lessonTranslationSchema.parse(russianJsBasics),
] as const;

const curricula = {
  en: bootcampCurriculumSchema.parse(englishCurriculum),
  ru: bootcampCurriculumSchema.parse(russianCurriculum),
} as const;

/** Returns a reviewed-or-draft translation for one stable lesson ID. */
export function getStructuredLesson(id: string, locale: SupportedLocale) {
  return lessonTranslations.find((lesson) => lesson.id === id && lesson.locale === locale);
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

/** Returns the canonical week record by its stable identifier. */
export function getCurriculumWeek(weekId: string, locale: SupportedLocale) {
  const curriculum = curricula[locale];
  return curriculum.months
    .flatMap((month) => month.weeks)
    .find((week) => week.id === weekId);
}

export function getStructuredLessonIds() {
  return [...new Set(lessonTranslations.map((lesson) => lesson.id))];
}

/** Finds neighboring available structured lessons in canonical curriculum order. */
export function getAdjacentStructuredLessons(lessonId: string, locale: SupportedLocale): {
  previous: LessonTranslation | undefined;
  next: LessonTranslation | undefined;
} {
  const orderedLessons: LessonTranslation[] = curricula[locale].months
    .flatMap((month) => month.weeks)
    .flatMap((week) =>
      week.lessonIds
        .map((id) => lessonTranslations.find((lesson) => lesson.id === id && lesson.locale === locale))
        .filter((lesson): lesson is LessonTranslation => lesson !== undefined),
    );
  const index = orderedLessons.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? orderedLessons[index - 1] : undefined,
    next: index < orderedLessons.length - 1 ? orderedLessons[index + 1] : undefined,
  };
}
