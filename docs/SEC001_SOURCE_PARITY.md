# Focused Source-to-Block Review: sec-001 Frontend Authentication

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/frontend-auth.html` (2,401 lines after the RFC 9700 update).  
**Canonical destination:** `frontend.auth-security` (EN/RU v5, 25 aligned blocks).

## Scope and decision

This pass corrects the most consequential security wording in the classic source and protects it with regression tests. The legacy page and its controls remain available; no route switch or learner-state migration is authorized. The candidate lesson covers the core security decisions but does not reproduce every legacy visualizer, tab, accordion and interaction.

## Source-to-block crosswalk

| Legacy section / interaction | Structured evidence | Review result and remaining difference |
|---|---|---|
| Authentication versus authorization; route guards | `auth-model`, `auth-callout`, `auth-http-status-check` | The distinction is assessed: route hiding is UX, while the API enforces protected operations. |
| Sessions, token storage and browser risks | `auth-sessions`, `auth-storage-tradeoffs` | Local/session storage, in-memory credentials, HttpOnly cookies and BFF trade-offs are covered. Cookie flags reduce specific risks but do not replace an app-specific CSRF/XSS defense. |
| JWT anatomy and interactive decoder | `auth-jwt-validation-model`, `auth-jwt-validation-check` | The lesson says decoding does not authenticate a token or verify signature/audience/permissions. The legacy decoder is preserved but now labels `exp` as an unverified claim and asks for synthetic input only. |
| Expiry handling and refresh requests | `auth-refresh-race-walkthrough`, `auth-refresh-race-check` | The structured example coordinates one in-flight refresh and retries only once after a contractually recoverable 401. The legacy helper now handles Base64URL, malformed payloads and missing/non-numeric `exp` as an indeterminate result. Its return is explicitly only a UX hint. |
| OAuth authorization code + PKCE, OIDC and BFF | `auth-flow`, `auth-oauth-flow-check`, `auth-oauth-security-guidance`, `auth-oauth-security-check`, `auth-options` | EN/RU v5 explicitly assesses RFC 9700: public-client PKCE with S256, exact registered web redirect matching, avoiding Implicit/Resource Owner Password Credentials grants, and rotation or sender-constraining for public-client refresh tokens. SPA versus BFF remains an architectural choice; the four original tabs are not reproduced by the structured reader. |
| Cookie flags / SameSite and CSRF | `auth-sessions`, `auth-storage-tradeoffs`, OWASP references | Over-broad statements about `SameSite` and absolute XSS protection were narrowed. Actual auth redirects and state-changing requests still need browser-specific validation. |
| Logout, protected routes and common failures | `auth-practice`, `auth-http-status-check`, `auth-refresh-race-check` | Core logic is present, but the legacy accordion order and JWT visualization are not functionally identical to structured blocks. |

## Corrections applied

- **HttpOnly is not XSS immunity:** the browser withholds the cookie value from JavaScript, but injected script may still issue authenticated requests as the user. Continue to require XSS prevention, server-side authorization and an explicit CSRF strategy.
- **SameSite is nuanced:** the page now distinguishes cross-site requests from cross-origin requests, avoids describing Lax as covering every top-level navigation, and points out that Strict may affect return-navigation and identity-provider flows. Test actual browser callbacks and state-changing endpoints.
- **JWT decoder handles untrusted input:** use only a synthetic/example token, never a live access/ID/refresh/session credential. Expiry reporting now says “expired by claim” or “not expired by claim; token is NOT verified,” rather than reporting an unverified future `exp` as “Valid.”
- **Expiry helper is fail-closed to “unknown”:** it normalizes Base64URL, decodes UTF-8, validates that `exp` is a finite number, and returns `null` for malformed/missing claims rather than accidentally treating a bad value as “not expiring.” This helper is illustrative; use the identity provider SDK and documented API contract in production.
- **OAuth Security BCP (RFC 9700):** the lesson turns current requirements into bilingual assessed content: public clients use Authorization Code + PKCE with S256; web redirect URIs are matched exactly; new implementations avoid Implicit and Resource Owner Password Credentials grants; and public-client refresh tokens use sender-constraining or rotation. PKCE is not a substitute for redirect, CSRF or mix-up defenses.
- **JWT and OAuth references:** the structured lesson links RFC 7519 for JWT and RFC 9700 for current OAuth security practice alongside OWASP session/CSRF and OpenID Connect references.

## Interaction inventory preserved

The dev/prod-style credential toggle, copy controls, JWT input and decoder, OAuth tabs (PKCE, Implicit, OIDC and BFF), expandable cookie sections, and route/security checklist remain in the legacy page. `src/content/legacyAuth.test.ts` asserts preserved controls, JWT-expiry wording, EN/RU block alignment, RFC 7519/RFC 9700 references, the scored BCP answer and source guidance. It does not certify interaction parity with the structured renderer.

## Remaining release gates

- Keep classic `/lessons/sec-001` and `public/lessons/frontend-auth.html` until the route-level content and interaction disposition is reviewed.
- Do not remap classic progress, bookmarks, notes or quiz results onto `frontend.auth-security` without the documented per-store migration policy.
- Run actual browser, keyboard/screen-reader and deployed-auth-flow tests for login/return navigation, cookie semantics, direct protected API calls, logout, and redirect/CSRF behavior. CI cannot establish these behaviors.
