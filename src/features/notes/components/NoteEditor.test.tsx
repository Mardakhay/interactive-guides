import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { NoteEditor } from './NoteEditor';
import { useNoteStore } from '../store';
import { useLocaleStore } from '@/stores/localeStore';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  useLocaleStore.setState({ locale: 'en' });
  useNoteStore.setState({ lessons: {} });
});

describe('NoteEditor localization', () => {
  it('shows translated note controls and autosave feedback in Russian', () => {
    useLocaleStore.setState({ locale: 'ru' });
    useNoteStore.setState({ lessons: {} });
    render(<NoteEditor lessonId="test-lesson" />);

    expect(screen.getByText('Мои заметки')).toBeTruthy();
    expect(screen.getByRole('textbox', { name: 'Заметки к уроку' })).toBeTruthy();
    expect(screen.getByText('Сохраняется автоматически при вводе')).toBeTruthy();
  });
});
