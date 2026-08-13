import { Clock, ListChecks, PlayCircle } from 'lucide-react';
import { Card, ProgressBar } from '@/components/ui';

interface ProgressSummaryProps {
  completed: number;
  inProgress: number;
  total: number;
  percent: number;
}

export function ProgressSummary({ completed, inProgress, total, percent }: ProgressSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <ListChecks className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">Completed</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{completed}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <PlayCircle className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">In Progress</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{inProgress}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <Clock className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">Total Lessons</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{total}</p>
        </Card>
      </div>

      <Card className="p-5">
        <ProgressBar value={percent} label={`Overall progress — ${completed} of ${total} lessons`} />
      </Card>
    </div>
  );
}
