# Session Handoff

**Last updated:** 2026-10-29  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Base branch:** `main`  
**Working branch:** `feat/learning-platform-foundation`

## Authoritative continuation checkpoint — 2026-10-29

This section is authoritative for the current continuation. Earlier dated entries below are a historical work log and must not be mistaken for current head/status.

- **Feature HEAD before this checkpoint:** `af953df222b108e380da87a38d5862d4363bc922` (`docs: refresh project status and remaining gates`).
- **Main HEAD observed:** `b13af92576e8a73753a6e3f3d26765d9f9c44397`. Do not commit changes to `main`; work through the feature branch and PR #1.
- **PR:** [#1 — Deepen structured lessons and prepare HTML-to-JSON cutover](https://github.com/Mardakhay/interactive-guides/pull/1) remains open as Draft against `main`.
- **Exact-head CI:** [run #40717844032](https://github.com/Mardakhay/interactive-guides/actions/runs/40717844032) passed on `af953df222b108e380da87a38d5862d4363bc922`. Its steps included `npm ci`, lint, typecheck, Vitest, production build/bundle-budget checks and `npm run smoke:preview`. The run does not establish local-checkout, real-browser/device, screen-reader or mobile acceptance.
- **Structured content:** 27 core and 17 supplementary lesson IDs (44 EN/RU pairs, 88 JSON records); `ui.bootstrap-mui` is core week 17 and `css.sass-scss` is supplementary.
- **Legacy parity gate:** `docs/LEGACY_ROUTE_CUTOVER_MATRIX.md` has 25 classic-ID rows and all 25 are **Blocked**. The provisional mapping identifies useful destinations but explicitly lists missing/equivalent behavior. Keep all `/lessons/:lessonId` routes and source HTML. Do not migrate progress, bookmarks, notes, last-opened pointers or quiz results without per-store semantics and tests.
- **Source verification:** the source inventory says 25/25 legacy HTML files received a content/code/interaction review. That is not claim-level or widget parity. The 21 fetched/mapped Notion records are still marked `verification.state=unverified`.
- **Manual acceptance:** every native browser/device checklist case is still unrun. HTTP smoke in CI is limited to the app shell/assets.
- **Cloud sync:** Supabase auth, RLS and sync are not implemented. Continue treating them as gated scope until reconciliation and security requirements are approved.

## Current review notes (2026-10-29)

Repository metadata comparison shows `feat/learning-platform-foundation` is **693 commits ahead of main, 0 behind**, with merge base equal to `main` at `b13af92576e8a73753a6e3f3d26765d9f9c44397`. This includes the feature history; it is not a claim of 693 unique user-facing improvements. The four October 23 content commits discussed earlier are included in the current main tip (`main` ends at `b13af925`), while the feature branch has continued independently. Preserve that history; do not rewrite or force-push either branch.

The current PR body still mentions `283305d` and run `#40701225217` as the latest checkpoint, although that was superseded by `af953df222b108e380da87a38d5862d4363bc922` and run `#40717844032`. Update PR status text when the next verified checkpoint is available.

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