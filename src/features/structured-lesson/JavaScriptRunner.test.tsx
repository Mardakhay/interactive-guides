import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildWorkerSource, JavaScriptRunner } from './JavaScriptWorkerProgram';

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
    expect(source).toContain('importScripts is disabled');
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
    expect(screen.getByText(/worker was terminated after 1.5 seconds/i)).toBeTruthy();
  });

  it('does not embed learner source into the worker bootstrap script', () => {
    const source = buildWorkerSource();
    expect(source).not.toContain('</script>');
    expect(source).not.toContain('window.location');
  });
});
