import { tarotDeck } from "../src/data/tarotDeck";
import { cardCombinations } from "../src/data/tarotCombinations";
import { elderFuthark } from "../src/data/runes";
import { questionPages, spreadGuides, generateCombinationPages, generateComparisonPages } from "../src/data/seoData";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const BASE = "https://tarotguidance.lovable.app";
const months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
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

function buildSitemapIndex(sitemaps: string[]): string {
  const now = new Date().toISOString().split("T")[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  sitemaps.forEach(s => {
    xml += `  <sitemap>\n    <loc>${BASE}${s}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>\n`;
  });
  xml += `</sitemapindex>`;
  return xml;
}

// Ensure sitemaps directory exists
mkdirSync(resolve(__dirname, "../public/sitemaps"), { recursive: true });

// 1. Core pages
const coreUrls: SitemapUrl[] = [
  { loc: `${BASE}/`, changefreq: "weekly", priority: "1.0" },
  { loc: `${BASE}/free-tarot-reading`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/yes-no-tarot-reading`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/pick-a-card-reading`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/rune-reading`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/angel-card-reading`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/tarot-card-meanings`, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE}/rune-meanings`, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE}/daily-tarot-card`, changefreq: "daily", priority: "0.8" },
  { loc: `${BASE}/daily-rune`, changefreq: "daily", priority: "0.7" },
  { loc: `${BASE}/daily-angel-message`, changefreq: "daily", priority: "0.7" },
  { loc: `${BASE}/blog`, changefreq: "weekly", priority: "0.7" },
  { loc: `${BASE}/tarot-guide`, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE}/rune-guide`, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE}/angel-cards-guide`, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE}/tarot-spreads`, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE}/tarot-combinations`, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE}/tarot-comparisons`, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE}/daily-tarot-reading`, changefreq: "daily", priority: "0.9" },
  { loc: `${BASE}/tarot-reading-archive`, changefreq: "daily", priority: "0.7" },
  { loc: `${BASE}/sitemap-html`, changefreq: "weekly", priority: "0.5" },
];
// Question pages
questionPages.forEach(q => coreUrls.push({ loc: `${BASE}/${q.slug}`, changefreq: "monthly", priority: "0.8" }));
// Spread guides
spreadGuides.forEach(s => coreUrls.push({ loc: `${BASE}/tarot-spreads/${s.slug}`, changefreq: "monthly", priority: "0.7" }));
// Zodiac
const signs = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"];
signs.forEach(s => coreUrls.push({ loc: `${BASE}/zodiac/${s}-tarot-reading`, changefreq: "monthly", priority: "0.6" }));
// Blog
const blogSlugs = ["how-tarot-readings-work","major-arcana-guide","how-rune-casting-works","angel-card-guidance-beginners","tarot-spreads-explained","reversed-tarot-cards","zodiac-and-tarot-connection","daily-divination-practice"];
blogSlugs.forEach(s => coreUrls.push({ loc: `${BASE}/blog/${s}`, changefreq: "monthly", priority: "0.5" }));

writeFileSync(resolve(__dirname, "../public/sitemaps/sitemap-core.xml"), buildXml(coreUrls), "utf-8");

// 2. Tarot card meanings
const meaningUrls: SitemapUrl[] = [];
tarotDeck.forEach(c => meaningUrls.push({ loc: `${BASE}/tarot-card-meanings/${slugify(c.name)}`, changefreq: "monthly", priority: "0.6" }));
const contexts = ["love", "career", "advice", "yes-or-no"];
tarotDeck.filter(c => c.arcana === "Major").forEach(c => {
  contexts.forEach(ctx => meaningUrls.push({ loc: `${BASE}/tarot-card-meanings/${slugify(c.name)}/${ctx}`, changefreq: "monthly", priority: "0.5" }));
});
elderFuthark.forEach(r => meaningUrls.push({ loc: `${BASE}/rune-meanings/${r.name.toLowerCase()}`, changefreq: "monthly", priority: "0.6" }));

writeFileSync(resolve(__dirname, "../public/sitemaps/sitemap-meanings.xml"), buildXml(meaningUrls), "utf-8");

// 3. Combinations & comparisons
const comboUrls: SitemapUrl[] = [];
generateCombinationPages().forEach(c => comboUrls.push({ loc: `${BASE}/tarot-combinations/${c.slug}`, changefreq: "monthly", priority: "0.6" }));
generateComparisonPages().forEach(c => comboUrls.push({ loc: `${BASE}/tarot-comparisons/${c.slug}`, changefreq: "monthly", priority: "0.6" }));

writeFileSync(resolve(__dirname, "../public/sitemaps/sitemap-combinations.xml"), buildXml(comboUrls), "utf-8");

// 4. Daily readings (last 90 days)
const dailyUrls: SitemapUrl[] = [];
const today = new Date();
for (let i = 0; i < 90; i++) {
  const d = new Date(today);
  d.setDate(d.getDate() - i);
  const dateSlug = `${months[d.getMonth()]}-${d.getDate()}`;
  const lastmod = d.toISOString().split("T")[0];
  dailyUrls.push({ loc: `${BASE}/tarot-reading-for-${dateSlug}`, changefreq: "daily", priority: "0.5", lastmod });
}

writeFileSync(resolve(__dirname, "../public/sitemaps/sitemap-daily.xml"), buildXml(dailyUrls), "utf-8");

// 5. Sitemap index
const sitemapIndex = buildSitemapIndex([
  "/sitemaps/sitemap-core.xml",
  "/sitemaps/sitemap-meanings.xml",
  "/sitemaps/sitemap-combinations.xml",
  "/sitemaps/sitemap-daily.xml",
]);
writeFileSync(resolve(__dirname, "../public/sitemap.xml"), sitemapIndex, "utf-8");

const total = coreUrls.length + meaningUrls.length + comboUrls.length + dailyUrls.length;
console.log(`✅ Generated sitemap index with 4 sub-sitemaps (${total} total URLs)`);
