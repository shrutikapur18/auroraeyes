import { useMemo } from "react";
import { motion } from "framer-motion";

interface FloatingParticlesProps {
  count?: number;
  color?: "gold" | "blue" | "purple";
  gathering?: boolean;
}

const FloatingParticles = ({ count = 20, color = "gold", gathering = false }: FloatingParticlesProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 3,
    }));
  }, [count]);

  const colorClass = color === "gold" ? "bg-primary/60" : color === "blue" ? "bg-angel-blue/60" : "bg-accent/60";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${colorClass}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: `blur(${p.size > 2 ? 1 : 0}px)`,
          }}
          animate={
            gathering
              ? {
                  x: [0, (50 - p.x) * 2],
                  y: [0, (60 - p.y) * 2],
                  opacity: [0, 1, 0.5, 0],
                  scale: [0.5, 1.5, 0.3],
                }
              : {
                  y: [0, -80, -120],
                  x: [0, (Math.random() - 0.5) * 40],
                  opacity: [0, 0.8, 0],
                }
          }
          transition={{
            duration: gathering ? 2 : p.duration,
            delay: gathering ? p.delay * 0.3 : p.delay,
            repeat: gathering ? 0 : Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
