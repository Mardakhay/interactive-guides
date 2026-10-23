import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, FileText } from 'lucide-react';
import { getCategories, getLessonsByCategory, getCategoryIcon } from '@/features/content';
import { lessonPath } from '@/app/router/routes';
import { cn } from '@/lib/utils';

interface LessonSidebarTreeProps {
  currentLessonId?: string;
  currentCategoryId?: string;
}

export function LessonSidebarTree({ currentLessonId, currentCategoryId }: LessonSidebarTreeProps) {
  const categories = getCategories();
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(currentCategoryId ? [currentCategoryId] : []),
  );

  useEffect(() => {
    if (currentCategoryId) {
      setExpanded((prev) => {
        if (prev.has(currentCategoryId)) return prev;
        return new Set([...prev, currentCategoryId]);
      });
    }
  }, [currentCategoryId]);

  function toggle(categoryId: string): void {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }

  return (
    <nav aria-label="Lesson tree" className="space-y-0.5">
      {categories.map((category) => {
        const isExpanded = expanded.has(category.id);
        const lessons = getLessonsByCategory(category.id);
        const Icon = getCategoryIcon(category.icon);
        const isCurrentCategory = currentCategoryId === category.id;

        return (
          <div key={category.id}>
            <button
              onClick={() => toggle(category.id)}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isCurrentCategory
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-700 hover:bg-neutral-100',
              )}
              aria-expanded={isExpanded}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{category.name}</span>
              <span className="text-xs text-neutral-500">{lessons.length}</span>
              <ChevronDown
                className={cn('h-4 w-4 shrink-0 text-neutral-500 transition-transform', isExpanded && 'rotate-180')}
              />
            </button>
            {isExpanded && (
              <ul className="ml-3 border-l border-neutral-200 pl-2 pt-0.5">
                {lessons.map((lesson) => {
                  const isCurrent = currentLessonId === lesson.id;
                  return (
                    <li key={lesson.id}>
                      <Link
                        to={lessonPath(lesson.id)}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
                          isCurrent
                            ? 'bg-primary-100 font-medium text-primary-700'
                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                        )}
                      >
                        <FileText className={cn('h-3.5 w-3.5 shrink-0', isCurrent ? 'text-primary-600' : 'text-neutral-300')} />
                        <span className="line-clamp-1">{lesson.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
