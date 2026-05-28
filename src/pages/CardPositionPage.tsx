import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import SnippetBox from "@/components/SnippetBox";
import ReadingCTA from "@/components/ReadingCTA";
import { getCardPositionPage, spreadPositions } from "@/data/programmaticSeo";

const CardPositionPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "").split("/")[0];
  const page = getCardPositionPage(slug);

  if (!page) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Page Not Found</h1>
        <Link to="/tarot-spread-interpretation" className="text-primary hover:underline">
          ← Spread Interpretation Hub
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Spread Interpretation", href: "/tarot-spread-interpretation" },
    { label: page.cardName, href: `/tarot-card-meanings/${page.cardSlug}` },
    { label: `${page.positionLabel} Position` },
  ];

  // Same card across other positions, for tight internal linking.
  const otherPositions = spreadPositions
    .filter((p) => p.key !== page.positionKey)
    .slice(0, 5)
    .map((p) => ({
      to: `/${page.cardSlug}-in-${p.key}-position`,
      label: `${page.cardName} — ${p.label}`,
    }));

  const related = [
    { to: `/tarot-card-meanings/${page.cardSlug}`, label: `${page.cardName} Meaning` },
    ...otherPositions,
    { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
    { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.h1,
      description: page.description,
      author: { "@type": "Organization", name: "Aurora Eyes" },
      publisher: { "@type": "Organization", name: "Aurora Eyes" },
    },
    { "@context": "https://schema.org", ...generateBreadcrumbJsonLd(breadcrumbs) },
    { "@context": "https://schema.org", ...generateFAQJsonLd(page.faq) },
  ];

  return (
    <>
      <SEOHead
        title={page.title}
        description={page.description}
        canonicalPath={`/${page.slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />
      <motion.article
        className="max-w-3xl mx-auto pt-6 px-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-2 tracking-wide leading-tight">
          {page.h1}
        </h1>
        <div className="flex flex-wrap gap-2 mb-5">
          {page.keywords.map((k) => (
            <span key={k} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {k}
            </span>
          ))}
        </div>

        <SnippetBox question={page.snippet.question} answer={page.snippet.answer} />

        <div className="space-y-4 mb-8">
          {page.intro.map((p, i) => (
            <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <section className="mb-8">
          <h2 className="font-heading text-lg md:text-xl text-foreground mb-3">
            {page.cardName} Upright in the {page.positionLabel} Position
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{page.upright}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-lg md:text-xl text-foreground mb-3">
            {page.cardName} Reversed in the {page.positionLabel} Position
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{page.reversed}</p>
        </section>

        <section className="reading-panel rounded-xl p-5 md:p-6 mb-8 border-l-4 border-primary/40">
          <h2 className="font-heading text-base md:text-lg text-foreground mb-2">How to read it in context</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{page.guidance}</p>
        </section>

        <ReadingCTA
          title="See Your Whole Spread Interpreted"
          description="Enter every card and position to get a synthesis of how this card interacts with the rest."
          to="/what-does-my-spread-mean"
          label="Open the Spread Interpreter"
        />

        <FAQSection items={page.faq} />

        <InternalLinks links={related} />
      </motion.article>
    </>
  );
};

export default CardPositionPage;
