import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { elderFuthark } from "@/data/runes";

const RuneGuide = () => (
  <>
    <SEOHead
      title="Complete Rune Guide — Elder Futhark Divination"
      description="Complete guide to Elder Futhark rune divination. Free rune readings, all 24 rune meanings, casting techniques, and Norse divination wisdom."
      canonicalPath="/rune-guide"
      jsonLd={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Complete Rune Guide" }}
    />
    <motion.div className="max-w-4xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Breadcrumbs items={[{ label: "Rune Guide" }]} />

      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Complete Rune Guide</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">
          Explore the ancient wisdom of the Elder Futhark — 24 runes for divination, guidance, and spiritual insight.
        </p>
      </header>

      <div className="space-y-8">
        <section className="reading-panel rounded-xl p-6">
          <h2 className="font-heading text-lg gold-text mb-3">Rune Readings</h2>
          <div className="flex flex-wrap gap-2">
            <Link to="/rune-reading" className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">Free Rune Reading</Link>
            <Link to="/daily-rune" className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">Daily Rune</Link>
          </div>
        </section>

        <section className="reading-panel rounded-xl p-6">
          <h2 className="font-heading text-lg gold-text mb-3">All 24 Rune Meanings</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {elderFuthark.map((rune) => (
              <Link
                key={rune.id}
                to={`/rune-meanings/${rune.name.toLowerCase()}`}
                className="text-center p-3 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors group"
              >
                <span className="text-2xl block mb-1">{rune.symbol}</span>
                <span className="text-xs font-heading text-muted-foreground group-hover:text-primary">{rune.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="reading-panel rounded-xl p-6">
          <h2 className="font-heading text-lg gold-text mb-3">Learn About Runes</h2>
          <div className="flex flex-wrap gap-2">
            <Link to="/blog/how-rune-casting-works" className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">How Rune Casting Works</Link>
            <Link to="/rune-meanings" className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">All Rune Meanings</Link>
          </div>
        </section>
      </div>
    </motion.div>
  </>
);

export default RuneGuide;
