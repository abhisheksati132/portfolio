# Abhishek Sati — Systems & Software Portfolio

Engineering portfolio of Abhishek Sati, B.Tech Computer Science and Engineering (Data Science) undergraduate at Vellore Institute of Technology (VIT).

Live: [https://abhisheksati.vercel.app/](https://abhisheksati.vercel.app/)  
3D Studio: [https://abhisheksati.vercel.app/studio.html](https://abhisheksati.vercel.app/studio.html)

---

## Technical Stack & Architecture

- **Core Frontend:** Semantic HTML5, modern CSS3 custom properties design system, and vanilla ES6+ JavaScript (zero external runtime dependencies).
- **Typography:** [Geist & Geist Mono](https://vercel.com/font) via Google Fonts.
- **Design Paradigm:** Tactile dark engineering aesthetics with single locked Electric Ember accent (`#ff5500`), slate surface elevation, and strict WCAG 2.1 AA accessibility.
- **3D Interactive Studio:** Standalone Three.js WebGL CRT Workstation scene (`studio.html`) with direct native rendering and quick navigation badge.
- **Cryptographic Telemetry:** In-browser Web Crypto API workbench running client-side SHA-256 digests and AES-GCM 256-bit authenticated encryption with 96-bit random IVs.
- **PWA & Offline Resilience:** Service Worker (`sw.js`) providing offline shell caching, stale-while-revalidate asset serving, and offline 404 routing.
- **Contact Pipeline:** Encrypted transmission via Web3Forms endpoint with botcheck honeypot and real-time client validation.
- **Hosting & Infrastructure:** Deployed on **Vercel** with strict Content Security Policy (CSP), subresource integrity, and custom security headers.

---

## Featured Engineering Projects

1. **NewsAtlas Intelligence Terminal:** Global situational awareness dashboard projecting live news feeds, economic indicators, and weather systems onto an interactive 3D Mapbox GL globe, with real-time geopolitical synthesis powered by Llama 3.3 via Groq.
2. **Klipport Universal Clipboard:** Zero-knowledge cross-device synchronization utility leveraging browser-native Web Crypto API (PBKDF2 / AES-GCM) and WebSocket PIN pairing.
3. **Whispr Encrypted Space:** Peer-to-peer messaging and media suite utilizing WebSockets for signaling and direct WebRTC DTLS mesh channels for encrypted audio/video.

---

## Local Development

```powershell
# Install dependencies
npm install

# Start Vite live dev server (http://localhost:5173)
npm run dev

# Compile production bundle to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## Validation & CI / CD

The repository runs automated GitHub Actions CI (`.github/workflows/ci.yml`) on all pushes to `master`:

```bash
# Verify Content Security Policy inline script SHA-256 hashes
node tools/check-csp.mjs

# Check JavaScript syntax
node --check script.js
node --check sw.js
node --check tools/check-csp.mjs

# Validate PWA manifest
node -e "JSON.parse(require('fs').readFileSync('manifest.webmanifest','utf8'))"

# Validate HTML compliance
npx --yes html-validate --rule void-style:off --rule no-raw-characters:off index.html 404.html
```

---

## Conventions & Rules

- **Content Security Policy:** The theme initialization scripts in `index.html` and `404.html` are strictly hashed in `vercel.json`. If you edit either inline script, update its SHA-256 hash in `vercel.json` or `tools/check-csp.mjs` will fail CI.
- **Cache Busting:** When modifying `styles.css` or `script.js`, bump the `?v=YYYYMMDD` query string in `index.html` and `404.html`, and update matching paths in `sw.js` `PRECACHE` (bumping `VERSION`).
- **Keyboard Shortcuts:**
  - `T`: Toggle light / dark theme
  - `P`: Scroll to Projects
  - `A`: Scroll to About
  - `C`: Scroll to Contact
  - `Ctrl` / `Cmd` + `K`: Open interactive Command Palette
