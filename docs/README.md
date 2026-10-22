# Interactive Guides — Project Documentation

Interactive Guides is evolving from a catalog of standalone HTML reference pages into a bilingual, curriculum-driven learning application.

This folder is the handoff point for future work. Read documents in this order:

1. [Current-state audit](./CURRENT_STATE.md) — what exists in the repository today and the verified technical constraints.
2. [Product requirements](./PRODUCT_REQUIREMENTS.md) — target users, educational outcomes, experience, and acceptance criteria.
3. [Architecture](./ARCHITECTURE.md) — proposed application/content architecture and important boundaries.
4. [Curriculum and lesson model](./CURRICULUM_AND_CONTENT.md) — syllabus mapping, lesson structure, bilingual content, and quality standards.
5. [Content audit](./CONTENT_AUDIT.md) — structural checks, limitations, and remaining editorial validation.
6. [Persistence and Supabase](./PERSISTENCE_AND_SUPABASE.md) — local-first storage, account model, data schema, synchronization, and security.
7. [PWA and mobile](./PWA_AND_MOBILE.md) — installability, offline behavior, caching, and responsive UX.
8. [Roadmap](./ROADMAP.md) — incremental delivery plan with acceptance criteria and commit messages.
9. [Decision log](./DECISIONS.md) — important decisions and the rationale behind them.
10. [Session handoff](./SESSION_HANDOFF.md) — latest verified checkpoint, open questions, and exact next action.

## Working rules

- Inspect the current implementation before replacing it. Preserve useful behavior and content unless the migration explicitly supersedes it.
- Do not treat a lesson as mastered merely because it was opened or marked complete. Knowledge checks and coding practice need independent outcomes.
- Course content must be technically accurate, deep but understandable, and available in both English and Russian.
- Keep the UI cohesive, accessible, responsive, and installable as a PWA.
- Keep local/offline learning viable. Accounts and cloud synchronization enhance the experience rather than becoming a prerequisite for reading public lessons.
- Use small, reversible changes, validate them with CI-quality checks, and write focused commit messages.
- This document set is the working plan, not a claim that planned features have already been implemented.
