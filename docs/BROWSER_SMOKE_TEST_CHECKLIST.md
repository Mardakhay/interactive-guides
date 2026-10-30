# Browser and device smoke-test checklist

**Status as of 2026-10-30: automated preview HTTP smoke passes; native browser/device acceptance has not been run.** Exact-head CI at `867c86f67a562bed3f803a92aae55a088337dfcb` passed [run #41045918696](https://github.com/Mardakhay/interactive-guides/actions/runs/41045918696): 56 test files / 338 tests, lint, typecheck, production build, budgets across 141 JavaScript chunks and HTTP smoke for 13 deep routes, entry bundle, manifest, service worker, five PWA assets and 14 generated search/practice index assets. npm audit reported zero advisories. Automated tests cover mobile drawer/Modal focus, quiz-result announcements, note autosave status and structured disclosures; native browser, screen-reader and device acceptance remain open.

## Safe setup and evidence

- Use a disposable browser profile and synthetic learner data only. Notes and code drafts can contain private information; do not use real personal content in test backups.
- Record the exact tested commit SHA. Prefer a clean local checkout of `feat/learning-platform-foundation`; do not test a stale build.
- From the repo root, run `npm ci`, `npm run build`, then `npm run preview -- --host 127.0.0.1`. Open the local preview URL printed by Vite.
- Use one normal desktop profile for the main flow, one separate profile for restore/replacement, and at least one supported mobile browser/device. Test a private/restricted-storage mode separately only if available and note that browsers differ.
- Before destructive tests, confirm the profile contains no valuable user data. Restore replaces the current learner-data snapshot; it does not merge.

## A. Local persistence and backup/export

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| P-01 | In a fresh profile, open a lesson and mark it in progress/completed. Add a bookmark and note; complete a classic quiz; in a structured lesson submit a knowledge check, change code in an exercise, check a practice criterion, and complete a section. | Each action is reflected in the UI without a storage error alert. | Not run |
| P-02 | Reload the page and revisit the same routes. | Progress, bookmark, note, quiz result, structured quiz attempts/draft/checklist/section progress survive reload. | Not run |
| P-03 | Select **Download backup file**. Locate the downloaded `interactive-guides-backup-YYYY-MM-DD.json` file and open it with a text editor. | Download prompt/file succeeds; JSON parses and has `format: interactive-guides-backup`, `schemaVersion: 1`, timestamp and the five expected data groups: progress, bookmarks, notes, quizResults and structuredLearning. The synthetic note and code draft are present. UI locale/theme/preferences are not included. | Not run |
| P-04 | On a second disposable profile, create a different note/progress record, select the exported JSON, inspect the preview, and leave the confirmation checkbox unchecked. | Preview describes the imported snapshot; restore remains disabled until explicit confirmation; cancelling or leaving unchecked does not replace existing data. | Not run |
| P-05 | Check the confirmation box and restore the export. Navigate to affected lessons, then reload. | The app shows success, displayed learner data is replaced by the exported snapshot (not merged), and restored values remain after reload. | Not run |
| P-06 | Select a file containing invalid JSON, then an otherwise valid JSON file with an unsupported backup format/schema version. | Each selection produces an understandable error; restore stays disabled and existing data is unchanged. | Not run |
| P-07 | Select a file larger than 10 MiB. | The size error appears before content is read; restore stays disabled; existing data is unchanged. | Not run |
| P-08 | Export after intentionally corrupting one learner storage record in the disposable profile via DevTools. | Export is refused rather than silently omitting the invalid dataset; no download is created. Restore the profile or clear it after the check. | Not run |
| P-09 | In the disposable profile, use browser privacy/site-data controls to block or clear this origin's storage, then reload and attempt a safe learner action. | The app remains usable where possible, and storage failures are surfaced instead of implying that the action was saved. Record exact browser behavior; do not infer that one privacy mode represents all browsers. | Not run |

## B. Restore recovery and data integrity

These cases are partly exercised with deterministic Storage API mocks in Vitest; native quota exhaustion and native rollback failure are hard to reproduce safely without risking unrelated site data. Do not fill a real browser's storage quota with artificial data on a profile containing anything valuable.

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| R-01 | Repeat P-05 with a backup that has fewer records than the current profile. | Restore is replacement, so stale learner records are removed after successful restore. | Not run |
| R-02 | After restore, inspect progress/bookmarks/notes/classic quiz records and structured-learning records in the disposable profile's Application/Storage panel. | Classic stores use the current versioned envelope and structured learning uses its current v2 envelope; legacy structured-learning key is removed only after a successful write path. | Not run |
| R-03 | If a browser/device permits a safe test of denied storage access, attempt restore while access is denied. | The error is visible; no success state is announced. If the browser will not allow controlled simulation of a write failure, record “not reproducible safely” and refer to the automated failure-path tests below. | Not run |
| R-04 | Verify the recorded CI includes restore snapshot-read failure, write failure with successful rollback, legacy-key removal failure, and rollback-failure alert tests. | The corresponding exact-head CI run is green. These tests are supplemental evidence; they do not replace P-03 through P-09. | Pass in CI on pre-refresh HEAD `283305d` — [run #40701225217](https://github.com/Mardakhay/interactive-guides/actions/runs/40701225217); native-browser cases remain not run |

## C. PWA, navigation and mobile acceptance

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| W-01 | Open the published preview/deployment in a supported browser and inspect manifest/install options. | App identity, start URL, display mode and icons are valid; note browser/platform-specific installation limitations. | Not run |
| W-02 | Open a deep lesson URL directly, reload it, and use browser Back/Forward. | The host serves the app shell and client routing resolves the URL correctly. | Not run |
| W-03 | Open a structured lesson online and confirm its dynamic JavaScript chunk loads. Go offline and revisit that same lesson; then attempt a second lesson that has never been opened online. | The previously opened lesson works while its chunk remains in the service-worker asset cache. The unvisited lesson is not precached and may fail to load; the route must show a visible, localized load error rather than “not found” or a false success. Record both outcomes and the browser/device versions. | Not run |
| W-04 | Trigger an available service-worker update while the lesson has unsaved input, then choose defer and later accept. | Update is user-controlled; deferring does not unexpectedly reload the active session. After acceptance, the new shell loads and learner state remains available. | Not run |
| W-05 | On a supported mobile device, install/open the app, test localized deep-link reload, keyboard/external-keyboard navigation where available, orientation/reflow and focus visibility. | No horizontal page overflow at narrow widths, controls remain operable, visible focus is preserved, and language semantics are correct. | Not run |

## D. Practice Center and exercise deep links

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| PC-01 | Open `/practice` in English and Russian on desktop and mobile. | The exercise catalog loads in the selected language; counts and task text match the selected locale; narrow screens have no horizontal page overflow. | Not run |
| PC-02 | In a disposable profile, open an exercise, save a draft and mark one self-review criterion. Return to `/practice`, then reload. | The correct exercise shows a saved draft and the self-review count. Existing local learner-state records remain unchanged in format. | Not run |
| PC-03 | Filter the catalog by saved drafts and self-review, then search by lesson title, task phrase and programming language. | Only matching exercises are shown; clearing filters restores the full catalog. No hint or worked solution is exposed by the index/card. | Not run |
| PC-04 | Select **Open exercise** from a card. | The matching structured lesson loads and scrolls to the exact coding exercise block, not merely to the top of the lesson. | Not run |
| PC-05 | Inspect the activity wording. | Drafts and self-review are described as learner activity, not automatic grading, a mastery score or an official assessment. | Not run |

## E. Settings and local-data status

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| S-01 | Open `/settings` in English and switch the saved UI locale to Russian, then reload a non-structured route. | The saved locale persists across reload and the Settings copy stays in Russian. Structured lesson locale remains encoded in its route. | Not run |
| S-02 | In a synthetic profile, create progress, a bookmark, a note, a structured code draft and a quiz attempt. Open Settings. | Counts match the actual local store records; Settings does not mutate or reformat them. | Not run |
| S-03 | Use browser/DevTools controls or a supported test harness to switch the browser offline/online. | The network status follows `navigator.onLine`; the explanatory text does not promise that all lessons are cached or available offline. | Not run |
| S-04 | Open backup and restore from Settings. | Navigation reaches the existing backup/restore flow; replacement confirmation and restore safeguards remain intact. | Not run |
| S-05 | Inspect the cloud and appearance sections. | UI states that cloud account/sync is not configured and no theme toggle is currently implemented; no non-functional toggles are presented. | Not run |

## F. Generated search/practice index transfer

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| IDX-01 | In DevTools Network, open Search and enter a query in English, then repeat in Russian in a clean browser cache. | Search requests the six generated search parts for the active locale; it does not request the opposite locale or all 44 full lesson JSON chunks. Record transferred bytes and cold/warm timing. | Not run |
| IDX-02 | In a separate clean browser cache, open `/practice` directly. | Practice requests only the locale's dedicated practice index, not the six full-text search parts or all lesson chunks. | Not run |
| IDX-03 | Open a result/Practice exercise and then navigate to its lesson. | Only the selected lesson's full lesson chunk is fetched on demand; the generated index does not replace or eagerly download lesson bodies. | Not run |
| IDX-04 | Inspect generated network payloads/search results for a quiz and coding exercise. | Quiz options/answer feedback/explanations and exercise hints/starter code/solutions are absent from the generated index and UI snippets. | Not run |

## G. App-wide locale routing

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| LOC-01 | Open `/en/courses`, `/ru/courses`, `/en/practice` and `/ru/settings` directly, then refresh each URL. | The selected route and UI language remain stable after refresh; URLs stay shareable and the document language matches the route locale. | Not run |
| LOC-02 | In a profile with Russian saved as the UI preference, open the legacy `/courses?category=html#results` URL. Repeat with English saved. | The app redirects to the same path under `/ru` or `/en`, preserving query and hash; the destination page remains usable. | Not run |
| LOC-03 | Switch language from Search, Settings, a course detail page and a structured lesson with a query/hash. | The route remains the same logical screen/resource under the new locale, the query/hash are preserved, and structured lessons retain their stable lesson ID. | Not run |
| LOC-04 | Open an unsupported prefix such as `/xx/courses`. | The app repairs it to the saved supported locale without losing the requested route path, or presents a localized not-found state; it must not loop. | Not run |
| LOC-05 | Follow desktop Sidebar and mobile bottom-navigation links while on Russian routes. | All generated links retain the `/ru` prefix and the current route is visibly marked active. | Not run |

## H. Shared navigation keyboard and assistive-technology checks

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| A11Y-NAV-01 | At a narrow viewport, focus **Open menu** and press Enter/Space. | The drawer opens as a labelled modal dialog, focus moves into it, and closed drawer links are not reachable by Tab. | Not run |
| A11Y-NAV-02 | With the drawer open, press Tab repeatedly through the last link, then Shift+Tab from the first link. | Focus wraps within the drawer; it does not move into the obscured page. | Pass in Vitest keyboard component test; native browser not run |
| A11Y-NAV-03 | Press Escape while the drawer is open. | The drawer closes and focus returns to the menu trigger. | Pass in Vitest keyboard component test; native browser not run |
| A11Y-NAV-04 | Use VoiceOver (iOS/macOS) or NVDA/Firefox (Windows) to open and navigate the drawer. | The dialog/navigation label, link names, active route and close action are announced coherently; background content is not exposed as part of the modal interaction. | Not run |
| A11Y-NAV-05 | Navigate TopBar, Sidebar and MobileNav using only keyboard at 200% zoom and narrow viewport. | Every interactive control has a visible focus indicator, logical focus order, usable target size and no horizontal overflow. | Not run |

## I. Modal dialog and search-filter accessibility

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| A11Y-MODAL-01 | Open each Modal from its trigger using mouse and keyboard. | Focus moves into the labelled dialog; the title is announced; background scrolling is locked. | Not run |
| A11Y-MODAL-02 | Tab/Shift+Tab through the dialog, then close using Escape and backdrop. | Focus never moves behind the modal; close returns focus to the trigger and body scroll is restored. | Pass in Vitest component test; native browser not run |
| A11Y-MODAL-03 | Use NVDA/Firefox or VoiceOver/Safari with a dialog open. | The dialog name, close button and dialog controls are announced in a coherent order; background content is not navigated as part of the modal task. | Not run |
| A11Y-FILTER-01 | Navigate Search result filters by keyboard and inspect with a screen reader. | Each filter is exposed as a button with pressed/not-pressed state in a named group; Space/Enter changes the filter. | Pass in Vitest component test; native screen reader not run |
| A11Y-FILTER-02 | Clear a non-empty Search query using keyboard. | Clear-search is focusable, visibly focused, labelled and clears the query without taking focus unexpectedly. | Not run |

## J. Learning feedback and autosave announcements

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| A11Y-LEARN-01 | Complete a classic quiz using keyboard only. | After Submit, the score summary is announced and receives focus; result correctness and explanation remain readable. | Pass in Vitest component test; native screen reader not run |
| A11Y-LEARN-02 | Submit an English and Russian structured knowledge check. | Correct/incorrect feedback and explanation are announced as a polite status; focus moves to the feedback, and Retry remains reachable next. | Pass in Vitest component test; native screen reader not run |
| A11Y-LEARN-03 | Edit a lesson note, wait for autosave, and inspect with a screen reader. | The saved timestamp/status is announced after debounce, not on every keystroke; existing note content persists after reload. | Pass in Vitest fake-timer/store test; native screen reader not run |
| A11Y-LEARN-04 | Expand/collapse HTML preview, hints and example solution using keyboard. | Each disclosure exposes expanded state, controls a stable panel, and hidden content is not exposed while collapsed. | Pass in Vitest component test; native browser not run |
| A11Y-LEARN-05 | Use a structured code editor and self-review checklist with keyboard at 200% zoom. | The editor has a programmatic label; checkbox names are available; focus is visible and horizontal overflow stays contained to code/preview where intended. | Not run |

## M. Recent localization and accessibility refinements

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| A11Y-ROUTE-01 | Trigger a route-loading failure in English and Russian. | Error heading, explanation and recovery action use the active locale; recovery navigation remains within that locale. | Not run in a native browser |
| A11Y-ROUTE-02 | Navigate between dashboard, courses, learning paths, lesson, bookmarks and notes from both locale prefixes. | Internal links preserve the active `/en` or `/ru` prefix; breadcrumbs identify the current page with `aria-current="page"`. | Not run in a native browser |
| A11Y-FORM-03 | Submit invalid Input and Textarea controls, then focus each with a keyboard. | Controls expose `aria-invalid="true"`, invalid focus styling is visible, and placeholders remain readable. | Pass in Vitest component tests; native browser and screen reader not run |
| A11Y-STATUS-01 | Inspect loading feedback and route errors with a screen reader. | Loading feedback has an accessible name; route error announcements and recovery controls are understandable and localized. | Not run with a screen reader |
| A11Y-MOTION-01 | Enable the operating-system reduced-motion preference and navigate/expand app UI. | Non-essential transitions and animations are reduced or removed without hiding state changes or blocking interaction. | Not run in a native browser |

## N. Git Workflow quiz and simulator acceptance

Run these checks against the locale-prefixed structured lesson route `/en/structured-lessons/git.workflow-ci` and `/ru/structured-lessons/git.workflow-ci`. Component tests do not replace native browser or assistive-technology acceptance.

| ID | Procedure | Expected result | Outcome / notes |
|---|---|---|---|
| GIT-QUIZ-01 | Open the Git Workflow lesson in EN and RU and locate the sequential quiz. | Only question 1 of 10 is visible; progress is 1/10 and score is 0/10; no referenced question is repeated later in the lesson flow. | Not run in a native browser |
| GIT-QUIZ-02 | Answer question 1 correctly and question 2 incorrectly; use Previous, then Next. | Each answer is locked after submission; selected option and feedback are restored; live score remains correct and revisiting does not add another attempt. | Pass in Vitest component tests; native browser not run |
| GIT-QUIZ-03 | Navigate through all ten questions with keyboard only. | Previous is disabled on the first question; Next/Finish is unavailable before answering; prompt and feedback focus changes are announced in a logical order. | Not run in a native browser/screen reader |
| GIT-QUIZ-04 | Finish with a known mix of correct/incorrect answers, then restart. | Final score and percentage match the answers; restart returns to question 1 with a clean run score while per-question attempt history remains available. | Pass in Vitest component tests; native browser not run |
| GIT-QUIZ-05 | Complete the sequence in Russian at 200% zoom and a 320px viewport. | Navigation, progress, score, feedback and final result remain localized, keyboard accessible and free of unintended page-wide horizontal overflow. | Not run in a native browser |
| GIT-BRANCH-01 | Create develop and feature branches, add a commit and merge feature into develop. | Branch pointers and commit-parent graph update; active branch and history reflect the merge. | Pass in Vitest component tests; native browser not run |
| GIT-BRANCH-02 | Create a hotfix from main, add a commit, merge to main, then attempt a release before back-merge. | A pending back-merge warning appears and release remains disabled until hotfix is merged into develop. | Pass in Vitest component tests; native browser not run |
| GIT-BRANCH-03 | Back-merge hotfix and create a release, then reset the graph. | Release tag appears; reset returns the exercise to the initial main-only graph. | Pass in Vitest component tests; native browser not run |
| GIT-PIPE-01 | Inject failure into a required pre-merge stage, then create a fix/new simulated commit and rerun. | Later stages are skipped after a required failure; retry uses a new simulated commit number and successful checks update the result. | Pass in Vitest component tests; native browser not run |
| GIT-PIPE-02 | Inject an informational dependency-audit warning and separately a post-merge deployment failure. | Audit warning does not stop subsequent stages in this model; deployment failure is presented as release recovery with rollback, not as a retroactive PR gate failure. | Pass in Vitest component tests; native browser not run |

## Execution record

Create one row per tested environment. Do not fill a result unless the procedure was actually run.

| Date | Commit SHA | Browser and version | OS/device | Profile/network mode | Test IDs | Pass/fail/not reproducible | Evidence or notes |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | Not run | No real-browser/device execution is recorded yet. |
