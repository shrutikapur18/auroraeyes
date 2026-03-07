export interface AngelCard {
  id: number;
  name: string;
  message: string;
  keywords: string[];
  symbol: string;
}

export const angelDeck: AngelCard[] = [
  { id: 0, name: "Archangel Michael", message: "You are protected and guided. Release your fears and trust that you are safe.", keywords: ["protection", "courage", "strength"], symbol: "🛡️" },
  { id: 1, name: "Archangel Gabriel", message: "A new creative project or message is ready to be born through you.", keywords: ["communication", "creativity", "new beginnings"], symbol: "📯" },
  { id: 2, name: "Archangel Raphael", message: "Healing energy surrounds you. Allow yourself to receive and be restored.", keywords: ["healing", "health", "wholeness"], symbol: "💚" },
  { id: 3, name: "Archangel Uriel", message: "Wisdom and insight are available to you now. Trust your inner knowing.", keywords: ["wisdom", "insight", "illumination"], symbol: "🔥" },
  { id: 4, name: "Archangel Chamuel", message: "Love is flowing into your life. Open your heart to give and receive.", keywords: ["love", "compassion", "relationships"], symbol: "💗" },
  { id: 5, name: "Archangel Jophiel", message: "See the beauty in your current situation. Shift your perspective to find the gift.", keywords: ["beauty", "positivity", "perspective"], symbol: "🌸" },
  { id: 6, name: "Archangel Zadkiel", message: "Forgiveness and mercy are pathways to your freedom. Release what no longer serves you.", keywords: ["forgiveness", "mercy", "transformation"], symbol: "💜" },
  { id: 7, name: "Archangel Metatron", message: "Your spiritual gifts are awakening. Embrace your sacred purpose.", keywords: ["purpose", "spiritual growth", "ascension"], symbol: "⭐" },
  { id: 8, name: "Archangel Sandalphon", message: "Your prayers have been heard. Music and gentle presence will soothe your soul.", keywords: ["prayer", "music", "gentleness"], symbol: "🎵" },
  { id: 9, name: "Archangel Azrael", message: "Comfort is here for you during transitions. Endings bring new beginnings.", keywords: ["comfort", "transition", "peace"], symbol: "🕊️" },
  { id: 10, name: "Guardian Angel", message: "You are never alone. Your guardian angel walks beside you always.", keywords: ["guidance", "presence", "support"], symbol: "👼" },
  { id: 11, name: "Angel of Abundance", message: "Prosperity flows to you naturally. Trust in the universe's generous supply.", keywords: ["abundance", "prosperity", "trust"], symbol: "✨" },
  { id: 12, name: "Angel of Faith", message: "Keep believing even when the path is unclear. Your faith will light the way.", keywords: ["faith", "belief", "perseverance"], symbol: "🕯️" },
  { id: 13, name: "Angel of Joy", message: "Happiness is your birthright. Allow yourself to experience pure delight.", keywords: ["joy", "happiness", "delight"], symbol: "🌟" },
  { id: 14, name: "Angel of Patience", message: "Divine timing is at work. Everything is unfolding perfectly in its own time.", keywords: ["patience", "timing", "trust"], symbol: "⏳" },
  { id: 15, name: "Angel of Peace", message: "Inner peace is available to you right now. Breathe deeply and let go.", keywords: ["peace", "calm", "serenity"], symbol: "☮️" },
  { id: 16, name: "Angel of Truth", message: "Speak your truth with love. Authenticity attracts your highest good.", keywords: ["truth", "authenticity", "honesty"], symbol: "💎" },
  { id: 17, name: "Angel of Dreams", message: "Pay attention to your dreams. Messages from the divine are coming through.", keywords: ["dreams", "intuition", "messages"], symbol: "🌙" },
  { id: 18, name: "Angel of Courage", message: "You have the strength within you to face any challenge. Be brave.", keywords: ["courage", "bravery", "strength"], symbol: "🦁" },
  { id: 19, name: "Angel of Grace", message: "Grace flows through your life. Accept blessings with an open heart.", keywords: ["grace", "blessings", "gratitude"], symbol: "🌊" },
  { id: 20, name: "Angel of Hope", message: "A brighter chapter is beginning. Hold onto hope and keep moving forward.", keywords: ["hope", "optimism", "renewal"], symbol: "🌅" },
  { id: 21, name: "Angel of Surrender", message: "Let go of control. Surrender to the flow and watch miracles unfold.", keywords: ["surrender", "release", "trust"], symbol: "🍃" },
  { id: 22, name: "Angel of Harmony", message: "Balance is restoring itself in your life. Seek harmony in all things.", keywords: ["harmony", "balance", "equilibrium"], symbol: "☯️" },
  { id: 23, name: "Angel of Transformation", message: "A powerful shift is occurring. Embrace the butterfly emerging within you.", keywords: ["transformation", "change", "evolution"], symbol: "🦋" },
  { id: 24, name: "Angel of Gratitude", message: "Count your blessings and watch them multiply. Gratitude opens doors.", keywords: ["gratitude", "appreciation", "blessings"], symbol: "🙏" },
  { id: 25, name: "Angel of Intuition", message: "Trust your gut feelings. Your inner compass is pointing true north.", keywords: ["intuition", "inner knowing", "guidance"], symbol: "🔮" },
  { id: 26, name: "Angel of Miracles", message: "Expect the unexpected. Miracles are on their way to you right now.", keywords: ["miracles", "wonder", "divine intervention"], symbol: "🌠" },
  { id: 27, name: "Angel of New Beginnings", message: "Close the old chapter with love. An exciting new journey awaits.", keywords: ["new beginnings", "fresh start", "adventure"], symbol: "🌱" },
  { id: 28, name: "Angel of Self-Love", message: "Love yourself first. You are worthy of all the love you give to others.", keywords: ["self-love", "worthiness", "compassion"], symbol: "💖" },
  { id: 29, name: "Angel of Wisdom", message: "The answers you seek are within you. Be still and listen to your inner sage.", keywords: ["wisdom", "knowledge", "inner voice"], symbol: "🦉" },
];

export interface DrawnAngelCard {
  card: AngelCard;
  position?: string;
  isRevealed: boolean;
}

export function drawAngelCards(count: number): DrawnAngelCard[] {
  const shuffled = [...angelDeck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((card) => ({
    card,
    isRevealed: false,
  }));
}
