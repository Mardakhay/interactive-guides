import { Skeleton } from './Skeleton';

interface LoadingStateProps {
  lines?: number;
}

export function LoadingState({ lines = 3 }: LoadingStateProps) {
  return (
    <div className="space-y-4 py-8">
      <Skeleton className="h-8 w-48" />
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
