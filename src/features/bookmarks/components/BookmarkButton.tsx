import { Bookmark } from 'lucide-react';
import { useBookmarkStore } from '../store';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  lessonId: string;
  /** 'button' renders a labeled Button (lesson viewer header). 'icon' renders a bare icon-only toggle (list rows). */
  variant?: 'button' | 'icon';
  className?: string;
}

export function BookmarkButton({ lessonId, variant = 'button', className }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((s) => !!s.lessons[lessonId]);
  const toggleBookmark = useBookmarkStore((s) => s.toggleBookmark);

  const handleClick = (event: React.MouseEvent) => {
    // Prevent triggering a parent <Link> (e.g. in a lesson list row) when the button is nested inside one.
    event.preventDefault();
    event.stopPropagation();
    toggleBookmark(lessonId);
  };

  const label = isBookmarked ? 'Remove bookmark' : 'Add bookmark';

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={isBookmarked}
        aria-label={label}
        title={label}
        className={cn(
          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
          'hover:bg-neutral-100 active:bg-neutral-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
          className,
        )}
      >
        <Bookmark
          className={cn(
            'h-4 w-4 transition-colors',
            isBookmarked ? 'fill-primary-600 text-primary-600' : 'text-neutral-500',
          )}
        />
      </button>
    );
  }

  return (
    <Button
      variant={isBookmarked ? 'secondary' : 'outline'}
      size="sm"
      onClick={handleClick}
      aria-pressed={isBookmarked}
      className={className}
    >
      <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  );
}
