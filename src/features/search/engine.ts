import type { SearchResult, SearchResultType, SearchFilter } from './types';

export interface SearchableLesson {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly categoryId: string;
  readonly category: string;
  readonly difficulty: string;
  readonly durationMinutes: number;
  readonly path?: string;
  readonly searchText?: string;
  readonly tags?: readonly string[];
}
export interface SearchableCourse {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly path?: string;
}
export interface SearchableNote {
  readonly lessonId: string;
  readonly lessonTitle: string;
  readonly categoryId: string;
  readonly category: string;
  readonly content: string;
  readonly path?: string;
}
export interface SearchableContent {
  readonly lessons: readonly SearchableLesson[];
  readonly courses: readonly SearchableCourse[];
  readonly notes: readonly SearchableNote[];
}
export interface SearchEngineInput {
  readonly content: SearchableContent;
  readonly query: string;
  readonly filter: SearchFilter;
}

const MIN_QUERY_LENGTH = 2;

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/\s+/).map((term) => term.trim()).filter((term) => term.length > 0);
}
function containsTerm(haystack: string, term: string): boolean {
  return haystack.toLowerCase().includes(term);
}
function buildSnippet(text: string, terms: readonly string[], maxLength = 140): string {
  if (text.length <= maxLength) return text;
  const lower = text.toLowerCase();
  const firstMatch = terms.map((term) => lower.indexOf(term)).filter((index) => index >= 0).sort((a, b) => a - b)[0];
  if (firstMatch === undefined) return text.slice(0, maxLength) + '…';
  const start = Math.max(0, firstMatch - 40);
  const end = Math.min(text.length, start + maxLength);
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
}
function matchFields(terms: readonly string[], fields: Record<string, string>): { matched: string[]; snippet: string } {
  const matched: string[] = [];
  let bestSnippet = '';
  for (const [fieldName, value] of Object.entries(fields)) {
    if (terms.some((term) => containsTerm(value, term))) {
      matched.push(fieldName);
      if (!bestSnippet && fieldName !== 'title') bestSnippet = buildSnippet(value, terms);
    }
  }
  return { matched, snippet: bestSnippet };
}

export function search({ content, query, filter }: SearchEngineInput): SearchResult[] {
  const trimmed = query.trim();
  if (trimmed.length < MIN_QUERY_LENGTH) return [];
  const terms = tokenize(trimmed);
  if (terms.length === 0) return [];
  const results: SearchResult[] = [];
  const shouldSearch = (type: SearchResultType): boolean => filter === 'all' || filter === type;

  if (shouldSearch('lesson')) {
    for (const lesson of content.lessons) {
      const { matched, snippet } = matchFields(terms, {
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        difficulty: lesson.difficulty,
        tags: lesson.tags?.join(' ') ?? '',
        content: lesson.searchText ?? '',
      });
      if (matched.length > 0) {
        results.push({
          type: 'lesson', id: lesson.id, title: lesson.title,
          snippet: snippet || lesson.description,
          path: lesson.path ?? '/lessons/' + lesson.id,
          matchedFields: matched,
        });
      }
    }
  }

  if (shouldSearch('course')) {
    for (const course of content.courses) {
      const { matched, snippet } = matchFields(terms, { title: course.name, description: course.description });
      if (matched.length > 0) {
        results.push({
          type: 'course', id: course.id, title: course.name,
          snippet: snippet || course.description,
          path: course.path ?? '/courses/' + course.id,
          matchedFields: matched,
        });
      }
    }
  }

  if (shouldSearch('note')) {
    for (const note of content.notes) {
      const { matched, snippet } = matchFields(terms, {
        title: note.lessonTitle,
        content: note.content,
        category: note.category,
      });
      if (matched.length > 0) {
        results.push({
          type: 'note', id: note.lessonId, title: note.lessonTitle,
          snippet: snippet || note.content.slice(0, 140),
          path: note.path ?? '/lessons/' + note.lessonId,
          matchedFields: matched,
        });
      }
    }
  }
  return results;
}

export function getResultCounts(results: readonly SearchResult[]): Record<SearchResultType, number> {
  const counts: Record<SearchResultType, number> = { lesson: 0, course: 0, note: 0 };
  for (const result of results) counts[result.type] += 1;
  return counts;
}
