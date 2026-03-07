// Maps each tarot card to yes/no/maybe for the Yes/No Tarot reading
// Based on traditional tarot yes/no associations

export type YesNoAnswer = "yes" | "no" | "maybe";

// Major Arcana yes/no mappings by card id
const yesNoMap: Record<number, YesNoAnswer> = {
  0: "yes",     // The Fool
  1: "yes",     // The Magician
  2: "maybe",   // High Priestess
  3: "yes",     // The Empress
  4: "yes",     // The Emperor
  5: "maybe",   // The Hierophant
  6: "yes",     // The Lovers
  7: "yes",     // The Chariot
  8: "yes",     // Strength
  9: "maybe",   // The Hermit
  10: "yes",    // Wheel of Fortune
  11: "maybe",  // Justice
  12: "maybe",  // Hanged Man
  13: "no",     // Death
  14: "yes",    // Temperance
  15: "no",     // The Devil
  16: "no",     // The Tower
  17: "yes",    // The Star
  18: "no",     // The Moon
  19: "yes",    // The Sun
  20: "yes",    // Judgement
  21: "yes",    // The World
};

export function getYesNoAnswer(cardId: number, isReversed: boolean): YesNoAnswer {
  const base = yesNoMap[cardId];
  if (base) {
    // Reversed flips yes→no and no→yes, maybe stays
    if (isReversed) {
      if (base === "yes") return "no";
      if (base === "no") return "yes";
      return "maybe";
    }
    return base;
  }
  // Minor arcana: use suit logic
  // Wands (22-35) & Cups (36-49) lean yes, Swords (50-63) lean no, Pentacles (64-77) lean yes
  if (isReversed) return "maybe";
  if (cardId >= 50 && cardId <= 63) return "no";
  return "yes";
}
