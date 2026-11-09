import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, Code2, Atom, Palette, Wrench, ShieldCheck, Lock, Database, ArrowRight, type LucideIcon } from 'lucide-react';
import { getCatalog, getLessonsByCategory, getTotalLessonCount } from '@/features/content';
import { useProgressStore, computeProgressStats } from '@/features/progress';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { coursePath } from '@/app/router/routes';
import { getBootcampCurriculum, getStructuredLesson } from '@/content/repository';
import { STATUS_BADGE_VARIANTS } from '@/features/progress';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY, formatCatalogDescription, formatLessonCount, formatOverallProgress, getCategoryCopy, getLessonStatusLabel, formatDurationMinutes } from '@/lib/i18n';

const ICON_MAP: Record<string, LucideIcon> = { Compass, Globe, Code2, Atom, Palette, Wrench, ShieldCheck, Lock, Database };

export default function CoursesPage() {
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].catalog;
  const curriculumCopy = UI_COPY[locale].structuredCurriculum;
  const curriculum = useMemo(() => getBootcampCurriculum(locale), [locale]);
  const catalog = useMemo(() => getCatalog(), []);
  const totalLessons = useMemo(() => getTotalLessonCount(), []);
  const lessonIdsByCategory = useMemo(
    () => Object.fromEntries(catalog.map((category) => [category.id, getLessonsByCategory(category.id).map((lesson) => lesson.id)])),
    [catalog],
  );
  const progressLessons = useProgressStore((state) => state.lessons);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">{copy.title}</h1>
        <p className="text-neutral-600">{formatCatalogDescription(locale, totalLessons, catalog.length)}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((category) => {
          const Icon = ICON_MAP[category.icon] ?? Compass;
          const stats = computeProgressStats(progressLessons, lessonIdsByCategory[category.id] ?? []);
          const translated = getCategoryCopy(locale, category.id);
          const categoryName = translated?.name ?? category.name;
          const categoryDescription = translated?.description ?? category.description;
          return (
            <Link key={category.id} to={coursePath(category.id)}>
              <Card interactive className="group flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600"><Icon className="h-5 w-5" /></div>
                  <Badge variant="primary">{formatLessonCount(locale, category.lessonCount)}</Badge>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-neutral-900">{categoryName}</h2>
                <p className="mt-1.5 line-clamp-3 text-sm text-neutral-600">{categoryDescription}</p>
                <div className="mt-auto space-y-3 pt-4">
                  {stats.total > 0 && stats.completed > 0 && (
                    <ProgressBar value={stats.percent} label={formatOverallProgress(locale, stats.completed, stats.total)} />
                  )}
                  <div className="flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700">
                    {copy.exploreCategory}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <section className="space-y-4" aria-labelledby="structured-curriculum-title">
        <div className="space-y-1">
          <h2 id="structured-curriculum-title" className="text-xl font-semibold text-neutral-900">{curriculumCopy.title}</h2>
          <p className="max-w-3xl text-sm leading-6 text-neutral-600">{curriculumCopy.description}</p>
        </div>

        <div className="space-y-3">
          {curriculum.months.map((month) => (
            <details key={month.id} open={month.number === 1} className="group rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle sm:p-5">
              <summary className="flex cursor-pointer list-none items-start gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-sm font-semibold text-primary-700">{month.number}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-neutral-900">{month.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-neutral-600">{month.goal}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-neutral-500">{month.weeks.length} {locale === 'ru' ? 'недели' : (month.weeks.length === 1 ? 'week' : 'weeks')}</span>
              </summary>

              <div className="mt-4 grid gap-3 border-t border-neutral-100 pt-4 md:grid-cols-2">
                {month.weeks.map((week) => {
                  const lessons = week.lessonIds
                    .map((lessonId) => getStructuredLesson(lessonId, locale))
                    .filter((lesson): lesson is NonNullable<typeof lesson> => lesson !== undefined);

                  return (
                    <section key={week.id} className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">{curriculumCopy.weekLabel} {week.number}</p>
                      <h4 className="mt-1 text-sm font-semibold text-neutral-900">{week.title}</h4>
                      <p className="mt-1 text-xs leading-5 text-neutral-600">{week.topics.slice(0, 2).join(' · ')}</p>
                      {lessons.length > 0 ? (
                        <div className="mt-3 space-y-2">
                          {lessons.map((lesson) => {
                            const progressStatus = progressLessons[lesson.id]?.status ?? 'not-started';
                            return (
                              <Link key={lesson.id} to={`/${locale}/structured-lessons/${lesson.id}`} className="group/lesson block rounded-lg border border-neutral-200 bg-white p-3 transition-colors hover:border-primary-300 hover:bg-primary-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="text-sm font-medium text-neutral-900 group-hover/lesson:text-primary-700">{lesson.title}</span>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <Badge variant={lesson.status === 'published' ? 'success' : 'warning'}>{lesson.status === 'published' ? curriculumCopy.published : curriculumCopy.underReview}</Badge>
                                    {progressStatus !== 'not-started' && <Badge variant={STATUS_BADGE_VARIANTS[progressStatus]}>{getLessonStatusLabel(locale, progressStatus)}</Badge>}
                                  </div>
                                </div>
                                <p className="mt-1 text-xs leading-5 text-neutral-600">{lesson.description}</p>
                                <p className="mt-2 text-xs text-neutral-500">{formatDurationMinutes(locale, lesson.estimatedMinutes)}</p>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-neutral-500">{curriculumCopy.noLessonAvailable}</p>
                      )}
                    </section>
                  );
                })}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
