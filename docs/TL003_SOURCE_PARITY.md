# Focused Source-to-Block Review: tl-003

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/intro.dev.html` (3,472 lines; last reviewed legacy blob `6db67809dd64b71693fe8b222ade9d49e7ca6a31`).  
**Canonical destinations:** `tooling.node-npm-vite`, `tooling.advanced-package-workflows`, `typescript.fundamentals`, `react.components-jsx-state`, `react.effects-lists-composition`, `react.api-custom-hooks`, and `testing.react-testing-library`.

## Scope and current gate

This is the evidence checklist for the `tl-003` legacy tooling/tutorial page. The route remains **Blocked** for cutover. Conceptual coverage does not imply exact parity for the original quiz widgets, reveal controls, score/progress UI, chapter navigation, layout, learner state, or browser accessibility.

## Legacy quiz crosswalk

| Legacy item | Concept | Canonical evidence | Follow-up / caveat |
|---|---|---|---|
| Q1 | SemVer caret range | tooling: `versions-body`, `caret-range-check` | Covered; version range is illustrative. |
| Q2 | devDependency | tooling: `dev-dependency-check`, `package-json-example` | Covered. |
| Q3 | Lockfile | tooling: `package-lock-body`, `install-vs-ci-list` | Covered; don't delete lockfile as first troubleshooting step. |
| Q4 | npx / scaffolding | tooling: `npm-command-vs-exec-check`, `vite-template-check` | Covered with modern CLI-vs-scaffolding distinction. |
| Q5 | `Partial<T>` | TypeScript: `partial-utility-check`, `utility-types-walkthrough` | Covered. |
| Q6 | Optional property | TypeScript: `object-shape`, `utility-types-limits` | Covered; optional differs from nullable. |
| Q7 | Generics | TypeScript: `generic-example`, `legacy-generic-filter-example` | Added a bilingual generic filtering walkthrough; it explains that the helper demonstrates the type relationship rather than improving on `Array.filter`'s built-in typing. |
| Q8 | `strict: true` | TypeScript: `strict-mode-check` | Covered. |
| Q9 | `useState` return | React basics: `react-usestate-return-check`, `counter-example` | Covered. |
| Q10 | State updates | React basics: `react-quiz-1`, `immutable-example` | Covered; explain render snapshots. |
| Q11 | Effect dependencies | React Effects: `effect-dependency-array-check` | Covered. |
| Q12 | Props | React basics: `react-props-contract-check`, `props-example` | Covered. |
| Q13 | React + TS Vite template | tooling: `vite-template-check` | Covered with `npm create vite@latest ... -- --template react-ts`. |
| Q14 | Fetch Effect cleanup | API Hooks: `api-fetch-cleanup-check`; Effects: `posts-effect-example`, `deep-effects-check` | Source answer overstates unmounted-state updates as a memory leak; teach aborting/ignoring stale work. |
| Q15 | Generic fetch result | API Hooks: `api-generic-type-check` | Covered; TypeScript generics do not validate JSON at runtime. |
| Q16 | Location of shared interfaces | TypeScript: `objects-interface-type-body`; API service examples | `src/types/` is one possible convention, not a universal requirement. |
| Q17 | Vite dev-server speed | tooling: `vite-dev-server-check` | Avoid absolute comparison claims; describe native ESM and dependency pre-bundling. Current Vite 8 production bundling uses Rolldown. |
| Q18 | ESLint vs Prettier | tooling: `lint-format-check` | Covered. |
| Q19 | Mock function | Testing: `mocking-practice`, `test-mock-lifecycle-practice` | `vi.fn()` is Vitest; Jest's corresponding API is `jest.fn()`. |
| Q20 | HMR | tooling: `vite-hmr-body`, `vite-hmr-check` | Covered; some updates still require a full reload. |

## Legacy exercise crosswalk

| Exercise | Destination / expected evidence | Notes |
|---|---|---|
| 1. Create package.json | tooling: `package-json-example`, `practice-project-setup`, `deep-tooling-practice`; advanced packages lesson | Match actual project scripts/lockfile instead of copying historical versions blindly. |
| 2. Product interface | TypeScript Fundamentals | Added bilingual `legacy-product-interface-example` with required fields, a literal-union category, optional description, and a typed value. |
| 3. Generic filter | TypeScript Fundamentals | Added bilingual `legacy-generic-filter-example`; the walkthrough preserves T between items, predicate and output. |
| 4. Toggle | React basics | Added bilingual `legacy-toggle-example` with native button, functional state updater and accessible `aria-pressed`. |
| 5. Typed list | React basics; React Effects list pipeline | Added bilingual `legacy-typed-list-example` with stable IDs and an explicit empty state; the advanced list pipeline remains for filter/sort composition. |
| 6. useLocalStorage | API Hooks | Added bilingual `legacy-use-local-storage-walkthrough` and `legacy-use-local-storage-practice` covering storage exceptions, malformed JSON, key changes, runtime validation and SSR/hydration. |
| 7. Async data component | React Effects `posts-effect-example`/`practice-posts-list`; API Hooks | Loading/error/empty/success, response status and cleanup. |
| 8. Utility types | TypeScript `utility-types-walkthrough`/`utility-types-practice` | Concept covered; source field names may differ. |
| 9. Search filter | React basics | Added bilingual `legacy-searchable-list-example` with controlled query, case-insensitive matching, a derived list and stable keys. |
| 10. Vite config | tooling `vite-config-alias-proxy-walkthrough`, `vite-proxy-dev-only-check` | Use ESM-safe path resolution; configure matching TypeScript `paths` where needed; dev proxy is not production routing. |

## Corrections applied to the legacy source

- **Effect cleanup:** cleanup mirrors setup; for fetching, abort the request when appropriate or ignore stale results after dependencies change. A late Promise alone does not establish a memory leak. Sources: [React useEffect](https://react.dev/reference/react/useEffect), [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects).
- **Vite:** the lesson body and Q17 no longer claim near-instant startup regardless of project size or say development does not pre-bundle anything. They describe native ESM, dependency pre-bundling and project-dependent behavior; the production bundler is versioned explicitly (Vite 5: Rollup; Vite 8: Rolldown). Source: [Vite features](https://vite.dev/guide/features).
- **Mocks:** Vitest `vi.fn()` and Jest `jest.fn()` are similar APIs from different runners. Source: [Vitest vi.fn](https://vitest.dev/api/vi).
- **ES modules:** `__dirname` is not defined by default in native ESM configuration; resolve paths using `fileURLToPath(new URL("./src", import.meta.url))`. Vite `server.proxy` applies to the development server.

## Release boundary

Keep the legacy route and all 25 HTML sources until each row has source-to-block evidence, the learner-state migration inventory is reconciled, and browser/device/keyboard/screen-reader acceptance is recorded. Do not redirect, delete content, or remap saved quiz/progress identifiers based on a green CI run alone.
