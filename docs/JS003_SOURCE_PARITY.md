# Focused Source-to-Block Review: js-003 JavaScript Memory Mastery

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/js-memory-mastery.html` (2,737 lines).  
**Canonical destination:** `js.runtime-memory` (EN/RU v5, 35 aligned blocks).

## Scope and decision

The source is a visual, interaction-heavy tutorial about values and identity, stack/heap diagrams, call-stack behavior, closures, garbage collection, V8 implementation details, and memory diagnostics. This pass corrects claims that present one engine’s internal representation as a JavaScript guarantee. It preserves the classic route and simulations; it does not authorize route cutover because those interactions and the learner-state contracts are not one-to-one with the structured lesson.

## Source-to-block crosswalk

| Classic section / interaction | Structured evidence | Review result and remaining gap |
|---|---|---|
| Stack/heap, value identity and references | `runtime-memory`, `runtime-memory-text`, `runtime-model`, `runtime-engine-callout` | Structured content explicitly calls stack/heap diagrams mental models and avoids promising primitive storage locations or numeric object addresses. Legacy address animations remain illustrative. |
| Call stack, execution context and recursion overflow | `runtime-context`, `runtime-trace`, `runtime-overflow`, `runtime-overflow-text` | Nested call order and recursion are covered. Exact frame layout and overflow thresholds are implementation-specific; the old fixed browser frame estimate was removed. |
| Primitive and object copy/mutation behavior | `runtime-copy-model`, `runtime-copy-walkthrough`, `runtime-copy-check`, `runtime-copy-practice` | Value-copy versus object identity and shallow/deep-copy differences map. The legacy text now notes JSON serialization lossiness and the supported-value limits of `structuredClone()`. |
| `const`, string interning and object identity | Runtime model and engine caveat; JS identity examples | Binding immutability and object identity remain central. Claims about a mandatory string pool, physical addresses or fixed memory slots were narrowed to engine-specific implementation details. |
| Garbage collection, reachability and memory leaks | `runtime-memory-text`, `runtime-leaks`, `runtime-practice` | Structured lesson teaches that collection is nondeterministic, that a high memory reading alone does not prove a leak, and that retaining paths should be measured. The legacy GC controls are a visual simulation, not a real force-GC API. |
| Closures and retained objects | `runtime-closure-example`, `runtime-leaks` | Core closure access survives the outer call when bindings remain needed; a closure does not automatically retain every outer local. A leak depends on unintended reachable retention over time. |
| V8 object shapes, inline caches and heap limits | `runtime-engine-callout`, `runtime-memory-tools`, `runtime-references` | Engine-specific hidden-class and inline-cache behavior is qualified, and the legacy source no longer presents stale fixed stack/heap capacities or a universal optimization failure mode. Structured content points to runtime docs and DevTools profiling. |
| Memory diagnostics | `runtime-memory-tools`, `runtime-practice` | Heap snapshots, retaining paths and allocation profiling are mapped. The legacy simulator does not replace browser/Node DevTools evidence. |

## Factual corrections applied

- **Stack and heap:** JavaScript does not specify that every primitive is physically stored on a stack, that every object is held at a visible numeric heap address, or that all values have a source-level fixed byte size. The comparison table is explicitly conceptual.
- **Call-stack depth and memory limits:** removed fixed estimates such as 10,000–15,000 frames, 1–8 MB stacks and a universal 1.5 GB heap. Runtime limits vary by engine, host, architecture, resources and configuration.
- **Garbage collection:** mark-and-sweep is described as a simplified mental model. The simulator does not invoke a real collector; unreachable values become eligible for collection, and the timing of collection / returning memory to the OS is not guaranteed.
- **Memory leaks:** detached DOM elements and event-listener cycles do not automatically prove a leak; there must be a reachable retaining path. Long-lived closures can retain values they actually reference, and memory growth should be investigated with snapshots and allocation timelines.
- **V8 optimization:** object-shape metadata and inline caches are implementation details, not a portable contract that every same-shaped object shares a specific fixed offset or that megamorphic operations always fall back to a fixed slow path. Profile before optimizing.
- **Copying and strings:** `structuredClone()` has supported-type limits, and JSON serialization is lossy for unsupported values and fails on cycles. String interning may happen as an optimization but is not a language guarantee. `new String()` creates a wrapper object and should not be used as a string-storage optimization.
- **`const` and closures:** `const` prevents binding reassignment but does not freeze objects; primitive immutability comes from the value type. Closures preserve access to the lexical bindings they need, not necessarily every variable from the outer function.

## Interaction inventory preserved

The legacy source still includes stack/heap push-pop demos, object/reference and copy demos, a call-stack walkthrough, a recursion-overflow animation, const and string demos, GC/reachability tabs, V8 visualization, and the eight-question quiz UI. The new source regression suite checks key controls and factual statements; it does not claim interaction parity with the structured renderer.

## Remaining release gates

- Keep `/lessons/js-003` and `public/lessons/js-memory-mastery.html` available until the per-row route and interaction disposition is explicitly reviewed.
- Do not migrate or duplicate classic progress, bookmarks, notes or quiz results into `js.runtime-memory` without approved per-store identity rules.
- Run browser/keyboard/screen-reader acceptance for the original visualizations and quiz; inspect actual heap snapshots on a supported runtime for the documented diagnostic workflow. CI cannot supply these native acceptance results.
