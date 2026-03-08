import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { tarotDeck } from "@/data/tarotDeck";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const TarotCardMeanings = () => {
  const majors = tarotDeck.filter((c) => c.arcana === "Major");
  const suits = ["Wands", "Cups", "Swords", "Pentacles"] as const;

  return (
    <>
      <SEOHead title="All 78 Tarot Card Meanings" description="Complete guide to all 78 tarot card meanings. Learn upright and reversed interpretations for Major and Minor Arcana cards." canonicalPath="/tarot-card-meanings" />
      <motion.header className="text-center pt-8 pb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Tarot Card Meanings</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">Explore the meaning of all 78 tarot cards — Major Arcana, Wands, Cups, Swords, and Pentacles.</p>
      </motion.header>

      <div className="max-w-4xl mx-auto space-y-10">
        <section>
          <h2 className="font-heading text-xl gold-text mb-4">Major Arcana</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {majors.map((card) => (
              <Link key={card.id} to={`/tarot-card-meanings/${slugify(card.name)}`} className="reading-panel rounded-lg p-4 hover:gold-glow transition-all text-center group">
                <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">{card.symbol}</span>
                <span className="text-xs font-heading text-primary">{card.name}</span>
                <span className="text-[10px] text-muted-foreground block mt-1">{card.keywords.slice(0, 2).join(", ")}</span>
              </Link>
            ))}
          </div>
        </section>

        {suits.map((suit) => {
          const cards = tarotDeck.filter((c) => c.suit === suit);
          return (
            <section key={suit}>
              <h2 className="font-heading text-xl gold-text mb-4">{suit}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cards.map((card) => (
                  <Link key={card.id} to={`/tarot-card-meanings/${slugify(card.name)}`} className="reading-panel rounded-lg p-4 hover:gold-glow transition-all text-center group">
                    <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">{card.symbol}</span>
                    <span className="text-xs font-heading text-primary">{card.name}</span>
                    <span className="text-[10px] text-muted-foreground block mt-1">{card.keywords.slice(0, 2).join(", ")}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="text-center space-y-2 py-8">
          <Link to="/free-tarot-reading" className="text-sm text-primary hover:underline font-heading">Get a Free Tarot Reading →</Link>
        </div>
      </div>
    </>
  );
};

export default TarotCardMeanings;
