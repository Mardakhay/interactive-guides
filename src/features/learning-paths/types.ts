export type LearningPathLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LearningPathStep {
  readonly lessonId: string;
  readonly note?: string;
}

export interface LearningPath {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly level: LearningPathLevel;
  readonly icon: string;
  readonly estimatedHours: number;
  readonly steps: readonly LearningPathStep[];
}

export interface LearningPathWithMeta extends LearningPath {
  readonly lessonCount: number;
}
