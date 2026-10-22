import { useEffect, useRef, useState } from 'react';
import { Play, Square, Terminal } from 'lucide-react';
import type { SupportedLocale } from '@/content/repository';

const PROTOCOL = 'interactive-guides-worker-v1';
const MAX_SOURCE_LENGTH = 12_000;
const MAX_OUTPUT_ITEMS = 40;
const MAX_OUTPUT_LENGTH = 2_000;
const RUN_TIMEOUT_MS = 1_500;

type OutputKind = 'log' | 'info' | 'warn' | 'error' | 'result' | 'system';
type RunStatus = 'idle' | 'running' | 'done' | 'stopped' | 'timeout' | 'error';
interface OutputItem { readonly kind: OutputKind; readonly text: string; }
interface WorkerMessage {
  readonly protocol: string;
  readonly type: 'output' | 'runtime-error' | 'finished';
  readonly kind?: OutputKind;
  readonly text?: string;
}
interface WorkerRequest { readonly type: 'run'; readonly code: string; }

const COPY = {
  en: {
    title: 'Run JavaScript',
    description: 'Run this draft in a disposable Web Worker to inspect values and console output.',
    run: 'Run code', running: 'Running…', stop: 'Stop run',
    output: 'Console output', waiting: 'Run the code to see output.',
    finished: 'Execution finished.', stopped: 'Execution stopped.',
    timedOut: 'The worker was terminated after 1.5 seconds. Check for an accidental infinite loop or an operation that never settles.',
    runtimeError: 'Runtime error',
    workerUnavailable: 'This browser does not support the Worker APIs required by this runner.',
    runFailed: 'Could not start the JavaScript worker.',
    sourceTooLong: 'The source exceeds the 12,000-character runner limit.',
    warning: 'Learning sandbox: each run uses a disposable Worker and a hard wall-clock timeout. Browser DOM APIs are unavailable and common network APIs are deliberately blocked. This is not a security boundary for hostile code; do not paste secrets or run code you do not understand.',
    overOutput: '[Further output omitted to keep the console readable.]',
  },
  ru: {
    title: 'Запустить JavaScript',
    description: 'Запусти этот черновик в одноразовом Web Worker, чтобы изучить значения и вывод консоли.',
    run: 'Запустить код', running: 'Выполняется…', stop: 'Остановить',
    output: 'Вывод консоли', waiting: 'Запусти код, чтобы увидеть вывод.',
    finished: 'Выполнение завершено.', stopped: 'Выполнение остановлено.',
    timedOut: 'Worker остановлен через 1,5 секунды. Проверь бесконечный цикл или операцию, которая не завершается.',
    runtimeError: 'Ошибка выполнения',
    workerUnavailable: 'Этот браузер не поддерживает Worker API, необходимые для запуска кода.',
    runFailed: 'Не удалось запустить JavaScript worker.',
    sourceTooLong: 'Код превышает лимит песочницы в 12 000 символов.',
    warning: 'Учебная песочница: каждый запуск использует одноразовый Worker и жёсткий тайм-аут. DOM браузера недоступен, распространённые сетевые API намеренно заблокированы. Это не граница безопасности для враждебного кода; не вставляй секреты и не запускай код, которого не понимаешь.',
    overOutput: '[Остальной вывод скрыт, чтобы консоль оставалась читаемой.]',
  },
} as const;

function workerMain() {
  const scope = self as unknown as {
    postMessage: (message: unknown) => void;
    onmessage: ((event: MessageEvent) => void) | null;
    console: Console;
    [key: string]: unknown;
  };
  const protocol = 'interactive-guides-worker-v1';
  const maxOutputLength = 2_000;
  const nativePostMessage = scope.postMessage.bind(scope);

  const send = (type: string, kind: string, text: string) => {
    nativePostMessage({ protocol, type, kind, text: String(text).slice(0, maxOutputLength) });
  };

  const formatValue = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (value === undefined) return 'undefined';
    if (typeof value === 'bigint') return String(value) + 'n';
    try {
      const seen = new WeakSet<object>();
      const json = JSON.stringify(value, (_key, item: unknown) => {
        if (typeof item === 'bigint') return String(item) + 'n';
        if (item && typeof item === 'object') {
          if (seen.has(item)) return '[Circular]';
          seen.add(item);
        }
        return item;
      }, 2);
      return json === undefined ? String(value) : json;
    } catch {
      return String(value);
    }
  };

  const disableCapability = (name: string, value: unknown) => {
    try {
      Object.defineProperty(scope, name, {
        configurable: false,
        enumerable: false,
        writable: false,
        value,
      });
    } catch {
      try { scope[name] = value; } catch { /* restricted browser API */ }
    }
  };

  const blockedNetworkError = () => Promise.reject(
    new Error('Network access is disabled in the learning runner. Use your local project for live API requests.'),
  );
  disableCapability('fetch', blockedNetworkError);
  disableCapability('XMLHttpRequest', function XMLHttpRequestBlocked() {
    throw new Error('XMLHttpRequest is disabled in the learning runner.');
  });
  disableCapability('WebSocket', function WebSocketBlocked() {
    throw new Error('WebSocket is disabled in the learning runner.');
  });
  disableCapability('EventSource', function EventSourceBlocked() {
    throw new Error('EventSource is disabled in the learning runner.');
  });
  disableCapability('WebTransport', function WebTransportBlocked() {
    throw new Error('WebTransport is disabled in the learning runner.');
  });
  disableCapability('Worker', function NestedWorkerBlocked() {
    throw new Error('Creating nested workers is disabled in the learning runner.');
  });
  disableCapability('SharedWorker', function SharedWorkerBlocked() {
    throw new Error('Creating nested workers is disabled in the learning runner.');
  });
  disableCapability('importScripts', function ImportScriptsBlocked() {
    throw new Error('Loading external scripts is disabled in the learning runner.');
  });
  disableCapability('postMessage', function WorkerMessagingBlocked() {
    throw new Error('Direct worker messaging is disabled in the learning runner.');
  });

  const consoleMethods = scope.console as unknown as Record<string, (...values: unknown[]) => void>;
  ['log', 'info', 'warn', 'error', 'debug', 'table'].forEach((kind) => {
    try {
      consoleMethods[kind] = (...values: unknown[]) => {
        const level = kind === 'debug' || kind === 'table' ? 'log' : kind;
        send('output', level, values.map(formatValue).join(' '));
      };
    } catch { /* restricted console implementation */ }
  });

  scope.onmessage = (event) => {
    const message = event.data as { type?: string; code?: unknown } | null;
    if (!message || message.type !== 'run' || typeof message.code !== 'string') return;

    void (async () => {
      try {
        const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (body: string) => () => Promise<unknown>;
        const result = await new AsyncFunction('"use strict";\\n' + message.code)();
        if (result !== undefined) send('output', 'result', formatValue(result));
        send('finished', 'system', '');
      } catch (error) {
        const detail = error instanceof Error ? error.name + ': ' + error.message : String(error);
        send('runtime-error', 'error', detail);
        send('finished', 'system', '');
      }
    })();
  };
}

/**
 * A disposable Worker can be terminated when synchronous code loops forever.
 * This is a learning aid, not a hardened hostile-code execution service.
 */
export function buildWorkerSource(): string {
  return '(' + workerMain.toString() + ')()';
}

export interface JavaScriptRunnerProps {
  readonly code: string;
  readonly locale: SupportedLocale;
}

export function JavaScriptRunner({ code, locale }: JavaScriptRunnerProps) {
  const copy = COPY[locale];
  const [output, setOutput] = useState<OutputItem[]>([]);
  const [status, setStatus] = useState<RunStatus>('idle');
  const workerRef = useRef<Worker | null>(null);
  const workerUrlRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const overOutputAddedRef = useRef(false);

  const disposeWorker = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    workerRef.current?.terminate();
    workerRef.current = null;
    if (workerUrlRef.current) {
      URL.revokeObjectURL(workerUrlRef.current);
      workerUrlRef.current = null;
    }
  };

  useEffect(() => () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    workerRef.current?.terminate();
    workerRef.current = null;
    if (workerUrlRef.current) URL.revokeObjectURL(workerUrlRef.current);
  }, []);

  const appendOutput = (item: OutputItem) => {
    setOutput((current) => {
      if (current.length < MAX_OUTPUT_ITEMS) return [...current, item];
      if (!overOutputAddedRef.current) {
        overOutputAddedRef.current = true;
        return [...current.slice(0, MAX_OUTPUT_ITEMS - 1), { kind: 'system', text: copy.overOutput }];
      }
      return current;
    });
  };

  const runCode = () => {
    disposeWorker();
    overOutputAddedRef.current = false;
    setOutput([]);
    if (code.length > MAX_SOURCE_LENGTH) {
      setOutput([{ kind: 'error', text: copy.sourceTooLong }]);
      setStatus('error');
      return;
    }
    if (typeof Worker === 'undefined' || typeof URL.createObjectURL !== 'function') {
      setOutput([{ kind: 'error', text: copy.workerUnavailable }]);
      setStatus('error');
      return;
    }

    try {
      const blob = new Blob([buildWorkerSource()], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);
      workerRef.current = worker;
      workerUrlRef.current = url;
      setStatus('running');

      worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
        if (workerRef.current !== worker) return;
        const message = event.data;
        if (!message || message.protocol !== PROTOCOL) return;
        if (message.type === 'output') {
          appendOutput({ kind: message.kind ?? 'log', text: message.text ?? '' });
        } else if (message.type === 'runtime-error') {
          appendOutput({ kind: 'error', text: message.text ?? copy.runtimeError });
        } else if (message.type === 'finished') {
          disposeWorker();
          setStatus('done');
        }
      };

      worker.onerror = (event: ErrorEvent) => {
        if (workerRef.current !== worker) return;
        appendOutput({ kind: 'error', text: event.message || copy.runtimeError });
        disposeWorker();
        setStatus('error');
      };

      timeoutRef.current = window.setTimeout(() => {
        if (workerRef.current !== worker) return;
        disposeWorker();
        appendOutput({ kind: 'warn', text: copy.timedOut });
        setStatus('timeout');
      }, RUN_TIMEOUT_MS);

      worker.postMessage({ type: 'run', code } satisfies WorkerRequest);
    } catch (error) {
      disposeWorker();
      setOutput([{ kind: 'error', text: error instanceof Error ? error.message : copy.runFailed }]);
      setStatus('error');
    }
  };

  const stopRun = () => {
    disposeWorker();
    appendOutput({ kind: 'system', text: copy.stopped });
    setStatus('stopped');
  };

  const outputColor = (kind: OutputKind) => {
    switch (kind) {
      case 'error': return 'text-red-700';
      case 'warn': return 'text-amber-700';
      case 'result': return 'text-primary-800';
      case 'system': return 'text-neutral-500';
      default: return 'text-neutral-800';
    }
  };

  return (
    <section className="mt-4 rounded-xl border border-primary-200 bg-white p-3 sm:p-4" aria-label={copy.title}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700" aria-hidden="true">
          <Terminal className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-neutral-950">{copy.title}</h4>
          <p className="mt-1 text-xs leading-5 text-neutral-600">{copy.description}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={runCode}
          disabled={status === 'running'}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary-700 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
        >
          <Play className="h-4 w-4" />
          {status === 'running' ? copy.running : copy.run}
        </button>
        {status === 'running' && (
          <button
            type="button"
            onClick={stopRun}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
          >
            <Square className="h-4 w-4" />
            {copy.stop}
          </button>
        )}
        <p className="self-center text-xs text-neutral-500" aria-live="polite">
          {status === 'done' ? copy.finished : status === 'stopped' ? copy.stopped : status === 'timeout' ? copy.timedOut : ''}
        </p>
      </div>
      <div className="mt-4">
        <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-600">{copy.output}</h5>
        <div className="min-h-20 max-h-64 overflow-auto rounded-lg border border-neutral-200 bg-neutral-50 p-3" aria-live="polite" role="status">
          {output.length === 0 ? (
            <p className="text-xs text-neutral-500">{copy.waiting}</p>
          ) : (
            output.map((item, index) => (
              <pre key={index} className={'whitespace-pre-wrap break-words font-mono text-xs leading-5 ' + outputColor(item.kind)}>{item.text}</pre>
            ))
          )}
        </div>
      </div>
      <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-950">{copy.warning}</p>
    </section>
  );
}

export default JavaScriptRunner;
