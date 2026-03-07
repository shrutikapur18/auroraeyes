import { useEffect } from "react";
import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

interface FocusMomentProps {
  onComplete: () => void;
  method?: string;
}

const FocusMoment = ({ onComplete, method = "tarot" }: FocusMomentProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingParticles
        count={30}
        color={method === "angel" ? "blue" : "gold"}
        gathering
      />

      <motion.div
        className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center mb-8 relative"
        style={{
          background: "radial-gradient(circle, hsl(var(--gold) / 0.1), transparent)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px hsl(45 80% 55% / 0.1)",
            "0 0 60px hsl(45 80% 55% / 0.3)",
            "0 0 20px hsl(45 80% 55% / 0.1)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-primary"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.p
        className="font-heading text-primary text-center text-sm md:text-base tracking-widest max-w-md leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Focus on your question and allow the symbols to reveal their guidance.
      </motion.p>

      <motion.div
        className="mt-6 flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary/50"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FocusMoment;
