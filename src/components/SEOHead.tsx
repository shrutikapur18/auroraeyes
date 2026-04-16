import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = "Aurora Eyes";
const SITE_URL = "https://auroraeyes.com";
const DEFAULT_OG = "/og-image.png";

const SEOHead = ({ title, description, canonicalPath, ogImage, jsonLd }: SEOHeadProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;
  const image = ogImage || DEFAULT_OG;

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
    setMeta("og:type", "website", "property");
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

    // Page-specific JSON-LD
    if (jsonLd) {
      const existingLd = document.getElementById("json-ld-seo");
      if (existingLd) existingLd.remove();
      const script = document.createElement("script");
      script.id = "json-ld-seo";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const existingLd = document.getElementById("json-ld-seo");
      if (existingLd) existingLd.remove();
    };
  }, [fullTitle, description, canonical, image, jsonLd]);

  return null;
};

export default SEOHead;
