import { create } from 'zustand';
import { loadJSON, saveJSON } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';
import { bookmarksStateSchema } from './schemas';
import type { BookmarkEntry, BookmarksState } from './types';

const DEFAULT_STATE: BookmarksState = {
  lessons: {},
};

function loadInitialState(): BookmarksState {
  const raw = loadJSON<BookmarksState>(STORAGE_KEYS.BOOKMARKS, DEFAULT_STATE);
  const parsed = bookmarksStateSchema.safeParse(raw);
  return parsed.success ? parsed.data : DEFAULT_STATE;
}

function persist(state: BookmarksState): void {
  saveJSON(STORAGE_KEYS.BOOKMARKS, state);
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
