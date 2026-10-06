import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

const start = html.indexOf('<section class="grid-layout logos" id="showcase">');
const end = html.indexOf('</section>', start);

console.log('--- SHOWCASE LOGOS SECTION ---');
console.log(html.slice(start, end + 10));
