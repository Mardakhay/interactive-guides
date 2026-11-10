import { afterEach, describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { getLearningPathLessonIds, getLearningPaths } from '@/features/learning-paths';
import { buildRecommendations, useDashboardData } from './useDashboardData';
import { getStructuredLessonIds } from '@/content/repository';
import { useProgressStore } from '@/features/progress';
import { useBookmarkStore } from '@/features/bookmarks';
import { useNoteStore } from '@/features/notes';

const completed = { status: 'completed' as const, startedAt: null, completedAt: null };

describe('buildRecommendations', () => {
  it('prioritizes an in-progress text-only path over an unstarted path', () => {
    const [firstPath] = getLearningPaths();
    if (!firstPath) throw new Error('Expected text-only learning paths');
    const [firstLesson] = getLearningPathLessonIds(firstPath.id);
    if (!firstLesson) throw new Error('Expected path lessons');
    expect(buildRecommendations({ [firstLesson]: completed })[0]?.kind).toBe('continue-path');
  });

  it('recommends only available text-only paths', () => {
    const paths = getLearningPaths();
    expect(paths.length).toBeGreaterThan(0);
    expect(buildRecommendations({}).length).toBeLessThanOrEqual(3);
    expect(buildRecommendations({}).every((item) => paths.some((path) => path.id === item.id))).toBe(true);
  });
});

afterEach(() => {
  useProgressStore.setState({ lessons: {}, lastOpenedLessonId: null, lastOpenedAt: null });
  useBookmarkStore.setState({ lessons: {} });
  useNoteStore.setState({ lessons: {} });
});

describe('useDashboardData text-only curriculum integration', () => {
  it('counts structured lessons only and resumes the last structured lesson', () => {
    const structuredLessonId = 'html.document-structure';
    useProgressStore.setState({
      lessons: {
        'wb-001': { status: 'in-progress', startedAt: null, completedAt: null },
        [structuredLessonId]: completed,
      },
      lastOpenedLessonId: structuredLessonId,
      lastOpenedAt: '2026-10-28T00:00:00.000Z',
    });

    const { result } = renderHook(() => useDashboardData('ru'));
    expect(result.current.total).toBe(getStructuredLessonIds().length);
    expect(result.current.completed).toBe(1);
    expect(result.current.inProgress).toBe(0);
    expect(result.current.structuredProgress.total).toBe(getStructuredLessonIds().length);
    expect(result.current.continueLearning).toMatchObject({
      kind: 'structured',
      href: '/ru/structured-lessons/html.document-structure',
      lessonId: structuredLessonId,
      lessonTitle: 'Структура HTML-документа и семантические области страницы',
      status: 'completed',
    });
  });

  it('does not resume a retired standalone HTML lesson', () => {
    useProgressStore.setState({
      lessons: { 'wb-001': completed },
      lastOpenedLessonId: 'wb-001',
      lastOpenedAt: '2026-10-28T00:00:00.000Z',
    });

    const { result } = renderHook(() => useDashboardData('en'));
    expect(result.current.continueLearning).toBeNull();
  });

  it('includes structured lesson bookmarks and notes in recent activity with locale-correct links', () => {
    useBookmarkStore.setState({
      lessons: { 'html.document-structure': { createdAt: '2026-10-28T10:00:00.000Z' } },
    });
    useNoteStore.setState({
      lessons: {
        'html.document-structure': {
          content: 'Review semantic regions',
          updatedAt: '2026-10-28T11:00:00.000Z',
        },
        'wb-001': { content: 'Old HTML note', updatedAt: '2026-10-28T12:00:00.000Z' },
      },
    });

    const { result } = renderHook(() => useDashboardData('ru'));
    expect(result.current.recentActivity).toHaveLength(2);
    expect(result.current.recentActivity).toEqual(expect.arrayContaining([
      expect.objectContaining({
        kind: 'bookmark',
        lessonId: 'html.document-structure',
        lessonTitle: 'Структура HTML-документа и семантические области страницы',
        href: '/ru/structured-lessons/html.document-structure',
        categoryId: 'structured-curriculum',
      }),
      expect.objectContaining({
        kind: 'note',
        lessonId: 'html.document-structure',
        href: '/ru/structured-lessons/html.document-structure',
        notePreview: 'Review semantic regions',
      }),
    ]));
  });
});
