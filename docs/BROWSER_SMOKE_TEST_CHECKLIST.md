# Browser and device smoke-test checklist

**Status as of 2026-10-30: automated preview HTTP smoke passes; native browser/device acceptance has not been run.** Feature-branch CI at `f25e87e65fd05be5aa49fcde590489325f0bc40f` passed [run #41035799497](https://github.com/Mardakhay/interactive-guides/actions/runs/41035799497): install, lint, typecheck, 49 test files, production build, bundle budgets and HTTP smoke for six deep routes plus manifest, service worker and PWA assets. Production build emits six search chunks and one dedicated practice chunk per locale; the largest built chunk is about 276 KB raw / 69 KB gzip. The smoke checks HTTP routes/assets only; do not use it to mark install, offline, storage, accessibility or mobile cases as passed.

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

## Execution record

Create one row per tested environment. Do not fill a result unless the procedure was actually run.

| Date | Commit SHA | Browser and version | OS/device | Profile/network mode | Test IDs | Pass/fail/not reproducible | Evidence or notes |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | Not run | No real-browser/device execution is recorded yet. |
