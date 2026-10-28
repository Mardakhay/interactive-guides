import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { LoadingState } from '@/components/feedback';
import { Modal } from '@/components/ui';
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
 * iframe. This is the active rendering path for all 25 real lessons
 * (see lessonLoader.ts's manifestRegistry).
 *
 * The inline iframe is tall but still page-constrained; an "Expand" button
 * opens the same lesson in a large modal iframe for readers who want more
 * screen real estate (dense reference lessons, wide code samples, etc.).
 */
export function ExternalHtmlLesson({ url, title, sandbox }: ExternalHtmlLessonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedLoading, setIsExpandedLoading] = useState(true);

  const resolvedSandbox = sandbox ?? DEFAULT_SANDBOX;

  return (
    <>
      <div className="relative">
        {isLoading && <LoadingState lines={4} />}
        <iframe
          src={url}
          title={title}
          sandbox={resolvedSandbox}
          onLoad={() => setIsLoading(false)}
          className={cn(
            'h-[80vh] w-full rounded-lg border border-neutral-200 bg-white',
            isLoading && 'hidden',
          )}
        />
        {!isLoading && (
          <button
            type="button"
            onClick={() => {
              setIsExpandedLoading(true);
              setIsExpanded(true);
            }}
            aria-label="Expand lesson to a larger view"
            title="Expand"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white/90 text-neutral-600 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <Modal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        title={title}
        className="h-[95vh] max-w-[95vw]"
      >
        <div className="relative h-full">
          {isExpandedLoading && <LoadingState lines={4} />}
          <iframe
            src={url}
            title={`${title} (expanded view)`}
            sandbox={resolvedSandbox}
            onLoad={() => setIsExpandedLoading(false)}
            className={cn('h-full w-full bg-white', isExpandedLoading && 'hidden')}
          />
        </div>
      </Modal>
    </>
  );
}
