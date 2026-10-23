import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Code2, Atom, Wrench, ShieldCheck, Route as RouteIcon, Clock, ArrowRight, type LucideIcon } from 'lucide-react';
import { getLearningPaths } from '@/features/learning-paths';
import { getLearningPathLessonIds } from '@/features/learning-paths';
import { useProgressStore, computeProgressStats } from '@/features/progress';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { learningPathDetailPath } from '@/app/router/routes';
import { DIFFICULTY_COLORS } from '@/lib/constants';
import { formatLessonCount, getLocalizedDifficulty, translate, useUiLocale } from '@/features/localization';

const ICON_MAP: Record<string, LucideIcon> = { Globe, Code2, Atom, Wrench, ShieldCheck };
const LEVEL_COLORS = DIFFICULTY_COLORS;

export default function LearningPathsPage() {
  const locale = useUiLocale();
  const paths = useMemo(() => getLearningPaths(), []);
  const progressLessons = useProgressStore((s) => s.lessons);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">{translate(locale, 'learningPaths')}</h1>
        <p className="text-neutral-600">
          {translate(locale, 'pathListDescription')}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => {
          const Icon = ICON_MAP[path.icon] ?? RouteIcon;
          const lessonIds = getLearningPathLessonIds(path.id);
          const stats = computeProgressStats(progressLessons, lessonIds);
          return (
            <Link key={path.id} to={learningPathDetailPath(path.id)}>
              <Card interactive className="group flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${LEVEL_COLORS[path.level] ?? LEVEL_COLORS.beginner}`}
                  >
                    {getLocalizedDifficulty(locale, path.level)}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-neutral-900">{path.title}</h2>
                <p className="mt-1.5 line-clamp-3 text-sm text-neutral-600">{path.description}</p>
                <div className="mt-auto space-y-3 pt-4">
                  {stats.completed > 0 && (
                    <ProgressBar value={stats.percent} label={translate(locale, 'completedProgress', { completed: stats.completed, total: stats.total })} />
                  )}
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <Badge variant="primary">{formatLessonCount(locale, path.lessonCount)}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {path.estimatedHours}{translate(locale, 'hourUnit')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700">
                    {translate(locale, 'viewPath')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
