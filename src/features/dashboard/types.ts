export interface DashboardProgressSummary {
  readonly completed: number;
  readonly inProgress: number;
  readonly total: number;
  readonly percent: number;
}

export interface DashboardContinueLearning {
  readonly lessonId: string;
  readonly lessonTitle: string;
  readonly categoryId: string;
  readonly categoryName: string;
  readonly categoryIcon: string;
  readonly status: 'not-started' | 'in-progress' | 'completed';
}

export type ActivityKind = 'bookmark' | 'note';

export interface DashboardActivityItem {
  readonly kind: ActivityKind;
  readonly lessonId: string;
  readonly lessonTitle: string;
  readonly categoryId: string;
  readonly categoryName: string;
  readonly timestamp: string;
  readonly preview?: string;
}

export type RecommendedKind = 'path' | 'category';

export interface RecommendedItem {
  readonly kind: RecommendedKind;
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly reason: string;
}

export interface DashboardData {
  readonly progress: DashboardProgressSummary;
  readonly continueLearning: DashboardContinueLearning | null;
  readonly activity: readonly DashboardActivityItem[];
  readonly recommendations: readonly RecommendedItem[];
}
