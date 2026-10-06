import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

const needle = 'title: \'Kestrel Studios\'';
const idx = html.indexOf(needle);
if (idx !== -1) {
  console.log('--- TV SCREENS JS SCRIPT ---');
  console.log(html.slice(idx - 400, idx + 1000));
}
