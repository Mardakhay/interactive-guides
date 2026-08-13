import { Link } from 'react-router-dom';
import { ArrowRight, Check, Compass } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { getCategoryIcon } from '@/features/content';
import { ROUTE_PATHS, coursePath, lessonPath } from '@/app/router/routes';
import type { DashboardContinueLearning } from '../types';

interface ContinueLearningCardProps {
  continueLearning: DashboardContinueLearning | null;
}

export function ContinueLearningCard({ continueLearning }: ContinueLearningCardProps) {
  if (!continueLearning) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Continue Learning</h2>
        <EmptyState
          title="No lessons started yet"
          message="Head to Start Here for an orientation, or browse the full catalog to jump right in."
          icon={Compass}
          action={
            <Link to={coursePath('start-here')}>
              <Button variant="primary" size="sm">
                Start Here
              </Button>
            </Link>
          }
        />
        <Link
          to={ROUTE_PATHS.COURSES}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Browse full catalog
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const ContinueIcon = getCategoryIcon(continueLearning.categoryIcon);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-neutral-900">Continue Learning</h2>
      <Link to={lessonPath(continueLearning.lessonId)}>
        <Card interactive className="group flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <ContinueIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-neutral-400">{continueLearning.categoryName}</p>
            <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
              {continueLearning.lessonTitle}
            </h3>
          </div>
          {continueLearning.status === 'completed' ? (
            <Badge variant="success">
              <Check className="mr-1 h-3 w-3" />
              Completed
            </Badge>
          ) : (
            <Badge variant="warning">In progress</Badge>
          )}
          <ArrowRight className="h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
        </Card>
      </Link>
    </div>
  );
}
