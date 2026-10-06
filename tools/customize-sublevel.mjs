import fs from 'node:fs';

let html = fs.readFileSync('public/landing-pages/sublevel-studio.html', 'utf8');

console.log('Original length:', html.length);

// 1. Title and Meta
html = html.replace(
  /<title>[\s\S]*?<\/title>/i,
  '<title>Abhishek Sati — Full-Stack Systems Developer &amp; CSE Undergrad</title>'
);

// 2. Wordmark and brand references
html = html.replaceAll('sublevel.', 'abhisheksati.');
html = html.replaceAll('SUBLEVEL.26', 'ABHISHEK.SATI');
html = html.replaceAll('SUBLEVEL.STUDIO', 'ABHISHEK SATI');
html = html.replaceAll('Sublevel — studio index', 'Abhishek Sati — Developer Index');
html = html.replaceAll('Est. 2019', 'VIT VELLORE · 9.08 CGPA');
html = html.replaceAll('hello@sublevel.studio', 'abhisheksativit@gmail.com');

// 3. Hero Headline and Lede
html = html.replace(
  '<h1 class="f-h0" data-ps>A digital studio &amp; brand workshop building the stuff people remember</h1>',
  '<h1 class="f-h0" data-ps>Building real-time data systems and secure, human-centered software.</h1>'
);
html = html.replace(
  '<p class="f-h4" data-ps>We team up with ambitious founders, scale-ups and brands to turn strategy into products, identities and experiences that actually ship.</p>',
  '<p class="f-h4" data-ps>3rd Year B.Tech Computer Science (Data Science) undergraduate at Vellore Institute of Technology (VIT), maintaining a 9.08 / 10 CGPA. Focused on real-time geospatial telemetry, client-side zero-knowledge cryptography, and high-performance web systems.</p>'
);

// 4. Builders / Tech Bar
html = html.replace(
  '<h2 class="f-h3" data-ps>Trusted by the builders</h2>',
  '<h2 class="f-h3" data-ps>Core Technical Stacks</h2>'
);

// 5. Featured Projects Subtitle
html = html.replace(
  '<p class="f-h4" data-ps>Eight selected builds from the last eighteen months — brand systems, product launches and a few experiments that got out of hand.</p>',
  '<p class="f-h4" data-ps>Selected production-grade applications engineered with real-time systems, 3D geospatial telemetry, client-side zero-knowledge cryptography, and offline PWA support.</p>'
);

// 6. Customize Project 1: NewsAtlas
html = html.replace(
  /<h3 class="f-h3" data-ps>Halide Launch<\/h3>/,
  '<h3 class="f-h3" data-ps>NewsAtlas Intelligence Terminal</h3>'
);
html = html.replace(
  /<p class="cats" data-ps>Websites · Marketing · IRL<\/p>/,
  '<p class="cats" data-ps>Geospatial Data Dashboard · React 19 · Groq AI (Llama 3.3)</p>'
);
html = html.replace(
  /<p class="desc f-p" data-ps>Halide’s developer summit needed a home built for the moment: live schedules, speaker reveals and a ticket drop that held up on launch day.<\/p>/,
  '<p class="desc f-p" data-ps>A global situational-awareness dashboard that aggregates and correlates live news signals, regional economic data, weather reports, and stock markets on an interactive 3D Mapbox globe. Powered by Llama 3.3 via Groq AI serverless endpoints for instant geopolitical briefs.</p>'
);

// Update link for Project 1
html = html.replace(
  /<a class="go f-p" href="#work" data-ps><span>View project<\/span>/,
  '<a class="go f-p" href="https://news-atlas-live.vercel.app/" target="_blank" rel="noopener" data-ps><span>Visit Live Site</span>'
);

// 7. Customize Project 2: Klipport
html = html.replace(
  /<h3 class="f-h3" data-ps>Northwind Labs<\/h3>/,
  '<h3 class="f-h3" data-ps>Klipport Universal Clipboard</h3>'
);
html = html.replace(
  /<p class="cats" data-ps>Brand System · Photography<\/p>/,
  '<p class="cats" data-ps>Secure Cross-Device Sync · PWA · Web Crypto API</p>'
);
html = html.replace(
  /<p class="desc f-p" data-ps>An energy company that had outgrown its logo. We rebuilt the identity around the people who climb the towers.<\/p>/,
  '<p class="desc f-p" data-ps>A secure cross-device clipboard and sync platform enabling real-time transfers of text snippets, files, and images across mobile and desktop. Features browser-side zero-knowledge End-to-End Encryption (AES-GCM / PBKDF2), offline service-worker cache, and account-free 6-digit PIN pairing.</p>'
);

// Update link for Project 2
html = html.replace(
  /<a class="go f-p" href="#work" data-ps><span>View project<\/span>/,
  '<a class="go f-p" href="https://klipport.vercel.app" target="_blank" rel="noopener" data-ps><span>Visit Live Site</span>'
);

// 8. Customize Project 3: Whispr
html = html.replace(
  /<h3 class="f-h3" data-ps>Lumenary<\/h3>/,
  '<h3 class="f-h3" data-ps>Whispr — Encrypted Space &amp; PWA</h3>'
);
html = html.replace(
  /<p class="cats" data-ps>Websites · Product Launch<\/p>/,
  '<p class="cats" data-ps>Real-Time Encrypted Messaging · WebRTC · Socket.io</p>'
);
html = html.replace(
  /<p class="desc f-p" data-ps>A quiet product deserved a loud launch. The story-driven site sold through the first hardware run in 48 hours.<\/p>/,
  '<p class="desc f-p" data-ps>An encrypted, real-time private messaging platform with full-duplex WebSocket communication, peer-to-peer WebRTC voice/video calls, and ephemeral disappearing media. Built on a zero-knowledge architecture where cryptographic keys never leave the browser.</p>'
);

// Update link for Project 3
html = html.replace(
  /<a class="go f-p" href="#work" data-ps><span>View project<\/span>/,
  '<a class="go f-p" href="https://github.com/abhisheksati132/whispr" target="_blank" rel="noopener" data-ps><span>View Source Code</span>'
);

// 9. Customize Project 4: Developer Portfolio
html = html.replace(
  /<h3 class="f-h3" data-ps>Quillworks<\/h3>/,
  '<h3 class="f-h3" data-ps>Developer Portfolio Showcase</h3>'
);
html = html.replace(
  /<p class="cats" data-ps>Identity · Print<\/p>/,
  '<p class="cats" data-ps>Warm Editorial Design System · 100/100 Lighthouse · SPA</p>'
);
html = html.replace(
  /<p class="desc f-p" data-ps>A stationery house with a hundred-year archive and no way to show it. We gave the catalogue a spine and an archival voice that sold across 30 countries.<\/p>/,
  '<p class="desc f-p" data-ps>Personal portfolio engineered with custom CSS custom properties, dark/light theme switching, 1-click clipboard email integration, keyboard shortcuts, and full SEO architecture.</p>'
);

// Update link for Project 4
html = html.replace(
  /<a class="go f-p" href="#work" data-ps><span>View project<\/span>/,
  '<a class="go f-p" href="https://abhisheksati.vercel.app/" target="_blank" rel="noopener" data-ps><span>Visit Portfolio</span>'
);

// 10. Replace images for the 4 projects with our verified assets
html = html.replace(
  /https:\/\/ublctyddhtbgaersvxxb\.supabase\.co\/storage\/v1\/object\/public\/threeui-media\/scene-images\/embedded\/5adbf9bcefb380aba42a0df8cd3ea7bc5d527adf89929b592d3fd2f90b3e5e88\.jpg/,
  '/assets/news_atlas.webp'
);
html = html.replace(
  /https:\/\/ublctyddhtbgaersvxxb\.supabase\.co\/storage\/v1\/object\/public\/threeui-media\/scene-images\/embedded\/fbdb9068cc5e30114983f8d1acf9d8ba3f4cb162b02ae6dc9908b0496f04f712\.jpg/,
  '/assets/klipport.webp'
);
html = html.replace(
  /https:\/\/ublctyddhtbgaersvxxb\.supabase\.co\/storage\/v1\/object\/public\/threeui-media\/scene-images\/embedded\/ca37589a8f31795e08e224131a89d70645c1aa561b55bdb118191f95ad503129\.jpg/,
  '/assets/whispr.webp'
);
html = html.replace(
  /https:\/\/ublctyddhtbgaersvxxb\.supabase\.co\/storage\/v1\/object\/public\/threeui-media\/scene-images\/embedded\/9e843fdfb8f5ee5ba08d7e98a712ca76807d9178ee79ef6022e032338ff72ee5\.jpg/,
  '/assets/og-card.png'
);

// 11. Customize Capabilities
html = html.replace(
  "<p data-ps>We're here to make the extraordinary.</p>\n      <p data-ps>No shortcuts — just bold, precise work that raises the bar &amp; leaves a mark.</p>",
  '<p data-ps>Engineering resilient, human-centered systems.</p>\n      <p data-ps>No shortcuts — just bold, precise architecture that scales seamlessly from prototype to production.</p>'
);

// Cap 1
html = html.replace(
  '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">Websites &amp; Features</a></h3>\n          <p class="f-h4" data-ps>From pre-launch teasers to full redesigns, we design and engineer sites that earn attention and turn it into action.</p>\n          <div class="tags f-p"><span>Product Strategy</span><span>UX/UI Design</span><span>Engineering</span><span>3D &amp; Motion</span></div>',
  '<h3 class="f-h4" data-ps><a class="actionable" href="#work">Full-Stack Web Systems</a></h3>\n          <p class="f-h4" data-ps>Modern frontend &amp; backend engineering with React 19, Node.js, Express, and serverless functions for snappy, resilient applications.</p>\n          <div class="tags f-p"><span>React 19</span><span>Node.js</span><span>Express</span><span>RESTful APIs</span><span>Vite</span><span>PWA</span></div>'
);

// Cap 2
html = html.replace(
  '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">Visual Branding</a></h3>\n          <p class="f-h4" data-ps>From lean identities for new companies to full brand platforms for category leaders, we build systems that scale without going stale.</p>\n          <div class="tags f-p"><span>Visual Identity</span><span>Brand Systems</span></div>',
  '<h3 class="f-h4" data-ps><a class="actionable" href="#work">Client-Side Cryptography</a></h3>\n          <p class="f-h4" data-ps>Zero-knowledge security using the Web Crypto API (AES-GCM &amp; PBKDF2). Plaintext never touches central servers; keys remain device-bound.</p>\n          <div class="tags f-p"><span>Web Crypto API</span><span>AES-GCM</span><span>PBKDF2</span><span>Zero-Knowledge</span><span>E2EE</span></div>'
);

// Cap 3
html = html.replace(
  '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">IRL Experience Design</a></h3>\n          <p class="f-h4" data-ps>From annual summits to weekend pop-ups, we design in-person moments people remember long after the doors close.</p>\n          <div class="tags f-p"><span>Visual Identity</span><span>Space Design</span><span>Keynote Design</span><span>Digital &amp; Interactive</span></div>',
  '<h3 class="f-h4" data-ps><a class="actionable" href="#work">Real-Time Telemetry &amp; 3D</a></h3>\n          <p class="f-h4" data-ps>Full-duplex WebSocket messaging, WebRTC P2P media streams, and hardware-accelerated 3D tile rendering with Mapbox GL JS and Three.js.</p>\n          <div class="tags f-p"><span>Mapbox GL JS</span><span>Three.js</span><span>Socket.io</span><span>WebRTC</span><span>WebSockets</span></div>'
);

// Cap 4
html = html.replace(
  '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">Marketing Execution</a></h3>\n          <p class="f-h4" data-ps>From brand to product marketing, we plug into marketing teams to ship the assets that drive awareness, demand and conversion.</p>\n          <div class="tags f-p"><span>Campaign Content</span><span>Growth Experiments</span><span>Sales Materials</span></div>',
  '<h3 class="f-h4" data-ps><a class="actionable" href="#work">Databases &amp; Systems</a></h3>\n          <p class="f-h4" data-ps>Relational schema design, Row-Level Security, auto-expiring persistence, and foundational computer science principles with C++, Python, and Java.</p>\n          <div class="tags f-p"><span>PostgreSQL</span><span>Supabase</span><span>MongoDB</span><span>SQL</span><span>C++</span><span>Python</span><span>Java</span></div>'
);

// 12. Contact / Academics Section (#people)
html = html.replace(
  "<h2 class=\"f-h3\" data-ps>Contact</h2>\n      <p class=\"lead f-h1\" data-ps>Let's build something loud.</p>\n      <div class=\"mail f-h1\" data-ps><a href=\"mailto:hello@sublevel.studio\"><span class=\"actionable\">hello@sublevel.studio</span></a></div>",
  "<h2 class=\"f-h3\" data-ps>Academics &amp; Contact</h2>\n      <p class=\"lead f-h1\" data-ps>Let's build something extraordinary.</p>\n      <p class=\"f-h4\" style=\"color:var(--text-muted,#888);margin-bottom:1rem;\" data-ps>B.Tech CSE (Data Science) @ Vellore Institute of Technology (VIT) · CGPA: 9.08 / 10 · Open to Summer 2027 Software Engineering Internships.</p>\n      <div class=\"mail f-h1\" data-ps><a href=\"mailto:abhisheksativit@gmail.com\"><span class=\"actionable\">abhisheksativit@gmail.com</span></a></div>"
);

// 13. Writing / Research Section (#blog)
html = html.replace(
  '<p class="tag">Newsletter — dispatch 026</p>\n      <h3 class="f-h2" data-ps>Want the good stuff first?</h3>\n      <p class="sub f-h4" data-ps>Drops, experiments and the occasional bad idea, sent no more than once a month.</p>',
  '<p class="tag">Technical Writing &amp; Research Notes</p>\n      <h3 class="f-h2" data-ps>Read how I build these systems</h3>\n      <p class="sub f-h4" data-ps>Deep-dive articles on client-side zero-knowledge encryption, hardware-accelerated 3D WebGL data streams, and offline-first PWAs.</p>'
);

// 14. Terminal Machine ASCII and Content
const oldMachineAscii = `  <pre class="sr-only"> ████ █   █ ████  █     █████ █   █ █████ █    
█     █   █ █   █ █     █     █   █ █     █    
 ███  █   █ ████  █     ████  █   █ ████  █    
    █ █   █ █   █ █     █      █ █  █     █    
████   ███  ████  █████ █████   █   █████ █████

SUBLEVEL.STUDIO :: MACHINE-READABLE INDEX

# PLAIN-TEXT MIRROR OF SUBLEVEL.STUDIO FOR AI AGENTS, CRAWLERS, AND HUMANS WHO PREFER IT RAW.

── ABOUT ─────────────────────────────────────────────────────────
NAME .......... SUBLEVEL.STUDIO
AKA ........... SUBLEVEL, SBLVL, SUBLEVELSTUDIO
FOUNDED ....... 2021
LOCATION ...... PORTO, PORTUGAL (PT)
AREA_SERVED ... WORLDWIDE
SERVICES ...... WEBSITE DESIGN AND ENGINEERING, VISUAL BRAND IDENTITY, REAL-TIME 3D EXPERIENCES, MARKETING EXECUTION, PRODUCT ENGINEERING
CLIENTS ....... NORTHWIND LABS, HALIDE, QUILLWORKS, LUMENARY, KESTREL, VANTAGEFIELD, COBALTINE, MOONRAKE, HARBORLIGHT
KNOWS_ABOUT ... WEB DESIGN, BRAND IDENTITY, WEBGL, THREE.JS, MOTION, TYPEFACE DESIGN, GROWTH MARKETING

SUBLEVEL.STUDIO IS A PORTO-BASED DIGITAL DESIGN AND ENGINEERING STUDIO. WE BUILD HIGH-PERFORMANCE WEBSITES, BRAND SYSTEMS AND REAL-TIME 3D EXPERIENCES FOR TECHNOLOGY COMPANIES AND CREATORS.

FOUNDED IN 2021, THE STUDIO PARTNERS WITH STARTUPS AND ESTABLISHED BRANDS ACROSS EUROPE AND NORTH AMERICA, FROM FIRST IDENTITY TO PRODUCTION ENGINEERING.`;

const newMachineAscii = `  <pre class="sr-only"> ████  ████  █   █ █████  ████ █   █ █████ █   █
█    █ █   █ █   █   █   █     █   █ █     █  █ 
██████ ████  █████   █    ███  █████ ████  ███  
█    █ █   █ █   █   █       █ █   █ █     █  █ 
█    █ ████  █   █ █████ ████  █   █ █████ █   █

ABHISHEK SATI :: FULL-STACK SYSTEMS DEVELOPER &amp; CSE UNDERGRAD

# MACHINE-READABLE SYSTEM INDEX FOR AI AGENTS, RECRUITERS, AND HUMANS WHO PREFER IT RAW.

── ABOUT ─────────────────────────────────────────────────────────
NAME .......... ABHISHEK SATI
ROLE .......... FULL-STACK DEVELOPER &amp; SYSTEMS ENGINEER
INSTITUTION ... VELLORE INSTITUTE OF TECHNOLOGY (VIT VELLORE)
DEGREE ........ B.TECH COMPUTER SCIENCE &amp; ENGINEERING (DATA SCIENCE)
CLASS ......... 2024 - 2028
CGPA .......... 9.08 / 10.0
LOCATION ...... VELLORE, TAMIL NADU, INDIA (HOMETOWN: KOTA, RAJASTHAN)
EMAIL ......... abhisheksativit@gmail.com
GITHUB ........ https://github.com/abhisheksati132
LINKEDIN ...... https://www.linkedin.com/in/abhisheksati132
PORTFOLIO ..... https://abhisheksati.vercel.app
RESUME ........ https://abhisheksati.vercel.app/assets/Abhishek_Sati_Resume.pdf

ABHISHEK SATI IS A COMPUTER SCIENCE UNDERGRADUATE MAINTAINING A 9.08 CGPA AT VIT VELLORE.
SPECIALIZING IN REAL-TIME SYSTEMS, GEOSPATIAL TELEMETRY (MAPBOX GL JS, THREE.JS),
CLIENT-SIDE ZERO-KNOWLEDGE CRYPTOGRAPHY (WEB CRYPTO API, AES-GCM / PBKDF2),
AND HIGH-PERFORMANCE PROGRESSIVE WEB APPS.

OPEN FOR SOFTWARE DEVELOPMENT INTERNSHIPS AND FULL-STACK ROLES FOR SUMMER 2027.

── FEATURED_PROJECTS ─────────────────────────────────────────────
* NEWSATLAS INTELLIGENCE TERMINAL
  LIVE: https://news-atlas-live.vercel.app/
  CODE: https://github.com/abhisheksati132/newsatlaslive
  TECH: REACT 19, MAPBOX GL JS V3, GROQ AI (LLAMA 3.3), VERCEL SERVERLESS

* KLIPPORT UNIVERSAL CLIPBOARD
  LIVE: https://klipport.vercel.app
  CODE: https://github.com/abhisheksati132/klipport
  TECH: REACT, NODE.JS, SOCKET.IO, WEB CRYPTO API, SUPABASE, TAILWIND V4

* WHISPR REAL-TIME MESSAGING
  CODE: https://github.com/abhisheksati132/whispr
  TECH: NODE.JS, EXPRESS, SOCKET.IO, WEBRTC, SUPABASE, WEB CRYPTO API

* DEVELOPER SHOWCASE PORTFOLIO
  LIVE: https://abhisheksati.vercel.app/
  TECH: SEMANTIC HTML5, WARM EDITORIAL CSS3, ES6+ JAVASCRIPT, 100/100 LIGHTHOUSE`;

html = html.replace(oldMachineAscii, newMachineAscii);

// Also replace the JS terminal content inside the CRT renderer script if present
html = html.replaceAll('HELLO@SUBLEVEL.STUDIO', 'ABHISHEKSATIVIT@GMAIL.COM');
html = html.replaceAll('hello@sublevel.studio', 'abhisheksativit@gmail.com');
html = html.replaceAll('PORTO, PORTUGAL (PT)', 'VELLORE, TAMIL NADU, INDIA');

// 15. Social links in the footer
html = html.replace(
  '<div class="social"><a href="#lab" aria-label="X" title="X">',
  '<div class="social"><a href="https://github.com/abhisheksati132" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a><a href="https://www.linkedin.com/in/abhisheksati132" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a><a href="https://abhisheksati.vercel.app/assets/Abhishek_Sati_Resume.pdf" target="_blank" rel="noopener" aria-label="Resume" title="Resume PDF"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></a>'
);

fs.writeFileSync('public/landing-pages/sublevel-studio.html', html, 'utf8');
console.log('Customized public/landing-pages/sublevel-studio.html successfully! New length:', html.length);
