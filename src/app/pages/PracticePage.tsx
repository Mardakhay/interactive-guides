import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, FileCode2, Search } from 'lucide-react';
import { getStructuredPracticeExercises, type StructuredPracticeExercise } from '@/content';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';
import { EmptyState } from '@/components/feedback';
import { translate, useUiLocale } from '@/features/localization';

type PracticeFilter = 'all' | 'drafts' | 'self-review';

function getExerciseKey(exercise: StructuredPracticeExercise): string {
  return exercise.lessonId + '::' + exercise.exerciseId;
}

export default function PracticePage() {
  const locale = useUiLocale();
  const [exercises, setExercises] = useState<StructuredPracticeExercise[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<PracticeFilter>('all');
  const codeDrafts = useStructuredLearningStore((state) => state.codeDrafts);
  const practiceChecklists = useStructuredLearningStore((state) => state.practiceChecklists);

  useEffect(() => {
    let active = true;
    setExercises(null);
    setLoadError(false);
    void getStructuredPracticeExercises(locale)
      .then((items) => {
        if (active) setExercises(items);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => { active = false; };
  }, [locale, retry]);

  const activity = useMemo(() => (exercises ?? []).map((exercise) => {
    const key = getExerciseKey(exercise);
    const draft = codeDrafts[key];
    const checkedCriteria = new Set(
      (practiceChecklists[key]?.checkedCriteria ?? [])
        .filter((index) => Number.isInteger(index) && index >= 0 && index < exercise.successCriteria.length),
    );
    return { exercise, draft, checkedCount: checkedCriteria.size, key };
  }), [exercises, codeDrafts, practiceChecklists]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return activity.filter(({ exercise, draft, checkedCount }) => {
      const matchesFilter = filter === 'all'
        || (filter === 'drafts' && draft !== undefined)
        || (filter === 'self-review' && checkedCount > 0);
      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;
      const searchable = [
        exercise.title,
        exercise.lessonTitle,
        exercise.context,
        exercise.language,
        ...exercise.instructions,
        ...exercise.requirements,
        ...exercise.successCriteria,
      ].join(' ').toLocaleLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [activity, filter, query]);

  const draftCount = activity.filter((item) => item.draft !== undefined).length;
  const reviewedCriteriaCount = activity.reduce((total, item) => total + item.checkedCount, 0);
  const criteriaTotal = activity.reduce((total, item) => total + item.exercise.successCriteria.length, 0);

  const copy = {
    title: translate(locale, 'practiceTitle'),
    description: translate(locale, 'practiceDescription'),
    activityNote: translate(locale, 'practiceActivityNote'),
    pilotTitle: translate(locale, 'practicePilotTitle'),
    pilotNote: translate(locale, 'practicePilotNote'),
    loading: translate(locale, 'practiceLoading'),
    loadError: translate(locale, 'practiceLoadError'),
    retry: translate(locale, 'practiceRetry'),
    totalExercises: translate(locale, 'practiceTotalExercises'),
    savedDrafts: translate(locale, 'practiceSavedDrafts'),
    reviewedCriteria: translate(locale, 'practiceReviewedCriteria'),
    search: translate(locale, 'practiceSearch'),
    searchPlaceholder: translate(locale, 'practiceSearchPlaceholder'),
    filter: translate(locale, 'practiceFilter'),
    all: translate(locale, 'practiceAll'),
    drafts: translate(locale, 'practiceDrafts'),
    selfReview: translate(locale, 'practiceSelfReview'),
    instructions: translate(locale, 'practiceInstructions'),
    requirements: translate(locale, 'practiceRequirements'),
    language: translate(locale, 'practiceLanguage'),
    draftSaved: translate(locale, 'practiceDraftSaved'),
    noDraft: translate(locale, 'practiceNoDraft'),
    criteria: translate(locale, 'practiceCriteria'),
    open: translate(locale, 'practiceOpenExercise'),
    noResultsTitle: translate(locale, 'practiceNoResultsTitle'),
    noResultsMessage: translate(locale, 'practiceNoResultsMessage'),
    noExercisesTitle: translate(locale, 'practiceEmptyTitle'),
    noExercisesMessage: translate(locale, 'practiceEmptyMessage'),
  };

  if (exercises === null && !loadError) {
    return <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6"><p role="status" className="rounded-xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">{copy.loading}</p></main>;
  }

  if (loadError) {
    return (
      <main className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold text-neutral-950">{copy.title}</h1>
        <div role="alert" className="rounded-xl border border-error-200 bg-white p-5 text-sm text-neutral-700">
          <p>{copy.loadError}</p>
          <button type="button" onClick={() => setRetry((value) => value + 1)} className="mt-3 inline-flex min-h-10 items-center rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">{copy.retry}</button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary-700">
          <Code2 className="h-5 w-5" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-wider">{locale === 'ru' ? 'Учебная практика' : 'Learning practice'}</p>
        </div>
        <h1 className="text-2xl font-semibold text-neutral-950 sm:text-3xl">{copy.title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-neutral-600">{copy.description}</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3" aria-label={locale === 'ru' ? 'Сводка практики' : 'Practice summary'}>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs text-neutral-500">{copy.totalExercises}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-neutral-950">{activity.length}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs text-neutral-500">{copy.savedDrafts}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-neutral-950">{draftCount}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs text-neutral-500">{copy.reviewedCriteria}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-neutral-950">{reviewedCriteriaCount} / {criteriaTotal}</p>
        </div>
      </section>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
        <h2 className="text-sm font-semibold">{copy.pilotTitle}</h2>
        <p className="mt-1 text-sm leading-6">{copy.pilotNote}</p>
      </div>

      <p className="text-xs leading-5 text-neutral-500">{copy.activityNote}</p>

      <section className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_15rem]" aria-label={locale === 'ru' ? 'Поиск и фильтр заданий' : 'Exercise search and filters'}>
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} aria-label={copy.search} placeholder={copy.searchPlaceholder} className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white pl-10 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700" />
        </label>
        <label className="block">
          <span className="sr-only">{copy.filter}</span>
          <select value={filter} onChange={(event) => setFilter(event.target.value as PracticeFilter)} aria-label={copy.filter} className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">
            <option value="all">{copy.all}</option>
            <option value="drafts">{copy.drafts}</option>
            <option value="self-review">{copy.selfReview}</option>
          </select>
        </label>
      </section>

      {filtered.length === 0 ? (
        <EmptyState title={activity.length === 0 ? copy.noExercisesTitle : copy.noResultsTitle} message={activity.length === 0 ? copy.noExercisesMessage : copy.noResultsMessage} icon={FileCode2} />
      ) : (
        <div className="space-y-4">
          {filtered.map(({ exercise, draft, checkedCount, key }) => (
            <article key={key} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">{exercise.lessonTitle}</p>
                  <h2 className="mt-1 text-lg font-semibold text-neutral-950">{exercise.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{exercise.context}</p>
                </div>
                <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700" >{copy.language}: {exercise.language}</span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{copy.instructions}</h3>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6 text-neutral-700">
                    {exercise.instructions.slice(0, 3).map((instruction, index) => <li key={index}>{instruction}</li>)}
                  </ol>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{copy.requirements}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-700">
                    {exercise.requirements.slice(0, 3).map((requirement, index) => <li key={index}>{requirement}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-neutral-100 pt-4 text-xs text-neutral-600">
                <span className={draft !== undefined ? 'font-semibold text-primary-700' : ''}>{draft !== undefined ? copy.draftSaved : copy.noDraft}</span>
                <span>{copy.criteria}: {checkedCount} / {exercise.successCriteria.length}</span>
                {draft?.updatedAt && Number.isFinite(Date.parse(draft.updatedAt)) && <time dateTime={draft.updatedAt}>{new Date(draft.updatedAt).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US')}</time>}
              </div>
              <div className="mt-4">
                <Link to={'/' + locale + '/structured-lessons/' + exercise.lessonId + '#' + exercise.exerciseId} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">
                  {copy.open}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
