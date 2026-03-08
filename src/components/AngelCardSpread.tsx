import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { drawAngelCards, type DrawnAngelCard } from "@/data/angelCards";
import AngelCardComponent from "./AngelCardComponent";
import ReadingTable from "./ReadingTable";
import FocusMoment from "./FocusMoment";
import { generateAngelReading } from "@/lib/angelReading";
import cardBackImage from "@/assets/card-back.jpg";

interface AngelCardSpreadProps {
  question: string;
  onError: (msg: string) => void;
}

const AngelCardSpread = ({ question, onError }: AngelCardSpreadProps) => {
  const [phase, setPhase] = useState<"idle" | "choose-count" | "focus" | "shuffling" | "spread" | "loading" | "result">("idle");
  const [cards, setCards] = useState<DrawnAngelCard[]>([]);
  const [cardCount, setCardCount] = useState(1);
  const [reading, setReading] = useState("");

  const handleStart = () => {
    if (!question.trim()) {
      onError("Please enter your question first.");
      return;
    }
    onError("");
    setPhase("choose-count");
  };

  const handleShuffle = (count: number) => {
    setCardCount(count);
    setPhase("focus");
  };

  const handleFocusComplete = () => {
    setPhase("shuffling");
    const drawn = drawAngelCards(cardCount);
    const labels = cardCount === 1 ? ["Your Message"] : cardCount === 2 ? ["Message 1", "Message 2"] : ["Past Guidance", "Present Wisdom", "Future Light"];
    setCards(drawn.map((d, i) => ({ ...d, position: labels[i] })));
    setTimeout(() => setPhase("spread"), 1800);
  };

  const handleReveal = useCallback((index: number) => {
    setCards((prev) => {
      const updated = prev.map((dc, i) => (i === index ? { ...dc, isRevealed: true } : dc));
      const revealedCount = updated.filter((c) => c.isRevealed).length;

      if (revealedCount >= cardCount) {
        setTimeout(async () => {
          const check = canDoReading();
          if (!check.allowed) {
            onError(check.reason || "");
            return;
          }
          recordReading();
          setPhase("loading");
          const text = await generateAngelReading(question, updated);
          setReading(text);
          setPhase("result");
        }, 800);
      }
      return updated;
    });
  }, [cardCount, question, onError]);

  const handleReset = () => {
    setPhase("idle");
    setCards([]);
    setReading("");
  };

  return (
    <div className="relative z-10">
      {phase === "idle" && (
        <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-muted-foreground italic text-center max-w-md">
            Receive loving guidance from the angels. Focus on your question.
          </p>
          <div className="relative w-28 h-44">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-lg overflow-hidden border border-angel-blue/30 card-shadow"
                style={{ top: -i * 2, left: i * 1.5, zIndex: 3 - i }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src={cardBackImage} alt="Deck" className="w-full h-full object-cover opacity-80" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-b from-angel-blue/10 to-accent/10 flex items-center justify-center">
                  <span className="text-2xl opacity-70">👼</span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            onClick={handleStart}
            className="px-8 py-4 rounded-xl bg-accent/20 border-2 border-accent text-accent-foreground font-heading text-lg tracking-widest hover:bg-accent/30 transition-all gold-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Receive Angel Guidance
          </motion.button>
        </motion.div>
      )}

      {phase === "choose-count" && (
        <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-muted-foreground">How many angel cards would you like to draw?</p>
          <div className="flex gap-3">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => handleShuffle(n)}
                className="px-6 py-3 rounded-lg bg-muted/50 border border-accent/30 text-foreground font-heading text-sm tracking-wider hover:bg-accent/20 hover:border-accent transition-all"
              >
                {n} Card{n > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {phase === "focus" && (
        <FocusMoment onComplete={handleFocusComplete} method="angel" />
      )}

      {phase === "shuffling" && (
        <motion.div className="flex flex-col items-center py-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="relative w-28 h-44 mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-lg overflow-hidden border border-angel-blue/20"
                animate={{ x: [0, (i % 2 === 0 ? 1 : -1) * 30, 0], rotate: [0, (i % 2 === 0 ? 1 : -1) * 10, 0] }}
                transition={{ duration: 0.5, delay: i * 0.1, repeat: 3, ease: "easeInOut" }}
              >
                <img src={cardBackImage} alt="Shuffling" className="w-full h-full object-cover opacity-80" />
              </motion.div>
            ))}
          </div>
          <p className="font-heading text-accent text-sm tracking-widest animate-pulse">Calling upon the angels...</p>
        </motion.div>
      )}

      {(phase === "spread" || phase === "loading" || phase === "result") && (
        <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ReadingTable>
            <div className="flex justify-center items-end gap-6 md:gap-10">
              {cards.map((dc, i) => (
                <AngelCardComponent key={i} drawnCard={dc} index={i} onReveal={handleReveal} label={dc.position} />
              ))}
            </div>
          </ReadingTable>

          {phase === "loading" && (
            <div className="flex items-center gap-2 mt-4">
              <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              <span className="text-xs text-muted-foreground">Receiving angel guidance...</span>
            </div>
          )}

          {reading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="reading-panel rounded-xl p-6 max-w-lg text-sm text-foreground font-body leading-relaxed whitespace-pre-line"
            >
              <h3 className="font-heading text-lg gold-text mb-3 text-center">Angel Message</h3>
              {reading}

              <div className="mt-6 pt-4 border-t border-primary/10">
                <h4 className="font-heading text-xs gold-text mb-2 tracking-wider">Take a moment to reflect</h4>
                <p className="text-xs text-muted-foreground italic">What feelings arose as you received this angelic guidance?</p>
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-lg bg-secondary border border-accent/30 text-accent-foreground font-heading text-sm tracking-wider hover:bg-accent/20 transition-all"
            >
              Draw New Cards
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AngelCardSpread;
