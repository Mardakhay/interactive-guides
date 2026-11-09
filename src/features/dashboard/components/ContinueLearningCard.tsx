import { Link } from 'react-router-dom';
import { ArrowRight, Check, Compass } from 'lucide-react';
import { getCategoryIcon } from '@/features/content';
import { Card, Badge, Button } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { coursePath, lessonPath } from '@/app/router/routes';
import type { ContinueLearningInfo } from '../types';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY, getCategoryCopy } from '@/lib/i18n';

interface ContinueLearningCardProps { continueLearning: ContinueLearningInfo | null; }

export function ContinueLearningCard({ continueLearning }: ContinueLearningCardProps) {
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].dashboard;
  if (!continueLearning) {
    return <EmptyState title={copy.noLessonsStarted} message={copy.noLessonsStartedMessage} icon={Compass}
      action={<Link to={coursePath('start-here')}><Button variant="primary" size="sm">{copy.startHere}</Button></Link>} />;
  }

  const CategoryIcon = getCategoryIcon(continueLearning.categoryIcon);
  const category = getCategoryCopy(locale, continueLearning.categoryId);
  return (
    <Link to={lessonPath(continueLearning.lessonId)}>
      <Card interactive className="group flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600"><CategoryIcon className="h-6 w-6" /></div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-neutral-500">{category?.name ?? continueLearning.categoryName}</p>
          <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-700">{continueLearning.lessonTitle}</h3>
        </div>
        {continueLearning.status === 'completed'
          ? <Badge variant="success"><Check className="mr-1 h-3 w-3" />{copy.completed}</Badge>
          : <Badge variant="warning">{copy.inProgress}</Badge>}
        <ArrowRight className="h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
      </Card>
    </Link>
  );
}
