import { z } from 'zod';

export const structuredQuizAttemptSchema = z.object({
  selectedOptionIds: z.array(z.string()),
  isCorrect: z.boolean(),
  submittedAt: z.string(),
});

export const codeDraftSchema = z.object({
  code: z.string(),
  updatedAt: z.string(),
});

export const practiceChecklistSchema = z.object({
  checkedCriteria: z.array(z.number().int().nonnegative()),
  updatedAt: z.string(),
});

export const structuredLearningStateSchema = z.object({
  quizAttempts: z.record(z.string(), z.array(structuredQuizAttemptSchema)),
  codeDrafts: z.record(z.string(), codeDraftSchema),
  practiceChecklists: z.record(z.string(), practiceChecklistSchema),
});

export type QuizAttempt = z.infer<typeof structuredQuizAttemptSchema>;
export type CodeDraft = z.infer<typeof codeDraftSchema>;
export type PracticeChecklist = z.infer<typeof practiceChecklistSchema>;
export type StructuredLearningState = z.infer<typeof structuredLearningStateSchema>;

export const STRUCTURED_LEARNING_STORAGE_KEY = 'interactive-guides:structured-learning:v1';

export const EMPTY_STRUCTURED_LEARNING_STATE: StructuredLearningState = {
  quizAttempts: {},
  codeDrafts: {},
  practiceChecklists: {},
};
