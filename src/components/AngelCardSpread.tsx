import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { type DrawnAngelCard } from "@/data/angelCards";
import AngelCardComponent from "./AngelCardComponent";
import AngelDeckPicker from "./AngelDeckPicker";
import ReadingTable from "./ReadingTable";
import FocusMoment from "./FocusMoment";
import GradualReading from "./GradualReading";
import { generateAngelReading } from "@/lib/angelReading";
import cardBackImage from "@/assets/card-back.jpg";

interface AngelCardSpreadProps {
  question: string;
  onError: (msg: string) => void;
}

const AngelCardSpread = ({ question, onError }: AngelCardSpreadProps) => {
  const [phase, setPhase] = useState<"idle" | "choose-count" | "focus" | "picking" | "spread" | "loading" | "result">("idle");
  const [cards, setCards] = useState<DrawnAngelCard[]>([]);
  const [cardCount, setCardCount] = useState(1);
  const [reading, setReading] = useState("");

  const positionLabels = cardCount === 1
    ? ["Your Message"]
    : cardCount === 2
    ? ["Message 1", "Message 2"]
    : ["Past Guidance", "Present Wisdom", "Future Light"];

  const handleStart = () => {
    onError("");
    setPhase("choose-count");
  };

  const handleChooseCount = (count: number) => {
    setCardCount(count);
    setPhase("focus");
  };

  const handleFocusComplete = () => {
    setPhase("picking");
  };

  const handlePickComplete = (picked: DrawnAngelCard[]) => {
    setCards(picked);
    setPhase("spread");
  };

  const handleReveal = useCallback((index: number) => {
    setCards((prev) => {
      const updated = prev.map((dc, i) => (i === index ? { ...dc, isRevealed: true } : dc));
      const revealedCount = updated.filter((c) => c.isRevealed).length;

      if (revealedCount >= cardCount) {
        setTimeout(() => {
          setPhase("loading");
          const text = generateAngelReading(question, updated);
          setReading(text);
          setPhase("result");
        }, 800);
      }
      return updated;
    });
  }, [cardCount, question]);

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
            className="px-8 py-4 rounded-xl bg-accent/20 border-2 border-accent text-accent-foreground font-heading text-base md:text-lg tracking-widest hover:bg-accent/30 transition-all gold-glow active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Receive Angel Guidance
          </motion.button>
        </motion.div>
      )}

      {phase === "choose-count" && (
        <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-muted-foreground">How many angel cards would you like to choose?</p>
          <div className="flex gap-3">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => handleChooseCount(n)}
                className="px-6 py-3.5 rounded-lg bg-muted/50 border border-accent/30 text-foreground font-heading text-sm tracking-wider hover:bg-accent/20 hover:border-accent transition-all active:scale-95"
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

      {phase === "picking" && (
        <AngelDeckPicker
          requiredCount={cardCount}
          positions={positionLabels}
          onComplete={handlePickComplete}
        />
      )}

      {(phase === "spread" || phase === "loading" || phase === "result") && (
        <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ReadingTable>
            <div className="flex justify-center items-end gap-4 md:gap-10 flex-wrap">
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
              className="reading-panel rounded-xl p-5 md:p-6 max-w-lg w-full"
            >
              <h3 className="font-heading text-lg gold-text mb-3 text-center">Angel Message</h3>
              <GradualReading text={reading} interval={500} />

              <div className="mt-6 pt-4 border-t border-primary/10">
                <h4 className="font-heading text-xs gold-text mb-2 tracking-wider">Take a moment to reflect</h4>
                <p className="text-xs text-muted-foreground italic">What feelings arose as you received this angelic guidance?</p>
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <button
              onClick={handleReset}
              className="px-6 py-3.5 rounded-lg bg-secondary border border-accent/30 text-accent-foreground font-heading text-sm tracking-wider hover:bg-accent/20 transition-all active:scale-95"
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
