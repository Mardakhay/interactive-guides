import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { useBookmarkStore } from '../store';
import { useLocaleStore } from '@/stores/localeStore';
import BookmarksPage from '@/app/pages/BookmarksPage';
import { BookmarkButton } from './BookmarkButton';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  useBookmarkStore.setState({ lessons: {} });
  useLocaleStore.setState({ locale: 'en' });
});

describe('bookmarks', () => {
  it('shows a bookmarked lesson on the Bookmarks page', async () => {
    useLocaleStore.setState({ locale: 'en' });
    const user = userEvent.setup();
    render(<MemoryRouter><BookmarkButton lessonId="sh-001" /><BookmarksPage /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Bookmark' }));
    expect(await screen.findByText('Frontend Engineering Handbook')).toBeInTheDocument();
  });

  it('translates visible bookmark actions in Russian', () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(<BookmarkButton lessonId="lesson-ru" />);
    fireEvent.click(screen.getByRole('button', { name: 'В закладки' }));
    expect(screen.getByRole('button', { name: 'В закладках' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'В закладках' }));
    expect(screen.getByRole('button', { name: 'В закладки' })).toBeTruthy();
  });

  it('provides action-specific accessible names for icon-only bookmark buttons', () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(<BookmarkButton lessonId="lesson-icon" variant="icon" />);
    fireEvent.click(screen.getByRole('button', { name: 'Добавить в закладки' }));
    expect(screen.getByRole('button', { name: 'Убрать из закладок' })).toBeTruthy();
  });
});
