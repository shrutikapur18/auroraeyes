/**
 * Programmatic long-tail SEO system.
 *
 * Two generators compose real card data + position/topic semantics into
 * unique, non-thin pages:
 *   A. Card-in-position pages   →  /<card-slug>-in-<position>-position
 *   B. Topic three-card spreads →  /three-card-spread-<topic>
 *
 * All content is generated deterministically so pages stay stable across
 * builds and the sitemap can be derived from the same source.
 */

import { tarotDeck, type TarotCard } from "./tarotDeck";

const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

/* ════════════════════════════════════════════════════════════
   A. CARD-IN-POSITION PAGES
   ════════════════════════════════════════════════════════════ */

export interface SpreadPosition {
  key: string; // url segment, e.g. "past"
  label: string; // "Past"
  question: string; // what the slot asks
  /** Frames the upright meaning for this slot. */
  frame: (cardName: string) => string;
  /** Position-specific reading guidance. */
  guidance: (cardName: string) => string;
}

export const spreadPositions: SpreadPosition[] = [
  {
    key: "past",
    label: "Past",
    question: "What past influence shaped the situation?",
    frame: (c) => `In the past position, ${c} describes an influence that has already played out and is still echoing into the present.`,
    guidance: () => "Read this card as something behind you — a cause, not a current event. Ask what it set in motion and how its after-effects are still shaping how you think and act today.",
  },
  {
    key: "present",
    label: "Present",
    question: "What is happening right now?",
    frame: (c) => `In the present position, ${c} shows where you actually stand right now, including your own state of mind.`,
    guidance: () => "This is the card with the most agency attached to it. Read it as your current reality and look here for the action the spread is pointing toward.",
  },
  {
    key: "future",
    label: "Future",
    question: "Where is this heading?",
    frame: (c) => `In the future position, ${c} points to the likely direction of the situation on its current trajectory.`,
    guidance: () => "Treat this as a forecast, not a verdict. It shows where things go if nothing changes — which means a difficult card here is a warning you can still act on.",
  },
  {
    key: "obstacle",
    label: "Obstacle",
    question: "What is in the way?",
    frame: (c) => `In the obstacle position, ${c} names the force complicating your situation — read it as friction rather than as simply good or bad.`,
    guidance: () => "Even a 'positive' card here is something getting in the way: a comfort you cling to, an opportunity you're not ready for. Ask how this energy is blocking forward movement.",
  },
  {
    key: "outcome",
    label: "Outcome",
    question: "How is this likely to resolve?",
    frame: (c) => `In the outcome position, ${c} suggests where the situation lands if the current course holds.`,
    guidance: () => "Read this forward-looking and provisional. It reflects momentum, so connect it back to the present card to see what would need to change to shift the result.",
  },
  {
    key: "advice",
    label: "Advice",
    question: "What should you do?",
    frame: (c) => `In the advice position, ${c} recommends an approach to take — the energy to lean into.`,
    guidance: () => "Read this as a verb. Ask what action or attitude this card embodies, then translate it into one concrete thing you could actually do this week.",
  },
  {
    key: "hopes-fears",
    label: "Hopes & Fears",
    question: "What is your inner hope or fear?",
    frame: (c) => `In the hopes-and-fears position, ${c} reflects your inner state — often a hope and a fear wearing the same face.`,
    guidance: () => "This card is about you, not external events. Ask whether it represents what you secretly want, what you quietly dread, or — most often — both at once.",
  },
  {
    key: "foundation",
    label: "Foundation",
    question: "What is the root of the situation?",
    frame: (c) => `In the foundation position, ${c} reveals the root cause sitting underneath everything else in the spread.`,
    guidance: () => "Read this as the bedrock the whole situation rests on. It explains why the other cards are showing up the way they are.",
  },
];

export interface CardPositionPage {
  slug: string;
  cardId: number;
  cardName: string;
  cardSlug: string;
  positionKey: string;
  positionLabel: string;
  title: string;
  h1: string;
  description: string;
  snippet: { question: string; answer: string };
  intro: string[];
  upright: string;
  reversed: string;
  guidance: string;
  keywords: string[];
  faq: { q: string; a: string }[];
}

function buildCardPositionPage(card: TarotCard, pos: SpreadPosition): CardPositionPage {
  const cardSlug = slugify(card.name);
  const slug = `${cardSlug}-in-${pos.key}-position`;
  const posLower = pos.label.toLowerCase();

  return {
    slug,
    cardId: card.id,
    cardName: card.name,
    cardSlug,
    positionKey: pos.key,
    positionLabel: pos.label,
    title: `${card.name} in the ${pos.label} Position — Meaning`,
    h1: `${card.name} in the ${pos.label} Position`,
    description: `What ${card.name} means in the ${posLower} position of a tarot spread. Upright and reversed interpretation, plus how to read it in context.`,
    snippet: {
      question: `What does ${card.name} mean in the ${posLower} position?`,
      answer: `${pos.frame(card.name)} ${card.name} carries the themes of ${card.meaning_up.toLowerCase()}. ${pos.guidance(card.name)}`,
    },
    intro: [
      `${card.name} is a ${card.arcana === "Major" ? "Major Arcana" : `${card.suit} (Minor Arcana)`} card associated with ${card.keywords.join(", ")}. Where it lands in a spread changes how you read it — and the ${posLower} position gives it a specific job.`,
      pos.frame(card.name),
    ],
    upright: `Upright, ${card.name} brings ${card.meaning_up.toLowerCase()}. In the ${posLower} slot, that means ${posLower === "past" ? "these qualities have already been at work and are still influencing where you are now" : posLower === "advice" ? "you're being encouraged to embody these qualities" : posLower === "obstacle" ? "these qualities are, paradoxically, what's complicating your path" : `these qualities define the ${posLower} of your situation`}.`,
    reversed: `Reversed, ${card.name} points to ${card.meaning_rev.toLowerCase()}. In the ${posLower} position, read this as the card's energy being blocked, turned inward, or still forming rather than fully expressed.`,
    guidance: pos.guidance(card.name),
    keywords: card.keywords,
    faq: [
      {
        q: `What does ${card.name} mean in the ${posLower} position?`,
        a: `${pos.frame(card.name)} It brings the themes of ${card.meaning_up.toLowerCase()} into that role.`,
      },
      {
        q: `What does reversed ${card.name} mean in the ${posLower} position?`,
        a: `Reversed, it suggests ${card.meaning_rev.toLowerCase()} — the card's energy blocked, internalised, or not yet ready in this part of the spread.`,
      },
      {
        q: `How do I read ${card.name} in context with other cards?`,
        a: `Read ${card.name} through its ${posLower} role first, then look at the cards beside it for repeating suits, numbers, and Major Arcana that shift its tone.`,
      },
    ],
  };
}

let _cardPositionCache: CardPositionPage[] | null = null;

/**
 * Generate card-in-position pages. Defaults to the 22 Major Arcana × 8
 * positions (176 pages); pass includeMinor to expand to the full deck.
 */
export function generateCardPositionPages(includeMinor = false): CardPositionPage[] {
  if (!includeMinor && _cardPositionCache) return _cardPositionCache;
  const cards = includeMinor ? tarotDeck : tarotDeck.filter((c) => c.arcana === "Major");
  const pages: CardPositionPage[] = [];
  for (const card of cards) {
    for (const pos of spreadPositions) {
      pages.push(buildCardPositionPage(card, pos));
    }
  }
  if (!includeMinor) _cardPositionCache = pages;
  return pages;
}

export function getCardPositionPage(slug: string): CardPositionPage | undefined {
  return generateCardPositionPages(true).find((p) => p.slug === slug);
}

/* ════════════════════════════════════════════════════════════
   B. TOPIC THREE-CARD SPREADS
   ════════════════════════════════════════════════════════════ */

export interface TopicSpread {
  slug: string;
  topic: string;
  title: string;
  h1: string;
  description: string;
  snippet: { question: string; answer: string };
  intro: string[];
  positions: { label: string; description: string }[];
  howTo: string[];
  example: { cards: string; reading: string };
  faq: { q: string; a: string }[];
  related: { to: string; label: string }[];
}

export const topicSpreads: TopicSpread[] = [
  {
    slug: "three-card-spread-love",
    topic: "love",
    title: "Three-Card Spread for Love — Layout & Meaning",
    h1: "Three-Card Tarot Spread for Love",
    description:
      "A three-card tarot spread for love that shows you, the other person, and the connection between you. Learn the positions, how to read them together, and a worked example.",
    snippet: {
      question: "What is a good three-card tarot spread for love?",
      answer:
        "For love, use a three-card spread of You · The Other Person · The Connection. The first card shows where you stand emotionally, the second shows them, and the third shows the dynamic between you. Read all three together to see the real shape of the relationship.",
    },
    intro: [
      "Love questions are about dynamics between two people, so the most revealing three-card spread for love shows both sides plus the space between them.",
      "This layout cuts through wishful thinking by separating how you feel, how they feel, and what's actually happening between you.",
    ],
    positions: [
      { label: "You", description: "Where you genuinely stand in this connection — your feelings, fears, and what you're bringing to it." },
      { label: "The Other Person", description: "Their emotional state and energy toward the connection, as the cards reflect it." },
      { label: "The Connection", description: "The dynamic between you — what's actually happening in the space you share." },
    ],
    howTo: [
      "Frame a clear love question — about a specific person or your romantic life generally.",
      "Shuffle while holding the question, then draw three cards left to right.",
      "Read 'You' and 'The Other Person' first, then let 'The Connection' card show how those two energies meet.",
      "Summarise the relationship in one honest sentence.",
    ],
    example: {
      cards: "Queen of Cups (You) · Knight of Swords (The Other) · Two of Cups (The Connection)",
      reading:
        "You're emotionally open and giving (Queen of Cups). They're moving fast, driven by ideas more than feeling (Knight of Swords). Yet the connection itself is mutual and balanced (Two of Cups). The story: a real bond exists, but your pace and theirs differ — the work is timing, not feeling.",
    },
    faq: [
      { q: "What three-card spread is best for love?", a: "You · The Other Person · The Connection. It shows both people and the dynamic between them, which is what love questions are really about." },
      { q: "Can a three-card love spread tell me if they like me?", a: "It reflects the energy and dynamic between you rather than reading their private thoughts. The connection card is the clearest signal of mutual interest." },
      { q: "How do I read the connection card?", a: "Read it as the meeting point of the first two cards — what actually happens when your energy and theirs come together." },
    ],
    related: [
      { to: "/best-tarot-spreads-for-love-career-clarity", label: "Best Spreads by Topic" },
      { to: "/love-tarot-reading", label: "Love Tarot Reading" },
      { to: "/three-card-tarot-spread-meaning", label: "Three-Card Spread Meaning" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },
  {
    slug: "three-card-spread-career",
    topic: "career",
    title: "Three-Card Spread for Career — Layout & Meaning",
    h1: "Three-Card Tarot Spread for Career",
    description:
      "A three-card tarot spread for career using Situation · Challenge · Advice. Learn how to read each position and turn three cards into clear, practical direction at work.",
    snippet: {
      question: "What is the best three-card tarot spread for career?",
      answer:
        "For career, use Situation · Challenge · Advice. The first card shows where your work life stands, the second names the obstacle, and the third tells you what to do. Read the advice card as a direct response to the challenge card.",
    },
    intro: [
      "Career questions usually want direction, not just description — so the strongest three-card layout names the situation, the obstacle, and the move to make.",
      "This spread is built to produce an action, which is exactly what most work questions need.",
    ],
    positions: [
      { label: "Situation", description: "Where your career or work life actually stands right now." },
      { label: "Challenge", description: "The main obstacle, tension, or thing in the way." },
      { label: "Advice", description: "The approach or action the cards recommend — read as a direct answer to the challenge." },
    ],
    howTo: [
      "Frame a specific work question — a decision, a tension, or a direction.",
      "Shuffle and draw three cards left to right.",
      "Read the challenge and advice cards as a pair: the advice is a response to the challenge.",
      "Translate the advice card into one concrete next step.",
    ],
    example: {
      cards: "Eight of Pentacles (Situation) · Four of Cups (Challenge) · Knight of Wands (Advice)",
      reading:
        "You've built genuine skill (Eight of Pentacles), but you've gone flat and stopped seeing opportunities (Four of Cups). The advice is to move with energy and initiative (Knight of Wands). In one line: your competence is real — boredom is the problem, and the fix is to chase something that reignites you.",
    },
    faq: [
      { q: "What three-card spread is best for career questions?", a: "Situation · Challenge · Advice, because career questions usually want direction. The advice card responds directly to the challenge card." },
      { q: "How do I read the advice card?", a: "Read it as a verb — the action or attitude it embodies — then translate it into one concrete step you can take at work." },
      { q: "Can I use this spread for a job decision?", a: "Yes. For a clear stay-or-leave choice, you can also use a Stay · Go · What-You're-Not-Seeing layout." },
    ],
    related: [
      { to: "/best-tarot-spreads-for-love-career-clarity", label: "Best Spreads by Topic" },
      { to: "/career-tarot-reading", label: "Career Tarot Reading" },
      { to: "/three-card-spread-decision-making", label: "Decision-Making Spread" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },
  {
    slug: "three-card-spread-reconciliation",
    topic: "reconciliation",
    title: "Three-Card Spread for Reconciliation — Layout & Meaning",
    h1: "Three-Card Tarot Spread for Reconciliation",
    description:
      "A three-card tarot spread for reconciliation: what happened, where you both stand now, and whether reconnection is likely. A grounded way to read a possible reunion.",
    snippet: {
      question: "What is a good tarot spread for reconciliation?",
      answer:
        "For reconciliation, use What Broke · Where You Both Stand Now · The Likely Path. The first card names the real cause of the rift, the second shows current feelings on both sides, and the third shows whether reconnection is realistic on the current course.",
    },
    intro: [
      "Reconciliation questions are tender and easy to read through hope rather than honesty. This spread is structured to separate what actually happened from what you wish would happen.",
      "It looks at the cause of the break, the present reality, and the realistic path forward.",
    ],
    positions: [
      { label: "What Broke", description: "The real cause of the rift — often deeper than the surface argument." },
      { label: "Where You Both Stand Now", description: "Current feelings and readiness on both sides." },
      { label: "The Likely Path", description: "Whether reconnection is realistic on the current trajectory, and what it would take." },
    ],
    howTo: [
      "Ask honestly about the specific relationship and the possibility of repair.",
      "Shuffle and draw three cards left to right.",
      "Read 'What Broke' without flinching — it sets up everything else.",
      "Let 'The Likely Path' show a trajectory you can influence, not a fixed verdict.",
    ],
    example: {
      cards: "Five of Cups (What Broke) · The Hermit (Where You Stand) · Six of Cups (The Likely Path)",
      reading:
        "The rift came from loss and disappointment (Five of Cups). Right now there's distance and reflection — at least one of you has pulled inward (The Hermit). The path points to a return to something warm and familiar (Six of Cups), but only after the solitude has done its work. Reconnection is possible, not immediate.",
    },
    faq: [
      { q: "Is there a tarot spread for getting back together?", a: "Yes — What Broke · Where You Both Stand Now · The Likely Path. It separates the cause of the rift from current feelings and the realistic path forward." },
      { q: "Can tarot tell me if my ex will come back?", a: "It shows the trajectory and dynamics rather than a fixed outcome. The likely-path card reflects current momentum, which can change." },
      { q: "How do I read the 'what broke' card honestly?", a: "Resist softening it. The real cause is usually deeper than the surface argument, and naming it accurately is what makes the rest of the reading useful." },
    ],
    related: [
      { to: "/will-my-ex-come-back-tarot", label: "Will My Ex Come Back?" },
      { to: "/three-card-spread-love", label: "Three-Card Spread for Love" },
      { to: "/best-tarot-spreads-for-love-career-clarity", label: "Best Spreads by Topic" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },
  {
    slug: "three-card-spread-decision-making",
    topic: "decision-making",
    title: "Three-Card Spread for Decision-Making — Layout & Meaning",
    h1: "Three-Card Tarot Spread for Decision-Making",
    description:
      "A three-card tarot spread for decisions: Option A · Option B · The Deciding Factor. Learn how to weigh two paths and read the factor that should carry the most weight.",
    snippet: {
      question: "What is a good tarot spread for making a decision?",
      answer:
        "For decisions, lay Option A · Option B · The Deciding Factor. The first two cards show the likely texture of each path, and the third shows the thing you should be weighting most. It clarifies the choice rather than making it for you.",
    },
    intro: [
      "When you're torn between two paths, asking the cards to just 'pick' usually disappoints. This spread instead shows you the character of each option and the factor that should tip the scales.",
      "It keeps the decision yours while giving you a much clearer basis for it.",
    ],
    positions: [
      { label: "Option A", description: "The likely texture and consequences of the first path." },
      { label: "Option B", description: "The likely texture and consequences of the second path." },
      { label: "The Deciding Factor", description: "The consideration you should be weighting most heavily." },
    ],
    howTo: [
      "Name the two options precisely before you draw.",
      "Shuffle and draw three cards — first two for the options, third for the deciding factor.",
      "Compare the tone of the two option cards rather than labelling one 'good' and one 'bad.'",
      "Let the deciding-factor card reframe what actually matters in the choice.",
    ],
    example: {
      cards: "Nine of Pentacles (Option A) · Three of Wands (Option B) · The Star (Deciding Factor)",
      reading:
        "Option A offers comfort and self-sufficiency (Nine of Pentacles). Option B offers expansion and a bigger horizon (Three of Wands). The deciding factor is hope and long-term vision (The Star) — which tilts the choice toward whichever option you can believe in for the long run, likely the expansion.",
    },
    faq: [
      { q: "What tarot spread helps with decisions?", a: "Option A · Option B · The Deciding Factor. It shows the texture of each path plus the consideration that should carry the most weight." },
      { q: "Will tarot make the decision for me?", a: "No — and that's the point. This spread clarifies the choice and surfaces what matters most, but the decision stays yours." },
      { q: "How do I read the deciding-factor card?", a: "Treat it as the lens to judge both options through. It reframes what actually matters, often shifting which path looks right." },
    ],
    related: [
      { to: "/best-tarot-spreads-for-love-career-clarity", label: "Best Spreads by Topic" },
      { to: "/three-card-spread-career", label: "Three-Card Spread for Career" },
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },
  {
    slug: "three-card-spread-money",
    topic: "money",
    title: "Three-Card Spread for Money — Layout & Meaning",
    h1: "Three-Card Tarot Spread for Money",
    description:
      "A three-card tarot spread for money and finances: Current Position · What's Blocking Flow · The Way Forward. Read your financial situation with clarity and a practical next step.",
    snippet: {
      question: "What is a good tarot spread for money?",
      answer:
        "For money, use Current Position · What's Blocking Flow · The Way Forward. The first card shows your real financial situation, the second names what's restricting it, and the third points to a practical path to improve it.",
    },
    intro: [
      "Money questions benefit from a spread that's honest about the present and concrete about the next move. Pentacles often feature heavily here, but the whole spread tells the story.",
      "This layout names where you are, what's in the way, and what would actually help.",
    ],
    positions: [
      { label: "Current Position", description: "Your real financial situation right now, beyond how it feels." },
      { label: "What's Blocking Flow", description: "The habit, fear, or circumstance restricting money or stability." },
      { label: "The Way Forward", description: "A practical, grounded path toward improvement." },
    ],
    howTo: [
      "Ask a specific money question — a situation, a fear, or a goal.",
      "Shuffle and draw three cards left to right.",
      "Read the blockage card without judgment — it's information, not blame.",
      "Turn the way-forward card into one practical action.",
    ],
    example: {
      cards: "Four of Pentacles (Current) · Five of Pentacles (Blocking) · Eight of Pentacles (Way Forward)",
      reading:
        "You're holding tight to what you have (Four of Pentacles), but a scarcity mindset or genuine shortfall is keeping you anxious (Five of Pentacles). The way forward is steady, skilled effort (Eight of Pentacles) — building income through consistent work rather than gripping or panicking.",
    },
    faq: [
      { q: "What tarot spread is good for money questions?", a: "Current Position · What's Blocking Flow · The Way Forward. It's honest about where you are and concrete about the next move." },
      { q: "Can tarot predict money or wealth?", a: "It reflects your financial patterns and trajectory rather than predicting exact amounts. The way-forward card is most useful as practical direction." },
      { q: "What if I draw mostly Pentacles?", a: "A spread heavy with Pentacles confirms the question is genuinely material and practical — read it as a strong focus on tangible resources." },
    ],
    related: [
      { to: "/money-tarot-reading", label: "Money Tarot Reading" },
      { to: "/three-card-spread-career", label: "Three-Card Spread for Career" },
      { to: "/best-tarot-spreads-for-love-career-clarity", label: "Best Spreads by Topic" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },
  {
    slug: "three-card-spread-new-relationship",
    topic: "new-relationship",
    title: "Three-Card Spread for a New Relationship — Layout & Meaning",
    h1: "Three-Card Tarot Spread for a New Relationship",
    description:
      "A three-card tarot spread for a new relationship: What It Is Now · Its Potential · What to Watch. Read the early energy of a connection without rushing ahead of it.",
    snippet: {
      question: "What is a good tarot spread for a new relationship?",
      answer:
        "For a new relationship, use What It Is Now · Its Potential · What to Watch. The first card grounds you in the present reality, the second shows where it could go, and the third flags what to stay aware of as it develops.",
    },
    intro: [
      "New connections are exciting and easy to over-read. This spread keeps you honest about the present while still letting you glimpse the potential.",
      "It balances optimism with awareness — what's real now, what could grow, and what to keep an eye on.",
    ],
    positions: [
      { label: "What It Is Now", description: "The honest current state of the connection, not the fantasy of it." },
      { label: "Its Potential", description: "Where the connection could realistically go if nurtured." },
      { label: "What to Watch", description: "A pattern, risk, or blind spot to stay aware of early on." },
    ],
    howTo: [
      "Ask about the specific new connection.",
      "Shuffle and draw three cards left to right.",
      "Anchor yourself in the 'what it is now' card before getting swept up in potential.",
      "Treat 'what to watch' as helpful awareness, not a reason for fear.",
    ],
    example: {
      cards: "The Page of Cups (Now) · Two of Cups (Potential) · The Moon (What to Watch)",
      reading:
        "Right now it's sweet, tender, and a little new (Page of Cups). The potential is real mutual connection (Two of Cups). What to watch is illusion or things not yet clearly seen (The Moon) — keep your eyes open and let it reveal itself before deciding what it is.",
    },
    faq: [
      { q: "What tarot spread is best for a new relationship?", a: "What It Is Now · Its Potential · What to Watch. It balances present honesty with future potential and early awareness." },
      { q: "How do I avoid over-reading a new connection?", a: "Anchor yourself in the 'what it is now' card first. Let the present reality ground the reading before you look at potential." },
      { q: "What does 'what to watch' mean?", a: "It's a blind spot or pattern to stay aware of early — helpful awareness, not a warning to be afraid." },
    ],
    related: [
      { to: "/new-relationship-tarot-reading", label: "New Relationship Reading" },
      { to: "/three-card-spread-love", label: "Three-Card Spread for Love" },
      { to: "/best-tarot-spreads-for-love-career-clarity", label: "Best Spreads by Topic" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },
  {
    slug: "three-card-spread-self-growth",
    topic: "self-growth",
    title: "Three-Card Spread for Self-Growth — Layout & Meaning",
    h1: "Three-Card Tarot Spread for Self-Growth",
    description:
      "A three-card tarot spread for personal growth: Where You Are · What's Holding You Back · Your Next Step. A reflective layout for self-awareness and change.",
    snippet: {
      question: "What is a good tarot spread for personal growth?",
      answer:
        "For self-growth, use Where You Are · What's Holding You Back · Your Next Step. The first card reflects your current inner state, the second names the pattern keeping you stuck, and the third points to a realistic next move toward change.",
    },
    intro: [
      "Growth questions are about your relationship with yourself, so this spread reads inward rather than outward.",
      "It's a check-in: where you genuinely are, what's keeping you stuck, and the next honest step.",
    ],
    positions: [
      { label: "Where You Are", description: "Your current inner state — honestly, not aspirationally." },
      { label: "What's Holding You Back", description: "The pattern, belief, or fear keeping you stuck." },
      { label: "Your Next Step", description: "A realistic, grounded move toward growth." },
    ],
    howTo: [
      "Ask an open question about yourself — a pattern, a stuck point, a direction.",
      "Shuffle and draw three cards left to right.",
      "Read the 'holding back' card with curiosity, not self-criticism.",
      "Make the next-step card small and doable rather than grand.",
    ],
    example: {
      cards: "Four of Cups (Where You Are) · The Devil (Holding Back) · The Fool (Next Step)",
      reading:
        "You're disengaged, looking past what's already there (Four of Cups). What's holding you back is an attachment or habit you feel powerless against (The Devil). The next step is a genuine fresh start — a small leap that breaks the loop (The Fool). Growth here means choosing something new on purpose.",
    },
    faq: [
      { q: "What tarot spread is good for personal growth?", a: "Where You Are · What's Holding You Back · Your Next Step. It reads inward and turns self-awareness into a concrete next move." },
      { q: "How do I read the 'holding you back' card without self-judgment?", a: "Approach it with curiosity. It names a pattern to understand, not a flaw to attack — that mindset is what makes change possible." },
      { q: "Should the next-step card be a big change?", a: "No. Make it small and doable. A realistic next step you'll actually take beats an inspiring one you won't." },
    ],
    related: [
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
      { to: "/three-card-tarot-spread-meaning", label: "Three-Card Spread Meaning" },
      { to: "/best-tarot-spreads-for-love-career-clarity", label: "Best Spreads by Topic" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },
  {
    slug: "three-card-spread-yes-no",
    topic: "yes-no",
    title: "Three-Card Spread for Yes or No — Layout & Meaning",
    h1: "Three-Card Tarot Spread for Yes or No",
    description:
      "A three-card tarot spread for yes/no questions that adds nuance to a simple answer: the lean, the reason, and the condition. Get more than a flat yes or no.",
    snippet: {
      question: "How do you do a three-card yes or no tarot spread?",
      answer:
        "For a nuanced yes/no, read three cards as The Lean · The Reason · The Condition. Count upright cards toward yes and reversed or heavy cards toward no for the lean, then use the second and third cards to explain why and under what condition the answer holds.",
    },
    intro: [
      "A single card gives a yes or no, but rarely tells you why. This three-card version keeps the directness while adding the context that makes the answer useful.",
      "You get a lean, a reason, and a condition — far more actionable than a flat verdict.",
    ],
    positions: [
      { label: "The Lean", description: "The overall direction — upright and bright leans yes, reversed or heavy leans no." },
      { label: "The Reason", description: "Why the answer leans the way it does." },
      { label: "The Condition", description: "What would have to be true for the answer to hold or change." },
    ],
    howTo: [
      "Ask a clear yes/no question.",
      "Shuffle and draw three cards left to right.",
      "Read the lean card first, then let the reason and condition cards add nuance.",
      "State the answer as 'likely yes, because…, as long as…' rather than a flat verdict.",
    ],
    example: {
      cards: "The Sun (Lean) · Eight of Wands (Reason) · Two of Pentacles (Condition)",
      reading:
        "The lean is a strong yes (The Sun). The reason is momentum and things moving quickly in your favour (Eight of Wands). The condition is balance — you'll need to juggle competing demands without dropping anything (Two of Pentacles). So: yes, if you can stay on top of the moving pieces.",
    },
    faq: [
      { q: "Can tarot answer yes or no questions?", a: "Yes, though it shines more at 'what's going on.' A three-card lean/reason/condition layout keeps the directness while adding useful nuance." },
      { q: "How do I read a yes/no lean?", a: "Count upright, positive cards toward yes and reversed or heavy cards toward no. The reason and condition cards then explain and qualify the lean." },
      { q: "Why use three cards instead of one for yes/no?", a: "One card gives a verdict; three give a verdict plus the reason and the condition, which makes the answer something you can actually act on." },
    ],
    related: [
      { to: "/yes-no-tarot-reading", label: "Yes/No Tarot Reading" },
      { to: "/tarot-spreads/yes-no-spread", label: "Yes/No Spread Guide" },
      { to: "/three-card-tarot-spread-meaning", label: "Three-Card Spread Meaning" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },
];

export function getTopicSpread(slug: string): TopicSpread | undefined {
  return topicSpreads.find((s) => s.slug === slug);
}
