import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getLessonById, getLessons } from '@/features/content';
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
  it('keeps every legacy catalog lesson renderable through embedded content or an existing HTML source', () => {
    const lessons = getLessons();

    for (const lesson of lessons) {
      const source = resolveLessonSource(lesson);

      if (source.type === 'inline-html') {
        if (!source.html.trim()) {
          throw new Error(`Catalog lesson "${lesson.id}" resolves to an empty in-app body.`);
        }
        continue;
      }

      if (!/^\/lessons\/[a-z0-9_.-]+\.html$/.test(source.url)) {
        throw new Error(`Catalog lesson "${lesson.id}" has an invalid legacy URL: ${source.url}`);
      }

      const filePath = resolve(process.cwd(), 'public', source.url.slice(1));
      if (!existsSync(filePath)) {
        throw new Error(`Catalog lesson "${lesson.id}" points to a missing HTML file: ${source.url}`);
      }
    }
  });
});
