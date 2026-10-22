import { Clock, ListChecks, PlayCircle } from 'lucide-react';
import { Card, ProgressBar } from '@/components/ui';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY, formatOverallProgress } from '@/lib/i18n';

interface ProgressSummaryProps { completed: number; inProgress: number; total: number; percent: number; }

export function ProgressSummary({ completed, inProgress, total, percent }: ProgressSummaryProps) {
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].dashboard;
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500"><ListChecks className="h-4 w-4" /><p className="text-xs font-medium uppercase tracking-wide">{copy.completed}</p></div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{completed}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500"><PlayCircle className="h-4 w-4" /><p className="text-xs font-medium uppercase tracking-wide">{copy.inProgress}</p></div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{inProgress}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500"><Clock className="h-4 w-4" /><p className="text-xs font-medium uppercase tracking-wide">{copy.totalLessons}</p></div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{total}</p>
        </Card>
      </div>
      <Card className="p-5"><ProgressBar value={percent} label={formatOverallProgress(locale, completed, total)} /></Card>
    </div>
  );
}
