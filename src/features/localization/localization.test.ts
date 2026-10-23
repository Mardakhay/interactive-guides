import { describe, expect, it } from 'vitest';
import { useLocaleStore } from './localeStore';
import { formatCategoryCount, formatLessonCount, getLocalizedCategoryCopy, translate, translations } from './translations';

describe('application localization', () => {
  it('keeps English and Russian dictionaries structurally aligned', () => {
    expect(Object.keys(translations.en).sort()).toEqual(Object.keys(translations.ru).sort());
  });

  it('interpolates strings and formats English and Russian counts', () => {
    expect(translate('ru', 'dashboardDescription')).toBe('Ваш прогресс в обучении и рекомендации.');
    expect(translate('en', 'completedProgress', { completed: 2, total: 8 })).toBe('2/8 completed');
    expect(formatLessonCount('en', 1)).toBe('1 lesson');
    expect(formatLessonCount('en', 25)).toBe('25 lessons');
    expect(formatLessonCount('ru', 21)).toBe('21 урок');
    expect(formatLessonCount('ru', 24)).toBe('24 урока');
    expect(formatLessonCount('ru', 25)).toBe('25 уроков');
    expect(formatCategoryCount('ru', 9)).toBe('9 категориях');
  });

  it('localizes known catalogue categories and preserves a fallback for unknown IDs', () => {
    expect(getLocalizedCategoryCopy('ru', 'web-basics', 'Web Basics', 'Fallback').name).toBe('Основы веба');
    expect(getLocalizedCategoryCopy('ru', 'unknown', 'Unknown', 'Fallback').description).toBe('Fallback');
    expect(getLocalizedCategoryCopy('en', 'web-basics', 'Web Basics', 'Fallback').name).toBe('Web Basics');
  });

  it('persists the selected UI locale', () => {
    useLocaleStore.getState().setLocale('ru');
    expect(useLocaleStore.getState().locale).toBe('ru');
    expect(localStorage.getItem('interactive-guides.ui-locale')).toBe('ru');
    useLocaleStore.getState().setLocale('en');
  });
});
