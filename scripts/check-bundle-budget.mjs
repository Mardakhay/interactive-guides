import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { gzipSync } from 'node:zlib';

const assetsDirectory = path.resolve(process.cwd(), 'dist', 'assets');
const files = readdirSync(assetsDirectory).filter((file) => file.endsWith('.js'));
const genericChunkBudget = 500 * 1024;
const entryBudget = { bytes: 350 * 1024, gzipBytes: 120 * 1024 };
const repositoryBudget = { bytes: 100 * 1024, gzipBytes: 30 * 1024 };
const failures = [];

function measure(file) {
  const content = readFileSync(path.join(assetsDirectory, file));
  return { file, bytes: statSync(path.join(assetsDirectory, file)).size, gzipBytes: gzipSync(content).byteLength };
}

function format(bytes) {
  return `${(bytes / 1000).toFixed(2)} kB`;
}

function checkBudget(label, asset, budget) {
  if (!asset) {
    failures.push(`${label}: expected build asset was not found; review the output naming/configuration and update the guard deliberately.`);
    return;
  }
  if (asset.bytes > budget.bytes) failures.push(`${label} ${asset.file}: ${format(asset.bytes)} exceeds ${format(budget.bytes)} raw budget.`);
  if (asset.gzipBytes > budget.gzipBytes) failures.push(`${label} ${asset.file}: ${format(asset.gzipBytes)} gzip exceeds ${format(budget.gzipBytes)} gzip budget.`);
  process.stdout.write(`Bundle budget: ${label} ${asset.file} — ${format(asset.bytes)} raw / ${format(asset.gzipBytes)} gzip.\n`);
}

if (files.length === 0) {
  process.stderr.write('Bundle budget check failed: no JavaScript assets found in dist/assets.\n');
  process.exitCode = 1;
} else {
  const assets = files.map(measure);
  for (const asset of assets) {
    if (asset.bytes > genericChunkBudget) {
      failures.push(`${asset.file}: ${format(asset.bytes)} exceeds the ${format(genericChunkBudget)} maximum JavaScript chunk size.`);
    }
  }
  const entry = assets.find((asset) => /^index-[\w-]+\.js$/.test(asset.file));
  const repository = assets.find((asset) => /^repository-[\w-]+\.js$/.test(asset.file));
  checkBudget('entry', entry, entryBudget);
  checkBudget('lesson repository', repository, repositoryBudget);

  if (failures.length > 0) {
    process.stderr.write(`\nBundle budget check failed:\n- ${failures.join('\n- ')}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write(`All bundle budgets passed across ${assets.length} JavaScript chunks.\n`);
  }
}
