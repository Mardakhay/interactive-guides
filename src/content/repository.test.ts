import { describe, expect, it } from 'vitest';
import { STRUCTURED_LESSON_MANIFEST } from './lessonManifest';
import {
  getAdjacentStructuredLessons,
  getBootcampCurriculum,
  getCurriculumWeek,
  getStructuredLesson,
  getStructuredLessonIds,
  getStructuredLessonMetadata,
  getStructuredLessonSearchDocuments,
  getStructuredPracticeExercises,
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

  it('keeps UI-library foundations in canonical week 17 while CSS preprocessing stays supplementary', async () => {
    for (const locale of ['en', 'ru'] as const) {
      expect(getCurriculumWeek('month-5-week-17', locale)?.lessonIds).toEqual([
        'ui.design-systems',
        'ui.bootstrap-mui',
      ]);
      expect(getWeekForLesson('ui.bootstrap-mui', locale)?.id).toBe('month-5-week-17');
      expect(getSupplementaryTrackForLesson('ui.bootstrap-mui', locale)).toBeUndefined();
      expect(getSupplementaryTrackById('supplement-ui-ecosystem', locale)?.lessonIds).toEqual([
        'css.sass-scss',
      ]);
      expect(getSupplementaryTrackForLesson('css.sass-scss', locale)?.id).toBe('supplement-ui-ecosystem');

      const lesson = await getStructuredLesson('ui.bootstrap-mui', locale);
      expect(lesson?.week).toBe(17);
      expect(lesson?.moduleId).toBe('month-5-week-17');
      expect(lesson?.supplementaryTrackId).toBeUndefined();
    }
  });

  it('keeps publication metadata aligned with both locale records', async () => {
    for (const entry of STRUCTURED_LESSON_MANIFEST) {
      const [english, russian] = await Promise.all([
        getStructuredLesson(entry.id, 'en'),
        getStructuredLesson(entry.id, 'ru'),
      ]);
      expect(english?.status).toBe(entry.status);
      expect(russian?.status).toBe(entry.status);
      expect(getStructuredLessonMetadata(entry.id, 'en')?.status).toBe(entry.status);
      expect(getStructuredLessonMetadata(entry.id, 'ru')?.status).toBe(entry.status);
      if (entry.status === 'published') {
        expect(english?.translationStatus).not.toBe('review-needed');
        expect(russian?.translationStatus).not.toBe('review-needed');
      }
    }
  });

  it('builds searchable bilingual lesson documents while excluding answer feedback and exercise solutions', async () => {
    const [english, russian] = await Promise.all([
      getStructuredLessonSearchDocuments('en'),
      getStructuredLessonSearchDocuments('ru'),
    ]);
    expect(english).toHaveLength(44);
    expect(russian).toHaveLength(44);
    const englishHtml = english.find((document) => document.id === 'html.document-structure');
    const russianHtml = russian.find((document) => document.id === 'html.document-structure');
    expect(englishHtml?.searchText.toLowerCase()).toContain('doctype');
    expect(russianHtml?.searchText).toMatch(/[А-Яа-яЁё]/);
    expect(englishHtml?.searchText).toContain('semantic');

    const gitLesson = await getStructuredLesson('git.fundamentals', 'en');
    const gitSearch = english.find((document) => document.id === 'git.fundamentals');
    if (!gitLesson || !gitSearch) throw new Error('Git lesson/index pair is missing');
    const quiz = gitLesson.blocks.find((block) => block.type === 'knowledgeCheck');
    const exercise = gitLesson.blocks.find((block) => block.type === 'codingExercise');
    if (!quiz || quiz.type !== 'knowledgeCheck' || !exercise || exercise.type !== 'codingExercise') {
      throw new Error('Git lesson does not contain the expected quiz and coding exercise fixtures');
    }
    expect(gitSearch.searchText).toContain(quiz.prompt);
    expect(gitSearch.searchText).not.toContain(quiz.explanation);
    expect(gitSearch.searchText).not.toContain(quiz.options[0]!.feedback);
    if (exercise.hints[0]) expect(gitSearch.searchText).not.toContain(exercise.hints[0]);
    if (exercise.solution?.code) expect(gitSearch.searchText).not.toContain(exercise.solution.code);
  });

  it('indexes coding exercises in both locales without exposing solution or hint fields', async () => {
    const [english, russian] = await Promise.all([
      getStructuredPracticeExercises('en'),
      getStructuredPracticeExercises('ru'),
    ]);
    expect(english).toHaveLength(118);
    expect(russian).toHaveLength(118);
    const aboutMe = english.find((exercise) => exercise.lessonId === 'html.document-structure' && exercise.exerciseId === 'practice-about-me');
    const russianAboutMe = russian.find((exercise) => exercise.lessonId === 'html.document-structure' && exercise.exerciseId === 'practice-about-me');
    expect(aboutMe?.title).toBe('Build an About Me page');
    expect(russianAboutMe?.title).not.toBe(aboutMe?.title);
    expect(aboutMe).toMatchObject({ language: 'html', lessonStatus: 'review' });
    expect(aboutMe).not.toHaveProperty('solution');
    expect(aboutMe).not.toHaveProperty('hints');
    expect(aboutMe?.successCriteria.length).toBeGreaterThan(0);
    expect(aboutMe).not.toHaveProperty('starterCode');
    expect(aboutMe).not.toHaveProperty('searchText');
  });

  it('keeps visible Russian metadata and learning outcomes localized across the full registry', async () => {
    const issues: string[] = [];

    for (const lessonId of expectedIds) {
      const [english, russian] = await Promise.all([
        getStructuredLesson(lessonId, 'en'),
        getStructuredLesson(lessonId, 'ru'),
      ]);
      if (!english || !russian) {
        issues.push(`${lessonId}: missing EN/RU lesson while checking localization`);
        continue;
      }

      for (const [field, value] of [
        ['title', russian.title],
        ['description', russian.description],
      ] as const) {
        if (!/[А-Яа-яЁё]/.test(value)) issues.push(`${lessonId}: RU ${field} contains no Cyrillic text`);
      }

      if (russian.learningOutcomes.length !== english.learningOutcomes.length) {
        issues.push(`${lessonId}: EN/RU learning outcome counts differ (${english.learningOutcomes.length} vs ${russian.learningOutcomes.length})`);
        continue;
      }

      russian.learningOutcomes.forEach((outcome, index) => {
        const englishOutcome = english.learningOutcomes[index];
        if (outcome.trim() === englishOutcome?.trim()) {
          issues.push(`${lessonId}: RU learning outcome ${index + 1} is identical to EN`);
        } else if (!/[А-Яа-яЁё]/.test(outcome)) {
          issues.push(`${lessonId}: RU learning outcome ${index + 1} contains no Cyrillic text`);
        }
      });
    }

    expect(issues).toEqual([]);
  });

  it('keeps core and supplementary lesson IDs unique and disjoint in both locales', () => {
    for (const locale of ['en', 'ru'] as const) {
      const curriculum = getBootcampCurriculum(locale);
      const coreIds = curriculum.months.flatMap((month) =>
        month.weeks.flatMap((week) => week.lessonIds),
      );
      const supplementaryIds = curriculum.supplementaryTracks.flatMap((track) => track.lessonIds);

      expect(coreIds).toHaveLength(27);
      expect(new Set(coreIds).size).toBe(coreIds.length);
      expect(supplementaryIds).toHaveLength(17);
      expect(new Set(supplementaryIds).size).toBe(supplementaryIds.length);
      expect(coreIds.filter((id) => supplementaryIds.includes(id))).toEqual([]);
    }
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

  it('teaches safe remediation when a real secret was committed', async () => {
    const [english, russian] = await Promise.all([
      getStructuredLesson('git.fundamentals', 'en'),
      getStructuredLesson('git.fundamentals', 'ru'),
    ]);
    expect(english).toBeDefined();
    expect(russian).toBeDefined();
    if (!english || !russian) throw new Error('Bilingual Git fundamentals lesson is missing');

    expect(english.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russian.blocks.map(({ id, type }) => ({ id, type })),
    );
    for (const lesson of [english, russian]) {
      const body = lesson.blocks.find((block) => block.id === 'gitignore-secret-response-body');
      const walkthrough = lesson.blocks.find((block) => block.id === 'gitignore-secret-response-walkthrough');
      const check = lesson.blocks.find((block) => block.id === 'gitignore-secret-response-check');
      expect(body?.type).toBe('paragraph');
      if (body?.type !== 'paragraph') throw new Error('Secret response body is missing');
      expect(body.text).toMatch(lesson.locale === 'en' ? /revoke or rotate/ : /отзови или замени/);
      expect(body.text).toMatch(lesson.locale === 'en' ? /history|forks|caches/ : /истории|fork|кеш/);
      expect(walkthrough?.type).toBe('codeWalkthrough');
      if (walkthrough?.type !== 'codeWalkthrough') throw new Error('Secret response walkthrough is missing');
      expect(walkthrough.code).toContain('git rm --cached -- .env');
      expect(walkthrough.code).toContain('git diff --cached --stat');
      expect(walkthrough.code).not.toContain('git diff --cached -- .env');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') throw new Error('Secret response knowledge check is missing');
      expect(check.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['revoke-first']);
      expect(check.options.every((option) => option.feedback.trim().length > 35)).toBe(true);
    }
  });

  it('teaches least-privilege access management for organization repositories', async () => {
    const [english, russian] = await Promise.all([
      getStructuredLesson('git.fundamentals', 'en'),
      getStructuredLesson('git.fundamentals', 'ru'),
    ]);
    expect(english).toBeDefined();
    expect(russian).toBeDefined();
    if (!english || !russian) throw new Error('Bilingual Git fundamentals lesson is missing');
    expect(english.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russian.blocks.map(({ id, type }) => ({ id, type })),
    );

    for (const lesson of [english, russian]) {
      const body = lesson.blocks.find((block) => block.id === 'repository-access-body');
      const check = lesson.blocks.find((block) => block.id === 'repository-access-role-check');
      expect(body?.type).toBe('paragraph');
      if (body?.type !== 'paragraph') throw new Error('Repository access guidance is missing');
      expect(body.text).toMatch(lesson.locale === 'en' ? /least privilege/ : /минимальных привилегий/);
      expect(body.text).toContain('Triage');
      expect(body.text).toMatch(/ruleset|protection/);
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') throw new Error('Repository role check is missing');
      expect(check.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['triage-role']);
    }
  });

  it('assesses npm update separately from a frozen CI install in both locales', async () => {
    const [english, russian] = await Promise.all([
      getStructuredLesson('tooling.advanced-package-workflows', 'en'),
      getStructuredLesson('tooling.advanced-package-workflows', 'ru'),
    ]);
    expect(english).toBeDefined();
    expect(russian).toBeDefined();
    if (!english || !russian) throw new Error('Bilingual advanced package workflow lesson is missing');

    expect(english.version).toBe(3);
    expect(russian.version).toBe(3);
    expect(english.blocks).toHaveLength(18);
    expect(russian.blocks).toHaveLength(18);
    expect(english.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russian.blocks.map(({ id, type }) => ({ id, type })),
    );

    for (const lesson of [english, russian]) {
      const commands = lesson.blocks.find((block) => block.id === 'pkg-commands');
      expect(commands?.type).toBe('list');
      if (commands?.type !== 'list') throw new Error('Package-manager command reference is missing');
      const commandText = commands.items.join(' ').toLowerCase();
      expect(commandText).toContain('npm update');
      expect(commandText).toContain('lockfile');
      expect(commandText).toMatch(/diff|изучи/);

      const check = lesson.blocks.find((block) => block.id === 'pkg-update-range-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') throw new Error('npm update knowledge check is missing');
      expect(check.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['npm-update']);
      expect(check.options.every((option) => option.feedback.trim().length > 45)).toBe(true);
      expect(check.explanation).toContain('npm update');
      expect(check.explanation).toMatch(lesson.locale === 'en' ? /lockfile diff/ : /diff lockfile/);

      const references = lesson.blocks.find((block) => block.id === 'pkg-references');
      expect(references?.type).toBe('references');
      if (references?.type !== 'references') throw new Error('Package workflow references are missing');
      expect(references.items.some((item) => item.url === 'https://docs.npmjs.com/cli/v11/commands/npm-update/')).toBe(true);
    }
  });

  it('provides a practical README walkthrough and deployment checklist in both locales', async () => {
    const [english, russian] = await Promise.all([
      getStructuredLesson('git.fundamentals', 'en'),
      getStructuredLesson('git.fundamentals', 'ru'),
    ]);
    expect(english).toBeDefined();
    expect(russian).toBeDefined();
    if (!english || !russian) throw new Error('Bilingual Git fundamentals lesson is missing');

    expect(english.version).toBe(13);
    expect(russian.version).toBe(13);
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
      expect(references.items.some((item) => item.url.includes('basic-writing-and-formatting-syntax'))).toBe(true);
    }
  });

});