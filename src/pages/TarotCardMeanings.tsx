import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import SnippetBox from "@/components/SnippetBox";
import ReadingCTA from "@/components/ReadingCTA";
import { tarotDeck } from "@/data/tarotDeck";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const faqItems = [
  { q: "How many cards are in a tarot deck?", a: "A standard tarot deck contains 78 cards: 22 Major Arcana cards representing major life themes and spiritual lessons, and 56 Minor Arcana cards divided into four suits (Wands, Cups, Swords, Pentacles) that reflect everyday experiences." },
  { q: "What is the most powerful tarot card?", a: "The World (XXI) is often considered the most powerful card as it represents completion, fulfilment, and the successful end of a cycle. However, each card holds unique power depending on the reading context." },
  { q: "What do reversed tarot cards mean?", a: "Reversed tarot cards indicate blocked, delayed, or internalized energy of the upright meaning. They don't always mean the opposite — they often suggest the shadow side or an area needing attention." },
  { q: "How do I learn tarot card meanings?", a: "Start with the 22 Major Arcana cards, then learn each suit. Study keywords, practice daily draws, and keep a tarot journal. Over time, your intuitive understanding will deepen." },
];

const TarotCardMeanings = () => {
  const majors = tarotDeck.filter((c) => c.arcana === "Major");
  const suits = ["Wands", "Cups", "Swords", "Pentacles"] as const;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All 78 Tarot Card Meanings",
    description: "Complete guide to all 78 tarot card meanings — Major and Minor Arcana.",
    mainEntity: generateFAQJsonLd(faqItems).mainEntity,
  };

  return (
    <>
      <SEOHead
        title="All 78 Tarot Card Meanings — Major & Minor Arcana"
        description="Complete guide to all 78 tarot card meanings. Learn upright and reversed interpretations for Major and Minor Arcana cards."
        canonicalPath="/tarot-card-meanings"
        jsonLd={jsonLd}
      />
      <motion.div className="max-w-4xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={[{ label: "Tarot Guide", href: "/tarot-guide" }, { label: "Card Meanings" }]} />

        <header className="text-center pb-6">
          <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Tarot Card Meanings</h1>
          <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">Explore the meaning of all 78 tarot cards — Major Arcana, Wands, Cups, Swords, and Pentacles.</p>
        </header>

        <SnippetBox
          question="What are the 78 tarot card meanings?"
          answer="A tarot deck has 78 cards. The 22 Major Arcana cards (The Fool through The World) represent major life events and spiritual lessons. The 56 Minor Arcana cards are divided into four suits — Wands (fire/action), Cups (water/emotions), Swords (air/thought), and Pentacles (earth/material) — and reflect everyday experiences and challenges."
        />

        <div className="space-y-10">
          <section>
            <h2 className="font-heading text-xl gold-text mb-4">Major Arcana</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {majors.map((card) => (
                <Link key={card.id} to={`/tarot-card-meanings/${slugify(card.name)}`} className="reading-panel rounded-lg p-4 hover:gold-glow transition-all text-center group">
                  <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform" role="img" aria-label={`${card.name} tarot card`}>{card.symbol}</span>
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
                      <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform" role="img" aria-label={`${card.name} tarot card`}>{card.symbol}</span>
                      <span className="text-xs font-heading text-primary">{card.name}</span>
                      <span className="text-[10px] text-muted-foreground block mt-1">{card.keywords.slice(0, 2).join(", ")}</span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <ReadingCTA />

        <FAQSection items={faqItems} />

        <InternalLinks
          links={[
            { to: "/tarot-combinations", label: "Card Combinations" },
            { to: "/tarot-spreads", label: "Spread Guides" },
            { to: "/free-tarot-reading", label: "Free Tarot Reading" },
            { to: "/tarot-guide", label: "Complete Tarot Guide" },
          ]}
        />
      </motion.div>
    </>
  );
};

export default TarotCardMeanings;
