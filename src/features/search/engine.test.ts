import { describe, expect, it } from 'vitest';
import { getResultCounts, search } from './engine';

const content = {
  lessons: [{ id: 'lesson-1', title: 'React hooks', description: 'Learn state and effects.', categoryId: 'react', category: 'React', difficulty: 'beginner', durationMinutes: 10 }],
  courses: [{ id: 'react', name: 'React course', description: 'Build interactive UI.' }],
  notes: [{ lessonId: 'lesson-1', lessonTitle: 'React hooks', categoryId: 'react', category: 'React', content: 'Remember useEffect cleanup.' }],
};

describe('search', () => {
  it('matches terms across records and applies result filters', () => {
    expect(search({ content, query: 'react', filter: 'all' }).map((result) => result.type)).toEqual(['lesson', 'course', 'note']);
    expect(search({ content, query: 'react', filter: 'note' })).toHaveLength(1);
  });

  it('uses a provided path for structured lesson search results', () => {
    const structuredContent = {
      lessons: [{ id: 'js.async-fetch', title: 'Promises and Fetch', description: 'Load API data asynchronously', categoryId: 'week-8', category: 'Week 8', difficulty: 'beginner', durationMinutes: 25, path: '/ru/structured-lessons/js.async-fetch' }],
      courses: [],
      notes: [],
    };
    const results = search({ content: structuredContent, query: 'Promises', filter: 'lesson' });
    expect(results).toHaveLength(1);
    expect(results[0].path).toBe('/ru/structured-lessons/js.async-fetch');
  });

  it('ignores too-short queries and counts returned types', () => {
    expect(search({ content, query: 'r', filter: 'all' })).toEqual([]);
    expect(getResultCounts(search({ content, query: 'effect', filter: 'all' }))).toEqual({ lesson: 1, course: 0, note: 1 });
  });
});
