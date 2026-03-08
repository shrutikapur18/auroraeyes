import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = "Mystic Divination";
const SITE_URL = "https://tarotguidance.lovable.app";
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

    // JSON-LD
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
