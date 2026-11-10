import { Link } from 'react-router-dom';
import { Route as RouteIcon, Compass, ArrowRight, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { ROUTE_PATHS } from '@/app/router/routes';
import type { RecommendedItem } from '../types';

interface RecommendedNextProps {
  recommendations: readonly RecommendedItem[];
}

export function RecommendedNext({ recommendations }: RecommendedNextProps) {
  if (recommendations.length === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Recommended Next</h2>
        <EmptyState
          title="You're all caught up"
          message="Explore the full catalog to find your next lesson."
          icon={Compass}
          action={
            <Link
              to={ROUTE_PATHS.COURSES}
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Browse catalog
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-warning-600" />
        <h2 className="text-lg font-semibold text-neutral-900">Recommended Next</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((item) => {
          const Icon = item.kind === 'path' ? RouteIcon : Compass;
          return (
            <Link key={`${item.kind}-${item.id}`} to={item.path}>
              <Card interactive className="group flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
                    {item.kind === 'path' ? 'Path' : 'Course'}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-neutral-600">{item.description}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-xs font-medium text-primary-600">{item.reason}</span>
                  <ArrowRight className="h-4 w-4 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
