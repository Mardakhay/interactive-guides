# Source parity review: Git & GitHub Reference

**Review date:** 2026-10-30  
**Legacy source:** `public/lessons/git-reference.html` (1,582 lines / 64,174 characters at review time)  
**Structured target:** `git.fundamentals` EN/RU v13, plus `git.workflow-ci` for collaboration/CI topics  
**Cutover:** **Blocked** — this document records implemented coverage and unresolved interaction/state differences; it is not approval to remove the legacy route.

## Source interaction inventory

The legacy file has 12 sidebar navigation items, one command-search input, 20 individual copy buttons plus a sidebar menu toggle and additional navigation handlers (32 inline `onclick` attributes in the inspected source). The page combines a dark visual reference layout with section switching, command copy, and a mobile sidebar. The structured reader is responsive and provides anchor-based outlines, localised command copy, and browser search, but it is not an exact recreation of the old theme, fixed sidebar, active-section transition model or all of its inline controls.

## Content crosswalk

| Legacy topic | Structured evidence | Review |
|---|---|---|
| What is Git; working directory, staging area and repository | `why-git`, `git-mental-model`, `git-areas` | Concepts retained and expanded to distinguish the remote repository. |
| Basic workflow: edit, stage, commit and push | `git-first-workflow`, `git-command-example`, command reference | Covered with explicit status inspection and selected staging. |
| Essential commands, HEAD, inspect, undo, unstage and reset | `git-command-reference-heading`, `git-command-reference-list`, `deep-git-heading` and walkthroughs | Expanded with safer restore/revert guidance; exact legacy command grouping is not duplicated. |
| Stash, amend and aliases | `git-local-history-tools` and associated walkthrough/check | Covered with local-vs-shared history caveats. |
| Branching and feature/bugfix/experiment branches | `git.workflow-ci`: branch strategy and workflow; Git Fundamentals branch/remote sections | Core concepts are present across the mapped structured pair; do not collapse the two lesson identities. |
| GitHub, local/remote setup and GitHub Flow | `remote`, `github-flow-review-heading`, `git.workflow-ci` PR/review/merge blocks | Covered as structured explanation and practice; the old animated/section-switching navigation is not equivalent. |
| Teamwork, pull requests, line review, collaborators and access | `git.workflow-ci` PR review and least-privilege sections; `repository-access-heading` | The target teaches review behavior and repository roles. Exact old settings screens and collaborator UI are not recreated. |
| GitHub Markdown and README | `markdown-basics`, `readme-writing` | Covered in the structured lesson. |
| GitHub Pages and deployment | `github-pages-deployment` plus deployment track | The target now includes a source-aware Pages walkthrough/check; provider-specific legacy click-through behavior remains a manual disposition. |
| Rebase and conflict recovery | `git-rebase-safe-update`, `git-rebase-safety-check`, conflict-resolution blocks in `git.workflow-ci` | Expanded to distinguish private feature branch rebasing from rewriting shared history. |
| .gitignore, cleanliness and secret protection | `gitignore`, `gitignore-patterns`, secret-response walkthrough | Expanded with pattern precedence and revoke/rotate-first guidance. |
| Quick command reference | `git-command-reference-list` | Individual commands remain copyable. This update adds a bilingual live filter over command/category/description text, matching the core legacy command-search task. |

## Locale and content integrity

- English and Russian `git.fundamentals` are both v13 with 72 blocks; ordered block IDs/types are aligned. English status is `original`; Russian status is `translated`. Both records remain editorially `review`.
- The lesson has 11 knowledge checks, 9 code walkthroughs, 3 coding exercises, one command reference and one references block. Knowledge-check feedback/options and coding-exercise hints/solutions are not exposed by the shared search-text extractor.
- The source-to-target mapping is one-to-many across `git.fundamentals` and `git.workflow-ci`; parity must be reviewed as a pair rather than treating either target as the whole source.

## Interaction disposition

| Legacy interaction | Structured target / disposition |
|---|---|
| Section navigation and sidebar accordion | Anchor-based mobile details/desktop outline; full source active-section/menu parity remains partial. |
| Search commands | Implemented in the structured command reference; filters command text, category and description in both locales. |
| Copy command buttons | Preserved as individual buttons with per-command success/failure feedback for assistive technology. |
| Fixed dark sidebar, animated section switch and legacy responsive styling | Not copied; app shell and structured lesson reader provide the destination layout. Validate native responsive behavior before any cutover. |
| GitHub Flow / branch navigation interactions | Structured curriculum content and links replace source-specific tab/section behavior; validate that no unique learner task is lost. |
| Legacy HTML route and historic learner-state IDs | Must remain available until explicit retention/migration and rollback policy is approved. |

## Validation evidence added in this change

- Renderer tests filter `git status -sb` from the command list in English and Russian.
- Tests assert unrelated commands disappear, and a no-result state is announced and recoverable by clearing the query.
- Full CI and the latest production-preview route smoke are still required after this change.

## Bilingual structure and command-safety review — 2026-10-30

A focused verification pass checked the actual structured JSON and existing regression coverage, not only the earlier crosswalk:

- `git.fundamentals` EN/RU v13 contains 72 blocks per locale: 19 headings, 16 paragraphs, 2 callouts, 9 lists, 9 walkthroughs, 1 code block, 11 knowledge checks, 3 coding exercises, 1 command reference and 1 references block. Ordered block IDs and types align across locales; all 11 checks have the same option IDs and the same correct-answer IDs in EN/RU. Both records remain editorial status `review`.
- `git.workflow-ci` EN/RU v10 contains 69 blocks per locale, including 19 checks, 5 walkthroughs and 5 coding exercises. Ordered block IDs/types and every check's option/correct-answer IDs align across locales. Both records remain editorial status `review`.
- The Git Fundamentals quick reference contains 25 uniquely identified commands in four categories. It includes inspection-first commands, safe unstage/revert/fetch flows and explicit cautions for destructive `restore`, unpublished-only `commit --amend`, and fast-forward-only pull. It does not promote `git reset --hard` or `git push --force`.
- Walkthroughs distinguish local Git commands from hosting-platform actions, warn that `.gitignore` does not revoke an exposed credential or remove historical commits, instruct token revocation/rotation before cleanup, preserve the local `.env` with `git rm --cached`, and limit rebase guidance to a learner's own unpublished branch with an abort path.
- Existing regression coverage in `src/content/schemas/lessonContent.test.ts` and `src/content/gitReferenceParity.test.ts` checks locale block alignment, the 25-command inventory and unique IDs, absence of hard reset guidance, secret-leak response, least-privilege roles, safe rebase, fetch-vs-pull, Markdown, GitHub Pages and their assessed feedback.

This verifies the current structured pair's structural alignment and selected high-risk concepts. It is **not** a full sentence-by-sentence editorial sign-off for every legacy paragraph, screenshot, code fragment or hosted-platform UI. The two lessons remain in review status, and no cutover is approved.

## Remaining release blockers

1. Complete claim-by-claim and example-by-example technical review of both target lessons against all legacy sections; this focused crosswalk is an inventory, not an editorial sign-off.
2. Native desktop/mobile checks for command search, copy feedback, keyboard/assistive technology, responsive navigation and anchor history.
3. Confirm learner-state disposition for classic Git source IDs and quiz records without fan-out to multiple structured IDs.
4. Review and explicitly approve a cutover decision. Keep `public/lessons/git-reference.html` and the classic route until all gates are closed.

**Current disposition: Blocked.** The new command search closes one documented interaction gap; it does not make the Git reference route cutover-ready.
