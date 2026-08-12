export interface BookmarkEntry {
  readonly createdAt: string;
}

export interface BookmarksState {
  readonly lessons: Record<string, BookmarkEntry>;
}
