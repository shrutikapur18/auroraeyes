import { motion } from "framer-motion";
import TarotCardComponent from "./TarotCardComponent";
import type { DrawnCard } from "@/data/tarotDeck";
import { threeCardPositions } from "@/data/tarotDeck";

interface ThreeCardSpreadProps {
  cards: DrawnCard[];
  onReveal: (index: number) => void;
}

const ThreeCardSpread = ({ cards, onReveal }: ThreeCardSpreadProps) => {
  const allRevealed = cards.every((c) => c.isRevealed);

  return (
    <div className="relative z-10">
      {!allRevealed && (
        <motion.p
          className="text-center text-sm text-muted-foreground mb-6 font-body italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Take a moment and choose the card you feel drawn to.
        </motion.p>
      )}
      <div className="flex justify-center items-end gap-4 md:gap-8 flex-wrap">
        {cards.map((dc, i) => (
          <TarotCardComponent
            key={i}
            drawnCard={{ ...dc, position: threeCardPositions[i] }}
            index={i}
            onReveal={onReveal}
            rotation={(i - 1) * 5}
            label={threeCardPositions[i]}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreeCardSpread;
