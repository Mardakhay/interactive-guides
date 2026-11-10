import type { LessonContentInput, LessonLoader, LessonManifest, LessonSource } from './types';

/**
 * Lessons that render from an external/static HTML file instead of their
 * inline `content`. Empty for now — no current lesson needs it. Add
 * entries here (or swap this for a JSON-backed lookup) once external HTML
 * lesson files exist.
 */
const manifestRegistry: Record<string, LessonManifest> = {};

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
