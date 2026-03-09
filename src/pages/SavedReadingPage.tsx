import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import ShareButtons from "@/components/ShareButtons";

interface SavedCard {
  name: string;
  reversed: boolean;
  position: string;
  symbol: string;
}

interface SavedReading {
  id: string;
  reading_type: string;
  question: string | null;
  cards: SavedCard[];
  interpretation: string;
  created_at: string;
}

const SavedReadingPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: reading, isLoading, error } = useQuery({
    queryKey: ["shared-reading", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shared_readings")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as SavedReading;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <motion.div
          className="text-5xl"
          animate={{ opacity: [0.4, 1, 0.4], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔮
        </motion.div>
        <p className="text-sm text-muted-foreground mt-4">Loading reading…</p>
      </div>
    );
  }

  if (error || !reading) {
    return (
      <div className="text-center py-20 px-4">
        <h1 className="font-heading text-2xl text-foreground mb-4">Reading Not Found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          This reading may no longer be available.
        </p>
        <Link
          to="/free-tarot-reading"
          className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm hover:opacity-90 transition-opacity"
        >
          Get Your Own Free Reading
        </Link>
      </div>
    );
  }

  const typeLabel =
    reading.reading_type === "rune"
      ? "Rune"
      : reading.reading_type === "angel"
        ? "Angel Card"
        : "Tarot";

  const ctaLink =
    reading.reading_type === "rune"
      ? "/rune-reading"
      : reading.reading_type === "angel"
        ? "/angel-card-reading"
        : "/free-tarot-reading";

  const formattedDate = new Date(reading.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const shareUrl = `${window.location.origin}/reading/${reading.id}`;

  return (
    <>
      <SEOHead
        title={`${typeLabel} Reading — ${formattedDate}`}
        description={
          reading.question
            ? `${typeLabel} reading for: "${reading.question}"`
            : `A shared ${typeLabel.toLowerCase()} reading`
        }
        canonicalPath={`/reading/${reading.id}`}
      />

      <motion.div
        className="max-w-2xl mx-auto pt-8 px-4 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.span
            className="text-5xl block mb-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {reading.reading_type === "rune" ? "ᚱ" : reading.reading_type === "angel" ? "👼" : "🔮"}
          </motion.span>
          <h1 className="font-heading text-2xl md:text-4xl gold-text mb-3 tracking-wider">
            {typeLabel} Reading
          </h1>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
          {reading.question && (
            <p className="text-sm text-muted-foreground italic mt-2">"{reading.question}"</p>
          )}
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
                {card.position && (
                  <span className="text-xs font-heading text-primary/60 block">{card.position}</span>
                )}
                <span className="text-sm font-heading text-foreground block">{card.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {card.reversed ? "↻ Reversed" : "↑ Upright"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full interpretation */}
        <motion.div
          className="reading-panel rounded-xl p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-heading text-sm text-primary/70 mb-4 text-center tracking-wider uppercase">
            Interpretation
          </h2>
          <div className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line font-body">
            {reading.interpretation.replace(/\*\*/g, "")}
          </div>
        </motion.div>

        {/* Share this reading */}
        <motion.div
          className="reading-panel rounded-xl p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ShareButtons text="" url={shareUrl} />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center space-y-4 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="font-heading text-lg gold-text tracking-wider">
            What Do the Cards Say About You?
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Every reading is unique. The cards that appear for you carry a message meant only for your
            journey.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to={ctaLink}
              className="inline-block px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary/80 to-primary border border-primary/40 text-primary-foreground font-heading text-sm tracking-wider hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              ✦ Try Your Own {typeLabel} Reading
            </Link>
          </div>
        </motion.div>

        {/* More reading options */}
        <motion.div
          className="reading-panel rounded-xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
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
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
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

export default SavedReadingPage;
