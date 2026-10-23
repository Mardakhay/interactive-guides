# Week 14–15 Source-Parity Review

**Review date:** 2026-10-23  
**Branch:** `feat/learning-platform-foundation`  
**Status:** targeted coverage improvements committed; editorial approval remains pending.

## Sources examined

| Source | Snapshot / section | How it was used |
|---|---|---|
| Notion: [Part 4 — React ecosystem, routing, forms, state and API](https://app.notion.com/p/3ba855c6fbb08075a08ef30c3ac20d89) | §§ 4.5–4.7 and §§ 4.8–4.14 | Compared the stated concepts and progression with the structured lessons |
| [`react-forms-tutorial.html`](https://github.com/Mardakhay/interactive-guides/blob/feat/learning-platform-foundation/public/lessons/react-forms-tutorial.html) | source blob `2c26277d2d9fccb20d4b40d56981b4216cf0cc6a` | Controlled/uncontrolled inputs, validation timing, native constraints, custom validation, RHF example, best practices, common mistakes, 10-question quiz, five practice tasks, hint/reveal interactions |
| [`react-ecosystem-course.html`](https://github.com/Mardakhay/interactive-guides/blob/feat/learning-platform-foundation/public/lessons/react-ecosystem-course.html) | source blob `0c01940a040e2c37810a35856ccb400d6b1e701e` | Prop drilling, Context creation/consumption, guarded provider/hooks, useReducer, Todo reducer, Context + reducer, state-tool choice, BookClub tracker |
| React official docs | [Managing State](https://react.dev/learn/managing-state), [Context](https://react.dev/learn/passing-data-deeply-with-context), [Reducer + Context](https://react.dev/learn/scaling-up-with-reducer-and-context) | Primary terminology/reference checks for state ownership and reducer/context responsibilities |

Legacy HTML remains source material. The goal is to migrate instructional content and learning interactions into the structured schema, not to copy each page's separate DOM/CSS shell as-is.

## Week 14 — `react.forms-validation`

### Gaps found before this pass

The existing structured lesson covered controlled/uncontrolled inputs, a short validator, accessible error relationships and submission states, but it did not explicitly map several source activities: one state object for multiple fields, the three common validation timing choices, the complete RHF registration flow, the source's common-bugs review, or its five-part practice progression.

### New coverage

| Source concept / interaction | Current structured destination |
|---|---|
| Multi-field state and the `name` attribute update pattern | `multi-field-state`, `multi-field-state-example`; explains why object spread preserves untouched fields |
| Native `required`, `type=email`, `minLength`, and `pattern` constraints | `native-constraints-code` plus explanation of the browser/server boundary |
| `onChange`, `onBlur`, `onSubmit` timing and touched fields | `validation-timing-strategies` |
| Complete React Hook Form path | `rhf-complete-example-code` covers typed `useForm`, `register`, `handleSubmit`, `formState.errors`, `isSubmitting`, and error-to-field relationships |
| Common mistakes (missing `preventDefault`, missing `onChange`, undefined initial state, premature errors, server errors, color-only feedback) | `common-form-mistakes-list` |
| Ten-question quiz progression from the legacy source | The structured lesson now has ten feedback-bearing knowledge checks |
| Five exercise progression: controlled greeting, multi-field form, validated registration, RHF refactor, debugging a broken form | Four additional scaffolded coding exercises were added alongside the expanded existing registration task, for five total |
| Hint/reveal controls | Their learning content is represented by staged exercise hints, feedback per quiz option and a deliberately broken starter. The old HTML button/toggle implementation is not copied one-to-one. |

The existing registration exercise now includes `confirmPassword` and matching-password requirements, along with field errors and asynchronous submit states. The illustrative password-length validator aligns with the legacy exercise's eight-character rule.

## Week 15 — `react.context-shared-state`

### Gaps found before this pass

The previous version introduced state ownership, lifting state, Context and a preferences reducer. It did not explicitly demonstrate that two calls of the same custom Hook have independent state, and it did not carry over the source lesson's concrete BookClub list/action flow.

### New coverage

| Source concept / interaction | Current structured destination |
|---|---|
| Custom Hook versus shared state | `custom-hook-instance-example` uses two counters to demonstrate independent hook state |
| BookClub state model and action union | `bookclub-reducer-example` defines Book data and typed `ADD_BOOK`, `TOGGLE_READ`, `DELETE_BOOK` actions |
| Immutable list transitions | Reducer walkthrough explains append, map/toggle and filter/delete; ID generation stays outside the reducer |
| Provider/consumer architecture | `bookclub-state-flow` maps provider ownership, consumers and derived summary to the existing Week 13–14 lessons |
| Source's interactive BookClub project | `practice-bookclub-shared-state` provides a bilingual exercise with starter code, requirements, hints and success criteria |
| State-tool selection and boundaries | `global-state-choice-list` explicitly distinguishes local/lifted state, Context, useReducer, Context+reducer, client stores and server state |
| Additional quiz coverage | Three knowledge checks cover independent custom-Hook state, nearest Context provider and reducer-vs-Context responsibilities |

The legacy ecosystem page uses routing snippets from a different React Router major than this project. The state-management ideas are adapted without copying incompatible routing setup into Week 15.

## Verification and remaining gaps

- Week 14 now has 48 blocks, ten knowledge checks and five coding exercises per locale. Week 15 now has 34 blocks, six knowledge checks and two coding exercises per locale.
- EN/RU ordered block IDs/types were checked for both pairs; duplicate block IDs, single-choice answer counts, feedback fields and code-walkthrough line ranges were checked before commit.
- Both pairs remain `status: "review"`; this source-comparison pass does not mark them `published`.
- The RHF package is not added as an application dependency for the lesson; learners must install it in their own project. The lesson authoring UI does not execute TSX, so the examples still need a human/runtime review in a real React project.
- The interactive HTML's tabs, page layout, “Show Solution” and “Reveal Bugs” controls have not been reproduced as identical page UI. Their useful learning goals are represented through structured examples, staged hints, checks, and exercises.
- This is a targeted comparison of Weeks 14–15, not a full line-by-line review of all legacy HTML sources. Retain every source file until the wider migration/review checklist has passed.
