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

## Non-negotiable migration constraints

- Keep the existing `main` history intact.
- Establish a feature branch before large implementation changes.
- Keep `public/lessons/*.html` as migration input until each lesson is extracted, reviewed, translated, validated and linked to its new structured counterpart.
- Do not delete a source lesson simply because a replacement route exists.
- Add data/content contract tests before bulk content migration.
- No service-role key or secret may be shipped to browser code.
- Do not make cloud accounts mandatory for anonymous/local learning.

## Feature-branch verification — 2026-10-23

The active work is on feat/learning-platform-foundation (PR #1), not main. The four SQL/PostgreSQL and production-hosting JSON files exist on this feature branch, but the current app catalog/legacy HTML loader does not register or render those structured files; they are not learner-accessible lessons yet. The catalog remains 25 IDs mapped to 25 English HTML files, not the expected 26 bilingual structured core lessons.

The source audit reconciles 21 fetched Notion pages and 25 HTML files. Notion connector results were marked unverified. Two HTML pages received a full read in the previous pass, with a targeted additional review of the API lesson; the other HTML pages were structurally inspected, not fully audited. Router v6 usage, form-validation/security wording, and API retry caveats were corrected on the feature branch. Current lint, typecheck, build and test evidence is recorded in the session handoff; these focused fixes do not complete curriculum migration or source parity.


## Embedded lesson migration checkpoint — 2026-10-23

Three catalog lessons now have authored content embedded directly in src/data/lessons.json: re-003 (forms and validation), re-004 (API/request lifecycle), and re-005 (shared state and reducers). The lesson loader now prefers non-empty catalog content and uses the iframe mapping only as a migration fallback. This is a partial migration, not a full course conversion: 22 other lesson bodies are still blank and use standalone HTML, and the app has no locale-aware EN/RU lesson pairing. See FULL_SOURCE_CONTENT_AUDIT.md for exact source evidence and gaps.


## Current feature-branch correction — 2026-10-23

The historical “current state” paragraphs above describe an earlier app snapshot and are superseded for `feat/learning-platform-foundation`. The feature branch now contains a structured, bilingual, Zod-validated content repository and learner-facing React renderer. The curriculum index is `/:locale/structured-lessons`; lesson routes are `/:locale/structured-lessons/:lessonId`. The app registers 26 core lesson IDs in both locales (52 files) and 11 supplementary IDs in both locales (22 files); supplements are displayed separately from the 24-week core. These lessons are embedded content, not separate HTML pages.

The 25 legacy HTML files remain migration sources. The full audit has not yet established paragraph/code/exercise parity for all sources; only two HTML pages received full reads in the focused pass, with one additional API-focused review. The Notion connector returned 21 pages and marked each fetch unverified. See `FULL_SOURCE_CONTENT_AUDIT.md` for explicit scope and limitations. CI run on the current routing/test changes must be checked before recording a pass; do not use earlier SHAs as final evidence.


**Latest local verification (2026-10-23):** exact code SHA `132636c4007141454a903e815d6f0418a3c511b0` in a fresh feature-branch clone passed ESLint, TypeScript, all 92 Vitest tests (19 files), production build and `git diff --check`. Vite warns that the content repository bundle is ~1.4 MB minified. No Actions run was returned for the latest API-created commit, so CI status is unconfirmed rather than green.


**CI update (2026-10-23):** GitHub Actions [run #317](https://github.com/Mardakhay/interactive-guides/actions/runs/39963932841) passed on feature SHA `07bc9acfc89c0138cbd4d214e19215e4dff6f1c6`, including all 92 tests and production build. This supersedes the prior note that latest CI was unconfirmed. Full source parity remains open.


**Latest CI:** feature SHA `b7fdeba6b9096d9f8336cf1071deb9d0f2d1dfc5` passed [Actions run #320](https://github.com/Mardakhay/interactive-guides/actions/runs/39964458056). This is a green build/test state, not a completed source audit.

## Current verified state — 2026-10-23

This section supersedes earlier status paragraphs that describe only the initial legacy-only application or claim the latest Actions status was unknown.

- Feature branch: feat/learning-platform-foundation, exact validated HEAD 9c51012aff7631fc12b1dd5af0b74b7de9b28691.
- main: b13af92576e8a73753a6e3f3d26765d9f9c44397; unchanged by this recovery.
- PR #1: open Draft; GitHub reported mergeable/clean after reconciliation.
- CI: Actions run #39976179595 passed npm ci, ESLint, TypeScript typecheck, Vitest and production build on the exact HEAD. https://github.com/Mardakhay/interactive-guides/actions/runs/39976179595
- Merge recovery: commit d47d96c integrates the four content-only main commits without moving main. The feature SQL content retains the prior main block IDs and adds substantial bilingual coverage. Commit 9c51012 corrected the unsupported info callout tone in both SQL translations.
- Content inventory: 26 core and 11 supplementary lesson IDs across 74 EN/RU JSON files; all 25 legacy HTML sources remain. Structured curriculum routes are integrated into the React app.
- Structured JSON validation sweep: all 74 locale JSON files were checked for unsupported callout tones, missing reference blocks and walkthrough ranges past snippet length. The only detected problem was the SQL info tone in both translations; it is now corrected and exact-head CI passes. This is not editorial approval or source parity.
- PWA reality check: public/manifest.webmanifest and public/sw.js are absent; index.html has no manifest link and src/main.tsx does not register a service worker. Treat PWA as planned work, not an existing feature.
- Runner reality check: the current learning runner uses a disposable Web Worker, a hard timeout and capped output. It is not a production security boundary for hostile code.
- Local verification limitation: a clone attempt failed because the environment could not resolve github.com; current verification claims refer to Actions, not local execution.

Next priority: continue the documented source-to-block audit in small batches while preserving curriculum order and the review editorial status. Then tackle app-wide localization and the missing PWA implementation. See SESSION_HANDOFF.md for the exact branch/merge/CI checkpoint.


## PWA foundation — 2026-10-23

Commit c794088f15fb57ba3c1b8c51032e7e76e11f72bf adds manifest metadata, an SVG app icon, production-only service-worker registration, app-shell precaching, navigation fallback and same-origin GET runtime caching. The worker deliberately skips cross-origin requests, Authorization-bearing requests and /api/ paths. This is not a completed PWA acceptance result: platform installability, PNG icon requirements, offline cache lifecycle, deep-link reload and external font fallback still require real-browser checks. Check exact-head Actions before claiming this commit validated.


## PWA verification update — 2026-10-23

The first service-worker implementation failed lint because browser worker globals were not declared; commit 8d7172bf0faa128aee370afc675c9b5cdd9739ac fixes that. Commit 9e4e08c57725e595c3f279ce6f431fabb2d49281 narrows runtime caching to static asset extensions so arbitrary same-origin learner data is not intercepted. GitHub Actions [run #39977258811](https://github.com/Mardakhay/interactive-guides/actions/runs/39977258811) passed all configured checks on that exact SHA. This is code-level CI evidence only, not real-browser PWA acceptance.


## PWA asset hardening — 2026-10-23

On `feat/learning-platform-foundation`, the manifest now references PNG icons at 192px and 512px; a separate 180px Apple touch icon is linked from the HTML shell. The worker's shell precache contains those icon paths and uses a bumped cache version to force a clean shell cache on update. `public/_redirects` supplies the host's SPA rewrite for online nested-route reloads. A Vitest contract test checks the manifest, PNG dimensions, iOS link, rewrite, and same-origin/private-request caching guards.

This remains a code-level foundation rather than a fully accepted PWA. Browser/device installability, offline deep-link reload, update UX and external-font fallback still require manual checks; the content cache intentionally does not promise every never-visited lesson will be available offline.
