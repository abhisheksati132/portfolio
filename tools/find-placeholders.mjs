import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

const keywords = [
  'Halide', 'Northwind', 'Lumenary', 'Quillworks', 'Kestrel',
  'Cobaltine', 'Moonrake', 'Signalhaus', 'Harborlight', 'Vantagefield',
  'Porto', 'Portugal', 'Newsletter', 'dispatch', 'agency',
  'studio.com', 'Count me in', 'Monthly', 'Drop'
];

for (const kw of keywords) {
  const count = (html.match(new RegExp(kw, 'gi')) || []).length;
  console.log(`${kw}: ${count} occurrences`);
}
