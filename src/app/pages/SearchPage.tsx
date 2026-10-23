import { useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { getCategories, getLessons, getCategoryById } from '@/features/content';
import { useNoteStore } from '@/features/notes';
import { useSearchStore, search, getResultCounts } from '@/features/search';
import { SearchBar, FilterTabs, SearchResults } from '@/features/search';
import { EmptyState } from '@/components/feedback';
import { useDebounce } from '@/hooks/useDebounce';
import type { SearchableContent, SearchableLesson, SearchableCourse, SearchableNote } from '@/features/search';

const DEBOUNCE_DELAY_MS = 200;
const MIN_QUERY_LENGTH = 2;

export default function SearchPage() {
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

    const courses: SearchableCourse[] = categories.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
    }));

    const notes: SearchableNote[] = Object.entries(noteLessons)
      .map(([lessonId, entry]) => {
        const lesson = getLessons().find((l) => l.id === lessonId);
        if (!lesson) return null;
        const category = getCategoryById(lesson.categoryId);
        return {
          lessonId,
          lessonTitle: lesson.title,
          categoryId: lesson.categoryId,
          category: category?.name ?? '',
          content: entry.content,
        } satisfies SearchableNote;
      })
      .filter((n): n is SearchableNote => n !== null);

    return { lessons, courses, notes };
  }, [noteLessons]);

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
        <h1 className="text-2xl font-semibold text-neutral-900">Search</h1>
        <p className="text-neutral-600">Find lessons, courses, and your notes across the platform.</p>
      </div>

      <SearchBar value={query} onChange={setQuery} autoFocus />

      {hasQuery && (
        <>
          <FilterTabs filter={filter} counts={counts} onChange={setFilter} />

          {isDebouncing ? (
            <p className="py-8 text-center text-sm text-neutral-500">Searching…</p>
          ) : results.length === 0 ? (
            <EmptyState
              title="No results found"
              message={`Nothing matched "${debouncedQuery}". Try a different term or broaden your filter.`}
              icon={SearchIcon}
            />
          ) : (
            <>
              <p className="text-sm text-neutral-500">
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
              <SearchResults results={results} terms={terms} />
            </>
          )}
        </>
      )}

      {!hasQuery && (
        <EmptyState
          title="Start typing to search"
          message="Search across all lessons, courses, and your personal notes. Results update as you type."
          icon={SearchIcon}
        />
      )}
    </div>
  );
}
