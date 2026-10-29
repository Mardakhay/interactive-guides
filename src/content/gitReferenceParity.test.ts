import { describe, expect, it } from 'vitest';
import { getStructuredLesson, type SupportedLocale } from './repository';

const locales: readonly SupportedLocale[] = ['en', 'ru'];

async function loadGitFundamentals(locale: SupportedLocale) {
  const lesson = await getStructuredLesson('git.fundamentals', locale);
  if (!lesson) throw new Error(`Missing git.fundamentals lesson for ${locale}`);
  return lesson;
}

describe('Git Reference source-derived content', () => {
  it('keeps the Markdown and GitHub Pages section structure aligned in both locales', async () => {
    const [english, russian] = await Promise.all([
      loadGitFundamentals('en'),
      loadGitFundamentals('ru'),
    ]);
    const expectedBlocks = [
      ['markdown-basics', 'heading'],
      ['markdown-basics-body', 'paragraph'],
      ['markdown-readme-walkthrough', 'codeWalkthrough'],
      ['markdown-check', 'knowledgeCheck'],
      ['github-pages-deployment', 'heading'],
      ['github-pages-deployment-body', 'paragraph'],
      ['github-pages-checklist', 'list'],
      ['github-pages-check', 'knowledgeCheck'],
      ['github-pages-practice', 'codingExercise'],
    ];

    for (const lesson of [english, russian]) {
      const actual = lesson.blocks
        .filter((block) => expectedBlocks.some(([id]) => id === block.id))
        .map((block) => [block.id, block.type]);
      expect(actual).toEqual(expectedBlocks);
    }
    expect(russian.learningOutcomes).toHaveLength(english.learningOutcomes.length);
    expect(russian.version).toBe(english.version);
    expect(russian.updatedAt).toBe(english.updatedAt);
  });

  it('teaches the GitHub Flow pull-request review lifecycle in both locales', async () => {
    for (const locale of locales) {
      const lesson = await loadGitFundamentals(locale);
      const heading = lesson.blocks.find((block) => block.id === 'github-flow-review-heading');
      const body = lesson.blocks.find((block) => block.id === 'github-flow-review-body');
      const walkthrough = lesson.blocks.find((block) => block.id === 'github-flow-review-walkthrough');
      const check = lesson.blocks.find((block) => block.id === 'github-flow-review-check');

      expect(heading?.type).toBe('heading');
      expect(body?.type).toBe('paragraph');
      if (body?.type !== 'paragraph') throw new Error('GitHub Flow review guidance is missing');
      expect(body.text.toLowerCase()).toContain('pull request');
      expect(body.text.toLowerCase()).toMatch(locale === 'en' ? /review|checks|merge/ : /ревью|провер|merge/);

      expect(walkthrough?.type).toBe('codeWalkthrough');
      if (walkthrough?.type !== 'codeWalkthrough') throw new Error('GitHub Flow walkthrough is missing');
      expect(walkthrough.code).toContain('git fetch origin');
      expect(walkthrough.code).toContain('git switch -c feat/my-change');
      expect(walkthrough.code).toContain('git push -u origin HEAD');
      for (const step of walkthrough.steps) {
        expect(step.lineStart).toBeGreaterThan(0);
        expect(step.lineEnd).toBeLessThanOrEqual(walkthrough.code.split('\n').length);
      }

      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type !== 'knowledgeCheck') throw new Error('GitHub Flow review check is missing');
      expect(check.options.filter((option) => option.correct).map((option) => option.id)).toEqual(['update-pr-branch']);
      expect(check.options.every((option) => option.feedback.trim().length > 35)).toBe(true);
      expect(check.explanation.toLowerCase()).toMatch(locale === 'en' ? /required approvals|approvals and checks/ : /одобрени|провер/);

      const references = lesson.blocks.find((block) => block.id === 'references');
      expect(references?.type).toBe('references');
      if (references?.type === 'references') {
        expect(references.items.some((item) => item.url === 'https://docs.github.com/en/get-started/using-github/github-flow')).toBe(true);
      }
    }
  });

  it('teaches Markdown syntax with a line-checked worked example and explanatory feedback', async () => {
    for (const locale of locales) {
      const lesson = await loadGitFundamentals(locale);
      const walkthrough = lesson.blocks.find((block) => block.id === 'markdown-readme-walkthrough');
      const quiz = lesson.blocks.find((block) => block.id === 'markdown-check');

      expect(walkthrough?.type).toBe('codeWalkthrough');
      if (walkthrough?.type !== 'codeWalkthrough') throw new Error('Markdown walkthrough is missing');
      expect(walkthrough.language).toBe('markdown');
      expect(walkthrough.code).toContain('```bash');
      expect(walkthrough.code).toContain('- [');
      const lineCount = walkthrough.code.split('\n').length;
      for (const step of walkthrough.steps) {
        expect(step.lineStart).toBeGreaterThan(0);
        expect(step.lineEnd).toBeLessThanOrEqual(lineCount);
      }

      expect(quiz?.type).toBe('knowledgeCheck');
      if (quiz?.type !== 'knowledgeCheck') throw new Error('Markdown knowledge check is missing');
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
      expect(quiz.explanation.trim().length).toBeGreaterThan(0);
    }
  });

  it('teaches the difference between pushing code and successfully deploying Pages', async () => {
    for (const locale of locales) {
      const lesson = await loadGitFundamentals(locale);
      const body = lesson.blocks.find((block) => block.id === 'github-pages-deployment-body');
      const checklist = lesson.blocks.find((block) => block.id === 'github-pages-checklist');
      const quiz = lesson.blocks.find((block) => block.id === 'github-pages-check');
      const exercise = lesson.blocks.find((block) => block.id === 'github-pages-practice');

      expect(body?.type).toBe('paragraph');
      if (body?.type !== 'paragraph') throw new Error('GitHub Pages explanation is missing');
      expect(body.text.toLowerCase()).toContain('git push');
      expect(body.text.toLowerCase()).toMatch(locale === 'en' ? /deployment|deploy/ : /deployment|публикац/);

      expect(checklist?.type).toBe('list');
      if (checklist?.type !== 'list') throw new Error('GitHub Pages checklist is missing');
      const checklistText = checklist.items.join(' ').toLowerCase();
      expect(checklistText).toMatch(/settings.*pages/);
      expect(checklistText).toContain('base path');
      expect(checklistText).toContain('actions');
      expect(checklistText).toMatch(/deployment|deploy/);

      expect(quiz?.type).toBe('knowledgeCheck');
      if (quiz?.type !== 'knowledgeCheck') throw new Error('GitHub Pages check is missing');
      expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      expect(quiz.options.find((option) => option.correct)?.id).toBe('inspect-deploy');
      expect(quiz.options.every((option) => option.feedback.trim().length > 0)).toBe(true);

      expect(exercise?.type).toBe('codingExercise');
      if (exercise?.type !== 'codingExercise') throw new Error('GitHub Pages practice is missing');
      expect(exercise.requirements.length).toBeGreaterThanOrEqual(4);
      expect(exercise.successCriteria.some((criterion) => /push|deployment|deploy|публикац/i.test(criterion))).toBe(true);
      expect(exercise.hints.length).toBeGreaterThanOrEqual(3);
    }
  });
});
