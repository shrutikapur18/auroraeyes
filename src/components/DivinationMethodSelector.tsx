import { motion } from "framer-motion";
import { TarotCardIcon, AngelWingsIcon, RuneStoneIcon, ZodiacWheelIcon } from "./MysticalIcons";

export type DivinationMethod = "tarot" | "yes-no" | "pick-a-card" | "angel" | "runes" | "horary";

interface DivinationMethodSelectorProps {
  method: DivinationMethod | null;
  setMethod: (m: DivinationMethod) => void;
}

const methods: { value: DivinationMethod; label: string; subtitle: string; Icon: React.FC<{ className?: string; animated?: boolean }> }[] = [
  { value: "tarot", label: "Tarot", subtitle: "Unveil the Hidden Threads of Fate", Icon: TarotCardIcon },
  { value: "angel", label: "Angel Cards", subtitle: "Messages from the Divine", Icon: AngelWingsIcon },
  { value: "runes", label: "Ancient Runes", subtitle: "Whispered Wisdom of the Elders", Icon: RuneStoneIcon },
  { value: "horary", label: "Ask the Stars", subtitle: "Let the Celestial Spheres Answer", Icon: ZodiacWheelIcon },
];

const DivinationMethodSelector = ({ method, setMethod }: DivinationMethodSelectorProps) => {
  return (
    <motion.div
      className="max-w-5xl lg:max-w-6xl mx-auto mb-12 lg:mb-16 relative z-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <p className="text-center text-xs lg:text-sm font-heading text-muted-foreground tracking-[0.25em] uppercase mb-10 lg:mb-12">
        Select the path through which truth will reveal itself
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-8 px-2">
        {methods.map((m, i) => (
          <motion.button
            key={m.value}
            onClick={() => setMethod(m.value)}
            className={`divination-card relative rounded-2xl font-body flex flex-col items-center justify-center p-5 md:p-7 lg:p-10 group ${
              method === m.value
                ? "!border-primary/50 gold-glow-strong"
                : ""
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.04, y: -8 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Icon */}
            <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-3 lg:mb-4 transition-colors duration-500 ${
              method === m.value ? "text-primary" : "text-primary/60 group-hover:text-primary/90"
            }`}>
              <m.Icon animated={method === m.value} />
            </div>

            {/* Label */}
            <span className={`block font-heading text-xs md:text-sm lg:text-base tracking-wider leading-tight text-center transition-colors duration-300 ${
              method === m.value ? "text-primary" : "text-foreground"
            }`}>
              {m.label}
            </span>

            {/* Subtitle */}
            <span className="block text-[9px] md:text-[10px] lg:text-xs text-muted-foreground mt-1.5 lg:mt-2 text-center leading-snug italic">
              {m.subtitle}
            </span>

            {/* Selection indicator */}
            {method === m.value && (
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary"
                layoutId="method-indicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default DivinationMethodSelector;
