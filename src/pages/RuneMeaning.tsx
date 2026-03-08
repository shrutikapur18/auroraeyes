import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { elderFuthark } from "@/data/runes";

const RuneMeaning = () => {
  const { slug } = useParams<{ slug: string }>();
  const rune = elderFuthark.find((r) => r.name.toLowerCase() === slug);

  if (!rune) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Rune Not Found</h1>
        <Link to="/rune-meanings" className="text-primary hover:underline">← View All Runes</Link>
      </div>
    );
  }

  const prevRune = elderFuthark.find((r) => r.id === rune.id - 1);
  const nextRune = elderFuthark.find((r) => r.id === rune.id + 1);
  const hasReversed = !rune.reversed_meaning.toLowerCase().includes("no reversed");

  return (
    <>
      <SEOHead
        title={`${rune.name} Rune Meaning (${rune.symbol})`}
        description={`${rune.name} rune meaning: ${rune.meaning}. Discover its symbolism, divination interpretation, and ancient Norse wisdom.`}
        canonicalPath={`/rune-meanings/${slug}`}
        jsonLd={{ "@context": "https://schema.org", "@type": "Article", headline: `${rune.name} Rune Meaning`, description: rune.meaning }}
      />
      <motion.div className="max-w-3xl mx-auto pt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link to="/rune-meanings" className="text-xs text-primary hover:underline mb-6 inline-block">← All Rune Meanings</Link>

        <div className="reading-panel rounded-xl p-6 md:p-8 mb-8">
          <div className="text-center mb-6">
            <span className="text-6xl text-primary block mb-3">{rune.symbol}</span>
            <h1 className="font-heading text-2xl md:text-4xl gold-text mb-2">{rune.name}</h1>
            <p className="text-sm text-muted-foreground">Letter: {rune.letter} · Elder Futhark</p>
            <div className="flex justify-center gap-2 mt-3">
              {rune.keywords.map((k) => (
                <span key={k} className="px-2 py-1 rounded-md bg-primary/10 text-[10px] font-heading text-primary border border-primary/20">{k}</span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">Upright Meaning</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{rune.meaning}</p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">Reversed Meaning</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{rune.reversed_meaning}</p>
            </section>
            <section>
              <h2 className="font-heading text-lg text-foreground mb-2">Symbolism & Divination</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {rune.name} ({rune.symbol}) represents the energy of {rune.keywords.join(", ")}. When this rune appears in a reading, it invites you to explore how these themes are manifesting in your life. {hasReversed ? "In its reversed position, pay attention to the shadow aspects and areas where this energy may be blocked or distorted." : `${rune.name} carries the same message regardless of orientation — its wisdom is absolute and unwavering.`}
              </p>
            </section>
          </div>
        </div>

        <div className="flex justify-between items-center mb-10">
          {prevRune ? <Link to={`/rune-meanings/${prevRune.name.toLowerCase()}`} className="text-xs text-primary hover:underline">← {prevRune.name}</Link> : <span />}
          {nextRune ? <Link to={`/rune-meanings/${nextRune.name.toLowerCase()}`} className="text-xs text-primary hover:underline">{nextRune.name} →</Link> : <span />}
        </div>

        <div className="text-center pb-8"><Link to="/rune-reading" className="text-sm text-primary hover:underline font-heading">Get a Rune Reading →</Link></div>
      </motion.div>
    </>
  );
};

export default RuneMeaning;
