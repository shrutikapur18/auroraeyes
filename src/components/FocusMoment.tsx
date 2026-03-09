import { useEffect } from "react";
import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

interface FocusMomentProps {
  onComplete: () => void;
  method?: string;
}

const FocusMoment = ({ onComplete, method = "tarot" }: FocusMomentProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500); // Extended duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  const methodConfig = {
    tarot: {
      icon: "🃏",
      color: "gold" as const,
      message: "Clear your mind. Focus deeply on your question. The cards are aligning to your energy...",
      glow: "hsl(45 80% 55%)",
    },
    angel: {
      icon: "👼",
      color: "blue" as const,
      message: "Open your heart. Divine messengers are gathering to guide you with love and light...",
      glow: "hsl(210 60% 70%)",
    },
    runes: {
      icon: "ᚱ",
      color: "gold" as const,
      message: "Ground yourself. Ancient wisdom flows through the runes, ready to speak truth...",
      glow: "hsl(30 70% 50%)",
    },
    horary: {
      icon: "🌟",
      color: "blue" as const,
      message: "Center your intention. The celestial spheres are aligning to answer your question...",
      glow: "hsl(240 60% 60%)",
    },
  };

  const config = methodConfig[method as keyof typeof methodConfig] || methodConfig.tarot;

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-24 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingParticles
        count={40}
        color={config.color}
        gathering
      />

      {/* Outer ring */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-primary/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner circle with icon */}
      <motion.div
        className="w-28 h-28 rounded-full border-2 border-primary/40 flex items-center justify-center mb-8 relative backdrop-blur-sm"
        style={{
          background: `radial-gradient(circle, ${config.glow} / 0.15, transparent)`,
        }}
        animate={{
          scale: [1, 1.08, 1],
          boxShadow: [
            `0 0 30px ${config.glow} / 0.2`,
            `0 0 80px ${config.glow} / 0.4`,
            `0 0 30px ${config.glow} / 0.2`,
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="text-4xl"
          animate={{
            scale: [1, 1.15, 1],
            rotate: method === "runes" ? [0, 5, -5, 0] : 0,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {config.icon}
        </motion.div>
      </motion.div>

      {/* Personalized message */}
      <motion.p
        className="font-heading text-primary text-center text-sm md:text-base tracking-wide max-w-md leading-relaxed px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {config.message}
      </motion.p>

      {/* Breathing indicator */}
      <motion.div
        className="mt-8 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="w-16 h-1 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            scaleX: [0.5, 1, 0.5],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/60"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FocusMoment;
