/**
 * Post-build prerender script.
 *
 * Runs after `vite build`. Spins up Puppeteer against the static dist/ output,
 * navigates to each high-priority SEO route, waits for React + SEOHead to inject
 * <title>, meta tags, canonical, and JSON-LD into the document head, then writes
 * the rendered HTML to dist/<route>/index.html.
 *
 * Vercel's static SPA serving prefers these prerendered files for crawlers and
 * social previews, while client-side React Router still drives in-app
 * navigation. Long-tail routes (78 cards × contexts, combinations, daily
 * archives, etc.) remain client-rendered — Googlebot executes JS and they're
 * listed in sitemap.xml.
 *
 * Opt-in via PRERENDER=1 to keep ordinary CI/dev builds fast.
 */
import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";
import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
} from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { tarotDeck } from "../src/data/tarotDeck";
import { questionPages, spreadGuides } from "../src/data/seoData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, "../dist");

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

const routes: string[] = [
  "/",
  "/explore",
  "/talk-to-a-reader",
  "/about",
  "/methodology",
  "/editorial-policy",
  "/privacy-policy",
  "/terms-of-service",
  "/disclaimer",
  "/free-tarot-reading",
  "/yes-no-tarot-reading",
  "/pick-a-card-reading",
  "/rune-reading",
  "/angel-card-reading",
  "/horary-reading",
  "/horary-astrology",
  "/daily-tarot-reading",
  "/tarot-reading-archive",
  "/daily-tarot-card",
  "/daily-rune",
  "/daily-angel-message",
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
  ...questionPages.map((q) => `/${q.slug}`),
  ...spreadGuides.map((s) => `/tarot-spreads/${s.slug}`),
  ...tarotDeck
    .filter((c) => c.arcana === "Major")
    .map((c) => `/tarot-card-meanings/${slugify(c.name)}`),
];

// --- Pre-flight: temporarily strip the SW registration from dist/index.html.
// The PWA service worker, when registered during prerender, races with
// Puppeteer's evaluation context and causes "Promise was collected" errors.
// We remove it before rendering and restore it after.
const indexPath = join(distDir, "index.html");
const originalIndex = readFileSync(indexPath, "utf-8");
const cleanIndex = originalIndex
  .replace(
    /<script[^>]*src="[^"]*registerSW\.js[^"]*"[^>]*><\/script>/g,
    ""
  )
  .replace(/<script>[^<]*workbox[\s\S]*?<\/script>/gi, "")
  .replace(/<link[^>]*rel="manifest"[^>]*>/g, "");
writeFileSync(indexPath, cleanIndex, "utf-8");

console.log(`[prerender] Preparing to render ${routes.length} routes…`);

const prerenderer = new Prerenderer({
  staticDir: distDir,
  renderer: new PuppeteerRenderer({
    renderAfterElementExists: "html[data-prerender-ready]",
    // Serial rendering — eliminates Puppeteer protocol race conditions on
    // shared CDP sessions ("Promise was collected" / dropped contexts).
    maxConcurrentRoutes: 1,
    headless: true,
    timeout: 30000,
    skipThirdPartyRequests: true,
    launchOptions: {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    },
  }),
});

(async () => {
  let exitCode = 0;
  try {
    await prerenderer.initialize();
    const rendered = await prerenderer.renderRoutes(routes);

    let written = 0;
    for (const r of rendered) {
      // Re-inject the SW registration + manifest into the rendered HTML so the
      // PWA still works in production once the page is hydrated.
      let html = r.html;
      if (!/registerSW\.js/.test(html)) {
        html = html.replace(
          "</head>",
          `  <link rel="manifest" href="/manifest.webmanifest">\n  <script type="module" src="/registerSW.js"></script>\n</head>`
        );
      }

      const routePath = r.route === "/" ? "/" : r.route;
      const outDir = routePath === "/" ? distDir : join(distDir, routePath);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "index.html"), html.trim(), "utf-8");
      written++;
    }

    console.log(`[prerender] ✓ Wrote ${written} prerendered HTML files`);
  } catch (err) {
    console.error("[prerender] Failed:", err);
    // Restore the original index.html so the build artifact is still valid.
    writeFileSync(indexPath, originalIndex, "utf-8");
    exitCode = 1;
  } finally {
    await prerenderer.destroy();
    // If render succeeded, dist/index.html was overwritten by the "/" route's
    // prerendered HTML (which already includes SW + manifest above), so no
    // restore needed in the success path.
    process.exit(exitCode);
  }
})();
