import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { useLocaleStore } from '@/features/localization/localeStore';
import { clearLastStorageError, getLastStorageError, reportStorageError } from '@/lib/storage';
import { StorageErrorNotice } from './StorageErrorNotice';

afterEach(() => {
  cleanup();
  clearLastStorageError();
  useLocaleStore.setState({ locale: 'en' });
});

describe('StorageErrorNotice', () => {
  it('shows an error that occurred before the app shell mounted', () => {
    reportStorageError('ig:progress', 'write');
    render(<StorageErrorNotice />);

    expect(screen.getByRole('alert')).toHaveTextContent('A learning-data storage problem occurred');
    expect(screen.getByRole('alert')).toHaveTextContent('The latest change could not be saved');
    expect(screen.getByRole('alert')).toHaveTextContent('Check browser privacy settings');
  });

  it('updates the visible message for a storage error raised while mounted', () => {
    render(<StorageErrorNotice />);

    reportStorageError('ig:notes', 'read');

    expect(screen.getByRole('alert')).toHaveTextContent('The app could not read some saved learning data');
  });

  it('lets the learner dismiss a warning and clears its remembered status', async () => {
    const user = userEvent.setup();
    reportStorageError('ig:bookmarks', 'remove');
    render(<StorageErrorNotice />);

    await user.click(screen.getByRole('button', { name: 'Dismiss storage warning' }));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(getLastStorageError()).toBeNull();
  });

  it('uses Russian copy for a storage write failure', () => {
    useLocaleStore.setState({ locale: 'ru' });
    reportStorageError('ig:notes', 'write');
    render(<StorageErrorNotice />);

    expect(screen.getByRole('alert')).toHaveTextContent('Возникла проблема с хранилищем учебных данных');
    expect(screen.getByRole('alert')).toHaveTextContent('Последнее изменение не удалось сохранить');
  });
});
