import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import { ErrorState } from './ErrorState';
import { ROUTE_PATHS } from '@/app/router/routes';

/**
 * Catches render/loader errors thrown within a route subtree and shows the
 * shared ErrorState UI instead of a blank page. "Try Again" reloads the
 * current route; if the error was a 404-style route error, sends the user
 * back to the dashboard instead since reloading would not help.
 */
export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  const title = isNotFound ? 'Page not found' : 'Something went wrong';
  const message = isNotFound
    ? "The page you're looking for doesn't exist or was moved."
    : 'This page ran into an unexpected error. You can try again or head back to the dashboard.';

  const handleRetry = () => {
    if (isNotFound) {
      navigate(ROUTE_PATHS.DASHBOARD);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <ErrorState title={title} message={message} onRetry={handleRetry} />
    </div>
  );
}
