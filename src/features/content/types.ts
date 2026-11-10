export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type LessonStatus = 'not-started' | 'in-progress' | 'completed';

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  readonly order: number;
}

export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly categoryId: string;
  readonly difficulty: LessonDifficulty;
  readonly tags: string[];
  readonly durationMinutes: number;
  readonly content: string;
  readonly order: number;
}

export interface CatalogCategory extends Category {
  readonly lessonCount: number;
}
