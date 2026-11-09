import { CircleAlert as AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  headingLevel?: 'h1' | 'h3';
  announce?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  retryLabel = 'Try again',
  headingLevel = 'h3',
  announce = false,
}: ErrorStateProps) {
  const Heading = headingLevel;
  return (
    <div role={announce ? 'alert' : undefined} className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-100">
        <AlertCircle className="h-6 w-6 text-error-600" />
      </div>
      <div className="space-y-1">
        <Heading className={headingLevel === "h1" ? "text-2xl font-semibold text-neutral-900" : "text-lg font-semibold text-neutral-900"}>{title}</Heading>
        <p className="text-sm text-neutral-600">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
