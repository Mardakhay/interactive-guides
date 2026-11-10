import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import type { RecommendedItem } from '../types';

interface RecommendedNextProps {
  items: readonly RecommendedItem[];
}

const KIND_LABELS: Record<RecommendedItem['kind'], string> = {
  'continue-path': 'Learning path',
  'start-path': 'Learning path',
  'continue-category': 'Course',
  'start-category': 'Course',
};

export function RecommendedNext({ items }: RecommendedNextProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="You're all caught up"
        message="You've made progress across every course and path we have."
        icon={Compass}
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link key={`${item.kind}-${item.id}`} to={item.href}>
          <Card interactive className="group flex h-full flex-col gap-2 p-4">
            <Badge variant="secondary" className="w-fit">
              {KIND_LABELS[item.kind]}
            </Badge>
            <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-700">{item.title}</h4>
            <p className="text-xs text-neutral-500">{item.description}</p>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary-600">
              {item.percent > 0 ? 'Continue' : 'Start'}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
