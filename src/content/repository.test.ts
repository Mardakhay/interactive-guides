import { describe, expect, it } from 'vitest';
import { getAdjacentStructuredLessons, getBootcampCurriculum, getCurriculumWeek, getStructuredLesson, getStructuredLessonIds, getWeekForLesson } from './repository';

describe('structured content repository', () => {
  it('returns equivalent lesson IDs in both supported locales', () => {
    expect(getStructuredLesson('html.document-structure', 'en')?.locale).toBe('en');
    expect(getStructuredLesson('html.document-structure', 'ru')?.locale).toBe('ru');
    expect(getStructuredLessonIds().sort()).toEqual(['html.document-structure', 'html.forms-accessibility']);
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
    expect(second.next).toBeUndefined();
  });

  it('returns no neighbors for an unknown lesson ID', () => {
    expect(getAdjacentStructuredLessons('missing.lesson', 'en')).toEqual({
      previous: undefined,
      next: undefined,
    });
  });
});
