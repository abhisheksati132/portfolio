# E2E Encryption in the Browser Without a Backend You Can Trust

> Status: DRAFT — prose complete. Replace the `TODO(you)` code slots with snippets
> pulled from Klipport/Whispr, then publish. Do not publish with illustrative code unswapped.

## 1. The threat model nobody draws

Open any tutorial on "building an encrypted chat app" and you'll find the same architecture:
browser talks HTTPS to a server, server talks to a database, done. The word
"encrypted" appears eleven times. And yet, in that entire pipeline, there is exactly
one computer that can read every message in plaintext — yours.

HTTPS encrypts the pipe, not the destination. TLS terminates at the server. Whatever
your backend receives, it can read, log, leak, or be subpoenaed for. For a chat app or
a clipboard sync tool, that means the thing users most want protected — the content
— is sitting in your database, one breach away from exposure.

The fix is a shift in who holds the keys: **encrypt on the sender's device, decrypt on
the receiver's device, and treat the server as a dumb relay that shuffles bytes it
cannot read.** This is called a zero-knowledge architecture — not because there's
anything exotic about it, but because the only thing the server "knows" is ciphertext.

That's the design behind Klipport (cross-device clipboard sync) and Whispr
(encrypted messaging). This post walks through the pattern so you can reuse it.

## 2. Deriving keys the user controls (PBKDF2)

End-to-end encryption has an awkward bootstrapping problem: both devices need the same
key, but there's no account, no login, no key server — Klipport pairs with a 6-digit
PIN. So the key must be *derived* from something both sides know: the PIN.

Raw PINs make terrible keys (a million possibilities is nothing to a GPU), so the PIN
goes through PBKDF2 — a key-derivation function that deliberately burns CPU time per
attempt, making bulk guessing expensive. The salt is generated fresh per session and
travels alongside the ciphertext (salts aren't secret; they just stop precomputation).

<!-- TODO(you): paste your real deriveBits call from Klipport. Verify iteration count
     and digest here match shipped code. Illustrative shape:
     crypto.subtle.importKey('raw', pinBytes, 'PBKDF2', false, ['deriveBits'])
       → crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: N, hash: 'SHA-256' }, baseKey, 256)
-->

Be honest about what a 6-digit PIN does and doesn't do. It does: make pairing
frictionless and give each session a distinct key. It doesn't: resist offline brute
force if an attacker captures the ciphertext. The compensation lives elsewhere in the
system — short expiry timers, server-side pairing rate limits, and disappearing
media — which is why this section and section 5 have to be read together. A PIN is
fine when the blast radius of a guessed key is one expired clip, not a lifetime of
messages. That's the actual reason Klipport and Whispr can share primitives but need
different retention policies.

## 3. AES-GCM: authenticated encryption or nothing

With a 256-bit derived key in hand, the message gets encrypted with AES-GCM — Galois/
Counter Mode — and the choice of the GCM suffix is the whole point. Plain AES-CBC
encrypts but doesn't authenticate: flip a bit of ciphertext and the decrypted
plaintext flips predictably, which is a real attack (padding oracles, bit-flipping).
GCM binds an authentication tag to every encryption, so tampered ciphertext fails
decryption instead of decrypting to something attacker-controlled.

Two rules that cannot be bent:

1. **Fresh random IV per message.** `crypto.getRandomValues` gives you 96 random bits;
   never reuse an IV under the same key, or confidentiality collapses. The IV travels
   with the message in the clear — it's not a secret, it's a nonce.
2. **Check the tag on decrypt.** WebCrypto's `decrypt` with AES-GCM throws on
   tampered input. Let it throw; never fall back to a "best-effort" decode.

<!-- TODO(you): paste your real encrypt/decrypt helpers. Verify: IV length, tag length,
     and that decrypt failures propagate (no try/catch that swallows into plaintext). -->

## 4. The relay that can't read

The network envelope is deliberately boring:

```json
{ "ciphertext": "base64…", "iv": "base64…", "salt": "base64…", "expiresAt": 1724… }
```

No plaintext, no keys, no metadata beyond what's needed to deliver and expire. The
Node.js layer does exactly three things: pair devices by PIN, forward envelopes, and
enforce expiry/password gates. It can delete your data on schedule without ever being
able to read it — which is the property that makes "server-side timers on encrypted
data" coherent rather than contradictory.

Supabase stores the same envelope shape. Passwords on stored clips? Also enforced
without decryption: the password gates *retrieval of the envelope*, while decryption
still happens client-side. Separating access control from confidentiality is the
quietest good decision in the whole design.

<!-- TODO(you): paste your minimal relay handler + the Supabase row shape.
     Confirm: nothing in the insert path ever sees plaintext. -->

## 5. What still leaks (the section most tutorials skip)

Zero-knowledge is not zero-metadata. The relay still sees message sizes, timing, and
IP addresses — enough for traffic analysis, not enough for content. State that
upfront; users making real threat decisions deserve it.

Second: there's no forward secrecy here. A static session key means a compromised key
exposes that session's history. For clipboard clips with minute-scale expiry, that's
a fine trade. For Whispr's chat history, it's the known weakness — the fix is key
ratcheting (Signal-style), which is explicitly future work, not a hidden gap.

The reason to write this section at all: a security post that doesn't name its own
limits is marketing. This one isn't.

## 6. Try it

- [ ] Klipport live link + 20-second pairing GIF
- [ ] Whispr repo link
- [ ] `git clone` one-liner so readers can run the relay locally and watch ciphertext flow through logs they control

---

## Pre-publish checklist

- [ ] Every `TODO(you)` resolved with verified snippets from shipped code
- [ ] No illustrative parameter (iterations, IV length) left unverified
- [ ] OG image + meta description
- [ ] Publish → uncomment `/writing` links in `index.html:projects-more`
