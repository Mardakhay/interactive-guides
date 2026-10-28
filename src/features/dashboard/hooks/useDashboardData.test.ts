import { afterEach, describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { getLearningPathLessonIds, getLearningPaths } from '@/features/learning-paths';
import { buildRecommendations, useDashboardData } from './useDashboardData';
import { getLessons } from '@/features/content';
import { getStructuredLessonIds } from '@/content/repository';
import { useProgressStore } from '@/features/progress';
import { useBookmarkStore } from '@/features/bookmarks';
import { useNoteStore } from '@/features/notes';

const completed = { status: 'completed' as const, startedAt: null, completedAt: null };

describe('buildRecommendations', () => {
  it('prioritizes an in-progress path over an unstarted path', () => {
    const [firstPath] = getLearningPaths();
    if (!firstPath) throw new Error('Expected learning paths');
    const [firstLesson] = getLearningPathLessonIds(firstPath.id);
    if (!firstLesson) throw new Error('Expected path lessons');
    expect(buildRecommendations({ [firstLesson]: completed })[0]?.kind).toBe('continue-path');
  });

  it('starts the shortest unstarted path and never exceeds the limit', () => {
    const paths = getLearningPaths();
    expect(buildRecommendations({})[0]?.id).toBe(paths[0]?.id);
    expect(buildRecommendations({}).length).toBeLessThanOrEqual(3);
  });
});

afterEach(() => {
  useProgressStore.setState({ lessons: {}, lastOpenedLessonId: null, lastOpenedAt: null });
  useBookmarkStore.setState({ lessons: {} });
  useNoteStore.setState({ lessons: {} });
});

describe('useDashboardData structured curriculum integration', () => {
  it('reports structured progress separately from the classic catalog and resumes a structured lesson', () => {
    const legacyLesson = getLessons()[0];
    if (!legacyLesson) throw new Error('Expected at least one classic catalog lesson');
    const structuredLessonId = 'html.document-structure';

    useProgressStore.setState({
      lessons: {
        [legacyLesson.id]: { status: 'in-progress', startedAt: null, completedAt: null },
        [structuredLessonId]: completed,
      },
      lastOpenedLessonId: structuredLessonId,
      lastOpenedAt: '2026-10-28T00:00:00.000Z',
    });

    const { result } = renderHook(() => useDashboardData('ru'));

    expect(result.current.total).toBe(getLessons().length);
    expect(result.current.completed).toBe(0);
    expect(result.current.inProgress).toBe(1);
    expect(result.current.structuredProgress.total).toBe(getStructuredLessonIds().length);
    expect(result.current.structuredProgress.completed).toBe(1);
    expect(result.current.structuredProgress.inProgress).toBe(0);
    expect(result.current.continueLearning).toMatchObject({
      kind: 'structured',
      href: '/ru/structured-lessons/html.document-structure',
      lessonId: structuredLessonId,
      lessonTitle: 'Структура HTML-документа и семантические области страницы',
      status: 'completed',
    });
  });

  it('keeps the classic lesson route for classic catalog progress', () => {
    const legacyLesson = getLessons()[0];
    if (!legacyLesson) throw new Error('Expected at least one classic catalog lesson');
    useProgressStore.setState({
      lessons: { [legacyLesson.id]: completed },
      lastOpenedLessonId: legacyLesson.id,
      lastOpenedAt: '2026-10-28T00:00:00.000Z',
    });

    const { result } = renderHook(() => useDashboardData('en'));
    expect(result.current.continueLearning).toMatchObject({
      kind: 'classic',
      href: `/lessons/${legacyLesson.id}`,
      lessonId: legacyLesson.id,
      status: 'completed',
    });
  });
});
