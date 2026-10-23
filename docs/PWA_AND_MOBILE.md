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
