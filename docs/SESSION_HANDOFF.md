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

## Handoff update — 2026-10-23

### Current branch and verification
- Feature branch: `feat/learning-platform-foundation`.
- Latest verified feature HEAD at handoff: `e2684ed0d4eba181f7305738f9aa87e412823424`.
- PR #1 remains an open draft targeting `main`.
- GitHub Actions run [#39922070075](https://github.com/Mardakhay/interactive-guides/actions/runs/39922070075) passed on `e2684ed0d4eba181f7305738f9aa87e412823424`: lint, typecheck, tests and build succeeded.
- `main` currently points to `b13af92576e8a73753a6e3f3d26765d9f9c44397`. Do not rewrite or force-push it as part of this work.

### GitHub Contents API incident
- Four lesson-file commits were accidentally created against the default branch because the Contents API calls omitted `branch`: `485b04221d005452c17eb6aff04fc52d82c9b082`, `2e2e2914dc32eb150fdc23681b9d959bce4d82e3`, `f447147eda20ca415cde647dabb816296456f04d`, and `b13af92576e8a73753a6e3f3d26765d9f9c44397`. This moved `main` to the last SHA. The current PR diff includes all four lesson files, and they are retained on the feature branch.
- Going forward, make grouped changes by creating blobs/tree/commit and then update only `feat/learning-platform-foundation` with `expected_sha`; verify branch HEAD, PR head and workflow runs after each change. Do not use create_file/update_file without an explicit branch.

### Supplementary source-derived lessons present
- JavaScript runtime/memory and object prototypes.
- Frontend authentication/security.
- Deployment/hosting in EN and RU.
- SQL/PostgreSQL in EN and RU.
- Sass/SCSS, Bootstrap/MUI comparison, frontend architecture boundaries, and advanced package workflows.
- The curriculum/repository links these supplements in the bilingual content catalog. These lessons remain `review`, not `published`.

### Audit completeness — not yet finished
- Week 14/15 Notion + legacy HTML targeted comparison is documented in `docs/CONTENT_PARITY_REVIEW_WEEK14-15.md`.
- The wider set of HTML sources has a mapping, but not every file has a verified section-by-section parity audit. In particular, network/hosting details, advanced JS internals, auth-security edge cases, database/RLS topics, and specific library-version steps require itemized source review against the actual HTML and current primary documentation.
- Do not call an HTML source migrated until its headings, explanations, code samples, diagrams, exercises, answer/reveal controls, links, and key claims have been mapped to the structured destination and the EN/RU teaching coverage has been reviewed.
- Next: continue exact source-section inventory, add a source-to-block mapping report, close or explicitly defer each uncovered concept, then run CI on the resulting feature HEAD.

## Handoff — 2026-10-23

- Work is on feat/learning-platform-foundation; latest content commit is 6579f9926c57317947de2f90ddfeb66a0974b61a (content(api): clarify retry limits and safety). Do not use GitHub Contents writes without branch=feat/learning-platform-foundation and an exact current content SHA.
- Four supplementary JSON files for SQL/PostgreSQL and production hosting exist on feature, but are not wired into the app. The app still exposes 25 English legacy HTML lessons.
- Source scope: 21 Notion pages fetched (connector marks them unverified); 25 HTML files inventoried/structurally inspected. Two HTML pages were fully read in the previous pass; the API lesson received a targeted review. The other 22 HTML files still require full text/code/exercise/answer review. This is not a complete source audit or parity completion.
- Focused corrections: React Router uses installed react-router-dom 6.26.2 API; form-validation guidance separates UX from security and treats timing as contextual; API lesson clarifies retry counts/backoff safety, optional Axios, PATCH partial updates, and non-persistent demo writes.
- Before documentation-only updates, lint, typecheck, tests and production build passed; tests reported 7 files / 11 tests. Rerun on exact final HEAD. Node 25 needed an in-memory Storage test stub. npm audit reported 17 dependency vulnerabilities; review separately.
- CONTENT_AUDIT.md and CONTENT_PARITY_REVIEW_WEEK14-15.md were absent in the checkout. The source matrix lives in FULL_SOURCE_CONTENT_AUDIT.md and is the current audit record.
- Next: finish full text/code review of remaining HTML and relevant Notion pages; implement and register complete bilingual curriculum/structured lesson reader; add parity/content invariants; rerun CI on exact feature SHA. PR #1 is open/draft; verify current head and CI after documentation commits.


## Embedded lesson integration — 2026-10-23

The active feature now embeds lesson bodies for re-003, re-004, and re-005 in src/data/lessons.json. The loader uses those bodies before consulting the legacy iframe manifest; blank lessons continue to use the old HTML source during migration. The three embedded lessons cover forms/validation, API lifecycle/error handling, and React state ownership/Context/reducers with examples and practice criteria. This is a real in-app migration checkpoint, but not full completion: the remaining catalog entries are still blank/external and Russian locale content is not supported by the current app model. Full local verification (8 files / 16 tests, lint, typecheck, production build, and browser smoke tests for re-003/re-004/re-005) passed on code SHA 667c57a27bf1c64fadaa0ec9a8e6294a9128ccf7; the following commit only updates this handoff.
