# Session Handoff

**Last updated:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Draft PR:** [#1 — structured bilingual lesson foundation](https://github.com/Mardakhay/interactive-guides/pull/1)

## Project goal

Rebuild Interactive Guides as a cohesive bilingual (English/Russian), mobile-first, PWA-ready learning platform based on the user's Notion learning notes, the supplied six-month/24-week ABB Frontend Bootcamp syllabus, carefully verified primary documentation, and existing useful code.

Lessons must be deep but understandable: explain concepts and mechanisms, show worked examples, include knowledge checks and relevant coding practice, explain errors, and avoid claiming mastery just because content was opened. Scope includes HTML, CSS, browser fundamentals, JavaScript, Git, Node/npm/build tooling, TypeScript, React, architecture, tests, accessibility, performance, authentication, deployment and supplementary SQL/Supabase.

## Verified current application

- React 18 + TypeScript + Vite 5 + Tailwind 3.
- React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions CI.
- Current catalog: `src/data/lessons.json`; existing quizzes: `src/data/quizzes.json`.
- Legacy content map: `src/features/lesson-renderer/lessonLoader.ts`.
- Source lessons: 25 full HTML files in `public/lessons/*.html`.
- Existing progress store: `src/features/progress/store.ts`, backed by localStorage.
- Current reader: `src/app/pages/LessonViewerPage.tsx`.
- Existing features include dashboard, catalog, lessons, learning paths, bookmarks, notes, search, quiz UI and local progress.
- The content model is currently category-first and not yet the full canonical 24-week route.
- Existing lessons are rich inputs for migration, but each currently contains its own shell, CSS and navigation.

## Implementation completed on the working branch

### Content foundation
- Added `src/content/schemas/lessonContent.ts`: Zod schema for typed content blocks, translation metadata, block ID uniqueness, quiz answer invariants and reference requirements.
- Added `src/content/schemas/curriculum.ts`: schema validating a six-month / 24-week curriculum and continuous week ordering.
- Added `src/content/curriculum/bootcamp-core.en.json` and `bootcamp-core.ru.json`: paired curricula preserving stable month/week IDs and separating six supplementary tracks from the original 24-week syllabus.
- Added `src/content/lessons/html-document-structure/en.json` and `ru.json`: the first structured, equivalent bilingual pilot with theory, code walkthroughs, knowledge checks, an independent coding task, self-review criteria and MDN/WHATWG source links.
- Added `src/content/repository.ts` and `src/content/index.ts`: validated accessors for content, curriculum and locale metadata.

### UI slice
- Added `src/features/structured-lesson/StructuredLessonRenderer.tsx`: reusable React renderers for headings, paragraphs, lists, callouts, code, walkthroughs, knowledge checks, practice editors and reference links.
- Coding exercises have an isolated HTML preview iframe with scripts disabled.
- Added `src/app/pages/StructuredLessonPage.tsx` and route `/:locale/structured-lessons/:lessonId`.
- Added English and Russian links to the pilot from the existing dashboard.
- Pilot routes:
  - `/en/structured-lessons/html.document-structure`
  - `/ru/structured-lessons/html.document-structure`

### Tests and validation
- Added schema, curriculum ordering/locale parity, repository and lesson renderer tests.
- GitHub Actions run #22 passed for commit `083f8e69d03bc2a4f563b64ce58563d8c37cdd34`: install, lint, TypeScript typecheck, tests and production build.
- An earlier test run failed because a test queried a single copy-code button while multiple code blocks correctly rendered multiple buttons; the test was fixed, and run #22 passed.
- Lesson status remains `review`; it is a pilot, not yet labelled published/mastered.

## Supabase discovery

The connected Supabase account currently shows projects named `kaelig` and `Mardakhay's Project`. Their public schemas were inspected read-only; neither is named for Interactive Guides. No database schema was changed, no credentials were copied into the repository, and no new project was created. Do not repurpose or modify an existing project without explicitly confirming its intended ownership. Creating a project can introduce cost, so first quote cost and obtain approval if a separate project is needed.

## Documentation available in `docs/`

- `README.md`
- `CURRENT_STATE.md`
- `PRODUCT_REQUIREMENTS.md`
- `ARCHITECTURE.md`
- `CURRICULUM_AND_CONTENT.md`
- `LEGACY_CONTENT_INVENTORY.md`
- `PERSISTENCE_AND_SUPABASE.md`
- `PWA_AND_MOBILE.md`
- `ROADMAP.md`
- `DECISIONS.md`
- `SESSION_HANDOFF.md`

These documents describe the plan and current checkpoint; they do not imply that future PWA, sync or bulk migration features are already implemented.

## Outstanding work, in priority order

1. Continue local-first progress: record quiz attempts and coding drafts safely, distinguish read completion from practice evidence, and add migration/export behavior without resetting current local data.
2. Improve the structured reader and content UX: keyboard/ARIA review, exercise preview tests, responsive check on real viewports, and a consistent design system.
3. Expand curriculum mapping from the initial pilot to exact lesson IDs and migration status for every existing HTML file.
4. Migrate source lessons into structured React blocks in syllabus order, making both translations pedagogically equivalent and reviewing claims against current primary sources.
5. Add PWA manifest/icons/service worker with explicit update/cache policy and verify offline/deep-link behavior on real devices.
6. Implement Supabase only after local data contracts are stable: Auth, user-scoped progress/notes/bookmarks, SQL migrations, RLS, conflict policy, account export/delete and cross-user tests.
7. Add deployment/deep-link support and end-to-end regression coverage.

## Important constraints

- Keep all legacy HTML until a structured equivalent is validated in both locales.
- Never expose service-role or secret API keys in browser code.
- Keep local learning available without an account.
- Do not run arbitrary learner code in the application origin; use a sandboxed preview or isolated execution environment.
- Use focused Conventional Commit-style messages.
- Do not merge PR #1 until its scope and checks are reviewed.
