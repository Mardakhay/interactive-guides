import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import { ErrorState } from './ErrorState';
import { ROUTE_PATHS, localizedPath } from '@/app/router/routes';
import { translate, useUiLocale } from '@/features/localization';

/**
 * Catches render/loader errors thrown within a route subtree and shows the
 * shared ErrorState UI instead of a blank page. "Try Again" reloads the
 * current route; if the error was a 404-style route error, sends the user
 * back to the dashboard instead since reloading would not help.
 */
export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const locale = useUiLocale();

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  const title = translate(locale, isNotFound ? 'pageNotFound' : 'somethingWentWrong');
  const message = translate(locale, isNotFound ? 'pageNotFoundMessage' : 'routeErrorMessage');

  const handleRetry = () => {
    if (isNotFound) {
      navigate(localizedPath(ROUTE_PATHS.DASHBOARD, locale));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <ErrorState title={title} message={message} retryLabel={translate(locale, 'tryAgain')} headingLevel="h1" announce onRetry={handleRetry} />
    </div>
  );
}
