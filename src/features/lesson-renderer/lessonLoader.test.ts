import { describe, expect, it } from 'vitest';
import { getLessonById } from '@/features/content';
import { resolveLessonSource } from './lessonLoader';

describe('lesson source migration', () => {
  it('renders authored lesson text inside the app even while a legacy mapping exists', () => {
    expect(resolveLessonSource({ id: 're-003', content: '<article><h2>Forms</h2></article>' }))
      .toEqual({ type: 'inline-html', html: '<article><h2>Forms</h2></article>' });
  });

  it.each(['re-003', 're-004', 're-005'])('loads embedded catalog lesson %s as in-app content', (id) => {
    const lesson = getLessonById(id);
    expect(lesson?.content.length).toBeGreaterThan(1000);
    expect(resolveLessonSource(lesson!)).toEqual({ type: 'inline-html', html: lesson!.content });
  });

  it('keeps the iframe fallback only for lessons without embedded content', () => {
    expect(resolveLessonSource({ id: 're-003', content: '  ' }))
      .toEqual({ type: 'external-html', url: '/lessons/react-forms-tutorial.html' });
  });
});
