import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { QuizRenderer } from './QuizRenderer';
import type { Quiz } from '../types';

const quiz: Quiz = { id: 'quiz-1', lessonId: 'sh-001', title: 'Quick check', questions: [{ id: 'question-1', type: 'multiple-choice', prompt: 'Choose the correct answer', options: ['Incorrect', 'Correct'], correctIndex: 1 }] };

describe('QuizRenderer', () => {
  it('persists an answered quiz and displays its result', async () => {
    const user = userEvent.setup();
    render(<QuizRenderer quiz={quiz} />);
    await user.click(screen.getByLabelText('Correct'));
    await user.click(screen.getByRole('button', { name: 'Submit Quiz' }));
    expect(await screen.findByText('1 / 1 correct · 100%')).toBeInTheDocument();
  });
});
