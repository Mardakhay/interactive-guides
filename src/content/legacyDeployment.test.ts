import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import englishDeployment from './lessons/deployment.production-hosting/en.json';
import russianDeployment from './lessons/deployment.production-hosting/ru.json';
import { lessonTranslationSchema } from './schemas/lessonContent';

const legacyDeploymentHtml = readFileSync(
  resolve(process.cwd(), 'public/lessons/deployment-learning.html'),
  'utf8',
);

function sectionById(id: string): string {
  const match = legacyDeploymentHtml.match(
    new RegExp('<section class="section" id="' + id + '">[\\s\\S]*?</section>'),
  );
  if (!match) throw new Error('Missing legacy deployment section: ' + id);
  return match[0];
}

describe('tl-004 legacy deployment source accuracy and parity', () => {
  it('preserves the major source sections and interactive affordances while the route is not cut over', () => {
    for (const id of ['s-why', 's-build', 's-dist', 's-env', 's-vite-env', 's-platforms', 's-deploy-steps', 's-spa', 's-cicd', 's-checklist']) {
      expect(sectionById(id).trim().length, id).toBeGreaterThan(100);
    }

    expect(legacyDeploymentHtml).toContain('id="modeDevBtn"');
    expect(legacyDeploymentHtml).toContain('id="modeProdBtn"');
    expect(legacyDeploymentHtml).toContain('id="pipeline"');
    expect(legacyDeploymentHtml).toContain("switchTab('compare')");
    expect(legacyDeploymentHtml).toContain("switchTab('vercel')");
    expect(legacyDeploymentHtml).toContain("switchTab('netlify')");
    expect(legacyDeploymentHtml).toContain("toggleEnvRow(this, 'env-d1')");
    expect(legacyDeploymentHtml).toContain('onclick="copyCode(this)"');
    expect((legacyDeploymentHtml.match(/class="check-item"/g) ?? [])).toHaveLength(12);
  });

  it('teaches Vite env precedence by active mode and process environment', () => {
    const env = sectionById('s-vite-env');
    expect(env).toContain('.env.[mode].local');
    expect(env).toContain('.env.[mode]');
    expect(env).toContain('process environment has the highest priority');
    expect(env).toContain('default for <code>npm run dev</code>');
    expect(env).toContain('default for <code>npm run build</code>');
    expect(env).not.toContain('Highest priority · Personal, never committed to Git');
    expect(env).not.toContain('It overrides everything else.');
    expect(env).not.toContain('Safe to commit.');
    expect(env).toContain('intentionally public and non-sensitive');
  });

  it('does not teach volatile host quotas, obsolete provider pricing, or a universal provider winner', () => {
    const providers = sectionById('s-platforms');
    expect(providers).toContain('verify the provider’s current documentation');
    expect(providers).toContain('depend on the current plan');
    expect(providers).not.toContain('100 deploys/day');
    expect(providers).not.toContain('300 build min/mo');
    expect(providers).not.toContain('100GB bandwidth');
    expect(providers).not.toContain('most developers choose Vercel');
    expect(legacyDeploymentHtml).not.toContain('$10-15/year');
    expect(legacyDeploymentHtml).not.toContain('Namecheap, Google Domains, Cloudflare');
  });

  it('warns that VITE_ values are public and exposed credentials require revocation first', () => {
    const envSection = sectionById('s-env');
    expect(envSection).toContain('Frontend env vars are NOT secret');
    expect(envSection).toContain('VITE_STRIPE_PUBLISHABLE_KEY');
    expect(envSection).not.toContain('VITE_STRIPE_KEY');
    expect(legacyDeploymentHtml).toContain('revoke or rotate that credential first');
    expect(legacyDeploymentHtml).toContain('Rewriting Git history does not revoke the credential');
    expect(legacyDeploymentHtml).not.toContain('Rotate all API keys immediately.');
  });

  it('explains route fallback and rollback limits without claiming the checklist guarantees readiness', () => {
    const platforms = sectionById('s-platforms');
    const rollback = sectionById('s-cicd');
    const checklist = sectionById('s-checklist');
    expect(platforms).toContain('a missing JavaScript/CSS asset');
    expect(rollback).toContain('does not undo database writes');
    expect(rollback).toContain('compatibility with the current API and data');
    expect(rollback).toContain('smoke-test critical routes and requests');
    expect(checklist).toContain('not a production-readiness guarantee');
    expect(legacyDeploymentHtml).not.toContain('Your deployment is production-ready.');
  });

  it('validates structured EN/RU deployment lessons and parity for the mapped concepts', () => {
    expect(lessonTranslationSchema.safeParse(englishDeployment).success, englishDeployment.locale).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianDeployment).success, russianDeployment.locale).toBe(true);
    expect(englishDeployment.id).toBe('deployment.production-hosting');
    expect(englishDeployment.version).toBe(4);
    expect(englishDeployment.blocks).toHaveLength(34);
    expect(englishDeployment.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianDeployment.blocks.map(({ id, type }) => [id, type]),
    );

    const env = englishDeployment.blocks.find((block) => block.id === 'deploy-env-detail');
    expect(env?.type).toBe('paragraph');
    if (env?.type === 'paragraph') {
      expect(env.text).toContain('.env.[mode].local');
      expect(env.text).toContain('process environment');
    }

    const host = englishDeployment.blocks.find((block) => block.id === 'deploy-hosting-detail');
    expect(host?.type).toBe('paragraph');
    if (host?.type === 'paragraph') {
      expect(host.text).toContain('missing asset paths');
      expect(host.text).toContain('current provider docs');
    }

    const rollback = englishDeployment.blocks.find((block) => block.id === 'deploy-rollback-body');
    expect(rollback?.type).toBe('paragraph');
    if (rollback?.type === 'paragraph') {
      expect(rollback.text).toContain('git revert');
      expect(rollback.text).toContain('database');
    }
  });

  it('keeps the structured lesson’s provider-specific, rollback, domain and diagnostic evidence', () => {
    for (const lesson of [englishDeployment, russianDeployment]) {
      const requiredIds = [
        'deploy-flow',
        'deploy-env-detail',
        'deploy-hosting-detail',
        'deploy-domain-check',
        'deploy-domain-practice',
        'deploy-rollback-body',
        'deploy-rollback-check',
        'deploy-diagnostic-exercise',
        'deploy-references',
      ];
      for (const id of requiredIds) expect(lesson.blocks.some((block) => block.id === id), lesson.locale + ':' + id).toBe(true);

      const rollbackCheck = lesson.blocks.find((block) => block.id === 'deploy-rollback-check');
      expect(rollbackCheck?.type).toBe('knowledgeCheck');
      if (rollbackCheck?.type === 'knowledgeCheck') {
        expect(rollbackCheck.options.filter((option) => option.correct)).toHaveLength(1);
        expect(rollbackCheck.options.every((option) => option.feedback.trim().length > 15)).toBe(true);
      }
    }
  });
});
