import { afterEach, describe, expect, it } from 'vitest';
import { useStructuredLearningStore } from './store';
import { LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, STRUCTURED_LEARNING_STORAGE_KEY } from './schemas';

const storageKey = STRUCTURED_LEARNING_STORAGE_KEY;

afterEach(() => {
  localStorage.removeItem(storageKey);
  localStorage.removeItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY);
  useStructuredLearningStore.setState({
    quizAttempts: {},
    codeDrafts: {},
    practiceChecklists: {},
    sectionProgress: {},
  });
});

describe('structured lesson learning state', () => {
  it('persists quiz attempts separately from lesson completion', () => {
    useStructuredLearningStore.getState().recordQuizAttempt(
      'test.lesson',
      'question-1',
      ['option-a'],
      true,
    );

    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    const attempts = saved.data.quizAttempts['test.lesson::question-1'];

    expect(attempts).toHaveLength(1);
    expect(attempts[0].selectedOptionIds).toEqual(['option-a']);
    expect(attempts[0].isCorrect).toBe(true);
    expect(saved.schemaVersion).toBe(2);
    expect(attempts[0].submittedAt).toBeTruthy();
    expect(saved).not.toHaveProperty('lessonStatus');
  });

  it('saves code drafts and self-review checklists locally', () => {
    const store = useStructuredLearningStore.getState();
    store.saveCodeDraft('test.lesson', 'exercise-1', '<h1>Draft</h1>');
    store.setPracticeCriterion('test.lesson', 'exercise-1', 2, true);

    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    expect(saved.data.codeDrafts['test.lesson::exercise-1'].code).toBe('<h1>Draft</h1>');
    expect(saved.data.practiceChecklists['test.lesson::exercise-1'].checkedCriteria).toEqual([2]);
  });

  it('removes only a draft when the learner resets it', () => {
    const store = useStructuredLearningStore.getState();
    store.saveCodeDraft('test.lesson', 'exercise-1', '<h1>Draft</h1>');
    store.setPracticeCriterion('test.lesson', 'exercise-1', 0, true);
    store.resetCodeDraft('test.lesson', 'exercise-1');

    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    expect(saved.data.codeDrafts).not.toHaveProperty('test.lesson::exercise-1');
    expect(saved.data.practiceChecklists['test.lesson::exercise-1'].checkedCriteria).toEqual([0]);
  });
});

describe('structured learning schema migration', () => {
  it('migrates the historical v1 raw record to a versioned v2 record without losing data', async () => {
    const { readStructuredLearningState } = await import('./persistence');
    const legacy = {
      quizAttempts: {
        'test.lesson::question-1': [
          { selectedOptionIds: ['answer-b'], isCorrect: false, submittedAt: '2026-10-21T12:00:00.000Z' },
        ],
      },
      codeDrafts: {
        'test.lesson::exercise-1': { code: 'const answer = 42;', updatedAt: '2026-10-21T12:01:00.000Z' },
      },
      practiceChecklists: {
        'test.lesson::exercise-1': { checkedCriteria: [0, 2], updatedAt: '2026-10-21T12:02:00.000Z' },
      },
    };
    localStorage.setItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY, JSON.stringify(legacy));

    const result = readStructuredLearningState(localStorage);
    const persisted = JSON.parse(localStorage.getItem(storageKey) ?? '{}');

    expect(result.source).toBe('migrated-legacy');
    expect(result.state.quizAttempts['test.lesson::question-1']).toEqual(legacy.quizAttempts['test.lesson::question-1']);
    expect(result.state.codeDrafts['test.lesson::exercise-1'].code).toBe('const answer = 42;');
    expect(result.state.sectionProgress).toEqual({});
    expect(persisted.schemaVersion).toBe(2);
    expect(persisted.data.practiceChecklists['test.lesson::exercise-1'].checkedCriteria).toEqual([0, 2]);
    expect(localStorage.getItem(LEGACY_STRUCTURED_LEARNING_STORAGE_KEY)).toBeNull();
  });
});