/**
 * Encodes a reading summary into a compact URL-safe string for sharing.
 * Decodes it back on the preview page.
 */

export interface SharedReading {
  question: string;
  cards: { name: string; reversed: boolean; position: string; symbol: string }[];
  teaser: string;
  type: "tarot" | "rune" | "angel";
}

export function encodeReading(data: SharedReading): string {
  try {
    const compact = {
      q: data.question,
      c: data.cards.map(c => ({
        n: c.name,
        r: c.reversed ? 1 : 0,
        p: c.position,
        s: c.symbol,
      })),
      t: data.teaser,
      y: data.type,
    };
    return btoa(encodeURIComponent(JSON.stringify(compact)));
  } catch {
    return "";
  }
}

export function decodeReading(encoded: string): SharedReading | null {
  try {
    const json = JSON.parse(decodeURIComponent(atob(encoded)));
    return {
      question: json.q || "",
      cards: (json.c || []).map((c: any) => ({
        name: c.n,
        reversed: !!c.r,
        position: c.p,
        symbol: c.s || "✧",
      })),
      teaser: json.t || "",
      type: json.y || "tarot",
    };
  } catch {
    return null;
  }
}

/** Generate a viral teaser message from the reading text */
export function generateTeaser(readingText: string, cards: { name: string; reversed: boolean }[]): string {
  const teasers = [
    "This spread suggests an important shift may be approaching…",
    "The cards revealed a powerful pattern worth paying attention to…",
    "Something unexpected appeared in this reading…",
    "The energy of this spread points to a significant moment ahead…",
    "A surprising message emerged from the cards…",
    "This combination of cards rarely appears together — and when it does, it's meaningful…",
    "The cards painted a vivid picture of what's unfolding…",
    "An interesting theme of transformation runs through this entire spread…",
  ];

  // Pick based on card content for consistency
  const hash = cards.reduce((acc, c) => acc + c.name.length, 0);
  return teasers[hash % teasers.length];
}

/** Generate a viral share message */
export function generateShareMessage(cards: { name: string; reversed: boolean }[], type: string): string {
  const messages = [
    "My tarot reading revealed something interesting about my future 🔮",
    "The cards revealed something surprising about my situation ✨",
    "I just got a reading that really resonated with me 🌙",
    "The tarot showed me something I wasn't expecting…",
    "This reading gave me chills — see what the cards said 🔮",
    "Something powerful came through in my reading today ✦",
  ];

  const runeMessages = [
    "The runes revealed an ancient wisdom about my path 🪨",
    "My rune reading uncovered something surprising ᚱ",
    "The Norse runes spoke clearly about my situation ✦",
  ];

  const angelMessages = [
    "My angel cards delivered a beautiful message today 👼",
    "An angel card reading just gave me exactly what I needed to hear ✨",
    "The angels have a message — see what they said 🕊️",
  ];

  if (type === "rune") {
    const hash = cards.reduce((acc, c) => acc + c.name.length, 0);
    return runeMessages[hash % runeMessages.length];
  }
  if (type === "angel") {
    const hash = cards.reduce((acc, c) => acc + c.name.length, 0);
    return angelMessages[hash % angelMessages.length];
  }

  const hash = cards.reduce((acc, c) => acc + c.name.length, 0);
  return messages[hash % messages.length];
}
