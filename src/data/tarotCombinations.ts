/**
 * Tarot Card Combination Database
 * Meaningful card pair synergies that a professional reader would recognize.
 * Keys are sorted card IDs joined with "-".
 */

export interface CardCombination {
  cards: [number, number];
  theme: string;
  meaning: string;
  /** Contextual nuances */
  love?: string;
  career?: string;
}

export const cardCombinations: CardCombination[] = [
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
];

/** Quick lookup: key is "id1-id2" where id1 < id2 */
const combinationIndex = new Map<string, CardCombination>();
for (const combo of cardCombinations) {
  const [a, b] = combo.cards;
  const key = a < b ? `${a}-${b}` : `${b}-${a}`;
  combinationIndex.set(key, combo);
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
