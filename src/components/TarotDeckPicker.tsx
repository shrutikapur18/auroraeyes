import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cardBackImage from "@/assets/card-back.jpg";
import { tarotDeck, type TarotCard, type DrawnCard } from "@/data/tarotDeck";

interface TarotDeckPickerProps {
  requiredCount: number;
  positions: string[];
  onComplete: (selectedCards: DrawnCard[]) => void;
}

const TarotDeckPicker = ({ requiredCount, positions, onComplete }: TarotDeckPickerProps) => {
  // Shuffle deck once on mount
  const shuffledDeck = useMemo(() => {
    const deck = [...tarotDeck];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }, []);

  // Random slight rotations for natural look
  const rotations = useMemo(
    () => shuffledDeck.map(() => (Math.random() - 0.5) * 8),
    [shuffledDeck]
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const remaining = requiredCount - selectedIds.length;

  const handleSelect = useCallback(
    (cardId: number) => {
      if (selectedIds.includes(cardId) || isComplete) return;
      const newSelected = [...selectedIds, cardId];
      setSelectedIds(newSelected);

      if (newSelected.length >= requiredCount) {
        setIsComplete(true);
        const result: DrawnCard[] = newSelected.map((id, i) => ({
          card: shuffledDeck.find((c) => c.id === id)!,
          isReversed: Math.random() > 0.5,
          position: positions[i],
          isRevealed: false,
        }));
        setTimeout(() => onComplete(result), 900);
      }
    },
    [selectedIds, isComplete, requiredCount, positions, shuffledDeck, onComplete]
  );

  return (
    <motion.div
      className="flex flex-col items-center gap-4 md:gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Status bar */}
      <motion.div
        className="sticky top-16 z-30 w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="reading-panel rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-xs md:text-sm font-heading text-primary tracking-wider">
            {isComplete
              ? "✦ The cards have been chosen"
              : `Choose ${requiredCount} card${requiredCount !== 1 ? "s" : ""} — ${remaining} remaining`}
          </p>
          {/* Position chips */}
          <div className="flex gap-1 flex-wrap justify-end">
            {positions.map((pos, i) => (
              <span
                key={pos}
                className={`px-2 py-0.5 rounded-md text-[10px] font-heading tracking-wider border transition-all ${
                  i < selectedIds.length
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-muted/30 border-border/30 text-muted-foreground"
                }`}
              >
                {pos}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Instruction */}
      <p className="text-xs text-muted-foreground italic text-center px-4">
        Let your intuition guide you. Tap the card that calls to you.
      </p>

      {/* Full deck grid */}
      <div className="w-full max-w-3xl mx-auto px-2">
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-13 gap-1.5 md:gap-2">
          {shuffledDeck.map((card, i) => {
            const isSelected = selectedIds.includes(card.id);
            const selectionOrder = selectedIds.indexOf(card.id);

            return (
              <motion.div
                key={card.id}
                className="relative cursor-pointer"
                style={{ aspectRatio: "2/3" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isComplete && !isSelected ? 0.3 : 1,
                  scale: isSelected ? 1.08 : 1,
                  rotate: isSelected ? 0 : rotations[i],
                }}
                transition={{
                  delay: Math.min(i * 0.008, 0.5),
                  duration: 0.3,
                }}
                whileHover={
                  !isSelected && !isComplete
                    ? { scale: 1.12, y: -6, zIndex: 50, transition: { duration: 0.15 } }
                    : {}
                }
                whileTap={
                  !isSelected && !isComplete
                    ? { scale: 0.95, transition: { duration: 0.1 } }
                    : {}
                }
                onClick={() => handleSelect(card.id)}
              >
                <div
                  className={`w-full h-full rounded-md overflow-hidden border transition-all duration-200 ${
                    isSelected
                      ? "border-2 border-primary gold-glow-strong z-20 relative"
                      : "border border-primary/15 card-shadow hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--gold)/0.25)]"
                  }`}
                >
                  <img
                    src={cardBackImage}
                    alt="Tarot card"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* Selection badge */}
                {isSelected && (
                  <motion.div
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground text-[10px] md:text-xs font-heading flex items-center justify-center gold-glow z-30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {selectionOrder + 1}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground/60 text-center pb-4">
        78 cards from the Rider-Waite tradition
      </p>
    </motion.div>
  );
};

export default TarotDeckPicker;
