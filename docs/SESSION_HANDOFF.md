# Session Handoff

**Last updated:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch created:** `feat/learning-platform-foundation`

## Project goal

Rebuild the existing Interactive Guides as a cohesive bilingual (English/Russian), mobile-friendly, PWA-ready learning platform based on:
1. the user's Notion learning notes and lesson-writing/learning-progress approach,
2. the supplied six-month / 24-week ABB Frontend Bootcamp syllabus,
3. carefully verified current primary documentation for web/platform topics,
4. the existing application's useful features and code.

Lessons should be deep but understandable: teach concepts and mechanisms, show worked examples, include knowledge checks and relevant coding practice, explain mistakes, and require independent practice before treating a subject as mastered. Scope includes HTML, CSS, browser fundamentals, JavaScript, Git, package managers/build tooling, TypeScript, React, architecture, testing, accessibility, performance, authentication, deployment and supplementary SQL/Supabase.

## Verified repository facts from remote GitHub inspection

- React 18 + TypeScript + Vite 5 + Tailwind 3.
- React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions CI.
- Catalog: `src/data/lessons.json`; quiz data: `src/data/quizzes.json`.
- HTML mapping: `src/features/lesson-renderer/lessonLoader.ts`.
- Legacy content: 25 files in `public/lessons/*.html`.
- Progress store: `src/features/progress/store.ts`, backed by `localStorage`.
- Lesson viewer: `src/app/pages/LessonViewerPage.tsx`.
- Existing features include dashboard, catalog, lessons, learning paths, bookmarks, notes, search and quizzes.
- Supabase is not listed in the current `package.json` inspected in this session.
- Current CI checks lint, typecheck, tests and production build on pushes/PRs targeting `main`.

## Documentation created on main

1. `docs/README.md`
2. `docs/CURRENT_STATE.md`
3. `docs/PRODUCT_REQUIREMENTS.md`
4. `docs/ARCHITECTURE.md`
5. `docs/CURRICULUM_AND_CONTENT.md`
6. `docs/PERSISTENCE_AND_SUPABASE.md`
7. `docs/PWA_AND_MOBILE.md`
8. `docs/ROADMAP.md`
9. `docs/DECISIONS.md`
10. `docs/SESSION_HANDOFF.md`
11. `docs/LEGACY_CONTENT_INVENTORY.md`

The documentation is an audit/plan, not the completed redesign. The inventory gives a first-pass topic mapping from names and sampled content; it is not a full content review of every HTML file.

## What has and has not changed

- Added documentation files with focused commits directly on `main`.
- Created `feat/learning-platform-foundation` from `main` for implementation work.
- No app source, HTML lesson, package manifest, CI workflow, database or Supabase project has been modified.
- Build, tests and lint were not run in a local checkout during this remote GitHub audit.
- No cloud credentials, database secrets or service-role keys were read or added.

## Exact next steps

1. Ensure branch `feat/learning-platform-foundation` includes the current documentation commits (it was created after the first docs were added; if it is behind `main`, update it with a fast-forward/merge rather than rewriting history).
2. Check out the branch in a local environment and run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`; record baseline results and existing issues.
3. Audit all current lesson files in full and reconcile the inventory with exact headings, code snippets, exercises, solution toggles and sources.
4. Design the stable lesson/curriculum/block schemas and validation tests before large-scale content conversion.
5. Implement one pilot lesson in English and Russian with the new React content renderer.
6. Only after the content contract works, migrate lessons in syllabus order; preserve existing local progress/notes/bookmarks via migrations.
7. Add Supabase sync after local repository contracts are stable, then PWA behavior, deployment workflows and end-to-end coverage.

## Commit convention

Use focused Conventional Commit-style messages such as:
- `docs: document platform redesign and migration plan`
- `feat(content): add typed bilingual lesson schemas`
- `feat(i18n): add English and Russian locale routing`
- `test(content): validate lesson links and translation parity`

Do not mark planned features as implemented. After each phase, update this file with exact changes, validation evidence, unresolved questions and the next action.
