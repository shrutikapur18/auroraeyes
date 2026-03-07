import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cardBackImage from "@/assets/card-back.jpg";

interface InteractiveShuffleProps {
  onComplete: (seed: number) => void;
  minPresses?: number;
  label?: string;
}

const InteractiveShuffle = ({ onComplete, minPresses = 3, label = "Shuffle the Cards" }: InteractiveShuffleProps) => {
  const [presses, setPresses] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timings = useRef<number[]>([]);
  const shuffleKey = useRef(0);

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
    shuffleKey.current++;
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      if (newPresses >= minPresses + 2) {
        // Auto-complete after enough presses
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

  const progress = Math.min(presses / minPresses, 1);

  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="text-xs text-muted-foreground italic text-center max-w-sm">
        Your actions influence the order of the cards. Press shuffle to infuse your energy.
      </p>

      {/* Card deck visualization */}
      <div className="relative w-32 h-48">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-lg overflow-hidden border border-primary/20 card-shadow"
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
        className={`px-8 py-4 rounded-xl border-2 border-primary text-primary font-heading text-lg tracking-widest transition-all ${
          isAnimating ? "opacity-50" : "hover:bg-primary/30"
        } ${presses > 0 ? "shuffle-pulse" : "bg-primary/20 gold-glow"}`}
        whileHover={!isAnimating ? { scale: 1.05 } : {}}
        whileTap={!isAnimating ? { scale: 0.95 } : {}}
        disabled={isAnimating}
      >
        {label}
      </motion.button>

      {/* Progress indicator */}
      {presses > 0 && (
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex gap-1">
            {Array.from({ length: minPresses }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${i < presses ? "bg-primary" : "bg-muted"}`}
                animate={i < presses ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">
            {presses < minPresses
              ? `Shuffle ${minPresses - presses} more time${minPresses - presses > 1 ? "s" : ""}`
              : "Your energy has been infused"}
          </p>

          {presses >= minPresses && (
            <motion.button
              onClick={handleDone}
              className="mt-2 px-6 py-3 rounded-lg bg-primary/20 border border-primary text-primary font-heading text-sm tracking-widest hover:bg-primary/30 transition-all gold-glow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Reading
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default InteractiveShuffle;
