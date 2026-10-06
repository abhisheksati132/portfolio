import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

function inspectTag(tagId) {
  const marker = `id="${tagId}"`;
  const idx = html.indexOf(marker);
  if (idx === -1) return;
  const tagStart = html.lastIndexOf('<', idx);
  console.log(`\n================= ID: ${tagId} =================`);
  console.log(html.slice(tagStart, tagStart + 2200));
}

['topnav', 'top', 'showcase', 'services'].forEach(inspectTag);
