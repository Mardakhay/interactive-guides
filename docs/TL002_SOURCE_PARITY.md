# Source parity review: Git Workflow & CI/CD

**Review date:** 2026-10-30  
**Legacy source:** `public/lessons/git-workflow-cicd-guide.html` (94,686 bytes; 1 inline script; 20 buttons)  
**Structured target:** `git.workflow-ci` EN/RU v13 (72 blocks per locale)  
**Related target:** `deployment.production-hosting` for provider rollback and post-merge recovery concepts  
**Cutover:** **Blocked** — the pipeline simulator, branch graph and sequential ten-question quiz are interactive, but the source seven top-level tabs and exact active-tab transitions are not reproduced.

## Source interaction inventory

The legacy guide contains seven top-level tabs: Why Strategy, Branches, Git Flow, Merge Requests, Code Review, CI/CD and Quiz. Its branch canvas has eight controls for creating/switching branches, committing, merging feature/hotfix/release branches and resetting the diagram. The CI/CD panel simulates seven stages (`checkout`, `install`, `lint`, `build`, `test`, `security`, `deploy`), allows a failure to be injected at one stage, runs the pipeline sequentially and can be reset. The original quiz presents ten questions one at a time, records answers, shows per-question explanations, tracks score/progress and ends with a percentage/result screen and restart action.

## Content and assessment crosswalk

| Legacy topic / question | Structured evidence | Review |
|---|---|---|
| Branch purpose and Git Flow branch roles | `branching-purpose`, `branch-workflow`, `git-branch-strategies-body`, `git-branch-strategy-choices` | Covers Git Flow as one team policy, plus alternative branch strategies. |
| Pull requests, review lifecycle and actionable feedback | `pull-request-body`, `code-review-body`, `review-comment-taxonomy`, `review-comment-labels`, `review-comment-practice` | Explains observable issue, impact, requested action and priority labels; style-only concerns are not blockers. |
| Merge/rebase and conflict recovery | `merge-rebase-body`, `conflict-resolution-procedure`, merge/rebase walkthroughs and applied exercise | Distinguishes operation-specific continuation/abort commands; does not teach blanket ours/theirs or hard-reset recovery. |
| CI and actual project workflow | `ci-body`, `ci-example`, `ci-failure-diagnosis-matrix`, `ci-failure-diagnosis-check` | The example uses this repository's actual Node/npm and fail-fast checks; npm audit is explicitly informational. |
| Q1: production hotfix origin | `hotfix-origin-check` | Assessed individually. |
| Q2: branch protection purpose | `branch-protection-check` | Distinguishes CI reporting from server-side branch-protection enforcement. |
| Q3: Git Flow feature target | `git-flow-feature-target-check` | Assesses feature-to-`develop`. |
| Q4: CI purpose | `ci-basics-check` | Assesses automated checks on changes. |
| Q5: actionable review feedback | `review-comment-specificity-check` | Assesses specific, respectful, actionable feedback. |
| Q6: hotfix back-merge | `hotfix-back-merge-check` | Assesses back-merging production hotfixes into the integration branch. |
| Q7: SemVer MINOR | `git-semver-minor-check` | Assesses backward-compatible feature versioning. |
| Q8: continuous deployment | `continuous-deployment-check` | Distinguishes automatic deployment from an approval-gated delivery model. |
| Q9: small PR reviewability | `small-pr-review-check` | Avoids presenting a fixed line count as a universal policy. |
| Q10: lockfile install in CI | `npm-ci-lockfile-check` | Assesses reproducible `npm ci` behavior. |

## Interactive seven-stage pipeline simulator — v11

The new bilingual `pipelineSimulation` block is rendered by `src/features/structured-lesson/PipelineSimulation.tsx` and has deterministic interaction rather than random delays:

1. Learners choose any of seven stages as a failure-injection point and run the pipeline.
2. A required pre-merge failure (`checkout`, `install`, `lint`, `build`, `test`) marks later stages skipped and explains that merge is blocked when branch protection requires the failing check.
3. The dependency audit is classified as informational in this model: an injected advisory is announced as a warning, but subsequent stages continue. Teams may choose a stricter required policy.
4. Deployment is explicitly post-merge. An injected deployment failure does not pretend to turn an earlier successful PR gate red; it exposes a rollback/recovery action.
5. A failed required gate offers a simulated fix/new-commit action. The learner must run the pipeline again against that new simulated commit rather than reusing an earlier result.
6. Stage selectors expose `aria-pressed`, status is announced through a labelled polite live region, and all controls/status copy is localized.

The source visual places deployment inside the same simulated pre-merge progression and says an MR cannot merge when deploy fails, while its displayed workflow YAML has no deployment job. The structured simulator deliberately corrects this inconsistency by modelling deployment as post-merge release work. This is conceptually safer and matches the documented delivery/deployment distinction.

## Interactive branch graph — v12

The former missing branch-canvas interaction is now partially implemented as the bilingual `branchFlowSimulation` block, rendered by `src/features/structured-lesson/BranchFlowSimulation.tsx`.

- The model keeps explicit heads for `main`, `develop`, `feature` and `hotfix`, all pointing to commit IDs. Branch creation starts at the base branch head instead of inventing an empty commit.
- Every commit records its branch, message, parent IDs and optional tag. Ordinary commits have one parent; feature/hotfix/release merge commits have two parents. The graph renders four lanes, parent edges, commit nodes, HEAD markers and history, including release tags `v1.0.1` and `v2.0.0`.
- Eight localized actions create/switch develop, feature and hotfix branches; commit on the active branch; merge feature into develop; merge hotfix into production main; back-merge the production fix into develop; and release develop to main. A separate reset returns the exercise to its initial main-only state.
- After merging a hotfix to main, the simulator exposes a pending back-merge warning and disables release until the fix is merged back into develop. This prevents the next release from silently omitting the production fix.
- The graph is a deterministic learning model only: it does not execute Git commands or mutate a repository. It uses an accessible named SVG, separate description, keyboard-operable buttons, visible prerequisites, and a localized live status.
- Four `BranchFlowSimulation` component tests cover feature branch/commit/merge, hotfix → main → develop back-merge and release gating, reset, and Russian localization. Schema tests assert the eight action IDs and their order.
- Exact-head [Actions run #41059019377 (run #877)](https://github.com/Mardakhay/interactive-guides/actions/runs/41059019377) passed 64 test files / 352 tests, lint, typecheck, production build, 141 bundle budgets, zero npm audit advisories, and preview smoke for 13 routes plus 14 generated content assets.

This closes the core interactive branch-flow mechanism, but not all source UI parity: it is deterministic rather than animated, has no source-style seven-tab navigation, and does not reproduce the original quiz's one-question-at-a-time progress and final score/restart screen.

## Sequential ten-question quiz — v13

The original Git Workflow page has a `questions` array and `initQuiz`, `renderQuestion`, `selectAnswer` and `quizNav` flows. It displays one question at a time, locks the answer after selection, shows explanatory feedback, exposes Previous/Next/Finish, reports question position and live score, calculates a final percentage/result, and offers restart.

The structured v13 lesson now reproduces that interaction using the existing ten knowledge-check blocks rather than maintaining a second question bank:

1. The new `git-workflow-sequential-quiz` block references the existing question IDs in the original order: `hotfix-origin-check`, `branch-protection-check`, `git-flow-feature-target-check`, `ci-basics-check`, `review-comment-specificity-check`, `hotfix-back-merge-check`, `git-semver-minor-check`, `continuous-deployment-check`, `small-pr-review-check` and `npm-ci-lockfile-check`.
2. Schema validation requires ten distinct IDs and validates that each resolves to a `knowledgeCheck` in the same lesson. The renderer creates a lookup by ID, displays the active question inside the sequence and suppresses its standalone block occurrence so the quiz is not duplicated.
3. Existing `KnowledgeCheck` remains the single answer/feedback UI. It continues to call `recordQuizAttempt(lessonId, questionBlockId, selectedOptionIds, isCorrect)`; no parallel quiz-answer store or copied question content is introduced.
4. Previous/Next navigation restores a submitted answer, disables its options and preserves feedback. The score is derived from the ten IDs in the current run, so revisiting a question cannot increment it twice.
5. A labelled progress bar reports the current question position; a localized score counter updates during the run. Finish presents the correct-answer count, percentage and result guidance; Restart clears the current in-memory run while retaining the per-question attempt history.
6. Focus moves to a new prompt, then to its feedback, and finally to the result summary. Labels and feedback are localized for EN/RU.

**Persistence boundary:** only individual question attempts are persisted under the existing lesson/block keys. The aggregate run score is ephemeral and is not written to a new store. No classic HTML quiz-result identity is migrated or overwritten.

## Locale and test evidence

- `git.workflow-ci` EN/RU v13: 72 blocks per locale; 19 knowledge checks, 5 walkthroughs and 5 coding exercises per locale; ordered block IDs/types stay aligned.
- The seven simulation stages have the same IDs/order and gate classification in EN/RU: five required pre-merge gates, one informational audit stage and one post-merge deployment stage.
- `src/features/structured-lesson/PipelineSimulation.test.tsx` has four tests for pre-merge stop/new-commit rerun, informational audit continuation, post-merge rollback and Russian localization.
- `src/content/schemas/lessonContent.test.ts` verifies the seven-stage order and gate semantics.
- Exact-head [Actions run #41063587947 (run #883)](https://github.com/Mardakhay/interactive-guides/actions/runs/41063587947) passed 65 test files / 357 tests, lint, typecheck, production build, 141 JavaScript budgets, zero npm audit advisories and preview smoke for 13 routes plus 14 generated content assets.

## Interaction disposition

| Legacy interaction | Structured target / disposition |
|---|---|
| Seven top-level tabs | Replaced by the structured lesson outline/flow; no exact tab state or transition parity. |
| Animated Git Flow branch canvas and eight actions | Partially implemented as a deterministic branch-flow graph with four lanes, HEAD pointers, commit-parent edges, eight actions plus reset, merge/tag history and required hotfix back-merge. The original animation and surrounding seven-tab layout are not reproduced. |
| Seven-stage failure-injection simulator | Implemented as a localized accessible block; gate semantics are corrected as documented above. |
| Sequential 10-question quiz with score/progress/restart | Implemented using the ten existing check blocks: one question at a time, Previous/Next/Finish, locked/restored answers and feedback, live score/progress, final percentage/result and restart. Only per-question attempts persist; no aggregate run record is added. |
| Learner state on classic lesson route | Retain classic route and quiz-result identity; no automatic result migration is authorized. |

## Remaining release blockers

1. Decide whether the legacy canvas animation and seven-tab navigation need a closer visual/interaction match; the core branch state machine and eight actions are implemented.
2. Decide whether the seven source-level tabs and exact active-tab transitions must be recreated; the sequential quiz interaction is implemented.
3. Complete full claim/code/example/reference review and editorial sign-off for both locales.
4. Define learner-state retention for classic `tl-002` quiz results before changing route identity.
5. Execute keyboard, screen-reader, responsive and native browser checks for the new simulator and all other app routes.

**Current disposition: Blocked.** The pipeline simulator, branch graph and sequential ten-question quiz are implemented as bilingual accessible interactions. The seven source-level tabs, full editorial sign-off, classic-result retention/migration decision and manual-acceptance gates remain open.
