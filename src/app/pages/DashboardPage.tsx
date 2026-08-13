import { useDashboardData } from '@/features/dashboard';
import { ProgressSummary, ContinueLearningCard, RecentActivity, RecommendedNext } from '@/features/dashboard';

export default function DashboardPage() {
  const data = useDashboardData();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600">Your learning progress and recommendations.</p>
      </div>

      <ProgressSummary progress={data.progress} />
      <ContinueLearningCard continueLearning={data.continueLearning} />
      <RecentActivity activity={data.activity} />
      <RecommendedNext recommendations={data.recommendations} />
    </div>
  );
}
