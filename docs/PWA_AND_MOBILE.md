# PWA and Mobile Requirements

## Target

A responsive application that can be installed on supported phones/desktops and provides a clear offline experience. “PWA-ready” is accepted only after installability and offline behavior are tested on real supported browsers/devices.

## Work items

- Add a valid web app manifest with name, short name, description, start URL, standalone display, theme/background colors and purpose-appropriate icons (at minimum required icon sizes; maskable icon recommended).
- Integrate a maintained Vite PWA/service-worker solution after checking current plugin compatibility.
- Keep the service-worker strategy explicit: app shell and published curriculum assets precached; lesson content can be cached on first visit or precached selectively based on size and update strategy.
- Never cache authenticated private API responses indiscriminately.
- Provide offline and update-available UI. Avoid activating a new worker unexpectedly while someone is submitting practice or writing a note.
- Verify navigation fallback for localized deep links.
- Handle failed requests and storage quota exhaustion.
- Document what is and isn't available offline.

## Mobile lesson reading

- Replace fixed sidebars inside lesson content with the single application shell.
- Use a collapsible table of contents/lesson outline.
- Ensure code blocks have horizontal overflow and copy controls without breaking overall page width.
- Touch targets should be comfortably sized (WCAG target-size guidance); sticky controls should respect safe-area insets.
- Avoid multiple independent scroll containers on small viewports.
- Keep reading typography at comfortable zoom/reflow; test at 320–375px viewport widths and 200% zoom.
- Maintain keyboard/focus behavior for external keyboard and assistive technology users.
- Support reduced motion and dark/light contrast.

## Verification

- Lighthouse or browser audit for manifest/installability, accessible labels and performance as a diagnostic, not the sole proof.
- Test cold load online, revisit offline, first visit offline (clearly explain if content was not yet cached), update lifecycle, offline route reload and sign-in/sync failure.
- Validate Android Chrome and iOS Safari behavior; installation capabilities differ by browser and must not be described as identical.

## Historical implementation status check — 2026-10-23 (superseded)

Historical note: during the early 2026-10-23 audit, the PWA files described in earlier handoffs were not present at the reviewed revision. The following implementation sections document the subsequent addition and hardening of those files. **This is a historical snapshot, not the current branch status.**

At that early checkpoint:
- `public/manifest.webmanifest` was absent.
- `public/sw.js` was absent.
- `index.html` did not link a web manifest.
- No service-worker registration path had been verified.
- Install/update/offline UI and real-browser installability results could not be assumed.

The current state is summarized in the final “Current branch implementation and acceptance status” section below. The real-browser/device acceptance gate remains open even though the implementation is present.


## Initial implementation — 2026-10-23

The feature branch includes a web manifest, SVG app icon, manifest/theme/mobile metadata, and a production-only service-worker registration. The worker precaches the app shell, uses network-first navigation with an app-shell fallback for localized/deep links, and runtime-caches successful same-origin GET resources. It skips cross-origin requests, requests with Authorization headers and /api/ endpoints.

This is a first offline foundation, not a claim of verified installability or comprehensive offline behavior. Before release, validate whether platform-recommended PNG icon sizes are required, test install prompts and iOS Add to Home Screen behavior, deep-link reload, cache updates and offline access on real supported browsers. Google Fonts remain external and may not load offline.


## CI checkpoint — 2026-10-23

The initial service-worker implementation failed ESLint due to undeclared worker globals; this was corrected. Runtime caching is now restricted to static asset extensions, avoiding interception of arbitrary same-origin documents/data. GitHub Actions run #39977258811 passed lint, typecheck, tests and production build on feature SHA 9e4e08c57725e595c3f279ce6f431fabb2d49281: https://github.com/Mardakhay/interactive-guides/actions/runs/39977258811

Still required before calling this phase complete: browser/device installability checks, platform icon validation, offline deep-link reload and cache update tests, deployment rewrite configuration, and confirmation that no private learner state is cached.


## Asset and routing hardening — 2026-10-23

The feature branch now includes:

- Platform PNG artwork at `/pwa-180.png` (Apple touch icon), `/pwa-192.png` and `/pwa-512.png` (manifest sizes).
- A 512px icon declared for both ordinary and maskable use; its foreground artwork is inset from the edge for adaptive masks.
- A versioned service-worker cache bump so the shell is refreshed when the icon precache list changes.
- A Netlify-compatible non-forced `/* /index.html 200` rewrite for client-side deep links; existing physical files remain eligible to serve normally.
- `src/pwa/pwaAssets.test.ts` checks manifest fields, PNG headers/dimensions, iOS icon wiring, deep-link rewrite presence and the service worker's same-origin/private-request guardrails.

The automated checks do **not** certify browser installability or offline UX. Still required: test clean install, online deep-link refresh, revisit while offline, an unvisited structured lesson while offline, worker update activation, storage-quota failure and external-font fallback in Android Chrome and iOS Safari. Record browser/OS versions and outcomes before calling the PWA release-ready.


## Authoritative PWA update-lifecycle status — 2026-10-23

The active feature branch now has a versioned `v3` shell/asset cache and a learner-controlled service-worker update flow. The worker no longer calls `skipWaiting()` automatically during install; it accepts `SKIP_WAITING` only after the app's localized update prompt is acknowledged. The prompt reloads the current page only after the new controller takes over and the learner explicitly selected the update action. Foreground visibility triggers a best-effort worker update check. PWA asset tests now protect this message handshake and cache-version contract.

GitHub Actions [run #39982235822](https://github.com/Mardakhay/interactive-guides/actions/runs/39982235822) passed on exact code SHA `5628ca69a6981a6d81357ab1d20e466c3f1d783e`: `npm ci`, ESLint, TypeScript typecheck, Vitest and production build.

**Release acceptance remains open.** Still test a clean install, waiting-worker update while a coding exercise/note is in progress, online reload on localized deep links, revisit offline, not-yet-visited lesson offline expectations, update activation, iOS Add to Home Screen, Android install prompt, font fallback and browser console errors on real supported browser/OS versions. Record results before calling the PWA complete.


## Latest exact-head CI checkpoint — 2026-10-23

GitHub Actions [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passed on feature SHA `64dea28924aed5701452ae60b121cb57fc747598`: dependency install, ESLint, TypeScript typecheck, 102 tests across 22 files, and production build.

The app-shell/PWA implementation described above is present at that ref: PNG icons, web manifest, Netlify-style SPA fallback, same-origin static-asset runtime cache, and a learner-controlled service-worker update prompt. This is only automated validation. No evidence is recorded yet for real Android Chrome/iOS Safari install prompts, offline revisit, localized deep-link reload or update behavior on a device.

The same install step reported **13 dependency audit findings** (8 moderate, 3 high, 2 critical). The build emitted a large-chunk warning and the tests emitted React Router v7 future-flag warnings. These warnings did not fail CI; record triage separately rather than running an unreviewed forced dependency upgrade.


## Documentation snapshot — 2026-10-23 (exact current HEAD)

The implementation/content snapshot reviewed for this documentation sync was `64dea28924aed5701452ae60b121cb57fc747598`, with GitHub Actions [run #40008331627](https://github.com/Mardakhay/interactive-guides/actions/runs/40008331627) passing on that exact SHA. The previous documentation sync `a4d5eadb045f03a5c7cc995b6f150b42e2ca3eb4` also passed exact-head CI [run #40008684548](https://github.com/Mardakhay/interactive-guides/actions/runs/40008684548). This commit records the handoff and does not change release blockers. `main` remains `b13af92576e8a73753a6e3f3d26765d9f9c44397`, and PR #1 remains open as a draft.


## Latest PWA/project checkpoint — 2026-10-26

At the current feature code/content SHA `17b79e07b8377e8aa92c5aa14305da0062389ac5`, Actions [run #40270734689](https://github.com/Mardakhay/interactive-guides/actions/runs/40270734689) passed, including the PWA asset/update contract tests. The implementation includes the manifest, 180/192/512px PNG icons, Netlify SPA rewrite, versioned static-asset-only cache, and learner-approved service-worker update flow. This remains code-level evidence only; no Android Chrome/iOS Safari install, offline, localized deep-link, in-progress exercise update, or update acceptance has been recorded. The exact manual acceptance checklist above remains open.

## Latest project CI checkpoint — 2026-10-26

The latest verified code/content SHA is `deb30c88151ee6f0ea5f59afd14e96f0fb2d5902`; Actions [run #40271279200](https://github.com/Mardakhay/interactive-guides/actions/runs/40271279200) passed including PWA contract tests. No browser/device PWA acceptance was recorded by this content pass; the Android Chrome/iOS Safari install, offline and update checklist above remains open.

## Latest verified app checkpoint — 2026-10-26

The latest feature code/content SHA is `0b08ee4249d1e6ec19bfe16e94de864fe7271ed1`; [Actions run #40271559588](https://github.com/Mardakhay/interactive-guides/actions/runs/40271559588) passed including PWA contract tests. This source/content pass did not run real-device PWA acceptance. Android Chrome/iOS Safari install, offline, deep-link and update checks remain open.

## Icon refresh checkpoint (2026-10-26)

The prior generated dark-indigo icon concept was rejected by the user and is superseded. The sole icon design is the exact blue-and-white SVG supplied by the user: favicon and scalable PWA manifest entry use that SVG byte-for-byte; PNGs at 180px (Apple touch), 192px and 512px are rasterized directly from the same SVG with 4× supersampling and RGBA antialiasing. Theme color is #0284c7 and service-worker shell cache version is v5. Contract tests check exact SVG equality, PNG signatures/dimensions, manifest wiring and cache version. SVG correction 2cedeeae948b0a35e6a983c428cb72b17140895c passed Actions [run #387](https://github.com/Mardakhay/interactive-guides/actions/runs/40276045811). The following rasterization commit de3706c32abefbdd24550133f8db91d241724387 converted the SVG directly to 180/192/512 RGBA PNGs using 4× supersampling and passed [run #389](https://github.com/Mardakhay/interactive-guides/actions/runs/40276645065) on that exact SHA. This verifies code only; Android Chrome and iOS Safari install, offline revisit and update acceptance still need device/browser runs.

## Browser/device execution protocol — 2026-10-27

Use [`BROWSER_SMOKE_TEST_CHECKLIST.md`](./BROWSER_SMOKE_TEST_CHECKLIST.md#-pwa-navigation-and-mobile-acceptance) to record actual installability, deep-link refresh, offline revisit, update lifecycle and mobile reflow/focus results. Current acceptance remains unrun until an execution row includes the commit SHA, browser version, OS/device, network/profile mode and outcome.


## On-demand structured lesson chunks — 2026-10-27

Structured lesson JSON bodies are now emitted as separate dynamic JavaScript chunks. The application eagerly loads only a small bilingual metadata manifest for lesson titles and syllabus navigation; the body is fetched when its lesson route opens. This reduces the repository chunk from 2,363.77 kB minified / 784.88 kB gzip to 54.26 kB / 17.15 kB gzip in the latest measured production build.

The existing service worker runtime-caches successful same-origin JavaScript assets after their first successful request. Lesson bodies are not precached: an opened-online lesson should be available on a later offline revisit while its chunk remains cached, but a never-visited lesson is not guaranteed offline. The route displays a load-failure message when a required chunk cannot be fetched. Verify both cases in browser acceptance checklist W-03 before treating this as device-tested behavior.


## Runtime-cache scope hardening — 2026-10-28

- Narrowed service-worker runtime caching to same-origin Vite build assets under `/assets/`; an arbitrary same-origin path is no longer cached just because it ends in `.json`, `.js`, `.png` or a similar extension.
- Bumped the shell/asset cache namespace from `v5` to `v6`. On activation the existing cleanup removes previous cache versions, including entries that might have been stored by the older, extension-only runtime guard.
- Updated `src/pwa/pwaAssets.test.ts` to assert the v6 cache and ensure the asset-directory guard runs before the extension allowlist.
- Exact-head GitHub Actions [run #40648789939](https://github.com/Mardakhay/interactive-guides/actions/runs/40648789939) passed install, audit diagnostics, lint, typecheck, tests and production build on `b5a0f8fbcac903eaea3d415b1698eadc659521d0`.
- This is source-level privacy/cache hardening only. No install, offline revisit, deep-link refresh or update-lifecycle test was run in a real browser/device; those acceptance gates remain open.



## Learner-controlled update deferral — 2026-10-28

- The localized service-worker prompt now offers **Update now** and **Later** in English and Russian. Later hides the prompt for the current foreground period without sending `SKIP_WAITING`, activating the waiting worker or reloading. When the tab next becomes visible, the component re-checks `registration.waiting` and offers the choice again.
- Component tests cover defer without activation, re-prompt on visibility change, explicit activation messaging and Russian copy. The PWA contract test also checks the defer action.
- Exact-head CI [run #40649159828](https://github.com/Mardakhay/interactive-guides/actions/runs/40649159828) passed on `caaea3fdff52a420ebd64f3e4c1ff55eea58b36e`: npm ci, audit diagnostics, lint, typecheck, tests and production build.
- Real-browser/device acceptance is still open. Verify defer while a note or coding exercise has unsaved data, reappearance after returning to the app, and activation/reload only after controllerchange.



## Current branch implementation and acceptance status — 2026-10-28

The PWA foundation is present in `feat/learning-platform-foundation`; the historical early-audit note above must not be read as a current inventory.

- `index.html` links `/manifest.webmanifest`, the favicon, and the 180px Apple touch icon. `public/manifest.webmanifest` declares the standalone app identity and SVG/192px/512px icons; matching 180/192/512px raster assets and `public/pwa-icon.svg` are in `public/`.
- `public/sw.js` precaches the app shell, uses network-first navigation with a cached `/index.html` fallback, and runtime-caches successful same-origin Vite assets under `/assets/`. It skips cross-origin requests, requests with Authorization headers, `/api/` endpoints, and arbitrary same-origin paths outside the asset directory.
- The current service-worker cache namespace is `v6`. `src/pwa/ServiceWorkerUpdatePrompt.tsx` registers `/sw.js` in production and offers localized **Update now** / **Later** choices; the worker waits for an explicit `SKIP_WAITING` message rather than activating itself automatically.
- `public/_redirects` contains the Netlify-compatible `/* /index.html 200` SPA fallback for deep routes.
- The current code/content checkpoint `28b5c53afd967d2a2488840b494b197398fe467d` passed [run #40691049972](https://github.com/Mardakhay/interactive-guides/actions/runs/40691049972): 223 tests in 35 files, lint, typecheck, production build, all 125 JS chunk budgets, preview HTTP smoke and zero npm audit findings. The later documentation checkpoint `d248b2e4168d0e7bdf4bf70e108684020be371f2` passed [run #40700770769](https://github.com/Mardakhay/interactive-guides/actions/runs/40700770769).
- Structured lesson chunks are fetched on demand and cached only after a successful first online load. A never-visited lesson is not guaranteed offline. Google Fonts are external and may not load offline.
- **Not yet accepted in a real browser/device:** install prompts, icon behavior, fresh-profile install, localized deep-link reload, offline revisit vs. unvisited lesson, update deferral with unsaved learner input, mobile reflow/focus, and screen-reader behavior. The procedure and all “Not run” execution cells remain in `BROWSER_SMOKE_TEST_CHECKLIST.md`. A green CI run or a ready deploy preview does not close these manual acceptance gates.


## Latest code/content verification — 2026-10-28

The code/content checkpoint at `cc68eaa8c28cb9e96a1f348a163fdaa44768b873` passed GitHub Actions [run #40688503193](https://github.com/Mardakhay/interactive-guides/actions/runs/40688503193): `npm ci`, lint, typecheck, 221 tests in 35 files, production Vite build, and JavaScript bundle budgets across 125 chunks. The audit step reported zero npm vulnerabilities.

This is CI evidence only. It does not count as a native browser/device execution: installation prompts, fresh-profile install, offline revisit of an opened lesson, behavior for a never-visited lesson, deep-link reload, worker update deferral with unsaved input, mobile reflow, keyboard/screen-reader behavior, and downloaded backup-file interactions remain marked **Not run** in `BROWSER_SMOKE_TEST_CHECKLIST.md`.


## Latest exact-head code/content CI — 2026-10-28

GitHub Actions [run #40689939570](https://github.com/Mardakhay/interactive-guides/actions/runs/40689939570) passed on exact code/content SHA `12059fd51069df3f3126db470cd2f4744cc157ff`: `npm ci`, lint, typecheck, **222 tests across 35 files**, production build, and bundle budgets across 125 JavaScript chunks. `npm audit` reported zero vulnerabilities.

The additional localization regression does not change the PWA acceptance status: real-browser/device installation, offline revisit vs. unvisited lesson, localized deep-link reload, waiting-worker update with unsaved input, mobile reflow, keyboard/screen-reader behavior and backup-file interactions remain **Not run** in the browser/device checklist.


## Automated production preview smoke and latest verification — 2026-10-28

The feature branch runs `npm run smoke:preview` after the production build in CI. It verifies HTTP status and app-shell fallback for four deep routes, loads the built JavaScript entry, validates manifest metadata, checks service-worker cache-scope/private API guard patterns, compares SVG favicon/PWA artwork, and checks PNG signatures/dimensions for the 180/192/512px icons.

The code/content checkpoint `28b5c53afd967d2a2488840b494b197398fe467d` passed [run #40691049972](https://github.com/Mardakhay/interactive-guides/actions/runs/40691049972): 223 tests / 35 files, lint, typecheck, build, all 125 bundle budgets, smoke stage and zero npm audit findings. The subsequent documentation-status checkpoint `d248b2e4168d0e7bdf4bf70e108684020be371f2` passed exact-head CI [run #40700770769](https://github.com/Mardakhay/interactive-guides/actions/runs/40700770769).

This automated smoke is not native browser/device acceptance. Install prompts, localized deep-link behavior in a browser, online-loaded versus never-visited offline lessons, update deferral during unsaved work, mobile reflow/focus, screen-reader/keyboard behavior and backup file picker/download/restore must still be run and recorded in `BROWSER_SMOKE_TEST_CHECKLIST.md`. The current Netlify URL is a deploy preview, not proof of a production release.
