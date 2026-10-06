import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

const targets = ['Kestrel', 'Cobaltine', 'Moonrake', 'Signalhaus', 'Harborlight', 'Vantagefield', 'Newsletter', 'Count me in'];

for (const t of targets) {
  let idx = 0;
  console.log(`\n=================== TARGET: ${t} ===================`);
  while ((idx = html.indexOf(t, idx)) !== -1) {
    const start = Math.max(0, idx - 80);
    const end = Math.min(html.length, idx + 120);
    console.log(`[${idx}]: ...${html.slice(start, end).replace(/\n/g, ' ')}...`);
    idx += t.length;
  }
}
