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

const methods: { value: DivinationMethod; label: string; subtitle: string; image: string; featured: boolean }[] = [
  { value: "tarot", label: "Tarot", subtitle: "Unveil the Hidden Threads of Fate", image: tarotCardImage, featured: true },
  { value: "angel", label: "Angel Cards", subtitle: "Messages from the Divine", image: angelCardImage, featured: true },
  { value: "runes", label: "Ancient Runes", subtitle: "Whispered Wisdom of the Elders", image: runeCardImage, featured: false },
  { value: "horary", label: "Ask the Stars", subtitle: "Let the Celestial Spheres Answer", image: horaryCardImage, featured: false },
];

const DivinationMethodSelector = ({ method, setMethod }: DivinationMethodSelectorProps) => {
  return (
    <motion.div
      className="max-w-5xl lg:max-w-6xl mx-auto mb-14 lg:mb-20 relative z-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <p className="text-center text-xs lg:text-sm font-heading text-muted-foreground tracking-[0.25em] uppercase mb-12 lg:mb-14">
        Select the path through which truth will reveal itself
      </p>
      
      <div className="flex justify-center items-end gap-6 md:gap-8 lg:gap-10 px-4 flex-wrap">
        {methods.map((m, i) => (
          <motion.button
            key={m.value}
            onClick={() => setMethod(m.value)}
            className="relative group focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.06, y: -12 }}
            whileTap={{ scale: 0.97 }}
            style={{ width: m.featured ? "clamp(130px, 22vw, 180px)" : "clamp(110px, 18vw, 150px)" }}
          >
            {/* Card container */}
            <div
              className={`relative ${m.value === "runes" ? "aspect-square" : "aspect-[2/3]"} w-full overflow-hidden rounded-xl transition-all duration-700 ${
                method === m.value
                  ? "shadow-[0_8px_40px_hsl(43_70%_55%/0.35),0_0_20px_hsl(43_70%_55%/0.15)]"
                  : "shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              }`}
              style={{
                transform: method === m.value ? "rotate(0deg)" : `rotate(${(i % 2 === 0 ? -2 : 2)}deg)`,
                transition: "transform 0.5s ease",
                border: method === m.value
                  ? "1.5px solid hsl(43 70% 55% / 0.6)"
                  : "1px solid hsl(43 70% 55% / 0.12)",
              }}
            >
              {/* Card image */}
              <img
                src={m.image}
                alt={m.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "inset 0 0 30px hsl(43 70% 55% / 0.1)" }}
              />

              {/* Active glow pulse */}
              {method === m.value && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      "inset 0 0 15px hsl(43 70% 55% / 0.08)",
                      "inset 0 0 30px hsl(43 70% 55% / 0.18)",
                      "inset 0 0 15px hsl(43 70% 55% / 0.08)",
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
                <span className="block text-[8px] md:text-[9px] lg:text-[10px] text-white/40 mt-1 text-center leading-snug italic drop-shadow">
                  {m.subtitle}
                </span>
              </div>
            </div>

            {/* Selection indicator */}
            {method === m.value && (
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary/60"
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
