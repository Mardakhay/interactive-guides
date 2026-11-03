import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useLocaleStore } from '@/features/localization/localeStore';
import { reportStorageError, clearLastStorageError } from '@/lib/storage';
import { AppLayout } from './AppLayout';

afterEach(() => {
  cleanup();
  clearLastStorageError();
  useLocaleStore.setState({ locale: 'en' });
  vi.unstubAllGlobals();
});

describe('AppLayout storage failure feedback', () => {
  it('surfaces a persistence failure raised before the app shell mounts', () => {
    vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    useLocaleStore.setState({ locale: 'en' });
    reportStorageError('ig:progress', 'write');

    render(
      <MemoryRouter initialEntries={['/courses']}>
        <AppLayout />
      </MemoryRouter>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('A learning-data storage problem occurred');
    expect(screen.getByRole('alert')).toHaveTextContent('The latest change could not be saved');
  });
});
