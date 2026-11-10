import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Check, Compass } from 'lucide-react';
import { getStructuredLessonMetadata } from '@/content/repository';
import { useProgressStore, STATUS_BADGE_VARIANTS } from '@/features/progress';
import { useBookmarkStore, BookmarkButton } from '@/features/bookmarks';
import { Card, Badge, Button } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { ROUTE_PATHS, localizedPath } from '@/app/router/routes';
import { formatLessonCount, translate, useUiLocale } from '@/features/localization';

export default function BookmarksPage() {
  const locale = useUiLocale();
  const bookmarkedLessons = useBookmarkStore((state) => state.lessons);
  const progressLessons = useProgressStore((state) => state.lessons);

  const bookmarks = useMemo(() => {
    return Object.entries(bookmarkedLessons)
      .flatMap(([lessonId, entry]) => {
        const lesson = getStructuredLessonMetadata(lessonId, locale);
        if (!lesson) return [];
        return [{
          id: lesson.id,
          title: lesson.title,
          href: '/' + locale + '/structured-lessons/' + lesson.id,
          createdAt: entry.createdAt,
        }];
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [bookmarkedLessons, locale]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">{translate(locale, 'bookmarks')}</h1>
        <p className="text-neutral-600">
          {bookmarks.length > 0
            ? translate(locale, 'savedLessonsSummary', { count: formatLessonCount(locale, bookmarks.length) })
            : translate(locale, 'savedLessonsFallback')}
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState
          title={translate(locale, 'bookmarksEmptyTitle')}
          message={translate(locale, 'bookmarksEmptyMessage')}
          icon={Bookmark}
          action={
            <Link to={localizedPath(ROUTE_PATHS.COURSES, locale)}>
              <Button variant="primary" size="sm">
                <Compass className="h-4 w-4" />
                {translate(locale, 'browseCatalog')}
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-2">
          {bookmarks.map((lesson) => {
            const status = progressLessons[lesson.id]?.status ?? 'not-started';
            return (
              <Card key={lesson.id} interactive className="group relative flex items-center gap-4 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  {status === 'completed' ? <Check className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
                    <Link to={lesson.href} className="after:absolute after:inset-0 after:content-['']">{lesson.title}</Link>
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">{locale === 'ru' ? 'Структурированная программа' : 'Structured curriculum'}</p>
                </div>
                <div className="relative z-10 flex shrink-0 items-center gap-3">
                  {status !== 'not-started' && (
                    <Badge variant={STATUS_BADGE_VARIANTS[status]}>
                      {translate(locale, status === 'completed' ? 'completed' : 'inProgress')}
                    </Badge>
                  )}
                  <Badge variant="secondary">{locale === 'ru' ? 'Текстовый урок' : 'Text lesson'}</Badge>
                  <BookmarkButton lessonId={lesson.id} variant="icon" />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
