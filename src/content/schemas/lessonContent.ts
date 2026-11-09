import { z } from 'zod';

const lessonLocaleSchema = z.enum(['en', 'ru']);
const reviewStatusSchema = z.enum(['draft', 'review', 'published']);
export type LessonPublicationStatus = z.infer<typeof reviewStatusSchema>;
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

const commandReferenceItemSchema = z.object({
  id: z.string().min(1),
  command: z.string().min(1),
  description: z.string().min(1),
});

const commandReferenceCategorySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  items: z.array(commandReferenceItemSchema).min(1),
});

const commandReferenceBlockSchema = z.object({
  ...blockBase,
  type: z.literal('commandReference'),
  categories: z.array(commandReferenceCategorySchema).min(1),
}).superRefine((block, ctx) => {
  const categoryIds = new Set<string>();
  const itemIds = new Set<string>();
  block.categories.forEach((category, categoryIndex) => {
    if (categoryIds.has(category.id)) {
      ctx.addIssue({
        code: 'custom',
        path: ['categories', categoryIndex, 'id'],
        message: 'Command reference category IDs must be unique',
      });
    }
    categoryIds.add(category.id);
    category.items.forEach((item, itemIndex) => {
      if (itemIds.has(item.id)) {
        ctx.addIssue({
          code: 'custom',
          path: ['categories', categoryIndex, 'items', itemIndex, 'id'],
          message: 'Command reference item IDs must be unique across categories',
        });
      }
      itemIds.add(item.id);
    });
  });
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
  solution: z.object({
    code: z.string().min(1),
    explanation: z.string().min(1),
  }).optional(),
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

const pipelineStageSchema = z.object({
  id: z.enum(['checkout', 'install', 'lint', 'build', 'test', 'security', 'deploy']),
  label: z.string().min(1),
  description: z.string().min(1),
  successMessage: z.string().min(1),
  failureMessage: z.string().min(1),
  gate: z.enum(['required', 'informational', 'post-merge']),
});


const branchFlowActionSchema = z.object({
  id: z.enum(['create-develop', 'create-feature', 'commit', 'merge-feature', 'create-hotfix', 'merge-hotfix', 'back-merge-hotfix', 'release']),
  label: z.string().min(1),
  description: z.string().min(1),
});

const branchFlowSimulationBlockSchema = z.object({
  ...blockBase,
  type: z.literal('branchFlowSimulation'),
  title: z.string().min(1),
  description: z.string().min(1),
  actions: z.array(branchFlowActionSchema).length(8),
}).superRefine((block, ctx) => {
  const expected = ['create-develop', 'create-feature', 'commit', 'merge-feature', 'create-hotfix', 'merge-hotfix', 'back-merge-hotfix', 'release'];
  const actual = block.actions.map((action) => action.id);
  if (actual.some((id, index) => id !== expected[index])) {
    ctx.addIssue({ code: 'custom', path: ['actions'], message: 'Branch flow actions must preserve the documented order' });
  }
});

const tabbedContentTabSchema = z.object({
  id: z.enum(['why-strategy', 'branches', 'git-flow', 'merge-requests', 'code-review', 'ci-cd', 'quiz']),
  label: z.string().min(1),
  blockIds: z.array(z.string().min(1)).min(1),
});

const tabbedContentBlockSchema = z.object({
  ...blockBase,
  type: z.literal('tabbedContent'),
  title: z.string().min(1),
  description: z.string().min(1),
  tabs: z.array(tabbedContentTabSchema).length(7),
}).superRefine((block, ctx) => {
  const expected = ['why-strategy', 'branches', 'git-flow', 'merge-requests', 'code-review', 'ci-cd', 'quiz'];
  const actual = block.tabs.map((tab) => tab.id);
  if (actual.some((id, index) => id !== expected[index])) {
    ctx.addIssue({ code: 'custom', path: ['tabs'], message: 'Git Workflow tabs must preserve the seven source sections in order' });
  }
  const blockIds = block.tabs.flatMap((tab) => tab.blockIds);
  if (new Set(blockIds).size !== blockIds.length) {
    ctx.addIssue({ code: 'custom', path: ['tabs'], message: 'A lesson block can only belong to one source tab' });
  }
});

const sequentialQuizBlockSchema = z.object({
  ...blockBase,
  type: z.literal('sequentialQuiz'),
  title: z.string().min(1),
  description: z.string().min(1),
  questionBlockIds: z.array(z.string().min(1)).length(10),
}).superRefine((block, ctx) => {
  if (new Set(block.questionBlockIds).size !== block.questionBlockIds.length) {
    ctx.addIssue({ code: 'custom', path: ['questionBlockIds'], message: 'A sequential quiz must reference ten distinct questions' });
  }
});

const pipelineSimulationBlockSchema = z.object({
  ...blockBase,
  type: z.literal('pipelineSimulation'),
  title: z.string().min(1),
  description: z.string().min(1),
  stages: z.array(pipelineStageSchema).length(7),
}).superRefine((block, ctx) => {
  const expected = ['checkout', 'install', 'lint', 'build', 'test', 'security', 'deploy'];
  const actual = block.stages.map((stage) => stage.id);
  if (actual.some((id, index) => id !== expected[index])) {
    ctx.addIssue({ code: 'custom', path: ['stages'], message: 'Pipeline stages must preserve the documented seven-stage order' });
  }
  block.stages.forEach((stage, index) => {
    const expectedGate = index === 5 ? 'informational' : index === 6 ? 'post-merge' : 'required';
    if (stage.gate !== expectedGate) {
      ctx.addIssue({ code: 'custom', path: ['stages', index, 'gate'], message: 'Pipeline stage gate does not match its documented lifecycle phase' });
    }
  });
});

export const lessonContentBlockSchema = z.discriminatedUnion('type', [
  headingBlockSchema,
  paragraphBlockSchema,
  listBlockSchema,
  commandReferenceBlockSchema,
  calloutBlockSchema,
  codeBlockSchema,
  codeWalkthroughBlockSchema,
  knowledgeCheckBlockSchema,
  codingExerciseBlockSchema,
  referencesBlockSchema,
  pipelineSimulationBlockSchema,
  branchFlowSimulationBlockSchema,
  sequentialQuizBlockSchema,
  tabbedContentBlockSchema,
]);

export const lessonTranslationSchema = z.object({
  id: z.string().min(1),
  locale: lessonLocaleSchema,
  version: z.number().int().positive(),
  status: reviewStatusSchema,
  translationStatus: z.enum(['original', 'translated', 'review-needed']),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  moduleId: z.string().min(1),
  week: z.number().int().min(1).max(24).optional(),
  supplementaryTrackId: z.string().min(1).optional(),
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
  if (lesson.status === 'published' && lesson.translationStatus === 'review-needed') {
    ctx.addIssue({ code: 'custom', path: ['translationStatus'], message: 'A lesson with a review-needed translation cannot be published' });
  }

  const hasCoreWeek = lesson.week !== undefined;
  const hasSupplementaryTrack = lesson.supplementaryTrackId !== undefined;
  if (hasCoreWeek === hasSupplementaryTrack) {
    ctx.addIssue({
      code: 'custom',
      path: ['week'],
      message: 'A lesson must belong to exactly one core week or supplementary track',
    });
  }

  const blockIds = lesson.blocks.map((block) => block.id);
  if (new Set(blockIds).size !== blockIds.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['blocks'],
      message: 'Block IDs must be unique within a lesson translation',
    });
  }

  const knowledgeCheckIds = new Set(lesson.blocks.filter((block) => block.type === 'knowledgeCheck').map((block) => block.id));
  const sequentialQuestionIds = new Set<string>();
  lesson.blocks.forEach((block, blockIndex) => {
    if (block.type !== 'sequentialQuiz') return;
    block.questionBlockIds.forEach((questionId, questionIndex) => {
      if (!knowledgeCheckIds.has(questionId)) {
        ctx.addIssue({
          code: 'custom',
          path: ['blocks', blockIndex, 'questionBlockIds', questionIndex],
          message: 'Sequential quiz references must resolve to a knowledgeCheck block in the same lesson',
        });
      }
      if (sequentialQuestionIds.has(questionId)) {
        ctx.addIssue({
          code: 'custom',
          path: ['blocks', blockIndex, 'questionBlockIds', questionIndex],
          message: 'A knowledgeCheck block can belong to only one sequential quiz',
        });
      }
      sequentialQuestionIds.add(questionId);
    });
  });

  const tabbedBlocks = lesson.blocks.filter((block) => block.type === 'tabbedContent');
  if (tabbedBlocks.length > 1) {
    ctx.addIssue({ code: 'custom', path: ['blocks'], message: 'A lesson can have only one tabbed content block' });
  }
  if (tabbedBlocks.length === 1) {
    const tabbedBlock = tabbedBlocks[0];
    if (tabbedBlock?.type === 'tabbedContent') {
      const assignedIds = tabbedBlock.tabs.flatMap((tab) => tab.blockIds);
      const assignedSet = new Set(assignedIds);
      assignedIds.forEach((blockId, blockIndex) => {
        const target = lesson.blocks.find((candidate) => candidate.id === blockId);
        if (!target || target.type === 'tabbedContent' || target.type === 'references') {
          ctx.addIssue({
            code: 'custom',
            path: ['blocks', 'tabbedContent', 'tabs', blockIndex],
            message: 'A source tab must reference an existing renderable lesson block',
          });
        }
        if (sequentialQuestionIds.has(blockId)) {
          ctx.addIssue({
            code: 'custom',
            path: ['blocks', 'tabbedContent', 'tabs', blockIndex],
            message: 'Sequential quiz question blocks must only render inside their quiz',
          });
        }
      });
      const expectedIds = lesson.blocks
        .filter((candidate) =>
          candidate.id !== tabbedBlock.id &&
          candidate.type !== 'references' &&
          !(candidate.type === 'knowledgeCheck' && sequentialQuestionIds.has(candidate.id)),
        )
        .map((candidate) => candidate.id);
      const missingTabIds = expectedIds.filter((blockId) => !assignedSet.has(blockId));
      const unknownTabIds = assignedIds.filter((blockId) => !expectedIds.includes(blockId));
      if (missingTabIds.length > 0 || unknownTabIds.length > 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['blocks', 'tabbedContent', 'tabs'],
          message: 'The seven source tabs must cover every renderable lesson block exactly once',
        });
      }
    }
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