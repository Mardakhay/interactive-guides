export const APP_NAME = 'Interactive Guides';

export const STORAGE_KEYS = {
  PROGRESS: 'ig:progress',
  BOOKMARKS: 'ig:bookmarks',
  NOTES: 'ig:notes',
  LAST_LESSON: 'ig:last-lesson',
  THEME: 'ig:theme',
} as const;

export const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-success-100 text-success-700',
  intermediate: 'bg-warning-100 text-warning-700',
  advanced: 'bg-error-100 text-error-700',
};
