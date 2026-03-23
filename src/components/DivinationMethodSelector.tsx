import { motion } from "framer-motion";
import tarotCardImage from "@/assets/tarot-card-back.jpg";
import angelCardImage from "@/assets/angel-card-back.jpg";
import runeCardImage from "@/assets/rune-card-back.jpg";
import horaryCardImage from "@/assets/horary-card-back.jpg";

export type DivinationMethod = "tarot" | "yes-no" | "pick-a-card" | "angel" | "runes" | "horary";

interface DivinationMethodSelectorProps {
  method: DivinationMethod | null;
  setMethod: (m: DivinationMethod) => void;
}

const methods: { value: DivinationMethod; label: string; subtitle: string; image: string; aspect: string }[] = [
  { value: "tarot", label: "Tarot", subtitle: "Unveil the Hidden Threads of Fate", image: tarotCardImage, aspect: "aspect-[2/3]" },
  { value: "angel", label: "Angel Cards", subtitle: "Messages from the Divine", image: angelCardImage, aspect: "aspect-[2/3]" },
  { value: "runes", label: "Ancient Runes", subtitle: "Whispered Wisdom of the Elders", image: runeCardImage, aspect: "aspect-square" },
  { value: "horary", label: "Ask the Stars", subtitle: "Let the Celestial Spheres Answer", image: horaryCardImage, aspect: "aspect-[2/3]" },
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
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 lg:gap-8 px-4">
        {methods.map((m, i) => (
          <motion.button
            key={m.value}
            onClick={() => setMethod(m.value)}
            className="relative group focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Card container */}
            <div
              className={`relative ${m.aspect} w-full overflow-hidden rounded-xl transition-all duration-500 ${
                method === m.value
                  ? "ring-2 ring-primary/60 shadow-[0_0_30px_hsl(43_70%_65%/0.3)]"
                  : "ring-1 ring-primary/10 shadow-lg shadow-black/30"
              }`}
              style={{
                transform: method === m.value ? "rotate(0deg)" : `rotate(${(i % 2 === 0 ? -2 : 2)}deg)`,
                transition: "transform 0.5s ease",
              }}
            >
              {/* Card image */}
              <img
                src={m.image}
                alt={m.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Soft glow overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Active glow pulse */}
              {method === m.value && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      "inset 0 0 20px hsl(43 70% 65% / 0.1)",
                      "inset 0 0 40px hsl(43 70% 65% / 0.2)",
                      "inset 0 0 20px hsl(43 70% 65% / 0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Label overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                <span className={`block font-heading text-xs md:text-sm lg:text-base tracking-wider leading-tight text-center transition-colors duration-300 drop-shadow-lg ${
                  method === m.value ? "text-primary" : "text-white/90"
                }`}>
                  {m.label}
                </span>
                <span className="block text-[8px] md:text-[9px] lg:text-[10px] text-white/50 mt-1 text-center leading-snug italic drop-shadow">
                  {m.subtitle}
                </span>
              </div>
            </div>

            {/* Selection indicator */}
            {method === m.value && (
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary"
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
