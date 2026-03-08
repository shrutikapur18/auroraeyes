import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { tarotDeck } from "@/data/tarotDeck";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const loveInterpretation = (card: typeof tarotDeck[0]) => {
  const base = card.keywords.join(", ");
  if (card.suit === "Cups" || card.name.includes("Lovers") || card.name.includes("Empress"))
    return `${card.name} brings a strong emotional message to your love life. Themes of ${base} suggest deepening connections, emotional openness, and romantic possibilities unfolding.`;
  return `In love readings, ${card.name} highlights ${base}. This card encourages you to examine your emotional patterns and approach relationships with awareness and intention.`;
};

const careerInterpretation = (card: typeof tarotDeck[0]) => {
  const base = card.keywords.join(", ");
  if (card.suit === "Pentacles" || card.name.includes("Emperor") || card.name.includes("Magician"))
    return `${card.name} is powerful in career readings. Themes of ${base} suggest professional growth, strategic decisions, and material progress in your work life.`;
  return `In career contexts, ${card.name} brings energy of ${base}. Consider how these themes apply to your professional goals and workplace dynamics.`;
};

const growthInterpretation = (card: typeof tarotDeck[0]) => {
  return `For personal growth, ${card.name} invites you to explore ${card.keywords.join(", ")}. This card encourages self-reflection and embracing transformation as a natural part of your journey.`;
};

const TarotCardMeaning = () => {
  const { slug } = useParams<{ slug: string }>();
  const card = tarotDeck.find((c) => slugify(c.name) === slug);

  if (!card) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Card Not Found</h1>
        <Link to="/tarot-card-meanings" className="text-primary hover:underline">← View All Cards</Link>
      </div>
    );
  }

  const prevCard = tarotDeck.find((c) => c.id === card.id - 1);
  const nextCard = tarotDeck.find((c) => c.id === card.id + 1);

  return (
    <>
      <SEOHead
        title={`${card.name} Tarot Card Meaning`}
        description={`${card.name} tarot card meaning: ${card.meaning_up}. Learn upright, reversed, love, career, and personal growth interpretations.`}
        canonicalPath={`/tarot-card-meanings/${slug}`}
        jsonLd={{ "@context": "https://schema.org", "@type": "Article", headline: `${card.name} Tarot Card Meaning`, description: card.meaning_up }}
      />

      <motion.div className="max-w-3xl mx-auto pt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link to="/tarot-card-meanings" className="text-xs text-primary hover:underline mb-6 inline-block">← All Tarot Card Meanings</Link>

        <div className="reading-panel rounded-xl p-6 md:p-8 mb-8">
          <div className="text-center mb-6">
            <span className="text-5xl block mb-3">{card.symbol}</span>
            <h1 className="font-heading text-2xl md:text-4xl gold-text mb-2">{card.name}</h1>
            <p className="text-sm text-muted-foreground">{card.arcana} Arcana {card.suit ? `· ${card.suit}` : ""} {card.number !== undefined ? `· ${card.number}` : ""}</p>
            <div className="flex justify-center gap-2 mt-3">
              {card.keywords.map((k) => (
                <span key={k} className="px-2 py-1 rounded-md bg-primary/10 text-[10px] font-heading text-primary border border-primary/20">{k}</span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">↑ Upright Meaning</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.meaning_up}</p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">↻ Reversed Meaning</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.meaning_rev}</p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">💗 In Love & Relationships</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{loveInterpretation(card)}</p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">💼 In Career & Work</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{careerInterpretation(card)}</p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">🌱 In Personal Growth</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{growthInterpretation(card)}</p>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-10">
          {prevCard ? (
            <Link to={`/tarot-card-meanings/${slugify(prevCard.name)}`} className="text-xs text-primary hover:underline">← {prevCard.name}</Link>
          ) : <span />}
          {nextCard ? (
            <Link to={`/tarot-card-meanings/${slugify(nextCard.name)}`} className="text-xs text-primary hover:underline">{nextCard.name} →</Link>
          ) : <span />}
        </div>

        <div className="text-center pb-8">
          <Link to="/free-tarot-reading" className="text-sm text-primary hover:underline font-heading">Get a Reading with {card.name} →</Link>
        </div>
      </motion.div>
    </>
  );
};

export default TarotCardMeaning;
