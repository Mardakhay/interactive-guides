import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const legacyAsyncHtml = readFileSync(
  resolve(process.cwd(), 'public/lessons/interactive-async-js.html'),
  'utf8',
);

function extractLiveDemo(name: 'liveGet' | 'liveJoke' | 'livePost') {
  const marker = `async function ${name}() {`;
  const start = legacyAsyncHtml.indexOf(marker);
  if (start < 0) throw new Error(`Could not find legacy demo ${name}`);
  const nextAsync = legacyAsyncHtml.indexOf('\nasync function ', start + marker.length);
  const tabs = legacyAsyncHtml.indexOf('\n/* ── Tabs', start + marker.length);
  const endCandidates = [nextAsync, tabs].filter((index) => index >= 0);
  if (endCandidates.length === 0) throw new Error(`Could not find end of legacy demo ${name}`);
  return legacyAsyncHtml.slice(start, Math.min(...endCandidates));
}

describe('legacy async JavaScript source accuracy and live Fetch demos', () => {
  it('distinguishes main-thread async concurrency from Worker parallelism', () => {
    expect(legacyAsyncHtml).toContain('On the main thread, ordinary JavaScript tasks run to completion one at a time.');
    expect(legacyAsyncHtml).toContain('Web Workers</a> run JavaScript in separate threads');
    expect(legacyAsyncHtml).toContain('The Six Runtime Components in This Model');
    expect(legacyAsyncHtml).not.toContain('The Five Components');
    expect(legacyAsyncHtml).toContain('JavaScript does not specify that every variable/object is physically stored in the heap');
    expect(legacyAsyncHtml).not.toContain('without multi-threading');
    expect(legacyAsyncHtml).not.toContain('JavaScript itself never truly runs in parallel.');
  });

  it('explains that Promise.all aggregates concurrent work but does not schedule CPU parallelism', () => {
    const start = legacyAsyncHtml.indexOf('<div class="card-label green">Promise.all()</div>');
    const end = legacyAsyncHtml.indexOf('<div class="card-label orange">Promise.race()</div>', start);
    expect(start).toBeGreaterThanOrEqual(0);
    expect(end).toBeGreaterThan(start);
    const card = legacyAsyncHtml.slice(start, end);
    expect(card).toContain('Waits for all supplied Promises concurrently');
    expect(card).toContain('not because Promise.all schedules synchronous JavaScript in parallel');
    expect(card).toContain('other operations continue unless separately cancelled');
    expect(card).not.toContain('Runs ALL promises in parallel.');
    const noteStart = legacyAsyncHtml.indexOf('<p class="timing-note">');
    const noteEnd = legacyAsyncHtml.indexOf('</p>', noteStart);
    const timingNote = legacyAsyncHtml.slice(noteStart, noteEnd);
    expect(timingNote).toContain('the gain depends on request durations, network/server limits, and concurrency controls');
    expect(timingNote).not.toContain('3–10× faster');
  });

  it('explains that Promise.race does not cancel the losing operation', () => {
    const start = legacyAsyncHtml.indexOf('<div class="card-label orange">Promise.race()</div>');
    const end = legacyAsyncHtml.indexOf('<div class="card-label purple">Promise.allSettled()</div>', start);
    expect(start).toBeGreaterThanOrEqual(0);
    expect(end).toBeGreaterThan(start);
    const card = legacyAsyncHtml.slice(start, end);
    expect(card).toContain('timeout race can settle the wrapper promise without cancelling the losing request or timer');
    expect(card).toContain('AbortController');
    expect(card).toContain('clear the timeout in a');
    expect(card).toContain('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race');
  });


  it('renders remote API values as text instead of interpolating them into HTML', () => {
    for (const name of ['liveGet', 'liveJoke', 'livePost'] as const) {
      const demo = extractLiveDemo(name);
      expect(demo).not.toMatch(/innerHTML\s*(?:\+?=)\s*`/);
      expect(demo).toContain('textContent =');
      expect(demo).toContain('replaceChildren');
    }
  });

  it('checks HTTP status before presenting the POST response as success', () => {
    const demo = extractLiveDemo('livePost');
    expect(demo).toContain('if (!r.ok) throw new Error(`HTTP ${r.status}`);');
    expect(demo).toContain('Status ${r.status}');
  });

  it('uses textContent for errors from each live demo', () => {
    for (const name of ['liveGet', 'liveJoke', 'livePost'] as const) {
      expect(extractLiveDemo(name)).toContain('renderLiveError(el,');
    }
    expect(legacyAsyncHtml).toContain('error.textContent = message;');
  });
});
