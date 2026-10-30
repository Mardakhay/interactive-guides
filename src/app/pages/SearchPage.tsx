import { useEffect, useMemo, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { getCategories, getLessons, getLessonById, getCategoryById } from '@/features/content';
import { getBootcampCurriculum, getStructuredLessonMetadata, getStructuredLessonSearchDocuments } from '@/content/repository';
import { useNoteStore } from '@/features/notes';
import { useSearchStore, search, getResultCounts } from '@/features/search';
import { SearchBar, FilterTabs, SearchResults } from '@/features/search';
import { EmptyState } from '@/components/feedback';
import { useDebounce } from '@/hooks/useDebounce';
import type { SearchableContent, SearchableLesson, SearchableCourse, SearchableNote } from '@/features/search';
import { formatResultCount, translate, useUiLocale } from '@/features/localization';

const DEBOUNCE_DELAY_MS = 200;
const MIN_QUERY_LENGTH = 2;

export default function SearchPage() {
  const locale = useUiLocale();
  const query = useSearchStore((state) => state.query);
  const filter = useSearchStore((state) => state.filter);
  const setQuery = useSearchStore((state) => state.setQuery);
  const setFilter = useSearchStore((state) => state.setFilter);
  const noteLessons = useNoteStore((state) => state.lessons);
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY_MS);
  const searchIndexNeeded = debouncedQuery.trim().length >= MIN_QUERY_LENGTH;

  const [structuredSearchLessons, setStructuredSearchLessons] = useState<SearchableLesson[] | null>(null);
  const [searchIndexError, setSearchIndexError] = useState(false);
  const [searchIndexRetry, setSearchIndexRetry] = useState(0);

  useEffect(() => {
    let active = true;
    if (!searchIndexNeeded) {
      setStructuredSearchLessons(null);
      setSearchIndexError(false);
      return () => { active = false; };
    }

    setStructuredSearchLessons(null);
    setSearchIndexError(false);
    void getStructuredLessonSearchDocuments(locale)
      .then((documents) => {
        if (!active) return;
        setStructuredSearchLessons(documents.map((document) => ({
          id: document.id,
          title: document.title,
          description: document.description,
          categoryId: 'structured-curriculum',
          category: locale === 'ru' ? 'Структурированная программа' : 'Structured curriculum',
          difficulty: document.difficulty,
          durationMinutes: document.estimatedMinutes,
          path: '/' + locale + '/structured-lessons/' + document.id,
          searchText: document.searchText,
          tags: document.tags,
        })));
      })
      .catch(() => {
        if (active) setSearchIndexError(true);
      });

    return () => { active = false; };
  }, [locale, searchIndexNeeded, searchIndexRetry]);

  const searchableContent = useMemo<SearchableContent>(() => {
    const categories = getCategories();
    const categoryMap = new Map(categories.map((category) => [category.id, category.name]));
    const structuredCategoryName = locale === 'ru' ? 'Структурированная программа' : 'Structured curriculum';

    const lessons: SearchableLesson[] = [
      ...getLessons().map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        categoryId: lesson.categoryId,
        category: categoryMap.get(lesson.categoryId) ?? '',
        difficulty: lesson.difficulty,
        durationMinutes: lesson.durationMinutes,
      })),
      ...(structuredSearchLessons ?? []),
    ];

    const curriculum = getBootcampCurriculum(locale);
    const curriculumPath = '/' + locale + '/structured-lessons';
    const courses: SearchableCourse[] = [
      ...categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
      })),
      {
        id: 'structured-curriculum',
        name: structuredCategoryName,
        description: locale === 'ru'
          ? 'Каноническая структурированная учебная программа на русском и английском языках.'
          : 'The canonical structured learning curriculum in English and Russian.',
        path: curriculumPath,
      },
      ...curriculum.months.flatMap((month) => [
        {
          id: 'curriculum-month-' + month.id,
          name: month.title,
          description: [
            month.goal,
            ...month.weeks.flatMap((week) => [...week.topics, ...week.practice, week.project ?? '']),
          ].filter(Boolean).join(' '),
          path: curriculumPath,
        },
        ...month.weeks.map((week) => ({
          id: 'curriculum-week-' + week.id,
          name: (locale === 'ru' ? 'Неделя ' : 'Week ') + week.number + ': ' + week.title,
          description: [...week.topics, ...week.practice, week.project ?? ''].filter(Boolean).join(' '),
          path: curriculumPath,
        })),
      ]),
      ...curriculum.supplementaryTracks.map((track) => ({
        id: 'curriculum-track-' + track.id,
        name: track.title,
        description: [track.note, ...track.topics].join(' '),
        path: curriculumPath,
      })),
    ];

    const notes: SearchableNote[] = Object.entries(noteLessons)
      .map(([lessonId, entry]) => {
        const lesson = getLessonById(lessonId);
        if (lesson) {
          const category = getCategoryById(lesson.categoryId);
          return {
            lessonId,
            lessonTitle: lesson.title,
            categoryId: lesson.categoryId,
            category: category?.name ?? '',
            content: entry.content,
          } satisfies SearchableNote;
        }
        const structured = getStructuredLessonMetadata(lessonId, locale);
        if (!structured) return null;
        return {
          lessonId,
          lessonTitle: structured.title,
          categoryId: 'structured-curriculum',
          category: structuredCategoryName,
          content: entry.content,
          path: '/' + locale + '/structured-lessons/' + structured.id,
        } satisfies SearchableNote;
      })
      .filter((note): note is SearchableNote => note !== null);

    return { lessons, courses, notes };
  }, [noteLessons, locale, structuredSearchLessons]);

  const results = useMemo(
    () => search({ content: searchableContent, query: debouncedQuery, filter }),
    [searchableContent, debouncedQuery, filter],
  );
  const counts = useMemo(() => getResultCounts(results), [results]);
  const terms = useMemo(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) return [];
    return trimmed.toLowerCase().split(/\s+/).filter((term) => term.length > 0);
  }, [debouncedQuery]);

  const hasQuery = query.trim().length >= MIN_QUERY_LENGTH;
  const isDebouncing = query !== debouncedQuery && hasQuery;
  const isLoadingSearchIndex = searchIndexNeeded && structuredSearchLessons === null && !searchIndexError;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">{translate(locale, 'search')}</h1>
        <p className="text-neutral-600">{translate(locale, 'searchPageDescription')}</p>
      </div>

      <SearchBar value={query} onChange={setQuery} autoFocus locale={locale} />

      {hasQuery && (
        <>
          <FilterTabs filter={filter} counts={counts} onChange={setFilter} locale={locale} />
          {isDebouncing || isLoadingSearchIndex ? (
            <p role="status" className="py-8 text-center text-sm text-neutral-500">{translate(locale, 'searching')}</p>
          ) : (
            <>
              {searchIndexError && (
                <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-warning-200 bg-warning-50 p-3 text-sm text-warning-900">
                  <span>{translate(locale, 'searchIndexError')}</span>
                  <button type="button" onClick={() => setSearchIndexRetry((value) => value + 1)} className="min-h-9 rounded-lg border border-warning-300 px-3 font-semibold hover:bg-warning-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-700">
                    {translate(locale, 'retrySearch')}
                  </button>
                </div>
              )}
              {results.length === 0 ? (
                <EmptyState
                  title={translate(locale, 'noSearchResultsTitle')}
                  message={translate(locale, 'noSearchResultsMessage', { query: debouncedQuery })}
                  icon={SearchIcon}
                />
              ) : (
                <>
                  <p className="text-sm text-neutral-500">{formatResultCount(locale, results.length)}</p>
                  <SearchResults results={results} terms={terms} locale={locale} />
                </>
              )}
            </>
          )}
        </>
      )}

      {!hasQuery && (
        <EmptyState
          title={translate(locale, 'searchStartTitle')}
          message={translate(locale, 'searchStartMessage')}
          icon={SearchIcon}
        />
      )}
    </div>
  );
}
