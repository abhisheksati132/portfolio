import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

const menuStart = html.indexOf('class="menu"');
if (menuStart !== -1) {
  const menuEnd = html.indexOf('</nav>', menuStart);
  console.log('--- MENU CONTENT ---');
  console.log(html.slice(menuStart, menuEnd + 10));
}
