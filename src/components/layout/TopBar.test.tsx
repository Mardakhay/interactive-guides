import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { useLocaleStore } from '@/features/localization';

function CurrentPath() {
  const location = useLocation();
  return <output data-testid="current-path">{location.pathname}</output>;
}

function renderTopBar(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <TopBar />
      <CurrentPath />
    </MemoryRouter>,
  );
}

describe('TopBar locale switch', () => {
  beforeEach(() => {
    useLocaleStore.getState().setLocale('en');
  });

  it('provides a settings entry point from the top bar', async () => {
    const user = userEvent.setup();
    renderTopBar('/courses');
    await user.click(screen.getByRole('button', { name: 'Settings' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/settings');
  });

  it('persists UI language preference without changing regular routes', async () => {
    const user = userEvent.setup();
    renderTopBar('/courses');
    await user.click(screen.getByRole('button', { name: 'Switch language to Russian' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/courses');
    expect(screen.getByRole('button', { name: 'Переключить язык на английский' })).toHaveTextContent('EN');
    expect(useLocaleStore.getState().locale).toBe('ru');
    expect(localStorage.getItem('interactive-guides.ui-locale')).toBe('ru');
  });

  it('switches locale segment when a structured lesson is open', async () => {
    const user = userEvent.setup();
    renderTopBar('/en/structured-lessons/html.document-structure');
    await user.click(screen.getByRole('button', { name: 'Switch language to Russian' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/ru/structured-lessons/html.document-structure');
    expect(screen.getByRole('button', { name: 'Переключить язык на английский' })).toHaveTextContent('EN');
  });
});
