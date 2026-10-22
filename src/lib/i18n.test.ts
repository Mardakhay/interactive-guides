import { afterEach, describe, expect, it } from 'vitest';
import { formatCatalogDescription, formatLessonCount, formatOverallProgress, getCategoryCopy, getCategoryCopyByName, getDifficultyLabel, getLearningPathCopy, getLearningPathStepNote, getLocaleFromPathname, getOtherLocale, isAppLocale, LOCALE_STORAGE_KEY, UI_COPY } from './i18n';

describe('application localization utilities', () => {
  afterEach(() => window.localStorage.clear());

  it('recognizes only supported interface locales', () => {
    expect(isAppLocale('en')).toBe(true);
    expect(isAppLocale('ru')).toBe(true);
    expect(isAppLocale('az')).toBe(false);
    expect(isAppLocale(null)).toBe(false);
  });

  it('reads a supported locale from the start of a route', () => {
    expect(getLocaleFromPathname('/en/structured-lessons/js.async-fetch')).toBe('en');
    expect(getLocaleFromPathname('/ru/settings/data')).toBe('ru');
    expect(getLocaleFromPathname('/courses')).toBeUndefined();
    expect(getLocaleFromPathname('/russian/courses')).toBeUndefined();
  });

  it('localizes lesson counts and catalog/progress text', () => {
    expect(formatLessonCount('en', 1)).toBe('1 lesson');
    expect(formatLessonCount('en', 3)).toBe('3 lessons');
    expect(formatLessonCount('ru', 1)).toBe('1 урок');
    expect(formatLessonCount('ru', 3)).toBe('3 урока');
    expect(formatLessonCount('ru', 11)).toBe('11 уроков');
    expect(formatOverallProgress('ru', 2, 8)).toBe('Общий прогресс — 2 из 8 уроков');
    expect(formatCatalogDescription('en', 100, 9)).toContain('100 interactive lessons');
    expect(getDifficultyLabel('ru', 'beginner')).toBe('Начальный');
  });

  it('localizes learning path names and step notes', () => {
    expect(getLearningPathCopy('ru', 'frontend-foundations')?.title).toBe('Основы frontend-разработки');
    expect(getLearningPathCopy('en', 'frontend-foundations')?.title).toBe('Frontend Foundations');
    expect(getLearningPathCopy('ru', 'missing-path')).toBeUndefined();
    expect(getLearningPathStepNote('ru', 'frontend-foundations', 'wb-001')).toBe('Разберись, как работают интернет и браузеры.');
    expect(getLearningPathStepNote('ru', 'missing-path', 'wb-001', 'Fallback')).toBe('Fallback');
  });

  it('provides translations for known categories and switch labels', () => {
    expect(getCategoryCopy('ru', 'javascript')?.name).toBe('JavaScript');
    expect(getCategoryCopy('ru', 'web-basics')?.name).toBe('Основы веба');
    expect(getCategoryCopy('ru', 'missing-category')).toBeUndefined();
    expect(getCategoryCopyByName('ru', 'Web Basics')?.name).toBe('Основы веба');
    expect(UI_COPY.en.language.shortLabel).toBe('RU');
    expect(UI_COPY.ru.language.shortLabel).toBe('EN');
    expect(getOtherLocale('en')).toBe('ru');
    expect(getOtherLocale('ru')).toBe('en');
    expect(LOCALE_STORAGE_KEY).toBe('ig:locale');
  });
});
