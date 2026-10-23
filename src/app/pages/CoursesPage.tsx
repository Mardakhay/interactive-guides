import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Globe,
  Code2,
  Atom,
  Palette,
  Wrench,
  ShieldCheck,
  Lock,
  Database,
  BookOpen,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { getCatalog, getLessonsByCategory, getTotalLessonCount } from '@/features/content';
import { useProgressStore, computeProgressStats } from '@/features/progress';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { coursePath } from '@/app/router/routes';

const ICON_MAP: Record<string, LucideIcon> = {
  Compass,
  Globe,
  Code2,
  Atom,
  Palette,
  Wrench,
  ShieldCheck,
  Lock,
  Database,
};

export default function CoursesPage() {
  const catalog = useMemo(() => getCatalog(), []);
  const totalLessons = useMemo(() => getTotalLessonCount(), []);
  const lessonIdsByCategory = useMemo(
    () =>
      Object.fromEntries(
        catalog.map((category) => [category.id, getLessonsByCategory(category.id).map((l) => l.id)]),
      ),
    [catalog],
  );

  const progressLessons = useProgressStore((s) => s.lessons);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Lesson Catalog</h1>
        <p className="text-neutral-600">
          Browse {totalLessons} interactive lessons across {catalog.length} categories. Start anywhere, learn at your pace.
        </p>
      </div>

      <section aria-labelledby="structured-course-title" className="rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-subtle">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">Structured · English / Русский</p>
              <h2 id="structured-course-title" className="mt-1 text-lg font-semibold text-neutral-950">24-week Frontend Development Bootcamp</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-600">A complete, bilingual curriculum with guided lessons, worked examples, knowledge checks, coding practice and separate supplementary tracks.</p>
            </div>
          </div>
          <Link to="/en/structured-lessons" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">
            Open structured curriculum
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((category) => {
          const Icon = ICON_MAP[category.icon] ?? Compass;
          const stats = computeProgressStats(progressLessons, lessonIdsByCategory[category.id] ?? []);
          return (
            <Link key={category.id} to={coursePath(category.id)}>
              <Card interactive className="group flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="primary">{category.lessonCount} {category.lessonCount === 1 ? 'lesson' : 'lessons'}</Badge>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-neutral-900">{category.name}</h2>
                <p className="mt-1.5 line-clamp-3 text-sm text-neutral-600">{category.description}</p>
                <div className="mt-auto space-y-3 pt-4">
                  {stats.total > 0 && stats.completed > 0 && (
                    <ProgressBar value={stats.percent} label={`${stats.completed}/${stats.total} completed`} />
                  )}
                  <div className="flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700">
                    Explore category
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
