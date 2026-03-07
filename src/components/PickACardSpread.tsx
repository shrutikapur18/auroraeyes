import { motion } from "framer-motion";
import TarotCardComponent from "./TarotCardComponent";
import type { DrawnCard } from "@/data/tarotDeck";

interface PickACardSpreadProps {
  cards: DrawnCard[];
  onReveal: (index: number) => void;
}

const PickACardSpread = ({ cards, onReveal }: PickACardSpreadProps) => {
  const anyRevealed = cards.some((c) => c.isRevealed);

  return (
    <div className="relative z-10">
      {!anyRevealed && (
        <motion.p
          className="text-center text-sm text-muted-foreground mb-6 font-body italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Focus on your question and choose the card you feel most drawn to.
        </motion.p>
      )}
      <div className="flex justify-center items-end gap-6 md:gap-10">
        {cards.map((dc, i) => (
          <TarotCardComponent
            key={i}
            drawnCard={dc}
            index={i}
            onReveal={onReveal}
            rotation={(i - 1) * 8}
            label={`Card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PickACardSpread;
