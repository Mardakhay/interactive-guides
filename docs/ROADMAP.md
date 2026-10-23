# Implementation Roadmap

Follow this sequence. Each phase should land as a small reviewed change; avoid one giant rewrite.

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
- [ ] Audit remaining uncommon strings and edge states across every route; verify the browser document language and accessible announcements.
- [ ] Review and translate legacy lesson bodies where equivalent Russian source content exists; preserve the route-specific language of structured lessons.
- [ ] Complete the responsive, keyboard and touch-target review across the entire app.
- **Status:** broad partial implementation; phase acceptance is not met until the remaining UI/content and accessibility checks are audited.

## Phase 3 — Structured lesson reader
- [x] Build typed React renderers for the supported structured content-block schema.
- [ ] Add section table of contents, reading progress and accessible code blocks.
- [x] Implement knowledge-check feedback per answer for the supported question schema.
- [ ] Implement practice task UX, attempt capture and hint/solution policies.
- [ ] Gate “mastered” status on required practice evidence where specified.
- Acceptance: lesson pages render without independent HTML documents; exercises remain testable and accessible.
- Suggested commits:
  - `feat(lesson-reader): render structured lesson blocks`
  - `feat(practice): capture quiz and coding attempts`
  - `feat(progress): separate completion from demonstrated mastery`

## Phase 4 — Content migration
- [x] Build a first-pass inventory and structural survey of all 25 current HTML files; detailed parity review is still pending.
- [ ] Extract and rewrite one pilot topic; validate the translation and content depth.
- [ ] Run source/technical review and update the pilot in both locales.
- [ ] Migrate the remaining lessons in small topic batches in syllabus order.
- [ ] Keep all legacy HTML until replacements are reviewed and regression checked.
- Acceptance: no lesson is labelled migrated until both locales, exercises and source links pass review.
- Suggested commits:
  - `content(html): migrate semantic HTML and forms lessons`
  - `content(css): migrate layout and responsive design lessons`
  - `content(javascript): migrate core language lesson series`
  - `content(react): migrate component and hooks lessons`
  - `content(tooling): migrate Git, package and deployment lessons`

## Phase 5 — Local-first data foundations
- [ ] Introduce versioned local repositories and explicit migration/export behavior.
- [ ] Migrate existing progress, notes, bookmarks and quiz data without silent loss.
- [ ] Add tests for malformed state, storage unavailable and migration retry.
- Acceptance: existing saved state survives update or export/import recovery.
- Suggested commit: `refactor(storage): add versioned local repositories`

## Phase 6 — Supabase auth and sync
- [ ] Create SQL migrations and RLS policies.
- [ ] Add environment validation and a no-cloud mode.
- [ ] Implement auth screens, session handling, repository adapters and sync states.
- [ ] Design and test local/cloud conflict reconciliation.
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
- [ ] Configure/review the actual production deployment and add post-deploy smoke checks.
- [ ] Test clean install, deep-link refresh, offline revisit, update activation and external-font fallback in supported desktop/mobile browsers; record browser/OS versions.
- **Status:** technical foundation implemented; not release-accepted until real-browser/device checks are recorded.

## Phase 8 — Capstone and release readiness
- [ ] Build capstone-like guided project path with requirements, user stories, architecture, implementation, tests and deployment.
- [ ] Review all learning outcomes against syllabus.
- [ ] Audit keyboard access, contrast, mobile, bundle size, broken links and stale content.
- [ ] Update project README, screenshots and contributor/content authoring guide.
- Acceptance: complete learning path is usable from a fresh browser, bilingual coverage is measured, and release notes describe limitations honestly.
- Suggested commits:
  - `feat(curriculum): add frontend capstone learning path`
  - `test(e2e): cover core learning and account flows`
  - `docs: document authoring deployment and learner data portability`

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

- **Latest validated application/content snapshot:** `9dfa157ce36123144ad84c2f327abdb41984a3a7` (later commits in this checkpoint update documentation only).
- **CI:** [run #39986177388](https://github.com/Mardakhay/interactive-guides/actions/runs/39986177388) passed dependency install, lint, typecheck, all 102 tests across 22 files, and production build on the exact feature HEAD.
- **Branch/PR:** PR #1 remains open/Draft and mergeable. `main` remains unchanged at `b13af92576e8a73753a6e3f3d26765d9f9c44397`.
- **Structured content:** 26 core + 11 supplementary lesson IDs, EN/RU, 74 locale JSON files. The full legacy source set of 25 HTML files remains. Source parity/editorial review is in progress.
- **Recent lesson improvements:** `css.fundamentals` v3 / 53 blocks / 110 min; `git.fundamentals` v3 / 38 blocks / 95 min; `git.workflow-ci` v3 / 37 blocks / 110 min. All remain `review` status; matching structural IDs and passing CI do not prove complete source parity.
- **App-wide localization:** broadly implemented across common navigation/content-management screens, lesson metadata/navigation and quiz/search states, but remaining strings, legacy lesson content and less-common states still need review.
- **PWA:** icons, manifest, service worker, explicit update prompt and SPA fallback are implemented; device/browser acceptance is not.
- **Local data and cloud:** migration/export-import remain incomplete; Supabase auth/sync is not started.
- **Build/security follow-up:** `npm ci` reported 13 dependency audit findings (8 moderate, 3 high, 2 critical); build warns about a large chunk, and React Router emits future-flag warnings. Triage these separately; do not run a blind `npm audit fix --force`.

The release acceptance gates remain open. Keep this roadmap as a work plan and do not mark the product complete.
