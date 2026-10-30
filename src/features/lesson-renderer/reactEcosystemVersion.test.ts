import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const lessonHtml = readFileSync(
  resolve(process.cwd(), 'public/lessons/react-ecosystem-course.html'),
  'utf8',
);
const projectPackage = JSON.parse(
  readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'),
) as { dependencies: Record<string, string> };

describe('React ecosystem lesson compatibility', () => {
  it('keeps the legacy ecosystem source aligned to the installed React Router version', () => {
    expect(projectPackage.dependencies['react-router-dom']).toBe('^7.18.0');
    expect(lessonHtml).toContain('React Router 7.18.0');
    expect(lessonHtml).toContain("'react-router-dom'");
    expect(lessonHtml).not.toContain('React Router 6.26.2');
    expect(lessonHtml).not.toContain("'react-router'</span>");
  });

  it('limits Link guidance to internal client-side navigation', () => {
    expect(lessonHtml).toContain('For an internal client-side route');
    expect(lessonHtml).toContain('appropriate for external URLs');
  });
});
