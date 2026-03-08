import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import { spreadGuides } from "@/data/seoData";

const TarotSpreads = () => (
  <>
    <SEOHead
      title="Tarot Spreads Guide — Learn Every Layout"
      description="Complete guide to tarot spreads. Learn the Three Card Spread, Celtic Cross, Yes/No, and more. Understand positions, techniques, and when to use each layout."
      canonicalPath="/tarot-spreads"
    />
    <motion.div className="max-w-4xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Breadcrumbs items={[{ label: "Tarot Guide", href: "/tarot-guide" }, { label: "Spreads" }]} />

      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Tarot Spreads Guide</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">
          Master every tarot spread — from the beginner-friendly Three Card layout to the powerful Celtic Cross.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {spreadGuides.map((spread) => (
          <Link
            key={spread.slug}
            to={`/tarot-spreads/${spread.slug}`}
            className="reading-panel rounded-xl p-5 hover:gold-glow transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-heading text-sm text-foreground group-hover:text-primary transition-colors">
                {spread.h1.split("—")[0].trim()}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 shrink-0">{spread.cardCount} cards</span>
            </div>
            <p className="text-xs text-muted-foreground">{spread.bestFor}</p>
            <span className="text-[10px] text-muted-foreground/60 mt-2 block">{spread.difficulty}</span>
          </Link>
        ))}
      </div>

      <InternalLinks
        links={[
          { to: "/tarot-card-meanings", label: "Card Meanings" },
          { to: "/tarot-combinations", label: "Card Combinations" },
          { to: "/free-tarot-reading", label: "Free Tarot Reading" },
        ]}
      />
    </motion.div>
  </>
);

export default TarotSpreads;
