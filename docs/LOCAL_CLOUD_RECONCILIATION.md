# Local-to-cloud reconciliation policy proposal

**Status:** Draft proposal, written 2026-10-27. This records an implementation direction; it is not an approved product policy and does not implement cloud sync.

**Scope:** Future synchronization of anonymous/local learner data to an authenticated, user-owned Supabase account. The current app remains local-first. Supabase is not implemented or a package dependency.

## Existing contracts and constraints

Current storage formats are independently versioned: progress, bookmarks, notes and classic quiz results use an `interactive-guides-local-store` envelope at schema v1; structured-lesson state uses its own v2 envelope; portable export/import uses `interactive-guides-backup` v1. Backup import is **replacement**, not synchronization or merge.

| Data | Current record shape | Sync limitation |
| --- | --- | --- |
| Lesson progress | Per-lesson `status`, `startedAt`, `completedAt`; global `lastOpenedAt` | No per-lesson `updatedAt` or server revision. The global open timestamp cannot order individual lesson changes. Status can move from completed back to in-progress. |
| Bookmarks | `createdAt` for existing items | Removal deletes a key; no tombstone tells an offline device that removal was intentional. |
| Notes | `content`, `updatedAt` | Existing edits can be compared by timestamp, but deletion is absence. Concurrent edits must not silently destroy the losing version. |
| Classic quiz results | One record per quiz with `answers`, `score`, `total`, `completedAt` | Retrying overwrites the prior attempt; clearing removes the key. No stable attempt ID or delete record. |
| Structured quiz attempts | Up to 100 entries per lesson/block key with `selectedOptionIds`, `isCorrect`, `submittedAt` | No stable attempt ID. Timestamp-only deduplication can collide; the capped local array is not a complete cloud history. |
| Code drafts | `code`, `updatedAt` | Reset removes the key; concurrent edits need conflict handling and a deletion marker. |
| Practice checklist | `checkedCriteria`, `updatedAt` | Checking and unchecking are both supported, so unioning checked criteria may resurrect a cleared item. |
| Section progress | `completedBlockIds`, `updatedAt` | Completion can be revoked; set union is not safe when a user intentionally unchecks progress. |

Client timestamps alone are not sufficient conflict authority: clocks can differ, edits can share a timestamp, and a later wall-clock time does not prove a causally later user action.

## Proposed invariants

1. **Local-only stays fully usable.** Missing cloud configuration, signed-out state, offline mode or sync error must not disable local learning.
2. **Backup restore remains separate.** Backup v1 is confirmed replacement. First sign-in with existing local and cloud data needs a distinct reconciliation preview; neither side is silently replaced.
3. **Every remote row is user-scoped.** Derive user identity from the authenticated session/server context, not a trusted client payload. Enforce this with RLS and direct cross-user tests.
4. **Use explicit mutation and concurrency metadata.** Add stable record/attempt IDs where needed, mutation IDs for idempotent retries, per-record local revisions, and last-acknowledged server revisions. Use optimistic concurrency (expected revision), not unguarded upserts.
5. **Represent deletion explicitly.** Bookmark removal, note deletion, cleared quiz results and reset drafts need tombstones or delete operations that survive offline periods. An absent key is not proof another device should delete its copy.
6. **Never silently discard concurrent personal text.** If the same note or code draft was independently changed on two devices since the last shared revision, preserve both versions and ask the user to choose or reconcile. Keep the losing version until resolution is acknowledged.
7. **Show truthful sync state.** Distinguish local-only, syncing, synced, offline, conflict and error. A queued or failed write must not be labeled synced.
8. **Keep schema changes recoverable.** Unknown future versions are not overwritten. Back up local data before migration; sync payloads are versioned independently of lesson content.

## Proposed reconciliation flow

For each record, preserve the last acknowledged remote revision as the common base.

1. Fetch the authenticated user's remote records and revisions; validate against the cloud schema.
2. Compare local state with its saved base and the current remote revision. If only local changed, submit an idempotent mutation with the expected remote revision. If only remote changed, apply it locally after validation.
3. If both changed since the same base, use an entity-specific rule below. Do not apply one timestamp-based merge rule to every dataset.
4. Persist the accepted result locally and advance the acknowledged remote revision only after server confirmation. On failure/offline, retain the pending mutation and retry safely.
5. Keep `lastOpenedLessonId/At` per-device by default; it is a reading convenience, not a reason to overwrite another device's progress.
6. On first sign-in with local and cloud data, show counts and conflicts. The user can cancel, keep local data local, or proceed. Preserve a recoverable local snapshot before reconciliation writes.

## Entity-specific proposal

| Data | Proposed default | Rationale / change needed |
| --- | --- | --- |
| Progress | Add per-lesson revision metadata. Concurrent status edits are a conflict to resolve; do not treat completed as permanently higher than in-progress. Keep last-opened position per device unless requirements say otherwise. | Users can intentionally mark a completed lesson incomplete; a “completed wins” merge would erase that intent. |
| Bookmarks | Model add/remove as explicit operations/tombstones. Apply a causally later operation when known; define and test deterministic behavior for simultaneous operations. | Current key absence cannot communicate offline deletion. Stable operation IDs prevent duplicate retries. |
| Notes | If only one side changed, accept it. If both changed independently, preserve both versions and prompt the user; sync deletion as a tombstone. | Personal text should not be silently overwritten; timestamp is informative but cannot prove causality. |
| Classic quiz results | Decide whether the cloud stores latest result only or full history. Preferred direction: append-only attempts with stable IDs, projecting the latest attempt into the current UI. Clearing should be explicit if it must propagate. | Current retry behavior overwrites prior attempt; there is no stable ID for idempotent merge. |
| Structured quiz attempts | Add stable IDs and merge by ID, not timestamp; sort deterministically and define retention independently of sync. | Current local list is capped at 100, and duplicate submissions can share a timestamp. |
| Code drafts | Accept a one-sided change; for concurrent edits, preserve both snapshots and prompt. Treat reset as a deletion operation. | Last-write-wins could destroy meaningful work. |
| Checklists / section progress | Use record revisions and compare-and-swap. Resolve concurrent check/uncheck deliberately; do not set-union by default. | Both are mutable in both directions; stale replicas can resurrect unchecked criteria or sections. |

These are conservative defaults, not final product decisions. Still requiring agreement: conflict UX, note-sync opt-in, concurrent bookmark semantics, classic quiz-history behavior, tombstone retention and sign-in behavior when cloud data already exists.

## Required tests before enabling sync

### Pure reconciliation tests

- Local-only, remote-only, no-op/equal revision and stale expected-version writes.
- Concurrent note/draft edits preserve both versions; choosing one produces a new revision and repeat sync is idempotent.
- Remove then reconnect after another device retains a stale copy; tombstones prevent resurrection.
- Duplicate retry with the same mutation ID does not duplicate attempts/records.
- Equal or skewed client timestamps do not silently overwrite concurrent edits.
- Schema-version mismatch is surfaced and preserved, not destructively coerced.

### Integration and security tests

- Local learning remains editable with all Supabase variables absent.
- Sign-in with empty remote, populated remote and populated local state produces an accurate, cancellable preview.
- Sign-out/account switch clears in-memory state and private cache for the prior account without unexpectedly deleting anonymous data.
- A user cannot select, insert, update or delete another user's rows through direct database/API calls; test RLS, not only UI guards.
- Offline queue, partial failure, retries and acknowledged revisions remain correct after reload.
- Account deletion and export are tested before personal notes/drafts sync by default.

## Implementation gates

1. Review this proposal and settle the open product decisions.
2. Evolve local schemas with migrations, mutation IDs, tombstones and per-record revisions before network writes.
3. Implement reconciliation as pure tested functions plus repository adapters; do not add auth/UI until the contracts exist.
4. Add SQL migrations and RLS, then test against a real local/test Supabase instance, including cross-user isolation.
5. Add accessible sync/conflict UI and verify local-only mode with all cloud variables absent.

**Current status:** proposal only. No Supabase package, auth, SQL migration or synchronization code is introduced here. Phase 6 remains unchecked until decisions, implementation and acceptance tests are complete.
