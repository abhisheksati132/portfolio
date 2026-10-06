import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

function inspectSection(id) {
  const marker = `id="${id}"`;
  const idx = html.indexOf(marker);
  if (idx === -1) {
    console.log(`Section #${id} not found`);
    return;
  }
  // Find opening tag
  const tagStart = html.lastIndexOf('<', idx);
  // Get next 1500 chars
  console.log(`================= SECTION #${id} =================`);
  console.log(html.slice(tagStart, tagStart + 2500));
}

['top', 'showcase', 'services', 'people', 'blog', 'machine'].forEach(inspectSection);
