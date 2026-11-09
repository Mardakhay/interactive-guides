import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea accessibility', () => {
  it('exposes invalid state to assistive technology and uses a readable placeholder', () => {
    render(<Textarea invalid placeholder="Write a note" aria-label="Lesson note" />);
    const textarea = screen.getByRole('textbox', { name: 'Lesson note' });
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveClass('placeholder:text-neutral-500');
    expect(textarea).toHaveClass('focus:border-error-500');
    expect(textarea).not.toHaveClass('placeholder:text-neutral-400');
  });
});
