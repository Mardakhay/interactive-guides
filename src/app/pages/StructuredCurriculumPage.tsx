import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Languages } from 'lucide-react';
import { getBootcampCurriculum, getStructuredLessonIds, getStructuredLessonMetadata, SUPPORTED_LOCALES, type SupportedLocale } from '@/content/repository';

function isSupportedLocale(value: string | undefined): value is SupportedLocale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}

export default function StructuredCurriculumPage() {
  const { locale: localeParam } = useParams<{ locale: string }>();
  const validLocale = isSupportedLocale(localeParam);
  const locale: SupportedLocale = validLocale ? localeParam : 'en';
  const curriculum = getBootcampCurriculum(locale);
  const copy = locale === 'ru'
    ? {
        catalog: 'Каталог уроков',
        core: 'Основная программа',
        coreNote: 'Канонический курс из 24 недель. Дополнительные учебные треки перечислены отдельно и не смешаны с исходной программой.',
        months: 'месяцев',
        weeks: 'недель',
        lessons: 'уроков',
        goal: 'Цель месяца',
        topics: 'Темы',
        practice: 'Практика',
        project: 'Проект',
        supplemental: 'Дополнительные учебные треки',
        supplementalNote: 'Эти темы расширяют программу и не являются неделями исходного буткемпа.',
        start: 'Открыть урок',
        reviewBannerTitle: 'Pilot curriculum · editorial review in progress',
        reviewBannerDetail: '{count} lesson records are still marked for review. They are preview content, not an approved production release.',
        language: 'English',
      }
    : {
        catalog: 'Lesson catalog',
        core: 'Core curriculum',
        coreNote: 'The canonical 24-week course. Supplementary learning tracks are listed separately and are not folded into the original syllabus.',
        months: 'months',
        weeks: 'weeks',
        lessons: 'lessons',
        goal: 'Month goal',
        topics: 'Topics',
        practice: 'Practice',
        project: 'Project',
        supplemental: 'Supplementary learning tracks',
        supplementalNote: 'These topics extend the course; they are not weeks in the original bootcamp syllabus.',
        start: 'Open lesson',
        reviewBannerTitle: 'Пилотная программа · редакционная проверка продолжается',
        reviewBannerDetail: '{count} записей уроков всё ещё имеют статус проверки. Это предварительный контент, а не утверждённый production-релиз.',
        language: 'Русский',
      };

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, [locale]);

  const otherLocale: SupportedLocale = locale === 'en' ? 'ru' : 'en';
  const coreLessonIds = curriculum.months.flatMap((month) => month.weeks.flatMap((week) => week.lessonIds));
  const reviewLessonCount = getStructuredLessonIds().filter((id) => getStructuredLessonMetadata(id, locale)?.status === 'review').length;

  if (!validLocale) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold text-neutral-950">Curriculum language not found</h1>
        <Link to="/en/structured-lessons" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary-700">
          Open the English curriculum <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/courses" className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {copy.catalog}
        </Link>
        <Link to={'/' + otherLocale + '/structured-lessons'} lang={otherLocale} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-700 hover:border-primary-300 hover:text-primary-700">
          <Languages className="h-4 w-4" aria-hidden="true" />
          {copy.language}
        </Link>
      </div>

      <header className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-primary-50 p-6 shadow-subtle sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">{copy.core}</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">{curriculum.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600">{curriculum.description}</p>
        <p className="mt-3 text-sm leading-6 text-neutral-600">{copy.coreNote}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm font-medium text-neutral-700">
          <span className="rounded-lg bg-white px-3 py-2">{curriculum.durationMonths} {copy.months}</span>
          <span className="rounded-lg bg-white px-3 py-2">{curriculum.totalWeeks} {copy.weeks}</span>
          <span className="rounded-lg bg-white px-3 py-2">{coreLessonIds.length} {copy.lessons}</span>
        </div>
      </header>

      {reviewLessonCount > 0 && (
        <section role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
          <h2 className="text-sm font-semibold">{copy.reviewBannerTitle}</h2>
          <p className="mt-1 text-sm leading-6">{copy.reviewBannerDetail.replace('{count}', String(reviewLessonCount))}</p>
        </section>
      )}

      <div className="space-y-8">
        {curriculum.months.map((month) => (
          <section key={month.id} aria-labelledby={'heading-' + month.id} className="space-y-4">
            <header>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">{locale === 'ru' ? 'Месяц' : 'Month'} {month.number}</p>
              <h2 id={'heading-' + month.id} className="mt-1 text-2xl font-semibold text-neutral-950">{month.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">{month.goal}</p>
            </header>
            <div className="grid gap-4 md:grid-cols-2">
              {month.weeks.map((week) => (
                <article key={week.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-subtle">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">{locale === 'ru' ? 'Неделя' : 'Week'} {week.number}</p>
                  <h3 className="mt-2 text-lg font-semibold text-neutral-950">{week.title}</h3>
                  <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">{copy.topics}</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-700">
                    {week.topics.map((topic) => <li key={topic}>{topic}</li>)}
                  </ul>
                  {week.practice.length > 0 && (
                    <>
                      <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">{copy.practice}</h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-700">
                        {week.practice.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </>
                  )}
                  {week.project && <p className="mt-4 rounded-lg bg-primary-50 p-3 text-sm leading-6 text-primary-900"><strong>{copy.project}:</strong> {week.project}</p>}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {week.lessonIds.map((id) => {
                      const lesson = getStructuredLessonMetadata(id, locale);
                      if (!lesson) return null;
                      return (
                        <Link key={id} to={'/' + locale + '/structured-lessons/' + id} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary-700 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-800">
                          {lesson.title}
                          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                        </Link>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="supplementary-heading" className="space-y-4 border-t border-neutral-200 pt-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">{locale === 'ru' ? 'Вне ядра курса' : 'Beyond the core syllabus'}</p>
          <h2 id="supplementary-heading" className="mt-1 text-2xl font-semibold text-neutral-950">{copy.supplemental}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">{copy.supplementalNote}</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {curriculum.supplementaryTracks.map((track) => (
            <article key={track.id} className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
              <h3 className="text-lg font-semibold text-neutral-950">{track.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{track.note}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-700">
                {track.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {track.lessonIds.map((id) => {
                  const lesson = getStructuredLessonMetadata(id, locale);
                  if (!lesson) return null;
                  return (
                    <Link key={id} to={'/' + locale + '/structured-lessons/' + id} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-neutral-800 hover:border-amber-500">
                      {lesson.title}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
