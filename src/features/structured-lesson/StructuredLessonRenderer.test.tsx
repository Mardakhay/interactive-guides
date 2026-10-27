import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getStructuredLesson } from '@/content/repository';
import { StructuredLessonRenderer } from './StructuredLessonRenderer';

describe('StructuredLessonRenderer', () => {
  it('renders structured prose, code and an independent coding exercise', async () => {
    const lesson = await getStructuredLesson('html.document-structure', 'en');
    if (!lesson) throw new Error('English pilot lesson is missing');

    render(<StructuredLessonRenderer lesson={lesson} />);

    expect(screen.getByRole('heading', { name: 'Why document structure matters' })).toBeTruthy();
    expect(screen.getByText(/A useful mental model/)).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Build an About Me page' })).toBeTruthy();
    expect(screen.getAllByLabelText('Your code').length).toBeGreaterThan(0);
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
    expect(screen.getByRole('heading', { name: 'Создай страницу «Обо мне»' })).toBeTruthy();
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