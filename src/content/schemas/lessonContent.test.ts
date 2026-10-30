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
import englishArchitectureBoundaries from '../lessons/frontend.architecture-boundaries/en.json';
import russianArchitectureBoundaries from '../lessons/frontend.architecture-boundaries/ru.json';
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
    const englishPractice = englishLesson.blocks.find((block) => block.id === 'practice-about-me');
    const russianPractice = russianLesson.blocks.find((block) => block.id === 'practice-about-me');
    expect(englishPractice).toMatchObject({
      type: 'codingExercise',
      solution: { code: expect.stringContaining('<header>'), explanation: expect.stringContaining('one possible complete solution') },
    });
    expect(russianPractice).toMatchObject({
      type: 'codingExercise',
      solution: { code: expect.stringContaining('<header>'), explanation: expect.stringContaining('один из возможных полных вариантов') },
    });
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
    expect(englishForms.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
    expect(russianForms.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    expect(englishForms.version).toBe(3);
    expect(russianForms.version).toBe(3);
    for (const lesson of [englishForms, russianForms]) {
      expect(lesson.updatedAt).toBe('2026-10-28');
      expect(lesson.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
      const specialized = lesson.blocks.find((block) => block.id === 'specialized-input-types-list');
      expect(specialized?.type).toBe('list');
      if (specialized?.type !== 'list') return;
      const guidance = specialized.items.join(' ').toLowerCase();
      expect(guidance).toContain('date');
      expect(guidance).toContain('time');
      expect(guidance).toContain('range');
      expect(guidance).toContain('accept=');
      expect(guidance).toContain('hidden');
      expect(guidance).toMatch(/server|сервер/);
      const check = lesson.blocks.find((block) => block.id === 'file-accept-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') return;
      expect(check.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['filter']);
      expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);


      const refs = lesson.blocks.find((block) => block.id === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') {
        expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#enctype')).toBe(true);
      }
    }
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

describe('HTML document content and media', () => {
  it('covers media, text semantics, links, metadata, and bilingual practice', () => {
    expect(englishLesson.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianLesson.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishLesson.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(9);
    expect(englishLesson.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(8);
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
    expect(englishCss.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(7);
    expect(russianCss.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    expect(englishCss.blocks.map((block) => block.id)).toContain('css-color-values');
    expect(englishCss.blocks.map((block) => block.id)).toContain('css-accessibility');
    expect(englishCss.blocks.map((block) => block.id)).toContain('css-accessible-theme-card');
    expect(englishCss.version).toBe(5);
    expect(russianCss.version).toBe(5);
    for (const lesson of [englishCss, russianCss]) {
      expect(lesson.updatedAt).toBe('2026-10-28');
      const positioning = lesson.blocks.find((block) => block.id === 'css-positioning-walkthrough');
      expect(positioning?.type).toBe('codeWalkthrough');
      if (positioning?.type !== 'codeWalkthrough') return;
      expect(positioning.code).toContain('position: relative');
      expect(positioning.code).toContain('position: absolute');
      expect(positioning.code).toContain('position: sticky');
      expect(positioning.code).toContain('z-index:');
      const lineCount = positioning.code.split('\n').length;
      expect(positioning.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      const check = lesson.blocks.find((block) => block.id === 'css-positioning-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') return;
      expect(check.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['container']);
      expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const refs = lesson.blocks.find((block) => block.id === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') {
        expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/CSS/position')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/CSS/z-index')).toBe(true);
      }
    }
    expect(englishCss.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(7);
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
    expect(englishGit.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(11);
    expect(russianGit.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    expect(englishGit.version).toBe(13);
    expect(russianGit.version).toBe(13);
    const remoteExample = englishGit.blocks.find((block) => block.id === 'remote-example');
    expect(remoteExample?.type).toBe('codeWalkthrough');
    if (remoteExample?.type !== 'codeWalkthrough') return;
    expect(remoteExample.code.split('\n').at(-1)).toBe('git push -u origin HEAD');
    expect(remoteExample.steps.some((step) => step.explanation.includes('pull request'))).toBe(true);
    const practice = englishGit.blocks.find((block) => block.id === 'practice-publish-project');
    expect(practice?.type).toBe('codingExercise');
    if (practice?.type !== 'codingExercise') return;
    expect(practice.starterCode).toContain('git push -u origin HEAD');
    expect(practice.requirements.some((requirement) => requirement.includes('pull-request review'))).toBe(true);
    for (const lesson of [englishGit, russianGit]) {
      const hygiene = lesson.blocks.find((block) => block.id === 'git-repository-hygiene');
      expect(hygiene?.type).toBe('list');
      if (hygiene?.type === 'list') {
        expect(hygiene.items.some((item) => item.toLowerCase().includes('markdown'))).toBe(true);
      }
    }
    for (const lesson of [englishGit, russianGit]) {
      expect(lessonTranslationSchema.safeParse(lesson).success).toBe(true);
      expect(lesson.updatedAt).toBe('2026-10-29');

      const quickReference = lesson.blocks.find((block) => block.id === 'git-command-reference-list');
      expect(quickReference?.type).toBe('commandReference');
      if (quickReference?.type !== 'commandReference') return;
      expect(quickReference.categories).toHaveLength(4);
      const commands = quickReference.categories.flatMap((category) => category.items.map((item) => item.command));
      const commandIds = quickReference.categories.flatMap((category) => category.items.map((item) => item.id));
      expect(commands).toHaveLength(25);
      expect(new Set(commandIds).size).toBe(25);
      expect(commands).toContain('git clone <repository-url>');
      expect(commands).toContain('git branch -d <merged-branch>');
      expect(commands).toContain('git merge <branch>');
      expect(commands).toContain('git fetch origin');
      expect(commands).toContain('git pull --ff-only');
      expect(commands).toContain('git restore --staged <file>');
      expect(commands).toContain('git revert <commit>');
      expect(commands).not.toContain('git reset --hard <SHA>');

      const duplicateCommandIds = structuredClone(lesson);
      const duplicateReference = duplicateCommandIds.blocks.find((block) => block.id === 'git-command-reference-list');
      if (duplicateReference?.type === 'commandReference') {
        duplicateReference.categories[1]!.items[0]!.id = duplicateReference.categories[0]!.items[0]!.id;
      }
      expect(lessonTranslationSchema.safeParse(duplicateCommandIds).success).toBe(false);

      const secretResponse = lesson.blocks.find((block) => block.id === 'gitignore-secret-response-body');
      expect(secretResponse?.type).toBe('paragraph');
      if (secretResponse?.type !== 'paragraph') throw new Error('Git secret remediation guidance is missing');
      expect(secretResponse.text).toMatch(lesson.locale === 'en' ? /revoke or rotate/ : /отзови или замени/);
      expect(secretResponse.text).toMatch(lesson.locale === 'en' ? /history|forks|caches/ : /истории|fork|кеш/);

      const secretWalkthrough = lesson.blocks.find((block) => block.id === 'gitignore-secret-response-walkthrough');
      expect(secretWalkthrough?.type).toBe('codeWalkthrough');
      if (secretWalkthrough?.type !== 'codeWalkthrough') throw new Error('Git secret remediation walkthrough is missing');
      expect(secretWalkthrough.code).toContain('git rm --cached -- .env');
      expect(secretWalkthrough.code).toContain('git diff --cached --stat');
      expect(secretWalkthrough.code).toContain('git diff --cached -- .gitignore');
      expect(secretWalkthrough.code).not.toContain('git diff --cached -- .env');

      const secretCheck = lesson.blocks.find((block) => block.id === 'gitignore-secret-response-check');
      expect(secretCheck?.type).toBe('knowledgeCheck');
      if (secretCheck?.type !== 'knowledgeCheck') throw new Error('Git secret remediation check is missing');
      expect(secretCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['revoke-first']);
      expect(secretCheck.options.every((option) => option.feedback.trim().length > 35)).toBe(true);

      const accessGuidance = lesson.blocks.find((block) => block.id === 'repository-access-body');
      expect(accessGuidance?.type).toBe('paragraph');
      if (accessGuidance?.type !== 'paragraph') throw new Error('Repository access guidance is missing');
      expect(accessGuidance.text).toMatch(lesson.locale === 'en' ? /least privilege/ : /минимальных привилегий/);
      expect(accessGuidance.text).toContain('Triage');
      expect(accessGuidance.text).toMatch(/ruleset|protection/);

      const accessCheck = lesson.blocks.find((block) => block.id === 'repository-access-role-check');
      expect(accessCheck?.type).toBe('knowledgeCheck');
      if (accessCheck?.type !== 'knowledgeCheck') throw new Error('Repository access question is missing');
      expect(accessCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['triage-role']);
      expect(accessCheck.options.every((option) => option.feedback.trim().length > 35)).toBe(true);

      const fetchCheck = lesson.blocks.find((block) => block.id === 'fetch-pull-check');
      expect(fetchCheck?.type).toBe('knowledgeCheck');
      if (fetchCheck?.type !== 'knowledgeCheck') return;
      expect(fetchCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['fetch']);
      expect(fetchCheck.options.every((option) => option.feedback.trim().length > 20)).toBe(true);

      
      const rebaseGuidance = lesson.blocks.find((block) => block.id === 'git-rebase-safe-update-body');
      expect(rebaseGuidance?.type).toBe('paragraph');
      if (rebaseGuidance?.type !== 'paragraph') throw new Error('Safe rebase guidance is missing');
      expect(rebaseGuidance.text).toContain('git fetch origin');
      expect(rebaseGuidance.text).toContain('git rebase --abort');
      expect(rebaseGuidance.text).toContain('git rebase --continue');
      expect(rebaseGuidance.text).toMatch(lesson.locale === 'en' ? /unpublished|teammates/ : /неопубликован|коллеги/);

      const rebaseWalkthrough = lesson.blocks.find((block) => block.id === 'git-rebase-safe-update-walkthrough');
      expect(rebaseWalkthrough?.type).toBe('codeWalkthrough');
      if (rebaseWalkthrough?.type !== 'codeWalkthrough') throw new Error('Safe rebase walkthrough is missing');
      expect(rebaseWalkthrough.code).toContain('git fetch origin');
      expect(rebaseWalkthrough.code).toContain('git rebase origin/main');
      expect(rebaseWalkthrough.code).toContain('git rebase --continue');
      for (const step of rebaseWalkthrough.steps) {
        expect(step.lineStart).toBeGreaterThan(0);
        expect(step.lineEnd).toBeLessThanOrEqual(rebaseWalkthrough.code.split('\n').length);
      }

      const rebaseCheck = lesson.blocks.find((block) => block.id === 'git-rebase-safety-check');
      expect(rebaseCheck?.type).toBe('knowledgeCheck');
      if (rebaseCheck?.type !== 'knowledgeCheck') throw new Error('Safe rebase knowledge check is missing');
      expect(rebaseCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['rebase-own-feature']);
      expect(rebaseCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      expect(rebaseCheck.explanation).toContain('git fetch origin');

const refs = lesson.blocks.find((block) => block.id === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') {
        expect(refs.items.some((item) => item.url === 'https://git-scm.com/docs/git-fetch')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://git-scm.com/docs/git-pull')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://git-scm.com/docs/git-rebase')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://docs.github.com/en/get-started/learning-about-github/access-permissions-on-github')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository')).toBe(true);
      }
    }
    expect(russianGit.blocks.find((block) => block.id === 'knowledge-check-3')?.type).toBe('knowledgeCheck');
    const russianWorkflowCheck = russianGit.blocks.find((block) => block.id === 'knowledge-check-3');
    if (russianWorkflowCheck?.type === 'knowledgeCheck') {
      expect(russianWorkflowCheck.prompt).toContain('Выбери');
      expect(russianWorkflowCheck.prompt).not.toContain('Select all that apply');
    }
  });
});

describe('Node.js and project tooling lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishTooling.id).toBe(russianTooling.id);
    expect(englishTooling.moduleId).toBe('month-3-week-9');
    expect(englishTooling.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianTooling.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishTooling.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(12);
    expect(russianTooling.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    expect(lessonTranslationSchema.safeParse(englishTooling).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianTooling).success).toBe(true);
    expect(englishTooling.version).toBe(6);
    expect(englishTooling.blocks).toHaveLength(52);
    expect(russianTooling.blocks).toHaveLength(52);
    expect(russianTooling.version).toBe(6);
    for (const lesson of [englishTooling, russianTooling]) {
      expect(lesson.updatedAt).toBe('2026-10-29');
      expect(lesson.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(12);
      const walkthrough = lesson.blocks.find((block) => block.id === 'npm-command-vs-exec-walkthrough');
      expect(walkthrough?.type).toBe('codeWalkthrough');
      if (walkthrough?.type !== 'codeWalkthrough') throw new Error('npm CLI walkthrough is missing');
      expect(walkthrough.code).toContain('npm exec -- vite --version');
      expect(walkthrough.code).toContain('npm create vite@latest my-app -- --template react-ts');
      expect(walkthrough.code.split(String.fromCharCode(10))).toHaveLength(8);
      expect(walkthrough.steps.map(({ lineStart, lineEnd }) => [lineStart, lineEnd])).toEqual([[1, 2], [4, 5], [7, 8]]);
      const quiz = lesson.blocks.find((block) => block.id === 'npm-command-vs-exec-check');
      expect(quiz?.type).toBe('knowledgeCheck');
      if (quiz?.type !== 'knowledgeCheck') throw new Error('npm CLI knowledge check is missing');
      expect(quiz.questionType).toBe('single-choice');
      expect(quiz.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['cli']);
      expect(quiz.options.every((option) => option.feedback.trim().length > 30)).toBe(true);

      const templateCheck = lesson.blocks.find((block) => block.id === 'vite-template-check');
      expect(templateCheck?.type).toBe('knowledgeCheck');
      if (templateCheck?.type !== 'knowledgeCheck') throw new Error('Vite template question is missing');
      expect(templateCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['react-ts']);
      expect(templateCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);

      const hmrBody = lesson.blocks.find((block) => block.id === 'vite-hmr-body');
      expect(hmrBody?.type).toBe('paragraph');
      if (hmrBody?.type !== 'paragraph') throw new Error('HMR explanation is missing');
      expect(hmrBody.text.toLowerCase()).toContain('hmr');
      expect(hmrBody.text.toLowerCase()).toMatch(/reload|перезагрузки/);
      const hmrCheck = lesson.blocks.find((block) => block.id === 'vite-hmr-check');
      expect(hmrCheck?.type).toBe('knowledgeCheck');
      if (hmrCheck?.type !== 'knowledgeCheck') throw new Error('HMR knowledge check is missing');
      expect(hmrCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['hmr-precise']);
      expect(hmrCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);

      const configWalkthrough = lesson.blocks.find((block) => block.id === 'vite-config-alias-proxy-walkthrough');
      expect(configWalkthrough?.type).toBe('codeWalkthrough');
      if (configWalkthrough?.type !== 'codeWalkthrough') throw new Error('Vite config walkthrough is missing');
      expect(configWalkthrough.code).toContain("fileURLToPath(new URL('./src', import.meta.url))");
      expect(configWalkthrough.code).toContain('port: 4000');
      expect(configWalkthrough.code).toContain('open: true');
      expect(configWalkthrough.code).toContain("'/api': { target: 'http://localhost:3001', changeOrigin: true }");
      expect(configWalkthrough.code.split(String.fromCharCode(10))).toHaveLength(21);
      expect(configWalkthrough.steps.map(({ lineStart, lineEnd }) => [lineStart, lineEnd])).toEqual([[1, 6], [8, 12], [14, 21]]);

      const configCheck = lesson.blocks.find((block) => block.id === 'vite-proxy-dev-only-check');
      expect(configCheck?.type).toBe('knowledgeCheck');
      if (configCheck?.type !== 'knowledgeCheck') throw new Error('Vite proxy development-only check is missing');
      expect(configCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['dev-only']);
      expect(configCheck.options.every((option) => option.feedback.trim().length > 35)).toBe(true);
      expect(configCheck.explanation).toMatch(lesson.locale === 'en' ? /production routing/i : /production-маршрутизац/i);

      const expectedToolingChecks = [
        ['dev-dependency-check', 'dev'],
        ['caret-range-check', 'compatible'],
        ['vite-dev-server-check', 'esm'],
        ['lint-format-check', 'pair'],
      ] as const;
      for (const [blockId, correctId] of expectedToolingChecks) {
        const check = lesson.blocks.find((block) => block.id === blockId);
        expect(check?.type).toBe('knowledgeCheck');
        if (check?.type !== 'knowledgeCheck') throw new Error(`${blockId} is missing`);
        expect(check.options.filter((option) => option.correct).map((option) => option.id)).toEqual([correctId]);
        expect(check.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      }

      const refs = lesson.blocks.find((block) => block.id === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type !== 'references') throw new Error('tooling references are missing');
      expect(refs.items.some((item) => item.url === 'https://docs.npmjs.com/cli/v11/commands/npm-exec')).toBe(true);
      expect(refs.items.some((item) => item.url === 'https://docs.npmjs.com/cli/v11/commands/npm-init')).toBe(true);
      expect(refs.items.some((item) => item.url === 'https://vite.dev/guide/features.html')).toBe(true);
      expect(refs.items.some((item) => item.url === 'https://vite.dev/guide/troubleshooting.html')).toBe(true);
      expect(refs.items.some((item) => item.url === 'https://vite.dev/config/')).toBe(true);
      expect(refs.items.some((item) => item.url === 'https://vite.dev/config/server-options')).toBe(true);
    }
  });
});

describe('TypeScript fundamentals lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishTypeScript.id).toBe(russianTypeScript.id);
    expect(englishTypeScript.moduleId).toBe('month-3-week-10');
    expect(englishTypeScript.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianTypeScript.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishTypeScript.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(7);
    expect(russianTypeScript.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    for (const lesson of [englishTypeScript, russianTypeScript]) {
      expect(lesson.version).toBe(5);
      expect(lesson.updatedAt).toBe('2026-10-29');
      const strictCheck = lesson.blocks.find((block) => block.id === 'strict-mode-check');
      expect(strictCheck?.type).toBe('knowledgeCheck');
      if (strictCheck?.type !== 'knowledgeCheck') throw new Error('TypeScript strict-mode check is missing');
      expect(strictCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['checks']);
      expect(strictCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const partialCheck = lesson.blocks.find((block) => block.id === 'partial-utility-check');
      expect(partialCheck?.type).toBe('knowledgeCheck');
      if (partialCheck?.type !== 'knowledgeCheck') throw new Error('Partial utility check is missing');
      expect(partialCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['partial']);
      expect(partialCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const refs = lesson.blocks.find((block) => block.type === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type !== 'references') throw new Error('TypeScript references are missing');
      expect(refs.items.some((item) => item.url === 'https://www.typescriptlang.org/tsconfig/#strict')).toBe(true);
    }
  });
});

describe('React effects and lists lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishReactEffects.id).toBe(russianReactEffects.id);
    expect(englishReactEffects.moduleId).toBe('month-3-week-12');
    expect(englishReactEffects.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianReactEffects.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishReactEffects.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(7);
    expect(russianReactEffects.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(7);
    for (const lesson of [englishReactEffects, russianReactEffects]) {
      expect(lesson.version).toBe(6);
      expect(lesson.updatedAt).toBe('2026-10-29');
      const cleanupAccuracyNote = lesson.blocks.find((block) => block.id === 'effect-cleanup-memory-leak-note');
      expect(cleanupAccuracyNote?.type).toBe('callout');
      if (cleanupAccuracyNote?.type !== 'callout') throw new Error('Cleanup accuracy note is missing');
      expect(cleanupAccuracyNote.text).toMatch(lesson.locale === 'en' ? /not necessarily a leak|not.*memory leak/ : /не означает утечку/);
      expect(cleanupAccuracyNote.text).toMatch(lesson.locale === 'en' ? /stale|obsolete response/ : /устаревш.*ответ/);

      const requestTrace = lesson.blocks.find((block) => block.id === 'deep-effects-trace');
      expect(requestTrace?.type).toBe('codeWalkthrough');
      if (requestTrace?.type !== 'codeWalkthrough') throw new Error('Request race walkthrough is missing');
      expect(requestTrace.code).toContain('new AbortController()');
      expect(requestTrace.code).toContain('let ignore = false');
      expect(requestTrace.code).toContain('controller.abort()');
      expect(requestTrace.code).toContain('if (!ignore)');
      expect(requestTrace.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= requestTrace.code.split('\n').length)).toBe(true);

      const dependencyCheck = lesson.blocks.find((block) => block.id === 'effect-dependency-array-check');
      expect(dependencyCheck?.type).toBe('knowledgeCheck');
      if (dependencyCheck?.type !== 'knowledgeCheck') throw new Error('Effect dependency check is missing');
      expect(dependencyCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['count']);
      expect(dependencyCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const refs = lesson.blocks.find((block) => block.type === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type !== 'references') throw new Error('Effect references are missing');
      expect(refs.items.some((item) => item.url === 'https://react.dev/reference/react/useEffect')).toBe(true);
      expect(refs.items.some((item) => item.url === 'https://react.dev/blog/2022/03/08/react-18-upgrade-guide')).toBe(true);
    }
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
  it('protects URL state, nested routes, fallback semantics, and auth boundaries', () => {
    for (const lesson of [englishRouter, russianRouter]) {
      const urlState = lesson.blocks.find((block) => block.id === 'deep-router-url-state');
      expect(urlState?.type).toBe('list');
      if (urlState?.type !== 'list') return;
      expect(urlState.items).toHaveLength(5);
      expect(urlState.items.join(' ').toLowerCase()).toMatch(/query|запрос/);
      expect(urlState.items.join(' ').toLowerCase()).toMatch(/authorization|авторизац/);
      const routeTrace = lesson.blocks.find((block) => block.id === 'deep-router-trace');
      expect(routeTrace?.type).toBe('codeWalkthrough');
      if (routeTrace?.type !== 'codeWalkthrough') return;
      expect(routeTrace.code).toContain('<Outlet />');
      expect(routeTrace.code).toContain('path="*"');
      const lineCount = routeTrace.code.split('\n').length;
      expect(routeTrace.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      const practice = lesson.blocks.find((block) => block.id === 'deep-router-practice');
      expect(practice?.type).toBe('codingExercise');
      if (practice?.type !== 'codingExercise') return;
      expect(practice.requirements).toHaveLength(5);
      expect(practice.successCriteria.length).toBeGreaterThanOrEqual(5);
      expect(practice.instructions.join(' ').toLowerCase()).toMatch(/query|запрос/);
    }
  });
});

describe('React forms and validation lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishReactForms.id).toBe(russianReactForms.id);
    expect(englishReactForms.moduleId).toBe('month-4-week-14');
    expect(englishReactForms.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianReactForms.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishReactForms.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(11);
    expect(russianReactForms.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
  it('keeps form input semantics, accessible errors, and async submit states in both locales', () => {
    for (const lesson of [englishReactForms, russianReactForms]) {
      expect(lesson.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(11);
      const uncontrolled = lesson.blocks.find((block) => block.id === 'uncontrolled-example');
      expect(uncontrolled?.type).toBe('code');
      if (uncontrolled?.type !== 'code') return;
      expect(uncontrolled.code).toContain('new FormData(');
      expect(uncontrolled.code).toContain('event.preventDefault()');
      const accessible = lesson.blocks.find((block) => block.id === 'accessible-errors-example');
      expect(accessible?.type).toBe('code');
      if (accessible?.type !== 'code') return;
      expect(accessible.code).toContain('aria-invalid');
      expect(accessible.code).toContain('aria-describedby');
      expect(accessible.code).toContain('htmlFor=');
      const rhf = lesson.blocks.find((block) => block.id === 'rhf-complete-example-code');
      expect(rhf?.type).toBe('codeWalkthrough');
      if (rhf?.type !== 'codeWalkthrough') return;
      expect(rhf.code).toContain('useForm<RegistrationValues>');
      expect(rhf.code).toContain('handleSubmit(onSubmit)');
      expect(rhf.code).toContain('isSubmitting');
      const lineCount = rhf.code.split('\n').length;
      expect(rhf.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      const submission = lesson.blocks.find((block) => block.id === 'submission-states-body');
      expect(submission?.type).toBe('paragraph');
      if (submission?.type === 'paragraph') {
        expect(submission.text.toLowerCase()).toMatch(/success|успех/);
        expect(submission.text.toLowerCase()).toMatch(/error|ошиб/);
      }
      const rhfPractice = lesson.blocks.find((block) => block.id === 'practice-refactor-to-rhf');
      expect(rhfPractice?.type).toBe('codingExercise');
      if (rhfPractice?.type === 'codingExercise') {
        expect(rhfPractice.requirements.join(' ').toLowerCase()).toMatch(/server|сервер/);
        expect(rhfPractice.requirements.join(' ').toLowerCase()).toMatch(/aria|accessib|доступ/);
      }
    }
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
  it('protects custom-hook instance boundaries and reducer/provider semantics', () => {
    for (const lesson of [englishContext, russianContext]) {
      expect(lesson.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
      const hookModel = lesson.blocks.find((block) => block.id === 'custom-hook-instance-body');
      expect(hookModel?.type).toBe('paragraph');
      if (hookModel?.type === 'paragraph') {
        expect(hookModel.text.toLowerCase()).toMatch(/each call|each invocation|кажд/);
        expect(hookModel.text.toLowerCase()).toMatch(/context|контекст|shared value|общ/);
      }
      const hookExample = lesson.blocks.find((block) => block.id === 'custom-hook-instance-example');
      expect(hookExample?.type).toBe('codeWalkthrough');
      if (hookExample?.type !== 'codeWalkthrough') return;
      expect(hookExample.code).toContain('function CounterA()');
      expect(hookExample.code).toContain('function CounterB()');
      expect(hookExample.code.match(/useCounter\(\)/g)?.length).toBeGreaterThanOrEqual(3);
      const reducer = lesson.blocks.find((block) => block.id === 'reducer-context-example');
      expect(reducer?.type).toBe('codeWalkthrough');
      if (reducer?.type !== 'codeWalkthrough') return;
      expect(reducer.code).toContain('useReducer');
      expect(reducer.code).toContain('PreferencesContext.Provider');
      expect(reducer.code).toContain('const exhaustiveCheck: never = action');
      const lineCount = reducer.code.split('\n').length;
      expect(reducer.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      const boundaries = lesson.blocks.find((block) => block.id === 'provider-boundaries');
      expect(boundaries?.type).toBe('list');
      if (boundaries?.type === 'list') {
        expect(boundaries.items.some((item) => /not.*persist|neither.*persist|не.*сохраня/i.test(item))).toBe(true);
        expect(boundaries.items.some((item) => /authori|авторизац/i.test(item))).toBe(true);
      }
    }
  });
});

describe('React API and custom hooks lesson translation', () => {
  it('keeps equivalent content structure in both locales', () => {
    expect(englishApiHooks.id).toBe(russianApiHooks.id);
    expect(englishApiHooks.moduleId).toBe('month-4-week-16');
    expect(englishApiHooks.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianApiHooks.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishApiHooks.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(8);
    expect(russianApiHooks.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(8);
    for (const lesson of [englishApiHooks, russianApiHooks]) {
      expect(lesson.version).toBe(6);
      expect(lesson.updatedAt).toBe('2026-10-29');
      const cleanupCheck = lesson.blocks.find((block) => block.id === 'api-fetch-cleanup-check');
      expect(cleanupCheck?.type).toBe('knowledgeCheck');
      if (cleanupCheck?.type !== 'knowledgeCheck') throw new Error('Fetch cleanup check is missing');
      expect(cleanupCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['cleanup']);
      expect(cleanupCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const genericCheck = lesson.blocks.find((block) => block.id === 'api-generic-type-check');
      expect(genericCheck?.type).toBe('knowledgeCheck');
      if (genericCheck?.type !== 'knowledgeCheck') throw new Error('Generic response check is missing');
      expect(genericCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['shape']);
      expect(genericCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const refs = lesson.blocks.find((block) => block.type === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type !== 'references') throw new Error('API hook references are missing');
      expect(refs.items.some((item) => item.url === 'https://react.dev/reference/react/useEffect')).toBe(true);
      expect(refs.items.some((item) => item.url === 'https://www.typescriptlang.org/docs/handbook/2/generics.html')).toBe(true);
    }
    expect(englishApiHooks.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(6);
    expect(russianApiHooks.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(6);
    expect(englishApiHooks.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(5);
    expect(russianApiHooks.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(5);
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

describe('core UI library lesson', () => {
  it('preserves bilingual Bootstrap and MUI explanations, checks, and practice in week 17', () => {
    expect(lessonTranslationSchema.safeParse(englishUiEcosystem).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianUiEcosystem).success).toBe(true);
    expect(englishUiEcosystem.id).toBe('ui.bootstrap-mui');
    expect(englishUiEcosystem.week).toBe(17);
    expect(englishUiEcosystem.moduleId).toBe('month-5-week-17');
    expect(englishUiEcosystem.supplementaryTrackId).toBeUndefined();
    expect(russianUiEcosystem.week).toBe(17);
    expect(russianUiEcosystem.moduleId).toBe('month-5-week-17');
    expect(russianUiEcosystem.supplementaryTrackId).toBeUndefined();
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
    expect(englishUiEcosystem.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
    expect(russianUiEcosystem.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
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
    expect(englishDom.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(13);
    expect(russianDom.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(13);
    expect(englishDom.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(18);
    expect(russianDom.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(18);
    expect(englishDom.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(5);
    expect(russianDom.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(5);
    expect(englishDom.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'dom-fragment-walkthrough',
        'dom-intersection-walkthrough',
        'dom-mutation-walkthrough',
        'dom-custom-event-walkthrough',
        'dom-observer-check',
        'dom-resize-observer-walkthrough',
        'dom-page-visibility-walkthrough',
        'dom-observer-signal-check',
        'dom-throttle-walkthrough',
        'dom-throttle-check',
        'dom-rate-control',
        'dom-live-collections-heading',
        'dom-live-collections-body',
        'dom-live-collections-walkthrough',
        'dom-live-collections-check',
        'dom-advanced-practice',
      ]),
    );
    const advancedPractice = englishDom.blocks.find((block) => block.id === 'dom-advanced-practice');
    for (const lesson of [englishDom, russianDom]) {
      expect(lesson.version).toBe(7);
      expect(lesson.blocks).toHaveLength(71);
      const resize = lesson.blocks.find((block) => block.id === 'dom-resize-observer-walkthrough');
      expect(resize?.type).toBe('codeWalkthrough');
      if (resize?.type !== 'codeWalkthrough') return;
      const resizeLineCount = resize.code.split('\n').length;
      expect(resize.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= resizeLineCount)).toBe(true);
      expect(resize.code).toContain('new ResizeObserver');
      expect(resize.code).toContain('resizeObserver.disconnect()');
      const visibility = lesson.blocks.find((block) => block.id === 'dom-page-visibility-walkthrough');
      expect(visibility?.type).toBe('codeWalkthrough');
      if (visibility?.type !== 'codeWalkthrough') return;
      const visibilityLineCount = visibility.code.split('\n').length;
      expect(visibility.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= visibilityLineCount)).toBe(true);
      expect(visibility.code).toContain('document.hidden');
      expect(visibility.code).toContain('removeEventListener');
      expect(visibility.code).toContain('clearInterval');
      const signalCheck = lesson.blocks.find((block) => block.id === 'dom-observer-signal-check');
      expect(signalCheck?.type).toBe('knowledgeCheck');
      if (signalCheck?.type !== 'knowledgeCheck') return;
      expect(signalCheck.options.filter((option) => option.correct)).toHaveLength(1);
      expect(signalCheck.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      expect(signalCheck.options.find((option) => option.correct)?.text).toContain('ResizeObserver');
      const throttle = lesson.blocks.find((block) => block.id === 'dom-throttle-walkthrough');
      expect(throttle?.type).toBe('codeWalkthrough');
      if (throttle?.type !== 'codeWalkthrough') return;
      const lineCount = throttle.code.split('\n').length;
      expect(throttle.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(throttle.code).toContain('Date.now()');
      expect(throttle.code).toContain("{ passive: true }");
      expect(throttle.code).toContain('removeEventListener');
      expect(throttle.code).toContain('lastRun = -Infinity');
      const quiz = lesson.blocks.find((block) => block.id === 'dom-throttle-check');
      expect(quiz?.type).toBe('knowledgeCheck');
      if (quiz?.type !== 'knowledgeCheck') return;
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      expect(quiz.explanation).toContain(lesson.locale === 'en' ? 'callback reference' : 'ссылку на callback');
      const observerPractice = lesson.blocks.find((block) => block.id === 'dom-advanced-practice');
      expect(observerPractice?.type).toBe('codingExercise');
      if (observerPractice?.type === 'codingExercise') {
        expect(observerPractice.instructions.some((item) => item.includes('ResizeObserver'))).toBe(true);
        expect(observerPractice.instructions.some((item) => item.includes('visibilitychange') || item.includes('Page Visibility'))).toBe(true);
        expect(observerPractice.requirements.length).toBeGreaterThanOrEqual(8);
      }
      const exercise = lesson.blocks.find((block) => block.id === 'dom-advanced-practice');
      expect(exercise?.type).toBe('codingExercise');
      if (exercise?.type === 'codingExercise') {
        expect(exercise.instructions.some((instruction) => /throttled scroll handler/.test(instruction))).toBe(true);
        expect(exercise.requirements.some((requirement) => lesson.locale === 'en' ? /callback reference/.test(requirement) : /той же ссылкой на callback/.test(requirement))).toBe(true);
      }
      const collectionWalkthrough = lesson.blocks.find((block) => block.id === 'dom-live-collections-walkthrough');
      expect(collectionWalkthrough?.type).toBe('codeWalkthrough');
      if (collectionWalkthrough?.type !== 'codeWalkthrough') throw new Error('Live collection walkthrough is missing');
      expect(collectionWalkthrough.code).toContain('querySelectorAll');
      expect(collectionWalkthrough.code).toContain('getElementsByClassName');
      expect(collectionWalkthrough.code).toContain('Array.from(liveItems)');
      const collectionLineCount = collectionWalkthrough.code.split('\n').length;
      expect(collectionWalkthrough.steps.every((step) =>
        step.lineStart >= 1 && step.lineEnd >= step.lineStart && step.lineEnd <= collectionLineCount
      )).toBe(true);

      const collectionCheck = lesson.blocks.find((block) => block.id === 'dom-live-collections-check');
      expect(collectionCheck?.type).toBe('knowledgeCheck');
      if (collectionCheck?.type !== 'knowledgeCheck') throw new Error('Live collection check is missing');
      expect(collectionCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['snapshot-live']);
      expect(collectionCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);

      const refs = lesson.blocks.find((block) => block.id === 'dom-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener')).toBe(true);
    }
    expect(advancedPractice).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('observer')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('Observers')]),
    });
  });

  it('teaches traversal, content properties and state-driven rendering in both locales', () => {
    for (const lesson of [englishDom, russianDom]) {
      expect(lessonTranslationSchema.safeParse(lesson).success).toBe(true);
      expect(lesson.version).toBe(7);
      for (const id of ['dom-traversal-walkthrough', 'dom-content-walkthrough', 'dom-state-render-walkthrough']) {
        const walkthrough = lesson.blocks.find((block) => block.id === id);
        expect(walkthrough?.type).toBe('codeWalkthrough');
        if (walkthrough?.type !== 'codeWalkthrough') return;
        const lineCount = walkthrough.code.split(String.fromCharCode(10)).length;
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
    expect(englishReactBasics.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(russianReactBasics.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    for (const lesson of [englishReactBasics, russianReactBasics]) {
      expect(lesson.version).toBe(5);
      expect(lesson.updatedAt).toBe('2026-10-29');
      const propsCheck = lesson.blocks.find((block) => block.id === 'react-props-contract-check');
      expect(propsCheck?.type).toBe('knowledgeCheck');
      if (propsCheck?.type !== 'knowledgeCheck') throw new Error('Props contract check is missing');
      expect(propsCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['parent-data']);
      expect(propsCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const refs = lesson.blocks.find((block) => block.type === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type !== 'references') throw new Error('React state references are missing');
      expect(refs.items.some((item) => item.url === 'https://react.dev/learn/passing-props-to-a-component')).toBe(true);
      const stateCheck = lesson.blocks.find((block) => block.id === 'react-usestate-return-check');
      expect(stateCheck?.type).toBe('knowledgeCheck');
      if (stateCheck?.type !== 'knowledgeCheck') throw new Error('useState return check is missing');
      expect(stateCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['pair']);
      expect(stateCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const stateRefs = lesson.blocks.find((block) => block.type === 'references');
      expect(stateRefs?.type).toBe('references');
      if (stateRefs?.type !== 'references') throw new Error('React state references are missing');
      expect(stateRefs.items.some((item) => item.url === 'https://react.dev/reference/react/useState')).toBe(true);
    }
  });
});

describe('Frontend architecture type-colocation lesson', () => {
  it('teaches feature ownership instead of treating one central types folder as universal', () => {
    expect(lessonTranslationSchema.safeParse(englishArchitectureBoundaries).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianArchitectureBoundaries).success).toBe(true);
    expect(englishArchitectureBoundaries.id).toBe(russianArchitectureBoundaries.id);
    expect(englishArchitectureBoundaries.version).toBe(5);
    expect(russianArchitectureBoundaries.version).toBe(5);
    expect(englishArchitectureBoundaries.updatedAt).toBe('2026-10-29');
    expect(russianArchitectureBoundaries.updatedAt).toBe('2026-10-29');
    expect(englishArchitectureBoundaries.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianArchitectureBoundaries.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishArchitectureBoundaries.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    expect(russianArchitectureBoundaries.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(6);
    for (const lesson of [englishArchitectureBoundaries, russianArchitectureBoundaries]) {
      const check = lesson.blocks.find((block) => block.id === 'arch-type-colocation-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') throw new Error('Type-colocation check is missing');
      expect(check.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['colocate']);
      expect(check.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const refs = lesson.blocks.find((block) => block.type === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type !== 'references') throw new Error('Architecture references are missing');
      expect(refs.items.some((item) => item.url === 'https://www.typescriptlang.org/docs/handbook/2/objects.html')).toBe(true);
    }
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
    expect(englishPerformance.version).toBe(4);
    expect(englishPerformance.blocks).toHaveLength(41);
    expect(englishPerformance.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianPerformance.blocks.map(({ id, type }) => ({ id, type })),
    );
    for (const lesson of [englishPerformance, russianPerformance]) {
      const menuWalkthrough = lesson.blocks.find((block) => block.id === 'performance-disclosure-nav-walkthrough');
      expect(menuWalkthrough?.type).toBe('codeWalkthrough');
      if (menuWalkthrough?.type !== 'codeWalkthrough') return;
      const lineCount = menuWalkthrough.code.split('\n').length;
      expect(menuWalkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(menuWalkthrough.code).toContain('aria-expanded');
      expect(menuWalkthrough.code).toContain('Escape');
      expect(menuWalkthrough.code).toContain('triggerRef.current?.focus()');
      const menuCheck = lesson.blocks.find((block) => block.id === 'performance-disclosure-nav-check');
      expect(menuCheck?.type).toBe('knowledgeCheck');
      if (menuCheck?.type !== 'knowledgeCheck') return;
      expect(menuCheck.options.filter((option) => option.correct)).toHaveLength(1);
      expect(menuCheck.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      expect(menuCheck.explanation).toContain(lesson.locale === 'en' ? 'navigation' : 'навигации');
      const lazyNote = lesson.blocks.find((block) => block.id === 'performance-lazy-export-note');
      expect(lazyNote?.type).toBe('paragraph');
      if (lazyNote?.type === 'paragraph') {
        expect(lazyNote.text).toContain(lesson.locale === 'en' ? 'module' : 'модуль');
        expect(lazyNote.text).toContain('Error Boundary');
      }
      const refs = lesson.blocks.find((block) => block.id === 'performance-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') {
        expect(refs.items.some((item) => item.url === 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/')).toBe(true);
      }
    }
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
  it('keeps Vitest mock history, implementation, and spy restoration distinct', () => {
    expect(lessonTranslationSchema.safeParse(englishTesting).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianTesting).success).toBe(true);
    expect(englishTesting.version).toBe(6);
    expect(russianTesting.version).toBe(6);
    expect(englishTesting.blocks).toHaveLength(45);
    expect(russianTesting.blocks).toHaveLength(45);
    expect(englishTesting.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(9);
    expect(russianTesting.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(9);
    expect(englishTesting.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(russianTesting.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(englishTesting.learningOutcomes).toHaveLength(11);
    expect(russianTesting.learningOutcomes).toHaveLength(11);
    expect(englishTesting.blocks.map(({ id, type }) => ({ id, type }))).toEqual(russianTesting.blocks.map(({ id, type }) => ({ id, type })));
    for (const lesson of [englishTesting, russianTesting]) {
      expect(lesson.updatedAt).toBe('2026-10-29');

      const matcherBody = lesson.blocks.find((block) => block.id === 'matcher-equality-body');
      expect(matcherBody?.type).toBe('paragraph');
      if (matcherBody?.type !== 'paragraph') throw new Error('Equality matcher explanation is missing');
      expect(matcherBody.text).toContain('Object.is');
      expect(matcherBody.text).toContain('toEqual');

      const matcherWalkthrough = lesson.blocks.find((block) => block.id === 'matcher-equality-walkthrough');
      expect(matcherWalkthrough?.type).toBe('codeWalkthrough');
      if (matcherWalkthrough?.type !== 'codeWalkthrough') throw new Error('Equality matcher walkthrough is missing');
      expect(matcherWalkthrough.language).toBe('typescript');
      expect(matcherWalkthrough.code).toContain('.toEqual(');
      expect(matcherWalkthrough.code).toContain('.not.toBe(');
      expect(matcherWalkthrough.code).toContain('sameReference');
      const matcherLineCount = matcherWalkthrough.code.split('\n').length;
      expect(matcherWalkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd >= step.lineStart && step.lineEnd <= matcherLineCount)).toBe(true);

      const matcherCheck = lesson.blocks.find((block) => block.id === 'matcher-equality-check');
      expect(matcherCheck?.type).toBe('knowledgeCheck');
      if (matcherCheck?.type !== 'knowledgeCheck') throw new Error('Equality matcher knowledge check is missing');
      expect(matcherCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['to-equal']);
      expect(matcherCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const model = lesson.blocks.find((block) => block.id === 'test-mock-lifecycle-model');
      expect(model?.type).toBe('paragraph');
      if (model?.type === 'paragraph') {
        expect(model.text).toContain('clearAllMocks');
        expect(model.text).toContain('resetAllMocks');
        expect(model.text).toContain('restoreAllMocks');
      }
      const walkthrough = lesson.blocks.find((block) => block.id === 'test-mock-lifecycle-walkthrough');
      expect(walkthrough?.type).toBe('codeWalkthrough');
      if (walkthrough?.type !== 'codeWalkthrough') return;
      const lineCount = walkthrough.code.split('\n').length;
      expect(walkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(walkthrough.code).toContain('vi.restoreAllMocks()');
      const check = lesson.blocks.find((block) => block.id === 'test-mock-lifecycle-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') return;
      expect(check.options.filter((option) => option.correct)).toHaveLength(1);
      expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const practice = lesson.blocks.find((block) => block.id === 'test-mock-lifecycle-practice');
      expect(practice?.type).toBe('codingExercise');
      if (practice?.type !== 'codingExercise') return;
      expect(practice.requirements.length).toBeGreaterThanOrEqual(5);
      expect(practice.hints.length).toBeGreaterThanOrEqual(3);
      expect(practice.successCriteria.length).toBeGreaterThanOrEqual(5);
      const absenceCheck = lesson.blocks.find((block) => block.id === 'query-absence-check');
      expect(absenceCheck?.type).toBe('knowledgeCheck');
      if (absenceCheck?.type !== 'knowledgeCheck') throw new Error('Query absence check is missing');
      expect(absenceCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['query-by-role']);
      expect(absenceCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);

      const aaaCheck = lesson.blocks.find((block) => block.id === 'aaa-pattern-check');
      expect(aaaCheck?.type).toBe('knowledgeCheck');
      if (aaaCheck?.type !== 'knowledgeCheck') throw new Error('AAA pattern check is missing');
      expect(aaaCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['arrange-act-assert']);
      expect(aaaCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);

      const refs = lesson.blocks.find((block) => block.id === 'testing-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') {
        expect(refs.items.some((item) => item.url === 'https://vitest.dev/guide/learn/mock-functions')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://vitest.dev/api/mock')).toBe(true);
      }
    }
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
    expect(englishGitWorkflow.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(19);
    expect(russianGitWorkflow.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(19);
    expect(englishGitWorkflow.learningOutcomes).toHaveLength(10);
    expect(russianGitWorkflow.learningOutcomes).toHaveLength(10);
    expect(englishGitWorkflow.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(russianGitWorkflow.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(englishGitWorkflow.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(5);
    expect(russianGitWorkflow.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(5);
    expect(englishGitWorkflow.version).toBe(10);
    expect(russianGitWorkflow.version).toBe(10);
    for (const lesson of [englishGitWorkflow, russianGitWorkflow]) {
      expect(lesson.updatedAt).toBe('2026-10-29');
      const ciExample = lesson.blocks.find((block) => block.id === 'ci-example');
      expect(ciExample?.type).toBe('code');
      if (ciExample?.type !== 'code') return;
      expect(ciExample.code).toContain('node-version: 22');
      expect(ciExample.code).toContain('npm install --global npm@11.21.1');
      expect(ciExample.code).toContain('permissions:');
      expect(ciExample.code).toContain('contents: read');

      const auditStart = ciExample.code.indexOf('- name: Report npm audit advisories (informational)');
      const lintStart = ciExample.code.indexOf('- run: npm run lint');
      expect(auditStart).toBeGreaterThanOrEqual(0);
      expect(lintStart).toBeGreaterThan(auditStart);
      const optionalAuditStep = ciExample.code.slice(auditStart, lintStart);
      expect(optionalAuditStep).toContain('continue-on-error: true');
      expect(optionalAuditStep).toContain('npm audit --json');
      expect(optionalAuditStep).toContain('|| true');

      const requiredChecks = ciExample.code.slice(lintStart);
      expect(requiredChecks).toContain('- run: npm run lint');
      expect(requiredChecks).toContain('- run: npm run typecheck');
      expect(requiredChecks).toContain('- run: npm test');
      expect(requiredChecks).toContain('- run: npm run build');
      expect(requiredChecks).not.toContain('continue-on-error: true');
      expect(requiredChecks).not.toContain('|| true');
    }
    expect(englishGitWorkflow.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'git-cd-body',
        'git-cd-walkthrough',
        'git-cd-check',
        'git-pipeline-simulation',
      ]),
    );
    expect(englishGitWorkflow.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining(['ci-failure-diagnosis-heading', 'ci-failure-diagnosis-matrix', 'ci-failure-diagnosis-check']),
    );
    expect(englishGitWorkflow.blocks.map((block) => block.id)).toEqual(
      expect.arrayContaining([
        'conflict-resolution-procedure',
        'conflict-resolution-procedure-body',
        'conflict-resolution-merge-walkthrough',
        'conflict-resolution-rebase-walkthrough',
        'conflict-continuation-commands',
        'conflict-resolution-check',
        'conflict-resolution-practice',
      ]),
    );
    const diagnosisByLocale = [englishGitWorkflow, russianGitWorkflow].map((lesson) => {
      const matrix = lesson.blocks.find((candidate) => candidate.id === 'ci-failure-diagnosis-matrix');
      expect(matrix?.type).toBe('list');
      if (matrix?.type !== 'list') throw new Error('CI diagnostic matrix is missing');
      expect(matrix.items.length).toBeGreaterThanOrEqual(8);
      const stageCoverage = matrix.items.join(' ').toLowerCase();
      const localizedStageSignals = lesson.locale === 'en'
        ? ['checkout', 'npm ci', 'lint', 'typecheck', 'test', 'build', 'security', 'audit', 'deploy', 'sha']
        : ['checkout', 'npm ci', 'lint', 'typecheck', 'тест', 'build', 'security', 'audit', 'deploy', 'sha'];
      for (const stageSignal of localizedStageSignals) {
        expect(stageCoverage).toContain(stageSignal);
      }
      const block = lesson.blocks.find((candidate) => candidate.id === 'ci-failure-diagnosis-check');
      expect(block?.type).toBe('knowledgeCheck');
      if (block?.type !== 'knowledgeCheck') throw new Error('CI diagnosis check is missing');
      expect(block.questionType).toBe('single-choice');
      expect(block.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['build-log']);
      expect(block.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      return block;
    });
    expect(diagnosisByLocale[0]?.prompt).toContain('npm run build');
    expect(diagnosisByLocale[1]?.prompt).toContain('npm run build');
    const pipelineSimulation = englishGitWorkflow.blocks.find(
      (block) => block.id === 'git-pipeline-simulation',
    );
    expect(pipelineSimulation).toMatchObject({
      type: 'codingExercise',
      requirements: expect.arrayContaining([expect.stringContaining('exact commit SHA')]),
      successCriteria: expect.arrayContaining([expect.stringContaining('rollback')]),
    });
    for (const lesson of [englishGitWorkflow, russianGitWorkflow]) {
      const continuationCommands = lesson.blocks.find((block) => block.id === 'conflict-continuation-commands');
      expect(continuationCommands?.type).toBe('list');
      if (continuationCommands?.type !== 'list') throw new Error('Conflict continuation commands are missing');
      expect(continuationCommands.items.join(' ')).toContain('git merge --continue');
      expect(continuationCommands.items.join(' ')).toContain('git rebase --continue');
      expect(continuationCommands.items.join(' ')).toContain('git merge --abort');
      expect(continuationCommands.items.join(' ')).toContain('git rebase --abort');
      const conflictQuiz = lesson.blocks.find((block) => block.id === 'conflict-resolution-check');
      expect(conflictQuiz?.type).toBe('knowledgeCheck');
      if (conflictQuiz?.type !== 'knowledgeCheck') throw new Error('Conflict recovery question is missing');
      expect(conflictQuiz.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['rebase-continue']);
      expect(conflictQuiz.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
      const mergeWalkthrough = lesson.blocks.find((block) => block.id === 'conflict-resolution-merge-walkthrough');
      const rebaseWalkthrough = lesson.blocks.find((block) => block.id === 'conflict-resolution-rebase-walkthrough');
      for (const walkthrough of [mergeWalkthrough, rebaseWalkthrough]) {
        expect(walkthrough?.type).toBe('codeWalkthrough');
        if (walkthrough?.type !== 'codeWalkthrough') throw new Error('Conflict command walkthrough is missing');
        const lineCount = walkthrough.code.split(String.fromCharCode(10)).length;
        for (const step of walkthrough.steps) {
          expect(step.lineStart).toBeGreaterThan(0);
          expect(step.lineEnd).toBeLessThanOrEqual(lineCount);
        }
      }
      const conflictExercise = lesson.blocks.find((block) => block.id === 'conflict-resolution-practice');
      expect(conflictExercise?.type).toBe('codingExercise');
      if (conflictExercise?.type !== 'codingExercise') throw new Error('Conflict resolution practice is missing');
      expect(conflictExercise.requirements.length).toBeGreaterThanOrEqual(4);
      expect(conflictExercise.hints.length).toBeGreaterThanOrEqual(3);
      expect(conflictExercise.successCriteria.length).toBeGreaterThanOrEqual(4);
      const branchStrategies = lesson.blocks.find((block) => block.id === 'git-branch-strategy-choices');
      expect(branchStrategies?.type).toBe('list');
      if (branchStrategies?.type !== 'list') throw new Error('Branch strategy comparison is missing');
      const gitFlowChoice = branchStrategies.items.find((item) => item.includes('Git Flow'));
      expect(gitFlowChoice).toBeDefined();
      if (!gitFlowChoice) throw new Error('Git Flow branch destinations are missing');
      expect(gitFlowChoice).toContain('develop');
      expect(gitFlowChoice).toContain('main');
      expect(gitFlowChoice.toLowerCase()).toMatch(
        lesson.locale === 'en' ? /feature branches.*merge/ : /feature-ветки.*сливаются/,
      );

      const labels = lesson.blocks.find((block) => block.id === 'review-comment-labels');
      expect(labels?.type).toBe('list');
      if (labels?.type !== 'list') throw new Error('Review comment labels are missing');
      const labelText = labels.items.join(' ');
      for (const label of ['BLOCKING', 'SUGGESTION', 'QUESTION', 'NITPICK']) {
        expect(labelText).toContain(label);
      }
      expect(labelText).toMatch(/universal|universelle|универсальн/i);

      const reviewQuiz = lesson.blocks.find((block) => block.id === 'review-comment-label-check');
      expect(reviewQuiz?.type).toBe('knowledgeCheck');
      if (reviewQuiz?.type !== 'knowledgeCheck') throw new Error('Review comment knowledge check is missing');
      expect(reviewQuiz.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['blocking']);
      expect(reviewQuiz.options.every((option) => option.feedback.trim().length > 30)).toBe(true);

      const reviewPractice = lesson.blocks.find((block) => block.id === 'review-comment-practice');
      expect(reviewPractice?.type).toBe('codingExercise');
      if (reviewPractice?.type !== 'codingExercise') throw new Error('Review comment practice is missing');
      expect(reviewPractice.requirements.length).toBeGreaterThanOrEqual(5);
      expect(reviewPractice.hints.length).toBeGreaterThanOrEqual(4);
      expect(reviewPractice.successCriteria.length).toBeGreaterThanOrEqual(5);

      const backMergeGuidance = lesson.blocks.find((block) => block.id === 'hotfix-back-merge-guidance');
      expect(backMergeGuidance?.type).toBe('paragraph');
      if (backMergeGuidance?.type !== 'paragraph') throw new Error('Hotfix back-merge guidance is missing');
      expect(backMergeGuidance.text).toContain('develop');
      expect(backMergeGuidance.text).toMatch(/back-merge|обратно влить/i);

      const backMergeCheck = lesson.blocks.find((block) => block.id === 'hotfix-back-merge-check');
      expect(backMergeCheck?.type).toBe('knowledgeCheck');
      if (backMergeCheck?.type !== 'knowledgeCheck') throw new Error('Hotfix back-merge check is missing');
      expect(backMergeCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['back-merge']);
      expect(backMergeCheck.options.every((option) => option.feedback.trim().length > 30)).toBe(true);

      const sourceQuizAnswers: Record<string, string> = {
        'hotfix-origin-check': 'hotfix-from-production',
        'branch-protection-check': 'branch-rules-enforce',
        'git-flow-feature-target-check': 'feature-to-develop',
        'ci-basics-check': 'automated-checks-on-change',
        'review-comment-specificity-check': 'specific-actionable',
        'git-semver-minor-check': 'minor-1-5-0',
        'continuous-deployment-check': 'automatic-production',
        'small-pr-review-check': 'focused-review',
        'npm-ci-lockfile-check': 'clean-lockfile-install',
      };
      expect(lesson.blocks.map((block) => block.id)).toEqual(
        expect.arrayContaining(['source-quiz-parity-heading', ...Object.keys(sourceQuizAnswers)]),
      );
      for (const [questionId, answerId] of Object.entries(sourceQuizAnswers)) {
        const question = lesson.blocks.find((block) => block.id === questionId);
        expect(question?.type).toBe('knowledgeCheck');
        if (question?.type !== 'knowledgeCheck') throw new Error(`Missing source quiz question: ${questionId}`);
        expect(question.questionType).toBe('single-choice');
        expect(question.options.filter((option) => option.correct).map((option) => option.id)).toEqual([answerId]);
        expect(question.options.every((option) => option.feedback.trim().length > 30)).toBe(true);
        expect(question.explanation.trim().length).toBeGreaterThan(40);
      }

      const references = lesson.blocks.find((block) => block.id === 'git-workflow-references');
      expect(references?.type).toBe('references');
      if (references?.type !== 'references') throw new Error('Git workflow references are missing');
      expect(references.items.some((item) => item.url === 'https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows')).toBe(true);
    }
  });
});

describe('deployment and production hosting lesson translation', () => {
  it('covers provider-specific custom domains with aligned DNS/HTTPS guidance', () => {
    expect(lessonTranslationSchema.safeParse(englishDeployment).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianDeployment).success).toBe(true);
    expect(englishDeployment.id).toBe('deployment.production-hosting');
    expect(englishDeployment.id).toBe(russianDeployment.id);
    expect(englishDeployment.moduleId).toBe(russianDeployment.moduleId);
    expect(englishDeployment.version).toBe(4);
    expect(englishDeployment.blocks.map(({ id, type }) => ({ id, type }))).toEqual(russianDeployment.blocks.map(({ id, type }) => ({ id, type })));
    expect(englishDeployment.blocks).toHaveLength(34);
    expect(englishDeployment.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(russianDeployment.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    expect(englishDeployment.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
    expect(russianDeployment.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(5);
    expect(englishDeployment.blocks.filter((block) => block.type === 'codingExercise')).toHaveLength(4);
    expect(englishDeployment.blocks.map((block) => block.id)).toEqual(expect.arrayContaining(['deploy-domain-heading', 'deploy-domain-walkthrough', 'deploy-domain-check', 'deploy-domain-practice', 'deploy-rollback-heading', 'deploy-rollback-body', 'deploy-rollback-walkthrough', 'deploy-rollback-check']));
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

    for (const lesson of [englishDeployment, russianDeployment]) {
      expect(lesson.version).toBe(4);
      expect(lesson.updatedAt).toBe('2026-10-29');
      expect(lesson.learningOutcomes).toHaveLength(8);
      const rollbackBody = lesson.blocks.find((block) => block.id === 'deploy-rollback-body');
      expect(rollbackBody?.type).toBe('paragraph');
      if (rollbackBody?.type !== 'paragraph') throw new Error('Deployment rollback explanation is missing');
      expect(rollbackBody.text).toMatch(/git revert/);
      expect(rollbackBody.text.toLowerCase()).toMatch(/rollback/);
      const rollbackFlow = lesson.blocks.find((block) => block.id === 'deploy-rollback-walkthrough');
      expect(rollbackFlow?.type).toBe('codeWalkthrough');
      if (rollbackFlow?.type !== 'codeWalkthrough') throw new Error('Deployment rollback walkthrough is missing');
      const rollbackLineCount = rollbackFlow.code.split('\n').length;
      expect(rollbackFlow.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= rollbackLineCount)).toBe(true);
      const rollbackCheck = lesson.blocks.find((block) => block.id === 'deploy-rollback-check');
      expect(rollbackCheck?.type).toBe('knowledgeCheck');
      if (rollbackCheck?.type !== 'knowledgeCheck') throw new Error('Deployment rollback check is missing');
      expect(rollbackCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['restore-known-good']);
      expect(rollbackCheck.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      expect(rollbackCheck.explanation.trim().length).toBeGreaterThan(0);
      const refs = lesson.blocks.find((block) => block.id === 'deploy-references');
      expect(refs?.type).toBe('references');
      if (refs?.type !== 'references') throw new Error('Deployment references are missing');
      expect(refs.items.some((item) => item.url === 'https://vercel.com/docs/deployments/rollback-production-deployment')).toBe(true);
      expect(refs.items.some((item) => item.url === 'https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/')).toBe(true);
    }
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
    expect(checks).toHaveLength(3);
    for (const check of checks) {
      expect(check.options.filter((option) => option.correct)).toHaveLength(1);
      expect(check.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(check.explanation.trim().length).toBeGreaterThan(0);
    }
    expect(englishCollections.version).toBe(2);
    expect(englishCollections.blocks).toHaveLength(23);
    expect(englishCollections.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(6);
    const exercise = englishCollections.blocks.find((block) => block.type === 'codingExercise');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(4);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(3);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(4);
    for (const lesson of [englishCollections, russianCollections]) {
      const mapWalk = lesson.blocks.find((block) => block.id === 'map-methods-walkthrough');
      expect(mapWalk?.type).toBe('codeWalkthrough');
      if (mapWalk?.type !== 'codeWalkthrough') return;
      const mapLines = mapWalk.code.split('\n').length;
      expect(mapWalk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= mapLines)).toBe(true);
      expect(mapWalk.code).toContain('.has(');
      expect(mapWalk.code).toContain('.delete(');
      expect(mapWalk.code).toContain('.keys()');
      const setWalk = lesson.blocks.find((block) => block.id === 'set-operations-walkthrough');
      expect(setWalk?.type).toBe('codeWalkthrough');
      if (setWalk?.type !== 'codeWalkthrough') return;
      const setLines = setWalk.code.split('\n').length;
      expect(setWalk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= setLines)).toBe(true);
      expect(setWalk.code).toContain('intersection');
      expect(setWalk.code).toContain('difference');
      const symbols = lesson.blocks.find((block) => block.id === 'symbols-walkthrough');
      expect(symbols?.type).toBe('codeWalkthrough');
      if (symbols?.type !== 'codeWalkthrough') return;
      const symbolLines = symbols.code.split('\n').length;
      expect(symbols.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= symbolLines)).toBe(true);
      expect(symbols.code).toContain('Symbol.for');
      expect(symbols.code).toContain('Object.getOwnPropertySymbols');
      expect(symbols.code).toContain('Symbol.iterator');
      const warning = lesson.blocks.find((block) => block.id === 'symbols-security-note');
      expect(warning?.type).toBe('callout');
      if (warning?.type === 'callout') expect(warning.text).toMatch(/not private|not a security boundary|не.*приват|не.*границ.*безопас/i);
      const symbolCheck = lesson.blocks.find((block) => block.id === 'symbols-check');
      expect(symbolCheck?.type).toBe('knowledgeCheck');
      if (symbolCheck?.type !== 'knowledgeCheck') return;
      expect(symbolCheck.options.filter((option) => option.correct)).toHaveLength(1);
      expect(symbolCheck.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const refs = lesson.blocks.find((block) => block.id === 'collections-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol')).toBe(true);
    }
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
    expect(quizzes).toHaveLength(3);
    for (const quiz of quizzes) {
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
    expect(englishRegex.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(5);
    const exercise = englishRegex.blocks.find((block) => block.type === 'codingExercise');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.starterCode).toContain('matchAll');
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(4);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(3);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
    for (const lesson of [englishRegex, russianRegex]) {
      const practical = lesson.blocks.find((block) => block.id === 'regex-practical-patterns-walkthrough');
      expect(practical?.type).toBe('codeWalkthrough');
      if (practical?.type !== 'codeWalkthrough') return;
      const practicalLines = practical.code.split('\n').length;
      expect(practical.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= practicalLines)).toBe(true);
      expect(practical.code).toContain('passwordPolicy');
      expect(practical.code).toContain('https?:');
      expect(practical.code).toContain('#\\w+');
      const constructor = lesson.blocks.find((block) => block.id === 'regex-dynamic-constructor-walkthrough');
      expect(constructor?.type).toBe('codeWalkthrough');
      if (constructor?.type !== 'codeWalkthrough') return;
      const constructorLines = constructor.code.split('\n').length;
      expect(constructor.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= constructorLines)).toBe(true);
      expect(constructor.code).toContain('new RegExp');
      expect(constructor.code).toContain('escapeRegExp');
      const constructorCheck = lesson.blocks.find((block) => block.id === 'regex-constructor-check');
      expect(constructorCheck?.type).toBe('knowledgeCheck');
      if (constructorCheck?.type !== 'knowledgeCheck') return;
      expect(constructorCheck.options.filter((option) => option.correct)).toHaveLength(1);
      expect(constructorCheck.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const flags = lesson.blocks.find((block) => block.id === 'regex-flags');
      expect(flags?.type).toBe('list');
      if (flags?.type === 'list') {
        expect(flags.items.some((item) => item.includes('`y`'))).toBe(true);
        expect(flags.items.some((item) => item.includes('`d`'))).toBe(true);
        expect(flags.items.some((item) => item.includes('`v`'))).toBe(true);
      }
      const references = lesson.blocks.find((block) => block.id === 'regex-references');
      expect(references?.type).toBe('references');
      if (references?.type === 'references') expect(references.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp')).toBe(true);
      const exercise = lesson.blocks.find((block) => block.id === 'regex-practice');
      expect(exercise?.type).toBe('codingExercise');
      if (exercise?.type === 'codingExercise') {
        expect(exercise.instructions.some((item) => /escape.*meta|экранир.*метасимвол/i.test(item))).toBe(true);
        expect(exercise.requirements.length).toBeGreaterThanOrEqual(5);
        expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
      }
    }
  });
});

describe('browser storage supplementary lesson', () => {
  it('teaches Web Storage and IndexedDB boundaries with applied transaction practice', () => {
    expect(lessonTranslationSchema.safeParse(englishStorage).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianStorage).success).toBe(true);
    expect(englishStorage.id).toBe('browser.storage-indexeddb');
    expect(englishStorage.version).toBe(2);
    expect(englishStorage.blocks).toHaveLength(30);
    expect(englishStorage.moduleId).toBe('supplement-browser-storage');
    expect(englishStorage.supplementaryTrackId).toBe('supplement-browser-storage');
    expect(englishStorage.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianStorage.blocks.map(({ id, type }) => ({ id, type })),
    );
    const quizzes = englishStorage.blocks.filter((block) => block.type === 'knowledgeCheck');
    expect(quizzes).toHaveLength(3);
    for (const quiz of quizzes) {
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
    expect(englishStorage.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(7);
    const exercise = englishStorage.blocks.find((block) => block.id === 'storage-practice');
    expect(exercise?.type).toBe('codingExercise');
    if (exercise?.type !== 'codingExercise') return;
    expect(exercise.starterCode).toContain('transaction.oncomplete');
    expect(exercise.requirements.length).toBeGreaterThanOrEqual(5);
    expect(exercise.hints.length).toBeGreaterThanOrEqual(4);
    expect(exercise.successCriteria.length).toBeGreaterThanOrEqual(5);
    for (const lesson of [englishStorage, russianStorage]) {
      for (const walk of lesson.blocks.filter((block) => block.type === 'codeWalkthrough')) {
        if (walk.type !== 'codeWalkthrough') continue;
        const lineCount = walk.code.split('\n').length;
        expect(walk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      }
      const crud = lesson.blocks.find((block) => block.id === 'indexeddb-crud-walkthrough');
      expect(crud?.type).toBe('codeWalkthrough');
      if (crud?.type !== 'codeWalkthrough') return;
      expect(crud.code).toContain('store.add(draft)');
      expect(crud.code).toContain('objectStore("drafts").put(draft)');
      expect(crud.code).toContain('objectStore("drafts").delete(id)');
      expect(crud.code).toContain('transaction.oncomplete');
      const query = lesson.blocks.find((block) => block.id === 'indexeddb-query-walkthrough');
      expect(query?.type).toBe('codeWalkthrough');
      if (query?.type !== 'codeWalkthrough') return;
      expect(query.code).toContain('IDBKeyRange.bound');
      expect(query.code).toContain('openCursor');
      expect(query.code).toContain('cursor.continue()');
      const quota = lesson.blocks.find((block) => block.id === 'indexeddb-quota-walkthrough');
      expect(quota?.type).toBe('codeWalkthrough');
      if (quota?.type !== 'codeWalkthrough') return;
      expect(quota.code).toContain('navigator.storage?.estimate');
      expect(quota.code).toContain('quotaBytes');
      const crudCheck = lesson.blocks.find((block) => block.id === 'indexeddb-crud-check');
      expect(crudCheck?.type).toBe('knowledgeCheck');
      if (crudCheck?.type !== 'knowledgeCheck') return;
      expect(crudCheck.options.filter((option) => option.correct)).toHaveLength(1);
      expect(crudCheck.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const practice = lesson.blocks.find((block) => block.id === 'indexeddb-crud-practice');
      expect(practice?.type).toBe('codingExercise');
      if (practice?.type !== 'codingExercise') return;
      expect(practice.requirements.length).toBeGreaterThanOrEqual(7);
      expect(practice.hints.length).toBeGreaterThanOrEqual(5);
      expect(practice.successCriteria.length).toBeGreaterThanOrEqual(6);
      const refs = lesson.blocks.find((block) => block.id === 'storage-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') {
        expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate')).toBe(true);
      }
    }
  });
});

describe('deep modern JavaScript syntax in the core functions lesson', () => {
  it('teaches iterable destructuring, rest/spread, optional access, and nullish defaults', () => {
    expect(lessonTranslationSchema.safeParse(englishJsFunctions).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianJsFunctions).success).toBe(true);
    expect(englishJsFunctions.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianJsFunctions.blocks.map(({ id, type }) => ({ id, type })),
    );

    expect(englishJsFunctions.version).toBe(3);
    expect(englishJsFunctions.blocks).toHaveLength(76);
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

    for (const quizId of ['array-default-quiz', 'nullish-quiz', 'nested-destructuring-check']) {
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

    const nestedWalk = englishJsFunctions.blocks.find((block) => block.id === 'nested-destructuring-walkthrough');
    expect(nestedWalk?.type).toBe('codeWalkthrough');
    if (nestedWalk?.type !== 'codeWalkthrough') return;
    expect(nestedWalk.code).toContain('info: { name, contact: { email } }');
    expect(nestedWalk.code).toContain('function displayUser({ name, age, city = "Unknown" })');
    expect(nestedWalk.code).toContain('[x, y] = [y, x]');
    const nestedLineCount = nestedWalk.code.split('\n').length;
    expect(nestedWalk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= nestedLineCount)).toBe(true);
    for (const lesson of [englishJsFunctions, russianJsFunctions]) {
      const practiceBlock = lesson.blocks.find((block) => block.id === 'modern-syntax-practice');
      expect(practiceBlock?.type).toBe('codingExercise');
      if (practiceBlock?.type === 'codingExercise') {
        expect(practiceBlock.instructions.some((instruction) => instruction.includes('parameter') || instruction.includes('параметр'))).toBe(true);
        expect(practiceBlock.requirements.some((requirement) => requirement.includes('Nested destructuring') || requirement.includes('Вложенная деструктуризация'))).toBe(true);
      }
      const refs = lesson.blocks.find((block) => block.id === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring')).toBe(true);
    }

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
    expect(quizzes).toHaveLength(5);
    for (const quiz of quizzes) {
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
    expect(englishRealtime.blocks.filter((block) => block.type === 'codeWalkthrough')).toHaveLength(7);
    for (const id of ['xhr-progress-walkthrough', 'ws-reconnect-walkthrough', 'service-worker-lifecycle-walkthrough']) {
      const walk = englishRealtime.blocks.find((block) => block.id === id);
      expect(walk?.type).toBe('codeWalkthrough');
      if (walk?.type !== 'codeWalkthrough') return;
      const lineCount = walk.code.split('\n').length;
      expect(walk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
    }
    const xhrProgress = englishRealtime.blocks.find((block) => block.id === 'xhr-progress-walkthrough');
    expect(xhrProgress?.type === 'codeWalkthrough' && xhrProgress.code).toContain('event.lengthComputable');
    const reconnect = englishRealtime.blocks.find((block) => block.id === 'ws-reconnect-walkthrough');
    expect(reconnect?.type === 'codeWalkthrough' && reconnect.code).toContain('MAX_RETRIES');
    expect(reconnect?.type === 'codeWalkthrough' && reconnect.code).toContain('WebSocket.OPEN');
    const cacheCleanup = englishRealtime.blocks.find((block) => block.id === 'service-worker-lifecycle-walkthrough');
    expect(cacheCleanup?.type === 'codeWalkthrough' && cacheCleanup.code).toContain('name.startsWith(CACHE_PREFIX)');
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

describe('UI design system accessible fields and React refs', () => {
  it('documents accessible input relationships and version-aware refs', () => {
    expect(lessonTranslationSchema.safeParse(englishDesignSystem).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianDesignSystem).success).toBe(true);
    expect(englishDesignSystem.version).toBe(3);
    expect(englishDesignSystem.blocks).toHaveLength(32);
    expect(englishDesignSystem.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianDesignSystem.blocks.map(({ id, type }) => ({ id, type })),
    );
    for (const lesson of [englishDesignSystem, russianDesignSystem]) {
      const walk = lesson.blocks.find((block) => block.id === 'ui-accessible-field-walkthrough');
      expect(walk?.type).toBe('codeWalkthrough');
      if (walk?.type !== 'codeWalkthrough') return;
      const lineCount = walk.code.split('\n').length;
      expect(walk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(walk.code).toContain('aria-invalid');
      expect(walk.code).toContain('aria-describedby');
      expect(walk.code).toContain('htmlFor');
      const patterns = lesson.blocks.find((block) => block.id === 'ui-advanced-composition-model');
      expect(patterns?.type).toBe('list');
      if (patterns?.type === 'list') {
        expect(patterns.items.some((item) => item.includes('React 19'))).toBe(true);
        expect(patterns.items.some((item) => item.includes('Atomic Design'))).toBe(true);
      }
      const check = lesson.blocks.find((block) => block.id === 'ui-component-api-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') return;
      expect(check.options.filter((option) => option.correct)).toHaveLength(1);
      expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const practice = lesson.blocks.find((block) => block.id === 'deep-design-practice');
      expect(practice?.type).toBe('codingExercise');
      if (practice?.type === 'codingExercise') {
        expect(practice.instructions.some((item) => item.includes('aria-describedby'))).toBe(true);
        expect(practice.successCriteria.some((item) => item.includes('focus') || item.includes('фокус'))).toBe(true);
      }
      const refs = lesson.blocks.find((block) => block.id === 'ui-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') expect(refs.items.some((item) => item.url === 'https://react.dev/reference/react/forwardRef')).toBe(true);
    }
  });
});

describe('HTML reference source coverage', () => {
  it('covers text semantics, links, metadata, and global attributes in both locales', () => {
    expect(lessonTranslationSchema.safeParse(englishLesson).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianLesson).success).toBe(true);
    expect(englishLesson.version).toBe(9);
    expect(englishLesson.blocks).toHaveLength(55);
    expect(englishLesson.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianLesson.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishLesson.blocks.map(({ id }) => id)).toContain('html-role-keyboard-check');
    for (const lesson of [englishLesson, russianLesson]) {
      const textWalk = lesson.blocks.find((block) => block.id === 'html-text-markup-walkthrough');
      expect(textWalk?.type).toBe('codeWalkthrough');
      if (textWalk?.type !== 'codeWalkthrough') return;
      const textLines = textWalk.code.split('\n').length;
      expect(textWalk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= textLines)).toBe(true);
      expect(textWalk.code).toContain('<strong>');
      expect(textWalk.code).toContain('<em>');
      expect(textWalk.code).toContain('<br>');
      const textCheck = lesson.blocks.find((block) => block.id === 'html-text-markup-check');
      expect(textCheck?.type).toBe('knowledgeCheck');
      if (textCheck?.type !== 'knowledgeCheck') return;
      expect(textCheck.options.filter((option) => option.correct)).toHaveLength(1);
      const linksWalk = lesson.blocks.find((block) => block.id === 'html-links-metadata-walkthrough');
      expect(linksWalk?.type).toBe('codeWalkthrough');
      if (linksWalk?.type !== 'codeWalkthrough') return;
      const linksLines = linksWalk.code.split('\n').length;
      expect(linksWalk.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= linksLines)).toBe(true);
      expect(linksWalk.code).toContain('rel="noopener"');
      expect(linksWalk.code).toContain('property="og:title"');
      const headingWalkthrough = lesson.blocks.find((block) => block.id === 'html-heading-hierarchy-walkthrough');
      expect(headingWalkthrough?.type).toBe('codeWalkthrough');
      if (headingWalkthrough?.type !== 'codeWalkthrough') return;
      expect(headingWalkthrough.code).toContain('<h1>Account settings</h1>');
      expect(headingWalkthrough.code).toContain('<h2 id="contact-heading">');
      expect(headingWalkthrough.code).toContain('<h3 id="verification-heading">');
      expect(headingWalkthrough.code).toContain('<h4>Before you continue</h4>');
      const headingLineCount = headingWalkthrough.code.split('\n').length;
      expect(headingWalkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= headingLineCount)).toBe(true);
      const headingCheck = lesson.blocks.find((block) => block.id === 'html-heading-hierarchy-check');
      expect(headingCheck?.type).toBe('knowledgeCheck');
      if (headingCheck?.type !== 'knowledgeCheck') return;
      expect(headingCheck.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['structure']);

      const globals = lesson.blocks.find((block) => block.id === 'html-global-attributes');
      expect(globals?.type).toBe('list');
      if (globals?.type === 'list') {
        expect(globals.items.some((item) => item.includes('tabindex'))).toBe(true);
        expect(globals.items.some((item) => item.includes('data-*'))).toBe(true);
      }
      const refs = lesson.blocks.find((block) => block.id === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') {
        expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a')).toBe(true);
      }
    }
  });
});

describe('React forms cross-field validation source coverage', () => {
  it('revalidates dependent fields and keeps accessible errors in sync', () => {
    expect(lessonTranslationSchema.safeParse(englishReactForms).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianReactForms).success).toBe(true);
    expect(englishReactForms.version).toBe(3);
    expect(englishReactForms.blocks).toHaveLength(52);
    expect(englishReactForms.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianReactForms.blocks.map(({ id, type }) => ({ id, type })),
    );
    for (const lesson of [englishReactForms, russianReactForms]) {
      const walkthrough = lesson.blocks.find((block) => block.id === 'cross-field-validation-walkthrough');
      expect(walkthrough?.type).toBe('codeWalkthrough');
      if (walkthrough?.type !== 'codeWalkthrough') return;
      const lineCount = walkthrough.code.split('\n').length;
      expect(walkthrough.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= lineCount)).toBe(true);
      expect(walkthrough.code).toContain('confirmPassword !== values.password');
      expect(walkthrough.code).toContain('aria-invalid');
      expect(walkthrough.code).toContain('aria-describedby');
      const check = lesson.blocks.find((block) => block.id === 'cross-field-validation-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') return;
      expect(check.options.filter((option) => option.correct)).toHaveLength(1);
      expect(check.options.every((option) => option.feedback.trim().length > 20)).toBe(true);
      const registration = lesson.blocks.find((block) => block.id === 'practice-registration-form');
      expect(registration?.type).toBe('codingExercise');
      if (registration?.type === 'codingExercise') {
        expect(registration.instructions.some((item) => item.includes('matching passwords') || item.includes('совпадение паролей'))).toBe(true);
        expect(registration.successCriteria.some((item) => item.toLowerCase().includes('confirmation') || item.toLowerCase().includes('подтверждение'))).toBe(true);
      }
    }
  });
});
describe('lesson publication status policy', () => {
  it('rejects publishing a translation that is still marked review-needed', () => {
    const candidate = {
      ...englishLesson,
      status: 'published',
      translationStatus: 'review-needed',
    };
    expect(lessonTranslationSchema.safeParse(candidate).success).toBe(false);
  });
});
