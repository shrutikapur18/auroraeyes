import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import InternalLinks from "@/components/InternalLinks";
import ReadingCTA from "@/components/ReadingCTA";
import SnippetBox from "@/components/SnippetBox";
import HoraryHomepageSection from "@/components/HoraryHomepageSection";
import { horaryContentPages } from "@/data/horaryContentPages";

const HoraryContentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = horaryContentPages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Page Not Found</h1>
        <Link to="/horary-astrology" className="text-primary hover:underline">
          ← Horary Astrology Guide
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Horary Astrology", href: "/horary-astrology" },
    { label: page.h1 },
  ];

  const relatedLinks = [
    { to: "/horary-reading", label: "Free Horary Reading" },
    { to: "/horary-astrology", label: "Horary Astrology Guide" },
    { to: "/free-tarot-reading", label: "Free Tarot Reading" },
    { to: "/rune-reading", label: "Rune Reading" },
    { to: "/angel-card-reading", label: "Angel Card Reading" },
    ...page.relatedSlugs
      .map((s) => {
        const related = horaryContentPages.find((p) => p.slug === s);
        return related ? { to: `/${related.slug}`, label: related.h1.replace(" — Horary Astrology", "") } : null;
      })
      .filter(Boolean) as { to: string; label: string }[],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    breadcrumb: generateBreadcrumbJsonLd(breadcrumbs),
    mainEntity: generateFAQJsonLd(page.faq).mainEntity,
  };

  return (
    <>
      <SEOHead
        title={page.title}
        description={page.description}
        canonicalPath={`/${page.slug}`}
        jsonLd={jsonLd}
      />
      <motion.div
        className="max-w-3xl mx-auto pt-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-4 tracking-wider">
          {page.h1}
        </h1>

        {/* Featured snippet */}
        <SnippetBox
          question={page.faq[0]?.q || page.h1}
          answer={page.faq[0]?.a || page.intro[0]}
        />

        {/* Intro */}
        <div className="space-y-4 mb-8">
          {page.intro.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Content sections */}
        <div className="space-y-6 mb-10">
          {page.sections.map((s, i) => (
            <motion.section
              key={s.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="reading-panel rounded-xl p-5"
            >
              <h2 className="font-heading text-base text-primary tracking-wider mb-2">
                {s.heading}
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.content}</p>
            </motion.section>
          ))}
        </div>

        {/* Horary tool integration */}
        {page.showHoraryTool ? (
          <section className="mb-10">
            <h2 className="font-heading text-lg gold-text text-center mb-4 tracking-wider">
              Try Your Horary Reading Now
            </h2>
            <HoraryHomepageSection />
          </section>
        ) : (
          <ReadingCTA
            title="Ask the Stars Your Question"
            description="Focus on your question and receive a horary chart with AI-powered interpretation."
            to="/horary-reading"
            label="Get Your Horary Reading"
          />
        )}

        <FAQSection items={page.faq} />
        <InternalLinks links={relatedLinks} />
      </motion.div>
    </>
  );
};

export default HoraryContentPage;
