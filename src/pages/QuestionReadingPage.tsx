import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import { questionPages } from "@/data/seoData";

const QuestionReadingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = questionPages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Page Not Found</h1>
        <Link to="/" className="text-primary hover:underline">← Home</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Tarot Guide", href: "/tarot-guide" },
    { label: page.title },
  ];

  const relatedLinks = [
    { to: "/free-tarot-reading", label: "Free Tarot Reading" },
    { to: "/yes-no-tarot-reading", label: "Yes/No Tarot" },
    { to: "/tarot-card-meanings", label: "Card Meanings" },
    ...page.relatedSlugs.map((s) => {
      const related = questionPages.find((p) => p.slug === s);
      return related ? { to: `/${related.slug}`, label: related.title.replace(" — Free", "").replace("Free ", "") } : null;
    }).filter(Boolean) as { to: string; label: string }[],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    breadcrumb: generateBreadcrumbJsonLd(breadcrumbs),
  };

  return (
    <>
      <SEOHead
        title={page.title}
        description={page.description}
        canonicalPath={`/${page.slug}`}
        jsonLd={jsonLd}
      />
      <motion.div className="max-w-3xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-4 tracking-wider">{page.h1}</h1>

        <div className="space-y-4 mb-8">
          {page.intro.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
          ))}
        </div>

        {/* CTA to actual reading */}
        <div className="reading-panel rounded-xl p-6 text-center mb-8">
          <h2 className="font-heading text-lg text-foreground mb-2">Ready for Your Reading?</h2>
          <p className="text-sm text-muted-foreground mb-4">Focus on your question and let the cards guide you.</p>
          <Link
            to="/free-tarot-reading"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm hover:opacity-90 transition-opacity"
          >
            Start Free Tarot Reading
          </Link>
        </div>

        <FAQSection items={page.faq} />
        <InternalLinks links={relatedLinks} />
      </motion.div>
    </>
  );
};

export default QuestionReadingPage;
