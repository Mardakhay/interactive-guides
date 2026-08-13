import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  useDashboardData,
  ContinueLearningCard,
  ProgressSummary,
  RecentActivity,
  RecommendedNext,
} from '@/features/dashboard';
import { ROUTE_PATHS } from '@/app/router/routes';

export default function DashboardPage() {
  const data = useDashboardData();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600">Your learning progress and recommendations.</p>
      </div>

      <ProgressSummary
        completed={data.completed}
        inProgress={data.inProgress}
        total={data.total}
        percent={data.percent}
      />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Continue Learning</h2>
        <ContinueLearningCard continueLearning={data.continueLearning} />
        {!data.continueLearning && (
          <Link
            to={ROUTE_PATHS.COURSES}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Browse full catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Recommended for you</h2>
        <RecommendedNext items={data.recommendations} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Recent activity</h2>
        <RecentActivity items={data.recentActivity} />
      </div>
    </div>
  );
}
