import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { getStructuredLesson } from '@/content/repository';
import { SequentialKnowledgeQuiz } from './StructuredLessonRenderer';
import type { LessonContentBlock } from '@/content/schemas/lessonContent';

type KnowledgeCheckBlock = Extract<LessonContentBlock, { type: 'knowledgeCheck' }>;

describe('SequentialKnowledgeQuiz', () => {
  afterEach(() => cleanup());

  async function getQuiz(locale: 'en' | 'ru') {
    const lesson = await getStructuredLesson('git.workflow-ci', locale);
    if (!lesson) throw new Error('Git workflow lesson is missing');
    const block = lesson.blocks.find((entry) => entry.id === 'git-workflow-sequential-quiz');
    if (!block || block.type !== 'sequentialQuiz') throw new Error('Sequential quiz is missing');
    const questions = block.questionBlockIds
      .map((id) => lesson.blocks.find((entry) => entry.id === id))
      .filter((entry): entry is KnowledgeCheckBlock => entry?.type === 'knowledgeCheck');
    if (questions.length !== block.questionBlockIds.length) throw new Error('A quiz question reference is unresolved');
    return { lesson, block, questions };
  }

  function chooseCorrect(question: KnowledgeCheckBlock) {
    const correct = question.options.find((option) => option.correct);
    if (!correct) throw new Error('Question has no correct answer');
    const optionButton = screen.getByText(correct.text).closest('button');
    if (!optionButton) throw new Error('Correct option button not found');
    fireEvent.click(optionButton);
  }

  it('presents the ten existing questions one at a time and advances only after feedback', async () => {
    const { lesson, block, questions } = await getQuiz('en');
    render(<SequentialKnowledgeQuiz block={block} questions={questions} locale="en" lessonId={lesson.id} />);

    expect(questions).toHaveLength(10);
    expect(screen.getByRole('progressbar', { name: 'Quiz progress' }).getAttribute('aria-valuenow')).toBe('0');
    expect(screen.getByText(questions[0].prompt)).toBeTruthy();

    chooseCorrect(questions[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
    expect(screen.getByRole('status', { name: 'Knowledge check feedback' })).toHaveTextContent('Correct');
    expect(screen.getByRole('progressbar', { name: 'Quiz progress' }).getAttribute('aria-valuenow')).toBe('1');
    expect(screen.queryByText(questions[1].prompt)).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Next question' }));
    expect(screen.getByText(questions[1].prompt)).toBeTruthy();
  });

  it('supports previous/next navigation and restores a submitted answer without recording it twice', async () => {
    const { lesson, block, questions } = await getQuiz('en');
    render(<SequentialKnowledgeQuiz block={block} questions={questions} locale="en" lessonId={lesson.id} />);

    chooseCorrect(questions[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }));

    chooseCorrect(questions[1]);
    fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
    expect(screen.getByText('Score: 2 / 10')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }));

    fireEvent.click(screen.getByRole('button', { name: 'Previous question' }));
    expect(screen.getByText(questions[1].prompt)).toBeTruthy();
    const restoredCorrect = screen.getByText(questions[1].options.find((option) => option.correct)?.text ?? '').closest('button');
    expect(restoredCorrect?.getAttribute('aria-pressed')).toBe('true');
    expect(restoredCorrect?.hasAttribute('disabled')).toBe(true);
    expect(screen.getByRole('status', { name: 'Knowledge check feedback' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Previous question' }));
    expect(screen.getByText(questions[0].prompt)).toBeTruthy();
    expect(screen.getByText('Score: 2 / 10')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }));
    expect(screen.getByText(questions[1].prompt)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }));
    expect(screen.getByText(questions[2].prompt)).toBeTruthy();
  });

  it('shows the final score and restarts the same sequence while retaining existing attempts', async () => {
    const { lesson, block, questions } = await getQuiz('en');
    render(<SequentialKnowledgeQuiz block={block} questions={questions} locale="en" lessonId={lesson.id} />);

    for (let index = 0; index < questions.length; index += 1) {
      chooseCorrect(questions[index]);
      fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
      if (index < questions.length - 1) {
        fireEvent.click(screen.getByRole('button', { name: 'Next question' }));
      } else {
        fireEvent.click(screen.getByRole('button', { name: 'Finish quiz' }));
      }
    }

    expect(screen.getByRole('status')).toHaveTextContent('10 / 10 (100%)');
    expect(screen.getByRole('button', { name: 'Restart quiz' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Restart quiz' }));
    expect(screen.getByText(questions[0].prompt)).toBeTruthy();
    expect(screen.getByRole('progressbar', { name: 'Quiz progress' }).getAttribute('aria-valuenow')).toBe('0');
  });

  it('localizes progress, navigation and feedback in Russian', async () => {
    const { lesson, block, questions } = await getQuiz('ru');
    render(<SequentialKnowledgeQuiz block={block} questions={questions} locale="ru" lessonId={lesson.id} />);

    expect(screen.getByRole('progressbar', { name: 'Прогресс теста' })).toBeTruthy();
    chooseCorrect(questions[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Проверить ответ' }));
    fireEvent.click(screen.getByRole('button', { name: 'Следующий вопрос' }));
    expect(screen.getByText(questions[1].prompt)).toBeTruthy();
  });
});
