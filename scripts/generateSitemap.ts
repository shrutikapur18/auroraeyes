import { getAllSEOUrls } from "../src/data/seoData";

/**
 * Dynamic Sitemap Generator
 * Run: npx tsx scripts/generateSitemap.ts
 * Or import getAllSEOUrls() at build time.
 */
const urls = getAllSEOUrls();

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach((u) => {
  xml += `  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>\n`;
});

xml += `</urlset>`;

// Write to public/sitemap.xml
import { writeFileSync } from "fs";
import { resolve } from "path";
writeFileSync(resolve(__dirname, "../public/sitemap.xml"), xml, "utf-8");

console.log(`✅ Generated sitemap with ${urls.length} URLs`);
