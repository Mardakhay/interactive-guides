import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import BookmarksPage from '@/app/pages/BookmarksPage';
import { BookmarkButton } from './BookmarkButton';

describe('bookmarks', () => {
  it('shows a bookmarked lesson on the Bookmarks page', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><BookmarkButton lessonId="sh-001" /><BookmarksPage /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Bookmark' }));
    expect(await screen.findByText('Frontend Engineering Handbook')).toBeInTheDocument();
  });
});
