import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Check, Clock, Compass } from 'lucide-react';
import { getLessonById, getCategoryById, getCategoryIcon } from '@/features/content';
import { getStructuredLessonMetadata } from '@/content/repository';
import { useProgressStore, STATUS_BADGE_VARIANTS } from '@/features/progress';
import { useBookmarkStore, BookmarkButton } from '@/features/bookmarks';
import { Card, Badge, Button } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { DIFFICULTY_COLORS } from '@/lib/constants';
import { ROUTE_PATHS, coursePath, lessonPath } from '@/app/router/routes';
import { cn } from '@/lib/utils';
import { formatLessonCount, getLocalizedCategoryCopy, getLocalizedDifficulty, translate, useUiLocale } from '@/features/localization';

export default function BookmarksPage() {
  const locale = useUiLocale();
  const bookmarkedLessons = useBookmarkStore((s) => s.lessons);
  const progressLessons = useProgressStore((s) => s.lessons);

  const bookmarks = useMemo(() => {
    return Object.entries(bookmarkedLessons)
      .map(([lessonId, entry]) => {
        const classicLesson = getLessonById(lessonId);
        if (classicLesson) {
          const category = getCategoryById(classicLesson.categoryId);
          return {
            kind: 'classic' as const,
            id: classicLesson.id,
            title: classicLesson.title,
            href: lessonPath(classicLesson.id),
            description: classicLesson.description,
            difficulty: classicLesson.difficulty,
            durationMinutes: classicLesson.durationMinutes,
            category,
            categoryId: classicLesson.categoryId,
            categoryName: category?.name ?? (locale === 'ru' ? 'Классический каталог' : 'Classic catalog'),
            createdAt: entry.createdAt,
          };
        }
        const structuredLesson = getStructuredLessonMetadata(lessonId, locale);
        if (!structuredLesson) return null;
        return {
          kind: 'structured' as const,
          id: structuredLesson.id,
          title: structuredLesson.title,
          href: `/${locale}/structured-lessons/${structuredLesson.id}`,
          description: undefined,
          difficulty: undefined,
          durationMinutes: undefined,
          category: undefined,
          categoryId: 'structured-curriculum',
          categoryName: locale === 'ru' ? 'Структурированная программа' : 'Structured curriculum',
          createdAt: entry.createdAt,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
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
            <Link to={ROUTE_PATHS.COURSES}>
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
            const Icon = lesson.kind === 'structured' ? BookOpen : lesson.category ? getCategoryIcon(lesson.category.icon) : Compass;

            return (
              // No outer <Link> here: wrapping the whole Card in an <a> while the
              // category name below is also an <a> produces invalid, inaccessible
              // nested-anchor HTML. Instead, the lesson title link is "stretched"
              // (via the after:absolute after:inset-0 overlay) to cover the full
              // card, so the whole row is still clickable/keyboard-focusable, while
              // the category link and bookmark button remain real, independent,
              // individually focusable interactive elements — siblings, not
              // descendants, of the title link.
              <Card key={lesson.id} interactive className="group relative flex items-center gap-4 p-4">
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-medium',
                    status === 'completed'
                      ? 'bg-success-100 text-success-700'
                      : 'bg-primary-50 text-primary-600',
                  )}
                >
                  {status === 'completed' ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
                    <Link to={lesson.href} className="after:absolute after:inset-0 after:content-['']">
                      {lesson.title}
                    </Link>
                  </h3>
                  {lesson.description && <p className="mt-0.5 line-clamp-1 text-sm text-neutral-600">{lesson.description}</p>}
                  {lesson.kind === 'classic' && lesson.category ? (
                    <Link to={coursePath(lesson.category.id)} className="relative z-10 mt-1 inline-block text-xs text-neutral-500 hover:text-primary-600">
                      {getLocalizedCategoryCopy(locale, lesson.category.id, lesson.category.name, lesson.category.description).name}
                    </Link>
                  ) : (
                    <span className="relative z-10 mt-1 inline-block text-xs text-neutral-500">{lesson.categoryName}</span>
                  )}
                </div>
                <div className="relative z-10 flex shrink-0 items-center gap-3">
                  {status !== 'not-started' && (
                    <Badge variant={STATUS_BADGE_VARIANTS[status]}>
                      {translate(locale, status === 'completed' ? 'completed' : 'inProgress')}
                    </Badge>
                  )}
                  <span
                    className={cn(
                      'hidden rounded-full px-2.5 py-0.5 text-xs font-medium sm:inline-flex',
                      DIFFICULTY_COLORS[lesson.difficulty ?? 'beginner'] ?? DIFFICULTY_COLORS.beginner,
                    )}
                  >
                    {lesson.difficulty ? getLocalizedDifficulty(locale, lesson.difficulty) : (locale === 'ru' ? 'Структурированный урок' : 'Structured lesson')}
                  </span>
                  <span className="hidden items-center gap-1 text-xs text-neutral-500 sm:flex">
                    <Clock className="h-3.5 w-3.5" />
                    {lesson.durationMinutes !== undefined ? `${lesson.durationMinutes}m` : ''}
                  </span>
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
