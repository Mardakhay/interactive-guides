# Code-to-requirements conformance audit

**Audit date:** 2026-10-30  
**Audit baseline:** `5c0e11b0f597b40fd6550b92087b29c979305557`  
**Working branch:** `feat/learning-platform-foundation`

This is a code-level comparison with `PRODUCT_REQUIREMENTS.md`, `ARCHITECTURE.md`, `CURRICULUM_AND_CONTENT.md`, `ROADMAP.md`, persistence/PWA documents and source-parity checklists. It is not native browser, mobile, screen-reader, production-deployment or editorial acceptance.

## Implemented foundations

- React 18, TypeScript, Vite, React Router, Zustand, Zod, feature-oriented modules and lazy page loading.
- Six-month / 24-week canonical curriculum; 27 core + 17 supplementary stable lesson IDs, each with EN/RU records.
- Schema-validated lesson blocks rendered through reusable React components; knowledge checks, coding scaffolds, drafts, checklists, references and section-read state.
- A bilingual Practice Center aggregates 118 structured coding exercises, connects to existing per-exercise draft/self-review records, and links to the exact exercise anchor in its lesson. It explicitly distinguishes self-attested activity from automated grading/mastery.
- A bilingual Settings page exposes persisted UI language, the browser online/offline signal, actual local learner-data counts, backup access and an explicit no-cloud-sync notice.
- Separate classic/structured learner identities; local progress, bookmarks, notes, quiz results, structured activity, versioned storage, backup export/import and best-effort rollback.
- PWA manifest/icons, app-shell precache, scoped asset runtime caching, SPA fallback and learner-approved update prompt.
- CI coverage for lint, typecheck, unit/component tests, production build, bundle budgets and production-preview HTTP smoke.

## Publication lifecycle

The lesson schema carried `draft`, `review` and `published`, but the original repository did not use those statuses. The stable-ID manifest now records one status per lesson and checks it against each locale record. Draft lessons are omitted from learner-facing metadata/search. Published lessons cannot carry `translationStatus: review-needed`, and regression tests compare the EN/RU status to the shared manifest status. Review content remains visible in this feature-branch preview with a pilot/review warning; it is not an approved production release.

## Search coverage

Search includes classic lesson metadata, notes, structured lesson titles/descriptions/tags/outcomes and authored block text, plus 24-week month/week topics, practice descriptions, projects and supplementary-track topics. The structured index loads on the first meaningful query per locale and is cached in memory for the session. Knowledge-check answers/feedback and exercise hints/solutions are excluded from snippets. This is a local in-memory index, not a server search service.

## Known functional gaps

- No evidence-based mastery status or review queue. Completion, quiz submissions, self-reviewed criteria and drafts remain separate activity signals.
- Settings exposes the currently implemented local controls/status. A theme switch, cloud account/sync and comprehensive offline availability controls are not implemented.
- Explicit locale URLs exist for structured lessons, not every legacy/application route.
- Structured content remains editorially marked `review`; it must not be represented as approved production curriculum.
- 21 fetched/mapped Notion sources remain connector-unverified.
- All 25 legacy route cutover rows remain blocked. Preserve HTML sources and classic routes; no lesson-ID migration, redirects or learner-state fan-out is authorized.
- Supabase auth, SQL migrations, RLS and cloud sync remain unimplemented and gated by reconciliation/security decisions.
- Native browser/device install, offline, backup file picker/download, responsive, keyboard, screen-reader and mobile acceptance remains open.

## Verification boundary

Exact-head CI on this audit baseline passed the workflow's install, lint, typecheck, complete test, production build and preview smoke stages ([run #41031107552](https://github.com/Mardakhay/interactive-guides/actions/runs/41031107552)). The smoke covers six deep routes including Practice Center and Settings. Passing CI verifies only configured checks. It does not prove semantic bilingual equivalence, complete legacy widget parity, browser installability, real offline behavior, assistive-technology behavior or production release readiness. Record browser/device version, tested SHA, scenario and outcome in `BROWSER_SMOKE_TEST_CHECKLIST.md`.

## Safe continuation order

1. Complete source parity and editorial review while retaining all legacy routes.
2. Define and test learner-state retention before any cutover.
3. Build a Practice Center and a separate evidence-based mastery/review model.
4. Complete app-wide locale, Settings, responsive/accessibility and native-browser acceptance.
5. Approve Supabase reconciliation/security scope, then implement migrations, RLS and sync.
6. Perform final review and production acceptance before changing PR #1 from Draft.
