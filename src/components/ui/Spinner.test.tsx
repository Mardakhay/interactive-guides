import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('exposes its supplied localized label to assistive technology', () => {
    render(<Spinner label="Загрузка" />);
    expect(screen.getByRole('status', { name: 'Загрузка' })).toBeInTheDocument();
    expect(screen.getByText('Загрузка')).toHaveClass('sr-only');
  });
});
