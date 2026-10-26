import englishNetwork from './lessons/network.dns-tcp-tls/en.json';
import russianNetwork from './lessons/network.dns-tcp-tls/ru.json';
import englishBrowserRendering from './lessons/browser.rendering-pipeline/en.json';
import russianBrowserRendering from './lessons/browser.rendering-pipeline/ru.json';
import englishWebBasics from './lessons/web.internet-http/en.json';
import russianWebBasics from './lessons/web.internet-http/ru.json';
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
import englishTesting from './lessons/testing.react-testing-library/en.json';
import russianTesting from './lessons/testing.react-testing-library/ru.json';
import englishGitWorkflow from './lessons/git.workflow-ci/en.json';
import russianGitWorkflow from './lessons/git.workflow-ci/ru.json';
import englishCapstoneRequirements from './lessons/capstone.requirements-discovery/en.json';
import russianCapstoneRequirements from './lessons/capstone.requirements-discovery/ru.json';
import englishCapstoneDesign from './lessons/capstone.design-architecture-planning/en.json';
import russianCapstoneDesign from './lessons/capstone.design-architecture-planning/ru.json';
import englishCapstoneImplementation from './lessons/capstone.implementation/en.json';
import russianCapstoneImplementation from './lessons/capstone.implementation/ru.json';
import englishCapstoneReview from './lessons/capstone.review-demo/en.json';
import russianCapstoneReview from './lessons/capstone.review-demo/ru.json';
import englishRuntime from './lessons/js.runtime-memory/en.json';
import russianRuntime from './lessons/js.runtime-memory/ru.json';
import englishPrototypes from './lessons/js.object-prototypes/en.json';
import russianPrototypes from './lessons/js.object-prototypes/ru.json';
import englishIterators from './lessons/js.iterators-generators/en.json';
import russianIterators from './lessons/js.iterators-generators/ru.json';
import englishCollections from './lessons/js.collections-weakmaps/en.json';
import russianCollections from './lessons/js.collections-weakmaps/ru.json';
import englishRegex from './lessons/js.regex-text-processing/en.json';
import russianRegex from './lessons/js.regex-text-processing/ru.json';
import englishStorage from './lessons/browser.storage-indexeddb/en.json';
import russianStorage from './lessons/browser.storage-indexeddb/ru.json';
import englishRealtime from './lessons/browser.realtime-workers/en.json';
import russianRealtime from './lessons/browser.realtime-workers/ru.json';
import englishAuth from './lessons/frontend.auth-security/en.json';
import russianAuth from './lessons/frontend.auth-security/ru.json';
import englishDeployment from './lessons/deployment.production-hosting/en.json';
import russianDeployment from './lessons/deployment.production-hosting/ru.json';
import englishSql from './lessons/data.sql-postgresql/en.json';
import russianSql from './lessons/data.sql-postgresql/ru.json';
import englishSass from './lessons/css.sass-scss/en.json';
import russianSass from './lessons/css.sass-scss/ru.json';
import englishUiLibraries from './lessons/ui.bootstrap-mui/en.json';
import russianUiLibraries from './lessons/ui.bootstrap-mui/ru.json';
import englishArchitecture from './lessons/frontend.architecture-boundaries/en.json';
import russianArchitecture from './lessons/frontend.architecture-boundaries/ru.json';
import englishAdvancedTooling from './lessons/tooling.advanced-package-workflows/en.json';
import russianAdvancedTooling from './lessons/tooling.advanced-package-workflows/ru.json';
import englishCurriculum from './curriculum/bootcamp-core.en.json';
import russianCurriculum from './curriculum/bootcamp-core.ru.json';
import { bootcampCurriculumSchema } from './schemas/curriculum';
import { lessonTranslationSchema, type LessonTranslation } from './schemas/lessonContent';

export const SUPPORTED_LOCALES = ['en', 'ru'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const lessonTranslations = [
  lessonTranslationSchema.parse(englishNetwork),
  lessonTranslationSchema.parse(russianNetwork),
  lessonTranslationSchema.parse(englishBrowserRendering),
  lessonTranslationSchema.parse(russianBrowserRendering),
  lessonTranslationSchema.parse(englishWebBasics),
  lessonTranslationSchema.parse(russianWebBasics),
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
  lessonTranslationSchema.parse(englishTesting),
  lessonTranslationSchema.parse(russianTesting),
  lessonTranslationSchema.parse(englishGitWorkflow),
  lessonTranslationSchema.parse(russianGitWorkflow),
  lessonTranslationSchema.parse(englishCapstoneRequirements),
  lessonTranslationSchema.parse(russianCapstoneRequirements),
  lessonTranslationSchema.parse(englishCapstoneDesign),
  lessonTranslationSchema.parse(russianCapstoneDesign),
  lessonTranslationSchema.parse(englishCapstoneImplementation),
  lessonTranslationSchema.parse(russianCapstoneImplementation),
  lessonTranslationSchema.parse(englishCapstoneReview),
  lessonTranslationSchema.parse(russianCapstoneReview),
  lessonTranslationSchema.parse(englishRuntime),
  lessonTranslationSchema.parse(russianRuntime),
  lessonTranslationSchema.parse(englishPrototypes),
  lessonTranslationSchema.parse(russianPrototypes),
  lessonTranslationSchema.parse(englishIterators),
  lessonTranslationSchema.parse(russianIterators),
  lessonTranslationSchema.parse(englishCollections),
  lessonTranslationSchema.parse(russianCollections),
  lessonTranslationSchema.parse(englishRegex),
  lessonTranslationSchema.parse(russianRegex),
  lessonTranslationSchema.parse(englishStorage),
  lessonTranslationSchema.parse(russianStorage),
  lessonTranslationSchema.parse(englishRealtime),
  lessonTranslationSchema.parse(russianRealtime),
  lessonTranslationSchema.parse(englishAuth),
  lessonTranslationSchema.parse(russianAuth),
  lessonTranslationSchema.parse(englishDeployment),
  lessonTranslationSchema.parse(russianDeployment),
  lessonTranslationSchema.parse(englishSql),
  lessonTranslationSchema.parse(russianSql),
  lessonTranslationSchema.parse(englishSass),
  lessonTranslationSchema.parse(russianSass),
  lessonTranslationSchema.parse(englishUiLibraries),
  lessonTranslationSchema.parse(russianUiLibraries),
  lessonTranslationSchema.parse(englishArchitecture),
  lessonTranslationSchema.parse(russianArchitecture),
  lessonTranslationSchema.parse(englishAdvancedTooling),
  lessonTranslationSchema.parse(russianAdvancedTooling),
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

/** Resolves the supplementary track that owns a lesson, if it is outside the core syllabus. */
export function getSupplementaryTrackForLesson(lessonId: string, locale: SupportedLocale) {
  return curricula[locale].supplementaryTracks.find((track) => track.lessonIds.includes(lessonId));
}

/** Resolves a supplementary track by its stable identifier. */
export function getSupplementaryTrackById(trackId: string, locale: SupportedLocale) {
  return curricula[locale].supplementaryTracks.find((track) => track.id === trackId);
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

/** Finds neighboring lessons in core syllabus order or within one supplementary track. */
export function getAdjacentStructuredLessons(lessonId: string, locale: SupportedLocale): {
  previous: LessonTranslation | undefined;
  next: LessonTranslation | undefined;
} {
  const coreWeek = getWeekForLesson(lessonId, locale);
  const supplementaryTrack = coreWeek ? undefined : getSupplementaryTrackForLesson(lessonId, locale);
  const ids = coreWeek
    ? curricula[locale].months.flatMap((month) => month.weeks).flatMap((week) => week.lessonIds)
    : supplementaryTrack?.lessonIds ?? [];
  const orderedLessons: LessonTranslation[] = ids
    .map((id) => lessonTranslations.find((lesson) => lesson.id === id && lesson.locale === locale))
    .filter((lesson): lesson is LessonTranslation => lesson !== undefined);
  const index = orderedLessons.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? orderedLessons[index - 1] : undefined,
    next: index < orderedLessons.length - 1 ? orderedLessons[index + 1] : undefined,
  };
}