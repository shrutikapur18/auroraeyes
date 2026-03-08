import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import { generateCombinationPages } from "@/data/seoData";

const TarotCombinations = () => {
  const combos = generateCombinationPages();

  return (
    <>
      <SEOHead
        title="Tarot Card Combinations & Pair Meanings"
        description="Explore meaningful tarot card combinations. Learn what it means when specific cards appear together in a reading — synergies, themes, and deeper interpretations."
        canonicalPath="/tarot-combinations"
      />
      <motion.div className="max-w-4xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={[{ label: "Tarot Guide", href: "/tarot-guide" }, { label: "Combinations" }]} />

        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Tarot Card Combinations</h1>
          <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">
            When certain cards appear together, their combined energy creates meanings beyond what either card expresses alone. Explore these powerful synergies.
          </p>
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {combos.map((combo) => (
            <Link
              key={combo.slug}
              to={`/tarot-combinations/${combo.slug}`}
              className="reading-panel rounded-lg p-4 hover:gold-glow transition-all group"
            >
              <span className="text-xs font-heading text-primary/60 uppercase tracking-wider">{combo.theme}</span>
              <h2 className="font-heading text-sm text-foreground group-hover:text-primary transition-colors mt-1">
                {combo.card1Name} & {combo.card2Name}
              </h2>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{combo.meaning.slice(0, 120)}…</p>
            </Link>
          ))}
        </div>

        <InternalLinks
          links={[
            { to: "/tarot-card-meanings", label: "All Card Meanings" },
            { to: "/tarot-spreads", label: "Spread Guides" },
            { to: "/free-tarot-reading", label: "Free Tarot Reading" },
          ]}
        />
      </motion.div>
    </>
  );
};

export default TarotCombinations;
