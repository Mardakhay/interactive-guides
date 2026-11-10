import pathsData from '@/data/learning-paths.json';
import { getStructuredLessonIds } from '@/content/repository';
import { learningPathsSchema } from './schemas';
import type { LearningPath, LearningPathWithMeta } from './types';

const paths = learningPathsSchema.parse(pathsData) as readonly LearningPath[];
const structuredLessonIds = new Set(getStructuredLessonIds());

// Do not surface legacy HTML lesson tracks; a visible path must be entirely text-based.
const textOnlyPaths = paths.filter((path) =>
  path.steps.length > 0 && path.steps.every((step) => structuredLessonIds.has(step.lessonId)),
);

export function getLearningPaths(): LearningPathWithMeta[] {
  return [...textOnlyPaths]
    .map((path) => ({ ...path, lessonCount: path.steps.length }))
    .sort((a, b) => a.estimatedHours - b.estimatedHours);
}

export function getLearningPathById(id: string): LearningPath | undefined {
  return textOnlyPaths.find((path) => path.id === id);
}

export function getLearningPathLessonIds(pathId: string): string[] {
  const path = getLearningPathById(pathId);
  if (!path) return [];
  return path.steps.map((step) => step.lessonId);
}
