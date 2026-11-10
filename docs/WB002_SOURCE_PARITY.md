# Focused Source-to-Block Review: wb-002 HTML Reference Guide

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/html-reference.html` (1,334 lines; searchable multi-section reference with demo tabs and copy controls).  
**Canonical destinations:** `html.document-structure` (EN/RU v9, 55 aligned blocks) and `html.forms-accessibility` (EN/RU v3, 39 aligned blocks).

## Scope and decision

This pass corrects technical and accessibility claims in the legacy HTML reference while preserving its search, preview tabs, copy controls and route. The structured lessons cover document semantics and accessible form behavior, but the classic reference layout and interactive demos are not recreated one-for-one. `wb-002` remains **Blocked** for cutover.

## Source-to-block crosswalk

| Legacy section | Structured evidence | Review result and remaining difference |
|---|---|---|
| Document shell, doctype, metadata and language | `minimal-document`, `document-details-list`, `head-body-warning` | The doctype is described as triggering standards mode; the document language, charset and viewport have dedicated examples. Legacy shell diagram and code/preview tabs remain unique interactions. |
| Headings and text markup | `html-heading-hierarchy-heading`, `html-heading-hierarchy-body`, `html-heading-hierarchy-walkthrough`, `html-text-markup-walkthrough` | Heading level follows information hierarchy, not visual size; one clear page-level `h1` is a convention, not an SEO rule. The legacy single-h1 claim was corrected. |
| Links and global attributes | `html-links-metadata-body`, `html-links-metadata-walkthrough`, `html-global-attributes` | The source distinguishes opener isolation from referrer suppression; `noreferrer` is not presented as mandatory in every new-tab link. |
| Images and alternative text | `html-media-body`, `html-media-walkthrough`, `html-media-practice` | Alt text is tailored to informative/function/decorative use. Empty `alt=""` is appropriate for decoration; SEO is not described as a guaranteed outcome. |
| Tables and header relationships | `html-data-tables-body`, `html-data-table-walkthrough`, `html-data-table-check`, `html-data-table-practice` | The structured lesson includes captions, scoped headers and row-heading concepts. The legacy markup demo/preview tabs are not equivalent to the structured reader. |
| Forms and input types | `form-contract-body`, `basic-form`, `action-method`, `labels-body`, `placeholder-warning`, `input-types-list`, `native-validation-body` | GET is described as a safe/read-only request pattern that encodes values into the URL; POST sends values in the request body but does not itself guarantee secrecy. Placeholder is supplemental, never a label replacement. |
| Semantic regions and landmarks | `semantic-layout-explanation`, `semantic-elements`, `semantic-example-analysis` | The source no longer promises a search-ranking boost from semantic tags alone. The main landmark is described as unique when non-hidden, excluding repeated site regions. |
| Embedded content and security | `html-iframe-security-body`, `html-iframe-security-walkthrough`, `html-iframe-security-check`, `html-iframe-security-practice` | The source's iframe example now starts with an empty `sandbox`; explanatory text advises least privilege and warns against casually combining `allow-scripts` with `allow-same-origin` for untrusted same-origin content. |

## Corrections applied

- **Doctype:** the doctype belongs before the root element and normally appears first after any optional comments; its purpose is standards mode, not “HTML5 mode” as a content-version switch.
- **Headings:** h1–h6 express hierarchy; CSS controls appearance. One meaningful h1 is a sound default, not an SEO requirement.
- **Links:** `target="_blank"` currently gives opener isolation implicitly in modern browsers; explicit `noopener` is still clear. `noreferrer` additionally suppresses the Referer header and should be chosen intentionally. Reference: [MDN rel=noopener](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener).
- **Alt:** informative images need a text alternative for their purpose/context; empty alt is appropriate for decoration. See [W3C WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/).
- **Form methods:** GET should be used for requests with no side effects and appends submitted values to the URL; POST places them in the request body, but neither method substitutes for HTTPS, validation or authorization. See [MDN form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form) and [MDN POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST).
- **Semantic landmarks:** semantic markup helps communicate document structure, but by itself it does not guarantee ranking changes. A non-hidden `main` landmark should be unique per document. See [MDN main](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main).
- **Iframe sandbox:** start with the smallest permission set; avoid blindly allowing both scripts and same-origin access on untrusted same-origin content. See [MDN iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe).
- **Standards, SEO and input constraints:** the overview calls HTML a maintained Living Standard instead of saying HTML5 is the latest standard. Search-related wording no longer promises a ranking boost from semantic markup alone. The input reference clarifies that `email` checks syntax rather than mailbox existence, `url` does not verify its destination or trustworthiness, `accept` is a picker hint rather than a security boundary, reset restores initial values, hidden input values are user-controlled, and telephone keypad behavior varies by device.
- **Native form and ARIA semantics:** `required` participates in native constraint validation only when enabled; server validation remains necessary. `disabled` controls are omitted from submission, whereas named `readonly` values are submitted. ARIA is described in terms of accessibility APIs, and the legacy `role` row warns that an ARIA role alone does not implement native keyboard/activation behavior. The canonical EN/RU `html.document-structure` lesson is now v9 with a scored `html-role-keyboard-check` that tests this distinction and retains the warning about positive `tabindex` values disrupting natural keyboard order. The reference also avoids universal claims that every webpage needs client-side JavaScript or a form. Regression tests protect these distinctions.

## Interaction inventory preserved

The legacy page retains a searchable sidebar, code and preview tabs, semantic section accordions, copy buttons, form/input examples and a quick-reference index. `src/content/legacyHtmlReference.test.ts` protects the true section IDs and important controls as well as the corrected wording; it does not certify that the legacy controls are keyboard/screen-reader equivalent to the structured reader.

## Remaining release gates

- Keep `/lessons/wb-002` and `public/lessons/html-reference.html` until the route’s section coverage, interaction disposition and learner-state handling are reviewed.
- Do not transfer progress, notes, bookmarks or old quiz IDs just because the target structured lessons exist.
- Run real-browser keyboard, zoom/reflow, screen-reader, form-label, link, iframe and preview/copy interaction tests before any route cutover. CI can validate text and source inventories but cannot establish browser/device accessibility.
