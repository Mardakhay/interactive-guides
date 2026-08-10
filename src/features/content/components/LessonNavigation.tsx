import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Lesson } from '@/features/content/types';
import { lessonPath } from '@/app/router/routes';

interface LessonNavigationProps {
  previous: Lesson | null;
  next: Lesson | null;
}

export function LessonNavigation({ previous, next }: LessonNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav className="flex items-stretch justify-between gap-4 border-t border-neutral-200 pt-6" aria-label="Lesson navigation">
      {previous ? (
        <Link
          to={lessonPath(previous.id)}
          className="group flex flex-1 items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 transition-colors hover:border-primary-300 hover:bg-primary-50"
        >
          <ChevronLeft className="h-5 w-5 shrink-0 text-neutral-400 transition-transform group-hover:-translate-x-0.5 group-hover:text-primary-600" />
          <div className="flex flex-col items-start text-left">
            <span className="text-xs text-neutral-400">Previous</span>
            <span className="line-clamp-1 text-sm font-medium text-neutral-900 group-hover:text-primary-700">
              {previous.title}
            </span>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          to={lessonPath(next.id)}
          className="group flex flex-1 items-center justify-end gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-right transition-colors hover:border-primary-300 hover:bg-primary-50"
        >
          <div className="flex flex-col items-end">
            <span className="text-xs text-neutral-400">Next</span>
            <span className="line-clamp-1 text-sm font-medium text-neutral-900 group-hover:text-primary-700">
              {next.title}
            </span>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
