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
import englishFunctionsArrays from './lessons/js.functions-arrays-objects/en.json';
import russianFunctionsArrays from './lessons/js.functions-arrays-objects/ru.json';
import englishDom from './lessons/js.dom-events/en.json';
import russianDom from './lessons/js.dom-events/ru.json';
import englishAsync from './lessons/js.async-fetch/en.json';
import russianAsync from './lessons/js.async-fetch/ru.json';
import englishGit from './lessons/git.fundamentals/en.json';
import russianGit from './lessons/git.fundamentals/ru.json';
import englishTooling from './lessons/tooling.node-npm-vite/en.json';
import russianTooling from './lessons/tooling.node-npm-vite/ru.json';
import englishTypeScript from './lessons/typescript.fundamentals/en.json';
import russianTypeScript from './lessons/typescript.fundamentals/ru.json';
import englishReactBasics from './lessons/react.components-jsx-state/en.json';
import russianReactBasics from './lessons/react.components-jsx-state/ru.json';
import englishReactEffects from './lessons/react.effects-lists-composition/en.json';
import russianReactEffects from './lessons/react.effects-lists-composition/ru.json';
import englishRouter from './lessons/react.router-spa/en.json';
import russianRouter from './lessons/react.router-spa/ru.json';
import englishReactForms from './lessons/react.forms-validation/en.json';
import russianReactForms from './lessons/react.forms-validation/ru.json';
import englishContext from './lessons/react.context-shared-state/en.json';
import russianContext from './lessons/react.context-shared-state/ru.json';
import englishApiHooks from './lessons/react.api-custom-hooks/en.json';
import russianApiHooks from './lessons/react.api-custom-hooks/ru.json';
import englishDesignSystem from './lessons/ui.design-systems/en.json';
import russianDesignSystem from './lessons/ui.design-systems/ru.json';
import englishPerformance from './lessons/performance.accessibility/en.json';
import russianPerformance from './lessons/performance.accessibility/ru.json';
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
  lessonTranslationSchema.parse(englishFunctionsArrays),
  lessonTranslationSchema.parse(russianFunctionsArrays),
  lessonTranslationSchema.parse(englishDom),
  lessonTranslationSchema.parse(russianDom),
  lessonTranslationSchema.parse(englishAsync),
  lessonTranslationSchema.parse(russianAsync),
  lessonTranslationSchema.parse(englishGit),
  lessonTranslationSchema.parse(russianGit),
  lessonTranslationSchema.parse(englishTooling),
  lessonTranslationSchema.parse(russianTooling),
  lessonTranslationSchema.parse(englishTypeScript),
  lessonTranslationSchema.parse(russianTypeScript),
  lessonTranslationSchema.parse(englishReactBasics),
  lessonTranslationSchema.parse(russianReactBasics),
  lessonTranslationSchema.parse(englishReactEffects),
  lessonTranslationSchema.parse(russianReactEffects),
  lessonTranslationSchema.parse(englishRouter),
  lessonTranslationSchema.parse(russianRouter),
  lessonTranslationSchema.parse(englishReactForms),
  lessonTranslationSchema.parse(russianReactForms),
  lessonTranslationSchema.parse(englishContext),
  lessonTranslationSchema.parse(russianContext),
  lessonTranslationSchema.parse(englishApiHooks),
  lessonTranslationSchema.parse(russianApiHooks),
  lessonTranslationSchema.parse(englishDesignSystem),
  lessonTranslationSchema.parse(russianDesignSystem),
  lessonTranslationSchema.parse(englishPerformance),
  lessonTranslationSchema.parse(russianPerformance),
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
