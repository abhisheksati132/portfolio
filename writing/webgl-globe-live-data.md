# Correlating Live Data Feeds on a WebGL Globe

> Status: DRAFT — prose complete. Replace the `TODO(you)` slots with real details
> from NewsAtlas (feed list, adapters, costs, measured timings), then publish.

## 1. The globe is the database index

Most dashboards organize data the way their APIs do: a news tab, a weather tab, a
markets tab. The user does the correlation in their head. NewsAtlas inverts that —
**geography is the join key**, and the globe is the query interface. Click a country
and you don't get four tabs; you get one correlated brief for that place.

This reframes Mapbox GL JS from decoration to infrastructure. The globe isn't showing
data, it's *addressing* it: every click resolves to a coordinate, every coordinate
resolves to a region, and every feed answers for that region. If you take one idea
from this post, it's that: pick the dimension your users think in, and make it the
index everything else hangs off.

<!-- TODO(you): one paragraph on region resolution — reverse geocode vs. bounding
     boxes vs. country polygons. Name what you actually shipped and why. -->

## 2. Four feeds, one shape

The feeds in NewsAtlas are heterogeneous by nature: news wires, weather reports,
market data, regional economics. Different formats, different cadences, different
failure modes. The only thing they share is a location — so the normalization layer
forces every feed into one shape:

```ts
// Illustrative — replace with your real normalized type
interface RegionalSignal {
  region: string;       // the join key
  timestamp: number;    // when the reading was taken, not fetched
  source: string;       // which feed it came from
  payload: unknown;     // feed-specific content, rendered per-source
}
```

That `timestamp`-vs-fetched distinction matters: a cached weather reading from ten
minutes ago must not present as live. Each adapter owns the mapping from its feed's
quirks to this shape, and the correlation layer downstream never touches raw feed
formats. New feed? Write one adapter, nothing else changes.

<!-- TODO(you): table of your actual feeds — provider, cadence, quirks.
     Paste your messiest adapter as the worked example; annotate the ugly parts. -->

## 3. Fan out, fail soft

API keys can't live in the browser, so the fetching happens in Vercel serverless
functions — which also gives zero idle cost, the right economics for a side project.
On each region query the functions fan out to all feeds in parallel, and here's the
rule that keeps the UX alive: **every feed gets its own timeout, and a slow feed
degrades the brief instead of freezing the click.** A markets API having a bad minute
should never stop the news brief from rendering.

Caching is per-feed, not per-page: fast-moving feeds get short TTLs, slow-moving
ones get long ones. The cache key includes the region, so popular regions stay warm
for free.

<!-- TODO(you): your actual timeout/TTL values, which feed has been flakiest,
     and what the rate-limit ceilings are. This paragraph is why people bookmark. -->

## 4. The brief is the product

Raw correlated data still isn't the feature — the feature is the ten-point brief. So
NewsAtlas generates it per click, on demand, via Groq's Llama 3.3: fresh data in,
structured summary out. Per-click generation beats pre-generation on both axes that
matter: the brief is never stale, and you pay nothing for regions nobody visits.

Prompt design does the heavy lifting. The prompt constrains output to a fixed
structure (N points, fixed schema) so the frontend can render it without parsing
prose — treat the model as a function with a typed return, not a chatbot. Constrain
the format, verify the shape client-side, and have a fallback render path for the
day the model returns something creative.

<!-- TODO(you): paste your real prompt (redact nothing sensitive — there shouldn't
     be any secrets in it). Add your measured P50/P95 latency and cost per 1,000
     clicks from the Groq dashboard. Real numbers = the most-linked section. -->

## 5. Make it feel instant

Nobody waits for four feeds plus an LLM call without feedback, so the render is
staged: pins and cached context paint immediately on click, live sections fill in as
responses land, and the brief streams into its panel. The PWA shell cache means the
second visit skips the app download entirely — first paint is the globe, not a
spinner.

<!-- TODO(you): measured timings — time-to-globe, time-to-brief. Profile on a mid
     Android phone over 4G if you can; that's the number that impresses. -->

## 6. What I'd do differently

Every shipped system has the paragraph its author writes last. Mine: feed retry
design is still naive, region boundaries inherit data-quality problems from upstream,
and the correlation layer trusts timestamps it doesn't verify. Saying so here is
cheaper than a recruiter finding out in the interview — and it reads as seniority,
not weakness.

<!-- TODO(you): your real list. Two or three honest items beat a polished roadmap. -->

## Try it

- [ ] Live link + 20-second click→brief screen recording (this is the hero asset)
- [ ] Repo link

---

## Pre-publish checklist

- [ ] Every `TODO(you)` resolved — no placeholders, no guessed numbers
- [ ] Screen recording embedded (GIF or WebM, <5MB)
- [ ] Snippets verified against shipped repo code
- [ ] OG image + meta description
- [ ] Publish → uncomment `/writing` links in `index.html:projects-more`
