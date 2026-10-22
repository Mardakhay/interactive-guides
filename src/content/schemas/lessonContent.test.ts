import { describe, expect, it } from 'vitest';
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
    expect(englishForms.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
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
    expect(englishCss.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
    expect(russianCss.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});

describe('Flexbox, Grid and responsive design lesson translation', () => {
  it('keeps identical content-block structure in both locales', () => {
    expect(englishLayout.id).toBe(russianLayout.id);
    expect(englishLayout.moduleId).toBe('month-1-week-4');
    expect(englishLayout.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianLayout.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishLayout.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
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
    expect(englishJsBasics.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
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
    expect(englishAsync.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(4);
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
    expect(englishGit.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
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
    expect(englishTooling.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
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
    expect(englishTypeScript.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
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
    expect(englishReactEffects.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
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
    expect(englishRouter.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
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
    expect(englishReactForms.blocks.filter((block) => block.type === 'knowledgeCheck')).toHaveLength(3);
    expect(russianReactForms.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });
});
