import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LearningPathDetailPage from './LearningPathDetailPage';
import { useBookmarkStore } from '@/features/bookmarks';
import { useLocaleStore } from '@/features/localization/localeStore';
import { useProgressStore } from '@/features/progress';
import { STORAGE_KEYS } from '@/lib/constants';

const EMPTY_PROGRESS = {
  lessons: {},
  lastOpenedLessonId: null,
  lastOpenedAt: null,
};

function renderPath(pathId: string) {
  render(
    <MemoryRouter initialEntries={[`/paths/${pathId}`]}>
      <Routes>
        <Route path="/paths/:pathId" element={<LearningPathDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
  useProgressStore.setState(EMPTY_PROGRESS);
  useBookmarkStore.setState({ lessons: {} });
  useLocaleStore.setState({ locale: 'en' });
});

afterEach(() => {
  cleanup();
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
  useProgressStore.setState(EMPTY_PROGRESS);
  useBookmarkStore.setState({ lessons: {} });
  useLocaleStore.setState({ locale: 'en' });
});

describe('LearningPathDetailPage', () => {
  it('routes structured steps, tracks their progress, and preserves structured bookmarks', () => {
    useProgressStore.setState({
      ...EMPTY_PROGRESS,
      lessons: {
        'web.internet-http': {
          status: 'completed',
          startedAt: '2026-10-28T08:00:00.000Z',
          completedAt: '2026-10-28T08:15:00.000Z',
        },
      },
    });

    renderPath('structured-frontend-foundations');

    expect(screen.getByRole('heading', { name: 'Structured Frontend Foundations' })).toBeTruthy();
    expect(screen.getByRole('progressbar', { name: '1 of 6 lessons completed' }).getAttribute('aria-valuenow')).toBe('17');

    const firstStep = screen.getByRole('link', { name: 'How the Web Works: URLs, HTTP, and Browser DevTools' });
    expect(firstStep.getAttribute('href')).toBe('/en/structured-lessons/web.internet-http');

    const nextStep = screen.getByRole('link', { name: 'HTML document structure and semantic page regions' });
    expect(nextStep.getAttribute('href')).toBe('/en/structured-lessons/html.document-structure');

    const card = nextStep.closest('.group');
    if (!card) throw new Error('Structured lesson card is missing');
    fireEvent.click(within(card as HTMLElement).getByRole('button', { name: 'Add bookmark' }));
    expect(useBookmarkStore.getState().lessons['html.document-structure']).toBeTruthy();
  });

  it('uses the selected Russian locale for structured path titles and lesson routes', () => {
    useLocaleStore.setState({ locale: 'ru' });

    renderPath('structured-react-developer');

    expect(screen.getByRole('heading', { name: 'Структурированный путь React-разработчика' })).toBeTruthy();
    const firstStep = screen.getByRole('link', { name: 'Компоненты React, JSX, props и state' });
    expect(firstStep.getAttribute('href')).toBe('/ru/structured-lessons/react.components-jsx-state');
  });

  it('routes the structured JavaScript path to the canonical lesson IDs', () => {
    renderPath('structured-javascript-mastery');

    expect(screen.getByRole('heading', { name: 'Structured JavaScript Mastery' })).toBeTruthy();
    const firstStep = screen.getByRole('link', { name: 'JavaScript Basics: Values, Operators, Conditions, and Loops' });
    expect(firstStep.getAttribute('href')).toBe('/en/structured-lessons/js.basics-types-control-flow');
  });

  it('localizes the capstone path and keeps all continuation links on the structured route', () => {
    useLocaleStore.setState({ locale: 'ru' });

    renderPath('structured-capstone');

    expect(screen.getByRole('heading', { name: 'Итоговый frontend-проект: от требований до демонстрации' })).toBeTruthy();
    expect(screen.getByText('Определите пользователей, ограничения и критерии приёмки проекта.')).toBeTruthy();

    const firstLessonHref = '/ru/structured-lessons/capstone.requirements-discovery';
    expect(screen.getAllByRole('link').filter((link) => link.getAttribute('href') === firstLessonHref)).toHaveLength(3);
  });

  it('keeps the existing classic learning paths on their original lesson routes', () => {
    renderPath('frontend-foundations');

    const legacyStep = screen.getAllByRole('link').find((link) => link.getAttribute('href') === '/lessons/sh-001');
    expect(legacyStep).toBeTruthy();
  });
});
