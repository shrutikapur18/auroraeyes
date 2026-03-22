import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FocusMomentProps {
  onComplete: () => void;
  method?: string;
}

const FocusMoment = ({ onComplete, method = "tarot" }: FocusMomentProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1400);
    const timer2 = setTimeout(() => setStage(2), 2800);
    const timer3 = setTimeout(onComplete, 4200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const methodConfig = {
    tarot: {
      symbol: "✦",
      messages: [
        "Close your eyes for a moment...",
        "Let your question settle into stillness...",
        "The cards are ready to speak...",
      ],
    },
    angel: {
      symbol: "◇",
      messages: [
        "Open your heart...",
        "Divine messengers are near...",
        "Light and love flow toward you...",
      ],
    },
    runes: {
      symbol: "ᚱ",
      messages: [
        "Ground yourself in this moment...",
        "Ancient wisdom stirs beneath the surface...",
        "The runes are ready to reveal their truth...",
      ],
    },
    horary: {
      symbol: "☉",
      messages: [
        "Center your intention...",
        "The celestial spheres are turning...",
        "The stars align to answer...",
      ],
    },
  };

  const config = methodConfig[method as keyof typeof methodConfig] || methodConfig.tarot;

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-28 lg:py-36 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ritual title */}
      <motion.p
        className="font-heading text-[10px] text-primary/40 tracking-[0.4em] uppercase mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Preparing Your Reading
      </motion.p>

      {/* Outer ring — slow rotation */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-primary/10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, 360],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner circle with symbol */}
      <motion.div
        className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center mb-10 relative"
        style={{
          background: "radial-gradient(circle, hsl(43 70% 65% / 0.06), transparent)",
        }}
        animate={{
          boxShadow: [
            "0 0 30px hsl(43 70% 65% / 0.08)",
            "0 0 60px hsl(43 70% 65% / 0.18)",
            "0 0 30px hsl(43 70% 65% / 0.08)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.span
          className="text-primary/60 text-2xl font-heading"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {config.symbol}
        </motion.span>
      </motion.div>

      {/* Progressive messages */}
      <div className="h-16 flex flex-col items-center justify-center relative">
        {config.messages.map((message, index) => (
          <motion.p
            key={index}
            className="font-heading text-primary/60 text-center text-sm md:text-base tracking-wide max-w-md leading-relaxed px-4 absolute"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: stage === index ? 1 : 0,
              y: stage === index ? 0 : (stage > index ? -8 : 8),
            }}
            transition={{ duration: 0.7 }}
          >
            {message}
          </motion.p>
        ))}
      </div>

      {/* Breathing line */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="w-16 h-px rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={{
            scaleX: [0.3, 1, 0.3],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default FocusMoment;
