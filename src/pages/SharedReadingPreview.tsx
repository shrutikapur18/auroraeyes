import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { decodeReading } from "@/lib/shareReading";
import SEOHead from "@/components/SEOHead";
import ShareButtons from "@/components/ShareButtons";

const SharedReadingPreview = () => {
  const [searchParams] = useSearchParams();
  const encoded = searchParams.get("r");
  const reading = encoded ? decodeReading(encoded) : null;

  if (!reading) {
    return (
      <div className="text-center py-20 px-4">
        <h1 className="font-heading text-2xl text-foreground mb-4">Reading Not Found</h1>
        <p className="text-sm text-muted-foreground mb-6">This shared reading link may have expired or is invalid.</p>
        <Link
          to="/free-tarot-reading"
          className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm hover:opacity-90 transition-opacity"
        >
          Get Your Own Free Reading
        </Link>
      </div>
    );
  }

  const typeLabel = reading.type === "rune" ? "Rune" : reading.type === "angel" ? "Angel Card" : "Tarot";

  return (
    <>
      <SEOHead
        title={`Shared ${typeLabel} Reading`}
        description={reading.teaser}
        canonicalPath="/shared-reading"
      />

      <motion.div
        className="max-w-2xl mx-auto pt-8 px-4 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Mystical header */}
        <div className="text-center mb-8">
          <motion.span
            className="text-5xl block mb-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🔮
          </motion.span>
          <h1 className="font-heading text-2xl md:text-4xl gold-text mb-3 tracking-wider">
            Someone Shared Their {typeLabel} Reading
          </h1>
          <p className="text-sm text-muted-foreground italic">
            "{reading.question}"
          </p>
        </div>

        {/* Cards drawn */}
        <div className="reading-panel rounded-xl p-6 mb-6">
          <h2 className="font-heading text-sm text-primary/70 mb-4 text-center tracking-wider uppercase">
            Cards Drawn
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {reading.cards.map((card, i) => (
              <motion.div
                key={i}
                className="text-center px-4 py-3 rounded-lg bg-muted/30 border border-primary/20"
                initial={{ opacity: 0, y: 15, rotateY: 90 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              >
                <span className="text-2xl block mb-1">{card.symbol}</span>
                <span className="text-xs font-heading text-primary/60 block">{card.position}</span>
                <span className="text-sm font-heading text-foreground block">{card.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {card.reversed ? "↻ Reversed" : "↑ Upright"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Teaser — deliberately vague to spark curiosity */}
        <motion.div
          className="reading-panel rounded-xl p-6 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">
            "{reading.teaser}"
          </p>
          <div className="w-16 h-px bg-primary/30 mx-auto mb-4" />
          <p className="text-xs text-muted-foreground/60">
            The full interpretation is personal — discover your own reading below.
          </p>
        </motion.div>

        {/* CTA — the viral hook */}
        <motion.div
          className="text-center space-y-4 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="font-heading text-lg gold-text tracking-wider">
            What Do the Cards Say About You?
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Every reading is unique. The cards that appear for you carry a message meant only for your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/free-tarot-reading"
              className="inline-block px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary/80 to-primary border border-primary/40 text-primary-foreground font-heading text-sm tracking-wider hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              ✦ Try Your Own Free Reading
            </Link>
            {reading.type !== "tarot" && (
              <Link
                to={reading.type === "rune" ? "/rune-reading" : "/angel-card-reading"}
                className="inline-block px-6 py-3.5 rounded-xl bg-muted/50 border border-border/40 text-foreground font-heading text-sm tracking-wider hover:bg-muted transition-all"
              >
                Try {typeLabel} Reading
              </Link>
            )}
          </div>
        </motion.div>

        {/* More reading options */}
        <motion.div
          className="reading-panel rounded-xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="font-heading text-sm text-primary mb-4 text-center tracking-wider">
            Explore More Readings
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { to: "/free-tarot-reading", label: "Tarot Reading", icon: "🔮" },
              { to: "/yes-no-tarot-reading", label: "Yes/No Tarot", icon: "✨" },
              { to: "/rune-reading", label: "Rune Reading", icon: "ᚱ" },
              { to: "/angel-card-reading", label: "Angel Cards", icon: "👼" },
              { to: "/daily-tarot-card", label: "Daily Card", icon: "🌅" },
              { to: "/pick-a-card-reading", label: "Pick a Card", icon: "🃏" },
              { to: "/tarot-card-meanings", label: "Card Meanings", icon: "📖" },
              { to: "/tarot-guide", label: "Learn Tarot", icon: "📚" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-[10px] font-heading text-muted-foreground group-hover:text-primary transition-colors text-center">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SharedReadingPreview;
