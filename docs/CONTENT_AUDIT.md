# Structured Content Audit

**Audit date:** 2026-10-22  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Working branch:** `feat/learning-platform-foundation`  
**Content snapshot:** verified in the structured-content tree at implementation checkpoint `ab64fcbb54f00a0bbd302da3061bd9aa1936f211`

## Scope

A static review was performed against all 26 canonical core-lesson IDs, in English and Russian (52 JSON locale files). The first HTML lesson uses the directory name `html-document-structure` while its canonical ID is `html.document-structure`; that naming difference is intentional in the current repository and is not a missing translation.

Lesson IDs inspected:

- `web.internet-http`
- `html.document-structure`
- `html.forms-accessibility`
- `css.fundamentals`
- `css.flexbox-grid-responsive`
- `js.basics-types-control-flow`
- `js.functions-arrays-objects`
- `js.dom-events`
- `js.async-fetch`
- `git.fundamentals`
- `tooling.node-npm-vite`
- `typescript.fundamentals`
- `react.components-jsx-state`
- `react.effects-lists-composition`
- `react.router-spa`
- `react.forms-validation`
- `react.context-shared-state`
- `react.api-custom-hooks`
- `ui.design-systems`
- `performance.accessibility`
- `testing.react-testing-library`
- `git.workflow-ci`
- `capstone.requirements-discovery`
- `capstone.design-architecture-planning`
- `capstone.implementation`
- `capstone.review-demo`

## Checks performed and findings

No issues were found by the static checks below for the inspected branch snapshot:

- Every lesson's block IDs were unique.
- English and Russian variants of each lesson used matching ordered block IDs and block types.
- Paired locale files agreed on core identity metadata (lesson ID, week, and module ID).
- Every code-walkthrough step's line range fell within the code sample and had a valid start/end ordering.
- Knowledge-check option IDs were unique, and single-answer/true-false questions had one correct option. Multi-select questions contained at least one correct option.
- Every coding exercise included instructions, requirements, and success criteria.

GitHub Actions additionally validates imported lesson schemas, content references/feedback invariants, repository registrations, EN/RU block parity, and curriculum ordering. See the exact-head run recorded in `SESSION_HANDOFF.md`.

## What this audit does not prove

- That every technical statement is fully correct, current, or complete.
- That every external URL responds or points to the best primary source.
- That the translation fully preserves nuance and teaching quality.
- That each replacement matches every relevant heading, diagram, interactive feature, hidden answer, and code sample in its legacy HTML source.
- That code examples compile/run as presented or that coding exercises are automatically graded.
- That the complete app shell is localized, accessible, and polished at every mobile viewport.
- That PWA install/offline behavior passes on real devices.

Every lesson remains marked `review`. Do not interpret a successful schema/CI run as editorial approval. Use [`EDITORIAL_REVIEW_CHECKLIST.md`](./EDITORIAL_REVIEW_CHECKLIST.md) for the human review and publication gate.

## Follow-up review workflow

1. Compare each lesson to its relevant Notion notes and legacy HTML source.
2. Verify technical claims using current official documentation or standards.
3. Review the EN and RU versions side by side for completeness, natural language, and equal exercise/feedback quality.
4. Check code samples and runnable snippets in a real development/browser environment where feasible.
5. Check every linked source and remove or replace broken, weak, or outdated references.
6. Mark `published` only after an explicit content review; retain a clear record of reviewer/date and any known limitation.
7. Keep the legacy HTML until its migration and translation parity have passed that review.


## Supplementary network/browser content

Two optional bilingual lessons were added to improve coverage suggested by the heading-level scan of `public/lessons/internet-fundamentals.html`:

- `network.dns-tcp-tls`: DNS hierarchy/TTL, transport distinctions, ports, TLS, HTTP generations and DevTools failure classification.
- `browser.rendering-pipeline`: DOM/CSSOM, critical rendering path, script-loading attributes, layout/paint/compositing and Performance-based investigation.

These lessons are linked to explicit supplementary track IDs and remain in `review`. Schema/translation/navigation tests and a successful CI run are prerequisites, but not a substitute for editorial review. The legacy source is not yet fully migrated paragraph-by-paragraph.


## Focused source-parity update — 2026-10-23

The original static audit above checks structural invariants; it does **not** establish that every teaching step or interaction from Notion and the legacy HTML has been migrated. A targeted source-to-lesson review was subsequently completed for:

- `react.forms-validation` against Notion Part 4 §§ 4.5–4.7 and `public/lessons/react-forms-tutorial.html`.
- `react.context-shared-state` against Notion Part 4 §§ 4.8–4.14 and the state-management portions of `public/lessons/react-ecosystem-course.html`.

The new review found and filled concrete gaps in both lesson pairs. Week 14 now includes the multi-field `name` handler, native constraints, validation timing, full React Hook Form flow, common mistakes, ten quiz checks and five scaffolded practice tasks. Week 15 now distinguishes custom Hook reuse from shared state and includes a BookClub reducer walkthrough, action/data flow, project exercise and expanded tool-choice guidance. Both EN/RU ordered block structures and code-walkthrough line ranges were checked; the lesson schema tests check knowledge-check answer shape and exercise scaffolding.

See [`CONTENT_PARITY_REVIEW_WEEK14-15.md`](./CONTENT_PARITY_REVIEW_WEEK14-15.md) for the concept map and the limits of this pass. The new examples have not been executed in a real React project; the lesson editor does not compile TSX. The original HTML files are retained, and both lesson pairs remain `review`. This is a targeted review, not proof that all legacy sources are fully migrated.


## Supplementary lessons and source-structure audit — 2026-10-23

The supplementary registry has expanded beyond the two original network/browser companions. In addition to the 26 core IDs (52 locale files), the curriculum/repository now registers 11 supplementary IDs (22 locale files):

- `js.runtime-memory` and `js.object-prototypes` — JavaScript execution/memory and the object/prototype model.
- `frontend.architecture-boundaries` — dependency direction, state ownership and refactoring.
- `frontend.auth-security` — sessions/tokens, OAuth/OIDC and the frontend trust boundary.
- `deployment.production-hosting` — build/deployment, public browser configuration and deep links.
- `data.sql-postgresql` — relational queries, constraints, NULL and parameterization.
- `tooling.advanced-package-workflows` — lockfiles, SemVer and reproducible CI installs.
- `css.sass-scss` and `ui.bootstrap-mui` — optional UI-ecosystem coverage.
- Original `network.dns-tcp-tls` and `browser.rendering-pipeline` supplements remain registered.

The latest verified application checkpoint before documentation changes is `59000b4c15d34403378d4d3c862a3b59983b3d99`; GitHub Actions [run #279](https://github.com/Mardakhay/interactive-guides/actions/runs/39921024455) passed lint, typecheck, tests and build on that exact commit. The new JSON pairs are validated at startup by Zod and the supplementary registry has tests, but technical/editorial review remains required.

A structural scan was performed across all 25 files in `public/lessons/` to identify page titles, heading outlines, code markers and obvious interactive controls. That scan improves the inventory, but it is not a semantic guarantee: full paragraph/example/link/hidden-answer/interaction parity remains open except for the explicitly focused Week 14–15 pass. Keep the legacy sources.
