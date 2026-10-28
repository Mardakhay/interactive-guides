import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const jsBookHtml = readFileSync(resolve(process.cwd(), 'public/lessons/js_interactive_book.html'), 'utf8');
const runStart = jsBookHtml.indexOf('// Execute learner code in an isolated worker');
const quizStart = jsBookHtml.indexOf('// Quiz buttons', runStart);
if (runStart < 0 || quizStart < 0) throw new Error('Could not locate JavaScript book runner');
const runnerSource = jsBookHtml.slice(runStart, quizStart);

describe('legacy interactive JavaScript book runner', () => {
  it('runs editable examples in a Worker instead of the page main context', () => {
    expect(runnerSource).toContain('new Worker(workerUrl)');
    expect(runnerSource).toContain("new Function('console', event.data)");
    expect(runnerSource).not.toContain("new Function('console', ta.value)");
    expect(runnerSource).toContain('worker.postMessage(ta.value)');
    expect(runnerSource).toContain('Running isolated code (no DOM access)');
  });

  it('terminates stuck examples and bounds the amount of rendered output', () => {
    expect(runnerSource).toContain('const EXECUTION_WINDOW_MS = 2500;');
    expect(runnerSource).toContain('worker.terminate()');
    expect(runnerSource).toContain('const MAX_LINES = 500;');
    expect(runnerSource).toContain('const MAX_OUTPUT_CHARS = 12000;');
    expect(runnerSource).toContain('Execution stopped after 2.5 seconds');
  });

  it('uses textContent for output and stops active work when reset is pressed', () => {
    expect(runnerSource).toContain('out.textContent = RUNNING_MESSAGE;');
    expect(runnerSource).toContain('out.textContent = next.length > MAX_OUTPUT_CHARS');
    expect(runnerSource).toContain('stopRunner();');
    expect(runnerSource).toContain("ta.value = original;");
  });
});
