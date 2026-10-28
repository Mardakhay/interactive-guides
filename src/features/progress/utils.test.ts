import { describe, expect, it } from 'vitest';
import { computeProgressStats } from './utils';

describe('computeProgressStats', () => {
  it('counts completed and in-progress lessons and calculates a percent', () => {
    expect(computeProgressStats({ one: { status: 'completed', startedAt: null, completedAt: null }, two: { status: 'in-progress', startedAt: null, completedAt: null } }, ['one', 'two', 'three'])).toEqual({ completed: 1, inProgress: 1, total: 3, percent: 33 });
  });

  it('returns zero percent for an empty lesson list', () => {
    expect(computeProgressStats({}, [])).toEqual({ completed: 0, inProgress: 0, total: 0, percent: 0 });
  });
});
