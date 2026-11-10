import type { LessonStatus } from '@/types/common';

export type ActivityKind = 'bookmark' | 'note';

export interface ActivityItem {
  readonly kind: ActivityKind;
  readonly lessonId: string;
  readonly lessonTitle: string;
  readonly categoryName: string;
  readonly timestamp: string;
  readonly notePreview?: string;
}

export type RecommendationKind = 'continue-path' | 'start-path' | 'continue-category' | 'start-category';

export interface RecommendedItem {
  readonly kind: RecommendationKind;
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly percent: number;
}

export interface ContinueLearningInfo {
  readonly lessonId: string;
  readonly lessonTitle: string;
  readonly categoryId: string;
  readonly categoryName: string;
  readonly categoryIcon: string;
  readonly status: LessonStatus;
}

export interface DashboardData {
  readonly completed: number;
  readonly inProgress: number;
  readonly total: number;
  readonly percent: number;
  readonly continueLearning: ContinueLearningInfo | null;
  readonly recentActivity: readonly ActivityItem[];
  readonly recommendations: readonly RecommendedItem[];
}
