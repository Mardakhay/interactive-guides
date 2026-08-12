import type { SearchResult, SearchResultType, SearchFilter } from './types';

export interface SearchableLesson {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly categoryId: string;
  readonly category: string;
  readonly difficulty: string;
  readonly durationMinutes: number;
}

export interface SearchableCourse {
  readonly id: string;
  readonly name: string;
  readonly description: string;
}

export interface SearchableNote {
  readonly lessonId: string;
  readonly lessonTitle: string;
  readonly categoryId: string;
  readonly category: string;
  readonly content: string;
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
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function containsTerm(haystack: string, term: string): boolean {
  return haystack.toLowerCase().includes(term);
}

function buildSnippet(text: string, terms: readonly string[], maxLength = 140): string {
  if (text.length <= maxLength) return text;

  const lower = text.toLowerCase();
  const firstMatch = terms
    .map((t) => lower.indexOf(t))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];

  if (firstMatch === undefined) {
    return `${text.slice(0, maxLength)}\u2026`;
  }

  const start = Math.max(0, firstMatch - 40);
  const end = Math.min(text.length, start + maxLength);
  const prefix = start > 0 ? '\u2026' : '';
  const suffix = end < text.length ? '\u2026' : '';
  return `${prefix}${text.slice(start, end)}${suffix}`;
}

function matchFields(terms: readonly string[], fields: Record<string, string>): { matched: string[]; snippet: string } {
  const matched: string[] = [];
  let bestSnippet = '';

  for (const [fieldName, value] of Object.entries(fields)) {
    if (terms.some((t) => containsTerm(value, t))) {
      matched.push(fieldName);
      if (!bestSnippet && fieldName !== 'title') {
        bestSnippet = buildSnippet(value, terms);
      }
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
      });
      if (matched.length > 0) {
        results.push({
          type: 'lesson',
          id: lesson.id,
          title: lesson.title,
          snippet: snippet || lesson.description,
          path: `/lessons/${lesson.id}`,
          matchedFields: matched,
        });
      }
    }
  }

  if (shouldSearch('course')) {
    for (const course of content.courses) {
      const { matched, snippet } = matchFields(terms, {
        title: course.name,
        description: course.description,
      });
      if (matched.length > 0) {
        results.push({
          type: 'course',
          id: course.id,
          title: course.name,
          snippet: snippet || course.description,
          path: `/courses/${course.id}`,
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
          type: 'note',
          id: note.lessonId,
          title: note.lessonTitle,
          snippet: snippet || note.content.slice(0, 140),
          path: `/lessons/${note.lessonId}`,
          matchedFields: matched,
        });
      }
    }
  }

  return results;
}

export function getResultCounts(results: readonly SearchResult[]): Record<SearchResultType, number> {
  const counts: Record<SearchResultType, number> = { lesson: 0, course: 0, note: 0 };
  for (const r of results) {
    counts[r.type] += 1;
  }
  return counts;
}
