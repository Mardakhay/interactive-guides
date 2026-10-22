# Persistence and Supabase Plan

**Status:** proposed. Supabase is not currently shown as a dependency in the audited `package.json`.

## Product decisions

1. The app remains usable without sign-in.
2. Public curriculum and lessons remain readable offline within the documented cache scope.
3. Local persistence is the immediate source for anonymous learner state.
4. Supabase is added only after local repository contracts and stable models exist.
5. Cloud synchronization is scoped per authenticated user and protected by Row Level Security.
6. A UI route guard is not an authorization boundary; the database/API must enforce access.

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


## Implemented local persistence recovery (feature branch)

- Structured learning is stored under `interactive-guides:structured-learning:v2` as `{ schemaVersion: 2, data: ... }`.
- Historical raw records under `interactive-guides:structured-learning:v1` migrate to the v2 envelope. The old key is removed only after the new record is written successfully; on failure, the old record stays available.
- Invalid/unreadable structured records are preserved and surfaced to the app shell. The ordinary retry action does not overwrite read/validation failures with an empty state.
- Storage warnings now distinguish read/write/remove failures and survive errors that happen before the banner mounts.
- The user-triggered Retry save action re-persists current in-memory progress, bookmarks, notes, quiz results and structured learning state after a write/removal problem.
- Backup files remain at portable format version 1 and contain normalized learner data, not the internal local-storage envelope. Backup import upgrades the structured state through the same v2 storage writer.
- Explicit per-store migration for bookmarks, notes, progress and legacy quiz results remains future work if those store schemas change. Cloud sync is not implemented.
