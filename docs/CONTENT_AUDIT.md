# Structured Content Audit

**Updated:** 2026-10-23  
**Branch:** `feat/learning-platform-foundation`  
**Scope:** the embedded, bilingual structured lesson catalog and curriculum registry.

## Inventory

The content repository registers 26 core lesson IDs in English and Russian (52 locale files) across the 24-week bootcamp, plus 11 supplementary IDs in both locales (22 locale files). The supplements are kept outside the bootcamp weeks. The app parses registered translations and curriculum through Zod at import time and exposes them through the structured lesson reader.

Core IDs: `web.internet-http`, `html.document-structure`, `html.forms-accessibility`, `css.fundamentals`, `css.flexbox-grid-responsive`, `js.basics-types-control-flow`, `js.functions-arrays-objects`, `js.dom-events`, `js.async-fetch`, `git.fundamentals`, `tooling.node-npm-vite`, `typescript.fundamentals`, `react.components-jsx-state`, `react.effects-lists-composition`, `react.router-spa`, `react.forms-validation`, `react.context-shared-state`, `react.api-custom-hooks`, `ui.design-systems`, `performance.accessibility`, `testing.react-testing-library`, `git.workflow-ci`, `capstone.requirements-discovery`, `capstone.design-architecture-planning`, `capstone.implementation`, `capstone.review-demo`.

Supplementary IDs: `network.dns-tcp-tls`, `browser.rendering-pipeline`, `js.runtime-memory`, `js.object-prototypes`, `frontend.auth-security`, `deployment.production-hosting`, `data.sql-postgresql`, `css.sass-scss`, `ui.bootstrap-mui`, `frontend.architecture-boundaries`, `tooling.advanced-package-workflows`.

## Structural guarantees and limits

The lesson schema/tests cover required lesson structure, stable unique block IDs, line ranges, quiz answer/feedback shape, coding-exercise scaffolding, locale block parity and curriculum/repository links. These checks establish machine-readable consistency, not that all source explanations are correct, that examples execute, or that translations are editorially equivalent. Lesson editorial status remains review.

## Source parity status

This file does not claim complete parity. The full source inventory and Notion/HTML evidence matrix are maintained in [FULL_SOURCE_CONTENT_AUDIT.md](./FULL_SOURCE_CONTENT_AUDIT.md). At the latest repository checkpoint, 21 Notion pages had been fetched (all marked unverified by the connector) and 25 HTML files were inventoried and structurally surveyed. Two React HTML sources were read in full in an earlier pass; the API material received targeted factual review; and the CSS reference plus Git reference/workflow pages received focused source-content, heading/control and structured-target comparisons. Most other HTML bodies, code samples, hidden answers and interactions still require full review against the structured blocks.

Keep standalone HTML files as sources until each relevant subsection has block-level mapping, a depth assessment (explanation, walkthrough, reasoning, pitfalls, practice, feedback), technical verification, and EN/RU review. CI green alone is not a publication approval.

**CI evidence:** [run #317](https://github.com/Mardakhay/interactive-guides/actions/runs/39963932841) passed on `07bc9acfc89c0138cbd4d214e19215e4dff6f1c6` (92 tests plus lint/typecheck/build). Editorial/source-parity gaps listed above remain unresolved by CI.


**Latest CI:** [Run #320](https://github.com/Mardakhay/interactive-guides/actions/runs/39964458056) passed on feature SHA `b7fdeba6b9096d9f8336cf1071deb9d0f2d1dfc5`; source parity status remains partial.


## Latest exact-head validation — 2026-10-23

Feature HEAD `9dfa157ce36123144ad84c2f327abdb41984a3a7` passed GitHub Actions [run #39986177388](https://github.com/Mardakhay/interactive-guides/actions/runs/39986177388), including all 102 tests across 22 files and production build. CI remains evidence of schema, test and build consistency only.

The latest focused content additions include CSS fundamentals v3 (53 blocks/110 min per locale), Git fundamentals v3 (38 blocks/95 min), and Git workflow/CI v3 (37 blocks/110 min). They remain in editorial review; legacy HTML pages remain available and their full source-to-block and UI-interaction equivalence is not closed.


## Latest implementation/content validation — 2026-10-26

At feature HEAD `17b79e07b8377e8aa92c5aa14305da0062389ac5`, GitHub Actions [run #40270734689](https://github.com/Mardakhay/interactive-guides/actions/runs/40270734689) passed install, lint, typecheck, 102 tests across 22 files, and production build. The app has 26 core and 11 supplementary stable lesson IDs in both locales (74 JSON files). Recent depth work includes CSS v3, expanded Git/CI, SQL/PostgreSQL and deployment/hosting content; deployment is 21 blocks per locale with 3 walkthroughs, 2 checks and 2 coding exercises.

This validates runtime/schema and build invariants only. The 21 fetched Notion pages remain unverified by the connector; the 25 HTML sources are inventoried, with full source-to-block review still incomplete. Lesson editorial state remains `review`. See [FULL_SOURCE_CONTENT_AUDIT.md](./FULL_SOURCE_CONTENT_AUDIT.md) for the deployment evidence and remaining source gaps.
