import { describe, expect, it } from 'vitest';
import { STRUCTURED_LESSON_MANIFEST } from './lessonManifest';
import {
  getAdjacentStructuredLessons,
  getBootcampCurriculum,
  getCurriculumWeek,
  getStructuredLesson,
  getStructuredLessonIds,
  getStructuredLessonMetadata,
  getWeekForLesson,
  getSupplementaryTrackForLesson,
  getSupplementaryTrackById,
} from './repository';

function getCurriculumLessonIds(locale: 'en' | 'ru') {
  const curriculum = getBootcampCurriculum(locale);
  const coreLessonIds = curriculum.months.flatMap((month) =>
    month.weeks.flatMap((week) => week.lessonIds),
  );
  const supplementaryLessonIds = curriculum.supplementaryTracks.flatMap((track) => track.lessonIds);
  return [...new Set([...coreLessonIds, ...supplementaryLessonIds])].sort();
}

const expectedIds = getCurriculumLessonIds('en');

describe('structured lesson manifest', () => {
  it('keeps every lesson ID unique and every locale title non-empty', () => {
    const ids = STRUCTURED_LESSON_MANIFEST.map((entry) => entry.id);
    expect(ids).toHaveLength(44);
    expect(new Set(ids).size).toBe(ids.length);
    for (const entry of STRUCTURED_LESSON_MANIFEST) {
      expect(entry.id.trim().length).toBeGreaterThan(0);
      expect(entry.folder.trim().length).toBeGreaterThan(0);
      expect(entry.titles.en.trim().length).toBeGreaterThan(0);
      expect(entry.titles.ru.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('structured content repository', () => {
  it('registers every bilingual lesson exactly once by stable ID and metadata', async () => {
    expect(getCurriculumLessonIds('ru')).toEqual(expectedIds);
    expect(getStructuredLessonIds().sort()).toEqual(expectedIds);
    for (const id of expectedIds) {
      expect((await getStructuredLesson(id, 'en'))?.locale).toBe('en');
      expect((await getStructuredLesson(id, 'ru'))?.locale).toBe('ru');
      expect(getStructuredLessonMetadata(id, 'en')?.id).toBe(id);
      expect(getStructuredLessonMetadata(id, 'ru')?.id).toBe(id);
      expect(getStructuredLessonMetadata(id, 'en')?.title).toBe((await getStructuredLesson(id, 'en'))?.title);
      expect(getStructuredLessonMetadata(id, 'ru')?.title).toBe((await getStructuredLesson(id, 'ru'))?.title);
    }
  });

  it('preserves all six months and 24 weeks in both locales', () => {
    for (const locale of ['en', 'ru'] as const) {
      const curriculum = getBootcampCurriculum(locale);
      expect(curriculum.months).toHaveLength(6);
      expect(curriculum.months.flatMap((month) => month.weeks)).toHaveLength(24);
    }
    expect(getBootcampCurriculum('en').months[0]?.title).not.toBe(getBootcampCurriculum('ru').months[0]?.title);
  });

  it('maps all structured lessons to their canonical week', () => {
    for (const locale of ['en', 'ru'] as const) {
      const curriculum = getBootcampCurriculum(locale);
      for (const month of curriculum.months) {
        for (const week of month.weeks) {
          for (const lessonId of week.lessonIds) {
            expect(getWeekForLesson(lessonId, locale)?.id).toBe(week.id);
          }
        }
      }
    }
  });

  it('returns localized lesson IDs in the sequence of the syllabus', () => {
    for (const locale of ['en', 'ru'] as const) {
      const expectedSequence = getBootcampCurriculum(locale).months.flatMap((month) =>
        month.weeks.flatMap((week) => week.lessonIds),
      );
      for (let index = 0; index < expectedSequence.length; index += 1) {
        const id = expectedSequence[index]!;
        const result = getAdjacentStructuredLessons(id, locale);
        expect(result.previous?.id).toBe(index > 0 ? expectedSequence[index - 1] : undefined);
        expect(result.next?.id).toBe(
          index < expectedSequence.length - 1 ? expectedSequence[index + 1] : undefined,
        );
      }
    }
  });

  it('returns no structured lesson for an unknown ID', async () => {
    expect(await getStructuredLesson('unknown.lesson', 'en')).toBeUndefined();
    expect(getAdjacentStructuredLessons('unknown.lesson', 'ru')).toEqual({
      previous: undefined,
      next: undefined,
    });
  });

  it('can retrieve any canonical week by stable ID', () => {
    expect(getCurriculumWeek('month-1-week-1', 'en')?.lessonIds).toContain('web.internet-http');
    expect(getCurriculumWeek('month-1-week-1', 'ru')?.lessonIds).toContain('html.document-structure');
    expect(getCurriculumWeek('month-2-week-7', 'ru')?.lessonIds).toContain('js.dom-events');
    expect(getCurriculumWeek('month-3-week-11', 'en')?.lessonIds).toContain('react.components-jsx-state');
    expect(getCurriculumWeek('month-5-week-17', 'en')?.lessonIds).toContain('ui.design-systems');
    expect(getCurriculumWeek('month-5-week-18', 'ru')?.lessonIds).toContain('performance.accessibility');
    expect(getCurriculumWeek('month-5-week-19', 'en')?.lessonIds).toContain('testing.react-testing-library');
    expect(getCurriculumWeek('month-5-week-20', 'ru')?.lessonIds).toContain('git.workflow-ci');
    expect(getCurriculumWeek('month-6-week-21', 'en')?.lessonIds).toContain('capstone.requirements-discovery');
    expect(getCurriculumWeek('month-6-week-22', 'ru')?.lessonIds).toContain('capstone.design-architecture-planning');
    expect(getCurriculumWeek('month-6-week-23', 'en')?.lessonIds).toContain('capstone.implementation');
    expect(getCurriculumWeek('month-6-week-24', 'ru')?.lessonIds).toContain('capstone.review-demo');
  });

  it('keeps EN/RU block structure aligned for every registered lesson', async () => {
    const englishIds = getBootcampCurriculum('en').months.flatMap((month) =>
      month.weeks.flatMap((week) => week.lessonIds),
    );
    const russianIds = getBootcampCurriculum('ru').months.flatMap((month) =>
      month.weeks.flatMap((week) => week.lessonIds),
    );
    expect(russianIds).toEqual(englishIds);

    for (const lessonId of expectedIds) {
      const [english, russian] = await Promise.all([
        getStructuredLesson(lessonId, 'en'),
        getStructuredLesson(lessonId, 'ru'),
      ]);
      expect(english).toBeDefined();
      expect(russian).toBeDefined();
      expect(english?.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
        russian?.blocks.map(({ id, type }) => ({ id, type })),
      );
      expect(english?.blocks.some((block) => block.type === 'knowledgeCheck')).toBe(true);
      expect(russian?.blocks.some((block) => block.type === 'knowledgeCheck')).toBe(true);
      expect(english?.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
      expect(russian?.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
      expect(english?.blocks.filter((block) => block.type === 'references')).toHaveLength(1);
      expect(russian?.blocks.filter((block) => block.type === 'references')).toHaveLength(1);

      for (const lesson of [english, russian]) {
        const referenceBlocks = lesson?.blocks.filter((block) => block.type === 'references') ?? [];
        for (const referenceBlock of referenceBlocks) {
          if (referenceBlock.type !== 'references') continue;
          for (const reference of referenceBlock.items) {
            expect(reference.url.startsWith('https://')).toBe(true);
          }
        }

        const questions = lesson?.blocks.filter((block) => block.type === 'knowledgeCheck') ?? [];
        for (const question of questions) {
          if (question.type !== 'knowledgeCheck') continue;
          expect(question.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
        }
      }
    }
  });

  
  it('resolves supplemental lessons without adding them to core adjacency', () => {
    expect(getSupplementaryTrackForLesson('network.dns-tcp-tls', 'en')?.id).toBe('supplement-network-browser');
    expect(getSupplementaryTrackForLesson('network.dns-tcp-tls', 'ru')?.lessonIds).toEqual(['network.dns-tcp-tls']);
    expect(getSupplementaryTrackById('supplement-browser-architecture', 'en')?.title).toMatch(/Browser/);
    expect(getWeekForLesson('network.dns-tcp-tls', 'en')).toBeUndefined();
    expect(getAdjacentStructuredLessons('network.dns-tcp-tls', 'en')).toEqual({ previous: undefined, next: undefined });
    expect(getAdjacentStructuredLessons('browser.rendering-pipeline', 'ru')).toEqual({ previous: undefined, next: undefined });
    expect(getSupplementaryTrackForLesson('js.iterators-generators', 'en')?.id).toBe('supplement-js-internals');
    expect(getSupplementaryTrackForLesson('js.iterators-generators', 'ru')?.lessonIds).toContain('js.iterators-generators');
    expect(getAdjacentStructuredLessons('js.iterators-generators', 'en').previous?.id).toBe('js.object-prototypes');
    expect(getWeekForLesson('js.iterators-generators', 'ru')).toBeUndefined();
    expect(getSupplementaryTrackForLesson('js.collections-weakmaps', 'en')?.id).toBe('supplement-js-internals');
    expect(getSupplementaryTrackForLesson('js.collections-weakmaps', 'ru')?.lessonIds).toContain('js.collections-weakmaps');
    expect(getAdjacentStructuredLessons('js.collections-weakmaps', 'en').previous?.id).toBe('js.iterators-generators');
    expect(getWeekForLesson('js.collections-weakmaps', 'ru')).toBeUndefined();
    expect(getSupplementaryTrackForLesson('js.regex-text-processing', 'en')?.id).toBe('supplement-js-internals');
    expect(getSupplementaryTrackForLesson('js.regex-text-processing', 'ru')?.lessonIds).toContain('js.regex-text-processing');
    expect(getAdjacentStructuredLessons('js.regex-text-processing', 'en').previous?.id).toBe('js.collections-weakmaps');
    expect(getWeekForLesson('js.regex-text-processing', 'ru')).toBeUndefined();
    expect(getSupplementaryTrackForLesson('browser.storage-indexeddb', 'en')?.id).toBe('supplement-browser-storage');
    expect(getSupplementaryTrackForLesson('browser.storage-indexeddb', 'ru')?.lessonIds).toContain('browser.storage-indexeddb');
    expect(getWeekForLesson('browser.storage-indexeddb', 'ru')).toBeUndefined();
    expect(getSupplementaryTrackForLesson('browser.realtime-workers', 'en')?.id).toBe('supplement-browser-platform');
    expect(getSupplementaryTrackForLesson('browser.realtime-workers', 'ru')?.lessonIds).toContain('browser.realtime-workers');
    expect(getWeekForLesson('browser.realtime-workers', 'ru')).toBeUndefined();
  });
  it('explains the .gitignore syntax used in the bilingual Git fundamentals lesson', async () => {
    const [english, russian] = await Promise.all([
      getStructuredLesson('git.fundamentals', 'en'),
      getStructuredLesson('git.fundamentals', 'ru'),
    ]);
    expect(english).toBeDefined();
    expect(russian).toBeDefined();
    if (!english || !russian) throw new Error('Bilingual Git fundamentals lesson is missing');

    const getPatternList = (lesson: NonNullable<typeof english>) => {
      const block = lesson.blocks.find((candidate) => candidate.id === 'gitignore-pattern-reference');
      expect(block?.type).toBe('list');
      if (block?.type !== 'list') throw new Error('The .gitignore pattern reference must be a list');
      return block.items.join('\n');
    };

    expect(english.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russian.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(getPatternList(english)).toContain('one `*` does not cross a `/`');
    expect(getPatternList(english)).toContain('the last matching pattern');
    expect(getPatternList(english)).toContain('`!.env.example`');
    expect(getPatternList(russian)).toContain('не пересекает `/`');
    expect(getPatternList(russian)).toContain('последнее совпавшее правило');
    expect(getPatternList(russian)).toContain('`!.env.example`');
  });

  it('provides a practical README walkthrough and deployment checklist in both locales', async () => {
    const [english, russian] = await Promise.all([
      getStructuredLesson('git.fundamentals', 'en'),
      getStructuredLesson('git.fundamentals', 'ru'),
    ]);
    expect(english).toBeDefined();
    expect(russian).toBeDefined();
    if (!english || !russian) throw new Error('Bilingual Git fundamentals lesson is missing');

    expect(english.version).toBe(7);
    expect(russian.version).toBe(7);
    expect(english.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russian.blocks.map(({ id, type }) => ({ id, type })),
    );

    for (const [lesson, locale] of [[english, 'en'], [russian, 'ru']] as const) {
      const example = lesson.blocks.find((block) => block.id === 'readme-example');
      expect(example?.type).toBe('codeWalkthrough');
      if (example?.type !== 'codeWalkthrough') throw new Error('README example must be a walkthrough');
      expect(example.language).toBe('markdown');
      expect(example.code.split('\n')).toHaveLength(40);
      expect(example.steps.map(({ lineStart, lineEnd }) => [lineStart, lineEnd])).toEqual([
        [1, 10], [12, 14], [16, 20], [22, 28], [30, 40],
      ]);
      expect(example.code).toContain('npm run build');
      expect(example.code).toContain('## Deployment');

      const checklist = lesson.blocks.find((block) => block.id === 'readme-publishing-checklist');
      expect(checklist?.type).toBe('list');
      if (checklist?.type !== 'list') throw new Error('README checklist must be a list');
      const copy = checklist.items.join(' ');
      expect(copy.toLowerCase()).toContain('base path');
      expect(copy.toLowerCase()).toContain(locale === 'en' ? 'deployment status' : 'статус deploy');
      expect(copy.toLowerCase()).toContain(locale === 'en' ? 'api tokens' : 'api-токены');

      const references = lesson.blocks.find((block) => block.id === 'references');
      expect(references?.type).toBe('references');
      if (references?.type !== 'references') throw new Error('Git references block is missing');
      expect(references.items.some((item) => item.url.includes('basic-writing-and-formatting-on-github'))).toBe(true);
    }
  });

});