# Session Handoff

**Last updated:** 2026-10-29  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`

## Authoritative continuation checkpoint — 2026-10-29

This section is authoritative for the current continuation. Earlier dated entries below are a historical work log and must not be mistaken for current head/status.

- **Latest validated source/content/test checkpoint:** `dcb85b2c20234c4d6bd57d8b5b976464cd297113`, passed on [Actions #40844593467](https://github.com/Mardakhay/interactive-guides/actions/runs/40844593467): 37 test files / 234 tests, lint, typecheck, production build, bundle budgets across 125 JavaScript chunks, zero reported npm audit advisories, and production-preview smoke (4 deep routes plus entry bundle, manifest, service worker and 5 PWA assets). `git.workflow-ci` remains v10; `git.fundamentals` is v10 with a bilingual four-category, 25-command reference and per-command copy buttons, alongside the safe-rebase walkthrough and section-outline search.
- **Main HEAD observed:** `b13af92576e8a73753a6e3f3d26765d9f9c44397`. Do not commit changes to `main`; work through the feature branch and PR #1.
- **PR:** [#1 — Deepen structured lessons and prepare HTML-to-JSON cutover](https://github.com/Mardakhay/interactive-guides/pull/1) remains open as Draft against `main`.
- **Manual-acceptance limitation:** green CI and the production-preview smoke do not establish real-browser/device, screen-reader, install/offline, or mobile acceptance.
- **Structured content:** 27 core and 17 supplementary lesson IDs (44 EN/RU pairs, 88 JSON records); `ui.bootstrap-mui` is core week 17 and `css.sass-scss` is supplementary.
- **Legacy parity gate:** `docs/LEGACY_ROUTE_CUTOVER_MATRIX.md` has 25 classic-ID rows and all 25 are **Blocked**. Keep all `/lessons/:lessonId` routes and source HTML. `docs/LEARNER_STATE_MIGRATION_INVENTORY.md` inventories progress, bookmarks, notes, last-opened state, classic quiz results and structured exercise state; format-envelope migration is distinct from lesson-ID migration. Do not redirect or rewrite learner data without explicit per-store rules and failure/recovery tests.
- **Source verification:** the source inventory says 25/25 legacy HTML files received a content/code/interaction review. That is not claim-level or widget parity. The 21 fetched/mapped Notion records are still marked `verification.state=unverified`.
- **Manual acceptance:** every native browser/device checklist case is still unrun. HTTP smoke in CI is limited to the app shell/assets.
- **Cloud sync:** Supabase auth, RLS and sync are not implemented. Continue treating them as gated scope until reconciliation and security requirements are approved.


## Git source-parity continuation — 2026-10-29

- `git.fundamentals` EN/RU v10 has 61 aligned blocks, 8 scored knowledge checks and 7 walkthroughs per locale. The `git-command-reference-list` block is now a typed `commandReference`: 25 commands in four intent categories (basic workflow, inspect/undo, branching, remote collaboration), with command and localized description plus an individual accessible copy button/status. Modern safety guidance warns before `git restore <file>` and `git commit --amend`, omits unconditional `git reset --hard`, and keeps `git revert` as the safer shared-history undo. The safe-rebase walkthrough and bilingual Search sections / Поиск по разделам outline controls remain. Search still matches headings only; full body/command search, exact sidebar/accordion behavior and original page layout remain non-equivalent. `tl-001` stays blocked.
- `git.workflow-ci` EN/RU v10 has 69 aligned blocks and 19 scored knowledge checks per locale, with 5 code walkthroughs and 5 practice tasks. For `tl-002`, added nine scored checks to assess the remaining source-quiz concepts (hotfix origin, branch protection, Git Flow feature target, CI purpose, actionable review feedback, SemVer MINOR, continuous deployment, small-PR reviewability, and `npm ci`) alongside the existing hotfix back-merge check. Expanded the diagnosis matrix to cover checkout, install, lint/typecheck, tests, build, security/audit, deployment, and exact-SHA reruns. Regression tests assert all ten source quiz concepts, localized stage labels, answer IDs and explanatory feedback. `tl-002` remains blocked on exact interactive parity and state/browser acceptance.
- `js.dom-events` EN/RU v7 has 71 aligned blocks, 13 knowledge checks, 18 walkthroughs, 5 exercises and 9 learning outcomes per locale. For `wb-004`, added a direct trace of static `querySelectorAll()` results vs live `getElementsByClassName()` results and an assessed insertion example; the live source demos/editors remain partial.
- `testing.react-testing-library` EN/RU v6 has 45 aligned blocks, 9 knowledge checks, 5 walkthroughs, 4 exercises and 11 learning outcomes per locale. For `qa-002`, added `toBe` vs `toEqual` reference/structural equality, a scored `queryBy...` absence assertion, and an AAA (Arrange, Act, Assert) check. The project-specific examples use Vitest rather than copying Jest-only setup; original tabs/FAQ/copy/quiz UI remains non-equivalent.
- `tooling.node-npm-vite` EN/RU v4 has 44 aligned blocks, 7 knowledge checks and 8 learning outcomes per locale. For `tl-003`, it now distinguishes `npm install`, `npx`/`npm exec`, and `npm create`; uses the exact React + TypeScript Vite `react-ts` template syntax; explains HMR and the full-reload fallback; and links official npm/Vite docs. Regression tests assert locale parity, template command, both new correct answers, HMR guidance, line ranges and references.
- Earlier interim runs exposed stale lesson-count/date assertions, newline-escaping mistakes, overly rigid expectations, and a locale-sensitive stage assertion. The `bc02c72a...` interim failure was fixed by checking `тест` in RU instead of requiring English `test`; this was verified by [Actions #40842019192](https://github.com/Mardakhay/interactive-guides/actions/runs/40842019192). The subsequent `git.fundamentals` rebase change also had interim failures from stale version expectations and misplaced assertions; these were corrected and the final content/test checkpoint `caf410e47427e62cc3c409b0e89f9a4a50f6b54f` passed [Actions #40842971009](https://github.com/Mardakhay/interactive-guides/actions/runs/40842971009).
- Cutover decisions did not change: `tl-001` and `tl-002` remain **Blocked** due to remaining search/sidebar/canvas/simulator/quiz UI parity and learner-state disposition. Do not delete classic HTML or migrate/duplicate progress, bookmarks, notes or quiz results.

## Current review notes (2026-10-29)

Repository metadata comparison shows `feat/learning-platform-foundation` is **693 commits ahead of main, 0 behind**, with merge base equal to `main` at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. This includes the feature history; it is not a claim of 693 unique user-facing improvements. The four October 23 content commits discussed earlier are included in the current main tip (`main` ends at `b13af925`), while the feature branch has continued independently. Preserve that history; do not rewrite or force-push either branch.

PR #1 status text was refreshed on 2026-10-29 to record the verified code checkpoint and the new Git source-parity work. It remains Draft and all cutover rows remain blocked.

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
