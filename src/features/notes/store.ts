import { create } from 'zustand';
import { loadJSON, saveJSON } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';
import { notesStateSchema } from './schemas';
import type { NoteEntry, NotesState } from './types';

const DEFAULT_STATE: NotesState = {
  lessons: {},
};

function loadInitialState(): NotesState {
  const raw = loadJSON<NotesState>(STORAGE_KEYS.NOTES, DEFAULT_STATE);
  const parsed = notesStateSchema.safeParse(raw);
  return parsed.success ? parsed.data : DEFAULT_STATE;
}

function persist(state: NotesState): void {
  saveJSON(STORAGE_KEYS.NOTES, state);
}

interface NoteStore extends NotesState {
  /** Creates or overwrites the note for a lesson. Deletes the entry if content is blank. */
  setNote: (lessonId: string, content: string) => void;
  deleteNote: (lessonId: string) => void;
  /** Non-reactive snapshot read. Prefer a selector (e.g. `useNoteStore(s => s.lessons[id])`) inside components. */
  getNote: (lessonId: string) => NoteEntry | undefined;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  ...loadInitialState(),

  setNote: (lessonId, content) => {
    set((state) => {
      const trimmed = content.trim();

      if (!trimmed) {
        if (!state.lessons[lessonId]) return state;
        const { [lessonId]: _removed, ...rest } = state.lessons;
        const next: NotesState = { lessons: rest };
        persist(next);
        return next;
      }

      const entry: NoteEntry = { content, updatedAt: new Date().toISOString() };
      const next: NotesState = {
        lessons: { ...state.lessons, [lessonId]: entry },
      };
      persist(next);
      return next;
    });
  },

  deleteNote: (lessonId) => {
    set((state) => {
      if (!state.lessons[lessonId]) return state;
      const { [lessonId]: _removed, ...rest } = state.lessons;
      const next: NotesState = { lessons: rest };
      persist(next);
      return next;
    });
  },

  getNote: (lessonId) => get().lessons[lessonId],
}));
