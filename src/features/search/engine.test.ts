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

  it('ignores too-short queries and counts returned types', () => {
    expect(search({ content, query: 'r', filter: 'all' })).toEqual([]);
    expect(getResultCounts(search({ content, query: 'effect', filter: 'all' }))).toEqual({ lesson: 1, course: 0, note: 1 });
  });
  it('searches structured body text and tags while preserving the lesson route', () => {
    const indexedContent = {
      ...content,
      lessons: [{
        ...content.lessons[0]!,
        id: 'git.fundamentals',
        title: 'Git Fundamentals',
        description: 'Track project changes.',
        searchText: 'git rebase --continue resolves the current conflict',
        tags: ['version-control', 'branching'],
        path: '/ru/structured-lessons/git.fundamentals',
      }],
    };
    const result = search({ content: indexedContent, query: 'rebase', filter: 'lesson' })[0];
    expect(result?.path).toBe('/ru/structured-lessons/git.fundamentals');
    expect(result?.snippet).toContain('git rebase --continue');
    expect(search({ content: indexedContent, query: 'version-control', filter: 'lesson' })).toHaveLength(1);
  });

  it('respects locale-specific paths for structured lessons, curriculum results and notes', () => {
    const structuredContent = {
      lessons: [{
        id: 'html.document-structure',
        title: 'HTML document structure',
        description: '',
        categoryId: 'structured-curriculum',
        category: 'Structured curriculum',
        difficulty: '',
        durationMinutes: 0,
        path: '/ru/structured-lessons/html.document-structure',
      }],
      courses: [{
        id: 'structured-curriculum',
        name: 'Structured curriculum',
        description: 'The bilingual structured course.',
        path: '/ru/structured-lessons',
      }],
      notes: [{
        lessonId: 'html.document-structure',
        lessonTitle: 'HTML document structure',
        categoryId: 'structured-curriculum',
        category: 'Structured curriculum',
        content: 'Review semantic regions',
        path: '/ru/structured-lessons/html.document-structure',
      }],
    };

    expect(search({ content: structuredContent, query: 'document structure', filter: 'lesson' })[0]?.path)
      .toBe('/ru/structured-lessons/html.document-structure');
    expect(search({ content: structuredContent, query: 'bilingual structured course', filter: 'course' })[0]?.path)
      .toBe('/ru/structured-lessons');
    expect(search({ content: structuredContent, query: 'semantic regions', filter: 'note' })[0]?.path)
      .toBe('/ru/structured-lessons/html.document-structure');
  });

});
