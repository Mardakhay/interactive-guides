# Session Handoff

**Last updated:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Draft PR:** [#1 — structured bilingual lesson foundation](https://github.com/Mardakhay/interactive-guides/pull/1)

## Project goal

Rebuild Interactive Guides as a cohesive bilingual (English/Russian), mobile-friendly, PWA-ready learning platform based on the user's Notion learning notes, the supplied six-month / 24-week ABB Frontend Bootcamp syllabus, verified primary documentation, and useful existing code.

Lessons must be deep but understandable: explain concepts and mechanisms, show worked examples, include knowledge checks and relevant coding practice, explain mistakes, and do not claim mastery just because content was opened. Scope includes HTML, CSS, browser fundamentals, JavaScript, Git, Node/npm/build/package tooling, TypeScript, React, architecture, testing, accessibility, performance, authentication, deployment and supplementary SQL/Supabase.

## Existing app and migration strategy

- React 18 + TypeScript + Vite 5 + Tailwind 3.
- React Router, Zustand, Zod, Vitest/Testing Library and GitHub Actions CI.
- Existing features include dashboard, course catalog, legacy lesson reader, learning paths, bookmarks, notes, search, quizzes and coarse local progress.
- Legacy source input: 25 standalone HTML documents in `public/lessons/*.html`.
- Keep legacy source content until each replacement has been reviewed in both locales; the structured reader coexists with the old reader during migration.

## Structured content architecture

- `src/content/schemas/lessonContent.ts`: typed Zod lesson blocks and translation metadata; validates knowledge-check answer keys, unique block IDs and code-walkthrough line boundaries.
- `src/content/schemas/curriculum.ts`: validates the 6-month / 24-week order and unique identifiers.
- `src/content/curriculum/bootcamp-core.en.json` and `bootcamp-core.ru.json`: canonical core syllabus, with supplementary topics explicitly separated.
- `src/content/repository.ts`: validates content and returns lessons, curriculum order and available previous/next lessons.
- `src/features/structured-lesson/StructuredLessonRenderer.tsx`: shared React renderer for text, lists, callouts, code, walkthroughs, knowledge checks, coding exercises and references.
- `src/app/pages/StructuredLessonPage.tsx`: locale-aware structured reader at `/:locale/structured-lessons/:lessonId`.

## Current structured lessons

All entries below have English and Russian JSON, stable block IDs/types and editorial status `review`; they are not yet fully editorial-approved or published.

| Week | Lesson ID | Scope |
|---|---|---|
| 1 | `html.document-structure` | HTML shell, metadata, semantics, walkthrough and About Me page practice |
| 2 | `html.forms-accessibility` | Form semantics, labels, native validation, fieldset/legend, accessible errors and registration form practice |
| 3 | `css.fundamentals` | Stylesheet placement, selectors, cascade/specificity, box model and display |
| 4 | `css.flexbox-grid-responsive` | Flexbox axes, Grid tracks, responsive layouts and mobile-first media queries |
| 5 | `js.basics-types-control-flow` | let/const, primitive types, operators/coercion, branches and loops |
| 6 | `js.functions-arrays-objects` | Function forms, callbacks, array methods, objects, destructuring and shallow spread |
| 7 | `js.dom-events` | DOM tree/selectors, safe manipulation, events, forms, delegation and to-do app architecture |
| 8 | `js.async-fetch` | Promise states, then/catch/finally, async/await, fetch, HTTP errors and UI request states |
| 8 | `git.fundamentals` | Working tree, staging, commits, remotes, push, .gitignore and publish workflow |

Every lesson includes metadata, outcomes, detailed explanations, worked examples, knowledge checks, relevant independent practice, hints/success criteria, and primary-reference links. Content depth and translation quality still need editorial review against Notion and the legacy HTML sources.

## Learner state and practice runner

- Lesson reader has language switching, dynamic `document.lang`, table of contents, curriculum context and previous/next links ordered by the syllabus.
- Completion is a self-attested marker, explicitly distinct from quiz results and code mastery.
- `src/features/structured-lesson/store.ts` keeps quiz attempts, drafts and practice self-review checklist state separate from the legacy progress status.
- HTML preview is an iframe with scripts disabled.
- `src/features/structured-lesson/JavaScriptPlayground.tsx` has been added as a learning runner in a sandboxed iframe without `allow-same-origin`; the frame CSP blocks outbound network requests. It captures console output/errors, limits source length/output, replaces the iframe on timeout, stores local drafts, and is intended to support async snippets.
- **Important limitation:** browser iframe sandboxing plus a timeout is not a production-grade hostile-code execution isolation boundary; CPU/memory isolation cannot be guaranteed. Keep the visible warning, do not run secrets in the sandbox, and do not claim it safely handles arbitrary malicious code. The current runner deliberately blocks network access, so Fetch exercises are code-writing/reasoning tasks rather than live network-run tasks.
- Confirm the latest CI for runner integration before relying on it.

## PWA foundation

- Manifest, SVG icons, service worker, production registration, offline status banner and install/update UI exist.
- Shell/assets/public legacy lessons have cache strategies; API/auth/functions/storage/realtime paths are excluded from service-worker caching.
- Real device installability/offline behavior has not been tested on Android/iOS in this session.

## Supabase

The connected account has projects named `kaelig` and `Mardakhay's Project`; neither is clearly an Interactive Guides project. No schema was modified. Do not repurpose a project or create a potentially billable project without cost/intent confirmation. Never expose service-role keys in browser code. Continue local-first data contracts before remote sync.

## Latest CI check

Current branch-head CI was last queried at `667b81e3fc52d3ccf7a5408c88f9c56d3cd8ed20`: run #59 is `completed` / `failure` ([open run](https://github.com/Mardakhay/interactive-guides/actions/runs/39758607304)). Verify this after the documentation commit as GitHub starts a new workflow.

The GitHub Actions workflow runs `npm ci`, ESLint, TypeScript typecheck, tests and production build. Check the exact current branch head after every substantial change; an earlier successful run does not validate later commits.

## Documentation

See `docs/README.md`. Key living docs include `CURRENT_STATE.md`, `ARCHITECTURE.md`, `CURRICULUM_AND_CONTENT.md`, `PERSISTENCE_AND_SUPABASE.md`, `PWA_AND_MOBILE.md`, `ROADMAP.md`, `DECISIONS.md`, and this handoff.

## Next actions

1. Verify GitHub Actions for the exact latest branch head and fix failures before further implementation.
2. Review the JavaScript runner's tests and UI integration; retain its explicit non-production-grade security warning.
3. Continue into Week 9 — Node.js, npm/package managers, Vite, ESLint and Prettier — without skipping the rest of the syllabus.
4. Fully review the Notion and legacy HTML sources for lessons already migrated; the current lessons are content pilots, not finished editorial deliverables.
5. Localize the whole existing app shell, consolidate styling, and verify mobile accessibility.
6. Add versioned local-storage migrations plus export/import before cloud sync.
7. Validate PWA install/offline behavior on real supported devices.
8. Add Supabase only after local contracts stabilize and dedicated project/cost intent is agreed.
9. Keep PR #1 in draft until editorial review, tests and scope are sufficient.

## Commit conventions

Use focused messages such as `content(javascript): add bilingual async JavaScript and Fetch lesson`, `content(git): add bilingual Git fundamentals lesson`, `feat(playground): ...`, `test(content): ...`, and `docs: ...`.
