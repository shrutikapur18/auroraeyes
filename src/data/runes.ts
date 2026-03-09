export interface Rune {
  id: number;
  name: string;
  letter: string;
  symbol: string;
  meaning: string;
  reversed_meaning: string;
  keywords: string[];
  image: string;
}

// Using rune stone images from Wikimedia Commons (public domain)
const RUNE_IMAGE_BASE = "https://upload.wikimedia.org/wikipedia/commons";

export const elderFuthark: Rune[] = [
  { id: 0, name: "Fehu", letter: "F", symbol: "ᚠ", meaning: "Wealth, abundance, prosperity, new beginnings, luck", reversed_meaning: "Loss, greed, poverty, missed opportunity", keywords: ["wealth", "abundance", "prosperity"], image: `${RUNE_IMAGE_BASE}/5/5e/Runic_letter_fehu.svg` },
  { id: 1, name: "Uruz", letter: "U", symbol: "ᚢ", meaning: "Strength, health, vitality, courage, endurance", reversed_meaning: "Weakness, illness, lack of willpower", keywords: ["strength", "health", "vitality"], image: `${RUNE_IMAGE_BASE}/5/5a/Runic_letter_uruz.svg` },
  { id: 2, name: "Thurisaz", letter: "Th", symbol: "ᚦ", meaning: "Protection, defense, conflict, catharsis, purification", reversed_meaning: "Danger, vulnerability, stubbornness", keywords: ["protection", "defense", "conflict"], image: `${RUNE_IMAGE_BASE}/b/b8/Runic_letter_thurisaz.svg` },
  { id: 3, name: "Ansuz", letter: "A", symbol: "ᚨ", meaning: "Communication, wisdom, inspiration, divine messages", reversed_meaning: "Miscommunication, manipulation, misunderstanding", keywords: ["communication", "wisdom", "inspiration"], image: `${RUNE_IMAGE_BASE}/a/a6/Runic_letter_ansuz.svg` },
  { id: 4, name: "Raidho", letter: "R", symbol: "ᚱ", meaning: "Journey, movement, travel, rhythm, right action", reversed_meaning: "Stagnation, wrong path, disruption", keywords: ["journey", "movement", "travel"], image: `${RUNE_IMAGE_BASE}/1/11/Runic_letter_raido.svg` },
  { id: 5, name: "Kenaz", letter: "K", symbol: "ᚲ", meaning: "Knowledge, creativity, illumination, transformation", reversed_meaning: "Darkness, confusion, lack of creativity", keywords: ["knowledge", "creativity", "illumination"], image: `${RUNE_IMAGE_BASE}/f/f8/Runic_letter_kauna.svg` },
  { id: 6, name: "Gebo", letter: "G", symbol: "ᚷ", meaning: "Gift, partnership, generosity, balance, exchange", reversed_meaning: "Gebo has no reversed meaning — it always signifies sacred exchange", keywords: ["gift", "partnership", "generosity"], image: `${RUNE_IMAGE_BASE}/6/65/Runic_letter_gebo.svg` },
  { id: 7, name: "Wunjo", letter: "W", symbol: "ᚹ", meaning: "Joy, harmony, prosperity, comfort, fellowship", reversed_meaning: "Sorrow, strife, alienation, disharmony", keywords: ["joy", "harmony", "comfort"], image: `${RUNE_IMAGE_BASE}/f/f5/Runic_letter_wunjo.svg` },
  { id: 8, name: "Hagalaz", letter: "H", symbol: "ᚺ", meaning: "Disruption, change, nature's wrath, testing, crisis", reversed_meaning: "Hagalaz has no reversed meaning — it signifies inevitable change", keywords: ["disruption", "change", "nature"], image: `${RUNE_IMAGE_BASE}/7/7e/Runic_letter_haglaz.svg` },
  { id: 9, name: "Nauthiz", letter: "N", symbol: "ᚾ", meaning: "Need, constraint, necessity, endurance, self-reliance", reversed_meaning: "Impatience, needless suffering, emotional deprivation", keywords: ["need", "constraint", "endurance"], image: `${RUNE_IMAGE_BASE}/3/36/Runic_letter_naudiz.svg` },
  { id: 10, name: "Isa", letter: "I", symbol: "ᛁ", meaning: "Ice, stillness, patience, introspection, clarity", reversed_meaning: "Isa has no reversed meaning — it represents a necessary pause", keywords: ["stillness", "patience", "clarity"], image: `${RUNE_IMAGE_BASE}/c/ca/Runic_letter_isaz.svg` },
  { id: 11, name: "Jera", letter: "J", symbol: "ᛃ", meaning: "Harvest, reward, cycles, natural order, patience", reversed_meaning: "Jera has no reversed meaning — it always promises harvest in time", keywords: ["harvest", "reward", "cycles"], image: `${RUNE_IMAGE_BASE}/a/a9/Runic_letter_jeran.svg` },
  { id: 12, name: "Eihwaz", letter: "Ei", symbol: "ᛇ", meaning: "Endurance, defense, protection, transformation, death and rebirth", reversed_meaning: "Eihwaz has no reversed meaning — it represents the axis of life", keywords: ["endurance", "protection", "rebirth"], image: `${RUNE_IMAGE_BASE}/a/a2/Runic_letter_iwaz.svg` },
  { id: 13, name: "Perthro", letter: "P", symbol: "ᛈ", meaning: "Mystery, fate, secrets, hidden knowledge, destiny", reversed_meaning: "Stagnation, loneliness, addiction, malaise", keywords: ["mystery", "fate", "secrets"], image: `${RUNE_IMAGE_BASE}/4/4f/Runic_letter_pertho.svg` },
  { id: 14, name: "Algiz", letter: "Z", symbol: "ᛉ", meaning: "Protection, sanctuary, guardian, higher self, awakening", reversed_meaning: "Hidden danger, vulnerability, taboo", keywords: ["protection", "sanctuary", "awakening"], image: `${RUNE_IMAGE_BASE}/d/d3/Runic_letter_algiz.svg` },
  { id: 15, name: "Sowilo", letter: "S", symbol: "ᛊ", meaning: "Success, honor, vitality, wholeness, solar energy", reversed_meaning: "Sowilo has no reversed meaning — it radiates positive energy", keywords: ["success", "honor", "vitality"], image: `${RUNE_IMAGE_BASE}/e/e2/Runic_letter_sowilo.svg` },
  { id: 16, name: "Tiwaz", letter: "T", symbol: "ᛏ", meaning: "Victory, justice, honor, leadership, sacrifice", reversed_meaning: "Injustice, defeat, failure, imbalance", keywords: ["victory", "justice", "honor"], image: `${RUNE_IMAGE_BASE}/c/c6/Runic_letter_tiwaz.svg` },
  { id: 17, name: "Berkano", letter: "B", symbol: "ᛒ", meaning: "Birth, growth, fertility, renewal, nurturing", reversed_meaning: "Family problems, stagnation, anxiety", keywords: ["birth", "growth", "renewal"], image: `${RUNE_IMAGE_BASE}/2/29/Runic_letter_berkanan.svg` },
  { id: 18, name: "Ehwaz", letter: "E", symbol: "ᛖ", meaning: "Movement, trust, partnership, loyalty, progress", reversed_meaning: "Restlessness, distrust, betrayal", keywords: ["movement", "trust", "partnership"], image: `${RUNE_IMAGE_BASE}/e/e9/Runic_letter_ehwaz.svg` },
  { id: 19, name: "Mannaz", letter: "M", symbol: "ᛗ", meaning: "Humanity, self, awareness, social order, intelligence", reversed_meaning: "Self-delusion, isolation, manipulation", keywords: ["humanity", "awareness", "intelligence"], image: `${RUNE_IMAGE_BASE}/9/90/Runic_letter_mannaz.svg` },
  { id: 20, name: "Laguz", letter: "L", symbol: "ᛚ", meaning: "Water, flow, intuition, dreams, emotional depth", reversed_meaning: "Fear, stagnation, madness, obsession", keywords: ["flow", "intuition", "dreams"], image: `${RUNE_IMAGE_BASE}/7/79/Runic_letter_laukaz.svg` },
  { id: 21, name: "Ingwaz", letter: "Ng", symbol: "ᛜ", meaning: "Fertility, growth, internal development, common sense", reversed_meaning: "Ingwaz has no reversed meaning — it represents potential fulfilled", keywords: ["fertility", "growth", "development"], image: `${RUNE_IMAGE_BASE}/a/a3/Runic_letter_ingwaz.svg` },
  { id: 22, name: "Dagaz", letter: "D", symbol: "ᛞ", meaning: "Dawn, breakthrough, transformation, hope, clarity", reversed_meaning: "Dagaz has no reversed meaning — it always signifies new light", keywords: ["dawn", "breakthrough", "hope"], image: `${RUNE_IMAGE_BASE}/5/5a/Runic_letter_dagaz.svg` },
  { id: 23, name: "Othala", letter: "O", symbol: "ᛟ", meaning: "Heritage, legacy, home, ancestral wisdom, inheritance", reversed_meaning: "Homelessness, prejudice, clannishness", keywords: ["heritage", "home", "wisdom"], image: `${RUNE_IMAGE_BASE}/f/f6/Runic_letter_othalan.svg` },
];

export interface DrawnRune {
  rune: Rune;
  isReversed: boolean;
  position?: string;
  isRevealed: boolean;
}

export function drawRunes(count: number): DrawnRune[] {
  const shuffled = [...elderFuthark].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((rune) => ({
    rune,
    isReversed: rune.reversed_meaning.toLowerCase().includes("no reversed") ? false : Math.random() > 0.5,
    isRevealed: false,
  }));
}

export const runePositions = ["Past", "Present", "Future"];
