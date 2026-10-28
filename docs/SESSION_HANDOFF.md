# Session Handoff

**Last updated:** 2026-10-28  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch created:** `feat/learning-platform-foundation`

## Authoritative handoff — current state and next work — 2026-10-28

This section supersedes the older "current continuation" labels below when they conflict. The remaining sections are a chronological implementation log; prior code/content checkpoint SHAs are historical.

- Current feature branch: `feat/learning-platform-foundation`; [PR #1](https://github.com/Mardakhay/interactive-guides/pull/1) remains open as Draft against `main`. Before this documentation refresh, HEAD was `283305ddb174ee4430ac4da69e4aa98187dddb0c`.
- Exact-head CI before this documentation refresh: [run #40701225217](https://github.com/Mardakhay/interactive-guides/actions/runs/40701225217) passed on `283305d`: install, lint, typecheck, 223 tests / 35 files, production build, all 125 JS bundle budgets, production-preview HTTP smoke and npm audit (0 vulnerabilities). The smoke stage is not browser acceptance.
- Registry: **27 core + 17 supplementary = 44 structured lesson IDs**, each with English and Russian records. `ui.bootstrap-mui` is core week 17; `css.sass-scss` remains supplementary.
- All 25 legacy HTML sources have a documented full content/code/interaction review, but all 25 crosswalk rows remain **Blocked** pending destination parity, explicit treatment of non-equivalent interactions, and learner-state migration/retention decisions. Keep `/lessons/:lessonId` and all source HTML in place.
- 21 Notion pages were fetched/mapped, but their verification metadata remains `unverified`. CI guards copied English prose and selected structural/localization contracts; it does not prove semantic translation quality or curriculum completeness.
- Deploy preview: https://deploy-preview-1--interactive-guides.netlify.app. The CI smoke confirms HTTP routing/assets only. No real-browser/device, screen-reader or mobile acceptance is claimed.

### Recommended continuation order

1. Work through `docs/LEGACY_ROUTE_CUTOVER_MATRIX.md` topic-by-topic. For each legacy ID, verify actual EN and RU destinations against source sections, examples, code, quizzes, answer feedback, references and interactive behavior; record gaps and a reviewed disposition. Do not mark a row ready from ID overlap or green CI alone.
2. Inventory and test record semantics for progress, bookmarks, notes, last-opened pointers and classic quiz-result keys. Decide what remains on the classic route and only migrate/redirect where mapping is unambiguous and tested.
3. Run `docs/BROWSER_SMOKE_TEST_CHECKLIST.md` on a clean feature-branch checkout with synthetic data; record exact SHA, browser/version, OS/device, network mode and evidence. Exercise backup/export/import, storage restrictions, deep links, offline-loaded versus never-visited lessons, service-worker update deferral with unsaved input, mobile focus/reflow and screen-reader/keyboard flows.
4. Complete the 24-week learning-outcome audit and remaining EN/RU semantic editorial/accessibility review; update screenshots and deployment evidence.
5. Treat Supabase as a separate gated stream: do not begin sync implementation until its scope is confirmed and local/cloud reconciliation, migrations/RLS, no-cloud mode and cross-user isolation/account cleanup are specified.

The next change should close one specific, evidence-backed parity or acceptance gap, not add generic tests that merely restate already-covered invariants. After this documentation-only change, check the Actions run for the new resulting SHA before reporting the refresh as exact-head CI-verified. No local test or native browser/device run is claimed here.


## Previous continuation — CI failure diagnosis in the structured Git workflow lesson (superseded) — 2026-10-28

- Latest verified code/test HEAD: `ccf839c806369d9e151e4f24b430ac24f3c4c936`; exact-head GitHub Actions [run #40653842673](https://github.com/Mardakhay/interactive-guides/actions/runs/40653842673) passed install, audit diagnostics, lint, typecheck, all 215 tests across 34 files, production build, and bundle-budget checks across 125 JavaScript chunks.
- Updated `git.workflow-ci` EN/RU to v6 with a diagnosis matrix distinguishing install/lockfile, lint/typecheck, test, production build and deploy-stage failures. Added a localized knowledge check that requires inspecting the failed build log, fixing the concrete cause and validating the new SHA rather than bypassing a failed gate.
- Kept the legacy Git route, stored user data and lesson identity unchanged. The exercise is structured explanatory content, not a replica of the legacy canvas/failure-injection simulator.
- The Git Reference README and `.gitignore` work remains documented in the previous continuation. Exact-head CI for it passed on [run #40653287307](https://github.com/Mardakhay/interactive-guides/actions/runs/40653287307).
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains Draft. No local checkout/test or real-browser/device/screen-reader acceptance is claimed.
- Next: continue source-parity batches and route/accessibility checks; do not redirect old lesson IDs or discard learner state until equivalence and per-store retention have been reviewed. Supabase remains gated by approved reconciliation and RLS isolation tests.

## Previous continuation — Git README and ignore-pattern parity (superseded) — 2026-10-28

- Latest verified code/test HEAD: `b920e1ef34bf292bde155bc18d203dc03db7827a`; exact-head GitHub Actions [run #40653287307](https://github.com/Mardakhay/interactive-guides/actions/runs/40653287307) passed install, audit diagnostics, lint, typecheck, all 215 tests across 34 files, production build and bundle-budget checks across 125 JavaScript chunks.
- Updated `git.fundamentals` EN/RU to v7 without changing its canonical lesson ID or route. The new `.gitignore` reference explains leading comments, glob and bracket-range patterns, directory suffixes, negation/re-inclusion limits and last-match precedence.
- Added a bilingual 40-line README walkthrough covering purpose, features, technology, requirements, reproducible setup/check commands, contributing, deployment, license and credits. The publishing checklist qualifies GitHub Pages behavior and asks learners to verify the configured source/workflow, build output, base path and deployment status.
- Regression tests verify EN/RU block parity, `.gitignore` semantics, README line ranges, deployment guidance and the official GitHub Markdown documentation reference. The earlier v6 schema/version correction separately passed [run #40652795308](https://github.com/Mardakhay/interactive-guides/actions/runs/40652795308).
- Remaining on this source: the classic reference's searchable command catalogue, copy buttons and accordion presentation are not reproduced one-to-one. The legacy route/state cutover stays blocked; no saved learner data has been migrated or discarded.
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains Draft. No local checkout/test, real-browser/device, or screen-reader acceptance is claimed.
- Next: continue targeted source-to-block review in syllabus order and address the highest-value content/interaction gaps. Keep legacy routes and records until equivalence and per-store retention decisions are reviewed. Supabase remains gated by approved reconciliation and RLS isolation tests.

## Previous continuation — CSS positioning parity (superseded) — 2026-10-28

- Latest verified code HEAD: `ecb1c8e5546ec543428af241a4f7eb59fe00d4cb`; exact-head GitHub Actions [run #40649649155](https://github.com/Mardakhay/interactive-guides/actions/runs/40649649155) passed npm ci, audit diagnostics, lint, typecheck, tests and production build.
- Updated `css.fundamentals` EN/RU to v5. The positioning section explains static, relative, absolute, fixed and sticky, containing-block selection and stacking-context limits; its walkthrough shows an absolute badge anchored to a relative card and a sticky banner. Tests check line ranges, the correct answer and official MDN references.
- PWA work is also code-verified: runtime cache restricted to `/assets/` under cache v6; the service-worker update prompt offers localized Later without activating/reloading and re-prompts when the tab becomes visible. Exact-head CI for that defer flow passed in [run #40649159828](https://github.com/Mardakhay/interactive-guides/actions/runs/40649159828).
- Still open: legacy CSS interactive Flexbox/Grid/transition demos are not reproduced one-to-one; responsive layout and service-worker lifecycle require real-browser/device acceptance, which has not been executed or recorded.
- Legacy route mappings remain provisional, learner-state migration policy remains open, Notion pages remain `verification.state=unverified`, and Supabase is gated on approved reconciliation and RLS testing. `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains Draft.

## Previous continuation — learner-controlled PWA update deferral (superseded) — 2026-10-28

- Latest verified code HEAD: `caaea3fdff52a420ebd64f3e4c1ff55eea58b36e`; exact-head GitHub Actions [run #40649159828](https://github.com/Mardakhay/interactive-guides/actions/runs/40649159828) passed npm ci, audit diagnostics, lint, typecheck, tests and production build.
- The service-worker prompt now offers localized `Update now` and `Later`. Later hides the prompt without sending `SKIP_WAITING`, activating the waiting worker or reloading; when the tab becomes visible later, the component rechecks the waiting registration and presents the choice again. Added tests for defer, non-activation, re-prompt, explicit activation messaging and Russian copy.
- Runtime caching is restricted to Vite assets under `/assets/`; cache namespace v6 clears older v5 entries on activation. These code contracts have CI coverage but have not been checked in a real browser/device.
- Still open: perform W-01 through W-05 on supported desktop/mobile browsers, including online-to-offline revisit, unvisited-lesson offline behavior, deferral while a note/draft is unsaved, and reload only after controllerchange. No browser/device evidence is recorded.
- Content parity remains focused, not complete; all 25 legacy mappings are provisional, learner-state migration decisions remain open, Notion pages remain `verification.state=unverified`, and Supabase is gated on approved reconciliation and RLS testing. `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains Draft.

## Previous continuation — PWA runtime-cache hardening (superseded) — 2026-10-28

- Latest verified code HEAD: `b5a0f8fbcac903eaea3d415b1698eadc659521d0`; exact-head GitHub Actions [run #40648789939](https://github.com/Mardakhay/interactive-guides/actions/runs/40648789939) passed `npm ci`, audit diagnostics, lint, typecheck, all tests, and production build.
- Fixed an over-broad service-worker runtime cache rule: non-navigation requests must now be under `/assets/` before the extension allowlist is considered. This prevents arbitrary same-origin paths that happen to end in `.json`, `.js`, `.png` and similar extensions from being runtime-cached. Cache namespace bumped v5 → v6 so older entries are cleared during activation.
- Added test protection for cache v6 and for path-scope check ordering. The existing offline model remains unchanged: app shell is precached, Vite chunks are cached after a successful online load, and an unvisited lesson is not guaranteed offline.
- No real-browser/device acceptance has been performed; W-01 through W-05 remain manual release gates. Do not describe the application as device-tested or PWA release-ready based on CI.
- Recent targeted content parity improvements remain recorded below/in the source audit. Legacy route mappings are still provisional; no lesson route cutover or learner-state migration has been performed. Notion pages remain `verification.state=unverified`, and Supabase is still gated by approved reconciliation policy and RLS isolation tests.
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains Draft. Next: continue review of runtime/offline edge cases and content parity, then run the browser/device checklist in a real supported environment.

## Previous continuation — targeted EN/RU content parity (superseded) — 2026-10-28

- Verified code HEAD: 7d07400922a0c6540c7f77e3776ce674fd5614c4. Exact-head GitHub Actions [run #40648289992](https://github.com/Mardakhay/interactive-guides/actions/runs/40648289992) passed npm ci, audit diagnostics, lint, typecheck, all 210 tests across 33 files, and production build/bundle budget.
- Updated git.fundamentals EN/RU to v5 with a safe command quick reference (clone, branch create/list/delete, merge, diff/staged diff, fetch, pull --ff-only, push and revert) and a question distinguishing fetch from pull. The Russian workflow quiz prompt no longer contains English-only wording.
- Updated git.workflow-ci EN/RU to v5 so its GitHub Actions YAML aligns with the actual repo workflow: Node 22, npm 11.21.1 matching the lockfile setup, permissions limited to contents read, clean install, lint/typecheck/tests/build, plus informational audit reporting. Regression tests assert these assumptions.
- Updated html.document-structure EN/RU to v8 with an h1–h4 hierarchy walkthrough, nested section headings and aria-labelledby; updated html.forms-accessibility EN/RU to v3 with specialized input types and security caveats for accept, hidden values and server-side validation.
- The failed interim CI runs were resolved: lesson-page tests now derive counters from authored lesson data, and the bilingual input-type assertion accepts both English and Russian wording. Latest exact-head run is green.
- Scope remains focused, not a complete migration: legacy HTML interactions/simulators are not claimed to be replicated one-to-one. All 25 legacy route mappings remain provisional; no route cutover or learner-state migration has been performed. Notion source pages remain verification.state=unverified. Backup/PWA browser/device and screen-reader acceptance remains open.
- main must remain b13af92576e8a73753a6e3f3d26765d9f9c44397; PR #1 stays Draft. Next: continue source-to-block review in syllabus order, then perform documented browser/device acceptance when a real test environment is available.

## Previous continuation — structured JavaScript path (superseded) — 2026-10-28

- Latest verified code/test HEAD: `49709e30ebc42be909e739a971d40b753fc011e5`; exact-head GitHub Actions [run #40646714866](https://github.com/Mardakhay/interactive-guides/actions/runs/40646714866) passed `npm ci`, audit diagnostics, lint, typecheck, all 209 tests / 33 files, and production build/bundle budget.
- Added `structured-javascript-mastery` as a separate six-step route across core syntax, functions/objects, prototypes, runtime/memory, async requests, and DOM events. Locale-aware structured URLs and canonical IDs are tested. Existing `javascript-mastery` and all other classic paths remain unchanged.
- Current route coverage now includes structured Frontend Foundations, React Developer, and JavaScript Mastery tracks. The detail page resolves either classic catalog IDs or structured manifest IDs, tracks each ID independently, keeps bookmark controls outside links, and displays an explicit unavailable state for invalid configured steps.
- No legacy source-to-lesson equivalence is inferred from route availability. Git Reference / Git Workflow source-to-block parity, old-to-new learner-state retention, and full EN/RU editorial review remain open. Legacy route cutover remains blocked.
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains Draft. No local checkout or real-browser/screen-reader/device session was run.
- Next: review the classic Git Reference source against `git.fundamentals` EN/RU, identify concrete coverage gaps, and add a small bilingual content batch with regression checks. Preserve all existing classic lesson routes/state until the crosswalk review explicitly approves a disposition. Supabase remains gated by an approved reconciliation policy and direct RLS isolation tests.

## Current continuation — structured learning paths — 2026-10-28

- Latest verified code/test HEAD: `1f186fba06e4c37f32cd522d9a256adc344019ae`; exact-head GitHub Actions [run #40646447483](https://github.com/Mardakhay/interactive-guides/actions/runs/40646447483) passed `npm ci`, audit diagnostics, lint, typecheck, all 209 tests across 33 files, and production build/bundle budget.
- Added two separate paths using canonical structured IDs: `structured-frontend-foundations` and `structured-react-developer`. The existing five classic paths and their old lesson IDs remain unchanged. A repository test now validates every path step resolves against either the classic catalog or the structured manifest.
- `LearningPathDetailPage` now resolves classic and structured lessons separately, creates locale-aware structured URLs, tracks progress using each canonical ID, and retains bookmark actions. Unknown lesson IDs are shown as unavailable instead of silently disappearing; progress counts only resolvable steps. Lesson links no longer wrap the bookmark button in an anchor.
- Added tests for structured path URLs, progress calculations, bookmarking, Russian-locale routes, preservation of classic paths, and Russian path titles. No content-equivalence or state migration is inferred from this work.
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains Draft. No local checkout/build or real-browser/screen-reader session was run.
- Next: continue route-consumer/accessibility checks, then work through the source-parity audit in syllabus order. Keep legacy HTML routes and records until migration/retention decisions are reviewed. Native backup/PWA acceptance remains open; Supabase remains gated by approved reconciliation policy and RLS isolation tests.

## Previous continuation — structured bookmarks/notes and activity links (superseded) — 2026-10-28

- Latest verified HEAD: `adc65f8faa03f7b0cea24ac927b8544e5960bced`; exact-head GitHub Actions [run #40643106198](https://github.com/Mardakhay/interactive-guides/actions/runs/40643106198) passed `npm ci`, audit diagnostic, lint, typecheck, all 200 tests and production build/bundle budget.
- Structured reader now includes the existing generic bookmark toggle and note editor. The note editor is keyed by lesson ID so navigating between structured lessons remounts its draft rather than carrying prior input.
- Bookmarks and Notes pages now resolve both classic catalog IDs and structured lesson IDs, render the appropriate locale-specific route, and label structured records separately. Notes include a dedicated structured-curriculum filter. Existing persisted ID keys are preserved without migration.
- Dashboard Recent Activity now links structured bookmarks/notes to `/:locale/structured-lessons/:id`; classic activity continues to link to `/lessons/:id`. New tests cover list visibility, URL resolution, deletion/toggle and structured activity records.
- Next: audit search and learning paths for structured coverage; avoid collapsing old/new ID namespaces until content parity and data retention are reviewed. Real-browser/screen-reader acceptance and backup/PWA checks remain manual. `main` unchanged and Supabase gated.

## Previous continuation — dashboard structured-curriculum integration (superseded) — 2026-10-28

- Latest verified code/test HEAD: `bd0c11fdf7880bb45afaf37b3bc37f91bcb6666c`; exact-head GitHub Actions [run #40641890399](https://github.com/Mardakhay/interactive-guides/actions/runs/40641890399) passed `npm ci`, audit diagnostic, lint, typecheck, all tests and production build/bundle budget.
- Dashboard now reports classic catalog and structured-curriculum progress independently. Structured stats derive from `getStructuredLessonIds()` and include the supplementary track; old/new IDs are not collapsed or remapped while content parity is incomplete.
- Continue Learning now detects the last-opened ID in either namespace: classic lessons use `/lessons/:id`; structured lessons use the current UI locale route `/:locale/structured-lessons/:id`. Unit tests cover both routes and prove a structured completion does not increment classic stats.
- Progress description says 'all registered structured lessons' instead of hardcoding the current count, so future manifest changes won't make the copy stale.
- Next integration gap: review bookmark/note/recent-activity paths for structured lesson IDs before exposing those actions in the structured reader. Legacy state migration, real browser/screen-reader checks and PWA/backup acceptance remain open; `main` remains unchanged.

## Previous continuation — per-lesson learning-signal isolation (superseded) — 2026-10-28

- Latest verified code/test HEAD: `ec09333be356acd4d7a69d4781aeb8494d061b5a`; exact-head GitHub Actions [run #40640900763](https://github.com/Mardakhay/interactive-guides/actions/runs/40640900763) passed install, audit diagnostic, lint, typecheck, all tests and production build/bundle budget.
- Added a route-transition regression test: on the HTML document lesson it submits a knowledge check, self-reviews a practice criterion and saves a draft, then navigates to HTML Forms and confirms the counts are scoped to that new lesson. Structured-learning `localStorage` and Zustand state are also cleaned between page tests.
- Updated `docs/FULL_SOURCE_CONTENT_AUDIT.md` with an authoritative source-review reconciliation: 25/25 legacy HTML sources have a documented full review, but that is not a claim of 100% source-to-lesson or interactive-widget parity. Notion's 21 fetched pages remain `verification.state=unverified`.
- Keep quiz attempts, practice self-review, drafts, section-read marks and lesson-completion markers as separate signals. No aggregate mastery result is implemented. Manual screen-reader/browser/device acceptance and objective mastery policy remain open; `main` is unchanged and Supabase remains gated.

## Previous continuation — learning signals separated from mastery (superseded) — 2026-10-28

- Latest code/test HEAD: `c34bc9715fc0830745e59b07f60b1e0b1a850d8c`; exact-head GitHub Actions [run #40640504400](https://github.com/Mardakhay/interactive-guides/actions/runs/40640504400) passed `npm ci`, lint, typecheck, all tests and production build/bundle budget.
- Added a localized lesson-level “Learning signals” summary with independent counters for knowledge checks submitted, practice criteria self-reviewed and exercise drafts saved. The test starts at zero, submits a knowledge check, toggles one self-review criterion and edits a draft to prove the three measures update separately.
- The UI explicitly says these are activity counts, not mastery: knowledge checks may be retried, checklist ticks are self-reported, and saving code does not execute or grade it. H2 read markers and the self-attested lesson-completion state remain separate from the evidence counters.
- The bilingual optional authored solution remains version 7 of `html.document-structure`, revealed only on request; the control is UX disclosure, not a security boundary.
- Next: keep activity signals separate and avoid an automated mastery label until a product rule and objective verification evidence exist. Real screen-reader/browser acceptance, source parity and legacy learner-state migration remain open; `main` remains unchanged, and Supabase stays gated.

## Previous continuation — verified practice disclosure and checklist (superseded) — 2026-10-28

- Latest verified HEAD: `88ac1164925570c63376a55676b8e613d867b21a`; exact-head GitHub Actions [run #40640306652](https://github.com/Mardakhay/interactive-guides/actions/runs/40640306652) passed `npm ci`, lint, typecheck, all tests and production build/bundle-budget checks.
- Coding exercises support an optional bilingual `solution` object with code and explanation. The HTML document-structure pilot is version 7 in both locales (50 aligned blocks); “About Me” solution is hidden by default, explicitly revealed/collapsed by the learner, and labelled as one valid example.
- Regression tests cover solution default-hidden/reveal/collapse behavior, rendered explanation/code, EN/RU labels, hint reveal/collapse, and persistence/toggle of practice self-review criteria.
- The outline's H2 read markers and section-read count are still self-attested state. Checklist ticks are also self-review only, not code validation. The solution button is UX disclosure, not a security boundary: all lesson JSON is client-accessible and must not contain secrets/private grading data.
- Next: design an evidence summary that distinguishes read markers, quiz attempts and practice self-review without automatically asserting mastery. Keep mastery status gated on an explicit product policy and objective evidence; screen-reader/browser acceptance, source parity, legacy route state migration and device-level backup/PWA tests remain open. Supabase remains gated.

## Previous continuation — bilingual example-solution policy (superseded) — 2026-10-28

- Latest verified HEAD: `42739da06df15c8a23763f9f6947a3b222de84dc`; exact-head GitHub Actions [run #40640037346](https://github.com/Mardakhay/interactive-guides/actions/runs/40640037346) passed `npm ci`, lint, typecheck, all tests and the production build/bundle-budget check.
- The coding-exercise schema now supports optional `solution: { code, explanation }`. The bilingual `html.document-structure` lesson is version 7 (50 aligned blocks); the `practice-about-me` exercise has a complete EN/RU example solution. The reader keeps it hidden by default and only reveals it after explicit action, provides an explanation, and lets the learner hide it again.
- Policy: authored solutions are optional and should be added selectively after lesson review. UI disclosure is not a security boundary because lesson JSON is shipped to the client; never put secrets or privileged answer/grading data in lesson JSON.
- Recent verified reader work in this branch also includes accessible scroll progress, keyboard-focusable code samples and clipboard status, persistent self-attested H2 read markers, and a section-read count/check in the mobile/desktop outline.
- Next: selectively review additional exercise blocks before authoring solutions, then continue mastery-evidence design. Keep “read”, “lesson complete”, “practice self-review” and “mastery” as separate claims. Actual screen-reader/browser testing, content-source parity and legacy-state migration remain open; do not start Supabase before approved reconciliation and RLS checks.

## Previous continuation — persisted section-read practice (superseded) — 2026-10-28

- Latest code/test HEAD: `f578b146674ade9758f8b92b170ed736fd96309b`. Exact-head GitHub Actions [run #40639322531](https://github.com/Mardakhay/interactive-guides/actions/runs/40639322531) passed `npm ci`, lint, typecheck, all tests and production build/bundle budget.
- Structured lesson level-2 sections now have a localized “Mark read / Mark unread” self-attestation control. It uses the existing structured-learning v2 `sectionProgress` map keyed by stable lesson and section IDs. Tests verify the accessible state toggle, persistence, EN/RU labels and store behavior. This does not mark the lesson complete or assert mastery.
- Code-sample accessibility and reading progress remain in the same verified base: localized scroll progress, keyboard focus for horizontally overflowing code, and accessible copy-result status.
- Implemented practice foundations include draft persistence, knowledge-check attempt history, hint toggles, a script-disabled HTML preview and self-review criteria. Per-exercise authored-solution disclosure policy and any mastery threshold remain open.
- Next: continue structured-reader/practice UX with a clear authored solution policy and evidence model, then update the source parity audit. Keep old routes until each legacy-to-structured mapping and learner-state retention decision is tested; do not start Supabase until the reconciliation and RLS gates are approved. No real-browser or screen-reader acceptance is claimed.

## Previous continuation — structured reader accessibility (superseded) — 2026-10-28

- Latest verified code/test HEAD: `269b88ce3722034888e03cf11934b854a0c2a7ef`; exact-head CI [run #40638940943](https://github.com/Mardakhay/interactive-guides/actions/runs/40638940943) passed `npm ci`, lint, typecheck, all tests and production build/bundle budget.
- Added a localized scroll-driven reading-progress bar to `StructuredLessonPage`, with ARIA progressbar semantics and updates on scroll, resize and content resizing. Tests cover progress movement and English/Russian labels.
- Improved `StructuredLessonRenderer` code samples: keyboard focus for horizontal scrolling, accessible group labels derived from language/caption, and a live status announcement for clipboard failure/success. Regression tests cover focusability, language labels and failed-copy feedback.
- The prior Worker output cap remains included in this verified branch head; the lesson runner limits output to 40 messages plus one truncation notice.
- No local checkout, actual browser/device or screen-reader session was run. Manual accessibility/viewport checks and the documented backup/PWA acceptance remain open.
- Next priorities: continue practice UX and mastery evidence, then source-section parity in syllabus order. Keep legacy HTML routes until the old-to-new ID crosswalk and progress/bookmark/note/quiz disposition are reviewed and tested. Do not start Supabase auth/sync before reconciliation and RLS gates are cleared.

## Previous continuation — worker output cap (superseded) — 2026-10-28

- Current code change is present on `feat/learning-platform-foundation`: `src/features/structured-lesson/JavaScriptWorkerProgram.ts` caps console/result messages at 40 and sends at most one output-truncation notice. The regression test runs 100 `console.log` calls and expects 40 log messages, one notice and one finished message.
- The feature branch contains this change in the diff against prior validated HEAD `c2a9aeafffe67d0f8bdfe10f1c148ae75ca3f541`; it does not update `main`. The correct final patch was confirmed with compare output: only these two source/test files differ from the prior HEAD.
- Exact-head GitHub Actions run [#40637511313](https://github.com/Mardakhay/interactive-guides/actions/runs/40637511313) was queued/running at the time of this note on HEAD `ddc3f6c49a63dcc633842629ed354f946a98af92`. Wait for its result before calling the patch CI-verified. No local `npm ci`, lint, typecheck, test or build was run during this session.
- Release gates remain unchanged: legacy catalog routes stay in place until content equivalency and learner-state migration/retention are explicitly reviewed; fetched Notion source pages remain `verification.state=unverified`; browser/device backup and PWA checks are manual and not recorded. Supabase/auth/sync must remain gated on approved reconciliation policy and direct RLS isolation tests.
- Next priority after CI: continue source-parity migration in syllabus order or deliver section table of contents/reading progress/accessibility, while preserving the legacy routes and local-first data contracts.

## Authoritative checkpoint — dependency migration — 2026-10-27

- Dependency versions were refreshed on the feature branch: `react-router-dom@7.18.0`, `vite@8.3.5`, `@vitejs/plugin-react@6.1.2`, `vitest@4.1.12`; `zod@4.6.7` remains. CI uses Node 22 and npm `11.21.1` for lockfile consistency.
- Controlled CI [run #40536336285](https://github.com/Mardakhay/interactive-guides/actions/runs/40536336285) passed `npm ci`, lint, typecheck, 182 tests/30 files, production build and bundle budgets after generating the same lockfile now committed as `59432ad63d24d2ab0e37267091ce4de2f59a0d69`. `npm audit` reported 0 findings on that graph.
- Vite 8 build output: entry `211.08 kB raw / 68.05 kB gzip`; lesson repository `61.22 kB raw / 16.81 kB gzip`; all 125 JavaScript chunks pass the configured budgets. A config edit to `import.meta.dirname` removes Vite's `__dirname` native-loader warning.
- The temporary lockfile-regeneration/write automation has been removed from CI. Ordinary read-only exact-head CI [run #40537074543](https://github.com/Mardakhay/interactive-guides/actions/runs/40537074543) passed on cleanup SHA `56f5786cb68395936c6ac0b29b5703b85f708b73`.
- PR #1 remains a Draft against `main`; `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`. No browser/device acceptance is claimed.
- Release gates remain: legacy learner routes have not been cut over to JSON-only routes, Notion pages fetched to date still report `verification.state=unverified`, and real-browser/device persistence/PWA checks remain manual. Supabase stays gated on content parity and the learner-route cutover.

## Previous checkpoint — historical context

# Session Handoff

**Last updated:** 2026-10-27  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch created:** `feat/learning-platform-foundation`


## Previous checkpoint — superseded — 2026-10-27

- Current feature head: `55644ccf50f14bcaab796bd6058b25297b621d16`; exact-head CI passed [40504186937](https://github.com/Mardakhay/interactive-guides/actions/runs/40504186937) (`npm ci`, lint, typecheck, 181 tests, production build). `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains Draft.
- The structured lesson repository now uses a lightweight bilingual static manifest and lazy JSON body imports. The repository chunk fell from 2,363.77 kB / 784.88 kB gzip to 54.26 kB / 17.15 kB gzip; the entry chunk is 280.15 kB / 92.89 kB gzip. Next change adds a build-time budget guard to stop the large repository chunk returning.
- Lesson bodies are cached by the existing service worker on first successful same-origin asset request; they are not precached. W-03 must still confirm cached revisit offline and provide a clear limitation for a lesson never visited while online.
- A manual smoke-test protocol exists at [`BROWSER_SMOKE_TEST_CHECKLIST.md`](./BROWSER_SMOKE_TEST_CHECKLIST.md); it is a procedure, not evidence of an actual browser/device run.
- Open gates remain: actual browser/device persistence, backup and PWA acceptance; dependency audit triage; claim-by-claim source/Notion verification; full UI localization/accessibility review. Do not start Supabase implementation before conflict/RLS/product gates are resolved.
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


## Active continuation checkpoint — 2026-10-23

- Keep all work on `feat/learning-platform-foundation`; `main` remains at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. PR #1 remains open/draft. Do not merge or force-push.
- Restored structured curriculum is now learner-accessible through the bilingual React route and index: 26 core IDs / 52 locale files and 11 separately listed supplements / 22 locale files. The four SQL/hosting translations are registered. This is in-app embedded text, not a request to create more standalone HTML lesson pages.
- The 2026-10-23 CI run on `26a8c7d4efe24402094f69c25678528aaa11067f` failed one curriculum-page test because Russian week count text was split into number and label nodes; lint and typecheck passed, tests had 91/92 passing, and build was skipped. The test was corrected in feature commits `6975d303ff107904baf408190755b11884bb3210` and `433855acab952074705fd0135576a31f76f104fb`; verify Actions on the exact latest SHA before reporting the fix as validated.
- Local branch is stale/diverged from the remote and must not be pushed blindly. The branch update was made using feature-only GitHub commits with expected-head checks. Reconcile any local checkout only after inspecting its diff and ancestry; never move `main`.
- Source audit remains open. 21 Notion pages were fetched (all connector results unverified); 25 HTML files were inventoried and structurally surveyed. Full prose/code/interaction review remains outstanding for most HTML sources. Week 14/15 and API received focused review; no claim of complete parity is valid yet.
- Continue by polling CI for the latest feature HEAD; fix any failing check; then update audit mappings/evidence as actual source review progresses. Keep this handoff, `CURRENT_STATE.md`, `ROADMAP.md`, and `FULL_SOURCE_CONTENT_AUDIT.md` synchronized at each material checkpoint.


## Latest verified checkpoint — 2026-10-23

- Feature branch: `feat/learning-platform-foundation`; PR #1 remains open/draft. Latest verified code commit before this documentation-only checkpoint: `132636c4007141454a903e815d6f0418a3c511b0`.
- On a clean clone of that exact SHA: `npm ci` completed; `npm run lint`, `npm run typecheck`, `npm test` (19 files, 92 tests), `npm run build`, and `git diff --check` passed. Build emits the existing Vite chunk-size warning for the structured-content repository bundle (~1.4 MB minified).
- GitHub Actions previously failed at `26a8c7d4efe24402094f69c25678528aaa11067f` due to a localized curriculum test matcher. The latest corrected test passes locally; Actions has not returned a run for the later API-created commit(s), so the latest CI check is **unconfirmed**. Do not label CI green until a run exists and passes on the exact head.
- Main was not modified in this continuation. PR base currently reports `452a0296fc875e48f1a050e5af557ef0c08f68c8`; feature head is the only target for these changes.
- Source audit remains incomplete: 21 Notion fetches (unverified), 25 HTML sources structurally surveyed; full prose/code/hidden interaction review for most HTML files remains open. See `FULL_SOURCE_CONTENT_AUDIT.md` and keep lesson editorial status at review.
- Next work: finish source-by-source HTML and Notion parity, update matrix rows with precise canonical IDs and block evidence, verify content depth/code/EN-RU parity, then obtain an actual Actions run for the resulting PR head. Do not mark the project complete yet.


### CI confirmation — 2026-10-23

GitHub Actions [run #317](https://github.com/Mardakhay/interactive-guides/actions/runs/39963932841) passed on exact feature HEAD `07bc9acfc89c0138cbd4d214e19215e4dff6f1c6` (install, lint, typecheck, 92 tests, build). PR #1 remains open/draft and mergeable. This latest result supersedes the earlier “Actions unconfirmed” note above. The source audit remains incomplete; do not mark the overall project complete. Any later docs-only head needs its own exact-head workflow verification.


### Latest branch/CI status

Feature head `b7fdeba6b9096d9f8336cf1071deb9d0f2d1dfc5` passed GitHub Actions [run #320](https://github.com/Mardakhay/interactive-guides/actions/runs/39964458056). PR #1 remains open, draft, and mergeable. Source review is still incomplete: source matrix targets have now been corrected to canonical IDs, but most HTML sources still need full content/interaction parity review. Keep main unchanged.

## Authoritative checkpoint — 2026-10-23 (supersedes earlier status notes)

### Exact refs and PR state
- Working branch: feat/learning-platform-foundation
- Feature HEAD at this checkpoint: 9c51012aff7631fc12b1dd5af0b74b7de9b28691
- main remains at b13af92576e8a73753a6e3f3d26765d9f9c44397; no commit was made to main in this recovery.
- PR #1 is open and remains Draft: https://github.com/Mardakhay/interactive-guides/pull/1
- GitHub reported mergeable=true and mergeable_state=clean after the merge and successful CI.

### Branch reconciliation
The feature branch and main diverged from common ancestor 452a0296fc875e48f1a050e5af557ef0c08f68c8. The four main commits added only the two SQL/PostgreSQL and two production-hosting locale JSON files. The two-parent merge commit is https://github.com/Mardakhay/interactive-guides/commit/d47d96cb1b471468e9687ab923744ce9ec248a99, with feature as first parent and main as second parent.

- Both production-hosting files were byte-identical on main and feature.
- The feature PostgreSQL files are richer: 35 blocks each and 110 estimated minutes, compared with 10 blocks each and 75 minutes in the older main versions.
- Both feature PostgreSQL files retain every block ID in the main versions and add explanations, walkthroughs, checks and practice. No main-only block IDs were lost.
- The merge retained the richer feature files. The main ref was not moved.

### Exact-head validation and fix
GitHub Actions run #39976179595 passed on exact feature SHA 9c51012aff7631fc12b1dd5af0b74b7de9b28691: npm ci, lint, typecheck, tests and production build.
https://github.com/Mardakhay/interactive-guides/actions/runs/39976179595

The preceding run on merge commit d47d96cb1b471468e9687ab923744ce9ec248a99 failed during test module loading because the new English/Russian SQL content used unsupported callout tone info. The schema allows note, tip, important and warning. Commit 9c51012 changed that tone to important in both locale files; the exact-head Actions run then passed.

A local clone could not be obtained during this session because network DNS resolution for github.com failed in the container. Current verification evidence is GitHub Actions, not a local terminal run.

### Current product status
- Structured content: 26 core lesson IDs and 11 supplementary lesson IDs, with English and Russian files (74 JSON files total).
- Legacy source: all 25 HTML lessons remain under public/lessons/.
- Structured routes: /:locale/structured-lessons and /:locale/structured-lessons/:lessonId.
- The current runner uses JavaScriptRunner.tsx and JavaScriptWorkerProgram.ts with disposable Web Workers and a timeout, not the older iframe-based design.
- PWA is not implemented in the checked feature tree: public/manifest.webmanifest and public/sw.js are absent; index.html has no manifest link and src/main.tsx does not register a service worker.
- App-wide localization is incomplete; localized structured routes do not mean the legacy shell and all application pages are translated.
- Source-to-block parity and editorial approval remain incomplete. Registration and passing tests are not proof of full migration or approval.

### Next action
Continue the source-to-block audit for legacy HTML and accessible Notion material. Work in small syllabus-ordered batches, record uncovered examples and exercises plus EN/RU differences, and do not create duplicate lessons when a registered destination already exists. Then prioritize app-wide localization and implement/test the missing PWA foundation. Keep this handoff synchronized with exact branch HEAD and CI evidence.


## PWA foundation implementation — 2026-10-23

Feature commit c794088f15fb57ba3c1b8c51032e7e76e11f72bf adds:
- manifest link, theme/mobile metadata in index.html;
- public/manifest.webmanifest and public/pwa-icon.svg;
- production-only service-worker registration in src/main.tsx;
- public/sw.js with app-shell precache, network-first navigation fallback for deep links, and runtime caching for successful same-origin GET assets.

The worker skips cross-origin requests, requests carrying Authorization and /api/ paths. This is an initial offline foundation, not release acceptance: SVG-only icon support needs platform validation (PNG sizes may be needed), external Google Fonts may not load offline, and installability/cache-update/offline behavior has not yet been tested in real browsers. GitHub Actions for the PWA commit must be checked before claiming CI green. Main remains unchanged.


## Latest PWA CI checkpoint — 2026-10-23

- PWA foundation commit: c794088f15fb57ba3c1b8c51032e7e76e11f72bf.
- Lint fix: 8d7172bf0faa128aee370afc675c9b5cdd9739ac declares service-worker runtime globals.
- Security hardening: 9e4e08c57725e595c3f279ce6f431fabb2d49281 limits runtime caching to static asset extensions and avoids intercepting arbitrary same-origin data/document requests.
- GitHub Actions [run #39977258811](https://github.com/Mardakhay/interactive-guides/actions/runs/39977258811) passed npm ci, lint, typecheck, tests and production build on exact SHA 9e4e08c57725e595c3f279ce6f431fabb2d49281.
- Current branch still has no real-device installability/offline acceptance evidence. Main remains b13af92576e8a73753a6e3f3d26765d9f9c44397 and was not modified.


## PWA platform asset follow-up — 2026-10-23

The feature branch now includes PNG app icons (180px Apple touch, 192px and 512px manifest assets), a shell precache version bump, a Netlify SPA rewrite, and PWA contract tests in `src/pwa/pwaAssets.test.ts`. These changes are committed on `feat/learning-platform-foundation`; `main` is deliberately untouched. Wait for the exact latest-head Actions run before describing the commit as validated. The automated test cannot replace Android Chrome/iOS Safari install/offline acceptance. Remaining product-sized work still includes broad source parity review, app-wide localization, persistence migration/export, and the Supabase design/implementation.


## Application locale foundation — 2026-10-23

The UI now has an English/Russian preference stored under `interactive-guides.ui-locale`, a route-aware override for `/:locale/structured-lessons`, and a language switch in the top bar. The shared sidebar/mobile navigation, dashboard headings, main catalogue/bootcamp promotion and category cards have localized strings; category lesson counts handle English and Russian plural forms. App-level `html lang` follows the active UI locale.

This is the start of Phase 2, not complete app-wide localization. Course details, legacy HTML lessons, learning-path detail pages, bookmarks, notes, quizzes, search result UI and all empty/error states still need systematic translation and tests. The source lesson/catalog content remains English unless it uses the bilingual structured lesson route.


## Continuation handoff — 2026-10-23 (current PWA/update and UI locale checkpoint)

- Branch: `feat/learning-platform-foundation`; tested code SHA: `5628ca69a6981a6d81357ab1d20e466c3f1d783e`.
- GitHub Actions [run #39982235822](https://github.com/Mardakhay/interactive-guides/actions/runs/39982235822) passed install, lint, typecheck, tests and build on that exact SHA.
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains open/draft. Do not merge or force-push as part of continuation.
- PWA now has PNG assets at 180/192/512, manifest links, Netlify SPA fallback, versioned `v3` cache, and a localized learner-controlled update prompt. `public/sw.js` only activates a waiting update after an explicit `SKIP_WAITING` message and reloads only after the learner selects “Update now”.
- UI localization now covers shell navigation, top bar language switch, dashboard headings, catalogue/category cards, category detail, learning-path list/detail, bookmarks, notes and search UI. Structured curriculum/lesson routes keep their route-specific language. This is still **partial**: legacy lesson body content, quiz controls/feedback and remaining labels/empty/error states need audit and translation.
- Source-to-block parity for the 25 legacy HTML files is incomplete. All 26 core and 11 supplementary bilingual structured lesson IDs remain registered, but registration or schema/CI checks do not prove full instructional parity or editorial approval.
- Persistence remains local-first with open work for cross-store legacy data migration and export/import. Supabase auth/sync has not been implemented. Real browser/device PWA acceptance has not been run in this session.
- Next steps: check exact-head Actions after any subsequent change; continue itemized source parity in syllabus order; finish localization audit across remaining pages and content; triage the dependency audit reported by `npm ci`; then add verified PWA/manual deployment acceptance evidence. Keep editorial status at `review` until content review is complete.


## Previous validated handoff — 2026-10-23 (superseded by the latest checkpoint below)

- Branch: `feat/learning-platform-foundation`.
- Exact validated HEAD: `3762826f6952df4a72fce4149694728ea5f1e378`.
- GitHub Actions [run #39985536493](https://github.com/Mardakhay/interactive-guides/actions/runs/39985536493) passed dependency install, lint, typecheck, all 102 tests and production build on the exact SHA.
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 is still open/Draft. Do not merge or force-push.
- The CSS source pass compared `public/lessons/css-reference.html` (98,870 bytes; SHA `be8fb951799659672119c32def19167a9c659424`) with `css.fundamentals`, `css.flexbox-grid-responsive` and the Sass/SCSS supplement. The EN/RU `css.fundamentals` pair is version 3, 53 blocks, 110 minutes, 5 knowledge checks, 5 walkthroughs and 3 coding exercises per locale. Schema/CI and matching IDs/types confirm structural consistency—not complete parity or editorial approval.
- Remaining CSS parity: the legacy page's live color-swatch copy behavior, duration/timing/delay transition controls, Flexbox/Grid playgrounds with generated output, section-specific copy/navigation and full quick-reference tables are not reproduced one-to-one. Positioning/z-index/float/clear details, custom web-font loading details and some filter demos also require mapping or a documented defer decision. Keep the legacy HTML intact.
- Broad app UI localization now covers the shell/navigation, dashboard widgets, course catalog and category detail, learning paths, bookmarks, notes, lesson controls/metadata/navigation, quiz controls, search and common empty/error states. Continue auditing all remaining UI and source lesson-body content.
- PWA foundations include PNG icons, manifest, static-asset-only runtime caching, SPA fallback, and learner-controlled service-worker activation. CI is green but no real-device install/offline acceptance was recorded. Local data migration/export/import remains incomplete; Supabase auth/sync remains not started.
- Next: continue source-to-block parity in small batches; use exact-head CI after any change; record intentional interaction deferrals; preserve the `review` status until human editorial/source review is complete.


## Latest validated handoff — 2026-10-23

- **Working branch:** `feat/learning-platform-foundation`.
- **Latest validated application/content snapshot:** `64dea28924aed5701452ae60b121cb57fc747598`; the current branch also contains the documentation refresh.
- **CI:** GitHub Actions [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passed `npm ci`, lint, typecheck, 102 tests in 22 test files, and production build on the exact SHA.
- **Main protection:** `main` remains at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. PR #1 is still open/Draft. Do not merge or force-push without explicit instruction.
- **Curriculum inventory:** 26 core and 11 supplementary stable lesson IDs in EN/RU (74 JSON files total). The app contains the structured curriculum route/reader. All 25 legacy HTML lesson files remain for source comparison and rollback.
- **Current source-parity work:** CSS reference, Git reference and Git workflow got focused source-to-target audits. `css.fundamentals` v3 has 53 blocks/110 min/5 checks/5 walkthroughs/3 exercises per locale; `git.fundamentals` v3 has 38 blocks/95 min; `git.workflow-ci` v3 has 37 blocks/110 min. Git/CSS content status remains `review`; legacy demos, copy controls, navigation and quick-reference parity still need explicit mapping/defer decisions. Most other HTML/Notion content still needs full prose/code/exercise/answer review.
- **UI locale:** broad but partial EN/RU coverage across shell, dashboard, catalogue, category details, learning paths, bookmarks, notes, lesson metadata/navigation, quiz controls and search. Do not claim every legacy lesson body is translated.
- **PWA:** icons, manifest, service-worker caching/update prompt and Netlify-style SPA fallback are present. No real-device install/offline/update acceptance has been recorded.
- **Data/Supabase:** local stores are active; a versioned migration and explicit export/import recovery path remain open. Supabase authentication and synchronization are not implemented.
- **Release diagnostics:** the latest install reported 13 audit findings (8 moderate, 3 high, 2 critical). The build has a large-chunk warning and test output includes React Router future-flag warnings. Triage without unreviewed forced upgrades.
- **Next:** continue source-to-block audits in syllabus order; close or defer the remaining UI/interactions with evidence; add and test local data portability; record browser/device PWA acceptance; triage dependency and bundle warnings. Keep lesson status at `review` until actual editorial approval.


## Documentation snapshot — 2026-10-23 (exact current HEAD)

The implementation/content snapshot reviewed for this documentation sync was `64dea28924aed5701452ae60b121cb57fc747598`, with GitHub Actions [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passing on that exact SHA. The previous documentation sync `a4d5eadb045f03a5c7cc995b6f150b42e2ca3eb4` also passed exact-head CI [run #40008684548](https://github.com/Mardakhay/interactive-guides/actions/runs/40008684548). This commit records the handoff and does not change release blockers. `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`, and PR #1 remains open as a draft.


## Current handoff — 2026-10-26

- Work only on `feat/learning-platform-foundation`. Code/content HEAD: `17b79e07b8377e8aa92c5aa14305da0062389ac5`. PR [#1](https://github.com/Mardakhay/interactive-guides/pull/1) is open, Draft, and mergeable against `main` SHA `b13af92576e8a73753a6e3f3d26765d9f9c44397`. No new commit in this continuation targeted `main`.
- Exact-head CI [run #40270734689](https://github.com/Mardakhay/interactive-guides/actions/runs/40270734689) passed install, lint, typecheck, 102 tests across 22 test files, and build. Install reported 14 audit findings (8 moderate, 4 high, 2 critical); build still reports a >500 kB chunk warning.
- New deployment deep dive is in `src/content/lessons/deployment.production-hosting/{en,ru}.json`: 21 ordered blocks per locale, 3 walkthroughs, 2 knowledge checks, 2 scaffolded exercises. The new learning covers `dist` and content hashes, build-time public env values, Vite env precedence (process variables win), host-specific fallback, DevTools/log diagnosis, and rollback. Official Vite/Netlify references are included. A first CI run caught an unsupported `info` callout; it was corrected to supported `tip` in both locales and the rerun passed.
- Current inventory: 21 Notion pages fetched, all connector-unverified; 25 legacy HTML sources inventoried/structurally surveyed. Focused deeper passes are documented for selected React, CSS and Git sources; full audit/parity is not complete. Keep the audit matrix statuses partial/review; do not claim all sources migrated.
- Existing recent content depth: CSS fundamentals v3 / 53 blocks, Git fundamentals v3 / 38 blocks, Git workflow/CI v3 / 37 blocks, SQL/PostgreSQL / 35 blocks per locale. Curriculum has 26 core plus 11 supplementary IDs across EN/RU.
- Other open work: complete source review and matrix evidence; remaining UI/content localization; learner-data migration/export-import; Supabase auth/sync; real Android/iOS PWA acceptance; review dependency audit and large bundle warning.
- A local clone used for the initial inspection was stale and Git network fetch was unavailable in the sandbox. Remote GitHub API mutations were guarded by exact `expected_sha` and explicit feature branch; re-check live PR/branch state before further writes.

## Next action

Continue source-by-source parity and content deepening from `docs/FULL_SOURCE_CONTENT_AUDIT.md`, starting with the next largest unaudited source. For every lesson pair, verify structure, technical correctness, depth, feedback and source evidence. Re-run exact-head CI after implementation and update this handoff again.

## Current handoff — 2026-10-26 (DOM milestone)

- Feature code/content commit: `deb30c88151ee6f0ea5f59afd14e96f0fb2d5902`. GitHub Actions [run #40271279200](https://github.com/Mardakhay/interactive-guides/actions/runs/40271279200) passed `npm ci`, lint, typecheck, 102 tests across 22 files and production build.
- `js.dom-events` EN/RU now share 35 ordered blocks, 7 walkthroughs, 6 checks and 3 coding exercises. The content test checks the expanded counts and locale block structure. One earlier run exposed the stale expectation of four checks; it was updated to six and the exact latest run passed.
- The legacy DOM HTML was structurally mapped and compared against the embedded lesson. Remaining gaps: interactive traversal/live-collection/theme demos, parts of the five code-editor challenges and final six-part Card Manager. Do not call it fully migrated; preserve the HTML source.
- Deployment/hosting is also deepened at 21 blocks/locale (3 walkthroughs, 2 checks, 2 practices) with official Vite/Netlify references. CSS and Git/CI have prior deepening. All lessons remain in editorial review.
- Current source scope: 21 Notion pages fetched (unverified by the connector) and 25 HTML files inventoried; complete line-level review remains open. PR #1 is open/Draft on `feat/learning-platform-foundation`; `main` was not modified.
- Next: continue full source review beyond DOM, record block-level evidence and explicit deferrals, deepen the next largest uncovered curriculum topic, then rerun exact-head CI and update this handoff.

## Current handoff — 2026-10-26 (network/DOM checkpoint)

- Feature code/content SHA: `0b08ee4249d1e6ec19bfe16e94de864fe7271ed1`. Exact Actions [run #40271559588](https://github.com/Mardakhay/interactive-guides/actions/runs/40271559588) passed install, lint, typecheck, 102 tests / 22 files and production build.
- New `network.dns-tcp-tls` content: 22 blocks per locale, 2 walkthroughs, 3 checks, 2 exercises. It corrects a misleading legacy HTTP/2 claim and explains TCP transport HOL versus HTTP/3 QUIC stream behavior with packet/congestion caveats and IETF RFC references.
- `js.dom-events` remains 35 blocks per locale (7 walkthroughs, 6 checks, 3 exercises); deployment hosting 21 blocks per locale (3 walkthroughs, 2 checks, 2 exercises). Related tests and EN/RU structural parity passed.
- Source audit remains open: 21 Notion fetches marked unverified; 25 HTML sources inventoried; only selected sources have focused/full content reviews. Exact source evidence and residuals are in FULL_SOURCE_CONTENT_AUDIT.md.
- PR #1 is open/Draft; base main SHA `b13af92576e8a73753a6e3f3d26765d9f9c44397`. This continuation did not write to main.
- Next: continue full source review and add only evidence-backed bilingual content; then update the matrix and rerun CI. Keep app lesson status at `review`.


## Performance/accessibility source pass — 2026-10-26

The bilingual `performance.accessibility` lesson is now version 3, 36 blocks per locale (8 code walkthroughs, 6 knowledge checks and 3 scaffolded coding exercises). The source-derived addition teaches how to choose contextual image alternatives (informative vs decorative/redundant; explicit empty alt vs missing alt) and how to give an icon-only favorite toggle a stable accessible name and exposed `aria-pressed` state. It includes a worked TSX card, feedback-rich check, practical repair task and W3C WAI Images Tutorial reference. EN/RU block IDs/types and quiz structure match. CI [run #40271923920](https://github.com/Mardakhay/interactive-guides/actions/runs/40271923920) passed lint, typecheck, tests and production build on exact content SHA `89bb63293f5171f3e8f6b7d4fc1a0740f9e1dc05`.

Source status remains **partial**: the legacy render-cascade and bundle simulators, keyboard/menu demonstrations and other interactive behaviors do not yet have equivalent learner interactions. This focused comparison does not constitute a line-by-line audit of the HTML or completion of the full source audit.

## Testing source pass — 2026-10-26

The bilingual `testing.react-testing-library` lesson is version 3 with 34 blocks per locale (3 walkthroughs, 5 knowledge checks, 3 scaffolded exercises). A focused comparison with `test.guide.html` added a typed `vi.fn()` service-boundary walkthrough, resolved-vs-rejected promise cases, and a success/empty/error exercise with observable assertions. The old HTML's Jest-only globals were not copied: repository configuration is Vitest 2.1.9, React Testing Library 16.3.2, user-event 14.6.4, and jsdom. WAI/Testing Library-style behavioral testing remains the goal. CI [run #40272357781](https://github.com/Mardakhay/interactive-guides/actions/runs/40272357781) passed lint, typecheck, tests and production build on exact content SHA `e611754d978da8a36627429f56c49ff73770711e`.

The source remains **partial**: its visual mock tabs, live examples, FAQ accordions, and full legacy quiz feedback are not yet equivalent app interactions. This is a focused comparison, not a line-by-line HTML audit; the wider source audit remains open.

## Current handoff (2026-10-26): embedded lessons and icon milestone

- Active branch: feat/learning-platform-foundation. PR #1 remains open/Draft; main was not modified.
- Local GPT-created lesson restoration was preserved; merge bbee000943990cc3dc6e1fe7a52d66100296d137 joins it to fetched remote feature history without rewriting either side. Local lint, typecheck, 102 tests across 22 files and production build passed on the merged tree before the icon update.
- The generated icon concept from commit 912742dc3549f6bd659c7baf2beb4cd1d67034e1 was rejected by the user and superseded. Correction commit 2cedeeae948b0a35e6a983c428cb72b17140895c uses only their exact supplied blue-and-white SVG byte-for-byte for favicon and scalable PWA icon; 180/192/512 PNGs are generated directly from that same SVG with 4× supersampling and RGBA antialiasing, not variants. Theme color is #0284c7 and service-worker cache version is v5. GitHub Actions [run #387](https://github.com/Mardakhay/interactive-guides/actions/runs/40276045811) passed on the SVG correction. Follow-up PNG rasterization commit de3706c32abefbdd24550133f8db91d241724387 generated all three RGBA PNG sizes directly from that SVG with 4× supersampling; Actions [run #389](https://github.com/Mardakhay/interactive-guides/actions/runs/40276645065) passed on its exact SHA.
- Content is still in migration/review. The 21 fetched Notion pages are marked unverified; 25 HTML sources are inventoried, but full prose/code/exercise/reveal parity is incomplete. Keep legacy delivery until the full source-to-block and bilingual depth gate passes; then disable legacy HTML for learners while retaining sources for audit evidence.
- Next work order: complete source-by-source review and deepen missing EN/RU structured material in-app; validate every learner route uses that content and then cut over from legacy HTML; stabilize local data migration/export/recovery; implement Supabase auth/sync, schema and RLS for progress and related saved data.
- Do not claim the course, source audit, Supabase or device-level PWA release acceptance is complete.


## Continuation checkpoint — 2026-10-26

The Week 14/15 parity work remains useful but does not imply the whole course is complete. Source discovery has expanded to 21 Notion pages and 25 legacy lesson HTML files. Three new structured bilingual depth passes in the current continuation target architecture boundaries, Sass/SCSS and object prototypes; their evidence is recorded in `FULL_SOURCE_CONTENT_AUDIT.md`. Full source-section coverage outside those focused areas remains pending, so the app still has its legacy HTML-backed learner flow and Supabase remains sequenced afterward.


## Content continuation — 2026-10-26

The Week 14/15 lessons remain a focused parity milestone, not the end of course content work. Recent additional source-derived structured depth now includes Bootstrap's collapse behavior, grid/card semantics, and carousel accessibility tradeoffs in the separate UI ecosystem supplement. All-source parity remains open, so the legacy learner catalog/routes are intentionally still present and Supabase remains the next-after-cutover phase.


## Handoff checkpoint — 2026-10-26

Latest code change: bilingual DOM lesson adds DocumentFragment, IntersectionObserver/MutationObserver cleanup, custom-event contract, debounce/throttle, and a debugging exercise. Branch HEAD at note time: `68a3d192b6be30fc2b94d3aca9d825f0edbae5fd`; CI run #396 was queued. Continue auditing remaining legacy/Notion subtopics, keep the HTML learner flow until the content gate passes, then switch to JSON and implement Supabase only afterward.


## Handoff — 2026-10-26

The user-requested order is unchanged: finish source-depth verification → switch learner app to bilingual structured JSON and remove HTML from learner delivery (retain source evidence) → implement Supabase progress persistence. Seven source-derived lesson areas now have targeted bilingual depth work, but all source subtopics are not yet verified. CI #401 on code/test checkpoint `604b57e98fdadf6558ef83209145dab9b7253ebf` was still running at the time of this handoff note; recheck exact SHA before continuing.


## Handoff — 2026-10-26

Recent audited gaps now embedded in bilingual JSON: CSS margin collapsing, HTML data-table semantics, accessible media captions/alternatives, DOM observers, Fetch/Axios semantics, React effects and UI-library forms. Exact block mapping is in `FULL_SOURCE_CONTENT_AUDIT.md`; the global source-depth gate remains open. Check CI for the current feature HEAD, then continue remaining source rows. Do not remove the legacy learner flow before full validation; Supabase follows the JSON-only cutover.


## Handoff — 2026-10-26

Latest source-derived addition is the bilingual Git pipeline/release exercise: diagnose a failed check, fix and rerun on the new SHA, enforce review/status gates, choose delivery vs deployment, and track artifact/rollback. Feature SHA `08521895937d5b30e7bb58662b2d4f632d1f3616` was in CI when noted. Full Notion/HTML coverage remains unfinished; retain learner HTML until the gate is met, then cut over to JSON, then build Supabase persistence.

## Handoff checkpoint — 2026-10-26

Latest content change: `28b95945fc6218d2cf8d3608f5fa0e6f3aadb354` adds registered EN/RU `js.iterators-generators` (track order 3) from the Advanced JS Notion generators topic. It includes 15 aligned blocks, three walkthroughs, two explanatory checks, and one applied exercise. Inventory is now 38 pairs (26 core, 12 supplementary). Continue full source/depth audit; Notion connector-unverified status must remain explicit. Do not remove preserved HTML source files or learner routes until parity/cutover validation is done. Supabase work is gated behind that cutover. Verify CI on this SHA and keep docs synchronized.

## Latest handoff checkpoint — 2026-10-26

Latest code commit `693d91796a45f8e20668138c5d0fb7983ad97f1c` adds registered EN/RU `js.collections-weakmaps`, a 15-block supplement in `supplement-js-internals`, with 3 walkthroughs, 2 explained checks and an applied coding task. Total inventory is 39 pairs (26 core + 13 supplements). CI for this code SHA is running at https://github.com/Mardakhay/interactive-guides/actions/runs/40281388758. Map/Set/weak-collection source coverage is still partial; full Advanced JS and all-source audit remain open. Keep legacy learner routes/files until coverage and JSON cutover are verified; begin Supabase only after that gate.

## Verification correction — 2026-10-26

The initial collection-lesson commit failed runtime schema tests because each knowledge check lacked the required overall `explanation` field (per-option feedback alone is not sufficient). The bilingual quiz content now includes both kinds of feedback, and its test asserts one correct option, non-empty feedback for every option, and a non-empty overall explanation. Follow-up code SHA `55eda66397b28157624ab9e758cb089267e42031` passed lint, typecheck, tests, and production build: [CI run 40281556236](https://github.com/Mardakhay/interactive-guides/actions/runs/40281556236). This successful run validates the 39-pair code state; the subsequent documentation-only checkpoint will receive its own CI run.

## Latest work checkpoint — 2026-10-26

Code commit `97b36d74fe2df76b4c7f84c3ef5c428129adcb0f` adds bilingual registered `js.regex-text-processing` at supplementary order 5. Its source-to-block map is in `FULL_SOURCE_CONTENT_AUDIT.md`; regex coverage remains partial. Inventory is 40 pairs (26 core, 14 supplementary). Wait for CI on this exact SHA, fix any failure, and keep legacy routes until all-source parity and JSON cutover are validated; Supabase follows afterward.

## CI status correction — 2026-10-26

Regex lesson code commit `97b36d74fe2df76b4c7f84c3ef5c428129adcb0f` passed lint, typecheck, all tests, and production build on [CI run 40281922055](https://github.com/Mardakhay/interactive-guides/actions/runs/40281922055). The latest feature content is therefore green on that code SHA; a docs-only commit follows and still needs exact-HEAD CI verification.

## Current handoff — 2026-10-26

Latest code SHA `7915276b6514a56a3a700c0ba488b784e348754b` adds the registered EN/RU `browser.storage-indexeddb` lesson and a new supplementary track. It separates local Web Storage/IndexedDB concepts from server-backed learner progress. Current inventory is 41 bilingual pairs. CI run 40282414157 is in progress; inspect its logs and fix failures before proceeding. Source-depth audit and JSON learner cutover remain open; Supabase follows only after cutover.

## Verification checkpoint — 2026-10-26

Browser-storage lesson code SHA `7915276b6514a56a3a700c0ba488b784e348754b` passed lint, typecheck, test suite, and production build on [CI run 40282414157](https://github.com/Mardakhay/interactive-guides/actions/runs/40282414157). The documentation checkpoint `97008a25d5312fe207756e6a6061f3d75bd72a7b` also passed the same required checks on [CI run 40282496515](https://github.com/Mardakhay/interactive-guides/actions/runs/40282496515). The next content/docs checkpoint will receive a fresh exact-HEAD run.

## Latest handoff — 2026-10-26

Core JS code SHA `a7f53e1695cd47b3cb1ede031f306b0a91de717a` deepens `js.functions-arrays-objects` in both locales from 58 to 71 blocks. Added iterable destructuring, array/function rest, optional chaining and ?? semantics, with 2 quizzes and one exercise; see `FULL_SOURCE_CONTENT_AUDIT.md`. CI run 40282885026 passed lint, typecheck, tests, and build. After exact-head verification, continue the unresolved source audit; HTML learner routes remain until full parity and JSON cutover.

## Latest handoff — 2026-10-26

Code SHA `6a45a6a1b59d3fec621ca97f0648ef63cf714476` adds EN/RU invocation and strict-mode depth to `js.object-prototypes` without changing IDs. CI is run 40283382323; inspect final status and logs on this exact commit. Continue the source audit after validation; preserve learner HTML until all-source parity and JSON cutover.

## Latest handoff — 2026-10-26

Code SHA `eeed651f275a5307f8d726d1a08d0b4590ea1916` adds bilingual `browser.realtime-workers` and registers a new track. CI run 40283883424 is underway; inspect this exact SHA's logs and repair any failure. Content inventory is 42 pairs. Full source/depth gate remains; preserve legacy learner routes until JSON cutover is validated, then begin Supabase.


## Continuation checkpoint — 2026-10-26

- Continue only on feat/learning-platform-foundation. Pre-change HEAD: fc12acd76737357d36d2955337840de9b8130b37; CI run 40283990073 passed on that SHA.
- Added browser.capability-apis in both locales and registered it in the repository and supplementary-browser curriculum. Source row and evidence IDs are recorded in FULL_SOURCE_CONTENT_AUDIT.md.
- New catalog total: 43 EN/RU lesson pairs (26 core + 17 supplementary). Content/source parity remains incomplete: 21 Notion fetches report unverified; 25 HTML lesson files have not all received full line-by-line parity review.
- Keep HTML learner routes/files until JSON content is reviewed and cutover is verified. Supabase follows that gate; no Supabase changes in this checkpoint.


## Handoff update — 2026-10-26

- Capability-API content/docs commit 2c64927ddcdef1e79ae7fa52dcacbcdae79a4abe passed CI run [40284807922](https://github.com/Mardakhay/interactive-guides/actions/runs/40284807922).
- Next source slice is bilingual js.typed-arrays-binary, registered in supplement-js-internals. It covers buffer/view distinction, byte offsets, conversions, explicit endianness, transfer detachment and packet parsing; FULL_SOURCE_CONTENT_AUDIT.md carries the matrix/evidence row.
- After it lands, inventory will be 44 EN/RU pairs (26 core + 18 supplementary). Complete source parity remains open; keep legacy routes and files until the JSON content gate is actually reviewed. Supabase follows JSON route cutover.


**CI correction — 2026-10-26:** run [40285183316](https://github.com/Mardakhay/interactive-guides/actions/runs/40285183316) on `d187359b32cd95dbc859952032b465853daa554a` caught a test-fixture typo: the line-range test used a literal backslash+n delimiter instead of a newline delimiter, so it counted each walkthrough as one line. The content ranges were valid. The assertion remains intact; only the delimiter is corrected, and the full CI suite must pass on the follow-up SHA.


## Binary-data lesson CI follow-up — 2026-10-26

The first binary-data lesson CI run [40285183316](https://github.com/Mardakhay/interactive-guides/actions/runs/40285183316) failed only because its line-range test used a literal backslash-n delimiter. The test was corrected without weakening its range assertion. Follow-up SHA `bef3e581f966e41262e2da00d60da621b3a2d6ce` passed lint, typecheck, tests, and production build on [CI run 40285395490](https://github.com/Mardakhay/interactive-guides/actions/runs/40285395490). Lesson content remains in review; the broad source parity and legacy HTML cutover gates remain open.


## intro.dev.html full-read checkpoint — 2026-10-26

Completed the full 3,472-line source read, including five chapters, 20 interactive quiz items and 10 starter/solution exercises. It maps across existing npm/tooling, TypeScript, React, API Hooks, testing and browser-storage lessons. The pass identified the missing TypeScript utility-types topic; the bilingual core TS lesson now explains Pick/Omit/Partial, compile-time/runtime limits, a walkthrough, explained check and applied exercise. Detailed per-chapter evidence and outdated sample caveats are in FULL_SOURCE_CONTENT_AUDIT.md. Source parity is still partial; legacy HTML remains intact.


## Source audit continuation — 2026-10-26

- Completed a full read of public/lessons/intro.dev.html (3,472 lines; five chapters, 20 quiz items with feedback, and 10 starter/solution coding exercises).
- Added bilingual utility-type instruction to typescript.fundamentals. FULL_SOURCE_CONTENT_AUDIT.md maps the five chapters and notes outdated examples not copied into the app.
- This is one file, not completion of the 25-HTML audit. Keep HTML and learner routes intact. Current exact pre-change feature HEAD: 69321148494698eee4565fb465936d1abefe2283; the next code SHA needs CI.


## js-deep-dive.html full-read checkpoint — 2026-10-26

Completed the full 2,334-line read, including three playgrounds, the interactive lookup tracer, nine quiz questions and five numbered exercises (the page advertises six). The audit records source inaccuracies and block-level mapping. Added bilingual class semantics/private state/super/static/prototype walkthroughs and applied practice to js.object-prototypes. Source interaction parity is partial and the HTML remains intact.


## CI correction in progress — 2026-10-26

CI run [40286184091](https://github.com/Mardakhay/interactive-guides/actions/runs/40286184091) on TypeScript utility-type content failed because an existing translation test still expected four quiz blocks after the lesson gained its fifth knowledge check. The lesson and quiz are retained; this follow-up updates the invariant to five and adds targeted coverage. The associated class-lesson/source-audit work also remains pending CI verification.


## Handoff — 2026-10-26

- Full read completed for public/lessons/js-deep-dive.html (2,334 lines; 3 playgrounds, interactive prototype lookup, 9 questions, 5 numbered exercises despite a UI metric of 6).
- Added class-focused EN/RU instruction and applied task to js.object-prototypes; detailed source/accuracy mapping is in FULL_SOURCE_CONTENT_AUDIT.md.
- CI run 40286184091 caught an outdated TypeScript quiz count assertion after adding utility types. Follow-up updates count 4 to 5 and adds regression coverage. Verify CI on the next feature SHA.
- Keep legacy HTML and routes. Full source parity/cutover and the later Supabase phase remain open.


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


## Continuation checkpoint — 2026-10-26 (CI repair and DOM source pass)

- Pre-change feature HEAD `f1eff946956623ba3a1ccbcdd37832f46d86a032` was **red locally** (3 tests failed, 6 test files errored): the RU `html-iframe-security-walkthrough` block in `html-document-structure` had lost its required `code` field, so Zod parsing of the whole content repository failed; the media-count test had not been raised for the added iframe blocks; and the iframe exercise test wrongly expected `sandbox` in a TODO-only starter. All three are fixed (RU code restored with localized title/link text; counts now 6 checks / 5 walkthroughs / 5 exercises; test asserts three TODOs and a `sandbox` hint). The earlier iframe commits had no recorded CI result, so treat them as unverified until Actions runs on the pushed head.
- `js.dom-events` is now version 4, 58 blocks per locale: new traversal, content-property and state→render sections plus `dom-card-manager-practice`. Evidence and source corrections are in `FULL_SOURCE_CONTENT_AUDIT.md`. Local checks on this head: lint, typecheck, 119 tests across 22 files, and production build passed.
- Source audit: 12 of 25 HTML files fully read. Remaining: deployment-learning, frontend-architecture-and-planning, frontend-auth, frontend-bootcamp-notes, git-reference, interactive-async-js, js_interactive_book, material-ui-masterclass, react-performance-a11y, sql-learning-page, test.guide, ui-design-system-learn, plus a full re-read pass for html-reference. Notion pages remain connector-unverified.
- Next action: push this head, confirm the Actions run on the exact SHA, then continue with the next unread HTML source. Do not merge or force-push; `main` is untouched.


## Full source and content checkpoint — deployment-learning.html — 2026-10-27

- Reviewed the complete `public/lessons/deployment-learning.html` (2,267 lines, 87,126 bytes; source blob `3d1ffe8b95316b9ef7dca4f3201a1f980b07b663`), including all ten topic sections and their interaction scripts.
- Expanded `deployment.production-hosting` to v3, 30 aligned EN/RU blocks: 4 walkthroughs, 4 knowledge checks and 4 scaffolded exercises. New `deploy-domain-*` blocks cover provider-specific DNS instructions, apex vs subdomain, preserving MX/TXT records, verification before HTTPS certificate issuance, and a post-change smoke test.
- Added source-specific regression checks for locale alignment, block IDs/counts, quiz feedback, walkthrough ranges, DNS record preservation, and Vercel/Netlify references. Official provider docs are linked in the lesson. The old visual pipeline simulator, tabs, copy controls and interactive checklist remain documented UI-parity gaps.
- Corrections carried forward: Vite env precedence is mode-specific local > mode-specific > generic local > generic, with process environment highest overall; `VITE_` is public client configuration; do not promise one universal CNAME or fixed propagation/certificate timing.
- Full HTML reads documented: 13/25. Remaining sources still require review, including `frontend-architecture-and-planning.html`, `frontend-auth.html`, `frontend-bootcamp-notes.html`, `git-reference.html`, `interactive-async-js.html`, `js_interactive_book.html`, `material-ui-masterclass.html`, `react-performance-a11y.html`, `sql-learning-page.html`, `test.guide.html`, `ui-design-system-learn.html`, plus the planned `html-reference.html` re-review. Notion source verification is still incomplete; do not cut over/delete legacy routes or start Supabase before parity gates are met.
- Verify lint, typecheck, tests and production build on the exact pushed feature SHA. `main` must remain unchanged; no merge or force-push.


## Full source and content checkpoint — frontend-architecture-and-planning.html — 2026-10-27

- Fully reviewed `public/lessons/frontend-architecture-and-planning.html` (2,081 lines, 93,969 bytes; blob `6171250b897a2167fb62a4767769d149b0f8ae65`), including pattern tabs, accordion interactions, project tree, UI-planning, component strategy, ecosystem, performance and quick-reference sections.
- Updated `frontend.architecture-boundaries` to v3, 28 aligned EN/RU blocks. Added colocation/public-API walkthrough, a public-API knowledge check, an applied feature-folder refactor exercise, a contextual abstraction heuristic, and a non-prescriptive tool responsibility map.
- UI planning, component responsibilities, state ownership and API contracts already overlap with `capstone.design-architecture-planning`; dedicated router/forms/state/UI/testing lessons cover related ecosystem areas. FSD rules are presented as methodology-specific, and `index.ts` is not described as access control unless lint/import boundaries enforce it.
- Source audit: 14/25 full HTML reads. Remaining: `frontend-auth.html`, `frontend-bootcamp-notes.html`, `git-reference.html`, `interactive-async-js.html`, `js_interactive_book.html`, `material-ui-masterclass.html`, `react-performance-a11y.html`, `sql-learning-page.html`, `test.guide.html`, `ui-design-system-learn.html`, plus the planned `html-reference.html` re-review. Notion source verification remains incomplete.
- Run the full CI suite on the exact pushed SHA. Continue on `feat/learning-platform-foundation`; do not merge or alter `main`.


## Full source and content checkpoint — frontend-auth.html — 2026-10-27

- Fully reviewed `public/lessons/frontend-auth.html` (2,300 lines, 90,060 bytes; blob `867a4a5e499a29d60db9335374dee8958a29c9aa`), covering status-code cards, cookies/sessions, access/refresh tokens, JWT, OAuth/PKCE/OIDC/BFF, React auth patterns, storage/XSS/CSRF/CORS, logout, and the interactive decoder/tabs.
- Expanded `frontend.auth-security` to v2, 23 aligned EN/RU blocks: assessed 401/403 handling, JWT decode-vs-verify, OAuth Code + PKCE and token roles, credential storage trade-offs, a concurrency-safe refresh sketch with one retry, and a more demanding threat-model practice task.
- Full HTML reads documented: 15/25. Remaining: `frontend-bootcamp-notes.html`, `git-reference.html`, `interactive-async-js.html`, `js_interactive_book.html`, `material-ui-masterclass.html`, `react-performance-a11y.html`, `sql-learning-page.html`, `test.guide.html`, `ui-design-system-learn.html`, plus `html-reference.html` re-review. Notion source verification remains incomplete.
- CI must pass on exact feature head; stay on `feat/learning-platform-foundation` and do not alter `main`.


## Full source and content checkpoint — frontend-bootcamp-notes.html — 2026-10-27

- Fully reviewed `public/lessons/frontend-bootcamp-notes.html` (source blob `7738655ae7d17fa08c282c9839d102c73646a4e2`), including all six month tabs, 24 weekly coverage sections, code samples, five answer reveals, and navigation scripts.
- Verified both `bootcamp-core.en.json` and `bootcamp-core.ru.json` define six months and 24 weeks with the same 26 canonical `lessonIds`. The survey is mapped to canonical lessons; no duplicate handbook lesson was created.
- Matrix records the complete week-to-ID mapping and deliberately excludes unsafe/overgeneralized source statements as standards (notably `git push origin main`, “always use Vite”/benchmark claims, fixed tool-selection rules and missing `fetch` response.ok handling). Legacy six-tab UI and answer reveals remain a parity gap.
- Full HTML reads documented: 16/25. Remaining content reviews: `git-reference.html`, `interactive-async-js.html`, `js_interactive_book.html`, `material-ui-masterclass.html`, `react-performance-a11y.html`, `sql-learning-page.html`, `test.guide.html`, `ui-design-system-learn.html`, plus the planned `html-reference.html` re-review. Notion source verification is still incomplete.
- Latest code checkpoint: auth content/test fix commit `29fc1cb46e32a7c2720dceca1bcb3665e2bcd772` passed CI run [40458761411](https://github.com/Mardakhay/interactive-guides/actions/runs/40458761411). The documentation update itself will get a new SHA and requires exact-head CI. `main` remains unchanged.


## Full source and content checkpoint — git-reference.html — 2026-10-27

- Fully reviewed `public/lessons/git-reference.html` (source blob `3f649b4e465e99414d8e2734efdf6c2f3f06d8df`), including searchable/copyable command reference, undo/rebase/stash, branch and remote commands, GitHub Flow, PR/review/collaboration, Markdown/README, Pages, `.gitignore` and sidebar/accordion interactions.
- Mapped to `git.fundamentals` and `git.workflow-ci`. Updated fundamentals to v4 in EN/RU: publishing example now pushes the checked-out branch with `git push -u origin HEAD` after checking team policy; exercise warns against bypassing a required pull request; README/Markdown basics are explicit. Updated tests verify EN/RU parity and those safety expectations.
- Corrections recorded: don't teach `git reset <SHA>` as a harmless rewind; use accurate distinctions between `restore`, `revert`, reset, stash and reflog. GitHub Pages auto-publishing depends on configured source/workflow; `.gitignore` does not remove tracked history or revoke exposed credentials. Legacy search/copy UI remains a parity gap.
- Full HTML reads documented: 17/25. Remaining sources: `interactive-async-js.html`, `js_interactive_book.html`, `material-ui-masterclass.html`, `react-performance-a11y.html`, `sql-learning-page.html`, `test.guide.html`, `ui-design-system-learn.html`, plus the tracked `html-reference.html` re-review. Notion source verification remains incomplete.
- Latest code/content CI verified: auth fix `29fc1cb46e32a7c2720dceca1bcb3665e2bcd772` passed CI run [40458761411](https://github.com/Mardakhay/interactive-guides/actions/runs/40458761411). The documentation checkpoint `962b8a88ad1b97d05962d6d22ee4f34efae21fe3` also passed its exact-head CI. New Git changes need their own full CI. Main remains unchanged.


## Full source and security checkpoint — interactive-async-js.html — 2026-10-27

- Full review of `public/lessons/interactive-async-js.html`, source blob `4b236262c66ef48c002c71a7bc25548f36a413ce`, including all Promise/event-loop/network sections and 97 interactive controls. Existing `js.async-fetch` v2 + `web.internet-http` already cover the syllabus; no duplicate lesson was created.
- Fixed a real DOM-XSS risk in the legacy live GET, joke and POST demos: API response fields and fetch error messages are rendered through `textContent` and DOM nodes, not dynamic `innerHTML`. POST now checks `response.ok` before parsing or announcing success. Added `src/content/legacyAsyncFetchDemos.test.ts` for the security and status-code contracts.
- Audit notes the source's “Five Components”/six-item mismatch, non-guaranteed 3× timing claim, `Promise.race` semantics and overbroad “allSettled never throws” statement. Full HTML reads documented: 18/25; six unread sources remain plus `html-reference.html` re-review; Notion verification remains open.
- Prior code update `60515dce63a7ae0ae51125aa249a1182cb884cce` passed CI [run 40459477061](https://github.com/Mardakhay/interactive-guides/actions/runs/40459477061). This new source/test change needs CI on its exact SHA. `main` remains unchanged.


## Full source and runner-security checkpoint — js_interactive_book.html — 2026-10-27

- Reviewed the whole `public/lessons/js_interactive_book.html` source (84,043 bytes, 1,682 lines; original blob `74cd065086617f9b903a5fc9e0b3b05e7a2e4b30`), including its 20 editors, quizzes, topic navigation and progress UI.
- Existing EN/RU canonical lessons already cover the syllabus: basics v2/46 blocks, functions-arrays-objects v2/71, DOM-events v4/58, async-fetch v2/34. No duplicate all-in-one JavaScript lesson created.
- Replaced same-page `new Function` execution with a dedicated Web Worker; examples have no DOM access, are terminated after 2.5 seconds, and have bounded log/output volume. Reset/re-run stops the existing worker. Added `src/content/jsInteractiveBookRunner.test.ts` for the runner contract. This is page-context isolation, not a network sandbox.
- Full HTML source reads documented: 19/25. Five files remain unread (`material-ui-masterclass.html`, `react-performance-a11y.html`, `sql-learning-page.html`, `test.guide.html`, `ui-design-system-learn.html`) plus the planned `html-reference.html` re-review; Notion source verification remains open.
- Run the complete CI suite on this exact head after the in-flight async-demo fix and runner changes; keep `main` unchanged.


## Full source checkpoint — material-ui-masterclass.html — 2026-10-27

- Reviewed the complete Material UI v9 masterclass (blob `33b619de0bd56186eae81d9a54ae3227eea050d4`, 86445 bytes): installation/version, `sx`, themes/tokens, responsive layout, controls/forms, accessibility and interactive demos.
- Updated `ui.bootstrap-mui` v4 in EN/RU with an installed-version/peer-dependency/migration guide section, a feedback-rich knowledge check, and official Material UI versions and v9 upgrade references. No duplicate course was created; design system, forms and accessibility content remain in their canonical lessons.
- Full HTML reviews: 20/25. Four unread sources remain (`react-performance-a11y.html`, `sql-learning-page.html`, `test.guide.html`, `ui-design-system-learn.html`) plus the tracked `html-reference.html` re-review. Notion verification remains open.
- The previous runner and async-demo security checkpoint passed CI. This new MUI/content/docs commit needs CI for its exact SHA; continue only on `feat/learning-platform-foundation`.


## Full source and content checkpoint — react-performance-a11y.html — 2026-10-27

- Fully reviewed `public/lessons/react-performance-a11y.html` (86,420 bytes, 1,885 lines; blob `cad3d8d1135d443fa01f20d600f54c58e5a3af66`), including the render-cascade and bundle simulators, memoization examples, focus-style demo, ARIA/navigation example, image-alt guidance and interactive handlers.
- Expanded `performance.accessibility` to v4 with 41 aligned EN/RU blocks: added React.lazy named-export and chunk-error guidance, a native navigation disclosure walkthrough (aria-expanded/controls, Escape and focus return), a knowledge check and stronger keyboard/menu exercise criteria. Existing contextual image-alt and favorite-toggle assessment remains.
- The source's blanket child rerender statement, package-size/compression figures and default-export-only statement are treated as simplifications. ARIA is not keyboard behavior; application menu roles need their full keyboard/focus pattern. Simulator/copy UI parity remains partial.
- Full HTML source reviews documented: 21/25. Remaining unread: `sql-learning-page.html`, `test.guide.html`, `ui-design-system-learn.html`, plus the tracked `html-reference.html` re-review. Notion source verification remains open.
- MUI test count fix commit `56d17b467c154b9f0d0a9cb47eed2e6355db4cf2` is running CI; the performance content and docs commit needs its own exact-head CI.


## Full source and content checkpoint — sql-learning-page.html — 2026-10-27

- Fully reviewed `public/lessons/sql-learning-page.html` (112,768 bytes, 2,003 lines; blob `cb73f0f6e6ec317dfba76395836582f18c5b9f75`), including all 11 topics, 7 editors, checks, hints, copy/toggle controls and result-rendering JavaScript.
- Expanded `data.sql-postgresql` to v2 with 46 aligned EN/RU blocks. Added dialect/version checks, MySQL CHECK enforcement nuance, explicit warning that the old query editor returns canned results rather than executing SQL, safe transaction/UPDATE/RETURNING walkthrough and exercise, plus views/CASE/set-operation coverage.
- Official MySQL 8.4 docs are linked: CHECK constraints are enforced by default in current MySQL but can be NOT ENFORCED; older versions differ. LIKE sensitivity and some transaction/correlated-query behavior depend on engine/collation. The legacy runner is pattern-matched canned output, not evidence that arbitrary SQL parses or runs.
- Full HTML source reads documented: 22/25. Remaining unread: `test.guide.html` and `ui-design-system-learn.html`, plus planned `html-reference.html` re-review. Notion source verification is still open.
- Last exact-head performance/accessibility CI passed on `bb409a9b13ce54ee8e96899c26165db7686f7cf4` (run `40462441522`). This SQL commit needs CI on its exact SHA.


## Full source and content checkpoint — test.guide.html — 2026-10-27

- Fully reviewed `public/lessons/test.guide.html` (98,371 bytes, 2,421 lines; blob `5e7004c2a752a2ec90dbe6638161120cc0d4adcc`), including test pyramid, Jest examples/matchers, mock tabs, RTL query priority, `userEvent`, async UI states, FAQs, quiz and interactions.
- Expanded `testing.react-testing-library` to v4, 39 aligned EN/RU blocks, adding Vitest mock lifecycle: call history vs implementation reset vs restoring spies, global stubs, and isolated API mock practice. Added source-specific regression checks and official Vitest references.
- Qualified legacy pyramid/production-cost statistics as heuristics; kept project guidance aligned with Vitest/RTL rather than copying Jest-only commands/global mutation. Tabs, FAQs and exact original quiz UI remain interaction parity gaps.
- Full HTML source reads documented: 23/25. Remaining unread source: `ui-design-system-learn.html`; `html-reference.html` re-review and Notion source verification remain open.


## Full source and content checkpoint — ui-design-system-learn.html — 2026-10-27

- Fully reviewed `public/lessons/ui-design-system-learn.html` (120,500 bytes, 2,430 lines; blob `eb2e17ffacdd1a7fb742153ee3130d7dfb024ed1`), including token tabs, variant/playground controls, Button/Input/Card implementation, compound/forwardRef/polymorphic examples, quiz, live practice challenges and scripts.
- Expanded `ui.design-systems` to v3 / 32 EN/RU blocks. Added accessible custom-field code with label/help/error associations, focus-visible requirement and knowledge check for ref API choice; documented that React 18 and earlier use `forwardRef` where needed while React 19 supports `ref` as a prop. Regression tests and official docs reference added.
- Qualified source caveats: library speed claims and Atomic Design are not universal laws; `outline:none` needs a visible replacement; polymorphic `as` adds semantic and typing complexity. MUI/Bootstrap selection remains in `ui.bootstrap-mui`; keyboard behavior maps to `performance.accessibility`.
- HTML content/code/interaction review count: 24/25. Only `html-reference.html` re-review remains on the audit checklist; Notion source verification remains separate and incomplete.


## Full source re-review — html-reference.html — 2026-10-27

- Re-reviewed `public/lessons/html-reference.html` (recorded source SHA `bd7da030a8e6135d39513188bf66fc1187c12829`, 86,813 bytes, 1,335 lines). Confirmed semantic structure/table/media/iframe topics already map into `html.document-structure`, while form submission, labels and input types map into `html.forms-accessibility`.
- Expanded `html.document-structure` to v6 / 50 aligned EN/RU blocks with text semantics, links/new-tab opener considerations, head/search/social metadata and global attributes. Added code walkthroughs, assessment, official docs references and regression coverage. No duplicate HTML-reference lesson created.
- HTML content/code/interaction reviews now documented: 25/25. The legacy searchable reference and preview/copy tabs remain interaction parity gaps; Notion source verification remains open.


## CI correction and Notion source checkpoint — 2026-10-27

- CI for HTML source commit `ead62fd60a7b4189a2550c9e7ee27ea91776c23d` failed only because the existing HTML content test still expected six knowledge checks and five code walkthroughs. The v6 lesson now has seven knowledge checks and seven walkthroughs; the next commit updates these stale expectations and renames the suite to reflect its wider coverage.
- Fetched Notion `HTML`, `Часть 1`, `Часть 2`, `Часть 3`, `DOM`, `CSS`, `GIT`, `JavaScript`, and the parent handbook. The fetched pages show `verification.state=unverified`; source read/mapping is not formal Notion verification. No Notion content or status was modified.


## Notion mapping ledger checkpoint — 2026-10-27

- Added a source-fetch ledger for nine Notion pages with their last-edited metadata, returned-content length, canonical destination mapping and remaining review work.
- All nine fetched pages report `verification.state=unverified`. Page text was read for mapping; this does not mark Notion formal verification complete. Detailed factual checks and example parity stay open.
- The exact-head CI for `e1b26f6beed58ce444258e0c215f83e873991ed7` passed [run 40466672880](https://github.com/Mardakhay/interactive-guides/actions/runs/40466672880). The current source-review changes remain on `feat/learning-platform-foundation`; `main` is unchanged.


## Notion ledger checkpoint — 2026-10-27

- Expanded the Notion source-fetch ledger from nine to twelve pages by adding Parts 4–6 (React ecosystem, UI/performance/testing/workflow, architecture/professional practice) with returned text length, last-edit date, topic mapping and open parity work.
- All 12 fetched pages still report `verification.state=unverified`; this is accurately recorded. Reading content and mapping lessons does not formally verify Notion pages or complete claim-by-claim fact checks.
- Commit `8f8679bb2717c9025b203efeeb1409a62a9b10c2` is the current documentation checkpoint; check exact-head CI after this ledger extension.


## Part 5 source mapping checkpoint — 2026-10-27

- Expanded `FULL_SOURCE_CONTENT_AUDIT.md` with the 5.1–5.9 subsection map for Notion Part 5. Design system, performance, accessibility, testing, PR/review, CI/CD, conflict strategy, common quality errors and professional workflow are now individually mapped to canonical lessons and evidence IDs.
- Critical distinctions are explicit: the Notion page uses Jest examples while the repo uses Vitest; CI must apply to the exact commit; continuous delivery differs from deployment; accessible semantics require behavior/focus testing. Legacy tabs/playgrounds are still not one-to-one.
- Source metadata remains `verification.state=unverified`; this mapping is not formal Notion verification.


## Part 6 SOLID gap closed — 2026-10-27

- Source inspection found that `frontend.architecture-boundaries` covered dependency direction, boundaries, colocation and state ownership, but did not explicitly teach the five SOLID principles covered in Notion Part 6 sections 6.11–6.15.
- Expanded `frontend.architecture-boundaries` to v4 / 34 aligned EN/RU blocks: all five principles with frontend-specific trade-offs, a typed order-flow walkthrough using narrow contracts, a knowledge check and applied refactoring exercise. The content explicitly cautions against mandatory layer stacks and speculative abstractions.
- `FULL_SOURCE_CONTENT_AUDIT.md` now maps Part 6 sections 6.1–6.18 to architecture and capstone destinations, with SOLID marked as newly covered and Notion status kept `unverified`.


## Notion fetch ledger reconciled to 21 pages — 2026-10-27

- The detailed ledger now covers all 21 fetched Notion pages: 20 course-related pages plus one separate English assessment. Added Parts 4–6 and nine supplementary/reference pages (Advanced JS, the full JavaScript guide, How JavaScript Works, Master Prompt, English Assessment, Internet Fundamentals, Sass/SCSS, Bootstrap and SQL), with last-edited dates, returned text sizes, mappings and open parity work.
- Every fetched page reports `verification.state=unverified`. Master Prompt is tracked as teaching/process guidance, English Assessment is outside the technical frontend curriculum, and the Bootstrap reference explicitly targets v4. Source reads do not constitute formal Notion verification.
- SOLID content commit `e4b2de1d9bd71bb5547d070f5d007503ab0db5c3` exposed a Zod failure because `arch-solid-check.prompt` was missing; follow-up `4473d094a60c0b85c569390778605b58769eb6d2` fills both locale prompts. CI for the follow-up must be checked on its exact head.


## Current inventory/status reconciled — 2026-10-27

- Current tree count: 44 EN/RU lesson pairs (26 core + 18 supplementary, 88 locale lesson JSON files). Older 37/40/42/43-pair counts elsewhere in this handoff are dated history, not current inventory.
- HTML source content/code/interaction review checklist: 25/25 documented. Exact source-to-block claims and one-for-one app-side UI interaction parity remain partial; legacy sources/routes stay in place.
- Notion source ledger is one 21-page table: 20 frontend-course pages plus one separate English assessment. All are marked `verification.state=unverified` in Notion metadata; read/mapped is not formal verification.
- `frontend.architecture-boundaries` v4 explicitly covers SOLID (34 aligned blocks). The prompt-fix code SHA `4473d094a60c0b85c569390778605b58769eb6d2` passed CI run [40467814647](https://github.com/Mardakhay/interactive-guides/actions/runs/40467814647); latest docs HEAD needs separate CI.


## Part 4 content regression coverage — 2026-10-27

- Added source-specific assertions for `react.router-spa`, `react.forms-validation` and `react.context-shared-state`: query-param/shareable URL state and not-found/host fallback, accessible form-error associations plus FormData/RHF submit flow, and custom-Hook instance ownership plus reducer/Context boundaries.
- Existing API v4 regression tests for debounce versus abort/stale response, Fetch status semantics, retries and service boundaries remain active. These assertions protect the stated lesson content and EN/RU structure; they do not mean all code snippets are executed or that legacy interactions are identical.


## Advanced JS tooling continuation — 2026-10-27

- `tooling.advanced-package-workflows` v2 now has 17 aligned EN/RU blocks. New content maps npm scripts and the project's `npm ci` → dev → typecheck/lint/test/build workflow, with distinctions between Vite, Webpack, Babel, `tsc`, ESLint, Prettier, and the repository's Vitest runner.
- Added an assessed check, applied repository-toolchain task, official tool references, and tests for EN/RU parity, walkthrough line ranges, feedback length, exercise rubric and link presence.
- Source note: the Advanced JS Notion page is still `verification.state=unverified`; this focused subsection review does not close the full page's remaining source parity or UI interactions.


## Advanced JS regex continuation — 2026-10-27

- `js.regex-text-processing` v2 adds two source-driven walkthroughs for phone/password/URL/hashtag/whitespace examples and safely escaping dynamic text before `new RegExp`, plus a feedback-rich knowledge check.
- The flags list now includes `d`, `g`, `i`, `m`, `s`, `u`, `v`, and `y`; the lesson marks practical format patterns as limited rules and links the current MDN RegExp reference. Regression tests protect 22-block EN/RU parity, five walkthrough ranges, three quizzes, dynamic escaping and exercise rubric.


## Advanced JS collections continuation — 2026-10-27

- `js.collections-weakmaps` v2 adds a Map methods/iteration walkthrough, Set union/intersection/difference examples, and a Symbols walkthrough with `Symbol.for`, symbol-key inspection and `Symbol.iterator`. New assessment clarifies that `Object.keys` omits symbol keys and symbols are not private storage.
- Regression tests now protect v2's 23 aligned blocks, six walkthroughs, three checks, valid line ranges, required Map/Set/Symbol APIs, warning text and official MDN links. WeakMap/WeakSet lifetime guidance remains intact.


## Memoization source checkpoint — 2026-10-27

- `js.runtime-memory` v3 has 30 aligned EN/RU blocks. It adds explicit cache-key selection, safe `Map.has` handling, invalidation/lifetime caveats, a feedback-rich check and a coding task that varies currency as a cache dimension.
- Tests assert valid walkthrough ranges, key selector use, JSON stringify caveat, check feedback, practice rubric and official Map references. TTL/async cache implementation remains partial; Notion's recursive Fibonacci example and universal JSON.stringify advice were explicitly qualified.


## DOM throttle source continuation — 2026-10-27

- `js.dom-events` v5 adds `dom-throttle-walkthrough` and `dom-throttle-check`; the existing `dom-advanced-practice` now explicitly asks for same-reference listener teardown and states the leading/trailing behavior requirement.
- EN/RU lessons have 62 aligned blocks, 15 walkthroughs and 11 checks. Tests protect ranges, `Date.now`, passive listener option, removeEventListener, feedback, task rubric and MDN reference.


## DOM throttle follow-up — 2026-10-27

- Latest CI identified the `dom-references` bibliography as the sole failed assertion in the v5 throttle coverage. Added the official MDN `EventTarget.addEventListener` reference to both locales; the test continues to assert exact listener cleanup and the associated documentation link.
- Verify CI against the new commit SHA before moving on; keep `main` unchanged.


## DOM throttle localized-test follow-up — 2026-10-27

- CI after the MDN bibliography fix found one remaining locale-blind assertion: it expected the English phrase `callback reference` in both translations. Changed it to assert the matching EN/RU phrase based on `lesson.locale`; the behavior, cleanup and reference assertions remain.


## DOM throttle bilingual exercise test — 2026-10-27

- The next CI run after localizing the quiz explanation exposed a matching issue in the practice rubric: the `callback reference` assertion was still English-only. It now selects an EN/RU phrase by `lesson.locale`; teardown/range/API/reference coverage stays intact.

## IndexedDB CRUD/source pass — 2026-10-27

- Expanded `browser.storage-indexeddb` to v2 / 30 aligned EN/RU blocks. New walkthroughs cover `add/get/put/delete`, index/range/cursor query and feature-detected `navigator.storage.estimate()`; new knowledge check and repository exercise cover commit timing, cursor progression and quota fallback.
- Corrected fixed-5–10 MB source guidance as non-portable; estimates are origin-level approximations and do not remove the need to handle failed writes. Regression tests cover line ranges, CRUD, index, cursor, quota API and exercise completeness.
- Advanced JS Notion metadata remains `verification.state=unverified`; this is a focused source slice, not a formal verification claim.

## IndexedDB exercise title fix — 2026-10-27

- CI for `0d66dce` exposed a missing required `title` on `indexeddb-crud-practice`. Explicit EN/RU titles are now set; the lesson schema requires this field for every coding exercise. Recheck CI on the new exact SHA.

## Destructuring source follow-up — 2026-10-27

- Expanded `js.functions-arrays-objects` to v3 / 76 aligned EN/RU blocks. Added nested object destructuring, function-parameter destructuring with a default, variable swapping, a knowledge check and warning about null/missing nested paths.
- Expanded `modern-syntax-practice` to require guarded nested access and an object-parameter helper; source parity tests check the walkthrough, localized structure and MDN reference. The Advanced JS Notion page itself remains `unverified`.


## Advanced JS observer API checkpoint — 2026-10-27

- `js.dom-events` expanded from v5 / 62 blocks to v6 / 67 aligned EN/RU blocks. New ResizeObserver walkthrough measures an element and disconnects it at teardown; the Page Visibility walkthrough pauses updates in hidden documents, resumes while visible, prevents duplicate intervals, and cleans up listener and timer.
- Added `dom-observer-signal-check`, expanded the applied observer exercise with resize feedback-loop and hidden-tab lifecycle criteria, and linked MDN Resize Observer/Page Visibility/visibilitychange documentation.
- Advanced JS source status remains partial and Notion metadata `verification.state=unverified`. Covered observer slices include IntersectionObserver/MutationObserver plus ResizeObserver/Page Visibility; XHR, WebSockets, Web Workers and Service Workers still require a focused pass.


## DOM v6 CI follow-up — 2026-10-27

- Exact-head CI for `5446e03` found one stale version assertion in the pre-existing traversal/content/state-render test (`expected 5`, actual v6); all other 136 tests passed and lint/typecheck were green. The test now expects version 6. Verify CI on this follow-up commit.


## Advanced JS realtime API lifecycle follow-up — 2026-10-27

- Expanded `browser.realtime-workers` to v2 / 33 aligned EN/RU blocks. Added XHR upload/download progress and readyState, bounded WebSocket reconnect with jitter and disposal, and version-scoped Service Worker cache cleanup/update caveats.
- Added lifecycle knowledge checks, a WebSocket exercise, official current MDN references, and regression tests for EN/RU parity, walkthrough ranges, progress safeguards, retry cleanup and cache ownership.
- The Advanced JS Notion page remains `verification.state=unverified`; these subsections are mapped, but the whole page is not marked complete.


## Realtime lesson CI assertion update — 2026-10-27

- The first CI for `browser.realtime-workers` v2 showed that the existing `lessonContent.test.ts` suite still expected 2 knowledge checks and 4 walkthroughs. The v2 lesson contains 5 knowledge checks and 7 walkthroughs. Updated those assertions and added targeted checks for progress handling, reconnect safeguards and scoped cache cleanup.
- The broader supplementary lesson tests already check EN/RU registration; exact-head CI for the new correction is pending.


## Advanced JS method-chaining follow-up — 2026-10-27

- Expanded `js.object-prototypes` to v3 / 42 aligned EN/RU blocks with a fluent-method walkthrough, a missing-`return this` check and a validated `PriceBuilder` practice.
- Content separates mutable return-this chains from array/string method return types and Promise chaining (already mapped in `js.async-fetch`). Added regression tests for structure, range, answer cardinality, exercise rubric and official MDN references.
- Notion metadata remains `verification.state=unverified`; this section is mapped, but full-page and legacy visual interaction parity remain open.


## Capability API permission and teardown checkpoint — 2026-10-27

- Fixed `browser.capability-apis` Page Visibility example so `addEventListener` and `removeEventListener` use the same named callback; added a regression assertion against the previous anonymous-handler bug.
- Expanded the lesson to v2 / 20 aligned EN/RU blocks with Notification permission/display flow: secure-context and user-click requestPermission, denied/default handling, ServiceWorkerRegistration.showNotification preference for mobile, desktop constructor fallback and in-page failure fallback. Added MDN refs and exercise requirements.
- Advanced JS Notion source remains `verification.state=unverified`; focused source coverage improved but formal verification and legacy UI parity remain open.


## Memoization TTL source checkpoint — 2026-10-27

- Expanded `js.runtime-memory` to v4 / 35 aligned EN/RU blocks with an async TTL cache: shared in-flight Promise, expiry begins on success, rejected-entry eviction, explicit invalidation/clear, and a guard against stale pending requests undoing invalidation.
- Added a knowledge check and applied exercise with an injectable clock, deterministic expiry tests, retry/invalidation-race requirements and memory-growth policy; regression tests cover ranges, IDs, answer cardinality, exercise rubric and MDN Promise reference.
- TTL is lazy freshness, not a strict memory cap; API/network cache policy remains endpoint-specific. Advanced JS source page metadata remains `verification.state=unverified`.


## Local-data backup/export-restore checkpoint — 2026-10-27

- Added `src/features/backup` with versioned JSON v1 validation and local snapshot/restore, plus `/backup` UI linked in the sidebar. Snapshot includes progress, bookmarks, notes, classic quiz outcomes, and structured quiz attempts, code drafts, practice checklists and section progress.
- Restore parses and validates all datasets before mutation, previews a summary, requires explicit user confirmation, replaces rather than merges data, writes the current structured-learning v2 envelope and removes the legacy record at the end. A write failure triggers best-effort rollback; a rollback failure is reported separately.
- Regression coverage: export/parse round-trip; absent-store defaults; non-mutating legacy structured-state read; malformed stored data; malformed/unsupported backup; replacement and legacy-key cleanup; rollback after a write error; summary counts.
- Exact-head CI for code commit `73a47b96b1c0fc00d454c0cd955f24514bb32024` passed [run #40487424471](https://github.com/Mardakhay/interactive-guides/actions/runs/40487424471). This docs-only checkpoint follows; check CI on its final HEAD before concluding the task.
- Remaining Phase 5 items: independent versioned repositories/migration across all stores, broad unavailable-storage/migration-retry testing, browser download/file-picker smoke evidence, and a documented policy for future local/cloud reconciliation. Supabase remains not started. Keep work on `feat/learning-platform-foundation`; `main` is unchanged.

## Versioned local-store continuation — 2026-10-27

- `src/lib/versionedStorage.ts` now backs progress, bookmarks, notes and classic quiz-result stores with a versioned envelope (`format: interactive-guides-local-store`, `schemaVersion: 1`, `data`). Valid existing raw JSON records are migrated at read time. If migration write fails, the source raw value stays intact and the validated in-memory data remains available so a later read can retry; unsupported or malformed records are not overwritten.
- The independent user backup format is still `interactive-guides-backup` v1. It imports current envelopes and raw legacy datasets, exports a stable portable model, and restores as versioned envelopes for the four classic stores plus the existing structured-learning v2 envelope.
- Tests cover successful migration, migration write failure and retry, unknown future version, invalid state, storage read/write errors, backup reading of versioned records, restoring all versioned records and rollback. Code SHA `3b6bb04caf338282f1f8f52d8724d11f7792b7a3` passed CI run [40489627861](https://github.com/Mardakhay/interactive-guides/actions/runs/40489627861).
- Remaining Phase 5 gates: store action-level integration tests across each slice and browser/device file-picker/download smoke checks. Supabase remains gated until local-first contracts and acceptance evidence are stable. Work remains on `feat/learning-platform-foundation`; do not merge/change `main` as part of continuation.

## Learner-store action test checkpoint — 2026-10-27

- Added `src/features/persistence/storePersistence.test.ts` to exercise state-store actions against persisted schema-v1 envelopes: progress open/complete, bookmark add/dedup/toggle, note editing/blank deletion, and quiz attempt save/clear.
- Shared `versionedStorage.test.ts` covers raw JSON migration, a failed migration write preserving the old raw value, retry on a subsequent read, future schema-version rejection, invalid data and storage read/write errors. Backup tests cover raw and versioned record compatibility and restore envelopes for all four classic stores.
- Exact-head CI passed for code commit `0fd1b488a2a6ea1b1c7c54eda5194b3bb3f4393c` in run [40490205475](https://github.com/Mardakhay/interactive-guides/actions/runs/40490205475). The follow-up docs commit needs exact-head CI.
- Remaining Phase 5 acceptance: real-browser/device checks for download, file picker, invalid/oversize file, confirmation, successful restore and failure/recovery feedback. Do not mark Phase 5 complete until those checks are recorded.

## Backup UI interaction coverage — 2026-10-27

- Expanded `src/app/pages/BackupPage.test.tsx` beyond render-only checks: valid upload/preview, explicit replacement confirmation, successful restore with active-store and persisted-envelope assertions, malformed JSON, pre-read 10 MiB size rejection, and JSON download filename/announcement/object-URL cleanup.
- These are automated Vitest/jsdom interaction tests. The roadmap's real-browser/device gate remains open: still verify native file picker, actual browser download behavior, storage-denied/quota behavior, and the UI flow in supported desktop/mobile browsers.


## Backup file-read race hardening — 2026-10-27

- `BackupPage` now uses a monotonically increasing read token so results from a slower earlier `File.text()` cannot overwrite the preview/status for a newer file selection. The active request is invalidated on unmount as well.
- Added an interaction regression test where an invalid first file resolves after a valid second file; the valid preview/status must remain and no stale error may appear. Exact-head CI for the prior UI interaction tests passed run [40492610625](https://github.com/Mardakhay/interactive-guides/actions/runs/40492610625); this race-fix commit needs its own CI.


## Reconciliation proposal and backup hardening — 2026-10-27

- Added `docs/LOCAL_CLOUD_RECONCILIATION.md` (proposal only) with per-entity conflict rules, schema gaps, idempotency/revision/tombstone requirements and acceptance tests. Supabase remains unimplemented; review note-sync privacy, classic quiz history, bookmark conflict behavior and conflict UX before migration.
- `/backup` UI tests cover import preview, confirmation gating, successful restore to active stores and versioned storage, malformed JSON, 10 MiB guard, dated download filename/status and object-URL cleanup. `BackupPage` ignores stale async file reads after a newer selection and invalidates pending reads on unmount.
- Exact-head CI for backup UI and file-read race hardening: [40492871900](https://github.com/Mardakhay/interactive-guides/actions/runs/40492871900) succeeded on `36f9ee744b20ee14c9d3ac0b2b63e05eba1d0b76` (lint, typecheck, tests, build).


## Global persistence-error visibility — 2026-10-27

- The application shell now mounts `StorageErrorNotice`, which surfaces existing and future `STORAGE_ERROR_EVENT` failures for read/write/remove operations. It uses `useSyncExternalStore` and a separate clear notification so dismissing updates the external snapshot while future errors remain visible.
- EN/RU copy explains that a failed write may remain only in memory; it does not claim the data has been saved. Component tests cover pre-mount failure, live update, dismissal, and Russian copy.
- Code commit `011379483d21de82387c07f9de8248e7efedf200` is under exact-head CI run [40494213854](https://github.com/Mardakhay/interactive-guides/actions/runs/40494213854). Browser/device localStorage privacy/quota checks and `/backup` native file-picker/download smoke testing remain open.


## Storage-error notice final CI checkpoint — 2026-10-27

- `StorageErrorNotice` is mounted in `AppLayout`, uses the versioned storage-error snapshot/events, supports dismiss and later re-announcement, and has EN/RU copy. Component tests cover pre-mount failure, live event, dismissal and locale.
- Final exact-head CI passed for code commit `56197eb6a903d6f808ea5944d01627f7dfc00381` in run [40494779602](https://github.com/Mardakhay/interactive-guides/actions/runs/40494779602). A missing `MemoryRouter` and an unwrapped event update were corrected in the test harness.
- Remaining user-facing acceptance gates are actual browser/device checks for localStorage privacy/quota failures and the `/backup` file picker/download/recovery flow.


## Storage notice shell integration — 2026-10-27

- Added `src/components/layout/AppLayout.test.tsx` to verify a storage write error reported before mount is surfaced by the actual application shell. This protects the wiring between `AppLayout` and `StorageErrorNotice` in addition to the notice's own interaction tests.
- The preceding exact-head component test suite passed run [40495155044](https://github.com/Mardakhay/interactive-guides/actions/runs/40495155044); verify CI on the new integration test before calling it validated. Browser/device localStorage quota/privacy and `/backup` file picker/download checks remain open.


## Storage-error application-shell acceptance — 2026-10-27

- Added `src/components/layout/AppLayout.test.tsx` so the global warning is verified through the actual layout, not only in isolation: a write failure reported before mounting becomes a visible `role=alert` in the app shell.
- Exact-head CI passed on `d2e9fc961b01a28353d72772b8d4d95b5cd1b13b` in run [40495501752](https://github.com/Mardakhay/interactive-guides/actions/runs/40495501752) (npm ci, lint, typecheck, tests, production build).
- Remaining Phase 5 user-environment checks are localStorage privacy/quota behavior and `/backup` file picker/download/recovery in real browsers/devices.

## Backup restore failure recovery — 2026-10-27

- Added page-level tests for both rollback-success and rollback-failure paths. The first preserves the previous raw values and active store state; the second verifies the urgent recovery message and ensures the imported payload is not published into Zustand after a partial storage failure.
- Exact-head CI passed on `c3208ddac964003dd6c119e9fb41a8b78c601435`: [run 40497324096](https://github.com/Mardakhay/interactive-guides/actions/runs/40497324096). Checks: npm install, lint, typecheck, tests and production build.
- Still open: native browser/device localStorage privacy/quota behavior, file picker/download, and restore recovery smoke checks. These cannot be claimed from jsdom tests.

## Backup export and rollback boundary validation — 2026-10-27

- Extended backup tests to validate the downloaded JSON payload itself (format/version, included note content, intended dataset keys, exclusion of UI preferences) and to assert that malformed stored state aborts export before object URL creation.
- Added a storage-unit regression test for failure removing the legacy structured-learning key after replacement writes; all prior raw values must be restored. Existing UI tests cover rollback success/failure and active-store behavior.
- Exact-head CI passed on `814c4d6f51deefb8f8904a4a3a15321aa537d233`: [run 40497807964](https://github.com/Mardakhay/interactive-guides/actions/runs/40497807964). An intermediate test-only failure on `35a79df` was due to jsdom Blob missing `.text()` and was corrected by using `FileReader`.
- Next: continue reviewing Phase 5 acceptance and current source-audit gaps. Manual real-browser/device tests for storage privacy/quota and native file picker/download remain open.

## Structured-learning migration cleanup test — 2026-10-27

- Added a migration test where the v2 envelope write succeeds but removal of the v1 legacy key throws. The current record remains usable, the legacy raw record is preserved, and the central storage alert records the `remove` failure.
- Exact-head CI passed on `9fb38aa1252e6a8f9191b777889b3c8cbe1229dc`: [40498451420](https://github.com/Mardakhay/interactive-guides/actions/runs/40498451420).
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 is open Draft. Real-browser/device localStorage quota/privacy and `/backup` file-picker/download acceptance remain open.

## Backup snapshot-read safety test — 2026-10-27

- `backup.test.ts` simulates a SecurityError while collecting the pre-restore snapshot and verifies that no `setItem` or `removeItem` calls occur and every prior raw value remains unchanged.
- Exact-head CI passed on `b9f500ee8509a986c12b0babd25a2c9947183a90`: [40498940471](https://github.com/Mardakhay/interactive-guides/actions/runs/40498940471).
- Backup/restore failure paths now cover snapshot-read failure, write failure with successful rollback, legacy-key removal failure and rollback failure. Actual browser/device acceptance remains open.


## Lazy lesson content and bundle-size checkpoint — 2026-10-27

- `repository.ts` originally statically imported 44 bilingual JSON lesson pairs. The old production chunk was `repository-*.js` 2,363.77 kB minified / 784.88 kB gzip.
- Added `src/content/lessonManifest.ts` with lightweight EN/RU metadata and changed complete lesson bodies to `import.meta.glob` dynamic imports. Curriculum cards and adjacent links use manifest metadata; opening a lesson loads and validates that body asynchronously. The page has localized loading/failure states and existing same-origin static-asset caching stores loaded chunks after first successful fetch.
- Exact-head CI passed on `55644ccf50f14bcaab796bd6058b25297b621d16` ([run 40504186937](https://github.com/Mardakhay/interactive-guides/actions/runs/40504186937)); tests 181/181. New repository chunk is 54.26 kB / 17.15 kB gzip; entry is 280.15 kB / 92.89 kB gzip. Build budget enforcement is being added separately.
- Offline acceptance still requires W-03: visit a lesson online, revisit that same lesson offline, and test a never-visited lesson offline. The latter is not precached and should fail through a visible loading error, not be described as available offline.


## Dependency audit diagnostics — 2026-10-27

- `npm ci` has consistently reported 12 audit findings (6 moderate, 4 high, 2 critical), but CI previously surfaced only the aggregate count. Added a non-blocking CI diagnostic that calls `npm audit --json` and prints each affected package, severity, advisory links, affected range and the npm-reported fix target.
- This is visibility, not remediation: no dependency upgrades or lockfile changes were made in this step, no audit finding is considered resolved, and no `--force` update is planned without a compatibility review. Check the exact-head CI output, then patch the smallest compatible dependency set and rerun all tests/build.


## Zod security patch — 2026-10-27

- Bumped direct dependency `zod` from `^4.4.3` to `^4.6.7` and updated the matching lockfile package entry. GitHub-reviewed advisory GHSA-mrhx-c7xc-m3w5 marks versions `<4.6.6` affected and `4.6.6` patched; 4.6.7 is the newer same-major patch release.
- Source: https://github.com/advisories/GHSA-mrhx-c7xc-m3w5 and https://github.com/colinhacks/zod/releases.
- Remaining audit findings include Vite/Vitest tooling and React Router 6 routing; they need separate compatibility work rather than blind `npm audit fix --force`.


## Exact-head status refresh — 2026-10-27

- Current feature head: `213dd0db21491f4749d60d5668d841aaa3973a8e`; exact-head CI [40506040390](https://github.com/Mardakhay/interactive-guides/actions/runs/40506040390) passed npm ci, audit diagnostic, lint, typecheck, 181 tests, production build and bundle budget.
- Bundle guard and direct Zod patch are verified. The audit report decreased from 12 to 11 findings; Zod 4.6.7 no longer appears. Current remaining count is 2 critical, 3 high and 6 moderate; Vite/Vitest/Router fixes need planned compatibility migrations.
- `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains open Draft. No local checkout or real-browser/device acceptance is claimed.


## Standard CI follow-up

The lockfile-writing migration run was successful, but workflow changes and the config-loader warning fix are a separate commit. Confirm the ordinary pull-request CI run is green on the post-cleanup SHA before treating the latest branch head as final CI-verified. If any check fails, inspect the exact job log rather than relaxing dependency checks or bundle budgets.


## React forms source parity — 2026-10-27

- Fully reviewed `react-forms-tutorial.html`: controlled/uncontrolled approaches, native/custom validation, timing, RHF, server errors, ten quiz questions and five practice tasks.
- `react.forms-validation` v3 adds cross-field password confirmation with field-keyed validation errors, `aria-invalid`/`aria-describedby`, and a knowledge check for stale dependent-field errors. Tests protect EN/RU parity and walkthrough line ranges.
- The source's malformed password-length comparison is not copied. Controlled vs uncontrolled and RHF guidance remain contextual, not universal rules. HTML quiz/accordion interaction parity remains partial.

## Legacy route/crosswalk safety checkpoint — 2026-10-27

- The classic catalog contains 25 legacy IDs. A quick regex inventory initially missed `sec-001` because that prefix has three letters; direct source inspection confirmed the `frontend-auth.html` fallback is already registered. No speculative loader change was made.
- Added a regression test iterating the entire catalog: each entry must resolve to a non-empty in-app body or a `/lessons/*.html` source that exists under `public/`. This guards new catalog entries against silently producing an empty lesson.
- The 44 structured IDs do not reuse the legacy catalog IDs. Progress, bookmarks and notes are keyed by lesson ID, so route cutover without an explicit crosswalk and tested state-retention policy could orphan learner data. Before cutover, specify one-to-many destinations or keep-legacy dispositions for every legacy ID.
- The new regression/test-doc commit requires exact-head CI; keep the legacy routes and source files until the content-parity and learner-state migration gates have evidence.

## Legacy-route cutover matrix — 2026-10-27

The new [legacy route cutover matrix](./LEGACY_ROUTE_CUTOVER_MATRIX.md) lists all 25 legacy IDs, HTML sources, provisional structured destinations and known parity gaps. It is intentionally a candidate map, not authorization to redirect any route. Progress/bookmark/note records are keyed by old lesson ID; mapping decisions and store migration tests remain open.


## Bilingual capstone path and localized learning-path notes — 2026-10-28

- Code commit [`2d02c25`](https://github.com/Mardakhay/interactive-guides/commit/2d02c25668a04597ace23992cf5a7d5afe75e2ad) adds the `structured-capstone` learning path with six existing structured lessons in order: requirements, architecture, implementation, testing, deployment, and review/demo. Existing classic paths and lesson IDs are preserved.
- The same commit adds Russian translations for every configured path-step note (46 total), keyed by path ID plus lesson ID. Regression coverage asserts that every step has a Russian variant and EN retains the canonical note.
- The learning-path detail view's bottom Continue action now uses the resolved destination, so structured paths stay on `/:locale/structured-lessons/:lessonId` instead of falling through to `/lessons/:lessonId`.
- This documentation commit updates the root README, adds `docs/CONTENT_AUTHORING_GUIDE.md`, indexes the guide in `docs/README.md`, and refreshes Phase 8 in the roadmap/current-state audit.
- **CI status:** inspect the newest GitHub Actions run for the branch HEAD in [PR #1](https://github.com/Mardakhay/interactive-guides/pull/1); do not infer a green exact-head result from an earlier commit. The workflow runs on pull requests targeting `main`.
- **Still open:** real-browser/device and screen-reader acceptance, final syllabus-outcome review, systematic source-to-block/interaction parity, README screenshots, legacy-route/learner-state cutover, and Supabase reconciliation/RLS work. No cloud sync or route cutover was introduced here.


## Content QA and audited RU copy — 2026-10-28

- Code checkpoint [`1631c1f`](https://github.com/Mardakhay/interactive-guides/commit/1631c1fc9ed8377ebb5194dc1da78b702c981716) passed exact-head CI [run #40679724796](https://github.com/Mardakhay/interactive-guides/actions/runs/40679724796): install, lint, typecheck, 219 tests / 35 files, production build and 125-chunk bundle budgets all passed; `npm audit` reported zero vulnerabilities.
- Added `src/content/lessonQuality.test.ts` to check reference URL uniqueness for every registered structured lesson in both locales, plus regression assertions for 23 audited Russian prose fields.
- Removed 20 repeated reference URL entries across six bilingual lesson pairs: object prototypes, browser real-time/worker APIs, HTML forms/accessibility, Map/Set collections, regular expressions, and Testing Library. Replaced repeated string-based React keys in the structured renderer with per-block index keys.
- Localized the reviewed prose fields in Browser Capability APIs, browser rendering pipeline, IndexedDB, React custom hooks, shared context state, effect-driven lists, Testing Library, npm/Vite tooling, and TypeScript. This is not a claim that all lesson copy has completed human translation review.
- The subsequent documentation-only checkpoint must be validated by the new exact-head CI run before claiming the branch's latest SHA is green.
- **Still open:** broader EN/RU editorial and source-parity review; learning-outcome coverage against the full 24-week syllabus; real-browser/PWA/offline, screen-reader and mobile testing; README screenshots; legacy-route/state migration; Supabase reconciliation/conflict handling and RLS tests. Keep legacy content and routes until the documented gates are met.


## Core week-17 UI-library mapping correction — 2026-10-28

- Audit finding: the canonical 24-week curriculum's week 17 includes UI libraries such as MUI, but `ui.bootstrap-mui` was previously registered only under `supplement-ui-ecosystem`.
- Change: `ui.bootstrap-mui` EN/RU now have `week: 17` and `moduleId: month-5-week-17`; both core curriculum files list it after `ui.design-systems`. The supplementary track now includes only `css.sass-scss`, whose scope remains optional CSS-preprocessor/design-token depth.
- Added regression coverage that week 17 resolves to both lessons in order, the UI-library lesson no longer resolves as supplementary, and Sass/SCSS remains supplementary in both locales.
- Broader lesson-outcome coverage review remains open; this change closes only the verified week-17 mapping mismatch.


## Current registry count correction — 2026-10-28

The registry is now **27 core IDs and 17 supplementary IDs (44 total, bilingual EN/RU)**. `ui.bootstrap-mui` is part of core week 17 after `ui.design-systems`; `css.sass-scss` remains in `supplement-ui-ecosystem`. The earlier 26-core/18-supplement count is superseded by this mapping correction. Full outcome review, legacy source/UI parity, state-preserving route cutover and native browser acceptance remain open.


## Exact-head QA checkpoint — 2026-10-28

GitHub Actions [run #40688503193](https://github.com/Mardakhay/interactive-guides/actions/runs/40688503193) passed on code/content SHA `cc68eaa8c28cb9e96a1f348a163fdaa44768b873`: `npm ci`, `npm run lint`, `npm run typecheck`, 221 tests across 35 files, and `npm run build`. The dependency install/audit step reported 0 vulnerabilities; bundle budgets passed across 125 JavaScript chunks.

- Latest validated code/content SHA: `cc68eaa8c28cb9e96a1f348a163fdaa44768b873`.
- Core curriculum split: 27 IDs / supplementary split: 17 IDs (44 total, bilingual). `ui.bootstrap-mui` is core week 17; `css.sass-scss` remains supplementary.
- Added a full-registry localization test for Russian lesson titles/descriptions and learning outcomes. It found two English-only outcomes in `js.runtime-memory`; the RU text is now translated and both locales are v5. The test suite checks this across all 44 registered lesson pairs.
- Added duplicate-reference URL regression across all registered lessons and translated 23 explicitly audited prose fields across nine Russian lessons.
- This handoff/audit update is documentation-only. Its own exact-head CI should be checked before declaring the branch HEAD green.
- **Still open:** full source-to-block/interaction parity, remaining EN/RU editorial review beyond audited fields, review of every curriculum outcome against topic-level material, legacy learner-state/route cutover, Supabase reconciliation/conflict policy/RLS tests, and real browser/device/mobile/screen-reader/PWA acceptance.


## Cross-locale prose audit and current verified HEAD — 2026-10-28

GitHub Actions [run #40689939570](https://github.com/Mardakhay/interactive-guides/actions/runs/40689939570) passed on exact code/content SHA `12059fd51069df3f3126db470cd2f4744cc157ff`: `npm ci`, lint, typecheck, **222 tests across 35 files**, production build, and bundle budgets across 125 JavaScript chunks. `npm audit` reported zero vulnerabilities.

- Latest code/content HEAD validated: `12059fd51069df3f3126db470cd2f4744cc157ff`.
- The new `cross-locale user-facing prose quality` test scans every registered lesson pair for long text copied verbatim from EN into RU. It intentionally excludes code blocks/references, starter code, CSS quick-reference property lists, event-loop execution traces and code-shaped quiz answers.
- The scan identified and we translated 52 user-facing strings across eight RU lesson files: Browser Workers, IndexedDB, auth/security, modern JavaScript summaries/practice, object invocation, React effects walkthrough, and Node/npm/TypeScript quiz prompts. The English code examples and API identifiers remain as code/technical vocabulary.
- The combined suite now passes 222 tests across 35 files; lint, typecheck, production build, all 125 JS bundle budgets and npm audit (0 vulnerabilities) pass on this exact SHA.
- **Not release-approved yet:** a matching string is an obvious failure, but the scan cannot judge nuanced translations or source parity. Full syllabus outcome review, legacy HTML→structured interaction equivalence, Notion-source verification, learner-state route cutover and real browser/device/PWA/screen-reader/mobile checks remain open.


## Production preview smoke added to CI — 2026-10-28

GitHub Actions [run #40691049972](https://github.com/Mardakhay/interactive-guides/actions/runs/40691049972) passed on code/content SHA `28b5c53afd967d2a2488840b494b197398fe467d`: install, lint, typecheck, **223 tests / 35 files**, production build, 125 JavaScript chunk budgets, and a new `npm run smoke:preview` stage. The audit step reported zero npm vulnerabilities.

- Added `scripts/check-preview-smoke.mjs` and `npm run smoke:preview`; GitHub Actions runs it after the production build.
- The script starts Vite preview and verifies the app shell at four deep routes (including EN/RU structured lesson routes and the capstone path), the built entry JavaScript, the manifest fields, service-worker v6 scope/private-request guard, exact SVG favicon/PWA artwork match, and PNG signature/dimensions for the 180/192/512px icons.
- This prevents common deployment-path and missing-artifact regressions earlier. It is not a browser: JavaScript event execution, layout, console errors, installability prompts, actual offline behavior, screen reader, and mobile acceptance remain open.
- New docs-only commit after this SHA must be checked by its own exact-head CI before calling the branch HEAD green.
