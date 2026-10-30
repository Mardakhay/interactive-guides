import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { useLocaleStore } from '@/features/localization';

function CurrentPath() {
  const location = useLocation();
  return <output data-testid="current-path">{location.pathname}{location.search}{location.hash}</output>;
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
    expect(screen.getByTestId('current-path')).toHaveTextContent('/en/settings');
  });

  it('switches regular routes to a shareable locale URL', async () => {
    const user = userEvent.setup();
    renderTopBar('/courses');
    await user.click(screen.getByRole('button', { name: 'Switch language to Russian' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/ru/courses');
    expect(screen.getByRole('button', { name: 'Переключить язык на английский' })).toHaveTextContent('EN');
    expect(useLocaleStore.getState().locale).toBe('ru');
    expect(localStorage.getItem('interactive-guides.ui-locale')).toBe('ru');
  });

  it('preserves query and hash when switching a regular route locale', async () => {
    const user = userEvent.setup();
    renderTopBar('/en/search?q=semantic#results');
    await user.click(screen.getByRole('button', { name: 'Switch language to Russian' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/ru/search?q=semantic#results');
  });

  it('switches locale segment when a structured lesson is open', async () => {
    const user = userEvent.setup();
    renderTopBar('/en/structured-lessons/html.document-structure');
    await user.click(screen.getByRole('button', { name: 'Switch language to Russian' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/ru/structured-lessons/html.document-structure');
    expect(screen.getByRole('button', { name: 'Переключить язык на английский' })).toHaveTextContent('EN');
  });
});
