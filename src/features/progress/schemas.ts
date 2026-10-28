import { z } from 'zod';

export const lessonStatusSchema = z.enum(['not-started', 'in-progress', 'completed']);

export const lessonProgressEntrySchema = z.object({
  status: lessonStatusSchema,
  startedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
});

export const progressStateSchema = z.object({
  lessons: z.record(z.string(), lessonProgressEntrySchema),
  lastOpenedLessonId: z.string().nullable(),
  lastOpenedAt: z.string().nullable(),
});
