# Current-State Audit

**Audit date:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Default branch observed:** `main`

This audit is based on the repository root, source directory listings, current package/config files, the lesson catalog, the renderer and progress-store implementation, selected full HTML lesson files, and recent commit history available through GitHub. It is not a local test run; no claim is made that the current build or tests were executed during this remote audit.

## Existing application

The repository is already a React application, not just a set of HTML files:

- React 18, TypeScript, Vite 5, Tailwind CSS 3
- React Router 6
- Zustand for state
- Zod schemas
- Vitest and Testing Library
- ESLint and GitHub Actions CI

Available scripts from `package.json`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run test:watch`

The current CI workflow runs install, lint, typecheck, tests, and build for pushes and pull requests targeting `main`.

## Existing application features visible in source

- Dashboard
- Course catalog and category details
- Lesson viewer with previous/next navigation
- Lesson completion status and auto-advance behavior
- Bookmarks
- Notes
- Quizzes and saved results
- Search
- Learning paths
- Sidebar and mobile navigation
- Lazy-loaded route pages and route error boundaries
- Schema validation for catalog and progress state
- Local persistence through a small `localStorage` helper
- Some unit tests

The catalog presently declares 25 lessons (IDs spanning `sh-001`, `wb-001…004`, `js-001…004`, `re-001…006`, `ui-001…002`, `tl-001…004`, `qa-001…002`, `sec-001`, and `dt-001`). These categories do not fully represent the 24-week bootcamp sequence in order yet.

## Current content model

`src/data/lessons.json` stores metadata such as ID, title, slug, description, category, difficulty, tags, duration, and order. Its `content` values are empty for the listed lessons.

`src/features/lesson-renderer/lessonLoader.ts` contains a manifest mapping lesson IDs to files in `public/lessons/`. The viewer resolves the manifest and displays content using `LessonRenderer`. `src/features/lesson-renderer/components/ExternalHtmlLesson.tsx` is the current implementation to inspect closely during migration.

There are 25 large standalone HTML content files in `public/lessons/`. The selected samples (HTML, CSS, JavaScript, React ecosystem, Git, authentication and deployment) have separate document shells, CSS, typography choices, sidebars/navigation patterns, and visual token sets. That makes them rich source material but not a consistent application-level lesson format. At least some content mixes reference material, deep dives, and guided lessons. The migration should extract and improve their instructional substance, not keep their independent shells as the main user experience.

## Current persistence

The progress store uses `localStorage` and tracks per-lesson status (`not-started`, `in-progress`, `completed`), started/completed timestamps, and the last opened lesson. The generic storage helper catches errors and silently falls back. The current model does not represent section-level reading, individual quiz attempts, coding exercise results, confidence/mastery, spaced repetition, or user-scoped cloud synchronization.

Other features should be inspected before modifying them: bookmarks and notes have their own stores/schema/API modules. Preserve and migrate those records where practical.

## Gaps against the desired product

1. HTML documents are the main content container; there is no single typed, component-rendered lesson schema.
2. Lesson catalog/order is category-oriented rather than a canonical curriculum/program/module/week/lesson hierarchy.
3. Lesson metadata and lesson content are split by a hand-maintained manifest.
4. Current quiz formats need to be audited for explanation quality, coverage, localization and attempt history.
5. English and Russian are not modeled as paired translations at the catalog/content level.
6. Progress is mostly binary per lesson and only local to this browser.
7. There is no documented Supabase authentication/sync design.
8. PWA metadata, install prompt, offline strategy, service-worker cache lifecycle and offline acceptance tests need verification/implementation.
9. Visual styling inside each HTML lesson conflicts with the cohesive application design system.
10. The available course set includes deployment, auth, SQL, and architecture, but should be remapped to the bootcamp syllabus and explicitly mark supplements outside the original bootcamp scope.


## Working-branch update — 2026-10-22

The sections above record the original audit of `main` and remain useful as a baseline. The implementation has since advanced on `feat/learning-platform-foundation`; do not treat the baseline gap list as the current feature list.

### Structured bilingual course

- The canonical JSON curriculum still represents six months and 24 weeks. The repository registers 26 core lesson IDs (52 locale files) plus two supplementary lesson IDs, `network.dns-tcp-tls` and `browser.rendering-pipeline` (four locale files). That is 28 stable IDs / 56 locale files in total; supplementary lessons remain outside core curriculum navigation.
- Week 1 is split into web fundamentals/HTTP and HTML structure; Week 8 is split into async JavaScript/Fetch and Git fundamentals. Every other week currently has one main structured lesson.
- The repository imports and schema-validates all lesson translations. `getStructuredLesson`, `getWeekForLesson`, `getCurriculumWeek`, and `getAdjacentStructuredLessons` expose content and canonical navigation.
- Lessons use stable IDs and typed blocks for prose, lists, callouts, code, code walkthroughs, knowledge checks, coding exercises and references.
- Content covers the entire core sequence from Internet/URL/HTTP/DevTools, HTML/CSS, JS/Git, tooling, TypeScript, React, Router, forms, Context, API/custom Hooks, UI systems, accessibility/performance, testing, CI/workflow and capstone.
- All translations are still `review`, not fully editorial-approved/published. The 25 legacy HTML files remain migration inputs. A first-pass mapping exists, but source-by-source extraction/parity checks against Notion notes and legacy HTML are not complete.

### Application integration

- The app has a separate locale-aware structured lesson route at `/:locale/structured-lessons/:lessonId`; the reader supports EN/RU switching, document `lang`, table of contents, and previous/next lessons in syllabus order.
- Structured lessons are integrated into the bilingual catalog and search flow; tests cover localized routes, localized difficulty labels, and lesson discovery through body content.
- Shared React rendering handles the typed content blocks, option-level knowledge-check feedback, code copy controls, practice instructions/hints, and self-review checklists.
- Completion is a self-attested marker, separate from quiz attempts and practice evidence. A green completion marker is not presented as proof of mastery.

### Practice and progress

- `src/features/structured-lesson/store.ts` persists quiz attempts, code drafts, and checked self-review criteria locally in a dedicated versioned key. `src/lib/storage.ts` now emits a non-data-bearing event when a local persistence write/removal fails, and `StorageWarningBanner` shows a localized warning with a route to data backup.
- Coding exercises save drafts and expose hints/rubrics. The only live preview is HTML in an iframe with scripts disabled. **JavaScript and TypeScript exercises are not executable in the current UI.**
- A bilingual Data Management page and `src/features/data-portability/backup.ts` implement versioned JSON export/import for progress, bookmarks, notes, legacy quiz results, structured quiz attempts, code drafts, practice checklists, last lesson and theme. Import validates before writing, previews a summary, merges instead of clearing, uses per-record conflict rules, and attempts rollback if storage writes fail; `backup.test.ts` covers these cases. Remaining gaps are migration functions for future persisted-schema changes and visible recovery feedback for ordinary autosave/quota failures, since the generic storage helper still catches write errors silently.

### PWA, deployment, account sync

- The repository contains `public/manifest.webmanifest`, SVG icons and `public/sw.js`, plus production registration and install/update/offline UI.
- Cache rules exclude private/auth/API/function/storage/realtime routes. Actual offline and install behavior has not been independently checked on physical mobile devices during this pass.
- Supabase Auth/sync is not set up for a clearly dedicated Interactive Guides project. No schema was changed; project ownership and potential costs must be resolved before adding cloud resources.

### Verification status

- GitHub Actions run [#167](https://github.com/Mardakhay/interactive-guides/actions/runs/39776235742) passed for the exact current code/test HEAD `be9e050fba35082d036367e3e6b7eec47a7636c3`: `npm ci`, lint, TypeScript typecheck, tests and production build all succeeded.
- This run includes the Week 1 web/HTTP lesson, curriculum navigation checks, local-storage failure notification and its tests. Recheck the exact HEAD after subsequent commits.
- This is remote repository/CI evidence; no local `npm ci` or browser/device testing was executed in this environment.

### Next highest-value work

1. Review the source lessons in Notion and `public/lessons`, checking technical accuracy, completeness, outdated claims, source links and EN/RU equivalence.
2. Decide and design a safe, explicitly bounded JavaScript practice runner (including hard timeout semantics); do not equate an iframe timeout with hostile-code isolation.
3. Exercise the new structured-learning v1→v2 migration and Retry save flow in a real browser; add migrations for the other local stores only when their schemas change.
4. Finish localization/visual consistency across the legacy shell, then verify keyboard access, narrow mobile layouts and PWA update/offline behavior.
5. Add Supabase only after a dedicated-project decision and the local data contract have been reviewed.

## Non-negotiable migration constraints

- Keep the existing `main` history intact.
- Establish a feature branch before large implementation changes.
- Keep `public/lessons/*.html` as migration input until each lesson is extracted, reviewed, translated, validated and linked to its new structured counterpart.
- Do not delete a source lesson simply because a replacement route exists.
- Add data/content contract tests before bulk content migration.
- No service-role key or secret may be shipped to browser code.
- Do not make cloud accounts mandatory for anonymous/local learning.


## Working-branch checkpoint update — 2026-10-22

The original audit above describes `main` at the time it was inspected; the feature branch now has a more complete structured-content and persistence foundation.

- The canonical core curriculum has 26 EN/RU structured lesson pairs (52 locale files), with two supplementary EN/RU pairs registered separately (56 locale files in the repository overall). A static audit found no structural issues with ordered block parity, duplicate IDs, walkthrough ranges, quiz answer shape, or practice scaffolding; see `docs/CONTENT_AUDIT.md`.
- Structured content remains in editorial `review` status. Legacy HTML source reconciliation and source-link verification are still pending.
- Section-level lesson progress, local quiz/draft/checklist state, validated backup export/import with merge rules, and localized storage-failure warnings are implemented.
- HTML preview runs with scripts disabled. Ordinary JavaScript snippets can run in a disposable Worker with a 1.5-second timeout; DOM-dependent exercises, TS/TSX, shell commands and live network calls still require the learner's local project. The Worker is a learning aid, not a hardened hostile-code service.
- GitHub Actions run [#200](https://github.com/Mardakhay/interactive-guides/actions/runs/39782773247) passed the exact code checkpoint SHA `611f75c91634d74d06feb74a06bfcf5c9470830a`: install, lint, typecheck, tests and production build succeeded. Recheck the new docs commit before saying its CI is green.
- Remaining highest-value work: verify the Worker runner on the deployed hosting/CSP setup, localize/consolidate the full app shell, review content against Notion and legacy sources, test storage retry/migration under browser quota/security errors, and run real-device PWA tests.


## Working-branch checkpoint update — 2026-10-23

This is the newest checkpoint and supersedes earlier working-branch verification snapshots above.

- The last verified implementation/content commit before this documentation update is [`495467a`](https://github.com/Mardakhay/interactive-guides/commit/495467a470828ffad5f689f2c4b2015771be18a5). The branch remains `feat/learning-platform-foundation`; PR [#1](https://github.com/Mardakhay/interactive-guides/pull/1) remains open as a draft.
- Fixed the malformed trailing duplicate block in `src/content/repository.ts`; the existing locale-aware curriculum lookup and adjacent-lesson functions remain intact.
- Repository tests derive expected lesson registration and week navigation from the canonical curricula, and the supplementary duplicate test now verifies a real duplicate lesson assignment.
- GitHub Actions [run #212](https://github.com/Mardakhay/interactive-guides/actions/runs/39909489666) passed for SHA `495467a470828ffad5f689f2c4b2015771be18a5`: install, ESLint, typecheck, Vitest tests and production build all succeeded.
- The repository has 26 core lesson IDs (52 EN/RU files) plus two supplementary lesson IDs (four EN/RU files), so 28 IDs / 56 locale files are registered overall. The static audit in `docs/CONTENT_AUDIT.md` covers the 26 core pairs; supplementary lessons are tracked separately.
- Week 15 now includes a bilingual typed `useReducer` + Context walkthrough and provider-scope/context-splitting guidance. Russian quiz prompts in Week 14 and Week 15 received localization fixes. Both lesson pairs remain in editorial `review` status.
- No local commands, physical-device tests, or full human editorial review were run in this session.

### Remaining high-priority work

1. Review Week 14 and Week 15 against the Notion source and the editorial checklist; continue semantic/source parity review for every core and supplementary lesson pair.
2. Reconcile each legacy HTML lesson line-by-line with its replacement and retain the source files until migration is reviewed in both locales.
3. Finish end-to-end app localization, visual consistency, responsive/accessibility QA, Worker-hosting/CSP tests, storage-failure testing and real-device PWA acceptance.
4. Keep cloud sync blocked on a dedicated Supabase ownership/cost decision and explicit approval.


## Source-parity checkpoint — 2026-10-23

- A focused review compared Week 14 with Notion Part 4 §§ 4.5–4.7 and `react-forms-tutorial.html`, and Week 15 with Notion §§ 4.8–4.14 and the state-management sections of `react-ecosystem-course.html`.
- Prior block/schema parity checks did not prove that all source teaching steps and activities had been migrated. Week 14 has now gained the multi-field state pattern, native validation constraints, validation timing, a complete RHF example, common mistakes, ten checks and five practice tasks. Week 15 now has a custom-Hook ownership example, BookClub reducer walkthrough/project, and more explicit state-tool choice guidance.
- The source map was corrected: `react-ecosystem-course.html` spans routing, forms, Context, reducer and BookClub topics; it is not only a Week 13 router source. See `docs/CONTENT_PARITY_REVIEW_WEEK14-15.md`.
- Both pairs remain in editorial `review`. The authoring UI does not compile TSX; no runtime execution of these new TSX examples occurred in this pass. The original HTML sources have not been deleted.


## Supplementary content and source audit update — 2026-10-23

- The structured curriculum now keeps the 26 core IDs / 52 EN/RU files separate from 11 supplementary IDs / 22 files; total registered content is 37 stable IDs / 74 locale files. The core 24-week order is unchanged.
- Supplementary topics added during this pass: JS runtime/memory, JS prototypes/object model, frontend architecture boundaries, authentication/authorization, production deployment/hosting, SQL/PostgreSQL, Sass/SCSS, Bootstrap/MUI, and advanced package-manager workflows. All are bilingual, Zod-validated and registered in the repository/curriculum.
- Week 14–15 remain the only completed focused comparison against the specific Notion Part 4 sections and the two related interactive HTML tutorials. A structural scan was completed for all 25 HTML sources; it does not establish paragraph-level or interactive-behavior parity. See `docs/SOURCE_PARITY_AUDIT.md`.
- GitHub Actions run #279 passed all checks on commit `59000b4c15d34403378d4d3c862a3b59983b3d99`. Lesson content remains in editorial `review`; no claim is made about real-device PWA verification or execution of TSX snippets in a real host app.
