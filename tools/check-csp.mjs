#!/usr/bin/env node
/**
 * Fails CI if any inline <script> block in any HTML page is missing from the
 * CSP script-src hash list in vercel.json, or if the CSP contains stale
 * hashes for scripts that no longer exist.
 *
 * Edit an inline script => recompute its hash and update vercel.json.
 * This check (run by CI) fails loudly if the two drift.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const HTML_FILES = ['index.html', '404.html'];

const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));

const cspHeader = vercel.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy');

if (!cspHeader) {
  console.error('FAIL: No Content-Security-Policy header found in vercel.json');
  process.exit(1);
}

const inlineScripts = [];
for (const file of HTML_FILES) {
  const html = readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => ({
    file,
    code: m[1]
  }));
  inlineScripts.push(...scripts);
}

let failed = false;
for (const { file, code } of inlineScripts) {
  const hash = `'sha256-${createHash('sha256').update(code).digest('base64')}'`;
  if (!cspHeader.value.includes(hash)) {
    console.error(`FAIL: ${file} inline script hash ${hash} is not in the CSP.\nScript starts with: ${JSON.stringify(code.slice(0, 60))}`);
    failed = true;
  }
}

// Also fail if the CSP contains stale hashes for scripts that no longer exist.
const hashes = [...cspHeader.value.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1]);
for (const h of hashes) {
  const stillUsed = inlineScripts.some(
    (s) => createHash('sha256').update(s.code).digest('base64') === h
  );
  if (!stillUsed) {
    console.error(`FAIL: CSP contains hash ${h} but no matching inline script exists in ${HTML_FILES.join(' or ')}.`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`CSP check OK: ${inlineScripts.length} inline script(s) across ${HTML_FILES.length} page(s), all hashes match.`);
