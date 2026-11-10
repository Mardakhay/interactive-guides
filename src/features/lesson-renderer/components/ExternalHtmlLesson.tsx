import { useState } from 'react';
import { LoadingState } from '@/components/feedback';
import { cn } from '@/lib/utils';

interface ExternalHtmlLessonProps {
  url: string;
  title: string;
  sandbox?: string;
}

// allow-scripts lets lesson JS run; allow-same-origin is intentionally
// excluded — lessons don't use localStorage/sessionStorage, window.parent,
// or location.search at runtime, so same-origin access is unnecessary and
// would weaken the sandbox. allow-popups and allow-forms support lesson
// demos that open links or render form inputs.
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
