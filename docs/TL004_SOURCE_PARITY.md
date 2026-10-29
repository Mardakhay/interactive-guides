# Focused Source-to-Block Review: tl-004 Deployment Learning Guide

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/deployment-learning.html` (2,267 lines).  
**Canonical destination:** `deployment.production-hosting` (EN/RU v4, 34 aligned blocks).

## Scope and decision

The legacy lesson's factual and security-sensitive prose was corrected in place while preserving the original route and its interaction inventory. This is not permission to cut over `tl-004`: the structured lesson teaches the core deployment decisions, but it does not recreate the legacy page's controls, progress behavior, or layout exactly. `docs/LEGACY_ROUTE_CUTOVER_MATRIX.md` therefore keeps this row **Blocked**.

## Source-to-block crosswalk

| Legacy section / task | Structured evidence | Review result and remaining difference |
|---|---|---|
| Why deployment and why production differs from local development | `deploy-intro`, `deploy-model`, `deploy-flow` | Release is presented as a reproducible pipeline; preview evidence must be distinguished from local dev success. Legacy narrative/cards are not recreated as the same visual section. |
| Development vs production; build pipeline; generated `dist/` output and content hashes | `deploy-flow`, `deploy-dist-heading`, `deploy-dist-concepts`, `deploy-dist-walkthrough` | Core build/output concepts map. The animated/clickable pipeline and dev/prod toggle remain non-equivalent. |
| Public browser configuration vs server secrets | `deploy-env-text`, `deploy-warning`, `deploy-check` | Structured content correctly treats all shipped client values, including `VITE_*`, as public; a frontend guard is not authorization. |
| Env file types, active mode, priority and rebuild requirement | `deploy-env-detail`, `deploy-env-walkthrough`, `deploy-env-check` | EN/RU explain the active mode, generic and mode-specific files, process-environment precedence, and build-time substitution. The legacy env accordion remains interactive; the structured walkthrough is text/code based. |
| Vercel/Netlify comparison, Git-connected deploys, manual static upload and configuration | `deploy-hosting-detail`, `deploy-hosting-models`, `deploy-hosting-check`, `deploy-hosting-practice` | Hosting choices are framed around project configuration and workload, not a universal ranking. Pricing, quotas and dashboard defaults are intentionally not hard-coded. |
| Deep links, direct-route refresh, SPA fallback and missing-asset behavior | `deploy-hosting-detail`, `deploy-diagnostic-exercise` | Structured task requires route refresh and separate API/asset checks; the legacy article's provider-specific config and interactive tabs are not one-to-one. |
| Custom domain, DNS, HTTPS and changes without breaking service | `deploy-domain-heading`, `deploy-domain-walkthrough`, `deploy-domain-check`, `deploy-domain-practice` | Domain ownership and provider instructions are linked to current docs rather than fixed fee claims. DNS propagation and certificate issuance still require actual-host verification. |
| Preview, incident response, rollback and post-release checks | `deploy-rollback-body`, `deploy-rollback-walkthrough`, `deploy-rollback-check`, `deploy-practice` | The structured lesson distinguishes hosting rollback from `git revert`, checks compatibility with the active API/data, and asks for post-rollback smoke and evidence. |
| 12-item production checklist and common deployment mistakes | `deploy-practice`, `deploy-diagnostic-exercise`, `deploy-debug-callout` | The concepts are covered, but the checkable progress bar, local checklist state and completion message are not equivalent controls. The legacy message was revised so a checked list is not presented as proof of production readiness. |

## Factual and security corrections applied to the legacy source

- **Vite env priority:** the source no longer describes `.env.local` as globally highest priority. For a duplicate key, active-mode files take precedence over generic files; the existing process environment takes precedence over all files. Mode-specific files are only relevant to that mode. Reference: [Vite Env Variables and Modes](https://vite.dev/guide/env-and-mode).
- **Frontend secrets:** the public payment-key example is named `VITE_STRIPE_PUBLISHABLE_KEY`. A committed credential must be revoked/rotated first; removing it from the working tree or rewriting Git history does not revoke it or erase copies already made.
- **Provider pricing/features:** volatile free-tier quotas and fixed deploy duration claims were removed. Both provider sections now instruct learners to verify current plan limits, functions, previews and pricing against the actual provider/account instead of trusting stale numbers.
- **Routing:** the legacy article no longer says SPA refresh behavior is automatically correct on a host. Direct route refresh, API paths and missing JS/CSS assets must be tested separately so a broad fallback does not disguise errors.
- **Rollback:** the article now states that a host may reactivate a built snapshot, but that does not undo database writes or external side effects. Confirm API/data compatibility, verify critical journeys after recovery and inspect health/error signals.
- **Custom domain and readiness:** fixed registrar names and an old annual price were removed. Checking all 12 legacy boxes is now explicitly one release input, not a production-readiness guarantee.

## Interaction inventory intentionally preserved

The source still contains the dev/prod toggle, clickable build-pipeline steps, three Vercel/Netlify tabs, expandable env rows, copy controls and twelve checklist items with progress feedback. These are not represented as equivalent controls in the structured reader, which is why source-level concept coverage does not clear the route gate. `src/content/legacyDeployment.test.ts` checks both the corrected claims and the retained source controls.

## Remaining release gates

- Keep `/lessons/tl-004` and `public/lessons/deployment-learning.html` available until route-level content and interaction dispositions are reviewed.
- Keep classic progress/bookmark/note IDs and classic quiz results distinct from structured lesson/block state; no migration or redirect is implied by this review.
- Execute real-browser tests for direct route refresh, missing assets/API paths, public env configuration, custom-domain/HTTPS behavior, keyboard/accessibility and the actual deployed rollback flow. CI cannot provide evidence of these manual cases.
