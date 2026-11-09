# Persistence and Supabase Plan

**Status:** versioned local learner stores and JSON backup/restore v1 are implemented on `feat/learning-platform-foundation`. A draft local/cloud reconciliation policy is in [`LOCAL_CLOUD_RECONCILIATION.md`](./LOCAL_CLOUD_RECONCILIATION.md); Supabase auth/sync remains proposed and is not a package dependency.

## Product decisions

1. The app remains usable without sign-in.
2. Public curriculum and lessons remain readable offline within the documented cache scope.
3. Local persistence is the immediate source for anonymous learner state.
4. Supabase is added only after local repository contracts and stable models exist.
5. Cloud synchronization is scoped per authenticated user and protected by Row Level Security.
6. A UI route guard is not an authorization boundary; the database/API must enforce access.

## Local data backup/export-restore — v1 implementation checkpoint (2026-10-27)

### Versioned local stores — schema v1 (2026-10-27)

The existing progress, bookmarks, notes and classic quiz-result stores now persist an envelope with `format: "interactive-guides-local-store"`, `schemaVersion: 1`, and `data`. `readVersionedJSON` accepts valid legacy raw JSON, migrates it by replacing the same storage key with the envelope, and keeps the validated data usable in memory if that one-key write fails. The raw legacy value remains intact in that case, so a later read can retry migration. Unknown envelope versions and malformed data are not overwritten; read/write failures emit the existing storage-error event. Writes validate against the relevant state Zod schema before persisting.

The backup file format stays distinct (`interactive-guides-backup`, schema version 1) so it is portable and does not expose repository-specific wrappers as its public data model. Export reads both valid legacy raw datasets and current local-store envelopes; restore writes current envelopes for the four classic stores and the existing structured-learning v2 envelope.

The bilingual `/backup` route is available from the application sidebar. It exports and restores the current local learning datasets as a versioned JSON document (`format: interactive-guides-backup`, `schemaVersion: 1`, 10 MiB maximum file size). Included data: lesson progress, bookmarks, notes, classic quiz results, and structured-lesson quiz attempts, code drafts, practice checklists and section progress. UI locale, theme and other application preferences are intentionally not part of this learner-data backup.

Before export, current stored records are parsed and checked against their Zod schemas; invalid stored data fails visibly rather than producing a partial archive. Import validates the format/version and every dataset before any write. The user sees a record-count preview and must explicitly confirm replacement. Restore is replacement, not merge: it writes canonical current storage records and removes the legacy structured-learning record only after the preceding writes succeed. If a write fails, the implementation attempts to restore the previous raw values for every affected key. The browser Storage API is not transactional, so rollback is best-effort; if rollback also fails the page reports a prominent recovery warning.

Backup files are plain JSON and can contain private notes/code drafts. Users should store them somewhere private and avoid sharing them casually. Exact-head CI for code commit [`73a47b9`](https://github.com/Mardakhay/interactive-guides/commit/73a47b96b1c0fc00d454c0cd955f24514bb32024) passed run [40487424471](https://github.com/Mardakhay/interactive-guides/actions/runs/40487424471). Browser-specific download/file-picker smoke testing remains outstanding.

Still open: complete the remaining real-browser/device acceptance in [`BROWSER_SMOKE_TEST_CHECKLIST.md`](./BROWSER_SMOKE_TEST_CHECKLIST.md); finish a final inventory of persistence call sites/preferences; decide field-level merge semantics for future cloud sync; and implement/account-test Supabase only after those contracts stabilize. Progress, bookmarks, notes and classic quiz results use local-store schema-v1 envelopes; structured learning uses a v2 envelope. UI locale is a separate preference and is intentionally excluded from learner backup.

## First cloud features worth implementing

- Email/password and/or supported OAuth sign-in after auth requirements are reviewed.
- Restore progress and bookmarks on another device.
- Sync personal notes if privacy and deletion/export requirements are implemented.
- Store quiz attempts and coding practice outcomes.
- Last sync time, sync status and retry of transient failures.
- Account data export and account deletion flow.
- A merge/restore path if an account starts with existing local data.

## Candidate relational schema

These names are illustrative; finalize with migrations and queries before implementation.

### `profiles`
- `id uuid primary key references auth.users(id) on delete cascade`
- `display_name text null`
- `preferred_locale text not null default 'en' check (preferred_locale in ('en','ru'))`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

### `lesson_progress`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `lesson_id text not null`
- `content_version text not null`
- `status text not null check (status in ('not-started','in-progress','completed','needs-review'))`
- `started_at timestamptz null`
- `completed_at timestamptz null`
- `last_accessed_at timestamptz null`
- `updated_at timestamptz not null default now()`
- primary key `(user_id, lesson_id)`

### `section_progress`
- `user_id uuid not null`
- `lesson_id text not null`
- `section_id text not null`
- `status text not null check (status in ('not-started','viewed','completed'))`
- `updated_at timestamptz not null default now()`
- primary key `(user_id, lesson_id, section_id)`

### `quiz_attempts`
- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null`
- `lesson_id text not null`
- `quiz_id text not null`
- `content_version text not null`
- `answers jsonb not null`
- `score numeric not null`
- `passed boolean not null`
- `started_at timestamptz not null`
- `submitted_at timestamptz not null`

### `exercise_attempts`
- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null`
- `lesson_id text not null`
- `exercise_id text not null`
- `content_version text not null`
- `submission jsonb not null`
- `result jsonb not null`
- `submitted_at timestamptz not null default now()`

### `bookmarks`
- `user_id uuid not null`
- `lesson_id text not null`
- `created_at timestamptz not null default now()`
- primary key `(user_id, lesson_id)`

### `notes`
- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null`
- `lesson_id text not null`
- `body text not null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Add foreign keys to `auth.users` for every user-owned table and suitable indexes for user, lesson and updated_at access.

## Row Level Security

Enable RLS on every table containing user data. Policies should allow a signed-in user to select/insert/update/delete only rows where `user_id = auth.uid()` (and for `profiles`, `id = auth.uid()`). Validate policy behavior with tests and direct SQL checks. Do not rely on client-supplied IDs or frontend route guards.

Never expose the Supabase service-role key to the browser. A Vite `VITE_*` variable is shipped to client code; only public project URL and anon/publishable key belong there. Keep server-only credentials in server-side secret storage if future server functions are added.

## Local-to-cloud migration

1. Version the local storage format and export current user data.
2. Add a migration/backup step before changing existing records.
3. On sign-in, show a reconciliation choice if local and cloud data diverge.
4. Merge using deterministic rules; do not silently overwrite newer notes or attempts.
5. Use `updated_at` and a documented conflict policy; timestamps alone are not a substitute for deciding field-specific merge semantics.
6. Queue pending local writes when offline; retry safely with idempotent upserts.
7. Make sync state visible (local only, syncing, synced, offline, conflict/error).
8. Test sign-out, account switch, shared-device behavior and cleanup of user-scoped caches.

## Decision still needed

Whether to sync notes by default, and whether the app should support multiple providers or only one initial sign-in option. Implement after the basic content/local-first foundation.


## Backup UI automated interaction tests — 2026-10-27

The page-level tests now cover the primary user interactions in Vitest/jsdom: valid file selection and preview, confirmation gating, restore updates both local versioned storage and the active Zustand stores, malformed JSON, 10 MiB rejection before calling `File.text()`, and the export filename/status plus object-URL cleanup. The initial English/Russian render checks remain.

These tests catch app/UI logic regressions but do not assert native browser download prompts or mobile file-picker UX. Real-browser/device smoke acceptance remains required.


## Backup selection race protection — 2026-10-27

File-import UI now identifies the active read request and ignores stale completions from earlier file selections. A read that resolves or rejects after the user selects a newer file cannot overwrite the new preview or announce a stale error; pending reads are invalidated on unmount. `BackupPage.test.tsx` includes a delayed-first-file regression test.


## Local/cloud reconciliation proposal — 2026-10-27

`docs/LOCAL_CLOUD_RECONCILIATION.md` is the draft for future local-to-Supabase reconciliation. It records current data-shape gaps, especially missing per-record progress revisions, deletion tombstones, stable attempt IDs and concurrent-edit semantics. It proposes optimistic concurrency, idempotent mutations, tombstones, conflict preservation for notes/code drafts and required RLS tests.

This proposal is not approved as product behavior and does not enable cloud sync. Settle note opt-in, classic quiz-history semantics, concurrent bookmark behavior, tombstone retention and conflict UX before schema migrations or auth/sync code.


## Visible local-storage failure feedback — 2026-10-27

The application shell now mounts a bilingual storage-error alert. It reads the most recent reported failure (including failures raised while learner stores initialize), subscribes to subsequent read/write/remove events, explains the likely impact and next step, and allows dismissal. Dismissal clears the stored notice snapshot; subsequent errors can re-open the alert.

Automated component tests cover an error before mount, a new event while mounted, dismiss/clear behavior and Russian copy. This improves failure visibility but does not prove localStorage behavior on actual browser/device privacy modes or quota exhaustion. Those real-browser acceptance items remain open.


## Storage failure notice validation — 2026-10-27

The global storage-error alert and EN/RU content have passed exact-head CI. It surfaces errors that occur before mount and subsequent read/write/remove failures; dismissal clears the active notice and future errors remain observable. Automated coverage passes for pre-mount event state, live event updates, dismissal, and Russian copy.

This is visibility/recovery guidance, not transactional persistence. Browser-specific permission/quota modes still need device-level smoke testing.


## Storage notice shell integration acceptance — 2026-10-27

The global storage-error notice is now tested both independently and through `AppLayout`. The integration test verifies that an error recorded before layout mount is visible after the real shell is rendered. Exact-head CI succeeded in run [40495501752](https://github.com/Mardakhay/interactive-guides/actions/runs/40495501752).

Real browser/device permission, privacy-mode and quota validation remain required to close the remaining local-first acceptance gate.

## Restore failure UI recovery coverage — 2026-10-27

`BackupPage.test.tsx` now covers two failure paths at the UI boundary: a restore write fails and rollback succeeds, preserving the original raw storage values and keeping active Zustand stores unchanged; a restore write fails and rollback of an earlier written key also fails, displaying the urgent recovery alert without publishing the imported payload to active stores.

These are deterministic `QuotaExceededError` simulations in jsdom, not native browser quota/privacy validation. Exact-head CI passed on `c3208ddac964003dd6c119e9fb41a8b78c601435` in [run 40497324096](https://github.com/Mardakhay/interactive-guides/actions/runs/40497324096).

Remaining Phase 5 acceptance: record a real-browser/device smoke pass for localStorage denial/quota behavior, native file selection, the downloaded JSON filename and content, re-import, successful replacement, and storage-write/rollback error recovery. Include browser, OS/device, date and results; do not infer this evidence from Vitest/jsdom.

## Backup export payload and legacy-removal rollback coverage — 2026-10-27

`BackupPage.test.tsx` now reads the generated export Blob with `FileReader` and verifies the serialized backup format/version, inclusion of a learner note, the expected five data groups, and exclusion of UI locale/preferences. A separate UI case verifies that malformed stored notes prevent creating a partial export and produce the localized error alert.

`backup.test.ts` also simulates a failure when removing the old structured-learning key after the replacement records have been written. It asserts that all previous raw values are restored and the operation reports a storage-write failure. Combined with page-level write-failure and rollback-failure tests, the restore path now covers failure before replacement, failure during writes, failure during legacy cleanup, rollback success, and rollback failure.

Exact-head CI passed on `814c4d6f51deefb8f8904a4a3a15321aa537d233` in [run 40497807964](https://github.com/Mardakhay/interactive-guides/actions/runs/40497807964). The earlier export-content test run failed because jsdom's Blob implementation did not provide `.text()`; the test now uses `FileReader` without weakening payload assertions.

Still required: real-browser/device validation of storage privacy/quota, the actual download/file picker, and restore behavior under native browser restrictions. Vitest/jsdom coverage does not close those manual acceptance items.

## Structured-learning legacy cleanup failure test — 2026-10-27

`src/features/structured-lesson/persistence.test.ts` now simulates a browser refusing removal of the legacy structured-learning key after the current v2 envelope was successfully saved. The test verifies the new envelope contains the recovered state, the legacy source remains available, and the UI-wide storage error snapshot identifies the failed `remove` operation.

Exact-head CI passed on `9fb38aa1252e6a8f9191b777889b3c8cbe1229dc`: [run 40498451420](https://github.com/Mardakhay/interactive-guides/actions/runs/40498451420). This was a deterministic Storage API failure test, not real-browser quota/privacy validation.

## Backup restore snapshot-read failure coverage — 2026-10-27

`backup.test.ts` now forces a read failure while `restoreLocalBackup` is collecting the original six-key snapshot. The test verifies the operation returns `storage-read-failed`, performs zero `setItem`/`removeItem` mutations, and leaves all six original raw values unchanged. This protects the rule that rollback state must be readable before replacement starts.

Exact-head CI passed on `b9f500ee8509a986c12b0babd25a2c9947183a90`: [run 40498940471](https://github.com/Mardakhay/interactive-guides/actions/runs/40498940471). These remain deterministic Storage test doubles; actual browser/device acceptance is separate.

## Real-browser/device acceptance protocol

The reproducible test procedure is documented in [`BROWSER_SMOKE_TEST_CHECKLIST.md`](./BROWSER_SMOKE_TEST_CHECKLIST.md). It covers fresh-profile learner-state setup, export-file inspection, restore replacement/confirmation, invalid and oversized files, denied storage, and PWA/deep-link/offline/update checks. No real-browser/device results are recorded by this documentation change; the protocol is not a claim of acceptance.
