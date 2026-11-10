# Local Persistence and Backup

## Storage model

The application stores learner state in the browser. Feature stores validate data with Zod and use the shared storage/versioning utilities. Structured lesson activity has a separate versioned state contract.

Active learner data includes:

- Lesson progress and the last-opened structured lesson pointer.
- Bookmarks and personal notes.
- Structured knowledge-check attempts.
- Coding exercise drafts and self-review checklists.
- Section-read progress and related structured lesson activity.

The backup format also retains the legacy quiz-results field for compatibility with existing locally stored records. The former classic quiz reader is not part of the active application.

## Backup and restore

The Settings/Backup flow exports a validated JSON snapshot. Restore replaces the current local learner-data snapshot; it is not a merge and does not synchronize with a server.

The restore implementation validates the complete payload before writing. It attempts to restore the previous raw values if one of the storage writes fails. Browser storage is not transactional, so rollback is best-effort; the UI reports recovery errors rather than claiming a successful restore.

Backup files can contain private notes and code drafts. Store them somewhere private and do not share them casually.

## Retired lesson IDs

Older progress, bookmark, and note records may still be keyed by IDs from the retired classic catalog. The application does not fan those records out to structured lessons or delete them automatically. Records that do not resolve to a current structured lesson are hidden from active lesson lists.

## Operational limits

- Browser storage can be unavailable, denied, or quota-limited.
- Clearing browser site data can remove local learner records; export a backup before clearing it.
- A restore replaces current state. Keep a copy of the current backup before restoring another snapshot.
- No remote copy or cross-device recovery exists because cloud synchronization is not in scope.
