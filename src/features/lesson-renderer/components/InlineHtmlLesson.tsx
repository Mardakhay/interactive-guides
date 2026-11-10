interface InlineHtmlLessonProps {
  html: string;
}

/**
 * Renders lesson HTML sourced from bundled content JSON. This content is
 * authored and shipped with the app (not user-generated), so it's rendered
 * directly. Styling is applied via the `.lesson-content` class in
 * `styles/index.css`.
 */
export function InlineHtmlLesson({ html }: InlineHtmlLessonProps) {
  return <div className="lesson-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
