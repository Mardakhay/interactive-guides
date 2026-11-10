import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { getLearningPaths } from '@/features/learning-paths';
import { getLocalizedLearningPathCopy, translate, useUiLocale } from '@/features/localization';
import { EmptyState } from '@/components/feedback';
import { localizedPath } from '@/app/router/routes';
import type { RecommendedItem } from '../types';

interface RecommendedNextProps {
  items: readonly RecommendedItem[];
}

export function RecommendedNext({ items }: RecommendedNextProps) {
  const locale = useUiLocale();
  const paths = getLearningPaths();

  if (items.length === 0) {
    return (
      <EmptyState
        title={translate(locale, 'caughtUpTitle')}
        message={translate(locale, 'caughtUpMessage')}
        icon={Compass}
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const path = paths.find((candidate) => candidate.id === item.id);
        const title = path
          ? getLocalizedLearningPathCopy(locale, path.id, path.title, path.description).title
          : item.title;
        const description = item.percent > 0
          ? translate(locale, 'percentComplete', { percent: item.percent })
          : path
            ? translate(locale, 'recommendationPathStart', { hours: path.estimatedHours, lessons: path.lessonCount })
            : item.description;

        return (
          <Link key={`${item.kind}-${item.id}`} to={localizedPath(item.href, locale)}>
            <Card interactive className="group flex h-full flex-col gap-2 p-4">
              <Badge variant="secondary" className="w-fit">
                {translate(locale, 'recommendationPath')}
              </Badge>
              <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-700">{title}</h4>
              <p className="text-xs text-neutral-500">{description}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary-600">
                {translate(locale, item.percent > 0 ? 'continueAction' : 'startAction')}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
