import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input accessibility', () => {
  it('uses a readable placeholder token and keeps a visible focus treatment', () => {
    render(<Input placeholder="Email address" aria-label="Email address" />);
    const input = screen.getByRole('textbox', { name: 'Email address' });
    expect(input).toHaveClass('placeholder:text-neutral-500');
    expect(input).toHaveClass('focus:border-primary-500');
    expect(input).not.toHaveClass('placeholder:text-neutral-400');
  });
});
