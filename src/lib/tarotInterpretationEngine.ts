/**
 * Rule-Based Tarot Interpretation Engine v4
 * Generates professional-quality, emotionally aware readings locally without API calls.
 * 
 * Narrative flow:
 * 1. Reader greeting & question acknowledgment
 * 2. Spread overview (Major Arcana count, suit dominance, overall energy)
 * 3. Position-by-position interpretation (reader voice)
 * 4. Card combination analysis
 * 5. Symbol resonance / theme weaving
 * 6. Current situation synthesis
 * 7. Possible outcome
 * 8. Timing guidance
 * 9. Guidance, reflection & closing question
 */

import type { DrawnCard } from "@/data/tarotDeck";
import { interpretationMap, type TarotInterpretation } from "@/data/tarotInterpretations";
import { findAllCombinations } from "@/data/tarotCombinations";

// ─── Utilities ───

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// ─── Emotional Tone Detection ───

export type EmotionalTone = "hopeful" | "anxious" | "confused" | "curious" | "optimistic" | "neutral";

const TONE_KEYWORDS: Record<Exclude<EmotionalTone, "neutral">, string[]> = {
  anxious: ["worried", "scared", "afraid", "fear", "anxiety", "anxious", "nervous", "struggling", "falling apart", "overwhelmed", "stress", "stressed", "panic", "terrified", "desperate", "dread", "can't sleep", "losing", "lost", "stuck", "hopeless", "helpless", "breaking", "broken", "hurt", "painful", "suffering", "trouble", "crisis"],
  confused: ["confused", "don't understand", "no idea", "unclear", "mixed signals", "don't know", "lost", "unsure", "make sense", "why does", "why is", "what does it mean", "contradicting", "torn", "conflicted", "baffled", "puzzled"],
  hopeful: ["hope", "hoping", "wish", "wishing", "pray", "praying", "dream", "dreaming", "looking forward", "optimistic", "fingers crossed", "believe", "believing", "trust", "faith", "possible", "maybe things", "getting better", "improve"],
  optimistic: ["excited", "exciting", "amazing", "wonderful", "great", "fantastic", "thrilled", "can't wait", "looking forward", "positive", "good feeling", "confident", "ready", "eager", "inspired", "blessed", "grateful", "thankful", "happy", "joyful"],
  curious: ["curious", "wondering", "what if", "interested", "want to know", "tell me", "show me", "reveal", "discover", "explore", "insight", "guidance", "advice", "perspective", "opinion"],
};

export function detectEmotionalTone(question: string): EmotionalTone {
  const lower = question.toLowerCase();
  let bestTone: EmotionalTone = "neutral";
  let bestScore = 0;
  for (const [tone, keywords] of Object.entries(TONE_KEYWORDS) as [Exclude<EmotionalTone, "neutral">, string[]][]) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += kw.includes(" ") ? 2 : 1;
    }
    if (score > bestScore) { bestScore = score; bestTone = tone; }
  }
  return bestTone;
}

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
    for (const kw of keywords) { if (lower.includes(kw)) score++; }
    if (score > bestScore) { bestScore = score; bestContext = context; }
  }
  return bestContext;
}

// ─── Context-Aware Card Meaning ───

function getCardMeaning(dc: DrawnCard, interp: TarotInterpretation, context: QuestionContext): string {
  if (context === "love") return dc.isReversed ? interp.love_rev : interp.love_up;
  if (context === "career") return dc.isReversed ? interp.career_rev : interp.career_up;
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
    .map(([theme, v]) => ({ theme, label: THEME_LABELS[theme] || theme, count: v.count, cards: v.cards }));
}

// ─── Tone-Adaptive Language ───

const TONE_MODIFIERS: Record<EmotionalTone, { prefix: string[]; bridge: string[]; reassurance: string }> = {
  anxious: {
    prefix: [
      "I can feel that this question carries real weight for you, and",
      "Even in moments of worry,",
      "Though this may feel heavy right now,",
      "Take a breath — I want you to know that",
    ],
    bridge: [
      "The cards gently remind you that this difficult moment is not permanent.",
      "What feels overwhelming now is part of a larger unfolding — one that holds space for relief.",
      "I sense the universe responding not with judgment but with compassion to your question.",
    ],
    reassurance: "Remember: the cards do not predict doom — they illuminate paths through difficulty. You are not alone in this, and what you feel right now is valid.",
  },
  confused: {
    prefix: [
      "I understand that things feel unclear right now, and",
      "When clarity feels just out of reach,",
      "Though the picture may seem tangled,",
      "It is natural to feel lost, and I want you to know that",
    ],
    bridge: [
      "The cards offer a thread to follow — not all answers arrive at once, and that is perfectly okay.",
      "Sometimes confusion is the mind's way of preparing for a deeper understanding.",
      "What seems contradictory on the surface may hold a hidden coherence that these cards reveal.",
    ],
    reassurance: "Clarity often arrives not as a lightning bolt but as a gentle dawn. Trust the process of understanding that is already unfolding within you.",
  },
  hopeful: {
    prefix: [
      "Your hope is well-placed, and I feel the cards responding to it —",
      "There is something beautiful about the hope you carry, and",
      "The cards honor the faith you bring to this moment, and",
      "I sense real possibility in your question, and",
    ],
    bridge: [
      "The cards affirm that your optimism is not naive — it reflects a genuine alignment with the emerging energy around you.",
      "Hope is not passive waiting but an active force, and the cards suggest yours is guiding you well.",
      "What you sense may be possible is echoed in the symbols before you.",
    ],
    reassurance: "The hope you carry is a compass. Let it guide you, but also let the cards deepen your understanding of what lies ahead.",
  },
  optimistic: {
    prefix: [
      "Your positive energy is magnetic, and I feel it amplifying this reading —",
      "The enthusiasm you bring is palpable, and",
      "Riding this wave of confidence,",
      "I can feel your readiness for what comes next, and",
    ],
    bridge: [
      "The cards celebrate your energy and offer insights to channel it wisely.",
      "Optimism like yours attracts opportunity — the cards show where to direct this powerful force.",
      "The universe rewards open hearts, and the symbols reflect this back to you.",
    ],
    reassurance: "Your positive outlook is a genuine strength. The cards encourage you to carry it forward with both enthusiasm and discernment.",
  },
  curious: {
    prefix: [
      "I love the openness you bring to this reading, and",
      "Your curiosity invites the cards' deepest messages, and",
      "The spirit of genuine inquiry you carry honors this reading, and",
      "With fresh eyes and an open mind,",
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
      "As we sit with this reading together,",
      "The cards respond to your openness, and",
      "In this moment of reflection,",
    ],
    bridge: [
      "The cards have drawn a meaningful pattern that speaks to your current experience.",
      "There is a quiet clarity in this spread — the symbols align with purpose.",
      "I feel a natural rhythm in how these cards appeared — their message unfolds with intention.",
    ],
    reassurance: "Trust the insights that resonated most deeply — they are the ones meant for you right now.",
  },
};

// ─── 1. Reader Greeting & Question Acknowledgment ───

function buildGreeting(question: string, context: QuestionContext, tone: EmotionalTone): string {
  const contextLabel = CONTEXT_LABELS[context];
  const modifier = pick(TONE_MODIFIERS[tone].prefix);

  const greetings: string[] = [
    `Thank you for bringing this question to the cards. ${modifier} regarding your question about ${contextLabel}, I feel the cards have drawn a deeply meaningful pattern for you.`,
    `${modifier} as I look at the cards you have drawn about ${contextLabel}, I can already sense a clear message forming. Let me share what I see.`,
    `I appreciate you trusting the cards with this question. ${modifier} the spread before us speaks directly to ${contextLabel}, and I want to walk you through what it reveals.`,
  ];
  return pick(greetings);
}

// ─── 2. Spread Overview ───

function buildSpreadOverview(revealed: DrawnCard[], themes: DetectedTheme[]): string {
  const majorCount = revealed.filter(dc => dc.card.arcana === "Major").length;
  const suits = revealed.filter(dc => dc.card.suit).map(dc => dc.card.suit!);
  const suitCounts = new Map<string, number>();
  for (const s of suits) suitCounts.set(s, (suitCounts.get(s) || 0) + 1);

  const parts: string[] = [];

  // Major Arcana observation
  if (majorCount >= 3) {
    parts.push(`I notice something significant right away — **${majorCount} Major Arcana cards** have appeared in your spread. This tells me that you are navigating forces larger than everyday concerns. These are life-defining energies at work, and the universe is paying close attention to this chapter of your story.`);
  } else if (majorCount === 2) {
    parts.push(`Two Major Arcana cards have appeared, which tells me this is not a minor matter. There are significant life currents at play here — the kind of energies that mark turning points and pivotal moments.`);
  } else if (majorCount === 1) {
    parts.push(`A Major Arcana card anchors this reading, lending it weight and depth. While the surrounding cards address your day-to-day experience, this card points to something more profound beneath the surface.`);
  }

  // Suit dominance
  let dominantSuit = "";
  let maxCount = 0;
  for (const [suit, count] of suitCounts) {
    if (count > maxCount && count >= 2) { dominantSuit = suit; maxCount = count; }
  }

  const SUIT_ENERGY: Record<string, string> = {
    Wands: "creative fire and passionate energy. Action, inspiration, and forward momentum define the atmosphere of this reading",
    Cups: "deep emotional currents. Feelings, relationships, and matters of the heart are at the center of what the cards want to address",
    Swords: "mental intensity and the need for clarity. Thoughts, decisions, and honest truths are cutting through the noise",
    Pentacles: "grounded, material energy. Practical matters, security, and the tangible foundations of your life are in focus",
  };

  if (dominantSuit && SUIT_ENERGY[dominantSuit]) {
    parts.push(`The spread is infused with ${SUIT_ENERGY[dominantSuit]}.`);
  }

  // Reversed card observation
  const reversedCount = revealed.filter(dc => dc.isReversed).length;
  if (reversedCount >= Math.ceil(revealed.length / 2) && revealed.length >= 3) {
    parts.push(`I also notice that several cards have appeared reversed, which suggests that some energies are internalized, blocked, or in the process of being worked through. This is not negative — it often means the real work is happening beneath the surface.`);
  }

  // Theme preview
  if (themes.length > 0) {
    const primary = themes[0];
    parts.push(`**A strong theme of ${primary.label} runs through this entire spread** — I see it echoed in ${primary.cards.slice(0, 3).join(", ")}. This is the thread the cards most want you to follow.`);
  }

  if (parts.length === 0) {
    parts.push(pick([
      "As I look at the spread as a whole, I sense a balanced mix of energies — no single force dominates, which suggests nuance rather than a single dramatic message.",
      "This spread presents a thoughtful blend of influences. Let me walk through each position to uncover the full picture.",
    ]));
  }

  return parts.join(" ");
}

// ─── 3. Position-Based Interpretation (Reader Voice) ───

const POSITION_NARRATIVES: Record<string, string[]> = {
  Past: [
    "Looking at your **Past** position, I see **{card}** appearing {orientation}. {meaning} I feel this earlier influence is still shaping the ground you stand on today — it has left its imprint on how you approach your current situation.",
    "In the **Past** position, **{card}** ({orientation}) tells me about the energy that led you here. {meaning} Understanding this foundation helps make sense of what you are experiencing now.",
  ],
  Present: [
    "At the heart of your reading, the **Present** position holds **{card}** ({orientation}). {meaning} This is what you are living and breathing right now — the card captures the essence of your current experience.",
    "In the **Present**, **{card}** ({orientation}) speaks directly to what you are navigating: {meaning} I feel this card wants you to really sit with its message — it holds the key to moving forward.",
  ],
  Future: [
    "Looking ahead to the **Future** position, **{card}** ({orientation}) reveals what is forming on the horizon. {meaning} I want to be clear — this is not fixed destiny, but the most probable path given current energies.",
    "The **Future** card, **{card}** ({orientation}), shows me where things are heading: {meaning} Remember, the future is still being shaped by your choices — this card shows the direction of the current flow.",
  ],
  "Present Situation": [
    "At the very center of this Celtic Cross, **{card}** ({orientation}) defines the core of your situation. {meaning} This is the heart of the matter — everything else in the spread orbits around this energy.",
  ],
  Challenge: [
    "Crossing your present situation, I see **{card}** ({orientation}) as your primary challenge. {meaning} This is what must be faced, integrated, or navigated — it is not an enemy, but an invitation to grow.",
  ],
  Foundation: [
    "The foundation of this reading rests on **{card}** ({orientation}). {meaning} This card represents the deeper, often unconscious, forces that underpin everything else in the spread.",
  ],
  "Recent Past": [
    "Your recent past reveals **{card}** ({orientation}). {meaning} This energy is still fresh — it may be fading, but its influence on your present moment is unmistakable.",
  ],
  "Possible Future": [
    "In the position of what may come, **{card}** ({orientation}) emerges. {meaning} I see this as a strong possibility — not a certainty, but a direction the energy is naturally flowing toward.",
  ],
  "Conscious Influence": [
    "Above, representing what you are consciously aware of, sits **{card}** ({orientation}). {meaning} This is the part of the situation you can see and are actively thinking about.",
  ],
  "Subconscious Influence": [
    "Below the surface, **{card}** ({orientation}) reveals hidden forces at play. {meaning} I sense these deeper currents are influencing you more than you may realize — pay attention to what stirs when you read this.",
  ],
  Advice: [
    "The cards offer **{card}** ({orientation}) as guidance. {meaning} I feel this is the wisdom to carry forward from this reading — let it be your compass.",
  ],
  "External Influences": [
    "From the world around you, **{card}** ({orientation}) brings external energy into the reading. {meaning} Other people, circumstances, or environmental factors are shaping your situation in this way.",
  ],
  "Hopes or Fears": [
    "In the space between hope and fear, **{card}** ({orientation}) surfaces. {meaning} I find that what we hope for and what we fear are often two sides of the same coin — this card illuminates that duality.",
  ],
  Outcome: [
    "The final Outcome card, **{card}** ({orientation}), reveals the most likely destination of all these energies combined. {meaning} If current patterns and choices continue, this is where the path leads.",
  ],
  "Selected Card": [
    "**{card}** ({orientation}) steps forward to answer your question directly. {meaning} I feel this card presented itself to you for a specific reason — trust that connection.",
    "The card that called to you is **{card}** ({orientation}). {meaning} There is a reason this particular card drew your attention.",
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

// ─── 4. Card Combination Analysis ───

function buildCombinationNarrative(revealed: DrawnCard[], context: QuestionContext): string[] {
  const cardIds = revealed.map(dc => dc.card.id);
  const combos = findAllCombinations(cardIds);
  if (combos.length === 0) return [];

  const parts: string[] = [];
  const idToName = new Map(revealed.map(dc => [dc.card.id, dc.card.name]));

  // Use up to 2 combinations to avoid overwhelming
  const used = combos.slice(0, 2);

  for (const { combo } of used) {
    const name1 = idToName.get(combo.cards[0]) || "";
    const name2 = idToName.get(combo.cards[1]) || "";

    const intro = pick([
      `I want to highlight an important interaction between **${name1}** and **${name2}** —`,
      `Something significant catches my eye: **${name1}** and **${name2}** appearing together —`,
      `The pairing of **${name1}** with **${name2}** is noteworthy —`,
    ]);

    // Use context-specific combo meaning if available
    let meaning = combo.meaning;
    if (context === "love" && combo.love) meaning = combo.love;
    if (context === "career" && combo.career) meaning = combo.career;

    parts.push(`${intro} ${meaning}`);
  }

  return parts;
}

// ─── 5. Current Situation Synthesis ───

function buildCurrentSituation(revealed: DrawnCard[], context: QuestionContext, tone: EmotionalTone): string {
  const presentCard = revealed.find(dc => dc.position === "Present" || dc.position === "Present Situation");
  const challengeCard = revealed.find(dc => dc.position === "Challenge");

  const contextLabel = CONTEXT_LABELS[context];
  const parts: string[] = [];

  if (presentCard) {
    const cardName = presentCard.card.name;
    const energyWord = presentCard.isReversed ? "internal processing" : "active energy";

    const situationPhrases = [
      `Based on what I see, the cards suggest that you may currently be experiencing a period of ${energyWord} in ${contextLabel}. **${cardName}** at the center tells me that the core dynamic involves ${presentCard.isReversed ? "working through blocks or reconsidering your approach" : "engaging directly with what is in front of you"}.`,
      `I sense that your current situation involves a real engagement with ${contextLabel}. With **${cardName}** defining this moment, ${presentCard.isReversed ? "there may be something being processed internally that hasn't fully surfaced yet" : "the energy is active and present — you are right in the middle of this"}.`,
    ];
    parts.push(pick(situationPhrases));

    if (challengeCard) {
      parts[0] += ` The presence of **${challengeCard.card.name}** as your challenge suggests that ${challengeCard.isReversed ? "an internalized struggle" : "an external obstacle"} adds complexity to the picture.`;
    }
  } else if (revealed.length >= 2) {
    const first = revealed[0];
    const second = revealed[1];
    parts.push(`The cards suggest that your current experience with ${contextLabel} is shaped by the interplay between **${first.card.name}** and **${second.card.name}**. I feel these two energies are in conversation — ${first.isReversed ? "one working internally" : "one active and visible"}, ${second.isReversed ? "the other quietly processing" : "the other contributing its own momentum"}.`);
  }

  return parts.join(" ");
}

// ─── 6. Possible Outcome ───

function buildPossibleOutcome(revealed: DrawnCard[], context: QuestionContext, themes: DetectedTheme[]): string {
  const outcomeCard = revealed.find(dc => dc.position === "Outcome" || dc.position === "Future" || dc.position === "Possible Future");

  if (outcomeCard) {
    const cardName = outcomeCard.card.name;
    const themeStr = themes.length > 0 ? themes[0].label : "the energies at play";

    const phrases = [
      `Looking at how this situation may evolve — **${cardName}** suggests that ${outcomeCard.isReversed ? "a period of reassessment or recalibration is likely before forward movement resumes" : "the current trajectory points toward genuine progress and development"}. This is not a fixed prediction, but it is possible that ${themeStr} will continue to shape what unfolds.`,
      `As I consider the possible outcome, **${cardName}** tells me that ${outcomeCard.isReversed ? "you may need to address something unresolved before the situation can fully shift" : "the energy is moving toward a meaningful resolution"}. It is possible that the coming period brings ${outcomeCard.isReversed ? "deeper self-understanding before external change" : "tangible shifts you can feel and see"}.`,
      `The direction this is heading — based on **${cardName}** — is one of ${outcomeCard.isReversed ? "internal transformation that eventually manifests outwardly" : "visible development and forward motion"}. This may lead to ${themes.length > 0 ? `a deepening of ${themeStr} in your life` : "changes that feel both natural and significant"}.`,
    ];
    return pick(phrases);
  }

  // For spreads without a designated outcome card
  const last = revealed[revealed.length - 1];
  return `Based on the overall energy of this spread, I sense that developments will move toward ${last.isReversed ? "a period of internal work and quiet reassessment" : "a gradual opening and forward movement"}. The cards do not show a dramatic overnight shift, but rather a meaningful unfolding that rewards patience and awareness.`;
}

// ─── 7. Timing ───

const SUIT_TIMING: Record<string, string> = {
  Wands: "in the coming days to weeks",
  Cups: "over the next few weeks to months",
  Swords: "swiftly, perhaps as a sudden development",
  Pentacles: "gradually, unfolding over the coming months",
};

function getTimingNarrative(cards: DrawnCard[]): string {
  const revealed = cards.filter(dc => dc.isRevealed);
  const hasMajor = revealed.some(dc => dc.card.arcana === "Major");
  const suits = revealed.filter(dc => dc.card.suit).map(dc => dc.card.suit!);

  if (suits.length === 0 && hasMajor) {
    return "The presence of Major Arcana cards tells me this touches upon a significant life chapter — the timing is less about weeks or months and more about a meaningful phase of your journey that unfolds at its own pace.";
  }
  if (suits.length === 0) return "";

  const suitCounts = new Map<string, number>();
  for (const s of suits) suitCounts.set(s, (suitCounts.get(s) || 0) + 1);
  let dominant: string = suits[0];
  let max = 0;
  for (const [s, c] of suitCounts) { if (c > max) { dominant = s; max = c; } }

  const timingPhrase = SUIT_TIMING[dominant] || "in the near future";
  const parts = [`I sense these developments are most likely to manifest ${timingPhrase}.`];
  if (hasMajor) {
    parts.push("The Major Arcana presence adds weight to this timeline — these shifts carry deep personal significance beyond ordinary day-to-day events.");
  }
  return parts.join(" ");
}

// ─── 8. Guidance, Reflection & Closing Question ───

const CLOSINGS_BY_CONTEXT: Record<QuestionContext, { guidance: string[]; questions: string[] }> = {
  love: {
    guidance: [
      "The cards encourage you to reflect on what love truly means to you — not as an abstract concept, but as a lived experience in your daily life.",
      "I feel the cards urging you to lead with your heart while honoring your boundaries. Love asks for both courage and vulnerability.",
      "Whether the path ahead is one of deepening connection or gentle release, your heart already holds the answer.",
    ],
    questions: [
      "What would it look like to show up more authentically in your closest relationship?",
      "If fear were removed from the equation, what would your heart choose?",
      "What pattern in love are you ready to release?",
    ],
  },
  career: {
    guidance: [
      "The cards suggest that your professional journey is unfolding as it should. Trust your capabilities even when the path feels uncertain.",
      "I sense that clarity in your career comes not from external validation alone, but from aligning your daily work with your deeper purpose.",
      "Step forward with confidence — the cards affirm that your efforts are building toward something meaningful.",
    ],
    questions: [
      "If success were guaranteed, what would you pursue professionally?",
      "What skill or talent have you been undervaluing in your work life?",
      "What does meaningful work actually look like for you — not what others expect, but what genuinely fulfills you?",
    ],
  },
  money: {
    guidance: [
      "True abundance flows from a combination of practical wisdom and trust in the process. The cards encourage both careful planning and openness to unexpected gifts.",
      "The cards remind you that your relationship with money often mirrors your relationship with self-worth. Nurture both.",
      "Material security is built one conscious choice at a time. These insights illuminate the next right step.",
    ],
    questions: [
      "What belief about money might be limiting your ability to receive abundance?",
      "Where in your financial life could a small shift create the biggest impact?",
      "What does financial freedom actually feel like to you — and are you moving toward that feeling?",
    ],
  },
  decision: {
    guidance: [
      "Ultimately, the best decisions arise from a blend of clear thinking and intuitive knowing. The cards have offered both — now trust yourself to choose.",
      "The path will become clearer with each step you take. The cards don't remove the choice, but they illuminate what each direction holds.",
      "Remember: there is rarely a perfect option — only the one that aligns most honestly with who you are becoming.",
    ],
    questions: [
      "Which option feels most aligned with the person you want to become?",
      "What are you afraid of losing in each direction — and which loss feels more bearable?",
      "If you could not fail, which path would you choose without hesitation?",
    ],
  },
  growth: {
    guidance: [
      "Growth is not always comfortable, but it is always worthwhile. The cards honor the journey you are on and the courage it takes to keep evolving.",
      "The soul grows in spirals, not straight lines. Trust the process, even when it feels circular — each pass brings deeper understanding.",
      "Carry the wisdom of this reading gently. The transformation unfolding within you is real, and it deserves your patience.",
    ],
    questions: [
      "What old version of yourself are you ready to lovingly release?",
      "What lesson keeps appearing in different forms — and what might it be trying to teach you?",
      "If your soul could speak, what would it say it needs most right now?",
    ],
  },
  general: {
    guidance: [
      "The cards illuminate possibilities — the choices remain yours. Trust the insights that resonated most deeply; they are the ones meant for you.",
      "I encourage you to sit with this reading for a while. The messages may continue to unfold in meaning over the coming days.",
      "These cards offer a mirror, not a map. What you see reflected is yours to interpret — honor your own knowing above all else.",
    ],
    questions: [
      "What part of this reading stirred the strongest emotional response — and what might that be telling you?",
      "What is one small, concrete step you could take today based on what the cards have shown you?",
      "If you returned to this reading in a month, what do you hope will have changed?",
    ],
  },
};

function buildClosing(context: QuestionContext, tone: EmotionalTone): string {
  const toneData = TONE_MODIFIERS[tone];
  const closing = CLOSINGS_BY_CONTEXT[context];
  const parts: string[] = [];

  // Tone reassurance
  if (tone !== "neutral") {
    parts.push(toneData.reassurance);
  }

  // Contextual guidance
  parts.push(pick(closing.guidance));

  // Reflective question
  const question = pick(closing.questions);
  parts.push(`**A question to carry with you:** *${question}*`);

  return parts.join("\n\n");
}

// ─── Theme Weaving ───

const THEME_BRIDGES = [
  "Looking across the full spread, a powerful thread of **{theme}** connects these cards — {card1} and {card2} both echo this energy, and I feel it is central to what you are experiencing right now.",
  "It strikes me how {theme} surfaces repeatedly. Both {card1} and {card2} carry this vibration, creating a pattern the cards clearly want you to notice.",
  "A dominant theme of **{theme}** weaves through your reading. When I see multiple cards sharing this energy — as {card1} and {card2} do here — I know it deserves special attention.",
];

const SECONDARY_THEME_BRIDGES = [
  "Alongside this, I also sense a quieter but meaningful thread of {theme} adding nuance to the overall message.",
  "There is also an undercurrent of **{theme}** running beneath the surface, adding depth and complexity to the reading.",
  "Intertwined with the main theme, {theme} brings an additional layer of insight that is worth sitting with.",
];

// ─── Main Generator ───

export function generateRuleBasedReading(question: string, cards: DrawnCard[]): string {
  const revealed = cards.filter(dc => dc.isRevealed);
  if (revealed.length === 0) return "No cards have been revealed yet.";

  const context = detectQuestionContext(question);
  const tone = detectEmotionalTone(question);
  const themes = detectThemes(cards);
  const toneData = TONE_MODIFIERS[tone];
  const parts: string[] = [];

  // 1. Reader greeting & question acknowledgment
  parts.push(buildGreeting(question, context, tone));

  // 2. Emotional bridge (tone-specific)
  if (tone !== "neutral") {
    parts.push(pick(toneData.bridge));
  }

  // 3. Spread overview
  const overview = buildSpreadOverview(revealed, themes);
  if (overview) parts.push(overview);

  // 4. Card-by-card interpretation
  parts.push("");
  for (const dc of revealed) {
    parts.push(interpretCard(dc, context));
  }

  // 5. Card combination analysis
  const combos = buildCombinationNarrative(revealed, context);
  if (combos.length > 0) {
    parts.push("");
    parts.push(...combos);
  }

  // 6. Theme weaving (for themes not already in overview)
  if (themes.length > 1) {
    const secondary = themes[1];
    parts.push(pick(SECONDARY_THEME_BRIDGES).replace("{theme}", secondary.label));
  }

  // 7. Current situation synthesis
  if (revealed.length >= 2) {
    parts.push("");
    parts.push(buildCurrentSituation(revealed, context, tone));
  }

  // 8. Possible outcome
  parts.push("");
  parts.push(buildPossibleOutcome(revealed, context, themes));

  // 9. Synthesis arc for multi-card readings
  if (revealed.length >= 3) {
    const first = revealed[0];
    const last = revealed[revealed.length - 1];
    const syntheses = [
      `Reading these cards as a whole, the journey from **${first.card.name}** to **${last.card.name}** tells a story of evolution — from ${first.isReversed ? "confronting internal blocks" : "initial energy and intention"} toward ${last.isReversed ? "deeper self-understanding" : "emerging possibility and growth"}.`,
      `When I step back and view the full arc, from **${first.card.name}** through to **${last.card.name}**, I see a clear trajectory: ${themes.length > 0 ? `one shaped by ${themes[0].label}` : "one that is uniquely yours to navigate"}.`,
    ];
    parts.push(pick(syntheses));
  }

  // 10. Timing
  const timingText = getTimingNarrative(cards);
  if (timingText) {
    parts.push("");
    parts.push(timingText);
  }

  // 11. Guidance, reflection & closing question
  parts.push("");
  parts.push(buildClosing(context, tone));

  return parts.join("\n\n");
}
