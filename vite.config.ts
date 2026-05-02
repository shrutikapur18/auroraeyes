import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import VitePluginPrerender from "vite-plugin-prerender";
import Renderer from "@prerenderer/renderer-puppeteer";
import { tarotDeck } from "./src/data/tarotDeck";
import { questionPages, spreadGuides } from "./src/data/seoData";

const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

// High-value SEO routes to prerender at build time.
// We deliberately exclude the long-tail (all 78 cards × contexts, daily archives,
// combinations, comparisons) — those still get indexed via client-side rendering
// (Googlebot executes JS) and via the sitemap, but skipping them keeps the
// Vercel build well under timeout limits.
const prerenderRoutes = [
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
  // All topical question readings (high SEO intent)
  ...questionPages.map((q) => `/${q.slug}`),
  // All spread guides
  ...spreadGuides.map((s) => `/tarot-spreads/${s.slug}`),
  // 22 Major Arcana card meaning pages (highest-intent card pages)
  ...tarotDeck
    .filter((c) => c.arcana === "Major")
    .map((c) => `/tarot-card-meanings/${slugify(c.name)}`),
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
      navigateFallbackDenylist: [/^\/~oauth/],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/tarot-card-img/,
            handler: "CacheFirst",
            options: {
              cacheName: "tarot-card-images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: "Aurora Eyes",
        short_name: "Aurora Eyes",
        start_url: "/",
        display: "standalone",
        background_color: "#070A18",
        theme_color: "#070A18",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
    // Only prerender on production builds (not dev / build:dev)
    mode === "production" && VitePluginPrerender({
      staticDir: path.join(__dirname, "dist"),
      routes: prerenderRoutes,
      renderer: new Renderer({
        renderAfterDocumentEvent: "render-event",
        maxConcurrentRoutes: 4,
        headless: true,
        // Ignore PWA service worker during prerender so it doesn't intercept
        skipThirdPartyRequests: false,
      }),
      postProcess(renderedRoute: { route: string; html: string; outputPath: string }) {
        // Strip the inline service-worker registration on prerendered pages so
        // the static HTML doesn't trigger SW reloads before hydration.
        renderedRoute.html = renderedRoute.html.replace(
          /<script[^>]*src="\/registerSW\.js"[^>]*><\/script>/g,
          ""
        );
        return renderedRoute;
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
