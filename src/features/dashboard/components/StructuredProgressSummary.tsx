import { Clock, ListChecks, PlayCircle } from 'lucide-react';
import { Card, ProgressBar } from '@/components/ui';
import { translate, useUiLocale } from '@/features/localization';
import type { ProgressStats } from '@/features/progress';

export function StructuredProgressSummary({ completed, inProgress, total, percent }: ProgressStats) {
  const locale = useUiLocale();

  return (
    <section className="space-y-4" aria-labelledby="structured-curriculum-progress-heading">
      <div className="space-y-1">
        <h2 id="structured-curriculum-progress-heading" className="text-lg font-semibold text-neutral-900">
          {translate(locale, 'structuredProgressTitle')}
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-neutral-600">
          {translate(locale, 'structuredProgressDescription')}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <ListChecks className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">{translate(locale, 'dashboardCompletedLabel')}</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{completed}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <PlayCircle className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">{translate(locale, 'dashboardInProgressLabel')}</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{inProgress}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <Clock className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">{translate(locale, 'dashboardTotalLessons')}</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{total}</p>
        </Card>
      </div>
      <Card className="p-5">
        <ProgressBar value={percent} label={translate(locale, 'structuredProgressLabel', { completed, total })} />
      </Card>
    </section>
  );
}
