import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { getLearningPathById, getLearningPathLessonIds } from '@/features/learning-paths';
import { getLessonById, getCategoryById } from '@/features/content';
import { useProgressStore, computeProgressStats, STATUS_BADGE_VARIANTS } from '@/features/progress';
import { BookmarkButton } from '@/features/bookmarks';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { EmptyState } from '@/components/feedback';
import { ROUTE_PATHS, lessonPath } from '@/app/router/routes';
import { DIFFICULTY_COLORS } from '@/lib/constants';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY, formatOverallProgress, formatLessonCount, getCategoryCopy, getDifficultyLabel, getLearningPathCopy, getLearningPathStepNote } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export default function LearningPathDetailPage() {
  const { pathId } = useParams<{ pathId: string }>();
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].learningPathsPage;
  const notFoundCopy = UI_COPY[locale].notFoundPage;

  const path = useMemo(() => (pathId ? getLearningPathById(pathId) : undefined), [pathId]);
  const pathCopy = path ? getLearningPathCopy(locale, path.id) : undefined;
  const lessonIds = useMemo(() => (pathId ? getLearningPathLessonIds(pathId) : []), [pathId]);

  const progressLessons = useProgressStore((s) => s.lessons);
  const stats = useMemo(() => computeProgressStats(progressLessons, lessonIds), [progressLessons, lessonIds]);

  const nextLesson = useMemo(() => {
    for (const id of lessonIds) {
      const status = progressLessons[id]?.status;
      if (status !== 'completed') {
        return getLessonById(id);
      }
    }
    return null;
  }, [lessonIds, progressLessons]);

  if (!path) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: copy.title, path: ROUTE_PATHS.LEARNING_PATHS }, { label: notFoundCopy.title }]} />
        <EmptyState
          title={notFoundCopy.title}
          message={notFoundCopy.message}
          action={
            <Link to={ROUTE_PATHS.LEARNING_PATHS} className="text-sm font-medium text-primary-600 hover:text-primary-700">
              {copy.allPaths}
            </Link>
          }
        />
      </div>
    );
  }

  const isComplete = stats.total > 0 && stats.completed === stats.total;

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: copy.title, path: ROUTE_PATHS.LEARNING_PATHS },
          { label: path.title },
        ]}
      />

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold text-neutral-900">{pathCopy?.title ?? path.title}</h1>
          <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', DIFFICULTY_COLORS[path.level] ?? DIFFICULTY_COLORS.beginner)}>
            {getDifficultyLabel(locale, path.level)}
          </span>
        </div>
        <p className="text-neutral-600">{pathCopy?.description ?? path.description}</p>
        <div className="flex items-center gap-3 pt-1">
          <Badge variant="primary">{formatLessonCount(locale, path.steps.length)}</Badge>
          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <Clock className="h-3.5 w-3.5" />
            {locale === 'ru' ? `${path.estimatedHours} ч. · ${copy.estimated}` : `${path.estimatedHours}h ${copy.estimated}`}
          </span>
        </div>
      </div>

      {stats.total > 0 && (
        <ProgressBar
          value={stats.percent}
          label={formatOverallProgress(locale, stats.completed, stats.total)}
        />
      )}

      {nextLesson && !isComplete && (
        <Link to={lessonPath(nextLesson.id)}>
          <Card interactive className="group flex items-center justify-between p-4 bg-primary-50/50 border-primary-200">
            <div>
              <p className="text-xs font-medium text-primary-600">{copy.continueLearning}</p>
              <p className="mt-0.5 text-sm font-semibold text-neutral-900">{nextLesson.title}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-primary-600 transition-transform group-hover:translate-x-0.5" />
          </Card>
        </Link>
      )}

      {isComplete && (
        <Card className="flex items-center gap-3 p-4 bg-success-50 border-success-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-100 text-success-700">
            <Check className="h-5 w-5" />
          </div>
          <div className="text-sm font-medium text-success-800"><p>{copy.pathComplete}</p><p>{copy.pathCompleteMessage}</p></div>
        </Card>
      )}

      <div className="space-y-2">
        {path.steps.map((step, index) => {
          const lesson = getLessonById(step.lessonId);
          if (!lesson) return null;
          const category = getCategoryById(lesson.categoryId);
          const categoryCopy = getCategoryCopy(locale, lesson.categoryId);
          const status = progressLessons[lesson.id]?.status ?? 'not-started';
          const isCurrent = nextLesson?.id === lesson.id;

          return (
            <Link key={step.lessonId} to={lessonPath(lesson.id)}>
              <Card
                interactive
                className={cn(
                  'group flex items-start gap-4 p-4',
                  isCurrent && 'ring-2 ring-primary-300 border-primary-200',
                )}
              >
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-medium',
                    status === 'completed'
                      ? 'bg-success-100 text-success-700'
                      : isCurrent
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-neutral-100 text-neutral-500',
                  )}
                >
                  {status === 'completed' ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-700">{lesson.title}</h3>
                  {(getLearningPathStepNote(locale, path.id, lesson.id, step.note) || step.note) && <p className="text-sm text-neutral-600">{getLearningPathStepNote(locale, path.id, lesson.id, step.note) || step.note}</p>}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {category && (
                      <span className="flex items-center gap-1 text-xs text-neutral-500">
                        <BookOpen className="h-3 w-3" />
                        {categoryCopy?.name ?? category.name}
                      </span>
                    )}
                    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', DIFFICULTY_COLORS[lesson.difficulty] ?? DIFFICULTY_COLORS.beginner)}>
                      {getDifficultyLabel(locale, lesson.difficulty)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Clock className="h-3 w-3" />
                      {lesson.durationMinutes}m
                    </span>
                    {status !== 'not-started' && (
                      <Badge variant={STATUS_BADGE_VARIANTS[status]}>
                        {status === 'completed' ? UI_COPY[locale].bookmarksPage.statusCompleted : UI_COPY[locale].bookmarksPage.statusInProgress}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 pt-1">
                  <BookmarkButton lessonId={lesson.id} variant="icon" />
                  <ArrowRight className="h-4 w-4 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Link
          to={ROUTE_PATHS.LEARNING_PATHS}
          className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.allPaths}
        </Link>
        {nextLesson && !isComplete && (
          <Link
            to={lessonPath(nextLesson.id)}
            className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            {copy.continueWith} {nextLesson.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
