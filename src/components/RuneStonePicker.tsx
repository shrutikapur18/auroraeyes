import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { elderFuthark, type Rune, type DrawnRune, runePositions } from "@/data/runes";

interface RuneStonePickerProps {
  requiredCount: number;
  positions: string[];
  onComplete: (selectedRunes: DrawnRune[]) => void;
}

const RuneStonePicker = ({ requiredCount, positions, onComplete }: RuneStonePickerProps) => {
  const shuffledRunes = useMemo(() => {
    const runes = [...elderFuthark];
    for (let i = runes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [runes[i], runes[j]] = [runes[j], runes[i]];
    }
    return runes;
  }, []);

  // Random scatter positions for natural look
  const scatterData = useMemo(
    () =>
      shuffledRunes.map(() => ({
        rotate: (Math.random() - 0.5) * 30,
        offsetX: (Math.random() - 0.5) * 6,
        offsetY: (Math.random() - 0.5) * 6,
      })),
    [shuffledRunes]
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const remaining = requiredCount - selectedIds.length;

  const handleSelect = useCallback(
    (runeId: number) => {
      if (selectedIds.includes(runeId) || isComplete) return;
      const newSelected = [...selectedIds, runeId];
      setSelectedIds(newSelected);

      if (newSelected.length >= requiredCount) {
        setIsComplete(true);
        const result: DrawnRune[] = newSelected.map((id, i) => {
          const rune = shuffledRunes.find((r) => r.id === id)!;
          const noReversed = rune.reversed_meaning.toLowerCase().includes("no reversed");
          return {
            rune,
            isReversed: noReversed ? false : Math.random() > 0.5,
            position: positions[i],
            isRevealed: false,
          };
        });
        setTimeout(() => onComplete(result), 900);
      }
    },
    [selectedIds, isComplete, requiredCount, positions, shuffledRunes, onComplete]
  );

  return (
    <motion.div
      className="flex flex-col items-center gap-4 md:gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Status bar */}
      <motion.div
        className="sticky top-16 z-30 w-full max-w-lg mx-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="reading-panel rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-xs md:text-sm font-heading text-primary tracking-wider">
            {isComplete
              ? "✦ The runes have spoken"
              : `Choose ${requiredCount} rune${requiredCount !== 1 ? "s" : ""} — ${remaining} remaining`}
          </p>
          <div className="flex gap-1">
            {positions.map((pos, i) => (
              <span
                key={pos}
                className={`px-2 py-0.5 rounded-md text-[10px] font-heading tracking-wider border transition-all ${
                  i < selectedIds.length
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-muted/30 border-border/30 text-muted-foreground"
                }`}
              >
                {pos}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <p className="text-xs text-muted-foreground italic text-center px-4">
        Reach into the rune pouch and choose the stone that resonates with you.
      </p>

      {/* Rune stones scattered on table */}
      <div className="w-full max-w-lg mx-auto px-4">
        <div className="relative reading-table rounded-3xl p-6 md:p-8 min-h-[280px] md:min-h-[320px]">
          <div className="grid grid-cols-6 gap-2 md:gap-3">
            {shuffledRunes.map((rune, i) => {
              const isSelected = selectedIds.includes(rune.id);
              const selectionOrder = selectedIds.indexOf(rune.id);

              return (
                <motion.div
                  key={rune.id}
                  className="relative flex items-center justify-center cursor-pointer"
                  initial={{ opacity: 0, scale: 0.5, rotate: scatterData[i].rotate }}
                  animate={{
                    opacity: isComplete && !isSelected ? 0.3 : 1,
                    scale: isSelected ? 1.15 : 1,
                    rotate: isSelected ? 0 : scatterData[i].rotate,
                    x: isSelected ? 0 : scatterData[i].offsetX,
                    y: isSelected ? 0 : scatterData[i].offsetY,
                  }}
                  transition={{
                    delay: i * 0.02,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={
                    !isSelected && !isComplete
                      ? { scale: 1.2, y: -8, zIndex: 50, transition: { duration: 0.15 } }
                      : {}
                  }
                  whileTap={
                    !isSelected && !isComplete
                      ? { scale: 0.9, transition: { duration: 0.1 } }
                      : {}
                  }
                  onClick={() => handleSelect(rune.id)}
                >
                  <div
                    className={`w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? "rune-stone border-2 border-primary gold-glow-strong"
                        : "rune-stone border border-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--gold)/0.25)]"
                    }`}
                  >
                    <span className={`text-lg md:text-xl ${isSelected ? "text-primary" : "text-primary/40"}`}>
                      {isSelected ? rune.symbol : "?"}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary text-primary-foreground text-[9px] md:text-[10px] font-heading flex items-center justify-center gold-glow z-30"
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
      </div>

      <p className="text-[10px] text-muted-foreground/60 text-center pb-4">
        24 Elder Futhark runes
      </p>
    </motion.div>
  );
};

export default RuneStonePicker;
