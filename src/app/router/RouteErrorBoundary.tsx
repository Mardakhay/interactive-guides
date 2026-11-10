import { useRouteError } from 'react-router-dom';
import { ErrorState } from '@/components/feedback';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const message =
    error && typeof error === 'object' && 'message' in error && typeof error.message === 'string'
      ? error.message
      : undefined;

  return (
    <ErrorState
      title="Page Error"
      message={message ?? 'This page failed to load. Try navigating back or reload.'}
    />
  );
}
