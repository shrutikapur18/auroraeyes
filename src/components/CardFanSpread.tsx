import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cardBackImage from "@/assets/card-back.jpg";
import type { DrawnCard } from "@/data/tarotDeck";
import { drawCards } from "@/data/tarotDeck";

interface CardFanSpreadProps {
  requiredCount: number;
  positions: string[];
  onComplete: (selectedCards: DrawnCard[]) => void;
}

const FAN_CARD_COUNT = 30;

const CardFanSpread = ({ requiredCount, positions, onComplete }: CardFanSpreadProps) => {
  const fanCards = useMemo(() => drawCards(FAN_CARD_COUNT), []);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Fan geometry — cards spread in an arc
  const totalArc = 120; // degrees
  const startAngle = -totalArc / 2;
  const angleStep = totalArc / (FAN_CARD_COUNT - 1);
  const radius = 380; // arc radius from pivot point

  const handleSelect = useCallback(
    (index: number) => {
      if (selectedIndices.includes(index) || isComplete) return;

      const newSelected = [...selectedIndices, index];
      setSelectedIndices(newSelected);

      if (newSelected.length >= requiredCount) {
        setIsComplete(true);
        // Gather the selected cards with positions
        const result = newSelected.map((fanIdx, i) => ({
          ...fanCards[fanIdx],
          position: positions[i],
        }));
        setTimeout(() => onComplete(result), 800);
      }
    },
    [selectedIndices, isComplete, requiredCount, positions, fanCards, onComplete]
  );

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.p
        className="text-sm text-muted-foreground italic text-center max-w-md font-body relative z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {isComplete
          ? "The cards have been chosen…"
          : `Let your intuition guide you. Choose ${requiredCount - selectedIndices.length} card${requiredCount - selectedIndices.length !== 1 ? "s" : ""} from the spread.`}
      </motion.p>

      {/* Selected cards indicator */}
      {selectedIndices.length > 0 && (
        <motion.div
          className="flex gap-2 mb-2 relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {positions.map((pos, i) => (
            <div
              key={pos}
              className={`px-3 py-1.5 rounded-md text-xs font-heading tracking-wider border transition-all ${
                i < selectedIndices.length
                  ? "bg-primary/20 border-primary text-primary gold-glow"
                  : "bg-muted/30 border-border/30 text-muted-foreground"
              }`}
            >
              {pos}
            </div>
          ))}
        </motion.div>
      )}

      {/* The fan of cards */}
      <div className="relative w-full overflow-visible" style={{ height: 340 }}>
        <div
          className="absolute left-1/2"
          style={{ bottom: -radius + 200, transform: "translateX(-50%)" }}
        >
          {fanCards.map((_, i) => {
            const isSelected = selectedIndices.includes(i);
            const selectionOrder = selectedIndices.indexOf(i);
            const angle = startAngle + i * angleStep;
            const rad = (angle * Math.PI) / 180;

            // Position on the arc
            const x = Math.sin(rad) * radius;
            const y = -Math.cos(rad) * radius + radius;

            const isHovered = hoveredIndex === i;
            const isNearHover =
              hoveredIndex !== null &&
              Math.abs(i - hoveredIndex) <= 1 &&
              i !== hoveredIndex;

            // When selected, animate to a slot position above the fan
            const slotX = selectionOrder >= 0 ? (selectionOrder - (requiredCount - 1) / 2) * 100 : 0;
            const slotY = selectionOrder >= 0 ? -280 : 0;

            return (
              <motion.div
                key={i}
                className={`absolute cursor-pointer`}
                style={{
                  width: 70,
                  height: 110,
                  left: -35,
                  top: 0,
                  zIndex: isSelected ? 100 + selectionOrder : isHovered ? 60 : i,
                  pointerEvents: isSelected || isComplete ? "none" : "auto",
                  transformOrigin: "center bottom",
                }}
                initial={{
                  x: 0,
                  y: radius,
                  rotate: 0,
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={
                  isSelected
                    ? {
                        x: slotX,
                        y: slotY,
                        rotate: 0,
                        opacity: 1,
                        scale: 1.1,
                      }
                    : {
                        x,
                        y,
                        rotate: angle,
                        opacity: isComplete ? 0.3 : 1,
                        scale: isHovered ? 1.15 : isNearHover ? 1.04 : 1,
                      }
                }
                transition={
                  isSelected
                    ? { type: "spring", stiffness: 120, damping: 18, delay: 0.05 }
                    : {
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        delay: i * 0.015,
                      }
                }
                onMouseEnter={() => !isSelected && setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSelect(i)}
                whileHover={
                  !isSelected && !isComplete
                    ? { y: y - 25, transition: { duration: 0.15 } }
                    : {}
                }
              >
                <div
                  className={`w-full h-full rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-primary gold-glow-strong"
                      : isHovered
                      ? "border-primary/60 shadow-[0_0_20px_hsl(var(--gold)/0.3)]"
                      : "border-primary/15 card-shadow"
                  }`}
                >
                  <img
                    src={cardBackImage}
                    alt="Tarot card"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  {/* Hover glow overlay */}
                  {isHovered && !isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </div>

                {/* Selection number badge */}
                {isSelected && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-heading flex items-center justify-center gold-glow"
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

      {/* Mobile: touch-friendly instruction */}
      <p className="text-[10px] text-muted-foreground/60 text-center md:hidden relative z-20">
        Tap the card you feel drawn to
      </p>
    </motion.div>
  );
};

export default CardFanSpread;
