import { describe, expect, it } from 'vitest';
import englishRuntime from '../lessons/js.runtime-memory/en.json';
import russianRuntime from '../lessons/js.runtime-memory/ru.json';
import englishPrototypes from '../lessons/js.object-prototypes/en.json';
import russianPrototypes from '../lessons/js.object-prototypes/ru.json';
import englishAuth from '../lessons/frontend.auth-security/en.json';
import russianAuth from '../lessons/frontend.auth-security/ru.json';
import englishDeployment from '../lessons/deployment.production-hosting/en.json';
import russianDeployment from '../lessons/deployment.production-hosting/ru.json';
import englishSql from '../lessons/data.sql-postgresql/en.json';
import russianSql from '../lessons/data.sql-postgresql/ru.json';
import englishSass from '../lessons/css.sass-scss/en.json';
import russianSass from '../lessons/css.sass-scss/ru.json';
import englishUiLibraries from '../lessons/ui.bootstrap-mui/en.json';
import russianUiLibraries from '../lessons/ui.bootstrap-mui/ru.json';
import englishArchitecture from '../lessons/frontend.architecture-boundaries/en.json';
import russianArchitecture from '../lessons/frontend.architecture-boundaries/ru.json';
import englishAdvancedTooling from '../lessons/tooling.advanced-package-workflows/en.json';
import russianAdvancedTooling from '../lessons/tooling.advanced-package-workflows/ru.json';
import englishCurriculum from '../curriculum/bootcamp-core.en.json';
import russianCurriculum from '../curriculum/bootcamp-core.ru.json';
import { getStructuredLesson, getSupplementaryTrackForLesson } from '../repository';
import { bootcampCurriculumSchema } from './curriculum';
import { lessonTranslationSchema } from './lessonContent';

const lessonPairs = [
  [englishRuntime, russianRuntime],
  [englishPrototypes, russianPrototypes],
  [englishAuth, russianAuth],
  [englishDeployment, russianDeployment],
  [englishSql, russianSql],
  [englishSass, russianSass],
  [englishUiLibraries, russianUiLibraries],
  [englishArchitecture, russianArchitecture],
  [englishAdvancedTooling, russianAdvancedTooling],
] as const;

describe('supplementary source-derived lessons', () => {
  it('validates every bilingual lesson against the structured lesson schema', () => {
    for (const [english, russian] of lessonPairs) {
      expect(lessonTranslationSchema.safeParse(english).success, english.id).toBe(true);
      expect(lessonTranslationSchema.safeParse(russian).success, russian.id).toBe(true);
      expect(english.id).toBe(russian.id);
      expect(english.moduleId).toBe(russian.moduleId);
      expect(english.supplementaryTrackId).toBe(russian.supplementaryTrackId);
      expect(english.blocks.map(({ id, type }) => [id, type])).toEqual(
        russian.blocks.map(({ id, type }) => [id, type]),
      );
      expect(english.blocks.some((block) => block.type === 'references')).toBe(true);
    }
  });

  it('registers all supplementary lessons in the application repository', () => {
    for (const [english, russian] of lessonPairs) {
      expect(getStructuredLesson(english.id, 'en')).toBeDefined();
      expect(getStructuredLesson(russian.id, 'ru')).toBeDefined();
      expect(getSupplementaryTrackForLesson(english.id, 'en')?.id).toBe(english.supplementaryTrackId);
      expect(getSupplementaryTrackForLesson(russian.id, 'ru')?.id).toBe(russian.supplementaryTrackId);
    }
  });

  it('keeps EN/RU curriculum tracks consistent and points to registered lesson IDs', () => {
    const en = bootcampCurriculumSchema.parse(englishCurriculum);
    const ru = bootcampCurriculumSchema.parse(russianCurriculum);
    expect(en.supplementaryTracks.map((track) => [track.id, track.lessonIds])).toEqual(
      ru.supplementaryTracks.map((track) => [track.id, track.lessonIds]),
    );
    for (const curriculum of [en, ru]) {
      for (const track of curriculum.supplementaryTracks) {
        for (const id of track.lessonIds) {
          expect(getStructuredLesson(id, curriculum === en ? 'en' : 'ru')).toBeDefined();
        }
      }
    }
  });
});