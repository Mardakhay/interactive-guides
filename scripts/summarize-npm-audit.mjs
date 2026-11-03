import { readFileSync } from 'node:fs';
import process from 'node:process';

const reportPath = process.argv[2];
if (!reportPath) {
  process.stdout.write('npm audit report: no report path was supplied.\n');
  process.exit(0);
}

let report;
try {
  report = JSON.parse(readFileSync(reportPath, 'utf8'));
} catch {
  process.stdout.write('npm audit report: no parseable JSON report was produced (registry/network error or npm audit failure).\n');
  process.exit(0);
}

const vulnerabilities = report.vulnerabilities ?? {};
const entries = Object.entries(vulnerabilities);
const counts = report.metadata?.vulnerabilities;
if (counts) {
  process.stdout.write(`npm audit summary: ${counts.total ?? entries.length} total (critical=${counts.critical ?? 0}, high=${counts.high ?? 0}, moderate=${counts.moderate ?? 0}, low=${counts.low ?? 0}, info=${counts.info ?? 0}).\n`);
}
if (entries.length === 0) {
  process.stdout.write('npm audit details: no vulnerable packages reported.\n');
}

for (const [name, finding] of entries.sort(([a], [b]) => a.localeCompare(b))) {
  const advisoryTitles = (finding.via ?? []).map((item) => {
    if (typeof item === 'string') return `dependency ${item}`;
    const title = item.title ?? 'Advisory';
    return item.url ? `${title} (${item.url})` : title;
  }).join('; ') || 'advisory detail unavailable';
  const fix = finding.fixAvailable === false
    ? 'no automatic fix reported'
    : finding.fixAvailable === true
      ? 'automatic fix reported; review the proposed diff first'
      : finding.fixAvailable && typeof finding.fixAvailable === 'object'
        ? `${finding.fixAvailable.name ?? name}@${finding.fixAvailable.version ?? 'target version'}${finding.fixAvailable.isSemVerMajor ? ' (major update)' : ''}`
        : 'not specified';
  process.stdout.write(`${String(finding.severity ?? 'unknown').toUpperCase()} ${name}: direct=${Boolean(finding.isDirect)}, range=${finding.range ?? 'unknown'}, fix=${fix}\n  ${advisoryTitles}\n`);
}

process.stdout.write('This report is informational; vulnerabilities are not ignored as resolved. Review package paths, proposed fixes, and regression compatibility before upgrading.\n');
