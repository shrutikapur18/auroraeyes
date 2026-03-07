import { useState } from "react";
import { motion } from "framer-motion";
import type { DrawnAngelCard } from "@/data/angelCards";
import cardBackImage from "@/assets/card-back.jpg";

interface AngelCardComponentProps {
  drawnCard: DrawnAngelCard;
  index: number;
  onReveal: (index: number) => void;
  label?: string;
}

const AngelCardComponent = ({ drawnCard, index, onReveal, label }: AngelCardComponentProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { card, isRevealed } = drawnCard;

  const handleClick = () => {
    if (isRevealed || isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      onReveal(index);
      setIsFlipping(false);
    }, 600);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      {label && (
        <span className="text-xs font-heading text-primary/80 tracking-widest uppercase">{label}</span>
      )}
      <motion.div
        className="w-28 md:w-36 h-44 md:h-56 cursor-pointer perspective-1000"
        animate={!isRevealed ? { y: [0, -5, 0] } : {}}
        transition={!isRevealed ? { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" } : {}}
        whileHover={!isRevealed ? { scale: 1.08, y: -8 } : {}}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isRevealed || isFlipping ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Back */}
          <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden border-2 border-accent/40 gold-glow-hover">
            <img src={cardBackImage} alt="Card back" className="w-full h-full object-cover opacity-80" loading="lazy" />
            <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
              <span className="text-3xl">👼</span>
            </div>
          </div>

          {/* Front */}
          <div
            className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden flex flex-col items-center justify-center p-3 text-center border-2 border-accent/40 gold-glow"
            style={{
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, hsl(265 50% 20%), hsl(230 60% 15%))",
            }}
          >
            <div className="text-3xl mb-2">{card.symbol}</div>
            <div className="font-heading text-xs md:text-sm text-primary leading-tight">{card.name}</div>
            <div className="text-[10px] text-muted-foreground mt-2 leading-snug italic px-1">
              {card.message.slice(0, 60)}…
            </div>
          </div>
        </motion.div>
      </motion.div>
      {isRevealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-[140px]">
          <p className="text-xs font-heading text-primary">{card.name}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{card.keywords.join(" · ")}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AngelCardComponent;
