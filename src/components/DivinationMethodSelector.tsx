import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export type DivinationMethod = "tarot" | "yes-no" | "pick-a-card" | "angel" | "runes" | "horary";

interface DivinationMethodSelectorProps {
  method: DivinationMethod | null;
  setMethod: (m: DivinationMethod) => void;
}

const methods: { value: DivinationMethod; label: string; icon: string; desc: string }[] = [
  { value: "tarot", label: "Tarot Reading", icon: "🃏", desc: "Three Card or Celtic Cross" },
  { value: "angel", label: "Angel Cards", icon: "👼", desc: "Divine oracle messages" },
  { value: "runes", label: "Rune Reading", icon: "ᚱ", desc: "Elder Futhark wisdom" },
  { value: "horary", label: "Horary Astrology", icon: "🪐", desc: "Ask the stars a question" },
];

const DivinationMethodSelector = ({ method, setMethod }: DivinationMethodSelectorProps) => {
  const handleSelect = (m: DivinationMethod) => {
    setMethod(m);
  };

  return (
    <motion.div
      className="max-w-5xl lg:max-w-6xl mx-auto mb-12 lg:mb-16 relative z-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <p className="text-center text-xs lg:text-sm font-heading text-muted-foreground tracking-widest uppercase mb-8 lg:mb-10">
        Choose your divination method
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 px-1">
        {methods.map((m, i) => (
          <motion.button
            key={m.value}
            onClick={() => handleSelect(m.value)}
            className={`divination-card relative rounded-2xl font-body flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 ${
              method === m.value
                ? "!border-primary/40 gold-glow-strong"
                : ""
            }`}
            style={{
              animation: `card-float ${5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.04, y: -6 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-3xl md:text-4xl lg:text-5xl mb-2 lg:mb-3">{m.icon}</span>
            <span className={`block font-heading text-xs md:text-sm lg:text-base tracking-wider leading-tight text-center ${
              method === m.value ? "text-primary" : "text-foreground"
            }`}>
              {m.label}
            </span>
            <span className="block text-[10px] md:text-xs lg:text-sm text-muted-foreground mt-1 lg:mt-2 text-center">
              {m.desc}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default DivinationMethodSelector;
