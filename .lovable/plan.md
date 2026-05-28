## Goal

Make Aurora Eyes the definitive resource for tarot **spread interpretation** and contextual meaning queries. I'll extend your existing data-driven SEO system (`src/data/seoData.ts` → template pages → sitemap) rather than inventing parallel infrastructure, so everything stays consistent, fast, and crawlable.

This is large, so I'll deliver it in 4 phases. You can approve the whole thing or tell me to start with a subset (I'd recommend Phase 1 + 3 first for the biggest impact).

---

## Phase 1 — Cornerstone interpretation pages

A new data file `src/data/interpretationGuides.ts` holding rich, structured content (intro, deep sections, worked examples, FAQs, related links) for these 10 pages, rendered by one new template `src/pages/InterpretationGuide.tsx`:

```text
/tarot-spread-interpretation        (pillar — links to all others)
/celtic-cross-tarot-spread
/how-to-read-tarot-spreads
/why-my-tarot-spread-doesnt-make-sense
/three-card-tarot-spread-meaning
/past-present-future-tarot-spread
/how-to-interpret-contradictory-tarot-cards
/what-do-multiple-aces-mean-in-tarot
/how-to-read-reversals-in-a-spread
/best-tarot-spreads-for-love-career-clarity
```

Each page: single H1, conversational H2/H3s, a featured-snippet `SnippetBox` answer up top, worked card examples, an FAQ block, breadcrumbs, and contextual internal links. Schema: `Article` + `FAQPage` + `BreadcrumbList` (using your existing `generateFAQJsonLd` / `generateBreadcrumbJsonLd` helpers). `/tarot-spread-interpretation` acts as the cluster hub linking down to every supporting page and up from `/tarot-guide` + `/tarot-spreads`.

Content tone follows your memory rules: psychologically grounded, no spiritual jargon ("divine", "energy", "universe is guiding you"), no fluff.

## Phase 2 — Programmatic long-tail system

Two generators in a new `src/data/programmaticSeo.ts`, each producing unique (not thin) interpretation logic by composing real card data + position semantics:

**A. Card-in-position pages** — `/<card-slug>-in-<position>-position`
- Positions: `past`, `present`, `future`, `obstacle`, `outcome`, `advice`, `hopes-fears`, `foundation`.
- Generated for all 22 Major Arcana × 8 positions (176 pages) to start; expandable to the full 78.
- Uniqueness: combines the card's upright/reversed meaning with position-specific framing (e.g. "outcome" reads forward-looking, "obstacle" reads as friction), plus reversal note, "what to do" guidance, and links to the card meaning + relevant spread guides.
- Template: `src/pages/CardPositionPage.tsx`.

**B. Topic three-card spreads** — `/three-card-spread-<topic>`
- Topics: `love`, `career`, `reconciliation`, `decision-making`, `money`, `new-relationship`, `self-growth`, `yes-no`.
- Each defines its own position labels + interpretation guidance + example + FAQ.
- Template: `src/pages/TopicSpreadPage.tsx`.

Both interlink intelligently (card-position → its spread guides and card meaning; topic-spread → the interpretation pillar and the live tool).

## Phase 3 — "What Does My Spread Mean?" interactive tool

New route `/what-does-my-spread-mean` (`src/pages/SpreadInterpreter.tsx`), linked prominently from the homepage, the pillar page, and `/tarot-spreads`.

Inputs (premium, mobile-first UI using your existing design tokens / `reading-panel` style):
- Spread type (3-card, Celtic Cross, single, custom)
- Card pickers per position (reuse `tarotDeck`), with reversal toggles
- The question being asked

Output — a synthesized interpretation rendered with markdown:
- Overall story / synthesis
- Dominant energies (suit + Major Arcana density, computed client-side)
- Emotional themes
- Contradictions explained (opposing cards detected)
- Card-interaction analysis
- Grounded guidance

I'll extend the existing `divination-reading` edge function with a `type: "spread-synthesis"` branch (new system prompt following your tone rules) so it uses Lovable AI — no new keys. A client-side rule-based summary (suit/number/arcana tallies) renders instantly even before/without AI, boosting engagement signals. Results are shareable and cached via your existing `readingCache`.

## Phase 4 — Technical SEO wiring

- Register all new routes in `src/App.tsx` (mapping over the new data arrays, mirroring the `questionPages` pattern).
- Extend `scripts/generateSitemap.ts` **and** `getAllSEOUrls()` in `seoData.ts` with every new URL.
- Add the new clusters to `/tarot-guide`, `/tarot-spreads`, the HTML sitemap, and `TopicalClusterNav` for crawlable internal linking.
- Breadcrumbs + canonical + OG + JSON-LD on every new page (reusing `SEOHead`).
- Keep Core Web Vitals: static content, no heavy client work, images with explicit dimensions.
- After build, mark the relevant SEO findings addressed.

---

## Technical notes

- All new pages are data-driven templates (3 new templates + the tool), so adding/expanding content later is just editing data arrays.
- No DB schema changes needed. The tool reuses the existing edge function + AI gateway.
- `src/integrations/supabase/*` and `.env` untouched.
- Sitemap base stays `https://auroraeyes.lovable.app`.
- New pages will need a republish to go live on the production domain.

## Suggested sequencing

1. **Phase 1 + Phase 3** first (pillar content + the interactive tool) — highest traffic + engagement impact.
2. **Phase 2** (programmatic scale) next.
3. **Phase 4** wiring is done incrementally alongside each phase.

Tell me to proceed with everything, or to start with a specific phase/subset.