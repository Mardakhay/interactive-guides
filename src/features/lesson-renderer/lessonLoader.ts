import type { LessonContentInput, LessonLoader, LessonManifest, LessonSource } from './types';

/**
 * Registry of lessons that render from an external/static HTML file (served
 * from /public/lessons/) instead of their inline `content` field. Each entry
 * maps a lesson ID to its renderable source.
 */
const manifestRegistry: Record<string, LessonManifest> = {
  'sh-001': {
    lessonId: 'sh-001',
    source: { type: 'external-html', url: '/lessons/frontend-bootcamp-notes.html' },
  },
  'wb-001': {
    lessonId: 'wb-001',
    source: { type: 'external-html', url: '/lessons/internet-fundamentals.html' },
  },
  'wb-002': {
    lessonId: 'wb-002',
    source: { type: 'external-html', url: '/lessons/html-reference.html' },
  },
  'wb-003': {
    lessonId: 'wb-003',
    source: { type: 'external-html', url: '/lessons/css-reference.html' },
  },
  'wb-004': {
    lessonId: 'wb-004',
    source: { type: 'external-html', url: '/lessons/dom-masterclass.html' },
  },
  'js-001': {
    lessonId: 'js-001',
    source: { type: 'external-html', url: '/lessons/js_interactive_book.html' },
  },
  'js-002': {
    lessonId: 'js-002',
    source: { type: 'external-html', url: '/lessons/js-deep-dive.html' },
  },
  'js-003': {
    lessonId: 'js-003',
    source: { type: 'external-html', url: '/lessons/js-memory-mastery.html' },
  },
  'js-004': {
    lessonId: 'js-004',
    source: { type: 'external-html', url: '/lessons/interactive-async-js.html' },
  },
  're-001': {
    lessonId: 're-001',
    source: { type: 'external-html', url: '/lessons/react-usestate-guide.html' },
  },
  're-002': {
    lessonId: 're-002',
    source: { type: 'external-html', url: '/lessons/react-hooks-guide.html' },
  },
  're-003': {
    lessonId: 're-003',
    source: { type: 'external-html', url: '/lessons/react-forms-tutorial.html' },
  },
  're-004': {
    lessonId: 're-004',
    source: { type: 'external-html', url: '/lessons/react-api-hooks-lesson.html' },
  },
  're-005': {
    lessonId: 're-005',
    source: { type: 'external-html', url: '/lessons/react-ecosystem-course.html' },
  },
  're-006': {
    lessonId: 're-006',
    source: { type: 'external-html', url: '/lessons/react-performance-a11y.html' },
  },
  'ui-001': {
    lessonId: 'ui-001',
    source: { type: 'external-html', url: '/lessons/ui-design-system-learn.html' },
  },
  'ui-002': {
    lessonId: 'ui-002',
    source: { type: 'external-html', url: '/lessons/material-ui-masterclass.html' },
  },
  'tl-001': {
    lessonId: 'tl-001',
    source: { type: 'external-html', url: '/lessons/git-reference.html' },
  },
  'tl-002': {
    lessonId: 'tl-002',
    source: { type: 'external-html', url: '/lessons/git-workflow-cicd-guide.html' },
  },
  'tl-003': {
    lessonId: 'tl-003',
    source: { type: 'external-html', url: '/lessons/intro.dev.html' },
  },
  'tl-004': {
    lessonId: 'tl-004',
    source: { type: 'external-html', url: '/lessons/deployment-learning.html' },
  },
  'qa-001': {
    lessonId: 'qa-001',
    source: { type: 'external-html', url: '/lessons/frontend-architecture-and-planning.html' },
  },
  'qa-002': {
    lessonId: 'qa-002',
    source: { type: 'external-html', url: '/lessons/test.guide.html' },
  },
  'sec-001': {
    lessonId: 'sec-001',
    source: { type: 'external-html', url: '/lessons/frontend-auth.html' },
  },
  'dt-001': {
    lessonId: 'dt-001',
    source: { type: 'external-html', url: '/lessons/sql-learning-page.html' },
  },
};

function getLessonManifest(lessonId: string): LessonManifest | undefined {
  return manifestRegistry[lessonId];
}

/**
 * Default loader: prefers a manifest-registered external source, and
 * falls back to rendering the lesson's own inline HTML content.
 */
export const defaultLessonLoader: LessonLoader = {
  resolve(lesson: LessonContentInput): LessonSource {
    const manifest = getLessonManifest(lesson.id);
    if (manifest) {
      return manifest.source;
    }
    return { type: 'inline-html', html: lesson.content };
  },
};

/** Convenience wrapper around the default loader for typical call sites. */
export function resolveLessonSource(lesson: LessonContentInput): LessonSource {
  return defaultLessonLoader.resolve(lesson);
}
