import { describe, expect, it } from 'vitest';
import {
  getAdjacentStructuredLessons,
  getBootcampCurriculum,
  getCurriculumWeek,
  getStructuredLesson,
  getStructuredLessonIds,
  getWeekForLesson,
} from './repository';

const expectedIds = [
  'html.document-structure',
  'html.forms-accessibility',
  'css.fundamentals',
  'css.flexbox-grid-responsive',
  'js.basics-types-control-flow',
  'js.functions-arrays-objects',
  'js.dom-events',
  'js.async-fetch',
  'git.fundamentals',
  'tooling.node-npm-vite',
  'typescript.fundamentals',
  'react.components-jsx-state',
  'react.effects-lists-composition',
  'react.router-spa',
  'react.forms-validation',
  'react.context-shared-state',
  'react.api-custom-hooks'
].sort();

describe('structured content repository', () => {
  it('registers every bilingual lesson exactly once by stable ID', () => {
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
    const expectedWeeks: Record<string, string> = {
      'html.document-structure': 'month-1-week-1',
      'html.forms-accessibility': 'month-1-week-2',
      'css.fundamentals': 'month-1-week-3',
      'css.flexbox-grid-responsive': 'month-1-week-4',
      'js.basics-types-control-flow': 'month-2-week-5',
      'js.functions-arrays-objects': 'month-2-week-6',
      'js.dom-events': 'month-2-week-7',
      'js.async-fetch': 'month-2-week-8',
      'git.fundamentals': 'month-2-week-8',
      'tooling.node-npm-vite': 'month-3-week-9',
      'typescript.fundamentals': 'month-3-week-10',
      'react.components-jsx-state': 'month-3-week-11',
      'react.effects-lists-composition': 'month-3-week-12',
      'react.router-spa': 'month-4-week-13',
      'react.forms-validation': 'month-4-week-14',
      'react.context-shared-state': 'month-4-week-15',
      'react.api-custom-hooks': 'month-4-week-16',
    };
    for (const [id, weekId] of Object.entries(expectedWeeks)) {
      expect(getWeekForLesson(id, 'en')?.id).toBe(weekId);
      expect(getWeekForLesson(id, 'ru')?.id).toBe(weekId);
    }
  });

  it('returns localized lesson IDs in the sequence of the syllabus', () => {
    const expectedSequence = [
      'html.document-structure',
      'html.forms-accessibility',
      'css.fundamentals',
      'css.flexbox-grid-responsive',
      'js.basics-types-control-flow',
      'js.functions-arrays-objects',
      'js.dom-events',
      'js.async-fetch',
      'git.fundamentals',
      'tooling.node-npm-vite',
      'typescript.fundamentals',
      'react.components-jsx-state',
      'react.effects-lists-composition',
      'react.router-spa',
      'react.forms-validation',
      'react.context-shared-state',
      'react.api-custom-hooks',
    ];
    for (let index = 0; index < expectedSequence.length; index += 1) {
      const id = expectedSequence[index]!;
      const result = getAdjacentStructuredLessons(id, 'en');
      expect(result.previous?.id).toBe(index > 0 ? expectedSequence[index - 1] : undefined);
      expect(result.next?.id).toBe(index < expectedSequence.length - 1 ? expectedSequence[index + 1] : undefined);
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
    expect(getCurriculumWeek('month-2-week-7', 'ru')?.lessonIds).toContain('js.dom-events');
    expect(getCurriculumWeek('month-3-week-11', 'en')?.lessonIds).toContain('react.components-jsx-state');
  });
});
