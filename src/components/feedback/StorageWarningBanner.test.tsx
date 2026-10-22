import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useLocaleStore } from '@/stores/localeStore';
import { clearLastStorageError, reportStorageError, STORAGE_ERROR_EVENT } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';
import { useProgressStore } from '@/features/progress';
import { useBookmarkStore } from '@/features/bookmarks/store';
import { useNoteStore } from '@/features/notes/store';
import { useQuizResultsStore } from '@/features/quizzes/store';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';
import { StorageWarningBanner } from './StorageWarningBanner';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  useLocaleStore.setState({ locale: 'en' });
  clearLastStorageError();
  localStorage.clear();
  useProgressStore.setState({ lessons: {}, lastOpenedLessonId: null, lastOpenedAt: null });
  useBookmarkStore.setState({ lessons: {} });
  useNoteStore.setState({ lessons: {} });
  useQuizResultsStore.setState({ quizzes: {} });
  useStructuredLearningStore.setState({ quizAttempts: {}, codeDrafts: {}, practiceChecklists: {}, sectionProgress: {} });
});

describe('StorageWarningBanner', () => {
  it('shows a localized recovery message after a persistence error and can be dismissed', () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(
      <MemoryRouter initialEntries={['/ru/structured-lessons/js.async-fetch']}>
        <StorageWarningBanner />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('alert')).toBeNull();

    act(() => {
      window.dispatchEvent(new CustomEvent(STORAGE_ERROR_EVENT, {
        detail: { key: 'ig:progress', operation: 'write' },
      }));
    });

    expect(screen.getByRole('alert').textContent).toContain('Не удалось сохранить учебные данные');
    expect(screen.getByRole('link', { name: 'Открыть резервное копирование данных' }).getAttribute('href')).toBe('/ru/settings/data');

    fireEvent.click(screen.getByRole('button', { name: 'Скрыть предупреждение о хранилище' }));
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

  it('shows a distinct localized warning when a stored record could not be read before mount', () => {
    useLocaleStore.setState({ locale: 'ru' });
    reportStorageError('interactive-guides:structured-learning:v1', 'read');

    render(
      <MemoryRouter initialEntries={['/ru/structured-lessons/js.async-fetch']}>
        <StorageWarningBanner />
      </MemoryRouter>,
    );

    expect(screen.getByRole('alert').textContent).toContain('Не удалось прочитать локальные учебные данные');
    expect(screen.getByRole('alert').textContent).toContain('не была автоматически удалена');
    expect(screen.queryByRole('button', { name: 'Повторить сохранение' })).toBeNull();
  });

  it('retries writing in-memory learner state and confirms success', () => {
    useLocaleStore.setState({ locale: 'en' });
    useProgressStore.setState({
      lessons: {
        'lesson.one': {
          status: 'completed',
          startedAt: '2026-10-22T10:00:00.000Z',
          completedAt: '2026-10-22T10:10:00.000Z',
        },
      },
      lastOpenedLessonId: 'lesson.one',
      lastOpenedAt: '2026-10-22T10:10:00.000Z',
    });
    reportStorageError(STORAGE_KEYS.PROGRESS, 'write');

    render(
      <MemoryRouter initialEntries={['/en/settings/data']}>
        <StorageWarningBanner />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Retry save' }));

    expect(screen.getByRole('status').textContent).toContain('Learning data saved');
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) ?? '{}').lessons['lesson.one'].status).toBe('completed');
  });

  it('keeps the warning visible when a retry still fails to write one store', () => {
    useLocaleStore.setState({ locale: 'en' });
    reportStorageError(STORAGE_KEYS.PROGRESS, 'write');
    const originalSetItem = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (key: string, value: string) {
      if (key === STORAGE_KEYS.NOTES) throw new DOMException('Quota exceeded', 'QuotaExceededError');
      originalSetItem.call(this, key, value);
    });

    render(
      <MemoryRouter initialEntries={['/en/settings/data']}>
        <StorageWarningBanner />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Retry save' }));

    expect(screen.getByRole('alert').textContent).toContain('The retry failed');
    expect(screen.queryByRole('status')).toBeNull();
    expect(localStorage.getItem(STORAGE_KEYS.NOTES)).toBeNull();
  });
