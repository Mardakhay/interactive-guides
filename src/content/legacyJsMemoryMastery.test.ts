import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import englishRuntime from './lessons/js.runtime-memory/en.json';
import russianRuntime from './lessons/js.runtime-memory/ru.json';
import { lessonTranslationSchema } from './schemas/lessonContent';

const legacyMemoryHtml = readFileSync(
  resolve(process.cwd(), 'public/lessons/js-memory-mastery.html'),
  'utf8',
);

describe('js-003 legacy memory lesson accuracy and source parity', () => {
  it('preserves the original interactive simulations and quiz surface', () => {
    for (const id of ['stack', 'heap', 'callstack', 'primitives', 'gc', 'v8', 'quiz-container', 'score-display']) {
      expect(legacyMemoryHtml).toContain('id="' + id + '"');
    }
    for (const control of [
      "stackDemo('push')",
      "heapDemo('create')",
      "refDemo('copy')",
      "copyDemo('shallow')",
      "stringPoolDemo('add')",
      "gcStep('setup')",
      'simulateOverflow()',
      'showV8Detail(',
      'resetQuiz()',
    ]) {
      expect(legacyMemoryHtml).toContain(control);
    }
    expect(legacyMemoryHtml).toContain('Your Score');
    expect(legacyMemoryHtml).toContain('Try Again');
  });

  it('does not assert a universal physical stack/heap layout or fixed primitive sizes', () => {
    expect(legacyMemoryHtml).toContain('ECMAScript does not require every local variable or primitive value');
    expect(legacyMemoryHtml).toContain('JavaScript values do not have a portable, source-level byte size');
    expect(legacyMemoryHtml).toContain('does not expose a portable numeric memory address');
    expect(legacyMemoryHtml).not.toContain('A number is always 8 bytes');
    expect(legacyMemoryHtml).not.toContain('A boolean is always 1 byte');
    expect(legacyMemoryHtml).not.toContain('known, fixed size</strong> at compile time');
    expect(legacyMemoryHtml).not.toContain('Primitives stored directly. Fast LIFO structure. Freed automatically when scope ends.');
    expect(legacyMemoryHtml).not.toContain('Browsers typically allow 10,000–15,000 frames.');
    expect(legacyMemoryHtml).not.toContain('1–8 MB</strong> per thread');
  });

  it('describes copy semantics, const and String wrappers without overclaiming runtime representation', () => {
    expect(legacyMemoryHtml).toContain('Primitive values are immutable');
    expect(legacyMemoryHtml).toContain('JSON.parse(JSON.stringify())</code> is lossy');
    expect(legacyMemoryHtml).toContain('Engine may share an internal representation');
    expect(legacyMemoryHtml).toContain('String wrapper object');
    expect(legacyMemoryHtml).toContain('String interning is an engine optimization, not a language guarantee');
    expect(legacyMemoryHtml).not.toContain('This predictability is what makes stack lightning fast.');
    expect(legacyMemoryHtml).not.toContain('it is never pooled/interned');
    expect(legacyMemoryHtml).not.toContain('Primitive is effectively frozen.');
  });

  it('treats garbage collection and memory leaks as reachability/lifecycle questions', () => {
    expect(legacyMemoryHtml).toContain('eligible for garbage collection');
    expect(legacyMemoryHtml).toContain('do not trigger the JavaScript engine’s real garbage collector');
    expect(legacyMemoryHtml).toContain('collection is nondeterministic');
    expect(legacyMemoryHtml).toContain('does not automatically prove a leak');
    expect(legacyMemoryHtml).toContain('strict mode and JavaScript modules throw instead');
    expect(legacyMemoryHtml).toContain('retaining path is removed');
    expect(legacyMemoryHtml).not.toContain('those objects leak.');
    expect(legacyMemoryHtml).not.toContain('that object can never be collected.');
    expect(legacyMemoryHtml).not.toContain('GC will free the { name: "Alice" } object');
  });

  it('qualifies V8 optimization and runtime memory limits', () => {
    expect(legacyMemoryHtml).toContain('engine-version implementation details');
    expect(legacyMemoryHtml).toContain('Profile before making shape consistency a rule');
    expect(legacyMemoryHtml).toContain('Limits depend on the engine, host, platform and call shape');
    expect(legacyMemoryHtml).not.toContain('V8 default: ~');
    expect(legacyMemoryHtml).not.toContain('it gives up optimizing and falls back to slow lookups');
    expect(legacyMemoryHtml).not.toContain('a fixed memory offset');
  });

  it('keeps structured EN/RU runtime lessons valid and implementation-specific caveats aligned', () => {
    expect(lessonTranslationSchema.safeParse(englishRuntime).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianRuntime).success).toBe(true);
    expect(englishRuntime.id).toBe('js.runtime-memory');
    expect(englishRuntime.version).toBe(5);
    expect(englishRuntime.blocks).toHaveLength(35);
    expect(englishRuntime.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianRuntime.blocks.map(({ id, type }) => [id, type]),
    );
    for (const lesson of [englishRuntime, russianRuntime]) {
      const caveat = lesson.blocks.find((block) => block.id === 'runtime-engine-callout');
      expect(caveat?.type).toBe('callout');
      if (caveat?.type === 'callout') {
        expect(caveat.text).toContain('physical stack' === 'physical stack' && lesson.locale === 'en' ? 'physical stack' : 'физическом стеке');
        expect(caveat.text).toContain(lesson.locale === 'en' ? 'numeric addresses' : 'числовые адреса');
      }
      const memory = lesson.blocks.find((block) => block.id === 'runtime-memory-text');
      expect(memory?.type).toBe('paragraph');
      if (memory?.type === 'paragraph') expect(memory.text).toContain(lesson.locale === 'en' ? 'not predictable' : 'непредсказуемо');
    }
  });
});
