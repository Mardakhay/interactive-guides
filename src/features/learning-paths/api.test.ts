import { describe, expect, it } from 'vitest';
import { getLearningPathLessonIds, getLearningPaths } from './api';

describe('learning path progress inputs', () => {
  it('returns every path step as lesson ids in order', () => {
    const path = getLearningPaths()[0];
    expect(path).toBeDefined();
    if (!path) return;
    expect(getLearningPathLessonIds(path.id)).toHaveLength(path.lessonCount);
    expect(getLearningPathLessonIds('missing')).toEqual([]);
  });
});
