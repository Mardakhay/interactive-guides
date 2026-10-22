import { useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { getCategories, getLessons, getCategoryById } from '@/features/content';
import { useNoteStore } from '@/features/notes';
import { useSearchStore, search, getResultCounts } from '@/features/search';
import { SearchBar, FilterTabs, SearchResults } from '@/features/search';
import { EmptyState } from '@/components/feedback';
import { useDebounce } from '@/hooks/useDebounce';
import type { SearchableContent, SearchableLesson, SearchableCourse, SearchableNote } from '@/features/search';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY, getCategoryCopy } from '@/lib/i18n';
import { getStructuredLesson, getStructuredLessonIds, getWeekForLesson } from '@/content/repository';

const DEBOUNCE_DELAY_MS = 200;
const MIN_QUERY_LENGTH = 2;

export default function SearchPage() {
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].searchPage;
  const query = useSearchStore((state) => state.query);
  const filter = useSearchStore((state) => state.filter);
  const setQuery = useSearchStore((state) => state.setQuery);
  const setFilter = useSearchStore((state) => state.setFilter);
  const noteLessons = useNoteStore((state) => state.lessons);
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY_MS);

  const searchableContent = useMemo<SearchableContent>(() => {
    const categories = getCategories();
    const categoryMap = new Map(categories.map((category) => [category.id, getCategoryCopy(locale, category.id)?.name ?? category.name]));
    const legacyLessons: SearchableLesson[] = getLessons().map((lesson) => ({
      id: lesson.id, title: lesson.title, description: lesson.description, categoryId: lesson.categoryId,
      category: categoryMap.get(lesson.categoryId) ?? '', difficulty: lesson.difficulty, durationMinutes: lesson.durationMinutes,
    }));
    const structuredLessons: SearchableLesson[] = getStructuredLessonIds().flatMap((id) => {
      const lesson = getStructuredLesson(id, locale);
      if (!lesson) return [];
      const week = getWeekForLesson(id, locale);
      return [{
        id: lesson.id,
        title: lesson.title,
        description: [lesson.description, ...lesson.learningOutcomes, ...lesson.tags].join(' '),
        categoryId: week?.id ?? 'structured-curriculum',
        category: week?.title ?? UI_COPY[locale].structuredCurriculum.title,
        difficulty: lesson.difficulty,
        durationMinutes: lesson.estimatedMinutes,
        path: `/${locale}/structured-lessons/${lesson.id}`,
      }];
    });
    const lessons = [...legacyLessons, ...structuredLessons];
    const courses: SearchableCourse[] = categories.map((category) => ({
      id: category.id, name: getCategoryCopy(locale, category.id)?.name ?? category.name,
      description: getCategoryCopy(locale, category.id)?.description ?? category.description,
    }));
    const notes: SearchableNote[] = Object.entries(noteLessons).map(([lessonId, entry]) => {
      const lesson = getLessons().find((item) => item.id === lessonId);
      if (!lesson) return null;
      const category = getCategoryById(lesson.categoryId);
      return {
        lessonId, lessonTitle: lesson.title, categoryId: lesson.categoryId,
        category: getCategoryCopy(locale, lesson.categoryId)?.name ?? category?.name ?? '', content: entry.content,
      } satisfies SearchableNote;
    }).filter((note): note is SearchableNote => note !== null);
    return { lessons, courses, notes };
  }, [noteLessons, locale]);

  const results = useMemo(() => search({ content: searchableContent, query: debouncedQuery, filter }), [searchableContent, debouncedQuery, filter]);
  const counts = useMemo(() => getResultCounts(results), [results]);
  const terms = useMemo(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) return [];
    return trimmed.toLowerCase().split(/\s+/).filter((term) => term.length > 0);
  }, [debouncedQuery]);
  const hasQuery = query.trim().length >= MIN_QUERY_LENGTH;
  const isDebouncing = query !== debouncedQuery && hasQuery;

  return (
    <div className="space-y-6">
      <div className="space-y-1"><h1 className="text-2xl font-semibold text-neutral-900">{copy.title}</h1><p className="text-neutral-600">{copy.description}</p></div>
      <SearchBar value={query} onChange={setQuery} autoFocus />
      {hasQuery && (
        <>
          <FilterTabs filter={filter} counts={counts} onChange={setFilter} />
          {isDebouncing ? <p className="py-8 text-center text-sm text-neutral-500">{copy.searching}</p>
            : results.length === 0 ? <EmptyState title={copy.noResults} message={copy.noResultsMessage.replace('{query}', debouncedQuery)} icon={SearchIcon} />
              : <>
                  <p className="text-sm text-neutral-500">{copy.resultCount.replace('{count}', String(results.length))}</p>
                  <SearchResults results={results} terms={terms} />
                </>}
        </>
      )}
      {!hasQuery && <EmptyState title={copy.startTyping} message={copy.startTypingMessage} icon={SearchIcon} />}
    </div>
  );
}
