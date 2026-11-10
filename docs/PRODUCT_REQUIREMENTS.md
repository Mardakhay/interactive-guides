# Product Requirements

## Product goal

Provide a practical, bilingual frontend-development learning environment that a learner can use without creating an account or connecting to a backend.

## Included scope

- English and Russian application UI and lesson content.
- A six-month, 24-week core frontend curriculum and separately labeled supplementary topics.
- Structured lesson reading with explanations, worked examples, code walkthroughs, knowledge checks, coding exercises, and references.
- Curated learning paths, including a multi-stage frontend capstone.
- Local progress tracking, bookmarks, notes, practice drafts, self-review checklists, and quiz activity.
- Search across structured content and curriculum metadata.
- A Practice Center aggregating coding exercises.
- JSON backup and restore for local learning data.
- PWA manifest, icons, service-worker caching, and a learner-controlled update prompt.
- Locale-prefixed routes and redirects from previously used application paths.

## Explicitly out of scope

- User accounts, authentication, authorization, or hosted learner profiles.
- Supabase, a custom API server, cloud persistence, cross-device synchronization, or conflict resolution.
- A separate catalog of standalone HTML lesson files or an iframe-based HTML lesson renderer.
- Automatic migration or fan-out of retired lesson IDs into multiple structured lessons.
- Claims of verified mastery based only on opening a lesson, saving a draft, or self-marking completion.

## Product constraints

- Core and supplementary lesson IDs must remain stable.
- English and Russian lesson records must preserve equivalent block identities and order.
- Supplementary lessons must not be inserted into the original 24-week sequence without an explicit curriculum decision.
- Backup restore is a replacement operation, not a merge.
- Local storage can be unavailable or quota-limited; errors must be visible and existing data must not be silently overwritten.
- Offline availability is best-effort for dynamically loaded lesson content: previously unopened lessons may require a successful online fetch first.

## Acceptance

Automated checks are described in the repository README and GitHub Actions workflow. Real-browser and device checks remain necessary for screen readers, keyboard behavior, responsive layouts, storage restrictions, PWA install/update/offline behavior, and native backup-file interactions.
