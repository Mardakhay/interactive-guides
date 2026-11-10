import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check, Clock, Compass } from 'lucide-react';
import { getLessonById, getCategoryById, getCategoryIcon } from '@/features/content';
import { useProgressStore, STATUS_BADGE_VARIANTS } from '@/features/progress';
import { useBookmarkStore, BookmarkButton } from '@/features/bookmarks';
import { Card, Badge, Button } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { DIFFICULTY_COLORS, DIFFICULTY_LABELS } from '@/lib/constants';
import { ROUTE_PATHS, coursePath, lessonPath } from '@/app/router/routes';
import { cn } from '@/lib/utils';

export default function BookmarksPage() {
  const bookmarkedLessons = useBookmarkStore((s) => s.lessons);
  const progressLessons = useProgressStore((s) => s.lessons);

  const bookmarks = useMemo(() => {
    return Object.entries(bookmarkedLessons)
      .map(([lessonId, entry]) => {
        const lesson = getLessonById(lessonId);
        if (!lesson) return null;
        const category = getCategoryById(lesson.categoryId);
        return { lesson, category, createdAt: entry.createdAt };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [bookmarkedLessons]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">Bookmarks</h1>
        <p className="text-neutral-600">
          {bookmarks.length > 0
            ? `${bookmarks.length} saved ${bookmarks.length === 1 ? 'lesson' : 'lessons'}`
            : 'Your saved lessons will appear here.'}
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState
          title="No bookmarks yet"
          message="Bookmark a lesson while you're reading it and it'll show up here for quick access later."
          icon={Bookmark}
          action={
            <Link to={ROUTE_PATHS.COURSES}>
              <Button variant="primary" size="sm">
                <Compass className="h-4 w-4" />
                Browse catalog
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-2">
          {bookmarks.map(({ lesson, category }) => {
            const status = progressLessons[lesson.id]?.status ?? 'not-started';
            const Icon = category ? getCategoryIcon(category.icon) : Compass;

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
                    <Link to={lessonPath(lesson.id)} className="after:absolute after:inset-0 after:content-['']">
                      {lesson.title}
                    </Link>
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-sm text-neutral-600">{lesson.description}</p>
                  {category && (
                    <Link
                      to={coursePath(category.id)}
                      className="relative z-10 mt-1 inline-block text-xs text-neutral-500 hover:text-primary-600"
                    >
                      {category.name}
                    </Link>
                  )}
                </div>
                <div className="relative z-10 flex shrink-0 items-center gap-3">
                  {status !== 'not-started' && (
                    <Badge variant={STATUS_BADGE_VARIANTS[status]}>
                      {status === 'completed' ? 'Completed' : 'In progress'}
                    </Badge>
                  )}
                  <span
                    className={cn(
                      'hidden rounded-full px-2.5 py-0.5 text-xs font-medium sm:inline-flex',
                      DIFFICULTY_COLORS[lesson.difficulty] ?? DIFFICULTY_COLORS.beginner,
                    )}
                  >
                    {DIFFICULTY_LABELS[lesson.difficulty] ?? lesson.difficulty}
                  </span>
                  <span className="hidden items-center gap-1 text-xs text-neutral-500 sm:flex">
                    <Clock className="h-3.5 w-3.5" />
                    {lesson.durationMinutes}m
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
