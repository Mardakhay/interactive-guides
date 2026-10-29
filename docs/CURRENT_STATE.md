# Current-State Audit

**Audit date:** 2026-10-29  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Working branch:** `feat/learning-platform-foundation`  
**Default branch observed:** `main`

## Authoritative status snapshot — 2026-10-29

This section replaces older status summaries below when they disagree. Historical checkpoints are retained as a work log only.

- **Latest validated code/content checkpoint:** `813d8478da125ce5802334b1ecb355a4d2a73c54`; later status-document commits do not change source behavior.
- **Main:** `b13af92576e8a73753a6e3f3d26765d9f9c44397`; it was not changed in this continuation.
- **PR #1:** [open Draft PR against main](https://github.com/Mardakhay/interactive-guides/pull/1).
- **Exact code-checkpoint CI:** [run #40835609562](https://github.com/Mardakhay/interactive-guides/actions/runs/40835609562) passed on `813d8478da125ce5802334b1ecb355a4d2a73c54`: install, lint, typecheck, 36 test files / 227 tests, production build, bundle budgets, no npm audit advisories in the informational report, and production preview smoke. CI does not replace browser/device or assistive-technology acceptance.
- **Curriculum registry:** 27 core + 17 supplementary lesson IDs = 44 bilingual pairs and 88 locale JSON files. `ui.bootstrap-mui` is core week 17; `css.sass-scss` is supplementary.
- **Legacy migration gate:** all 25 legacy cutover rows remain **Blocked**. Git `tl-001` has bilingual Markdown/Pages guidance; `tl-002` has merge/rebase recovery and actionable review-comment practice; `tl-003` now distinguishes dependency installation, `npx`/`npm exec` and `npm create` with a scored check. Remaining interactions, complete claim/example parity and learner-state disposition are not signed off.
- **Notion source evidence:** 21 pages have been fetched/mapped but remain `verification.state=unverified`; this must not be presented as formal verification.
- **PWA/manual acceptance:** HTTP smoke validates the built shell, routes and assets. No native browser/device install/offline, screen-reader, keyboard or mobile acceptance is recorded.
- **Data safety:** classic routes and source HTML remain available. No redirects/removals should occur before the content and per-store learner-state gates pass.
- **Supabase:** authentication, SQL/RLS and cloud synchronization remain unimplemented and gated by approved scope and reconciliation/security design.


## Source-parity continuation — 2026-10-29

- `git.fundamentals` EN/RU v8: 57 aligned blocks, including a Markdown walkthrough and a Pages publishing/deployment verification checklist with quiz and practice.
- `git.workflow-ci` EN/RU v9: 59 aligned blocks per locale, with 10 knowledge checks, 5 walkthroughs and 5 exercises. Added operation-specific merge/rebase recovery, an assessed review-comment taxonomy, explicit Git Flow feature-to-`develop` and hotfix back-merge guidance, and regression checks that informational audit reporting does not make required CI checks non-blocking.
- `tooling.node-npm-vite` EN/RU v4: 44 aligned blocks, 7 knowledge checks and 8 outcomes per locale. Added the `react-ts` Vite template command, HMR explanation/full-reload fallback and official Vite docs; regression tests cover bilingual parity, answers, wording, line ranges and references.
- Latest code/content verification is green at `0b20e7cf499c21d8ca3a879a104e11c11d1882f5`, [CI #40832351304](https://github.com/Mardakhay/interactive-guides/actions/runs/40832351304). The remaining cutover/UI/state and manual acceptance gates stay open.

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

