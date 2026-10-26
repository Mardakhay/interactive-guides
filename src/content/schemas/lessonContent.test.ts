import { describe, expect, it } from 'vitest';
import englishNetwork from '../lessons/network.dns-tcp-tls/en.json';
import russianNetwork from '../lessons/network.dns-tcp-tls/ru.json';
import englishBrowserRendering from '../lessons/browser.rendering-pipeline/en.json';
import russianBrowserRendering from '../lessons/browser.rendering-pipeline/ru.json';
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

describe('CSS fundamentals lesson translation', () => {
  it('keeps the same learning structure in both locales', () => {
    expect(englishCss.id).toBe(russianCss.id);
    expect(englishCss.moduleId).toBe('month-1-week-3');
    expect(englishCss.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianCss.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishCss.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
    expect(russianCss.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    expect(englishCss.blocks.map((block) => block.id)).toContain('css-color-values');
    expect(englishCss.blocks.map((block) => block.id)).toContain('css-accessibility');
    expect(englishCss.blocks.map((block) => block.id)).toContain('css-accessible-theme-card');
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
    expect(englishTypeScript.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
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
    expect(englishReactEffects.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
    expect(russianReactEffects.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
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
    expect(englishApiHooks.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
    expect(russianApiHooks.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
    expect(englishApiHooks.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(4);
    expect(russianApiHooks.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(4);
    expect(englishApiHooks.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(3);
    expect(russianApiHooks.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(3);
    expect(englishApiHooks.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'api-fetch-axios-body',
        'api-fetch-walkthrough',
        'api-fetch-status-check',
        'api-client-choice-practice',
      ]),
    );
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
    expect(englishDom.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(7);
    expect(russianDom.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(7);
    expect(englishDom.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(11);
    expect(russianDom.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(11);
    expect(englishDom.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(4);
    expect(russianDom.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(4);
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