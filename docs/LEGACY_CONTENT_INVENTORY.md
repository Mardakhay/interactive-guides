# Legacy Lesson Inventory

**Inventory date:** 2026-10-23  
**Source directory:** `public/lessons/`  
**Purpose:** connect each legacy file to its destination in the new curriculum and track what remains to be reviewed.

## Source-to-curriculum mapping

A mapping is a destination proposal, not proof that the old page has been fully migrated. Destinations are bilingual EN/RU JSON, but only some sources have received focused semantic comparison. Source HTML remains in place until the complete content and interactions have passed editorial review.

| Legacy HTML | Main subject | Proposed canonical destination(s) | Migration note |
|---|---|---|---|
| `internet-fundamentals.html` | Browser, network, HTTP, DNS, TLS, hosting, browser rendering and security | `web.internet-http`; `network.dns-tcp-tls`; `browser.rendering-pipeline`; `deployment.production-hosting`; `frontend.auth-security` (security boundary concepts only) | Structural scan covers 78 headings across 13 major sections plus 14 code markers. The core and two network/browser supplements exist; deployment/auth lessons cover adjacent topics. Paragraph-by-paragraph coverage, all diagrams, links and interactive activities remain open. |
| `html-reference.html` | HTML structure, metadata, semantics, forms and accessibility | `html.document-structure`, `html.forms-accessibility` | Split the reference by learning goal; retain accurate reference details in the appropriate lesson |
| `css-reference.html` | CSS syntax, selectors, cascade, box model, layout, variables/functions and accessibility | `css.fundamentals`, `css.flexbox-grid-responsive` | Structural scan counted 56 code/pre markers and major topics for cascade, sizing, display, position, typography, responsive layout and accessibility. Exact example-by-example parity still needs review. Sass is in a separate optional supplement, not claimed as a verified one-to-one CSS-reference migration. |
| `dom-masterclass.html` | DOM, events and browser APIs | `js.dom-events` | Week 7 structured lesson exists; preserve useful browser/API edge cases after review |
| `js_interactive_book.html` | JavaScript syntax, scope, arrays, functions, iterators and objects | `js.basics-types-control-flow`, `js.functions-arrays-objects`, related `js.object-prototypes` sections | Structural scan found 127 code markers and 12 tab markers. The structured lessons deepen these topics, but the old book's full lesson order, every embedded quick-check and every challenge have not been reconciled one-by-one. |
| `js-deep-dive.html` | Objects, prototypes, `new`, classes, inheritance, private fields and `this` | `js.object-prototypes` | The bilingual supplementary lesson now exists and is registered. Structural scan found 138 code markers and an interactive prototype-lookup tracer; equivalent interactive behavior and every example still require human parity review. |
| `js-memory-mastery.html` | Execution context, stack/heap, references, garbage collection, leaks and engine internals | `js.runtime-memory` | The bilingual supplementary lesson now exists and is registered. Structural scan found interactive memory simulations plus sections about V8 internals; the structured lesson focuses on portable mental models, and does not claim a line-by-line copy of engine-specific examples. |
| `interactive-async-js.html` | Promises, async/await, event loop and Fetch | `js.async-fetch` | Week 8 structured lesson exists; event-loop depth may require a separate supplementary lesson after source review |
| `git-reference.html` | Git commands and concepts | `git.fundamentals` | Week 8 lesson exists; full comparison of commands, diagrams and exercises remains pending |
| `git-workflow-cicd-guide.html` | Branching, PR/MR, review and CI/CD | `git.workflow-ci` | Week 20 structured lesson exists; check hosting-specific details and source links |
| `intro.dev.html` | npm/SemVer, TypeScript, React fundamentals and Vite tooling | `tooling.node-npm-vite`, `tooling.advanced-package-workflows`, `typescript.fundamentals`, `react.components-jsx-state` | Structural scan found 119 code markers and nine tabs across five chapters. Existing core lessons plus the tooling supplement cover the subject areas; exact code/version mapping and chapter-level parity remain open. |
| `react-usestate-guide.html` | React components, props and useState | `react.components-jsx-state` | Week 11 lesson exists; check code samples and state-snapshot explanation against current docs |
| `react-hooks-guide.html` | Effects, hooks and component composition | `react.effects-lists-composition`, relevant sections of `react.api-custom-hooks` | Split fundamental effects/list composition from API/custom-hook patterns; do not duplicate whole sections |
| `react-forms-tutorial.html` | Forms, validation, React Hook Form and accessible errors | `react.forms-validation` | Focused source comparison in `CONTENT_PARITY_REVIEW_WEEK14-15.md`. Week 14 now maps the source's multi-field `name` handler, native constraints, validation timing, complete RHF flow, common mistakes, ten knowledge checks and five-step practice progression. Still `review`: the snippets need human/runtime review, and this is not approval of the whole HTML source |
| `react-api-hooks-lesson.html` | API service layer and custom hooks | `react.api-custom-hooks` | Week 16 lesson exists; distinguish custom-hook reuse from shared state |
| `react-ecosystem-course.html` | SPA/React Router, Context, reducers, custom Hooks and BookClub tracker | `react.router-spa`; `react.forms-validation`; `react.context-shared-state`; related custom-Hook/API concepts in `react.api-custom-hooks` | This source spans several weeks, not just routing. See `CONTENT_PARITY_REVIEW_WEEK14-15.md` for the Week 14–15 coverage. Legacy routing snippets target a different React Router major than the app, so do not copy those snippets verbatim. Retain this HTML until all destinations are reviewed |
| `react-performance-a11y.html` | Rendering performance, lazy loading and accessibility | `performance.accessibility` | Week 18 lesson exists; require measurement/profiling before advocating memoization |
| `ui-design-system-learn.html` | Design tokens, UI systems and reusable components | `ui.design-systems` | Week 17 lesson exists; use a consistent design-system vocabulary |
| `material-ui-masterclass.html` | Material UI setup, ThemeProvider, Button/TextField/Card and login form | `ui.bootstrap-mui` and `ui.design-systems` | The bilingual optional library-comparison lesson now exists and is registered. Structural scan counted 39 code markers. MUI package/API examples remain version-sensitive and still need a match to the repository's actual package versions before being treated as executable. |
| `frontend-architecture-and-planning.html` | Module boundaries, import rules, FSD, state ownership, UI planning and capstone | `frontend.architecture-boundaries`; `capstone.requirements-discovery`; `capstone.design-architecture-planning`; `capstone.implementation`; `capstone.review-demo` | The architecture supplement now exists alongside the four capstone phases. Structural scan counted nine tab markers; each tab/pattern and the source's project-planning sequence still needs detailed mapping before the source can be marked migrated. |
| `test.guide.html` | Unit/component testing | `testing.react-testing-library` | Week 19 lesson exists; align examples with the selected Vitest/Testing Library stack |
| `frontend-auth.html` | Authentication/authorization, OAuth code + PKCE, OIDC, BFF and obsolete implicit-flow examples | `frontend.auth-security` | The bilingual security supplement now exists and is registered. Structural scan counted 44 code markers. It explicitly differentiates OAuth/OIDC roles and warns that client-side guards are not access control; protocol examples still need current security review before publication. |
| `deployment-learning.html` | Dev versus production, Vite build, environment variables, Vercel/Netlify and SPA fallback | `deployment.production-hosting`, related `capstone.review-demo` criteria | The bilingual deployment supplement now exists and is registered. Structural scan counted 77 code markers. Provider-specific click paths, current pricing/UI and host configuration examples remain subject to review; no device/deployment smoke test is claimed. |
| `sql-learning-page.html` | SQL first principles, JOIN variants, subqueries and interactive query runner | `data.sql-postgresql` | The bilingual SQL/PostgreSQL supplement now exists and is registered. Structural scan counted 156 code/pre markers. The new lesson focuses on common relational/query/security foundations; all interactive query outputs and the full advanced query catalog have not been verified one-by-one. |
| `frontend-bootcamp-notes.html` | Broad course handbook | Orientation and cross-links; no duplicate canonical lesson ID | Treat as an index/reference source, not as a competing curriculum |

## Migration states

Use these statuses in the migration tracker. A translation or a schema-valid file is not enough to claim source migration.

- `not-started`: the complete source file has not been analyzed.
- `extracted`: headings, examples, exercises, answers, links, diagrams/interactions and claims have been inventoried.
- `rewritten`: replacement structured content exists.
- `translated`: both locales exist; this alone does not mean the translation passed review.
- `validated`: source accuracy, content schema, language parity, navigation, examples, exercises and tests passed.
- `published`: approved content is available through the canonical reader.

## What is complete versus still open

**Complete in this pass:** all 25 legacy HTML files received a heading/structure scan (title, heading outline, code/pre markers, button/tab/form markers where detectable); destination mappings now include the created supplementary IDs. The platform registers 26 core lesson IDs plus 11 supplementary lesson IDs (37 IDs / 74 bilingual locale files).

**Still open:** this structural scan is not a full line-by-line comparison. A subset of sources (Notion Part 4 plus the forms/ecosystem lessons) received a more focused concept comparison; all other source paragraphs, hidden answers, diagrams, query/output behavior, exact code examples, links, and interactions still need detailed mapping. Keep every legacy source file until the replacements pass that review.

## Required source audit before a legacy file can be called migrated

1. Read the complete HTML file, including content below tabs/accordions, hidden answers, diagrams, code samples and interactive behavior.
2. Record every teachable claim and useful example; mark outdated or inaccurate items instead of copying them blindly.
3. Map each extracted unit to a canonical lesson block or an explicit supplementary lesson ID in the inventory.
4. Verify claims using current primary documentation/standards, then adapt code and test it where practical.
5. Compare English and Russian teaching value, not just block count/order.
6. Run CI and finish the human review checklist before updating the migration status.


## Structural scan checkpoint — all 25 legacy files

The structural pass captured page titles and heading outlines, plus simple counts for code/pre markers and obvious button/tab/form markers. This is useful for finding large topics and interactive affordances that a plain heading audit misses; it is not reliable proof that every event handler, hidden panel, or user flow was understood.

- `react-forms-tutorial.html` and `react-ecosystem-course.html` also have focused mapping documented in [`CONTENT_PARITY_REVIEW_WEEK14-15.md`](./CONTENT_PARITY_REVIEW_WEEK14-15.md).
- Several source pages are very large: `dom-masterclass.html` (~156k characters), `interactive-async-js.html` (~129k), `js-deep-dive.html` (~131k), `react-api-hooks-lesson.html` (~131k), `sql-learning-page.html` (~113k) and `frontend-bootcamp-notes.html` (~110k). Treat size and high code counts as a reason to audit carefully, not as a migration score.
- The optional UI ecosystem track now covers Sass/SCSS plus Bootstrap/MUI comparison. It does not mean every UI-library example has been executed against the installed dependency versions.

## Focused source coverage: `internet-fundamentals.html`

A heading-structure inspection found 78 headings across 13 major sections, covering Internet/Web concepts, DNS resolution and caching, IP/TCP/UDP, HTTP versions, TLS, ports/sockets, hosting/resources, browser request/rendering, browser components, sandboxing and privacy.

- `web.internet-http` is the core Week 1 introduction.
- `network.dns-tcp-tls` is an optional technical deep dive into DNS, IP, TCP/UDP/QUIC, ports, TLS and HTTP versions.
- `browser.rendering-pipeline` is an optional deep dive into DOM/CSSOM, the rendering pipeline, script loading, main-thread performance and security boundaries.
- `deployment.production-hosting` now provides the destination for production-build, public-env-variable, hosting/deep-link and rollback topics; precise parity with every hosting/resource-type example remains open.

This maps subject coverage from the source headings. It is **not** a complete migration audit of every source paragraph, code sample, link, diagram, hidden answer or interaction. The legacy HTML must stay in place until the replacement content is reviewed against the full source.
