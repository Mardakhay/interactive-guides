import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from './SearchPage';
import { useSearchStore } from '@/features/search';
import { useNoteStore } from '@/features/notes';
import { useLocaleStore } from '@/features/localization/localeStore';
import { STORAGE_KEYS } from '@/lib/constants';

describe('SearchPage structured content integration', () => {
  beforeEach(() => {
    useSearchStore.setState({ query: '', filter: 'all' });
    useNoteStore.setState({ lessons: {} });
    useLocaleStore.setState({ locale: 'en' });
    localStorage.removeItem(STORAGE_KEYS.NOTES);
  });

  afterEach(() => {
    cleanup();
    useSearchStore.setState({ query: '', filter: 'all' });
    useNoteStore.setState({ lessons: {} });
    useLocaleStore.setState({ locale: 'en' });
    localStorage.removeItem(STORAGE_KEYS.NOTES);
  });

  function renderSearch() {
    render(<MemoryRouter initialEntries={['/search']}><SearchPage /></MemoryRouter>);
    return screen.getByRole('textbox', { name: 'Search' });
  }

  it('finds structured lesson titles and links to the locale-aware reader', async () => {
    const input = renderSearch();
    fireEvent.change(input, { target: { value: 'document structure' } });

    const lessonLink = await screen.findByRole('link', { name: /HTML document structure and semantic page regions/i });
    expect(lessonLink.getAttribute('href')).toBe('/en/structured-lessons/html.document-structure');
  });

  it('finds notes attached to structured lesson IDs', async () => {
    useNoteStore.setState({
      lessons: {
        'html.document-structure': {
          content: 'Review semantic landmarks and accessible region names.',
          updatedAt: '2026-10-28T11:00:00.000Z',
        },
      },
    });

    const input = renderSearch();
    useSearchStore.setState({ filter: 'note' });
    fireEvent.change(input, { target: { value: 'semantic landmarks' } });

    const noteLink = await screen.findByRole('link', { name: /HTML document structure and semantic page regions/i });
    expect(noteLink.getAttribute('href')).toBe('/en/structured-lessons/html.document-structure');
    expect(screen.getByText(/Review semantic landmarks/)).toBeTruthy();
  });

  it('includes the structured curriculum as a searchable course result', async () => {
    const input = renderSearch();
    useSearchStore.setState({ filter: 'course' });
    fireEvent.change(input, { target: { value: 'canonical structured learning curriculum' } });

    const courseLink = await screen.findByRole('link', { name: /Structured curriculum/i });
    expect(courseLink.getAttribute('href')).toBe('/en/structured-lessons');
  });
});
