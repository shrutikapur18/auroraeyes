import { useState } from "react";
import { motion } from "framer-motion";
import type { DrawnCard } from "@/data/tarotDeck";
import cardBackImage from "@/assets/card-back.jpg";

interface TarotCardProps {
  drawnCard: DrawnCard;
  index: number;
  onReveal: (index: number) => void;
  rotation?: number;
  label?: string;
  compact?: boolean;
}

const TarotCardComponent = ({ drawnCard, index, onReveal, rotation = 0, label, compact }: TarotCardProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { card, isReversed, isRevealed } = drawnCard;

  const handleClick = () => {
    if (isRevealed || isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      onReveal(index);
      setIsFlipping(false);
    }, 600);
  };

  // Mobile-first: larger default, scale up on desktop
  const cardWidth = compact ? "w-[5.5rem] md:w-28" : "w-[6.5rem] md:w-36";
  const cardHeight = compact ? "h-[8.5rem] md:h-44" : "h-[10rem] md:h-56";

  const suitColor = card.suit === "Wands" ? "text-orange-400" :
    card.suit === "Cups" ? "text-blue-400" :
    card.suit === "Swords" ? "text-slate-300" :
    card.suit === "Pentacles" ? "text-yellow-400" : "text-primary";

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {label && (
        <span className="text-[10px] md:text-xs font-heading text-primary/80 tracking-widest uppercase">
          {label}
        </span>
      )}
      <motion.div
        className={`${cardWidth} ${cardHeight} cursor-pointer perspective-1000`}
        style={{ rotate: isRevealed ? 0 : rotation }}
        animate={!isRevealed ? { y: [0, -5, 0] } : {}}
        transition={!isRevealed ? { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" } : {}}
        whileHover={!isRevealed ? { scale: 1.08, y: -10, transition: { duration: 0.2 } } : {}}
        whileTap={!isRevealed ? { scale: 0.95, transition: { duration: 0.1 } } : {}}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isRevealed || isFlipping ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Card Back */}
          <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden border-2 border-primary/30 card-shadow hover:card-shadow-hover transition-shadow duration-300">
            <img
              src={cardBackImage}
              alt="Card back"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/0 hover:bg-primary/5 transition-colors duration-300" />
          </div>

          {/* Card Front */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden card-shine flex flex-col items-center justify-center p-2 text-center ${
              isRevealed ? "gold-glow-strong" : ""
            }`}
            style={{ transform: `rotateY(180deg) ${isReversed ? "rotate(180deg)" : ""}` }}
          >
            <div className={`text-2xl md:text-3xl mb-1 ${suitColor}`}>
              {card.symbol}
            </div>
            <div className="font-heading text-[11px] md:text-sm text-primary leading-tight px-1">
              {card.name}
            </div>
            {card.arcana === "Major" && (
              <div className="text-lg md:text-xl font-heading text-primary/60 mt-1">{card.symbol}</div>
            )}
            <div className="mt-1 text-[10px] text-muted-foreground italic">
              {isReversed ? "Reversed" : "Upright"}
            </div>
          </div>
        </motion.div>
      </motion.div>
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-[120px]"
        >
          <p className="text-[11px] md:text-xs font-heading text-primary">{card.name}</p>
          <p className="text-[10px] text-muted-foreground">
            {isReversed ? "↻ Reversed" : "↑ Upright"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TarotCardComponent;
