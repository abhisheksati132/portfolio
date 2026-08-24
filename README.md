# Abhishek Sati — Portfolio

Single-page static portfolio. No framework, no build step — plain HTML/CSS/JS served as-is.

## Stack

- **HTML / CSS / vanilla JS** (one file each, no bundler)
- **Web3Forms** for the contact form (public access key in `index.html` — by design)
- **github-readme-stats** embed in the Projects section
- **Google Fonts** (Fraunces only; body uses system stack)
- **Service worker** (`sw.js`) for offline support + PWA install
- Hosted on **Vercel** at the domain root

## Local preview

```powershell
# from repo root
python -m http.server 8080
# or
npx serve .
```

Open http://localhost:8080. The service worker registers on localhost too.

## Validation (same checks CI runs)

```bash
npx --yes html-validate --rule void-style:off --rule no-raw-characters:off index.html 404.html
node --check script.js && node --check sw.js && node --check tools/check-csp.mjs
node tools/check-csp.mjs
```

## Conventions

- **Cache-busting:** when you change `styles.css` or `script.js`, bump the `?v=YYYYMMDD`
  query string in both `index.html` and `404.html`, AND update the matching paths in
  `sw.js` PRECACHE. Bump `VERSION` in `sw.js` so old caches are purged.
- **Inline scripts:** the head theme-init script is hashed into the CSP in `vercel.json`.
  If you edit it, recompute the hash and update both places — `tools/check-csp.mjs`
  (run by CI) will fail loudly if they drift.
- **Icons:** regenerate with `powershell -ExecutionPolicy Bypass -File tools/generate-icons.ps1`.
  Colors are hardcoded there to match `:root` design tokens.
- **Design tokens:** warm editorial system — bg `#FAF9F5`, surface `#FFFFFF`,
  accent `#D97757` (light) / `#262624` bg (dark). Display font: Fraunces.
  All tokens live in `styles.css :root`.

## Deployment constraint

Absolute paths (`/assets/...`, `/sw.js`, `/styles.css`) assume **root-domain deployment**
(Vercel apex/subdomain). Hosting under a subpath (e.g., GitHub Pages project site)
requires relativizing those URLs first.

## Keyboard shortcuts

`T` theme · `A` about · `P` projects · `C` contact · `Ctrl/Cmd + K` command palette

## Manual (dashboard) tasks

- Enable **Vercel Web Analytics**, then uncomment the analytics tag near `</body>` in `index.html`.
- Toggle Web3Forms' built-in spam protection in their dashboard if form spam appears.
