import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import SnippetBox from "@/components/SnippetBox";
import ReadingCTA from "@/components/ReadingCTA";
import { getTopicSpread } from "@/data/programmaticSeo";

const TopicSpreadPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "").split("/")[0];
  const page = getTopicSpread(slug);

  if (!page) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Spread Not Found</h1>
        <Link to="/tarot-spread-interpretation" className="text-primary hover:underline">
          ← Spread Interpretation Hub
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Tarot Guide", href: "/tarot-guide" },
    { label: "Spread Interpretation", href: "/tarot-spread-interpretation" },
    { label: page.h1 },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: page.h1,
      description: page.description,
      step: page.howTo.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
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

        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-4 tracking-wide leading-tight">
          {page.h1}
        </h1>

        <SnippetBox question={page.snippet.question} answer={page.snippet.answer} />

        <div className="space-y-4 mb-8">
          {page.intro.map((p, i) => (
            <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <section className="mb-8">
          <h2 className="font-heading text-lg md:text-xl text-foreground mb-4">The Positions</h2>
          <div className="space-y-3">
            {page.positions.map((pos, i) => (
              <div key={i} className="reading-panel rounded-lg p-4">
                <h3 className="font-heading text-sm text-primary mb-1">
                  Position {i + 1}: {pos.label}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{pos.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-lg md:text-xl text-foreground mb-4">How to Read This Spread</h2>
          <ol className="space-y-3">
            {page.howTo.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm md:text-base text-muted-foreground">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-heading">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="reading-panel rounded-xl p-5 md:p-6 mb-8 border-l-4 border-primary/40">
          <h2 className="font-heading text-base md:text-lg text-foreground mb-2">Worked Example</h2>
          <p className="text-sm text-primary/90 font-heading mb-2">{page.example.cards}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{page.example.reading}</p>
        </section>

        <ReadingCTA
          title="Interpret Your Own Spread"
          description="Enter your cards, positions, and question to get an instant synthesis."
          to="/what-does-my-spread-mean"
          label="Open the Spread Interpreter"
        />

        <FAQSection items={page.faq} />

        <InternalLinks links={page.related} />
      </motion.article>
    </>
  );
};

export default TopicSpreadPage;
