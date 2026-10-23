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

This file does not claim complete parity. The full source inventory and Notion/HTML evidence matrix are maintained in [FULL_SOURCE_CONTENT_AUDIT.md](./FULL_SOURCE_CONTENT_AUDIT.md). At the latest checkpoint, 21 Notion pages had been fetched (all marked unverified by the connector) and 25 HTML files were inventoried and structurally surveyed. Two React HTML sources had full reads in the focused pass and the API material received targeted factual review; most remaining HTML bodies, code samples, hidden answers and interactions still require full review against the structured blocks.

Keep standalone HTML files as sources until each relevant subsection has block-level mapping, a depth assessment (explanation, walkthrough, reasoning, pitfalls, practice, feedback), technical verification, and EN/RU review. CI green alone is not a publication approval.
undefined