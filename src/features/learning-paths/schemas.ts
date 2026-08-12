import { z } from 'zod';

export const learningPathLevelSchema = z.enum(['beginner', 'intermediate', 'advanced']);

export const learningPathStepSchema = z.object({
  lessonId: z.string().min(1),
  note: z.string().optional(),
});

export const learningPathSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  level: learningPathLevelSchema,
  icon: z.string().min(1),
  estimatedHours: z.number().int().positive(),
  steps: z.array(learningPathStepSchema).min(1),
});

export const learningPathsSchema = z.array(learningPathSchema);
