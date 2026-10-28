import type { LessonSource } from '../types';
import { InlineHtmlLesson } from './InlineHtmlLesson';
import { ExternalHtmlLesson } from './ExternalHtmlLesson';

interface LessonRendererProps {
  source: LessonSource;
  title: string;
}

/**
 * Renders a lesson's content regardless of where it comes from. Callers
 * only deal in `LessonSource` — swapping how a lesson's source is resolved
 * (see `resolveLessonSource`) never requires touching this component.
 */
export function LessonRenderer({ source, title }: LessonRendererProps) {
  if (source.type === 'inline-html') {
    return <InlineHtmlLesson html={source.html} />;
  }

  return <ExternalHtmlLesson url={source.url} title={title} sandbox={source.sandbox} />;
}
