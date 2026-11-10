import { getCatalog, getLessonsByCategory } from '@/features/content';
import { getLearningPaths, getLearningPathLessonIds } from '@/features/learning-paths';
import { computeProgressStats } from '@/features/progress';
import type { LessonProgressEntry } from '@/features/progress';
import type { RecommendedItem } from './types';

const MAX_RECOMMENDATIONS = 3;

/**
 * Pure recommendation function. Decides what to surface next based on the
 * user's progress map:
 *  1. No learning path started yet → recommend the shortest path.
 *  2. A path is started but not finished → recommend continuing that path.
 *  3. Otherwise → recommend the category with the lowest completion % among
 *     started categories, or an unstarted category.
 */
export function buildRecommendations(
  progressLessons: Record<string, LessonProgressEntry>,
): RecommendedItem[] {
  const recommendations: RecommendedItem[] = [];

  const paths = getLearningPaths();
  const startedPath = paths.find((path) => {
    const lessonIds = getLearningPathLessonIds(path.id);
    const stats = computeProgressStats(progressLessons, lessonIds);
    return stats.inProgress > 0 && stats.completed < stats.total;
  });

  if (startedPath) {
    const lessonIds = getLearningPathLessonIds(startedPath.id);
    const stats = computeProgressStats(progressLessons, lessonIds);
    recommendations.push({
      kind: 'path',
      id: startedPath.id,
      title: startedPath.title,
      description: startedPath.description,
      path: `/paths/${startedPath.id}`,
      reason: `Continue · ${stats.completed}/${stats.total} lessons done`,
    });
  } else if (paths.length > 0) {
    const hasStartedAnyPath = paths.some((path) => {
      const lessonIds = getLearningPathLessonIds(path.id);
      const stats = computeProgressStats(progressLessons, lessonIds);
      return stats.completed > 0 || stats.inProgress > 0;
    });
    if (!hasStartedAnyPath) {
      const shortest = [...paths].sort((a, b) => a.estimatedHours - b.estimatedHours)[0];
      if (shortest) {
        recommendations.push({
          kind: 'path',
          id: shortest.id,
          title: shortest.title,
          description: shortest.description,
          path: `/paths/${shortest.id}`,
          reason: `${shortest.estimatedHours}h · great place to start`,
        });
      }
    }
  }

  if (recommendations.length < MAX_RECOMMENDATIONS) {
    const catalog = getCatalog();
    const startedCategories = catalog
      .map((category) => {
        const lessonIds = getLessonsByCategory(category.id).map((l) => l.id);
        const stats = computeProgressStats(progressLessons, lessonIds);
        return { category, stats };
      })
      .filter((entry) => entry.stats.completed > 0 || entry.stats.inProgress > 0);

    const unstartedCategories = catalog.filter((category) => {
      const lessonIds = getLessonsByCategory(category.id).map((l) => l.id);
      const stats = computeProgressStats(progressLessons, lessonIds);
      return stats.completed === 0 && stats.inProgress === 0;
    });

    let categoryCandidate: { id: string; title: string; description: string; reason: string } | null = null;

    if (startedCategories.length > 0) {
      const lowestCompletion = [...startedCategories].sort((a, b) => a.stats.percent - b.stats.percent)[0];
      if (lowestCompletion && lowestCompletion.stats.percent < 100) {
        categoryCandidate = {
          id: lowestCompletion.category.id,
          title: lowestCompletion.category.name,
          description: lowestCompletion.category.description,
          reason: `${lowestCompletion.stats.completed}/${lowestCompletion.stats.total} completed`,
        };
      }
    }

    if (!categoryCandidate && unstartedCategories.length > 0) {
      const firstUnstarted = unstartedCategories[0];
      if (firstUnstarted) {
        categoryCandidate = {
          id: firstUnstarted.id,
          title: firstUnstarted.name,
          description: firstUnstarted.description,
          reason: 'Not started yet',
        };
      }
    }

    if (categoryCandidate) {
      const candidate = categoryCandidate;
      if (!recommendations.some((r) => r.id === candidate.id)) {
        recommendations.push({
          kind: 'category',
          id: candidate.id,
          title: candidate.title,
          description: candidate.description,
          path: `/courses/${candidate.id}`,
          reason: candidate.reason,
        });
      }
    }
  }

  return recommendations.slice(0, MAX_RECOMMENDATIONS);
}
