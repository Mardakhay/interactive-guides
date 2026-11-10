import pathsData from '@/data/learning-paths.json';
import { learningPathsSchema } from './schemas';
import type { LearningPath, LearningPathWithMeta } from './types';

const paths = learningPathsSchema.parse(pathsData) as readonly LearningPath[];

export function getLearningPaths(): LearningPathWithMeta[] {
  return [...paths]
    .map((p) => ({ ...p, lessonCount: p.steps.length }))
    .sort((a, b) => a.estimatedHours - b.estimatedHours);
}

export function getLearningPathById(id: string): LearningPath | undefined {
  return paths.find((p) => p.id === id);
}

export function getLearningPathLessonIds(pathId: string): string[] {
  const path = paths.find((p) => p.id === pathId);
  if (!path) return [];
  return path.steps.map((s) => s.lessonId);
}
