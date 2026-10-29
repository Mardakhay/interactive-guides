import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import englishDom from './lessons/js.dom-events/en.json';
import russianDom from './lessons/js.dom-events/ru.json';
import { lessonTranslationSchema } from './schemas/lessonContent';

const legacyDomHtml = readFileSync(
  resolve(process.cwd(), 'public/lessons/dom-masterclass.html'),
  'utf8',
);

describe('wb-004 legacy DOM masterclass accuracy and parity', () => {
  it('preserves the major source sections, interactive controls, and quiz options', () => {
    for (const id of ['intro', 'tree', 'nodes', 'selecting', 'traversal', 'manipulation', 'attributes', 'styling', 'creation', 'events', 'delegation', 'advanced', 'lab', 'challenge']) {
      expect(legacyDomHtml).toMatch(new RegExp('<section[^>]+id="' + id + '"'));
    }
    expect((legacyDomHtml.match(/<(?:button|input|textarea|select|form)\b/gi) ?? []).length).toBeGreaterThan(60);
    expect((legacyDomHtml.match(/class="quiz-option"/g) ?? [])).toHaveLength(20);
    expect(legacyDomHtml).toContain('id="xssInput"');
    expect(legacyDomHtml).toContain('id="xssSafe"');
    expect(legacyDomHtml).toContain('id="xssUnsafe"');
    expect(legacyDomHtml).toContain('id="treeNavigator"');
  });

  it('explains innerHTML injection without claiming script tags execute on insertion', () => {
    expect(legacyDomHtml).toContain('suitable for inserting untrusted strings as ordinary text');
    expect(legacyDomHtml).toContain('Script elements inserted through this API generally do not execute by that insertion alone');
    expect(legacyDomHtml).toContain('event-handler attributes on an <code>img</code>');
    expect(legacyDomHtml).not.toContain('Safe from XSS.');
    expect(legacyDomHtml).not.toContain('tags or event handlers like <code>&lt;img onerror="steal()"&gt;</code> to run malicious code');
  });

  it('avoids unqualified performance claims for classList and DocumentFragment', () => {
    expect(legacyDomHtml).toContain('performance depends on the properties changed');
    expect(legacyDomHtml).not.toContain('GPU-accelerated and animated');
    expect(legacyDomHtml).not.toContain('ONE DOM touch — fast!');
    expect(legacyDomHtml).toContain('insert the assembled children together');
    expect(legacyDomHtml).toContain('Measure the real bottleneck when performance matters');
  });

  it('uses passive listeners only for an appropriate wheel-event example and describes propagation correctly', () => {
    expect(legacyDomHtml).toContain("addEventListener</span>(<span class=\"str\">'wheel'</span>, <span class=\"fn\">handleWheel");
    expect(legacyDomHtml).toContain('handler never needs preventDefault()');
    expect(legacyDomHtml).toContain('passive</span>: <span class="kw">true</span>');
    expect(legacyDomHtml).not.toContain('better scroll perf');
    expect(legacyDomHtml).toContain('cancel a cancellable browser default action');
    expect(legacyDomHtml).toContain('stop propagation to other nodes; does not cancel default behavior');
    expect(legacyDomHtml).not.toContain('stop bubbling/capturing');
  });

  it('validates the structured EN/RU DOM lesson and the static-versus-live collection example', () => {
    expect(lessonTranslationSchema.safeParse(englishDom).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianDom).success).toBe(true);
    expect(englishDom.version).toBe(7);
    expect(englishDom.blocks).toHaveLength(71);
    expect(englishDom.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianDom.blocks.map(({ id, type }) => [id, type]),
    );

    for (const lesson of [englishDom, russianDom]) {
      const collections = lesson.blocks.find((block) => block.id === 'dom-live-collections-walkthrough');
      expect(collections?.type).toBe('codeWalkthrough');
      if (collections?.type === 'codeWalkthrough') {
        expect(collections.code).toContain('querySelectorAll');
        expect(collections.code).toContain('getElementsByClassName');
        expect(collections.code).toContain('Array.from');
        expect(collections.steps.every((step) => step.lineStart >= 1 && step.lineEnd <= collections.code.split('\n').length)).toBe(true);
      }
      const xss = lesson.blocks.find((block) => block.id === 'textcontent-callout');
      expect(xss?.type).toBe('callout');
      if (xss?.type === 'callout') expect(xss.text).toContain('cross-site scripting');
      const references = lesson.blocks.find((block) => block.id === 'dom-references');
      expect(references?.type).toBe('references');
      if (references?.type === 'references') {
        expect(references.items.some((item) => item.url === 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html')).toBe(true);
        expect(references.items.some((item) => item.url === 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener')).toBe(true);
      }
    }
  });
});
