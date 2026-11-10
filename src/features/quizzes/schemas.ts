import { z } from 'zod';

export const quizQuestionSchema = z
  .object({
    id: z.string(),
    type: z.enum(['multiple-choice', 'true-false']),
    prompt: z.string(),
    options: z.array(z.string()).min(2),
    correctIndex: z.number().int().min(0),
    explanation: z.string().optional(),
  })
  .refine((q) => q.correctIndex < q.options.length, {
    message: 'correctIndex must reference a valid option',
  });

export const quizSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  title: z.string(),
  questions: z.array(quizQuestionSchema).min(1),
});

export const quizzesSchema = z.array(quizSchema);

export const quizAttemptSchema = z.object({
  answers: z.record(z.string(), z.number()),
  score: z.number().int().min(0),
  total: z.number().int().min(0),
  completedAt: z.string(),
});

export const quizResultsStateSchema = z.object({
  quizzes: z.record(z.string(), quizAttemptSchema),
});
