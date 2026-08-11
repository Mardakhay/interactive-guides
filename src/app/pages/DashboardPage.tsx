import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, Compass, ListChecks, PlayCircle } from 'lucide-react';
import { getLessons, getLessonById, getCategoryById, getCategoryIcon } from '@/features/content';
import { useProgressStore, computeProgressStats } from '@/features/progress';
import { Card, Badge, ProgressBar, Button } from '@/components/ui';
import { EmptyState } from '@/components/feedback';
import { ROUTE_PATHS, coursePath, lessonPath } from '@/app/router/routes';

export default function DashboardPage() {
  const allLessonIds = useMemo(() => getLessons().map((l) => l.id), []);
  const progressLessons = useProgressStore((s) => s.lessons);
  const lastOpenedLessonId = useProgressStore((s) => s.lastOpenedLessonId);

  const stats = useMemo(
    () => computeProgressStats(progressLessons, allLessonIds),
    [progressLessons, allLessonIds],
  );

  const continueLesson = lastOpenedLessonId ? getLessonById(lastOpenedLessonId) : undefined;
  const continueCategory = continueLesson ? getCategoryById(continueLesson.categoryId) : undefined;
  const ContinueIcon = continueCategory ? getCategoryIcon(continueCategory.icon) : Compass;
  const continueStatus = continueLesson ? (progressLessons[continueLesson.id]?.status ?? 'not-started') : 'not-started';

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600">Your learning progress and recommendations.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <ListChecks className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">Completed</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{stats.completed}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <PlayCircle className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">In Progress</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{stats.inProgress}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-neutral-500">
            <Clock className="h-4 w-4" />
            <p className="text-xs font-medium uppercase tracking-wide">Total Lessons</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{stats.total}</p>
        </Card>
      </div>

      <Card className="p-5">
        <ProgressBar value={stats.percent} label={`Overall progress — ${stats.completed} of ${stats.total} lessons`} />
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Continue Learning</h2>

        {continueLesson && continueCategory ? (
          <Link to={lessonPath(continueLesson.id)}>
            <Card interactive className="group flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <ContinueIcon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-neutral-400">{continueCategory.name}</p>
                <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
                  {continueLesson.title}
                </h3>
              </div>
              {continueStatus === 'completed' ? (
                <Badge variant="success">
                  <Check className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              ) : (
                <Badge variant="warning">In progress</Badge>
              )}
              <ArrowRight className="h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
            </Card>
          </Link>
        ) : (
          <EmptyState
            title="No lessons started yet"
            message="Head to Start Here for an orientation, or browse the full catalog to jump right in."
            icon={Compass}
            action={
              <Link to={coursePath('start-here')}>
                <Button variant="primary" size="sm">
                  Start Here
                </Button>
              </Link>
            }
          />
        )}
      </div>

      {!continueLesson && (
        <Link to={ROUTE_PATHS.COURSES} className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
          Browse full catalog
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
