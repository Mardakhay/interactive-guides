# Curriculum and Content Model

## Core curriculum

The canonical core is a six-month, 24-week frontend-development syllabus. Its topics cover web fundamentals and HTML/CSS, JavaScript and Git, tooling and TypeScript, React, UI systems/testing/accessibility/workflow, and a frontend capstone.

The structured registry currently contains 27 core lesson IDs:

- \`web.internet-http\`, \`html.document-structure\`, \`html.forms-accessibility\`
- \`css.fundamentals\`, \`css.flexbox-grid-responsive\`
- \`js.basics-types-control-flow\`, \`js.functions-arrays-objects\`, \`js.dom-events\`, \`js.async-fetch\`
- \`git.fundamentals\`, \`tooling.node-npm-vite\`, \`typescript.fundamentals\`
- \`react.components-jsx-state\`, \`react.effects-lists-composition\`, \`react.router-spa\`, \`react.forms-validation\`, \`react.context-shared-state\`, \`react.api-custom-hooks\`
- \`ui.design-systems\`, \`ui.bootstrap-mui\`, \`performance.accessibility\`, \`testing.react-testing-library\`, \`git.workflow-ci\`
- \`capstone.requirements-discovery\`, \`capstone.design-architecture-planning\`, \`capstone.implementation\`, \`capstone.review-demo\`

## Supplementary topics

Seventeen additional topics are maintained outside the 24 core weeks:

- \`js.runtime-memory\`, \`js.object-prototypes\`, \`js.iterators-generators\`, \`js.collections-weakmaps\`, \`js.regex-text-processing\`, \`js.typed-arrays-binary\`
- \`frontend.architecture-boundaries\`, \`frontend.auth-security\`
- \`deployment.production-hosting\`, \`data.sql-postgresql\`, \`tooling.advanced-package-workflows\`
- \`network.dns-tcp-tls\`, \`browser.rendering-pipeline\`, \`browser.storage-indexeddb\`, \`browser.realtime-workers\`, \`browser.capability-apis\`
- \`css.sass-scss\`

The registry therefore contains 44 stable lesson IDs. Each ID has separate English and Russian JSON records.

## HTML is still taught

HTML document structure, semantic regions, forms, labels, and accessibility are ordinary structured lessons in the active curriculum. The retired part was the old standalone HTML-file delivery format, not HTML as a subject and not the application's root HTML shell.

## Content locations

- \`src/content/lessons/<lesson-id>/en.json\` and \`ru.json\` — complete lesson records.
- \`src/content/lessonManifest.ts\` — IDs, folder names, translated titles, editorial status.
- \`src/content/repository.ts\` — loading, schema validation, lookup, and search/practice document generation.
- \`src/content/schemas/lessonContent.ts\` — lesson schema.
- \`src/content/curriculum/bootcamp-core.en.json\` and \`bootcamp-core.ru.json\` — localized curriculum metadata.
- \`src/data/learning-paths.json\` — ordered structured learning paths.
- \`src/features/localization/translations.ts\` — application strings and Russian learning-path notes.

## Lesson block contract

Supported block types include headings, paragraphs, lists, callouts, code samples, code walkthroughs, knowledge checks, coding exercises, and references. Block IDs and ordering must remain aligned between locales. The Zod schema is authoritative; do not invent custom block shapes.

Machine validation proves structure, not factual accuracy or editorial quality. Update both locales and the relevant tests for every substantive content change.
