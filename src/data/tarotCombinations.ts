/**
 * Tarot Card Combination Database
 * Hand-crafted synergies + programmatic generation for ALL Major Arcana pairs.
 * Keys are sorted card IDs joined with "-".
 */

import { tarotDeck } from "./tarotDeck";

export interface CardCombination {
  cards: [number, number];
  theme: string;
  meaning: string;
  love?: string;
  career?: string;
}

/* ── Hand-crafted combinations (highest quality, used as overrides) ── */
const handCrafted: CardCombination[] = [
  // === Major + Major ===
  { cards: [0, 21], theme: "full circle", meaning: "The Fool and The World together speak of a complete journey — you are simultaneously at the beginning and the end. A powerful cycle closes as a new adventure beckons." },
  { cards: [0, 13], theme: "radical transformation", meaning: "The Fool meets Death — a fearless leap into the unknown after a profound ending. This is not loss; it is liberation into entirely new territory." },
  { cards: [1, 2], theme: "conscious meets unconscious", meaning: "The Magician and The High Priestess unite action with intuition. I sense that you hold both the power to create and the wisdom to know when to wait." },
  { cards: [1, 17], theme: "inspired manifestation", meaning: "The Magician with The Star suggests that your creative power is aligned with a higher purpose. What you manifest now carries the blessing of renewed hope." },
  { cards: [3, 4], theme: "divine partnership", meaning: "The Empress and Emperor together represent complete balance — nurturing creativity joined with structured authority. This may point to a powerful partnership or inner wholeness." },
  { cards: [6, 15], theme: "desire and shadow", meaning: "The Lovers and The Devil reveal the tension between authentic connection and unhealthy attachment. I feel the cards urging you to examine what truly binds you." },
  { cards: [6, 16], theme: "love disrupted", meaning: "The Lovers beside The Tower warns that a relationship or important choice faces a sudden revelation. Though it may feel devastating, truth ultimately frees you.", love: "A hidden truth about a relationship comes to light. The upheaval, though painful, clears the way for something more honest." },
  { cards: [7, 8], theme: "tempered strength", meaning: "The Chariot's drive paired with Strength's patience creates an unstoppable but gentle force. You have both the ambition and the endurance to see this through." },
  { cards: [9, 2], theme: "deep inner knowing", meaning: "The Hermit and The High Priestess together amplify your intuitive wisdom. This is a profoundly introspective moment — the answers you seek are already within you." },
  { cards: [10, 21], theme: "destined completion", meaning: "The Wheel of Fortune with The World suggests that fate itself conspires toward your fulfillment. A major life cycle reaches its destined conclusion." },
  { cards: [11, 20], theme: "karmic reckoning", meaning: "Justice and Judgement together call for deep accountability. This is a moment of truth — past actions converge with a higher calling for transformation." },
  { cards: [12, 13], theme: "surrender to rebirth", meaning: "The Hanged Man and Death together represent the most powerful transformation in the deck. Surrender what no longer serves you, and rebirth becomes inevitable." },
  { cards: [13, 17], theme: "phoenix rising", meaning: "Death followed by The Star is one of the most hopeful combinations — after a necessary ending, healing light pours in. I feel genuine renewal ahead for you." },
  { cards: [15, 17], theme: "liberation into hope", meaning: "Breaking free from The Devil's chains leads directly to The Star's healing waters. The hardest part — recognizing what held you captive — is already behind you." },
  { cards: [16, 17], theme: "destruction to renewal", meaning: "The Tower and The Star together tell the classic story of collapse followed by grace. After the storm, clarity and hope arrive like dawn after the longest night." },
  { cards: [16, 13], theme: "major transformation", meaning: "The Tower and Death together represent the most intense transformation available. Old structures and old selves are being dismantled simultaneously. This is not gentle, but it is necessary — and what emerges will be entirely new.", love: "A relationship undergoes a fundamental shift. What cannot survive authenticity was never truly yours.", career: "A career upheaval clears the ground for something far more aligned with who you are becoming." },
  { cards: [18, 19], theme: "from confusion to clarity", meaning: "The Moon yields to The Sun — confusion, fear, and shadow dissolve in brilliant clarity. Whatever has been unclear is about to be illuminated." },
  { cards: [19, 21], theme: "joyful fulfillment", meaning: "The Sun and The World together radiate total success and completion. This is one of the most positive combinations in tarot — celebrate what you have built." },
  { cards: [0, 1], theme: "pure potential", meaning: "The Fool and The Magician together channel unlimited creative potential. You stand at the very beginning with every tool at your disposal — the universe is ready for your first move." },
  { cards: [2, 18], theme: "deep mystery", meaning: "The High Priestess and The Moon double down on intuitive mystery. Trust what your subconscious is telling you — logical analysis will not serve you here. Listen to the silence between thoughts." },
  { cards: [3, 17], theme: "nurturing hope", meaning: "The Empress with The Star combines abundant nurturing energy with renewed hope. I sense a period of gentle healing and creative blossoming — trust the process of natural growth." },
  { cards: [4, 7], theme: "commanding victory", meaning: "The Emperor and The Chariot together project supreme authority and determination. You have both the plan and the drive to achieve your ambitions." },
  { cards: [5, 9], theme: "spiritual teaching", meaning: "The Hierophant and The Hermit create a powerful axis of wisdom — one through tradition, the other through solitary seeking. You may find yourself both student and teacher." },
  { cards: [8, 11], theme: "compassionate justice", meaning: "Strength and Justice pair inner courage with fairness. You are called to act with both compassion and integrity — let neither override the other." },
  { cards: [10, 13], theme: "fated endings", meaning: "The Wheel of Fortune and Death suggest a destined transformation. What is ending was always meant to change — resistance only prolongs what must transform." },
  { cards: [12, 20], theme: "awakening through surrender", meaning: "The Hanged Man and Judgement combine sacrifice with spiritual awakening. By letting go of your fixed perspective, you answer a higher calling that has been waiting for you." },
  { cards: [14, 19], theme: "harmonious success", meaning: "Temperance and The Sun together promise balanced, joyful achievement. Success arrives not through force but through patient alignment — and it feels genuinely good." },
  { cards: [0, 17], theme: "leap of faith", meaning: "The Fool and The Star together whisper of innocent trust meeting divine guidance. Take the leap — the universe holds a net woven from starlight." },
  { cards: [1, 19], theme: "brilliant manifestation", meaning: "The Magician and The Sun together are a powerhouse of creative success. What you bring into being now radiates with vitality and attracts positive attention." },

  // === Major + Minor synergies ===
  { cards: [17, 36], theme: "emotional renewal", meaning: "The Star with the Ace of Cups signals a deep emotional renewal. New love, creative inspiration, or spiritual healing flows into your life like fresh water.", love: "A beautiful new emotional chapter begins — whether in an existing relationship or through a new soul connection." },
  { cards: [6, 37], theme: "deep partnership", meaning: "The Lovers and Two of Cups amplify each other — this is one of the strongest signals of meaningful romantic or creative partnership in tarot.", love: "The cards speak unmistakably of a deep, mutual soul connection." },
  { cards: [8, 30], theme: "enduring resilience", meaning: "Strength paired with the Nine of Wands shows extraordinary perseverance. You have been tested and you are still standing — the cards honor your resilience." },
  { cards: [7, 27], theme: "triumphant success", meaning: "The Chariot with the Six of Wands is a powerful victory signal. Recognition, achievement, and the thrill of overcoming obstacles are all present." },
  { cards: [3, 44], theme: "abundant fulfillment", meaning: "The Empress with the Nine of Cups — wishes fulfilled through nurturing energy. Abundance flows naturally when you align with what you love." },
  { cards: [10, 29], theme: "rapid change", meaning: "The Wheel of Fortune and Eight of Wands together accelerate events dramatically. Changes you have been waiting for arrive swiftly and decisively." },
  { cards: [13, 22], theme: "new creative birth", meaning: "Death and the Ace of Wands — from the ashes of what has ended, a powerful new creative impulse is born. This is pure phoenix energy." },
  { cards: [16, 50], theme: "breakthrough clarity", meaning: "The Tower and the Ace of Swords cut through all illusion simultaneously. A sudden, possibly shocking, breakthrough brings absolute mental clarity." },
  { cards: [9, 53], theme: "sacred rest", meaning: "The Hermit with the Four of Swords emphasizes the profound need for withdrawal and rest. This is not avoidance — it is sacred restoration." },
  { cards: [4, 35], theme: "leadership mastery", meaning: "The Emperor and King of Wands together project powerful, visionary leadership. You are being called to step into authority with confidence.", career: "This combination suggests you are ready for — or already stepping into — a significant leadership role." },
  { cards: [14, 37], theme: "harmonious union", meaning: "Temperance with the Two of Cups speaks of a beautifully balanced partnership where both individuals maintain their identity while creating something greater together.", love: "A relationship of rare balance and mutual respect. Both partners grow individually and together." },
  { cards: [19, 27], theme: "public triumph", meaning: "The Sun and Six of Wands together blaze with recognition and celebration. This is your moment in the spotlight — enjoy it fully.", career: "Professional acclaim and public recognition are strongly indicated." },
  { cards: [0, 22], theme: "bold new venture", meaning: "The Fool and the Ace of Wands ignite the spark of a completely new creative adventure. Say yes to the impulse — this fire wants to burn brightly." },
  { cards: [3, 36], theme: "overflowing love", meaning: "The Empress with the Ace of Cups creates an overwhelming tide of love, creativity, and emotional abundance. Your heart is ready to give and receive fully.", love: "Love arrives in its most generous, nurturing form. Open yourself to receive." },
  { cards: [11, 63], theme: "truth and authority", meaning: "Justice and the King of Swords together demand absolute honesty and intellectual rigor. Decisions made now must be grounded in truth, not wishful thinking." },
  { cards: [20, 59], theme: "final reckoning", meaning: "Judgement and the Ten of Swords signal the definitive end of a painful chapter. The worst is truly over — now comes the call to rise, transformed." },
  { cards: [15, 67], theme: "material attachment", meaning: "The Devil and the Four of Pentacles warn of excessive attachment to material security. What you cling to may be what imprisons you." },
  { cards: [18, 42], theme: "illusions and choices", meaning: "The Moon and Seven of Cups multiply confusion — nothing is as it seems. Wait for clarity before committing to any path." },
  { cards: [21, 73], theme: "legacy achievement", meaning: "The World and the Ten of Pentacles promise the most enduring kind of success — lasting legacy, generational wealth, and the deep satisfaction of a life well-lived.", career: "The pinnacle of career achievement. What you build now endures." },

  // === Minor + Minor synergies ===
  { cards: [66, 29], theme: "career progress", meaning: "The Three of Pentacles and Eight of Pentacles together emphasize dedicated craftsmanship and collaborative skill-building. Your work ethic is about to pay off.", career: "Mastery through practice is the clear message. Collaboration and dedication to your craft open new professional doors." },
  { cards: [22, 29], theme: "rapid creative momentum", meaning: "Two Wands cards together amplify fiery creative energy. Ideas move quickly from inspiration to action — ride this wave of momentum." },
  { cards: [36, 45], theme: "emotional abundance", meaning: "The Ace of Cups flowing into the Ten of Cups paints a picture of total emotional fulfillment — from first feeling to lasting happiness.", love: "Love in its fullest expression. This combination promises deep emotional satisfaction and family harmony." },
  { cards: [52, 40], theme: "deep grief processing", meaning: "The Three of Swords and Five of Cups together acknowledge real, profound heartache. The cards validate your pain while reminding you that healing is possible — three cups still stand.", love: "Heartbreak is real, but it is not the end of your story. Allow yourself to grieve, then slowly turn toward what remains." },
  { cards: [64, 44], theme: "material wish fulfillment", meaning: "The Ace of Pentacles with the Nine of Cups suggests that a material wish or financial goal is manifesting. Opportunities for prosperity are opening." },
  { cards: [50, 57], theme: "mental liberation", meaning: "The Ace of Swords cuts through the Eight of Swords' self-imposed prison. A breakthrough in thinking frees you from limiting beliefs." },
  { cards: [22, 64], theme: "dual opportunity", meaning: "Two Aces together are a rare and powerful sign — double opportunity in both creative and material realms. Say yes to what is presenting itself." },
  { cards: [36, 22], theme: "creative and emotional spark", meaning: "The Ace of Cups and Ace of Wands together ignite both passion and feeling. This is a moment of powerful inspiration fueled by genuine emotion." },
  { cards: [36, 50], theme: "heart and mind aligned", meaning: "The Ace of Cups with the Ace of Swords unites emotional depth with mental clarity — a rare and powerful alignment for making important decisions." },
  { cards: [31, 59], theme: "burden and release", meaning: "The Ten of Wands collapsing into the Ten of Swords speaks of reaching an absolute breaking point. But here is the gift: what cannot continue, will not. Relief follows total surrender." },
  { cards: [37, 45], theme: "love fulfilled", meaning: "The Two of Cups flowing into the Ten of Cups traces the arc of love from first connection to lasting happiness and family harmony.", love: "From the first spark of mutual attraction to enduring partnership — this is love's complete story." },
  { cards: [47, 37], theme: "romantic pursuit", meaning: "The Knight of Cups and Two of Cups together promise romantic pursuit that leads to genuine connection. Someone is coming toward you with real intention.", love: "A romantic offer or declaration of feelings is strongly indicated." },
  { cards: [58, 53], theme: "anxiety relief", meaning: "The Nine of Swords and Four of Swords acknowledge your mental anguish while prescribing rest. The worries feel overwhelming, but stepping back brings the peace your mind desperately needs." },
  { cards: [72, 73], theme: "complete prosperity", meaning: "The Nine of Pentacles with the Ten of Pentacles represents total material abundance — personal luxury extending into lasting family wealth and security.", career: "Financial success that endures across generations. You are building something permanent." },
  { cards: [41, 45], theme: "nostalgia to fulfillment", meaning: "The Six of Cups and Ten of Cups trace a beautiful arc from cherished memories to present-day happiness. What you loved in the past finds new expression now.", love: "Past connections or childhood dreams of love manifest in your current reality." },
  { cards: [22, 36, 50, 64].includes(22) ? [22, 50] : [22, 50], theme: "passion meets clarity", meaning: "The Ace of Wands and Ace of Swords combine creative fire with mental precision. A new idea arrives fully formed and ready for action." },
];

/* ── Programmatic combination generator for remaining Major Arcana pairs ── */

const majorThemes: Record<number, { archetype: string; energy: string; domain: string }> = {
  0: { archetype: "The Fool", energy: "innocent beginning", domain: "new journeys" },
  1: { archetype: "The Magician", energy: "creative willpower", domain: "manifestation" },
  2: { archetype: "The High Priestess", energy: "deep intuition", domain: "hidden knowledge" },
  3: { archetype: "The Empress", energy: "abundant nurturing", domain: "fertility and growth" },
  4: { archetype: "The Emperor", energy: "structured authority", domain: "leadership and order" },
  5: { archetype: "The Hierophant", energy: "traditional wisdom", domain: "spiritual teaching" },
  6: { archetype: "The Lovers", energy: "sacred choice", domain: "love and alignment" },
  7: { archetype: "The Chariot", energy: "focused determination", domain: "victory and willpower" },
  8: { archetype: "Strength", energy: "gentle courage", domain: "inner power" },
  9: { archetype: "The Hermit", energy: "solitary wisdom", domain: "introspection" },
  10: { archetype: "Wheel of Fortune", energy: "destined change", domain: "cycles and fate" },
  11: { archetype: "Justice", energy: "balanced truth", domain: "fairness and karma" },
  12: { archetype: "The Hanged Man", energy: "willing sacrifice", domain: "new perspective" },
  13: { archetype: "Death", energy: "necessary ending", domain: "transformation" },
  14: { archetype: "Temperance", energy: "patient balance", domain: "harmony and moderation" },
  15: { archetype: "The Devil", energy: "shadow binding", domain: "attachment and materialism" },
  16: { archetype: "The Tower", energy: "sudden upheaval", domain: "revelation and collapse" },
  17: { archetype: "The Star", energy: "serene hope", domain: "healing and renewal" },
  18: { archetype: "The Moon", energy: "shadowy mystery", domain: "illusion and intuition" },
  19: { archetype: "The Sun", energy: "radiant joy", domain: "success and vitality" },
  20: { archetype: "Judgement", energy: "spiritual awakening", domain: "rebirth and calling" },
  21: { archetype: "The World", energy: "fulfilled completion", domain: "wholeness and achievement" },
};

const themeBlends: Record<string, string[]> = {
  "beginning-ending": ["transformation through innocence", "death and rebirth cycle", "endings that create beginnings"],
  "action-intuition": ["balanced knowing and doing", "inspired action", "wisdom-guided creation"],
  "structure-freedom": ["disciplined adventure", "ordered chaos", "freedom within structure"],
  "light-shadow": ["integration of opposites", "shadow work", "confronting darkness with light"],
  "inner-outer": ["inner truth meeting external reality", "alignment of self and world", "authentic expression"],
};

function generateTheme(id1: number, id2: number): string {
  const t1 = majorThemes[id1];
  const t2 = majorThemes[id2];
  if (!t1 || !t2) return "symbolic resonance";
  const combined = `${t1.energy.split(" ")[0]} ${t2.energy.split(" ")[1] || t2.energy.split(" ")[0]}`;
  return combined;
}

function generateMeaning(id1: number, id2: number): string {
  const c1 = tarotDeck.find(c => c.id === id1);
  const c2 = tarotDeck.find(c => c.id === id2);
  if (!c1 || !c2) return "";
  const t1 = majorThemes[id1];
  const t2 = majorThemes[id2];
  if (!t1 || !t2) return "";

  const openers = [
    `When ${c1.name} and ${c2.name} appear together, a profound dialogue emerges between ${t1.domain} and ${t2.domain}.`,
    `${c1.name} meeting ${c2.name} creates a powerful intersection of ${t1.energy} and ${t2.energy}.`,
    `The pairing of ${c1.name} with ${c2.name} weaves together themes of ${t1.domain} and ${t2.domain} in a meaningful way.`,
  ];

  const bodies = [
    `${c1.name} brings the energy of ${c1.keywords.join(", ")}, while ${c2.name} channels ${c2.keywords.join(", ")}. Together, they suggest that ${t1.domain} is deeply intertwined with ${t2.domain} in your current situation.`,
    `I sense that the ${t1.energy} of ${c1.name} is actively shaping how ${c2.name}'s themes of ${c2.keywords.slice(0, 2).join(" and ")} manifest in your life. These two archetypes are in conversation.`,
    `The ${c1.keywords[0]} energy of ${c1.name} combines with ${c2.name}'s ${c2.keywords[0]} to create a dynamic that calls for both awareness and intentional response.`,
  ];

  const closers = [
    `Consider how ${t1.domain} and ${t2.domain} may be interacting in your life right now — the cards suggest this connection holds important guidance.`,
    `This combination asks you to hold both ${c1.keywords[0]} and ${c2.keywords[0]} simultaneously — they are not contradictory but complementary aspects of your journey.`,
    `Pay attention to where ${t1.domain} meets ${t2.domain} in your experience — this intersection is where the most important growth is happening.`,
  ];

  const hash = (id1 * 31 + id2 * 17) % 3;
  return `${openers[hash]} ${bodies[(hash + 1) % 3]} ${closers[(hash + 2) % 3]}`;
}

function generateLove(id1: number, id2: number): string {
  const c1 = tarotDeck.find(c => c.id === id1);
  const c2 = tarotDeck.find(c => c.id === id2);
  if (!c1 || !c2) return "";
  const t1 = majorThemes[id1];
  const t2 = majorThemes[id2];
  if (!t1 || !t2) return "";

  const templates = [
    `In matters of love, ${c1.name} and ${c2.name} suggest that your romantic life is being shaped by both ${t1.energy} and ${t2.energy}. This combination invites you to explore how ${c1.keywords[0]} influences your emotional connections.`,
    `For relationships, this pairing highlights the interplay between ${t1.domain} and ${t2.domain}. ${c1.name}'s influence on love speaks of ${c1.keywords[0]}, while ${c2.name} adds a layer of ${c2.keywords[0]} to your romantic dynamics.`,
    `In love readings, ${c1.name} with ${c2.name} reveals a relationship shaped by both ${c1.keywords[0]} and ${c2.keywords[0]}. The cards encourage you to embrace both energies in how you approach partnership.`,
  ];
  return templates[(id1 + id2) % 3];
}

function generateCareer(id1: number, id2: number): string {
  const c1 = tarotDeck.find(c => c.id === id1);
  const c2 = tarotDeck.find(c => c.id === id2);
  if (!c1 || !c2) return "";
  const t1 = majorThemes[id1];
  const t2 = majorThemes[id2];
  if (!t1 || !t2) return "";

  const templates = [
    `In career contexts, ${c1.name} and ${c2.name} combine ${t1.energy} with ${t2.energy}, suggesting your professional path is at an important juncture where ${c1.keywords[0]} meets ${c2.keywords[0]}.`,
    `For work and career, this combination points to a period where ${t1.domain} and ${t2.domain} intersect in your professional life. Consider how ${c1.keywords[0]} and ${c2.keywords[0]} are shaping your career trajectory.`,
    `Professionally, ${c1.name} beside ${c2.name} indicates that ${t1.domain} is influencing your ${t2.domain}. The cards suggest applying both ${c1.keywords[0]} and ${c2.keywords[0]} to your career decisions.`,
  ];
  return templates[(id1 * id2) % 3];
}

/* ── Build complete combination list ── */

// Index hand-crafted by key
const handCraftedIndex = new Map<string, CardCombination>();
for (const combo of handCrafted) {
  const [a, b] = combo.cards;
  const key = a < b ? `${a}-${b}` : `${b}-${a}`;
  handCraftedIndex.set(key, combo);
}

// Generate ALL Major Arcana pairs (22 choose 2 = 231)
const allMajorPairs: CardCombination[] = [];
for (let i = 0; i <= 21; i++) {
  for (let j = i + 1; j <= 21; j++) {
    const key = `${i}-${j}`;
    if (!handCraftedIndex.has(key)) {
      allMajorPairs.push({
        cards: [i, j],
        theme: generateTheme(i, j),
        meaning: generateMeaning(i, j),
        love: generateLove(i, j),
        career: generateCareer(i, j),
      });
    }
  }
}

// Generate Ace combinations (4 Aces with all Major Arcana not already covered)
const aceIds = [22, 36, 50, 64]; // Wands, Cups, Swords, Pentacles
const acePairs: CardCombination[] = [];
for (const aceId of aceIds) {
  for (let maj = 0; maj <= 21; maj++) {
    const key = maj < aceId ? `${maj}-${aceId}` : `${aceId}-${maj}`;
    if (!handCraftedIndex.has(key)) {
      const ace = tarotDeck.find(c => c.id === aceId)!;
      const major = tarotDeck.find(c => c.id === maj)!;
      const mt = majorThemes[maj];
      if (!mt) continue;
      acePairs.push({
        cards: [Math.min(maj, aceId), Math.max(maj, aceId)],
        theme: `${ace.keywords[0]} meets ${major.keywords[0]}`,
        meaning: `${ace.name} alongside ${major.name} brings fresh ${ace.suit?.toLowerCase() || "elemental"} energy into the realm of ${mt.domain}. The ${ace.keywords[0]} of this Ace activates ${major.name}'s themes of ${major.keywords.join(", ")}, creating a moment ripe with new potential. I sense that a new ${ace.suit === "Cups" ? "emotional" : ace.suit === "Wands" ? "creative" : ace.suit === "Swords" ? "intellectual" : "material"} beginning is intimately connected to your ${mt.domain} journey.`,
        love: `In love, ${ace.name} with ${major.name} suggests a fresh ${ace.suit === "Cups" ? "emotional opening" : ace.suit === "Wands" ? "spark of passion" : ace.suit === "Swords" ? "clarity about feelings" : "stable foundation"} entering a relationship shaped by ${mt.energy}.`,
        career: `For career, this combination indicates a new ${ace.suit === "Pentacles" ? "financial opportunity" : ace.suit === "Wands" ? "creative project" : ace.suit === "Swords" ? "strategic insight" : "collaborative possibility"} emerging within the context of ${mt.domain}.`,
      });
    }
  }
}

// Generate cross-suit Ace pairs
const aceCrossPairs: CardCombination[] = [];
for (let i = 0; i < aceIds.length; i++) {
  for (let j = i + 1; j < aceIds.length; j++) {
    const key = `${aceIds[i]}-${aceIds[j]}`;
    if (!handCraftedIndex.has(key)) {
      const a1 = tarotDeck.find(c => c.id === aceIds[i])!;
      const a2 = tarotDeck.find(c => c.id === aceIds[j])!;
      aceCrossPairs.push({
        cards: [aceIds[i], aceIds[j]],
        theme: `${a1.keywords[0]} and ${a2.keywords[0]}`,
        meaning: `Two Aces appearing together — ${a1.name} and ${a2.name} — signal a rare moment of double new beginnings. The ${a1.suit} energy of ${a1.keywords[0]} combines with ${a2.suit}'s ${a2.keywords[0]}, creating a powerful opening on multiple fronts. This is the universe's way of saying: the door is wide open, step through with confidence.`,
        love: `In love, double Aces indicate new beginnings on multiple levels — both ${a1.suit === "Cups" || a2.suit === "Cups" ? "emotionally and" : "practically and"} ${a1.suit === "Wands" || a2.suit === "Wands" ? "passionately" : "intellectually"}.`,
        career: `For career, two Aces together promise significant new opportunities arriving simultaneously. Be ready to act decisively.`,
      });
    }
  }
}

// Generate key Court Card + Major Arcana pairs
const courtIds = [32, 33, 34, 35, 46, 47, 48, 49, 60, 61, 62, 63, 74, 75, 76, 77];
const courtPairs: CardCombination[] = [];
for (const courtId of courtIds) {
  for (let maj = 0; maj <= 21; maj++) {
    const key = `${maj}-${courtId}`;
    if (!handCraftedIndex.has(key)) {
      const court = tarotDeck.find(c => c.id === courtId)!;
      const major = tarotDeck.find(c => c.id === maj)!;
      const mt = majorThemes[maj];
      if (!mt) continue;
      const rank = court.name.split(" of ")[0]; // Page, Knight, Queen, King
      const suitEnergy = court.suit === "Cups" ? "emotional" : court.suit === "Wands" ? "creative" : court.suit === "Swords" ? "intellectual" : "practical";
      courtPairs.push({
        cards: [maj, courtId],
        theme: `${court.keywords[0]} and ${major.keywords[0]}`,
        meaning: `${court.name} with ${major.name} brings a ${suitEnergy} ${rank.toLowerCase()}'s energy of ${court.keywords.join(", ")} into the archetypal realm of ${mt.domain}. This combination suggests that a person or aspect of yourself characterized by ${court.keywords[0]} is engaging with themes of ${major.keywords.join(" and ")}. The ${rank}'s ${suitEnergy} approach shapes how you navigate ${mt.domain}.`,
        love: `In relationships, ${court.name} and ${major.name} may represent a ${suitEnergy} person whose ${court.keywords[0]} nature interacts with ${mt.domain} themes in your love life.`,
        career: `Professionally, this pairing suggests that ${court.keywords[0]} combined with ${major.keywords[0]} is key to your career development right now.`,
      });
    }
  }
}

// Merge all, hand-crafted first (they serve as overrides via the index)
export const cardCombinations: CardCombination[] = [
  ...handCrafted,
  ...allMajorPairs,
  ...acePairs,
  ...aceCrossPairs,
  ...courtPairs,
];

/** Quick lookup: key is "id1-id2" where id1 < id2 */
const combinationIndex = new Map<string, CardCombination>();
for (const combo of cardCombinations) {
  const [a, b] = combo.cards;
  const key = a < b ? `${a}-${b}` : `${b}-${a}`;
  if (!combinationIndex.has(key)) {
    combinationIndex.set(key, combo);
  }
}

export function findCombination(id1: number, id2: number): CardCombination | undefined {
  const key = id1 < id2 ? `${id1}-${id2}` : `${id2}-${id1}`;
  return combinationIndex.get(key);
}

export function findAllCombinations(cardIds: number[]): { combo: CardCombination; pair: [number, number] }[] {
  const results: { combo: CardCombination; pair: [number, number] }[] = [];
  for (let i = 0; i < cardIds.length; i++) {
    for (let j = i + 1; j < cardIds.length; j++) {
      const combo = findCombination(cardIds[i], cardIds[j]);
      if (combo) results.push({ combo, pair: [cardIds[i], cardIds[j]] });
    }
  }
  return results;
}
