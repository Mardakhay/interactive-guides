import { z } from 'zod';

export const lessonDifficultySchema = z.enum(['beginner', 'intermediate', 'advanced']);

export const categorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const lessonSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  difficulty: lessonDifficultySchema,
  tags: z.array(z.string()),
  durationMinutes: z.number().int().positive(),
  content: z.string(),
  order: z.number().int().nonnegative(),
});

export const categoriesSchema = z.array(categorySchema);
export const lessonsSchema = z.array(lessonSchema);
