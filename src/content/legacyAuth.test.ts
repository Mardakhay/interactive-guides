import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import englishAuth from './lessons/frontend.auth-security/en.json';
import russianAuth from './lessons/frontend.auth-security/ru.json';
import { lessonTranslationSchema } from './schemas/lessonContent';

const legacyAuthHtml = readFileSync(
  resolve(process.cwd(), 'public/lessons/frontend-auth.html'),
  'utf8',
);

function sectionById(id: string): string {
  const match = legacyAuthHtml.match(
    new RegExp('<section class="section" id="' + id + '">[\\s\\S]*?</section>'),
  );
  if (!match) throw new Error('Missing legacy authentication section: ' + id);
  return match[0];
}

describe('sec-001 legacy authentication source accuracy and parity', () => {
  it('preserves the legacy token, JWT, OAuth and security interactions', () => {
    for (const id of ['sessions', 'tokens', 'jwt', 'oauth', 'react', 'security', 'checklist']) {
      expect(sectionById(id).trim().length, id).toBeGreaterThan(100);
    }
    expect(legacyAuthHtml).toContain('id="modeToggle"');
    expect(legacyAuthHtml).toContain('id="jwt-demo-input"');
    expect(legacyAuthHtml).toContain('onclick="decodeJWT()"');
    expect(legacyAuthHtml).toContain("switchTab(this, 'tab-pkce')");
    expect(legacyAuthHtml).toContain("switchTab(this, 'tab-implicit')");
    expect(legacyAuthHtml).toContain("switchTab(this, 'tab-oidc')");
    expect(legacyAuthHtml).toContain("switchTab(this, 'tab-bff')");
    const oauth = sectionById('oauth');
    expect(oauth).toContain('OAuth 2.0 Security BCP — RFC 9700');
    expect(oauth).toContain('S256 challenge method');
    expect(oauth).toContain('exactly match registered web redirect URIs');
    expect(oauth).toContain('sender-constrained or rotated');
    expect(oauth).toContain('PKCE does not replace redirect validation');
    expect(oauth).toContain('https://www.rfc-editor.org/rfc/rfc9700.html');
  });

  it('does not claim HttpOnly prevents XSS from acting as the current user', () => {
    const sessions = sectionById('sessions');
    expect(sessions).toContain('withholds its value from JavaScript');
    expect(sessions).toContain('may still send authenticated requests');
    expect(sessions).toContain('not as a replacement for XSS prevention');
    expect(sessions).not.toContain('No XSS payload can steal it.');
    expect(sessions).toContain('not a complete security policy');
  });

  it('describes SameSite behavior carefully and keeps explicit CSRF analysis', () => {
    const sessions = sectionById('sessions');
    expect(sessions).toContain('cross-site requests');
    expect(sessions).toContain('Usually permits top-level cross-site navigation with safe methods');
    expect(sessions).toContain('every endpoint CSRF-safe');
    expect(sessions).not.toContain('<td>Never on cross-site requests</td>');
    expect(sessions).not.toContain('<td>Top-level navigations only</td>');
  });

  it('limits the JWT demo to synthetic tokens and avoids labelling an exp claim as token validity', () => {
    const jwt = sectionById('jwt');
    expect(jwt).toContain('synthetic/example tokens only');
    expect(jwt).toContain('do not paste a live token');
    expect(legacyAuthHtml).toContain('token is NOT verified');
    expect(legacyAuthHtml).toContain('Missing or non-numeric');
    expect(legacyAuthHtml).not.toContain('✓ Valid');
    expect(jwt).not.toContain('paste any JWT to decode payload');
    expect(legacyAuthHtml).toContain('.replace');
    expect(legacyAuthHtml).toContain('TextDecoder');
    expect(legacyAuthHtml).toContain('Number.isFinite');
    expect(legacyAuthHtml).toContain('return</span> <span class="kw">null');
  });

  it('keeps structured EN/RU security guidance aligned and references OAuth and JWT standards', () => {
    expect(lessonTranslationSchema.safeParse(englishAuth).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianAuth).success).toBe(true);
    expect(englishAuth.version).toBe(5);
    expect(englishAuth.blocks).toHaveLength(25);
    expect(englishAuth.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianAuth.blocks.map(({ id, type }) => [id, type]),
    );
    for (const lesson of [englishAuth, russianAuth]) {
      const jwtModel = lesson.blocks.find((block) => block.id === 'auth-jwt-validation-model');
      expect(jwtModel?.type).toBe('paragraph');
      if (jwtModel?.type === 'paragraph') {
        expect(jwtModel.text.toLowerCase()).toContain(lesson.locale === 'en' ? 'synthetic/example tokens' : 'синтетические примеры');
        expect(jwtModel.text).toContain('`exp`');
      }
      const refs = lesson.blocks.find((block) => block.id === 'auth-references');
      expect(refs?.type).toBe('references');
      if (refs?.type === 'references') {
        expect(refs.items.some((item) => item.url === 'https://www.rfc-editor.org/rfc/rfc7519.html')).toBe(true);
        expect(refs.items.some((item) => item.url === 'https://datatracker.ietf.org/doc/html/rfc9700')).toBe(true);
      }
      const guidance = lesson.blocks.find((block) => block.id === 'auth-oauth-security-guidance');
      expect(guidance?.type).toBe('callout');
      if (guidance?.type === 'callout') {
        expect(guidance.title).toContain('RFC 9700');
        expect(guidance.text).toContain('S256');
        expect(guidance.text).toContain(lesson.locale === 'en' ? 'redirect URIs' : 'redirect URI');
        expect(guidance.text).toContain('sender-constrained');
      }
      const bcpCheck = lesson.blocks.find((block) => block.id === 'auth-oauth-security-check');
      expect(bcpCheck?.type).toBe('knowledgeCheck');
      if (bcpCheck?.type === 'knowledgeCheck') {
        expect(bcpCheck.options.filter((option) => option.correct)).toHaveLength(1);
        expect(bcpCheck.options.find((option) => option.correct)?.id).toBe('d');
        expect(bcpCheck.options.every((option) => option.feedback.trim().length > 0)).toBe(true);
        expect(bcpCheck.prompt).toContain('RFC 9700');
        expect(bcpCheck.explanation).toContain(lesson.locale === 'en' ? 'redirect validation' : 'проверке redirect URI');
      }
    }
  });
});
