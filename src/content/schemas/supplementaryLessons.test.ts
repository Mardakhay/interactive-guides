import { describe, expect, it } from 'vitest';
import englishNetwork from '../lessons/network.dns-tcp-tls/en.json';
import russianNetwork from '../lessons/network.dns-tcp-tls/ru.json';

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
      expect(englishRuntime.blocks.map(({ id, type }) => [id, type])).toEqual(russianRuntime.blocks.map(({ id, type }) => [id, type]));
      const copyWalk = lesson.blocks.find((block) => block.id === 'runtime-copy-walkthrough');
      expect(copyWalk?.type).toBe('codeWalkthrough');
      if (copyWalk?.type !== 'codeWalkthrough') return;
      const lineCount = copyWalk.code.split('\n').length;
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

describe('hosting capacity and model trade-offs', () => {
  it('validates bilingual hosting evidence and useful practice criteria', () => {
    expect(lessonTranslationSchema.safeParse(englishDeployment).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianDeployment).success).toBe(true);
    expect(englishDeployment.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianDeployment.blocks.map(({ id, type }) => [id, type]),
    );
    for (const lesson of [englishDeployment, russianDeployment]) {
      const check = lesson.blocks.find((block) => block.id === 'deploy-hosting-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type === 'knowledgeCheck') {
        expect(check.options.filter((option) => option.correct)).toHaveLength(1);
        expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      }
      const models = lesson.blocks.find((block) => block.id === 'deploy-hosting-models');
      expect(models?.type).toBe('list');
      if (models?.type === 'list') expect(models.items).toHaveLength(5);
      const exercise = lesson.blocks.find((block) => block.id === 'deploy-hosting-practice');
      expect(exercise?.type).toBe('codingExercise');
      if (exercise?.type !== 'codingExercise') return;
      expect(exercise.requirements).toHaveLength(5);
      expect(exercise.hints).toHaveLength(3);
      expect(exercise.successCriteria).toHaveLength(4);
      expect(exercise.starterCode.toLowerCase()).toContain(lesson.locale === 'en' ? 'database' : 'база данных');
    }
    for (const lesson of [englishNetwork, russianNetwork]) {
      const refs = lesson.blocks.find((block) => block.type === 'references');
      expect(refs?.type === 'references' && refs.items.some((item) => item.url.includes('rfc9846'))).toBe(true);
    }
  });
});

describe('architecture colocation and public APIs', () => {
  it('teaches architecture boundaries, SOLID trade-offs, and context-aware tool choices', () => {
    for (const lesson of [englishArchitecture, russianArchitecture]) {
      expect(lessonTranslationSchema.safeParse(lesson).success, lesson.locale).toBe(true);
      expect(lesson.version).toBe(4);
      expect(lesson.blocks).toHaveLength(34);
      expect(lesson.blocks.map(({ id, type }) => [id, type])).toEqual(
        englishArchitecture.blocks.map(({ id, type }) => [id, type]),
      );
      const walk = lesson.blocks.find((block) => block.id === 'arch-colocation-public-api-walkthrough');
      expect(walk?.type).toBe('codeWalkthrough');
      if (walk?.type !== 'codeWalkthrough') return;
      const lineCount = walk.code.split('\n').length;
      expect(walk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(walk.code).toContain('index.ts');
      expect(walk.code).toContain('export { ProductCard }');
      const check = lesson.blocks.find((block) => block.id === 'arch-public-api-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') return;
      expect(check.options.filter((option) => option.correct)).toHaveLength(1);
      expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      expect(check.explanation.trim().length).toBeGreaterThan(0);
      const exercise = lesson.blocks.find((block) => block.id === 'arch-colocation-practice');
      expect(exercise?.type).toBe('codingExercise');
      if (exercise?.type !== 'codingExercise') return;
      expect(exercise.requirements.length).toBeGreaterThanOrEqual(6);
      expect(exercise.hints.length).toBeGreaterThanOrEqual(3);
      expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
      const ecosystem = lesson.blocks.find((block) => block.id === 'arch-ecosystem-guidance');
      expect(ecosystem?.type).toBe('list');
      if (ecosystem?.type === 'list') expect(ecosystem.items).toHaveLength(6);
      const references = lesson.blocks.find((block) => block.id === 'arch-boundaries-references');
      expect(references?.type).toBe('references');
      if (references?.type === 'references') {
        expect(references.items.some((item) => item.url === 'https://feature-sliced.design/docs/concepts/low-coupling')).toBe(true);
      }
      const solidPrinciples = lesson.blocks.find((block) => block.id === 'arch-solid-principles');
            expect(solidPrinciples?.type).toBe('list');
            if (solidPrinciples?.type !== 'list') return;
            expect(solidPrinciples.items).toHaveLength(5);
            expect(solidPrinciples.items.join(' ')).toContain('Single Responsibility');
            expect(solidPrinciples.items.join(' ')).toContain('Dependency Inversion');
            const solidWalk = lesson.blocks.find((block) => block.id === 'arch-solid-walkthrough');
            expect(solidWalk?.type).toBe('codeWalkthrough');
            if (solidWalk?.type !== 'codeWalkthrough') return;
            const solidLineCount = solidWalk.code.split('\n').length;
            expect(solidWalk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= solidLineCount)).toBe(true);
            expect(solidWalk.code).toContain('SaveOrder');
            expect(solidWalk.code).toContain('onSubmit');
            const solidCheck = lesson.blocks.find((block) => block.id === 'arch-solid-check');
            expect(solidCheck?.type).toBe('knowledgeCheck');
            if (solidCheck?.type !== 'knowledgeCheck') return;
            expect(solidCheck.options.filter((option) => option.correct)).toHaveLength(1);
            expect(solidCheck.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
            const solidPractice = lesson.blocks.find((block) => block.id === 'arch-solid-practice');
            expect(solidPractice?.type).toBe('codingExercise');
            if (solidPractice?.type !== 'codingExercise') return;
            expect(solidPractice.requirements.length).toBeGreaterThanOrEqual(6);
            expect(solidPractice.hints.length).toBeGreaterThanOrEqual(3);
            expect(solidPractice.successCriteria.length).toBeGreaterThanOrEqual(5);
    }
  });
});

describe('frontend authentication security and lifecycle', () => {
  it('covers status codes, JWT limits, OAuth roles and concurrent token refresh', () => {
    expect(lessonTranslationSchema.safeParse(englishAuth).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianAuth).success).toBe(true);
    expect(englishAuth.version).toBe(2);
    expect(englishAuth.blocks).toHaveLength(23);
    expect(englishAuth.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianAuth.blocks.map(({ id, type }) => [id, type]),
    );
    for (const lesson of [englishAuth, russianAuth]) {
      for (const id of ['auth-http-status-check', 'auth-jwt-validation-check', 'auth-oauth-flow-check', 'auth-refresh-race-check']) {
        const check = lesson.blocks.find((block) => block.id === id);
        expect(check?.type).toBe('knowledgeCheck');
        if (check?.type !== 'knowledgeCheck') return;
        expect(check.options.filter((option) => option.correct)).toHaveLength(1);
        expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
        expect(check.explanation.trim().length).toBeGreaterThan(0);
      }
      const refreshWalk = lesson.blocks.find((block) => block.id === 'auth-refresh-race-walkthrough');
      expect(refreshWalk?.type).toBe('codeWalkthrough');
      if (refreshWalk?.type !== 'codeWalkthrough') return;
      const lineCount = refreshWalk.code.split('\n').length;
      expect(refreshWalk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(refreshWalk.code).toContain('refreshInFlight');
      expect(refreshWalk.code).toContain('request.authRetry');
      expect(refreshWalk.code).toContain('first.status !== 401');
      const storage = lesson.blocks.find((block) => block.id === 'auth-storage-tradeoffs');
      expect(storage?.type).toBe('list');
      if (storage?.type === 'list') expect(storage.items).toHaveLength(6);
      const practice = lesson.blocks.find((block) => block.id === 'auth-practice');
      expect(practice?.type).toBe('codingExercise');
      if (practice?.type !== 'codingExercise') return;
      expect(practice.requirements.length).toBeGreaterThanOrEqual(7);
      expect(practice.hints.length).toBeGreaterThanOrEqual(4);
      expect(practice.successCriteria.length).toBeGreaterThanOrEqual(6);
      const refs = lesson.blocks.find((block) => block.id === 'auth-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') {
        expect(refs.items.some((item) => item.url === 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401')).toBe(true);
      }
    }
  });
});

describe('Material UI version compatibility guidance', () => {
  it('documents version-specific peer dependencies and the v9 migration path in both locales', () => {
    expect(lessonTranslationSchema.safeParse(englishUiLibraries).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianUiLibraries).success).toBe(true);
    expect(englishUiLibraries.version).toBe(4);
    expect(englishUiLibraries.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianUiLibraries.blocks.map(({ id, type }) => [id, type]),
    );
    for (const lesson of [englishUiLibraries, russianUiLibraries]) {
      const check = lesson.blocks.find((block) => block.id === 'uilib-version-compatibility-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') return;
      expect(check.options.filter((option) => option.correct)).toHaveLength(1);
      expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      expect(check.explanation.trim().length).toBeGreaterThan(0);
      const references = lesson.blocks.find((block) => block.id === 'uilib-references');
      expect(references?.type).toBe('references');
      if (references?.type !== 'references') return;
      expect(references.items.some((item) => item.url === 'https://mui.com/material-ui/getting-started/versions/')).toBe(true);
      expect(references.items.some((item) => item.url === 'https://mui.com/material-ui/migration/upgrade-to-v9/')).toBe(true);
    }
  });
});

describe('SQL dialect, write safety, and set-operation guidance', () => {
  it('documents version-specific CHECK enforcement and safe data-changing workflows in both locales', () => {
    expect(lessonTranslationSchema.safeParse(englishSql).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianSql).success).toBe(true);
    expect(englishSql.version).toBe(2);
    expect(englishSql.blocks).toHaveLength(46);
    expect(englishSql.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianSql.blocks.map(({ id, type }) => [id, type]),
    );
    for (const lesson of [englishSql, russianSql]) {
      const dialectNote = lesson.blocks.find((block) => block.id === 'sql-dialect-note');
      expect(dialectNote?.type).toBe('paragraph');
      if (dialectNote?.type === 'paragraph') {
        expect(dialectNote.text).toContain('8.0.16');
        expect(dialectNote.text).toContain('NOT ENFORCED');
      }
      const dialectCheck = lesson.blocks.find((block) => block.id === 'sql-dialect-check');
      expect(dialectCheck?.type).toBe('knowledgeCheck');
      if (dialectCheck?.type !== 'knowledgeCheck') return;
      expect(dialectCheck.options.filter((option) => option.correct)).toHaveLength(1);
      expect(dialectCheck.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const labNote = lesson.blocks.find((block) => block.id === 'sql-lab-boundary');
      expect(labNote?.type).toBe('callout');
      if (labNote?.type === 'callout') expect(labNote.text).toContain(lesson.locale === 'en' ? 'canned sample results' : 'заготовленные результаты');
      const walk = lesson.blocks.find((block) => block.id === 'sql-dml-safety-walkthrough');
      expect(walk?.type).toBe('codeWalkthrough');
      if (walk?.type !== 'codeWalkthrough') return;
      const lineCount = walk.code.split('\n').length;
      expect(walk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(walk.code).toContain('RETURNING product_id, unit_price');
      expect(walk.code).toContain('ROLLBACK');
      const dmlCheck = lesson.blocks.find((block) => block.id === 'sql-dml-safety-check');
      expect(dmlCheck?.type).toBe('knowledgeCheck');
      if (dmlCheck?.type !== 'knowledgeCheck') return;
      expect(dmlCheck.options.filter((option) => option.correct)).toHaveLength(1);
      const exercise = lesson.blocks.find((block) => block.id === 'sql-dml-safety-practice');
      expect(exercise?.type).toBe('codingExercise');
      if (exercise?.type !== 'codingExercise') return;
      expect(exercise.requirements.length).toBeGreaterThanOrEqual(6);
      expect(exercise.hints.length).toBeGreaterThanOrEqual(3);
      expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
      const setCheck = lesson.blocks.find((block) => block.id === 'sql-views-set-ops-check');
      expect(setCheck?.type).toBe('knowledgeCheck');
      if (setCheck?.type !== 'knowledgeCheck') return;
      expect(setCheck.options.filter((option) => option.correct)).toHaveLength(1);
      const refs = lesson.blocks.find((block) => block.id === 'sql-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') expect(refs.items.some((item) => item.url === 'https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html')).toBe(true);
    }
  });
});
