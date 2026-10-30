import { useEffect, useRef, useState } from 'react';
import { Check, Clipboard, ExternalLink, Lightbulb, RotateCcw } from 'lucide-react';
import type { SupportedLocale } from '@/content/repository';
import { useStructuredLearningStore } from './store';
import { JavaScriptRunner } from './JavaScriptRunner';
import { PipelineSimulation } from './PipelineSimulation';
import { BranchFlowSimulation } from './BranchFlowSimulation';
import type { LessonContentBlock, LessonTranslation } from '@/content/schemas/lessonContent';

type KnowledgeCheckBlock = Extract<LessonContentBlock, { type: 'knowledgeCheck' }>;
type SequentialQuizBlock = Extract<LessonContentBlock, { type: 'sequentialQuiz' }>;

interface StructuredLessonRendererProps {
  lesson: LessonTranslation;
}

function InlineText({ text }: { text: string }) {
  const delimiter = String.fromCharCode(96);
  const parts = text.split(/(\x60[^\x60]+\x60)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith(delimiter) && part.endsWith(delimiter) && part.length > 2) {
          return (
            <code
              key={index}
              className="rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.92em] text-neutral-800"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function CodePanel({
  language,
  code,
  caption,
  locale,
}: {
  language: string;
  code: string;
  caption?: string;
  locale: SupportedLocale;
}) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const copyCode = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        setCopyState('failed');
        return;
      }
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  const copyLabel = locale === 'ru' ? 'Копировать код' : 'Copy code';
  const copiedLabel = locale === 'ru' ? 'Скопировано' : 'Copied';
  const failedLabel = locale === 'ru' ? 'Не удалось скопировать' : 'Copy failed';

  return (
    <figure className="overflow-hidden rounded-xl border border-neutral-800 bg-[#111827] text-neutral-100">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="min-w-0">
          <span className="font-mono text-xs uppercase tracking-wider text-sky-300">{language}</span>
          {caption && <p className="mt-1 text-sm text-neutral-300">{caption}</p>}
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/15 px-3 text-xs font-medium text-neutral-200 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          aria-label={copyLabel}
        >
          {copyState === 'copied' ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
          {copyState === 'copied' ? copiedLabel : copyState === 'failed' ? failedLabel : copyLabel}
        </button>
        <span className="sr-only" role="status" aria-label={locale === 'ru' ? 'Статус копирования кода' : 'Code copy status'}>
          {copyState === 'idle' ? '' : copyState === 'copied' ? copiedLabel : failedLabel}
        </span>
      </figcaption>
      <pre
        role="group"
        aria-label={locale === 'ru'
          ? `${language}: пример кода${caption ? ` — ${caption}` : ''}`
          : `${language} code example${caption ? `: ${caption}` : ''}`}
        tabIndex={0}
        className="max-w-full overflow-x-auto p-4 text-[13px] leading-6 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-300 sm:text-sm"
      >
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  );
}

function CommandReference({
  block,
  locale,
}: {
  block: Extract<LessonContentBlock, { type: 'commandReference' }>;
  locale: SupportedLocale;
}) {
  const [copyStates, setCopyStates] = useState<Record<string, 'copied' | 'failed'>>({});
  const [query, setQuery] = useState('');
  const copyLabel = locale === 'ru' ? 'Копировать команду' : 'Copy command';
  const copiedLabel = locale === 'ru' ? 'Скопировано' : 'Copied';
  const failedLabel = locale === 'ru' ? 'Не удалось скопировать' : 'Copy failed';
  const statusLabel = locale === 'ru' ? 'Статус копирования команды' : 'Command copy status';
  const searchLabel = locale === 'ru' ? 'Поиск команд Git' : 'Search Git commands';
  const searchPlaceholder = locale === 'ru' ? 'Команда, описание или категория…' : 'Command, description or category…';
  const noResults = locale === 'ru' ? 'Команды не найдены. Измени поисковый запрос.' : 'No commands found. Try a different search.';

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleCategories = block.categories.map((category) => ({
    ...category,
    items: category.items.filter((item) => {
      if (!normalizedQuery) return true;
      return [category.title, item.command, item.description]
        .some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
    }),
  })).filter((category) => category.items.length > 0);
  const visibleCommandCount = visibleCategories.reduce((total, category) => total + category.items.length, 0);

  const copyCommand = async (itemId: string, command: string) => {
    try {
      if (!navigator.clipboard?.writeText) {
        setCopyStates((current) => ({ ...current, [itemId]: 'failed' }));
        return;
      }
      await navigator.clipboard.writeText(command);
      setCopyStates((current) => ({ ...current, [itemId]: 'copied' }));
    } catch {
      setCopyStates((current) => ({ ...current, [itemId]: 'failed' }));
    }
  };

  return (
    <div className="my-6 space-y-4" data-command-reference={block.id}>
      <label className="block">
        <span className="sr-only">{searchLabel}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={searchLabel}
          placeholder={searchPlaceholder}
          className="min-h-10 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
        />
      </label>
      {visibleCommandCount === 0 ? (
        <p role="status" className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">{noResults}</p>
      ) : (
        visibleCategories.map((category) => (
          <section
            key={category.id}
            aria-labelledby={`${block.id}-${category.id}-heading`}
            className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
          >
            <h3
              id={`${block.id}-${category.id}-heading`}
              className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-900"
            >
              {category.title}
            </h3>
            <ul className="divide-y divide-neutral-100">
              {category.items.map((item) => {
                const state = copyStates[item.id] ?? 'idle';
                const buttonText = state === 'copied'
                  ? copiedLabel
                  : state === 'failed'
                    ? failedLabel
                    : (locale === 'ru' ? 'Копировать' : 'Copy');
                const buttonLabel = `${state === 'copied' ? copiedLabel : state === 'failed' ? failedLabel : copyLabel}: ${item.command}`;

                return (
                  <li key={item.id} className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-4">
                    <div className="min-w-0">
                      <code className="block max-w-full overflow-x-auto whitespace-pre rounded-md bg-neutral-100 px-2.5 py-1.5 font-mono text-sm text-neutral-900">
                        {item.command}
                      </code>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-start gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => void copyCommand(item.id, item.command)}
                        aria-label={buttonLabel}
                        className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                      >
                        {state === 'copied'
                          ? <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          : <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />}
                        {buttonText}
                      </button>
                      {state !== 'idle' && (
                        <span
                          className="sr-only"
                          role="status"
                          aria-label={`${statusLabel}: ${item.command}`}
                        >
                          {state === 'copied' ? `${copiedLabel}: ${item.command}` : `${failedLabel}: ${item.command}`}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

function SectionHeading({
  block,
  lessonId,
  locale,
}: {
  block: Extract<LessonContentBlock, { type: 'heading' }>;
  lessonId: string;
  locale: SupportedLocale;
}) {
  const isRead = useStructuredLearningStore((state) =>
    state.sectionProgress[lessonId]?.completedBlockIds.includes(block.id) ?? false,
  );
  const setSectionComplete = useStructuredLearningStore((state) => state.setSectionComplete);
  const readLabel = locale === 'ru' ? 'Отметить раздел прочитанным' : 'Mark section read';
  const unreadLabel = locale === 'ru' ? 'Снять отметку о прочтении' : 'Mark section unread';
  const visibleLabel = isRead
    ? (locale === 'ru' ? 'Прочитан' : 'Read')
    : (locale === 'ru' ? 'Отметить прочитанным' : 'Mark read');

  return (
    <div className="mb-3 mt-10 flex flex-col gap-2 scroll-mt-24 sm:flex-row sm:items-start sm:justify-between">
      <h2 id={block.id} className="min-w-0 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
        {block.text}
      </h2>
      <button
        type="button"
        aria-pressed={isRead}
        aria-label={`${isRead ? unreadLabel : readLabel}: ${block.text}`}
        onClick={() => setSectionComplete(lessonId, block.id, !isRead)}
        className={`inline-flex min-h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg border px-3 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 sm:mt-1 ${isRead
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:text-primary-700'}`}
      >
        {isRead ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
        {visibleLabel}
      </button>
    </div>
  );
}


function CodingExercise({
  block,
  locale,
  lessonId,
}: {
  block: Extract<LessonContentBlock, { type: 'codingExercise' }>;
  locale: SupportedLocale;
  lessonId: string;
}) {
  const draftKey = lessonId + '::' + block.id;
  const savedCode = useStructuredLearningStore((state) => state.codeDrafts[draftKey]?.code);
  const checkedCriteria = useStructuredLearningStore((state) => state.practiceChecklists[draftKey]?.checkedCriteria);
  const saveCodeDraft = useStructuredLearningStore((state) => state.saveCodeDraft);
  const resetCodeDraft = useStructuredLearningStore((state) => state.resetCodeDraft);
  const setPracticeCriterion = useStructuredLearningStore((state) => state.setPracticeCriterion);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const code = savedCode ?? block.starterCode;
  const checked = checkedCriteria ?? [];

  return (
    <section id={block.id} className="my-8 scroll-mt-24 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-subtle">
      <div className="border-b border-neutral-200 bg-neutral-50 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
          {locale === 'ru' ? 'Практика с кодом' : 'Coding practice'}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-neutral-950">{block.title}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-700">{block.context}</p>
      </div>
      <div className="space-y-5 p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900">{locale === 'ru' ? 'Задание' : 'Your task'}</h4>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-neutral-700">
            {block.instructions.map((instruction, index) => <li key={`${block.id}-instruction-${index}`}>{instruction}</li>)}
          </ol>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-neutral-900">{locale === 'ru' ? 'Требования' : 'Requirements'}</h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
            {block.requirements.map((requirement, index) => <li key={`${block.id}-requirement-${index}`}>{requirement}</li>)}
          </ul>
        </div>
        <div>
          <label htmlFor={`${block.id}-editor`} className="block text-sm font-semibold text-neutral-900">
            {locale === 'ru' ? 'Твой код' : 'Your code'}
          </label>
          <p className="mt-1 text-xs text-neutral-500">
            {locale === 'ru'
              ? 'Черновик сохраняется локально. JavaScript можно запустить в ограниченном Worker; задания с DOM, TSX и shell выполняй в своём проекте. HTML доступен в предпросмотре без скриптов.'
              : 'Your draft is saved locally. JavaScript can run in a restricted Worker; DOM, TSX, and shell exercises must run in your own project. HTML has a script-disabled preview.'}
          </p>
          <textarea
            id={`${block.id}-editor`}
            value={code}
            onChange={(event) => saveCodeDraft(lessonId, block.id, event.target.value)}
            spellCheck={false}
            rows={12}
            className="mt-3 block w-full resize-y rounded-xl border border-neutral-300 bg-[#111827] p-4 font-mono text-xs leading-6 text-neutral-100 shadow-inner focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 sm:text-sm"
          />
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => resetCodeDraft(lessonId, block.id)}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {locale === 'ru' ? 'Сбросить черновик' : 'Reset draft'}
            </button>
            <span className="text-xs text-neutral-500">
              {savedCode !== undefined
                ? (locale === 'ru' ? 'Черновик сохраняется на этом устройстве.' : 'Draft is saved on this device.')
                : (locale === 'ru' ? 'Начни писать — черновик сохранится локально.' : 'Start typing to save a local draft.')}
            </span>
          </div>
          {block.language.toLowerCase() === 'javascript' && (
            ['document.', 'window.', 'HTMLElement', 'Element'].some((token) => block.starterCode.includes(token)) ? (
              <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-950">
                {locale === 'ru'
                  ? 'Это упражнение требует браузерного DOM (document/window). Worker-песочница поддерживает JavaScript, но не предоставляет DOM. Запусти задание в своём локальном проекте; подсказки и критерии самопроверки доступны здесь.'
                  : 'This exercise requires the browser DOM (document/window). The Worker sandbox supports JavaScript but does not provide the DOM. Run this task in your local project; hints and self-review criteria remain available here.'}
              </p>
            ) : (
              <JavaScriptRunner code={code} locale={locale} />
            )
          )}
          {block.language.toLowerCase() === 'html' && (
            <div className="mt-3">
              <button
                type="button"
                aria-expanded={previewOpen}
                aria-controls={`${block.id}-preview-panel`}
                onClick={() => setPreviewOpen((open) => !open)}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
              >
                {previewOpen
                  ? (locale === 'ru' ? 'Скрыть предпросмотр' : 'Hide preview')
                  : (locale === 'ru' ? 'Предпросмотр результата' : 'Preview result')}
              </button>
              <div id={`${block.id}-preview-panel`} hidden={!previewOpen}>
                {previewOpen && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <p className="border-b border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
                      {locale === 'ru'
                        ? 'Изолированный предпросмотр HTML. Скрипты отключены; код не получает доступ к приложению.'
                        : 'Isolated HTML preview. Scripts are disabled and the code cannot access the application.'}
                    </p>
                    <iframe
                      title={locale === 'ru' ? 'Предпросмотр HTML-кода' : 'HTML code preview'}
                      srcDoc={code}
                      sandbox=""
                      className="h-72 w-full bg-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {block.solution && (
          <section className="rounded-xl border border-primary-200 bg-primary-50/60 p-3 sm:p-4">
            <p className="text-xs leading-5 text-neutral-600">
              {locale === 'ru'
                ? 'Пример решения раскрывается только по запросу. Сравни его с требованиями; корректные реализации могут отличаться.'
                : 'The example solution is revealed only on request. Compare it with the requirements; other correct implementations may differ.'}
            </p>
            <button
              type="button"
              aria-expanded={solutionOpen}
              aria-controls={`${block.id}-solution-panel`}
              onClick={() => setSolutionOpen((open) => !open)}
              className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm font-semibold text-primary-800 transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
            >
              {solutionOpen
                ? (locale === 'ru' ? 'Скрыть пример решения' : 'Hide example solution')
                : (locale === 'ru' ? 'Показать пример решения' : 'Reveal example solution')}
            </button>
            <div id={`${block.id}-solution-panel`} hidden={!solutionOpen}>
              {solutionOpen && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-neutral-900">
                  {locale === 'ru' ? 'Пример решения' : 'Example solution'}
                </h4>
                <p className="mt-2 text-sm leading-6 text-neutral-700">{block.solution.explanation}</p>
                <div className="mt-3">
                  <CodePanel
                    language={block.language}
                    code={block.solution.code}
                    caption={locale === 'ru' ? 'Пример решения' : 'Example solution'}
                    locale={locale}
                  />
                </div>
              </div>
              )}
            </div>
          </section>
        )}
        {block.hints.length > 0 && (
          <div>
            <button
              type="button"
              aria-expanded={hintsOpen}
              aria-controls={`${block.id}-hints-panel`}
              onClick={() => setHintsOpen((open) => !open)}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
            >
              <Lightbulb className="h-4 w-4" />
              {hintsOpen
                ? (locale === 'ru' ? 'Скрыть подсказки' : 'Hide hints')
                : (locale === 'ru' ? 'Открыть подсказки' : 'Reveal hints')}
            </button>
            <div id={`${block.id}-hints-panel`} hidden={!hintsOpen}>
              {hintsOpen && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
                  {block.hints.map((hint, index) => <li key={`${block.id}-hint-${index}`}>{hint}</li>)}
                </ul>
              )}
            </div>
          </div>
        )}
        <div className="rounded-xl border border-dashed border-neutral-300 p-3">
          <h4 className="text-sm font-semibold text-neutral-900">{locale === 'ru' ? 'Критерии самопроверки' : 'Self-review criteria'}</h4>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-neutral-700">
            {block.successCriteria.map((criterion, index) => (
              <li key={`${block.id}-criterion-${index}`}>
                <label className="flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    checked={checked.includes(index)}
                    onChange={(event) => setPracticeCriterion(lessonId, block.id, index, event.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300 text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 focus:ring-primary-600"
                  />
                  <span>{criterion}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-neutral-500">
            {locale === 'ru'
              ? 'Эти отметки фиксируют твою самопроверку, но сами по себе не означают автоматическую проверку кода или подтверждённое мастерство.'
              : 'These checks record your self-review; they do not execute or automatically validate the code and do not, by themselves, prove mastery.'}
          </p>
        </div>
      </div>
    </section>
  );
}

export function SequentialKnowledgeQuiz({
  block,
  questions,
  locale,
  lessonId,
}: {
  block: SequentialQuizBlock;
  questions: KnowledgeCheckBlock[];
  locale: SupportedLocale;
  lessonId: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [runNumber, setRunNumber] = useState(0);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const isRu = locale === 'ru';

  const labels = isRu ? {
    question: 'Вопрос',
    of: 'из',
    next: 'Следующий вопрос',
    finish: 'Завершить тест',
    restart: 'Начать заново',
    score: 'Итоговый результат',
    correct: 'верных ответов',
    excellent: 'Отличный результат! Продолжай применять знания на практике.',
    good: 'Хорошая основа. Повтори темы вопросов, в которых ошибся.',
    review: 'Повтори основные разделы и попробуй ещё раз.',
    completion: 'Тест завершён.',
    progress: 'Прогресс теста',
    error: 'Не удалось загрузить все вопросы теста.',
  } : {
    question: 'Question',
    of: 'of',
    next: 'Next question',
    finish: 'Finish quiz',
    restart: 'Restart quiz',
    score: 'Final score',
    correct: 'correct answers',
    excellent: 'Excellent result! Keep applying these concepts in practice.',
    good: 'Good foundation. Review the topics behind missed answers.',
    review: 'Revisit the core sections and try again.',
    completion: 'Quiz completed.',
    progress: 'Quiz progress',
    error: 'The quiz questions could not all be loaded.',
  };

  const activeQuestion = questions[currentIndex];
  useEffect(() => {
    if (finished) resultRef.current?.focus();
  }, [finished]);

  const handleAnswered = (isCorrect: boolean) => {
    if (answered) return;
    if (isCorrect) setScore((value) => value + 1);
    setAnswered(true);
  };

  const advance = () => {
    if (!answered) return;
    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrentIndex((value) => value + 1);
    setAnswered(false);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setRunNumber((value) => value + 1);
  };

  if (questions.length !== block.questionBlockIds.length || !activeQuestion) {
    return (
      <section className="my-7 rounded-2xl border border-rose-200 bg-rose-50 p-4" role="alert">
        {labels.error}
      </section>
    );
  }

  const percent = Math.round((score / questions.length) * 100);
  const progressValue = finished ? questions.length : currentIndex + (answered ? 1 : 0);
  const resultMessage = percent >= 80 ? labels.excellent : percent >= 50 ? labels.good : labels.review;

  return (
    <section className="my-8 rounded-2xl border border-neutral-200 bg-white p-4 shadow-subtle sm:p-6" aria-labelledby={block.id + '-title'}>
      <h3 id={block.id + '-title'} className="text-xl font-semibold text-neutral-950">{block.title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-700">{block.description}</p>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-neutral-600">
          <span>{labels.question} {currentIndex + 1} {labels.of} {questions.length}</span>
          <span>{progressValue} / {questions.length}</span>
        </div>
        <div
          role="progressbar"
          aria-label={labels.progress}
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={progressValue}
          className="h-2 overflow-hidden rounded-full bg-neutral-100"
        >
          <div className="h-full rounded-full bg-primary-700 transition-[width]" style={{ width: (progressValue / questions.length) * 100 + '%' }} />
        </div>
      </div>

      {!finished && (
        <>
          <p className="mt-4 text-xs font-medium text-neutral-500">{labels.question} {currentIndex + 1} / {questions.length}</p>
          <KnowledgeCheck
            key={runNumber + ':' + activeQuestion.id}
            block={activeQuestion}
            locale={locale}
            lessonId={lessonId}
            onAnswered={handleAnswered}
            focusPrompt
          />
          {answered && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={advance}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
              >
                {currentIndex === questions.length - 1 ? labels.finish : labels.next}
              </button>
            </div>
          )}
        </>
      )}

      {finished && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-6 rounded-xl border border-primary-200 bg-primary-50 p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-800">{labels.completion}</p>
          <h4 className="mt-2 text-2xl font-bold text-neutral-950">{labels.score}: {score} / {questions.length} ({percent}%)</h4>
          <p className="mt-2 text-sm font-medium text-neutral-800">{labels.correct}</p>
          <p className="mt-3 text-sm leading-6 text-neutral-700">{resultMessage}</p>
          <button
            type="button"
            onClick={restart}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {labels.restart}
          </button>
        </div>
      )}
    </section>
  );
}

function renderBlock(block: LessonContentBlock, locale: SupportedLocale, lessonId: string, sequentialQuestionIds: ReadonlySet<string>, questionBlocksById: ReadonlyMap<string, KnowledgeCheckBlock>) {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) return <SectionHeading key={block.id} block={block} lessonId={lessonId} locale={locale} />;
      if (block.level === 3) return <h3 key={block.id} id={block.id} className="mb-3 mt-7 scroll-mt-24 text-xl font-semibold tracking-tight text-neutral-950">{block.text}</h3>;
      return <h4 key={block.id} id={block.id} className="mb-2 mt-6 scroll-mt-24 text-lg font-semibold text-neutral-950">{block.text}</h4>;
    case 'paragraph':
      return <p key={block.id} className="my-4 text-[15px] leading-7 text-neutral-700 sm:text-base"><InlineText text={block.text} /></p>;
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag key={block.id} className={`my-4 space-y-2 pl-6 text-[15px] leading-7 text-neutral-700 marker:text-primary-600 sm:text-base ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
          {block.items.map((item, index) => <li key={`${block.id}-item-${index}`}><InlineText text={item} /></li>)}
        </ListTag>
      );
    }
    case 'commandReference':
      return <CommandReference key={block.id} block={block} locale={locale} />;
    case 'callout': {
      const toneClasses = {
        note: 'border-sky-200 bg-sky-50 text-sky-950',
        tip: 'border-emerald-200 bg-emerald-50 text-emerald-950',
        important: 'border-violet-200 bg-violet-50 text-violet-950',
        warning: 'border-amber-200 bg-amber-50 text-amber-950',
      } as const;
      return (
        <aside key={block.id} className={`my-6 rounded-xl border-l-4 p-4 sm:p-5 ${toneClasses[block.tone]}`}>
          <h3 className="font-semibold">{block.title}</h3>
          <p className="mt-1 text-sm leading-6 sm:text-[15px]">{block.text}</p>
        </aside>
      );
    }
    case 'code':
      return <div key={block.id} className="my-6"><CodePanel language={block.language} code={block.code} caption={block.caption} locale={locale} /></div>;
    case 'codeWalkthrough':
      return (
        <div key={block.id} className="my-6 space-y-4">
          <CodePanel language={block.language} code={block.code} locale={locale} />
          <ol className="space-y-3">
            {block.steps.map((step, index) => (
              <li key={`${step.title}-${index}`} className="flex gap-3 rounded-xl border border-neutral-200 bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 font-mono text-xs font-semibold text-neutral-700">{index + 1}</span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-neutral-900">{step.title}</h4>
                  {(step.lineStart !== undefined || step.lineEnd !== undefined) && (
                    <p className="mt-1 text-xs font-medium text-neutral-500">
                      {locale === 'ru' ? 'Строки' : 'Lines'} {step.lineStart ?? step.lineEnd}{step.lineEnd !== undefined && step.lineEnd !== step.lineStart ? `–${step.lineEnd}` : ''}
                    </p>
                  )}
                  <p className="mt-2 text-sm leading-6 text-neutral-700">{step.explanation}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'knowledgeCheck':
      if (sequentialQuestionIds.has(block.id)) return null;
      return <KnowledgeCheck key={block.id} block={block} locale={locale} lessonId={lessonId} />;
    case 'sequentialQuiz': {
      const questions = block.questionBlockIds.map((id) => questionBlocksById.get(id)).filter((question): question is KnowledgeCheckBlock => Boolean(question));
      return <SequentialKnowledgeQuiz key={block.id} block={block} questions={questions} locale={locale} lessonId={lessonId} />;
    }
    case 'codingExercise':
      return <CodingExercise key={block.id} block={block} locale={locale} lessonId={lessonId} />;
    case 'pipelineSimulation':
      return <PipelineSimulation key={block.id} block={block} locale={locale} />;
    case 'branchFlowSimulation':
      return <BranchFlowSimulation key={block.id} block={block} locale={locale} />;
    case 'references':
      return (
        <section key={block.id} className="mt-10 border-t border-neutral-200 pt-6">
          <h2 className="text-xl font-semibold text-neutral-950">{locale === 'ru' ? 'Источники и дополнительное чтение' : 'References and further reading'}</h2>
          <ul className="mt-4 space-y-3">
            {block.items.map((item, index) => (
              <li key={`${block.id}-reference-${index}`}>
                <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 text-sm font-medium text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900">
                  <span>{item.title}</span>
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
                <p className="mt-1 text-xs text-neutral-500">{item.kind}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    default:
      return null;
  }
}

export function StructuredLessonRenderer({ lesson }: StructuredLessonRendererProps) {
  const locale = lesson.locale as SupportedLocale;
  const questionBlocksById = new Map<string, KnowledgeCheckBlock>();
  for (const block of lesson.blocks) {
    if (block.type === 'knowledgeCheck') questionBlocksById.set(block.id, block);
  }
  const sequentialQuestionIds = new Set(
    lesson.blocks.flatMap((block) => block.type === 'sequentialQuiz' ? block.questionBlockIds : []),
  );

  return (
    <article className="structured-lesson min-w-0">
      {lesson.blocks.map((block) => renderBlock(block, locale, lesson.id, sequentialQuestionIds, questionBlocksById))}
    </article>
  );
}