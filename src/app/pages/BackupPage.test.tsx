import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import BackupPage from './BackupPage';
import { useLocaleStore } from '@/features/localization/localeStore';

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
  localStorage.clear();
});

describe('data backup page', () => {
  it('renders export and guarded restore controls in English', () => {
    useLocaleStore.setState({ locale: 'en' });
    render(<MemoryRouter><BackupPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Back up your learning data' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download backup file' })).toBeInTheDocument();
    expect(screen.getByLabelText('Backup JSON file')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Restore backup' })).toBeDisabled();
  });

  it('renders the backup workflow in Russian when Russian is preferred', () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(<MemoryRouter><BackupPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Резервная копия обучения' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Скачать резервную копию' })).toBeInTheDocument();
    expect(screen.getByLabelText('JSON-файл резервной копии')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Восстановить копию' })).toBeDisabled();
  });
});
