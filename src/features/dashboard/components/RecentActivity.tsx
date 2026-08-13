import { Link } from 'react-router-dom';
import { Bookmark, StickyNote } from 'lucide-react';
import { Card } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { lessonPath } from '@/app/router/routes';
import type { ActivityItem } from '../types';

interface RecentActivityProps {
  items: readonly ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No activity yet"
        message="Bookmark a lesson or add a note while you learn — it'll show up here."
        icon={StickyNote}
      />
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={`${item.kind}-${item.lessonId}`}>
          <Link to={lessonPath(item.lessonId)}>
            <Card interactive className="group flex items-start gap-3 p-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                {item.kind === 'bookmark' ? (
                  <Bookmark className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <StickyNote className="h-4 w-4" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-neutral-500">{item.categoryName}</p>
                <h4 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
                  {item.lessonTitle}
                </h4>
                {item.notePreview && <p className="mt-0.5 truncate text-xs text-neutral-500">{item.notePreview}</p>}
              </div>
              <time className="shrink-0 text-xs text-neutral-500" dateTime={item.timestamp}>
                {formatRelativeTime(item.timestamp)}
              </time>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function formatRelativeTime(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  const diffMinutes = Math.round((Date.now() - date.getTime()) / 60_000);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}
