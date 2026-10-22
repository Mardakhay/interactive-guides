import { useRef, useState, type ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDownToLine, ArrowLeft, ArrowUpFromLine, Database, Languages, ShieldCheck } from 'lucide-react';
import { ROUTE_PATHS } from '@/app/router/routes';
import { useBookmarkStore } from '@/features/bookmarks/store';
import { useNoteStore } from '@/features/notes/store';
import { useProgressStore } from '@/features/progress';
import { useQuizResultsStore } from '@/features/quizzes/store';
import {
  createLearningDataBackup,
  getBackupSummary,
  mergeLearningDataBackup,
  parseLearningDataBackup,
  type BackupSummary,
  type LearningDataBackup,
} from '@/features/data-portability/backup';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/content/repository';
import { useLocaleStore } from '@/stores/localeStore';

function isSupportedLocale(value: string | undefined): value is SupportedLocale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}

function SummaryList({ summary, locale }: { summary: BackupSummary; locale: SupportedLocale }) {
  const labels = locale === 'ru'
    ? [
        ['Отслеживаемые уроки', summary.trackedLessons],
        ['Закладки', summary.bookmarks],
        ['Заметки', summary.notes],
        ['Результаты старых квизов', summary.quizResults],
        ['Попытки новых квизов', summary.structuredQuizAttempts],
        ['Черновики кода', summary.codeDrafts],
        ['Чек-листы практики', summary.practiceChecklists],
      ] as const
    : [
        ['Tracked lessons', summary.trackedLessons],
        ['Bookmarks', summary.bookmarks],
        ['Notes', summary.notes],
        ['Legacy quiz results', summary.quizResults],
        ['Structured quiz attempts', summary.structuredQuizAttempts],
        ['Code drafts', summary.codeDrafts],
        ['Practice checklists', summary.practiceChecklists],
      ] as const;

  return (
    <dl className="mt-4 grid gap-3 sm:grid-cols-2">
      {labels.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2.5">
          <dt className="text-sm text-neutral-600">{label}</dt>
          <dd className="text-sm font-semibold tabular-nums text-neutral-950">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function DataManagementPage() {
  const { locale: localeParam } = useParams<{ locale: string }>();
  const savedLocale = useLocaleStore((state) => state.locale);
  const locale: SupportedLocale = isSupportedLocale(localeParam) ? localeParam : savedLocale;
  const otherLocale: SupportedLocale = locale === 'en' ? 'ru' : 'en';
  const fileInput = useRef<HTMLInputElement>(null);
  const [pendingBackup, setPendingBackup] = useState<LearningDataBackup | null>(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const copy = locale === 'ru'
    ? {
        title: 'Резервная копия учебных данных',
        description: 'Сохрани прогресс, закладки, заметки, результаты квизов, попытки и черновики практики в файл, который можно перенести на другое устройство.',
        back: 'Назад к обучению',
        switchLanguage: 'English',
        exportTitle: 'Экспортировать данные',
        exportDescription: 'Создай JSON-файл со своими локальными учебными данными. Файл содержит личные заметки и черновики — храни его в безопасном месте.',
        exportButton: 'Скачать резервную копию',
        importTitle: 'Импортировать резервную копию',
        importDescription: 'Выбери ранее созданный файл Interactive Guides. Сначала содержимое проверяется; текущие данные не меняются до подтверждения.',
        chooseFile: 'Выбрать JSON-файл',
        mergeButton: 'Объединить с текущими данными',
        cancel: 'Отмена',
        mergeWarning: 'Импорт объединяет записи, а не очищает хранилище. Завершённый прогресс не откатывается, более новые заметки и черновики сохраняются, а история попыток квизов объединяется.',
        backupDate: 'Дата резервной копии',
        valid: 'Файл проверен. Просмотри состав данных и подтверди объединение.',
        exported: 'Резервная копия скачана.',
        imported: 'Данные объединены. Текущие локальные записи сохранены.',
        readError: 'Не удалось прочитать этот файл.',
        exportError: 'Не удалось создать резервную копию.',
        mergeError: 'Не удалось импортировать резервную копию.',
        merging: 'Объединение…',
        importSummary: 'Состав резервной копии',
        noFile: 'Выбери JSON-файл для импорта.',
        maxSize: 'Файл слишком большой. Максимальный размер — 10 МБ.',
      }
    : {
        title: 'Learning data backup',
        description: 'Export progress, bookmarks, notes, quiz results, attempts and practice drafts to a file you can move to another device.',
        back: 'Back to learning',
        switchLanguage: 'Русский',
        exportTitle: 'Export your data',
        exportDescription: 'Create a JSON file with your local learning data. It includes private notes and code drafts, so store the file somewhere safe.',
        exportButton: 'Download backup',
        importTitle: 'Import a backup',
        importDescription: 'Choose a previously exported Interactive Guides file. It is validated first; current data is unchanged until you confirm the merge.',
        chooseFile: 'Choose JSON file',
        mergeButton: 'Merge into current data',
        cancel: 'Cancel',
        mergeWarning: 'Import merges records instead of clearing storage. Completed progress is not downgraded, newer notes and drafts are kept, and quiz attempt history is combined.',
        backupDate: 'Backup date',
        valid: 'File validated. Review its contents and confirm the merge.',
        exported: 'Backup downloaded.',
        imported: 'Data merged. Existing local records were preserved.',
        readError: 'Could not read this file.',
        exportError: 'Could not create the backup.',
        mergeError: 'Could not import the backup.',
        merging: 'Merging…',
        importSummary: 'Backup contents',
        noFile: 'Choose a JSON file to import.',
        maxSize: 'This file is too large. The maximum size is 10 MB.',
      };

  const handleExport = () => {
    setError('');
    setNotice('');
    try {
      const backup = createLearningDataBackup(window.localStorage);
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'interactive-guides-backup-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => window.URL.revokeObjectURL(url), 0);
      setNotice(copy.exported);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : copy.exportError);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    setError('');
    setNotice('');
    if (file.size > 10 * 1024 * 1024) {
      setPendingBackup(null);
      setError(copy.maxSize);
      return;
    }

    setBusy(true);
    try {
      const parsed = parseLearningDataBackup(await file.text());
      setPendingBackup(parsed);
      setNotice(copy.valid);
    } catch (caught) {
      setPendingBackup(null);
      setError(caught instanceof Error ? caught.message : copy.readError);
    } finally {
      setBusy(false);
    }
  };

  const handleMerge = () => {
    if (!pendingBackup) {
      setError(copy.noFile);
      return;
    }

    setError('');
    setNotice('');
    setBusy(true);
    try {
      const result = mergeLearningDataBackup(window.localStorage, pendingBackup);

      useProgressStore.setState({
        lessons: result.data.progress.lessons,
        lastOpenedLessonId: result.data.progress.lastOpenedLessonId,
        lastOpenedAt: result.data.progress.lastOpenedAt,
      });
      useBookmarkStore.setState({ lessons: result.data.bookmarks.lessons });
      useNoteStore.setState({ lessons: result.data.notes.lessons });
      useQuizResultsStore.setState({ quizzes: result.data.quizResults.quizzes });
      useStructuredLearningStore.setState({
        quizAttempts: result.data.structuredLearning.quizAttempts,
        codeDrafts: result.data.structuredLearning.codeDrafts,
        practiceChecklists: result.data.structuredLearning.practiceChecklists,
      });

      setPendingBackup(null);
      setNotice(copy.imported);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : copy.mergeError);
    } finally {
      setBusy(false);
    }
  };

  const pendingSummary = pendingBackup ? getBackupSummary(pendingBackup) : null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to={ROUTE_PATHS.DASHBOARD} className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950">
          <ArrowLeft className="h-4 w-4" />
          {copy.back}
        </Link>
        <Link
          to={'/' + otherLocale + '/settings/data'}
          lang={otherLocale}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-700 transition hover:border-primary-300 hover:text-primary-700"
        >
          <Languages className="h-4 w-4" />
          {copy.switchLanguage}
        </Link>
      </div>

      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">Interactive Guides</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">{copy.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-600">{copy.description}</p>
      </header>

      {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</p>}
      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-subtle sm:p-6" aria-labelledby="export-data-heading">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><ArrowDownToLine className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <h2 id="export-data-heading" className="text-lg font-semibold text-neutral-950">{copy.exportTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{copy.exportDescription}</p>
            <button
              type="button"
              onClick={handleExport}
              disabled={busy}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 disabled:opacity-50"
            >
              <ArrowDownToLine className="h-4 w-4" />
              {copy.exportButton}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-subtle sm:p-6" aria-labelledby="import-data-heading">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><ArrowUpFromLine className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <h2 id="import-data-heading" className="text-lg font-semibold text-neutral-950">{copy.importTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{copy.importDescription}</p>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              onChange={handleFileChange}
              className="sr-only"
              aria-label={copy.chooseFile}
            />
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={busy}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 disabled:opacity-50"
            >
              <ArrowUpFromLine className="h-4 w-4" />
              {busy ? copy.merging : copy.chooseFile}
            </button>

            {pendingBackup && pendingSummary && (
              <div className="mt-5 rounded-xl border border-primary-200 bg-primary-50/50 p-4">
                <div className="flex items-start gap-3">
                  <Database className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" />
                  <div>
                    <h3 className="font-semibold text-neutral-950">{copy.importSummary}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{copy.backupDate}: {new Date(pendingBackup.exportedAt).toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US')}</p>
                  </div>
                </div>
                <SummaryList summary={pendingSummary} locale={locale} />
                <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-neutral-700">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {copy.mergeWarning}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleMerge}
                    disabled={busy}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 disabled:opacity-50"
                  >
                    {copy.mergeButton}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingBackup(null)}
                    disabled={busy}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
                  >
                    {copy.cancel}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <p className="text-sm leading-6 text-neutral-500">
        {locale === 'ru'
          ? 'Все операции выполняются в браузере. Файл резервной копии не отправляется на сервер.'
          : 'All operations run in your browser. The backup file is not uploaded to a server.'}
      </p>
    </div>
  );
}
