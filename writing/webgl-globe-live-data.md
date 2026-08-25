# Correlating Live Data Feeds on a WebGL Globe

> Status: SKELETON — fill the marked sections from the NewsAtlas codebase before publishing.
> Target length: 1,200–1,800 words. Audience: frontend devs curious about data-viz + AI orchestration.

## Why write this (working notes)

- "Dashboard" posts are everywhere. The interesting part of NewsAtlas is the *correlation* problem:
  four heterogeneous feeds (news, weather, markets, economics) that share only a geography.
- Secondary hook: LLM briefs generated per-click, on demand, cheaply — the Groq/latency story.

## Outline

### 1. The globe is the database index
- [ ] Reframe: Mapbox GL JS isn't decoration — geography is the join key across all feeds
- [ ] Code slot: globe setup, click → lat/lng → region resolution (reverse geocode / bounding boxes)

### 2. Four feeds, one shape
- [ ] Table: each feed's raw format, update cadence, quirks
- [ ] The normalization layer: every feed becomes `{region, timestamp, payload}` — show the interface
- [ ] Code slot: one adapter example (pick the messiest feed)

### 3. Serverless fan-out without burning the free tier
- [ ] Why Vercel functions: API keys stay server-side, zero idle cost
- [ ] Parallel fetching with timeouts per feed — a slow feed must not freeze the click
- [ ] Caching strategy per feed type (what's cacheable for minutes vs. seconds)
- [ ] Honest section: rate-limit ceilings hit and how handled

### 4. LLM briefs on demand
- [ ] Why generate per-click instead of pre-generating: freshness + cost
- [ ] Prompt design: structured 10-point brief, constrained output format
- [ ] Latency budget: streaming the response while the globe is already interactive
- [ ] Cost math per 1,000 clicks (Groq pricing) — concrete numbers make this post rank

### 5. Making it feel instant
- [ ] Optimistic UI: render pins immediately, fill briefs as they arrive
- [ ] PWA shell caching: second load feels native
- [ ] Perf numbers slot (fill after profiling): time-to-globe, time-to-brief

### 6. What I'd do differently
- [ ] Feed reliability/retry design, regional boundary data quality, etc.
- [ ] Roadmap: historical replay? alerting?

## Before publishing
- [ ] Screen recording of a real click→brief flow (GIF/WebM) — this is the hero asset
- [ ] Real snippets pulled from repo, verified against shipped code
- [ ] Meta description + OG image
- [ ] Publish → then uncomment the blog-links block in index.html
