import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BackupPage from './BackupPage';
import { useLocaleStore } from '@/features/localization/localeStore';
import { STORAGE_KEYS } from '@/lib/constants';
import { createLocalBackup, MAX_BACKUP_FILE_BYTES, serializeBackup } from '@/features/backup';
import { createLocalStoreRecord } from '@/lib/versionedStorage';
import { useProgressStore } from '@/features/progress/store';
import { useBookmarkStore } from '@/features/bookmarks/store';
import { useNoteStore } from '@/features/notes/store';
import { useQuizResultsStore } from '@/features/quizzes/store';
import { EMPTY_STRUCTURED_LEARNING_STATE, LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, STRUCTURED_LEARNING_STORAGE_KEY } from '@/features/structured-lesson/schemas';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';

afterEach(() => {
  cleanup();
  useLocaleStore.setState({ locale: 'en' });
  useProgressStore.setState({ lessons: {}, lastOpenedLessonId: null, lastOpenedAt: null });
  useBookmarkStore.setState({ lessons: {} });
  useNoteStore.setState({ lessons: {} });
  useQuizResultsStore.setState({ quizzes: {} });
  useStructuredLearningStore.setState(EMPTY_STRUCTURED_LEARNING_STATE);
  localStorage.clear();
  vi.restoreAllMocks();
});


function createReadableFile(contents: string, name = 'learning-backup.json'): File {
  const file = new File([contents], name, { type: 'application/json' });
  Object.defineProperty(file, 'text', { configurable: true, value: vi.fn().mockResolvedValue(contents) });
  return file;
}

function createBackupFileWithCompletedLesson(): File {
  const timestamp = '2026-10-27T10:00:00.000Z';
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(createLocalStoreRecord({
    lessons: { 'backup-target': { status: 'completed', startedAt: timestamp, completedAt: timestamp } },
    lastOpenedLessonId: 'backup-target',
    lastOpenedAt: timestamp,
  })));
  const payload = serializeBackup(createLocalBackup(localStorage, new Date(timestamp)));
  localStorage.clear();
  return createReadableFile(payload);
}

function createPendingReadableFile(name: string) {
  let resolveRead: (contents: string) => void = () => { throw new Error('File read has not started'); };
  const file = new File(['pending read'], name, { type: 'application/json' });
  const text = vi.fn(() => new Promise<string>((resolve) => { resolveRead = resolve; }));
  Object.defineProperty(file, 'text', { configurable: true, value: text });
  return { file, text, resolve: (contents: string) => resolveRead(contents) };
}

function renderBackupPage() {
  return render(<MemoryRouter><BackupPage /></MemoryRouter>);
}

const RESTORE_STORAGE_KEYS = [
  STORAGE_KEYS.PROGRESS,
  STORAGE_KEYS.BOOKMARKS,
  STORAGE_KEYS.NOTES,
  STORAGE_KEYS.QUIZ_RESULTS,
  STRUCTURED_LEARNING_STORAGE_KEY,
  LEGACY_STRUCTURED_LEARNING_STORAGE_KEY,
] as const;

function seedPreviousStorageSnapshot(): Map<string, string> {
  const snapshot = new Map<string, string>(RESTORE_STORAGE_KEYS.map((key) => [key, `before:${key}`]));
  for (const [key, value] of snapshot) localStorage.setItem(key, value);
  return snapshot;
}

function setExistingInMemoryProgress(): void {
  const timestamp = '2026-10-26T10:00:00.000Z';
  useProgressStore.setState({
    lessons: { 'current-only': { status: 'in-progress', startedAt: timestamp, completedAt: null } },
    lastOpenedLessonId: 'current-only',
    lastOpenedAt: timestamp,
  });
}

describe('data backup page', () => {
  it('renders export and guarded restore controls in English', () => {
    useLocaleStore.setState({ locale: 'en' });
    render(<MemoryRouter><BackupPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Back up your learning data' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download backup file' })).toBeInTheDocument();
    expect(screen.getByLabelText('Backup JSON file')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Restore backup' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: /I understand that restoring replaces/ })).toBeDisabled();
  });

  it('renders the backup workflow in Russian when Russian is preferred', () => {
    useLocaleStore.setState({ locale: 'ru' });
    render(<MemoryRouter><BackupPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Резервная копия обучения' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Скачать резервную копию' })).toBeInTheDocument();
    expect(screen.getByLabelText('JSON-файл резервной копии')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Восстановить копию' })).toBeDisabled();
  });
  it('validates a selected backup and requires explicit replacement confirmation', async () => {
    const user = userEvent.setup();
    renderBackupPage();
    await user.upload(screen.getByLabelText('Backup JSON file'), createBackupFileWithCompletedLesson());
    expect(await screen.findByRole('heading', { name: 'Backup contents' })).toBeInTheDocument();
    expect(await screen.findByRole('status')).toHaveTextContent('The backup is valid. Review its contents');
    expect(screen.getByText('Selected file: learning-backup.json')).toBeInTheDocument();
    const restoreButton = screen.getByRole('button', { name: 'Restore backup' });
    expect(restoreButton).toBeDisabled();
    const confirmation = screen.getByRole('checkbox', { name: /I understand that restoring replaces/ });
    expect(confirmation).toBeEnabled();
    await user.click(confirmation);
    expect(restoreButton).toBeEnabled();
  });

  it('restores validated data after confirmation and updates the active stores', async () => {
    const user = userEvent.setup();
    renderBackupPage();
    await user.upload(screen.getByLabelText('Backup JSON file'), createBackupFileWithCompletedLesson());
    expect(await screen.findByRole('heading', { name: 'Backup contents' })).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: /I understand that restoring replaces/ }));
    await user.click(screen.getByRole('button', { name: 'Restore backup' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Backup restored. The app now uses the restored learning data.');
    expect(useProgressStore.getState().lessons['backup-target']?.status).toBe('completed');
    const storedProgress = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) ?? '{}') as { data?: { lessons?: Record<string, { status: string }> }; schemaVersion?: number };
    expect(storedProgress.schemaVersion).toBe(1);
    expect(storedProgress.data?.lessons?.['backup-target']?.status).toBe('completed');
    expect(screen.getByRole('button', { name: 'Restore backup' })).toBeDisabled();
  });

  it('reports invalid JSON and never enables restore for that file', async () => {
    const user = userEvent.setup();
    renderBackupPage();
    await user.upload(screen.getByLabelText('Backup JSON file'), createReadableFile('{not json', 'broken-backup.json'));
    expect(await screen.findByRole('alert')).toHaveTextContent('The selected file is not valid JSON.');
    expect(screen.getByText('Selected file: broken-backup.json')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Backup contents' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Restore backup' })).toBeDisabled();
  });

  it('rejects files over 10 MiB before reading their contents', async () => {
    const user = userEvent.setup();
    renderBackupPage();
    const oversized = new File([new Uint8Array(MAX_BACKUP_FILE_BYTES + 1)], 'oversized-backup.json', { type: 'application/json' });
    const textRead = vi.fn().mockResolvedValue('{}');
    Object.defineProperty(oversized, 'text', { configurable: true, value: textRead });
    await user.upload(screen.getByLabelText('Backup JSON file'), oversized);
    expect(await screen.findByRole('alert')).toHaveTextContent('This file is larger than the 10 MB backup limit.');
    expect(textRead).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Restore backup' })).toBeDisabled();
  });

  it('prepares a JSON download with a dated filename and announces success', async () => {
    const user = userEvent.setup();
    const createDescriptor = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
    const revokeDescriptor = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL');
    const createObjectURL = vi.fn((blob: Blob) => blob.type === 'application/json' ? 'blob:backup-test' : 'blob:unexpected');
    const revokeObjectURL = vi.fn((url: string) => { expect(url).toBe('blob:backup-test'); });
    let downloadedName = '';
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, writable: true, value: createObjectURL });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, writable: true, value: revokeObjectURL });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      downloadedName = this.download;
    });
    try {
      renderBackupPage();
      await user.click(screen.getByRole('button', { name: 'Download backup file' }));
      expect(createObjectURL).toHaveBeenCalledOnce();
      expect(createObjectURL.mock.calls[0]?.[0]).toBeInstanceOf(Blob);
      expect(click).toHaveBeenCalledOnce();
      expect(downloadedName).toMatch(/^interactive-guides-backup-\d{4}-\d{2}-\d{2}\.json$/);
      expect(await screen.findByRole('status')).toHaveTextContent('Backup file prepared for download.');
      await waitFor(() => expect(revokeObjectURL).toHaveBeenCalledWith('blob:backup-test'));
    } finally {
      if (createDescriptor) Object.defineProperty(URL, 'createObjectURL', createDescriptor);
      else Reflect.deleteProperty(URL, 'createObjectURL');
      if (revokeDescriptor) Object.defineProperty(URL, 'revokeObjectURL', revokeDescriptor);
      else Reflect.deleteProperty(URL, 'revokeObjectURL');
    }
  });
  it('preserves stored values and active stores when restore fails but rollback succeeds', async () => {
    const user = userEvent.setup();
    const file = createBackupFileWithCompletedLesson();
    const previous = seedPreviousStorageSnapshot();
    setExistingInMemoryProgress();
    const originalSetItem = localStorage.setItem.bind(localStorage);
    let failedNotesWrite = false;
    vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
      if (key === STORAGE_KEYS.NOTES && !failedNotesWrite) {
        failedNotesWrite = true;
        throw new DOMException('Quota exceeded', 'QuotaExceededError');
      }
      originalSetItem(key, value);
    });

    renderBackupPage();
    await user.upload(screen.getByLabelText('Backup JSON file'), file);
    expect(await screen.findByRole('heading', { name: 'Backup contents' })).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: /I understand that restoring replaces/ }));
    await user.click(screen.getByRole('button', { name: 'Restore backup' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('The restore could not be saved. Existing local data has been kept.');
    for (const [key, value] of previous) expect(localStorage.getItem(key)).toBe(value);
    expect(useProgressStore.getState().lessons['current-only']?.status).toBe('in-progress');
    expect(useProgressStore.getState().lessons['backup-target']).toBeUndefined();
  });

  it('shows a recovery warning if restore and rollback both fail', async () => {
    const user = userEvent.setup();
    const file = createBackupFileWithCompletedLesson();
    const previous = seedPreviousStorageSnapshot();
    setExistingInMemoryProgress();
    const originalSetItem = localStorage.setItem.bind(localStorage);
    let failedNotesWrite = false;
    let failedProgressRollback = false;
    vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
      if (key === STORAGE_KEYS.NOTES && !failedNotesWrite) {
        failedNotesWrite = true;
        throw new DOMException('Quota exceeded', 'QuotaExceededError');
      }
      if (key === STORAGE_KEYS.PROGRESS && failedNotesWrite && !failedProgressRollback) {
        failedProgressRollback = true;
        throw new DOMException('Quota exceeded while rolling back', 'QuotaExceededError');
      }
      originalSetItem(key, value);
    });

    renderBackupPage();
    await user.upload(screen.getByLabelText('Backup JSON file'), file);
    expect(await screen.findByRole('heading', { name: 'Backup contents' })).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: /I understand that restoring replaces/ }));
    await user.click(screen.getByRole('button', { name: 'Restore backup' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('A storage write and the automatic rollback both failed. Do not close this tab; immediately download whatever data is still readable and check browser storage.');
    expect(failedNotesWrite).toBe(true);
    expect(failedProgressRollback).toBe(true);
    expect(localStorage.getItem(STORAGE_KEYS.PROGRESS)).not.toBe(previous.get(STORAGE_KEYS.PROGRESS));
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) ?? '{}').data.lessons['backup-target'].status).toBe('completed');
    expect(useProgressStore.getState().lessons['current-only']?.status).toBe('in-progress');
    expect(useProgressStore.getState().lessons['backup-target']).toBeUndefined();
  });
  it('ignores a slower file read after a newer file has been selected', async () => {
    const user = userEvent.setup();
    renderBackupPage();
    const stale = createPendingReadableFile('stale-invalid.json');
    const fileInput = screen.getByLabelText('Backup JSON file');
    await user.upload(fileInput, stale.file);
    await waitFor(() => expect(stale.text).toHaveBeenCalledOnce());
    await user.upload(fileInput, createBackupFileWithCompletedLesson());
    expect(await screen.findByRole('heading', { name: 'Backup contents' })).toBeInTheDocument();
    expect(screen.getByText('Selected file: learning-backup.json')).toBeInTheDocument();
    stale.resolve('{not json');
    await waitFor(async () => {
      await expect(stale.text.mock.results[0]?.value).resolves.toBe('{not json');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByText('Selected file: learning-backup.json')).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent('The backup is valid. Review its contents');
    });
  });
});
