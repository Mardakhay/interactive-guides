# Implementation Roadmap

Follow this sequence. Each phase should land as a small reviewed change; avoid one giant rewrite.

## Authoritative current status — 2026-10-29

This section replaces older status summaries below where they conflict. Chronological checkpoint notes remain a history, not a unique-task count.

- Feature HEAD before this update: `af953df222b108e380da87a38d5862d4363bc922`.
- `main` remains at `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 is open Draft against `main`.
- Exact-head Actions run [#40717844032](https://github.com/Mardakhay/interactive-guides/actions/runs/40717844032) passed on `af953df222b108e380da87a38d5862d4363bc922`: install, lint, typecheck, tests, production build/bundle checks and HTTP preview smoke. It is not a native browser/device pass.
- Registry: 27 core + 17 supplementary = 44 EN/RU lesson pairs (88 JSON locale records).
- 25 legacy HTML source reviews are documented, but all 25 route-cutover rows remain **Blocked**. Source-to-block parity, interaction dispositions and learner-state retention are still release gates.
- 21 mapped Notion sources remain `verification.state=unverified`.
- Browser/device, keyboard/screen-reader, install/offline and mobile acceptance remain unrecorded. Supabase/auth/sync remains gated behind approved reconciliation policy, migrations/RLS and direct cross-user isolation tests.

### Remaining work, by dependency

1. **Source parity and cutover:** verify each legacy source against its actual English and Russian target content, including examples, code, quizzes, answer feedback, references and interaction behavior. Record reviewed keep-classic/defer decisions where equivalence is incomplete; do not infer readiness from mappings or CI.
2. **Learner-state safety:** define and test retention for progress, bookmarks, notes, last-opened state and classic quiz keys before redirects or source removal.
3. **Native acceptance:** run the documented browser/device checklist with synthetic data and record SHA, browser/version, OS/device, network mode and evidence.
4. **Curriculum and UX sign-off:** map all 24-week outcomes, review bilingual semantics, uncommon UI strings, keyboard/accessibility, responsive layout, and exercise solution disclosure.
5. **Release and cloud scope:** verify actual deployment/screenshot evidence. Implement Supabase only after scope, local/cloud reconciliation, RLS and account-isolation behavior are approved.

A task is not complete merely because a destination lesson is registered, the source was read, or CI is green.

## Phase 0 — Baseline and safeguards
- [x] Create working branch `feat/learning-platform-foundation`.
- [ ] Run the commands in a local checkout and record the local result. The remote exact-head CI run is green; do not describe it as a local test run.
- [x] Confirm default branch/CI behavior and inspect the existing user-data contracts.
- [x] Add documentation and maintain this handoff.
- Acceptance: baseline is known, current `main` remains intact, clean rollback path exists.
- Suggested commit: `docs: document platform redesign and migration plan`

## Phase 1 — Requirements, schemas and curriculum
- [x] Confirm the structured curriculum route/content/localization contract; app-wide localization remains a separate unfinished phase.
- [x] Define and validate schemas for curriculum, lesson translations and content blocks.
- [x] Map registered core and supplementary lesson IDs to the 24-week syllabus or a separately labeled track; source-content parity is tracked separately.
- [x] Add automated schema, repository, curriculum and locale checks for required fields, IDs/order, references and answer keys.
- [x] Create bilingual structured lessons and a React authoring/rendering path; source parity and editorial approval remain open.
- Acceptance: the curriculum can be loaded without an HTML manifest; content validation runs in CI.
- Suggested commits:
  - `feat(content): add typed bilingual lesson schemas`
  - `feat(curriculum): model the six-month bootcamp track`
  - `test(content): validate lesson links and translation parity`

## Phase 2 — Application UI and locale routing

- [x] Add a persistent EN/RU preference, a switch in the shared top bar, and route-aware locale selection for structured lessons.
- [x] Localize the common shell/navigation, dashboard widgets, catalog/category views, learning paths, bookmarks, notes, lesson controls/metadata/navigation, quiz controls, search and common empty/error states.
- [x] Keep dashboard progress separate for classic HTML catalog IDs and canonical structured lesson IDs; resume the last-opened lesson through its matching route.
- [x] Preserve structured lesson bookmarks and notes in their list pages; add bookmark/note controls to the structured reader and resolve structured IDs in dashboard recent activity.
- [ ] Audit remaining uncommon strings and edge states across every route; verify the browser document language and accessible announcements.
- [ ] Review and translate legacy lesson bodies where equivalent Russian source content exists; preserve the route-specific language of structured lessons.
- [ ] Complete the responsive, keyboard and touch-target review across the entire app.
- **Status:** broad partial implementation; phase acceptance is not met until the remaining UI/content and accessibility checks are audited.

## Phase 3 — Structured lesson reader
- [x] Build typed React renderers for the supported structured content-block schema.
- [x] Provide lesson-outline navigation and a localized, scroll-driven reading-progress indicator with accessible progressbar semantics.
- [x] Make code samples keyboard-focusable, labelled with their language/caption, and announce copy success/failure through an accessible status.
- [ ] Verify reading progress and code-sample interaction with a screen reader and real desktop/mobile browsers.
- [x] Implement knowledge-check feedback per answer for the supported question schema.
- [x] Provide coding-practice scaffolding, locally persisted drafts/checklists, knowledge-check attempt history, hint toggles, and a script-disabled HTML preview; document JavaScript Worker and DOM limitations.
- [x] Persist self-attested section-read markers separately from lesson completion; do not infer mastery from reading progress.
- [x] Summarize quiz attempts, self-review criteria and saved exercise drafts as separate activity signals; explicitly state that these are not a mastery score.
- [x] Regression-test that learning-signal counts are lesson-scoped and reset correctly when navigating to the next lesson; isolate the structured-learning store between page tests.
- [x] Add an optional authored-example-solution field and explicit reveal/collapse UI. Solutions stay hidden until requested and are labelled as examples, not the only valid implementation; the HTML “About Me” pilot has bilingual authored solutions.
- [ ] Extend optional solutions selectively after lesson-specific editorial review and verify disclosure behavior with assistive technology.
- [ ] Gate “mastered” status on required practice evidence where specified.
- Acceptance: lesson pages render without independent HTML documents; exercises remain testable and accessible.
- Suggested commits:
  - `feat(lesson-reader): render structured lesson blocks`
  - `feat(practice): capture quiz and coding attempts`
  - `feat(progress): separate completion from demonstrated mastery`

## Phase 4 — Content migration

- [x] Inventory all 25 legacy HTML sources and document a full content/code/interaction review for each in `FULL_SOURCE_CONTENT_AUDIT.md`.
- [x] Build the bilingual structured content repository and migrate substantial topic-specific material in reviewed batches; add schema, lesson-shape, curriculum, localization and source-specific regression tests.
- [ ] Complete source-to-block equivalence review for each candidate destination: sections, technical claims, code/examples, quizzes, answer feedback, references, and EN/RU semantic parity.
- [ ] Formally verify relevant Notion source claims; 21 pages are currently fetched/mapped but still marked `verification.state=unverified`.
- [ ] Review every row in `LEGACY_ROUTE_CUTOVER_MATRIX.md` and assign a reviewed disposition: cutover-ready destination, keep classic, or explicitly defer non-equivalent behavior. All 25 rows are currently **Blocked**.
- [ ] Specify and test learner-state retention/migration for progress, bookmarks, notes, last-opened pointers and classic quiz-result keys before redirects.
- [x] Keep all classic `/lessons/:lessonId` routes and the 25 legacy HTML files available during migration; do not remove them until the per-row content and state gates are signed off.
- Acceptance: no legacy ID is cut over because a candidate ID exists or because CI is green; both locales, interaction dispositions and learner-data behavior require evidence.

## Phase 5 — Local-first data foundations
- [x] Add a versioned JSON backup format and explicit export/restore for current learning datasets; validation, preview, replace confirmation and best-effort multi-key rollback are implemented.
- [x] Introduce schema-v1 envelopes for progress, bookmarks, notes and classic quiz results, including read-through migration from valid legacy raw JSON. A failed migration write preserves the raw value for a later retry.
- [x] Test malformed/unsupported backup files, current and legacy store records, invalid/future versions, storage read/write failures, migration retry, restore replacement and rollback (including rollback failure).
- [x] Add focused action-level integration tests for progress, bookmarks, notes and classic quiz actions; CI covers the store envelopes and common update/delete paths.
- [ ] Run real-browser/device download/import smoke checks for the file picker, downloaded filename, large-file guard, confirmation and restore success/failure feedback using [the execution checklist](./BROWSER_SMOKE_TEST_CHECKLIST.md).
- Acceptance: existing saved state survives update or export/import recovery.
- Suggested commit: `refactor(storage): add versioned local repositories`

## Phase 6 — Supabase auth and sync
- [ ] Create SQL migrations and RLS policies.
- [ ] Add environment validation and a no-cloud mode.
- [ ] Implement auth screens, session handling, repository adapters and sync states.
- [ ] Review and implement the draft policy in [`LOCAL_CLOUD_RECONCILIATION.md`](./LOCAL_CLOUD_RECONCILIATION.md), then test local/cloud conflict reconciliation.
- [ ] Verify cross-user isolation and account cleanup.
- Acceptance: two users cannot read or modify each other's data; local learning works without Supabase settings.
- Suggested commits:
  - `feat(auth): add Supabase session integration`
  - `feat(sync): sync progress notes and bookmarks`
  - `test(security): verify RLS and user data isolation`

## Phase 7 — PWA and deployment

- [x] Add PNG app icons and the web app manifest.
- [x] Add a service worker with scoped static-asset caching, an app-shell fallback and an explicit user-approved update lifecycle.
- [x] Add a host-side SPA rewrite for client-side deep-link reloads (`public/_redirects`).
- [x] Add an automated production-preview HTTP smoke stage after the production build; it validates four deep-route app-shell responses, the entry bundle, manifest/service-worker markers and PWA assets.
- [ ] Review actual production deployment and record post-deploy behavior; a successful Netlify Deploy Preview and CI HTTP smoke are not production or real-browser acceptance.
- [ ] Test clean install, deep-link refresh, offline revisit, update activation and external-font fallback in supported desktop/mobile browsers; record browser/OS versions using [the browser/device checklist](./BROWSER_SMOKE_TEST_CHECKLIST.md).
- **Status:** technical foundation implemented; not release-accepted until real-browser/device checks are recorded.

## Phase 8 — Capstone and release readiness
- [x] Build a bilingual capstone-like guided project path with requirements discovery, architecture, implementation, automated tests, deployment, and final review/demo. Automated tests protect lesson resolution, route locale, and the six-step sequence.
- [ ] Review all learning outcomes against the 24-week syllabus and document any uncovered or duplicate outcomes.
- [ ] Audit keyboard access, contrast, mobile, bundle size, broken links, and stale content.
- [x] Update the project README and add a contributor/content authoring guide for the current JSON/manifest/schema workflow.
- [x] Add full-registry localization guards for EN/RU metadata and outcome shape, duplicate reference URLs, selected audited Russian prose, and long user-facing prose copied verbatim from EN into RU; remove 20 duplicate URL entries and translate 52 copied-English strings across eight RU lesson files.
- [ ] Capture and verify current application screenshots for the README.
- [ ] Run and record real-browser, screen-reader, and mobile acceptance; automated tests are not a substitute.
- Acceptance: the complete path resolves in both locales, every step note is localized, a fresh-browser flow is checked, and release notes describe remaining limitations honestly.
- Remaining suggested work:
  - `test(e2e): cover core learner flows in a real browser`
  - `docs: record source parity and release acceptance evidence`


## Commit style

Use short, scoped Conventional Commit-style messages:
- `docs: ...`
- `feat(scope): ...`
- `fix(scope): ...`
- `refactor(scope): ...`
- `test(scope): ...`
- `content(scope): ...`
- `ci(scope): ...`

One commit should express one logical change. Avoid `update files`, `fix`, or huge commits mixing content, UI, schema and cloud changes.

## Content migration checkpoint — 2026-10-23

The broad source inventory is reconciled (21 fetched Notion pages, 25 HTML files), but full source review and parity are not complete: two HTML pages were fully reviewed in the previous pass, one additional API lesson received a focused factual review, and remaining HTML body/code/exercises still need review. Structured EN/RU migration, curriculum registration, and runtime access for supplementary SQL/hosting JSON remain outstanding. Continue with source-by-source extraction and bilingual lesson work; do not mark curriculum/content migration complete based on the inventory document alone.


## Delivery checkpoint — 2026-10-23

The branch now has the structured bilingual curriculum repository, learner-facing curriculum index and lesson routes, 26 core lesson IDs / 52 locale files, and 11 registered supplementary IDs / 22 locale files. This supersedes roadmap statements that the schema, route, and pilot were entirely unimplemented. Legacy lessons are still retained as sources.

Remaining work is substantive: finish full review of all 25 HTML files and accessible Notion course pages; replace stale mapping/status entries with current canonical IDs and block-level evidence; verify explanations, code, edge cases, practice/feedback, and EN/RU parity; close or explicitly defer uncovered themes; run all validations on the exact final feature SHA. No source is “fully migrated” just because a lesson ID exists. Latest CI after the route/test change is being verified; see the handoff for its exact result before claiming green.


**Validation note (2026-10-23):** clean-clone checks at `132636c4007141454a903e815d6f0418a3c511b0` passed lint, typecheck, 92 tests, production build, and `git diff --check`. GitHub Actions has not reported a run for the API-created latest head; record CI separately once a workflow run is available. Full source reading/parity remains a required open item.


**CI update (2026-10-23):** [Run #317](https://github.com/Mardakhay/interactive-guides/actions/runs/39963932841) passed all configured checks on `07bc9acfc89c0138cbd4d214e19215e4dff6f1c6`. This closes the exact-head CI validation checkpoint for that commit, not the source-audit or editorial-review work.


**Latest CI:** [Run #320](https://github.com/Mardakhay/interactive-guides/actions/runs/39964458056) passed on `b7fdeba6b9096d9f8336cf1071deb9d0f2d1dfc5`. The source-to-lesson audit and editorial review remain open.

## Historical implementation status snapshot — 2026-10-23 (superseded by the latest checkpoint below)

The checked tasks above reflect the technical foundation where verified. They do not mean editorial review or all product phases are complete.

| Phase | Status | Evidence and remaining work |
|---|---|---|
| 0. Baseline and safeguards | Complete for remote checkpoint | Feature branch exists and exact-head GitHub Actions run #39976179595 passes. Main remains unchanged. Local clone unavailable in the current environment. |
| 1. Schemas and curriculum | Technical foundation implemented | Zod schemas, bilingual curriculum, supplementary tracks and repository checks exist. Source parity is tracked separately. |
| 2. App UI and localization | Broad partial coverage; not complete | A saved EN/RU preference and switch now localize the shell, dashboard widgets, catalog/category screens, learning paths, bookmarks, notes, lesson controls, quizzes, search and common empty/error states. Legacy lesson bodies, some edge states and remaining labels still need a systematic audit. |
| 3. Structured lesson reader | Implemented foundation; mastery policy partial | React renderer, curriculum index, knowledge checks, practice, store/persistence and tests exist. Do not equate completion flags with mastery. |
| 4. Content migration and parity | In progress; not complete | 26 core and 11 supplementary IDs are registered in both locales. All 25 legacy HTML sources remain. Most source concepts, code, exercises, answers and interactions still need full mapping/review. |
| 5. Local-first persistence | Partial | Legacy stores and structured learning persistence exist. Cross-feature migration, export/import and preservation of all old records need further verification/implementation. |
| 6. Supabase authentication/sync | Not started | Keep gated behind stable local contracts, RLS design and explicit project/cost checks. |
| 7. PWA and deployment | Implementation foundation exists; acceptance remains open | Manifest, PNG icons, versioned service worker, same-origin/static-asset cache guards, Netlify SPA fallback and an explicit learner-approved update prompt exist. CI contract tests pass; clean install, deep-link/offline/update UX and external-font fallback still need browser/device evidence. |
| 8. Capstone and release readiness | Partial | Four bilingual capstone-stage lessons are registered; source audit, app-wide accessibility/localization, PWA tests and release acceptance remain. |

### Exact-head validation
- Branch: feat/learning-platform-foundation
- SHA: 9c51012aff7631fc12b1dd5af0b74b7de9b28691
- Actions: run #39976179595 passed npm ci, lint, typecheck, tests and build: https://github.com/Mardakhay/interactive-guides/actions/runs/39976179595
- Merge recovery: d47d96cb1b471468e9687ab923744ce9ec248a99; bilingual SQL schema fix: 9c51012aff7631fc12b1dd5af0b74b7de9b28691.

### Next priority
Continue source-to-block parity in small syllabus-ordered batches. Record uncovered examples, exercises, answer interactions and English/Russian mismatches. Then prioritize app-wide localization and the missing PWA foundation. Keep lessons in review until editorial criteria are met.


## PWA foundation checkpoint — 2026-10-23

The initial manifest/service-worker foundation is implemented on the feature branch (commit c794088f15fb57ba3c1b8c51032e7e76e11f72bf). Phase 7 remains open until installability is verified, icon requirements are validated across target platforms, cache/update UX and hosting deep-link fallback are tested, and deployment smoke checks are in place.


## Application locale foundation — 2026-10-23

The UI now has an English/Russian preference stored under `interactive-guides.ui-locale`, a route-aware override for `/:locale/structured-lessons`, and a language switch in the top bar. The shared sidebar/mobile navigation, dashboard headings, main catalogue/bootcamp promotion and category cards have localized strings; category lesson counts handle English and Russian plural forms. App-level `html lang` follows the active UI locale.

This is the start of Phase 2, not complete app-wide localization. Course details, legacy HTML lessons, learning-path detail pages, bookmarks, notes, quizzes, search result UI and all empty/error states still need systematic translation and tests. The source lesson/catalog content remains English unless it uses the bilingual structured lesson route.


## Continuation status — 2026-10-23

Latest validated implementation checkpoint: feature code SHA `5628ca69a6981a6d81357ab1d20e466c3f1d783e`, with all CI checks passing in [run #39982235822](https://github.com/Mardakhay/interactive-guides/actions/runs/39982235822). This checkpoint adds the PWA update prompt/explicit activation handshake and expands UI translations. It does not close the larger phases below.

- **Phase 2 — UI/localization:** partial. EN/RU selector and persistent preference work; shell, dashboard, catalogue, category detail, learning paths, bookmarks, notes and search have translated strings. Remaining screens and legacy lesson body content need a dedicated localization audit.
- **Phase 4 — source migration/parity:** in progress. Keep all 25 HTML source files; map prose, code, exercises, answers/solution toggles, interactive controls and references to structured destinations before marking migrated.
- **Phase 5 — local-first persistence:** partial. Verify legacy record migration and provide an explicit export/import path before wider release.
- **Phase 6 — Supabase:** not started. Do not add client-side service-role credentials; scope auth/sync and RLS separately.
- **Phase 7 — PWA/release:** implementation foundation exists, acceptance still open. The `v3` worker uses an explicit user-approved update; tests pass, but Android Chrome/iOS Safari install and offline behavior must be recorded manually.
- **Security/release gates:** recent install logs reported dependency audit findings; triage with the lockfile context before attempting forced major upgrades. No browser/device or deployed-hosting smoke evidence is claimed yet.

Keep `main` at `b13af92576e8a73753a6e3f3d26765d9f9c44397`, keep PR #1 as a draft until the above gates are addressed, and never report the whole product as finished while the audit and release phases remain open.


## Previous code/content checkpoint — 2026-10-23 (superseded by the authoritative checkpoint below)

- Feature SHA `3762826f6952df4a72fce4149694728ea5f1e378` passed [GitHub Actions run #39985536493](https://github.com/Mardakhay/interactive-guides/actions/runs/39985536493): install, lint, typecheck, all tests and production build.
- UI localization has expanded to common dashboard widgets, lesson metadata/navigation, quiz controls and notes/bookmark tools; it remains incomplete for some legacy lesson bodies and less common states.
- The CSS reference parity pass expanded both `css.fundamentals` locales from 31 to 53 structurally matched blocks and added colors, typography, custom properties/functions, transitions/reduced motion, visual accessibility, browser feature queries, a quick-reference block, a contrast check and an accessible-card coding exercise. The lesson remains `review`; interactive source playground parity is still open.
- Phase 4 remains in progress; all 25 legacy HTML sources remain until their code, examples, exercises, answer/reveal behavior, references and meaningful interactions have been mapped or explicitly deferred.
- Keep `main` at `b13af92576e8a73753a6e3f3d26765d9f9c44397`; keep PR #1 as Draft. Supabase auth/sync is not started, and PWA device acceptance plus local-data export/import are outstanding.


## Authoritative checkpoint — 2026-10-23

- **Latest validated application/content snapshot:** `64dea28924aed5701452ae60b121cb57fc747598` (later commits in this checkpoint update documentation only).
- **CI:** [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passed dependency install, lint, typecheck, all 102 tests across 22 files, and production build on the exact feature HEAD.
- **Branch/PR:** PR #1 remains open/Draft and mergeable. `main` remains unchanged at `b13af92576e8a73753a6e3f3d26765d9f9c44397`.
- **Structured content:** 26 core + 11 supplementary lesson IDs, EN/RU, 74 locale JSON files. The full legacy source set of 25 HTML files remains. Source parity/editorial review is in progress.
- **Recent lesson improvements:** `css.fundamentals` v3 / 53 blocks / 110 min; `git.fundamentals` v3 / 38 blocks / 95 min; `git.workflow-ci` v3 / 37 blocks / 110 min. All remain `review` status; matching structural IDs and passing CI do not prove complete source parity.
- **App-wide localization:** broadly implemented across common navigation/content-management screens, lesson metadata/navigation and quiz/search states, but remaining strings, legacy lesson content and less-common states still need review.
- **PWA:** icons, manifest, service worker, explicit update prompt and SPA fallback are implemented; device/browser acceptance is not.
- **Local data and cloud:** migration/export-import remain incomplete; Supabase auth/sync is not started.
- **Build/security follow-up:** `npm ci` reported 13 dependency audit findings (8 moderate, 3 high, 2 critical); build warns about a large chunk, and React Router emits future-flag warnings. Triage these separately; do not run a blind `npm audit fix --force`.

The release acceptance gates remain open. Keep this roadmap as a work plan and do not mark the product complete.


## Documentation snapshot — 2026-10-23 (exact current HEAD)

The implementation/content snapshot reviewed for this documentation sync was `64dea28924aed5701452ae60b121cb57fc747598`, with GitHub Actions [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passing on that exact SHA. The previous documentation sync `a4d5eadb045f03a5c7cc995b6f150b42e2ca3eb4` also passed exact-head CI [run #40008684548](https://github.com/Mardakhay/interactive-guides/actions/runs/40008684548). This commit records the handoff and does not change release blockers. `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`, and PR #1 remains open as a draft.


## Latest delivery checkpoint — 2026-10-26

This section supersedes the older implementation snapshots above; the roadmap is still active, not complete.

- **Branch/CI:** `feat/learning-platform-foundation`, code/content SHA `17b79e07b8377e8aa92c5aa14305da0062389ac5`; [Actions run #40270734689](https://github.com/Mardakhay/interactive-guides/actions/runs/40270734689) passed install, lint, typecheck, 102 tests/22 files and production build. PR #1 remains open/Draft; `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`.
- **Phase 2 (UI/locale):** broad EN/RU shell and page localization is implemented; remaining string/edge-state and content parity review remains.
- **Phase 3 (structured reader):** bilingual curriculum and reader work; 26 core + 11 supplementary lesson IDs are registered and served as embedded lesson content.
- **Phase 4 (content):** active. CSS, Git/CI, SQL and deployment lessons have recent depth additions. Source inventory is 21 Notion pages fetched (unverified) and 25 HTML pages inventoried; full prose/code/exercise/answer/interaction parity is still incomplete. Keep all legacy source files and lessons at `review`.
- **Phase 5 (local-first portability):** local stores operate; migration/export/import and recovery remain open.
- **Phase 6 (Supabase):** auth/sync not implemented.
- **Phase 7 (PWA):** code foundation and contract tests exist; real Android/iOS browser install/offline/update acceptance is outstanding.
- **Phase 8 (release):** not ready; complete source review, data portability, PWA acceptance, dependency audit triage and bundle-warning review before considering release completion.

For source-level evidence and explicit remaining gaps see [FULL_SOURCE_CONTENT_AUDIT.md](./FULL_SOURCE_CONTENT_AUDIT.md). Do not equate CI green with lesson parity or product completion.

## Latest delivery checkpoint — 2026-10-26 (DOM pass)

- Code/content SHA `deb30c88151ee6f0ea5f59afd14e96f0fb2d5902` passed [Actions run #40271279200](https://github.com/Mardakhay/interactive-guides/actions/runs/40271279200): install, lint, typecheck, all 102 tests across 22 files, and build.
- Phase 4 (content migration) remains active: DOM lesson v3 now includes 35 blocks/locale, 7 walkthroughs, 6 checks and 3 coding exercises, adding source-derived node/property/event reasoning. Its legacy DOM masterclass still has unmapped interactive tree/theme/collection demos, several editor challenges and the Card Manager.
- Earlier in-app content work remains: CSS v3, expanded Git/CI, SQL/PostgreSQL and deployment/hosting. Recent deployment lesson is a structured text lesson, not a standalone HTML replacement.
- Audit count and limits remain 21 Notion pages fetched (unverified) and 25 HTML files inventoried; source-to-block review is incomplete.
- Phases 5–8 are not complete: local data export/import/migration, Supabase auth/sync, device-level PWA acceptance, and release diagnostics remain open. PR #1 remains Draft; keep main untouched.

## Latest delivery checkpoint — 2026-10-26 (network source pass)

- Feature content SHA `0b08ee4249d1e6ec19bfe16e94de864fe7271ed1` passed [Actions run #40271559588](https://github.com/Mardakhay/interactive-guides/actions/runs/40271559588): install, lint, typecheck, 102 tests across 22 files, build.
- Phase 4 is active: the DNS/TCP/TLS supplement now explains protocol multiplexing and loss boundaries for HTTP/2 and HTTP/3 with IETF RFC evidence. The source's inaccurate HTTP/2 head-of-line claim is not taught; its complete interaction parity is still not done.
- Recent source-driven content also covers DOM node/property/event edge cases and Vite deployment configuration. All legacy HTML remains; full source audit is open.
- Phases 5–8 remain incomplete: data portability, Supabase, real-browser PWA acceptance and final release diagnostics.
- PR #1 remains Draft on `feat/learning-platform-foundation`; `main` was not modified.


## Performance/accessibility source pass — 2026-10-26

The bilingual `performance.accessibility` lesson is now version 3, 36 blocks per locale (8 code walkthroughs, 6 knowledge checks and 3 scaffolded coding exercises). The source-derived addition teaches how to choose contextual image alternatives (informative vs decorative/redundant; explicit empty alt vs missing alt) and how to give an icon-only favorite toggle a stable accessible name and exposed `aria-pressed` state. It includes a worked TSX card, feedback-rich check, practical repair task and W3C WAI Images Tutorial reference. EN/RU block IDs/types and quiz structure match. CI [run #40271923920](https://github.com/Mardakhay/interactive-guides/actions/runs/40271923920) passed lint, typecheck, tests and production build on exact content SHA `89bb63293f5171f3e8f6b7d4fc1a0740f9e1dc05`.

Source status remains **partial**: the legacy render-cascade and bundle simulators, keyboard/menu demonstrations and other interactive behaviors do not yet have equivalent learner interactions. This focused comparison does not constitute a line-by-line audit of the HTML or completion of the full source audit.

## Testing source pass — 2026-10-26

The bilingual `testing.react-testing-library` lesson is version 3 with 34 blocks per locale (3 walkthroughs, 5 knowledge checks, 3 scaffolded exercises). A focused comparison with `test.guide.html` added a typed `vi.fn()` service-boundary walkthrough, resolved-vs-rejected promise cases, and a success/empty/error exercise with observable assertions. The old HTML's Jest-only globals were not copied: repository configuration is Vitest 2.1.9, React Testing Library 16.3.2, user-event 14.6.4, and jsdom. WAI/Testing Library-style behavioral testing remains the goal. CI [run #40272357781](https://github.com/Mardakhay/interactive-guides/actions/runs/40272357781) passed lint, typecheck, tests and production build on exact content SHA `e611754d978da8a36627429f56c49ff73770711e`.

The source remains **partial**: its visual mock tabs, live examples, FAQ accordions, and full legacy quiz feedback are not yet equivalent app interactions. This is a focused comparison, not a line-by-line HTML audit; the wider source audit remains open.

## User-requested completion order (2026-10-26)

Keep these gates in order; later architecture work must not be treated as a substitute for content completion.

1. **Finish the embedded course and depth audit.** Read every accessible Notion page and all 25 inventoried legacy HTML sources (including interactions/reveals), map source subsections to in-app lesson blocks, and close/defer each gap with evidence. For each significant concept verify exact explanation, worked example, reasoning, pitfalls/edge cases, applied practice, feedback/success criteria, and reviewed EN/RU parity. The current audit is still partial (21 Notion fetches are marked unverified; most HTML needs detailed review).
2. **Cut legacy HTML out of learner-facing delivery only after the content gate passes.** The replacement must be structured lesson content rendered inside Interactive Guides. First verify every curriculum/catalog route resolves to that content and old lesson routes no longer send learners to standalone HTML. Keep legacy source files as audit references until review is complete; this step does not authorize deleting evidence.
3. **Then add Supabase-backed learner persistence.** Start only after local repositories, migrations and export/recovery are stable. Persist progress and practice/quiz results, reading position, notes, bookmarks and relevant preferences with authentication, explicit sync/conflict states, and tested user-scoped RLS. No service-role key may ship to the browser; local learning must remain available without cloud configuration.

### PWA identity milestone (2026-10-26)

The dark-indigo generated artwork was rejected by the user and is superseded. Use only the user-supplied blue-and-white SVG, byte-for-byte, for both favicon and scalable PWA icon. PNG sizes 180 (Apple touch), 192 and 512 are generated directly from that same SVG with 4× supersampling and RGBA antialiasing; they are not alternate designs. Manifest/theme color is #0284c7; contract tests verify exact SVG equality, PNG dimensions, wiring and service-worker cache v5. Correction commit 2cedeeae948b0a35e6a983c428cb72b17140895c passed GitHub Actions [run #387](https://github.com/Mardakhay/interactive-guides/actions/runs/40276045811). Direct SVG-to-PNG rasterization commit de3706c32abefbdd24550133f8db91d241724387 passed Actions [run #389](https://github.com/Mardakhay/interactive-guides/actions/runs/40276645065); the generated RGBA PNGs use 4× supersampling. Device install/offline acceptance remains open.


## Continuation checkpoint — 2026-10-26

Status update against the required sequence: source inventory and accessible retrieval are established (21 Notion pages, 25 lesson HTML files), but full lesson-by-lesson parity is not yet verified. Three bilingual supplements were deepened on the current feature branch (architecture boundaries, Sass/SCSS, object prototypes). The HTML-backed learner catalog remains active; structured JSON is registered but has not replaced all legacy navigation. Supabase is not started. Continue content validation before route cutover, then implement persistence.


## Content continuation — 2026-10-26

The next implementation phase remains gated. Four supplementary lesson pairs have deepened, but all source-section checks are not complete. Keep the learner-facing legacy HTML catalog until every HTML/Notion concept, example, pitfall, practice and feedback path is mapped to validated JSON. Then switch catalog/routes to structured IDs; Supabase follows that cutover. Do not mark either gate done based on structural tests or the number of blocks.


## DOM source pass — 2026-10-26

The core DOM/event lesson was deepened from 35 to 44 bilingual blocks based on the DOM Masterclass: DocumentFragment, MutationObserver, IntersectionObserver, custom events, and debounce/throttle now have explanation, code traces, a choice check, lifecycle cleanup and applied practice. CI for the content SHA was pending when noted. Continue the full source matrix before moving learner routes.


## Content gate remains open — 2026-10-26

Targeted parity additions now cover DOM observer APIs, Fetch/Axios service differences, React external-effect cleanup, and MUI forms. The source inventory remains only partially audited at the concept level: 21 Notion pages were fetched but connector-unverified, and all 25 HTML documents were fetched while full line/topic/practice parity for every file remains open. Keep the existing HTML-backed learner route/catalog until that gate is complete; the JSON-only cutover and Supabase phase are not done.


## Latest content gate evidence — 2026-10-26

The source-to-lesson work has begun closing specific HTML/Notion gaps with bilingual JSON blocks and tests, including CSS margin collapse, HTML table semantics, and media captions. Do not mark content complete from these targeted passes. Continue the remaining Notion and HTML rows and evaluate explanation, worked reasoning, edge cases, practice and feedback before switching learner navigation.


## Source gate update — 2026-10-26

Content evidence now includes the CI-to-release simulator concepts from legacy Git workflow material. Even with focused HTML/Notion gaps closed, full source review remains incomplete. Keep HTML learner routes until every source row has depth evidence; then switch to JSON and only afterward implement Supabase progress.

## Current sequencing checkpoint — 2026-10-26

Content work added a bilingual, registered `js.iterators-generators` supplement from the Advanced JS Notion topic (38 pairs total: 26 core, 12 supplements). Continue source-by-source depth review; do not mark the content milestone complete until every accessible Notion/HTML source row has evidence and remaining gaps are closed. Next dependency order remains: finish content/depth and tests → move learner catalog/routes fully onto structured JSON while preserving legacy files as source evidence → verify cutover → implement Supabase-authenticated, RLS-protected learner progress. Supabase has not begun.

## Sequencing checkpoint — 2026-10-26

The Advanced JS audit found another specific gap, so `js.collections-weakmaps` was added as a bilingual registered supplement. Its map/set/weak-map source row remains explicitly partial; continue closing the rest of the 94 KB page's topic gaps and other HTML/Notion rows. Inventory is 39 bilingual pairs (26 core, 13 supplementary). Do not cut over learner routes or start Supabase until source depth and JSON-first cutover gates are verified.

## Verification correction — 2026-10-26

The initial collection-lesson commit failed runtime schema tests because each knowledge check lacked the required overall `explanation` field (per-option feedback alone is not sufficient). The bilingual quiz content now includes both kinds of feedback, and its test asserts one correct option, non-empty feedback for every option, and a non-empty overall explanation. Follow-up code SHA `55eda66397b28157624ab9e758cb089267e42031` passed lint, typecheck, tests, and production build: [CI run 40281556236](https://github.com/Mardakhay/interactive-guides/actions/runs/40281556236). This successful run validates the 39-pair code state; the subsequent documentation-only checkpoint will receive its own CI run.

## Content checkpoint — 2026-10-26

A further Advanced JS gap led to the registered bilingual `js.regex-text-processing` supplement. It is evidence-backed but partial; finish mapping individual source examples and remaining HTML/Notion coverage before removing legacy learner routes. Inventory: 40 bilingual pairs. Continue the sequence: content/depth gate → JSON learner-flow cutover → Supabase progress.

## CI status correction — 2026-10-26

Regex lesson code commit `97b36d74fe2df76b4c7f84c3ef5c428129adcb0f` passed lint, typecheck, all tests, and production build on [CI run 40281922055](https://github.com/Mardakhay/interactive-guides/actions/runs/40281922055). The latest feature content is therefore green on that code SHA; a docs-only commit follows and still needs exact-HEAD CI verification.

## Persistence learning prerequisite — 2026-10-26

Added `browser.storage-indexeddb` as a bilingual supplement before app-level progress persistence. Finish its source parity and the global content/depth gate, then switch learner routes to embedded JSON, verify, and only afterward design Supabase progress/auth/RLS. No Supabase schema or client integration has been started. Current catalog count is 41 bilingual pairs.

## Verification checkpoint — 2026-10-26

Browser-storage lesson code SHA `7915276b6514a56a3a700c0ba488b784e348754b` passed lint, typecheck, test suite, and production build on [CI run 40282414157](https://github.com/Mardakhay/interactive-guides/actions/runs/40282414157). The documentation checkpoint `97008a25d5312fe207756e6a6061f3d75bd72a7b` also passed the same required checks on [CI run 40282496515](https://github.com/Mardakhay/interactive-guides/actions/runs/40282496515). The next content/docs checkpoint will receive a fresh exact-HEAD run.

## Core lesson depth checkpoint — 2026-10-26

A verified Advanced JS syntax gap was addressed inside the existing core lesson, preserving IDs/navigation. Continue mapping the remaining source examples and all other Notion/HTML rows; then finish the content gate before JSON cutover and Supabase. The course has 41 bilingual pairs; `js.functions-arrays-objects` is 71 blocks per locale.

## Content/depth checkpoint — 2026-10-26

Extended the existing object/prototype supplement for function receiver invocation and strict mode. Continue source-driven review; do not cut over legacy learner routes until all source rows have sufficient depth evidence, then integrate Supabase only after JSON cutover.

## Content checkpoint — 2026-10-26

Registered `browser.realtime-workers` for the Notion XHR/WebSocket/worker material. Complete its remaining source details and the rest of all source rows before the JSON learner-flow cutover; only afterward implement Supabase progress. No Supabase integration has started. Total inventory is 42 bilingual pairs.


## Browser capability API checkpoint — 2026-10-26

Added the bilingual browser.capability-apis lesson to supplement-browser-platform. It covers geolocation, clipboard, notifications, battery API limits, ResizeObserver feedback and Page Visibility cleanup. The full source audit records block-level evidence. Catalog count is now 43 EN/RU pairs (26 core + 17 supplementary). This does not close Notion-wide parity or detailed review of every HTML source. Legacy learner routes and source files remain; no cutover/deletion or Supabase implementation has occurred.


## Typed-array / binary-data checkpoint — 2026-10-26

Added bilingual js.typed-arrays-binary to supplement-js-internals. It teaches ArrayBuffer versus typed views, byte units and aliasing, numeric conversion, DataView endianness, transferable ownership, and defensive packet parsing. Source details and evidence IDs are in FULL_SOURCE_CONTENT_AUDIT.md. Catalog count is 44 EN/RU pairs (26 core + 18 supplementary). This is a focused source slice, not completion of the Advanced JS page or the complete Notion/HTML parity audit. HTML learner routes/files remain; no JSON cutover, source deletion, or Supabase work has occurred.


## Binary-data lesson CI follow-up — 2026-10-26

The first binary-data lesson CI run [40285183316](https://github.com/Mardakhay/interactive-guides/actions/runs/40285183316) failed only because its line-range test used a literal backslash-n delimiter. The test was corrected without weakening its range assertion. Follow-up SHA `bef3e581f966e41262e2da00d60da621b3a2d6ce` passed lint, typecheck, tests, and production build on [CI run 40285395490](https://github.com/Mardakhay/interactive-guides/actions/runs/40285395490). Lesson content remains in review; the broad source parity and legacy HTML cutover gates remain open.


## intro.dev.html full-read checkpoint — 2026-10-26

Completed the full 3,472-line source read, including five chapters, 20 interactive quiz items and 10 starter/solution exercises. It maps across existing npm/tooling, TypeScript, React, API Hooks, testing and browser-storage lessons. The pass identified the missing TypeScript utility-types topic; the bilingual core TS lesson now explains Pick/Omit/Partial, compile-time/runtime limits, a walkthrough, explained check and applied exercise. Detailed per-chapter evidence and outdated sample caveats are in FULL_SOURCE_CONTENT_AUDIT.md. Source parity is still partial; legacy HTML remains intact.


## js-deep-dive.html full-read checkpoint — 2026-10-26

Completed the full 2,334-line read, including three playgrounds, the interactive lookup tracer, nine quiz questions and five numbered exercises (the page advertises six). The audit records source inaccuracies and block-level mapping. Added bilingual class semantics/private state/super/static/prototype walkthroughs and applied practice to js.object-prototypes. Source interaction parity is partial and the HTML remains intact.


## CI correction in progress — 2026-10-26

CI run [40286184091](https://github.com/Mardakhay/interactive-guides/actions/runs/40286184091) on TypeScript utility-type content failed because an existing translation test still expected four quiz blocks after the lesson gained its fifth knowledge check. The lesson and quiz are retained; this follow-up updates the invariant to five and adds targeted coverage. The associated class-lesson/source-audit work also remains pending CI verification.


## Exact CI checkpoint — 2026-10-26

Feature SHA 6b92bb9a0d70fdd299c0ae72bf864392f5b27d99 passed lint, typecheck, all tests and production build in GitHub Actions run [40286622209](https://github.com/Mardakhay/interactive-guides/actions/runs/40286622209). This includes the TypeScript quiz-count correction and new class-model lesson tests. Source audit remains incomplete: four of 25 HTML files have full reads documented; 21 Notion fetches remain marked unverified and complete source-to-block parity is open. Legacy HTML routes/files remain; JSON cutover and Supabase work have not started.


## Continuation update — 2026-10-26 (API hooks source pass)

The complete 3,031-line `react-api-hooks-lesson.html` was read, including its quiz and five practice tasks. This brings the full-read count to 5 of 25 inventoried HTML sources (react-forms-tutorial, react-ecosystem-course, intro.dev, js-deep-dive, react-api-hooks). `react.api-custom-hooks` v4 adds a bilingual debounce model, a line-checked timer-cleanup walkthrough, feedback-rich check and race-safe search exercise. This closes that identified topic gap, but not full legacy interaction parity, the remaining HTML sources, or Notion verification. Debounce source-specific checks are included; exact-head CI remains pending for this updated test correction.


## Schema validation correction — 2026-10-26

The first debounce-content CI run (`80d84f0da72078976524abadb9860f0fe8c65476`, [run 40287373963](https://github.com/Mardakhay/interactive-guides/actions/runs/40287373963)) passed lint/typecheck but failed runtime schema validation: the newly added quiz used legacy field names and omitted option IDs. The quiz is corrected to the renderer's required `questionType`, `prompt`, and ID-bearing option schema in both locales. The line-range test's newline split is also now verified as a real newline delimiter. Follow-up CI is pending.


## Continuation update — 2026-10-26 (React hooks source pass)

The full 2,491-line `react-hooks-guide.html` has now been reviewed, including its five quiz questions, four editable code challenges, tab variants and lifecycle simulator behavior. This brings full HTML reads to 6 of 25. `react.effects-lists-composition` v4 adds a bilingual filter/sort/map walkthrough that keeps derived values out of state, sorts a fresh filtered array, uses stable keys and includes a feedback-rich check plus applied coding task. Source claims that an empty dependency array always means exactly once and unstable keys simply rerender everything are explicitly corrected by the structured lesson's Strict Mode and identity explanations. Legacy UI interaction parity and other sources remain open.


## EN/RU assertion correction — 2026-10-26

The v4 lesson content is bilingual and block-aligned. The first follow-up CI on `71c89b215defd8e719d9a16557e68e6b2cf62513` failed because the quiz check on both translations had not been incremented; the subsequent source-content commit also retained old RU block-count expectations. Both exact CI logs identify assertions only (`40287582166`, `40287881297`); no schema, typecheck or lint failure. Test expectations now count matching EN/RU additions. Re-run CI on the corrected exact head before reporting green.


## Assertion precision update — 2026-10-26

CI run [40288097099](https://github.com/Mardakhay/interactive-guides/actions/runs/40288097099) confirmed all schemas and unrelated suites pass, then found two over/under-counted assertions: the new RU list walkthrough increased its count to six, and cancellation guidance belongs to the walkthrough's explanation rather than the debounce snippet's executable code. Tests now assert the bilingual count and verify `AbortController` in the step explanation. These were test expectation defects; content remains unchanged.


## Audit continuation — 2026-10-26

Notion discovery returned 21 relevant pages (all are retrievable; all currently carry Notion connector status `unverified`). The complete 4.1–4.30 content of [Part 4](https://app.notion.com/p/3ba855c6fbb08075a08ef30c3ac20d89) has now been read section-by-section; its source matrix is split by routing, forms, shared state/Context/hooks, API state and integrated pitfalls. Other pages have been fetched and their titles/section outlines inventoried, but must not be reported as fully source-mapped until examples, caveats and practice are reviewed. Six of 25 HTML sources have full lesson-content reads. The React hooks source added the filter/sort/map walkthrough; the API source added debounced search and race safety. Feature code SHA `8fa4885ea09423c6901084c2da50704a5aa7a4d5` passed CI [run 40288265138](https://github.com/Mardakhay/interactive-guides/actions/runs/40288265138) (lint, typecheck, tests and build). This is an exact code checkpoint; the documentation-only update now being committed requires its own exact-head CI.


## Source-audit continuation — 2026-10-26

Completed a full-content and interaction review of `public/lessons/js-memory-mastery.html` (source 7 of 25 fully studied). Its useful lessons on object identity, nested copy behavior, closure retention and memory diagnosis are now embedded in both `js.runtime-memory` JSON locales. The new lesson explicitly separates ECMAScript guarantees from engine-specific physical memory/optimization claims, and adds a repeatable DevTools investigation plus an immutable-update exercise. Source-specific coverage and deliberate corrections are recorded in `FULL_SOURCE_CONTENT_AUDIT.md`; full-source completion remains open (7/25 HTML files, and Notion connector verification remains unverified).


## Source audit continuation — 2026-10-26

Completed full text/code/interaction review of `public/lessons/react-usestate-guide.html` (source 8/25). Its core topics already have deep EN/RU coverage in `react.components-jsx-state`, `react.forms-validation` and `typescript.fundamentals`; exact evidence and residual interaction gap (no migrated remote AI grader) are in `FULL_SOURCE_CONTENT_AUDIT.md`. No duplicate lesson was added. Remaining source-parity and editorial gates remain open; HTML cutover and Supabase have not started.

## Source audit continuation — 2026-10-26

Completed the full content/interaction review of `internet-fundamentals.html` (source 9/25). Added bilingual hosting resource/model trade-offs, feedback check and architecture exercise to `deployment.production-hosting`; updated TLS 1.3 references to RFC 9846. The source-to-block evidence and deliberate corrections to legacy claims are in `FULL_SOURCE_CONTENT_AUDIT.md`. Sixteen HTML sources and the Notion parity gate remain open; no HTML cutover or Supabase work has started.


## Full-content review checkpoint — 2026-10-26

- Fully reviewed HTML source 10/25: `public/lessons/git-workflow-cicd-guide.html` (1,977 lines; 99226 bytes), including all tabs, branch canvas transitions, CI simulator/failure injection, annotated workflow, MR/review examples and 10 quiz questions/feedback.
- Existing bilingual `git.fundamentals` and `git.workflow-ci` lessons cover its content in depth; no duplicate lesson was warranted. Matrix evidence records exact blocks and remaining visual-interaction parity.
- Corrected/documented legacy issues rather than copying them: Git Flow is not universal, PR line thresholds are heuristics, simulator deployment-before-merge conflicts with its YAML, and its floating `@master` action lacks explicit least-privilege permissions.
- 10/25 HTML sources fully reviewed; 15 remain. Current code/test SHA `3156a29de9b951bfd5b25322c2a40bbefa525ac2` passed CI run [40290215609](https://github.com/Mardakhay/interactive-guides/actions/runs/40290215609). Earlier lint failure from a missing test-suite brace was fixed and this run validates the corrected head.


## Full-content review checkpoint — 2026-10-26

- Fully reviewed HTML source 11/25: `public/lessons/css-reference.html` (101171 bytes; 1,435 lines), including code snippets and sidebar search, copy buttons, transition controls, Flexbox/Grid playgrounds, and responsive navigation.
- CSS fundamentals and Flexbox/Grid lessons already cover the substantive topics in both locales, with deeper cascade, box sizing, margin collapse, overflow/intrinsic sizing, reduced motion, accessibility and responsive diagnosis than the reference source. Matrix records exact block evidence; no duplicate lesson was created.
- UI parity is partial because the reference copy/property playground is not recreated as a visual simulator; practice, feedback and debugging move to structured blocks.
- Full HTML source reviews: 11/25; 14 remain. Docs HEAD `e3997b2232158f5433ab6e3ffa78ee8dfb6b57f6` passed CI [40290564642](https://github.com/Mardakhay/interactive-guides/actions/runs/40290564642).


## Local-data backup/export-restore checkpoint — 2026-10-27

- Implemented `/backup` with bilingual copy and sidebar navigation. The versioned JSON v1 includes progress, bookmarks, notes, classic quiz results, and structured lesson attempts/drafts/checklists/section progress.
- Import validates the format and dataset schemas before writing, previews record counts, requires explicit confirmation, replaces rather than merges data, writes the canonical structured-learning v2 record, and removes the legacy record after successful writes. On a failed write it attempts to restore prior raw values and reports if rollback itself fails.
- Exact-head CI passed for code commit `73a47b96b1c0fc00d454c0cd955f24514bb32024` in run [40487424471](https://github.com/Mardakhay/interactive-guides/actions/runs/40487424471). This documentation sync is separate from that already validated code commit.
- Phase 5 is still partial: repositories are not all independently versioned, migration/retry behavior needs broader tests, and browser-specific download/import smoke tests are outstanding. Supabase remains gated.

## Versioned local-store checkpoint — 2026-10-27

- Added `src/lib/versionedStorage.ts`; progress, bookmarks, notes and classic quiz results now store `format: interactive-guides-local-store`, `schemaVersion: 1`, `data` envelopes.
- Valid legacy raw JSON is read and then migrated through a single-key replace. If the write fails, the old raw value is preserved and the state is returned in memory; the next read retries. Invalid data and unknown schema versions are not overwritten.
- The portable backup file remains its own v1 format. Export accepts current envelopes and old raw data; restore writes current store envelopes plus the structured-learning v2 envelope, removing the legacy structured key only at the end.
- Exact-head CI passed on code commit `3b6bb04caf338282f1f8f52d8724d11f7792b7a3`, run [40489627861](https://github.com/Mardakhay/interactive-guides/actions/runs/40489627861). Phase 5 remains partial until action-level store tests and browser/device smoke checks are done.

## Learner-store action test checkpoint — 2026-10-27

- Added `src/features/persistence/storePersistence.test.ts`: store actions persist versioned envelopes for progress, bookmarks, notes and classic quiz results; tests exercise progress status transitions, duplicate bookmark avoidance/toggle removal, blank-note deletion, and quiz save/clear.
- The shared versioned-storage tests separately cover legacy migration, failed migration writes and retry, malformed/future version records, and storage read/write errors. Backup tests cover current/legacy input and restore envelopes.
- Exact-head CI passed on code commit `0fd1b488a2a6ea1b1c7c54eda5194b3bb3f4393c` in run [40490205475](https://github.com/Mardakhay/interactive-guides/actions/runs/40490205475). Browser/device file picker and download smoke checks remain open.

## Local/cloud reconciliation design checkpoint — 2026-10-27

A draft field-specific policy now exists in `docs/LOCAL_CLOUD_RECONCILIATION.md`. It inventories current local record shapes and missing metadata (per-record revisions, mutation IDs and deletion tombstones), proposes conservative entity-by-entity conflict rules, and lists unit/RLS/integration acceptance scenarios. This is design work only: Phase 6 remains unchecked, Supabase/auth/sync remain unimplemented, and product decisions such as note opt-in and classic quiz history still require review.

## Local-first recovery test checkpoint — 2026-10-27

- [x] Test the `/backup` page when a restore write fails but the previous raw values roll back successfully.
- [x] Test the `/backup` page when both a restore write and rollback of a previously written key fail, including the urgent recovery message and unchanged in-memory stores.
- [ ] Perform native-browser/device smoke tests for storage privacy/quota, file picker, downloaded file, and restore recovery.
- Exact-head CI passed on `c3208ddac964003dd6c119e9fb41a8b78c601435` (run [40497324096](https://github.com/Mardakhay/interactive-guides/actions/runs/40497324096)). Phase 5 remains not release-accepted until manual browser/device results are recorded.

## Backup export and rollback test checkpoint — 2026-10-27

- [x] Verify exported Blob contents: backup format/version, included note data and exact dataset surface, with UI preferences excluded.
- [x] Verify corrupt stored state refuses to export a partial backup and presents the error alert.
- [x] Verify failure while removing the legacy structured-learning key rolls back all previous raw keys.
- Exact-head CI passed on `814c4d6f51deefb8f8904a4a3a15321aa537d233` (run [40497807964](https://github.com/Mardakhay/interactive-guides/actions/runs/40497807964)). The export test reads Blob contents through `FileReader` because the configured jsdom Blob does not implement `.text()`.
- [ ] Native desktop/mobile browser acceptance is still open for real quota/privacy restrictions, system file picker and the resulting downloaded JSON file. Phase 5 is not release-accepted until those results are recorded.

## Structured-learning migration cleanup validation — 2026-10-27

- [x] Verify legacy structured-learning data is preserved if the new v2 record write fails.
- [x] Verify if writing succeeds but removing the legacy key fails, the new envelope remains valid, the legacy source is preserved and a storage-removal error is reported.
- Exact-head CI passed on `9fb38aa1252e6a8f9191b777889b3c8cbe1229dc` (run [40498451420](https://github.com/Mardakhay/interactive-guides/actions/runs/40498451420)).
- [ ] Run native browser/device checks for privacy/quota restrictions, file picker/download and recovery. Automated Storage mocks do not close these acceptance items.

## Restore snapshot-read guard — 2026-10-27

- [x] Verify that a read failure while snapshotting pre-restore storage aborts before any writes/removals and preserves every raw key.
- Exact-head CI passed on `b9f500ee8509a986c12b0babd25a2c9947183a90` (run [40498940471](https://github.com/Mardakhay/interactive-guides/actions/runs/40498940471)).
- [ ] Actual desktop/mobile browser tests for storage privacy/quota and native file picker/download remain open. Storage API mocks do not close these acceptance items.


## Lazy lesson bundle and regression budget — 2026-10-27

- [x] Replace static imports of all structured lesson JSON bodies with a lightweight bilingual metadata manifest and on-demand dynamic imports.
- [x] Convert the structured lesson page to async load states and update repository/renderer tests for lazy imports.
- [x] Verify exact-head CI on `55644ccf50f14bcaab796bd6058b25297b621d16` ([run 40504186937](https://github.com/Mardakhay/interactive-guides/actions/runs/40504186937)); 181/181 tests passed.
- [x] Measure production output: repository chunk fell from 2,363.77 kB / 784.88 kB gzip to 54.26 kB / 17.15 kB gzip (about 97.8% lower gzip size). Entry chunk is 280.15 kB / 92.89 kB gzip.
- [x] Add a CI-enforced bundle budget for entry/repository chunks and verify it in exact-head CI (run [40506040390](https://github.com/Mardakhay/interactive-guides/actions/runs/40506040390)); entry 280.15 kB raw / 92.90 kB gzip and repository 54.26 kB / 17.15 kB gzip pass.
- [ ] Execute W-03 on real supported browsers/devices: verify revisiting an online-loaded lesson offline and the visible failure for a never-visited lesson. Lazy chunks are runtime-cached after first fetch, not precached.


## Dependency audit triage — 2026-10-27

- [x] Expose detailed `npm audit` findings in CI without making the existing known vulnerabilities silently disappear or breaking the current delivery pipeline before triage.
- [x] Read the latest exact-head CI audit output and record direct/transitive status, affected ranges and fix targets in `CURRENT_STATE.md`; dependency remediation remains open.
- [x] Apply compatible tooling and router updates with a regenerated `package-lock.json`; controlled CI passed lint, typecheck, all 182 tests, production build and bundle budgets.
- [x] Reassess the dependency graph: current `npm audit` reports 0 findings. Keep the audit diagnostic in CI and re-evaluate future advisories against the installed lockfile.


## Security dependency triage — 2026-10-27

- [x] Add a non-blocking CI report of detailed npm audit advisories.
- [x] Update direct Zod to 4.6.7 within major version 4 to address GHSA-mrhx-c7xc-m3w5 (`<4.6.6` affected; `4.6.6` patched).
- [x] Verify Zod 4.6.7 on exact-head CI [run 40506040390](https://github.com/Mardakhay/interactive-guides/actions/runs/40506040390); audit report fell from 12 to 11 findings and no longer lists Zod.
- [x] Upgrade Vite to 8.3.5, `@vitejs/plugin-react` to 6.1.2 and Vitest to 4.1.12; CI runs under Node 22 and validates build/test compatibility.
- [x] Upgrade React Router DOM to 7.18.0, align the legacy ecosystem lesson and bilingual SPA routing lesson to v7, and add a package/source compatibility regression test.


## Dependency-refresh validation — 2026-10-27

- Upgraded the top-level toolchain/router to `vite@8.3.5`, `@vitejs/plugin-react@6.1.2`, `vitest@4.1.12`, and `react-router-dom@7.18.0`; kept React 18 and Zod 4.6.7.
- Controlled migration CI [run #40536336285](https://github.com/Mardakhay/interactive-guides/actions/runs/40536336285) passed install, lint, typecheck, 182 tests/30 files, production build and the bundle-budget script; `npm audit` reports 0 findings for the tested graph. The generated lockfile is committed as `59432ad63d24d2ab0e37267091ce4de2f59a0d69`.
- Entry bundle is 211.08 kB raw / 68.05 kB gzip and lesson repository is 61.22 kB raw / 16.81 kB gzip; all 125 JS chunks pass their limits. CI uses Node 22 and pinned npm 11.21.1.
- The one-time lockfile-writing helper is removed in the cleanup commit and normal PR CI will verify the final workflow. Native browser/device acceptance, Notion formal verification and JSON-only learner-route cutover remain open.

## Legacy route and learner-state cutover gate — 2026-10-27

- The classic catalog has 25 IDs; the structured curriculum/manifest has 44 different IDs. They are distinct namespaces, not direct aliases.
- Progress, bookmarks and notes are maps keyed by `lessonId`. A one-to-many topic mapping is insufficient by itself: decide whether to migrate status/bookmarks/notes to one target, split notes, retain legacy IDs or keep the old route. Do not silently clone or discard learner state.
- A new loader regression test requires every catalog entry to resolve either non-empty embedded content or an existing local HTML fallback. It protects route renderability but is not content-equivalence certification.
- Before cutover, produce a reviewed crosswalk for all legacy IDs, test preservation/migration for learner-data stores, and explicitly retain the source route for items whose coverage remains partial. Supabase stays behind this gate.

## Candidate crosswalk checkpoint — 2026-10-27

- [x] Produce a reviewable candidate map for all 25 classic catalog IDs in [LEGACY_ROUTE_CUTOVER_MATRIX.md](./LEGACY_ROUTE_CUTOVER_MATRIX.md).
- [ ] Review every candidate against actual EN/RU target content, exercises/answers and unresolved source interactions.
- [ ] Specify and test per-store learner-state migration or explicit legacy-record retention before redirect; do not use topic overlap as an identity mapping.


## Structured learning-path route coverage — 2026-10-28
- [x] Add `structured-javascript-mastery` (core syntax, functions/objects, prototypes, runtime/memory, async requests, DOM events) with a Russian translation and exact-step integration tests. Classic `javascript-mastery` stays untouched.
- [x] Verify exact-head CI on `49709e30ebc42be909e739a971d40b753fc011e5`: [run #40646714866](https://github.com/Mardakhay/interactive-guides/actions/runs/40646714866) passed install, lint, typecheck, 209 tests / 33 files and production build.

- [x] Add separate structured Frontend Foundations and React paths using canonical lesson IDs; preserve the existing classic paths and their stored IDs.
- [x] Resolve classic and structured lesson routes in the detail view, respecting the selected UI locale, existing progress records and bookmark store.
- [x] Validate that each configured path step references an existing classic or structured lesson; render an explicit unavailable-step state rather than hiding unknown IDs.
- [x] Add integration/regression tests for path progress, locale-aware links, bookmarks, localization and legacy route preservation. Exact-head CI passed on `1f186fba06e4c37f32cd522d9a256adc344019ae` in [run #40646447483](https://github.com/Mardakhay/interactive-guides/actions/runs/40646447483) (209 tests / 33 files plus production build).
- [ ] Continue detailed source-to-lesson parity review in syllabus order. Separate IDs and successful route resolution do not establish content equivalence.
- [ ] Complete real-browser, screen-reader and mobile acceptance; these checks are not covered by CI.



## Targeted source-parity batches — 2026-10-28

- [x] Add a bilingual Git command reference, including branch lifecycle, fetch vs pull, explicit protected-branch caution, and regression assertions.
- [x] Align the bilingual GitHub Actions YAML example with the actual repository workflow: Node 22, npm 11.21.1, least-privilege contents-read permission, install/lint/typecheck/test/build checks.
- [x] Add a bilingual semantic h1–h4 hierarchy example with aria-labelledby and a test for walkthrough line ranges.
- [x] Cover specialized HTML input types and document security limits for file accept and hidden fields; add a knowledge check and official MDN references.
- [x] Verify exact-head CI on 7d07400922a0c6540c7f77e3776ce674fd5614c4: [run #40648289992](https://github.com/Mardakhay/interactive-guides/actions/runs/40648289992), 210 tests / 33 files plus production build.
- [ ] Continue topic-by-topic review of remaining source gaps, interactive behavior, and EN/RU editorial equivalence. This checkpoint does not complete Phase 4 or unblock route cutover.
- [ ] Complete recorded real-browser/device and screen-reader acceptance; automated CI is not a substitute.



## PWA runtime-cache scope hardening — 2026-10-28

- [x] Restrict service-worker runtime caching to same-origin Vite assets under `/assets/`; extension-looking root routes are no longer runtime-cached.
- [x] Bump the cache namespace to v6 and add a regression assertion that the path guard precedes extension matching.
- [x] Verify exact-head CI on `b5a0f8fbcac903eaea3d415b1698eadc659521d0`: [run #40648789939](https://github.com/Mardakhay/interactive-guides/actions/runs/40648789939) passed install, lint, typecheck, tests and production build.
- [ ] Verify install, offline revisit, never-visited lesson, deep-link reload and update acceptance in real supported browsers/devices and record the results.



## Learner-controlled PWA update deferral — 2026-10-28

- [x] Add localized Update now / Later controls to the service-worker update prompt.
- [x] Keep the new worker waiting when the learner defers; re-check the waiting registration when the tab becomes visible.
- [x] Add regression tests for deferral, non-activation, re-prompt, explicit SKIP_WAITING and Russian copy. Exact-head CI passed on `caaea3fdff52a420ebd64f3e4c1ff55eea58b36e` in [run #40649159828](https://github.com/Mardakhay/interactive-guides/actions/runs/40649159828).
- [ ] Validate update deferral and activation in a real browser while a note or coding exercise contains unsaved work; record browser/OS and tested SHA.



## CSS positioning parity batch — 2026-10-28

- [x] Add EN/RU explanations of static/relative/absolute/fixed/sticky positioning, containing blocks and stacking contexts.
- [x] Add a worked badge/card and sticky-banner walkthrough, plus a knowledge check and MDN position/z-index references.
- [x] Verify exact-head CI on `ecb1c8e5546ec543428af241a4f7eb59fe00d4cb`: [run #40649649155](https://github.com/Mardakhay/interactive-guides/actions/runs/40649649155) passed all tests and production build.
- [ ] Continue reviewing remaining source gaps and interactive behavior; this does not complete the CSS source migration or replace real-browser responsive/accessibility acceptance.




## Git README and ignore-pattern parity batch — 2026-10-28

- [x] Upgrade `git.fundamentals` EN/RU to v6 with precise `.gitignore` comments, glob/range patterns, directory patterns, negation/re-inclusion limits and last-match precedence.
- [x] Upgrade the same lesson to v7 with a bilingual 40-line README walkthrough and an actionable README/GitHub Pages checklist.
- [x] Add bilingual regression checks for schema-valid block shape, locale structure, key syntax rules, README line ranges, deployment/base-path guidance and the official GitHub Markdown reference.
- [x] Verify exact-head CI on `b920e1ef34bf292bde155bc18d203dc03db7827a`: [run #40653287307](https://github.com/Mardakhay/interactive-guides/actions/runs/40653287307) passed 215 tests / 34 files, production build and bundle-budget checks across 125 JavaScript chunks.
- [ ] Continue reviewing remaining source sections and interactive behavior. The classic searchable/copyable reference UI is still not a one-to-one replica; the legacy route and learner-state cutover remain blocked.



## Git CI failure-diagnosis parity batch — 2026-10-28

- [x] Upgrade `git.workflow-ci` EN/RU to v6 with a localized matrix for diagnosing install, lint/typecheck, tests, production build and deployment-stage failures.
- [x] Add a bilingual single-choice knowledge check that rejects force-merging a failed build or relying on a green run from an older commit.
- [x] Add regression assertions for schema validity, EN/RU block parity, unique IDs, the expected answer and feedback quality.
- [x] Verify exact-head CI on `ccf839c806369d9e151e4f24b430ac24f3c4c936`: [run #40653842673](https://github.com/Mardakhay/interactive-guides/actions/runs/40653842673) passed 215 tests / 34 files, production build and bundle-budget checks across 125 JavaScript chunks.
- [ ] Review the remaining legacy animated branch canvas and failure-injection simulator; this educational diagnosis matrix is not a one-to-one interaction replica.



## Bilingual capstone and learning-path localization — 2026-10-28

- Added `structured-capstone` as a six-step path over registered lessons: requirements discovery, architecture planning, implementation, Testing Library checks, production deployment, and review/demo. Existing lesson IDs and classic paths are unchanged.
- Localized all 46 configured step notes into Russian using the composite `<path-id>.<lesson-id>` key, so the same lesson can carry a path-specific explanation. Regression tests iterate every configured step and reject English-note fallback.
- Fixed the bottom continuation link in the learning-path detail view to use the already resolved destination, preventing structured paths from linking to the classic `/lessons/:id` route.
- README and the authoring guide now describe the bilingual structured-content workflow and clearly document that offline support and source parity still have open acceptance gates.
- CI for the exact resulting HEAD must be checked in the current pull-request run before treating this checkpoint as verified. Real-browser/device, screen-reader, source-parity, and syllabus coverage gates remain open.


## Content quality and Russian localization checkpoint — 2026-10-28

- [x] Add `src/content/lessonQuality.test.ts`: every registered structured lesson is loaded in both locales and every `references` block is checked for duplicate URLs.
- [x] Remove 20 duplicate reference URL entries across the EN/RU pairs for `js.object-prototypes`, `browser.realtime-workers`, `html.forms-accessibility`, `js.collections-weakmaps`, `js.regex-text-processing`, and `testing.react-testing-library`. Preserve localized reference titles where present.
- [x] Fix repeated-value React keys in the structured content renderer so repeated prompts, criteria, list items, or reference URLs do not collide.
- [x] Translate 23 specifically audited prose fields across nine Russian lesson files and add a regression check for those fields. This is targeted coverage, not a claim that every sentence in every Russian lesson has undergone editorial localization review.
- [x] Exact-head CI on `1631c1fc9ed8377ebb5194dc1da78b702c981716` passed: 35 test files / 219 tests, lint, typecheck, production build and bundle budgets. `npm audit` reported zero vulnerabilities. See [run #40679724796](https://github.com/Mardakhay/interactive-guides/actions/runs/40679724796).
- [ ] Keep the broader bilingual editorial/source-parity review open. The automated test protects the audited fields and duplicate-reference invariant; it is not a general translation-quality detector.
- [ ] Real-browser/PWA/offline, screen-reader and mobile acceptance remain unrun and must be recorded from actual target browsers/devices.


## Canonical week-17 UI-library coverage correction — 2026-10-28

- [x] Reconciled the core syllabus with its lesson registry: `ui.bootstrap-mui` covers the week-17 requirement for UI libraries (Bootstrap's responsive grid and Material UI component theming), and its EN/RU lesson records now belong to `month-5-week-17`.
- [x] Kept `css.sass-scss` supplementary. The bilingual supplementary metadata no longer claims Bootstrap/MUI as optional-only core topics; core and supplementary lesson references remain unique.
- [x] Added repository regression coverage: both locales include design-system and UI-library lessons in week 17 in order, UI-library content resolves as core week 17, and Sass/SCSS remains supplementary.
- [ ] The full outcome-by-outcome syllabus review remains open. This change closes one verified mapping gap; it does not certify complete objective coverage, editorial quality, source parity, or browser/device acceptance.


## Registry count update — 2026-10-28

Current authoritative split after the week-17 mapping fix: 27 core lesson IDs + 17 supplementary lesson IDs = 44 IDs total (EN/RU pairs). The previous 26/18 split is superseded. Keep the full learning-outcome audit and legacy route-cutover gates open; one corrected mapping is not full curriculum sign-off.


## Full-registry localization and code verification — 2026-10-28

- [x] Add a full-registry regression for RU titles/descriptions and learning outcomes: all 44 EN/RU lesson pairs must have matching learning-outcome counts, Russian visible metadata and non-identical RU outcome text.
- [x] Translate the two English-only `js.runtime-memory` outcomes and bump both locale files to v5; update the lesson version assertion.
- [x] Exact code/content HEAD `cc68eaa8c28cb9e96a1f348a163fdaa44768b873` passed [CI run #40688503193](https://github.com/Mardakhay/interactive-guides/actions/runs/40688503193): install, lint, typecheck, 221 tests / 35 files, production build, 125 JavaScript chunks within budgets, zero npm audit findings.
- [ ] Keep the full outcome-by-outcome syllabus and source-to-block review open. The guard verifies metadata translation invariants; it does not judge semantic completeness, pedagogy, or every paragraph.
- [ ] Real browser/device, offline/PWA, screen-reader, mobile and legacy-state retention acceptance remain open.


## Cross-locale prose QA follow-up — 2026-10-28

- [x] Add a full-registry regression that compares long user-facing prose in corresponding EN/RU lesson blocks and catches verbatim English left in Russian. Code blocks/references, starter code, CSS property-list references, event-loop traces and code-shaped quiz answers are excluded by design.
- [x] Translate 52 exact-copy English prose strings across eight RU lesson files (workers, IndexedDB, auth/security, modern JS practice/summaries, object invocation, React effects walkthrough, npm/Vite and TypeScript quiz prompts).
- [x] Exact code/content SHA `12059fd51069df3f3126db470cd2f4744cc157ff` passes [CI run #40689939570](https://github.com/Mardakhay/interactive-guides/actions/runs/40689939570): 222 tests / 35 files, lint, typecheck, production build, 125 JS chunk budgets, zero npm audit findings.
- [ ] Keep semantic/editorial RU review and source-to-block parity open: exact-copy detection is not a translation-quality oracle.
- [ ] Real browser/device, offline/PWA, screen-reader, mobile and learner-state cutover acceptance remains open.


## Production preview smoke coverage — 2026-10-28

- [x] Add `npm run smoke:preview` to start the production Vite preview and assert HTTP fallback for four deep routes, built entry JavaScript, manifest/service-worker behavior markers, SVG icon consistency and 180/192/512px PNG asset headers/dimensions.
- [x] Add the smoke stage after `npm run build` in GitHub Actions. Exact code/content SHA `28b5c53afd967d2a2488840b494b197398fe467d` passed [CI run #40691049972](https://github.com/Mardakhay/interactive-guides/actions/runs/40691049972): 223 tests across 35 files, lint, typecheck, production build, 125-chunk bundle budgets, smoke stage, and zero npm audit findings.
- [ ] Keep real-browser/device acceptance open: this check only makes HTTP requests and inspects built artifacts; it does not execute React in a browser, verify real installability, exercise offline caches or confirm assistive-technology/mobile behavior.
- [ ] Review production deployment behavior and record browser/device evidence before release.

## intro.dev focused parity continuation — 2026-10-29

- [x] In `tooling.node-npm-vite` EN/RU v4, add the exact npm 7+ React + TypeScript Vite command (`npm create vite@latest my-app -- --template react-ts`) and a scored question for the `react-ts` template. Add the HMR behavior and valid full-reload fallback with official Vite references.
- [x] Update tooling tests to validate both locale schemas and identical block ordering, version/date, seven knowledge checks, the CLI walkthrough line ranges, correct `react-ts` and HMR answers, and npm/Vite reference URLs.
- [x] Exact code/content SHA `0b20e7cf499c21d8ca3a879a104e11c11d1882f5` passed [CI #40832351304](https://github.com/Mardakhay/interactive-guides/actions/runs/40832351304): 36 test files / 226 tests, lint, typecheck, production build, 125 JS chunk budgets, zero npm audit advisories and preview smoke over four routes and five PWA assets.
- [ ] `tl-003` remains blocked on full bilingual source/interaction parity; the legacy 20-question / 10-exercise interaction set is not recreated one-for-one. Preserve the source and classic route pending content, state-migration and browser/device acceptance.
