import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { useLocaleStore } from '@/stores/localeStore';
import { useUIStore } from '@/stores/uiStore';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  useLocaleStore.setState({ locale: 'en' });
  useUIStore.setState({ sidebarOpen: false });
});

describe('localized application navigation', () => {
  it('translates desktop and mobile navigation into Russian', () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(<MemoryRouter><Sidebar /><MobileNav /></MemoryRouter>);
    expect(screen.getByRole('navigation', { name: 'Основная навигация' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Главная' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Учебные траектории' })).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Мобильная навигация' })).toBeTruthy();
    expect(screen.getAllByRole('link', { name: 'Поиск' })).toHaveLength(2);
  });
});
