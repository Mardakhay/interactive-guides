import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, FileText } from 'lucide-react';
import {
  getLessonById,
  getCategoryById,
  getAdjacentLessons,
  LessonSidebarTree,
  LessonMetadata,
  LessonNavigation,
} from '@/features/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { EmptyState } from '@/components/feedback';
import { ROUTE_PATHS, coursePath } from '@/app/router/routes';

export default function LessonViewerPage() {
  const { lessonId } = useParams<{ lessonId: string }>();

  const lesson = useMemo(() => (lessonId ? getLessonById(lessonId) : undefined), [lessonId]);
  const category = useMemo(
    () => (lesson ? getCategoryById(lesson.categoryId) : undefined),
    [lesson],
  );
  const adjacent = useMemo(
    () => (lessonId ? getAdjacentLessons(lessonId) : { previous: null, next: null }),
    [lessonId],
  );

  if (!lesson || !category) {
    return (
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Catalog', path: ROUTE_PATHS.COURSES },
            { label: 'Lesson not found' },
          ]}
        />
        <EmptyState
          title="Lesson not found"
          message="The lesson you're looking for doesn't exist or may have been removed."
          icon={FileText}
          action={
            <Link to={ROUTE_PATHS.COURSES} className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Back to catalog
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_16rem] xl:grid-cols-[1fr_18rem]">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Catalog', path: ROUTE_PATHS.COURSES },
            { label: category.name, path: coursePath(category.id) },
            { label: lesson.title },
          ]}
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <BookOpen className="h-4 w-4" />
            <span>{category.name}</span>
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900">{lesson.title}</h1>
          <p className="text-neutral-600">{lesson.description}</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 lg:p-8">
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center">
            <BookOpen className="h-5 w-5 shrink-0 text-neutral-400" />
            <p className="text-sm text-neutral-500">
              Interactive lesson content will render here once the HTML rendering system is connected.
            </p>
          </div>
        </div>

        <LessonNavigation previous={adjacent.previous} next={adjacent.next} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <LessonMetadata lesson={lesson} category={category} />
        <div className="rounded-xl border border-neutral-200 bg-white p-3">
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-neutral-400">All Lessons</p>
          <LessonSidebarTree currentLessonId={lesson.id} currentCategoryId={category.id} />
        </div>
      </aside>
    </div>
  );
}
