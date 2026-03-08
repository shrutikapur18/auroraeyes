import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import { spreadGuides } from "@/data/seoData";

const SpreadGuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const spread = spreadGuides.find((s) => s.slug === slug);

  if (!spread) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Spread Not Found</h1>
        <Link to="/tarot-spreads" className="text-primary hover:underline">← All Spreads</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Tarot Guide", href: "/tarot-guide" },
    { label: "Spreads", href: "/tarot-spreads" },
    { label: spread.h1.split("—")[0].trim() },
  ];

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Read the ${spread.h1.split("—")[0].trim()}`,
    description: spread.description,
    step: spread.howTo.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
    breadcrumb: generateBreadcrumbJsonLd(breadcrumbs),
  };

  return (
    <>
      <SEOHead title={spread.title} description={spread.description} canonicalPath={`/tarot-spreads/${spread.slug}`} jsonLd={howToJsonLd} />
      <motion.div className="max-w-3xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-2 tracking-wider">{spread.h1}</h1>
        <div className="flex gap-3 mb-6">
          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">{spread.cardCount} cards</span>
          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">{spread.difficulty}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-6"><strong className="text-foreground">Best for:</strong> {spread.bestFor}</p>

        {/* Positions */}
        <section className="mb-8">
          <h2 className="font-heading text-lg text-foreground mb-4">Card Positions</h2>
          <div className="space-y-3">
            {spread.positions.map((pos, i) => (
              <div key={i} className="reading-panel rounded-lg p-4">
                <h3 className="font-heading text-sm text-primary mb-1">Position {i + 1}: {pos.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pos.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How To */}
        <section className="mb-8">
          <h2 className="font-heading text-lg text-foreground mb-4">How to Read This Spread</h2>
          <ol className="space-y-3">
            {spread.howTo.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-heading">{i + 1}</span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Tips */}
        <section className="reading-panel rounded-xl p-6 mb-8">
          <h2 className="font-heading text-lg text-foreground mb-3">Pro Tips</h2>
          <ul className="space-y-2">
            {spread.tips.map((tip, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                <span className="text-primary">✦</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center mb-8">
          <Link
            to="/free-tarot-reading"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm hover:opacity-90 transition-opacity"
          >
            Try This Spread Now
          </Link>
        </div>

        <InternalLinks
          links={[
            { to: "/tarot-spreads", label: "All Spreads" },
            { to: "/tarot-card-meanings", label: "Card Meanings" },
            { to: "/tarot-combinations", label: "Card Combinations" },
            { to: "/free-tarot-reading", label: "Free Reading" },
          ]}
        />
      </motion.div>
    </>
  );
};

export default SpreadGuidePage;
