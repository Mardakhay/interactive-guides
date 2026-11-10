import { describe, expect, it } from 'vitest';
import englishCurriculum from '../curriculum/bootcamp-core.en.json';
import russianCurriculum from '../curriculum/bootcamp-core.ru.json';
import { bootcampCurriculumSchema } from './curriculum';

describe('bootcamp curriculum', () => {
  it('matches the supplied six-month and 24-week framework', () => {
    const parsed = bootcampCurriculumSchema.safeParse(englishCurriculum);
    expect(parsed.success).toBe(true);
    expect(englishCurriculum.months).toHaveLength(6);
    expect(englishCurriculum.months.flatMap((month) => month.weeks)).toHaveLength(24);
    expect(bootcampCurriculumSchema.safeParse(russianCurriculum).success).toBe(true);
  });

  it('keeps weeks in a continuous, ordered sequence from 1 to 24', () => {
    const weekNumbers = englishCurriculum.months.flatMap((month) =>
      month.weeks.map((week) => week.number),
    );
    expect(weekNumbers).toEqual(Array.from({ length: 24 }, (_, index) => index + 1));
  });

  it('maps the HTML document-structure pilot to Week 1', () => {
    expect(englishCurriculum.months[0]?.weeks[0]?.id).toBe('month-1-week-1');
    expect(englishCurriculum.months[0]?.weeks[0]?.lessonIds).toContain('html.document-structure');
  });

  it('keeps extra topics outside the source bootcamp weeks', () => {
    expect(englishCurriculum.supplementaryTracks.map((track) => track.id)).toContain('supplement-auth');
    expect(englishCurriculum.supplementaryTracks.map((track) => track.id)).toContain('supplement-data');
    expect(englishCurriculum.months.flatMap((month) => month.weeks)).toHaveLength(24);
  });

  it('rejects a curriculum with a gap in the week numbering', () => {
    const invalidCurriculum = JSON.parse(JSON.stringify(englishCurriculum)) as typeof englishCurriculum;
    invalidCurriculum.months[1]!.weeks[0]!.number = 99;

    expect(bootcampCurriculumSchema.safeParse(invalidCurriculum).success).toBe(false);
  });
});


describe('localized curriculum parity', () => {
  it('keeps month, week and lesson identities stable in English and Russian', () => {
    expect(englishCurriculum.months.map(({ id, number }) => ({ id, number }))).toEqual(
      russianCurriculum.months.map(({ id, number }) => ({ id, number })),
    );
    expect(
      englishCurriculum.months.flatMap((month) => month.weeks.map(({ id, number, lessonIds }) => ({ id, number, lessonIds }))),
    ).toEqual(
      russianCurriculum.months.flatMap((month) => month.weeks.map(({ id, number, lessonIds }) => ({ id, number, lessonIds }))),
    );
  });
});

describe('supplementary track schema', () => {
  it('supports lesson ownership while keeping the original 24 core weeks', () => {
    const parsed = bootcampCurriculumSchema.parse(englishCurriculum);
    expect(parsed.supplementaryTracks.find((track) => track.id === 'supplement-network-browser')?.lessonIds).toEqual(['network.dns-tcp-tls']);
    expect(parsed.supplementaryTracks.find((track) => track.id === 'supplement-browser-architecture')?.lessonIds).toEqual(['browser.rendering-pipeline']);
    expect(parsed.months.flatMap((month) => month.weeks)).toHaveLength(24);
  });

  it('rejects the same supplementary lesson assigned to multiple tracks', () => {
    const parsed = bootcampCurriculumSchema.parse(englishCurriculum);
    const invalid = structuredClone(parsed);
    const populatedTrack = invalid.supplementaryTracks.find((track) => track.lessonIds.length > 0);
    expect(populatedTrack).toBeDefined();
    invalid.supplementaryTracks.push({ ...populatedTrack!, id: 'duplicate-track' });
    expect(bootcampCurriculumSchema.safeParse(invalid).success).toBe(false);
  });
});
