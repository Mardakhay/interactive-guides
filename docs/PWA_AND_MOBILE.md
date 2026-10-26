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

## Implementation status check — 2026-10-23

The requirements above remain valid, but source-tree verification of feat/learning-platform-foundation found that the PWA foundation described in earlier handoffs is not present in the current implementation:
- public/manifest.webmanifest is absent.
- public/sw.js is absent.
- index.html does not link a web manifest.
- src/main.tsx does not register a service worker.
- Install/update/offline UI and real-browser installability results must not be assumed.

Treat PWA as an implementation and acceptance-testing phase, not a completed feature. Before caching content, specify cache lifecycle, offline route fallback and update UX, and explicitly exclude private/authenticated responses. Then test installability and offline reload behavior on supported browsers/devices. Structured React routes alone do not make the content available offline.


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
