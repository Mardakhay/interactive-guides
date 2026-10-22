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
  'web.internet-http',
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
  'ui.design-systems',
  'performance.accessibility',
  'testing.react-testing-library',
  'git.workflow-ci',
  'capstone.requirements-discovery',
  'capstone.design-architecture-planning',
  'capstone.implementation',
  'capstone.review-demo',
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
      'web.internet-http': 'month-1-week-1',
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
      'ui.design-systems': 'month-5-week-17',
      'performance.accessibility': 'month-5-week-18',
      'testing.react-testing-library': 'month-5-week-19',
      'git.workflow-ci': 'month-5-week-20',
      'capstone.requirements-discovery': 'month-6-week-21',
      'capstone.design-architecture-planning': 'month-6-week-22',
      'capstone.implementation': 'month-6-week-23',
      'capstone.review-demo': 'month-6-week-24',
    };
    for (const [id, weekId] of Object.entries(expectedWeeks)) {
      expect(getWeekForLesson(id, 'en')?.id).toBe(weekId);
      expect(getWeekForLesson(id, 'ru')?.id).toBe(weekId);
    }
  });

  it('returns localized lesson IDs in the sequence of the syllabus', () => {
    const expectedSequence = [
      'web.internet-http',
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
      'ui.design-systems',
      'performance.accessibility',
      'testing.react-testing-library',
      'git.workflow-ci',
      'capstone.requirements-discovery',
      'capstone.design-architecture-planning',
      'capstone.implementation',
      'capstone.review-demo',
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
    }
  });

});
