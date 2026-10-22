# PWA and Mobile Requirements

## Target

A responsive application that can be installed on supported phones/desktops and provides a clear offline experience. “PWA-ready” is accepted only after installability and offline behavior are tested on supported browsers/devices.

## Implemented foundation

- [x] `public/manifest.webmanifest` declares the app name, start URL, scope, standalone display, colors, categories and scalable SVG icons.
- [x] SVG app icons are available at `public/icons/icon-192.svg` and `public/icons/icon-512.svg`.
- [x] `src/lib/registerServiceWorker.ts` registers `public/sw.js` only in production.
- [x] The service worker pre-caches the shell and uses runtime caching for public assets/legacy HTML lesson files.
- [x] Navigation has a network-first strategy with an SPA shell fallback; hashed build assets are cache-first.
- [x] Offline status, install prompt where supported, and an explicit update action are present.
- [x] API/auth/functions/storage/realtime paths are excluded from service-worker caching.
- [x] GitHub Actions validates PWA manifest/cache contract tests.

## Current structured learning pilot
The app currently has five structured bilingual lessons (Weeks 1–5) served by the shared React lesson reader. These lessons are content pilots in review, not fully editorially approved material.

## Remaining work before calling it production verified

- Installability and offline navigation must still be tested on actual supported browsers/devices. CI static checks are not equivalent to a real PWA audit.
- Confirm manifest paths, service-worker scope and hosting base path if deployment uses a path prefix rather than domain root.
- Consider PNG 192px and 512px icons if required by specific install surfaces; verify browser support for SVG manifest icons and maskable treatment rather than assuming all platforms behave the same.
- Test cold load online, revisiting cached pages offline, first visit offline, localized deep-link reload, service-worker update lifecycle, cache quota failure, and sign-in/sync failures when sync is implemented.
- Confirm no authenticated/private API responses are accidentally cached by any new route or API adapter.

## Mobile lesson reading

- Legacy independent HTML shells still exist and have not all been migrated to the unified responsive reader.
- Use a collapsible table of contents, comfortable text measure, clear code overflow/copy controls, touch-friendly actions and safe-area spacing.
- Avoid multiple independent scroll containers on small viewports.
- Test at 320–375px and 200% zoom, keyboard/focus, reduced motion and contrast.

## Verification

Use Lighthouse/browser audits as diagnostics, not sole proof. Validate Android Chrome and iOS Safari separately because installation capabilities differ. Document exactly which offline items are available before claiming offline learning support.
