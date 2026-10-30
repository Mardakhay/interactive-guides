import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SettingsPage from './SettingsPage';
import { useLocaleStore } from '@/features/localization/localeStore';
import { useProgressStore } from '@/features/progress/store';
import { useBookmarkStore } from '@/features/bookmarks/store';
import { useNoteStore } from '@/features/notes/store';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';

function renderSettings() {
  return render(<MemoryRouter><SettingsPage /></MemoryRouter>);
}

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
  useProgressStore.setState({ lessons: {}, lastOpenedLessonId: null, lastOpenedAt: null });
  useBookmarkStore.setState({ lessons: {} });
  useNoteStore.setState({ lessons: {} });
  useStructuredLearningStore.setState({
    quizAttempts: {},
    codeDrafts: {},
    practiceChecklists: {},
    sectionProgress: {},
  });
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('SettingsPage', () => {
  it('shows the actual local data counts and links to the backup workflow', () => {
    useProgressStore.setState({
      lessons: {
        'lesson-one': { status: 'completed', startedAt: '2026-10-01T00:00:00.000Z', completedAt: '2026-10-02T00:00:00.000Z' },
        'lesson-two': { status: 'in-progress', startedAt: '2026-10-03T00:00:00.000Z', completedAt: null },
      },
      lastOpenedLessonId: 'lesson-two',
      lastOpenedAt: '2026-10-03T00:00:00.000Z',
    });
    useBookmarkStore.setState({ lessons: { 'lesson-one': { createdAt: '2026-10-01T00:00:00.000Z' } } });
    useNoteStore.setState({ lessons: { 'lesson-one': { content: 'Remember semantic HTML', updatedAt: '2026-10-01T00:00:00.000Z' } } });
    useStructuredLearningStore.setState({
      quizAttempts: { 'lesson::check': [{ selectedOptionIds: ['a'], isCorrect: true, submittedAt: '2026-10-01T00:00:00.000Z' }] },
      codeDrafts: { 'lesson::exercise': { code: 'const answer = 42;', updatedAt: '2026-10-01T00:00:00.000Z' } },
      practiceChecklists: {},
      sectionProgress: {},
    });

    renderSettings();

    expect(screen.getByText('Lessons with progress').nextElementSibling).toHaveTextContent('2');
    expect(screen.getByText('Completed lessons').nextElementSibling).toHaveTextContent('1');
    expect(screen.getByText('Bookmarks').nextElementSibling).toHaveTextContent('1');
    expect(screen.getByText('Notes').nextElementSibling).toHaveTextContent('1');
    expect(screen.getByText('Exercise drafts').nextElementSibling).toHaveTextContent('1');
    expect(screen.getByText('Structured quiz attempts').nextElementSibling).toHaveTextContent('1');
    expect(screen.getByRole('link', { name: 'Open backup settings' }).getAttribute('href')).toBe('/backup');
    expect(screen.getByText(/remains local to this browser/i)).toBeTruthy();
  });

  it('persists the selected locale and updates the settings copy', () => {
    renderSettings();
    fireEvent.click(screen.getByRole('button', { name: 'Русский' }));

    expect(useLocaleStore.getState().locale).toBe('ru');
    expect(localStorage.getItem('interactive-guides.ui-locale')).toBe('ru');
    expect(screen.getByRole('heading', { name: 'Настройки' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Сетевое подключение' })).toBeTruthy();
  });

  it('reacts to browser online and offline events without claiming lesson availability', () => {
    renderSettings();
    const onlineState = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    fireEvent(window, new Event('offline'));
    expect(screen.getByRole('status')).toHaveTextContent('Browser reports no network connection');
    expect(screen.getByText(/does not guarantee that every lesson/i)).toBeTruthy();

    onlineState.mockReturnValue(true);
    fireEvent(window, new Event('online'));
    expect(screen.getByRole('status')).toHaveTextContent('Browser reports an internet connection');
  });
});
