import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Check } from 'lucide-react';
import { translate, useUiLocale } from '@/features/localization';
import { Card, Badge } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { ROUTE_PATHS, localizedPath } from '@/app/router/routes';
import type { ContinueLearningInfo } from '../types';

interface ContinueLearningCardProps {
  continueLearning: ContinueLearningInfo | null;
}

export function ContinueLearningCard({ continueLearning }: ContinueLearningCardProps) {
  const locale = useUiLocale();

  if (!continueLearning) {
    return (
      <EmptyState
        title={translate(locale, 'noLessonsStartedTitle')}
        message={translate(locale, 'noLessonsStartedMessage')}
        icon={BookOpen}
        action={
          <Link to={localizedPath(ROUTE_PATHS.COURSES, locale)} className="text-sm font-medium text-primary-600 hover:text-primary-700">
            {translate(locale, 'browseCatalog')}
          </Link>
        }
      />
    );
  }

  return (
    <Link to={localizedPath(continueLearning.href, locale)}>
      <Card interactive className="group flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <BookOpen className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-neutral-500">{continueLearning.categoryName}</p>
          <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
            {continueLearning.lessonTitle}
          </h3>
        </div>
        {continueLearning.status === 'completed' ? (
          <Badge variant="success">
            <Check className="mr-1 h-3 w-3" />
            {translate(locale, 'completed')}
          </Badge>
        ) : (
          <Badge variant="warning">{translate(locale, 'inProgress')}</Badge>
        )}
        <ArrowRight className="h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
      </Card>
    </Link>
  );
}
