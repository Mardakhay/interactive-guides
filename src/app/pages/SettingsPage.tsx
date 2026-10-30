import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CloudOff, Database, Globe2, Monitor, Wifi, WifiOff } from 'lucide-react';
import { ROUTE_PATHS } from '@/app/router/routes';
import { useBookmarkStore } from '@/features/bookmarks/store';
import { useNoteStore } from '@/features/notes/store';
import { translate, useLocaleStore, useUiLocale } from '@/features/localization';
import { useProgressStore } from '@/features/progress/store';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';

export default function SettingsPage() {
  const locale = useUiLocale();
  const preferredLocale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);
  const progress = useProgressStore((state) => state.lessons);
  const bookmarks = useBookmarkStore((state) => state.lessons);
  const notes = useNoteStore((state) => state.lessons);
  const codeDrafts = useStructuredLearningStore((state) => state.codeDrafts);
  const quizAttempts = useStructuredLearningStore((state) => state.quizAttempts);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const updateNetworkStatus = () => setIsOnline(navigator.onLine);
    updateNetworkStatus();
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  const summary = useMemo(() => ({
    progress: Object.keys(progress).length,
    completed: Object.values(progress).filter((entry) => entry.status === 'completed').length,
    bookmarks: Object.keys(bookmarks).length,
    notes: Object.keys(notes).length,
    drafts: Object.keys(codeDrafts).length,
    attempts: Object.values(quizAttempts).reduce((total, entries) => total + entries.length, 0),
  }), [progress, bookmarks, notes, codeDrafts, quizAttempts]);

  const copy = {
    english: translate(locale, 'settingsEnglish'),
    russian: translate(locale, 'settingsRussian'),
  };

  const dataItems = [
    { label: translate(locale, 'settingsProgressRecords'), value: summary.progress },
    { label: translate(locale, 'settingsCompletedRecords'), value: summary.completed },
    { label: translate(locale, 'settingsBookmarks'), value: summary.bookmarks },
    { label: translate(locale, 'settingsNotes'), value: summary.notes },
    { label: translate(locale, 'settingsDrafts'), value: summary.drafts },
    { label: translate(locale, 'settingsQuizAttempts'), value: summary.attempts },
  ];

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">{translate(locale, 'settings')}</p>
        <h1 className="text-2xl font-semibold text-neutral-950 sm:text-3xl">{translate(locale, 'settings')}</h1>
        <p className="max-w-3xl text-sm leading-6 text-neutral-600">{translate(locale, 'settingsDescription')}</p>
      </header>

      <section aria-labelledby="settings-language-heading" className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h2 id="settings-language-heading" className="text-lg font-semibold text-neutral-950">{translate(locale, 'settingsLanguageTitle')}</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{translate(locale, 'settingsLanguageDescription')}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(['en', 'ru'] as const).map((option) => {
                const selected = preferredLocale === option;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setLocale(option)}
                    className={selected
                      ? 'inline-flex min-h-10 items-center gap-2 rounded-lg border border-primary-700 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-800'
                      : 'inline-flex min-h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700'}
                  >
                    {option === 'en' ? copy.english : copy.russian}
                    {selected && <span className="text-xs font-medium">· {translate(locale, 'settingsSelected')}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="settings-network-heading" className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex items-start gap-3">
          {isOnline === false ? <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-warning-700" aria-hidden="true" /> : <Wifi className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />}
          <div className="min-w-0 flex-1">
            <h2 id="settings-network-heading" className="text-lg font-semibold text-neutral-950">{translate(locale, 'settingsNetworkTitle')}</h2>
            <p role="status" className="mt-1 text-sm font-medium text-neutral-800">
              {isOnline === null ? '—' : translate(locale, isOnline ? 'settingsOnline' : 'settingsOffline')}
            </p>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{translate(locale, 'settingsNetworkDescription')}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="settings-data-heading" className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <Database className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="settings-data-heading" className="text-lg font-semibold text-neutral-950">{translate(locale, 'settingsLocalDataTitle')}</h2>
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700">{translate(locale, 'settingsLocalOnlyBadge')}</span>
            </div>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{translate(locale, 'settingsLocalDataDescription')}</p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dataItems.map((item) => (
                <div key={item.label} className="rounded-xl bg-neutral-50 p-3">
                  <dt className="text-xs leading-5 text-neutral-600">{item.label}</dt>
                  <dd className="mt-1 text-xl font-semibold tabular-nums text-neutral-950">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="settings-backup-heading" className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <Database className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h2 id="settings-backup-heading" className="text-lg font-semibold text-neutral-950">{translate(locale, 'settingsBackupTitle')}</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{translate(locale, 'settingsBackupDescription')}</p>
            <Link to={ROUTE_PATHS.BACKUP} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">
              {translate(locale, 'settingsOpenBackup')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="settings-cloud-heading" className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <CloudOff className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" aria-hidden="true" />
          <div>
            <h2 id="settings-cloud-heading" className="text-lg font-semibold text-neutral-950">{translate(locale, 'settingsCloudTitle')}</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{translate(locale, 'settingsCloudUnavailable')}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="settings-appearance-heading" className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <Monitor className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" aria-hidden="true" />
          <div>
            <h2 id="settings-appearance-heading" className="text-lg font-semibold text-neutral-950">{translate(locale, 'settingsAppearanceTitle')}</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{translate(locale, 'settingsAppearanceUnavailable')}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
