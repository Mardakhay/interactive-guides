import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildWorkerSource } from './JavaScriptWorkerProgram';
import { JavaScriptRunner } from './JavaScriptRunner';

class MockWorker {
  static latest: MockWorker | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  posted: unknown = null;
  terminated = false;

  constructor(public readonly url: string) {
    MockWorker.latest = this;
  }

  postMessage(message: unknown) {
    this.posted = message;
  }

  terminate() {
    this.terminated = true;
  }

  emit(data: unknown) {
    this.onmessage?.({ data } as MessageEvent);
  }
}

beforeEach(() => {
  MockWorker.latest = null;
  vi.stubGlobal('Worker', MockWorker);
  vi.stubGlobal('URL', {
    createObjectURL: vi.fn(() => 'blob:mock-runner'),
    revokeObjectURL: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('JavaScriptRunner', () => {
  it('creates a disposable worker program that blocks common network APIs', () => {
    const source = buildWorkerSource();
    expect(source).toContain('new AsyncFunction');
    expect(source).toContain('Network access is disabled');
    expect(source).toContain('XMLHttpRequest is disabled');
    expect(source).toContain('Loading external scripts is disabled');
    expect(source).toContain('nativePostMessage');
  });

  it('runs the current draft in a worker and renders console output', () => {
    render(<JavaScriptRunner code="console.log('hello from worker')" locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Run code' }));

    const worker = MockWorker.latest;
    expect(worker).not.toBeNull();
    expect(worker?.posted).toEqual({ type: 'run', code: "console.log('hello from worker')" });

    act(() => worker?.emit({
      protocol: 'interactive-guides-worker-v1',
      type: 'output',
      kind: 'log',
      text: 'hello from worker',
    }));
    expect(screen.getByText('hello from worker')).toBeTruthy();

    act(() => worker?.emit({ protocol: 'interactive-guides-worker-v1', type: 'finished', text: '' }));
    expect(screen.getByText('Execution finished.')).toBeTruthy();
    expect(worker?.terminated).toBe(true);
  });

  it('terminates the worker when the hard wall-clock timeout expires', () => {
    vi.useFakeTimers();
    render(<JavaScriptRunner code="while (true) {}" locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Run code' }));
    const worker = MockWorker.latest;

    act(() => vi.advanceTimersByTime(1_500));

    expect(worker?.terminated).toBe(true);
    expect(screen.getAllByText(/worker was terminated after 1.5 seconds/i).length).toBeGreaterThan(0);
  });

  it('does not embed learner source into the worker bootstrap script', () => {
    const source = buildWorkerSource();
    expect(source).not.toContain('</script>');
    expect(source).not.toContain('window.location');
  });
  it('limits output messages in the worker even when user code logs repeatedly', async () => {
    const messages: Array<{ protocol: string; type: string; kind?: string; text?: string }> = [];
    const workerScope: {
      postMessage: (message: unknown) => void;
      console: Console;
      onmessage: ((event: MessageEvent) => void) | null;
      [key: string]: unknown;
    } = {
      postMessage: (message) => messages.push(message as { protocol: string; type: string; kind?: string; text?: string }),
      console: {
        log() {}, info() {}, warn() {}, error() {}, debug() {}, table() {},
      } as unknown as Console,
      onmessage: null,
    };

    const executeBootstrap = new Function('self', buildWorkerSource()) as (scope: typeof workerScope) => void;
    executeBootstrap(workerScope);
    workerScope.onmessage?.({
      data: { type: 'run', code: 'for (let index = 0; index < 100; index += 1) console.log(index);' },
    } as MessageEvent);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const outputMessages = messages.filter((message) => message.type === 'output');
    expect(outputMessages).toHaveLength(41);
    expect(outputMessages.slice(0, 40).every((message) => message.kind === 'log')).toBe(true);
    expect(outputMessages[40]).toMatchObject({
      protocol: 'interactive-guides-worker-v1',
      kind: 'system',
      text: '[Further output omitted to keep the console readable.]',
    });
    expect(messages.filter((message) => message.type === 'finished')).toHaveLength(1);
  });

  it('executes an async snippet and reports its returned value', async () => {
    const messages: Array<{ protocol: string; type: string; kind?: string; text?: string }> = [];
    const workerScope: {
      postMessage: (message: unknown) => void;
      console: Console;
      onmessage: ((event: MessageEvent) => void) | null;
      [key: string]: unknown;
    } = {
      postMessage: (message) => messages.push(message as { protocol: string; type: string; kind?: string; text?: string }),
      console: {
        log() {}, info() {}, warn() {}, error() {}, debug() {}, table() {},
      } as unknown as Console,
      onmessage: null,
    };

    const executeBootstrap = new Function('self', buildWorkerSource()) as (scope: typeof workerScope) => void;
    executeBootstrap(workerScope);
    workerScope.onmessage?.({
      data: { type: 'run', code: 'await Promise.resolve(); return 3;' },
    } as MessageEvent);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(messages.some((message) => message.type === 'output' && message.kind === 'result' && message.text === '3')).toBe(true);
    expect(messages.some((message) => message.type === 'finished')).toBe(true);
    expect(messages.some((message) => message.type === 'runtime-error')).toBe(false);
  });

});