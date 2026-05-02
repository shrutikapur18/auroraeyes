/**
 * Post-build prerender script.
 *
 * Runs after `vite build`. Spins up Puppeteer against the static dist/ output,
 * navigates to each high-priority SEO route, waits for React + SEOHead to inject
 * <title>, meta tags, canonical, and JSON-LD into the document head, then writes
 * the rendered HTML to dist/<route>/index.html.
 *
 * Vercel's static SPA serving will then prefer these prerendered files for
 * crawlers and social previews, while client-side React Router still drives
 * subsequent in-app navigation. Long-tail routes (all 78 cards × contexts,
 * combinations, daily archives, etc.) remain client-rendered — Googlebot
 * executes JS and they're listed in sitemap.xml.
 */
import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { tarotDeck } from "../src/data/tarotDeck";
import { questionPages, spreadGuides } from "../src/data/seoData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, "../dist");

// Opt-in: only run when PRERENDER=1. Keeps Vercel/CI builds fast and avoids
// failing the deploy if Chromium isn't available in the build environment.
if (process.env.PRERENDER !== "1") {
  console.log("[prerender] Skipped (set PRERENDER=1 to enable).");
  process.exit(0);
}

if (!existsSync(distDir)) {
  console.error("[prerender] dist/ not found — run `vite build` first.");
  process.exit(1);
}

const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

// High-value SEO routes to prerender at build time.
const routes: string[] = [
  // Core landing
  "/",
  "/explore",
  "/talk-to-a-reader",
  "/about",
  "/methodology",
  "/editorial-policy",
  "/privacy-policy",
  "/terms-of-service",
  "/disclaimer",
  // Primary reading flows
  "/free-tarot-reading",
  "/yes-no-tarot-reading",
  "/pick-a-card-reading",
  "/rune-reading",
  "/angel-card-reading",
  "/horary-reading",
  "/horary-astrology",
  "/daily-tarot-reading",
  "/tarot-reading-archive",
  // Daily guidance
  "/daily-tarot-card",
  "/daily-rune",
  "/daily-angel-message",
  // Hub / pillar
  "/tarot-guide",
  "/rune-guide",
  "/angel-cards-guide",
  "/tarot-spreads",
  "/tarot-card-meanings",
  "/rune-meanings",
  "/tarot-combinations",
  "/tarot-comparisons",
  "/blog",
  "/sitemap-html",
  // All topical question readings
  ...questionPages.map((q) => `/${q.slug}`),
  // All spread guides
  ...spreadGuides.map((s) => `/tarot-spreads/${s.slug}`),
  // 22 Major Arcana card meaning pages
  ...tarotDeck
    .filter((c) => c.arcana === "Major")
    .map((c) => `/tarot-card-meanings/${slugify(c.name)}`),
];

console.log(`[prerender] Preparing to render ${routes.length} routes…`);

const prerenderer = new Prerenderer({
  staticDir: distDir,
  renderer: new PuppeteerRenderer({
    renderAfterDocumentEvent: "render-event",
    maxConcurrentRoutes: 4,
    headless: true,
    timeout: 30000,
    launchOptions: {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    },
  }),
});

(async () => {
  try {
    await prerenderer.initialize();
    const rendered = await prerenderer.renderRoutes(routes);

    let written = 0;
    for (const r of rendered) {
      // Strip the inline service-worker registration script — we don't want the
      // SW to claim control before React hydrates the prerendered HTML.
      let html = r.html.replace(
        /<script[^>]*src="[^"]*registerSW\.js[^"]*"[^>]*><\/script>/g,
        ""
      );
      // Also remove the workbox auto-register snippet vite-plugin-pwa injects.
      html = html.replace(
        /<script>[^<]*workbox[\s\S]*?<\/script>/gi,
        ""
      );

      const routePath = r.route === "/" ? "/" : r.route;
      const outDir =
        routePath === "/" ? distDir : join(distDir, routePath);
      mkdirSync(outDir, { recursive: true });
      const outFile = join(outDir, "index.html");
      writeFileSync(outFile, html.trim(), "utf-8");
      written++;
    }

    console.log(`[prerender] ✓ Wrote ${written} prerendered HTML files`);
    await prerenderer.destroy();
    process.exit(0);
  } catch (err) {
    console.error("[prerender] Failed:", err);
    await prerenderer.destroy();
    process.exit(1);
  }
})();
