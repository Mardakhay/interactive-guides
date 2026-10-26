import { describe, expect, it } from 'vitest';
import englishRuntime from '../lessons/js.runtime-memory/en.json';
import russianRuntime from '../lessons/js.runtime-memory/ru.json';
import englishPrototypes from '../lessons/js.object-prototypes/en.json';
import russianPrototypes from '../lessons/js.object-prototypes/ru.json';
import englishTypedArrays from '../lessons/js.typed-arrays-binary/en.json';
import russianTypedArrays from '../lessons/js.typed-arrays-binary/ru.json';
import englishCapabilities from '../lessons/browser.capability-apis/en.json';
import russianCapabilities from '../lessons/browser.capability-apis/ru.json';
import englishAuth from '../lessons/frontend.auth-security/en.json';
import russianAuth from '../lessons/frontend.auth-security/ru.json';
import englishDeployment from '../lessons/deployment.production-hosting/en.json';
import russianDeployment from '../lessons/deployment.production-hosting/ru.json';
import englishSql from '../lessons/data.sql-postgresql/en.json';
import russianSql from '../lessons/data.sql-postgresql/ru.json';
import englishSass from '../lessons/css.sass-scss/en.json';
import russianSass from '../lessons/css.sass-scss/ru.json';
import englishUiLibraries from '../lessons/ui.bootstrap-mui/en.json';
import russianUiLibraries from '../lessons/ui.bootstrap-mui/ru.json';
import englishArchitecture from '../lessons/frontend.architecture-boundaries/en.json';
import russianArchitecture from '../lessons/frontend.architecture-boundaries/ru.json';
import englishAdvancedTooling from '../lessons/tooling.advanced-package-workflows/en.json';
import russianAdvancedTooling from '../lessons/tooling.advanced-package-workflows/ru.json';
import englishCurriculum from '../curriculum/bootcamp-core.en.json';
import russianCurriculum from '../curriculum/bootcamp-core.ru.json';
import { getStructuredLesson, getSupplementaryTrackForLesson } from '../repository';
import { bootcampCurriculumSchema } from './curriculum';
import { lessonTranslationSchema } from './lessonContent';

const lessonPairs = [
  [englishRuntime, russianRuntime],
  [englishPrototypes, russianPrototypes],
  [englishAuth, russianAuth],
  [englishDeployment, russianDeployment],
  [englishSql, russianSql],
  [englishSass, russianSass],
  [englishUiLibraries, russianUiLibraries],
  [englishArchitecture, russianArchitecture],
  [englishAdvancedTooling, russianAdvancedTooling],
  [englishCapabilities, russianCapabilities],
  [englishTypedArrays, russianTypedArrays],
] as const;

describe('supplementary source-derived lessons', () => {
  it('validates every bilingual lesson against the structured lesson schema', () => {
    for (const [english, russian] of lessonPairs) {
      expect(lessonTranslationSchema.safeParse(english).success, english.id).toBe(true);
      expect(lessonTranslationSchema.safeParse(russian).success, russian.id).toBe(true);
      expect(english.id).toBe(russian.id);
      expect(english.moduleId).toBe(russian.moduleId);
      expect(english.supplementaryTrackId).toBe(russian.supplementaryTrackId);
      expect(english.blocks.map(({ id, type }) => [id, type])).toEqual(
        russian.blocks.map(({ id, type }) => [id, type]),
      );
      expect(english.blocks.some((block) => block.type === 'references')).toBe(true);
    }
  });

  it('registers all supplementary lessons in the application repository', () => {
    for (const [english, russian] of lessonPairs) {
      expect(getStructuredLesson(english.id, 'en')).toBeDefined();
      expect(getStructuredLesson(russian.id, 'ru')).toBeDefined();
      expect(getSupplementaryTrackForLesson(english.id, 'en')?.id).toBe(english.supplementaryTrackId);
      expect(getSupplementaryTrackForLesson(russian.id, 'ru')?.id).toBe(russian.supplementaryTrackId);
    }
  });

  it('validates browser capability lesson depth and runtime safeguards', () => {
    for (const lesson of [englishCapabilities, russianCapabilities]) expect(lessonTranslationSchema.safeParse(lesson).success, lesson.locale).toBe(true);
    expect(englishCapabilities.blocks.map(({ id, type }) => [id, type])).toEqual(russianCapabilities.blocks.map(({ id, type }) => [id, type]));
    const walks = englishCapabilities.blocks.filter((block) => block.type === 'codeWalkthrough');
    expect(walks.length).toBeGreaterThanOrEqual(4);
    for (const walk of walks) if (walk.type === 'codeWalkthrough') {
      const lineCount = walk.code.split('\n').length;
      expect(walk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
    }
    const geo = englishCapabilities.blocks.find((block) => block.id === 'geolocation-walkthrough');
    expect(geo?.type === 'codeWalkthrough' && geo.code).toContain('clearWatch');
    const visibility = englishCapabilities.blocks.find((block) => block.id === 'visibility-example');
    expect(visibility?.type === 'codeWalkthrough' && visibility.code).toContain('removeEventListener("visibilitychange", onVisibilityChange)');
    const exercise = englishCapabilities.blocks.find((block) => block.id === 'capabilities-practice');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(4);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(4);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
    expect(exercise.starterCode).toContain('#use-location');
  });

  it('validates binary-data examples, ranges, and defensive exercise scaffolding', () => {
    for (const lesson of [englishTypedArrays, russianTypedArrays]) expect(lessonTranslationSchema.safeParse(lesson).success, lesson.locale).toBe(true);
    expect(englishTypedArrays.blocks.map(({ id, type }) => [id, type])).toEqual(russianTypedArrays.blocks.map(({ id, type }) => [id, type]));
    const walks = englishTypedArrays.blocks.filter((block) => block.type === 'codeWalkthrough');
    expect(walks).toHaveLength(3);
    for (const walk of walks) if (walk.type === 'codeWalkthrough') {
      const lineCount = walk.code.split('\n').length;
      expect(walk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
    }
    const dataView = englishTypedArrays.blocks.find((block) => block.id === 'dataview-walkthrough');
    expect(dataView?.type === 'codeWalkthrough' && dataView.code).toContain('true); // little-endian explicitly');
    const exercise = englishTypedArrays.blocks.find((block) => block.id === 'binary-practice');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(5);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(4);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
    expect(exercise.starterCode).toContain('new DataView(buffer)');
  });

  it('keeps EN/RU curriculum tracks consistent and points to registered lesson IDs', () => {
    const en = bootcampCurriculumSchema.parse(englishCurriculum);
    const ru = bootcampCurriculumSchema.parse(russianCurriculum);
    expect(en.supplementaryTracks.map((track) => [track.id, track.lessonIds])).toEqual(
      ru.supplementaryTracks.map((track) => [track.id, track.lessonIds]),
    );
    for (const curriculum of [en, ru]) {
      for (const track of curriculum.supplementaryTracks) {
        for (const id of track.lessonIds) {
          expect(getStructuredLesson(id, curriculum === en ? 'en' : 'ru')).toBeDefined();
        }
      }
    }
  });
});
describe('object model invocation and strict-mode depth', () => {
  it('distinguishes call/apply/bind, lexical arrow this, and strict calls', () => {
    expect(lessonTranslationSchema.safeParse(englishPrototypes).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianPrototypes).success).toBe(true);
    expect(englishPrototypes.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianPrototypes.blocks.map(({ id, type }) => ({ id, type })),
    );
    for (const id of ['invocation-walkthrough', 'arrow-this-walkthrough', 'strict-walkthrough']) {
      const walkthrough = englishPrototypes.blocks.find((block) => block.id === id);
      expect(walkthrough?.type).toBe('codeWalkthrough');
      if (walkthrough?.type !== 'codeWalkthrough') continue;
      const lines = walkthrough.code.split('\n').length;
      expect(walkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lines)).toBe(true);
    }
    const quiz = englishPrototypes.blocks.find((block) => block.id === 'invocation-check');
    expect(quiz?.type).toBe('knowledgeCheck');
    if (quiz?.type === 'knowledgeCheck') {
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
    const exercise = englishPrototypes.blocks.find((block) => block.id === 'invocation-practice');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(5);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(4);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
    expect(exercise.starterCode).toContain('formatInvoice.apply');
  });
});


describe('class semantics and shared prototype methods', () => {
  it('teaches private state, super ordering, static inheritance, and method lookup', () => {
    expect(lessonTranslationSchema.safeParse(englishPrototypes).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianPrototypes).success).toBe(true);
    expect(englishPrototypes.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianPrototypes.blocks.map(({ id, type }) => [id, type]),
    );
    const walk = englishPrototypes.blocks.find((block) => block.id === 'classes-walkthrough');
    expect(walk?.type).toBe('codeWalkthrough');
    if (walk?.type === 'codeWalkthrough') {
      const lineCount = walk.code.split('\n').length;
      expect(walk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(walk.code).toContain('super(owner, opening)');
      expect(walk.code).toContain('#balance');
      expect(walk.code).toContain('static createStarter');
    }
    const quiz = englishPrototypes.blocks.find((block) => block.id === 'classes-check');
    expect(quiz?.type).toBe('knowledgeCheck');
    if (quiz?.type === 'knowledgeCheck') {
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
    const exercise = englishPrototypes.blocks.find((block) => block.id === 'classes-practice');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(5);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(4);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
    expect(exercise.starterCode).toContain('class ElectricCar extends Vehicle');
  });
  it('covers memory identity, source caveats, and evidence-based diagnostics in both locales', () => {
    for (const lesson of [englishRuntime, russianRuntime]) {
      expect(lessonTranslationSchema.safeParse(lesson).success, lesson.locale).toBe(true);
      expect(lesson.blocks.map(({ id, type }) => [id, type])).toEqual(lesson.locale === 'en'
        ? englishRuntime.blocks.map(({ id, type }) => [id, type])
        : russianRuntime.blocks.map(({ id, type }) => [id, type]));
      const copyWalk = lesson.blocks.find((block) => block.id === 'runtime-copy-walkthrough');
      expect(copyWalk?.type).toBe('codeWalkthrough');
      if (copyWalk?.type !== 'codeWalkthrough') return;
      const lineCount = copyWalk.code.split('\\n').length;
      expect(copyWalk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(copyWalk.code).toContain('structuredClone');
      const quiz = lesson.blocks.find((block) => block.id === 'runtime-copy-check');
      expect(quiz?.type).toBe('knowledgeCheck');
      if (quiz?.type !== 'knowledgeCheck') return;
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const exercise = lesson.blocks.find((block) => block.id === 'runtime-copy-practice');
      expect(exercise?.type).toBe('codingExercise');
      if (exercise?.type !== 'codingExercise') return;
      expect(exercise.requirements).toHaveLength(4);
      expect(exercise.hints).toHaveLength(3);
      expect(exercise.successCriteria).toHaveLength(4);
      expect(exercise.starterCode).toContain('updateCity');
      expect(lesson.blocks.find((block) => block.id === 'runtime-engine-callout')?.type).toBe('callout');
      expect(lesson.blocks.find((block) => block.id === 'runtime-memory-tools')?.type).toBe('paragraph');
    }
  });

});