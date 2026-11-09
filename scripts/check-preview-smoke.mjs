/* global fetch, AbortSignal */
import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { once } from 'node:events';
import { spawn } from 'node:child_process';
import process from 'node:process';
import { resolve } from 'node:path';
import { URL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const host = '127.0.0.1';
const port = Number(process.env.PREVIEW_SMOKE_PORT ?? 4173);
const baseUrl = `http://${host}:${port}`;
const viteExecutable = resolve(process.cwd(), 'node_modules/vite/bin/vite.js');
let spawnError;

const preview = spawn(
  process.execPath,
  [viteExecutable, 'preview', '--host', host, '--port', String(port), '--strictPort'],
  { stdio: 'ignore' },
);
preview.on('error', (error) => {
  spawnError = error;
});

async function waitForPreview() {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (spawnError) throw spawnError;
    if (preview.exitCode !== null) {
      throw new Error(`vite preview exited before becoming ready (code ${preview.exitCode})`);
    }
    try {
      const response = await fetch(baseUrl, { signal: AbortSignal.timeout(1_000) });
      if (response.ok) return;
    } catch {
      // The preview server may not be listening yet.
    }
    await delay(250);
  }
  throw new Error('vite preview did not become ready within 15 seconds');
}

async function fetchOk(path) {
  const response = await fetch(new URL(path, baseUrl), { signal: AbortSignal.timeout(5_000) });
  assert.equal(response.status, 200, `Expected HTTP 200 for ${path}, received ${response.status}`);
  return response;
}

try {
  await waitForPreview();

  const homeResponse = await fetchOk('/');
  assert.match(homeResponse.headers.get('content-type') ?? '', /text\/html/i);
  const homeHtml = await homeResponse.text();
  assert.match(homeHtml, /<div id="root"><\/div>/, 'index.html should contain the React mount point');
  assert.match(homeHtml, /rel="manifest" href="\/manifest\.webmanifest"/);
  const entryMatch = homeHtml.match(/src="(\/assets\/[^"]+\.js)"/);
  assert.ok(entryMatch, 'production HTML should reference a built JavaScript entry chunk');
  const entryResponse = await fetchOk(entryMatch[1]);
  assert.match(entryResponse.headers.get('content-type') ?? '', /javascript/i);

  const deepRoutes = [
    '/en/structured-lessons',
    '/ru/structured-lessons',
    '/ru/structured-lessons/capstone.requirements-discovery',
    '/practice',
    '/paths/structured-capstone',
  ];
  for (const route of deepRoutes) {
    const response = await fetchOk(route);
    assert.match(response.headers.get('content-type') ?? '', /text\/html/i);
    const html = await response.text();
    assert.match(html, /<div id="root"><\/div>/, `SPA fallback should return the app shell for ${route}`);
  }

  const manifestResponse = await fetchOk('/manifest.webmanifest');
  assert.match(manifestResponse.headers.get('content-type') ?? '', /json/i);
  const manifest = await manifestResponse.json();
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.display, 'standalone');
  assert.ok(manifest.icons.some((icon) => icon.src === '/pwa-192.png'));
  assert.ok(manifest.icons.some((icon) => icon.src === '/pwa-512.png' && icon.purpose?.includes('maskable')));

  const workerResponse = await fetchOk('/sw.js');
  const worker = await workerResponse.text();
  assert.match(worker, /const VERSION = 'v6';/);
  assert.match(worker, /if \(!url\.pathname\.startsWith\('\/assets\/'\)\) return;/);
  assert.match(worker, /request\.headers\.has\('authorization'\) \|\| url\.pathname\.startsWith\('\/api\/'\)/);

  const assetPaths = ['/favicon.svg', '/pwa-icon.svg', '/pwa-180.png', '/pwa-192.png', '/pwa-512.png'];
  const assetResponses = await Promise.all(assetPaths.map((path) => fetchOk(path)));
  const favicon = await assetResponses[0].text();
  const pwaIcon = await assetResponses[1].text();
  assert.equal(pwaIcon, favicon, 'favicon and PWA SVG artwork should match');
  for (const [index, expectedSize] of [[2, 180], [3, 192], [4, 512]]) {
    const bytes = Buffer.from(await assetResponses[index].arrayBuffer());
    assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(bytes.readUInt32BE(16), expectedSize);
    assert.equal(bytes.readUInt32BE(20), expectedSize);
  }

  process.stdout.write(
    `Production preview smoke passed: ${deepRoutes.length} deep routes, entry bundle, manifest, service worker and ${assetPaths.length} PWA assets.\n`,
  );
} finally {
  if (preview.pid && preview.exitCode === null) {
    preview.kill('SIGTERM');
    await Promise.race([once(preview, 'exit').catch(() => {}), delay(2_000)]);
  }
}
