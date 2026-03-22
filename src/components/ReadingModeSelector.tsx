import { motion } from "framer-motion";
import type { ReadingMode } from "@/data/tarotDeck";

interface ReadingModeSelectorProps {
  mode: ReadingMode;
  setMode: (m: ReadingMode) => void;
  disabled?: boolean;
}

const modes: { value: ReadingMode; label: string; desc: string }[] = [
  { value: "three-card", label: "Three Card", desc: "Past · Present · Future" },
  { value: "celtic-cross", label: "Celtic Cross", desc: "A deeper revelation" },
  { value: "pick-a-card", label: "Single Draw", desc: "One card, one truth" },
];

const ReadingModeSelector = ({ mode, setMode, disabled }: ReadingModeSelectorProps) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-8 lg:mb-10 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => setMode(m.value)}
          disabled={disabled}
          className={`px-5 lg:px-6 py-3 lg:py-3.5 rounded-xl font-body text-sm transition-all duration-500 border disabled:opacity-50 ${
            mode === m.value
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-card/30 border-border/20 text-muted-foreground/70 hover:border-primary/20 hover:text-foreground/80"
          }`}
        >
          <span className="block font-heading text-xs lg:text-sm tracking-wider">{m.label}</span>
          <span className="block text-[10px] lg:text-xs opacity-60 mt-0.5 italic">{m.desc}</span>
        </button>
      ))}
    </motion.div>
  );
};

export default ReadingModeSelector;
