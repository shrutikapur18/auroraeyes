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
    }, 700);
  };

  // Mobile-first: larger default, scale up on desktop
  const cardWidth = compact ? "w-[5.5rem] md:w-28" : "w-[6.5rem] md:w-36";
  const cardHeight = compact ? "h-[8.5rem] md:h-44" : "h-[10rem] md:h-56";

  const suitColor = card.suit === "Wands" ? "text-orange-400" :
    card.suit === "Cups" ? "text-blue-400" :
    card.suit === "Swords" ? "text-slate-300" :
    card.suit === "Pentacles" ? "text-yellow-400" : "text-primary";

  const suitGlow = card.suit === "Wands" ? "shadow-orange-500/30" :
    card.suit === "Cups" ? "shadow-blue-500/30" :
    card.suit === "Swords" ? "shadow-slate-400/30" :
    card.suit === "Pentacles" ? "shadow-yellow-500/30" : "shadow-primary/30";

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
          animate={{ rotateY: isRevealed || isFlipping ? 180 : 0 }}
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
            {/* Ornate border overlay */}
            <div className="absolute inset-0 border-[3px] border-primary/20 rounded-lg pointer-events-none" />
            <div className="absolute inset-1 border border-primary/10 rounded-md pointer-events-none" />
            
            {/* Glow overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/15 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Shimmer effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100"
              animate={!isRevealed ? { x: ["-100%", "100%"] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
            
            {/* Mystical symbol center */}
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

          {/* Card Front */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden card-front-premium flex flex-col items-center justify-center p-2 md:p-3 text-center transition-all duration-700 ${
              isRevealed ? "premium-card-revealed animate-glow-pulse" : ""
            }`}
            style={{ transform: `rotateY(180deg) ${isReversed ? "rotate(180deg)" : ""}` }}
          >
            {/* Decorative corner flourishes */}
            <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-primary/30 rounded-tl-sm" />
            <div className="absolute top-1 right-1 w-4 h-4 border-t border-r border-primary/30 rounded-tr-sm" />
            <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l border-primary/30 rounded-bl-sm" />
            <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-primary/30 rounded-br-sm" />
            
            {/* Card content */}
            <motion.div 
              className={`text-3xl md:text-4xl mb-2 ${suitColor} drop-shadow-lg`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {card.symbol}
            </motion.div>
            
            <motion.div 
              className="font-heading text-[11px] md:text-sm text-primary leading-tight px-1"
              initial={{ opacity: 0, y: 10 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {card.name}
            </motion.div>
            
            {card.arcana === "Major" && (
              <motion.div 
                className="text-base md:text-lg font-heading text-primary/40 mt-1"
                initial={{ opacity: 0 }}
                animate={isRevealed ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                {card.number !== undefined ? `${card.number}` : ""}
              </motion.div>
            )}
            
            <motion.div 
              className={`mt-2 text-[10px] font-heading tracking-wider px-2 py-0.5 rounded-full ${
                isReversed 
                  ? "bg-destructive/20 text-destructive border border-destructive/30" 
                  : "bg-primary/20 text-primary border border-primary/30"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {isReversed ? "REVERSED" : "UPRIGHT"}
            </motion.div>
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
