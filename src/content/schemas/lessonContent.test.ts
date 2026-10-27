import { describe, expect, it } from 'vitest';
import englishNetwork from '../lessons/network.dns-tcp-tls/en.json';
import russianNetwork from '../lessons/network.dns-tcp-tls/ru.json';
import englishBrowserRendering from '../lessons/browser.rendering-pipeline/en.json';
import russianBrowserRendering from '../lessons/browser.rendering-pipeline/ru.json';
import englishIterators from '../lessons/js.iterators-generators/en.json';
import russianIterators from '../lessons/js.iterators-generators/ru.json';
import englishCollections from '../lessons/js.collections-weakmaps/en.json';
import russianCollections from '../lessons/js.collections-weakmaps/ru.json';
import englishRegex from '../lessons/js.regex-text-processing/en.json';
import russianRegex from '../lessons/js.regex-text-processing/ru.json';
import englishStorage from '../lessons/browser.storage-indexeddb/en.json';
import russianStorage from '../lessons/browser.storage-indexeddb/ru.json';
import englishJsFunctions from '../lessons/js.functions-arrays-objects/en.json';
import russianJsFunctions from '../lessons/js.functions-arrays-objects/ru.json';
import englishRealtime from '../lessons/browser.realtime-workers/en.json';
import russianRealtime from '../lessons/browser.realtime-workers/ru.json';
import englishLesson from '../lessons/html-document-structure/en.json';
import russianLesson from '../lessons/html-document-structure/ru.json';
import englishForms from '../lessons/html.forms-accessibility/en.json';
import russianForms from '../lessons/html.forms-accessibility/ru.json';
import englishCss from '../lessons/css.fundamentals/en.json';
import russianCss from '../lessons/css.fundamentals/ru.json';
import englishLayout from '../lessons/css.flexbox-grid-responsive/en.json';
import russianLayout from '../lessons/css.flexbox-grid-responsive/ru.json';
import englishJsBasics from '../lessons/js.basics-types-control-flow/en.json';
import russianJsBasics from '../lessons/js.basics-types-control-flow/ru.json';
import englishDom from '../lessons/js.dom-events/en.json';
import russianDom from '../lessons/js.dom-events/ru.json';
import englishAsync from '../lessons/js.async-fetch/en.json';
import russianAsync from '../lessons/js.async-fetch/ru.json';
import englishGit from '../lessons/git.fundamentals/en.json';
import russianGit from '../lessons/git.fundamentals/ru.json';
import englishTooling from '../lessons/tooling.node-npm-vite/en.json';
import russianTooling from '../lessons/tooling.node-npm-vite/ru.json';
import englishTypeScript from '../lessons/typescript.fundamentals/en.json';
import russianTypeScript from '../lessons/typescript.fundamentals/ru.json';
import englishReactEffects from '../lessons/react.effects-lists-composition/en.json';
import russianReactEffects from '../lessons/react.effects-lists-composition/ru.json';
import englishRouter from '../lessons/react.router-spa/en.json';
import russianRouter from '../lessons/react.router-spa/ru.json';
import englishReactForms from '../lessons/react.forms-validation/en.json';
import russianReactForms from '../lessons/react.forms-validation/ru.json';
import englishContext from '../lessons/react.context-shared-state/en.json';
import russianContext from '../lessons/react.context-shared-state/ru.json';
import englishApiHooks from '../lessons/react.api-custom-hooks/en.json';
import russianApiHooks from '../lessons/react.api-custom-hooks/ru.json';
import englishReactBasics from '../lessons/react.components-jsx-state/en.json';
import russianReactBasics from '../lessons/react.components-jsx-state/ru.json';
import englishDesignSystem from '../lessons/ui.design-systems/en.json';
import russianDesignSystem from '../lessons/ui.design-systems/ru.json';
import englishUiEcosystem from '../lessons/ui.bootstrap-mui/en.json';
import russianUiEcosystem from '../lessons/ui.bootstrap-mui/ru.json';
import englishPerformance from '../lessons/performance.accessibility/en.json';
import russianPerformance from '../lessons/performance.accessibility/ru.json';
import englishTesting from '../lessons/testing.react-testing-library/en.json';
import russianTesting from '../lessons/testing.react-testing-library/ru.json';
import englishGitWorkflow from '../lessons/git.workflow-ci/en.json';
import russianGitWorkflow from '../lessons/git.workflow-ci/ru.json';
import englishDeployment from '../lessons/deployment.production-hosting/en.json';
import russianDeployment from '../lessons/deployment.production-hosting/ru.json';
import englishCapstoneRequirements from '../lessons/capstone.requirements-discovery/en.json';
import russianCapstoneRequirements from '../lessons/capstone.requirements-discovery/ru.json';
import englishCapstoneDesign from '../lessons/capstone.design-architecture-planning/en.json';
import russianCapstoneDesign from '../lessons/capstone.design-architecture-planning/ru.json';
import englishCapstoneImplementation from '../lessons/capstone.implementation/en.json';
import russianCapstoneImplementation from '../lessons/capstone.implementation/ru.json';
import englishCapstoneReview from '../lessons/capstone.review-demo/en.json';
import russianCapstoneReview from '../lessons/capstone.review-demo/ru.json';
import { lessonTranslationSchema } from './lessonContent';

describe('structured lesson content', () => {
  it('accepts both pilot lesson translations', () => {
    expect(lessonTranslationSchema.safeParse(englishLesson).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianLesson).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(englishForms).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianForms).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(englishCss).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianCss).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(englishLayout).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianLayout).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(englishJsBasics).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianJsBasics).success).toBe(true);
  });

  it('keeps stable lesson identity and equivalent content structure across locales', () => {
    expect(englishLesson.id).toBe(russianLesson.id);
    expect(englishLesson.moduleId).toBe(russianLesson.moduleId);
    expect(englishLesson.week).toBe(russianLesson.week);
    expect(englishLesson.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianLesson.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishLesson.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    expect(russianLesson.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });

  it('rejects a single-choice question with two correct answers', () => {
    const invalidLesson = structuredClone(englishLesson);
    const question = invalidLesson.blocks.find((block) => block.id === 'knowledge-check-1');
    if (!question || question.type !== 'knowledgeCheck') {
      throw new Error('Pilot fixture is missing knowledge-check-1');
    }
    question.options[1]!.correct = true;

    expect(lessonTranslationSchema.safeParse(invalidLesson).success).toBe(false);
  });

  it('rejects duplicate block IDs', () => {
    const invalidLesson = structuredClone(englishLesson);
    invalidLesson.blocks[1]!.id = invalidLesson.blocks[0]!.id;

    expect(lessonTranslationSchema.safeParse(invalidLesson).success).toBe(false);
  });

  it('requires source references in each lesson', () => {
    const invalidLesson = structuredClone(englishLesson);
    invalidLesson.blocks = invalidLesson.blocks.filter((block) => block.type !== 'references');

    expect(lessonTranslationSchema.safeParse(invalidLesson).success).toBe(false);
  });
});

describe('HTML forms and accessibility lesson translation', () => {
  it('uses the same stable block structure in English and Russian', () => {
    expect(englishForms.id).toBe(russianForms.id);
    expect(englishForms.moduleId).toBe('month-1-week-2');
    expect(englishForms.week).toBe(2);
    expect(englishForms.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianForms.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishForms.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
    expect(russianForms.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('iterators and generators supplementary lesson', () => {
  it('teaches the protocol with aligned examples and applied practice', () => {
    expect(lessonTranslationSchema.safeParse(englishIterators).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianIterators).success).toBe(true);
    expect(englishIterators.id).toBe('js.iterators-generators');
    expect(englishIterators.supplementaryTrackId).toBe('supplement-js-internals');
    expect(englishIterators.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianIterators.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishIterators.blocks.filter((item) => item.type === 'knowledgeCheck')).toHaveLength(2);
    expect(englishIterators.blocks.filter((item) => item.type === 'codeWalkthrough')).toHaveLength(3);
    expect(englishIterators.blocks.filter((item) => item.type === 'codingExercise')).toHaveLength(1);
    expect(englishIterators.blocks.map((item) => item.id)).toEqual(
      expect.arrayContaining([
        'iter-generator-walkthrough',
        'iter-protocol-walkthrough',
        'iter-return-check',
        'iter-cleanup-walkthrough',
        'iter-practice',
      ]),
    );
    const practice = englishIterators.blocks.find((item) => item.id === 'iter-practice');
    expect(practice).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('empty range')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('early')]),
    });
  });
});

describe('HTML media content', () => {
  it('teaches image alternatives, captions, and bilingual media practice', () => {
    expect(englishLesson.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianLesson.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishLesson.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(englishLesson.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(englishLesson.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(5);
    expect(englishLesson.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'html-media-body',
        'html-media-walkthrough',
        'html-media-check',
        'html-media-practice',
        'html-data-tables-body',
        'html-data-table-walkthrough',
        'html-data-table-check',
        'html-data-table-practice',
      ]),
    );
    const tablePractice = englishLesson.blocks.find((block) => block.id === 'html-data-table-practice');
    expect(tablePractice).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('scope')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('row and column header')]),
    });
    const mediaPractice = englishLesson.blocks.find((block) => block.id === 'html-media-practice');
    expect(mediaPractice).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('captions')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('keyboard')]),
    });
  });
});

describe('CSS fundamentals lesson translation', () => {
  it('keeps the same learning structure in both locales', () => {
    expect(englishCss.id).toBe(russianCss.id);
    expect(englishCss.moduleId).toBe('month-1-week-3');
    expect(englishCss.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianCss.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishCss.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(russianCss.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    expect(englishCss.blocks.map((block) => block.id)).toContain('css-color-values');
    expect(englishCss.blocks.map((block) => block.id)).toContain('css-accessibility');
    expect(englishCss.blocks.map((block) => block.id)).toContain('css-accessible-theme-card');
    expect(englishCss.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(6);
    expect(englishCss.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(4);
    expect(englishCss.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'css-margin-collapse-body',
        'css-margin-collapse-walkthrough',
        'css-margin-collapse-check',
        'css-margin-collapse-practice',
      ]),
    );
    const marginPractice = englishCss.blocks.find((block) => block.id === 'css-margin-collapse-practice');
    expect(marginPractice).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('DevTools')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('normal-flow')]),
    });
  });
});

describe('Flexbox, Grid and responsive design lesson translation', () => {
  it('keeps identical content-block structure in both locales', () => {
    expect(englishLayout.id).toBe(russianLayout.id);
    expect(englishLayout.moduleId).toBe('month-1-week-4');
    expect(englishLayout.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianLayout.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishLayout.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
    expect(russianLayout.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('code walkthrough line references', () => {
  it('rejects a walkthrough step that points beyond the sample code', () => {
    const invalidLesson = structuredClone(englishForms);
    const walkthrough = invalidLesson.blocks.find((block) => block.id === 'basic-form');
    if (!walkthrough || walkthrough.type !== 'codeWalkthrough') {
      throw new Error('Pilot fixture is missing the form walkthrough');
    }
    walkthrough.steps[0]!.lineEnd = walkthrough.code.split('\n').length + 1;
    expect(lessonTranslationSchema.safeParse(invalidLesson).success).toBe(false);
  });
});

describe('JavaScript basics lesson translation', () => {
  it('keeps the same learning structure in both locales', () => {
    expect(englishJsBasics.id).toBe(russianJsBasics.id);
    expect(englishJsBasics.moduleId).toBe('month-2-week-5');
    expect(englishJsBasics.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianJsBasics.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishJsBasics.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
    expect(russianJsBasics.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('Async JavaScript and Fetch lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishAsync.id).toBe(russianAsync.id);
    expect(englishAsync.moduleId).toBe('month-2-week-8');
    expect(englishAsync.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianAsync.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishAsync.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
    expect(russianAsync.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('Git fundamentals lesson translation', () => {
  it('keeps equivalent block structure in both locales', () => {
    expect(englishGit.id).toBe(russianGit.id);
    expect(englishGit.moduleId).toBe('month-2-week-8');
    expect(englishGit.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianGit.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishGit.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
    expect(russianGit.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('Node.js and project tooling lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishTooling.id).toBe(russianTooling.id);
    expect(englishTooling.moduleId).toBe('month-3-week-9');
    expect(englishTooling.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianTooling.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishTooling.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
    expect(russianTooling.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('TypeScript fundamentals lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishTypeScript.id).toBe(russianTypeScript.id);
    expect(englishTypeScript.moduleId).toBe('month-3-week-10');
    expect(englishTypeScript.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianTypeScript.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishTypeScript.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
    expect(russianTypeScript.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('React effects and lists lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishReactEffects.id).toBe(russianReactEffects.id);
    expect(englishReactEffects.moduleId).toBe('month-3-week-12');
    expect(englishReactEffects.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianReactEffects.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishReactEffects.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(russianReactEffects.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(englishReactEffects.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(6);
    expect(russianReactEffects.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(6);
    expect(englishReactEffects.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(4);
    expect(russianReactEffects.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(4);
    expect(englishReactEffects.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'effect-widget-walkthrough',
        'effect-storage-walkthrough',
        'effect-cleanup-check',
        'effect-external-practice',
        'list-pipeline-heading', 'list-pipeline-model', 'list-pipeline-walkthrough', 'list-pipeline-check', 'list-pipeline-practice',
      ]),
    );
    const pipeline = englishReactEffects.blocks.find((block) => block.id === 'list-pipeline-walkthrough');
    expect(pipeline?.type).toBe('codeWalkthrough');
    if (pipeline?.type === 'codeWalkthrough') {
      expect(pipeline.code).toContain('.filter(');
      expect(pipeline.code).toContain('.sort(');
      expect(pipeline.code).toContain('key={product.id}');
      expect(pipeline.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= pipeline.code.split('\n').length)).toBe(true);
    }
    const pipelineQuiz = englishReactEffects.blocks.find((block) => block.id === 'list-pipeline-check');
    expect(pipelineQuiz?.type).toBe('knowledgeCheck');
    if (pipelineQuiz?.type === 'knowledgeCheck') {
      expect(pipelineQuiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(pipelineQuiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(pipelineQuiz.explanation.trim().length).toBeGreaterThan(0);
    }
    const pipelinePractice = englishReactEffects.blocks.find((block) => block.id === 'list-pipeline-practice');
    expect(pipelinePractice?.type).toBe('codingExercise');
    if (pipelinePractice?.type === 'codingExercise') {
      expect(pipelinePractice.requirements.length).toBeGreaterThanOrEqual(5);
      expect(pipelinePractice.hints.length).toBeGreaterThanOrEqual(3);
      expect(pipelinePractice.successCriteria.length).toBeGreaterThanOrEqual(5);
    }
    const externalPractice = englishReactEffects.blocks.find(
      (block) => block.id === 'effect-external-practice',
    );
    expect(externalPractice).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('cleanup')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('destroyed')]),
    });
  });
});

describe('React Router lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishRouter.id).toBe(russianRouter.id);
    expect(englishRouter.moduleId).toBe('month-4-week-13');
    expect(englishRouter.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianRouter.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishRouter.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
    expect(russianRouter.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('React forms and validation lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishReactForms.id).toBe(russianReactForms.id);
    expect(englishReactForms.moduleId).toBe('month-4-week-14');
    expect(englishReactForms.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianReactForms.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishReactForms.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(10);
    expect(russianReactForms.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('React shared state and Context lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishContext.id).toBe(russianContext.id);
    expect(englishContext.moduleId).toBe('month-4-week-15');
    expect(englishContext.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianContext.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishContext.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(russianContext.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('React API and custom hooks lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishApiHooks.id).toBe(russianApiHooks.id);
    expect(englishApiHooks.moduleId).toBe('month-4-week-16');
    expect(englishApiHooks.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianApiHooks.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishApiHooks.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(russianApiHooks.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(englishApiHooks.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(russianApiHooks.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(englishApiHooks.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(4);
    expect(russianApiHooks.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(4);
    expect(englishApiHooks.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'api-fetch-axios-body',
        'api-fetch-walkthrough',
        'api-fetch-status-check',
        'api-client-choice-practice',
      ]),
    );
    expect(englishApiHooks.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining(['api-debounce-heading', 'api-debounce-model', 'api-debounce-walkthrough', 'api-debounce-check', 'api-debounce-practice']),
    );
    const debounceWalkthrough = englishApiHooks.blocks.find((block) => block.id === 'api-debounce-walkthrough');
    expect(debounceWalkthrough?.type).toBe('codeWalkthrough');
    if (debounceWalkthrough?.type === 'codeWalkthrough') {
      expect(debounceWalkthrough.code).toContain('clearTimeout');
      expect(debounceWalkthrough.steps.some((step) => step.explanation.includes('AbortController'))).toBe(true);
      const lineCount = debounceWalkthrough.code.split('\n').length;
      expect(debounceWalkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
    }
    const debounceCheck = englishApiHooks.blocks.find((block) => block.id === 'api-debounce-check');
    expect(debounceCheck?.type).toBe('knowledgeCheck');
    if (debounceCheck?.type === 'knowledgeCheck') {
      expect(debounceCheck.options.filter((option) => option.correct)).toHaveLength(1);
      expect(debounceCheck.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(debounceCheck.explanation.trim().length).toBeGreaterThan(0);
    }
    const debouncePractice = englishApiHooks.blocks.find((block) => block.id === 'api-debounce-practice');
    expect(debouncePractice?.type).toBe('codingExercise');
    if (debouncePractice?.type === 'codingExercise') {
      expect(debouncePractice.requirements.length).toBeGreaterThanOrEqual(5);
      expect(debouncePractice.hints.length).toBeGreaterThanOrEqual(3);
      expect(debouncePractice.successCriteria.length).toBeGreaterThanOrEqual(5);
    }
    const clientChoicePractice = englishApiHooks.blocks.find(
      (block) => block.id === 'api-client-choice-practice',
    );
    expect(clientChoicePractice).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('HTTP non-success')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('network error')]),
    });
  });
});

describe('supplementary UI ecosystem lesson', () => {
  it('preserves bilingual Bootstrap and MUI explanations, checks, and practice', () => {
    expect(lessonTranslationSchema.safeParse(englishUiEcosystem).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianUiEcosystem).success).toBe(true);
    expect(englishUiEcosystem.id).toBe('ui.bootstrap-mui');
    expect(englishUiEcosystem.supplementaryTrackId).toBe('supplement-ui-ecosystem');
    expect(englishUiEcosystem.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianUiEcosystem.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishUiEcosystem.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'uilib-bootstrap-collapse',
        'uilib-collapse-check',
        'uilib-grid-cards',
        'uilib-carousel-tradeoff',
        'uilib-bootstrap-task',
        'uilib-mui-form-walkthrough',
        'uilib-mui-form-check',
      ]),
    );
    expect(englishUiEcosystem.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
    expect(englishUiEcosystem.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(englishUiEcosystem.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(3);
    expect(englishUiEcosystem.blocks.some((block) => block.id === 'uilib-mui-form-practice')).toBe(true);
    expect(russianUiEcosystem.blocks.some((block) => block.id === 'uilib-mui-form-practice')).toBe(true);
    const muiPractice = englishUiEcosystem.blocks.find((block) => block.id === 'uilib-mui-form-check');
    expect(muiPractice).toMatchObject({ type: 'knowledgeCheck', options: expect.arrayContaining([
      expect.objectContaining({ correct: true, feedback: expect.stringContaining('server') }),
    ]) });
  });
});

describe('DOM and events lesson translation', () => {
  it('keeps stable identity and block structure in both locales', () => {
    expect(englishDom.id).toBe(russianDom.id);
    expect(englishDom.moduleId).toBe('month-2-week-7');
    expect(englishDom.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianDom.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishDom.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(10);
    expect(russianDom.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(10);
    expect(englishDom.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(14);
    expect(russianDom.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(14);
    expect(englishDom.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(5);
    expect(russianDom.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(5);
    expect(englishDom.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'dom-fragment-walkthrough',
        'dom-intersection-walkthrough',
        'dom-mutation-walkthrough',
        'dom-custom-event-walkthrough',
        'dom-observer-check',
        'dom-rate-control',
        'dom-advanced-practice',
      ]),
    );
    const advancedPractice = englishDom.blocks.find((block) => block.id === 'dom-advanced-practice');
    expect(advancedPractice).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('observer')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('Observers')]),
    });
  });

  it('teaches traversal, content properties and state-driven rendering in both locales', () => {
    for (const lesson of [englishDom, russianDom]) {
      expect(lessonTranslationSchema.safeParse(lesson).success).toBe(true);
      expect(lesson.version).toBe(4);
      for (const id of ['dom-traversal-walkthrough', 'dom-content-walkthrough', 'dom-state-render-walkthrough']) {
        const walkthrough = lesson.blocks.find((block) => block.id === id);
        expect(walkthrough?.type).toBe('codeWalkthrough');
        if (walkthrough?.type !== 'codeWalkthrough') return;
        const lineCount = walkthrough.code.split('\n').length;
        expect(walkthrough.steps.every((step) => (step.lineEnd ?? 1) <= lineCount)).toBe(true);
      }
      const traversal = lesson.blocks.find((block) => block.id === 'dom-traversal-walkthrough');
      if (traversal?.type === 'codeWalkthrough') {
        expect(traversal.code).toContain('firstElementChild');
        expect(traversal.code).toContain('firstChild.nodeType');
        expect(traversal.code).toContain('closest');
      }
      const content = lesson.blocks.find((block) => block.id === 'dom-content-walkthrough');
      if (content?.type === 'codeWalkthrough') {
        expect(content.code).toContain('innerText');
        expect(content.code).toContain('textContent');
        expect(content.code).toContain('innerHTML +=');
      }
      const state = lesson.blocks.find((block) => block.id === 'dom-state-render-walkthrough');
      if (state?.type === 'codeWalkthrough') {
        expect(state.code).toContain("toggle('open', state.isOpen)");
        expect(state.code).toContain('aria-expanded');
      }
      const contentCheck = lesson.blocks.find((block) => block.id === 'dom-content-check');
      expect(contentCheck?.type).toBe('knowledgeCheck');
      if (contentCheck?.type === 'knowledgeCheck') {
        expect(contentCheck.questionType).toBe('multi-select');
        expect(contentCheck.options.filter((option) => option.correct)).toHaveLength(2);
      }
      const practice = lesson.blocks.find((block) => block.id === 'dom-card-manager-practice');
      expect(practice?.type).toBe('codingExercise');
      if (practice?.type !== 'codingExercise') return;
      expect(practice.starterCode.match(/TODO \d/g)).toHaveLength(6);
      expect(practice.instructions).toHaveLength(5);
      expect(practice.requirements).toHaveLength(5);
      expect(practice.hints.join(' ')).toContain('onerror');
      expect(practice.successCriteria).toHaveLength(4);
    }
    expect(englishDom.learningOutcomes).toHaveLength(russianDom.learningOutcomes.length);
  });
});

describe('React fundamentals lesson translation', () => {
  it('keeps stable identity and block structure in both locales', () => {
    expect(englishReactBasics.id).toBe(russianReactBasics.id);
    expect(englishReactBasics.moduleId).toBe('month-3-week-11');
    expect(englishReactBasics.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianReactBasics.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishReactBasics.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
    expect(russianReactBasics.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('UI design system lesson translation', () => {
  it('validates both locales and preserves equivalent block structure', () => {
    expect(lessonTranslationSchema.safeParse(englishDesignSystem).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianDesignSystem).success).toBe(true);
    expect(englishDesignSystem.id).toBe(russianDesignSystem.id);
    expect(englishDesignSystem.moduleId).toBe('month-5-week-17');
    expect(englishDesignSystem.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianDesignSystem.blocks.map(({ id, type }) => ({ id, type })),
    );
  });
});

describe('Performance and accessibility lesson translation', () => {
  it('validates both locales and preserves equivalent block structure', () => {
    expect(lessonTranslationSchema.safeParse(englishPerformance).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianPerformance).success).toBe(true);
    expect(englishPerformance.id).toBe(russianPerformance.id);
    expect(englishPerformance.moduleId).toBe('month-5-week-18');
    expect(englishPerformance.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianPerformance.blocks.map(({ id, type }) => ({ id, type })),
    );
  });
});

describe('React component testing lesson translation', () => {
  it('validates both locales and preserves equivalent block structure', () => {
    expect(lessonTranslationSchema.safeParse(englishTesting).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianTesting).success).toBe(true);
    expect(englishTesting.id).toBe(russianTesting.id);
    expect(englishTesting.moduleId).toBe('month-5-week-19');
    expect(englishTesting.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianTesting.blocks.map(({ id, type }) => ({ id, type })),
    );
  });
});

describe('Git workflow lesson translation', () => {
  it('validates both locales and preserves equivalent block structure', () => {
    expect(lessonTranslationSchema.safeParse(englishGitWorkflow).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianGitWorkflow).success).toBe(true);
    expect(englishGitWorkflow.id).toBe(russianGitWorkflow.id);
    expect(englishGitWorkflow.moduleId).toBe('month-5-week-20');
    expect(englishGitWorkflow.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianGitWorkflow.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishGitWorkflow.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(russianGitWorkflow.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(englishGitWorkflow.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(3);
    expect(russianGitWorkflow.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(3);
    expect(englishGitWorkflow.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(3);
    expect(russianGitWorkflow.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(3);
    expect(englishGitWorkflow.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'git-cd-body',
        'git-cd-walkthrough',
        'git-cd-check',
        'git-pipeline-simulation',
      ]),
    );
    const pipelineSimulation = englishGitWorkflow.blocks.find(
      (block) => block.id === 'git-pipeline-simulation',
    );
    expect(pipelineSimulation).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('exact commit SHA')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('rollback')]),
    });
  });
});

describe('deployment and production hosting lesson translation', () => {
  it('covers provider-specific custom domains with aligned DNS/HTTPS guidance', () => {
    expect(lessonTranslationSchema.safeParse(englishDeployment).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianDeployment).success).toBe(true);
    expect(englishDeployment.id).toBe('deployment.production-hosting');
    expect(englishDeployment.id).toBe(russianDeployment.id);
    expect(englishDeployment.moduleId).toBe(russianDeployment.moduleId);
    expect(englishDeployment.version).toBe(3);
    expect(englishDeployment.blocks.map(({ id, type }) => ({ id, type }))).toEqual(russianDeployment.blocks.map(({ id, type }) => ({ id, type })));
    expect(englishDeployment.blocks).toHaveLength(30);
    expect(englishDeployment.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(4);
    expect(englishDeployment.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
    expect(englishDeployment.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(4);
    expect(englishDeployment.blocks.map((block) => block.id)).toEqual(expect.arrayContaining(['deploy-domain-heading', 'deploy-domain-walkthrough', 'deploy-domain-check', 'deploy-domain-practice']));
    for (const walkthrough of englishDeployment.blocks.filter((block) => block.type === 'codeWalkthrough')) {
      const lineCount = walkthrough.code.split('\n').length;
      expect(walkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
    }
    const domainCheck = englishDeployment.blocks.find((block) => block.id === 'deploy-domain-check');
    expect(domainCheck?.type).toBe('knowledgeCheck');
    if (domainCheck?.type !== 'knowledgeCheck') return;
    expect(domainCheck.options.filter((option) => option.correct)).toHaveLength(1);
    expect(domainCheck.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
    expect(domainCheck.explanation.trim().length).toBeGreaterThan(0);
    const domainPractice = englishDeployment.blocks.find((block) => block.id === 'deploy-domain-practice');
    expect(domainPractice?.type).toBe('codingExercise');
    if (domainPractice?.type !== 'codingExercise') return;
    expect(domainPractice.requirements.join(' ')).toContain('MX/TXT');
    expect(domainPractice.requirements.join(' ')).toContain('provider');
    expect(domainPractice.hints.length).toBeGreaterThanOrEqual(3);
    expect(domainPractice.successCriteria.length).toBeGreaterThanOrEqual(5);
    const references = englishDeployment.blocks.find((block) => block.id === 'deploy-references');
    expect(references?.type).toBe('references');
    if (references?.type !== 'references') return;
    expect(references.items.some((item) => item.url === 'https://vercel.com/docs/domains/set-up-custom-domain')).toBe(true);
    expect(references.items.some((item) => item.url === 'https://docs.netlify.com/domains-https/custom-domains/')).toBe(true);
  });
});
describe('Capstone requirements discovery lesson translation', () => {
  it('validates both locales and preserves equivalent block structure', () => {
    expect(lessonTranslationSchema.safeParse(englishCapstoneRequirements).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianCapstoneRequirements).success).toBe(true);
    expect(englishCapstoneRequirements.id).toBe(russianCapstoneRequirements.id);
    expect(englishCapstoneRequirements.moduleId).toBe('month-6-week-21');
    expect(englishCapstoneRequirements.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianCapstoneRequirements.blocks.map(({ id, type }) => ({ id, type })),
    );
  });
});

describe('Capstone design and architecture lesson translation', () => {
  it('validates both locales and preserves equivalent block structure', () => {
    expect(lessonTranslationSchema.safeParse(englishCapstoneDesign).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianCapstoneDesign).success).toBe(true);
    expect(englishCapstoneDesign.id).toBe(russianCapstoneDesign.id);
    expect(englishCapstoneDesign.moduleId).toBe('month-6-week-22');
    expect(englishCapstoneDesign.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianCapstoneDesign.blocks.map(({ id, type }) => ({ id, type })),
    );
  });
});

describe('Capstone implementation lesson translation', () => {
  it('validates both locales and preserves equivalent block structure', () => {
    expect(lessonTranslationSchema.safeParse(englishCapstoneImplementation).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianCapstoneImplementation).success).toBe(true);
    expect(englishCapstoneImplementation.id).toBe(russianCapstoneImplementation.id);
    expect(englishCapstoneImplementation.moduleId).toBe('month-6-week-23');
    expect(englishCapstoneImplementation.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianCapstoneImplementation.blocks.map(({ id, type }) => ({ id, type })),
    );
  });
});

describe('Capstone review and demo lesson translation', () => {
  it('validates both locales and preserves equivalent block structure', () => {
    expect(lessonTranslationSchema.safeParse(englishCapstoneReview).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianCapstoneReview).success).toBe(true);
    expect(englishCapstoneReview.id).toBe(russianCapstoneReview.id);
    expect(englishCapstoneReview.moduleId).toBe('month-6-week-24');
    expect(englishCapstoneReview.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianCapstoneReview.blocks.map(({ id, type }) => ({ id, type })),
    );
  });
});

describe('supplementary lesson placement and locale parity', () => {
  it('accepts both locales and keeps their ordered block structure aligned', () => {
    for (const [en, ru] of [[englishNetwork, russianNetwork], [englishBrowserRendering, russianBrowserRendering]] as const) {
      expect(lessonTranslationSchema.safeParse(en).success).toBe(true);
      expect(lessonTranslationSchema.safeParse(ru).success).toBe(true);
      expect(en.id).toBe(ru.id);
      expect(en.week).toBeUndefined();
      expect(ru.week).toBeUndefined();
      expect(en.supplementaryTrackId).toBe(ru.supplementaryTrackId);
      expect(en.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
        ru.blocks.map(({ id, type }) => ({ id, type })),
      );
    }
  });

  it('requires exactly one core-week or supplementary-track placement', () => {
    expect(lessonTranslationSchema.safeParse({ ...englishNetwork, supplementaryTrackId: undefined }).success).toBe(false);
    expect(lessonTranslationSchema.safeParse({ ...englishLesson, supplementaryTrackId: 'supplement-network-browser' }).success).toBe(false);
  });
});
describe('Map, Set, and weak collections supplementary lesson', () => {
  it('teaches collection semantics with aligned traces and domain practice', () => {
    expect(lessonTranslationSchema.safeParse(englishCollections).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianCollections).success).toBe(true);
    expect(englishCollections.id).toBe('js.collections-weakmaps');
    expect(englishCollections.supplementaryTrackId).toBe('supplement-js-internals');
    expect(englishCollections.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianCollections.blocks.map(({ id, type }) => ({ id, type })),
    );
    const checks = englishCollections.blocks.filter((block) => block.type === 'knowledgeCheck');
    expect(checks).toHaveLength(2);
    for (const check of checks) {
      expect(check.options.filter((option) => option.correct)).toHaveLength(1);
      expect(check.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(check.explanation.trim().length).toBeGreaterThan(0);
    }
    expect(englishCollections.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(3);
    const exercise = englishCollections.blocks.find((block) => block.type === 'codingExercise');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(4);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(3);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(4);
  });
});

describe('regular expressions supplementary lesson', () => {
  it('teaches matching state, captures, and safe applied extraction', () => {
    expect(lessonTranslationSchema.safeParse(englishRegex).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianRegex).success).toBe(true);
    expect(englishRegex.id).toBe('js.regex-text-processing');
    expect(englishRegex.supplementaryTrackId).toBe('supplement-js-internals');
    expect(englishRegex.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianRegex.blocks.map(({ id, type }) => ({ id, type })),
    );
    const quizzes = englishRegex.blocks.filter((block) => block.type === 'knowledgeCheck');
    expect(quizzes).toHaveLength(2);
    for (const quiz of quizzes) {
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
    expect(englishRegex.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(3);
    const exercise = englishRegex.blocks.find((block) => block.type === 'codingExercise');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.starterCode).toContain('matchAll');
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(4);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(3);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(4);
  });
});

describe('browser storage supplementary lesson', () => {
  it('teaches Web Storage and IndexedDB boundaries with applied transaction practice', () => {
    expect(lessonTranslationSchema.safeParse(englishStorage).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianStorage).success).toBe(true);
    expect(englishStorage.id).toBe('browser.storage-indexeddb');
    expect(englishStorage.moduleId).toBe('supplement-browser-storage');
    expect(englishStorage.supplementaryTrackId).toBe('supplement-browser-storage');
    expect(englishStorage.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianStorage.blocks.map(({ id, type }) => ({ id, type })),
    );
    const quizzes = englishStorage.blocks.filter((block) => block.type === 'knowledgeCheck');
    expect(quizzes).toHaveLength(2);
    for (const quiz of quizzes) {
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
    expect(englishStorage.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(4);
    const exercise = englishStorage.blocks.find((block) => block.type === 'codingExercise');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.starterCode).toContain('transaction.oncomplete');
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(5);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(4);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
  });
});

describe('deep modern JavaScript syntax in the core functions lesson', () => {
  it('teaches iterable destructuring, rest/spread, optional access, and nullish defaults', () => {
    expect(lessonTranslationSchema.safeParse(englishJsFunctions).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianJsFunctions).success).toBe(true);
    expect(englishJsFunctions.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianJsFunctions.blocks.map(({ id, type }) => ({ id, type })),
    );

    const deepIds = [
      'array-destructure-heading',
      'array-destructure-explainer',
      'array-destructure-trace',
      'array-default-quiz',
      'rest-parameters-heading',
      'rest-parameters-trace',
      'rest-spread-callout',
      'nullish-heading',
      'nullish-trace',
      'nullish-limits',
      'nullish-quiz',
      'modern-syntax-practice',
      'modern-syntax-summary',
    ];
    const deepBlocks = deepIds.map((id) => englishJsFunctions.blocks.find((block) => block.id === id));
    expect(deepBlocks.every(Boolean)).toBe(true);

    for (const quizId of ['array-default-quiz', 'nullish-quiz']) {
      const quiz = englishJsFunctions.blocks.find((block) => block.id === quizId);
      expect(quiz?.type).toBe('knowledgeCheck');
      if (quiz?.type !== 'knowledgeCheck') continue;
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }

    const exercise = englishJsFunctions.blocks.find((block) => block.id === 'modern-syntax-practice');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(5);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(4);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
    expect(exercise.starterCode).toContain('...otherTags');
    expect(exercise.starterCode).toContain('??');

    for (const walkthrough of englishJsFunctions.blocks.filter((block) => block.type === 'codeWalkthrough')) {
      const lineCount = walkthrough.code.split('\n').length;
      expect(walkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
    }
  });
});

describe('browser networking and workers supplementary lesson', () => {
  it('teaches transport and worker lifecycles with applied cleanup practice', () => {
    expect(lessonTranslationSchema.safeParse(englishRealtime).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianRealtime).success).toBe(true);
    expect(englishRealtime.id).toBe('browser.realtime-workers');
    expect(englishRealtime.moduleId).toBe('supplement-browser-platform');
    expect(englishRealtime.supplementaryTrackId).toBe('supplement-browser-platform');
    expect(englishRealtime.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianRealtime.blocks.map(({ id, type }) => ({ id, type })),
    );
    const quizzes = englishRealtime.blocks.filter((block) => block.type === 'knowledgeCheck');
    expect(quizzes).toHaveLength(2);
    for (const quiz of quizzes) {
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
    expect(englishRealtime.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(4);
    const exercise = englishRealtime.blocks.find((block) => block.type === 'codingExercise');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.starterCode).toContain('worker.terminate');
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(5);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(4);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
  });
});


describe('utility types from the integrated intro.dev source', () => {
  it('teaches type-shape transformations, runtime limits, and an applied task in both locales', () => {
    expect(lessonTranslationSchema.safeParse(englishTypeScript).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianTypeScript).success).toBe(true);
    expect(englishTypeScript.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianTypeScript.blocks.map(({ id, type }) => [id, type]),
    );
    for (const id of ['utility-types-heading', 'utility-types-body', 'utility-types-walkthrough', 'utility-types-limits', 'utility-types-check', 'utility-types-practice']) {
      expect(englishTypeScript.blocks.some((block) => block.id === id)).toBe(true);
    }
    const walk = englishTypeScript.blocks.find((block) => block.id === 'utility-types-walkthrough');
    expect(walk?.type).toBe('codeWalkthrough');
    if (walk?.type === 'codeWalkthrough') {
      const lineCount = walk.code.split('\n').length;
      expect(walk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(walk.code).toContain('Partial<Omit<Article, "id">>');
    }
    const quiz = englishTypeScript.blocks.find((block) => block.id === 'utility-types-check');
    expect(quiz?.type).toBe('knowledgeCheck');
    if (quiz?.type === 'knowledgeCheck') {
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
    const exercise = englishTypeScript.blocks.find((block) => block.id === 'utility-types-practice');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(5);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(4);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
  });

  it('covers iframe trust boundaries and permissions in both lesson locales', () => {
    expect(lessonTranslationSchema.safeParse(englishLesson).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianLesson).success).toBe(true);
    expect(englishLesson.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianLesson.blocks.map(({ id, type }) => [id, type]),
    );
    for (const lesson of [englishLesson, russianLesson]) {
      const walkthrough = lesson.blocks.find((block) => block.id === 'html-iframe-security-walkthrough');
      expect(walkthrough?.type).toBe('codeWalkthrough');
      if (walkthrough?.type !== 'codeWalkthrough') return;
      const lineCount = walkthrough.code.split('\n').length;
      expect(walkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(walkthrough.code).toContain('sandbox');
      const check = lesson.blocks.find((block) => block.id === 'html-iframe-security-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') return;
      expect(check.options.filter((option) => option.correct)).toHaveLength(1);
      expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const exercise = lesson.blocks.find((block) => block.id === 'html-iframe-security-practice');
      expect(exercise?.type).toBe('codingExercise');
      if (exercise?.type !== 'codingExercise') return;
      expect(exercise.requirements).toHaveLength(4);
      expect(exercise.hints).toHaveLength(3);
      expect(exercise.successCriteria).toHaveLength(4);
      expect(exercise.starterCode.match(/TODO/g)).toHaveLength(3);
      expect(exercise.hints.join(' ')).toContain('sandbox');
    }
  });

});
