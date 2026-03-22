import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import cardBackImage from "@/assets/card-back.jpg";

interface InteractiveShuffleProps {
  onComplete: (seed: number) => void;
  minPresses?: number;
  label?: string;
}

const InteractiveShuffle = ({ onComplete, minPresses = 3 }: InteractiveShuffleProps) => {
  const [presses, setPresses] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timings = useRef<number[]>([]);

  const generateSeed = useCallback(() => {
    const now = Date.now();
    const intervals = timings.current.reduce((acc, t, i) => {
      if (i > 0) acc.push(t - timings.current[i - 1]);
      return acc;
    }, [] as number[]);
    const combined = intervals.reduce((a, b) => a ^ (b * 31), now) ^ (presses * 7919);
    return Math.abs(combined);
  }, [presses]);

  const handlePress = () => {
    if (isAnimating) return;
    timings.current.push(Date.now());
    const newPresses = presses + 1;
    setPresses(newPresses);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      if (newPresses >= minPresses + 2) {
        const seed = generateSeed();
        onComplete(seed);
      }
    }, 500);
  };

  const handleDone = () => {
    if (presses < minPresses) return;
    const seed = generateSeed();
    onComplete(seed);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="text-xs text-muted-foreground/50 italic text-center max-w-sm tracking-wide">
        Each shuffle weaves your energy into the cards
      </p>

      {/* Card deck visualization */}
      <div className="relative w-32 h-48">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-lg overflow-hidden border border-primary/15"
            style={{ top: -i * 2, left: i * 1.5, zIndex: 5 - i }}
            animate={
              isAnimating
                ? {
                    x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 5), 0],
                    y: [0, -15 - i * 3, 0],
                    rotate: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 2), 0],
                  }
                : { y: [0, -3, 0] }
            }
            transition={
              isAnimating
                ? { duration: 0.4, delay: i * 0.05, ease: "easeInOut" }
                : { duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <img src={cardBackImage} alt="Tarot deck" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>

      {/* Shuffle button */}
      <motion.button
        onClick={handlePress}
        className={`px-10 py-4 rounded-xl border border-primary/30 text-primary font-heading text-base tracking-[0.2em] transition-all duration-500 ${
          isAnimating ? "opacity-50" : "hover:bg-primary/10 hover:border-primary/40"
        } ${presses > 0 ? "shuffle-pulse" : "bg-primary/5"}`}
        whileHover={!isAnimating ? { scale: 1.04 } : {}}
        whileTap={!isAnimating ? { scale: 0.96 } : {}}
        disabled={isAnimating}
      >
        Shuffle the Deck
      </motion.button>

      {/* Progress */}
      {presses > 0 && (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex gap-1.5">
            {Array.from({ length: minPresses }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${i < presses ? "bg-primary/70" : "bg-muted/40"}`}
                animate={i < presses ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/40 italic tracking-wide">
            {presses < minPresses
              ? `${minPresses - presses} more shuffle${minPresses - presses > 1 ? "s" : ""} to infuse your energy`
              : "Your energy has been woven into the deck"}
          </p>

          {presses >= minPresses && (
            <motion.button
              onClick={handleDone}
              className="mt-2 mystical-button px-8 py-3.5 rounded-xl font-heading text-sm tracking-[0.2em]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px hsl(43 70% 65% / 0.3)" }}
              whileTap={{ scale: 0.96 }}
            >
              Begin the Reading
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default InteractiveShuffle;
