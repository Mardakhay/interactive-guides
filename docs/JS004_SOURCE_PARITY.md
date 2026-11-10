# Focused Source-to-Block Review: js-004 Async JavaScript Deep Dive

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/interactive-async-js.html` (2,361 lines).  
**Canonical destinations:** `js.async-fetch` (EN/RU v2, 34 aligned blocks) and `web.internet-http`.

## Scope and decision

This is a focused factual-accuracy pass, not a route-cutover approval. The classic page retains eight major sections, event-loop animations, Promise-method tabs, sequential/parallel timing, live API examples and a multi-part quiz. The structured lessons already cover Promise states, HTTP-vs-network failures, parsing errors, loading/success/error UI states, request cancellation, stale responses and concurrent request strategies. The exact widget and learner-state behavior remains non-equivalent.

## Source-to-block crosswalk

| Classic section / interaction | Structured destination | Review result and remaining gap |
|---|---|---|
| Synchronous work, async callbacks and Event Loop | `js.async-fetch`: `deep-async-model`, `deep-async-trace`, `deep-async-check` | The legacy wording now distinguishes one-at-a-time ordinary tasks on the main thread from parallel JavaScript execution in Web Workers. Event-loop traces remain illustrative; the original animated stepper is not recreated. |
| Promise static methods and concurrency timing | `js.async-fetch`: `deep-async-strategies` | `Promise.all` is described as aggregating concurrently running operations, not scheduling synchronous JavaScript on multiple CPU threads. Rejection of the aggregate does not cancel the other operations. The original timing animation remains non-equivalent. |
| `Promise.race` and request timeouts | `js.async-fetch`: `deep-async-strategies`, `deep-async-callout` | The classic source now says that settling the race wrapper does not cancel the losing fetch or timer. A timeout that should abort `fetch` needs an `AbortController` signal and cleanup of the timer when the request settles. |
| Live GET, joke and POST demos | `js.async-fetch`, `web.internet-http` | Existing source tests enforce DOM text rendering for untrusted remote response values, status checks before POST success, and safe error rendering. Remote endpoint behavior still depends on service/network availability. |
| Sequential vs concurrent requests, loading/error states | `async-await`, `fetch-failure-matrix`, `loading-error-state`, `request-lifecycle-note` | Dependency ordering and stale-response/cancellation concerns map conceptually; the original animated timing display and in-page practice checker are not identical. |
| Quiz, tab and navigation controls | Multiple structured checks/walkthroughs | The canonical lesson assesses the core concepts but does not reproduce the original 97-control surface or full quiz/progress interaction. |

## Factual corrections applied

- **Main-thread execution vs parallelism:** removed the blanket claim that JavaScript never runs in parallel. Ordinary tasks on a main thread run one at a time, while Web Workers can execute in separate threads. The Event Loop inventory correctly counts six runtime components, and the heap description explicitly treats physical placement as a runtime implementation detail rather than a language contract. Reference: [MDN — Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
- **`Promise.all`:** it waits for all input Promises to fulfill or rejects when one rejects. It does not schedule synchronous CPU code in parallel, and rejecting the aggregate does not cancel the remaining operations. The unqualified “3–10× faster” claim is replaced with dependency- and capacity-aware latency guidance that mentions bounded concurrency.
- **`Promise.race`:** it settles with the first input to settle; the losing operation may continue running. Racing a fetch with a rejecting timer is not cancellation by itself. For a real fetch timeout, pass an `AbortSignal`, abort the controller when the timeout fires, and clear the timer on completion. Reference: [MDN — Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).
- **Regression coverage:** `src/content/legacyAsyncFetchDemos.test.ts` now checks the main-thread/Worker distinction, the Promise-all concurrency caveat, Promise-race cancellation semantics and the existing protections for remote response values.

## Remaining release gates

- Keep the classic route and `public/lessons/interactive-async-js.html` until the source-to-target interaction disposition is reviewed.
- Do not map the classic quiz score/progress or saved state onto structured lesson IDs without explicit per-store rules and failure/recovery tests.
- Run real-browser/keyboard/screen-reader acceptance for the original animated event-loop stepper, Promise tabs, live demos, sequential/parallel timing and quiz.
- The `js-004` cutover row remains **Blocked**; conceptual coverage and passing CI alone do not establish widget or learner-state parity.
