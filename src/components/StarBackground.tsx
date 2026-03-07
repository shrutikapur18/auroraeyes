import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const StarBackground = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 mystic-gradient" />
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-starlight"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
