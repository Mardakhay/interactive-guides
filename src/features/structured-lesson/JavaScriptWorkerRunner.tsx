import { useEffect, useRef, useState } from 'react';

type SupportedLocale = 'en' | 'ru';
type OutputKind = 'log' | 'info' | 'warn' | 'error' | 'result' | 'system';

interface OutputItem {
  readonly id: number;
  readonly kind: OutputKind;
  readonly text: string;
}

interface WorkerMessage {
  readonly runId: number;
  readonly type: 'output' | 'error' | 'finished';
  readonly kind?: OutputKind;
  readonly text?: string;
}

interface JavaScriptWorkerRunnerProps {
  readonly code: string;
  readonly locale: SupportedLocale;
}

const MAX_SOURCE_LENGTH = 12_000;
const MAX_OUTPUT_ITEMS = 40;
const MAX_OUTPUT_TEXT_LENGTH = 2_000;
const TIMEOUT_MS = 1_500;

const COPY = {
  en: {
    title: 'Run JavaScript',
    run: 'Run code',
    running: 'Running…',
    stop: 'Stop',
    clear: 'Clear output',
    waiting: 'Run your code to see console output here.',
    noOutput: '(No console output)',
    tooLong: 'The source is too long for this runner.',
    timedOut: 'Time limit reached. The worker was terminated; check for an infinite loop or an expensive operation.',
    stopped: 'Execution stopped.',
    finished: 'Execution finished.',
    error: 'Could not start the JavaScript worker.',
    note: 'Console-only environment: DOM APIs (document/window) and network APIs are unavailable. The worker is terminated after 1.5 seconds, including during a synchronous loop. This is an educational aid, not a security boundary for hostile or resource-exhausting code. Run only code you understand.',
  },
  ru: {
    title: 'Запустить JavaScript',
    run: 'Запустить код',
    running: 'Выполняется…',
    stop: 'Остановить',
    clear: 'Очистить вывод',
    waiting: 'Запусти код, чтобы увидеть вывод консоли.',
    noOutput: '(Нет вывода в консоль)',
    tooLong: 'Код слишком длинный для этой песочницы.',
    timedOut: 'Лимит времени исчерпан. Worker остановлен; проверь бесконечный цикл или слишком затратную операцию.',
    stopped: 'Выполнение остановлено.',
    finished: 'Выполнение завершено.',
    error: 'Не удалось запустить JavaScript worker.',
    note: 'Только консоль: DOM API (document/window) и сетевые API недоступны. Worker останавливается через 1,5 секунды, в том числе при синхронном цикле. Это учебный инструмент, а не граница безопасности для вредоносного или чрезмерно ресурсоёмкого кода. Запускай только понятный тебе код.',
  },
} as const;

/**
 * The source is delivered to the Worker through postMessage, never interpolated
 * into the worker bootstrap script. The Worker can be terminated by the UI
 * thread even if learner code runs an infinite synchronous loop.
 */
export function buildJavaScriptWorkerSource(): string {
  return `
const MAX_OUTPUT_ITEMS = ${MAX_OUTPUT_ITEMS};
let outputCount = 0;

function post(type, data = {}) {
  self.postMessage({ runId: self.__runId, type, ...data });
}

function formatValue(value) {
  if (typeof value === 'string') return value;
  if (value === undefined) return 'undefined';
  if (typeof value === 'bigint') return String(value) + 'n';
  try {
    const seen = new WeakSet();
    const serialized = JSON.stringify(value, (_key, nested) => {
      if (typeof nested === 'bigint') return String(nested) + 'n';
      if (nested && typeof nested === 'object') {
        if (seen.has(nested)) return '[Circular]';
        seen.add(nested);
      }
      return nested;
    }, 2);
    return serialized === undefined ? String(value) : serialized;
  } catch {
    return String(value);
  }
}

function emit(kind, values) {
  if (outputCount >= MAX_OUTPUT_ITEMS) return;
  outputCount += 1;
  const text = values.map(formatValue).join(' ').slice(0, ${MAX_OUTPUT_TEXT_LENGTH});
  post('output', { kind, text });
}

const blockedFetch = () => Promise.reject(
  new Error('Network access is disabled in this practice runner.'),
);
const blockedSync = () => {
  throw new Error('Network access is disabled in this practice runner.');
};

const lockedGlobals = {
  fetch: blockedFetch,
  XMLHttpRequest: undefined,
  WebSocket: undefined,
  EventSource: undefined,
  WebTransport: undefined,
  Worker: undefined,
  SharedWorker: undefined,
  importScripts: undefined,
  openDatabase: undefined,
};
for (const [name, value] of Object.entries(lockedGlobals)) {
  try {
    Object.defineProperty(globalThis, name, {
      value,
      writable: false,
      configurable: false,
    });
  } catch {
    // The API may be unavailable or non-configurable in a particular browser.
  }
}

self.onmessage = async (event) => {
  const data = event.data;
  if (!data || typeof data.source !== 'string' || typeof data.runId !== 'number') return;
  self.__runId = data.runId;
  outputCount = 0;

  const consoleApi = Object.freeze({
    log: (...values) => emit('log', values),
    info: (...values) => emit('info', values),
    warn: (...values) => emit('warn', values),
    error: (...values) => emit('error', values),
    clear: () => post('output', { kind: 'system', text: 'Console cleared.' }),
  });

  try {
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    const run = new AsyncFunction('console', data.source);
    const result = await run(consoleApi);
    if (result !== undefined) emit('result', [result]);
  } catch (error) {
    const message = error instanceof Error
      ? error.name + ': ' + error.message
      : String(error);
    emit('error', [message]);
  } finally {
    post('finished');
  }
};
`;
}

export function JavaScriptWorkerRunner({ code, locale }: JavaScriptWorkerRunnerProps) {
  const copy = COPY[locale];
  const workerRef = useRef<Worker | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const runIdRef = useRef(0);
  const outputIdRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<OutputItem[]>([]);

  const releaseWorker = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    workerRef.current?.terminate();
    workerRef.current = null;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  useEffect(() => () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    workerRef.current?.terminate();
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  const appendOutput = (kind: OutputKind, text: string) => {
    outputIdRef.current += 1;
    const entry: OutputItem = {
      id: outputIdRef.current,
      kind,
      text: text.slice(0, MAX_OUTPUT_TEXT_LENGTH),
    };
    setOutput((current) => [...current, entry].slice(-MAX_OUTPUT_ITEMS));
  };

  const runCode = () => {
    releaseWorker();
    if (code.length > MAX_SOURCE_LENGTH) {
      setOutput([{ id: ++outputIdRef.current, kind: 'error', text: copy.tooLong }]);
      setIsRunning(false);
      return;
    }

    setOutput([]);
    setIsRunning(true);
    const runId = ++runIdRef.current;

    try {
      const blob = new Blob([buildJavaScriptWorkerSource()], { type: 'text/javascript' });
      const objectUrl = URL.createObjectURL(blob);
      objectUrlRef.current = objectUrl;
      const worker = new Worker(objectUrl, { name: 'interactive-guides-js-practice' });
      workerRef.current = worker;

      worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
        const message = event.data;
        if (workerRef.current !== worker || message.runId !== runId) return;

        if (message.type === 'output') {
          appendOutput(message.kind ?? 'log', message.text ?? '');
        } else if (message.type === 'error') {
          appendOutput('error', message.text ?? copy.error);
        } else if (message.type === 'finished') {
          releaseWorker();
          setIsRunning(false);
        }
      };

      worker.onerror = (event) => {
        if (workerRef.current !== worker) return;
        event.preventDefault();
        appendOutput('error', event.message || copy.error);
        releaseWorker();
        setIsRunning(false);
      };

      timeoutRef.current = window.setTimeout(() => {
        if (workerRef.current !== worker || runIdRef.current !== runId) return;
        releaseWorker();
        setIsRunning(false);
        appendOutput('warn', copy.timedOut);
      }, TIMEOUT_MS);

      worker.postMessage({ runId, source: code });
    } catch {
      releaseWorker();
      setIsRunning(false);
      appendOutput('error', copy.error);
    }
  };

  const stopCode = () => {
    if (!workerRef.current) return;
    releaseWorker();
    setIsRunning(false);
    appendOutput('system', copy.stopped);
  };

  const outputClass = (kind: OutputKind) => {
    switch (kind) {
      case 'error': return 'text-red-700 dark:text-red-300';
      case 'warn': return 'text-amber-700 dark:text-amber-300';
      case 'result': return 'text-primary-800 dark:text-primary-200';
      case 'system': return 'text-neutral-500 dark:text-neutral-400';
      default: return 'text-neutral-800 dark:text-neutral-100';
    }
  };

  return (
    <section className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900" aria-label={copy.title}>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={runCode}
          disabled={isRunning}
          className="inline-flex min-h-10 items-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
        >
          {isRunning ? copy.running : copy.run}
        </button>
        {isRunning && (
          <button
            type="button"
            onClick={stopCode}
            className="inline-flex min-h-10 items-center rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 dark:border-neutral-700 dark:text-neutral-100"
          >
            {copy.stop}
          </button>
        )}
        <button
          type="button"
          onClick={() => setOutput([])}
          className="inline-flex min-h-10 items-center rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 underline underline-offset-2 dark:text-neutral-300"
        >
          {copy.clear}
        </button>
      </div>
      <div className="mt-3 min-h-20 max-h-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-3 font-mono text-xs leading-5 dark:border-neutral-800 dark:bg-neutral-950" role="status" aria-live="polite">
        {output.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400">{copy.waiting}</p>
        ) : (
          output.map((entry) => (
            <pre key={entry.id} className={`whitespace-pre-wrap break-words ${outputClass(entry.kind)}`}>{entry.text}</pre>
          ))
        )}
      </div>
      <p className="mt-3 text-xs leading-5 text-neutral-600 dark:text-neutral-300">{copy.note}</p>
    </section>
  );
}
