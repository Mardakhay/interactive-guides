import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  useDashboardData,
  ContinueLearningCard,
  ProgressSummary,
  StructuredProgressSummary,
  RecentActivity,
  RecommendedNext,
} from '@/features/dashboard';
import { ROUTE_PATHS } from '@/app/router/routes';
import { translate, useUiLocale } from '@/features/localization';

export default function DashboardPage() {
  const locale = useUiLocale();
  const data = useDashboardData(locale);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">{translate(locale, 'dashboard')}</h1>
        <p className="text-neutral-600">{translate(locale, 'dashboardDescription')}</p>
      </div>

      <ProgressSummary
        completed={data.completed}
        inProgress={data.inProgress}
        total={data.total}
        percent={data.percent}
      />

      <StructuredProgressSummary {...data.structuredProgress} />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">{translate(locale, 'continueLearning')}</h2>
        <ContinueLearningCard continueLearning={data.continueLearning} />
        {!data.continueLearning && (
          <Link
            to={ROUTE_PATHS.COURSES}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            {translate(locale, 'browseCatalog')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">{translate(locale, 'recommendedForYou')}</h2>
        <RecommendedNext items={data.recommendations} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">{translate(locale, 'recentActivity')}</h2>
        <RecentActivity items={data.recentActivity} />
      </div>
    </div>
  );
}
