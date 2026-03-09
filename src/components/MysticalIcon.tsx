import { motion } from "framer-motion";
import { 
  Sparkles, 
  Star, 
  Moon, 
  Sun, 
  Eye,
  Compass,
  Layers,
  Feather,
  Circle,
  Hexagon,
  Triangle,
  type LucideIcon
} from "lucide-react";

export type IconType = 
  | "tarot" 
  | "runes" 
  | "angel" 
  | "horary" 
  | "yes-no" 
  | "pick-a-card" 
  | "daily" 
  | "meanings" 
  | "guide";

interface MysticalIconProps {
  type: IconType;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const iconConfig: Record<IconType, { Icon: LucideIcon; color: string }> = {
  tarot: { Icon: Layers, color: "text-primary" },
  runes: { Icon: Hexagon, color: "text-amber-400" },
  angel: { Icon: Feather, color: "text-sky-300" },
  horary: { Icon: Compass, color: "text-violet-400" },
  "yes-no": { Icon: Circle, color: "text-emerald-400" },
  "pick-a-card": { Icon: Sparkles, color: "text-primary" },
  daily: { Icon: Sun, color: "text-orange-400" },
  meanings: { Icon: Eye, color: "text-primary" },
  guide: { Icon: Star, color: "text-primary" },
};

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const MysticalIcon = ({ type, size = "md", animated = false, className = "" }: MysticalIconProps) => {
  const config = iconConfig[type] || iconConfig.tarot;
  const { Icon, color } = config;
  
  if (animated) {
    return (
      <motion.div
        className={`${className}`}
        animate={{
          filter: [
            "drop-shadow(0 0 4px hsl(45 80% 55% / 0.3))",
            "drop-shadow(0 0 8px hsl(45 80% 55% / 0.6))",
            "drop-shadow(0 0 4px hsl(45 80% 55% / 0.3))",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className={`${sizeClasses[size]} ${color}`} />
      </motion.div>
    );
  }
  
  return <Icon className={`${sizeClasses[size]} ${color} ${className}`} />;
};

// Custom SVG icons for more specific divination imagery
export const TarotDeckIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    className={`${className}`}
  >
    <rect x="4" y="2" width="12" height="18" rx="2" />
    <rect x="6" y="4" width="12" height="18" rx="2" />
    <rect x="8" y="6" width="12" height="18" rx="2" />
    <circle cx="14" cy="15" r="3" />
    <path d="M14 9v2" />
  </svg>
);

export const RuneStoneIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    className={`${className}`}
  >
    <ellipse cx="12" cy="12" rx="8" ry="10" />
    <path d="M12 4v16" />
    <path d="M8 8l4 4-4 4" />
    <path d="M16 8l-4 4 4 4" />
  </svg>
);

export const AngelWingsIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    className={`${className}`}
  >
    <path d="M12 4c-3 0-6 3-8 8 2-2 4-3 6-3" />
    <path d="M12 4c3 0 6 3 8 8-2-2-4-3-6-3" />
    <path d="M12 9v11" />
    <circle cx="12" cy="6" r="2" />
    <path d="M4 12c0 4 3 8 8 8" />
    <path d="M20 12c0 4-3 8-8 8" />
  </svg>
);

export const AstrologyWheelIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    className={`${className}`}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
    <path d="M4.93 19.07l2.83-2.83" />
    <path d="M16.24 7.76l2.83-2.83" />
  </svg>
);

export default MysticalIcon;
