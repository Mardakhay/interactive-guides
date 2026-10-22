import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, Clock3, Languages } from 'lucide-react';
import { getBootcampCurriculum, getStructuredLesson, getWeekForLesson, SUPPORTED_LOCALES, type SupportedLocale } from '@/content/repository';
import { StructuredLessonRenderer } from '@/features/structured-lesson/StructuredLessonRenderer';
import { useProgressStore } from '@/features/progress';

function isSupportedLocale(value: string | undefined): value is SupportedLocale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}

export default function StructuredLessonPage() {
  const { locale: localeParam, lessonId } = useParams<{ locale: string; lessonId: string }>();
  const isLocaleSupported = isSupportedLocale(localeParam);
  const locale: SupportedLocale = isLocaleSupported ? localeParam : 'en';
  const lesson = lessonId ? getStructuredLesson(lessonId, locale) : undefined;
  const week = lesson ? getWeekForLesson(lesson.id, locale) : undefined;
  const curriculum = getBootcampCurriculum(locale);
  const month = week ? curriculum.months.find((item) => item.weeks.some((entry) => entry.id === week.id)) : undefined;

  const markLessonOpened = useProgressStore((state) => state.markLessonOpened);
  const progressStatus = useProgressStore((state) =>
    lessonId ? (state.lessons[lessonId]?.status ?? 'not-started') : 'not-started',
  );

  useEffect(() => {
    if (lesson) markLessonOpened(lesson.id);
  }, [lesson?.id, markLessonOpened]);

  const copy = locale === 'ru'
    ? {
        catalog: 'Каталог обучения',
        lesson: 'Урок',
        week: 'Неделя',
        review: 'Пилотный материал · проходит проверку',
        outcomes: 'После урока ты сможешь',
        outline: 'Содержание урока',
        statusStarted: 'В процессе',
        statusCompleted: 'Отмечен завершённым',
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
        statusStarted: 'In progress',
        statusCompleted: 'Marked complete',
        switch: 'Русский',
        notFound: 'Structured lesson not found',
        notFoundDetail: 'This lesson is not available in the new content system yet, or the selected locale is unsupported.',
        duration: 'min',
        difficulty: 'Beginner',
      };

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

  const otherLocale: SupportedLocale = locale === 'en' ? 'ru' : 'en';
  const outline = lesson.blocks.filter((block) => block.type === 'heading');
  const statusLabel = progressStatus === 'completed' ? copy.statusCompleted : copy.statusStarted;

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
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

      <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle sm:p-7 lg:p-9">
          <StructuredLessonRenderer lesson={lesson} />
        </div>
        <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start">
          <details className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle lg:hidden">
            <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-900">{copy.outline}</summary>
            <nav aria-label={copy.outline} className="mt-3">
              <OutlineLinks outline={outline} />
            </nav>
          </details>
          <div className="hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle lg:block">
            <h2 className="text-sm font-semibold text-neutral-900">{copy.outline}</h2>
            <nav aria-label={copy.outline} className="mt-3">
              <OutlineLinks outline={outline} />
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
    </div>
  );
}

function OutlineLinks({ outline }: { outline: Array<{ id: string; text: string }> }) {
  return (
    <ul className="space-y-1.5">
      {outline.map((heading) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`} className="block rounded-lg px-2 py-1.5 text-sm leading-5 text-neutral-600 transition hover:bg-neutral-50 hover:text-primary-700">
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
