import { motion } from "framer-motion";
import { Sparkles, Clock, Layers } from "lucide-react";
import type { DrawnCard } from "@/data/tarotDeck";

interface ReadingSummaryProps {
  drawnCards: DrawnCard[];
  type?: "tarot" | "rune" | "angel";
}

// Energy themes based on card combinations
const getEnergyTheme = (cards: DrawnCard[]): { theme: string; description: string } => {
  const revealed = cards.filter(c => c.isRevealed);
  if (revealed.length === 0) return { theme: "Mystery", description: "The energy awaits revelation" };
  
  const hasReversed = revealed.some(c => c.isReversed);
  const hasMajor = revealed.some(c => c.card.arcana === "Major");
  const suits = revealed.map(c => c.card.suit).filter(Boolean);
  
  // Check for dominant suit
  const suitCounts = suits.reduce((acc, suit) => {
    acc[suit] = (acc[suit] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const dominantSuit = Object.entries(suitCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  
  // Determine energy based on card composition
  if (hasMajor && !hasReversed) {
    return { theme: "Powerful Transformation", description: "Major arcana energy signals significant life changes" };
  }
  if (hasMajor && hasReversed) {
    return { theme: "Inner Reflection", description: "A time for introspection and reassessment" };
  }
  
  switch (dominantSuit) {
    case "Cups":
      return { theme: "Emotional Depth", description: "Love, intuition, and heart-centered matters take center stage" };
    case "Wands":
      return { theme: "Creative Fire", description: "Passion, ambition, and inspired action are highlighted" };
    case "Swords":
      return { theme: "Mental Clarity", description: "Truth, decisions, and intellectual breakthroughs emerge" };
    case "Pentacles":
      return { theme: "Material Growth", description: "Abundance, stability, and practical matters are emphasized" };
    default:
      return hasReversed 
        ? { theme: "Gentle Transition", description: "A period of subtle shifts and inner work" }
        : { theme: "New Beginnings", description: "Fresh energy and opportunities are arising" };
  }
};

// Timing suggestions based on cards
const getTimingInsight = (cards: DrawnCard[]): string => {
  const revealed = cards.filter(c => c.isRevealed);
  if (revealed.length === 0) return "Timing will become clear as the reading unfolds";
  
  const suits = revealed.map(c => c.card.suit).filter(Boolean);
  const hasWands = suits.includes("Wands");
  const hasSwords = suits.includes("Swords");
  const hasCups = suits.includes("Cups");
  const hasPentacles = suits.includes("Pentacles");
  
  if (hasWands && hasSwords) return "Swift energy — within days to weeks";
  if (hasPentacles) return "Gradual manifestation — weeks to months";
  if (hasCups) return "Emotional timing — when the heart is ready";
  if (hasWands) return "Rapid movement — within days";
  if (hasSwords) return "Quick developments — within a week";
  
  return "Divine timing — trust the natural unfolding";
};

// Card combination insights
const getCombinationInsight = (cards: DrawnCard[]): string | null => {
  const revealed = cards.filter(c => c.isRevealed);
  if (revealed.length < 2) return null;
  
  const names = revealed.map(c => c.card.name.toLowerCase());
  const hasLover = names.some(n => n.includes("lovers") || n.includes("empress") || n.includes("queen of cups"));
  const hasTower = names.some(n => n.includes("tower") || n.includes("death"));
  const hasStar = names.some(n => n.includes("star") || n.includes("sun") || n.includes("world"));
  const hasJudgement = names.some(n => n.includes("judgement") || n.includes("justice"));
  
  if (hasTower && hasStar) {
    return "The presence of both challenge and hope suggests that from current difficulties, a beautiful renewal will emerge. Trust the process.";
  }
  if (hasLover && hasStar) {
    return "A powerful alignment of heart energy and cosmic blessing. Love and fulfillment are strongly indicated.";
  }
  if (hasJudgement && hasTower) {
    return "Major karmic energy is at play. Important decisions or revelations may reshape your path significantly.";
  }
  
  const hasReversedFuture = revealed.length >= 3 && revealed[2]?.isReversed;
  const hasUprightPast = revealed.length >= 1 && !revealed[0]?.isReversed;
  
  if (hasUprightPast && hasReversedFuture) {
    return "The cards suggest that past strengths may need to be applied differently going forward. Adaptation is key.";
  }
  
  // Generic combination insight
  const arcanaCount = revealed.filter(c => c.card.arcana === "Major").length;
  if (arcanaCount >= 2) {
    return "Multiple major arcana cards indicate this is a significant moment. The universe is speaking loudly — pay attention.";
  }
  
  return "These cards weave together a narrative of growth and understanding. Consider how each position builds upon the others.";
};

const ReadingSummary = ({ drawnCards, type = "tarot" }: ReadingSummaryProps) => {
  const revealed = drawnCards.filter(c => c.isRevealed);
  if (revealed.length === 0) return null;
  
  const energy = getEnergyTheme(drawnCards);
  const timing = getTimingInsight(drawnCards);
  const combination = getCombinationInsight(drawnCards);
  
  return (
    <motion.div
      className="space-y-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Energy Summary */}
      <div className="reading-panel rounded-lg p-4 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h4 className="font-heading text-sm text-primary tracking-wider">Energy of This Reading</h4>
        </div>
        <p className="font-heading text-lg gold-text mb-1">{energy.theme}</p>
        <p className="text-xs text-muted-foreground">{energy.description}</p>
      </div>
      
      {/* Timing Insight */}
      <div className="reading-panel rounded-lg p-4 border border-accent/20">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-accent" />
          <h4 className="font-heading text-sm text-accent tracking-wider">Possible Timing</h4>
        </div>
        <p className="text-sm text-foreground/90">{timing}</p>
      </div>
      
      {/* Card Combination */}
      {combination && (
        <div className="reading-panel rounded-lg p-4 border border-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-secondary-foreground" />
            <h4 className="font-heading text-sm text-secondary-foreground tracking-wider">Card Combination</h4>
          </div>
          <p className="text-sm text-muted-foreground italic leading-relaxed">{combination}</p>
        </div>
      )}
    </motion.div>
  );
};

export default ReadingSummary;
