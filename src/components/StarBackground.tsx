import { useMemo } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface Nebula {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: number;
  delay: number;
}

const StarBackground = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  const nebulae = useMemo<Nebula[]>(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 10 + Math.random() * 80,
      size: 200 + Math.random() * 300,
      hue: [265, 230, 280, 210][i],
      delay: i * 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 mystic-gradient" />

      {/* Nebula clouds */}
      {nebulae.map((n) => (
        <motion.div
          key={`nebula-${n.id}`}
          className="absolute rounded-full"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: n.size,
            height: n.size,
            background: `radial-gradient(circle, hsla(${n.hue}, 50%, 30%, 0.06) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            delay: n.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Stars */}
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

      {/* Shooting star (occasional) */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-primary"
        style={{ top: "15%", left: "80%" }}
        animate={{
          x: [-200, -600],
          y: [0, 200],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

export default StarBackground;
