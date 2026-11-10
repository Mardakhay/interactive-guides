import { describe, expect, it } from 'vitest';
import curriculum from '../curriculum/bootcamp-core.en.json';
import { bootcampCurriculumSchema } from './curriculum';

describe('bootcamp curriculum', () => {
  it('matches the supplied six-month and 24-week framework', () => {
    const parsed = bootcampCurriculumSchema.safeParse(curriculum);
    expect(parsed.success).toBe(true);
    expect(curriculum.months).toHaveLength(6);
    expect(curriculum.months.flatMap((month) => month.weeks)).toHaveLength(24);
  });

  it('keeps weeks in a continuous, ordered sequence from 1 to 24', () => {
    const weekNumbers = curriculum.months.flatMap((month) =>
      month.weeks.map((week) => week.number),
    );
    expect(weekNumbers).toEqual(Array.from({ length: 24 }, (_, index) => index + 1));
  });

  it('maps the HTML document-structure pilot to Week 1', () => {
    expect(curriculum.months[0]?.weeks[0]?.id).toBe('month-1-week-1');
    expect(curriculum.months[0]?.weeks[0]?.lessonIds).toContain('html.document-structure');
  });

  it('keeps extra topics outside the source bootcamp weeks', () => {
    expect(curriculum.supplementaryTracks.map((track) => track.id)).toContain('supplement-auth');
    expect(curriculum.supplementaryTracks.map((track) => track.id)).toContain('supplement-data');
    expect(curriculum.months.flatMap((month) => month.weeks)).toHaveLength(24);
  });

  it('rejects a curriculum with a gap in the week numbering', () => {
    const invalidCurriculum = structuredClone(curriculum);
    invalidCurriculum.months[1]!.weeks[0]!.number = 99;

    expect(bootcampCurriculumSchema.safeParse(invalidCurriculum).success).toBe(false);
  });
});
