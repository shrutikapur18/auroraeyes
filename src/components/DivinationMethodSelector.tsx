import { motion } from "framer-motion";

export type DivinationMethod = "tarot" | "yes-no" | "pick-a-card" | "angel" | "runes";

interface DivinationMethodSelectorProps {
  method: DivinationMethod;
  setMethod: (m: DivinationMethod) => void;
}

const methods: { value: DivinationMethod; label: string; icon: string; desc: string }[] = [
  { value: "tarot", label: "Tarot Reading", icon: "🃏", desc: "Three Card or Celtic Cross" },
  { value: "yes-no", label: "Yes / No Tarot", icon: "⚖️", desc: "Quick single-card answer" },
  { value: "pick-a-card", label: "Pick a Card", icon: "✨", desc: "Intuitive single draw" },
  { value: "angel", label: "Angel Cards", icon: "👼", desc: "Divine oracle messages" },
  { value: "runes", label: "Rune Reading", icon: "ᚱ", desc: "Elder Futhark wisdom" },
];

const DivinationMethodSelector = ({ method, setMethod }: DivinationMethodSelectorProps) => {
  return (
    <motion.div
      className="max-w-3xl mx-auto mb-8 relative z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <p className="text-center text-xs font-heading text-muted-foreground tracking-widest uppercase mb-4">
        Choose your divination method
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {methods.map((m) => (
          <button
            key={m.value}
            onClick={() => setMethod(m.value)}
            className={`px-4 py-3 rounded-lg font-body text-sm transition-all border ${
              method === m.value
                ? "bg-primary/20 border-primary text-primary gold-glow"
                : "bg-muted/50 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            <span className="block text-lg mb-0.5">{m.icon}</span>
            <span className="block font-heading text-xs tracking-wider">{m.label}</span>
            <span className="block text-[10px] opacity-70 mt-0.5">{m.desc}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default DivinationMethodSelector;
