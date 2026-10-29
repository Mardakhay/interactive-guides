# Current-State Audit

**Audit date:** 2026-10-29  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Working branch:** `feat/learning-platform-foundation`  
**Default branch observed:** `main`

## Authoritative status snapshot — 2026-10-29

This section replaces older status summaries below when they disagree. Historical checkpoints are retained as a work log only.

- **Latest validated source/content/test checkpoint:** `2d2548bc770ad1a235465db6f4814f02febe4bfe`, exact [Actions run #40839614446](https://github.com/Mardakhay/interactive-guides/actions/runs/40839614446) succeeded.
- **Main:** `b13af92576e8a73753a6e3f3d26765d9f9c44397`; it was not changed in this continuation.
- **PR #1:** [open Draft PR against main](https://github.com/Mardakhay/interactive-guides/pull/1).
- **Exact CI evidence:** run #40839614446 passed lint, typecheck, 37 test files / 230 tests, production build, budgets across 125 JavaScript chunks and production-preview smoke. The npm audit report has zero advisories and is informational/non-blocking. This does not establish real-browser/device, screen-reader or mobile acceptance.
- **Curriculum registry:** 27 core + 17 supplementary lesson IDs = 44 bilingual pairs and 88 locale JSON files. `ui.bootstrap-mui` is core week 17; `css.sass-scss` is supplementary.
- **Legacy migration gate:** all 25 legacy cutover rows remain **Blocked**. Git `tl-001` has bilingual Markdown/Pages guidance; `tl-002` has merge/rebase recovery and actionable review-comment practice; `tl-003` now distinguishes dependency installation, `npx`/`npm exec` and `npm create` with a scored check. Remaining interactions, complete claim/example parity and learner-state disposition are not signed off.
- **Notion source evidence:** 21 pages have been fetched/mapped but remain `verification.state=unverified`; this must not be presented as formal verification.
- **PWA/manual acceptance:** HTTP smoke validates the built shell, routes and assets. No native browser/device install/offline, screen-reader, keyboard or mobile acceptance is recorded.
- **Data safety:** classic routes and source HTML remain available. `docs/LEARNER_STATE_MIGRATION_INVENTORY.md` records local keys, identity-bearing fields and mandatory migration invariants; `src/features/persistence/learnerIdentity.test.ts` confirms classic progress/bookmarks/notes and classic quiz results remain distinct from structured lesson/block state. These tests are not approval to migrate data. No redirects/removals should occur before all gates pass.
- **Supabase:** authentication, SQL/RLS and cloud synchronization remain unimplemented and gated by approved scope and reconciliation/security design.


## Source-parity continuation — 2026-10-29

- `git.fundamentals` EN/RU v8: 57 aligned blocks, including a Markdown walkthrough and a Pages publishing/deployment verification checklist with quiz and practice.
- `git.workflow-ci` EN/RU v9: 59 aligned blocks per locale, with 10 knowledge checks, 5 walkthroughs and 5 exercises. Added operation-specific merge/rebase recovery, an assessed review-comment taxonomy, explicit Git Flow feature-to-`develop` and hotfix back-merge guidance, and regression checks that informational audit reporting does not make required CI checks non-blocking.
- `js.dom-events` EN/RU v7: 71 aligned blocks per locale, with 13 knowledge checks, 18 code walkthroughs and 5 coding exercises. Added a dedicated static NodeList/live HTMLCollection walkthrough and scored check that demonstrates insertion semantics and a stable snapshot before deletion; live source tree/theme/editor UI remains partial.
- `testing.react-testing-library` EN/RU v6 has 45 aligned blocks, 9 knowledge checks, 5 walkthroughs, 4 exercises and 11 learning outcomes per locale. For `qa-002`, added `toBe` vs `toEqual` reference/structural equality, a scored `queryBy...` absence assertion, and an AAA (Arrange, Act, Assert) check. The project-specific examples use Vitest rather than copying Jest-only setup; original tabs/FAQ/copy/quiz UI remains non-equivalent.
- `tooling.node-npm-vite` EN/RU v4: 44 aligned blocks, 7 knowledge checks and 8 outcomes per locale. Added the `react-ts` Vite template command, HMR explanation/full-reload fallback and official Vite docs; regression tests cover bilingual parity, answers, wording, line ranges and references.
- The exact-head regression checkpoint `2d2548bc770ad1a235465db6f4814f02febe4bfe` is green at [CI #40839614446](https://github.com/Mardakhay/interactive-guides/actions/runs/40839614446). The cutover/UI/state and manual-acceptance gates remain open.

## Highest-priority remaining work

1. Review actual EN/RU destination content against one legacy source at a time and record sections, claims, examples, practice, answer feedback, references and interaction gaps.
2. Define and test retention/migration for progress, bookmarks, notes, last-opened pointers and quiz results before changing route identity.
3. Execute and record the real-browser/device checklist; do not infer success from CI.
4. Complete outcome-by-outcome 24-week curriculum coverage, semantic bilingual review, uncommon UI copy, accessibility and responsive checks.
5. Verify deployment evidence and screenshots. Keep cloud sync separate until reconciliation and RLS/cross-user isolation requirements are approved.

The remainder of this document is a chronological implementation log. It is not the source of truth where dates, lesson counts or CI checkpoints conflict with the snapshot above.

## Existing application

The repository is already a React application, not just a set of HTML files:

- React 18, TypeScript, Vite 8, Tailwind CSS 3
- React Router 7.18.0 (the app still imports through `react-router-dom` for v6-to-v7 compatibility)
- Zustand for state
- Zod schemas
- Vitest 4.1 and Testing Library
- ESLint and GitHub Actions CI (Node 22; pinned npm 11.21.1 for reproducible lockfile handling)

Available scripts from `package.json`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run test:watch`

The current CI workflow runs install, lint, typecheck, tests, and build for pushes and pull requests targeting `main`.

