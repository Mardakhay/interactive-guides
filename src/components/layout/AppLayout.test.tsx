import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { useLocaleStore } from '@/stores/localeStore';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  useLocaleStore.setState({ locale: 'en' });
  document.documentElement.lang = 'en';
});

describe('AppLayout locale synchronization', () => {
  it('uses a supported route locale as the interface language', async () => {
    render(
      <MemoryRouter initialEntries={['/ru/structured-lessons/js.async-fetch']}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/:locale/structured-lessons/:lessonId" element={<Outlet />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByRole('link', { name: 'Главная' })).toBeTruthy();
    expect(document.documentElement.lang).toBe('ru');
    expect(window.localStorage.getItem('ig:locale')).toBe('ru');
  });
});
