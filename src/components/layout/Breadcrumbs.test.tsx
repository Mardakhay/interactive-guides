import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { useLocaleStore } from '@/features/localization/localeStore';

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
});

describe('Breadcrumbs locale-aware links', () => {
  it('localizes raw paths and replaces a stale locale prefix', () => {
    render(
      <MemoryRouter initialEntries={['/ru/lessons/example.lesson']}>
        <Breadcrumbs items={[
          { label: 'Courses', path: '/courses' },
          { label: 'Old locale path', path: '/en/paths/frontend' },
          { label: 'Current lesson' },
        ]} />
      </MemoryRouter>,
    );

    const nav = screen.getByRole('navigation', { name: 'Навигационная цепочка' });
    expect(nav.querySelector('a[href="/ru/courses"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="/ru/paths/frontend"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="/courses"]')).toBeNull();
    expect(screen.getByText('Current lesson')).toHaveAttribute('aria-current', 'page');
  });
});
