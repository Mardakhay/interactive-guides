export interface NoteEntry {
  readonly content: string;
  readonly updatedAt: string;
}

export interface NotesState {
  readonly lessons: Record<string, NoteEntry>;
}
