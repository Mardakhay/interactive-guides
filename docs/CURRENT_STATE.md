# Current-State Audit

> **Content scope update — 2026-11-10:** This is the latest owner decision and supersedes earlier historical notes below that said legacy HTML routes/files would be retained. The active experience is text-only: structured bilingual JSON lessons remain; standalone HTML lesson files are removed from the deploy and their old app routes redirect to the structured curriculum. Structured lessons about HTML itself remain. Existing local browser records are not erased; inactive legacy records are hidden rather than migrated or deleted.

**Audit date:** 2026-11-10  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Working branch:** `feat/text-only-curriculum`  
**Default branch:** `main`

## Authoritative status snapshot — 2026-11-10

This snapshot separates automated evidence from editorial, migration-owner and native-device acceptance. Dated entries below are historical checkpoints and must not override this section.

- **Latest exact-head CI checkpoint:** [35-commit HEAD `2bf8d15`](https://github.com/Mardakhay/interactive-guides/commit/2bf8d15de30817ae82e2bf05d7b75d03a3ab78ed), [Actions run #42702879533](https://github.com/Mardakhay/interactive-guides/actions/runs/42702879533) — all steps passed: `npm ci`, production-only audit (**0 vulnerabilities**), ESLint, TypeScript, **66 test files / 363 tests**, production build, 141 JavaScript bundle budgets and preview HTTP smoke for 13 deep routes, manifest, service worker, five PWA assets and 14 generated content chunks. Netlify Preview for this exact SHA is Ready; manual browser/device checks remain separate.
- **Dependency security:** the exact run reported 10 moderate npm audit findings and zero high/critical findings. The primary actionable issue is `minimatch` below 11.0.1 in the ESLint / TypeScript-ESLint development toolchain ([GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)). Do not force a major override without a regenerated lockfile and a full green CI run; remediation remains open.
- **History safety:** the feature branch is now exactly **35 commits ahead of `main`**, rebuilt from chronological first-parent milestones with rewritten, topic-specific messages. The original 961-commit history remains on [`backup/feat-learning-platform-foundation-pre-squash-2026-11-10`](https://github.com/Mardakhay/interactive-guides/tree/backup/feat-learning-platform-foundation-pre-squash-2026-11-10); the intermediate one-commit version is also preserved on [`backup/feat-learning-platform-foundation-pre-35-commit-2026-11-10`](https://github.com/Mardakhay/interactive-guides/tree/backup/feat-learning-platform-foundation-pre-35-commit-2026-11-10).
- **Post-merge content scope (2026-11-10):** the project owner has chosen a text-only lesson experience. Standalone HTML lesson pages are retired and removed from deployed public assets; the active catalog, search, bookmarks, notes, recommendations and navigation use only structured EN/RU JSON lessons. HTML remains a subject taught by text lessons (for example semantic HTML and forms), not a separate HTML-file lesson format. Old `/courses` and `/lessons/:id` URLs redirect to the structured curriculum. Existing legacy progress, bookmarks and notes in browser storage are not deleted; unsupported legacy entries are simply not displayed. Root `index.html` and application HTML markup remain required. Manual/device and editorial work continue separately after merge.
- **PR #1:** [approved local-first platform merge](https://github.com/Mardakhay/interactive-guides/pull/1); the project owner approved merging without backend or legacy cutover. Remaining content and native acceptance gates do not block this scoped merge.
- **Application foundation:** React 18, TypeScript, Vite 8, React Router 7, Zustand, Zod, feature-oriented modules, generated content indexes, local-first persistence and a PWA shell are implemented.
- **Curriculum registry:** 27 core + 17 supplementary lesson IDs = 44 bilingual EN/RU pairs and 88 locale JSON records. The Practice Center indexes 119 coding exercises. Settings exposes local language preference, browser connectivity, local-data counts and backup access; theme switching, accounts and cloud sync are not implemented.
- **Git Fundamentals:** EN/RU `git.fundamentals` v14, 72 aligned blocks, 11 knowledge checks, 9 walkthroughs and 3 coding exercises. Its command reference contains 26 copyable commands.
- **JavaScript object model:** EN/RU `js.object-prototypes` v4, 47 aligned blocks each. The latest source-parity increment adds Object static methods, a copy/freeze walkthrough, an assessed check and an allowlist-based public-configuration exercise; both locales remain `review`.
- **Git Workflow & CI:** EN/RU `git.workflow-ci` v14, 73 aligned blocks, 19 knowledge checks, 5 walkthroughs and 5 coding exercises. It includes seven source-aligned tabs, the branch-flow simulator, seven-stage pipeline simulator and sequential ten-question quiz. The tab renderer supports keyboard navigation and keeps a visited panel mounted while hidden, preserving in-progress quiz state when switching topics.
- **Content/migration gate:** all 25 legacy cutover rows remain **Blocked**. The 25 HTML source files have an inventory and documented content/code/interaction review trail; this is not a claim of complete claim-by-claim, example-by-example or widget parity. Keep classic `/lessons/:lessonId` routes and `public/lessons/*.html` sources.
- **Notion evidence:** 21 fetched/mapped source records still report `verification.state=unverified`; retrieval is not formal verification or editorial approval.
- **Learner-state safety:** classic progress/bookmarks/notes/quiz identities remain distinct from structured lesson/block identities. There is no approved one-to-many migration or aggregate classic-quiz result migration. Do not redirect routes, fan out records or delete source data before per-store retention rules and failure/recovery tests are approved.
- **Native acceptance:** real-browser/device, responsive, keyboard, screen-reader, PWA install/offline, native backup download/file-picker, storage-denial/quota and mobile performance checks remain unrecorded. CI preview smoke validates HTTP routes/assets, not JavaScript execution or native browser behavior.
- **PWA limitation:** dynamically loaded lesson chunks are cached only after a successful fetch; a lesson never opened online is not guaranteed to work offline.
- **Backend scope:** Supabase, authentication, SQL/RLS, accounts and cloud synchronization are explicitly **not planned**. Local browser storage and JSON backup/restore are the intended persistence model.

## Verification boundary

A green exact-head CI run verifies only the checks configured in GitHub Actions. This merge explicitly excludes legacy route cutover, learner-state migration and backend work. It does not establish semantic bilingual parity, editorial approval, full legacy interaction equivalence, native browser/device acceptance, screen-reader behavior or PWA installation/offline readiness; those remain post-merge validation tasks.
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
- `tl-003` remains **Blocked** until legacy interaction parity, learner-state retention/migration rules and real-browser/device/keyboard/screen-reader acceptance have explicit evidence. CI passed for the code/test checkpoint `05edf0c6cc5bcbf177ffe45f885a8682aeccb4a0` in [Actions #40862454665](https://github.com/Mardakhay/interactive-guides/actions/runs/40862454665): `npm ci`, lint, typecheck, 38 test files / 249 tests, build, 125-chunk bundle budgets, zero reported npm audit advisories, and production-preview smoke. Later Git-data commit `5819fef16a30a016a740a9f43277a49ddfea648d` updated only `docs/SESSION_HANDOFF.md` and `docs/CURRENT_STATE.md`; check Actions against any subsequent HEAD before describing that exact ref as green.

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



## Focused js-003 memory source review — 2026-10-29

The feature branch now includes [JS003_SOURCE_PARITY.md](JS003_SOURCE_PARITY.md) and `src/content/legacyJsMemoryMastery.test.ts`. The 2,737-line classic memory lesson was corrected to distinguish JavaScript semantics from engine-specific stack/heap layout, V8 implementation details, GC behavior and runtime limits. Simulators were retained and clarified as teaching models; the source route remains available. The `js-003` cutover row remains **Blocked** while interaction parity, learner-state disposition, and native browser/accessibility acceptance are open.
