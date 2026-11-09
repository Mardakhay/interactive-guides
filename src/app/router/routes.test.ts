import { describe, expect, it } from 'vitest';
import { localizedPath } from './routes';

describe('localizedPath', () => {
  it('prefixes legacy root paths with the requested locale', () => {
    expect(localizedPath('/', 'en')).toBe('/en');
    expect(localizedPath('/courses', 'ru')).toBe('/ru/courses');
    expect(localizedPath('/lessons/example.lesson', 'ru')).toBe('/ru/lessons/example.lesson');
  });

  it('replaces an existing locale instead of nesting another locale segment', () => {
    expect(localizedPath('/en/courses', 'ru')).toBe('/ru/courses');
    expect(localizedPath('/ru/structured-lessons/git.fundamentals', 'en')).toBe('/en/structured-lessons/git.fundamentals');
  });
});
