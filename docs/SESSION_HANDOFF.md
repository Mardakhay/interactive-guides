# Session Handoff

**Last updated:** 2026-10-29  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`

## Authoritative continuation checkpoint — 2026-10-29

This section is authoritative for the current continuation. Earlier dated entries below are a historical work log and must not be mistaken for current head/status.

- **Latest validated code/content checkpoint:** `a2a331a59bed3d40a85f1d02e992e12ca045b272`, passed on [Actions #40836307195](https://github.com/Mardakhay/interactive-guides/actions/runs/40836307195). Subsequent checkpoint-document updates do not change source behavior; `main` remains untouched.
- **Main HEAD observed:** `b13af92576e8a73753a6e3f3d26765d9f9c44397`. Do not commit changes to `main`; work through the feature branch and PR #1.
- **PR:** [#1 — Deepen structured lessons and prepare HTML-to-JSON cutover](https://github.com/Mardakhay/interactive-guides/pull/1) remains open as Draft against `main`.
- **Exact code-checkpoint CI:** [run #40836307195](https://github.com/Mardakhay/interactive-guides/actions/runs/40836307195) passed on `a2a331a59bed3d40a85f1d02e992e12ca045b272`: 36 test files / 227 tests, lint, typecheck, production build, budgets for 125 JS chunks, no npm audit advisories in the informational report, and production preview smoke covering four deep routes, the entry bundle, manifest, service worker and five PWA assets. This does not establish real-browser/device, screen-reader or mobile acceptance.
- **Structured content:** 27 core and 17 supplementary lesson IDs (44 EN/RU pairs, 88 JSON records); `ui.bootstrap-mui` is core week 17 and `css.sass-scss` is supplementary.
- **Legacy parity gate:** `docs/LEGACY_ROUTE_CUTOVER_MATRIX.md` has 25 classic-ID rows and all 25 are **Blocked**. The provisional mapping identifies useful destinations but explicitly lists missing/equivalent behavior. Keep all `/lessons/:lessonId` routes and source HTML. Do not migrate progress, bookmarks, notes, last-opened pointers or quiz results without per-store semantics and tests.
- **Source verification:** the source inventory says 25/25 legacy HTML files received a content/code/interaction review. That is not claim-level or widget parity. The 21 fetched/mapped Notion records are still marked `verification.state=unverified`.
- **Manual acceptance:** every native browser/device checklist case is still unrun. HTTP smoke in CI is limited to the app shell/assets.
- **Cloud sync:** Supabase auth, RLS and sync are not implemented. Continue treating them as gated scope until reconciliation and security requirements are approved.


## Git source-parity continuation — 2026-10-29

- `git.fundamentals` EN/RU v8 has 57 aligned blocks. For legacy `tl-001`, added a worked Markdown README example, Pages source/workflow/base-path/deployment checklist, scored check and applied task. Regression coverage: `src/content/gitReferenceParity.test.ts`.
- `git.workflow-ci` EN/RU v9 has 59 aligned blocks, 10 scored questions, 5 code walkthroughs and 5 practice tasks per locale. For `tl-002`, added operation-specific merge/rebase recovery, actionable review-comment labels, explicit Git Flow feature-to-`develop` and hotfix back-merge guidance, and a scored back-merge check. Tests also keep informational `npm audit` reporting separate from fail-fast lint/typecheck/test/build gates.
- `js.dom-events` EN/RU v7 has 71 aligned blocks, 13 knowledge checks, 18 walkthroughs, 5 exercises and 9 learning outcomes per locale. For `wb-004`, added a direct trace of static `querySelectorAll()` results vs live `getElementsByClassName()` results and an assessed insertion example; the live source demos/editors remain partial.
- `tooling.node-npm-vite` EN/RU v4 has 44 aligned blocks, 7 knowledge checks and 8 learning outcomes per locale. For `tl-003`, it now distinguishes `npm install`, `npx`/`npm exec`, and `npm create`; uses the exact React + TypeScript Vite `react-ts` template syntax; explains HMR and the full-reload fallback; and links official npm/Vite docs. Regression tests assert locale parity, template command, both new correct answers, HMR guidance, line ranges and references.
- Earlier interim runs exposed stale lesson-count/date assertions, one newline-escaping mistake, and literal shell-command strings misclassified as untranslated prose. Those specific checks were corrected; the latest complete code/content checkpoint is `0b20e7cf499c21d8ca3a879a104e11c11d1882f5` with the passing run linked above.
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

**Last updated:** 2026-10-28  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch created:** `feat/learning-platform-foundation`