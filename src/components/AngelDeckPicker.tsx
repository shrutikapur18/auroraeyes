import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { angelDeck, type AngelCard, type DrawnAngelCard } from "@/data/angelCards";
import cardBackImage from "@/assets/card-back.jpg";

interface AngelDeckPickerProps {
  requiredCount: number;
  positions: string[];
  onComplete: (selectedCards: DrawnAngelCard[]) => void;
}

const AngelDeckPicker = ({ requiredCount, positions, onComplete }: AngelDeckPickerProps) => {
  const shuffledDeck = useMemo(() => {
    const deck = [...angelDeck];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }, []);

  const rotations = useMemo(
    () => shuffledDeck.map(() => (Math.random() - 0.5) * 6),
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
        const result: DrawnAngelCard[] = newSelected.map((id, i) => ({
          card: shuffledDeck.find((c) => c.id === id)!,
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
        className="sticky top-16 z-30 w-full max-w-lg mx-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="reading-panel rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-xs md:text-sm font-heading text-accent-foreground tracking-wider">
            {isComplete
              ? "✦ The angels have guided your choice"
              : `Choose ${requiredCount} card${requiredCount !== 1 ? "s" : ""} — ${remaining} remaining`}
          </p>
          <div className="flex gap-1">
            {positions.map((pos, i) => (
              <span
                key={pos}
                className={`px-2 py-0.5 rounded-md text-[10px] font-heading tracking-wider border transition-all ${
                  i < selectedIds.length
                    ? "bg-accent/20 border-accent text-accent-foreground"
                    : "bg-muted/30 border-border/30 text-muted-foreground"
                }`}
              >
                {pos}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <p className="text-xs text-muted-foreground italic text-center px-4">
        Let the angels guide your hand. Tap the card that speaks to your heart.
      </p>

      {/* Angel cards grid */}
      <div className="w-full max-w-2xl mx-auto px-2">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-1.5 md:gap-2">
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
                  delay: Math.min(i * 0.015, 0.4),
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
                      ? "border-2 border-accent gold-glow-strong z-20 relative"
                      : "border border-accent/20 card-shadow hover:border-accent/50 hover:shadow-[0_0_15px_hsl(var(--angel-blue)/0.3)]"
                  }`}
                >
                  <img
                    src={cardBackImage}
                    alt="Angel card"
                    className="w-full h-full object-cover opacity-85"
                    loading="lazy"
                    draggable={false}
                  />
                  {/* Angel overlay tint */}
                  <div className="absolute inset-0 bg-gradient-to-b from-angel-blue/10 to-accent/10 pointer-events-none" />
                </div>

                {isSelected && (
                  <motion.div
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground text-[10px] md:text-xs font-heading flex items-center justify-center z-30"
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
        30 Angel cards with divine messages
      </p>
    </motion.div>
  );
};

export default AngelDeckPicker;
