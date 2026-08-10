import { useState } from 'react';
import { LoadingState } from '@/components/feedback';
import { cn } from '@/lib/utils';

interface ExternalHtmlLessonProps {
  url: string;
  title: string;
  sandbox?: string;
}

// No allow-same-origin by default: external content is treated as
// untrusted, so scripts run isolated from the app's origin unless a
// manifest entry explicitly opts a source into a wider sandbox policy.
const DEFAULT_SANDBOX = 'allow-scripts allow-popups allow-forms';

/**
 * Renders a lesson from an external or static HTML file in a sandboxed
 * iframe. Not wired to any lesson today — this is the future-ready path
 * for standalone HTML lesson files.
 */
export function ExternalHtmlLesson({ url, title, sandbox }: ExternalHtmlLessonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading && <LoadingState lines={4} />}
      <iframe
        src={url}
        title={title}
        sandbox={sandbox ?? DEFAULT_SANDBOX}
        onLoad={() => setIsLoading(false)}
        className={cn(
          'h-[70vh] w-full rounded-lg border border-neutral-200 bg-white',
          isLoading && 'hidden',
        )}
      />
    </div>
  );
}
