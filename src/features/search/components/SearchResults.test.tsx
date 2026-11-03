import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchResults } from './SearchResults';

afterEach(cleanup);

describe('SearchResults locale-aware links', () => {
  it('keeps classic and already-localized destinations under the active locale', () => {
    render(
      <MemoryRouter initialEntries={['/ru/search']}>
        <SearchResults
          locale="ru"
          terms={[]}
          results={[
            {
              type: 'lesson',
              id: 'classic.lesson',
              title: 'Classic lesson',
              snippet: 'A classic lesson result',
              path: '/lessons/classic.lesson',
              matchedFields: ['title'],
            },
            {
              type: 'lesson',
              id: 'structured.lesson',
              title: 'Structured lesson',
              snippet: 'A structured lesson result',
              path: '/en/structured-lessons/structured.lesson',
              matchedFields: ['title'],
            },
          ]}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /Classic lesson/ })).toHaveAttribute('href', '/ru/lessons/classic.lesson');
    expect(screen.getByRole('link', { name: /Structured lesson/ })).toHaveAttribute('href', '/ru/structured-lessons/structured.lesson');
  });
});
