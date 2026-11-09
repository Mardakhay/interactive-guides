import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { getCategoryById, getLessonsByCategory } from '@/features/content';
import { getLearningPaths } from '@/features/learning-paths';
import { formatLessonCount, getLocalizedCategoryCopy, getLocalizedLearningPathCopy, translate, useUiLocale } from '@/features/localization';
import { EmptyState } from '@/components/feedback';
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
        const path = item.kind.endsWith('-path') ? paths.find((candidate) => candidate.id === item.id) : undefined;
        const category = item.kind.endsWith('-category') ? getCategoryById(item.id) : undefined;
        const title = path
          ? getLocalizedLearningPathCopy(locale, path.id, path.title, path.description).title
          : category
            ? getLocalizedCategoryCopy(locale, category.id, category.name, category.description).name
            : item.title;
        const description = item.percent > 0
          ? translate(locale, 'percentComplete', { percent: item.percent })
          : path
            ? translate(locale, 'recommendationPathStart', {
                hours: path.estimatedHours,
                lessons: formatLessonCount(locale, path.lessonCount),
              })
            : category
              ? translate(locale, 'recommendationCategoryStart', {
                  lessons: formatLessonCount(locale, getLessonsByCategory(category.id).length),
                })
              : item.description;
        const kindLabel = path ? 'recommendationPath' : 'recommendationCourse';

        return (
        <Link key={`${item.kind}-${item.id}`} to={item.href}>
          <Card interactive className="group flex h-full flex-col gap-2 p-4">
            <Badge variant="secondary" className="w-fit">
              {translate(locale, kindLabel)}
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
