import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { drawCards } from "@/data/tarotDeck";
import { getYesNoAnswer, type YesNoAnswer } from "@/data/yesNoTarot";
import type { DrawnCard } from "@/data/tarotDeck";
import TarotCardComponent from "./TarotCardComponent";
import ReadingTable from "./ReadingTable";
import FocusMoment from "./FocusMoment";
import { generateLocalReading } from "@/lib/tarotReading";
import cardBackImage from "@/assets/card-back.jpg";

interface YesNoSpreadProps {
  question: string;
  onError: (msg: string) => void;
}

const YesNoSpread = ({ question, onError }: YesNoSpreadProps) => {
  const [phase, setPhase] = useState<"idle" | "focus" | "shuffling" | "card" | "loading" | "result">("idle");
  const [drawnCard, setDrawnCard] = useState<DrawnCard | null>(null);
  const [answer, setAnswer] = useState<YesNoAnswer | null>(null);
  const [reading, setReading] = useState("");

  const handleShuffle = () => {
    if (!question.trim()) {
      onError("Please enter your question first.");
      return;
    }
    onError("");
    setPhase("focus");
  };

  const handleFocusComplete = () => {
    setPhase("shuffling");
    const cards = drawCards(1);
    setDrawnCard({ ...cards[0], position: "Your Answer" });
    setTimeout(() => setPhase("card"), 2000);
  };

  const handleReveal = useCallback(async () => {
    if (!drawnCard) return;
    const revealed = { ...drawnCard, isRevealed: true };
    setDrawnCard(revealed);

    const yesNo = getYesNoAnswer(revealed.card.id, revealed.isReversed);
    setAnswer(yesNo);

    setPhase("loading");
    const text = generateLocalReading(
      `Yes/No question: "${question}" — The answer is ${yesNo.toUpperCase()}.`,
      [revealed]
    );
    setReading(text);
    setPhase("result");
  }, [drawnCard, question, onError]);

  const answerColor = answer === "yes" ? "text-green-400" : answer === "no" ? "text-red-400" : "text-primary";
  const answerText = answer === "yes" ? "YES" : answer === "no" ? "NO" : "MAYBE";

  const handleReset = () => {
    setPhase("idle");
    setDrawnCard(null);
    setAnswer(null);
    setReading("");
  };

  return (
    <div className="relative z-10">
      {phase === "idle" && (
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm text-muted-foreground italic text-center max-w-md">
            Focus on a yes or no question, then draw a single card for your answer.
          </p>
          <div className="relative w-28 h-44">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-lg overflow-hidden border border-primary/20 card-shadow"
                style={{ top: -i * 2, left: i * 1.5, zIndex: 3 - i }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src={cardBackImage} alt="Deck" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
          <motion.button
            onClick={handleShuffle}
            className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Draw Your Answer
          </motion.button>
        </motion.div>
      )}

      {phase === "focus" && (
        <FocusMoment onComplete={handleFocusComplete} />
      )}

      {phase === "shuffling" && (
        <motion.div
          className="flex flex-col items-center justify-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-28 h-44 mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-lg overflow-hidden border border-primary/20"
                animate={{
                  x: [0, (i % 2 === 0 ? 1 : -1) * 30, 0],
                  rotate: [0, (i % 2 === 0 ? 1 : -1) * 12, 0],
                }}
                transition={{ duration: 0.5, delay: i * 0.1, repeat: 3, ease: "easeInOut" }}
              >
                <img src={cardBackImage} alt="Shuffling" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
          <p className="font-heading text-primary text-sm tracking-widest animate-pulse">Shuffling...</p>
        </motion.div>
      )}

      {(phase === "card" || phase === "loading" || phase === "result") && drawnCard && (
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ReadingTable>
            <div className="flex justify-center">
              <TarotCardComponent
                drawnCard={drawnCard}
                index={0}
                onReveal={handleReveal}
                label="Your Answer"
              />
            </div>
          </ReadingTable>

          {answer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className={`font-heading text-4xl tracking-widest ${answerColor}`}>{answerText}</p>
            </motion.div>
          )}

          {phase === "loading" && (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-xs text-muted-foreground">Interpreting...</span>
            </div>
          )}

          {reading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="reading-panel rounded-xl p-6 max-w-lg text-sm text-foreground font-body leading-relaxed whitespace-pre-line"
            >
              {reading}

              <div className="mt-6 pt-4 border-t border-primary/10">
                <h4 className="font-heading text-xs gold-text mb-2 tracking-wider">Take a moment to reflect</h4>
                <p className="text-xs text-muted-foreground italic">Does this answer resonate with what you feel deep within?</p>
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-lg bg-secondary border border-primary/30 text-primary font-heading text-sm tracking-wider hover:bg-primary/20 transition-all"
            >
              Ask Another Question
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default YesNoSpread;
