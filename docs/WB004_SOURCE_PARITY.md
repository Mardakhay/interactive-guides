# Focused Source-to-Block Review: wb-004 DOM Masterclass

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/dom-masterclass.html` (2,919 lines; interactive tree, selectors, content, events and observer demos).  
**Canonical destination:** `js.dom-events` (EN/RU v7, 71 aligned blocks).

## Scope and decision

This pass corrects DOM safety and performance wording in the classic source and adds source regression coverage. It preserves the classic lesson's interactive controls. It does not certify route cutover: the structured lesson's explanation of static and live collections, safe text insertion, event propagation, throttling and observer lifecycles does not recreate the source's live tree, theme switcher, XSS comparison widget, editors, or every quiz/progress interaction. `wb-004` remains **Blocked**.

## Source-to-block crosswalk

| Legacy area | Structured evidence | Review result and remaining difference |
|---|---|---|
| DOM tree, nodes vs elements and selector APIs | `dom-model`, `dom-node-explanation`, `dom-node-walkthrough`, `dom-select-body`, `dom-select-example` | Static `NodeList` vs live `HTMLCollection` is explicitly demonstrated in a bilingual walkthrough; the interactive tree navigator and selector editor remain non-equivalent. |
| `textContent`, `innerText`, `innerHTML` and XSS | `dom-content-body`, `dom-content-walkthrough`, `textcontent-callout` | The structured lesson notes script elements inserted via `innerHTML` generally do not run solely from insertion, while event-handler attributes can still execute. The source warning is updated to match. The legacy side-by-side XSS demo is intentionally preserved as a local learning widget. |
| Attributes, properties and current form value | `dom-attributes-explanation`, `dom-attributes-walkthrough`, `dom-attributes-check` | Distinguishes initial HTML attributes from mutable DOM properties and current user-editable value. Source editor is not a one-to-one structured renderer. |
| Inline style, `classList`, source-of-truth state and CSS | `dom-state-render-body`, `dom-state-render-walkthrough`, `dom-state-render-check` | Removes an unsupported universal GPU/performance claim; CSS classes are a state/style organization choice, and performance depends on actual changed properties and browser work. The legacy theme switcher remains unique behavior. |
| `DocumentFragment` and dynamic node creation | `dom-fragment-walkthrough`, `create-node-example`, `dom-practice` | Replaces “one DOM touch — fast” with a precise batching description. Fragment behavior does not guarantee a fixed reflow count or speedup; profile if needed. Live Todo and Card Manager editors remain non-equivalent. |
| Event listeners, propagation and delegation | `events-body`, `dom-event-phases-walkthrough`, `deep-dom-model`, `deep-dom-trace` | The passive example now illustrates a wheel handler that does not cancel the default action. The page distinguishes default cancellation from propagation and notes stopPropagation does not cancel the browser's default action. Live propagation/delegation diagrams remain unique interactions. |
| Mutation/Intersection/Resize observers, visibility, debounce/throttle | `dom-resize-observer-walkthrough`, `dom-page-visibility-walkthrough`, `dom-rate-control`, `dom-throttle-walkthrough` | Structured examples include cleanup, lifecycle handling and “measure first” performance caveats. Legacy visualizers and exercise editors still require manual review. |

## Corrections applied

- **Plain text rendering:** `textContent` is described as appropriate for inserting untrusted values into an ordinary text context, not as universal protection for all URL, attribute, script or style contexts.
- **XSS details:** the source no longer suggests that `<script>` nodes inserted via `innerHTML` execute by that insertion alone. Event-handler attributes such as `onerror` can still execute; untrusted HTML requires a reviewed sanitization policy. See [MDN innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) and [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).
- **Performance claims:** `classList` is no longer described as inherently GPU-accelerated, and `DocumentFragment` no longer promises “one DOM touch” or a fixed speedup. See [MDN classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) and [MDN DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment).
- **Passive listeners:** the example is now a passive wheel listener that never calls `preventDefault`. Passive mode is not a general performance switch; it means the listener will not cancel the event's default behavior. See [MDN addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
- **Propagation:** `preventDefault()` cancels a cancellable default action; `stopPropagation()` controls propagation to other nodes. They are not interchangeable. See [MDN preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault).

## Interaction inventory preserved

The page still includes the live DOM tree, selector/traversal editors, content/XSS demo, theme switcher, fragment exercise, Todo builder, event propagation/delegation demos, observer examples and the original 25 quiz-option buttons. `src/content/legacyDomMasterclass.test.ts` guards the critical section/control inventory and the corrected claims; it does not certify manual interaction parity.

## Remaining release gates

- Keep `/lessons/wb-004` and `public/lessons/dom-masterclass.html` intact until per-route interaction and learner-state disposition is approved.
- Preserve classic progress, notes, bookmarks and quiz-result identity; no state migration follows from this content review.
- Run real-browser, keyboard/screen-reader and responsive checks for the editor controls, XSS demo, tree navigator, tabs/demos and quiz. CI cannot establish those properties.
