/**
 * Rule-Based Tarot Interpretation Engine v3
 * Generates personalized, emotionally aware readings locally without API calls.
 */

import type { DrawnCard } from "@/data/tarotDeck";
import { interpretationMap, type TarotInterpretation } from "@/data/tarotInterpretations";

// ─── Emotional Tone Detection ───

export type EmotionalTone = "hopeful" | "anxious" | "confused" | "curious" | "optimistic" | "neutral";

const TONE_KEYWORDS: Record<Exclude<EmotionalTone, "neutral">, string[]> = {
  anxious: ["worried", "scared", "afraid", "fear", "anxiety", "anxious", "nervous", "struggling", "falling apart", "overwhelmed", "stress", "stressed", "panic", "terrified", "desperate", "dread", "can't sleep", "losing", "lost", "stuck", "hopeless", "helpless", "breaking", "broken", "hurt", "painful", "suffering", "trouble", "crisis"],
  confused: ["confused", "don't understand", "no idea", "unclear", "mixed signals", "don't know", "lost", "unsure", "make sense", "why does", "why is", "what does it mean", "contradicting", "torn", "conflicted", "baffled", "puzzled"],
  hopeful: ["hope", "hoping", "wish", "wishing", "pray", "praying", "dream", "dreaming", "looking forward", "optimistic", "fingers crossed", "believe", "believing", "trust", "faith", "possible", "maybe things", "getting better", "improve"],
  optimistic: ["excited", "exciting", "amazing", "wonderful", "great", "fantastic", "thrilled", "can't wait", "looking forward", "positive", "good feeling", "confident", "ready", "eager", "inspired", "blessed", "grateful", "thankful", "happy", "joyful"],
  curious: ["curious", "wondering", "what if", "interested", "want to know", "tell me", "show me", "reveal", "discover", "explore", "insight", "guidance", "advice", "perspective", "opinion"],
};

const TONE_LABELS: Record<EmotionalTone, string> = {
  anxious: "seeking reassurance",
  confused: "looking for clarity",
  hopeful: "holding onto hope",
  optimistic: "embracing possibility",
  curious: "open to discovery",
  neutral: "open and receptive",
};

export function detectEmotionalTone(question: string): EmotionalTone {
  const lower = question.toLowerCase();
  let bestTone: EmotionalTone = "neutral";
  let bestScore = 0;

  for (const [tone, keywords] of Object.entries(TONE_KEYWORDS) as [Exclude<EmotionalTone, "neutral">, string[]][]) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += kw.includes(" ") ? 2 : 1; // multi-word matches score higher
    }
    if (score > bestScore) {
      bestScore = score;
      bestTone = tone;
    }
  }

  return bestTone;
}

// Tone-adaptive sentence starters to soften or encourage based on emotional state
const TONE_MODIFIERS: Record<EmotionalTone, { prefix: string[]; bridge: string[]; reassurance: string }> = {
  anxious: {
    prefix: [
      "It is understandable to feel uncertain, and",
      "Even in moments of worry,",
      "Though this may feel heavy right now,",
      "Take a breath — even amidst the turbulence,",
    ],
    bridge: [
      "The cards gently remind you that this difficult moment is not permanent.",
      "What feels overwhelming now is part of a larger unfolding — one that holds space for relief.",
      "The universe sees your struggle and responds not with judgment but with compassion.",
    ],
    reassurance: "Remember: the cards do not predict doom — they illuminate paths through it. You are not alone in this.",
  },
  confused: {
    prefix: [
      "When clarity feels out of reach,",
      "In the midst of confusion,",
      "Though the picture may seem unclear right now,",
      "It is natural to feel lost, and",
    ],
    bridge: [
      "The cards offer a thread to follow — not all answers arrive at once, and that is okay.",
      "Sometimes confusion is the mind's way of preparing for a deeper understanding.",
      "What seems contradictory on the surface may hold a hidden coherence the cards can reveal.",
    ],
    reassurance: "Clarity often arrives not as a lightning bolt but as a gentle dawn. Trust the process of understanding unfolding within you.",
  },
  hopeful: {
    prefix: [
      "Your hope is well-placed, and",
      "There is something beautiful about holding hope, and",
      "The cards honor the hope you carry, and",
      "Your faith in possibility is powerful, and",
    ],
    bridge: [
      "The cards affirm that your optimism is not naive — it reflects an alignment with the emerging energy.",
      "Hope is not passive waiting but an active force — the cards suggest yours is guiding you well.",
      "What you sense may be possible is echoed in the symbols before you.",
    ],
    reassurance: "The hope you carry is a compass. Let it guide you, but also let the cards deepen your understanding of what lies ahead.",
  },
  optimistic: {
    prefix: [
      "Your positive energy is magnetic, and",
      "The enthusiasm you bring amplifies the reading, and",
      "Riding this wave of confidence,",
      "Your readiness for what comes next is palpable, and",
    ],
    bridge: [
      "The cards celebrate your energy and offer insights to channel it wisely.",
      "Optimism like yours attracts opportunity — the cards show where to direct this powerful force.",
      "The universe rewards bold, open hearts — the symbols reflect this back to you.",
    ],
    reassurance: "Your positive outlook is a strength. The cards encourage you to carry it forward with both enthusiasm and discernment.",
  },
  curious: {
    prefix: [
      "Your openness to discovery is the perfect lens for this reading, and",
      "Approaching the cards with curiosity invites their deepest messages, and",
      "The spirit of inquiry you bring honors the symbols before you, and",
      "With fresh eyes,",
    ],
    bridge: [
      "The cards reward your curiosity with layers of meaning waiting to be explored.",
      "An open mind is the best companion for a tarot reading — yours creates space for genuine insight.",
      "The symbols speak most clearly to those who ask without demanding a specific answer.",
    ],
    reassurance: "Stay curious — the insights from this reading may continue to deepen in the hours and days ahead as new connections reveal themselves.",
  },
  neutral: {
    prefix: [
      "With an open heart,",
      "In this moment of reflection,",
      "As you sit with this reading,",
      "The cards respond to your openness, and",
    ],
    bridge: [
      "The cards have drawn a meaningful pattern that speaks to your current experience.",
      "There is a quiet clarity in this spread — the symbols align with purpose.",
      "The reading unfolds with a natural rhythm, revealing its message layer by layer.",
    ],
    reassurance: "Trust the insights that resonated most deeply — they are the ones meant for you right now.",
  },
};

// ─── Question Context Detection ───

export type QuestionContext = "love" | "career" | "money" | "decision" | "growth" | "general";

const CONTEXT_KEYWORDS: Partial<Record<QuestionContext, string[]>> = {
  love: ["love", "relationship", "partner", "boyfriend", "girlfriend", "husband", "wife", "marriage", "dating", "romantic", "crush", "soulmate", "twin flame", "ex", "breakup", "divorce", "heart", "attraction", "chemistry", "commitment", "together", "him", "her", "feelings"],
  career: ["career", "job", "work", "profession", "boss", "colleague", "promotion", "interview", "business", "company", "workplace", "hire", "fired", "resign", "office", "manager", "freelance", "project", "client", "professional"],
  money: ["money", "financial", "finances", "income", "debt", "savings", "investment", "wealth", "afford", "salary", "pay", "bills", "mortgage", "loan", "rent", "budget", "prosperity", "abundance", "fortune"],
  decision: ["should i", "choose", "decision", "choice", "option", "path", "direction", "crossroads", "uncertain", "confused", "dilemma", "which", "whether", "better", "move", "stay", "leave", "accept", "decline"],
  growth: ["grow", "growth", "spiritual", "purpose", "meaning", "self", "soul", "journey", "evolve", "heal", "healing", "transform", "inner", "peace", "mindful", "meditation", "awakening", "higher", "lesson", "karma", "energy", "vibration"],
};

const CONTEXT_LABELS: Record<QuestionContext, string> = {
  love: "love and relationships",
  career: "your career and professional life",
  money: "finances and material well-being",
  decision: "the choice before you",
  growth: "personal and spiritual growth",
  general: "your current path",
};

export function detectQuestionContext(question: string): QuestionContext {
  const lower = question.toLowerCase();
  let bestContext: QuestionContext = "general";
  let bestScore = 0;

  for (const [context, keywords] of Object.entries(CONTEXT_KEYWORDS) as [QuestionContext, string[]][]) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestContext = context;
    }
  }

  return bestContext;
}

// ─── Context-Aware Card Meaning ───

function getCardMeaning(dc: DrawnCard, interp: TarotInterpretation, context: QuestionContext): string {
  if (context === "love") return dc.isReversed ? interp.love_rev : interp.love_up;
  if (context === "career") return dc.isReversed ? interp.career_rev : interp.career_up;
  // money/decision/growth/general all use general meanings
  return dc.isReversed ? interp.general_rev : interp.general_up;
}

// ─── Theme Detection ───

const THEME_LABELS: Record<string, string> = {
  "new beginnings": "new beginnings and fresh starts",
  transformation: "transformation and deep change",
  healing: "healing and inner recovery",
  love: "love and emotional connection",
  conflict: "challenge and inner tension",
  opportunity: "expanding opportunity",
  "spiritual growth": "spiritual growth and awakening",
  balance: "balance and finding harmony",
  creativity: "creative energy and inspiration",
  "inner strength": "quiet courage and resilience",
  endings: "necessary endings and release",
  abundance: "abundance and prosperity",
  wisdom: "wisdom and deep reflection",
  independence: "independence and self-trust",
  determination: "determination and focused will",
  patience: "patience and trust in the process",
  intuition: "intuition and inner knowing",
  celebration: "celebration and shared joy",
  hope: "renewed hope and inspiration",
  illusion: "seeing beyond illusion",
  manifestation: "manifesting your intentions",
  surrender: "surrendering to what is",
  rebirth: "rebirth and renewal",
  stability: "stability and solid foundations",
  expansion: "growth and expansion",
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
  Wands: "in the coming days to weeks",
  Cups: "over the next few weeks to months",
  Swords: "swiftly, perhaps as a sudden development",
  Pentacles: "gradually, unfolding over the coming months",
};

function getTimingNarrative(cards: DrawnCard[]): string {
  const revealed = cards.filter((dc) => dc.isRevealed);
  const hasMajor = revealed.some((dc) => dc.card.arcana === "Major");
  const suits = revealed.filter((dc) => dc.card.suit).map((dc) => dc.card.suit!);

  if (suits.length === 0 && hasMajor) {
    return "The presence of Major Arcana cards suggests this touches upon a significant life chapter — the timing is less about weeks or months and more about a meaningful phase of your journey.";
  }

  if (suits.length === 0) return "";

  const suitCounts = new Map<string, number>();
  for (const s of suits) suitCounts.set(s, (suitCounts.get(s) || 0) + 1);

  let dominant: string = suits[0];
  let max = 0;
  for (const [s, c] of suitCounts) {
    if (c > max) { dominant = s; max = c; }
  }

  const timingPhrase = SUIT_TIMING[dominant] || "in the near future";
  const parts = [`Based on the energy of the cards, these developments are most likely to manifest ${timingPhrase}.`];

  if (hasMajor) {
    parts.push("The Major Arcana presence adds weight to this timeline — these shifts carry deep personal significance beyond ordinary day-to-day events.");
  }

  return parts.join(" ");
}

// ─── Template Phrases ───

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickUnique<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const OPENINGS_BY_CONTEXT: Record<QuestionContext, string[]> = {
  love: [
    "The cards carry a tender and revealing message about your heart's journey.",
    "There is a clear emotional current flowing through this reading — the cards speak to the connections closest to your heart.",
    "Love is a complex landscape, and the cards before you illuminate its terrain with honesty and warmth.",
  ],
  career: [
    "The cards reveal a compelling picture of your professional path and the energies shaping it.",
    "Your question about work and purpose has drawn powerful symbols — the cards have much to say about where you are heading.",
    "The professional landscape before you is shifting, and the cards illuminate both challenges and openings.",
  ],
  money: [
    "The cards speak clearly about the material and financial currents surrounding you.",
    "Your question about abundance has drawn revealing symbols — there is important guidance here about prosperity and value.",
    "The energy around your finances is dynamic, and the cards offer practical wisdom for navigating it.",
  ],
  decision: [
    "The cards sense you are standing at a crossroads, and they offer clarity for the path ahead.",
    "A choice weighs on you, and the symbols drawn today illuminate what each direction holds.",
    "The universe recognizes the weight of your decision — the cards reveal what lies beneath the surface of each option.",
  ],
  growth: [
    "The cards reflect a soul in motion — there is real growth unfolding within you.",
    "Your inner journey is mirrored beautifully in the cards drawn today.",
    "The symbols before you speak to the deepest currents of your personal evolution.",
  ],
  general: [
    "The cards speak with clarity and purpose today, weaving a story that is uniquely yours.",
    "A powerful message emerges from this spread — the symbols before you reveal what needs to be seen.",
    "The energy surrounding your question is unmistakable, and the cards have chosen their message with intention.",
  ],
};

const THEME_BRIDGES = [
  "Looking across the spread, a powerful thread of {theme} connects these cards — {card1} and {card2} both echo this energy, suggesting it is central to your experience right now.",
  "It is striking how {theme} surfaces repeatedly. Both {card1} and {card2} carry this vibration, creating a clear pattern the cards want you to notice.",
  "A dominant theme of {theme} weaves through your reading. When multiple cards share this energy — as {card1} and {card2} do here — it deserves special attention.",
];

const SECONDARY_THEME_BRIDGES = [
  "Alongside this, a quieter but meaningful thread of {theme} adds nuance to the reading.",
  "There is also an undercurrent of {theme} running beneath the surface, adding depth to the overall message.",
  "Intertwined with the main theme, {theme} brings an additional layer of insight worth reflecting on.",
];

// ─── Position-Aware Interpretation ───

const POSITION_NARRATIVES: Record<string, string[]> = {
  Past: [
    "Looking to the past, **{card}** appears {orientation}, suggesting that {meaning} This earlier influence continues to shape the ground you stand on today.",
    "The energy of your recent past is defined by **{card}** ({orientation}). {meaning} Understanding this foundation helps make sense of where you find yourself now.",
    "In what came before, **{card}** ({orientation}) reveals an important truth: {meaning} This experience has left its mark on your current situation.",
  ],
  Present: [
    "At the heart of the present moment, **{card}** ({orientation}) captures the essence of what you are navigating: {meaning}",
    "Right now, **{card}** ({orientation}) speaks directly to your lived experience: {meaning} This is the energy you are breathing in daily.",
    "The present card, **{card}** ({orientation}), reflects the central truth of this moment: {meaning} Sit with this — it holds the key to moving forward.",
  ],
  Future: [
    "Looking ahead, **{card}** ({orientation}) points toward what is forming on the horizon: {meaning}",
    "The future position holds **{card}** ({orientation}), and its message is clear: {meaning} This is not fixed destiny but the most probable path given current energies.",
    "What is coming into being is represented by **{card}** ({orientation}): {meaning} The future is still being written — this card shows the direction of the current flow.",
  ],
  "Present Situation": [
    "At the very center of this reading, **{card}** ({orientation}) defines the core of your situation: {meaning}",
  ],
  Challenge: [
    "Crossing this is the challenge of **{card}** ({orientation}): {meaning} This is what must be faced or integrated.",
  ],
  "Conscious Influence": [
    "Above, **{card}** ({orientation}) represents what you are aware of: {meaning} This conscious understanding shapes your approach.",
  ],
  "Subconscious Influence": [
    "Below the surface, **{card}** ({orientation}) reveals hidden forces at play: {meaning} These deeper currents influence you more than you may realize.",
  ],
  Advice: [
    "As guidance, the cards offer **{card}** ({orientation}): {meaning} This is the wisdom to carry forward.",
  ],
  "External Influences": [
    "From the world around you, **{card}** ({orientation}) brings external energy into the reading: {meaning}",
  ],
  "Hopes or Fears": [
    "In the space between hope and fear, **{card}** ({orientation}) surfaces: {meaning} Often, what we hope for and what we fear are two sides of the same coin.",
  ],
  Outcome: [
    "The final outcome card, **{card}** ({orientation}), reveals the most likely destination of these energies: {meaning} This trajectory holds if current patterns continue.",
  ],
  "Selected Card": [
    "**{card}** ({orientation}) steps forward to answer your question directly: {meaning}",
    "The card that presented itself to you is **{card}** ({orientation}): {meaning} Trust that this card appeared for a reason.",
  ],
};

function interpretCard(dc: DrawnCard, context: QuestionContext): string {
  const interp = interpretationMap.get(dc.card.id);
  if (!interp) {
    const meaning = dc.isReversed ? dc.card.meaning_rev : dc.card.meaning_up;
    return `**${dc.card.name}** (${dc.isReversed ? "reversed" : "upright"}): ${meaning}`;
  }

  const position = dc.position || "Selected Card";
  const templates = POSITION_NARRATIVES[position] || POSITION_NARRATIVES["Selected Card"];
  const template = pick(templates);
  const meaning = getCardMeaning(dc, interp, context);

  return template
    .replace("{card}", dc.card.name)
    .replace("{orientation}", dc.isReversed ? "reversed" : "upright")
    .replace("{meaning}", meaning);
}

// ─── Connection Phrases ───

const CARD_TRANSITIONS = [
  "Building on this,",
  "This energy flows into the next card.",
  "Together with this,",
  "Adding another dimension,",
  "Deepening the picture,",
  "Complementing this message,",
];

// ─── Question Acknowledgment ───

function buildQuestionAcknowledgment(question: string, context: QuestionContext): string {
  const contextLabel = CONTEXT_LABELS[context];
  const phrases = [
    `In the context of your question about ${contextLabel}, the cards have drawn a meaningful pattern.`,
    `Your question touches on ${contextLabel}, and the cards respond with clarity and depth.`,
    `As you seek guidance regarding ${contextLabel}, the spread reveals important insights.`,
  ];
  return pick(phrases);
}

// ─── Closing Reflections ───

const CLOSINGS_BY_CONTEXT: Record<QuestionContext, string[]> = {
  love: [
    "The heart has its own wisdom. Trust what these cards have stirred within you, and let your emotional truth guide your next steps in love.",
    "Love asks for both courage and vulnerability. Carry the insights from this reading with tenderness and honesty.",
    "Whether the path ahead is one of deepening connection or gentle release, the cards remind you that your heart already knows the way.",
  ],
  career: [
    "Your professional journey is unfolding as it should. Take these insights as encouragement to align your work with your deeper purpose.",
    "The cards suggest that clarity in your career comes not from external validation alone, but from trusting your own capabilities and vision.",
    "Step forward with confidence — the symbols here affirm that your efforts are building toward something meaningful.",
  ],
  money: [
    "True abundance flows from a combination of practical wisdom and trust in the universe's support. Let this reading guide both.",
    "The cards encourage a balanced approach to your finances — thoughtful action paired with an openness to unexpected gifts.",
    "Material security is built one conscious choice at a time. These insights illuminate the next right step.",
  ],
  decision: [
    "Ultimately, the best decisions arise from a blend of clear thinking and intuitive knowing. The cards have given you both — now trust yourself to choose.",
    "The path will become clearer with each step you take. These cards don't remove the choice, but they illuminate what each direction holds.",
    "Remember: there is rarely a perfect option — only the one that aligns most honestly with who you are becoming.",
  ],
  growth: [
    "Growth is not always comfortable, but it is always worthwhile. Honor the journey these cards have reflected back to you.",
    "The soul grows in spirals, not straight lines. Trust the process, even when it feels circular — each pass brings deeper understanding.",
    "Carry the wisdom of this reading gently. The transformation unfolding within you is real, and it deserves your patience and compassion.",
  ],
  general: [
    "The cards illuminate possibilities — the choices remain yours. Trust the insights that resonated most deeply.",
    "Reflect on these messages and let your intuition guide your next steps. The symbols have spoken; now it is your turn to act.",
    "These cards offer a mirror, not a map. What you see reflected is yours to interpret — honor your own knowing above all.",
  ],
};

// ─── Main Generator ───

export function generateRuleBasedReading(question: string, cards: DrawnCard[]): string {
  const revealed = cards.filter((dc) => dc.isRevealed);
  if (revealed.length === 0) return "No cards have been revealed yet.";

  const context = detectQuestionContext(question);
  const themes = detectThemes(cards);
  const parts: string[] = [];

  // 1. Opening
  parts.push(pick(OPENINGS_BY_CONTEXT[context]));

  // 2. Question acknowledgment
  parts.push(buildQuestionAcknowledgment(question, context));

  // 3. Theme weaving
  if (themes.length > 0) {
    const primary = themes[0];
    const bridge = pick(THEME_BRIDGES)
      .replace("{theme}", primary.label)
      .replace("{card1}", primary.cards[0])
      .replace("{card2}", primary.cards[1] || primary.cards[0]);
    parts.push(bridge);

    if (themes.length > 1) {
      const secondary = themes[1];
      parts.push(pick(SECONDARY_THEME_BRIDGES).replace("{theme}", secondary.label));
    }
  }

  // 4. Card-by-card narrative with transitions
  parts.push(""); // visual break
  for (let i = 0; i < revealed.length; i++) {
    const cardText = interpretCard(revealed[i], context);

    if (i > 0 && revealed.length > 2) {
      // Add a soft transition between cards (not for the first one)
      parts.push(cardText);
    } else {
      parts.push(cardText);
    }
  }

  // 5. Synthesis — connect cards to each other for multi-card readings
  if (revealed.length >= 3) {
    parts.push("");
    const first = revealed[0];
    const last = revealed[revealed.length - 1];
    const syntheses = [
      `Reading these cards as a whole, the journey from **${first.card.name}** to **${last.card.name}** tells a story of evolution — from ${first.isReversed ? "confronting limitations" : "initial energy"} toward ${last.isReversed ? "careful reassessment" : "emerging possibility"}.`,
      `When you step back and view the full spread, the arc from **${first.card.name}** through to **${last.card.name}** suggests a clear trajectory: ${themes.length > 0 ? `one shaped by ${themes[0].label}` : "one that is uniquely yours to navigate"}.`,
      `Together, these cards paint a coherent picture. **${first.card.name}** sets the stage, and **${last.card.name}** reveals where the energy is flowing — ${themes.length > 0 ? `with ${themes[0].label} as the unifying thread` : "in a direction that will become clearer with time"}.`,
    ];
    parts.push(pick(syntheses));
  }

  // 6. Timing
  const timingText = getTimingNarrative(cards);
  if (timingText) {
    parts.push("");
    parts.push(timingText);
  }

  // 7. Closing
  parts.push("");
  parts.push(pick(CLOSINGS_BY_CONTEXT[context]));

  return parts.join("\n\n");
}
