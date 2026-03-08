import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const AngelCardsGuide = () => (
  <>
    <SEOHead
      title="Angel Card Guide — Archangel Messages & Readings"
      description="Complete guide to angel card readings. Connect with archangels, receive divine messages, and discover the loving guidance of angel oracle cards."
      canonicalPath="/angel-cards-guide"
      jsonLd={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Angel Cards Guide" }}
    />
    <motion.div className="max-w-4xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Breadcrumbs items={[{ label: "Angel Cards Guide" }]} />

      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Angel Cards Guide</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">
          Connect with the loving energy of archangels and guardian angels through oracle card readings.
        </p>
      </header>

      <div className="space-y-8">
        <section className="reading-panel rounded-xl p-6">
          <h2 className="font-heading text-lg gold-text mb-3">Angel Card Readings</h2>
          <div className="flex flex-wrap gap-2">
            <Link to="/angel-card-reading" className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">Free Angel Card Reading</Link>
            <Link to="/daily-angel-message" className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">Daily Angel Message</Link>
          </div>
        </section>

        <section className="reading-panel rounded-xl p-6">
          <h2 className="font-heading text-lg gold-text mb-3">Learn About Angel Cards</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Angel cards are oracle cards designed to provide gentle, uplifting guidance from the angelic realm. Unlike tarot, angel cards never carry negative meanings — every card offers love, comfort, and encouragement.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/blog/angel-card-guidance-beginners" className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">Angel Card Guidance for Beginners</Link>
          </div>
        </section>
      </div>
    </motion.div>
  </>
);

export default AngelCardsGuide;
