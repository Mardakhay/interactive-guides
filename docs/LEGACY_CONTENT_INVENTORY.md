# Legacy Lesson Inventory

**Inventory date:** 2026-10-22  
**Source directory:** `public/lessons/`  
**Purpose:** connect each legacy file to its destination in the new curriculum and track what remains to be reviewed.

## Source-to-curriculum mapping

A mapping is a destination proposal, not proof that the old page has been fully migrated. Structured destinations below exist as bilingual EN/RU JSON unless marked **future/TBD**. A source file remains in the legacy folder until its full content has been audited and the replacement has passed the editorial checklist.

| Legacy HTML | Main subject | Proposed canonical destination(s) | Migration note |
|---|---|---|---|
| `internet-fundamentals.html` | Browser, network, HTTP, DNS, TLS, hosting, browser rendering and security | `web.internet-http`; `network.dns-tcp-tls`; `browser.rendering-pipeline` | Two EN/RU supplemental pairs now cover DNS/TCP/UDP/TLS/HTTP versions and the browser rendering pipeline. Hosting/resource-type sections and paragraph/example/interaction parity still need full source review. |
| `html-reference.html` | HTML structure, metadata, semantics, forms and accessibility | `html.document-structure`, `html.forms-accessibility` | Split the reference by learning goal; retain accurate reference details in the appropriate lesson |
| `css-reference.html` | CSS syntax, selectors, cascade, box model and layout | `css.fundamentals`, `css.flexbox-grid-responsive` | Core split exists; map advanced/reference-only sections before marking source migrated |
| `dom-masterclass.html` | DOM, events and browser APIs | `js.dom-events` | Week 7 structured lesson exists; preserve useful browser/API edge cases after review |
| `js_interactive_book.html` | JavaScript core syntax and data processing | `js.basics-types-control-flow`, `js.functions-arrays-objects` | Split core language and functions/collections; check the source's exact order and exercise coverage |
| `js-deep-dive.html` | Objects, prototypes and classes | **Future/TBD:** supplementary JavaScript object model lesson | Supplementary track; define a stable ID after full source extraction |
| `js-memory-mastery.html` | Execution, stack/heap and memory | **Future/TBD:** supplementary JavaScript internals lesson | Cross-reference relevant Notion notes; no canonical supplementary ID assigned yet |
| `interactive-async-js.html` | Promises, async/await, event loop and Fetch | `js.async-fetch` | Week 8 structured lesson exists; event-loop depth may require a separate supplementary lesson after source review |
| `git-reference.html` | Git commands and concepts | `git.fundamentals` | Week 8 lesson exists; full comparison of commands, diagrams and exercises remains pending |
| `git-workflow-cicd-guide.html` | Branching, PR/MR, review and CI/CD | `git.workflow-ci` | Week 20 structured lesson exists; check hosting-specific details and source links |
| `intro.dev.html` | Node.js and development tooling | `tooling.node-npm-vite` | Week 9 lesson exists; verify tool versions and separate stable concepts from version-specific instructions |
| `react-usestate-guide.html` | React components, props and useState | `react.components-jsx-state` | Week 11 lesson exists; check code samples and state-snapshot explanation against current docs |
| `react-hooks-guide.html` | Effects, hooks and component composition | `react.effects-lists-composition`, relevant sections of `react.api-custom-hooks` | Split fundamental effects/list composition from API/custom-hook patterns; do not duplicate whole sections |
| `react-forms-tutorial.html` | Forms and validation | `react.forms-validation` | Week 14 lesson exists; preserve semantic HTML and accessible error behavior |
| `react-api-hooks-lesson.html` | API service layer and custom hooks | `react.api-custom-hooks` | Week 16 lesson exists; distinguish custom-hook reuse from shared state |
| `react-ecosystem-course.html` | SPA and React Router | `react.router-spa` | Week 13 lesson exists; verify source examples against the installed React Router major version |
| `react-performance-a11y.html` | Rendering performance, lazy loading and accessibility | `performance.accessibility` | Week 18 lesson exists; require measurement/profiling before advocating memoization |
| `ui-design-system-learn.html` | Design tokens, UI systems and reusable components | `ui.design-systems` | Week 17 lesson exists; use a consistent design-system vocabulary |
| `material-ui-masterclass.html` | Material UI library practice | `ui.design-systems` extension; separate **future/TBD** MUI-specific lesson if needed | Keep library-specific instructions supplementary and version-checked |
| `frontend-architecture-and-planning.html` | Requirements, architecture and capstone planning | `capstone.requirements-discovery`, `capstone.design-architecture-planning`, `capstone.implementation`, `capstone.review-demo` | Map individual source sections to the capstone phase instead of copying the entire source into every lesson |
| `test.guide.html` | Unit/component testing | `testing.react-testing-library` | Week 19 lesson exists; align examples with the selected Vitest/Testing Library stack |
| `frontend-auth.html` | Authentication and authorization | `capstone.implementation` security extension; separate **future/TBD** auth lesson if needed | Supplementary scope; security review must distinguish UI guards from server/data authorization |
| `deployment-learning.html` | Build output, environments, hosting and release | `capstone.review-demo` deployment context; separate **future/TBD** deployment lesson if needed | Keep platform-specific steps up to date and clearly mark environment assumptions |
| `sql-learning-page.html` | SQL and database fundamentals | **Future/TBD:** supplementary SQL track | Outside the supplied 24-week core; define an independent supplemental curriculum ID |
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

**Complete:** all 25 legacy filenames have an explicit proposed destination or a marked future/TBD supplemental disposition. The 26 core lesson IDs are registered in the structured curriculum in English and Russian.

**Not complete:** there has not yet been a line-by-line comparison of every legacy HTML file against its replacement. Some legacy pages contain multiple topics and must be split; some supplementary destinations do not have a stable lesson ID yet. Keep every source HTML file until all relevant replacements pass the editorial checklist.

## Required source audit before a legacy file can be called migrated

1. Read the complete HTML file, including content below tabs/accordions, hidden answers, diagrams, code samples and interactive behavior.
2. Record every teachable claim and useful example; mark outdated or inaccurate items instead of copying them blindly.
3. Map each extracted unit to a canonical lesson block or an explicit future supplement.
4. Verify claims using current primary documentation/standards, then adapt code and test it where practical.
5. Compare English and Russian teaching value, not just block count/order.
6. Run CI and finish the human review checklist before updating the migration status.


## Focused source coverage: `internet-fundamentals.html`

A heading-structure inspection found 78 headings across 13 major sections, covering Internet/Web concepts, DNS resolution and caching, IP/TCP/UDP, HTTP versions, TLS, ports/sockets, hosting/resources, browser request/rendering, browser components, sandboxing and privacy.

- `web.internet-http` is the core Week 1 introduction.
- `network.dns-tcp-tls` is an optional technical deep dive into DNS, IP, TCP/UDP/QUIC, ports, TLS and HTTP versions.
- `browser.rendering-pipeline` is an optional deep dive into DOM/CSSOM, the rendering pipeline, script loading, main-thread performance and security boundaries.
- Hosting and resource-type detail still needs an explicit destination or a decision to omit/move it.

This maps subject coverage from the source headings. It is **not** a complete migration audit of every source paragraph, code sample, link, diagram, hidden answer or interaction. The legacy HTML must stay in place until the replacement content is reviewed against the full source.
