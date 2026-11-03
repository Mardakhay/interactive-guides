import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import englishTesting from './lessons/testing.react-testing-library/en.json';
import russianTesting from './lessons/testing.react-testing-library/ru.json';
import { lessonTranslationSchema } from './schemas/lessonContent';

const legacyTestingHtml = readFileSync(
  resolve(process.cwd(), 'public/lessons/test.guide.html'),
  'utf8',
);

function sectionById(id: string): string {
  const match = legacyTestingHtml.match(
    new RegExp('<section class="section anchor" id="' + id + '">[\\s\\S]*?</section>'),
  );
  if (!match) throw new Error('Missing legacy testing section: ' + id);
  return match[0];
}

describe('qa-002 legacy testing guide accuracy and runner parity', () => {
  it('preserves the main content sections, five-question quiz, and interactive tabs', () => {
    for (const id of ['jest', 'matchers', 'mocks', 'rtl', 'queries', 'userevents', 'async', 'bestpractices', 'quiz']) {
      expect(sectionById(id).trim().length, id).toBeGreaterThan(100);
    }
    expect((legacyTestingHtml.match(/class="quiz-card reveal"/g) ?? [])).toHaveLength(5);
    expect((legacyTestingHtml.match(/<(?:button|input|textarea|select|form)\b/gi) ?? []).length).toBeGreaterThan(50);
    for (const control of ['data-tab="mock-fn"', 'data-tab="mock-api"', 'data-tab="mock-module"', 'data-tab="rtl-render"', 'data-tab="rtl-flow"']) {
      expect(legacyTestingHtml).toContain(control);
    }
    expect((legacyTestingHtml.match(/class="copy-btn"/g) ?? []).length).toBeGreaterThan(10);
  });

  it('distinguishes the lesson’s Jest examples from this repository’s Vitest setup', () => {
    const jest = sectionById('jest');
    expect(jest).toContain('examples below deliberately teach Jest syntax');
    expect(jest).toContain('This project uses Vitest');
    expect(jest).toContain('vi.fn()');
    expect(jest).toContain('vi.mock()');
    expect(jest).toContain('vi.spyOn()');
    expect(jest).toContain('Installing <code>jest</code> alone does not configure');
    expect(jest).not.toContain('Create React App — Jest is included');
  });

  it('teaches Object.is matcher semantics, structural equality, and configurable async timeouts', () => {
    const matchers = sectionById('matchers');
    expect(matchers).toContain('Object.is');
    expect(matchers).toContain('not identical to');
    expect(matchers).toContain('toStrictEqual');
    const queries = sectionById('queries');
    expect(queries).toContain('configured async timeout');
    expect(queries).not.toContain('Default waits 1000ms');
  });

  it('uses userEvent.setup() before asynchronous interactions in the primary login example', () => {
    expect(legacyTestingHtml).toContain('<span class="kw">const</span> user = userEvent.<span class="fn">setup</span>()');
    expect(legacyTestingHtml).toContain('user.<span class="fn">type</span>');
    expect(legacyTestingHtml).toContain('user.<span class="fn">click</span>');
    expect(legacyTestingHtml).not.toContain('userEvent.<span class="fn">type</span>');
    expect(legacyTestingHtml).not.toContain('userEvent.<span class="fn">click</span>');
  });

  it('validates the structured EN/RU lesson, assessed checks, and query/AAA semantics', () => {
    expect(lessonTranslationSchema.safeParse(englishTesting).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianTesting).success).toBe(true);
    expect(englishTesting.version).toBe(6);
    expect(englishTesting.blocks).toHaveLength(45);
    expect(englishTesting.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianTesting.blocks.map(({ id, type }) => [id, type]),
    );
    for (const lesson of [englishTesting, russianTesting]) {
      for (const id of ['matcher-equality-check', 'query-absence-check', 'aaa-pattern-check', 'test-mock-lifecycle-check']) {
        const check = lesson.blocks.find(block => block.id === id);
        expect(check?.type).toBe('knowledgeCheck');
        if (check?.type !== 'knowledgeCheck') return;
        expect(check.options.filter(option => option.correct)).toHaveLength(1);
        expect(check.options.every(option => option.feedback.trim().length > 20)).toBe(true);
      }
      const runner = lesson.blocks.find(block => block.id === 'test-runner-body');
      expect(runner?.type).toBe('paragraph');
      if (runner?.type === 'paragraph') expect(runner.text).toContain('Vitest');
      const refs = lesson.blocks.find(block => block.id === 'testing-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') expect(refs.items.length).toBeGreaterThan(0);
    }
  });
});
