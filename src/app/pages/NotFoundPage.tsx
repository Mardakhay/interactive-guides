import { Link } from 'react-router-dom';
import { Chrome as Home } from 'lucide-react';
import { Button } from '@/components/ui';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY } from '@/lib/i18n';

export default function NotFoundPage() {
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].notFoundPage;
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2">
        <p className="text-6xl font-semibold text-primary-600">404</p>
        <h1 className="text-2xl font-semibold text-neutral-900">{copy.title}</h1>
        <p className="text-neutral-600">{copy.message}</p>
      </div>
      <Link to="/"><Button variant="primary"><Home className="h-4 w-4" />{copy.backHome}</Button></Link>
    </div>
  );
}
