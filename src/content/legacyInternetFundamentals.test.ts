import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const legacyInternetFundamentals = readFileSync(
  resolve(process.cwd(), 'public/lessons/internet-fundamentals.html'),
  'utf8',
);

function sectionById(id: string): string {
  const match = legacyInternetFundamentals.match(
    new RegExp('<section[^>]*id="' + id + '"[\\s\\S]*?</section>'),
  );
  if (!match) throw new Error('Missing legacy Internet Fundamentals section: ' + id);
  return match[0];
}

describe('wb-001 legacy Internet Fundamentals factual accuracy and parity guard', () => {
  it('preserves all source sections and interactive affordances', () => {
    for (const id of ['intro', 'how', 'terms', 'protocols', 'ip', 'dns', 'http', 'tls', 'tcp', 'hosting', 'browser']) {
      expect(sectionById(id).length, id).toBeGreaterThan(100);
    }
    expect((legacyInternetFundamentals.match(/<section id="/g) ?? [])).toHaveLength(11);
    expect(legacyInternetFundamentals).toContain("scrollTo('intro')");
    expect(legacyInternetFundamentals).toContain('function toggleStep(el)');
    expect(legacyInternetFundamentals).toContain('function toggleHttp(el)');
    expect(legacyInternetFundamentals).toContain('function toggleSidebar()');
    expect(legacyInternetFundamentals).toContain('id="dns-steps"');
    expect(legacyInternetFundamentals).toContain('class="http-timeline"');
  });

  it('describes IP addresses as routing addresses rather than globally unique device identities', () => {
    expect(legacyInternetFundamentals).toContain('a host can have multiple addresses');
    expect(legacyInternetFundamentals).toContain('private addresses behind NAT');
    expect(legacyInternetFundamentals).not.toContain('Every device on the internet is assigned an IP address');
    expect(legacyInternetFundamentals).not.toContain('unique numerical identifier assigned to every device');
  });

  it('does not claim UDP is inherently faster than TCP', () => {
    const protocols = sectionById('protocols');
    expect(protocols).toContain('without built-in delivery, ordering, or retransmission guarantees');
    expect(protocols).toContain('not inherently faster than TCP');
    expect(protocols).not.toContain('A faster but less reliable alternative to TCP');
  });

  it('explains HTTP/2 TCP head-of-line blocking and HTTP/3 over QUIC', () => {
    const http = sectionById('http');
    expect(http).toContain('reducing application-level queuing');
    expect(http).toContain('packet loss can stall several streams');
    expect(http).toContain('HTTP/3 and QUIC');
    expect(http).toContain('QUIC over UDP');
    expect(http).toContain('TLS 1.3 or later');
    expect(http).toContain('https://www.rfc-editor.org/rfc/rfc9114.html');
    expect(http).not.toContain('eliminating head-of-line blocking');
    expect(http).not.toContain('HTTP over TLS encryption</td></tr>');
  });

  it('qualifies DNS TTL/cache-miss behavior and HTTP/1.0 connection-count examples', () => {
    expect(sectionById('dns')).toContain('simplified cache-miss lookup for a common A/AAAA query');
    expect(sectionById('dns')).toContain('Time-to-Live (TTL)</strong> indicates how long a resolver may cache that answer');
    expect(sectionById('http')).toContain('actual connection counts depended on browser behavior, reuse and parallel-fetch strategy');
    expect(legacyInternetFundamentals).not.toContain('A page loading 20 resources required 20 separate TCP connections');
  });

  it('qualifies TLS guarantees, mixed-content handling, and browser privacy/security claims', () => {
    const tls = sectionById('tls');
    const browser = sectionById('browser');
    expect(tls).toContain('Some connection metadata may remain visible');
    expect(tls).toContain('TLS 1.3 early data can be replay-sensitive');
    expect(browser).toContain('active mixed content such as scripts and stylesheets is blocked');
    expect(browser).toContain('In Chrome Incognito, local site data and visited-site history are removed');
    expect(browser).toContain('private browsing is not anonymity');
    expect(browser).toContain('tab is not guaranteed to own one process');
    expect(browser).not.toContain('Each browser tab runs in an isolated process');
    expect(browser).not.toContain('block mixed content — HTTP resources loaded within an HTTPS page');
    expect(browser).not.toContain('Private browsing mode retains no history, cookies, or form data');
  });
});
