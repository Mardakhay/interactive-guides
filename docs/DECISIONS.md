# Decision Log

## D-001 — Structured lessons are the only active lesson format
**Status:** accepted — 2026-11-10.

The learner-facing catalog uses schema-validated JSON lessons rendered by React. Standalone HTML lesson files and their external iframe renderer are retired. HTML itself remains a subject taught inside structured lessons.

## D-002 — English and Russian are first-class locales
**Status:** accepted.

Every lesson uses one stable ID with separate English and Russian records. Application routes are locale-prefixed, and language switching preserves the current structured lesson when a translation exists.

## D-003 — The 24-week curriculum remains the core sequence
**Status:** accepted.

The six-month, 24-week syllabus defines the core course. Supplementary topics remain outside the original week sequence and are labeled as additional tracks.

## D-004 — Local-first is the intended persistence model
**Status:** accepted — 2026-11-10.

Progress, bookmarks, notes, practice activity, and structured lesson state remain in browser storage. Users can export and restore a JSON backup. Restore is replacement, not synchronization or merge.

## D-005 — No backend or cloud synchronization
**Status:** accepted — 2026-11-10.

Do not add Supabase, accounts, authentication, server-side learner storage, cloud sync, or conflict-resolution infrastructure without a new explicit product decision.

## D-006 — Preserve old local records without inventing migrations
**Status:** accepted.

Records keyed to retired classic lesson IDs are not silently fanned out, reinterpreted, or deleted. Unsupported entries are hidden from active lesson surfaces; the current product does not perform a classic-to-structured identity migration.

## D-007 — Completion, practice activity, and mastery are different signals
**Status:** accepted.

Opening a lesson, self-marking it complete, answering a knowledge check, saving a coding draft, and independently mastering a topic are separate facts. The UI must not label self-attested activity as verified mastery.
