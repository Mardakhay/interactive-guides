# Decision Log

## D-001 — Preserve useful parts, replace the content delivery model
**Status:** accepted in planning.  
Existing React routes, reusable UI pieces, bookmarks, notes, progress, quizzes, search, learning paths and CI are useful assets. The independent HTML documents become migration input, not the long-term primary renderer.

## D-002 — Typed lesson blocks instead of full HTML documents
**Status:** proposed, recommended.  
Use schema-validated JSON/TypeScript content rendered through React components. This gives consistent design, localization, link validation, accessible blocks, progress events and testability. It avoids executing arbitrary HTML and repeating shell CSS in every lesson.

## D-003 — English and Russian are first-class locales
**Status:** requested, implementation details proposed.  
Use stable lesson IDs and separate locale content. URL locale is explicit and language switching preserves the current lesson when translated content is available.

## D-004 — Preserve local-first learning
**Status:** recommended.  
The app should be useful without registration; local progress and offline reading are foundational. Supabase should sync learner-owned data, not be a requirement for public course content.

## D-005 — Supabase only after local contracts stabilize
**Status:** recommended.  
Authentication/RLS/sync introduces meaningful security and conflict complexity. First define stable content IDs, local repository contracts, schema migrations and data export/import. Add remote storage through an adapter.

## D-006 — Separate completion, quiz score and mastery
**Status:** recommended.  
Opening/reading, self-marked completion, passing a quiz, and independently solving a coding task are different evidence. The app should not collapse all into one boolean.

## D-007 — Bootcamp sequence remains canonical
**Status:** requested.  
The supplied 24-week ABB syllabus defines the core-track order. Additional topics (engine internals, SQL, auth, deployment, extended architecture and Supabase) are labeled as supplement tracks where they extend beyond the source syllabus.

## D-008 — Local-first is the final product scope; backend is not planned
**Status:** accepted by the project owner — 2026-11-10.  
Interactive Guides will remain a local-first application. Do not implement Supabase, a hosted backend, user accounts, authentication, cloud synchronization, server-side learner storage or cloud conflict resolution as part of this project. Browser-local persistence and the existing JSON backup/restore flow are the intended learner-data model.

## D-009 — Merge the structured platform without cutting over classic lessons
**Status:** accepted by the project owner — 2026-11-10.  
The current release merges the bilingual structured learning platform while retaining every existing classic HTML lesson and its route. The 25-row legacy route cutover, redirect work, source deletion and any cross-ID learner-state migration are explicitly outside this merge and remain a separate follow-up. Do not migrate, fan out, reinterpret or delete existing learner records as part of the merge.
