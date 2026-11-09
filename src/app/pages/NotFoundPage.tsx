import { Link } from 'react-router-dom';
import { Chrome as Home } from 'lucide-react';
import { Button } from '@/components/ui';
import { translate, useUiLocale } from '@/features/localization';

export default function NotFoundPage() {
  const locale = useUiLocale();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2">
        <p className="text-6xl font-semibold text-primary-600">404</p>
        <h1 className="text-2xl font-semibold text-neutral-900">{translate(locale, 'notFoundPageTitle')}</h1>
        <p className="text-neutral-600">{translate(locale, 'notFoundPageMessage')}</p>
      </div>
      <Link to="/">
        <Button variant="primary">
          <Home className="h-4 w-4" />
          {translate(locale, 'backToDashboard')}
        </Button>
      </Link>
    </div>
  );
}
