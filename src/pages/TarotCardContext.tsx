import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import SnippetBox from "@/components/SnippetBox";
import ReadingCTA from "@/components/ReadingCTA";
import MiniCardDraw from "@/components/MiniCardDraw";
import { tarotDeck } from "@/data/tarotDeck";
import { tarotInterpretations } from "@/data/tarotInterpretations";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

type Context = "love" | "career" | "advice" | "yes-or-no";

const contextMeta: Record<Context, { label: string; emoji: string; ctaTo: string; ctaLabel: string }> = {
  love: { label: "Love", emoji: "💗", ctaTo: "/love-tarot-reading", ctaLabel: "Try a Love Tarot Reading" },
  career: { label: "Career", emoji: "💼", ctaTo: "/career-tarot-reading", ctaLabel: "Try a Career Tarot Reading" },
  advice: { label: "Advice", emoji: "🌿", ctaTo: "/free-tarot-reading", ctaLabel: "Get Your Tarot Advice" },
  "yes-or-no": { label: "Yes or No", emoji: "⚖️", ctaTo: "/yes-no-tarot-reading", ctaLabel: "Try a Yes/No Reading" },
};

const getAdviceInterpretation = (card: typeof tarotDeck[0]) => {
  return `When ${card.name} appears as advice, it encourages you to embrace ${card.keywords.join(", ")}. This card suggests that the path forward involves integrating these qualities into your current approach. Consider where in your life you could apply more ${card.keywords[0]} and how that shift might change your perspective.`;
};

const getYesNoInterpretation = (card: typeof tarotDeck[0]) => {
  const positive = card.keywords.some(k => ["love", "joy", "success", "abundance", "beginnings", "victory", "hope", "harmony"].includes(k));
  const answer = positive ? "Yes" : "Maybe — with conditions";
  return `${card.name} as a yes/no answer leans toward "${answer}." Its core energy of ${card.keywords.slice(0, 2).join(" and ")} ${positive ? "supports a positive outcome" : "suggests careful consideration is needed"}. Upright, the answer trends ${positive ? "positive" : "neutral"}. Reversed, expect delays or the need for a different approach.`;
};

const TarotCardContext = () => {
  const { slug, context } = useParams<{ slug: string; context: string }>();
  const card = tarotDeck.find((c) => slugify(c.name) === slug);
  const ctx = context as Context;

  if (!card || !contextMeta[ctx]) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Page Not Found</h1>
        <Link to="/tarot-card-meanings" className="text-primary hover:underline">← View All Cards</Link>
      </div>
    );
  }

  const interp = tarotInterpretations.find(i => i.id === card.id);
  const meta = contextMeta[ctx];

  const getMainText = (): { upright: string; reversed: string } => {
    if (!interp) return { upright: card.meaning_up, reversed: card.meaning_rev };
    switch (ctx) {
      case "love": return { upright: interp.love_up, reversed: interp.love_rev };
      case "career": return { upright: interp.career_up, reversed: interp.career_rev };
      case "advice": return { upright: getAdviceInterpretation(card), reversed: `Reversed, ${card.name} as advice warns against ${card.meaning_rev.split(",").slice(0, 2).join(" and").toLowerCase()}. Reflect on whether you're resisting the lesson this card offers.` };
      case "yes-or-no": return { upright: getYesNoInterpretation(card), reversed: `Reversed ${card.name} in a yes/no reading often leans toward "not yet" or "no." The energy of ${card.meaning_rev.split(",").slice(0, 2).join(" and").toLowerCase()} suggests obstacles or reconsideration.` };
      default: return { upright: interp.general_up, reversed: interp.general_rev };
    }
  };

  const texts = getMainText();
  const title = `${card.name} in ${meta.label} — Tarot Meaning`;
  const description = `What does ${card.name} mean in a ${meta.label.toLowerCase()} reading? Upright and reversed interpretations for ${meta.label.toLowerCase()} questions.`;

  const breadcrumbs = [
    { label: "Card Meanings", href: "/tarot-card-meanings" },
    { label: card.name, href: `/tarot-card-meanings/${slug}` },
    { label: meta.label },
  ];

  const faqItems = [
    { q: `What does ${card.name} mean for ${meta.label.toLowerCase()}?`, a: texts.upright },
    { q: `What does ${card.name} reversed mean for ${meta.label.toLowerCase()}?`, a: texts.reversed },
    { q: `Is ${card.name} a good card for ${meta.label.toLowerCase()} readings?`, a: `${card.name} in ${meta.label.toLowerCase()} readings brings the energy of ${card.keywords.join(", ")}. Whether this is "good" depends on your question and the surrounding cards — every card carries both gifts and warnings.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${card.name} ${meta.label} Meaning`,
    description,
    breadcrumb: generateBreadcrumbJsonLd(breadcrumbs),
    mainEntity: generateFAQJsonLd(faqItems).mainEntity,
  };

  const otherContexts = (Object.keys(contextMeta) as Context[]).filter(c => c !== ctx);

  return (
    <>
      <SEOHead title={title} description={description} canonicalPath={`/tarot-card-meanings/${slug}/${ctx}`} jsonLd={jsonLd} />
      <motion.div className="max-w-3xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={breadcrumbs} />

        <div className="text-center mb-6">
          <span className="text-4xl block mb-2" role="img" aria-label={`${card.name} tarot card`}>{card.symbol}</span>
          <h1 className="font-heading text-2xl md:text-4xl gold-text mb-2">{meta.emoji} {card.name} in {meta.label}</h1>
          <p className="text-sm text-muted-foreground">{card.arcana} Arcana {card.suit ? `· ${card.suit}` : ""}</p>
        </div>

        <SnippetBox question={`What does ${card.name} mean for ${meta.label.toLowerCase()}?`} answer={texts.upright.split(".").slice(0, 2).join(".") + "."} />

        <div className="reading-panel rounded-xl p-6 md:p-8 mb-8 space-y-6">
          <section>
            <h2 className="font-heading text-lg text-foreground mb-2">↑ {card.name} Upright — {meta.label}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{texts.upright}</p>
          </section>
          <section>
            <h2 className="font-heading text-lg text-foreground mb-2">↻ {card.name} Reversed — {meta.label}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{texts.reversed}</p>
          </section>
          {interp && (
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">⏱ Timing</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">When {card.name} appears, the timing suggests: <strong>{interp.timing}</strong>.</p>
            </section>
          )}
        </div>

        {/* Interactive tool */}
        <MiniCardDraw prompt={`Draw a card to see how it interacts with ${card.name} in ${meta.label.toLowerCase()} readings.`} />

        <ReadingCTA title={`Try a ${meta.label} Reading`} description={`See ${card.name} in the context of a full spread.`} to={meta.ctaTo} label={meta.ctaLabel} />

        {/* Other contexts */}
        <nav className="mb-8">
          <h3 className="font-heading text-sm text-foreground mb-3">See {card.name} in Other Contexts</h3>
          <div className="flex flex-wrap gap-2">
            {otherContexts.map(c => (
              <Link key={c} to={`/tarot-card-meanings/${slug}/${c}`} className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                {contextMeta[c].emoji} {contextMeta[c].label}
              </Link>
            ))}
            <Link to={`/tarot-card-meanings/${slug}`} className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
              📖 Full Meaning
            </Link>
          </div>
        </nav>

        <FAQSection items={faqItems} />
        <InternalLinks links={[
          { to: `/tarot-card-meanings/${slug}`, label: `${card.name} Full Meaning` },
          { to: "/tarot-card-meanings", label: "All Card Meanings" },
          { to: meta.ctaTo, label: `${meta.label} Tarot Reading` },
          { to: "/tarot-combinations", label: "Card Combinations" },
        ]} />
      </motion.div>
    </>
  );
};

export default TarotCardContext;
