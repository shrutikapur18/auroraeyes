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
import { generateComparisonPages } from "@/data/seoData";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const TarotComparison = () => {
  const { slug } = useParams<{ slug: string }>();
  const comparisons = generateComparisonPages();
  const page = comparisons.find(c => c.slug === slug);

  if (!page) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Comparison Not Found</h1>
        <Link to="/tarot-comparisons" className="text-primary hover:underline">← All Comparisons</Link>
      </div>
    );
  }

  const card1 = tarotDeck.find(c => slugify(c.name) === page.card1Slug)!;
  const card2 = tarotDeck.find(c => slugify(c.name) === page.card2Slug)!;
  const interp1 = tarotInterpretations.find(i => i.id === card1.id);
  const interp2 = tarotInterpretations.find(i => i.id === card2.id);

  const breadcrumbs = [
    { label: "Tarot Guide", href: "/tarot-guide" },
    { label: "Comparisons", href: "/tarot-comparisons" },
    { label: `${card1.name} vs ${card2.name}` },
  ];

  const snippetAnswer = `${card1.name} represents ${card1.keywords.slice(0, 2).join(" and ")}, while ${card2.name} embodies ${card2.keywords.slice(0, 2).join(" and ")}. ${page.summary}`;

  const faqItems = [
    { q: `What is the difference between ${card1.name} and ${card2.name}?`, a: snippetAnswer },
    { q: `When does ${card1.name} appear instead of ${card2.name}?`, a: `${card1.name} appears when the energy of ${card1.keywords.join(", ")} is dominant. ${card2.name} emerges when the focus shifts toward ${card2.keywords.join(", ")}. The distinction often lies in the subtlety of your question and current circumstances.` },
    { q: `Can ${card1.name} and ${card2.name} appear together?`, a: `Yes — when both appear in a spread, they create a dialogue. ${card1.name} brings ${card1.keywords[0]} energy while ${card2.name} adds ${card2.keywords[0]}. Together they suggest a nuanced situation requiring attention to both themes.` },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${card1.name} vs ${card2.name}`,
      description: page.description,
      breadcrumb: generateBreadcrumbJsonLd(breadcrumbs),
    },
    { "@context": "https://schema.org", ...generateFAQJsonLd(faqItems) },
  ];

  return (
    <>
      <SEOHead title={`${card1.name} vs ${card2.name} — Tarot Comparison`} description={page.description} canonicalPath={`/tarot-comparisons/${slug}`} jsonLd={jsonLd} />
      <motion.div className="max-w-3xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-4 text-center">
          {card1.symbol} {card1.name} vs {card2.name} {card2.symbol}
        </h1>

        <SnippetBox question={`${card1.name} vs ${card2.name}: What's the difference?`} answer={snippetAnswer} />

        {/* Side-by-side comparison */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="reading-panel rounded-xl p-5">
            <div className="text-center mb-3">
              <span className="text-3xl block mb-1">{card1.symbol}</span>
              <h2 className="font-heading text-lg text-foreground">{card1.name}</h2>
              <p className="text-[10px] text-muted-foreground">{card1.arcana} Arcana {card1.suit ? `· ${card1.suit}` : ""}</p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {card1.keywords.map(k => <span key={k} className="px-2 py-0.5 rounded bg-primary/10 text-[10px] text-primary border border-primary/20">{k}</span>)}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2"><strong>Upright:</strong> {interp1?.general_up || card1.meaning_up}</p>
            <p className="text-xs text-muted-foreground leading-relaxed"><strong>Reversed:</strong> {interp1?.general_rev || card1.meaning_rev}</p>
          </div>
          <div className="reading-panel rounded-xl p-5">
            <div className="text-center mb-3">
              <span className="text-3xl block mb-1">{card2.symbol}</span>
              <h2 className="font-heading text-lg text-foreground">{card2.name}</h2>
              <p className="text-[10px] text-muted-foreground">{card2.arcana} Arcana {card2.suit ? `· ${card2.suit}` : ""}</p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {card2.keywords.map(k => <span key={k} className="px-2 py-0.5 rounded bg-primary/10 text-[10px] text-primary border border-primary/20">{k}</span>)}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2"><strong>Upright:</strong> {interp2?.general_up || card2.meaning_up}</p>
            <p className="text-xs text-muted-foreground leading-relaxed"><strong>Reversed:</strong> {interp2?.general_rev || card2.meaning_rev}</p>
          </div>
        </div>

        {/* Contextual comparison */}
        <div className="reading-panel rounded-xl p-6 mb-8 space-y-5">
          <h2 className="font-heading text-lg text-foreground">In Context</h2>
          <section>
            <h3 className="font-heading text-sm text-foreground mb-1">💗 Love</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>{card1.name}:</strong> {interp1?.love_up || "Emotional patterns related to " + card1.keywords.join(", ") + "."}<br />
              <strong>{card2.name}:</strong> {interp2?.love_up || "Emotional patterns related to " + card2.keywords.join(", ") + "."}
            </p>
          </section>
          <section>
            <h3 className="font-heading text-sm text-foreground mb-1">💼 Career</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>{card1.name}:</strong> {interp1?.career_up || "Professional energy of " + card1.keywords.join(", ") + "."}<br />
              <strong>{card2.name}:</strong> {interp2?.career_up || "Professional energy of " + card2.keywords.join(", ") + "."}
            </p>
          </section>
        </div>

        <MiniCardDraw prompt="Draw a card to explore how it relates to this comparison." />

        <ReadingCTA title="See These Cards in Action" description="Start a free tarot reading and see how the cards interact in a real spread." />

        <FAQSection items={faqItems} />

        <InternalLinks links={[
          { to: `/tarot-card-meanings/${page.card1Slug}`, label: card1.name },
          { to: `/tarot-card-meanings/${page.card2Slug}`, label: card2.name },
          { to: "/tarot-combinations", label: "Card Combinations" },
          { to: "/tarot-comparisons", label: "All Comparisons" },
          { to: "/free-tarot-reading", label: "Free Reading" },
        ]} />
      </motion.div>
    </>
  );
};

export default TarotComparison;
