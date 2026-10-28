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
