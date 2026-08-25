# E2E Encryption in the Browser Without a Backend You Can Trust

> Status: SKELETON — fill the marked sections from the Klipport/Whispr codebases before publishing.
> Target length: 1,200–1,800 words. Audience: web devs who know JWT-and-HTTPS but not WebCrypto.

## Why write this (working notes)

- Every "encrypted" app tutorial stops at HTTPS. HTTPS encrypts *in transit to the server* — the server still sees plaintext.
- Klipport and Whispr both solve this client-side with zero-knowledge architecture; this post extracts the reusable pattern.

## Outline

### 1. The threat model nobody draws
- [ ] Diagram: HTTPS protects the pipe, not the server. Who can read your "encrypted" clipboard today?
- [ ] Define the goal: server as a dumb relay — it stores/shuffles bytes it cannot read.

### 2. Deriving keys the user controls (PBKDF2)
- [ ] Explain the 6-digit PIN → key derivation choice and its tradeoffs (usability vs. entropy)
- [ ] Code slot: `crypto.subtle.deriveBits()` with PBKDF2, high iteration count
- [ ] Honest section: what a 6-digit PIN does and does NOT protect against (offline brute force of stolen ciphertext) — and how server-side rate limiting/timers compensate

### 3. AES-GCM: encrypting without shooting your foot off
- [ ] Why GCM (authenticated encryption) over CBC
- [ ] Code slot: fresh random IV per message (`crypto.getRandomValues`), never reuse
- [ ] The bug class everyone hits: reusing IVs across messages — show the failure mode

### 4. The relay that can't read
- [ ] WebSocket envelope format: `{ciphertext, iv, salt}` only
- [ ] What the Node/Supabase layer is allowed to enforce WITHOUT seeing plaintext: expiry timers, password gates, pairing
- [ ] Code slot: minimal relay handler

### 5. What still leaks
- [ ] Metadata: message sizes, timing, IP addresses — and why that's acceptable here
- [ ] No forward secrecy: key compromise exposes prior clips — why that tradeoff is OK for clipboards, not for Whispr's chat (compare)
- [ ] This honesty section is the differentiator — most tutorials skip it

### 6. Ship checklist
- [ ] Repo links: klipport, whispr
- [ ] Try-it demo link / GIF

## Before publishing
- [ ] Pull real code snippets from both repos, verify they match shipped code
- [ ] Add architecture screenshot from portfolio site (consistency)
- [ ] Meta description + OG image
- [ ] Publish → then uncomment the blog-links block in index.html
