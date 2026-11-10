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

describe('cross-locale user-facing prose quality', () => {
  it('does not leave long English prose copied verbatim into Russian structured blocks', async () => {
    const ignoredKeys = new Set([
      'id', 'locale', 'version', 'updatedAt', 'moduleId', 'week',
      'supplementaryTrackId', 'order', 'estimatedMinutes', 'difficulty',
      'prerequisites', 'tags', 'language', 'kind', 'correct',
      'lineStart', 'lineEnd', 'code', 'url', 'starterCode',
    ]);
    const issues: string[] = [];

    const compare = (
      lessonId: string,
      blockId: string,
      english: unknown,
      russian: unknown,
      path: readonly (string | number)[] = [],
    ): void => {
      const key = path.length > 0 ? path[path.length - 1] : undefined;
      if (typeof key === 'string' && ignoredKeys.has(key)) return;

      // These fields are code-shaped examples or API-name references, not prose.
      const codeLikeField =
        (lessonId === 'css.fundamentals' && blockId === 'css-quick-reference-list' && path[0] === 'items') ||
        (lessonId === 'js.async-fetch' && blockId === 'deep-async-check' && path[0] === 'options' && path[2] === 'text') ||
        (lessonId === 'js.functions-arrays-objects' &&
          ['nested-destructuring-check', 'quiz-destructure'].includes(blockId) &&
          path[0] === 'options' && path[2] === 'text') ||
        (lessonId === 'testing.react-testing-library' && blockId === 'testing-quiz-1' && path[0] === 'options' && path[2] === 'text') ||
        (lessonId === 'tooling.node-npm-vite' && blockId === 'vite-template-check' && path[0] === 'options' && path[2] === 'text') ||
        (lessonId === 'js.runtime-memory' && blockId === 'runtime-copy-practice' && path[0] === 'successCriteria' && path[1] === 2);
      if (codeLikeField) return;

      if (typeof english === 'string' && typeof russian === 'string') {
        const text = russian.trim();
        if (
          text.length >= 35 &&
          english.trim() === text &&
          !/[А-Яа-яЁё]/.test(text) &&
          !/^https?:\/\//i.test(text)
        ) {
          issues.push(`${lessonId}/${blockId}/${path.join('.')}`);
        }
        return;
      }

      if (Array.isArray(english) && Array.isArray(russian)) {
        for (let index = 0; index < Math.min(english.length, russian.length); index += 1) {
          compare(lessonId, blockId, english[index], russian[index], [...path, index]);
        }
        return;
      }

      if (
        english && russian &&
        typeof english === 'object' && typeof russian === 'object' &&
        !Array.isArray(english) && !Array.isArray(russian)
      ) {
        const ruRecord = russian as Record<string, unknown>;
        for (const [key, value] of Object.entries(english as Record<string, unknown>)) {
          if (key === 'code' || key === 'url') continue;
          if (key === 'type' && value === 'references') return;
          compare(lessonId, blockId, value, ruRecord[key], [...path, key]);
        }
      }
    };

    for (const lessonId of getStructuredLessonIds()) {
      const [english, russian] = await Promise.all([
        getStructuredLesson(lessonId, 'en'),
        getStructuredLesson(lessonId, 'ru'),
      ]);
      if (!english || !russian) {
        issues.push(`${lessonId}: missing EN/RU body for prose comparison`);
        continue;
      }

      for (const russianBlock of russian.blocks) {
        if (russianBlock.type === 'code' || russianBlock.type === 'references') continue;
        const englishBlock = english.blocks.find((block) => block.id === russianBlock.id);
        if (!englishBlock) {
          issues.push(`${lessonId}/${russianBlock.id}: missing EN counterpart`);
          continue;
        }
        compare(lessonId, russianBlock.id, englishBlock, russianBlock);
      }
    }

    expect(issues.sort()).toEqual([]);
  });
});
