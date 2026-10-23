import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const lessonHtml = readFileSync(
  new URL('../../../public/lessons/react-ecosystem-course.html', import.meta.url),
  'utf8',
);
const projectPackage = JSON.parse(
  readFileSync(new URL('../../../package.json', import.meta.url), 'utf8'),
) as { dependencies: Record<string, string> };

describe('React ecosystem lesson compatibility', () => {
  it('uses the React Router browser API installed by the project', () => {
    expect(projectPackage.dependencies['react-router-dom']).toBe('^6.26.2');
    expect(lessonHtml).toContain('React Router 6.26.2');
    expect(lessonHtml).toContain("'react-router-dom'");
    expect(lessonHtml).not.toContain('React Router v7');
    expect(lessonHtml).not.toContain("'react-router'</span>");
  });

  it('limits Link guidance to internal client-side navigation', () => {
    expect(lessonHtml).toContain('For an internal client-side route');
    expect(lessonHtml).toContain('appropriate for external URLs');
  });
});
