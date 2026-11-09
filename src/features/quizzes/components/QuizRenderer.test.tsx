import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { STORAGE_KEYS } from '@/lib/constants';
import { useQuizResultsStore } from '../store';
import { QuizRenderer } from './QuizRenderer';
import type { Quiz } from '../types';

const quiz: Quiz = {
  id: 'quiz-1',
  lessonId: 'sh-001',
  title: 'Quick check',
  questions: [{
    id: 'question-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct answer',
    options: ['Incorrect', 'Correct'],
    correctIndex: 1,
  }],
};

function resetQuizResult() {
  localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULTS);
  useQuizResultsStore.setState({ quizzes: {} });
}

beforeEach(resetQuizResult);

afterEach(() => {
  cleanup();
  resetQuizResult();
});

describe('QuizRenderer', () => {
  it('persists an answered quiz and moves focus to its announced result', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <QuizRenderer quiz={quiz} />
      </MemoryRouter>,
    );

    await user.click(screen.getByLabelText('Correct'));
    await user.click(screen.getByRole('button', { name: 'Submit quiz' }));

    const result = await screen.findByRole('status');
    expect(result).toHaveTextContent('1 / 1 correct · 100%');
    expect(result).toHaveFocus();
    expect(useQuizResultsStore.getState().quizzes['quiz-1']?.score).toBe(1);
  });
});
