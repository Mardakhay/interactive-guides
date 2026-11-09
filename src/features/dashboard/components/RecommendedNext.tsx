import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import type { RecommendedItem } from '../types';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY } from '@/lib/i18n';

interface RecommendedNextProps { items: readonly RecommendedItem[]; }

export function RecommendedNext({ items }: RecommendedNextProps) {
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].dashboard;
  if (items.length === 0) {
    return <EmptyState title={copy.allCaughtUp} message={copy.allCaughtUpMessage} icon={Compass} />;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link key={`${item.kind}-${item.id}`} to={item.href}>
          <Card interactive className="group flex h-full flex-col gap-2 p-4">
            <Badge variant="secondary" className="w-fit">{item.kind.includes('path') ? copy.learningPath : copy.course}</Badge>
            <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-700">{item.title}</h4>
            <p className="text-xs text-neutral-500">{item.description}</p>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary-600">
              {item.percent > 0 ? copy.continue : copy.start}<ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
