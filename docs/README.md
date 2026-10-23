# Interactive Guides — Project Documentation

Interactive Guides is evolving from a catalog of standalone HTML reference pages into a bilingual, curriculum-driven learning application. Structured lessons are embedded in the app; legacy HTML remains as source material during migration.

Read these documents in order:

1. [Current-state audit](./CURRENT_STATE.md) — implementation status and verified constraints.
2. [Curriculum and lesson model](./CURRICULUM_AND_CONTENT.md) — canonical 24-week sequence and content expectations.
3. [Full source content audit](./FULL_SOURCE_CONTENT_AUDIT.md) — Notion/HTML inventory, source-to-lesson mapping, coverage depth and open gaps.
4. [Structured content audit](./CONTENT_AUDIT.md) — registered lesson catalog and schema guarantees versus editorial limits.
5. [Legacy HTML inventory](./LEGACY_CONTENT_INVENTORY.md) — all original HTML source files and migration notes.
6. [Week 14–15 source parity review](./CONTENT_PARITY_REVIEW_WEEK14-15.md) — focused React forms/shared-state review.
7. [Product requirements](./PRODUCT_REQUIREMENTS.md), [architecture](./ARCHITECTURE.md), [persistence](./PERSISTENCE_AND_SUPABASE.md), [PWA/mobile](./PWA_AND_MOBILE.md), and [roadmap](./ROADMAP.md).
8. [Session handoff](./SESSION_HANDOFF.md) — latest verified branch/CI checkpoint and next action.

## Working rules

- Preserve useful existing behavior and course content while migrating it.
- Teach concepts with mechanisms, worked examples, mistakes, edge cases, practice and actionable feedback.
- Keep English and Russian lessons structurally and pedagogically equivalent.
- Keep supplementary topics outside the original bootcamp sequence.
- Do not treat registration, schema validation or CI success as proof of full source parity or editorial approval.
- Preserve legacy sources until source-to-block mapping and translation review are complete.
- Update the audit and handoff at every material implementation/CI checkpoint.
undefined