import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const legacyAsyncHtml = readFileSync(
  new URL('../../public/lessons/interactive-async-js.html', import.meta.url),
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

describe('legacy async JavaScript live Fetch demos', () => {
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
