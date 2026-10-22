import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from './SearchPage';
import { useLocaleStore } from '@/stores/localeStore';
import { useSearchStore } from '@/features/search';
import { useNoteStore } from '@/features/notes';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  useLocaleStore.setState({ locale: 'en' });
  useSearchStore.getState().reset();
  useNoteStore.setState({ lessons: {} });
});

describe('SearchPage structured lessons', () => {
  it('returns a structured lesson using the active locale route', async () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(<MemoryRouter><SearchPage /></MemoryRouter>);
    fireEvent.change(screen.getByRole('textbox', { name: 'Поиск' }), { target: { value: 'DOM' } });
    const resultLink = await screen.findByRole('link', { name: /DOM и события браузера/ });
    expect(resultLink.getAttribute('href')).toBe('/ru/structured-lessons/js.dom-events');
  });

  it('finds a structured lesson through its learning content', async () => {
    useLocaleStore.setState({ locale: 'en' });
    render(<MemoryRouter><SearchPage /></MemoryRouter>);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search' }), { target: { value: 'event.target' } });
    const resultLink = await screen.findByRole('link', { name: /DOM and Browser Events/ });
    expect(resultLink.getAttribute('href')).toBe('/en/structured-lessons/js.dom-events');
  });
});
