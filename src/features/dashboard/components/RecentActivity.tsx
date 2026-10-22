import { Link } from 'react-router-dom';
import { Bookmark, StickyNote } from 'lucide-react';
import { Card } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { lessonPath } from '@/app/router/routes';
import type { ActivityItem } from '../types';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY, getCategoryCopy } from '@/lib/i18n';

interface RecentActivityProps { items: readonly ActivityItem[]; }

export function RecentActivity({ items }: RecentActivityProps) {
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].dashboard;
  if (items.length === 0) {
    return <EmptyState title={copy.noActivity} message={copy.noActivityMessage} icon={StickyNote} />;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const category = getCategoryCopy(locale, item.categoryName);
        return (
          <li key={`${item.kind}-${item.lessonId}`}>
            <Link to={lessonPath(item.lessonId)}>
              <Card interactive className="group flex items-start gap-3 p-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                  {item.kind === 'bookmark' ? <Bookmark className="h-4 w-4" aria-hidden="true" /> : <StickyNote className="h-4 w-4" aria-hidden="true" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-neutral-500">{item.categoryName}</p>
                  <h4 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-700">{item.lessonTitle}</h4>
                  {item.notePreview && <p className="mt-0.5 truncate text-xs text-neutral-500">{item.notePreview}</p>}
                </div>
                <time className="shrink-0 text-xs text-neutral-500" dateTime={item.timestamp}>{formatRelativeTime(item.timestamp, locale, copy)}</time>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function formatRelativeTime(timestamp: string, locale: 'en' | 'ru', copy: typeof UI_COPY['en']['dashboard']): string {
  const date = new Date(timestamp);
  const diffMinutes = Math.round((Date.now() - date.getTime()) / 60_000);
  if (diffMinutes < 1) return copy.justNow;
  if (diffMinutes < 60) return locale === 'ru' ? `${diffMinutes}${copy.minutesAgo}` : `${diffMinutes}${copy.minutesAgo}`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}${copy.hoursAgo}`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) return `${diffDays}${copy.daysAgo}`;
  return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US');
}
