import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotesPage from './NotesPage';
import { useNoteStore } from '@/features/notes';
import { useLocaleStore } from '@/features/localization/localeStore';
import { STORAGE_KEYS } from '@/lib/constants';

describe('NotesPage text-only lesson support', () => {
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

  it('shows structured notes and hides old standalone HTML notes without deleting stored data', () => {
    useNoteStore.setState({
      lessons: {
        'html.document-structure': {
          content: 'Review semantic regions and landmarks.',
          updatedAt: '2026-10-28T11:00:00.000Z',
        },
        'wb-001': {
          content: 'This note belongs to a retired standalone HTML lesson.',
          updatedAt: '2026-10-28T12:00:00.000Z',
        },
      },
    });

    render(<MemoryRouter initialEntries={['/notes']}><NotesPage /></MemoryRouter>);

    const lessonLink = screen.getByRole('link', { name: 'HTML document structure and semantic page regions' });
    expect(lessonLink.getAttribute('href')).toBe('/en/structured-lessons/html.document-structure');
    expect(screen.getByText('Review semantic regions and landmarks.')).toBeTruthy();
    expect(screen.queryByText('This note belongs to a retired standalone HTML lesson.')).toBeNull();
    expect(useNoteStore.getState().lessons['wb-001']).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(useNoteStore.getState().lessons['html.document-structure']).toBeUndefined();
    expect(useNoteStore.getState().lessons['wb-001']).toBeTruthy();
  });
});
