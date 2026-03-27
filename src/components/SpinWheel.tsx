import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wheelRewards, type WheelReward } from "@/data/wheelRewards";

const SLICE_COUNT = wheelRewards.length;
const SLICE_ANGLE = 360 / SLICE_COUNT;

interface SpinWheelProps {
  onReward?: (reward: WheelReward) => void;
}

const SpinWheel = ({ onReward }: SpinWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<WheelReward | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    // Pick weighted random — high rewards are rarer
    const weights = wheelRewards.map((r) =>
      r.tier === "high" ? 1 : r.tier === "medium" ? 3 : 5
    );
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * totalWeight;
    let winIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      rand -= weights[i];
      if (rand <= 0) { winIndex = i; break; }
    }

    // Calculate target rotation so the winning slice lands at the top (pointer position)
    const targetSliceCenter = winIndex * SLICE_ANGLE + SLICE_ANGLE / 2;
    // We want this slice at 0° (top). The wheel rotates clockwise, so:
    const baseSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const targetRotation = rotation + baseSpins * 360 + (360 - targetSliceCenter);

    setRotation(targetRotation);

    setTimeout(() => {
      setSpinning(false);
      const reward = wheelRewards[winIndex];
      setResult(reward);
      onReward?.(reward);
    }, 4500);
  }, [spinning, rotation, onReward]);

  // Build SVG wheel
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 4;

  const slicePath = (index: number) => {
    const startAngle = (index * SLICE_ANGLE - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * SLICE_ANGLE - 90) * (Math.PI / 180);
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const largeArc = SLICE_ANGLE > 180 ? 1 : 0;
    return `M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`;
  };

  const labelPosition = (index: number) => {
    const midAngle = ((index + 0.5) * SLICE_ANGLE - 90) * (Math.PI / 180);
    const labelRadius = radius * 0.62;
    return {
      x: cx + labelRadius * Math.cos(midAngle),
      y: cy + labelRadius * Math.sin(midAngle),
      angle: (index + 0.5) * SLICE_ANGLE,
    };
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Pointer */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "20px solid hsl(43 70% 65%)",
              filter: "drop-shadow(0 0 8px hsl(43 70% 65% / 0.5))",
            }}
          />
        </div>

        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          className="relative"
          style={{ width: size, height: size }}
          animate={{ rotate: rotation }}
          transition={{ duration: 4.5, ease: [0.15, 0.85, 0.25, 1] }}
        >
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Outer glow ring */}
            <circle
              cx={cx}
              cy={cy}
              r={radius + 2}
              fill="none"
              stroke="hsl(43 70% 65% / 0.3)"
              strokeWidth="2"
            />
            {wheelRewards.map((reward, i) => (
              <g key={reward.id}>
                <path
                  d={slicePath(i)}
                  fill={reward.color}
                  stroke="hsl(43 70% 65% / 0.15)"
                  strokeWidth="1"
                  opacity={0.85}
                />
                <text
                  x={labelPosition(i).x}
                  y={labelPosition(i).y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="hsl(45 30% 90%)"
                  fontSize="10"
                  fontFamily="Cinzel, serif"
                  letterSpacing="0.05em"
                  transform={`rotate(${labelPosition(i).angle}, ${labelPosition(i).x}, ${labelPosition(i).y})`}
                >
                  {reward.label}
                </text>
              </g>
            ))}
            {/* Center circle */}
            <circle cx={cx} cy={cy} r={28} fill="hsl(233 70% 4%)" stroke="hsl(43 70% 65% / 0.4)" strokeWidth="2" />
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="hsl(43 70% 65%)" fontSize="16" fontFamily="Cinzel, serif">
              ✦
            </text>
          </svg>
        </motion.div>
      </div>

      {/* Spin button */}
      {!result && (
        <motion.button
          onClick={spin}
          disabled={spinning}
          className={`mystical-button px-10 py-4 rounded-xl font-heading text-base tracking-[0.2em] ${
            spinning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          whileHover={!spinning ? { scale: 1.05, boxShadow: "0 0 35px hsl(43 70% 65% / 0.4)" } : {}}
          whileTap={!spinning ? { scale: 0.95 } : {}}
        >
          {spinning ? "The Wheel Turns..." : "Spin the Wheel"}
        </motion.button>
      )}

      {/* Result display */}
      <AnimatePresence>
        {result && (
          <motion.div
            className="text-center max-w-sm"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="mb-3"
              animate={{
                textShadow: [
                  "0 0 10px hsl(43 70% 65% / 0.3)",
                  "0 0 25px hsl(43 70% 65% / 0.5)",
                  "0 0 10px hsl(43 70% 65% / 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h3 className="font-heading text-xl tracking-wider text-primary">
                {result.title}
              </h3>
            </motion.div>
            <p className="text-sm text-foreground/80 font-body leading-relaxed italic">
              {result.message}
            </p>
            <motion.button
              onClick={() => setResult(null)}
              className="mt-6 px-8 py-3 rounded-xl bg-secondary/50 border border-primary/20 text-primary/80 font-heading text-xs tracking-widest hover:bg-primary/10 hover:border-primary/30 transition-all duration-500"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Spin Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpinWheel;
