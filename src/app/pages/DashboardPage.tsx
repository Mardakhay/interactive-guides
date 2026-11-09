import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  useDashboardData, ContinueLearningCard, ProgressSummary, RecentActivity, RecommendedNext,
} from '@/features/dashboard';
import { ROUTE_PATHS } from '@/app/router/routes';
import { UI_COPY } from '@/lib/i18n';
import { useLocaleStore } from '@/stores/localeStore';

export default function DashboardPage() {
  const data = useDashboardData();
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].dashboard;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">{copy.title}</h1>
        <p className="text-neutral-600">{copy.subtitle}</p>
      </div>

      <ProgressSummary completed={data.completed} inProgress={data.inProgress} total={data.total} percent={data.percent} />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">{copy.continueLearning}</h2>
        <ContinueLearningCard continueLearning={data.continueLearning} />
        {!data.continueLearning && (
          <Link to={ROUTE_PATHS.COURSES} className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
            {copy.browseCatalog}<ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <section className="rounded-2xl border border-primary-200 bg-gradient-to-br from-white to-primary-50/70 p-5 sm:p-6" aria-labelledby="structured-lessons-preview">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">{copy.newContentFormat}</p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id="structured-lessons-preview" className="text-lg font-semibold text-neutral-950">{copy.previewStructuredLesson}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{copy.previewDescription}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/en/structured-lessons/html.document-structure" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">
              {copy.openEnglishLesson}<ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/ru/structured-lessons/html.document-structure" className="inline-flex min-h-10 items-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-primary-300 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700" lang="ru">
              {copy.openRussianLesson}
            </Link>
          </div>
        </div>
      </section>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">{copy.recommendedForYou}</h2>
        <RecommendedNext items={data.recommendations} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">{copy.recentActivity}</h2>
        <RecentActivity items={data.recentActivity} />
      </div>
    </div>
  );
}
