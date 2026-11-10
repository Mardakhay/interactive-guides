import { z } from 'zod';

const curriculumWeekSchema = z.object({
  id: z.string().min(1),
  number: z.number().int().min(1).max(24),
  title: z.string().min(1),
  topics: z.array(z.string().min(1)).min(1),
  practice: z.array(z.string().min(1)).min(1),
  project: z.string().min(1).optional(),
  lessonIds: z.array(z.string().min(1)),
});

const curriculumMonthSchema = z.object({
  id: z.string().min(1),
  number: z.number().int().min(1).max(6),
  title: z.string().min(1),
  goal: z.string().min(1),
  weeks: z.array(curriculumWeekSchema).length(4),
});

const supplementaryTrackSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  topics: z.array(z.string().min(1)).min(1),
  note: z.string().min(1),
  lessonIds: z.array(z.string().min(1)).default([]),
});

export const bootcampCurriculumSchema = z.object({
  id: z.string().min(1),
  version: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  targetLevel: z.string().min(1),
  durationMonths: z.literal(6),
  totalWeeks: z.literal(24),
  weeklyHours: z.object({
    minimum: z.number().positive(),
    maximum: z.number().positive(),
  }).refine((range) => range.minimum <= range.maximum, {
    message: 'minimum weekly hours must not exceed maximum weekly hours',
  }),
  stack: z.array(z.string().min(1)).min(1),
  evaluation: z.array(z.string().min(1)).min(1),
  months: z.array(curriculumMonthSchema).length(6),
  supplementaryTracks: z.array(supplementaryTrackSchema).min(1),
}).superRefine((curriculum, ctx) => {
  const supplementaryTrackIds = curriculum.supplementaryTracks.map((track) => track.id);
  if (new Set(supplementaryTrackIds).size !== supplementaryTrackIds.length) {
    ctx.addIssue({ code: 'custom', path: ['supplementaryTracks'], message: 'Supplementary track IDs must be unique' });
  }
  const supplementaryLessonIds = curriculum.supplementaryTracks.flatMap((track) => track.lessonIds);
  if (new Set(supplementaryLessonIds).size !== supplementaryLessonIds.length) {
    ctx.addIssue({ code: 'custom', path: ['supplementaryTracks'], message: 'A lesson ID may belong to only one supplementary track' });
  }
  const coreLessonIds = curriculum.months.flatMap((month) => month.weeks).flatMap((week) => week.lessonIds);
  if (supplementaryLessonIds.some((id) => coreLessonIds.includes(id))) {
    ctx.addIssue({ code: 'custom', path: ['supplementaryTracks'], message: 'Supplementary lesson IDs must not be duplicated in the core curriculum' });
  }

  const monthIds = curriculum.months.map((month) => month.id);
  if (new Set(monthIds).size !== monthIds.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['months'],
      message: 'Month IDs must be unique',
    });
  }

  const allWeeks = curriculum.months.flatMap((month) => month.weeks);
  const weekIds = allWeeks.map((week) => week.id);
  const weekNumbers = allWeeks.map((week) => week.number);

  if (new Set(weekIds).size !== weekIds.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['months'],
      message: 'Week IDs must be unique across the curriculum',
    });
  }
  if (new Set(weekNumbers).size !== weekNumbers.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['months'],
      message: 'Week numbers must be unique across the curriculum',
    });
  }

  curriculum.months.forEach((month, monthIndex) => {
    if (month.number !== monthIndex + 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['months', monthIndex, 'number'],
        message: 'Month numbers must be in ascending order starting at 1',
      });
    }

    month.weeks.forEach((week, weekIndex) => {
      const expectedWeekNumber = monthIndex * 4 + weekIndex + 1;
      if (week.number !== expectedWeekNumber) {
        ctx.addIssue({
          code: 'custom',
          path: ['months', monthIndex, 'weeks', weekIndex, 'number'],
          message: 'Weeks must be ordered continuously from 1 to 24 across the six months',
        });
      }
    });
  });
});

export type BootcampCurriculum = z.infer<typeof bootcampCurriculumSchema>;