import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CoursesPage from './CoursesPage';
import { useLocaleStore } from '@/stores/localeStore';
import { useProgressStore } from '@/features/progress';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  useLocaleStore.setState({ locale: 'en' });
  useProgressStore.setState({
    lessons: {},
    lastOpenedLessonId: null,
    lastOpenedAt: null,
  });
});

describe('CoursesPage structured curriculum', () => {
  it('renders the bilingual curriculum and routes structured lessons to the correct reader', () => {
    useLocaleStore.setState({ locale: 'en' });
    render(<MemoryRouter><CoursesPage /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Structured bootcamp curriculum' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Web Fundamentals & Layout' })).toBeTruthy();
    expect(
      screen.getByRole('link', { name: /HTML document structure and semantic page regions/ }),
    ).toBeTruthy();
  });

  it('uses the selected locale for curriculum titles and structured lesson routes', () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(<MemoryRouter><CoursesPage /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Структурированная программа буткемпа' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Основы веба и вёрстка' })).toBeTruthy();
    expect(
      screen.getByRole('link', { name: /Структура HTML-документа и семантические области страницы/ }),
    ).toBeTruthy();
  });
});
