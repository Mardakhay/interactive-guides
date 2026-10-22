# Session Handoff

**Last updated:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Branch observed:** `main` (audit only; no feature branch created in this first documentation pass)

## Project goal

Rebuild the existing Interactive Guides as a cohesive, bilingual (English/Russian), mobile-friendly, PWA-ready learning platform based on:
1. existing Notion HTML/JS learning notes,
2. the supplied six-month/24-week ABB Frontend Bootcamp syllabus,
3. carefully verified external primary documentation,
4. the existing application's usable features and code.

Each lesson should be deep but understandable: teach concepts and mechanisms; show worked examples; include knowledge checks; include coding practice where relevant; explain mistakes; require independent practice before treating a subject as mastered. Scope includes HTML, CSS, browser fundamentals, JavaScript, Git, package managers/build tooling, TypeScript, React, architecture, testing, accessibility, performance, authentication, deployment and optional SQL/Supabase.

## Verified codebase notes

- React 18 + TypeScript + Vite 5 + Tailwind 3.
- React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions CI.
- Current catalog: `src/data/lessons.json`; quiz data: `src/data/quizzes.json`.
- Lesson source map: `src/features/lesson-renderer/lessonLoader.ts`.
- Legacy content: 25 files in `public/lessons/*.html`.
- Progress: `src/features/progress/store.ts` backed by `localStorage`.
- Lesson viewer: `src/app/pages/LessonViewerPage.tsx`.
- Existing pages/features include dashboard, catalog, lessons, learning paths, bookmarks, notes, search and quizzes.

## First deliverable completed

Added the `docs/` planning set:

- `README.md`
- `CURRENT_STATE.md`
- `PRODUCT_REQUIREMENTS.md`
- `ARCHITECTURE.md`
- `CURRICULUM_AND_CONTENT.md`
- `PERSISTENCE_AND_SUPABASE.md`
- `PWA_AND_MOBILE.md`
- `ROADMAP.md`
- `DECISIONS.md`
- `SESSION_HANDOFF.md`

These documents are plans and audit notes, not implementation of the new architecture.

## Known limitations of this checkpoint

- Repository was inspected through GitHub APIs; build, tests and lint have not been executed in a local checkout.
- No Supabase MCP project/schema has been inspected or changed.
- No app code, existing HTML, package metadata or workflow has been altered.
- The Notion pages remain source references to consult per topic during content conversion.
- A complete parity inventory of all 25 HTML documents has not yet been written as machine-validated data.
- Current HTML files are large and should be migrated in content batches, not one unreviewed bulk replacement.

## Exact next steps

1. Create a feature branch from `main` called `feat/learning-platform-foundation` (if it has not already been created).
2. Fetch/check out the new documentation commit and run:
   `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
3. Review and adjust the proposed decisions, especially lesson block format, locale URL strategy, what “mastery” means, sync conflict behavior and initial Supabase auth scope.
4. Add a structured inventory of legacy HTML files and map every existing lesson to the 24-week curriculum or supplementary material.
5. Define content schemas and content-validation tests.
6. Build one representative bilingual lesson pilot and its React renderer before migrating remaining content.

## Commit convention

Use focused messages such as `docs: document platform redesign and migration plan`, `feat(content): add typed bilingual lesson schemas`, `feat(i18n): add English and Russian locale routing`, and `test(content): validate lesson links and translation parity`.
