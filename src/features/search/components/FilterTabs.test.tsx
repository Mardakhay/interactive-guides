import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FilterTabs } from './FilterTabs';

afterEach(cleanup);

describe('search type filters', () => {
  it('exposes mutually exclusive pressed buttons instead of incomplete tab semantics', () => {
    const onChange = vi.fn();
    render(
      <FilterTabs
        filter="all"
        counts={{ lesson: 4, course: 2, note: 1 }}
        onChange={onChange}
        locale="en"
      />,
    );

    const group = screen.getByRole('group', { name: 'Filter results by type' });
    const all = screen.getByRole('button', { name: 'All' });
    const lessons = screen.getByRole('button', { name: /Lessons 4/ });
    expect(group).toContainElement(all);
    expect(all).toHaveAttribute('aria-pressed', 'true');
    expect(lessons).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(lessons);
    expect(onChange).toHaveBeenCalledWith('lesson');
  });
});
