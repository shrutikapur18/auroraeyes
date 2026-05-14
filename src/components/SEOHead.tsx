import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile" | "book";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = "Aurora Eyes";
const SITE_URL = "https://auroraeyes.com";
const DEFAULT_OG = "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/020e7e26-9809-4f70-a334-8f84625d7d39";

const toAbsolute = (url: string) =>
  url.startsWith("http://") || url.startsWith("https://") ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;

const SEOHead = ({ title, description, canonicalPath, ogImage, ogType = "website", jsonLd }: SEOHeadProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;
  const image = toAbsolute(ogImage || DEFAULT_OG);

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:image", image, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    if (canonical) {
      setMeta("og:url", canonical, "property");
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // Global Organization + WebSite schema (always present)
    const globalLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/icon-512.png`,
          sameAs: ["https://www.instagram.com/auroraeyes111"],
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          publisher: { "@id": `${SITE_URL}/#organization` },
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/tarot-card-meanings?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ],
    };
    const existingGlobal = document.getElementById("json-ld-global");
    if (existingGlobal) existingGlobal.remove();
    const globalScript = document.createElement("script");
    globalScript.id = "json-ld-global";
    globalScript.type = "application/ld+json";
    globalScript.textContent = JSON.stringify(globalLd);
    document.head.appendChild(globalScript);

    // Remove any previous page-specific JSON-LD blocks
    document.querySelectorAll('script[data-jsonld="seo"]').forEach((n) => n.remove());

    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      blocks.forEach((block, i) => {
        const script = document.createElement("script");
        script.setAttribute("data-jsonld", "seo");
        script.id = `json-ld-seo-${i}`;
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(block);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.querySelectorAll('script[data-jsonld="seo"]').forEach((n) => n.remove());
    };
  }, [fullTitle, description, canonical, image, jsonLd]);

  return null;
};

export default SEOHead;
