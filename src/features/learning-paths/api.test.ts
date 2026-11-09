import { describe, expect, it } from 'vitest';
import { getLessons } from '@/features/content';
import { getStructuredLessonIds } from '@/content/repository';
import { getLocalizedLearningPathStepNote } from '@/features/localization';
import { getLearningPathLessonIds, getLearningPaths } from './api';

describe('learning path progress inputs', () => {
  it('returns every path step as lesson ids in order', () => {
    const path = getLearningPaths()[0];
    expect(path).toBeDefined();
    if (!path) return;
    expect(getLearningPathLessonIds(path.id)).toHaveLength(path.lessonCount);
    expect(getLearningPathLessonIds('missing')).toEqual([]);
  });
  it('keeps legacy paths intact and exposes separate structured-curriculum paths', () => {
    expect(getLearningPathLessonIds('frontend-foundations')[0]).toBe('sh-001');
    expect(getLearningPathLessonIds('structured-frontend-foundations')).toEqual([
      'web.internet-http',
      'html.document-structure',
      'html.forms-accessibility',
      'css.fundamentals',
      'css.flexbox-grid-responsive',
      'js.dom-events',
    ]);
    expect(getLearningPathLessonIds('structured-react-developer')).toEqual([
      'react.components-jsx-state',
      'react.effects-lists-composition',
      'react.forms-validation',
      'react.context-shared-state',
      'react.router-spa',
      'react.api-custom-hooks',
    ]);
    expect(getLearningPathLessonIds('structured-javascript-mastery')).toEqual([
      'js.basics-types-control-flow',
      'js.functions-arrays-objects',
      'js.object-prototypes',
      'js.runtime-memory',
      'js.async-fetch',
      'js.dom-events',
    ]);
    expect(getLearningPathLessonIds('structured-capstone')).toEqual([
      'capstone.requirements-discovery',
      'capstone.design-architecture-planning',
      'capstone.implementation',
      'testing.react-testing-library',
      'deployment.production-hosting',
      'capstone.review-demo',
    ]);
  });

  it('provides Russian step notes for every learning path without English fallback', () => {
    const allPaths = getLearningPaths();
    expect(allPaths.reduce((total, path) => total + path.steps.length, 0)).toBe(46);

    for (const path of allPaths) {
      for (const step of path.steps) {
        expect(step.note).toBeTruthy();
        const localized = getLocalizedLearningPathStepNote('ru', path.id, step.lessonId, step.note);
        expect(localized, `Missing Russian step note for ${path.id}/${step.lessonId}`).toBeTruthy();
        expect(localized).not.toBe(step.note);
        expect(getLocalizedLearningPathStepNote('en', path.id, step.lessonId, step.note)).toBe(step.note);
      }
    }
  });

  it('resolves every step against either the classic catalog or the structured manifest', () => {
    const classicIds = new Set(getLessons().map((lesson) => lesson.id));
    const structuredIds = new Set(getStructuredLessonIds());

    for (const path of getLearningPaths()) {
      expect(path.steps.length).toBeGreaterThan(0);
      for (const step of path.steps) {
        expect(
          classicIds.has(step.lessonId) || structuredIds.has(step.lessonId),
          `Unresolved lesson ID "${step.lessonId}" in path "${path.id}"`,
        ).toBe(true);
      }
    }
  });

});
