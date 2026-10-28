import { describe, expect, it } from 'vitest';
import { getStructuredLesson, getStructuredLessonIds, type SupportedLocale } from './repository';

describe('structured lesson reference quality', () => {
  it('keeps reference URLs unique within each references block in both locales', async () => {
    const lessonIds = getStructuredLessonIds();
    const locales: readonly SupportedLocale[] = ['en', 'ru'];
    const issues: string[] = [];

    await Promise.all(locales.flatMap((locale) =>
      lessonIds.map(async (lessonId) => {
        const lesson = await getStructuredLesson(lessonId, locale);
        if (!lesson) {
          issues.push(`Missing registered lesson body for ${locale}:${lessonId}`);
          return;
        }

        for (const block of lesson.blocks) {
          if (block.type !== 'references') continue;

          const seenUrls = new Set<string>();
          for (const item of block.items) {
            if (seenUrls.has(item.url)) {
              issues.push(`${locale}:${lessonId}/${block.id} repeats reference URL ${item.url}`);
            }
            seenUrls.add(item.url);
          }
        }
      }),
    ));

    expect(issues.sort()).toEqual([]);
  });
});


describe('Russian structured lesson localization quality', () => {
  it('keeps reviewed prose fields translated in the Russian lesson bodies', async () => {
    const fields: readonly { lessonId: string; blockId: string; path: readonly (string | number)[] }[] = [
      { lessonId: 'browser.capability-apis', blockId: 'capabilities-model', path: ['text'] },
      { lessonId: 'browser.rendering-pipeline', blockId: 'check-2', path: ['options', 0, 'feedback'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['prompt'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['options', 0, 'text'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['options', 0, 'feedback'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['options', 1, 'text'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['options', 1, 'feedback'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['options', 2, 'text'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['options', 2, 'feedback'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['options', 3, 'text'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['options', 3, 'feedback'] },
      { lessonId: 'browser.storage-indexeddb', blockId: 'indexeddb-quiz', path: ['explanation'] },
      { lessonId: 'react.api-custom-hooks', blockId: 'knowledge-check-1', path: ['prompt'] },
      { lessonId: 'react.api-custom-hooks', blockId: 'knowledge-check-2', path: ['prompt'] },
      { lessonId: 'react.api-custom-hooks', blockId: 'knowledge-check-3', path: ['prompt'] },
      { lessonId: 'react.context-shared-state', blockId: 'knowledge-check-1', path: ['prompt'] },
      { lessonId: 'react.effects-lists-composition', blockId: 'knowledge-check-3', path: ['prompt'] },
      { lessonId: 'testing.react-testing-library', blockId: 'arrange-act-assert', path: ['text'] },
      { lessonId: 'testing.react-testing-library', blockId: 'arrange-act-assert-body', path: ['text'] },
      { lessonId: 'testing.react-testing-library', blockId: 'async-tests', path: ['text'] },
      { lessonId: 'testing.react-testing-library', blockId: 'async-tests-body', path: ['text'] },
      { lessonId: 'tooling.node-npm-vite', blockId: 'knowledge-check-1', path: ['prompt'] },
      { lessonId: 'typescript.fundamentals', blockId: 'knowledge-check-1', path: ['prompt'] },
    ];
    const issues: string[] = [];

    for (const field of fields) {
      const lesson = await getStructuredLesson(field.lessonId, 'ru');
      const block = lesson?.blocks.find((entry) => entry.id === field.blockId);
      let value: unknown = block;
      for (const part of field.path) {
        if (typeof part === 'number') {
          value = Array.isArray(value) ? value[part] : undefined;
        } else {
          value = value && typeof value === 'object'
            ? (value as Record<string, unknown>)[part]
            : undefined;
        }
      }
      if (typeof value !== 'string' || !/[А-Яа-яЁё]/.test(value)) {
        issues.push(`${field.lessonId}/${field.blockId}/${field.path.join('.')}`);
      }
    }

    expect(issues).toEqual([]);
  });
});
