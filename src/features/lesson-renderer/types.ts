/**
 * Minimal content this feature needs to resolve a renderable source.
 * Intentionally decoupled from the `content` feature's `Lesson` type so
 * lesson-renderer has no cross-feature dependency — any object with an
 * `id` and `content` string (e.g. a Lesson) satisfies this shape.
 */
export interface LessonContentInput {
  readonly id: string;
  readonly content: string;
}

/** Lesson HTML rendered directly from trusted, bundled content. */
export interface InlineHtmlSource {
  readonly type: 'inline-html';
  readonly html: string;
}

/**
 * Lesson HTML rendered from an external or static file via an iframe.
 * Not used by any lesson yet — this is the extension point for future
 * standalone HTML lesson files.
 */
export interface ExternalHtmlSource {
  readonly type: 'external-html';
  readonly url: string;
  /** Overrides the default iframe sandbox policy for this source. */
  readonly sandbox?: string;
}

export type LessonSource = InlineHtmlSource | ExternalHtmlSource;

/**
 * Placeholder manifest shape for lessons that should render from an
 * external source instead of their inline `content` field. The registry
 * is empty today; populate it (or replace it with a JSON-backed loader)
 * when external HTML lesson files are introduced.
 */
export interface LessonManifest {
  readonly lessonId: string;
  readonly source: LessonSource;
}

/** Resolves a lesson's content into a renderable source. Swappable seam. */
export interface LessonLoader {
  resolve(lesson: LessonContentInput): LessonSource;
}
