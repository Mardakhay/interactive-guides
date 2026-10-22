import { afterEach, describe, expect, it } from 'vitest';
import { useStructuredLearningStore } from './store';

const storageKey = 'interactive-guides:structured-learning:v1';

afterEach(() => {
  localStorage.removeItem(storageKey);
  useStructuredLearningStore.setState({
    quizAttempts: {},
    codeDrafts: {},
    practiceChecklists: {},
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
    const attempts = saved.quizAttempts['test.lesson::question-1'];

    expect(attempts).toHaveLength(1);
    expect(attempts[0].selectedOptionIds).toEqual(['option-a']);
    expect(attempts[0].isCorrect).toBe(true);
    expect(attempts[0].submittedAt).toBeTruthy();
    expect(saved).not.toHaveProperty('lessonStatus');
  });

  it('saves code drafts and self-review checklists locally', () => {
    const store = useStructuredLearningStore.getState();
    store.saveCodeDraft('test.lesson', 'exercise-1', '<h1>Draft</h1>');
    store.setPracticeCriterion('test.lesson', 'exercise-1', 2, true);

    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    expect(saved.codeDrafts['test.lesson::exercise-1'].code).toBe('<h1>Draft</h1>');
    expect(saved.practiceChecklists['test.lesson::exercise-1'].checkedCriteria).toEqual([2]);
  });

  it('removes only a draft when the learner resets it', () => {
    const store = useStructuredLearningStore.getState();
    store.saveCodeDraft('test.lesson', 'exercise-1', '<h1>Draft</h1>');
    store.setPracticeCriterion('test.lesson', 'exercise-1', 0, true);
    store.resetCodeDraft('test.lesson', 'exercise-1');

    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    expect(saved.codeDrafts).not.toHaveProperty('test.lesson::exercise-1');
    expect(saved.practiceChecklists['test.lesson::exercise-1'].checkedCriteria).toEqual([0]);
  });
});
