import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StructuredLessonPage from './StructuredLessonPage';
import { useProgressStore } from '@/features/progress';

function renderLesson(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:locale/structured-lessons/:lessonId" element={<StructuredLessonPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

afterEach(() => {
  cleanup();
  useProgressStore.setState({
    lessons: {},
    lastOpenedLessonId: null,
    lastOpenedAt: null,
  });
  document.documentElement.lang = 'en';
});

describe('StructuredLessonPage', () => {
  it('sets the document language and links to the next lesson in curriculum order', () => {
    renderLesson('/en/structured-lessons/html.document-structure');
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('link', { name: /Next lesson HTML Forms and Accessibility Basics/ })).toBeTruthy();
  });

  it('records a self-attested completion marker without claiming mastery', () => {
    renderLesson('/en/structured-lessons/html.document-structure');
    fireEvent.click(screen.getByRole('button', { name: 'Mark lesson complete' }));
    expect(screen.getByText('Marked complete')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Mark incomplete' })).toBeTruthy();
    expect(screen.getByText(/does not validate your code or prove mastery/)).toBeTruthy();
  });

  it('exposes previous lesson navigation and changes the document language when switching locale', () => {
    renderLesson('/ru/structured-lessons/html.forms-accessibility');
    expect(document.documentElement.lang).toBe('ru');
    expect(screen.getByRole('link', { name: /Предыдущий урок Структура HTML-документа и семантические области страницы/ })).toBeTruthy();
    fireEvent.click(screen.getByRole('link', { name: /English/ }));
    expect(screen.getByRole('heading', { name: 'HTML Forms and Accessibility Basics' })).toBeTruthy();
    expect(document.documentElement.lang).toBe('en');
  });
});
