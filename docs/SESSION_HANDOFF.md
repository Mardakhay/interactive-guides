# Session Handoff

**Last updated:** 2026-11-03  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`  
**Working HEAD:** [`66bdcb81d524a82a9b8dfed12c831c8890c57a11`](https://github.com/Mardakhay/interactive-guides/commit/66bdcb81d524a82a9b8dfed12c831c8890c57a11)

## Authoritative continuation checkpoint — 2026-11-03

This section is the source of truth for the next session. Sections below are dated implementation history unless explicitly labelled current.

- **Exact-head validation:** [Actions run #41066740505 (run #890)](https://github.com/Mardakhay/interactive-guides/actions/runs/41066740505) passed on `66bdcb81d524a82a9b8dfed12c831c8890c57a11`: dependency installation, ESLint, TypeScript, Vitest, production build, JavaScript bundle budgets and production-preview HTTP smoke. The exact HEAD was tested; no test-count claim is made here.
- **Latest code change:** `fix(git): preserve interactive state across source tabs`. The seven Git Workflow tab panels are source-aligned in EN/RU; keyboard navigation supports ArrowLeft/ArrowRight/Home/End. Once a panel is visited, its subtree remains mounted while hidden, so an in-progress sequential quiz retains its current question, answer feedback and score when the learner changes tabs and returns.
- **Current Git content:** `git.fundamentals` v14 (72 blocks; 26 copyable commands); `git.workflow-ci` v14 (73 blocks; 19 checks, 5 walkthroughs, 5 exercises, seven tabs, branch graph, pipeline simulator and ten-question sequential quiz). Both locales remain editorially marked `review`.
- **Main/PR safety:** `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`. PR [#1](https://github.com/Mardakhay/interactive-guides/pull/1) remains open as Draft against `main`. Continue only on `feat/learning-platform-foundation`; do not merge or push application work to `main`.
- **Structured content:** 27 core + 17 supplementary lesson IDs (44 EN/RU pairs; 88 JSON records). Practice Center aggregates 118 coding exercises. Settings currently provides local language/network/data/backup controls; theme switching and cloud/account functions are not implemented.
- **Legacy gate:** all 25 rows in `docs/LEGACY_ROUTE_CUTOVER_MATRIX.md` remain **Blocked**. The inventory/review trail for 25 HTML sources does not equal complete line-by-line parity. Preserve all classic lesson routes and HTML sources.
- **Notion source status:** all 21 fetched/mapped records remain `verification.state=unverified`; source-owner/editorial verification is outstanding.
- **Learner data:** classic progress, bookmarks, notes and quiz results have separate identities from structured lesson/block activity. No broad one-to-many mapping, classic aggregate quiz migration or route cutover is approved.
- **Manual acceptance:** browser/device, responsive, keyboard, screen-reader, PWA install/offline, native backup import/export and mobile performance checks remain not run. HTTP smoke is not a substitute.
- **Cloud:** Supabase auth, SQL/RLS and sync are not implemented. First approve reconciliation, conflict, deletion/tombstone and cross-user isolation requirements.
- **Next sequence:** (1) complete source-to-block/editorial review, (2) settle learner-state retention/migration policy, (3) execute the browser/device checklist, (4) decide the remaining product scope, then (5) review deployment and PR acceptance. Keep PR #1 Draft until its gates are evidenced.
## Git source-parity continuation — 2026-10-29

- `git.fundamentals` EN/RU v14 has 72 aligned blocks, 11 knowledge checks and 9 walkthroughs per locale. Its 26-command/four-category copyable reference adds `git log -S`/`-G`, documents `reset --soft`/`--mixed`/`--hard` and path forms, and links official Git reset/log manuals; safe rebase, Markdown/Pages, GitHub Flow, secret-remediation and least-privilege content remain. Section-title search remains limited to headings; the original sidebar accordion/responsive layout are non-equivalent and `tl-001` remains blocked.
- `react.effects-lists-composition` EN/RU v6 has 45 blocks, 7 checks and 6 walkthroughs. Added an accuracy note on cleanup after unmount: React 18 removed the old warning because a Promise settling later does not by itself prove a memory leak. Cleanup is still needed for external-resource teardown, request cancellation and protection against stale responses. Updated the official React 18 reference and regression assertions.
- `tooling.node-npm-vite` EN/RU v6 has 52 blocks, 12 checks and 5 walkthroughs. Added the missing `vite.config.ts` scenario from legacy exercise 10: React plugin, `@` → `src` alias, port 4000, browser auto-open, and `/api` proxy to `localhost:3001`. It explicitly says the TypeScript compiler may need a matching `compilerOptions.paths`, and `server.proxy` is a dev-server feature—not production-host routing. Added a scored dev-only boundary check and official Vite config/server-options references.
- `tooling.advanced-package-workflows` EN/RU v3 has 18 aligned blocks. Added `pkg-update-range-check` to distinguish `npm update` (refresh resolved packages within existing SemVer ranges by default) from frozen `npm ci` and a targeted `npm install <pkg>@latest` that may change the direct range. Tests validate both locale versions/block counts, the correct answer, feedback/explanation, and the official npm-update documentation. Exact HEAD CI confirms this content and its tests.
- `git.workflow-ci` EN/RU v13 has 72 aligned blocks and 19 scored knowledge checks per locale, with 5 code walkthroughs, 5 practice tasks, a localized seven-stage pipeline simulator, a branch-flow graph and a sequential ten-question quiz. The sequential quiz reuses the ten existing question IDs and `recordQuizAttempt` persistence; it supports previous/next navigation, answer/feedback restoration, progress, live score, final percentage and restart. Restart clears only the in-memory run score/answers; per-question attempt history remains saved. The seven top-level source tabs are still absent. Expanded the diagnosis matrix to cover checkout, install, lint/typecheck, tests, build, security/audit, deployment, and exact-SHA reruns. Regression tests assert all ten source quiz concepts, localized stage labels, answer IDs and explanatory feedback. `tl-002` remains blocked on exact interactive parity and state/browser acceptance.
- `js.dom-events` EN/RU v7 has 71 aligned blocks, 13 knowledge checks, 18 walkthroughs, 5 exercises and 9 learning outcomes per locale. For `wb-004`, added a direct trace of static `querySelectorAll()` results vs live `getElementsByClassName()` results and an assessed insertion example; the live source demos/editors remain partial.
- `testing.react-testing-library` EN/RU v6 has 45 aligned blocks, 9 knowledge checks, 5 walkthroughs, 4 exercises and 11 learning outcomes per locale. For `qa-002`, added `toBe` vs `toEqual` reference/structural equality, a scored `queryBy...` absence assertion, and an AAA (Arrange, Act, Assert) check. The project-specific examples use Vitest rather than copying Jest-only setup; original tabs/FAQ/copy/quiz UI remains non-equivalent.
- `tooling.node-npm-vite` EN/RU v4 has 44 aligned blocks, 7 knowledge checks and 8 learning outcomes per locale. For `tl-003`, it now distinguishes `npm install`, `npx`/`npm exec`, and `npm create`; uses the exact React + TypeScript Vite `react-ts` template syntax; explains HMR and the full-reload fallback; and links official npm/Vite docs. Regression tests assert locale parity, template command, both new correct answers, HMR guidance, line ranges and references.
- Earlier interim runs exposed stale lesson-count/date assertions, newline-escaping mistakes, overly rigid expectations, and a locale-sensitive stage assertion. The `bc02c72a...` interim failure was fixed by checking `тест` in RU instead of requiring English `test`; this was verified by [Actions #40842019192](https://github.com/Mardakhay/interactive-guides/actions/runs/40842019192). The subsequent `git.fundamentals` rebase change also had interim failures from stale version expectations and misplaced assertions; these were corrected and the final content/test checkpoint `caf410e47427e62cc3c409b0e89f9a4a50f6b54f` passed [Actions #40842971009](https://github.com/Mardakhay/interactive-guides/actions/runs/40842971009).
- Cutover decisions did not change: `tl-001` and `tl-002` remain **Blocked** due to remaining search/sidebar/canvas/simulator/quiz UI parity and learner-state disposition. Do not delete classic HTML or migrate/duplicate progress, bookmarks, notes or quiz results.

## Current review notes (2026-10-29)

Repository metadata comparison shows `feat/learning-platform-foundation` is **693 commits ahead of main, 0 behind**, with merge base equal to `main` at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. This includes the feature history; it is not a claim of 693 unique user-facing improvements. The four October 23 content commits discussed earlier are included in the current main tip (`main` ends at `b13af925`), while the feature branch has continued independently. Preserve that history; do not rewrite or force-push either branch.

PR #1 status text was refreshed on 2026-10-29 to record the verified code checkpoint and the new Git source-parity work. It remains Draft and all cutover rows remain blocked.

## Focused tl-003 source-parity checkpoint — 2026-10-29

- Detailed source-to-block evidence is maintained in [`docs/TL003_SOURCE_PARITY.md`](TL003_SOURCE_PARITY.md); `docs/LEGACY_ROUTE_CUTOVER_MATRIX.md` has been updated, but `tl-003` deliberately remains **Blocked**.
- The legacy `public/lessons/intro.dev.html` is preserved with all 20 quiz cards and 10 solution-reveal sections. A new `src/content/legacyIntroDev.test.ts` guards that inventory, factual claims, locale alignment, and the ESM-safe Vite alias.
- Structured EN/RU content now includes the missing source examples: `typescript.fundamentals` v5 (48 blocks) adds `Product` and generic filtering walkthroughs; `react.components-jsx-state` v5 (35 blocks) adds accessible Toggle, typed-list and controlled-search walkthroughs; `react.api-custom-hooks` v6 (42 blocks) adds defensive `useLocalStorage` walkthrough/practice.
- The legacy page's Effect-cleanup explanation, Vite speed/bundler version notes, Vitest `vi.fn()` vs Jest `jest.fn()`, shared-type-folder convention and ESM `__dirname` example were corrected. Existing schema tests were updated for the intentionally changed lesson versions and walkthrough/exercise counts.
- Before reporting verification, inspect GitHub Actions for the **current feature-branch HEAD**, not an intermediate commit. `npm run lint`, `npm run typecheck`, the complete test suite, build and production-preview smoke must all pass on the final head. Never infer browser/device or screen-reader acceptance from CI.

## Recommended next work, in dependency order

1. Select one source row and perform a bounded, evidence-backed source-to-block review in both locales. Inspect source and destination body, interactive affordances, answers/feedback, references and lesson state. Record specific parity gaps; do not mark a row cutover-ready without a reviewed disposition.
2. Inventory classic and structured storage keys and define safe retention/migration behavior before any route redirects. In particular, one-to-many mappings must not mark every child as completed or clone a note into multiple unrelated records.
3. Run `docs/BROWSER_SMOKE_TEST_CHECKLIST.md` in a real browser/device with synthetic learner data, and record the exact SHA, browser/version, OS/device, network mode and evidence. Never turn an unrun checklist into a pass.
4. Continue syllabus outcome coverage and semantic EN/RU editorial review; inspect uncommon UI strings, keyboard focus, responsive reflow and optional solution disclosure.
5. Verify deployment and screenshot evidence only from the actual deployed build. Do not start Supabase until the local/cloud reconciliation policy and RLS/cross-user isolation tests are approved.

## Validation commands

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run smoke:preview
```

These commands must be run on the target feature-branch checkout. The current evidence is GitHub Actions on the exact commit above, not a local execution. The smoke command is an HTTP/app-shell check, not native browser acceptance.


# Session Handoff

**Last updated:** 2026-10-29  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch created:** `feat/learning-platform-foundation`


## Focused js-003 memory source review — 2026-10-29

The source-to-block map is in `docs/JS003_SOURCE_PARITY.md`. Corrected the classic lesson’s stack/heap memory map, fixed byte/size and recursion-depth claims, string-interning and hidden-class guarantees, leak explanations, and false implication that the GC demo controls real collection. Regression assertions are in `src/content/legacyJsMemoryMastery.test.ts`; preserve all classic controls and keep `js-003` blocked pending interaction parity, learner-state and native acceptance evidence.
