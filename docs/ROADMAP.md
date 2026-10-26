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
