# Focused Source-to-Block Review: qa-002 Testing Guide

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/test.guide.html` (2,421 lines).  
**Canonical destination:** `testing.react-testing-library` (EN/RU v6, 45 aligned blocks).

## Scope and decision

This pass makes the legacy tutorial safer to copy into a real project. Its Jest chapters remain deliberately available for interview and conceptual learning, but the repository itself uses Vitest. The lesson now says that explicitly, corrects matcher semantics, and uses the modern `userEvent.setup()` pattern in its primary React interaction example. These corrections do not recreate every old tab, accordion, FAQ, mock visualizer, copy affordance or quiz-state behavior in the structured reader. `qa-002` therefore remains **Blocked** for route cutover.

## Source-to-block crosswalk

| Legacy section / behavior | Structured evidence | Review result and remaining difference |
|---|---|---|
| Why tests matter; unit/integration/E2E overview | `test-purpose`, `test-purpose-body` | The purpose and boundaries are described; legacy teaching cards and scrolling path are not identical. |
| Jest setup, first test and file discovery | `test-runner`, `test-runner-body`, `component-test` | The legacy Jest examples stay intact, with an explicit callout that this repository uses Vitest. Installing Jest alone is not presented as a complete React/TSX configuration. |
| Matchers and object equality | `matcher-equality-heading`, `matcher-equality-body`, `matcher-equality-walkthrough`, `matcher-equality-check` | The legacy `toBe` description now matches `Object.is` semantics, not a blanket `===` claim. The structured lesson distinguishes reference identity from structural equality. |
| Mocks and test isolation | `mocking-explanation`, `mocking-walkthrough`, `test-mock-lifecycle-model`, `test-mock-lifecycle-walkthrough` | Legacy Jest API tabs remain examples; this project's structured exercises use Vitest's `vi.fn`/`vi.mock`/`vi.spyOn` and test lifecycle behavior. |
| React Testing Library and user interactions | `behavior-not-internals-body`, `component-test`, `test-queries-list` | The primary source example uses `userEvent.setup()` and awaits interactions. The legacy interaction tabs remain separate controls. |
| Query semantics and priorities | `test-queries-list`, `query-absence-check`, `deep-testing-query-guide` | `getBy` throws on absent/ambiguous results, `queryBy` is useful for absence and `findBy` waits for asynchronous appearance subject to the test timeout. The old page no longer pins this to a hard-coded 1000 ms. |
| Async UI states and mocks | `async-tests-body`, `async-test-example`, `deep-testing-trace`, `deep-testing-practice` | The structured lesson retains loading/success/empty/error and mocked request patterns; full visual state-by-state parity remains incomplete. |
| AAA pattern, FAQ and scored quiz | `arrange-act-assert`, `aaa-pattern-check`, `testing-quiz-1..3` | The concepts are represented and regression tested. The legacy five-question quiz, FAQ accordion and progress/scroll presentation are not one-to-one. |

## Corrections applied to the legacy source

- **Runner boundaries:** Jest snippets remain identifiable as Jest examples; a new note states the project uses Vitest. It cautions that runner globals differ and that installing `jest` alone does not configure JSX/TSX transform, DOM environment or setup files.
- **`toBe` matcher:** the page now says it uses `Object.is` semantics and that this is not identical to `===` in every edge case. It also notes when `toStrictEqual` can be useful.
- **User interactions:** the primary form test now constructs `const user = userEvent.setup()` and awaits `user.type`/`user.click`, rather than using older static calls.
- **Async queries:** `findBy` documentation refers to the configured async timeout instead of promising a fixed 1000 ms in every test setup.

## Interaction inventory preserved

The source retains its legacy tab groups for mocks and Testing Library examples, copy controls, FAQ accordions, scroll progress/navigation, and original quiz flow. `src/content/legacyTestingGuide.test.ts` protects the section/quiz/control inventory plus the corrected claims. Test coverage does not prove the old interactions match structured reader behavior.

## Remaining release gates

- Keep `/lessons/qa-002` and the classic HTML available until section/interaction dispositions and learner-state handling are reviewed.
- Do not migrate quiz result identity or progress merely because a candidate lesson exists; source quiz IDs and structured lesson/block IDs remain distinct.
- Perform real-browser keyboard/screen-reader/responsive acceptance for code copy buttons, tabs, disclosure controls and the full quiz; CI only validates the authored text and DOM inventory.
