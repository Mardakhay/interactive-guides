import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { getCategoryById, getLessonsByCategory, getCategoryIcon } from '@/features/content';
import { useProgressStore, computeProgressStats, STATUS_BADGE_VARIANTS } from '@/features/progress';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { EmptyState } from '@/components/feedback';
import { DIFFICULTY_COLORS, DIFFICULTY_LABELS } from '@/lib/constants';
import { ROUTE_PATHS, lessonPath } from '@/app/router/routes';
import { cn } from '@/lib/utils';

export default function CourseDetailPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const category = useMemo(() => (categoryId ? getCategoryById(categoryId) : undefined), [categoryId]);
  const lessons = useMemo(() => (categoryId ? getLessonsByCategory(categoryId) : []), [categoryId]);

  const progressLessons = useProgressStore((s) => s.lessons);
  const stats = useMemo(
    () => computeProgressStats(progressLessons, lessons.map((l) => l.id)),
    [progressLessons, lessons],
  );

  if (!category) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Catalog', path: ROUTE_PATHS.COURSES }, { label: 'Category not found' }]} />
        <EmptyState
          title="Category not found"
          message="The category you're looking for doesn't exist."
          action={
            <Link to={ROUTE_PATHS.COURSES} className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Back to catalog
            </Link>
          }
        />
      </div>
    );
  }

  const Icon = getCategoryIcon(category.icon);

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Catalog', path: ROUTE_PATHS.COURSES },
          { label: category.name },
        ]}
      />

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-neutral-900">{category.name}</h1>
          <p className="text-neutral-600">{category.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <Badge variant="primary">{lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}</Badge>
      </div>

      {stats.total > 0 && (
        <ProgressBar
          value={stats.percent}
          label={`${stats.completed} of ${stats.total} lessons completed`}
        />
      )}

      <div className="space-y-2">
        {lessons.map((lesson, index) => {
          const status = progressLessons[lesson.id]?.status ?? 'not-started';
          return (
            <Link key={lesson.id} to={lessonPath(lesson.id)}>
              <Card interactive className="group flex items-center gap-4 p-4">
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-medium',
                    status === 'completed'
                      ? 'bg-success-100 text-success-700'
                      : 'bg-neutral-100 text-neutral-500',
                  )}
                >
                  {status === 'completed' ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-700">{lesson.title}</h3>
                  <p className="mt-0.5 line-clamp-1 text-sm text-neutral-600">{lesson.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {status !== 'not-started' && (
                    <Badge variant={STATUS_BADGE_VARIANTS[status]}>
                      {status === 'completed' ? 'Completed' : 'In progress'}
                    </Badge>
                  )}
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                      DIFFICULTY_COLORS[lesson.difficulty] ?? DIFFICULTY_COLORS.beginner,
                    )}
                  >
                    {DIFFICULTY_LABELS[lesson.difficulty] ?? lesson.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-400">
                    <Clock className="h-3.5 w-3.5" />
                    {lesson.durationMinutes}m
                  </span>
                  <ArrowRight className="h-4 w-4 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
