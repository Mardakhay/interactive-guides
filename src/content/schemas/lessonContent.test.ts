import { describe, expect, it } from 'vitest';
import englishLesson from '../lessons/html-document-structure/en.json';
import russianLesson from '../lessons/html-document-structure/ru.json';
import { lessonTranslationSchema } from './lessonContent';

describe('structured lesson content', () => {
  it('accepts both pilot lesson translations', () => {
    expect(lessonTranslationSchema.safeParse(englishLesson).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianLesson).success).toBe(true);
  });

  it('keeps stable lesson identity and equivalent content structure across locales', () => {
    expect(englishLesson.id).toBe(russianLesson.id);
    expect(englishLesson.moduleId).toBe(russianLesson.moduleId);
    expect(englishLesson.week).toBe(russianLesson.week);
    expect(englishLesson.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
      russianLesson.blocks.map(({ id, type }) => ({ id, type })),
    );
    expect(englishLesson.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
    expect(russianLesson.blocks.some((block) => block.type === 'codingExercise')).toBe(true);
  });

  it('rejects a single-choice question with two correct answers', () => {
    const invalidLesson = structuredClone(englishLesson);
    const question = invalidLesson.blocks.find((block) => block.id === 'knowledge-check-1');
    if (!question || question.type !== 'knowledgeCheck') {
      throw new Error('Pilot fixture is missing knowledge-check-1');
    }
    question.options[1]!.correct = true;

    expect(lessonTranslationSchema.safeParse(invalidLesson).success).toBe(false);
  });

  it('rejects duplicate block IDs', () => {
    const invalidLesson = structuredClone(englishLesson);
    invalidLesson.blocks[1]!.id = invalidLesson.blocks[0]!.id;

    expect(lessonTranslationSchema.safeParse(invalidLesson).success).toBe(false);
  });

  it('requires source references in each lesson', () => {
    const invalidLesson = structuredClone(englishLesson);
    invalidLesson.blocks = invalidLesson.blocks.filter((block) => block.type !== 'references');

    expect(lessonTranslationSchema.safeParse(invalidLesson).success).toBe(false);
  });
});
