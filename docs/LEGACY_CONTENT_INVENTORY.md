# Legacy Lesson Inventory

**Inventory date:** 2026-10-22  
**Source directory:** `public/lessons/`  
**Purpose:** migration tracking, not a declaration that any lesson is already migrated.

## Inventory

| Legacy HTML | Proposed subject area | Canonical track mapping | Notes |
|---|---|---|---|
| `internet-fundamentals.html` | Browser, network, HTTP, DNS, TLS | Month 1 / Week 1 | Start here; align to syllabus outcomes and current web standards |
| `html-reference.html` | HTML structure, semantics, forms and accessibility | Month 1 / Weeks 1–2 | Split reference depth into sequential lessons |
| `css-reference.html` | CSS syntax, selectors, box model, layout | Month 1 / Weeks 3–4 | Split foundational CSS from advanced reference sections |
| `dom-masterclass.html` | DOM, events, browser APIs | Month 2 / Week 7 | Practical DOM module |
| `js_interactive_book.html` | JavaScript core syntax | Month 2 / Weeks 5–6 | Audit ordering and depth; split into concepts |
| `js-deep-dive.html` | Objects, prototypes, classes | Supplementary JavaScript track | Place after core object/function foundations |
| `js-memory-mastery.html` | Execution, stack/heap, memory | Supplementary JavaScript internals | Connect to the user's Notion source A |
| `interactive-async-js.html` | Promises, async/await, event loop, fetch | Month 2 / Week 8 | Divide into mental models, network use, failure handling |
| `git-reference.html` | Git commands and concepts | Month 2 / Week 8 | Reference plus retrieval tasks |
| `git-workflow-cicd-guide.html` | Branching, PR/MR, review, CI/CD | Month 5 / Week 20 | Some deployment content also overlaps Month 6 |
| `intro.dev.html` | Development environment, Node and package tooling | Month 3 / Week 9 | Clarify current Node/npm versions during rewrite |
| `react-usestate-guide.html` | React state and useState | Month 3 / Week 11 | Core React |
| `react-hooks-guide.html` | Hooks and composition | Month 3 / Week 12 + extension | Use effect rules and current React docs |
| `react-forms-tutorial.html` | Forms and validation | Month 4 / Week 14 | Include accessible errors and form semantics |
| `react-api-hooks-lesson.html` | API layer and custom hooks | Month 4 / Week 16 | Keep core fetch concepts separate from library choices |
| `react-ecosystem-course.html` | SPA, React Router and ecosystem | Month 4 / Week 13 | Match route concepts to current installed major version |
| `react-performance-a11y.html` | Rendering performance, lazy loading, accessibility | Month 5 / Week 18 | Teach profiling/measurement before memoization |
| `ui-design-system-learn.html` | UI systems, tokens, components | Month 5 / Week 17 | Use one coherent system in examples |
| `material-ui-masterclass.html` | MUI library practice | Month 5 / Week 17 extension | Keep library-specific material supplementary |
| `frontend-architecture-and-planning.html` | Requirements, architecture and project planning | Months 6 / Weeks 21–23 + extension | Connect to the capstone |
| `test.guide.html` | Unit, integration and component testing | Month 5 / Week 19 | Align examples with selected test stack |
| `frontend-auth.html` | Authentication and authorization | Month 6 / Week 23 extension | Security review required; distinguish UI guards from data authorization |
| `deployment-learning.html` | Build output, environments, hosting and release | Month 6 / Week 24 extension | Include platform differences and current deployment docs |
| `sql-learning-page.html` | SQL and database fundamentals | Supplementary track | Outside the supplied 24-week core sequence |
| `frontend-bootcamp-notes.html` | Broad course handbook | Orientation / cross-links | Do not keep as a competing canonical curriculum |

## Migration status vocabulary

- `not-started`: source file has not been analyzed in full.
- `extracted`: outline, examples, exercises, answers, links and claims have been inventoried.
- `review-needed`: content has been rewritten but needs technical/instructional review.
- `translated`: both locales are present; this alone does not imply review passed.
- `validated`: source accuracy, content schema, language parity, navigation, exercises and tests passed.
- `published`: linked in the canonical curriculum and usable through the new lesson reader.

## Important limitation

The table is an initial subject mapping based on filenames and sampled content, not a full line-by-line audit of all 25 large HTML files. Before each file is rewritten, inspect its complete content and preserve useful examples and nuanced explanations where they are accurate. The migration should be curriculum-driven: split a legacy file when it contains several separate learnable concepts.
