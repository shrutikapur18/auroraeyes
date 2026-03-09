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
  const [imgError, setImgError] = useState(false);
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
        className="w-24 md:w-28 h-28 md:h-32 cursor-pointer perspective-1000"
        animate={!isRevealed ? { y: [0, -4, 0] } : {}}
        transition={!isRevealed ? { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" } : {}}
        whileHover={!isRevealed ? { scale: 1.1, y: -8, transition: { duration: 0.2 } } : {}}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isRevealed || isFlipping ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Back - rune stone */}
          <div className="absolute inset-0 backface-hidden rounded-2xl rune-stone border-2 border-primary/20 flex items-center justify-center transition-shadow duration-300 hover:shadow-[0_0_20px_hsl(var(--gold)/0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/80 to-card/90" />
            <span className="relative font-heading text-primary/40 text-3xl">ᚱ</span>
          </div>

          {/* Front - rune with image */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-primary/40 overflow-hidden rune-stone ${isRevealed ? "gold-glow-strong" : ""}`}
            style={{
              transform: `rotateY(180deg) ${isReversed ? "rotate(180deg)" : ""}`,
            }}
          >
            {/* SVG rune image as background decoration */}
            {rune.image && !imgError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-card">
                <img
                  src={rune.image}
                  alt={rune.name}
                  className="w-12 h-12 md:w-16 md:h-16 opacity-20 invert"
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : null}

            {/* Rune symbol overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-transparent to-black/30">
              <motion.span
                className="text-3xl md:text-4xl text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                {rune.symbol}
              </motion.span>
              <motion.span
                className="text-[9px] font-heading text-primary/80 mt-1 tracking-wider"
                initial={{ opacity: 0 }}
                animate={isRevealed ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                {rune.name}
              </motion.span>
            </div>

            {/* Stone texture border */}
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(255,255,255,0.05)] pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>
      {isRevealed && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-[100px]">
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
