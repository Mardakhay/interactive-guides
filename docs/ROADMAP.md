# Implementation roadmap

**Last reconciled:** 2026-10-30  
**Working branch:** `feat/learning-platform-foundation`  
**Pull request:** [#1 — open Draft against main](https://github.com/Mardakhay/interactive-guides/pull/1)

This is the one authoritative task list. Dated progress notes and superseded checkboxes live in [ROADMAP_HISTORY.md](./ROADMAP_HISTORY.md); do not count that archive as current backlog.

## Verified baseline

- Last validated code checkpoint: `94d8358502e9dbcb6456b2efbe86c7d03d5fb5a6`; [exact feature-branch CI run #41043651915](https://github.com/Mardakhay/interactive-guides/actions/runs/41043651915) passed install, ESLint, TypeScript, **53 test files / 335 tests**, production build, 141 JavaScript chunk budgets and preview smoke for 13 deep routes, entry bundle, manifest, service worker, 5 PWA assets and 14 generated content chunks. npm audit reported zero advisories.
- The preview smoke covers 13 deep routes, including `/en`, `/ru`, locale-prefixed application routes and legacy aliases, as well as the entry bundle, manifest, service worker, five PWA assets and all 14 generated content chunks. The generated search data totals 269,738 bytes gzip EN / 340,328 bytes gzip RU; Practice has a separate 59,527-byte EN / 75,293-byte RU payload. Native browser latency and mobile transfer remain unmeasured. Structured lesson outline search also now matches authored section text and command-reference examples, including Git commands.
- Current branch also contains documentation reconciliation after that code checkpoint. `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`; PR #1 remains Draft.
- Curriculum inventory: 27 core + 17 supplementary = 44 bilingual lesson pairs (88 locale JSON records).
- Practice Center indexes 118 coding exercises. Settings exposes the persisted UI language, browser connectivity signal, local-data counts and backup access.
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
- [x] Bilingual Practice Center with 118 exercises, existing draft/self-review state and deep links to source exercise blocks.
- [x] Bilingual Settings page for local language preference, browser online/offline signal, local-data counts and backup navigation; unsupported cloud/theme controls are explicitly disclosed.
- [x] Current implementation audit, content inventory, handoff and manual acceptance checklist reconciled with the feature branch.
- [x] Make every application route locale-prefixed, preserve legacy root aliases, query/hash on language switch, and sync browser language preference from direct locale routes.
- [x] Add keyboard-managed mobile navigation drawer behavior (initial focus, Tab/Shift+Tab trap, Escape close and focus restoration) plus visible focus rings in the shared shell. Native screen-reader/device acceptance remains open.

## P0 — Content parity, publication and migration safety

- [ ] **Complete source-to-block semantic parity for the 25 legacy HTML sources.** For every candidate destination, compare sections, factual claims, code/examples, quizzes, correct answers, per-option feedback, references, and EN/RU pedagogical equivalence. Preserve each classic route and HTML source until its evidence is recorded.
- [ ] **Review and sign off the 44 structured EN/RU lesson pairs.** Check technical accuracy, learning outcomes, examples, exercise disclosure, translation quality, references and version-sensitive statements. The current registry is editorially marked `review`; do not call it approved production curriculum.
- [ ] **Verify the 21 Notion source records.** They are fetched/mapped but still carry `verification.state=unverified`; connector retrieval is not formal source verification.
- [ ] **Review all 25 rows in `LEGACY_ROUTE_CUTOVER_MATRIX.md`.** Give each row an evidence-backed disposition: cutover-ready, retain classic, or defer named interactions. No row can be released by topic overlap or green CI alone.
- [ ] **Approve learner-state retention and migration policy before any cutover.** Cover progress, bookmarks, notes, last-opened pointers, classic quiz IDs, structured block IDs and ambiguous mappings. Never fan out one broad legacy completion/note/bookmark/score to multiple destinations by default.
- [ ] **Implement and failure-test only explicitly approved record migrations.** Require write-before-delete, backup, idempotency, unknown/malformed record preservation, quota/write failure, interrupted recovery and rollback tests. Until then, leave old data attached to its original ID.

## P1 — Product completeness and learner experience

- [ ] **Add evidence-based mastery and a review queue.** Define lesson-specific completion policy and independent assessment/rubrics first. Keep self-review, drafts, quiz activity and verified mastery as separate states; do not infer mastery from opened lessons or checked boxes.
- [x] **Finish app-wide locale routing.** All application screens now have shareable `/:locale/...` URLs; legacy unprefixed routes redirect using the saved preference, locale switching preserves the current route/query/hash, and classic lesson URLs remain supported.
- [ ] **Complete Settings/theme scope.** Decide whether theme switching is in the release scope; if yes, implement complete light/dark tokens and verify contrast rather than adding a decorative toggle. Cloud/account controls remain absent until Supabase scope is approved.
- [ ] **Finish accessibility and responsive review.** Test focus order, skip links, keyboard operation, screen-reader labels/status updates, contrast, reduced motion, touch targets, zoom/reflow and narrow viewport layouts on the full app.
- [ ] **Execute native browser acceptance for persistence and backup.** Test downloads, file picker/import, size limit, confirmation, replacement semantics, storage-denial/quota behavior and rollback messaging with synthetic learner data.
- [ ] **Execute native PWA acceptance.** Test clean install, localized deep-link refresh, revisit of a previously loaded lesson offline, behavior for never-visited lessons, update defer/activation and mobile reflow. Record browser/OS/device and tested SHA.
- [ ] **Review every 24-week learning outcome.** Map each requirement to evidence in a core lesson/practice task and record uncovered or duplicated outcomes.
- [ ] **Measure generated structured-content indexes in real browsers.** CI confirms six bounded search chunks per locale (about 272 KB gzip EN / 341 KB RU total) and a separate Practice payload (about 60 KB EN / 75 KB RU). Record actual transfer, cold/warm latency and mobile performance; verify Practice does not request the search chunks, full lesson bodies remain lazy, and hidden feedback/solutions are absent.
- [ ] **Finish user-facing QA.** Audit uncommon strings, broken/stale references, keyboard/accessibility edge states, screenshots/README and learner journey from onboarding through practice/backup.

## P2 — Cloud and account capabilities

- [ ] **Approve the local-to-cloud reconciliation policy.** Define record identity, revisions, tombstones, concurrent note/draft conflicts, first-login reconciliation and user cancellation.
- [ ] **Implement Supabase only after that approval.** Add SQL migrations, RLS for every user-owned table, environment validation and no-cloud mode. Keep service-role secrets out of browser bundles.
- [ ] **Implement authentication, adapters and visible sync states.** Distinguish local-only, syncing, synced, offline, conflict and error; do not claim synced before server confirmation.
- [ ] **Test security and account lifecycle.** Verify direct cross-user isolation, deletion/cleanup, export and restoration behavior.

## P3 — Release and PR acceptance

- [ ] Run a clean local checkout and record `npm ci`, lint, typecheck, tests, build and smoke results. Remote CI is not a local execution.
- [ ] Review the complete PR diff and latest exact-head CI/deploy preview after all P0/P1 gates have evidence.
- [ ] Verify the actual production deployment and capture current screenshots.
- [ ] Only after content, learner-state, accessibility and production acceptance are signed off, decide whether PR #1 can leave Draft. Do not merge it as part of this work.

## Definition of done for legacy route cutover

A legacy row may be marked ready only when its content mapping is reviewed in both locales, source-specific interactions have an explicit equivalent/retain/defer disposition, learner-state behavior is tested for each record type, accessibility/browser acceptance is recorded, rollback is documented, and the owner approves the decision. Until all of those conditions are met, preserve the legacy URL and source file.
