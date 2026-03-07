import { useState } from "react";
import { motion } from "framer-motion";
import type { DrawnRune } from "@/data/runes";

interface RuneComponentProps {
  drawnRune: DrawnRune;
  index: number;
  onReveal: (index: number) => void;
  label?: string;
}

const RuneComponent = ({ drawnRune, index, onReveal, label }: RuneComponentProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { rune, isReversed, isRevealed } = drawnRune;

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
        className="w-20 md:w-24 h-24 md:h-28 cursor-pointer perspective-1000"
        animate={!isRevealed ? { y: [0, -4, 0] } : {}}
        transition={!isRevealed ? { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" } : {}}
        whileHover={!isRevealed ? { scale: 1.1, y: -6 } : {}}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isRevealed || isFlipping ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Back - rune stone */}
          <div className="absolute inset-0 backface-hidden rounded-full border-2 border-primary/30 gold-glow-hover flex items-center justify-center"
            style={{ background: "radial-gradient(circle, hsl(250 20% 22%), hsl(250 25% 12%))" }}>
            <span className="font-heading text-primary/40 text-2xl">?</span>
          </div>

          {/* Front */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-full border-2 border-primary/40 flex flex-col items-center justify-center ${isRevealed ? "gold-glow" : ""}`}
            style={{
              transform: `rotateY(180deg) ${isReversed ? "rotate(180deg)" : ""}`,
              background: "radial-gradient(circle, hsl(250 20% 18%), hsl(250 25% 10%))",
            }}
          >
            <span className="text-2xl md:text-3xl text-primary">{rune.symbol}</span>
            <span className="text-[9px] font-heading text-primary/70 mt-1">{rune.name}</span>
          </div>
        </motion.div>
      </motion.div>
      {isRevealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-[100px]">
          <p className="text-xs font-heading text-primary">{rune.name}</p>
          <p className="text-[10px] text-muted-foreground">
            {isReversed ? "↻ Reversed" : "↑ Upright"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RuneComponent;
