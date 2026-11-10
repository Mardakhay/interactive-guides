import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, Clock3, Languages, RotateCcw } from 'lucide-react';
import { getAdjacentStructuredLessons, getBootcampCurriculum, getStructuredLesson, getWeekForLesson, getSupplementaryTrackForLesson, SUPPORTED_LOCALES, type SupportedLocale } from '@/content/repository';
import type { LessonTranslation } from '@/content/schemas/lessonContent';
import { StructuredLessonRenderer } from '@/features/structured-lesson/StructuredLessonRenderer';
import { BookmarkButton } from '@/features/bookmarks';
import { NoteEditor } from '@/features/notes';
import { useProgressStore } from '@/features/progress';
import { useStructuredLearningStore } from '@/features/structured-lesson/store';

const EMPTY_SECTION_IDS: string[] = [];

function isSupportedLocale(value: string | undefined): value is SupportedLocale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}

export default function StructuredLessonPage() {
  const { locale: localeParam, lessonId } = useParams<{ locale: string; lessonId: string }>();
  const readingProgressRoot = useRef<HTMLDivElement | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const isLocaleSupported = isSupportedLocale(localeParam);
  const locale: SupportedLocale = isLocaleSupported ? localeParam : 'en';
  const requestKey = `${localeParam ?? ''}:${lessonId ?? ''}`;
  const [loadedLesson, setLoadedLesson] = useState<{
    requestKey: string;
    lesson?: LessonTranslation;
    failed?: boolean;
  } | null>(null);
  const hasCurrentLessonResult = loadedLesson?.requestKey === requestKey;
  const lesson = hasCurrentLessonResult ? loadedLesson?.lesson : undefined;
  const isLoadingLesson = isLocaleSupported && Boolean(lessonId) && !hasCurrentLessonResult;
  const lessonLoadFailed = hasCurrentLessonResult && loadedLesson?.failed === true;

  useEffect(() => {
    let active = true;
    if (!isLocaleSupported || !lessonId) {
      setLoadedLesson({ requestKey });
      return () => { active = false; };
    }
    void getStructuredLesson(lessonId, locale)
      .then((nextLesson) => {
        if (active) setLoadedLesson({ requestKey, lesson: nextLesson });
      })
      .catch(() => {
        if (active) setLoadedLesson({ requestKey, failed: true });
      });
    return () => { active = false; };
  }, [isLocaleSupported, lessonId, locale, requestKey]);

  useEffect(() => {
    const root = readingProgressRoot.current;
    if (!root) return;

    const updateProgress = () => {
      const { top, height } = root.getBoundingClientRect();
      const scrollableDistance = height - window.innerHeight;
      const nextProgress = scrollableDistance <= 0
        ? 100
        : Math.round((Math.min(scrollableDistance, Math.max(0, -top)) / scrollableDistance) * 100);
      setReadingProgress((current) => current === nextProgress ? current : nextProgress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    const resizeObserver = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(updateProgress);
    resizeObserver?.observe(root);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      resizeObserver?.disconnect();
    };
  }, [lesson?.id]);

  const week = lesson ? getWeekForLesson(lesson.id, locale) : undefined;
  const supplementaryTrack = lesson && !week ? getSupplementaryTrackForLesson(lesson.id, locale) : undefined;
  const curriculum = getBootcampCurriculum(locale);
  const month = week ? curriculum.months.find((item) => item.weeks.some((entry) => entry.id === week.id)) : undefined;
  const adjacent = lesson ? getAdjacentStructuredLessons(lesson.id, locale) : { previous: undefined, next: undefined };

  const markLessonOpened = useProgressStore((state) => state.markLessonOpened);
  const markLessonCompleted = useProgressStore((state) => state.markLessonCompleted);
  const markLessonIncomplete = useProgressStore((state) => state.markLessonIncomplete);
  const progressStatus = useProgressStore((state) =>
    lessonId ? (state.lessons[lessonId]?.status ?? 'not-started') : 'not-started',
  );
  const savedSectionIds = useStructuredLearningStore((state) =>
    lessonId ? state.sectionProgress[lessonId]?.completedBlockIds : undefined,
  );
  const allQuizAttempts = useStructuredLearningStore((state) => state.quizAttempts);
  const allCodeDrafts = useStructuredLearningStore((state) => state.codeDrafts);
  const allPracticeChecklists = useStructuredLearningStore((state) => state.practiceChecklists);

  useEffect(() => {
    if (lesson) markLessonOpened(lesson.id);
  }, [lesson, markLessonOpened]);

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, [locale]);

  const copy = locale === 'ru'
    ? {
        catalog: 'Каталог обучения',
        lesson: 'Урок',
        week: 'Неделя',
        review: 'Пилотный материал · проходит проверку',
        outcomes: 'После урока ты сможешь',
        outline: 'Содержание урока',
        readingProgress: 'Прогресс чтения',
        sectionsReadCount: 'Разделов отмечено прочитанными',
        sectionsReadSummary: 'Отмечено прочитанными',
        evidenceTitle: 'Учебные отметки',
        evidenceNote: 'Эти счётчики отражают действия, а не освоение темы. Ответы можно отправлять повторно; критерии практики отмечаются самим учеником, а черновики автоматически не проверяются.',
        checksSubmitted: 'Отправлено проверок знаний',
        practiceReviewed: 'Критерии практики отмечены',
        draftsSaved: 'Сохранено черновиков',
        statusNotStarted: 'Не начат',
        statusStarted: 'В процессе',
        statusCompleted: 'Отмечен завершённым',
        completionTitle: 'Отметка о завершении урока',
        completionNote: 'Эта отметка фиксирует только твоё решение завершить чтение урока. Она не проверяет код и не доказывает освоение темы; результаты квизов и самопроверка практики отслеживаются отдельно.',
        markComplete: 'Отметить завершённым',
        markIncomplete: 'Вернуть в процесс',
        previousLesson: 'Предыдущий урок',
        nextLesson: 'Следующий урок',
        switch: 'English',
        notFound: 'Структурированный урок не найден',
        notFoundDetail: 'Этот урок пока не опубликован в новой системе контента или для него нет выбранного языка.',
        duration: 'минут',
        difficulty: 'Начальный уровень',
      }
    : {
        catalog: 'Learning catalog',
        lesson: 'Lesson',
        week: 'Week',
        review: 'Pilot content · under review',
        outcomes: 'By the end of this lesson, you will be able to',
        outline: 'Lesson outline',
        readingProgress: 'Reading progress',
        sectionsReadCount: 'Sections marked read',
        sectionsReadSummary: 'Marked read',
        evidenceTitle: 'Learning signals',
        evidenceNote: 'These counts describe activity, not mastery. Knowledge checks can be retried; practice criteria are self-reported, and saved drafts are not automatically graded.',
        checksSubmitted: 'Knowledge checks submitted',
        practiceReviewed: 'Practice criteria self-reviewed',
        draftsSaved: 'Exercise drafts saved',
        statusNotStarted: 'Not started',
        statusStarted: 'In progress',
        statusCompleted: 'Marked complete',
        completionTitle: 'Lesson completion marker',
        completionNote: 'This is a self-attested marker that you have finished reviewing the lesson. It does not validate your code or prove mastery; quiz attempts and practice self-review are tracked separately.',
        markComplete: 'Mark lesson complete',
        markIncomplete: 'Mark incomplete',
        previousLesson: 'Previous lesson',
        nextLesson: 'Next lesson',
        switch: 'Русский',
        notFound: 'Structured lesson not found',
        notFoundDetail: 'This lesson is not available in the new content system yet, or the selected locale is unsupported.',
        loadingLesson: 'Loading lesson content…',
        loadFailedTitle: 'Could not load this lesson',
        loadFailedDetail: 'Check your connection and reload the page to try again.',
        duration: 'min',
        difficulty: 'Beginner',
      };

  if (isLoadingLesson) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p role="status" className="rounded-xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">{copy.loadingLesson}</p>
      </main>
    );
  }

  if (lessonLoadFailed) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-error-200 bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-neutral-950">{copy.loadFailedTitle}</h1>
          <p className="mt-3 leading-7 text-neutral-600">{copy.loadFailedDetail}</p>
          <Link to="/courses" className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary-700">
            <ArrowLeft className="h-4 w-4" />
            {copy.catalog}
          </Link>
        </div>
      </main>
    );
  }

  if (!isLocaleSupported || !lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">Interactive Guides</p>
          <h1 className="mt-3 text-2xl font-semibold text-neutral-950">{copy.notFound}</h1>
          <p className="mt-3 leading-7 text-neutral-600">{copy.notFoundDetail}</p>
          <Link to="/courses" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">
            <ArrowLeft className="h-4 w-4" />
            {copy.catalog}
          </Link>
        </div>
      </div>
    );
  }

  const knowledgeChecks = lesson.blocks.filter((block) => block.type === 'knowledgeCheck');
  const codingExercises = lesson.blocks.filter((block) => block.type === 'codingExercise');
  const knowledgeChecksSubmitted = knowledgeChecks.filter((block) =>
    (allQuizAttempts[`${lesson.id}::${block.id}`]?.length ?? 0) > 0,
  ).length;
  const practiceCriteriaTotal = codingExercises.reduce((total, block) => total + block.successCriteria.length, 0);
  const practiceCriteriaReviewed = codingExercises.reduce((total, block) => {
    const checked = allPracticeChecklists[`${lesson.id}::${block.id}`]?.checkedCriteria ?? [];
    return total + new Set(checked.filter((index) => Number.isInteger(index) && index >= 0 && index < block.successCriteria.length)).size;
  }, 0);
  const draftsSaved = codingExercises.filter((block) => allCodeDrafts[`${lesson.id}::${block.id}`] !== undefined).length;
  const otherLocale: SupportedLocale = locale === 'en' ? 'ru' : 'en';
  const outline = lesson.blocks.filter((block) => block.type === 'heading');
  const completedSectionIds = savedSectionIds ?? EMPTY_SECTION_IDS;
  const statusLabel = progressStatus === 'completed' ? copy.statusCompleted : progressStatus === 'not-started' ? copy.statusNotStarted : copy.statusStarted;

  return (
    <div ref={readingProgressRoot} data-structured-lesson-page className="mx-auto w-full max-w-[1500px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div role="progressbar" aria-label={copy.readingProgress} aria-valuemin={0} aria-valuemax={100} aria-valuenow={readingProgress} className="pointer-events-none fixed inset-x-0 top-16 z-10 h-1 bg-neutral-200/80">
        <div aria-hidden="true" className="h-full bg-primary-600 transition-[width] duration-100" style={{ width: `${readingProgress}%` }} />
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link to="/courses" className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950">
          <ArrowLeft className="h-4 w-4" />
          {copy.catalog}
        </Link>
        <Link
          to={`/${otherLocale}/structured-lessons/${lesson.id}`}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-700 shadow-subtle transition hover:border-primary-300 hover:text-primary-700"
          lang={otherLocale}
        >
          <Languages className="h-4 w-4" />
          {copy.switch}
        </Link>
      </div>

      <header className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-white via-white to-primary-50/70 p-5 shadow-subtle sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-700">
          {month && <span>{month.title}</span>}
          {week && <span className="rounded-md bg-primary-100 px-2 py-1">{copy.week} {week.number}</span>}
          <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-amber-800">{copy.review}</span>
        </div>
        <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">{lesson.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">{lesson.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
          <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{lesson.estimatedMinutes} {copy.duration}</span>
          <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4" />{copy.difficulty}</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{statusLabel}</span>
        </div>
        <div className="mt-4">
          <BookmarkButton lessonId={lesson.id} />
        </div>
      </header>

      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6" aria-labelledby="learning-outcomes">
        <h2 id="learning-outcomes" className="text-lg font-semibold text-neutral-950">{copy.outcomes}</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {lesson.learningOutcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2 text-sm leading-6 text-neutral-700">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-subtle sm:p-6" aria-labelledby="learning-signals-heading">
        <h2 id="learning-signals-heading" className="text-lg font-semibold text-neutral-950">{copy.evidenceTitle}</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-neutral-600">{copy.evidenceNote}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div role="group" aria-label={copy.checksSubmitted} className="rounded-xl bg-neutral-50 p-3">
            <p className="text-xs leading-5 text-neutral-600">{copy.checksSubmitted}</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-neutral-950">{knowledgeChecksSubmitted} / {knowledgeChecks.length}</p>
          </div>
          <div role="group" aria-label={copy.practiceReviewed} className="rounded-xl bg-neutral-50 p-3">
            <p className="text-xs leading-5 text-neutral-600">{copy.practiceReviewed}</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-neutral-950">{practiceCriteriaReviewed} / {practiceCriteriaTotal}</p>
          </div>
          <div role="group" aria-label={copy.draftsSaved} className="rounded-xl bg-neutral-50 p-3">
            <p className="text-xs leading-5 text-neutral-600">{copy.draftsSaved}</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-neutral-950">{draftsSaved} / {codingExercises.length}</p>
          </div>
        </div>
      </section>

      <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle sm:p-7 lg:p-9">
          
        {supplementaryTrack && (
          <section id="supplementary-context-panel" className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5" aria-labelledby="supplementary-context-title">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
              {locale === 'ru' ? 'Дополнительный учебный трек' : 'Supplementary learning track'}
            </p>
            <h2 id="supplementary-context-title" className="mt-1 text-sm font-semibold text-neutral-900">{supplementaryTrack.title}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{supplementaryTrack.note}</p>
            <h3 className="mt-3 text-xs font-semibold text-neutral-700">{locale === 'ru' ? 'Темы трека' : 'Track topics'}</h3>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-sm leading-5 text-neutral-600">
              {supplementaryTrack.topics.map((topic) => <li key={topic}>{topic}</li>)}
            </ul>
          </section>
        )}
<StructuredLessonRenderer lesson={lesson} />
        </div>
        <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start">
          <details className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle lg:hidden">
            <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-900">{copy.outline}</summary>
            <nav aria-label={copy.outline} className="mt-3">
              <OutlineLinks outline={outline} completedSectionIds={completedSectionIds} sectionsReadLabel={copy.sectionsReadCount} sectionsReadSummary={copy.sectionsReadSummary} />
            </nav>
          </details>
          <div className="hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle lg:block">
            <h2 className="text-sm font-semibold text-neutral-900">{copy.outline}</h2>
            <nav aria-label={copy.outline} className="mt-3">
              <OutlineLinks outline={outline} completedSectionIds={completedSectionIds} sectionsReadLabel={copy.sectionsReadCount} sectionsReadSummary={copy.sectionsReadSummary} />
            </nav>
          </div>
          {week && (
            <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{locale === 'ru' ? 'Учебная программа' : 'Curriculum context'}</p>
              <p className="mt-2 text-sm font-semibold text-neutral-900">{week.title}</p>
              {week.project && <p className="mt-2 text-sm leading-5 text-neutral-600">{week.project}</p>}
            </div>
          )}
        </aside>
      </div>

      <section className="mt-6" aria-label={locale === 'ru' ? 'Заметки к уроку' : 'Lesson notes'}>
        <NoteEditor key={lesson.id} lessonId={lesson.id} />
      </section>

      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-subtle sm:p-6" aria-labelledby="lesson-completion-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <h2 id="lesson-completion-heading" className="text-lg font-semibold text-neutral-950">{copy.completionTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{copy.completionNote}</p>
          </div>
          {progressStatus === 'completed' ? (
            <button
              type="button"
              onClick={() => lesson && markLessonIncomplete(lesson.id)}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
            >
              <RotateCcw className="h-4 w-4" />
              {copy.markIncomplete}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => lesson && markLessonCompleted(lesson.id)}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
            >
              <Check className="h-4 w-4" />
              {copy.markComplete}
            </button>
          )}
        </div>
        {(adjacent.previous || adjacent.next) && (
          <nav aria-label={locale === 'ru' ? 'Навигация по урокам' : 'Lesson navigation'} className="mt-5 grid gap-3 border-t border-neutral-200 pt-4 sm:grid-cols-2">
            {adjacent.previous ? (
              <Link to={`/${locale}/structured-lessons/${adjacent.previous.id}`} className="group flex min-h-16 items-center gap-3 rounded-xl border border-neutral-200 p-3 transition hover:border-primary-300 hover:bg-primary-50/50">
                <ArrowLeft className="h-4 w-4 shrink-0 text-neutral-500 group-hover:text-primary-700" />
                <span className="min-w-0">
                  <span className="block text-xs text-neutral-500">{copy.previousLesson}</span>
                  <span className="mt-1 block text-sm font-semibold text-neutral-900">{adjacent.previous.title}</span>
                </span>
              </Link>
            ) : <span aria-hidden="true" />}
            {adjacent.next ? (
              <Link to={`/${locale}/structured-lessons/${adjacent.next.id}`} className="group flex min-h-16 items-center justify-end gap-3 rounded-xl border border-neutral-200 p-3 text-right transition hover:border-primary-300 hover:bg-primary-50/50">
                <span className="min-w-0">
                  <span className="block text-xs text-neutral-500">{copy.nextLesson}</span>
                  <span className="mt-1 block text-sm font-semibold text-neutral-900">{adjacent.next.title}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-neutral-500 group-hover:text-primary-700" />
              </Link>
            ) : <span aria-hidden="true" />}
          </nav>
        )}
      </section>
    </div>
  );
}

function OutlineLinks({
  outline,
  completedSectionIds,
  sectionsReadLabel,
  sectionsReadSummary,
}: {
  outline: Array<{ id: string; text: string; level: 2 | 3 | 4 }>;
  completedSectionIds: string[];
  sectionsReadLabel: string;
  sectionsReadSummary: string;
}) {
  const sections = outline.filter((heading) => heading.level === 2);
  const sectionsRead = sections.filter((heading) => completedSectionIds.includes(heading.id)).length;

  return (
    <>
      {sections.length > 0 && (
        <div className="mb-3 rounded-lg bg-neutral-50 px-3 py-2">
          <div className="mb-1.5 flex items-center justify-between gap-2 text-xs text-neutral-600">
            <span>{sectionsReadSummary}</span>
            <span className="font-semibold tabular-nums">{sectionsRead}/{sections.length}</span>
          </div>
          <div
            role="progressbar"
            aria-label={sectionsReadLabel}
            aria-valuemin={0}
            aria-valuemax={sections.length}
            aria-valuenow={sectionsRead}
            className="h-1.5 overflow-hidden rounded-full bg-neutral-200"
          >
            <div
              aria-hidden="true"
              className="h-full rounded-full bg-emerald-600 transition-[width] duration-150"
              style={{ width: `${(sectionsRead / sections.length) * 100}%` }}
            />
          </div>
        </div>
      )}
      <ul className="space-y-1.5">
        {outline.map((heading) => {
          const isRead = heading.level === 2 && completedSectionIds.includes(heading.id);
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm leading-5 transition hover:bg-neutral-50 hover:text-primary-700 ${isRead ? 'text-emerald-800' : 'text-neutral-600'}`}
              >
                <span className="min-w-0 flex-1">{heading.text}</span>
                {isRead && <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}