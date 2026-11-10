# Code-to-requirements conformance audit

**Audit date:** 2026-10-30  
**Audit baseline:** `867c86f67a562bed3f803a92aae55a088337dfcb`  
**Working branch:** `feat/learning-platform-foundation`

This is a code-level comparison with `PRODUCT_REQUIREMENTS.md`, `ARCHITECTURE.md`, `CURRICULUM_AND_CONTENT.md`, `ROADMAP.md`, persistence/PWA documents and source-parity checklists. It is not native browser, mobile, screen-reader, production-deployment or editorial acceptance.

## Implemented foundations

- React 18, TypeScript, Vite, React Router, Zustand, Zod, feature-oriented modules and lazy page loading.
- Six-month / 24-week canonical curriculum; 27 core + 17 supplementary stable lesson IDs, each with EN/RU records.
- Schema-validated lesson blocks rendered through reusable React components; knowledge checks, coding scaffolds, drafts, checklists, references and section-read state.
- A bilingual Practice Center aggregates 118 structured coding exercises, connects to existing per-exercise draft/self-review records, and links to the exact exercise anchor in its lesson. It explicitly distinguishes self-attested activity from automated grading/mastery.
- A bilingual Settings page exposes persisted UI language, the browser online/offline signal, actual local learner-data counts, backup access and an explicit no-cloud-sync notice.
- All application routes are locale-prefixed; legacy unprefixed paths redirect to the saved language while preserving query/hash. Unsupported two/three-letter locale prefixes are repaired to the saved locale. The shared shell has explicit keyboard focus rings, and the mobile sidebar acts as a keyboard-managed dialog with focus trap, Escape close and focus restoration.
- The reusable Modal provides labelled dialog semantics, initial focus, Tab/Shift+Tab containment, Escape/backdrop dismissal, focus restoration and body-scroll restoration. Search filters use a labelled group of mutually exclusive `aria-pressed` buttons rather than incomplete tab semantics.
- Classic quiz result summaries and structured knowledge-check feedback are polite status regions; focus moves to newly rendered result feedback. Note autosave updates a polite status region after the existing debounce. Exercise preview/hints/solution disclosures have stable `aria-controls` targets and hidden/expanded states.
- Separate classic/structured learner identities; local progress, bookmarks, notes, quiz results, structured activity, versioned storage, backup export/import and best-effort rollback.
- PWA manifest/icons, app-shell precache, scoped asset runtime caching, SPA fallback and learner-approved update prompt.
- CI coverage for lint, typecheck, unit/component tests, production build, bundle budgets and production-preview HTTP smoke.

## Publication lifecycle

The lesson schema carried `draft`, `review` and `published`, but the original repository did not use those statuses. The stable-ID manifest now records one status per lesson and checks it against each locale record. Draft lessons are omitted from learner-facing metadata/search. Published lessons cannot carry `translationStatus: review-needed`, and regression tests compare the EN/RU status to the shared manifest status. Review content remains visible in this feature-branch preview with a pilot/review warning; it is not an approved production release.

## Search coverage

Search includes classic lesson metadata, notes, structured lesson titles/descriptions/tags/outcomes and authored block text, plus 24-week month/week topics, practice descriptions, projects and supplementary-track topics. The structured lesson outline also searches safe section-body text, walkthrough examples and command-reference items, so a Git command query can highlight the section containing that command. Search and Practice now load a generated per-locale index built from the canonical lesson JSON rather than fetching all 44 full lesson chunks. The generator validates EN/RU IDs, statuses and block ID/type parity, and emits only approved search fields plus exercise task/rubric summaries. Full lesson bodies remain independently lazy-loaded. The generator produces six bounded search chunks and one separate exercise-summary payload per locale. In the production build, the six search JSON parts total 269,738 bytes gzip for EN / 340,328 bytes for RU, while Practice loads only its dedicated 59,527-byte EN / 75,293-byte RU payload. The largest generated JSON part is 276,641 bytes raw / 69,033 bytes gzip; the largest emitted JavaScript asset is 313,972 bytes raw, below the 512 KiB budget. Exact-head preview smoke verifies all 14 generated assets. Native browser cold/warm latency and mobile transfer still require measurement. Knowledge-check answers/feedback and exercise hints/solutions are excluded from snippets. This is a local in-memory index, not a server search service.

## Known functional gaps

- No evidence-based mastery status or review queue. Completion, quiz submissions, self-reviewed criteria and drafts remain separate activity signals.
- Settings exposes the currently implemented local controls/status. A theme switch, cloud account/sync and comprehensive offline availability controls are not implemented.
- All application screens now support explicit `/:locale/...` URLs. Legacy unprefixed app routes redirect to the saved preference while preserving query/hash; native browser deep-link/refresh acceptance remains open.
- Structured content remains editorially marked `review`; it must not be represented as approved production curriculum.
- 21 fetched/mapped Notion sources remain connector-unverified.
- All 25 legacy route cutover rows remain blocked. Preserve HTML sources and classic routes; no lesson-ID migration, redirects or learner-state fan-out is authorized.
- Supabase auth, SQL migrations, RLS and cloud sync remain unimplemented and gated by reconciliation/security decisions.
- Native browser/device install, offline, backup file picker/download, responsive, keyboard, screen-reader and mobile acceptance remains open.

## Verification boundary

Exact-head CI on this audit baseline passed 56 test files / 338 tests, lint, typecheck, production build, 141 JavaScript chunk budgets and preview smoke for 13 deep routes, 14 generated index assets and PWA files ([run #41045918696](https://github.com/Mardakhay/interactive-guides/actions/runs/41045918696)). The smoke covers Practice Center and Settings. Passing CI verifies only configured checks. It does not prove semantic bilingual equivalence, complete legacy widget parity, browser installability, real offline behavior, assistive-technology behavior or production release readiness. Record browser/device version, tested SHA, scenario and outcome in `BROWSER_SMOKE_TEST_CHECKLIST.md`.

## Safe continuation order

1. Complete source parity and editorial review while retaining all legacy routes.
2. Define and test learner-state retention before any cutover.
3. Extend the Practice Center with an evidence-based mastery/review model only after an independent exercise-evaluation contract exists; measure generated index cold/warm transfer in native browsers.
4. Complete app-wide locale, Settings, responsive/accessibility and native-browser acceptance.
5. Approve Supabase reconciliation/security scope, then implement migrations, RLS and sync.
6. Perform final review and production acceptance before changing PR #1 from Draft.
