import { create } from 'zustand';
import { readVersionedJSON, saveVersionedJSON } from '@/lib/versionedStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import { bookmarksStateSchema } from './schemas';
import type { BookmarkEntry, BookmarksState } from './types';

const DEFAULT_STATE: BookmarksState = {
  lessons: {},
};

function loadInitialState(): BookmarksState {
  return readVersionedJSON(STORAGE_KEYS.BOOKMARKS, bookmarksStateSchema, DEFAULT_STATE).data;
}

function persist(state: BookmarksState): void {
  saveVersionedJSON(STORAGE_KEYS.BOOKMARKS, state, bookmarksStateSchema);
}

interface BookmarkStore extends BookmarksState {
  addBookmark: (lessonId: string) => void;
  removeBookmark: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  /** Non-reactive snapshot read. Prefer a selector (e.g. `useBookmarkStore(s => !!s.lessons[id])`) inside components. */
  isBookmarked: (lessonId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  ...loadInitialState(),

  addBookmark: (lessonId) => {
    set((state) => {
      if (state.lessons[lessonId]) return state;
      const entry: BookmarkEntry = { createdAt: new Date().toISOString() };
      const next: BookmarksState = {
        lessons: { ...state.lessons, [lessonId]: entry },
      };
      persist(next);
      return next;
    });
  },

  removeBookmark: (lessonId) => {
    set((state) => {
      if (!state.lessons[lessonId]) return state;
      const { [lessonId]: _removed, ...rest } = state.lessons;
      const next: BookmarksState = { lessons: rest };
      persist(next);
      return next;
    });
  },

  toggleBookmark: (lessonId) => {
    const isCurrentlyBookmarked = !!get().lessons[lessonId];
    if (isCurrentlyBookmarked) {
      get().removeBookmark(lessonId);
    } else {
      get().addBookmark(lessonId);
    }
  },

  isBookmarked: (lessonId) => !!get().lessons[lessonId],
}));
