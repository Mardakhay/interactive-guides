import { useState } from 'react';
import { Check, Clipboard, ExternalLink, Lightbulb, RotateCcw } from 'lucide-react';
import type { LessonContentBlock, LessonTranslation } from '@/content/schemas/lessonContent';
import type { SupportedLocale } from '@/content/repository';
import { useStructuredLearningStore } from './store';

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
      </figcaption>
      <pre className="max-w-full overflow-x-auto p-4 text-[13px] leading-6 sm:text-sm">
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  );
}

function KnowledgeCheck({
  block,
  locale,
  lessonId,
}: {
  block: Extract<LessonContentBlock, { type: 'knowledgeCheck' }>;
  locale: SupportedLocale;
  lessonId: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const correctIds = block.options.filter((option) => option.correct).map((option) => option.id);
  const isSelectionCorrect =
    selected.length === correctIds.length &&
    selected.every((id) => correctIds.includes(id));
  const isCorrect = submitted && isSelectionCorrect;
  const attemptKey = lessonId + '::' + block.id;
  const attemptHistory = useStructuredLearningStore((state) => state.quizAttempts[attemptKey]);
  const recordQuizAttempt = useStructuredLearningStore((state) => state.recordQuizAttempt);

  const choose = (id: string) => {
    if (submitted) return;
    if (block.questionType === 'multi-select') {
      setSelected((current) =>
        current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
      );
      return;
    }
    setSelected([id]);
  };

  const checkLabel = locale === 'ru' ? 'Проверить ответ' : 'Check answer';
  const retryLabel = locale === 'ru' ? 'Попробовать ещё раз' : 'Try again';
  const correctLabel = locale === 'ru' ? 'Верно' : 'Correct';
  const reviewLabel = locale === 'ru' ? 'Нужно проверить ещё раз' : 'Not quite';
  const multiLabel = locale === 'ru' ? 'Выбери все подходящие варианты' : 'Select all that apply';
  const savedAttemptsLabel = locale === 'ru' ? 'Сохранено попыток:' : 'Saved attempts:';

  return (
    <section className="my-7 rounded-2xl border border-primary-200 bg-primary-50/70 p-4 sm:p-5" aria-labelledby={`${block.id}-prompt`}>
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-subtle">
          <Lightbulb className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
            {locale === 'ru' ? 'Проверь себя' : 'Knowledge check'}
          </p>
          <h3 id={`${block.id}-prompt`} className="mt-2 text-base font-semibold leading-6 text-neutral-950">
            {block.prompt}
          </h3>
          <p className="mt-1 text-xs text-neutral-500">{savedAttemptsLabel} {attemptHistory?.length ?? 0}</p>
          {block.questionType === 'multi-select' && (
            <p className="mt-1 text-sm text-neutral-600">{multiLabel}</p>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {block.options.map((option) => {
          const active = selected.includes(option.id);
          const revealed = submitted && (active || option.correct);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => choose(option.id)}
              aria-pressed={active}
              className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 ${
                active ? 'border-primary-500 bg-white shadow-subtle' : 'border-neutral-200 bg-white hover:border-primary-300'
              } ${submitted && option.correct ? 'ring-1 ring-emerald-400' : ''} ${submitted && active && !option.correct ? 'ring-1 ring-rose-400' : ''}`}
            >
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                active ? 'border-primary-600 bg-primary-600 text-white' : 'border-neutral-300 text-neutral-500'
              }`}>
                {option.id.toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-neutral-800">{option.text}</span>
                {revealed && (
                  <span className="mt-1.5 block text-sm leading-5 text-neutral-600">{option.feedback}</span>
                )}
              </span>
              {submitted && option.correct && <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => {
              recordQuizAttempt(lessonId, block.id, selected, isSelectionCorrect);
              setSubmitted(true);
            }}
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {checkLabel}
          </button>
        ) : (
          <>
            <span className={`text-sm font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
              {isCorrect ? correctLabel : reviewLabel}
            </span>
            <button
              type="button"
              onClick={() => {
                setSelected([]);
                setSubmitted(false);
              }}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {retryLabel}
            </button>
          </>
        )}
      </div>
      {submitted && <p className="mt-3 text-sm leading-6 text-neutral-700">{block.explanation}</p>}
    </section>
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
  const code = savedCode ?? block.starterCode;
  const checked = checkedCriteria ?? [];

  return (
    <section className="my-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-subtle">
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
            {block.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
          </ol>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-neutral-900">{locale === 'ru' ? 'Требования' : 'Requirements'}</h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
            {block.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
          </ul>
        </div>
        <div>
          <label htmlFor={`${block.id}-editor`} className="block text-sm font-semibold text-neutral-900">
            {locale === 'ru' ? 'Твой код' : 'Your code'}
          </label>
          <p className="mt-1 text-xs text-neutral-500">
            {locale === 'ru'
              ? 'Черновик сохраняется локально при вводе. Для HTML есть изолированный предпросмотр; другие языки пока не запускаются.'
              : 'Your draft is saved locally as you type. HTML has an isolated preview; other languages are not executed yet.'}
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
              className="inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
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
          {block.language.toLowerCase() === 'html' && (
            <div className="mt-3">
              <button
                type="button"
                aria-expanded={previewOpen}
                onClick={() => setPreviewOpen((open) => !open)}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                {previewOpen
                  ? (locale === 'ru' ? 'Скрыть предпросмотр' : 'Hide preview')
                  : (locale === 'ru' ? 'Предпросмотр результата' : 'Preview result')}
              </button>
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
          )}
        </div>
        {block.hints.length > 0 && (
          <div>
            <button
              type="button"
              aria-expanded={hintsOpen}
              onClick={() => setHintsOpen((open) => !open)}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              <Lightbulb className="h-4 w-4" />
              {hintsOpen
                ? (locale === 'ru' ? 'Скрыть подсказки' : 'Hide hints')
                : (locale === 'ru' ? 'Открыть подсказки' : 'Reveal hints')}
            </button>
            {hintsOpen && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
                {block.hints.map((hint) => <li key={hint}>{hint}</li>)}
              </ul>
            )}
          </div>
        )}
        <div className="rounded-xl border border-dashed border-neutral-300 p-3">
          <h4 className="text-sm font-semibold text-neutral-900">{locale === 'ru' ? 'Критерии самопроверки' : 'Self-review criteria'}</h4>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-neutral-700">
            {block.successCriteria.map((criterion, index) => (
              <li key={criterion}>
                <label className="flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    checked={checked.includes(index)}
                    onChange={(event) => setPracticeCriterion(lessonId, block.id, index, event.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300 text-primary-700 focus:ring-primary-600"
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

function renderBlock(block: LessonContentBlock, locale: SupportedLocale, lessonId: string) {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) return <h2 key={block.id} id={block.id} className="mb-3 mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">{block.text}</h2>;
      if (block.level === 3) return <h3 key={block.id} id={block.id} className="mb-3 mt-7 scroll-mt-24 text-xl font-semibold tracking-tight text-neutral-950">{block.text}</h3>;
      return <h4 key={block.id} id={block.id} className="mb-2 mt-6 scroll-mt-24 text-lg font-semibold text-neutral-950">{block.text}</h4>;
    case 'paragraph':
      return <p key={block.id} className="my-4 text-[15px] leading-7 text-neutral-700 sm:text-base"><InlineText text={block.text} /></p>;
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag key={block.id} className={`my-4 space-y-2 pl-6 text-[15px] leading-7 text-neutral-700 marker:text-primary-600 sm:text-base ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
          {block.items.map((item) => <li key={item}><InlineText text={item} /></li>)}
        </ListTag>
      );
    }
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
      return <KnowledgeCheck key={block.id} block={block} locale={locale} lessonId={lessonId} />;
    case 'codingExercise':
      return <CodingExercise key={block.id} block={block} locale={locale} lessonId={lessonId} />;
    case 'references':
      return (
        <section key={block.id} className="mt-10 border-t border-neutral-200 pt-6">
          <h2 className="text-xl font-semibold text-neutral-950">{locale === 'ru' ? 'Источники и дополнительное чтение' : 'References and further reading'}</h2>
          <ul className="mt-4 space-y-3">
            {block.items.map((item) => (
              <li key={item.url}>
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

  return (
    <article className="structured-lesson min-w-0">
      {lesson.blocks.map((block) => renderBlock(block, locale, lesson.id))}
    </article>
  );
}
