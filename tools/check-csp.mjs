#!/usr/bin/env node
/**
 * Fails CI if any inline <script> block in index.html is missing from the
 * CSP script-src hash list in vercel.json. Edit an inline script => update
 * its hash here (this check will tell you).
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));

const cspHeader = vercel.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy');

if (!cspHeader) {
  console.error('FAIL: No Content-Security-Policy header found in vercel.json');
  process.exit(1);
}

const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);

let failed = false;
for (const code of inlineScripts) {
  const hash = `'sha256-${createHash('sha256').update(code).digest('base64')}'`;
  if (!cspHeader.value.includes(hash)) {
    console.error(`FAIL: Inline script hash ${hash} is not in the CSP.\nScript starts with: ${JSON.stringify(code.slice(0, 60))}`);
    failed = true;
  }
}

// Also warn if the CSP contains stale hashes for scripts that no longer exist.
const hashes = [...cspHeader.value.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1]);
for (const h of hashes) {
  const stillUsed = inlineScripts.some(
    (code) => createHash('sha256').update(code).digest('base64') === h
  );
  if (!stillUsed) {
    console.error(`FAIL: CSP contains hash ${h} but no matching inline script exists in index.html.`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`CSP check OK: ${inlineScripts.length} inline script(s), all hashes match.`);
