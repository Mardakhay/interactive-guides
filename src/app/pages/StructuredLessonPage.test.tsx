import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StructuredLessonPage from './StructuredLessonPage';
import { useProgressStore } from '@/features/progress';
import { useBookmarkStore } from '@/features/bookmarks';
import { useNoteStore } from '@/features/notes';
import { STORAGE_KEYS } from '@/lib/constants';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';
import htmlDocumentStructure from '@/content/lessons/html-document-structure/en.json';
import htmlFormsAccessibility from '@/content/lessons/html.forms-accessibility/en.json';
import { LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, STRUCTURED_LEARNING_STORAGE_KEY } from '@/features/structured-lesson/schemas';

const htmlDocumentKnowledgeCheckCount = htmlDocumentStructure.blocks.filter((block) => block.type === 'knowledgeCheck').length;
const htmlDocumentSectionCount = htmlDocumentStructure.blocks.filter((block) => block.type === 'heading' && block.level === 2).length;
const htmlFormKnowledgeCheckCount = htmlFormsAccessibility.blocks.filter((block) => block.type === 'knowledgeCheck').length;

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
  localStorage.removeItem(STRUCTURED_LEARNING_STORAGE_KEY);
  localStorage.removeItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
  localStorage.removeItem(STORAGE_KEYS.NOTES);
  useBookmarkStore.setState({ lessons: {} });
  useNoteStore.setState({ lessons: {} });
  useStructuredLearningStore.setState({
    quizAttempts: {},
    codeDrafts: {},
    practiceChecklists: {},
    sectionProgress: {},
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
    expect(sectionReadProgress[0]?.getAttribute('aria-valuemax')).toBe(String(htmlDocumentSectionCount));
  });

  it('reports quiz attempts, self-review and drafts as separate non-mastery signals', async () => {
    renderLesson('/en/structured-lessons/html.document-structure');

    const checksGroup = await screen.findByRole('group', { name: 'Knowledge checks submitted' });
    const practiceGroup = screen.getByRole('group', { name: 'Practice criteria self-reviewed' });
    const draftsGroup = screen.getByRole('group', { name: 'Exercise drafts saved' });
    expect(within(checksGroup).getByText(`0 / ${htmlDocumentKnowledgeCheckCount}`)).toBeTruthy();
    expect(within(practiceGroup).getByText(/^0 \/ \d+$/)).toBeTruthy();
    expect(within(draftsGroup).getByText('0 / 5')).toBeTruthy();
    expect(screen.getByText(/These counts describe activity, not mastery/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /In a title element inside head/ }));
    fireEvent.click(screen.getAllByRole('button', { name: 'Check answer' })[0]!);
    expect(within(checksGroup).getByText(`1 / ${htmlDocumentKnowledgeCheckCount}`)).toBeTruthy();

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

  it('does not carry learning signals from the previous lesson after route navigation', async () => {
    renderLesson('/en/structured-lessons/html.document-structure');

    fireEvent.click(await screen.findByRole('button', { name: /In a title element inside head/ }));
    fireEvent.click(screen.getAllByRole('button', { name: 'Check answer' })[0]!);
    const htmlExerciseHeading = screen.getByRole('heading', { name: 'Build an About Me page' });
    const htmlExercise = htmlExerciseHeading.closest('section');
    if (!htmlExercise) throw new Error('About Me practice section is missing');
    fireEvent.click(within(htmlExercise).getByLabelText('The page loads without a visible error in the browser.'));
    fireEvent.change(within(htmlExercise).getByLabelText('Your code'), {
      target: { value: '<!doctype html>\n<html lang="en"></html>' },
    });

    expect(within(screen.getByRole('group', { name: 'Knowledge checks submitted' })).getByText(`1 / ${htmlDocumentKnowledgeCheckCount}`)).toBeTruthy();
    expect(within(screen.getByRole('group', { name: 'Exercise drafts saved' })).getByText('1 / 5')).toBeTruthy();

    fireEvent.click(screen.getByRole('link', { name: /Next lesson HTML Forms and Accessibility Basics/ }));
    expect(await screen.findByRole('heading', { name: 'HTML Forms and Accessibility Basics' })).toBeTruthy();

    expect(within(screen.getByRole('group', { name: 'Knowledge checks submitted' })).getByText(`0 / ${htmlFormKnowledgeCheckCount}`)).toBeTruthy();
    expect(within(screen.getByRole('group', { name: 'Practice criteria self-reviewed' })).getByText('0 / 11')).toBeTruthy();
    expect(within(screen.getByRole('group', { name: 'Exercise drafts saved' })).getByText('0 / 2')).toBeTruthy();
    expect(screen.getByText(/These counts describe activity, not mastery/)).toBeTruthy();
  });

  it('allows bookmarking a structured lesson and exposes its notes editor', async () => {
    renderLesson('/en/structured-lessons/html.document-structure');

    const bookmarkButton = await screen.findByRole('button', { name: 'Bookmark' });
    expect(screen.getByRole('textbox', { name: 'Lesson notes' })).toBeTruthy();
    fireEvent.click(bookmarkButton);
    expect(bookmarkButton.getAttribute('aria-pressed')).toBe('true');
    expect(useBookmarkStore.getState().lessons['html.document-structure']).toBeTruthy();
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