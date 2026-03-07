import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { drawRunes, runePositions, type DrawnRune } from "@/data/runes";
import RuneComponent from "./RuneComponent";
import ReadingTable from "./ReadingTable";
import FocusMoment from "./FocusMoment";
import { canDoReading, recordReading } from "@/lib/tarotReading";
import { generateRuneReading } from "@/lib/runeReading";

interface RuneSpreadProps {
  question: string;
  onError: (msg: string) => void;
}

const RuneSpread = ({ question, onError }: RuneSpreadProps) => {
  const [phase, setPhase] = useState<"idle" | "focus" | "casting" | "spread" | "loading" | "result">("idle");
  const [runes, setRunes] = useState<DrawnRune[]>([]);
  const [reading, setReading] = useState("");

  const handleCast = () => {
    if (!question.trim()) {
      onError("Please enter your question first.");
      return;
    }
    onError("");
    setPhase("focus");
  };

  const handleFocusComplete = () => {
    setPhase("casting");
    const drawn = drawRunes(3).map((d, i) => ({ ...d, position: runePositions[i] }));
    setRunes(drawn);
    setTimeout(() => setPhase("spread"), 1800);
  };

  const handleReveal = useCallback((index: number) => {
    setRunes((prev) => {
      const updated = prev.map((dr, i) => (i === index ? { ...dr, isRevealed: true } : dr));
      const revealedCount = updated.filter((r) => r.isRevealed).length;

      if (revealedCount >= 3) {
        setTimeout(async () => {
          const check = canDoReading();
          if (!check.allowed) {
            onError(check.reason || "");
            return;
          }
          recordReading();
          setPhase("loading");
          const text = await generateRuneReading(question, updated);
          setReading(text);
          setPhase("result");
        }, 800);
      }
      return updated;
    });
  }, [question, onError]);

  const handleReset = () => {
    setPhase("idle");
    setRunes([]);
    setReading("");
  };

  return (
    <div className="relative z-10">
      {phase === "idle" && (
        <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm text-muted-foreground italic text-center max-w-md">
            The Elder Futhark runes hold ancient wisdom. Focus on your question and cast the runes.
          </p>
          <div className="flex gap-3">
            {["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ"].map((s, i) => (
              <motion.div
                key={i}
                className="w-12 h-12 rounded-full rune-stone border border-primary/20 flex items-center justify-center text-primary/50 text-lg"
                animate={{ y: [0, -3, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                {s}
              </motion.div>
            ))}
          </div>
          <motion.button
            onClick={handleCast}
            className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cast the Runes
          </motion.button>
        </motion.div>
      )}

      {phase === "focus" && (
        <FocusMoment onComplete={handleFocusComplete} method="runes" />
      )}

      {phase === "casting" && (
        <motion.div className="flex flex-col items-center py-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex gap-4 mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-14 h-14 rounded-full rune-stone border border-primary/30 flex items-center justify-center text-primary/30 text-lg"
                animate={{
                  y: [0, -30, 10, 0],
                  x: [0, (i - 1) * 20, (i - 1) * 40, (i - 1) * 30],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 1.2, delay: i * 0.2, ease: "easeInOut" }}
              >
                ?
              </motion.div>
            ))}
          </div>
          <p className="font-heading text-primary text-sm tracking-widest animate-pulse">Casting the runes...</p>
        </motion.div>
      )}

      {(phase === "spread" || phase === "loading" || phase === "result") && (
        <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {phase === "spread" && (
            <p className="text-sm text-muted-foreground italic">Reveal each rune to uncover its wisdom.</p>
          )}
          <ReadingTable>
            <div className="flex justify-center items-end gap-6 md:gap-10">
              {runes.map((dr, i) => (
                <RuneComponent key={i} drawnRune={dr} index={i} onReveal={handleReveal} label={runePositions[i]} />
              ))}
            </div>
          </ReadingTable>

          {phase === "loading" && (
            <div className="flex items-center gap-2 mt-4">
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-xs text-muted-foreground">Reading the runes...</span>
            </div>
          )}

          {reading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="reading-panel rounded-xl p-6 max-w-lg text-sm text-foreground font-body leading-relaxed whitespace-pre-line"
            >
              <h3 className="font-heading text-lg gold-text mb-3 text-center">Rune Reading</h3>
              <div className="flex justify-center gap-4 mb-4">
                {runes.filter((r) => r.isRevealed).map((r, i) => (
                  <div key={i} className="text-center px-3 py-2 rounded-lg bg-muted/30">
                    <span className="text-xs font-heading text-primary/70 block">{r.position}</span>
                    <span className="text-lg text-primary">{r.rune.symbol}</span>
                    <span className="text-xs text-foreground block">{r.rune.name}</span>
                    <span className="text-[10px] text-muted-foreground block">{r.isReversed ? "↻ Rev" : "↑ Up"}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/30 pt-4">{reading}</div>

              {/* Reflection */}
              <div className="mt-6 pt-4 border-t border-primary/10">
                <h4 className="font-heading text-xs gold-text mb-2 tracking-wider">Take a moment to reflect</h4>
                <p className="text-xs text-muted-foreground italic">Does this message connect with something currently unfolding in your life?</p>
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-lg bg-secondary border border-primary/30 text-primary font-heading text-sm tracking-wider hover:bg-primary/20 transition-all"
            >
              Cast Again
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default RuneSpread;
