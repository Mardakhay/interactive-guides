import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { useLocaleStore } from '@/stores/localeStore';

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="current-path">{location.pathname}</output>;
}

function renderTopBar(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><TopBar /><LocationProbe /></MemoryRouter>);
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  useLocaleStore.setState({ locale: 'en' });
});

describe('TopBar localization', () => {
  it('switches a structured lesson route to the other locale', () => {
    renderTopBar('/en/structured-lessons/js.async-fetch');
    fireEvent.click(screen.getByRole('button', { name: 'Switch interface language to Russian' }));
    expect(screen.getByTestId('current-path').textContent).toBe('/ru/structured-lessons/js.async-fetch');
  });

  it('persists language selection on a non-localized route', () => {
    renderTopBar('/courses');
    fireEvent.click(screen.getByRole('button', { name: 'Switch interface language to Russian' }));
    expect(useLocaleStore.getState().locale).toBe('ru');
    expect(window.localStorage.getItem('ig:locale')).toBe('ru');
    expect(screen.getByRole('button', { name: 'Переключить язык интерфейса на English' })).toBeTruthy();
  });
});
