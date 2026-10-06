import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

// Find all elements with an id
const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
console.log('--- ALL IDs ---');
console.log(ids);

// Find navigation links
const navLinks = [...html.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => ({
  href: m[1],
  text: m[2].replace(/<[^>]+>/g, '').trim()
}));
console.log('--- NAV / A LINKS ---');
navLinks.slice(0, 25).forEach(l => console.log(l.href, '->', l.text));

// Find project titles and sections
const projectMatches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('--- H3 HEADINGS (Projects) ---');
console.log(projectMatches);

// Find paragraph samples
const pMatches = [...html.matchAll(/<p[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/p>/g)].map(m => ({
  cls: m[1],
  text: m[2].replace(/<[^>]+>/g, '').trim().slice(0, 100)
}));
console.log('--- P TAGS (Sample) ---');
pMatches.slice(0, 15).forEach(p => console.log(`[${p.cls}]`, p.text));
