import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import englishCss from './lessons/css.fundamentals/en.json';
import russianCss from './lessons/css.fundamentals/ru.json';
import { lessonTranslationSchema } from './schemas/lessonContent';

const legacyCssHtml = readFileSync(
  resolve(process.cwd(), 'public/lessons/css-reference.html'),
  'utf8',
);

describe('wb-003 legacy CSS reference accuracy and parity', () => {
  it('preserves the principal reference sections and interactive playgrounds', () => {
    for (const id of [
      'sec-overview', 'sec-syntax', 'sec-visual', 'sec-boxmodel', 'sec-display',
      'sec-colors', 'sec-typography', 'sec-transitions', 'sec-flexbox', 'sec-grid',
      'sec-responsive', 'sec-variables', 'sec-accessibility', 'sec-compat', 'sec-quickref',
    ]) {
      expect(legacyCssHtml).toMatch(new RegExp('<section[^>]+id="' + id + '"'));
    }
    expect((legacyCssHtml.match(/<(?:button|input|textarea|select|form)\b/gi) ?? []).length).toBeGreaterThan(40);
    expect(legacyCssHtml).toContain('id="flex-demo"');
    expect(legacyCssHtml).toContain('id="gd-demo"');
    expect(legacyCssHtml).toContain('id="td-box"');
    expect(legacyCssHtml).toContain('onclick="doAcc(this)"');
    expect((legacyCssHtml.match(/class="cpb"/g) ?? []).length).toBeGreaterThan(10);
  });

  it('separates selector specificity from cascade priority and inheritance', () => {
    expect(legacyCssHtml).toContain('specificity is one part of the cascade');
    expect(legacyCssHtml).toContain('changes cascade priority rather than adding specificity points');
    expect(legacyCssHtml).toContain('Inherited values do not carry selector specificity');
    expect(legacyCssHtml).not.toContain('<span class="spec-val">∞</span>');
    expect(legacyCssHtml).not.toContain('overrides all other specificity rules');
    expect(legacyCssHtml).not.toContain('* / inherited');
  });

  it('describes CSS pixels, resets, font sizes and line-height as context-aware guidance', () => {
    expect(legacyCssHtml).toContain('CSS reference pixel; not necessarily one physical device pixel');
    expect(legacyCssHtml).toContain('This is a convention, not a requirement');
    expect(legacyCssHtml).toContain('16–18 CSS px is a common starting range, not a rule');
    expect(legacyCssHtml).toContain('Around 1.5 is a common starting point');
    expect(legacyCssHtml).not.toContain('Screen pixel (absolute)');
    expect(legacyCssHtml).not.toContain('Min 16–18px for body text.');
    expect(legacyCssHtml).not.toContain('Min 1.5 for readability.');
  });

  it('avoids universal performance claims and preserves correct grid fraction guidance', () => {
    expect(legacyCssHtml).toContain('not automatically faster than desktop-first');
    expect(legacyCssHtml).toContain('is useful for fluid values that should grow or shrink within minimum and maximum bounds');
    expect(legacyCssHtml).not.toContain('more performant and easier to maintain than desktop-first');
    expect(legacyCssHtml).not.toContain('clamp()</code> is the best way');
    expect(legacyCssHtml).not.toContain('25% 50% 25%');
    expect(legacyCssHtml).toContain('1:2:1 fractions of available space');
  });

  it('keeps visible focus feedback and teaches reduced motion and large-text contrast thresholds', () => {
    expect(legacyCssHtml).toContain('outline: 2px solid blue; outline-offset: 2px;');
    expect(legacyCssHtml).not.toContain('input:focus { border-color: blue; outline: none; }');
    expect(legacyCssHtml).toContain('prefers-reduced-motion: reduce');
    expect(legacyCssHtml).toContain('≥24 CSS px regular or ≥18.67 CSS px bold');
    expect(legacyCssHtml).toContain('WCAG');
  });

  it('validates the bilingual structured CSS lesson and stable block order', () => {
    expect(lessonTranslationSchema.safeParse(englishCss).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianCss).success).toBe(true);
    expect(englishCss.id).toBe('css.fundamentals');
    expect(englishCss.version).toBe(5);
    expect(englishCss.blocks).toHaveLength(63);
    expect(englishCss.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianCss.blocks.map(({ id, type }) => [id, type]),
    );
    for (const lesson of [englishCss, russianCss]) {
      const refs = lesson.blocks.find((block) => block.id === 'references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') expect(refs.items.length).toBeGreaterThanOrEqual(5);
    }
  });
});
