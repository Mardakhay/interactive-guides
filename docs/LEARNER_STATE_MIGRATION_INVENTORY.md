# Learner-State Migration Inventory

**Audit date:** 2026-10-29  
**Repository:** [Mardakhay/interactive-guides](https://github.com/Mardakhay/interactive-guides)  
**Working branch:** `feat/learning-platform-foundation`  
**Status:** inventory and invariants only — **no lesson-ID migration, route redirect, source deletion, or cloud sync is authorized by this document**

## Purpose

The classic catalog IDs (for example, `tl-001`) and structured lesson IDs (for example, `git.fundamentals`) belong to different identity namespaces. A candidate mapping in `LEGACY_ROUTE_CUTOVER_MATRIX.md` is content-routing evidence, not a safe per-record migration rule. This inventory describes the persisted state observed in source code so that a future migration can be designed around real data shapes rather than guessing.

## Current local persistence inventory

The shared preference constants live in `src/lib/constants.ts`. The reusable versioned JSON envelope is implemented in `src/lib/versionedStorage.ts`; the structured reader has its own versioned format in `src/features/structured-lesson/persistence.ts` and `src/features/structured-lesson/schemas.ts`.

| Storage key / format | Current shape and identity key | Observed persistence behavior | Cutover risk / required decision |
|---|---|---|---|
| `ig:progress` | `ProgressState.lessons[lessonId]` stores status, `startedAt`, `completedAt`; also stores `lastOpenedLessonId` and `lastOpenedAt`. | `src/features/progress/store.ts`; Zod validation in `src/features/progress/schemas.ts`; wrapped in the generic local-store envelope. | Identity is the lesson ID. A classic ID cannot be silently replaced by one structured ID, and completing a broad source must not mark every child lesson complete. Decide whether legacy records remain viewable, are mapped one-to-one, or are explicitly archived. |
| `ig:bookmarks` | `BookmarksState.lessons[lessonId]` with `createdAt`. | `src/features/bookmarks/store.ts` and `schemas.ts`; generic versioned envelope. | A bookmark represents the learner's saved reference. For a one-to-many content mapping, do not clone it to every destination by default. Preserve the source record or ask the learner to choose destinations under a documented policy. |
| `ig:notes` | `NotesState.lessons[lessonId]` with full `content` and `updatedAt`. Blank text deletes the note for that key. | `src/features/notes/store.ts` and `schemas.ts`; generic versioned envelope. | Notes may contain personal explanations and refer to a particular source's examples. Do not copy one note into unrelated destination notes or discard it because a route changes. Keep the original lesson identity unless an explicit, reviewed mapping exists. |
| `ig:quiz-results` | `QuizResultsState.quizzes[quizId]` stores one current `QuizAttempt`: `answers` (question ID to numeric option index), `score`, `total`, `completedAt`. Retry overwrites the prior attempt. | `src/features/quizzes/store.ts` and `schemas.ts`; generic versioned envelope. Quiz definitions have their own `id` and `lessonId` in `src/features/quizzes/types.ts`. | Quiz ID is not necessarily the lesson ID. Question IDs, answer ordering, scoring rules, and lesson relationships must be checked before a result can be mapped. Do not transfer a score where question/answer equivalence is not established. Preserve an original result as read-only history when it cannot be safely re-scored. |
| `interactive-guides:structured-learning:v2` | A `schemaVersion: 2` record contains `quizAttempts`, `codeDrafts`, `practiceChecklists`, and `sectionProgress`. Quiz/draft/checklist composite keys are `lessonId::blockId`; section progress is keyed by `lessonId` and stores completed block IDs. | `src/features/structured-lesson/store.ts`, `schemas.ts`, and `persistence.ts`. Structured quiz attempts keep up to 100 attempts per block. | Both the lesson ID and the block ID are identity-bearing keys. Renaming an ID can orphan saved drafts/checklists/attempts; a one-to-many mapping can contaminate several unrelated exercises. Preserve stable destination IDs or implement a typed, versioned mapping with collision rules. |
| `interactive-guides:structured-learning:v1` | Historical raw structured-learning state, without the v2 storage envelope. | `readStructuredLearningState` writes the v2 copy first, then removes v1 only after the write succeeds. Invalid source data is left intact. | This is an existing **format migration within the structured-learning store**, not proof that classic IDs can migrate to structured IDs. Keep these two migration problems separate. |
| `interactive-guides-local-store` envelope | `format`, `schemaVersion: 1`, and `data`, stored under the classic progress/bookmark/note/quiz keys. | `readVersionedJSON` can replace valid legacy raw JSON with a validated envelope at the same key. If the write fails, the original raw record remains. Unknown envelope versions and invalid data are not overwritten on read. | The generic envelope migration changes serialization format, not record identity or content semantics. It must not be expanded into an implicit lesson-ID remapping. |
| `ig:last-lesson` | Defined in `STORAGE_KEYS`; a separate `lastOpenedLessonId` also exists in `ig:progress`. | Active reads/writes for the standalone key have not been proven in this focused pass. | Before removing or repurposing it, run a full-branch usage search and test both the standalone key and the progress field. Do not assume it is unused or authoritative based on its name alone. |
| `ig:theme` | User-interface preference constant. | Not a lesson-state record in the stores inspected here. | Keep preference migration separate from learner progress/content migration. |

## Identity and routing constraints

- Classic catalog entries resolve through `src/features/lesson-renderer/lessonLoader.ts` and can use the original `/lessons/:lessonId` path and bundled HTML source. Structured lessons are separately loaded by canonical structured IDs and locale. Those namespaces must not be treated as interchangeable aliases.
- The candidate mapping in `LEGACY_ROUTE_CUTOVER_MATRIX.md` is often one-to-many. It documents which structured lessons cover source topics; it does not authorize copying an existing state record into every destination.
- Block IDs matter inside the structured reader. A saved entry such as `git.workflow-ci::conflict-resolution-check` is a distinct identity from the classic quiz ID or classic lesson ID.
- The current structured store stores self-attested section completion separately from final lesson progress; do not infer mastery or mark a lesson complete simply because a saved draft or quiz attempt exists.

## Non-negotiable migration invariants

1. **No data loss on uncertainty.** If a source record cannot be mapped confidently, keep it attached to its original identity and provide a documented legacy/read-only path. Never silently delete it.
2. **No default fan-out.** One classic progress, bookmark, note, or quiz result must not be duplicated across multiple structured destinations without an explicit product decision and a test for that record type.
3. **Progress is not mastery.** Opening/reading a source or restoring a route pointer must not mark all related lessons complete.
4. **Quiz scores need semantic equivalence.** A mapping must account for question identities, correct answers, option order, scoring rule and pass threshold. If those facts are not demonstrably equivalent, keep the old attempt as historical evidence rather than carrying its score over.
5. **Write before delete.** For any approved multi-key migration, write the destination copy first, verify it, and retain the source until validation and backup are complete. A failed write must never be followed by source deletion.
6. **Idempotency.** Re-running a migration must not duplicate notes/bookmarks/attempts or alter timestamps unnecessarily. Record the migration version and per-record disposition.
7. **Recovery is tested.** Include fixtures for missing, malformed and unknown-version records, write/quota failure, an interrupted migration, duplicate candidates, unmapped records and rollback/restore.
8. **Account boundaries precede cloud sync.** These stores are local-storage contracts. Any future backend sync must separately define authenticated ownership, conflict resolution, deletion and cross-user isolation; it cannot be inferred from this client-side inventory.

## Required acceptance tests before route cutover

- Seed synthetic records for each local store using both classic IDs and structured IDs; verify that each record remains under the intended identity after migration.
- Test one-to-one, one-to-many, many-to-one, no-match and ambiguous-match mappings independently for progress, bookmarks, notes, classic quiz results and structured exercise state.
- Verify that a classic lesson's completion does not complete all structured children, and that no unrelated note or quiz score is cloned.
- Force a write failure at every destination-write point and prove the source record remains intact; then rerun and prove recovery is idempotent.
- Confirm bookmarks, notes, code drafts, checklists, quiz history and the last-opened route render correctly in both locales after any approved mapping.
- Only after these tests pass should a migration plan specify a redirect/retention disposition for each legacy catalog ID.

## Current decision

**Keep all 25 legacy rows blocked.** This document establishes the data inventory and test obligations; it does not approve a cutover, delete a key, redirect a route, remap a record, or enable Supabase.
