import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Check, Compass } from 'lucide-react';
import { getCategoryById, getCategoryIcon } from '@/features/content';
import { getLocalizedCategoryCopy, translate, useUiLocale } from '@/features/localization';
import { Card, Badge, Button } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { coursePath } from '@/app/router/routes';
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
        icon={Compass}
        action={
          <Link to={coursePath('start-here')}>
            <Button variant="primary" size="sm">
              {translate(locale, 'startHere')}
            </Button>
          </Link>
        }
      />
    );
  }

  const CategoryIcon = continueLearning.kind === 'structured' ? BookOpen : getCategoryIcon(continueLearning.categoryIcon);
  const category = continueLearning.kind === 'classic' ? getCategoryById(continueLearning.categoryId) : undefined;
  const categoryName = category
    ? getLocalizedCategoryCopy(locale, category.id, category.name, category.description).name
    : continueLearning.categoryName;

  return (
    <Link to={continueLearning.href}>
      <Card interactive className="group flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <CategoryIcon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-neutral-500">{categoryName}</p>
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
