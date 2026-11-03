# Focused Source-to-Block Review: wb-001 Internet Fundamentals

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/internet-fundamentals.html` (11 sections; clickable DNS steps and HTTP-version timeline retained).  
**Canonical destinations:** `web.internet-http` (EN/RU v2, 40 blocks), `network.dns-tcp-tls` (EN/RU v1, 22 blocks), `browser.rendering-pipeline`, `deployment.production-hosting`, and `frontend.auth-security`.

## Scope and decision

This pass corrects factual overclaims in the classic source and adds source-level regression coverage. It does **not** approve route cutover. The source still includes sidebar/scroll navigation, clickable DNS steps, HTTP-version expansion panels, hosting comparison, browser-process diagram and security cards; structured destinations divide the concepts by subject and do not reproduce those interactions as a single page.

## Source-to-block crosswalk

| Classic section | Structured destination | Parity status |
|---|---|---|
| Internet, packets, routers, protocol roles | `web.internet-http`, `network.dns-tcp-tls` | Conceptual coverage exists; classic term cards and navigation interactions differ. |
| IP addressing and domain names | `network.dns-tcp-tls`, `web.internet-http` | IP wording describes interface/routing addresses; multiple addresses, private addresses and NAT are mentioned. Interaction parity remains open. |
| DNS resolution and TTL caching | `network.dns-tcp-tls` | Recursive/authoritative roles and caching limits are covered structurally. The eight-step example is marked as a simplified cache-miss A/AAAA path; it remains a clickable stepper. |
| HTTP versions, requests and status semantics | `web.internet-http`, `network.dns-tcp-tls` | HTTP semantics are separated from transport. HTTP/1.0 connection lifetime is qualified; HTTP/2 multiplexing no longer claims to remove TCP transport HOL; HTTP/3/QUIC is introduced. The timeline remains classic-only. |
| HTTPS, TLS and transport | `network.dns-tcp-tls`, `frontend.auth-security` | HTTPS is described as HTTP over TLS; HTTP/3 uses QUIC/UDP with TLS 1.3+. TLS claims qualify exposed metadata and replay-sensitive early data. |
| Ports, sockets and hosting | `network.dns-tcp-tls`, `deployment.production-hosting` | Default-port wording is qualified by protocol version; hosting comparison widgets are not reproduced one-for-one. |
| Browser request, rendering, sandboxing and privacy | `browser.rendering-pipeline`, `frontend.auth-security` | TCP/TLS and HTTP/3/QUIC paths are distinguished. Mixed-content behavior, process isolation, and Chrome Incognito retention limits are qualified. Source diagrams and privacy-card interactions still differ. |

## Factual corrections applied

- **IP addresses:** removed the claim that every device has one unique global IP. A host may have multiple interface addresses; private addresses and NAT are common, and a public address is not always a one-device identity.
- **TCP vs UDP:** TCP is described as a reliable ordered byte stream with retransmission and congestion controls. UDP does not guarantee delivery, ordering or retransmission by itself; it is not described as inherently faster.
- **DNS:** TTL is described as metadata published with a record that constrains resolver caching. The eight-step example is marked as a simplified cache-miss path for a common A/AAAA lookup; caching, aliases and other record types can change the path.
- **HTTP transport and versions:** HTTP semantics are not equated with TCP. HTTP/1.0 connection lifetime is qualified; HTTP/2 multiplexing reduces application-level queuing but does not remove TCP transport head-of-line blocking. HTTP/3 uses QUIC over UDP, integrates TLS 1.3+, and retains HTTP method/status semantics. Sources: [RFC 9114 — HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html), [MDN — HTTP/2](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2), [MDN — Head-of-line blocking](https://developer.mozilla.org/en-US/docs/Glossary/Head_of_line_blocking).
- **TLS/HTTPS:** HTTPS is described as HTTP secured with TLS. Default port 443 does not imply every version uses TCP. The guide no longer promises that third parties can never observe all connection metadata and notes replay-sensitive TLS 1.3 early data. TLS does not protect compromised endpoints.
- **Browser security/privacy:** active mixed content is distinguished from content browsers may upgrade; the guide no longer asserts one isolated process per tab. Chrome Incognito's local retention behavior is scoped to Chrome; downloads/bookmarks persist and sites/network observers may still see activity, so Incognito is not anonymity. Sources: [MDN — Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content), [Chrome Help — Incognito](https://support.google.com/chrome/answer/95464?hl=en).

## Regression coverage and remaining gates

`src/content/legacyInternetFundamentals.test.ts` preserves all 11 section IDs and original navigation/stepper/timeline controls while asserting corrected IP, UDP, DNS, HTTP/1.0, HTTP/2/3, TLS, mixed-content, sandbox and Incognito claims.

The `wb-001` route remains **Blocked**: its classic stepper, HTTP timeline, hosting comparison, browser diagram, route-level learner-state disposition and browser/accessibility acceptance have not been proved equivalent to the distributed structured lessons. Keep the classic route and HTML source until these gates are recorded.
