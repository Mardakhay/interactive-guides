import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea accessibility', () => {
  it('uses a readable placeholder token and retains a visible focus treatment', () => {
    render(<Textarea placeholder="Write a note" aria-label="Lesson note" />);
    const textarea = screen.getByRole('textbox', { name: 'Lesson note' });
    expect(textarea).toHaveClass('placeholder:text-neutral-500');
    expect(textarea).toHaveClass('focus:border-primary-500');
    expect(textarea).not.toHaveClass('placeholder:text-neutral-400');
  });
});
