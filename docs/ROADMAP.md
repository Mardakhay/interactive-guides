# Roadmap

**Updated:** 2026-11-10  
**Product scope:** bilingual structured lessons with local-first learner state

## Implemented foundation

- React/TypeScript/Vite application with locale-prefixed routing and reusable UI.
- 24-week core curriculum and separately labeled supplementary tracks.
- Structured EN/RU lesson repository with typed blocks and schema validation.
- Lesson reader, search, learning paths, capstone, Practice Center, dashboard, bookmarks, notes, and settings.
- Browser-local progress and structured learning state with JSON backup/restore.
- PWA manifest, icons, service-worker caching, and controlled update prompt.
- CI for lint, typecheck, tests, production build, and preview smoke checks.
- Legacy app URLs redirect to the active structured curriculum; standalone HTML lesson files and renderer are removed.

## Next quality gates

1. **Human content review:** fact-check lesson explanations, runnable examples, references, and feedback in both locales; only then update editorial status.
2. **Accessibility acceptance:** test keyboard flow, focus management, dialogs, navigation, code exercises, and screen-reader announcements in real browsers.
3. **Responsive/device acceptance:** verify the reader, simulations, Practice Center, settings, and backup workflow at common mobile and desktop sizes.
4. **PWA acceptance:** install on supported browsers/devices, test update prompts, offline behavior after caching, and recovery after a service-worker update.
5. **Storage acceptance:** test denied storage, quota exhaustion, corrupted records, failed restore writes, rollback warnings, and backup file download/upload.

## Explicitly not planned

Supabase, a hosted backend, user accounts, authentication, cloud storage, cross-device sync, and automatic migration of retired lesson IDs are outside the approved product scope. Revisit only after a new explicit product decision.
