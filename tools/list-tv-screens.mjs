import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

const matches = [...html.matchAll(/title:\s*'([^']+)',\s*kind:\s*'([^']+)'/g)].map(m => ({
  title: m[1],
  kind: m[2]
}));
console.log('Found TV titles:', matches);
