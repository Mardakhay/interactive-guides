# Structured Content Audit

**Updated:** 2026-11-10  
**Scope:** active bilingual JSON curriculum only

## Inventory

- 27 core lesson IDs across the canonical 24-week curriculum.
- 17 supplementary lesson IDs kept outside the core sequence.
- 44 stable lesson IDs with an English and a Russian JSON record each.
- 119 coding exercises indexed by the Practice Center.
- Learning paths use structured lesson IDs only.

The authoritative records are in \`src/content/lessons\`, \`src/content/lessonManifest.ts\`, and \`src/content/curriculum\`.

## Automated guarantees

The schema and test suite verify required lesson fields, unique block IDs, locale/block parity, curriculum placement, valid walkthrough line ranges, knowledge-check answer shape, exercise contracts, and references. Build-time index generation validates the structured registry and creates bounded search and practice indexes.

## Editorial boundary

Automated schema validation does not establish factual correctness, completeness, pedagogical depth, or translation quality. Review the English and Russian lesson together before changing a lesson's status. Do not equate a green CI run with editorial approval.

HTML document structure and accessible forms remain in the structured curriculum. The former standalone HTML lesson catalog and its source-parity inventories were retired and are no longer part of this audit.
