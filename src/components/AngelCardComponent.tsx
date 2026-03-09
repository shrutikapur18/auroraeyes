import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { DrawnAngelCard } from "@/data/angelCards";
import cardBackImage from "@/assets/card-back.jpg";

interface AngelCardComponentProps {
  drawnCard: DrawnAngelCard;
  index: number;
  onReveal: (index: number) => void;
  label?: string;
}

const AngelParticle = ({ delay, size, x, duration }: { delay: number; size: number; x: number; duration: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      bottom: "8%",
      background: "hsl(var(--angel-glow) / 0.7)",
    }}
    initial={{ opacity: 0, y: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0],
      y: [0, -55 - Math.random() * 35],
      scale: [0, 1, 0.2],
      x: [0, (Math.random() - 0.5) * 18],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

const AngelCardComponent = ({ drawnCard, index, onReveal, label }: AngelCardComponentProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [justRevealed, setJustRevealed] = useState(false);
  const { card, isRevealed } = drawnCard;

  const handleClick = () => {
    if (isRevealed || isFlipping) return;
    setIsFlipping(true);
    setJustRevealed(true);
    setTimeout(() => {
      onReveal(index);
      setIsFlipping(false);
    }, 600);
    setTimeout(() => setJustRevealed(false), 1800);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        delay: i * 1.3 + Math.random() * 0.6,
        size: 2 + Math.random() * 2,
        x: 12 + Math.random() * 76,
        duration: 3 + Math.random() * 2,
      })),
    []
  );

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      {label && (
        <span className="text-xs font-heading text-primary/80 tracking-widest uppercase">{label}</span>
      )}
      <motion.div
        className="w-28 md:w-36 h-44 md:h-56 cursor-pointer perspective-1000"
        animate={
          isRevealed
            ? { y: [0, -4, 0] }
            : !isFlipping
              ? { y: [0, -6, 0] }
              : {}
        }
        transition={
          isRevealed
            ? { duration: 5 + index * 0.5, repeat: Infinity, ease: "easeInOut" }
            : !isFlipping
              ? { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }
              : {}
        }
        whileHover={
          !isRevealed
            ? { scale: 1.08, y: -10, transition: { duration: 0.2 } }
            : { scale: 1.03, transition: { duration: 0.3 } }
        }
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isRevealed || isFlipping ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Back */}
          <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden border-2 border-angel-blue/30 card-shadow transition-shadow duration-300 hover:shadow-[0_0_20px_hsl(var(--angel-blue)/0.2)]">
            <img src={cardBackImage} alt="Card back" className="w-full h-full object-cover opacity-80" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-angel-blue/10 to-accent/10 flex items-center justify-center">
              <motion.span
                className="text-3xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                👼
              </motion.span>
            </div>
          </div>

          {/* Front - with living energy */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden ${isRevealed ? "angel-aura" : ""}`}
            style={{ transform: "rotateY(180deg)" }}
          >
            {/* Angel card artwork */}
            {card.image && !imgError ? (
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-accent/20 to-card flex items-center justify-center">
                <span className="text-4xl">{card.symbol}</span>
              </div>
            )}

            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 flex flex-col items-center justify-end p-3">
              <motion.div
                className="text-2xl mb-1 drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                {card.symbol}
              </motion.div>
              <motion.p
                className="font-heading text-[10px] md:text-xs text-white/90 text-center leading-tight drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={isRevealed ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                {card.name}
              </motion.p>
              <motion.p
                className="text-[8px] text-white/60 mt-1 text-center italic leading-snug"
                initial={{ opacity: 0 }}
                animate={isRevealed ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                {card.message.slice(0, 50)}…
              </motion.p>
            </div>

            {/* Decorative border */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-lg pointer-events-none" />

            {/* Shimmer sweep */}
            {isRevealed && (
              <div className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden">
                <div className="card-shimmer absolute inset-0" />
              </div>
            )}

            {/* Reveal flash */}
            {justRevealed && (
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none bg-angel-glow/30"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            )}

            {/* Floating particles */}
            {isRevealed && particles.map((p, i) => (
              <AngelParticle key={i} {...p} />
            ))}
          </div>
        </motion.div>
      </motion.div>
      {isRevealed && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-[140px]">
          <p className="text-xs font-heading text-primary">{card.name}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{card.keywords.join(" · ")}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AngelCardComponent;
