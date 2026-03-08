import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateComparisonPages } from "@/data/seoData";
import { tarotDeck } from "@/data/tarotDeck";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const TarotComparisons = () => {
  const comparisons = generateComparisonPages();

  return (
    <>
      <SEOHead
        title="Tarot Card Comparisons — Side by Side Meanings"
        description="Compare tarot cards side by side. Understand the differences between similar cards with detailed love, career, and general interpretations."
        canonicalPath="/tarot-comparisons"
      />
      <motion.div className="max-w-4xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={[{ label: "Tarot Guide", href: "/tarot-guide" }, { label: "Comparisons" }]} />
        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-2 text-center">Tarot Card Comparisons</h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          Understand the subtle differences between similar tarot cards with side-by-side breakdowns.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {comparisons.map(c => {
            const c1 = tarotDeck.find(t => slugify(t.name) === c.card1Slug);
            const c2 = tarotDeck.find(t => slugify(t.name) === c.card2Slug);
            return (
              <Link key={c.slug} to={`/tarot-comparisons/${c.slug}`} className="reading-panel rounded-xl p-4 hover:gold-glow transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{c1?.symbol}</span>
                  <span className="text-xs text-muted-foreground">vs</span>
                  <span className="text-2xl">{c2?.symbol}</span>
                </div>
                <p className="text-sm font-heading text-foreground group-hover:text-primary transition-colors">{c.card1Name} vs {c.card2Name}</p>
                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{c.summary}</p>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default TarotComparisons;
