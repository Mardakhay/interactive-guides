import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import BookmarksPage from '@/app/pages/BookmarksPage';
import { BookmarkButton } from './BookmarkButton';
import { useBookmarkStore } from '../store';
import { useLocaleStore } from '@/features/localization/localeStore';
import { STORAGE_KEYS } from '@/lib/constants';

describe('bookmarks', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    useBookmarkStore.setState({ lessons: {} });
    useLocaleStore.setState({ locale: 'en' });
  });

  afterEach(() => {
    cleanup();
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    useBookmarkStore.setState({ lessons: {} });
    useLocaleStore.setState({ locale: 'en' });
  });

  it('shows a bookmarked lesson on the Bookmarks page', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><BookmarkButton lessonId="sh-001" /><BookmarksPage /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Bookmark' }));
    expect(await screen.findByText('Frontend Engineering Handbook')).toBeInTheDocument();
  });

  it('keeps structured lesson bookmarks visible and links to the localized reader', () => {
    useBookmarkStore.setState({
      lessons: { 'html.document-structure': { createdAt: '2026-10-28T10:00:00.000Z' } },
    });

    render(<MemoryRouter initialEntries={['/bookmarks']}><BookmarksPage /></MemoryRouter>);

    const lessonLink = screen.getByRole('link', { name: 'HTML document structure and semantic page regions' });
    expect(lessonLink.getAttribute('href')).toBe('/en/structured-lessons/html.document-structure');
    expect(screen.getByText('Structured curriculum')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Remove bookmark' }));
    expect(useBookmarkStore.getState().lessons['html.document-structure']).toBeUndefined();
  });
});
