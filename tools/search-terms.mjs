import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

['Kyoto', 'Porto', 'dispatch 026', 'open late'].forEach(term => {
  let idx = 0;
  console.log(`--- TERM: ${term} ---`);
  while ((idx = html.indexOf(term, idx)) !== -1) {
    console.log(`[${idx}]: ${html.slice(Math.max(0, idx - 50), Math.min(html.length, idx + 80)).replace(/\n/g, ' ')}`);
    idx += term.length;
  }
});
