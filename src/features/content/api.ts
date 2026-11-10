import categoriesData from '@/data/categories.json';
import lessonsData from '@/data/lessons.json';
import { categoriesSchema, lessonsSchema } from './schemas';
import type { Category, CatalogCategory, Lesson } from './types';

const categories = categoriesSchema.parse(categoriesData) as readonly Category[];
const lessons = lessonsSchema.parse(lessonsData) as readonly Lesson[];

export function getCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getLessons(): Lesson[] {
  return [...lessons].sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonsByCategory(categoryId: string): Lesson[] {
  return lessons
    .filter((l) => l.categoryId === categoryId)
    .sort((a, b) => a.order - b.order);
}

export function getCatalog(): CatalogCategory[] {
  return getCategories().map((category) => ({
    ...category,
    lessonCount: lessons.filter((l) => l.categoryId === category.id).length,
  }));
}

export function getTotalLessonCount(): number {
  return lessons.length;
}

export interface LessonNavigationResult {
  previous: Lesson | null;
  next: Lesson | null;
}

export function getAdjacentLessons(lessonId: string): LessonNavigationResult {
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) return { previous: null, next: null };

  const categoryLessons = lessons
    .filter((l) => l.categoryId === lesson.categoryId)
    .sort((a, b) => a.order - b.order);

  const index = categoryLessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? (categoryLessons[index - 1] ?? null) : null,
    next: index < categoryLessons.length - 1 ? (categoryLessons[index + 1] ?? null) : null,
  };
}
