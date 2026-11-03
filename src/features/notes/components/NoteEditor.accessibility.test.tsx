import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useNoteStore } from '../store';
import { NoteEditor } from './NoteEditor';
import { STORAGE_KEYS } from '@/lib/constants';

describe('NoteEditor autosave accessibility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useNoteStore.setState({ lessons: {} });
    localStorage.removeItem(STORAGE_KEYS.NOTES);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    useNoteStore.setState({ lessons: {} });
    localStorage.removeItem(STORAGE_KEYS.NOTES);
  });

  it('announces a debounced save through a polite status region', async () => {
    render(
      <MemoryRouter initialEntries={['/en/structured-lessons/example']}>
        <NoteEditor lessonId="example.lesson" />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole('textbox', { name: 'Lesson notes' }), {
      target: { value: 'Remember semantic landmarks.' },
    });

    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(useNoteStore.getState().lessons['example.lesson']?.content).toBe('Remember semantic landmarks.');
    expect(screen.getByRole('status')).toHaveTextContent('Saved ·');
  });
});
