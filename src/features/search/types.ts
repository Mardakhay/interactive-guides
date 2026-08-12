export type SearchResultType = 'lesson' | 'course' | 'note';

export type SearchFilter = 'all' | SearchResultType;

export interface SearchResult {
  readonly type: SearchResultType;
  readonly id: string;
  readonly title: string;
  readonly snippet: string;
  readonly path: string;
  readonly matchedFields: readonly string[];
}

export interface SearchState {
  readonly query: string;
  readonly filter: SearchFilter;
}
