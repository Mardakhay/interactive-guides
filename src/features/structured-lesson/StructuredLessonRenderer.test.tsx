import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { getStructuredLesson } from '@/content/repository';
import { useStructuredLearningStore } from './store';
import { LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, STRUCTURED_LEARNING_STORAGE_KEY } from './schemas';
import { StructuredLessonRenderer } from './StructuredLessonRenderer';

describe('StructuredLessonRenderer', () => {
  afterEach(() => {
    cleanup();
    localStorage.removeItem(STRUCTURED_LEARNING_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY);
    useStructuredLearningStore.setState({
      quizAttempts: {},
      codeDrafts: {},
      practiceChecklists: {},
      sectionProgress: {},
    });
  });

  it('persists and toggles a self-attested section-read marker', async () => {
    const lesson = await getStructuredLesson('html.document-structure', 'en');
    if (!lesson) throw new Error('English pilot lesson is missing');

    render(<StructuredLessonRenderer lesson={lesson} />);

    const markRead = screen.getByRole('button', { name: 'Mark section read: Why document structure matters' });
    expect(markRead.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(markRead);

    const markUnread = screen.getByRole('button', { name: 'Mark section unread: Why document structure matters' });
    expect(markUnread.getAttribute('aria-pressed')).toBe('true');
    expect(useStructuredLearningStore.getState().sectionProgress[lesson.id]?.completedBlockIds).toContain('why-structure');

    const saved = JSON.parse(localStorage.getItem(STRUCTURED_LEARNING_STORAGE_KEY) ?? '{}');
    expect(saved.data.sectionProgress[lesson.id].completedBlockIds).toContain('why-structure');
    expect(screen.getByRole('heading', { name: 'Build an About Me page' })).toBeTruthy();
  });

  it('renders structured prose, code and an independent coding exercise', async () => {
    const lesson = await getStructuredLesson('html.document-structure', 'en');
    if (!lesson) throw new Error('English pilot lesson is missing');

    render(<StructuredLessonRenderer lesson={lesson} />);

    expect(screen.getByRole('heading', { name: 'Why document structure matters' })).toBeTruthy();
    expect(screen.getByText(/A useful mental model/)).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Build an About Me page' })).toBeTruthy();
    expect(screen.getAllByLabelText('Your code').length).toBeGreaterThan(0);
    const codeExamples = screen.getAllByRole('group', { name: /code example/i });
    expect(codeExamples.length).toBeGreaterThan(0);
    expect(codeExamples[0]?.getAttribute('tabindex')).toBe('0');
  });

  it('reveals an authored example solution only after an explicit learner action', async () => {
    const lesson = await getStructuredLesson('html.document-structure', 'en');
    if (!lesson) throw new Error('English pilot lesson is missing');

    render(<StructuredLessonRenderer lesson={lesson} />);

    const reveal = screen.getByRole('button', { name: 'Reveal example solution' });
    expect(reveal.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText(/This is one possible complete solution/)).toBeNull();
    fireEvent.click(reveal);

    expect(screen.getByRole('button', { name: 'Hide example solution' }).getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText(/This is one possible complete solution/)).toBeTruthy();
    const solutionCode = screen.getByRole('group', { name: 'html code example: Example solution' });
    expect(solutionCode.textContent).toContain('Alex Morgan');
  });

  it('gives feedback when a learner submits a knowledge-check answer', async () => {
    const lesson = await getStructuredLesson('html.document-structure', 'en');
    if (!lesson) throw new Error('English pilot lesson is missing');

    render(<StructuredLessonRenderer lesson={lesson} />);

    fireEvent.click(screen.getByRole('button', { name: /In a title element inside head/ }));
    fireEvent.click(screen.getAllByRole('button', { name: 'Check answer' })[0]!);

    expect(screen.getByText('Correct')).toBeTruthy();
    expect(screen.getByText(/Document metadata belongs in head/)).toBeTruthy();
  });

  it('renders the Russian pilot and localized interaction labels', async () => {
    const lesson = await getStructuredLesson('html.document-structure', 'ru');
    if (!lesson) throw new Error('Russian pilot lesson is missing');

    render(<StructuredLessonRenderer lesson={lesson} />);

    expect(screen.getByRole('heading', { name: 'Почему структура документа важна' })).toBeTruthy();
    expect(screen.getAllByRole('button', { name: /Копировать код/ }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('group', { name: /пример кода/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Создай страницу «Обо мне»' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Отметить раздел прочитанным: Почему структура документа важна' })).toBeTruthy();
    const reveal = screen.getByRole('button', { name: 'Показать пример решения' });
    fireEvent.click(reveal);
    expect(screen.getByText(/Это один из возможных полных вариантов/)).toBeTruthy();
    expect(screen.getByRole('group', { name: 'html: пример кода — Пример решения' })).toBeTruthy();
  });

  it('announces a failed copy attempt to assistive technology', async () => {
    const lesson = await getStructuredLesson('html.document-structure', 'en');
    if (!lesson) throw new Error('English pilot lesson is missing');
    const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

    try {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
      render(<StructuredLessonRenderer lesson={lesson} />);
      fireEvent.click(screen.getAllByRole('button', { name: 'Copy code' })[0]!);
      const copyStatuses = await screen.findAllByRole('status', { name: 'Code copy status' });
      expect(copyStatuses.some((status) => status.textContent?.trim() === 'Copy failed')).toBe(true);
    } finally {
      cleanup();
      if (clipboardDescriptor) Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
      else Reflect.deleteProperty(navigator, 'clipboard');
    }
  });
});

  it('offers a restricted Worker runner for JavaScript without DOM requirements', async () => {
    const lesson = await getStructuredLesson('js.basics-types-control-flow', 'en');
    if (!lesson) throw new Error('JavaScript lesson is missing');

    render(<StructuredLessonRenderer lesson={lesson} />);

    expect(screen.getAllByRole('heading', { name: 'Run JavaScript' }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/common network APIs are deliberately blocked/i).length).toBeGreaterThan(0);
  });

  it('explains that DOM-dependent exercises need a local browser project', async () => {
    const lesson = await getStructuredLesson('js.dom-events', 'en');
    if (!lesson) throw new Error('DOM lesson is missing');

    render(<StructuredLessonRenderer lesson={lesson} />);

    expect(screen.getAllByText(/This exercise requires the browser DOM/).length).toBeGreaterThan(0);
    expect(screen.queryByRole('heading', { name: 'Run JavaScript' })).toBeNull();
  });