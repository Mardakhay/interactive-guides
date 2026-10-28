import { describe, expect, it } from 'vitest';
import { getLearningPathLessonIds, getLearningPaths } from '@/features/learning-paths';
import { buildRecommendations } from './useDashboardData';

const completed = { status: 'completed' as const, startedAt: null, completedAt: null };

describe('buildRecommendations', () => {
  it('prioritizes an in-progress path over an unstarted path', () => {
    const [firstPath] = getLearningPaths();
    if (!firstPath) throw new Error('Expected learning paths');
    const [firstLesson] = getLearningPathLessonIds(firstPath.id);
    if (!firstLesson) throw new Error('Expected path lessons');
    expect(buildRecommendations({ [firstLesson]: completed })[0]?.kind).toBe('continue-path');
  });

  it('starts the shortest unstarted path and never exceeds the limit', () => {
    const paths = getLearningPaths();
    expect(buildRecommendations({})[0]?.id).toBe(paths[0]?.id);
    expect(buildRecommendations({}).length).toBeLessThanOrEqual(3);
  });
});
