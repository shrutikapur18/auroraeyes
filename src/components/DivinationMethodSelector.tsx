import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export type DivinationMethod = "tarot" | "yes-no" | "pick-a-card" | "angel" | "runes" | "horary";

interface DivinationMethodSelectorProps {
  method: DivinationMethod;
  setMethod: (m: DivinationMethod) => void;
}

const methods: { value: DivinationMethod; label: string; icon: string; desc: string; route?: string }[] = [
  { value: "tarot", label: "Tarot Reading", icon: "🃏", desc: "Three Card or Celtic Cross" },
  { value: "yes-no", label: "Yes / No Tarot", icon: "⚖️", desc: "Quick single-card answer" },
  { value: "pick-a-card", label: "Pick a Card", icon: "✨", desc: "Intuitive single draw" },
  { value: "angel", label: "Angel Cards", icon: "👼", desc: "Divine oracle messages" },
  { value: "runes", label: "Rune Reading", icon: "ᚱ", desc: "Elder Futhark wisdom" },
  { value: "horary", label: "Horary Astrology", icon: "🪐", desc: "Ask the stars a question" },
];

const DivinationMethodSelector = ({ method, setMethod }: DivinationMethodSelectorProps) => {
  const navigate = useNavigate();

  const handleSelect = (m: DivinationMethod) => {
    if (m === "horary") {
      const el = document.getElementById("horary-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/horary-reading");
      }
      return;
    }
    setMethod(m);
  };

  const radius = 140; // Circle radius for desktop
  const centerX = 0;
  const centerY = 0;

  return (
    <motion.div
      className="max-w-4xl mx-auto mb-12 relative z-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <p className="text-center text-xs font-heading text-muted-foreground tracking-widest uppercase mb-8">
        Choose your divination method
      </p>
      
      {/* Circular wheel layout for desktop, grid for mobile */}
      <div className="hidden md:block relative" style={{ height: "360px" }}>
        {/* Center glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--gold) / 0.15), transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbital ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/20" />

        {/* Method cards in circular layout */}
        {methods.map((m, i) => {
          const angle = (i * 2 * Math.PI) / methods.length - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <motion.button
              key={m.value}
              onClick={() => handleSelect(m.value)}
              className={`absolute left-1/2 top-1/2 w-28 h-28 rounded-2xl font-body transition-all border-2 flex flex-col items-center justify-center ${
                method === m.value
                  ? "bg-primary/25 border-primary text-primary gold-glow-strong scale-110"
                  : "bg-card/80 border-border/50 text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/10"
              }`}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: method === m.value ? 1.1 : 1 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-3xl mb-1.5">{m.icon}</span>
              <span className="block font-heading text-[10px] tracking-wider leading-tight px-2 text-center">
                {m.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Mobile grid fallback */}
      <div className="md:hidden flex flex-wrap justify-center gap-3">
        {methods.map((m) => (
          <motion.button
            key={m.value}
            onClick={() => handleSelect(m.value)}
            className={`px-4 py-3 rounded-lg font-body text-sm transition-all border ${
              method === m.value
                ? "bg-primary/20 border-primary text-primary gold-glow"
                : "bg-muted/50 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="block text-lg mb-0.5">{m.icon}</span>
            <span className="block font-heading text-xs tracking-wider">{m.label}</span>
            <span className="block text-[10px] opacity-70 mt-0.5">{m.desc}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default DivinationMethodSelector;
