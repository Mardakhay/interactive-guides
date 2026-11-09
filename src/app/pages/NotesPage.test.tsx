import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotesPage from './NotesPage';
import { useNoteStore } from '@/features/notes';
import { useLocaleStore } from '@/features/localization/localeStore';
import { STORAGE_KEYS } from '@/lib/constants';

describe('NotesPage structured lesson support', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEYS.NOTES);
    useNoteStore.setState({ lessons: {} });
    useLocaleStore.setState({ locale: 'en' });
  });

  afterEach(() => {
    cleanup();
    localStorage.removeItem(STORAGE_KEYS.NOTES);
    useNoteStore.setState({ lessons: {} });
    useLocaleStore.setState({ locale: 'en' });
  });

  it('shows structured notes, filters them separately, links to the reader and deletes by stable lesson ID', () => {
    useNoteStore.setState({
      lessons: {
        'html.document-structure': {
          content: 'Review semantic regions and landmarks.',
          updatedAt: '2026-10-28T11:00:00.000Z',
        },
      },
    });

    render(<MemoryRouter initialEntries={['/notes']}><NotesPage /></MemoryRouter>);

    const lessonLink = screen.getByRole('link', { name: 'HTML document structure and semantic page regions' });
    expect(lessonLink.getAttribute('href')).toBe('/en/structured-lessons/html.document-structure');
    expect(screen.getByText('Review semantic regions and landmarks.')).toBeTruthy();

    fireEvent.change(screen.getByRole('combobox', { name: 'Filter by course' }), {
      target: { value: 'structured-curriculum' },
    });
    expect(screen.getByRole('link', { name: 'HTML document structure and semantic page regions' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(useNoteStore.getState().lessons['html.document-structure']).toBeUndefined();
    expect(screen.queryByText('Review semantic regions and landmarks.')).toBeNull();
  });
});
