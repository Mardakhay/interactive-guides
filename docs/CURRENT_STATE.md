# Current-State Audit

**Audit date:** 2026-10-29  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Working branch:** `feat/learning-platform-foundation`  
**Default branch observed:** `main`

## Authoritative status snapshot — 2026-10-29

This section replaces older status summaries below when they disagree. Historical checkpoints are retained as a work log only.

- **Latest validated source/content/test checkpoint:** `ea9ec62fd7bb9d5895c4969ace95779ce93ac6d0`, exact [Actions run #40850154495](https://github.com/Mardakhay/interactive-guides/actions/runs/40850154495) succeeded: 37 test files / 240 tests, lint, typecheck, production build, 125 JS chunks within bundle budgets, zero npm audit advisories, and production-preview smoke (4 deep routes plus entry bundle, manifest, service worker and 5 PWA assets).
- **Main:** `b13af92576e8a73753a6e3f3d26765d9f9c44397`; it was not changed in this continuation.
- **PR #1:** [open Draft PR against main](https://github.com/Mardakhay/interactive-guides/pull/1).
- **Exact CI evidence:** run #40839614446 passed lint, typecheck, 37 test files / 230 tests, production build, budgets across 125 JavaScript chunks and production-preview smoke. The npm audit report has zero advisories and is informational/non-blocking. This does not establish real-browser/device, screen-reader or mobile acceptance.
- **Curriculum registry:** 27 core + 17 supplementary lesson IDs = 44 bilingual pairs and 88 locale JSON files. `ui.bootstrap-mui` is core week 17; `css.sass-scss` is supplementary.
- **Legacy migration gate:** all 25 legacy cutover rows remain **Blocked**. Git tl-001 has v13 `git.fundamentals` with 72 blocks, 11 checks and 9 walkthroughs, including the 25-command copyable reference and security/least-privilege guidance. Git tl-002 remains v10 with 69 blocks and 19 checks per locale covering original quiz concepts and seven pipeline stages, but canvas/tabs/failure-injection/sequential-quiz behavior remains non-equivalent. Git tooling row tl-003 now has `tooling.node-npm-vite` v6 with 52 blocks, 12 checks and 5 walkthroughs, including the formerly missing Vite config/alias/dev-proxy scenario. `tooling.advanced-package-workflows` is v3. `react.effects-lists-composition` is v6 with the React 18 cleanup warning clarified. Learner-state disposition and manual browser/device/screen-reader acceptance remain open.
- **Notion source evidence:** 21 pages have been fetched/mapped but remain `verification.state=unverified`; this must not be presented as formal verification.
- **PWA/manual acceptance:** HTTP smoke validates the built shell, routes and assets. No native browser/device install/offline, screen-reader, keyboard or mobile acceptance is recorded.
- **Data safety:** classic routes and source HTML remain available. `docs/LEARNER_STATE_MIGRATION_INVENTORY.md` records local keys, identity-bearing fields and mandatory migration invariants; `src/features/persistence/learnerIdentity.test.ts` confirms classic progress/bookmarks/notes and classic quiz results remain distinct from structured lesson/block state. These tests are not approval to migrate data. No redirects/removals should occur before all gates pass.
- **Supabase:** authentication, SQL/RLS and cloud synchronization remain unimplemented and gated by approved scope and reconciliation/security design.


## Source-parity continuation — 2026-10-29

- `git.fundamentals` EN/RU v13: 72 aligned blocks, 11 checks and 9 walkthroughs. Includes 25 individually copyable commands, safe rebase/GitHub Flow, secret-leak remediation and least-privilege guidance.
- `react.effects-lists-composition` EN/RU v6: 45 blocks, 7 checks and 6 walkthroughs. The cleanup note explicitly distinguishes an unmounted state update from a proven memory leak and links the React 18 upgrade guide; existing AbortController + stale-response protection remains tested.
- `tooling.node-npm-vite` EN/RU v6: 52 blocks, 12 checks and 5 walkthroughs. Adds a typed Vite config example for `@` alias, port/open, and dev `/api` proxy; test asserts the production-routing caveat and official Vite docs.
- `tooling.advanced-package-workflows` EN/RU v3: 18 blocks. `pkg-update-range-check` distinguishes `npm update` within declared SemVer ranges from lockfile-frozen `npm ci` and targeted `npm install <package>@latest`.
- `git.workflow-ci` EN/RU v10: 69 aligned blocks per locale, 19 knowledge checks, 5 walkthroughs and 5 exercises. The original `tl-002` quiz concepts are now individually assessed (the existing hotfix back-merge check plus nine new checks), and the bilingual CI diagnosis matrix explicitly covers checkout, install, lint/typecheck, tests, build, security/audit, deployment and current-SHA reruns. Exact-head CI passed in [run #40842019192](https://github.com/Mardakhay/interactive-guides/actions/runs/40842019192): 230 tests / 37 files, lint, typecheck, build, 125-chunk budgets, zero npm audit advisories and preview smoke. The classic canvas/tabs/failure-injection UI remains non-equivalent; `tl-002` remains blocked.
- `js.dom-events` EN/RU v7: 71 aligned blocks per locale, with 13 knowledge checks, 18 code walkthroughs and 5 coding exercises. Added a dedicated static NodeList/live HTMLCollection walkthrough and scored check that demonstrates insertion semantics and a stable snapshot before deletion; live source tree/theme/editor UI remains partial.
- `testing.react-testing-library` EN/RU v6 has 45 aligned blocks, 9 knowledge checks, 5 walkthroughs, 4 exercises and 11 learning outcomes per locale. For `qa-002`, added `toBe` vs `toEqual` reference/structural equality, a scored `queryBy...` absence assertion, and an AAA (Arrange, Act, Assert) check. The project-specific examples use Vitest rather than copying Jest-only setup; original tabs/FAQ/copy/quiz UI remains non-equivalent.
- `tooling.node-npm-vite` EN/RU v4: 44 aligned blocks, 7 knowledge checks and 8 outcomes per locale. Added the `react-ts` Vite template command, HMR explanation/full-reload fallback and official Vite docs; regression tests cover bilingual parity, answers, wording, line ranges and references.
- The exact-head regression checkpoint `2d2548bc770ad1a235465db6f4814f02febe4bfe` is green at [CI #40839614446](https://github.com/Mardakhay/interactive-guides/actions/runs/40839614446). The cutover/UI/state and manual-acceptance gates remain open.

## Focused tl-003 source-parity checkpoint — 2026-10-29

- `docs/TL003_SOURCE_PARITY.md` records the legacy 20-question / 10-exercise crosswalk and the factual caveats. The cutover matrix now points to that evidence.
- The source remains in `public/lessons/intro.dev.html`; automated regression coverage checks all 20 quiz IDs, all 10 reveal IDs, corrected source wording, ESM alias guidance and EN/RU block equivalence.
- EN/RU `typescript.fundamentals` v5 has 48 blocks and adds the Product interface and generic filter walkthroughs. EN/RU `react.components-jsx-state` v5 has 35 blocks and adds Toggle, typed-list and controlled-search walkthroughs. EN/RU `react.api-custom-hooks` v6 has 42 blocks and adds a defensive localStorage walkthrough plus a scaffolded coding exercise.
- Corrected source claims cover Effect cleanup versus memory leaks, native ESM and version-specific Vite bundling, Vitest versus Jest mock APIs, type-module placement as a convention rather than a law, and ESM-safe alias resolution. The existing schema tests now expect the updated lesson versions and correct walkthrough/exercise counts.
- `tl-003` remains **Blocked** until legacy interaction parity, learner-state retention/migration rules and real-browser/device/keyboard/screen-reader acceptance have explicit evidence. Check exact-head GitHub Actions for CI; do not treat a previous commit's status as current.

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

