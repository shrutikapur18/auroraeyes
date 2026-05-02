/**
 * Post-build prerender script (custom Puppeteer driver).
 *
 * Spins up a tiny static server on dist/, then for each high-priority route
 * launches a Puppeteer page, waits for React + SEOHead to inject metadata
 * (signaled by `data-prerender-ready` on <html>), grabs the full HTML, and
 * writes it to dist/<route>/index.html so Vercel serves prerendered pages to
 * crawlers and social previews.
 *
 * We bypass @prerenderer/renderer-puppeteer because its internal Promise.race
 * triggers "Promise was collected" against modern puppeteer-core versions.
 *
 * Opt-in via PRERENDER=1.
 */
import puppeteer from "puppeteer";
import http from "http";
import { mkdirSync, writeFileSync, readFileSync, existsSync, statSync } from "fs";
import { resolve, dirname, join, extname } from "path";
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
  ...tarotDeck.filter((c) => c.arcana === "Major").map((c) => `/tarot-card-meanings/${slugify(c.name)}`),
];

// --- Strip SW from index.html before prerendering (it interferes with Puppeteer
// page lifecycle); we re-inject it in the rendered output below.
const indexPath = join(distDir, "index.html");
const originalIndex = readFileSync(indexPath, "utf-8");
const cleanIndex = originalIndex
  .replace(/<script[^>]*src="[^"]*registerSW\.js[^"]*"[^>]*><\/script>/g, "")
  .replace(/<script>[^<]*workbox[\s\S]*?<\/script>/gi, "");
writeFileSync(indexPath, cleanIndex, "utf-8");

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

function startStaticServer(): Promise<{ server: http.Server; port: number }> {
  return new Promise((resolvePromise) => {
    const server = http.createServer((req, res) => {
      const urlPath = (req.url || "/").split("?")[0];
      let filePath = join(distDir, urlPath);
      try {
        if (existsSync(filePath) && statSync(filePath).isDirectory()) {
          filePath = join(filePath, "index.html");
        }
        if (!existsSync(filePath)) {
          // SPA fallback for client-side routes.
          filePath = join(distDir, "index.html");
        }
        const data = readFileSync(filePath);
        res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      resolvePromise({ server, port });
    });
  });
}

async function main() {
  console.log(`[prerender] Preparing to render ${routes.length} routes…`);
  const { server, port } = await startStaticServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  let written = 0;
  let failed = 0;
  try {
    for (const route of routes) {
      const page = await browser.newPage();
      try {
        await page.setViewport({ width: 1280, height: 800 });
        // Block requests we don't need for HTML capture (analytics, fonts, images).
        await page.setRequestInterception(true);
        page.on("request", (req) => {
          const url = req.url();
          const type = req.resourceType();
          if (
            type === "image" ||
            type === "media" ||
            type === "font" ||
            url.includes("googletagmanager") ||
            url.includes("google-analytics") ||
            url.includes("cdn.jsdelivr.net")
          ) {
            req.abort();
          } else {
            req.continue();
          }
        });

        await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
        // Wait for React to mount and SEOHead to inject head tags.
        await page.waitForSelector("html[data-prerender-ready]", { timeout: 15000 });
        let html = await page.content();

        // Re-inject service worker + manifest so PWA still works in production.
        if (!/registerSW\.js/.test(html)) {
          html = html.replace(
            "</head>",
            `  <link rel="manifest" href="/manifest.webmanifest">\n  <script type="module" src="/registerSW.js"></script>\n</head>`
          );
        }

        const outDir = route === "/" ? distDir : join(distDir, route);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, "index.html"), html.trim(), "utf-8");
        written++;
        if (written % 10 === 0) console.log(`[prerender] ${written}/${routes.length}…`);
      } catch (err) {
        failed++;
        console.warn(`[prerender] ✗ ${route}: ${(err as Error).message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`[prerender] ✓ Wrote ${written} files (${failed} failed)`);
  if (written === 0) {
    // Restore original index so build artifact is still valid.
    writeFileSync(indexPath, originalIndex, "utf-8");
    process.exit(1);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("[prerender] Fatal:", err);
  writeFileSync(indexPath, originalIndex, "utf-8");
  process.exit(1);
});
