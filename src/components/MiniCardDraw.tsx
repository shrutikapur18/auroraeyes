import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tarotDeck } from "@/data/tarotDeck";

interface MiniCardDrawProps {
  prompt?: string;
}

/**
 * Lightweight single-card draw widget to embed in content pages.
 * Increases engagement and time-on-page.
 */
const MiniCardDraw = ({ prompt = "Draw a card for quick insight." }: MiniCardDrawProps) => {
  const [drawn, setDrawn] = useState<{ card: typeof tarotDeck[0]; reversed: boolean } | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const draw = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      const card = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
      const reversed = Math.random() < 0.3;
      setDrawn({ card, reversed });
      setIsFlipping(false);
    }, 600);
  }, []);

  return (
    <div className="reading-panel rounded-xl p-5 md:p-6 my-8 text-center border border-primary/10">
      <p className="text-sm text-muted-foreground mb-4">{prompt}</p>

      <AnimatePresence mode="wait">
        {!drawn && !isFlipping && (
          <motion.button
            key="btn"
            onClick={draw}
            className="px-6 py-3 rounded-lg bg-primary/15 border border-primary/30 text-primary font-heading text-sm tracking-wider hover:bg-primary/25 transition-all active:scale-95"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ✨ Draw a Card
          </motion.button>
        )}

        {isFlipping && (
          <motion.div
            key="flip"
            className="w-16 h-24 mx-auto rounded-lg bg-primary/20 border border-primary/30"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {drawn && !isFlipping && (
          <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <span className="text-4xl block" role="img" aria-label={`${drawn.card.name} tarot card`}>
              {drawn.card.symbol}
            </span>
            <h4 className="font-heading text-base text-foreground">
              {drawn.card.name} {drawn.reversed && <span className="text-xs text-muted-foreground">(Reversed)</span>}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
              {drawn.reversed ? drawn.card.meaning_rev : drawn.card.meaning_up}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={draw} className="text-xs text-primary hover:underline">Draw Again</button>
              <a href={`/tarot-card-meanings/${drawn.card.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`} className="text-xs text-primary hover:underline">
                Full Meaning →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiniCardDraw;
