import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { drawCards } from "@/data/tarotDeck";
import type { DrawnCard } from "@/data/tarotDeck";
import TarotCardComponent from "./TarotCardComponent";
import { generateLocalReading } from "@/lib/tarotReading";

const DailyCard = () => {
  const [dailyCard, setDailyCard] = useState<DrawnCard | null>(null);
  const [reading, setReading] = useState("");

  const drawDaily = () => {
    const cards = drawCards(1);
    const card = { ...cards[0], position: "Daily Guidance", isRevealed: false };
    setDailyCard(card);
    setReading("");
  };

  const revealDaily = () => {
    if (!dailyCard) return;
    const revealed = { ...dailyCard, isRevealed: true };
    setDailyCard(revealed);
    setReading(generateLocalReading("What does today hold for me?", [revealed]));
  };

  return (
    <motion.div
      className="relative z-10 mt-12 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <div className="text-center mb-4">
        <h2 className="font-heading text-xl gold-text mb-1">Daily Tarot Card</h2>
        <p className="text-xs text-muted-foreground">Draw one card for today's guidance</p>
      </div>

      {!dailyCard ? (
        <div className="flex justify-center">
          <button
            onClick={drawDaily}
            className="px-6 py-3 rounded-lg bg-secondary border border-primary/30 text-primary font-heading text-sm tracking-wider hover:bg-primary/20 transition-all gold-glow-hover"
          >
            Draw Daily Card
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <TarotCardComponent
            drawnCard={dailyCard}
            index={0}
            onReveal={revealDaily}
            label="Today's Card"
          />
          {reading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="reading-panel rounded-xl p-5 max-w-md text-sm text-foreground font-body leading-relaxed whitespace-pre-line"
            >
              {reading}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default DailyCard;
