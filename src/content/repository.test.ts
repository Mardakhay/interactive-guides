import { describe, expect, it } from 'vitest';
import { getBootcampCurriculum, getCurriculumWeek, getStructuredLesson, getStructuredLessonIds, getWeekForLesson } from './repository';

describe('structured content repository', () => {
  it('returns equivalent lesson IDs in both supported locales', () => {
    expect(getStructuredLesson('html.document-structure', 'en')?.locale).toBe('en');
    expect(getStructuredLesson('html.document-structure', 'ru')?.locale).toBe('ru');
    expect(getStructuredLessonIds()).toEqual(['html.document-structure']);
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
    expect(getCurriculumWeek('month-1-week-1', 'ru')?.lessonIds).toContain('html.document-structure');
  });

  it('returns no lesson for an unknown ID without throwing', () => {
    expect(getStructuredLesson('unknown.lesson', 'en')).toBeUndefined();
  });
});
