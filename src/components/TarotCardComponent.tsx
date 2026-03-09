import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const handleClick = () => {
    if (isRevealed || isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      onReveal(index);
      setIsFlipping(false);
    }, 600);
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
        className={`${cardWidth} ${cardHeight} cursor-pointer`}
        style={{ rotate: isRevealed ? 0 : rotation }}
        animate={!isRevealed && !isFlipping ? {
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
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Card Back */
            <motion.div
              key="back"
              className="relative w-full h-full rounded-lg overflow-hidden premium-card group"
              initial={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <img
                src={cardBackImage}
                alt="Card back"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 border-[3px] border-primary/20 rounded-lg pointer-events-none" />
              <div className="absolute inset-1 border border-primary/10 rounded-md pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/15 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  className="text-3xl text-primary/60"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ✦
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* Card Front */
            <motion.div
              key="front"
              className="relative w-full h-full rounded-lg overflow-hidden animate-glow-pulse"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={isReversed ? { rotate: 180 } : {}}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 flex flex-col items-center justify-end p-2">
                <p className="font-heading text-[10px] md:text-xs text-white/90 text-center leading-tight drop-shadow-lg">
                  {card.name}
                </p>
                <span
                  className={`mt-1 text-[8px] md:text-[10px] font-heading tracking-wider px-2 py-0.5 rounded-full ${
                    isReversed
                      ? "bg-destructive/40 text-white border border-destructive/50"
                      : "bg-primary/40 text-white border border-primary/50"
                  }`}
                >
                  {isReversed ? "REVERSED" : "UPRIGHT"}
                </span>
              </div>

              {/* Decorative border */}
              <div className="absolute inset-0 border-[2px] border-primary/30 rounded-lg pointer-events-none" />
              <div className="absolute inset-0.5 border border-primary/15 rounded-lg pointer-events-none" />

              {/* Soft glow effect */}
              <div className="absolute inset-0 shadow-[inset_0_0_20px_hsl(var(--primary)/0.15)] rounded-lg pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Card name below when revealed */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
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