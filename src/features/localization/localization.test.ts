import { describe, expect, it } from 'vitest';
import { useLocaleStore } from './localeStore';
import { formatCategoryCount, formatLessonCount, formatNoteCount, formatResultCount, getLocalizedCategoryCopy, getLocalizedDifficulty, getLocalizedLearningPathCopy, translate, translations } from './translations';

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
    expect(formatNoteCount('ru', 1)).toBe('1 заметка');
    expect(formatNoteCount('ru', 3)).toBe('3 заметки');
    expect(formatNoteCount('ru', 5)).toBe('5 заметок');
    expect(formatNoteCount('en', 2)).toBe('2 notes');
    expect(getLocalizedDifficulty('ru', 'advanced')).toBe('Продвинутый');
    expect(translate('ru', 'markComplete')).toBe('Отметить завершённым');
    expect(translate('en', 'dashboardClassicCatalogProgress', { completed: 3, total: 25 })).toBe('Classic catalog progress — 3 of 25 lessons');
    expect(translate('ru', 'dashboardClassicCatalogProgress', { completed: 3, total: 25 })).toBe('Прогресс классического каталога — 3 из 25 уроков');
    expect(translate('ru', 'lessonNotesAria')).toBe('Заметки к уроку');
    expect(translate('ru', 'quizScore', { score: 4, total: 5, percent: 80 })).toBe('Правильных ответов: 4 из 5 · 80%');
    expect(formatResultCount('en', 2)).toBe('2 results');
    expect(formatResultCount('ru', 1)).toBe('1 результат');
    expect(formatResultCount('ru', 3)).toBe('3 результата');
    expect(formatResultCount('ru', 5)).toBe('5 результатов');
  });

  it('localizes known catalogue categories and preserves a fallback for unknown IDs', () => {
    expect(getLocalizedCategoryCopy('ru', 'web-basics', 'Web Basics', 'Fallback').name).toBe('Основы веба');
    expect(getLocalizedCategoryCopy('ru', 'unknown', 'Unknown', 'Fallback').description).toBe('Fallback');
    expect(getLocalizedCategoryCopy('en', 'web-basics', 'Web Basics', 'Fallback').name).toBe('Web Basics');
  });

  it('localizes known learning paths and has a safe fallback', () => {
    expect(getLocalizedLearningPathCopy('ru', 'javascript-mastery', 'Fallback', 'Fallback description').title)
      .toBe('Мастерство JavaScript');
    expect(getLocalizedLearningPathCopy('ru', 'unknown', 'Fallback', 'Fallback description').title)
      .toBe('Fallback');
    expect(getLocalizedLearningPathCopy('ru', 'structured-frontend-foundations', 'Fallback', 'Fallback description').title)
      .toBe('Структурированные основы frontend');
    expect(getLocalizedLearningPathCopy('ru', 'structured-react-developer', 'Fallback', 'Fallback description').title)
      .toBe('Структурированный путь React-разработчика');
  });

  it('persists the selected UI locale', () => {
    useLocaleStore.getState().setLocale('ru');
    expect(useLocaleStore.getState().locale).toBe('ru');
    expect(localStorage.getItem('interactive-guides.ui-locale')).toBe('ru');
    useLocaleStore.getState().setLocale('en');
  });
});
