import { z } from 'zod';

const lessonLocaleSchema = z.enum(['en', 'ru']);
const reviewStatusSchema = z.enum(['draft', 'review', 'published']);
const difficultySchema = z.enum(['beginner', 'intermediate', 'advanced']);

const blockBase = {
  id: z.string().min(1),
};

const headingBlockSchema = z.object({
  ...blockBase,
  type: z.literal('heading'),
  level: z.union([z.literal(2), z.literal(3), z.literal(4)]),
  text: z.string().min(1),
});

const paragraphBlockSchema = z.object({
  ...blockBase,
  type: z.literal('paragraph'),
  text: z.string().min(1),
});

const listBlockSchema = z.object({
  ...blockBase,
  type: z.literal('list'),
  ordered: z.boolean().default(false),
  items: z.array(z.string().min(1)).min(1),
});

const calloutBlockSchema = z.object({
  ...blockBase,
  type: z.literal('callout'),
  tone: z.enum(['note', 'tip', 'important', 'warning']),
  title: z.string().min(1),
  text: z.string().min(1),
});

const codeBlockSchema = z.object({
  ...blockBase,
  type: z.literal('code'),
  language: z.string().min(1),
  code: z.string(),
  caption: z.string().optional(),
});

const walkthroughStepSchema = z.object({
  title: z.string().min(1),
  explanation: z.string().min(1),
  lineStart: z.number().int().positive().optional(),
  lineEnd: z.number().int().positive().optional(),
}).superRefine((step, ctx) => {
  if (step.lineStart !== undefined && step.lineEnd !== undefined && step.lineEnd < step.lineStart) {
    ctx.addIssue({
      code: 'custom',
      path: ['lineEnd'],
      message: 'lineEnd must be greater than or equal to lineStart',
    });
  }
});

const codeWalkthroughBlockSchema = z.object({
  ...blockBase,
  type: z.literal('codeWalkthrough'),
  language: z.string().min(1),
  code: z.string(),
  steps: z.array(walkthroughStepSchema).min(1),
}).superRefine((block, ctx) => {
  const lineCount = block.code.split('\n').length;
  block.steps.forEach((step, index) => {
    if (step.lineStart !== undefined && step.lineStart > lineCount) {
      ctx.addIssue({
        code: 'custom',
        path: ['steps', index, 'lineStart'],
        message: `lineStart exceeds the code's ${lineCount} lines`,
      });
    }
    if (step.lineEnd !== undefined && step.lineEnd > lineCount) {
      ctx.addIssue({
        code: 'custom',
        path: ['steps', index, 'lineEnd'],
        message: `lineEnd exceeds the code's ${lineCount} lines`,
      });
    }
  });
});

const knowledgeOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  correct: z.boolean(),
  feedback: z.string().min(1),
});

const knowledgeCheckBlockSchema = z.object({
  ...blockBase,
  type: z.literal('knowledgeCheck'),
  questionType: z.enum(['single-choice', 'multi-select', 'true-false']),
  prompt: z.string().min(1),
  options: z.array(knowledgeOptionSchema).min(2),
  explanation: z.string().min(1),
}).superRefine((question, ctx) => {
  const optionIds = question.options.map((option) => option.id);
  if (new Set(optionIds).size !== optionIds.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['options'],
      message: 'Option IDs must be unique within a question',
    });
  }

  const correctCount = question.options.filter((option) => option.correct).length;
  if (question.questionType === 'single-choice' && correctCount !== 1) {
    ctx.addIssue({
      code: 'custom',
      path: ['options'],
      message: 'A single-choice question must have exactly one correct option',
    });
  }
  if (question.questionType === 'multi-select' && (correctCount < 1 || correctCount === question.options.length)) {
    ctx.addIssue({
      code: 'custom',
      path: ['options'],
      message: 'A multi-select question must include at least one correct and one incorrect option',
    });
  }
  if (question.questionType === 'true-false' && (question.options.length !== 2 || correctCount !== 1)) {
    ctx.addIssue({
      code: 'custom',
      path: ['options'],
      message: 'A true-false question must have two options and exactly one correct option',
    });
  }
});

const codingExerciseBlockSchema = z.object({
  ...blockBase,
  type: z.literal('codingExercise'),
  title: z.string().min(1),
  language: z.string().min(1),
  context: z.string().min(1),
  instructions: z.array(z.string().min(1)).min(1),
  requirements: z.array(z.string().min(1)).min(1),
  starterCode: z.string(),
  hints: z.array(z.string().min(1)).default([]),
  successCriteria: z.array(z.string().min(1)).min(1),
});

const referencesBlockSchema = z.object({
  ...blockBase,
  type: z.literal('references'),
  items: z.array(z.object({
    title: z.string().min(1),
    url: z.string().url(),
    kind: z.enum(['official-docs', 'standard', 'guide', 'article']),
  })).min(1),
});

export const lessonContentBlockSchema = z.discriminatedUnion('type', [
  headingBlockSchema,
  paragraphBlockSchema,
  listBlockSchema,
  calloutBlockSchema,
  codeBlockSchema,
  codeWalkthroughBlockSchema,
  knowledgeCheckBlockSchema,
  codingExerciseBlockSchema,
  referencesBlockSchema,
]);

export const lessonTranslationSchema = z.object({
  id: z.string().min(1),
  locale: lessonLocaleSchema,
  version: z.number().int().positive(),
  status: reviewStatusSchema,
  translationStatus: z.enum(['original', 'translated', 'review-needed']),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  moduleId: z.string().min(1),
  week: z.number().int().min(1).max(24),
  order: z.number().int().nonnegative(),
  title: z.string().min(1),
  description: z.string().min(1),
  estimatedMinutes: z.number().int().positive(),
  difficulty: difficultySchema,
  prerequisites: z.array(z.string()),
  learningOutcomes: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)),
  blocks: z.array(lessonContentBlockSchema).min(1),
}).superRefine((lesson, ctx) => {
  const blockIds = lesson.blocks.map((block) => block.id);
  if (new Set(blockIds).size !== blockIds.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['blocks'],
      message: 'Block IDs must be unique within a lesson translation',
    });
  }

  const hasReferences = lesson.blocks.some((block) => block.type === 'references');
  if (!hasReferences) {
    ctx.addIssue({
      code: 'custom',
      path: ['blocks'],
      message: 'Every lesson must include at least one references block',
    });
  }
});

export type LessonTranslation = z.infer<typeof lessonTranslationSchema>;
export type LessonContentBlock = z.infer<typeof lessonContentBlockSchema>;
