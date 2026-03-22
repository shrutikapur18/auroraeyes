import { motion } from "framer-motion";

interface IconProps {
  className?: string;
  animated?: boolean;
}

const GlowWrapper = ({ children, animated = true, className = "" }: { children: React.ReactNode; animated?: boolean; className?: string }) => {
  if (!animated) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      animate={{
        filter: [
          "drop-shadow(0 0 6px hsl(43 70% 65% / 0.3))",
          "drop-shadow(0 0 14px hsl(43 70% 65% / 0.5))",
          "drop-shadow(0 0 6px hsl(43 70% 65% / 0.3))",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export const TarotCardIcon = ({ className = "", animated = true }: IconProps) => (
  <GlowWrapper animated={animated} className={className}>
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Card body */}
      <rect x="10" y="4" width="28" height="40" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
      <rect x="12" y="6" width="24" height="36" rx="2" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      {/* Inner mystical symbol */}
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <path d="M24 16l2 5h5l-4 3 1.5 5L24 26l-4.5 3 1.5-5-4-3h5z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.15" />
      {/* Aura lines */}
      <path d="M6 20c-1 4 0 8 2 12" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <path d="M42 20c1 4 0 8-2 12" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <circle cx="24" cy="24" r="13" stroke="currentColor" strokeWidth="0.4" opacity="0.2" strokeDasharray="2 4" />
    </svg>
  </GlowWrapper>
);

export const AngelWingsIcon = ({ className = "", animated = true }: IconProps) => (
  <GlowWrapper animated={animated} className={className}>
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Left wing */}
      <path d="M24 28C20 24 14 20 8 22c-4 1.5-3 6 1 8 3 1.5 8 1 15-2z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" />
      <path d="M24 28C21 22 16 16 10 16c-4 0-5 4-2 7 2.5 2.5 8 4 16 5z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.04" />
      {/* Right wing */}
      <path d="M24 28C28 24 34 20 40 22c4 1.5 3 6-1 8-3 1.5-8 1-15-2z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" />
      <path d="M24 28C27 22 32 16 38 16c4 0 5 4 2 7-2.5 2.5-8 4-16 5z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.04" />
      {/* Halo */}
      <ellipse cx="24" cy="14" rx="6" ry="2.5" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <ellipse cx="24" cy="14" rx="8" ry="3.5" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      {/* Head */}
      <circle cx="24" cy="20" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  </GlowWrapper>
);

export const RuneStoneIcon = ({ className = "", animated = true }: IconProps) => (
  <GlowWrapper animated={animated} className={className}>
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Stone shape */}
      <path d="M24 6C16 6 10 14 10 24c0 10 6 18 14 18s14-8 14-18c0-10-6-18-14-18z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.06" />
      <path d="M24 8C17 8 12 15 12 24c0 9 5 16 12 16s12-7 12-16c0-9-5-16-12-16z" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Rune symbol (Ansuz ᚨ) */}
      <path d="M24 14v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 18l6 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M24 24l6 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Glow dots */}
      <circle cx="18" cy="16" r="0.8" fill="currentColor" opacity="0.4" />
      <circle cx="30" cy="32" r="0.8" fill="currentColor" opacity="0.4" />
    </svg>
  </GlowWrapper>
);

export const ZodiacWheelIcon = ({ className = "", animated = true }: IconProps) => (
  <GlowWrapper animated={animated} className={className}>
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Outer circle */}
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Cross lines */}
      <path d="M24 6v36M6 24h36" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
      <path d="M11 11l26 26M37 11L11 37" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      {/* Planet symbols at cardinal points */}
      <circle cx="24" cy="8" r="1.5" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <circle cx="40" cy="24" r="1.5" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <circle cx="24" cy="40" r="1.5" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <circle cx="8" cy="24" r="1.5" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      {/* Center */}
      <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.1" />
      <circle cx="24" cy="24" r="1" fill="currentColor" opacity="0.5" />
      {/* Division marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 24 + Math.cos(rad) * 15;
        const y1 = 24 + Math.sin(rad) * 15;
        const x2 = 24 + Math.cos(rad) * 18;
        const y2 = 24 + Math.sin(rad) * 18;
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />;
      })}
    </svg>
  </GlowWrapper>
);
