import { describe, expect, it } from 'vitest';
import {
  getAdjacentStructuredLessons,
  getBootcampCurriculum,
  getCurriculumWeek,
  getStructuredLesson,
  getStructuredLessonIds,
  getWeekForLesson,
  getSupplementaryTrackForLesson,
  getSupplementaryTrackById,
} from './repository';

function getCurriculumLessonIds(locale: 'en' | 'ru') {
  const curriculum = getBootcampCurriculum(locale);
  const coreLessonIds = curriculum.months.flatMap((month) =>
    month.weeks.flatMap((week) => week.lessonIds),
  );
  const supplementaryLessonIds = curriculum.supplementaryTracks.flatMap((track) => track.lessonIds);
  return [...new Set([...coreLessonIds, ...supplementaryLessonIds])].sort();
}

const expectedIds = getCurriculumLessonIds('en');

describe('structured content repository', () => {
  it('registers every bilingual lesson exactly once by stable ID', () => {
    expect(getCurriculumLessonIds('ru')).toEqual(expectedIds);
    expect(getStructuredLessonIds().sort()).toEqual(expectedIds);
    for (const id of expectedIds) {
      expect(getStructuredLesson(id, 'en')?.locale).toBe('en');
      expect(getStructuredLesson(id, 'ru')?.locale).toBe('ru');
    }
  });

  it('preserves all six months and 24 weeks in both locales', () => {
    for (const locale of ['en', 'ru'] as const) {
      const curriculum = getBootcampCurriculum(locale);
      expect(curriculum.months).toHaveLength(6);
      expect(curriculum.months.flatMap((month) => month.weeks)).toHaveLength(24);
    }
    expect(getBootcampCurriculum('en').months[0]?.title).not.toBe(getBootcampCurriculum('ru').months[0]?.title);
  });

  it('maps all structured lessons to their canonical week', () => {
    for (const locale of ['en', 'ru'] as const) {
      const curriculum = getBootcampCurriculum(locale);
      for (const month of curriculum.months) {
        for (const week of month.weeks) {
          for (const lessonId of week.lessonIds) {
            expect(getWeekForLesson(lessonId, locale)?.id).toBe(week.id);
          }
        }
      }
    }
  });

  it('returns localized lesson IDs in the sequence of the syllabus', () => {
    for (const locale of ['en', 'ru'] as const) {
      const expectedSequence = getBootcampCurriculum(locale).months.flatMap((month) =>
        month.weeks.flatMap((week) => week.lessonIds),
      );
      for (let index = 0; index < expectedSequence.length; index += 1) {
        const id = expectedSequence[index]!;
        const result = getAdjacentStructuredLessons(id, locale);
        expect(result.previous?.id).toBe(index > 0 ? expectedSequence[index - 1] : undefined);
        expect(result.next?.id).toBe(
          index < expectedSequence.length - 1 ? expectedSequence[index + 1] : undefined,
        );
      }
    }
  });

  it('returns no structured lesson for an unknown ID', () => {
    expect(getStructuredLesson('unknown.lesson', 'en')).toBeUndefined();
    expect(getAdjacentStructuredLessons('unknown.lesson', 'ru')).toEqual({
      previous: undefined,
      next: undefined,
    });
  });

  it('can retrieve any canonical week by stable ID', () => {
    expect(getCurriculumWeek('month-1-week-1', 'en')?.lessonIds).toContain('web.internet-http');
    expect(getCurriculumWeek('month-1-week-1', 'ru')?.lessonIds).toContain('html.document-structure');
    expect(getCurriculumWeek('month-2-week-7', 'ru')?.lessonIds).toContain('js.dom-events');
    expect(getCurriculumWeek('month-3-week-11', 'en')?.lessonIds).toContain('react.components-jsx-state');
    expect(getCurriculumWeek('month-5-week-17', 'en')?.lessonIds).toContain('ui.design-systems');
    expect(getCurriculumWeek('month-5-week-18', 'ru')?.lessonIds).toContain('performance.accessibility');
    expect(getCurriculumWeek('month-5-week-19', 'en')?.lessonIds).toContain('testing.react-testing-library');
    expect(getCurriculumWeek('month-5-week-20', 'ru')?.lessonIds).toContain('git.workflow-ci');
    expect(getCurriculumWeek('month-6-week-21', 'en')?.lessonIds).toContain('capstone.requirements-discovery');
    expect(getCurriculumWeek('month-6-week-22', 'ru')?.lessonIds).toContain('capstone.design-architecture-planning');
    expect(getCurriculumWeek('month-6-week-23', 'en')?.lessonIds).toContain('capstone.implementation');
    expect(getCurriculumWeek('month-6-week-24', 'ru')?.lessonIds).toContain('capstone.review-demo');
  });

  it('keeps EN/RU block structure aligned for every registered lesson', () => {
    const englishIds = getBootcampCurriculum('en').months.flatMap((month) =>
      month.weeks.flatMap((week) => week.lessonIds),
    );
    const russianIds = getBootcampCurriculum('ru').months.flatMap((month) =>
      month.weeks.flatMap((week) => week.lessonIds),
    );
    expect(russianIds).toEqual(englishIds);

    for (const lessonId of expectedIds) {
      const english = getStructuredLesson(lessonId, 'en');
      const russian = getStructuredLesson(lessonId, 'ru');
      expect(english).toBeDefined();
      expect(russian).toBeDefined();
      expect(english?.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
        russian?.blocks.map(({ id, type }) => ({ id, type })),
      );
      expect(english?.blocks.some((block) => block.type === 'knowledgeCheck')).toBe(true);
      expect(russian?.blocks.some((block) => block.type === 'knowledgeCheck')).toBe(true);
      expect(english?.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
      expect(russian?.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
      expect(english?.blocks.filter((block) => block.type === 'references')).toHaveLength(1);
      expect(russian?.blocks.filter((block) => block.type === 'references')).toHaveLength(1);

      for (const lesson of [english, russian]) {
        const referenceBlocks = lesson?.blocks.filter((block) => block.type === 'references') ?? [];
        for (const referenceBlock of referenceBlocks) {
          if (referenceBlock.type !== 'references') continue;
          for (const reference of referenceBlock.items) {
            expect(reference.url.startsWith('https://')).toBe(true);
          }
        }

        const questions = lesson?.blocks.filter((block) => block.type === 'knowledgeCheck') ?? [];
        for (const question of questions) {
          if (question.type !== 'knowledgeCheck') continue;
          expect(question.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
        }
      }
    }
  });

  
  it('resolves supplemental lessons without adding them to core adjacency', () => {
    expect(getSupplementaryTrackForLesson('network.dns-tcp-tls', 'en')?.id).toBe('supplement-network-browser');
    expect(getSupplementaryTrackForLesson('network.dns-tcp-tls', 'ru')?.lessonIds).toEqual(['network.dns-tcp-tls']);
    expect(getSupplementaryTrackById('supplement-browser-architecture', 'en')?.title).toMatch(/Browser/);
    expect(getWeekForLesson('network.dns-tcp-tls', 'en')).toBeUndefined();
    expect(getAdjacentStructuredLessons('network.dns-tcp-tls', 'en')).toEqual({ previous: undefined, next: undefined });
    expect(getAdjacentStructuredLessons('browser.rendering-pipeline', 'ru')).toEqual({ previous: undefined, next: undefined });
    expect(getSupplementaryTrackForLesson('js.iterators-generators', 'en')?.id).toBe('supplement-js-internals');
    expect(getSupplementaryTrackForLesson('js.iterators-generators', 'ru')?.lessonIds).toContain('js.iterators-generators');
    expect(getAdjacentStructuredLessons('js.iterators-generators', 'en').previous?.id).toBe('js.object-prototypes');
    expect(getWeekForLesson('js.iterators-generators', 'ru')).toBeUndefined();
  });
});