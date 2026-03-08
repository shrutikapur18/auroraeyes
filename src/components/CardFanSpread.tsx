import { useState, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import cardBackImage from "@/assets/card-back.jpg";
import type { DrawnCard } from "@/data/tarotDeck";
import { drawCards } from "@/data/tarotDeck";

interface CardFanSpreadProps {
  requiredCount: number;
  positions: string[];
  onComplete: (selectedCards: DrawnCard[]) => void;
}

const FAN_CARD_COUNT = 30;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const CardFanSpread = ({ requiredCount, positions, onComplete }: CardFanSpreadProps) => {
  const fanCards = useMemo(() => drawCards(FAN_CARD_COUNT), []);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const isMobile = useIsMobile();

  // Responsive fan geometry
  const totalArc = isMobile ? 90 : 120;
  const startAngle = -totalArc / 2;
  const angleStep = totalArc / (FAN_CARD_COUNT - 1);
  const radius = isMobile ? 240 : 380;
  const cardW = isMobile ? 46 : 70;
  const cardH = isMobile ? 72 : 110;
  const containerH = isMobile ? 260 : 340;
  const slotSpacing = isMobile ? 60 : 100;
  const slotY = isMobile ? -200 : -280;

  const handleSelect = useCallback(
    (index: number) => {
      if (selectedIndices.includes(index) || isComplete) return;
      const newSelected = [...selectedIndices, index];
      setSelectedIndices(newSelected);
      if (newSelected.length >= requiredCount) {
        setIsComplete(true);
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
      className="flex flex-col items-center gap-3 md:gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.p
        className="text-xs md:text-sm text-muted-foreground italic text-center max-w-md font-body relative z-20 px-4"
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
          className="flex gap-1.5 md:gap-2 mb-1 md:mb-2 relative z-20 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {positions.map((pos, i) => (
            <div
              key={pos}
              className={`px-2 md:px-3 py-1 md:py-1.5 rounded-md text-[10px] md:text-xs font-heading tracking-wider border transition-all ${
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
      <div className="relative w-full overflow-visible" style={{ height: containerH }}>
        <div
          className="absolute left-1/2"
          style={{ bottom: -radius + (isMobile ? 150 : 200), transform: "translateX(-50%)" }}
        >
          {fanCards.map((_, i) => {
            const isSelected = selectedIndices.includes(i);
            const selectionOrder = selectedIndices.indexOf(i);
            const angle = startAngle + i * angleStep;
            const rad = (angle * Math.PI) / 180;

            const x = Math.sin(rad) * radius;
            const y = -Math.cos(rad) * radius + radius;

            const isHovered = hoveredIndex === i;
            const isNearHover =
              hoveredIndex !== null &&
              Math.abs(i - hoveredIndex) <= 1 &&
              i !== hoveredIndex;

            const selectedSlotX = selectionOrder >= 0 ? (selectionOrder - (requiredCount - 1) / 2) * slotSpacing : 0;

            return (
              <motion.div
                key={i}
                className="absolute cursor-pointer"
                style={{
                  width: cardW,
                  height: cardH,
                  left: -cardW / 2,
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
                        x: selectedSlotX,
                        y: slotY,
                        rotate: 0,
                        opacity: 1,
                        scale: isMobile ? 1.05 : 1.1,
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
                    ? { y: y - (isMobile ? 15 : 25), transition: { duration: 0.15 } }
                    : {}
                }
              >
                <div
                  className={`w-full h-full rounded-md overflow-hidden border transition-all duration-200 ${
                    isSelected
                      ? "border-2 border-primary gold-glow-strong"
                      : isHovered
                      ? "border-2 border-primary/60 shadow-[0_0_20px_hsl(var(--gold)/0.3)]"
                      : "border border-primary/15 card-shadow"
                  }`}
                >
                  <img
                    src={cardBackImage}
                    alt="Tarot card"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  {isHovered && !isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </div>

                {isSelected && (
                  <motion.div
                    className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground text-[10px] md:text-xs font-heading flex items-center justify-center gold-glow"
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

      <p className="text-[10px] text-muted-foreground/60 text-center md:hidden relative z-20">
        Tap the card you feel drawn to
      </p>
    </motion.div>
  );
};

export default CardFanSpread;
