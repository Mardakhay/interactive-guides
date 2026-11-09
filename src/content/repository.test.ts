import { describe, expect, it } from 'vitest';
import { getAdjacentStructuredLessons, getBootcampCurriculum, getCurriculumWeek, getStructuredLesson, getStructuredLessonIds, getWeekForLesson } from './repository';

describe('structured content repository', () => {
  it('returns equivalent lesson IDs in both supported locales', () => {
    expect(getStructuredLesson('html.document-structure', 'en')?.locale).toBe('en');
    expect(getStructuredLesson('html.document-structure', 'ru')?.locale).toBe('ru');
    expect(getStructuredLessonIds().sort()).toEqual(['css.flexbox-grid-responsive', 'css.fundamentals', 'html.document-structure', 'html.forms-accessibility', 'js.basics-types-control-flow', 'js.functions-arrays-objects']);
  });

  it('returns localized curriculum while preserving the canonical week IDs', () => {
    const english = getBootcampCurriculum('en');
    const russian = getBootcampCurriculum('ru');

    expect(english.months).toHaveLength(6);
    expect(russian.months).toHaveLength(6);
    expect(english.months[0]?.weeks[0]?.id).toBe(russian.months[0]?.weeks[0]?.id);
    expect(english.months[0]?.title).not.toBe(russian.months[0]?.title);
  });

  it('links the HTML pilot to its Week 1 curriculum record', () => {
    expect(getWeekForLesson('html.document-structure', 'en')?.id).toBe('month-1-week-1');
    expect(getWeekForLesson('html.forms-accessibility', 'ru')?.id).toBe('month-1-week-2');
    expect(getWeekForLesson('css.fundamentals', 'en')?.id).toBe('month-1-week-3');
    expect(getWeekForLesson('css.flexbox-grid-responsive', 'ru')?.id).toBe('month-1-week-4');
    expect(getWeekForLesson('js.basics-types-control-flow', 'en')?.id).toBe('month-2-week-5');
    expect(getWeekForLesson('js.functions-arrays-objects', 'ru')?.id).toBe('month-2-week-6');
    expect(getStructuredLesson('js.functions-arrays-objects', 'en')?.locale).toBe('en');
    expect(getStructuredLesson('js.functions-arrays-objects', 'ru')?.locale).toBe('ru');
    expect(getStructuredLesson('html.forms-accessibility', 'en')?.title).toContain('Forms');
    expect(getCurriculumWeek('month-1-week-1', 'ru')?.lessonIds).toContain('html.document-structure');
    expect(getCurriculumWeek('month-1-week-2', 'ru')?.lessonIds).toContain('html.forms-accessibility');
  });

  it('returns no lesson for an unknown ID without throwing', () => {
    expect(getStructuredLesson('unknown.lesson', 'en')).toBeUndefined();
  });
});

describe('structured lesson sequence', () => {
  it('returns adjacent available lessons in curriculum order', () => {
    const first = getAdjacentStructuredLessons('html.document-structure', 'en');
    expect(first.previous).toBeUndefined();
    expect(first.next?.id).toBe('html.forms-accessibility');
    const second = getAdjacentStructuredLessons('html.forms-accessibility', 'ru');
    expect(second.previous?.id).toBe('html.document-structure');
    expect(second.next?.id).toBe('css.fundamentals');
    const third = getAdjacentStructuredLessons('css.fundamentals', 'en');
    expect(third.previous?.id).toBe('html.forms-accessibility');
    expect(third.next?.id).toBe('css.flexbox-grid-responsive');
    const fourth = getAdjacentStructuredLessons('css.flexbox-grid-responsive', 'ru');
    expect(fourth.previous?.id).toBe('css.fundamentals');
    expect(fourth.next?.id).toBe('js.basics-types-control-flow');
    const fifth = getAdjacentStructuredLessons('js.basics-types-control-flow', 'en');
    expect(fifth.previous?.id).toBe('css.flexbox-grid-responsive');
    expect(fifth.next?.id).toBe('js.functions-arrays-objects');
    const sixth = getAdjacentStructuredLessons('js.functions-arrays-objects', 'ru');
    expect(sixth.previous?.id).toBe('js.basics-types-control-flow');
    expect(sixth.next).toBeUndefined();
  });

  it('returns no neighbors for an unknown lesson ID', () => {
    expect(getAdjacentStructuredLessons('missing.lesson', 'en')).toEqual({
      previous: undefined,
      next: undefined,
    });
  });
});
