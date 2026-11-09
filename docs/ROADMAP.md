# Implementation roadmap

**Last reconciled:** 2026-11-10  
**Working branch:** `feat/learning-platform-foundation`  
**Pull request:** [#1 — approved local-first platform merge into main](https://github.com/Mardakhay/interactive-guides/pull/1)

This is the one authoritative task list. Dated progress notes and superseded checkboxes live in [ROADMAP_HISTORY.md](./ROADMAP_HISTORY.md); do not count that archive as current backlog.

## Verified baseline

- Latest exact-head checkpoint: [35-commit HEAD `2bf8d15`](https://github.com/Mardakhay/interactive-guides/commit/2bf8d15de30817ae82e2bf05d7b75d03a3ab78ed), [Actions run #42702879533](https://github.com/Mardakhay/interactive-guides/actions/runs/42702879533) passed `npm ci`, production-only audit (**0 vulnerabilities**), ESLint, TypeScript, **66 test files / 363 tests**, production build, all 141 JavaScript bundle budgets and preview smoke for 13 deep routes, manifest, service worker, five PWA assets and 14 generated content chunks. Netlify Preview for this exact HEAD is Ready. Native browser/device acceptance remains a separate post-merge validation task. Git Fundamentals EN/RU is v14 (72 blocks); Git Workflow/CI is v14 (73 blocks) with seven source-aligned tabs, pipeline and branch-flow simulators, and the sequential ten-question quiz.
- The preview smoke covers 13 deep routes, including `/en`, `/ru`, locale-prefixed application routes and legacy aliases, as well as the entry bundle, manifest, service worker, five PWA assets and all 14 generated content chunks. The generated six-part search data totals 272,355 bytes gzip EN / 343,746 bytes gzip RU. The separate 119-exercise Practice index is 59,994 bytes gzip EN / 75,869 bytes gzip RU. Native browser latency and mobile transfer remain unmeasured. Structured lesson outline search also now matches authored section text and command-reference examples, including Git commands.
- The feature history is exactly 35 chronological, reworded commits above `main`. The original 961-commit history is preserved on [`backup/feat-learning-platform-foundation-pre-squash-2026-11-10`](https://github.com/Mardakhay/interactive-guides/tree/backup/feat-learning-platform-foundation-pre-squash-2026-11-10); the prior one-commit state on [`backup/feat-learning-platform-foundation-pre-35-commit-2026-11-10`](https://github.com/Mardakhay/interactive-guides/tree/backup/feat-learning-platform-foundation-pre-35-commit-2026-11-10); and the pre-scope-update 35-commit state on [`backup/feat-learning-platform-foundation-pre-local-first-merge-scope-2026-11-10`](https://github.com/Mardakhay/interactive-guides/tree/backup/feat-learning-platform-foundation-pre-local-first-merge-scope-2026-11-10). The project owner approved merging the local-first platform while retaining all classic HTML routes and learner records.
- Curriculum inventory: 27 core + 17 supplementary = 44 bilingual lesson pairs (88 locale JSON records).
- Practice Center indexes 119 coding exercises. Settings exposes the persisted UI language, browser connectivity signal, local-data counts and backup access.
- Latest audit summary from exact CI: **10 moderate, 0 high, 0 critical** findings. The reported `minimatch` issue affects versions below 11.0.1 ([GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)); dependency remediation still needs a regenerated lockfile and green full CI. CI actions are being updated from v4 to the current Node 24-compatible release lines to remove the runner's Node 20 deprecation warning.
- All 25 legacy route cutover rows remain **Blocked**. No redirects, HTML deletions or learner-ID/state migration are authorized.
- Native browser/device, keyboard, screen-reader, PWA install/offline and production acceptance remain unrecorded.

## Completed implementation milestones

- [x] React/TypeScript/Vite app foundation, feature-oriented modules, routing, Zod schemas and CI checks.
- [x] Six-month / 24-week core curriculum and separate supplementary tracks.
- [x] 44 structured lesson IDs with EN/RU records and lazy lesson loading.
- [x] Local progress, bookmarks, notes, classic quizzes and structured exercise activity stores.
- [x] Versioned local persistence and validated backup/restore with best-effort rollback.
- [x] PWA manifest, icons, app shell, scoped runtime asset cache and learner-controlled service-worker updates.
- [x] Shared publication-status manifest; draft content excluded from learner-facing surfaces; EN/RU status parity enforced.
- [x] Structured search across lesson content, tags, outcomes, curriculum topics and notes; answer feedback and hidden exercise solutions are excluded from search text.
- [x] Bilingual Practice Center with 119 exercises, existing draft/self-review state and deep links to source exercise blocks.
- [x] Bilingual Settings page for local language preference, browser online/offline signal, local-data counts and backup navigation; unsupported cloud/theme controls are explicitly disclosed.
- [x] Current implementation audit, content inventory, handoff and manual acceptance checklist reconciled with the feature branch.
- [x] Make every application route locale-prefixed, preserve legacy root aliases, query/hash on language switch, and sync browser language preference from direct locale routes.
- [x] Add keyboard-managed mobile navigation drawer behavior (initial focus, Tab/Shift+Tab trap, Escape close and focus restoration) plus visible focus rings in the shared shell. Native screen-reader/device acceptance remains open.
- [x] Upgrade the reusable Modal to a labelled dialog with initial focus, Tab/Shift+Tab containment, Escape/backdrop dismissal, focus restoration and body-scroll restoration.
- [x] Make Search filter controls a correctly labelled group of mutually exclusive pressed buttons instead of tabs without associated tab panels; add visible focus to the clear-search button.
- [x] Announce classic quiz result summaries and structured knowledge-check feedback with focus moved to the result; make note autosave status politely announced without changing debounce or persistence.
- [x] Associate structured HTML preview, hints and example-solution disclosures with their controlled panels and verify hidden/expanded state.
- [x] Add a bilingual, keyboard-operable seven-stage Git Workflow pipeline simulator with deterministic failure injection, required/informational/post-merge gate semantics, new-commit retry and deployment rollback.
- [x] Add a bilingual interactive Git Flow branch graph with develop/feature/hotfix pointers, commit parents, feature merge, hotfix production merge/back-merge and release tags.
- [x] Add the seven source-aligned Git Workflow tabs in EN/RU with tab/tabpanel semantics, ArrowLeft/ArrowRight/Home/End keyboard navigation and visited-panel retention so in-progress quiz state survives tab switches.
- [x] Add a localized ten-question Git Workflow quiz using existing knowledge-check blocks and per-question persistence, with Previous/Next, answer restoration, progress, live score, final percentage and restart; preserve its in-progress component state when switching between visited topic tabs.
- [x] Map the legacy JavaScript Object Built-in Methods example into `js.object-prototypes` v4 (47 aligned EN/RU blocks) with a walkthrough, knowledge check, allowlist-based coding practice and regression coverage.

## Post-merge follow-up — legacy content parity and cutover (not blockers for this merge)

The project owner approved merging the current structured local-first platform without moving legacy URLs or learner data. The work below remains a separately tracked follow-up; until each gate is satisfied, classic HTML files and routes stay available and unchanged.

- [ ] **Complete source-to-block semantic parity for the 25 legacy HTML sources.** For every candidate destination, compare sections, factual claims, code/examples, quizzes, correct answers, per-option feedback, references, and EN/RU pedagogical equivalence. Preserve each classic route and HTML source until its evidence is recorded.
- [ ] **Review and sign off the 44 structured EN/RU lesson pairs.** Check technical accuracy, learning outcomes, examples, exercise disclosure, translation quality, references and version-sensitive statements. The current registry is editorially marked `review`; do not call it approved production curriculum.
- [ ] **Verify the 21 Notion source records.** They are fetched/mapped but still carry `verification.state=unverified`; connector retrieval is not formal source verification.
- [ ] **Review all 25 rows in `LEGACY_ROUTE_CUTOVER_MATRIX.md`.** Give each row an evidence-backed disposition: cutover-ready, retain classic, or defer named interactions. No row can be released by topic overlap or green CI alone.
- [ ] **Approve learner-state retention and migration policy before any cutover.** Cover progress, bookmarks, notes, last-opened pointers, classic quiz IDs, structured block IDs and ambiguous mappings. Never fan out one broad legacy completion/note/bookmark/score to multiple destinations by default.
- [ ] **Implement and failure-test only explicitly approved record migrations.** Require write-before-delete, backup, idempotency, unknown/malformed record preservation, quota/write failure, interrupted recovery and rollback tests. Until then, leave old data attached to its original ID.

## P1 — Product completeness and learner experience

- [ ] **Add evidence-based mastery and a review queue.** Define lesson-specific completion policy and independent assessment/rubrics first. Keep self-review, drafts, quiz activity and verified mastery as separate states; do not infer mastery from opened lessons or checked boxes.
- [x] **Finish app-wide locale routing.** All application screens now have shareable `/:locale/...` URLs; legacy unprefixed routes redirect using the saved preference, locale switching preserves the current route/query/hash, and classic lesson URLs remain supported.
- [ ] **Review Settings/theme scope.** Decide separately whether theme switching belongs in a later release; if yes, implement complete light/dark tokens and verify contrast rather than adding a decorative toggle. Cloud/account controls are not planned.
- [ ] **Finish accessibility and responsive review.** Test focus order, skip links, keyboard operation, screen-reader labels/status updates, contrast, reduced motion, touch targets, zoom/reflow and narrow viewport layouts on the full app.
- [ ] **Execute native browser acceptance for persistence and backup.** Test downloads, file picker/import, size limit, confirmation, replacement semantics, storage-denial/quota behavior and rollback messaging with synthetic learner data.
- [ ] **Execute native PWA acceptance.** Test clean install, localized deep-link refresh, revisit of a previously loaded lesson offline, behavior for never-visited lessons, update defer/activation and mobile reflow. Record browser/OS/device and tested SHA.
- [ ] **Review every 24-week learning outcome.** Map each requirement to evidence in a core lesson/practice task and record uncovered or duplicated outcomes.
- [ ] **Measure generated structured-content indexes in real browsers.** CI confirms six bounded search chunks per locale (about 272 KB gzip EN / 341 KB RU total) and a separate Practice payload (about 60 KB EN / 75 KB RU). Record actual transfer, cold/warm latency and mobile performance; verify Practice does not request the search chunks, full lesson bodies remain lazy, and hidden feedback/solutions are absent.
- [ ] **Finish user-facing QA.** Audit uncommon strings, broken/stale references, keyboard/accessibility edge states, screenshots/README and learner journey from onboarding through practice/backup.

## P2 — Backend and cloud features (out of scope; do not implement)

The project owner has explicitly decided not to add a backend. Supabase, authentication, accounts, remote storage and cloud sync are **not planned**. Keep the application local-first; this section is closed as out of scope rather than deferred implementation work.

## P3 — Current merge and post-merge validation

- [x] Review the complete PR scope: local-first structured platform only; no backend, no legacy route redirects/deletions and no learner-state migration.
- [x] Exact-head CI passed on `2bf8d15de30817ae82e2bf05d7b75d03a3ab78ed`: installation, production audit, lint, typecheck, 66 files / 363 tests, build, 141 bundle budgets and preview smoke.
- [x] Netlify Preview for the exact HEAD is Ready.
- [x] Project owner approved merge with legacy routes and local learner data retained.
- [ ] After merge, verify the main-branch CI and Netlify production deploy.
- [ ] Complete the manual browser/device, keyboard/screen-reader, backup/file-picker and PWA install/offline checklist as a separate acceptance stage.
- [ ] Complete editorial review and Notion source verification as a separate content-quality stage; do not claim that the merge grants editorial approval.

## Definition of done for legacy route cutover

A legacy row may be marked ready only when its content mapping is reviewed in both locales, source-specific interactions have an explicit equivalent/retain/defer disposition, learner-state behavior is tested for each record type, accessibility/browser acceptance is recorded, rollback is documented, and the owner approves the decision. Until all of those conditions are met, preserve the legacy URL and source file.
