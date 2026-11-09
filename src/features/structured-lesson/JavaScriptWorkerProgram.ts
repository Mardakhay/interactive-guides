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

