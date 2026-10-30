import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input accessibility', () => {
  it('exposes invalid state to assistive technology and keeps a readable placeholder', () => {
    render(<Input invalid placeholder="Email address" aria-label="Email address" />);
    const input = screen.getByRole('textbox', { name: 'Email address' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('placeholder:text-neutral-500');
    expect(input).toHaveClass('focus:border-error-500');
    expect(input).not.toHaveClass('placeholder:text-neutral-400');
  });
});
