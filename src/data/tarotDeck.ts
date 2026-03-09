export interface TarotCard {
  id: number;
  name: string;
  arcana: "Major" | "Minor";
  suit?: "Wands" | "Cups" | "Swords" | "Pentacles";
  number?: number;
  meaning_up: string;
  meaning_rev: string;
  keywords: string[];
  symbol: string;
  image: string;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position?: string;
  isRevealed: boolean;
}

export type ReadingMode = "three-card" | "celtic-cross" | "pick-a-card";

// Using jsDelivr CDN for reliable Rider-Waite tarot card images
const CDN = "https://cdn.jsdelivr.net/npm/tarot-card-img@0.1.0";

export const tarotDeck: TarotCard[] = [
  // === MAJOR ARCANA (0-21) ===
  { id: 0, name: "The Fool", arcana: "Major", number: 0, meaning_up: "New beginnings, adventure, spontaneity, freedom, innocence", meaning_rev: "Recklessness, hesitation, foolish risk, lack of direction", keywords: ["beginnings", "freedom", "risk", "innocence"], symbol: "0", image: `${CDN}/major/0m.jpg` },
  { id: 1, name: "The Magician", arcana: "Major", number: 1, meaning_up: "Willpower, manifestation, skill, resourcefulness, concentration", meaning_rev: "Manipulation, poor planning, untapped talents, deception", keywords: ["willpower", "skill", "manifestation"], symbol: "I", image: `${CDN}/major/1m.jpg` },
  { id: 2, name: "The High Priestess", arcana: "Major", number: 2, meaning_up: "Intuition, mystery, inner knowledge, the subconscious, wisdom", meaning_rev: "Hidden agendas, disconnection from intuition, secrets", keywords: ["intuition", "mystery", "wisdom"], symbol: "II", image: `${CDN}/major/2m.jpg` },
  { id: 3, name: "The Empress", arcana: "Major", number: 3, meaning_up: "Abundance, nurturing, fertility, nature, sensuality", meaning_rev: "Creative block, dependence, neglect, smothering", keywords: ["abundance", "nurturing", "fertility"], symbol: "III", image: `${CDN}/major/3m.jpg` },
  { id: 4, name: "The Emperor", arcana: "Major", number: 4, meaning_up: "Authority, structure, stability, leadership, father figure", meaning_rev: "Tyranny, rigidity, domination, inflexibility", keywords: ["authority", "structure", "stability"], symbol: "IV", image: `${CDN}/major/4m.jpg` },
  { id: 5, name: "The Hierophant", arcana: "Major", number: 5, meaning_up: "Tradition, conformity, spiritual wisdom, education, mentorship", meaning_rev: "Rebellion, subversiveness, unconventionality", keywords: ["tradition", "wisdom", "mentorship"], symbol: "V", image: `${CDN}/major/5m.jpg` },
  { id: 6, name: "The Lovers", arcana: "Major", number: 6, meaning_up: "Love, harmony, relationships, alignment, choices", meaning_rev: "Disharmony, imbalance, misalignment, indecision", keywords: ["love", "harmony", "choices"], symbol: "VI", image: `${CDN}/major/6m.jpg` },
  { id: 7, name: "The Chariot", arcana: "Major", number: 7, meaning_up: "Determination, willpower, victory, control, ambition", meaning_rev: "Lack of direction, aggression, obstacles, defeat", keywords: ["determination", "victory", "control"], symbol: "VII", image: `${CDN}/major/7m.jpg` },
  { id: 8, name: "Strength", arcana: "Major", number: 8, meaning_up: "Inner strength, courage, patience, compassion, self-control", meaning_rev: "Self-doubt, weakness, insecurity, raw emotion", keywords: ["courage", "patience", "inner strength"], symbol: "VIII", image: `${CDN}/major/8m.jpg` },
  { id: 9, name: "The Hermit", arcana: "Major", number: 9, meaning_up: "Introspection, solitude, inner guidance, wisdom, soul-searching", meaning_rev: "Isolation, loneliness, withdrawal, lost", keywords: ["introspection", "solitude", "wisdom"], symbol: "IX", image: `${CDN}/major/9m.jpg` },
  { id: 10, name: "Wheel of Fortune", arcana: "Major", number: 10, meaning_up: "Change, cycles, destiny, turning point, luck", meaning_rev: "Bad luck, resistance to change, broken cycles", keywords: ["change", "cycles", "destiny"], symbol: "X", image: `${CDN}/major/10m.jpg` },
  { id: 11, name: "Justice", arcana: "Major", number: 11, meaning_up: "Fairness, truth, law, balance, accountability", meaning_rev: "Injustice, dishonesty, lack of accountability", keywords: ["fairness", "truth", "balance"], symbol: "XI", image: `${CDN}/major/11m.jpg` },
  { id: 12, name: "The Hanged Man", arcana: "Major", number: 12, meaning_up: "Surrender, new perspective, letting go, sacrifice, patience", meaning_rev: "Resistance, stalling, indecision, needless sacrifice", keywords: ["surrender", "perspective", "patience"], symbol: "XII", image: `${CDN}/major/12m.jpg` },
  { id: 13, name: "Death", arcana: "Major", number: 13, meaning_up: "Transformation, endings, change, transition, release", meaning_rev: "Resistance to change, stagnation, fear of endings", keywords: ["transformation", "endings", "change"], symbol: "XIII", image: `${CDN}/major/13m.jpg` },
  { id: 14, name: "Temperance", arcana: "Major", number: 14, meaning_up: "Balance, moderation, patience, purpose, harmony", meaning_rev: "Imbalance, excess, lack of patience, discord", keywords: ["balance", "moderation", "patience"], symbol: "XIV", image: `${CDN}/major/14m.jpg` },
  { id: 15, name: "The Devil", arcana: "Major", number: 15, meaning_up: "Shadow self, attachment, materialism, bondage, temptation", meaning_rev: "Release, breaking free, reclaiming power", keywords: ["shadow", "attachment", "temptation"], symbol: "XV", image: `${CDN}/major/15m.jpg` },
  { id: 16, name: "The Tower", arcana: "Major", number: 16, meaning_up: "Sudden upheaval, revelation, chaos, awakening, liberation", meaning_rev: "Avoidance of disaster, fear of change, delayed upheaval", keywords: ["upheaval", "revelation", "awakening"], symbol: "XVI", image: `${CDN}/major/16m.jpg` },
  { id: 17, name: "The Star", arcana: "Major", number: 17, meaning_up: "Hope, faith, renewal, inspiration, serenity", meaning_rev: "Despair, disconnection, lack of faith, hopelessness", keywords: ["hope", "faith", "renewal"], symbol: "XVII", image: `${CDN}/major/17m.jpg` },
  { id: 18, name: "The Moon", arcana: "Major", number: 18, meaning_up: "Illusion, intuition, dreams, the unconscious, mystery", meaning_rev: "Confusion, fear, misinterpretation, clarity emerging", keywords: ["illusion", "intuition", "dreams"], symbol: "XVIII", image: `${CDN}/major/18m.jpg` },
  { id: 19, name: "The Sun", arcana: "Major", number: 19, meaning_up: "Joy, success, vitality, warmth, positivity, celebration", meaning_rev: "Temporary sadness, lack of success, overconfidence", keywords: ["joy", "success", "vitality"], symbol: "XIX", image: `${CDN}/major/19m.jpg` },
  { id: 20, name: "Judgement", arcana: "Major", number: 20, meaning_up: "Rebirth, inner calling, reflection, reckoning, absolution", meaning_rev: "Self-doubt, refusal of self-examination, harsh judgment", keywords: ["rebirth", "calling", "reflection"], symbol: "XX", image: `${CDN}/major/20m.jpg` },
  { id: 21, name: "The World", arcana: "Major", number: 21, meaning_up: "Completion, accomplishment, travel, wholeness, harmony", meaning_rev: "Incompletion, shortcuts, stagnation, lack of closure", keywords: ["completion", "accomplishment", "wholeness"], symbol: "XXI", image: `${CDN}/major/21m.jpg` },

  // === WANDS (22-35) ===
  { id: 22, name: "Ace of Wands", arcana: "Minor", suit: "Wands", number: 1, meaning_up: "Inspiration, new opportunity, creative spark, growth", meaning_rev: "Delays, lack of motivation, missed opportunity", keywords: ["inspiration", "opportunity", "creativity"], symbol: "🔥", image: `${CDN}/wands/1w.jpg` },
  { id: 23, name: "Two of Wands", arcana: "Minor", suit: "Wands", number: 2, meaning_up: "Future planning, progress, discovery, decisions", meaning_rev: "Fear of the unknown, lack of planning, playing it safe", keywords: ["planning", "progress", "decisions"], symbol: "🔥", image: `${CDN}/wands/2w.jpg` },
  { id: 24, name: "Three of Wands", arcana: "Minor", suit: "Wands", number: 3, meaning_up: "Expansion, foresight, overseas opportunities, progress", meaning_rev: "Obstacles, delays, frustration, lack of foresight", keywords: ["expansion", "foresight", "progress"], symbol: "🔥", image: `${CDN}/wands/3w.jpg` },
  { id: 25, name: "Four of Wands", arcana: "Minor", suit: "Wands", number: 4, meaning_up: "Celebration, harmony, homecoming, community, joy", meaning_rev: "Lack of harmony, conflict, instability at home", keywords: ["celebration", "harmony", "community"], symbol: "🔥", image: `${CDN}/wands/4w.jpg` },
  { id: 26, name: "Five of Wands", arcana: "Minor", suit: "Wands", number: 5, meaning_up: "Conflict, competition, disagreement, tension, diversity", meaning_rev: "Avoidance of conflict, compromise, inner conflict", keywords: ["conflict", "competition", "tension"], symbol: "🔥", image: `${CDN}/wands/5w.jpg` },
  { id: 27, name: "Six of Wands", arcana: "Minor", suit: "Wands", number: 6, meaning_up: "Victory, success, recognition, pride, achievement", meaning_rev: "Ego, fall from grace, lack of recognition", keywords: ["victory", "success", "recognition"], symbol: "🔥", image: `${CDN}/wands/6w.jpg` },
  { id: 28, name: "Seven of Wands", arcana: "Minor", suit: "Wands", number: 7, meaning_up: "Perseverance, courage, standing your ground, defense", meaning_rev: "Exhaustion, giving up, overwhelmed, vulnerability", keywords: ["perseverance", "courage", "defense"], symbol: "🔥", image: `${CDN}/wands/7w.jpg` },
  { id: 29, name: "Eight of Wands", arcana: "Minor", suit: "Wands", number: 8, meaning_up: "Rapid action, movement, swift change, progress", meaning_rev: "Delays, frustration, waiting, slowing down", keywords: ["speed", "movement", "progress"], symbol: "🔥", image: `${CDN}/wands/8w.jpg` },
  { id: 30, name: "Nine of Wands", arcana: "Minor", suit: "Wands", number: 9, meaning_up: "Resilience, courage, persistence, last stand, boundaries", meaning_rev: "Exhaustion, paranoia, giving up, overwhelm", keywords: ["resilience", "persistence", "boundaries"], symbol: "🔥", image: `${CDN}/wands/9w.jpg` },
  { id: 31, name: "Ten of Wands", arcana: "Minor", suit: "Wands", number: 10, meaning_up: "Burden, responsibility, hard work, stress, achievement", meaning_rev: "Inability to delegate, burnout, overstressed", keywords: ["burden", "responsibility", "hard work"], symbol: "🔥", image: `${CDN}/wands/10w.jpg` },
  { id: 32, name: "Page of Wands", arcana: "Minor", suit: "Wands", meaning_up: "Enthusiasm, exploration, discovery, free spirit", meaning_rev: "Setbacks, lack of direction, procrastination", keywords: ["enthusiasm", "exploration", "discovery"], symbol: "🔥", image: `${CDN}/wands/pw.jpg` },
  { id: 33, name: "Knight of Wands", arcana: "Minor", suit: "Wands", meaning_up: "Energy, passion, adventure, impulsiveness, action", meaning_rev: "Haste, scattered energy, delays, frustration", keywords: ["energy", "passion", "adventure"], symbol: "🔥", image: `${CDN}/wands/nw.jpg` },
  { id: 34, name: "Queen of Wands", arcana: "Minor", suit: "Wands", meaning_up: "Courage, confidence, independence, warmth, determination", meaning_rev: "Selfishness, jealousy, insecurity, demanding", keywords: ["confidence", "independence", "warmth"], symbol: "🔥", image: `${CDN}/wands/qw.jpg` },
  { id: 35, name: "King of Wands", arcana: "Minor", suit: "Wands", meaning_up: "Leadership, vision, honor, entrepreneurship, big picture", meaning_rev: "Impulsiveness, haste, ruthless, overbearing", keywords: ["leadership", "vision", "honor"], symbol: "🔥", image: `${CDN}/wands/kw.jpg` },

  // === CUPS (36-49) ===
  { id: 36, name: "Ace of Cups", arcana: "Minor", suit: "Cups", number: 1, meaning_up: "New love, compassion, creativity, emotional fulfillment", meaning_rev: "Emptiness, emotional loss, blocked creativity", keywords: ["love", "compassion", "creativity"], symbol: "💧", image: `${CDN}/cups/1c.jpg` },
  { id: 37, name: "Two of Cups", arcana: "Minor", suit: "Cups", number: 2, meaning_up: "Partnership, unity, love, mutual attraction, connection", meaning_rev: "Imbalance, broken communication, tension", keywords: ["partnership", "unity", "love"], symbol: "💧", image: `${CDN}/cups/2c.jpg` },
  { id: 38, name: "Three of Cups", arcana: "Minor", suit: "Cups", number: 3, meaning_up: "Celebration, friendship, creativity, community, joy", meaning_rev: "Overindulgence, gossip, isolation", keywords: ["celebration", "friendship", "joy"], symbol: "💧", image: `${CDN}/cups/3c.jpg` },
  { id: 39, name: "Four of Cups", arcana: "Minor", suit: "Cups", number: 4, meaning_up: "Contemplation, apathy, reevaluation, meditation", meaning_rev: "Motivation, awareness, acceptance, new perspective", keywords: ["contemplation", "apathy", "reevaluation"], symbol: "💧", image: `${CDN}/cups/4c.jpg` },
  { id: 40, name: "Five of Cups", arcana: "Minor", suit: "Cups", number: 5, meaning_up: "Loss, grief, disappointment, regret, focusing on negatives", meaning_rev: "Acceptance, moving on, finding peace, recovery", keywords: ["loss", "grief", "recovery"], symbol: "💧", image: `${CDN}/cups/5c.jpg` },
  { id: 41, name: "Six of Cups", arcana: "Minor", suit: "Cups", number: 6, meaning_up: "Nostalgia, memories, reunion, innocence, childhood", meaning_rev: "Living in the past, naivety, unrealistic", keywords: ["nostalgia", "memories", "innocence"], symbol: "💧", image: `${CDN}/cups/6c.jpg` },
  { id: 42, name: "Seven of Cups", arcana: "Minor", suit: "Cups", number: 7, meaning_up: "Fantasy, illusion, choices, wishful thinking, imagination", meaning_rev: "Alignment, clarity, making choices, reality check", keywords: ["fantasy", "choices", "imagination"], symbol: "💧", image: `${CDN}/cups/7c.jpg` },
  { id: 43, name: "Eight of Cups", arcana: "Minor", suit: "Cups", number: 8, meaning_up: "Walking away, disillusionment, seeking truth, letting go", meaning_rev: "Avoidance, fear of change, stagnation", keywords: ["walking away", "seeking truth", "letting go"], symbol: "💧", image: `${CDN}/cups/8c.jpg` },
  { id: 44, name: "Nine of Cups", arcana: "Minor", suit: "Cups", number: 9, meaning_up: "Contentment, satisfaction, gratitude, wish fulfillment", meaning_rev: "Dissatisfaction, greed, materialism, unfulfilled wishes", keywords: ["contentment", "satisfaction", "wishes"], symbol: "💧", image: `${CDN}/cups/9c.jpg` },
  { id: 45, name: "Ten of Cups", arcana: "Minor", suit: "Cups", number: 10, meaning_up: "Harmony, happiness, family, alignment, fulfillment", meaning_rev: "Broken family, disharmony, misalignment", keywords: ["harmony", "happiness", "family"], symbol: "💧", image: `${CDN}/cups/10c.jpg` },
  { id: 46, name: "Page of Cups", arcana: "Minor", suit: "Cups", meaning_up: "Creative opportunity, curiosity, intuitive message", meaning_rev: "Emotional immaturity, insecurity, creative block", keywords: ["creativity", "curiosity", "intuition"], symbol: "💧", image: `${CDN}/cups/pc.jpg` },
  { id: 47, name: "Knight of Cups", arcana: "Minor", suit: "Cups", meaning_up: "Romance, charm, imagination, beauty, following the heart", meaning_rev: "Moodiness, unrealistic expectations, jealousy", keywords: ["romance", "charm", "imagination"], symbol: "💧", image: `${CDN}/cups/nc.jpg` },
  { id: 48, name: "Queen of Cups", arcana: "Minor", suit: "Cups", meaning_up: "Compassion, calm, emotional security, intuition, nurturing", meaning_rev: "Insecurity, co-dependency, emotional manipulation", keywords: ["compassion", "intuition", "nurturing"], symbol: "💧", image: `${CDN}/cups/qc.jpg` },
  { id: 49, name: "King of Cups", arcana: "Minor", suit: "Cups", meaning_up: "Emotional balance, diplomacy, generosity, wisdom", meaning_rev: "Moodiness, manipulation, emotional volatility", keywords: ["balance", "diplomacy", "wisdom"], symbol: "💧", image: `${CDN}/cups/kc.jpg` },

  // === SWORDS (50-63) ===
  { id: 50, name: "Ace of Swords", arcana: "Minor", suit: "Swords", number: 1, meaning_up: "Clarity, breakthrough, new idea, truth, mental power", meaning_rev: "Confusion, chaos, lack of clarity, brutality", keywords: ["clarity", "breakthrough", "truth"], symbol: "⚔️", image: `${CDN}/swords/1s.jpg` },
  { id: 51, name: "Two of Swords", arcana: "Minor", suit: "Swords", number: 2, meaning_up: "Difficult decisions, indecision, stalemate, avoidance", meaning_rev: "Lesser of two evils, information overload, no right answer", keywords: ["decisions", "indecision", "stalemate"], symbol: "⚔️", image: `${CDN}/swords/2s.jpg` },
  { id: 52, name: "Three of Swords", arcana: "Minor", suit: "Swords", number: 3, meaning_up: "Heartbreak, grief, sorrow, emotional pain, suffering", meaning_rev: "Recovery, forgiveness, moving on, releasing pain", keywords: ["heartbreak", "grief", "sorrow"], symbol: "⚔️", image: `${CDN}/swords/3s.jpg` },
  { id: 53, name: "Four of Swords", arcana: "Minor", suit: "Swords", number: 4, meaning_up: "Rest, recovery, contemplation, restoration, meditation", meaning_rev: "Restlessness, burnout, stagnation, exhaustion", keywords: ["rest", "recovery", "contemplation"], symbol: "⚔️", image: `${CDN}/swords/4s.jpg` },
  { id: 54, name: "Five of Swords", arcana: "Minor", suit: "Swords", number: 5, meaning_up: "Conflict, defeat, winning at all costs, hostility", meaning_rev: "Reconciliation, making amends, past resentment", keywords: ["conflict", "defeat", "hostility"], symbol: "⚔️", image: `${CDN}/swords/5s.jpg` },
  { id: 55, name: "Six of Swords", arcana: "Minor", suit: "Swords", number: 6, meaning_up: "Transition, moving on, leaving behind, recovery", meaning_rev: "Resistance to change, unfinished business, baggage", keywords: ["transition", "moving on", "recovery"], symbol: "⚔️", image: `${CDN}/swords/6s.jpg` },
  { id: 56, name: "Seven of Swords", arcana: "Minor", suit: "Swords", number: 7, meaning_up: "Deception, strategy, cunning, resourcefulness, stealth", meaning_rev: "Coming clean, rethinking approach, confession", keywords: ["deception", "strategy", "cunning"], symbol: "⚔️", image: `${CDN}/swords/7s.jpg` },
  { id: 57, name: "Eight of Swords", arcana: "Minor", suit: "Swords", number: 8, meaning_up: "Restriction, imprisonment, helplessness, self-limiting beliefs", meaning_rev: "Self-acceptance, new perspective, freedom", keywords: ["restriction", "helplessness", "self-limiting"], symbol: "⚔️", image: `${CDN}/swords/8s.jpg` },
  { id: 58, name: "Nine of Swords", arcana: "Minor", suit: "Swords", number: 9, meaning_up: "Anxiety, worry, nightmares, fear, negative thinking", meaning_rev: "Recovery, learning to cope, facing fears", keywords: ["anxiety", "worry", "fear"], symbol: "⚔️", image: `${CDN}/swords/9s.jpg` },
  { id: 59, name: "Ten of Swords", arcana: "Minor", suit: "Swords", number: 10, meaning_up: "Painful ending, deep wounds, betrayal, loss, rock bottom", meaning_rev: "Recovery, regeneration, resisting an inevitable end", keywords: ["endings", "betrayal", "rock bottom"], symbol: "⚔️", image: `${CDN}/swords/10s.jpg` },
  { id: 60, name: "Page of Swords", arcana: "Minor", suit: "Swords", meaning_up: "Curiosity, new ideas, mental agility, thirst for knowledge", meaning_rev: "Deception, manipulation, all talk no action", keywords: ["curiosity", "ideas", "mental agility"], symbol: "⚔️", image: `${CDN}/swords/ps.jpg` },
  { id: 61, name: "Knight of Swords", arcana: "Minor", suit: "Swords", meaning_up: "Ambition, action, fast thinking, determination, drive", meaning_rev: "Impatience, impulsiveness, recklessness, burnout", keywords: ["ambition", "action", "determination"], symbol: "⚔️", image: `${CDN}/swords/ns.jpg` },
  { id: 62, name: "Queen of Swords", arcana: "Minor", suit: "Swords", meaning_up: "Clear thinking, independence, unbiased judgment, direct communication", meaning_rev: "Cold-heartedness, cruelty, bitterness, pessimism", keywords: ["clarity", "independence", "judgment"], symbol: "⚔️", image: `${CDN}/swords/qs.jpg` },
  { id: 63, name: "King of Swords", arcana: "Minor", suit: "Swords", meaning_up: "Intellectual power, authority, truth, clear thinking, ethics", meaning_rev: "Manipulation, cruelty, misuse of power, tyranny", keywords: ["intellect", "authority", "truth"], symbol: "⚔️", image: `${CDN}/swords/ks.jpg` },

  // === PENTACLES (64-77) ===
  { id: 64, name: "Ace of Pentacles", arcana: "Minor", suit: "Pentacles", number: 1, meaning_up: "New financial opportunity, prosperity, manifestation, abundance", meaning_rev: "Lost opportunity, lack of planning, financial instability", keywords: ["opportunity", "prosperity", "manifestation"], symbol: "⭐", image: `${CDN}/pentacles/1p.jpg` },
  { id: 65, name: "Two of Pentacles", arcana: "Minor", suit: "Pentacles", number: 2, meaning_up: "Balance, adaptability, time management, juggling priorities", meaning_rev: "Overwhelm, disorganization, financial stress", keywords: ["balance", "adaptability", "priorities"], symbol: "⭐", image: `${CDN}/pentacles/2p.jpg` },
  { id: 66, name: "Three of Pentacles", arcana: "Minor", suit: "Pentacles", number: 3, meaning_up: "Teamwork, collaboration, skill, mastery, quality", meaning_rev: "Lack of teamwork, disregard for skills, poor quality", keywords: ["teamwork", "collaboration", "mastery"], symbol: "⭐", image: `${CDN}/pentacles/3p.jpg` },
  { id: 67, name: "Four of Pentacles", arcana: "Minor", suit: "Pentacles", number: 4, meaning_up: "Security, conservation, stability, control, possessiveness", meaning_rev: "Greed, materialism, excessive spending, insecurity", keywords: ["security", "conservation", "control"], symbol: "⭐", image: `${CDN}/pentacles/4p.jpg` },
  { id: 68, name: "Five of Pentacles", arcana: "Minor", suit: "Pentacles", number: 5, meaning_up: "Financial loss, poverty, hardship, isolation, worry", meaning_rev: "Recovery from loss, spiritual poverty, turning a corner", keywords: ["loss", "hardship", "isolation"], symbol: "⭐", image: `${CDN}/pentacles/5p.jpg` },
  { id: 69, name: "Six of Pentacles", arcana: "Minor", suit: "Pentacles", number: 6, meaning_up: "Generosity, charity, giving and receiving, sharing wealth", meaning_rev: "Debt, selfishness, one-sided charity, strings attached", keywords: ["generosity", "charity", "sharing"], symbol: "⭐", image: `${CDN}/pentacles/6p.jpg` },
  { id: 70, name: "Seven of Pentacles", arcana: "Minor", suit: "Pentacles", number: 7, meaning_up: "Long-term vision, patience, investment, perseverance, reward", meaning_rev: "Impatience, lack of reward, poor investment, frustration", keywords: ["patience", "investment", "perseverance"], symbol: "⭐", image: `${CDN}/pentacles/7p.jpg` },
  { id: 71, name: "Eight of Pentacles", arcana: "Minor", suit: "Pentacles", number: 8, meaning_up: "Diligence, skill development, mastery, dedication, craftsmanship", meaning_rev: "Perfectionism, lack of motivation, misdirected activity", keywords: ["diligence", "skill", "mastery"], symbol: "⭐", image: `${CDN}/pentacles/8p.jpg` },
  { id: 72, name: "Nine of Pentacles", arcana: "Minor", suit: "Pentacles", number: 9, meaning_up: "Abundance, luxury, self-sufficiency, independence, gratitude", meaning_rev: "Over-investment in work, hustling, superficiality", keywords: ["abundance", "luxury", "independence"], symbol: "⭐", image: `${CDN}/pentacles/9p.jpg` },
  { id: 73, name: "Ten of Pentacles", arcana: "Minor", suit: "Pentacles", number: 10, meaning_up: "Wealth, legacy, family, inheritance, long-term success", meaning_rev: "Financial failure, loss, family disputes, fleeting success", keywords: ["wealth", "legacy", "family"], symbol: "⭐", image: `${CDN}/pentacles/10p.jpg` },
  { id: 74, name: "Page of Pentacles", arcana: "Minor", suit: "Pentacles", meaning_up: "Ambition, desire, diligence, new financial opportunity", meaning_rev: "Lack of progress, procrastination, learn from failure", keywords: ["ambition", "diligence", "opportunity"], symbol: "⭐", image: `${CDN}/pentacles/pp.jpg` },
  { id: 75, name: "Knight of Pentacles", arcana: "Minor", suit: "Pentacles", meaning_up: "Hard work, productivity, routine, responsibility, persistence", meaning_rev: "Boredom, laziness, feeling stuck, perfectionism", keywords: ["hard work", "routine", "responsibility"], symbol: "⭐", image: `${CDN}/pentacles/np.jpg` },
  { id: 76, name: "Queen of Pentacles", arcana: "Minor", suit: "Pentacles", meaning_up: "Nurturing, practical, providing, security, down-to-earth", meaning_rev: "Financial insecurity, work-home conflict, smothering", keywords: ["nurturing", "practical", "security"], symbol: "⭐", image: `${CDN}/pentacles/qp.jpg` },
  { id: 77, name: "King of Pentacles", arcana: "Minor", suit: "Pentacles", meaning_up: "Abundance, prosperity, security, leadership, discipline", meaning_rev: "Materialism, greed, indulgence, poor financial decisions", keywords: ["abundance", "prosperity", "leadership"], symbol: "⭐", image: `${CDN}/pentacles/kp.jpg` },
];

export function shuffleDeck(): TarotCard[] {
  const deck = [...tarotDeck];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function drawCards(count: number): DrawnCard[] {
  const shuffled = shuffleDeck();
  return shuffled.slice(0, count).map((card) => ({
    card,
    isReversed: Math.random() > 0.5,
    isRevealed: false,
  }));
}

export const threeCardPositions = ["Past", "Present", "Future"];

export const celticCrossPositions = [
  "Present Situation",
  "Challenge",
  "Past",
  "Future",
  "Conscious Influence",
  "Subconscious Influence",
  "Advice",
  "External Influences",
  "Hopes or Fears",
  "Outcome",
];
