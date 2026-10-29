import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import englishDocument from './lessons/html-document-structure/en.json';
import russianDocument from './lessons/html-document-structure/ru.json';
import englishForms from './lessons/html.forms-accessibility/en.json';
import russianForms from './lessons/html.forms-accessibility/ru.json';
import { lessonTranslationSchema } from './schemas/lessonContent';

const legacyHtmlReference = readFileSync(
  resolve(process.cwd(), 'public/lessons/html-reference.html'),
  'utf8',
);

describe('wb-002 legacy HTML reference accuracy and parity', () => {
  it('preserves actual source sections, preview tabs, search, and copy controls', () => {
    const sectionIds = [
      'sec-overview', 'sec-anatomy', 'sec-structure', 'sec-elements', 'sec-text',
      'sec-links', 'sec-tables', 'sec-forms', 'sec-inputs', 'sec-semantic',
      'sec-media', 'sec-meta', 'sec-attributes', 'sec-quickref',
    ];
    for (const id of sectionIds) {
      expect(legacyHtmlReference).toMatch(new RegExp('<section[^>]+id="' + id + '"'));
    }
    expect((legacyHtmlReference.match(/<(?:button|input|textarea|select|form)\b/gi) ?? []).length).toBeGreaterThan(25);
    expect((legacyHtmlReference.match(/class="copy-btn"/g) ?? []).length).toBeGreaterThan(10);
    expect(legacyHtmlReference).toContain('id="ht-code"');
    expect(legacyHtmlReference).toContain('id="ht-prev"');
    expect(legacyHtmlReference).toContain('id="search"');
    expect(legacyHtmlReference).toContain('class="demo-tab active"');
    expect(legacyHtmlReference).toContain('class="qr-row"');
  });

  it('describes document type and heading hierarchy without turning conventions into SEO rules', () => {
    expect(legacyHtmlReference).toContain('triggers standards mode in browsers');
    expect(legacyHtmlReference).toContain('normally the first line after any optional comments');
    expect(legacyHtmlReference).toContain('choose levels to reflect the document hierarchy, not the font size');
    expect(legacyHtmlReference).toContain('not an SEO requirement');
    expect(legacyHtmlReference).not.toContain('one &lt;h1&gt; per page</strong> for SEO');
    expect(legacyHtmlReference).not.toContain('is the most important (largest)');
  });

  it('explains opener isolation and referrer privacy as distinct link decisions', () => {
    expect(legacyHtmlReference).toContain('same opener isolation as <code>rel="noopener"</code>');
    expect(legacyHtmlReference).toContain('<code>noreferrer</code> also suppresses the HTTP Referer header');
    expect(legacyHtmlReference).not.toContain('Always add <code>rel="noopener noreferrer"</code>');
  });

  it('describes HTML standards, semantics and input-type constraints without overpromising', () => {
    expect(legacyHtmlReference).toContain('HTML evolves as a maintained Living Standard');
    expect(legacyHtmlReference).not.toContain('The latest standard. Adds semantic tags');
    expect(legacyHtmlReference).toContain('semantic HTML alone does not guarantee a search-ranking boost');
    expect(legacyHtmlReference).not.toContain('Proper HTML structure helps search engines understand and rank your content better.');
    expect(legacyHtmlReference).toContain('Checks basic email syntax only; it does not confirm mailbox existence');
    expect(legacyHtmlReference).toContain('accept hints file-picker choices; it is not security validation');
    expect(legacyHtmlReference).toContain('Resets controls to their initial/default values');
    expect(legacyHtmlReference).toContain('Submitted value is client-controlled; never trust it for authorization');
    expect(legacyHtmlReference).toContain('May offer a telephone keypad on mobile; behavior varies by device');
    expect(legacyHtmlReference).toContain('Checks URL syntax only; it does not verify destination or trustworthiness');
    expect(legacyHtmlReference).not.toContain('Validates @ format');
    expect(legacyHtmlReference).not.toContain('Mobile shows dial pad');
    expect(legacyHtmlReference).toContain('client-side validation never replaces server-side validation');
  });

  it('describes alt text by purpose and avoids treating placeholder as a label', () => {
    expect(legacyHtmlReference).toContain('informative images need a concise alternative conveying their essential information or function');
    expect(legacyHtmlReference).toContain('purely decorative images should use <code>alt=""</code>');
    expect(legacyHtmlReference).toContain('not a replacement for a visible, associated label');
    expect(legacyHtmlReference).not.toContain('The <code>alt</code> attribute is essential for accessibility and SEO.');
  });

  it('separates GET and POST semantics and the iframe sandbox trust boundary', () => {
    expect(legacyHtmlReference).toContain('GET appends form values to the URL');
    expect(legacyHtmlReference).toContain('POST sends form data in the request body');
    expect(legacyHtmlReference).toContain('Neither method alone provides confidentiality or authorization');
    expect(legacyHtmlReference).not.toContain('POST (safe)');
    expect(legacyHtmlReference).toContain('start with the fewest permissions');
    expect(legacyHtmlReference).toContain('Do not casually combine <code>allow-scripts</code> and <code>allow-same-origin</code>');
    expect(legacyHtmlReference).not.toContain('sandbox</span>=<span class="hv">"allow-scripts allow-same-origin"');
  });

  it('validates both structured EN/RU lesson pairs and preserves their content contracts', () => {
    for (const lesson of [englishDocument, russianDocument, englishForms, russianForms]) {
      expect(lessonTranslationSchema.safeParse(lesson).success, lesson.id + ':' + lesson.locale).toBe(true);
    }
    for (const [english, russian, id, version, blockCount] of [
      [englishDocument, russianDocument, 'html.document-structure', 8, 54],
      [englishForms, russianForms, 'html.forms-accessibility', 3, 39],
    ] as const) {
      expect(english.id).toBe(id);
      expect(russian.id).toBe(id);
      expect(english.version).toBe(version);
      expect(english.blocks).toHaveLength(blockCount);
      expect(english.blocks.map(({ id: blockId, type }) => [blockId, type])).toEqual(
        russian.blocks.map(({ id: blockId, type }) => [blockId, type]),
      );
    }

    const formMethod = englishForms.blocks.find(block => block.id === 'action-method');
    expect(formMethod?.type).toBe('paragraph');
    if (formMethod?.type === 'paragraph') {
      expect(formMethod.text).toContain('GET places submitted values into the URL query string');
      expect(formMethod.text).toContain('POST sends the form data in the request body');
    }
    const placeholder = englishForms.blocks.find(block => block.id === 'placeholder-warning');
    expect(placeholder?.type).toBe('callout');
    if (placeholder?.type === 'callout') expect(placeholder.text).toContain('visible label');
  });
});
