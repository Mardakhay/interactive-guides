# Current-State Audit

**Audit date:** 2026-10-23  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Default branch observed:** `main`

This audit is based on the repository root, source directory listings, current package/config files, the lesson catalog, the renderer and progress-store implementation, selected full HTML lesson files, and recent commit history available through GitHub. It is not a local test run; no claim is made that the current build or tests were executed during this remote audit.

## Authoritative implementation snapshot — 2026-10-23

- **Latest validated application/content snapshot:** `64dea28924aed5701452ae60b121cb57fc747598` (subsequent branch commits in this continuation are documentation-only).
- **Validation:** GitHub Actions [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passed `npm ci`, ESLint, TypeScript typecheck, all 102 tests across 22 test files, and production build on this exact SHA.
- **Branch safety:** PR [#1](https://github.com/Mardakhay/interactive-guides/pull/1) remains open and Draft. `main` remains at `b13af92576e8a73753a6e3f3d26765d9f9c44397`; this implementation work targets `feat/learning-platform-foundation`.
- **Structured curriculum:** 26 core and 11 supplementary lesson IDs are registered in English and Russian (74 JSON files). The React reader and curriculum routes are integrated. All 25 legacy HTML files remain as source material; registration/schema validation does not mean source parity or editorial review is complete.
- **Recent source-focused content work:** `css.fundamentals` is version 3 (53 blocks, 110 minutes, 5 knowledge checks, 5 walkthroughs, 3 coding exercises per locale); `git.fundamentals` is version 3 (38 blocks, 95 minutes per locale); `git.workflow-ci` is version 3 (37 blocks, 110 minutes per locale). EN/RU structures are checked in CI, while all three remain in editorial review and their legacy interaction parity is incomplete.
- **UI localization:** English/Russian preference and route-aware locale support are implemented. Localization covers the shared shell, dashboard, catalog/category views, learning paths, bookmarks, notes, lesson metadata/navigation, quiz controls, search and common feedback states. This is broad partial coverage—not a guarantee that every string, source lesson body, edge state or legacy HTML page has been translated.
- **PWA:** manifest, PNG icons, Netlify-compatible SPA fallback, scoped asset caching and a learner-approved service-worker update flow are implemented. Real-browser/device install/offline/update acceptance is still outstanding.
- **Persistence/cloud:** progress, notes, bookmarks and quiz results remain primarily local-first. A reviewed migration/export-import flow is not complete. Supabase auth/sync is not implemented or listed as a package dependency.
- **Release warnings:** the latest `npm ci` reported 13 dependency audit findings (8 moderate, 3 high, 2 critical). The CI build also emits the existing large-chunk warning, and React Router prints v7 future-flag warnings. These did not fail the workflow but should be triaged.

This snapshot is the authoritative status for this document; earlier checkpoint sections below are chronological history and should not override it.


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

## Historical implementation checkpoint — 2026-10-23 (superseded by the latest continuation checkpoint below)

This section supersedes earlier status paragraphs that describe only the initial legacy-only application or claim the latest Actions status was unknown.

- Feature branch: feat/learning-platform-foundation, exact validated HEAD 9c51012aff7631fc12b1dd5af0b74b7de9b28691.
- main: b13af92576e8a73753a6e3f3d26765d9f9c44397; unchanged by this recovery.
- PR #1: open Draft; GitHub reported mergeable/clean after reconciliation.
- CI: Actions run #39976179595 passed npm ci, ESLint, TypeScript typecheck, Vitest and production build on the exact HEAD. https://github.com/Mardakhay/interactive-guides/actions/runs/39976179595
- Merge recovery: commit d47d96c integrates the four content-only main commits without moving main. The feature SQL content retains the prior main block IDs and adds substantial bilingual coverage. Commit 9c51012 corrected the unsupported info callout tone in both SQL translations.
- Content inventory: 26 core and 11 supplementary lesson IDs across 74 EN/RU JSON files; all 25 legacy HTML sources remain. Structured curriculum routes are integrated into the React app.
- Structured JSON validation sweep: all 74 locale JSON files were checked for unsupported callout tones, missing reference blocks and walkthrough ranges past snippet length. The only detected problem was the SQL info tone in both translations; it is now corrected and exact-head CI passes. This is not editorial approval or source parity.
- PWA status at this historical checkpoint is superseded: the feature branch now has manifest metadata, PNG icons, a versioned service worker, SPA fallback and a learner-controlled update prompt. See the latest continuation checkpoint below for the exact validated SHA and remaining acceptance work.
- Runner reality check: the current learning runner uses a disposable Web Worker, a hard timeout and capped output. It is not a production security boundary for hostile code.
- Local verification limitation: a clone attempt failed because the environment could not resolve github.com; current verification claims refer to Actions, not local execution.

Next priority: continue the documented source-to-block audit in small batches, preserve curriculum order and review status, finish the remaining interface/content localization, complete local-data export/import and migration review, and record real-browser PWA acceptance. See SESSION_HANDOFF.md for the latest exact branch/CI checkpoint.


## PWA foundation — 2026-10-23

Commit c794088f15fb57ba3c1b8c51032e7e76e11f72bf adds manifest metadata, an SVG app icon, production-only service-worker registration, app-shell precaching, navigation fallback and same-origin GET runtime caching. The worker deliberately skips cross-origin requests, Authorization-bearing requests and /api/ paths. This is not a completed PWA acceptance result: platform installability, PNG icon requirements, offline cache lifecycle, deep-link reload and external font fallback still require real-browser checks. Check exact-head Actions before claiming this commit validated.


## PWA verification update — 2026-10-23

The first service-worker implementation failed lint because browser worker globals were not declared; commit 8d7172bf0faa128aee370afc675c9b5cdd9739ac fixes that. Commit 9e4e08c57725e595c3f279ce6f431fabb2d49281 narrows runtime caching to static asset extensions so arbitrary same-origin learner data is not intercepted. GitHub Actions [run #39977258811](https://github.com/Mardakhay/interactive-guides/actions/runs/39977258811) passed all configured checks on that exact SHA. This is code-level CI evidence only, not real-browser PWA acceptance.


## PWA asset hardening — 2026-10-23

On `feat/learning-platform-foundation`, the manifest now references PNG icons at 192px and 512px; a separate 180px Apple touch icon is linked from the HTML shell. The worker's shell precache contains those icon paths and uses a bumped cache version to force a clean shell cache on update. `public/_redirects` supplies the host's SPA rewrite for online nested-route reloads. A Vitest contract test checks the manifest, PNG dimensions, iOS link, rewrite, and same-origin/private-request caching guards.

This remains a code-level foundation rather than a fully accepted PWA. Browser/device installability, offline deep-link reload, update UX and external-font fallback still require manual checks; the content cache intentionally does not promise every never-visited lesson will be available offline.


## Application locale foundation — 2026-10-23

The UI now has an English/Russian preference stored under `interactive-guides.ui-locale`, a route-aware override for `/:locale/structured-lessons`, and a language switch in the top bar. The shared sidebar/mobile navigation, dashboard headings, main catalogue/bootcamp promotion and category cards have localized strings; category lesson counts handle English and Russian plural forms. App-level `html lang` follows the active UI locale.

This is the start of Phase 2, not complete app-wide localization. Course details, legacy HTML lessons, learning-path detail pages, bookmarks, notes, quizzes, search result UI and all empty/error states still need systematic translation and tests. The source lesson/catalog content remains English unless it uses the bilingual structured lesson route.


## Previous code/content checkpoint — 2026-10-23 (superseded by the authoritative snapshot above)

- Exact feature HEAD: `3762826f6952df4a72fce4149694728ea5f1e378`.
- GitHub Actions [run #39985536493](https://github.com/Mardakhay/interactive-guides/actions/runs/39985536493) passed `npm ci`, ESLint, TypeScript typecheck, all 102 tests, and production build on that exact SHA.
- `main` remains at `b13af92576e8a73753a6e3f3d26765d9f9c44397`; it was not changed in this continuation. PR #1 remains open and Draft.
- App UI localization now includes the language preference/switch, navigation, dashboard summary and widgets, catalog/category pages, learning paths, bookmarks, notes, lesson controls/metadata/navigation, quiz controls, search and common empty/error states. This is broad partial coverage, not a guarantee that every label, lesson body, legacy HTML page, and edge state has a complete translation.
- CSS source parity checkpoint: `public/lessons/css-reference.html` (SHA `be8fb951799659672119c32def19167a9c659424`) was compared against the CSS lesson destinations. The bilingual `css.fundamentals` pair is now version 3, 53 blocks, 110 minutes, five knowledge checks, five code walkthroughs and three coding exercises per locale. `css.flexbox-grid-responsive` and the separate Sass/SCSS supplement remain distinct destinations. All remain in editorial review; see `FULL_SOURCE_CONTENT_AUDIT.md` for remaining gaps.
- PWA implementation foundation exists on the feature branch; automatic checks do not replace Android Chrome/iOS Safari install/offline/update acceptance. Supabase authentication/sync remains unimplemented. Local-first migration and export/import remain open.

The project is **not release-complete** while source-to-block parity, all-screen/content localization, data-portability review and real-device acceptance remain open.


## Release blockers and next steps — exact state at `64dea28924aed5701452ae60b121cb57fc747598`

1. Continue source-to-block review for the retained HTML and unverified Notion material; document explicit decisions where a legacy interaction is deferred rather than rebuilt.
2. Finish localization coverage for remaining less-common strings/edge states and review source lesson-body equivalence, not only UI labels.
3. Implement/test a safe local-data migration plus export/import and recovery path before a storage-format change.
4. Record Android Chrome and iOS Safari install, deep-link, offline, update and external-font acceptance outcomes. Do not infer these outcomes from unit tests.
5. Triage the dependency audit findings and production bundle-size warning without applying an unreviewed forced dependency upgrade.

Do not mark overall release readiness complete until the source audit, learner-data portability and manual PWA acceptance gates have evidence.


## Documentation snapshot — 2026-10-23 (exact current HEAD)

The implementation/content snapshot reviewed for this documentation sync was `64dea28924aed5701452ae60b121cb57fc747598`, with GitHub Actions [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passing on that exact SHA. The previous documentation sync `a4d5eadb045f03a5c7cc995b6f150b42e2ca3eb4` also passed exact-head CI [run #40008684548](https://github.com/Mardakhay/interactive-guides/actions/runs/40008684548). This commit records the handoff and does not change release blockers. `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`, and PR #1 remains open as a draft.


## Latest project state — 2026-10-26

This checkpoint supersedes the older “authoritative” snapshots above.

- Feature branch `feat/learning-platform-foundation`, current code/content commit `17b79e07b8377e8aa92c5aa14305da0062389ac5`; PR [#1](https://github.com/Mardakhay/interactive-guides/pull/1) is open, Draft and mergeable. Its base is `main` at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. This continuation did not write to `main`.
- Exact-head GitHub Actions [run #40270734689](https://github.com/Mardakhay/interactive-guides/actions/runs/40270734689) passed: `npm ci`, `npm run lint`, `npm run typecheck`, `npm test` (22 files / 102 tests), `npm run build`. The install reported 14 audit findings (8 moderate, 4 high, 2 critical); production build retains the large-chunk warning.
- The app exposes 26 bilingual core lessons and 11 bilingual supplementary lessons (74 JSON files), including the SQL and production-hosting tracks. Lessons render as in-app structured text; old HTML remains source material.
- Content depth recently expanded in CSS (53 blocks, 5 checks, 5 walkthroughs and 3 exercises per locale), Git fundamentals (38 blocks) and workflow/CI (37 blocks). SQL has 35 blocks per locale. Deployment now has 21 blocks per locale, 3 walkthroughs, 2 knowledge checks and 2 scaffolded exercises; it teaches dist/hash caching, Vite environment precedence/build-time configuration, provider-specific SPA fallback, diagnosis and rollback planning.
- The feature also contains broad but partial EN/RU UI localization and PWA foundations: manifest and icons, Netlify SPA rewrite, constrained static-asset service-worker caching, and learner-controlled updates. Real-device/browser install/offline/update acceptance is not recorded.
- Source audit is still incomplete: 21 Notion fetches (all connector-unverified), 25 HTML files structurally inventoried, with focused deeper review recorded for selected React/CSS/Git sources. Do not infer complete coverage from passing CI.
- Persistence remains local-first; reviewed export/import/migration and Supabase auth/sync are unfinished.

The next milestone is to continue source-to-block review for the remaining HTML/Notion sections and close or explicitly defer each gap. Separately, finish localization edge states, test data portability, record PWA device acceptance, and triage dependency/bundle warnings without blind forced upgrades.

## Latest project state — 2026-10-26 (DOM content checkpoint)

This entry supersedes earlier branch/content snapshot statements.

- Active branch: `feat/learning-platform-foundation`; code/content SHA `deb30c88151ee6f0ea5f59afd14e96f0fb2d5902`. Actions [run #40271279200](https://github.com/Mardakhay/interactive-guides/actions/runs/40271279200) passed lint, typecheck, 102 tests / 22 files and production build.
- `js.dom-events` is now 35 blocks per locale with 7 walkthroughs, 6 checks and 3 coding exercises. Added explanations cover node types vs elements, whitespace nodes and element collections, input attributes vs live properties/reset, event phases, and diagnosis via DevTools. EN/RU block IDs and order match and content tests enforce the expanded structure.
- Deployment remains 21 blocks per locale (3 walkthroughs, 2 checks, 2 exercises); SQL is 35 blocks per locale; CSS fundamentals v3 is 53 blocks per locale; Git fundamentals v3 is 38 blocks and workflow/CI v3 is 37 blocks per locale.
- The app has 26 core and 11 supplementary IDs in two locales (74 JSON files), rendered as in-app text. The feature also contains broad but partial UI localization and the PWA foundation.
- Source audit is still incomplete: 21 Notion pages fetched (connector marked every result unverified), 25 HTML files structurally inventoried, and only selected sources have deeper review. The DOM lesson maps important concepts but not all its interactive playgrounds/editors or the final Card Manager. Keep the source and lesson statuses at review.
- PR #1 is open/Draft, based on `main` SHA `b13af92576e8a73753a6e3f3d26765d9f9c44397`. No changes from this work were committed to main.

Open work: continue full source review and mapping, complete remaining localization and local data-portability design, record PWA browser/device acceptance, and triage the 14 npm audit findings and large build chunk warning without blind upgrades.

## Latest project state — 2026-10-26 (network source pass)

- Feature branch `feat/learning-platform-foundation`, code/content SHA `0b08ee4249d1e6ec19bfe16e94de864fe7271ed1`. Actions [run #40271559588](https://github.com/Mardakhay/interactive-guides/actions/runs/40271559588) passed all configured checks: lint, typecheck, 102 tests/22 files, production build.
- Network supplement: 22 blocks per locale, 2 walkthroughs, 3 knowledge checks and 2 practices; new sourced coverage explains HTTP/2 multiplexing over TCP, TCP's in-order loss boundary, HTTP/3/QUIC streams and remaining packet/congestion caveats.
- DOM lesson: 35 blocks/locale, 7 walkthroughs, 6 checks, 3 exercises. Deployment lesson: 21 blocks/locale, 3 walkthroughs, 2 checks, 2 exercises. CSS/Git/SQL content deepening remains as recorded in the preceding checkpoint.
- Structural app inventory: 26 core plus 11 supplementary IDs (74 locale JSON files), embedded in the bilingual React reader. UI localization and PWA code remain broad but partial.
- Source audit: 21 Notion pages fetched, each marked unverified; 25 HTML sources inventoried with selected deeper reviews. Full source parity remains unfinished; DOM interactions and deployment demos are documented gaps. Keep lesson states at review.
- PR #1 is open/Draft and mergeable; base `main` is `b13af92576e8a73753a6e3f3d26765d9f9c44397`. No new changes were written to main.

Remaining: complete body/code/answer/interaction audits for unreviewed sources; finish learner-data migration/export/import; record real-device PWA acceptance; triage dependency findings and the large build chunk warning.


## Performance/accessibility source pass — 2026-10-26

The bilingual `performance.accessibility` lesson is now version 3, 36 blocks per locale (8 code walkthroughs, 6 knowledge checks and 3 scaffolded coding exercises). The source-derived addition teaches how to choose contextual image alternatives (informative vs decorative/redundant; explicit empty alt vs missing alt) and how to give an icon-only favorite toggle a stable accessible name and exposed `aria-pressed` state. It includes a worked TSX card, feedback-rich check, practical repair task and W3C WAI Images Tutorial reference. EN/RU block IDs/types and quiz structure match. CI [run #40271923920](https://github.com/Mardakhay/interactive-guides/actions/runs/40271923920) passed lint, typecheck, tests and production build on exact content SHA `89bb63293f5171f3e8f6b7d4fc1a0740f9e1dc05`.

Source status remains **partial**: the legacy render-cascade and bundle simulators, keyboard/menu demonstrations and other interactive behaviors do not yet have equivalent learner interactions. This focused comparison does not constitute a line-by-line audit of the HTML or completion of the full source audit.

## Testing source pass — 2026-10-26

The bilingual `testing.react-testing-library` lesson is version 3 with 34 blocks per locale (3 walkthroughs, 5 knowledge checks, 3 scaffolded exercises). A focused comparison with `test.guide.html` added a typed `vi.fn()` service-boundary walkthrough, resolved-vs-rejected promise cases, and a success/empty/error exercise with observable assertions. The old HTML's Jest-only globals were not copied: repository configuration is Vitest 2.1.9, React Testing Library 16.3.2, user-event 14.6.4, and jsdom. WAI/Testing Library-style behavioral testing remains the goal. CI [run #40272357781](https://github.com/Mardakhay/interactive-guides/actions/runs/40272357781) passed lint, typecheck, tests and production build on exact content SHA `e611754d978da8a36627429f56c49ff73770711e`.

The source remains **partial**: its visual mock tabs, live examples, FAQ accordions, and full legacy quiz feedback are not yet equivalent app interactions. This is a focused comparison, not a line-by-line HTML audit; the wider source audit remains open.

## Delivery checkpoint: PWA identity and ordered completion gates (2026-10-26)

This checkpoint supersedes older snapshots above where they conflict.

- Local GPT-created structured lesson restoration (155ab0ba8e87cb9e52c026141259249d3b04f4c0) was preserved and merged with the latest remote feature history in merge commit bbee000943990cc3dc6e1fe7a52d66100296d137; the merge is on the feature branch, not main.
- The app continues to serve bilingual structured lessons as in-app React-rendered text/content blocks. Legacy HTML sources remain available during migration; no source files or fallback routes were removed in this icon milestone.
- The full content gate remains open: the source inventory contains 21 fetched Notion pages (connector verification remains unverified) and 25 legacy HTML pages. Full source-to-block parity and depth review are incomplete. Do not claim every lesson is deep or migrated based on registered IDs or green CI alone.
- Learner-facing legacy delivery is intentionally retained until every accessible source has been evaluated, significant concepts have exact explanations and worked examples, realistic pitfalls, application practice, feedback/criteria, and equivalent reviewed EN/RU coverage. After that gate, remove legacy HTML from the app lesson-delivery path; retain source material as audit evidence unless a separate archival decision is made.
- Supabase authentication/sync is a later phase, after that content cutover and stable local-data migration/export contracts. Planned learner data includes progress, lesson position/completion, quiz/practice attempts and results, notes, bookmarks and preferences, protected by per-user RLS. Supabase work has not started.
- Icon correction: the generated concept was rejected by the user. The exact supplied blue-and-white SVG is now the sole design used for favicon and scalable PWA icon; 180/192/512 PNGs are antialiased RGBA rasterizations generated directly from the same SVG. Manifest/theme color is #0284c7, exact SVG equality is tested, and the service-worker cache is v5.
- The generated artwork commit 912742dc3549f6bd659c7baf2beb4cd1d67034e1 was rejected and is superseded. Corrected icon commit 2cedeeae948b0a35e6a983c428cb72b17140895c restores the exact user-supplied SVG as favicon and scalable PWA icon, with same-design PNGs rasterized directly from the SVG; Actions [run #387](https://github.com/Mardakhay/interactive-guides/actions/runs/40276045811) passed lint, typecheck, tests and production build on that exact SHA. Netlify preview [passed](https://deploy-preview-1--interactive-guides.netlify.app).
- PNG rasterization commit de3706c32abefbdd24550133f8db91d241724387 converts the canonical SVG directly to the 180/192/512 RGBA assets with 4× supersampling; the contract test verifies RGBA encoding and exact dimensions. Actions [run #389](https://github.com/Mardakhay/interactive-guides/actions/runs/40276645065) passed on that exact SHA.


## Continuation checkpoint — 2026-10-26

Latest feature HEAD observed: `3d44cf2259948085f2b76ce2370a79de33a0fc6c` (CI was still running when this note was drafted). The source audit retrieved 21 Notion pages and all 25 lesson HTML documents; Notion connector verification remains `unverified`, and full concept-by-concept parity for every source is still open. Structured lessons currently include 37 EN/RU pairs (26 core plus 11 supplementary). Three supplements were deepened in this continuation: architecture boundaries, Sass/SCSS, and JS prototypes.

Do not cut over or delete HTML from learner flow yet: the legacy catalog still serves the old content and the source-depth gate is incomplete. Supabase progress persistence remains a later milestone. Preserve the feature-only Git workflow and verify every commit/CI against `feat/learning-platform-foundation`; `main` was unchanged at `b13af92576e8a73753a6e3f3d26765d9f9c44397` at this checkpoint.


## Exact checkpoint — 2026-10-26

Current code HEAD observed: `da70ccafe952ae712b655c1f1cfa33bf5d7a919b`; its GitHub Actions [run #394](https://github.com/Mardakhay/interactive-guides/actions/runs/40278337273) was in progress at this note. `feat/learning-platform-foundation` remains the only write target; `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`. Four supplementary lesson pairs received EN/RU depth work (architecture, Sass, object prototypes, Bootstrap/MUI). Source retrieval counts remain 21 Notion pages and 25 lesson HTML files; Notion connector results are marked unverified, and full HTML section parity is not complete.

The legacy HTML-backed learner flow is still active. No source files were deleted, no structured-only cutover was made, and Supabase persistence has not started. Continue the content gate first, then cut over learner navigation, then use the Supabase skill/changelog and implement owner-secure progress persistence.


## Current checkpoint — 2026-10-26

Feature code commit `68a3d192b6be30fc2b94d3aca9d825f0edbae5fd` adds the DOM-source gap pass to `js.dom-events` (35→44 blocks per locale). The exact SHA's GitHub Actions run [#396](https://github.com/Mardakhay/interactive-guides/actions/runs/40278792766) was queued when this note was written. Main remains unchanged; the JSON-only app cutover and Supabase remain later gated phases.


## Latest continuation checkpoint — 2026-10-26

Feature HEAD at note time: `604b57e98fdadf6558ef83209145dab9b7253ebf`; GitHub Actions [run #401](https://github.com/Mardakhay/interactive-guides/actions/runs/40279686292) was running. Recent depth work includes architecture, Sass/SCSS, JS prototypes, UI ecosystem, DOM events, React API/custom Hooks and React effects/lists; latest source evidence is in `FULL_SOURCE_CONTENT_AUDIT.md`. Branch `main` remains unchanged at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. HTML-backed learner routes remain active; Supabase is not implemented.


## HTML/CSS continuation — 2026-10-26

Current code HEAD: `ab9ae370a569ccfcaabd05a502ad0038694e17e8`; CI run [#40279940661](https://github.com/Mardakhay/interactive-guides/actions/runs/40279940661) passed on preceding CSS commit `bc95f9877a024048b24e0f40bb2f7429415dd4ed`, and [run #40280077763](https://github.com/Mardakhay/interactive-guides/actions/runs/40280077763) passed on the HTML media/table content commit `a103c653d674d36a9e5614b91b95f013b9aea6e2`. Current CSS/table additions were still running at note time. `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; legacy lesson delivery is unchanged; Supabase is not started.


## Current continuation — 2026-10-26

Latest code HEAD: `08521895937d5b30e7bb58662b2d4f632d1f3616`; its GitHub Actions run [#403](https://github.com/Mardakhay/interactive-guides/actions/runs/40280399709) was running at this checkpoint. Recent focused work covers CSS margin collapsing, HTML tables/media, React API and effects, UI components, DOM observers, and Git release gates. `main` remains unchanged at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. The app remains on the legacy learner flow; Supabase has not started.

## Current checkpoint — 2026-10-26

Feature content now includes `js.iterators-generators` in both locales and in the supplementary curriculum/repository, bringing the inventory to 38 pairs (26 core + 12 supplementary). Its walkthrough, quizzes, practice and source mapping are documented in `FULL_SOURCE_CONTENT_AUDIT.md`. This is incremental depth progress, not full-source completion. HTML-backed learner routes are still active; legacy HTML is retained; JSON cutover and Supabase persistence are not yet implemented. The last checked feature parent before this lesson was `cd25047fd55900130f38cc0866de68f8fe2cde1f`; the new content commit is `28b95945fc6218d2cf8d3608f5fa0e6f3aadb354`, whose CI must be checked at the exact SHA.

## Latest content state — 2026-10-26

Feature now contains 39 EN/RU lesson pairs (26 core + 13 supplements), including registered `js.iterators-generators` and `js.collections-weakmaps`. The latest lesson has Map/Set/WeakMap worked traces, feedback and applied practice; source parity is partial and recorded by block ID in `FULL_SOURCE_CONTENT_AUDIT.md`. Legacy HTML routes are active, legacy sources retained, JSON cutover incomplete, Supabase not started. CI passed on the prior documentation checkpoint `0ba64a5605016dd551b002c7ebf4084bbc6a8862` (run https://github.com/Mardakhay/interactive-guides/actions/runs/40281014911); current code commit `693d91796a45f8e20668138c5d0fb7983ad97f1c` is awaiting CI.

## Verification correction — 2026-10-26

The initial collection-lesson commit failed runtime schema tests because each knowledge check lacked the required overall `explanation` field (per-option feedback alone is not sufficient). The bilingual quiz content now includes both kinds of feedback, and its test asserts one correct option, non-empty feedback for every option, and a non-empty overall explanation. Follow-up code SHA `55eda66397b28157624ab9e758cb089267e42031` passed lint, typecheck, tests, and production build: [CI run 40281556236](https://github.com/Mardakhay/interactive-guides/actions/runs/40281556236). This successful run validates the 39-pair code state; the subsequent documentation-only checkpoint will receive its own CI run.

## Current content state — 2026-10-26

Inventory: 40 EN/RU pairs (26 core + 14 supplementary), including registered regex supplement `js.regex-text-processing`. The new lesson has three worked traces, two explained checks and an applied task; its Advanced JS source mapping remains partial. Code commit `97b36d74fe2df76b4c7f84c3ef5c428129adcb0f` is on the feature branch; CI is pending. Legacy routes remain; JSON cutover and Supabase are not done.

## CI status correction — 2026-10-26

Regex lesson code commit `97b36d74fe2df76b4c7f84c3ef5c428129adcb0f` passed lint, typecheck, all tests, and production build on [CI run 40281922055](https://github.com/Mardakhay/interactive-guides/actions/runs/40281922055). The latest feature content is therefore green on that code SHA; a docs-only commit follows and still needs exact-HEAD CI verification.
