import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Feather, Hexagon, Compass } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

interface FocusMomentProps {
  onComplete: () => void;
  method?: string;
}

const FocusMoment = ({ onComplete, method = "tarot" }: FocusMomentProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1200);
    const timer2 = setTimeout(() => setStage(2), 2400);
    const timer3 = setTimeout(onComplete, 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const methodConfig = {
    tarot: {
      Icon: Layers,
      color: "gold" as const,
      messages: [
        "Take a moment to center yourself...",
        "Focus deeply on your question...",
        "The cards are aligning to your energy..."
      ],
      glow: "hsl(45 80% 55%)",
    },
    angel: {
      Icon: Feather,
      color: "blue" as const,
      messages: [
        "Open your heart to receive...",
        "Divine messengers are gathering...",
        "Love and light flow toward you..."
      ],
      glow: "hsl(210 60% 70%)",
    },
    runes: {
      Icon: Hexagon,
      color: "gold" as const,
      messages: [
        "Ground yourself in the present...",
        "Ancient wisdom stirs...",
        "The runes are ready to speak truth..."
      ],
      glow: "hsl(30 70% 50%)",
    },
    horary: {
      Icon: Compass,
      color: "blue" as const,
      messages: [
        "Center your intention...",
        "The celestial spheres turn...",
        "The stars align to answer your question..."
      ],
      glow: "hsl(240 60% 60%)",
    },
  };

  const config = methodConfig[method as keyof typeof methodConfig] || methodConfig.tarot;
  const IconComponent = config.Icon;

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

      {/* Ritual title */}
      <motion.p
        className="font-heading text-xs text-primary/60 tracking-[0.3em] uppercase mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Preparing Your Reading
      </motion.p>

      {/* Outer ring */}
      <motion.div
        className="absolute w-44 h-44 rounded-full border border-primary/20"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute w-36 h-36 rounded-full border border-primary/30"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
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
          animate={{
            scale: [1, 1.15, 1],
            rotate: method === "runes" ? [0, 5, -5, 0] : [0, 3, -3, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconComponent className="w-10 h-10 text-primary icon-glow" />
        </motion.div>
      </motion.div>

      {/* Progressive messages */}
      <div className="h-20 flex flex-col items-center justify-center">
        {config.messages.map((message, index) => (
          <motion.p
            key={index}
            className="font-heading text-primary text-center text-sm md:text-base tracking-wide max-w-md leading-relaxed px-4 absolute"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: stage === index ? 1 : 0, 
              y: stage === index ? 0 : (stage > index ? -10 : 10)
            }}
            transition={{ duration: 0.6 }}
          >
            {message}
          </motion.p>
        ))}
      </div>

      {/* Breathing indicator */}
      <motion.div
        className="mt-8 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="w-20 h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            scaleX: [0.3, 1, 0.3],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.6, 1.3, 0.6],
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.4,
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
