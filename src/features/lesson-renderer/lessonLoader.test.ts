import { describe, expect, it } from 'vitest';
import { resolveLessonSource } from './lessonLoader';

describe('lesson source migration', () => {
  it('renders authored lesson text inside the app even while a legacy mapping exists', () => {
    expect(resolveLessonSource({ id: 're-003', content: '<article><h2>Forms</h2></article>' }))
      .toEqual({ type: 'inline-html', html: '<article><h2>Forms</h2></article>' });
  });

  it('keeps the iframe fallback only for lessons without embedded content', () => {
    expect(resolveLessonSource({ id: 're-003', content: '  ' }))
      .toEqual({ type: 'external-html', url: '/lessons/react-forms-tutorial.html' });
  });
});
