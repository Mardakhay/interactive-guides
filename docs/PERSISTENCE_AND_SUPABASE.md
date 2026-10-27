# Persistence and Supabase Plan

**Status:** versioned local learner stores and JSON backup/restore v1 are implemented on `feat/learning-platform-foundation`. Supabase auth/sync remains proposed and is not a package dependency.

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

Still open: migrate/version every local repository independently of the backup envelope; audit storage-unavailable and migration-retry behavior across all stores; decide field-level merge semantics for future cloud sync; and implement/account-test Supabase only after those contracts stabilize.

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
