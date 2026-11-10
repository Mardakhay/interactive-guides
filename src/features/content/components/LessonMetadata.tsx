import { Link } from 'react-router-dom';
import { Clock, Tag, FolderOpen } from 'lucide-react';
import type { Lesson, Category } from '@/features/content/types';
import { Badge } from '@/components/ui';
import { DIFFICULTY_COLORS, DIFFICULTY_LABELS } from '@/lib/constants';
import { coursePath } from '@/app/router/routes';
import { cn } from '@/lib/utils';

interface LessonMetadataProps {
  lesson: Lesson;
  category: Category;
  /** Optional status badge, injected by the page so this feature stays decoupled from progress tracking. */
  statusBadge?: React.ReactNode;
}

export function LessonMetadata({ lesson, category, statusBadge }: LessonMetadataProps) {
  return (
    <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4">
      {statusBadge && (
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Status</p>
          <div className="mt-1">{statusBadge}</div>
        </div>
      )}

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Difficulty</p>
        <span
          className={cn(
            'mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
            DIFFICULTY_COLORS[lesson.difficulty] ?? DIFFICULTY_COLORS.beginner,
          )}
        >
          {DIFFICULTY_LABELS[lesson.difficulty] ?? lesson.difficulty}
        </span>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Duration</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-700">
          <Clock className="h-4 w-4 text-neutral-400" />
          {lesson.durationMinutes} minutes
        </p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Category</p>
        <Link
          to={coursePath(category.id)}
          className="mt-1 flex items-center gap-1.5 text-sm text-primary-600 transition-colors hover:text-primary-700"
        >
          <FolderOpen className="h-4 w-4" />
          {category.name}
        </Link>
      </div>

      {lesson.tags.length > 0 && (
        <div>
          <p className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
            <Tag className="h-3 w-3" />
            Tags
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {lesson.tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
