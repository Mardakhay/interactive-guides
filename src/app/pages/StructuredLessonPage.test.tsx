import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
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

  it('reports quiz attempts, self-review and drafts as separate non-mastery signals', async () => {
    renderLesson('/en/structured-lessons/html.document-structure');

    const checksGroup = await screen.findByRole('group', { name: 'Knowledge checks submitted' });
    const practiceGroup = screen.getByRole('group', { name: 'Practice criteria self-reviewed' });
    const draftsGroup = screen.getByRole('group', { name: 'Exercise drafts saved' });
    expect(within(checksGroup).getByText('0 / 7')).toBeTruthy();
    expect(within(practiceGroup).getByText(/^0 \/ \d+$/)).toBeTruthy();
    expect(within(draftsGroup).getByText('0 / 5')).toBeTruthy();
    expect(screen.getByText(/These counts describe activity, not mastery/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /In a title element inside head/ }));
    fireEvent.click(screen.getAllByRole('button', { name: 'Check answer' })[0]!);
    expect(within(checksGroup).getByText('1 / 7')).toBeTruthy();

    const exerciseHeading = screen.getByRole('heading', { name: 'Build an About Me page' });
    const exercise = exerciseHeading.closest('section');
    if (!exercise) throw new Error('About Me practice section is missing');
    fireEvent.click(within(exercise).getByLabelText('The page loads without a visible error in the browser.'));
    expect(within(practiceGroup).getByText(/^1 \/ \d+$/)).toBeTruthy();

    fireEvent.change(within(exercise).getByLabelText('Your code'), {
      target: { value: '<!doctype html>\n<html lang="en"></html>' },
    });
    expect(within(draftsGroup).getByText('1 / 5')).toBeTruthy();
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