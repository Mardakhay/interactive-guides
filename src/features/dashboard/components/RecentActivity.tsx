import { Link } from 'react-router-dom';
import { Bookmark, StickyNote } from 'lucide-react';
import { Card } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { getCategoryById } from '@/features/content';
import { getLocalizedCategoryCopy, translate, useUiLocale } from '@/features/localization';
import type { ActivityItem } from '../types';

interface RecentActivityProps {
  items: readonly ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  const locale = useUiLocale();

  if (items.length === 0) {
    return (
      <EmptyState
        title={translate(locale, 'noActivityTitle')}
        message={translate(locale, 'noActivityMessage')}
        icon={StickyNote}
      />
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={`${item.kind}-${item.lessonId}`}>
          <Link to={item.href}>
            <Card interactive className="group flex items-start gap-3 p-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                {item.kind === 'bookmark' ? (
                  <Bookmark className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <StickyNote className="h-4 w-4" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-neutral-500">{item.categoryId === 'structured-curriculum' ? item.categoryName : getLocalizedCategoryCopy(locale, item.categoryId, getCategoryById(item.categoryId)?.name ?? item.categoryName, getCategoryById(item.categoryId)?.description ?? '').name}</p>
                <h4 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
                  {item.lessonTitle}
                </h4>
                {item.notePreview && <p className="mt-0.5 truncate text-xs text-neutral-500">{item.notePreview}</p>}
              </div>
              <time className="shrink-0 text-xs text-neutral-500" dateTime={item.timestamp}>
                {formatRelativeTime(item.timestamp, locale)}
              </time>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function formatRelativeTime(isoTimestamp: string, locale: 'en' | 'ru'): string {
  const date = new Date(isoTimestamp);
  const localeTag = locale === 'ru' ? 'ru-RU' : 'en-US';
  const relativeTime = new Intl.RelativeTimeFormat(localeTag, { numeric: 'auto' });
  const diffMinutes = Math.round((date.getTime() - Date.now()) / 60_000);

  if (Math.abs(diffMinutes) < 60) return relativeTime.format(diffMinutes, 'minute');

  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) return relativeTime.format(diffHours, 'hour');

  const diffDays = Math.round(diffHours / 24);
  if (Math.abs(diffDays) < 30) return relativeTime.format(diffDays, 'day');

  return date.toLocaleDateString(localeTag);
}
