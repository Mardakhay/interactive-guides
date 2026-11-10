import { ListChecks, CirclePlay as PlayCircle, Clock } from 'lucide-react';
import { Card, ProgressBar } from '@/components/ui';
import type { DashboardProgressSummary } from '../types';

interface ProgressSummaryProps {
  progress: DashboardProgressSummary;
}

export function ProgressSummary({ progress }: ProgressSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <ListChecks className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">Completed</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{progress.completed}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <PlayCircle className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">In Progress</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{progress.inProgress}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <Clock className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">Total Lessons</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{progress.total}</p>
        </Card>
      </div>

      <Card className="p-5">
        <ProgressBar
          value={progress.percent}
          label={`Overall progress — ${progress.completed} of ${progress.total} lessons`}
        />
      </Card>
    </div>
  );
}
