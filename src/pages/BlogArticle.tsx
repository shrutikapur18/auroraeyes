import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import ReadingCTA from "@/components/ReadingCTA";
import { blogArticles } from "@/data/blogArticles";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? blogArticles[slug] : undefined;

  // Generate fallback article for unknown slugs — never 404
  const displayArticle = article ?? {
    title: (slug || "Article").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    description: `Learn more about ${(slug || "this topic").replace(/-/g, " ")} in our divination guide.`,
    content: [
      `This article about ${(slug || "this topic").replace(/-/g, " ")} is coming soon. We're preparing in-depth content on this subject.`,
      "In the meantime, explore our other guides and readings to deepen your understanding of tarot, runes, angel cards, and horary astrology.",
    ],
    faq: [],
    relatedLinks: [
      { to: "/blog", label: "Browse All Articles" },
      { to: "/free-tarot-reading", label: "Get a Free Tarot Reading" },
      { to: "/tarot-guide", label: "Tarot Guide" },
    ],
  };

  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: displayArticle.title.length > 40 ? displayArticle.title.slice(0, 37) + "…" : displayArticle.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: displayArticle.title,
    description: displayArticle.description,
    ...(displayArticle.faq.length > 0 ? { mainEntity: generateFAQJsonLd(displayArticle.faq).mainEntity } : {}),
  };

  return (
    <>
      <SEOHead title={displayArticle.title} description={displayArticle.description} canonicalPath={`/blog/${slug}`} jsonLd={jsonLd} />
      <motion.div className="max-w-3xl mx-auto pt-8 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={breadcrumbs} />

        <article className="reading-panel rounded-xl p-6 md:p-8">
          <h1 className="font-heading text-2xl md:text-3xl gold-text mb-6">{displayArticle.title}</h1>
          {displayArticle.content.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground font-body leading-relaxed mb-4">{p}</p>
          ))}
        </article>

        <ReadingCTA />

        {displayArticle.faq.length > 0 && <FAQSection items={displayArticle.faq} />}

        <div className="mt-8 reading-panel rounded-xl p-5">
          <h3 className="font-heading text-sm gold-text mb-3">Related</h3>
          <div className="flex flex-wrap gap-2">
            {displayArticle.relatedLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-xs text-primary hover:underline">{l.label} →</Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogArticle;
