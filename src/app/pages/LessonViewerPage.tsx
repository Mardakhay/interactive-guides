import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookOpen, FileText, Check, RotateCcw } from 'lucide-react';
import {
  getLessonById,
  getCategoryById,
  getAdjacentLessons,
  LessonSidebarTree,
  LessonMetadata,
  LessonNavigation,
} from '@/features/content';
import { LessonRenderer, resolveLessonSource } from '@/features/lesson-renderer';
import { useProgressStore, STATUS_BADGE_VARIANTS } from '@/features/progress';
import { BookmarkButton } from '@/features/bookmarks';
import { NoteEditor } from '@/features/notes';
import { getQuizByLessonId, QuizRenderer } from '@/features/quizzes';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { EmptyState } from '@/components/feedback';
import { Button, Badge } from '@/components/ui';
import { ROUTE_PATHS, coursePath, lessonPath, localizedPath } from '@/app/router/routes';
import { getLocalizedCategoryCopy, translate, useUiLocale } from '@/features/localization';

const AUTO_ADVANCE_DELAY_MS = 900;

export default function LessonViewerPage() {
  const locale = useUiLocale();
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const lesson = useMemo(() => (lessonId ? getLessonById(lessonId) : undefined), [lessonId]);
  const category = useMemo(
    () => (lesson ? getCategoryById(lesson.categoryId) : undefined),
    [lesson],
  );
  const adjacent = useMemo(
    () => (lessonId ? getAdjacentLessons(lessonId) : { previous: null, next: null }),
    [lessonId],
  );
  const quiz = useMemo(() => (lessonId ? getQuizByLessonId(lessonId) : undefined), [lessonId]);

  const markLessonOpened = useProgressStore((s) => s.markLessonOpened);
  const markLessonCompleted = useProgressStore((s) => s.markLessonCompleted);
  const markLessonIncomplete = useProgressStore((s) => s.markLessonIncomplete);
  const status = useProgressStore((s) =>
    lessonId ? (s.lessons[lessonId]?.status ?? 'not-started') : 'not-started',
  );

  const [justCompleted, setJustCompleted] = useState(false);
  const advanceTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Mark the lesson as opened (starts it) whenever the lesson id changes.
  useEffect(() => {
    if (lessonId) markLessonOpened(lessonId);
  }, [lessonId, markLessonOpened]);

  // Reset the "just completed" transition flag when navigating to a different lesson,
  // and clear any pending auto-advance timer from the previous lesson.
  useEffect(() => {
    setJustCompleted(false);
    return () => {
      if (advanceTimeout.current) clearTimeout(advanceTimeout.current);
    };
  }, [lessonId]);

  const handleMarkComplete = () => {
    if (!lessonId) return;
    markLessonCompleted(lessonId);
    setJustCompleted(true);

    if (adjacent.next) {
      advanceTimeout.current = setTimeout(() => {
        navigate(localizedPath(lessonPath(adjacent.next!.id), locale));
      }, AUTO_ADVANCE_DELAY_MS);
    }
  };

  const handleMarkIncomplete = () => {
    if (!lessonId) return;
    if (advanceTimeout.current) clearTimeout(advanceTimeout.current);
    setJustCompleted(false);
    markLessonIncomplete(lessonId);
  };

  if (!lesson || !category) {
    return (
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: translate(locale, 'catalog'), path: ROUTE_PATHS.COURSES },
            { label: translate(locale, 'lessonNotFoundTitle') },
          ]}
        />
        <EmptyState
          title={translate(locale, 'lessonNotFoundTitle')}
          message={translate(locale, 'lessonNotFoundMessage')}
          icon={FileText}
          action={
            <Link to={localizedPath(ROUTE_PATHS.COURSES, locale)} className="text-sm font-medium text-primary-600 hover:text-primary-700">
              {translate(locale, 'backToCatalog')}
            </Link>
          }
        />
      </div>
    );
  }

  const categoryCopy = getLocalizedCategoryCopy(locale, category.id, category.name, category.description);
  const localizedStatus = translate(
    locale,
    status === 'not-started' ? 'notStarted' : status === 'in-progress' ? 'inProgress' : 'completed',
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_16rem] xl:grid-cols-[1fr_18rem]">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: translate(locale, 'catalog'), path: ROUTE_PATHS.COURSES },
            { label: categoryCopy.name, path: coursePath(category.id) },
            { label: lesson.title },
          ]}
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <BookOpen className="h-4 w-4" />
            <span>{categoryCopy.name}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-neutral-900">{lesson.title}</h1>
            <Badge variant={STATUS_BADGE_VARIANTS[status]}>{localizedStatus}</Badge>
            <BookmarkButton lessonId={lesson.id} className="ml-auto" />
          </div>
          <p className="text-neutral-600">{lesson.description}</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 lg:p-8">
          <LessonRenderer source={resolveLessonSource(lesson)} title={lesson.title} />
        </div>

        {quiz && <QuizRenderer quiz={quiz} />}

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-4">
          {status === 'completed' ? (
            <>
              <p className="flex items-center gap-2 text-sm font-medium text-success-700">
                <Check className="h-4 w-4" />
                {justCompleted && adjacent.next
                  ? translate(locale, 'completedMovingNext')
                  : translate(locale, 'youCompletedLesson')}
              </p>
              <Button variant="outline" size="sm" onClick={handleMarkIncomplete}>
                <RotateCcw className="h-4 w-4" />
                {translate(locale, 'markIncomplete')}
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-neutral-600">{translate(locale, 'finishedThisLesson')}</p>
              <Button variant="primary" size="sm" onClick={handleMarkComplete}>
                <Check className="h-4 w-4" />
                {translate(locale, 'markComplete')}
              </Button>
            </>
          )}
        </div>

        <NoteEditor lessonId={lesson.id} />

        <LessonNavigation previous={adjacent.previous} next={adjacent.next} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <LessonMetadata
          lesson={lesson}
          category={category}
          statusBadge={<Badge variant={STATUS_BADGE_VARIANTS[status]}>{localizedStatus}</Badge>}
        />
        <div className="rounded-xl border border-neutral-200 bg-white p-3">
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-neutral-500">{translate(locale, 'allLessons')}</p>
          <LessonSidebarTree currentLessonId={lesson.id} currentCategoryId={category.id} />
        </div>
      </aside>
    </div>
  );
}
