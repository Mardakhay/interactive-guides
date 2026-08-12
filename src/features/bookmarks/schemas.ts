import { z } from 'zod';

export const bookmarkEntrySchema = z.object({
  createdAt: z.string(),
});

export const bookmarksStateSchema = z.object({
  lessons: z.record(z.string(), bookmarkEntrySchema),
});
