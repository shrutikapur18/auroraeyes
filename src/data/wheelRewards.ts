export type RewardTier = "high" | "medium" | "low";
export type RewardCategory =
  | "free_horary"
  | "deep_analysis"
  | "bonus_reading"
  | "streak_boost"
  | "premium_unlock"
  | "cosmic_insight";

export interface WheelReward {
  id: string;
  tier: RewardTier;
  category: RewardCategory;
  label: string; // short label on the wheel slice
  title: string;
  message: string;
  color: string; // HSL token-compatible tailwind class suffix
}

export const wheelRewards: WheelReward[] = [
  {
    id: "horary-free",
    tier: "high",
    category: "free_horary",
    label: "Free Horary",
    title: "A Rare Opening",
    message: "The stars align just for you — ask your question freely and receive celestial clarity.",
  color: "hsl(43 70% 65%)",
  },
  {
    id: "deep-analysis",
    tier: "high",
    category: "deep_analysis",
    label: "Deep Analysis",
    title: "The Veil Lifts",
    message: "A deeper layer of your reading awaits — the cards wish to reveal more.",
    color: "hsl(265 50% 40%)",
  },
  {
    id: "bonus-reading",
    tier: "medium",
    category: "bonus_reading",
    label: "Bonus Reading",
    title: "A Gentle Nudge",
    message: "One more message awaits you — take another step into clarity.",
    color: "hsl(230 50% 28%)",
  },
  {
    id: "cosmic-insight",
    tier: "medium",
    category: "cosmic_insight",
    label: "Cosmic Insight",
    title: "A Whisper from Beyond",
    message: "A hidden truth surfaces — a personal insight crafted by the stars.",
    color: "hsl(260 45% 30%)",
  },
  {
    id: "streak-boost",
    tier: "low",
    category: "streak_boost",
    label: "Streak Boost",
    title: "Momentum Builds",
    message: "Your dedication is noticed — your streak glows a little brighter today.",
    color: "hsl(210 60% 25%)",
  },
  {
    id: "premium-unlock",
    tier: "high",
    category: "premium_unlock",
    label: "Premium Unlock",
    title: "A Door Opens",
    message: "Something rare has been unlocked — step through before it fades.",
    color: "hsl(43 80% 45%)",
  },
  {
    id: "bonus-rune",
    tier: "medium",
    category: "bonus_reading",
    label: "Rune Cast",
    title: "Stones Stir",
    message: "The runes have chosen to speak again — listen closely.",
    color: "hsl(235 45% 22%)",
  },
  {
    id: "angel-message",
    tier: "low",
    category: "cosmic_insight",
    label: "Angel Whisper",
    title: "Wings Brush Near",
    message: "A gentle presence draws close — a brief message of comfort awaits.",
    color: "hsl(260 40% 22%)",
  },
];
