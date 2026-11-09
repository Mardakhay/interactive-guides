import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useLocaleStore } from '@/stores/localeStore';
import { STORAGE_ERROR_EVENT } from '@/lib/storage';
import { StorageWarningBanner } from './StorageWarningBanner';

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
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

    fireEvent.click(screen.getByRole('button', { name: 'Скрыть предупреждение о сохранении' }));
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
