import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { getStructuredLesson } from '@/content/repository';
import { StructuredLessonRenderer } from './StructuredLessonRenderer';

describe('Structured Git Workflow source tabs', () => {
  afterEach(() => cleanup());

  async function getLesson(locale: 'en' | 'ru') {
    const lesson = await getStructuredLesson('git.workflow-ci', locale);
    if (!lesson) throw new Error('Git workflow lesson is missing');
    return lesson;
  }

  it('renders seven source-aligned tabs and the active panel only', async () => {
    const lesson = await getLesson('en');
    render(<StructuredLessonRenderer lesson={lesson} />);

    const tablist = screen.getByRole('tablist', { name: 'Git Workflow topics' });
    expect(tablist).toBeTruthy();
    expect(screen.getAllByRole('tab')).toHaveLength(7);
    for (const tab of screen.getAllByRole('tab')) {
      const panelId = tab.getAttribute('aria-controls');
      expect(panelId).toBeTruthy();
      expect(document.getElementById(panelId ?? '')).toBeTruthy();
    }
    expect(screen.getByRole('tab', { name: 'Why Strategy' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText(/A branch strategy should make collaboration/i)).toBeTruthy();
    expect(screen.queryByRole('img', { name: 'Branch and commit graph' })).toBeNull();

    fireEvent.click(screen.getByRole('tab', { name: 'Git Flow' }));
    expect(screen.getByRole('tab', { name: 'Git Flow' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('img', { name: 'Branch and commit graph' })).toBeTruthy();
    expect(screen.getByText(/A branch strategy should make collaboration/i)).not.toBeVisible();
  });

  it('supports arrow-key, Home and End tab navigation', async () => {
    const lesson = await getLesson('en');
    render(<StructuredLessonRenderer lesson={lesson} />);

    const firstTab = screen.getByRole('tab', { name: 'Why Strategy' });
    firstTab.focus();
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Branches' }).getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Branches' }), { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Git Flow' }).getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Git Flow' }), { key: 'End' });
    expect(screen.getByRole('tab', { name: 'Quiz' }).getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Quiz' }), { key: 'Home' });
    expect(screen.getByRole('tab', { name: 'Why Strategy' }).getAttribute('aria-selected')).toBe('true');
  });

  it('preserves in-progress quiz state when switching to another topic and back', async () => {
    const lesson = await getLesson('en');
    const sequence = lesson.blocks.find((block) => block.id === 'git-workflow-sequential-quiz');
    if (!sequence || sequence.type !== 'sequentialQuiz') throw new Error('Sequential quiz is missing');
    const firstQuestion = lesson.blocks.find((block) => block.id === sequence.questionBlockIds[0]);
    if (!firstQuestion || firstQuestion.type !== 'knowledgeCheck') throw new Error('First quiz question is missing');
    const correct = firstQuestion.options.find((option) => option.correct);
    if (!correct) throw new Error('First quiz answer is missing');

    render(<StructuredLessonRenderer lesson={lesson} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Quiz' }));
    fireEvent.click(screen.getByText(correct.text).closest('button')!);
    fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }));

    const secondQuestion = lesson.blocks.find((block) => block.id === sequence.questionBlockIds[1]);
    if (!secondQuestion || secondQuestion.type !== 'knowledgeCheck') throw new Error('Second quiz question is missing');
    expect(screen.getByText(secondQuestion.prompt)).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: 'Git Flow' }));
    expect(screen.getByRole('img', { name: 'Branch and commit graph' })).toBeTruthy();
    fireEvent.click(screen.getByRole('tab', { name: 'Quiz' }));

    expect(screen.getByText(secondQuestion.prompt)).toBeTruthy();
    expect(screen.getByRole('progressbar', { name: 'Quiz progress' }).getAttribute('aria-valuenow')).toBe('2');
    expect(screen.getByText('Score: 1 / 10')).toBeTruthy();
  });

  it('renders the existing sequential quiz inside the Quiz tab in English and Russian', async () => {
    for (const locale of ['en', 'ru'] as const) {
      const lesson = await getLesson(locale);
      render(<StructuredLessonRenderer lesson={lesson} />);

      const quizTab = screen.getByRole('tab', { name: locale === 'en' ? 'Quiz' : 'Тест' });
      fireEvent.click(quizTab);
      expect(screen.getByRole('tabpanel')).toHaveTextContent(locale === 'en' ? 'Question 1 of 10' : 'Вопрос 1 из 10');
      expect(screen.getByRole('progressbar', { name: locale === 'en' ? 'Quiz progress' : 'Прогресс теста' })).toBeTruthy();
      cleanup();
    }
  });
});
