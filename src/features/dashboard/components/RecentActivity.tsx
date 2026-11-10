import { Link } from 'react-router-dom';
import { Bookmark, StickyNote, Clock, Activity } from 'lucide-react';
import { Card } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { lessonPath } from '@/app/router/routes';
import type { DashboardActivityItem } from '../types';

interface RecentActivityProps {
  activity: readonly DashboardActivityItem[];
}

function formatRelative(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export function RecentActivity({ activity }: RecentActivityProps) {
  if (activity.length === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Recent Activity</h2>
        <EmptyState
          title="No activity yet"
          message="Bookmark a lesson or add a note while reading — your latest activity will show up here."
          icon={Activity}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-neutral-900">Recent Activity</h2>
      <div className="space-y-2">
        {activity.map((item) => {
          const Icon = item.kind === 'bookmark' ? Bookmark : StickyNote;
          return (
            <Link key={`${item.kind}-${item.lessonId}`} to={lessonPath(item.lessonId)}>
              <Card interactive className="group flex items-start gap-3 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                      {item.kind === 'bookmark' ? 'Bookmark' : 'Note'}
                    </span>
                    <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
                      {item.lessonTitle}
                    </h3>
                  </div>
                  {item.preview && (
                    <p className="mt-1 line-clamp-1 text-sm text-neutral-600">{item.preview}</p>
                  )}
                  <p className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
                    <Clock className="h-3 w-3" />
                    {formatRelative(item.timestamp)}
                    {item.categoryName && <span className="mx-1">·</span>}
                    {item.categoryName}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
