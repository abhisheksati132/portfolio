import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

const workIdx = html.indexOf('id="work"');
if (workIdx !== -1) {
  const start = html.lastIndexOf('<', workIdx);
  console.log(html.slice(start, start + 3000));
} else {
  console.log('#work not found');
}
