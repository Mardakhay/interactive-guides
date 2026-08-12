import { z } from 'zod';

export const noteEntrySchema = z.object({
  content: z.string(),
  updatedAt: z.string(),
});

export const notesStateSchema = z.object({
  lessons: z.record(z.string(), noteEntrySchema),
});
