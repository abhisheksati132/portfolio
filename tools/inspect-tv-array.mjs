import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

const startIdx = html.indexOf('title: \'Halide Launch\'');
if (startIdx !== -1) {
  // Find array
  const arrStart = html.lastIndexOf('[', startIdx);
  const arrEnd = html.indexOf('];', arrStart);
  console.log('--- SCREENS ARRAY LENGTH ---', arrEnd - arrStart);

  // Extract titles
  const titles = [...html.slice(arrStart, arrEnd).matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  console.log('TV Screen Titles:', titles);
}
