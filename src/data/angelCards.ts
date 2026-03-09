export interface AngelCard {
  id: number;
  name: string;
  message: string;
  keywords: string[];
  symbol: string;
  image: string;
}

// Using beautiful angel-themed images from Unsplash (free to use)
const ANGEL_IMAGE_BASE = "https://images.unsplash.com";

export const angelDeck: AngelCard[] = [
  { id: 0, name: "Archangel Michael", message: "You are protected and guided. Release your fears and trust that you are safe.", keywords: ["protection", "courage", "strength"], symbol: "🛡️", image: `${ANGEL_IMAGE_BASE}/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&auto=format` },
  { id: 1, name: "Archangel Gabriel", message: "A new creative project or message is ready to be born through you.", keywords: ["communication", "creativity", "new beginnings"], symbol: "📯", image: `${ANGEL_IMAGE_BASE}/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop&auto=format` },
  { id: 2, name: "Archangel Raphael", message: "Healing energy surrounds you. Allow yourself to receive and be restored.", keywords: ["healing", "health", "wholeness"], symbol: "💚", image: `${ANGEL_IMAGE_BASE}/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&auto=format` },
  { id: 3, name: "Archangel Uriel", message: "Wisdom and insight are available to you now. Trust your inner knowing.", keywords: ["wisdom", "insight", "illumination"], symbol: "🔥", image: `${ANGEL_IMAGE_BASE}/photo-1499002238440-d264f6e67db1?w=400&h=600&fit=crop&auto=format` },
  { id: 4, name: "Archangel Chamuel", message: "Love is flowing into your life. Open your heart to give and receive.", keywords: ["love", "compassion", "relationships"], symbol: "💗", image: `${ANGEL_IMAGE_BASE}/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop&auto=format` },
  { id: 5, name: "Archangel Jophiel", message: "See the beauty in your current situation. Shift your perspective to find the gift.", keywords: ["beauty", "positivity", "perspective"], symbol: "🌸", image: `${ANGEL_IMAGE_BASE}/photo-1490750967868-88aa4486c946?w=400&h=600&fit=crop&auto=format` },
  { id: 6, name: "Archangel Zadkiel", message: "Forgiveness and mercy are pathways to your freedom. Release what no longer serves you.", keywords: ["forgiveness", "mercy", "transformation"], symbol: "💜", image: `${ANGEL_IMAGE_BASE}/photo-1504701954957-2010ec3bcec1?w=400&h=600&fit=crop&auto=format` },
  { id: 7, name: "Archangel Metatron", message: "Your spiritual gifts are awakening. Embrace your sacred purpose.", keywords: ["purpose", "spiritual growth", "ascension"], symbol: "⭐", image: `${ANGEL_IMAGE_BASE}/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop&auto=format` },
  { id: 8, name: "Archangel Sandalphon", message: "Your prayers have been heard. Music and gentle presence will soothe your soul.", keywords: ["prayer", "music", "gentleness"], symbol: "🎵", image: `${ANGEL_IMAGE_BASE}/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop&auto=format` },
  { id: 9, name: "Archangel Azrael", message: "Comfort is here for you during transitions. Endings bring new beginnings.", keywords: ["comfort", "transition", "peace"], symbol: "🕊️", image: `${ANGEL_IMAGE_BASE}/photo-1494500764479-0c8f2919a3d8?w=400&h=600&fit=crop&auto=format` },
  { id: 10, name: "Guardian Angel", message: "You are never alone. Your guardian angel walks beside you always.", keywords: ["guidance", "presence", "support"], symbol: "👼", image: `${ANGEL_IMAGE_BASE}/photo-1507400492013-162706c8c05e?w=400&h=600&fit=crop&auto=format` },
  { id: 11, name: "Angel of Abundance", message: "Prosperity flows to you naturally. Trust in the universe's generous supply.", keywords: ["abundance", "prosperity", "trust"], symbol: "✨", image: `${ANGEL_IMAGE_BASE}/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop&auto=format` },
  { id: 12, name: "Angel of Faith", message: "Keep believing even when the path is unclear. Your faith will light the way.", keywords: ["faith", "belief", "perseverance"], symbol: "🕯️", image: `${ANGEL_IMAGE_BASE}/photo-1508615039623-a25605d2b022?w=400&h=600&fit=crop&auto=format` },
  { id: 13, name: "Angel of Joy", message: "Happiness is your birthright. Allow yourself to experience pure delight.", keywords: ["joy", "happiness", "delight"], symbol: "🌟", image: `${ANGEL_IMAGE_BASE}/photo-1489824904134-891ab64532f1?w=400&h=600&fit=crop&auto=format` },
  { id: 14, name: "Angel of Patience", message: "Divine timing is at work. Everything is unfolding perfectly in its own time.", keywords: ["patience", "timing", "trust"], symbol: "⏳", image: `${ANGEL_IMAGE_BASE}/photo-1475924156734-496f6cac6ec1?w=400&h=600&fit=crop&auto=format` },
  { id: 15, name: "Angel of Peace", message: "Inner peace is available to you right now. Breathe deeply and let go.", keywords: ["peace", "calm", "serenity"], symbol: "☮️", image: `${ANGEL_IMAGE_BASE}/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&auto=format` },
  { id: 16, name: "Angel of Truth", message: "Speak your truth with love. Authenticity attracts your highest good.", keywords: ["truth", "authenticity", "honesty"], symbol: "💎", image: `${ANGEL_IMAGE_BASE}/photo-1503455637927-730bce8583c0?w=400&h=600&fit=crop&auto=format` },
  { id: 17, name: "Angel of Dreams", message: "Pay attention to your dreams. Messages from the divine are coming through.", keywords: ["dreams", "intuition", "messages"], symbol: "🌙", image: `${ANGEL_IMAGE_BASE}/photo-1507400492013-162706c8c05e?w=400&h=600&fit=crop&auto=format` },
  { id: 18, name: "Angel of Courage", message: "You have the strength within you to face any challenge. Be brave.", keywords: ["courage", "bravery", "strength"], symbol: "🦁", image: `${ANGEL_IMAGE_BASE}/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop&auto=format` },
  { id: 19, name: "Angel of Grace", message: "Grace flows through your life. Accept blessings with an open heart.", keywords: ["grace", "blessings", "gratitude"], symbol: "🌊", image: `${ANGEL_IMAGE_BASE}/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop&auto=format` },
  { id: 20, name: "Angel of Hope", message: "A brighter chapter is beginning. Hold onto hope and keep moving forward.", keywords: ["hope", "optimism", "renewal"], symbol: "🌅", image: `${ANGEL_IMAGE_BASE}/photo-1495616811223-4d98c6e9c869?w=400&h=600&fit=crop&auto=format` },
  { id: 21, name: "Angel of Surrender", message: "Let go of control. Surrender to the flow and watch miracles unfold.", keywords: ["surrender", "release", "trust"], symbol: "🍃", image: `${ANGEL_IMAGE_BASE}/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop&auto=format` },
  { id: 22, name: "Angel of Harmony", message: "Balance is restoring itself in your life. Seek harmony in all things.", keywords: ["harmony", "balance", "equilibrium"], symbol: "☯️", image: `${ANGEL_IMAGE_BASE}/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop&auto=format` },
  { id: 23, name: "Angel of Transformation", message: "A powerful shift is occurring. Embrace the butterfly emerging within you.", keywords: ["transformation", "change", "evolution"], symbol: "🦋", image: `${ANGEL_IMAGE_BASE}/photo-1452421822248-d4c2b47f0c81?w=400&h=600&fit=crop&auto=format` },
  { id: 24, name: "Angel of Gratitude", message: "Count your blessings and watch them multiply. Gratitude opens doors.", keywords: ["gratitude", "appreciation", "blessings"], symbol: "🙏", image: `${ANGEL_IMAGE_BASE}/photo-1477346611705-65d1883cee1e?w=400&h=600&fit=crop&auto=format` },
  { id: 25, name: "Angel of Intuition", message: "Trust your gut feelings. Your inner compass is pointing true north.", keywords: ["intuition", "inner knowing", "guidance"], symbol: "🔮", image: `${ANGEL_IMAGE_BASE}/photo-1536431311719-398b6704d4cc?w=400&h=600&fit=crop&auto=format` },
  { id: 26, name: "Angel of Miracles", message: "Expect the unexpected. Miracles are on their way to you right now.", keywords: ["miracles", "wonder", "divine intervention"], symbol: "🌠", image: `${ANGEL_IMAGE_BASE}/photo-1444703686981-a3abbc4d4fe3?w=400&h=600&fit=crop&auto=format` },
  { id: 27, name: "Angel of New Beginnings", message: "Close the old chapter with love. An exciting new journey awaits.", keywords: ["new beginnings", "fresh start", "adventure"], symbol: "🌱", image: `${ANGEL_IMAGE_BASE}/photo-1465146344425-f00d5f5c8f07?w=400&h=600&fit=crop&auto=format` },
  { id: 28, name: "Angel of Self-Love", message: "Love yourself first. You are worthy of all the love you give to others.", keywords: ["self-love", "worthiness", "compassion"], symbol: "💖", image: `${ANGEL_IMAGE_BASE}/photo-1518199266791-5375a83190b7?w=400&h=600&fit=crop&auto=format` },
  { id: 29, name: "Angel of Wisdom", message: "The answers you seek are within you. Be still and listen to your inner sage.", keywords: ["wisdom", "knowledge", "inner voice"], symbol: "🦉", image: `${ANGEL_IMAGE_BASE}/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop&auto=format` },
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
