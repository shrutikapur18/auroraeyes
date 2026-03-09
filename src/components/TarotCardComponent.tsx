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
  const [imgError, setImgError] = useState(false);
  const { card, isReversed, isRevealed } = drawnCard;

  const showFront = isFlipping || isRevealed;

  const handleClick = () => {
    if (isRevealed || isFlipping) return;
    setIsFlipping(true);
    // Fire onReveal first, then clear flipping flag after animation
    onReveal(index);
    setTimeout(() => {
      setIsFlipping(false);
    }, 700);
  };

  const cardWidth = compact ? "w-[5.5rem] md:w-28" : "w-[6.5rem] md:w-36";
  const cardHeight = compact ? "h-[8.5rem] md:h-44" : "h-[10rem] md:h-56";

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
    >
      {label && (
        <motion.span
          className="text-[10px] md:text-xs font-heading text-primary/80 tracking-widest uppercase"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12 + 0.3 }}
        >
          {label}
        </motion.span>
      )}
      <motion.div
        className={`${cardWidth} ${cardHeight} cursor-pointer perspective-1000`}
        style={{ rotate: isRevealed ? 0 : rotation }}
        animate={!isRevealed ? {
          y: [0, -6, 0],
          rotateZ: [rotation - 0.5, rotation + 0.5, rotation - 0.5]
        } : {}}
        transition={!isRevealed ? {
          duration: 4 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
        whileHover={!isRevealed ? {
          scale: 1.08,
          y: -12,
          rotateZ: 0,
          transition: { duration: 0.25, ease: "easeOut" }
        } : {}}
        whileTap={!isRevealed ? { scale: 0.96, transition: { duration: 0.1 } } : {}}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: showFront ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Card Back */}
          <div className={`absolute inset-0 backface-hidden rounded-lg overflow-hidden premium-card transition-all duration-500 group ${!isRevealed && !isFlipping ? 'premium-card-hover' : ''}`}>
            <img
              src={cardBackImage}
              alt="Card back"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 border-[3px] border-primary/20 rounded-lg pointer-events-none" />
            <div className="absolute inset-1 border border-primary/10 rounded-md pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/15 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100"
              animate={!isRevealed ? { x: ["-100%", "100%"] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                className="text-3xl text-primary/60"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ✦
              </motion.div>
            </div>
          </div>

          {/* Card Front - Now with image */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden transition-all duration-700 ${
              isRevealed ? "animate-glow-pulse" : ""
            }`}
            style={{ transform: `rotateY(180deg) ${isReversed ? "rotate(180deg)" : ""}` }}
          >
            {/* Card image */}
            {card.image && !imgError ? (
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
                loading="eager"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-card to-muted">
                <img
                  src={cardBackImage}
                  alt={card.name}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            )}

            {/* Overlay with card name */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 flex flex-col items-center justify-end p-2">
              <motion.p
                className="font-heading text-[10px] md:text-xs text-white/90 text-center leading-tight drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={isRevealed ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                {card.name}
              </motion.p>
              <motion.span
                className={`mt-1 text-[8px] md:text-[10px] font-heading tracking-wider px-2 py-0.5 rounded-full ${
                  isReversed
                    ? "bg-destructive/40 text-white border border-destructive/50"
                    : "bg-primary/40 text-white border border-primary/50"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                {isReversed ? "REVERSED" : "UPRIGHT"}
              </motion.span>
            </div>

            {/* Decorative border */}
            <div className="absolute inset-0 border-[2px] border-primary/30 rounded-lg pointer-events-none" />
            <div className="absolute inset-0.5 border border-primary/15 rounded-lg pointer-events-none" />

            {/* Soft glow effect */}
            {isRevealed && (
              <div className="absolute inset-0 shadow-[inset_0_0_20px_hsl(var(--primary)/0.15)] rounded-lg pointer-events-none" />
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Card name below when revealed */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center max-w-[120px]"
        >
          <p className="text-[11px] md:text-xs font-heading text-primary drop-shadow-sm">{card.name}</p>
          <p className={`text-[10px] font-medium ${isReversed ? "text-destructive/80" : "text-primary/60"}`}>
            {isReversed ? "↻ Reversed" : "↑ Upright"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TarotCardComponent;
