import { tarotDeck } from "../src/data/tarotDeck";
import { cardCombinations } from "../src/data/tarotCombinations";
import { elderFuthark } from "../src/data/runes";
import { questionPages, spreadGuides, generateCombinationPages, generateComparisonPages } from "../src/data/seoData";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE = "https://auroraeyes.lovable.app";
const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

interface SitemapUrl {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

function buildXml(urls: SitemapUrl[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  urls.forEach(u => {
    xml += `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n`;
    if (u.lastmod) xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `  </url>\n`;
  });
  xml += `</urlset>`;
  return xml;
}

const allUrls: SitemapUrl[] = [];

// Core pages
const corePages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/free-tarot-reading", changefreq: "weekly", priority: "0.9" },
  { path: "/yes-no-tarot-reading", changefreq: "weekly", priority: "0.9" },
  { path: "/pick-a-card-reading", changefreq: "weekly", priority: "0.9" },
  { path: "/rune-reading", changefreq: "weekly", priority: "0.9" },
  { path: "/angel-card-reading", changefreq: "weekly", priority: "0.9" },
  { path: "/tarot-card-meanings", changefreq: "monthly", priority: "0.8" },
  { path: "/rune-meanings", changefreq: "monthly", priority: "0.8" },
  { path: "/daily-tarot-card", changefreq: "daily", priority: "0.8" },
  { path: "/daily-rune", changefreq: "daily", priority: "0.7" },
  { path: "/daily-angel-message", changefreq: "daily", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/tarot-guide", changefreq: "monthly", priority: "0.9" },
  { path: "/rune-guide", changefreq: "monthly", priority: "0.8" },
  { path: "/angel-cards-guide", changefreq: "monthly", priority: "0.8" },
  { path: "/tarot-spreads", changefreq: "monthly", priority: "0.8" },
  { path: "/tarot-combinations", changefreq: "monthly", priority: "0.8" },
  { path: "/tarot-comparisons", changefreq: "monthly", priority: "0.8" },
  { path: "/daily-tarot-reading", changefreq: "daily", priority: "0.9" },
  { path: "/tarot-reading-archive", changefreq: "daily", priority: "0.7" },
  { path: "/sitemap-html", changefreq: "weekly", priority: "0.5" },
  { path: "/explore", changefreq: "weekly", priority: "0.7" },
  { path: "/talk-to-a-reader", changefreq: "monthly", priority: "0.6" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: "/methodology", changefreq: "monthly", priority: "0.4" },
  { path: "/editorial-policy", changefreq: "monthly", priority: "0.4" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
  { path: "/horary-reading", changefreq: "weekly", priority: "0.8" },
  { path: "/horary-astrology", changefreq: "monthly", priority: "0.7" },
];
corePages.forEach(p => allUrls.push({ loc: `${BASE}${p.path}`, changefreq: p.changefreq, priority: p.priority }));

// Question pages
questionPages.forEach(q => allUrls.push({ loc: `${BASE}/${q.slug}`, changefreq: "monthly", priority: "0.8" }));

// Spread guides
spreadGuides.forEach(s => allUrls.push({ loc: `${BASE}/tarot-spreads/${s.slug}`, changefreq: "monthly", priority: "0.7" }));

// Zodiac
const signs = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"];
signs.forEach(s => allUrls.push({ loc: `${BASE}/zodiac/${s}-tarot-reading`, changefreq: "monthly", priority: "0.6" }));

// Blog
const blogSlugs = ["how-tarot-readings-work","major-arcana-guide","how-rune-casting-works","angel-card-guidance-beginners","tarot-spreads-explained","reversed-tarot-cards","zodiac-and-tarot-connection","daily-divination-practice"];
blogSlugs.forEach(s => allUrls.push({ loc: `${BASE}/blog/${s}`, changefreq: "monthly", priority: "0.5" }));

// Tarot card meanings
tarotDeck.forEach(c => allUrls.push({ loc: `${BASE}/tarot-card-meanings/${slugify(c.name)}`, changefreq: "monthly", priority: "0.6" }));
const contexts = ["love", "career", "advice", "yes-or-no"];
tarotDeck.filter(c => c.arcana === "Major").forEach(c => {
  contexts.forEach(ctx => allUrls.push({ loc: `${BASE}/tarot-card-meanings/${slugify(c.name)}/${ctx}`, changefreq: "monthly", priority: "0.5" }));
});

// Rune meanings
elderFuthark.forEach(r => allUrls.push({ loc: `${BASE}/rune-meanings/${r.name.toLowerCase()}`, changefreq: "monthly", priority: "0.6" }));

// Combinations & comparisons
generateCombinationPages().forEach(c => allUrls.push({ loc: `${BASE}/tarot-combinations/${c.slug}`, changefreq: "monthly", priority: "0.6" }));
generateComparisonPages().forEach(c => allUrls.push({ loc: `${BASE}/tarot-comparisons/${c.slug}`, changefreq: "monthly", priority: "0.6" }));

// Daily readings (last 90 days)
const today = new Date();
for (let i = 0; i < 90; i++) {
  const d = new Date(today);
  d.setDate(d.getDate() - i);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const lastmod = d.toISOString().split("T")[0];
  allUrls.push({ loc: `${BASE}/daily-tarot/${y}-${m}-${day}`, changefreq: "daily", priority: "0.5", lastmod });
}

// Write single flat sitemap.xml
writeFileSync(resolve(__dirname, "../public/sitemap.xml"), buildXml(allUrls), "utf-8");

console.log(`✅ Generated sitemap.xml with ${allUrls.length} URLs`);
