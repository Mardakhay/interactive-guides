# Focused Source-to-Block Review: js-002 Objects, Prototypes and Classes

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/js-deep-dive.html` (interactive object, prototype and class guide).  
**Canonical destination:** `js.object-prototypes` (EN/RU v3, 42 aligned blocks), with related reference/memory concepts in `js.runtime-memory`.

## Scope and decision

This pass corrects JavaScript object-model terminology where memorable shorthand became a false rule. The original diagrams, code playgrounds, quiz widgets and practice fields remain in the classic source. The structured lesson covers prototype delegation, descriptors, safe dictionaries, class semantics, method chaining and `this` binding, but does not reproduce all live visuals or practice controls. `js-002` remains **Blocked** for route cutover.

## Source-to-block crosswalk

| Legacy section / concept | Structured evidence | Review result and remaining difference |
|---|---|---|
| Object references, mutation and shallow copies | `object-model-paragraph`, `prototype-shadowing-text`, `prototype-shadowing-walkthrough` | Assignment copies the reference value rather than cloning the object; JavaScript remains pass-by-value. A spread copy is explicitly shallow and shares nested references. |
| Own properties and inherited lookup | `object-model-walkthrough`, `prototype-descriptors-text`, `object-model-check` | The source uses `Object.hasOwn` to avoid relying on an instance's potentially shadowed or absent `hasOwnProperty` method. |
| `[[Prototype]]`, `__proto__`, and `.prototype` | `object-model-intro`, `object-model-paragraph`, `object-model-callout`, `object-model-new-text` | The source distinguishes a constructable function's `.prototype` from `Function.prototype` and the instance's `[[Prototype]]`. Arrow functions are non-constructable. |
| `new` algorithm | `object-model-new-text`, `object-model-walkthrough` | The helper is now explicitly an educational sketch; it uses a prototype fallback and recognizes functions as object-like constructor return values. Native class construction has additional rules. |
| Prototype methods and memory | `object-model-paragraph`, `classes-model`, `classes-limits` | Shared prototype methods are described for the shown design; the source no longer frames every per-instance method as universally wasteful or memory savings as the only design criterion. |
| Class syntax, inheritance, static members and private fields | `classes-model`, `classes-walkthrough`, `classes-limits`, `classes-check` | The source explains that classes use prototype delegation but add strict mode, new-only construction, private elements, `super` behavior and non-enumerable prototype methods. “Identical syntax sugar” claims and feedback were corrected. |
| `instanceof`, `super`, and static inheritance | `classes-model`, `classes-limits`, `object-model-new-text` | The default prototype-chain explanation now notes that `Symbol.hasInstance` can customize `instanceof`; the interactive example remains for the default case. |

## Corrections applied

- **Pass-by-value:** JavaScript copies values. When the copied value is an object reference, both variables can refer to the same object; reassigning one variable does not change the other variable's binding.
- **Shallow freeze/copy:** `Object.freeze()` restricts top-level own properties but does not recursively freeze nested objects. Spread and `Object.assign` make shallow copies of own enumerable properties, not arbitrary deep clones.
- **Prototype concepts:** the `.prototype` property on a constructable function/class is not `Function.prototype` and is not itself the instance's `[[Prototype]]`; it is normally the object linked from new instances. Arrow functions are not constructable.
- **Constructor simulation:** the legacy `simulateNew` snippet now uses the prototype fallback and recognizes functions as object-like return values. Its text explicitly warns that it does not invoke class constructors or reproduce the entire native construction algorithm.
- **Class semantics:** the source now lists meaningful differences from ordinary constructor functions instead of claiming classes are identical except for syntax.
- **Own-property access:** the teaching example uses `Object.hasOwn` instead of calling the instance's `hasOwnProperty` method directly.
- **Instanceof:** the default prototype-chain model remains, but the source mentions that `Symbol.hasInstance` can customize the default test.

## Interaction inventory preserved

The source still contains five main sections, object/prototype/class playgrounds, 36 quiz-option elements and editable practice fields with hint/solution controls. `src/content/legacyJsDeepDive.test.ts` protects these inventories and the corrected claims; it is not a substitute for real-browser interaction testing.

## Remaining release gates

- Keep `/lessons/js-002` and `public/lessons/js-deep-dive.html` until the route's interaction decisions and learner-state handling are signed off.
- Do not migrate progress, notes, bookmarks or quiz results from `js-002` to structured lesson/block keys based only on candidate mapping.
- Validate prototype/class playground execution, keyboard use, quiz feedback, editable practice and responsive behavior in real browsers before any cutover.
