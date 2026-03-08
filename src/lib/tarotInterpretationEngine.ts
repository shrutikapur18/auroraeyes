/**
 * Rule-Based Tarot Interpretation Engine
 * Generates coherent readings locally without API calls.
 */

import type { DrawnCard } from "@/data/tarotDeck";
import { interpretationMap, type TarotInterpretation } from "@/data/tarotInterpretations";

// ─── Theme Detection ───

const THEME_LABELS: Record<string, string> = {
  "new beginnings": "new beginnings and fresh starts",
  transformation: "transformation and change",
  healing: "healing and recovery",
  love: "love and emotional connection",
  "new love": "new love and emotional opening",
  conflict: "conflict and challenge",
  opportunity: "opportunity and growth",
  "spiritual growth": "spiritual growth and inner wisdom",
  balance: "balance and harmony",
  creativity: "creativity and inspiration",
  "inner strength": "inner strength and courage",
  endings: "endings and necessary release",
  abundance: "abundance and prosperity",
  wisdom: "wisdom and reflection",
  independence: "independence and self-reliance",
  determination: "determination and willpower",
  patience: "patience and perseverance",
  intuition: "intuition and inner knowing",
  celebration: "celebration and joy",
  "self-limiting beliefs": "breaking free from self-imposed limitations",
  anxiety: "confronting worry and fear",
  deception: "hidden truths and careful discernment",
  nostalgia: "memories and past connections",
  partnership: "partnership and mutual support",
  leadership: "leadership and vision",
  "hard work": "dedication and hard work",
  legacy: "legacy and long-term foundations",
};

export interface DetectedTheme {
  theme: string;
  label: string;
  count: number;
  cards: string[];
}

export function detectThemes(cards: DrawnCard[]): DetectedTheme[] {
  const themeCount = new Map<string, { count: number; cards: string[] }>();

  for (const dc of cards) {
    if (!dc.isRevealed) continue;
    const interp = interpretationMap.get(dc.card.id);
    if (!interp) continue;

    for (const theme of interp.themes) {
      const entry = themeCount.get(theme) || { count: 0, cards: [] };
      entry.count++;
      entry.cards.push(dc.card.name);
      themeCount.set(theme, entry);
    }
  }

  return Array.from(themeCount.entries())
    .filter(([, v]) => v.count >= 2)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([theme, v]) => ({
      theme,
      label: THEME_LABELS[theme] || theme,
      count: v.count,
      cards: v.cards,
    }));
}

// ─── Timing ───

const SUIT_TIMING: Record<string, string> = {
  Wands: "over the coming days to weeks",
  Cups: "over the coming weeks to months",
  Swords: "as a sudden or swift development",
  Pentacles: "as a longer-term unfolding over months",
};

function getTimingPhrase(cards: DrawnCard[]): string {
  const suits = cards
    .filter((dc) => dc.isRevealed && dc.card.suit)
    .map((dc) => dc.card.suit!);

  if (suits.length === 0) return "in divine timing";

  const suitCounts = new Map<string, number>();
  for (const s of suits) suitCounts.set(s, (suitCounts.get(s) || 0) + 1);

  let dominant: string = suits[0];
  let max = 0;
  for (const [s, c] of suitCounts) {
    if (c > max) { dominant = s; max = c; }
  }

  return SUIT_TIMING[dominant] || "in the near future";
}

// ─── Template Phrases ───

const OPENINGS = [
  "The cards speak with clarity today.",
  "A powerful message emerges from this spread.",
  "The symbols before you weave a revealing story.",
  "The energy surrounding your question is unmistakable.",
  "There is much to uncover in the cards drawn for you.",
  "The universe has chosen these cards with intention.",
];

const THEME_INTROS = [
  "A strong theme of {theme} weaves through this reading.",
  "There is a powerful undercurrent of {theme} present in this spread.",
  "The cards speak with one voice about {theme}.",
  "Across the spread, {theme} emerges as the dominant energy.",
  "The recurring presence of {theme} cannot be overlooked.",
];

const GUIDANCE_CLOSINGS = [
  "Consider remaining open to the lessons revealed by these symbols.",
  "Trust the process and allow these insights to settle within you.",
  "The cards illuminate possibilities — the choices remain yours.",
  "Reflect on these messages and let your intuition guide your next steps.",
  "These symbols offer wisdom, not certainty. Walk forward with awareness.",
  "Honor the guidance received and carry it gently into the days ahead.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Position Templates ───

const POSITION_TEMPLATES: Record<string, string[]> = {
  Past: [
    "In the past position, **{card}** ({orientation}) reveals that {meaning} This influence has shaped the foundation of your current experience.",
    "Looking back, **{card}** ({orientation}) suggests that {meaning} These past energies continue to echo in the present.",
  ],
  Present: [
    "At the heart of the present, **{card}** ({orientation}) indicates that {meaning} This is the energy you are navigating right now.",
    "In your current position, **{card}** ({orientation}) shows that {meaning} Awareness of this energy empowers conscious choice.",
  ],
  Future: [
    "Looking ahead, **{card}** ({orientation}) suggests that {meaning} This energy approaches {timing}.",
    "The future position holds **{card}** ({orientation}), indicating that {meaning} Expect this to manifest {timing}.",
  ],
  "Present Situation": [
    "At the center of the spread, **{card}** ({orientation}) defines your current reality: {meaning}",
  ],
  Challenge: [
    "Crossing you, **{card}** ({orientation}) presents the challenge: {meaning}",
  ],
  "Conscious Influence": [
    "Above you, **{card}** ({orientation}) represents your conscious awareness: {meaning}",
  ],
  "Subconscious Influence": [
    "Beneath the surface, **{card}** ({orientation}) reveals subconscious currents: {meaning}",
  ],
  Advice: [
    "As guidance, **{card}** ({orientation}) counsels: {meaning}",
  ],
  "External Influences": [
    "From the world around you, **{card}** ({orientation}) brings external energy: {meaning}",
  ],
  "Hopes or Fears": [
    "In the realm of hopes and fears, **{card}** ({orientation}) surfaces: {meaning}",
  ],
  Outcome: [
    "The final outcome card, **{card}** ({orientation}), points toward: {meaning} This is the most likely trajectory if current energies persist.",
  ],
  "Selected Card": [
    "**{card}** ({orientation}) speaks directly to your question: {meaning}",
  ],
};

function getCardMeaning(dc: DrawnCard, interp: TarotInterpretation): string {
  return dc.isReversed ? interp.general_rev : interp.general_up;
}

function interpretCard(dc: DrawnCard, timing: string): string {
  const interp = interpretationMap.get(dc.card.id);
  if (!interp) {
    const meaning = dc.isReversed ? dc.card.meaning_rev : dc.card.meaning_up;
    return `**${dc.card.name}** (${dc.isReversed ? "reversed" : "upright"}): ${meaning}`;
  }

  const position = dc.position || "Selected Card";
  const templates = POSITION_TEMPLATES[position] || POSITION_TEMPLATES["Selected Card"];
  const template = pick(templates);

  return template
    .replace("{card}", dc.card.name)
    .replace("{orientation}", dc.isReversed ? "reversed" : "upright")
    .replace("{meaning}", getCardMeaning(dc, interp))
    .replace("{timing}", timing);
}

// ─── Main Generator ───

export function generateRuleBasedReading(question: string, cards: DrawnCard[]): string {
  const revealed = cards.filter((dc) => dc.isRevealed);
  if (revealed.length === 0) return "No cards have been revealed yet.";

  const themes = detectThemes(cards);
  const timing = getTimingPhrase(cards);
  const parts: string[] = [];

  // Opening
  parts.push(pick(OPENINGS));

  // Theme summary
  if (themes.length > 0) {
    const primary = themes[0];
    parts.push(pick(THEME_INTROS).replace("{theme}", primary.label));

    if (themes.length > 1) {
      const secondary = themes[1];
      parts.push(`A secondary thread of ${secondary.label} also runs through the reading, adding depth to the interpretation.`);
    }
  }

  // Card-by-card
  parts.push("");
  for (const dc of revealed) {
    parts.push(interpretCard(dc, timing));
  }

  // Timing
  parts.push("");
  if (revealed.some((dc) => dc.card.suit)) {
    parts.push(`Based on the energies present, these developments are most likely to unfold ${timing}.`);
  }

  // Guidance closing
  parts.push("");
  parts.push(pick(GUIDANCE_CLOSINGS));

  return parts.join("\n\n");
}
