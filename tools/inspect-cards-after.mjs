import fs from 'node:fs';

const html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

const needle = 'Developer Portfolio Showcase';
const idx = html.indexOf(needle);
if (idx !== -1) {
  // find closing </article> of card 4
  const endArticle4 = html.indexOf('</article>', idx);
  // find end of masonry div
  const endMasonry = html.indexOf('</div>\n    <div class="more">', endArticle4);
  console.log('--- CARDS AFTER PORTFOLIO ---');
  console.log(html.slice(endArticle4 + 10, endMasonry > 0 ? endMasonry : endArticle4 + 3000));
}
