import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { useLocaleStore } from '@/stores/localeStore';

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
});

describe('Breadcrumbs localization', () => {
  it('exposes a translated navigation label in Russian', () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(
      <MemoryRouter>
        <Breadcrumbs items={[{ label: 'Каталог', path: '/courses' }, { label: 'Заметки' }]} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('navigation', { name: 'Навигационная цепочка' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Каталог' })).toBeTruthy();
    expect(screen.getByText('Заметки')).toBeTruthy();
  });
});
