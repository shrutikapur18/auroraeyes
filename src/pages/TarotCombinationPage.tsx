import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import { generateCombinationPages } from "@/data/seoData";

const TarotCombinationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const combos = generateCombinationPages();
  const combo = combos.find((c) => c.slug === slug);

  if (!combo) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Combination Not Found</h1>
        <Link to="/tarot-combinations" className="text-primary hover:underline">← All Combinations</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Tarot Guide", href: "/tarot-guide" },
    { label: "Combinations", href: "/tarot-combinations" },
    { label: `${combo.card1Name} & ${combo.card2Name}` },
  ];

  const title = `${combo.card1Name} and ${combo.card2Name} Tarot Combination`;
  const description = `What does it mean when ${combo.card1Name} and ${combo.card2Name} appear together? Discover the ${combo.theme} energy of this powerful tarot combination.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    breadcrumb: generateBreadcrumbJsonLd(breadcrumbs),
  };

  return (
    <>
      <SEOHead title={title} description={description} canonicalPath={`/tarot-combinations/${combo.slug}`} jsonLd={jsonLd} />
      <motion.div className="max-w-3xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-2 tracking-wider">
          {combo.card1Name} & {combo.card2Name}
        </h1>
        <p className="text-sm text-primary/70 font-heading mb-6">Theme: {combo.theme}</p>

        <div className="reading-panel rounded-xl p-6 md:p-8 space-y-6 mb-8">
          <section>
            <h2 className="font-heading text-lg text-foreground mb-2">General Meaning</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{combo.meaning}</p>
          </section>

          {combo.love && (
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">💗 In Love & Relationships</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{combo.love}</p>
            </section>
          )}

          {combo.career && (
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">💼 In Career & Work</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{combo.career}</p>
            </section>
          )}
        </div>

        <InternalLinks
          title="Explore These Cards"
          links={[
            { to: `/tarot-card-meanings/${combo.card1Slug}`, label: `${combo.card1Name} Meaning` },
            { to: `/tarot-card-meanings/${combo.card2Slug}`, label: `${combo.card2Name} Meaning` },
            { to: "/tarot-combinations", label: "All Combinations" },
            { to: "/free-tarot-reading", label: "Free Tarot Reading" },
          ]}
        />
      </motion.div>
    </>
  );
};

export default TarotCombinationPage;
