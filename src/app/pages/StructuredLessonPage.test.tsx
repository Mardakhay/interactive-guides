import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
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
  vi.restoreAllMocks();
});

describe('StructuredLessonPage', () => {
  it('sets the document language and links to the next lesson in curriculum order', async () => {
    renderLesson('/en/structured-lessons/html.document-structure');
    expect(document.documentElement.lang).toBe('en');
    expect(await screen.findByRole('link', { name: /Next lesson HTML Forms and Accessibility Basics/ })).toBeTruthy();
  });

  it('updates the accessible reading-progress indicator as the learner scrolls', async () => {
    renderLesson('/en/structured-lessons/html.document-structure');

    const progress = await screen.findByRole('progressbar', { name: 'Reading progress' });
    expect(progress.getAttribute('aria-valuenow')).toBe('0');

    const pageRoot = progress.parentElement;
    if (!pageRoot) throw new Error('Reading progress root is missing');
    vi.spyOn(pageRoot, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, -400, 1200, 2000));

    fireEvent.scroll(window);
    fireEvent.resize(window);
    expect(progress.getAttribute('aria-valuenow')).toBe(String(Math.round((400 / (2000 - window.innerHeight)) * 100)));
  });

  it('updates the section-read count in the lesson outline when a section is marked read', async () => {
    renderLesson('/en/structured-lessons/html.document-structure');

    const sectionReadProgress = await screen.findAllByRole('progressbar', { name: 'Sections marked read' });
    expect(sectionReadProgress[0]?.getAttribute('aria-valuenow')).toBe('0');

    fireEvent.click(await screen.findByRole('button', { name: 'Mark section read: Why document structure matters' }));

    expect(sectionReadProgress[0]?.getAttribute('aria-valuenow')).toBe('1');
    expect(sectionReadProgress[0]?.getAttribute('aria-valuemax')).toBe('9');
  });

  it('records a self-attested completion marker without claiming mastery', async () => {
    renderLesson('/en/structured-lessons/html.document-structure');
    fireEvent.click(await screen.findByRole('button', { name: 'Mark lesson complete' }));
    expect(await screen.findByText('Marked complete')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Mark incomplete' })).toBeTruthy();
    expect(screen.getByText(/does not validate your code or prove mastery/)).toBeTruthy();
  });

  it('exposes previous lesson navigation and changes the document language when switching locale', async () => {
    renderLesson('/ru/structured-lessons/html.forms-accessibility');
    expect(document.documentElement.lang).toBe('ru');
    expect(await screen.findByRole('progressbar', { name: 'Прогресс чтения' })).toBeTruthy();
    expect(await screen.findByRole('link', { name: /Предыдущий урок Структура HTML-документа и семантические области страницы/ })).toBeTruthy();
    fireEvent.click(screen.getByRole('link', { name: /English/ }));
    expect(await screen.findByRole('heading', { name: 'HTML Forms and Accessibility Basics' })).toBeTruthy();
    expect(document.documentElement.lang).toBe('en');
  });
});