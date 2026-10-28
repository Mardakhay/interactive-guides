import { useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { getCategories, getLessons, getLessonById, getCategoryById } from '@/features/content';
import { getStructuredLessonIds, getStructuredLessonMetadata } from '@/content/repository';
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
  const query = useSearchStore((s) => s.query);
  const filter = useSearchStore((s) => s.filter);
  const setQuery = useSearchStore((s) => s.setQuery);
  const setFilter = useSearchStore((s) => s.setFilter);

  const noteLessons = useNoteStore((s) => s.lessons);

  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY_MS);

  const searchableContent = useMemo<SearchableContent>(() => {
    const categories = getCategories();
    const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

    const lessons: SearchableLesson[] = getLessons().map((l) => ({
      id: l.id,
      title: l.title,
      description: l.description,
      categoryId: l.categoryId,
      category: categoryMap.get(l.categoryId) ?? '',
      difficulty: l.difficulty,
      durationMinutes: l.durationMinutes,
    }));
    const structuredCategoryName = locale === 'ru' ? 'Структурированная программа' : 'Structured curriculum';
    for (const id of getStructuredLessonIds()) {
      const structured = getStructuredLessonMetadata(id, locale);
      if (!structured) continue;
      lessons.push({
        id: structured.id,
        title: structured.title,
        description: '',
        categoryId: 'structured-curriculum',
        category: structuredCategoryName,
        difficulty: '',
        durationMinutes: 0,
        path: `/${locale}/structured-lessons/${structured.id}`,
      });
    }

    const courses: SearchableCourse[] = [
      ...categories.map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
      })),
      {
        id: 'structured-curriculum',
        name: structuredCategoryName,
        description: locale === 'ru'
          ? 'Каноническая структурированная учебная программа на русском и английском языках.'
          : 'The canonical structured learning curriculum in English and Russian.',
        path: `/${locale}/structured-lessons`,
      },
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
          path: `/${locale}/structured-lessons/${structured.id}`,
        } satisfies SearchableNote;
      })
      .filter((n): n is SearchableNote => n !== null);

    return { lessons, courses, notes };
  }, [noteLessons, locale]);

  const results = useMemo(
    () => search({ content: searchableContent, query: debouncedQuery, filter }),
    [searchableContent, debouncedQuery, filter],
  );

  const counts = useMemo(() => getResultCounts(results), [results]);

  const terms = useMemo(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) return [];
    return trimmed
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 0);
  }, [debouncedQuery]);

  const hasQuery = query.trim().length >= MIN_QUERY_LENGTH;
  const isDebouncing = query !== debouncedQuery && hasQuery;

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

          {isDebouncing ? (
            <p className="py-8 text-center text-sm text-neutral-500">{translate(locale, 'searching')}</p>
          ) : results.length === 0 ? (
            <EmptyState
              title={translate(locale, 'noSearchResultsTitle')}
              message={translate(locale, 'noSearchResultsMessage', { query: debouncedQuery })}
              icon={SearchIcon}
            />
          ) : (
            <>
              <p className="text-sm text-neutral-500">
                {formatResultCount(locale, results.length)}
              </p>
              <SearchResults results={results} terms={terms} locale={locale} />
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
