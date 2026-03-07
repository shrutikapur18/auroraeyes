import { motion } from "framer-motion";
import type { ReadingMode } from "@/data/tarotDeck";

interface ReadingModeSelectorProps {
  mode: ReadingMode;
  setMode: (m: ReadingMode) => void;
  disabled?: boolean;
}

const modes: { value: ReadingMode; label: string; desc: string }[] = [
  { value: "three-card", label: "Three Card", desc: "Past · Present · Future" },
  { value: "celtic-cross", label: "Celtic Cross", desc: "10-card deep reading" },
  { value: "pick-a-card", label: "Pick a Card", desc: "Quick intuitive draw" },
];

const ReadingModeSelector = ({ mode, setMode, disabled }: ReadingModeSelectorProps) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => setMode(m.value)}
          disabled={disabled}
          className={`px-5 py-3 rounded-lg font-body text-sm transition-all border disabled:opacity-50 ${
            mode === m.value
              ? "bg-primary/20 border-primary text-primary gold-glow"
              : "bg-muted/50 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          <span className="block font-heading text-sm tracking-wider">{m.label}</span>
          <span className="block text-xs opacity-70 mt-0.5">{m.desc}</span>
        </button>
      ))}
    </motion.div>
  );
};

export default ReadingModeSelector;
