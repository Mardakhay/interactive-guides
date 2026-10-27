import { useState, type ChangeEvent } from 'react';
import { AlertTriangle, CheckCircle2, Database, Download, FileUp, ShieldCheck } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useBookmarkStore } from '@/features/bookmarks/store';
import { useNoteStore } from '@/features/notes/store';
import { translate, useUiLocale, type TranslationKey } from '@/features/localization';
import { BackupError, MAX_BACKUP_FILE_BYTES, createLocalBackup, getBackupSummary, parseBackup, restoreLocalBackup, serializeBackup, type BackupPayload, type BackupSummary } from '@/features/backup';
import { useProgressStore } from '@/features/progress/store';
import { useQuizResultsStore } from '@/features/quizzes/store';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';

type Notice = { kind: 'success' | 'error'; key: TranslationKey };

function getErrorKey(error: unknown): TranslationKey {
  if (!(error instanceof BackupError)) return 'backupUnexpectedError';
  switch (error.code) {
    case 'file-too-large': return 'backupFileTooLarge';
    case 'invalid-json': return 'backupInvalidJson';
    case 'unsupported-format': return 'backupUnsupportedFormat';
    case 'invalid-backup': return 'backupInvalidData';
    case 'stored-data-invalid': return 'backupStoredDataInvalid';
    case 'storage-unavailable':
    case 'storage-read-failed': return 'backupStorageUnavailable';
    case 'storage-write-failed': return 'backupRestoreFailed';
    case 'rollback-failed': return 'backupRollbackFailed';
  }
}

function summaryItems(summary: BackupSummary): { key: TranslationKey; count: number }[] {
  return [
    { key: 'backupProgressRecords', count: summary.progressRecords },
    { key: 'backupCompletedLessons', count: summary.completedLessons },
    { key: 'backupBookmarks', count: summary.bookmarks },
    { key: 'backupNotes', count: summary.notes },
    { key: 'backupQuizResults', count: summary.quizResults },
    { key: 'backupStructuredAttempts', count: summary.structuredQuizAttempts },
    { key: 'backupCodeDrafts', count: summary.codeDrafts },
    { key: 'backupPracticeChecklists', count: summary.practiceChecklists },
    { key: 'backupSectionProgress', count: summary.sectionProgress },
  ];
}

export default function BackupPage() {
  const locale = useUiLocale();
  const [rawBackup, setRawBackup] = useState<string | null>(null);
  const [preview, setPreview] = useState<BackupPayload | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  function downloadBackup(): void {
    try {
      const backup = createLocalBackup();
      const blob = new Blob([serializeBackup(backup)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `interactive-guides-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
      setNotice({ kind: 'success', key: 'backupExportSuccess' });
    } catch (error) {
      setNotice({ kind: 'error', key: getErrorKey(error) });
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    setRawBackup(null);
    setPreview(null);
    setSelectedFileName(file?.name ?? null);
    setConfirmReplace(false);
    setNotice(null);
    if (!file) return;
    if (file.size > MAX_BACKUP_FILE_BYTES) {
      setNotice({ kind: 'error', key: 'backupFileTooLarge' });
      return;
    }
    try {
      const raw = await file.text();
      const parsed = parseBackup(raw);
      setRawBackup(raw);
      setPreview(parsed);
      setNotice({ kind: 'success', key: 'backupValidated' });
    } catch (error) {
      setSelectedFileName(file.name);
      setNotice({ kind: 'error', key: getErrorKey(error) });
    }
  }

  function restoreBackup(): void {
    if (!rawBackup || !preview || !confirmReplace) return;
    try {
      const restored = restoreLocalBackup(rawBackup);
      useProgressStore.setState(restored.data.progress);
      useBookmarkStore.setState(restored.data.bookmarks);
      useNoteStore.setState(restored.data.notes);
      useQuizResultsStore.setState(restored.data.quizResults);
      useStructuredLearningStore.setState(restored.data.structuredLearning);
      setPreview(restored);
      setConfirmReplace(false);
      setNotice({ kind: 'success', key: 'backupRestoreSuccess' });
    } catch (error) {
      setNotice({ kind: 'error', key: getErrorKey(error) });
    }
  }

  const previewSummary = preview ? getBackupSummary(preview) : null;
  const inputId = 'learning-data-backup-file';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary-700">
          <Database className="h-5 w-5" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-wide">{translate(locale, 'dataBackup')}</p>
        </div>
        <h1 className="text-2xl font-semibold text-neutral-950">{translate(locale, 'backupTitle')}</h1>
        <p className="text-sm leading-6 text-neutral-600">{translate(locale, 'backupDescription')}</p>
      </header>

      <Card className="space-y-4 p-5">
        <div className="flex items-start gap-3">
          <Download className="mt-1 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-neutral-900">{translate(locale, 'backupExportHeading')}</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{translate(locale, 'backupExportDescription')}</p>
          </div>
        </div>
        <Button onClick={downloadBackup}><Download className="h-4 w-4" aria-hidden="true" />{translate(locale, 'backupDownloadButton')}</Button>
      </Card>

      <Card className="space-y-4 p-5">
        <div className="flex items-start gap-3">
          <FileUp className="mt-1 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-neutral-900">{translate(locale, 'backupImportHeading')}</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{translate(locale, 'backupImportDescription')}</p>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-800">{translate(locale, 'backupChooseFile')}</label>
          <input id={inputId} type="file" accept="application/json,.json" onChange={(event) => void handleFileChange(event)} className="block w-full rounded-lg border border-neutral-300 bg-white p-2 text-sm text-neutral-700 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-sm file:font-medium" aria-describedby={`${inputId}-help`} />
          <p id={`${inputId}-help`} className="text-xs leading-5 text-neutral-500">{translate(locale, 'backupFileHelp')}</p>
          {selectedFileName && <p className="text-sm text-neutral-700">{translate(locale, 'backupSelectedFile', { fileName: selectedFileName })}</p>}
        </div>
        {previewSummary && preview && (
          <section aria-labelledby="backup-preview-heading" className="space-y-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <h3 id="backup-preview-heading" className="font-semibold text-neutral-900">{translate(locale, 'backupPreviewHeading')}</h3>
            <p className="text-sm text-neutral-600">{translate(locale, 'backupCreatedAt', { date: new Date(preview.createdAt).toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US') })}</p>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {summaryItems(previewSummary).map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm">
                  <dt className="text-neutral-600">{translate(locale, item.key)}</dt>
                  <dd className="font-semibold tabular-nums text-neutral-900">{item.count}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <div className="space-y-3 border-t border-neutral-200 pt-4">
          <div className="flex items-start gap-2 rounded-lg bg-warning-50 p-3 text-sm text-warning-900">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>{translate(locale, 'backupReplaceWarning')}</p>
          </div>
          <label className="flex items-start gap-3 text-sm text-neutral-800">
            <input type="checkbox" checked={confirmReplace} onChange={(event) => setConfirmReplace(event.target.checked)} disabled={!preview} className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600" />
            <span>{translate(locale, 'backupConfirmReplace')}</span>
          </label>
          <Button onClick={restoreBackup} disabled={!preview || !rawBackup || !confirmReplace}><ShieldCheck className="h-4 w-4" aria-hidden="true" />{translate(locale, 'backupRestoreButton')}</Button>
        </div>
      </Card>

      {notice && (
        <div className={notice.kind === 'error' ? 'rounded-lg border border-error-200 bg-error-50 p-4 text-sm text-error-800' : 'rounded-lg border border-success-200 bg-success-50 p-4 text-sm text-success-800'} role={notice.kind === 'error' ? 'alert' : 'status'}>
          {notice.kind === 'success' && <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />}
          {translate(locale, notice.key)}
        </div>
      )}
    </div>
  );
}