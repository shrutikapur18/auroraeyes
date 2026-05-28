/**
 * Cornerstone tarot-interpretation guides.
 * Rich, structured, psychologically grounded content rendered by
 * src/pages/InterpretationGuide.tsx. No spiritual jargon, no filler.
 */

export interface GuideSection {
  heading: string;
  body: string[];
  list?: string[];
}

export interface GuideExample {
  title: string;
  body: string[];
}

export interface InterpretationGuide {
  slug: string;
  title: string; // SEO title (site name appended by SEOHead)
  h1: string;
  description: string;
  /** Featured-snippet answer shown at the top of the page. */
  snippet: { question: string; answer: string };
  intro: string[];
  sections: GuideSection[];
  examples?: GuideExample[];
  faq: { q: string; a: string }[];
  related: { to: string; label: string }[];
  /** Optional CTA override. */
  cta?: { title: string; description: string; to?: string; label?: string };
}

export const interpretationGuides: InterpretationGuide[] = [
  /* ───────────────── 1. PILLAR ───────────────── */
  {
    slug: "tarot-spread-interpretation",
    title: "Tarot Spread Interpretation — How to Read Any Spread",
    h1: "Tarot Spread Interpretation: How to Read Your Cards as One Story",
    description:
      "Learn how to interpret a tarot spread the right way — read positions, connect cards into a single story, handle reversals and contradictions, and find the message that actually answers your question.",
    snippet: {
      question: "What does my tarot spread mean?",
      answer:
        "A tarot spread means more than the sum of its cards. To interpret it, read each card through its position (what that slot is asking), then trace how the cards relate — which repeat, which clash, which point the same way. The spread answers your question when you can say the whole thing in one or two plain sentences.",
    },
    intro: [
      "Most people learn individual card meanings first, then freeze the moment they lay down three or ten cards at once. The cards each make sense, but the spread as a whole feels like noise. That gap — between knowing cards and reading a spread — is what this guide closes.",
      "A spread is not a list. It's a structure. Each position frames the card sitting in it, and the cards talk to each other across positions. Interpretation is the skill of hearing that conversation and saying back, in plain language, what it's telling you.",
      "This is the hub page for everything Aurora Eyes teaches about reading spreads. Use it as your map: read this end to end, then follow the links into the deeper guides on specific layouts, contradictions, reversals, and the questions readers ask most.",
    ],
    sections: [
      {
        heading: "Start with the position, not the card",
        body: [
          "The single biggest shift in reading spreads is this: the position changes what a card means. The Three of Swords in a 'past' slot is grief you've already moved through. The same card in an 'outcome' slot is a warning about where things are heading. Same card, opposite weight.",
          "Before you interpret any card, ask what its position is actually asking. 'Obstacle' wants to know what's in the way. 'Advice' wants to know what to do. 'Hopes and fears' is asking about your own inner state, not external events. Read the question of the slot first, then drop the card into it.",
        ],
      },
      {
        heading: "Read each card, then look for the threads",
        body: [
          "Go card by card first. Note the upright or reversed meaning and how it lands in its position. Resist the urge to interpret the whole spread before you've actually looked at each piece.",
          "Then step back and hunt for threads — the patterns that turn separate cards into one message:",
        ],
        list: [
          "Repeating suits — three Cups means the answer is emotional; three Pentacles means it's practical or financial.",
          "Repeating numbers — multiple Fives signal conflict or instability; multiple Aces signal fresh starts.",
          "Major Arcana density — lots of Majors means big, fated themes; mostly Minors means everyday, changeable situations.",
          "Direction — do the cards build toward something hopeful, or do they sour as the spread progresses?",
          "Court cards — these often point to specific people or roles you're playing.",
        ],
      },
      {
        heading: "Let the cards interact",
        body: [
          "Cards modify each other. The Tower next to the Star reads very differently from the Tower next to the Ten of Swords — the first is upheaval followed by healing, the second is upheaval followed by an ending. You're not reading two cards; you're reading the relationship between them.",
          "Pay special attention to adjacent positions that are designed to interact: present and challenge, advice and outcome, hopes-and-fears and outcome. The tension or agreement between those pairs is usually where the real insight lives.",
        ],
      },
      {
        heading: "Synthesise: say the whole spread in one breath",
        body: [
          "Synthesis is the part beginners skip and experienced readers live in. Once you've read the cards and traced the threads, force yourself to summarise the entire spread in one or two plain sentences, as if a friend asked 'so what's the deal?'",
          "If you can't do that yet, you haven't finished reading — you've only described. Keep pulling the threads together until a single, honest sentence falls out. That sentence is your interpretation.",
        ],
      },
      {
        heading: "Check it against the question",
        body: [
          "Finally, hold your summary up against what you actually asked. Does it answer the question? Spreads sometimes answer a question you didn't ask — that's worth noticing, not ignoring. If it genuinely doesn't connect, the issue is usually a vague question, not a 'wrong' reading.",
          "When a spread refuses to make sense, that's a real and common experience with its own causes and fixes — see the guide on why a spread doesn't add up.",
        ],
      },
    ],
    examples: [
      {
        title: "Worked example: a three-card career spread",
        body: [
          "Question: 'Should I stay in my current job?' Cards: Eight of Pentacles (past), Four of Cups (present), Eight of Wands (future).",
          "Position-by-position: you've built real skill (Eight of Pentacles past), but you've gone numb and stopped noticing what's on offer (Four of Cups present), and a fast change is coming whether you act or not (Eight of Wands future).",
          "Threads: two Eights bookend the spread — competence then acceleration — while the stalled Four of Cups sits in the middle. The story isn't 'leave' or 'stay'; it's 'your boredom is the real problem, and momentum is about to force the issue.' That single sentence is the interpretation.",
        ],
      },
    ],
    faq: [
      { q: "How do I interpret a tarot spread as a beginner?", a: "Read each card through its position first, then look for repeating suits, numbers, and Major Arcana. Finally, summarise the whole spread in one plain sentence and check it against your question." },
      { q: "Why don't the individual card meanings add up to the spread's meaning?", a: "Because position and card interaction change everything. A card means something different depending on the slot it lands in and the cards beside it. Read relationships, not just cards." },
      { q: "What does it mean when one suit dominates a spread?", a: "It tells you the arena of the answer: Cups means emotional, Pentacles means material or practical, Swords means mental or conflict-driven, Wands means action and motivation." },
      { q: "How many Major Arcana cards is 'a lot' in a spread?", a: "In a three-card spread, two or three Majors is significant. It signals the situation is driven by major life themes and forces larger than day-to-day choices." },
      { q: "What if my spread doesn't seem to answer my question?", a: "Usually the question was too vague, or the spread answered a more honest underlying question. Reread for what it IS saying before assuming the reading failed." },
    ],
    related: [
      { to: "/how-to-read-tarot-spreads", label: "How to Read Tarot Spreads" },
      { to: "/celtic-cross-tarot-spread", label: "Celtic Cross Interpretation" },
      { to: "/three-card-tarot-spread-meaning", label: "Three-Card Spread Meaning" },
      { to: "/how-to-interpret-contradictory-tarot-cards", label: "Contradictory Cards" },
      { to: "/how-to-read-reversals-in-a-spread", label: "Reversals in a Spread" },
      { to: "/why-my-tarot-spread-doesnt-make-sense", label: "When a Spread Doesn't Make Sense" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
    cta: {
      title: "Interpret Your Own Spread Now",
      description: "Enter your cards, positions, and question — get an instant synthesis of the whole spread.",
      to: "/what-does-my-spread-mean",
      label: "Open the Spread Interpreter",
    },
  },

  /* ───────────────── 2. CELTIC CROSS ───────────────── */
  {
    slug: "celtic-cross-tarot-spread",
    title: "Celtic Cross Tarot Spread — Read All 10 Positions",
    h1: "Celtic Cross Tarot Spread: How to Read All 10 Positions",
    description:
      "A clear, modern guide to interpreting the Celtic Cross. Understand each of the 10 positions, how the cross and the staff work together, and how to turn ten cards into one coherent reading.",
    snippet: {
      question: "How do you read a Celtic Cross tarot spread?",
      answer:
        "Read the Celtic Cross in two halves. The cross (cards 1–6) tells the story of the situation: present, challenge, root, past, possible outcome, and near future. The staff (cards 7–10) reads your inner world: your stance, your environment, your hopes and fears, and the likely outcome. Read the cross for the plot, the staff for the psychology, then combine them.",
    },
    intro: [
      "The Celtic Cross has a reputation for being intimidating, and ten cards is genuinely a lot to hold at once. But the layout is logical: it's two smaller readings working together. Once you see that, it stops being a wall of cards and becomes a structured story.",
      "This guide walks through every position, explains the relationships that matter most, and shows you how to synthesise all ten cards without drowning in detail.",
    ],
    sections: [
      {
        heading: "The two halves: the cross and the staff",
        body: [
          "The first six cards form a cross in the centre. This is the situation itself — what's happening, what's blocking it, where it came from, and where it's tending. The last four cards form a vertical staff on the right. This is your relationship to the situation — how you're standing in it and what's likely to come of it.",
          "Read the cross first and get the plot straight. Then read the staff to understand the human being inside that plot. Trying to read all ten in order, flatly, is what makes the spread feel overwhelming.",
        ],
      },
      {
        heading: "The ten positions, in plain language",
        body: ["Here's what each slot is actually asking:"],
        list: [
          "1. Present — the heart of the matter, what you're living right now.",
          "2. Challenge — the one thing crossing or complicating it (read this card as a force, not good/bad).",
          "3. Foundation — the root cause underneath the situation.",
          "4. Recent past — what's just left or is on its way out.",
          "5. Crown — the best outcome you're consciously aiming at.",
          "6. Near future — what's arriving next.",
          "7. Self — how you're actually showing up.",
          "8. Environment — the people and pressures around you.",
          "9. Hopes and fears — your inner state (often both at once).",
          "10. Outcome — where it lands if nothing changes.",
        ],
      },
      {
        heading: "The relationships that carry the reading",
        body: [
          "A few pairings do most of the interpretive work. Cards 1 and 2 (present and challenge) define the core tension — read them together first. Cards 5 and 6 (crown and near future) show whether your conscious goal matches what's actually coming. And cards 9 and 10 (hopes-and-fears and outcome) reveal whether your fear or your hope is the more accurate prediction.",
          "When the outcome (10) contradicts the crown (5), that's not a mistake — it's the spread telling you your stated goal and your trajectory have diverged. That contradiction is often the single most useful thing in the whole reading.",
        ],
      },
      {
        heading: "Synthesising ten cards without overload",
        body: [
          "After reading both halves, compress each into one sentence: one for the situation (the cross) and one for you-in-it (the staff). Then join them. 'A stalled project I've outgrown (cross) is waiting on me to stop playing safe (staff).' Two sentences, ten cards, one reading.",
          "Don't try to give equal airtime to all ten positions. The strongest cards and the sharpest contradictions lead; the rest provide texture.",
        ],
      },
    ],
    examples: [
      {
        title: "Reading the core cross at a glance",
        body: [
          "Say card 1 is the Two of Wands (planning, standing at a threshold) and card 2 is the Four of Pentacles (gripping what's safe). Immediately the core tension is clear: you want to expand, but you're holding on too tightly to risk it.",
          "Everything else in the spread now has a frame to hang on. The root, the past, and the outcome all get read in light of that one tension — expansion versus security.",
        ],
      },
    ],
    faq: [
      { q: "Is the Celtic Cross good for beginners?", a: "It's rated intermediate. Learn the three-card spread first, then move up. The Celtic Cross is easier once you read it as two halves rather than ten separate cards." },
      { q: "What's the difference between the 'crown' and the 'outcome' positions?", a: "The crown (card 5) is the best outcome you're consciously working toward. The outcome (card 10) is where things actually land on the current trajectory. When they differ, your goal and your path have split." },
      { q: "Which Celtic Cross cards should I read first?", a: "Start with cards 1 and 2 — present and challenge. Together they define the central tension that frames every other card." },
      { q: "What does the challenge position mean if I draw a 'positive' card?", a: "A positive card in the challenge slot often means something good is complicating things — an opportunity you're not ready for, or a comfort that's holding you back." },
      { q: "How do I keep track of ten cards without getting lost?", a: "Read the cross (1–6) and the staff (7–10) separately, summarise each in one sentence, then join the two sentences. That keeps the whole spread manageable." },
    ],
    related: [
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
      { to: "/tarot-spreads/celtic-cross-spread", label: "Celtic Cross Layout Guide" },
      { to: "/how-to-read-tarot-spreads", label: "How to Read Spreads" },
      { to: "/how-to-interpret-contradictory-tarot-cards", label: "Contradictory Cards" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },

  /* ───────────────── 3. HOW TO READ SPREADS ───────────────── */
  {
    slug: "how-to-read-tarot-spreads",
    title: "How to Read Tarot Spreads — A Beginner's Method",
    h1: "How to Read Tarot Spreads: A Repeatable Method",
    description:
      "A step-by-step method for reading any tarot spread, from one card to ten. Learn how to read positions, spot patterns, handle reversals, and synthesise the cards into a clear answer.",
    snippet: {
      question: "How do you read a tarot spread step by step?",
      answer:
        "Read any tarot spread in five steps: (1) clarify your question, (2) read each card through its position, (3) scan for patterns — repeating suits, numbers, and Major Arcana, (4) read how neighbouring cards interact, and (5) synthesise the whole thing into one or two plain sentences that answer your question.",
    },
    intro: [
      "There's no separate technique for each spread. A three-card draw and a ten-card Celtic Cross use the exact same method — the bigger spread just has more positions. Learn the method once and every layout becomes readable.",
      "This guide gives you that repeatable five-step method, with the reasoning behind each step so you can apply it to spreads you've never seen before.",
    ],
    sections: [
      {
        heading: "Step 1 — Clarify the question",
        body: [
          "A vague question produces a vague reading. 'What about my life?' gives you fog. 'What's blocking me from leaving this job?' gives you a target. Spend ten seconds sharpening the question before you shuffle — it's the highest-leverage thing you can do.",
          "Open questions ('what do I need to understand about…') almost always read more clearly than yes/no or fixed-date questions, because the cards describe situations far better than they predict events.",
        ],
      },
      {
        heading: "Step 2 — Read each card in its position",
        body: [
          "Go one position at a time. Say what the position is asking, then read the card — upright or reversed — as an answer to that specific question. Don't jump ahead to the whole picture yet. You're gathering pieces.",
        ],
      },
      {
        heading: "Step 3 — Scan for patterns",
        body: ["Now look across the whole spread for repetition and dominance:"],
        list: [
          "Suits: which element is loudest? That's the arena of the answer.",
          "Numbers: repeated numbers amplify a theme (Fives = conflict, Tens = completion).",
          "Arcana balance: many Majors = fated, weighty; many Minors = everyday, in your hands.",
          "Court cards: people or roles in play.",
        ],
      },
      {
        heading: "Step 4 — Read the interactions",
        body: [
          "Cards beside each other change each other's meaning. A harsh card softened by a gentle neighbour reads as 'hard but survivable.' Two harsh cards together intensify. Look especially at position pairs designed to relate — present/challenge, advice/outcome.",
        ],
      },
      {
        heading: "Step 5 — Synthesise and check",
        body: [
          "Pull it into one or two sentences a friend would understand. Then check that sentence against your original question. If it fits, you're done. If it doesn't, reread — the spread may be answering a truer question underneath the one you asked.",
        ],
      },
    ],
    faq: [
      { q: "Do different spreads need different reading techniques?", a: "No. Every spread uses the same method — read positions, find patterns, read interactions, synthesise. Larger spreads just have more positions to work through." },
      { q: "Should beginners use reversals?", a: "It's optional. Many beginners read all cards upright at first and add reversals once they're comfortable. Reversals add nuance, not difficulty, once you understand them." },
      { q: "How long should reading a spread take?", a: "However long it takes to reach one honest summary sentence. A three-card spread might take two minutes; a Celtic Cross, ten. Rushing the synthesis step is the usual mistake." },
      { q: "What's the most important step?", a: "Synthesis — pulling the cards into a single plain-language message. Describing each card individually isn't reading the spread; combining them is." },
      { q: "Can I learn to read spreads without memorising all 78 cards?", a: "Yes. Start with the method and keyword meanings, and let position and pattern do the heavy lifting. Card knowledge deepens naturally with practice." },
    ],
    related: [
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
      { to: "/three-card-tarot-spread-meaning", label: "Three-Card Spread Meaning" },
      { to: "/celtic-cross-tarot-spread", label: "Celtic Cross" },
      { to: "/how-to-read-reversals-in-a-spread", label: "Reading Reversals" },
      { to: "/tarot-card-meanings", label: "All Card Meanings" },
    ],
  },

  /* ───────────────── 4. WHY SPREAD DOESN'T MAKE SENSE ───────────────── */
  {
    slug: "why-my-tarot-spread-doesnt-make-sense",
    title: "Why My Tarot Spread Doesn't Make Sense — And How to Fix It",
    h1: "Why Your Tarot Spread Doesn't Make Sense (And How to Fix It)",
    description:
      "Confused by a tarot spread that won't add up? Here are the real reasons spreads feel incoherent — vague questions, missed positions, ignored patterns — and a clear way to get the reading back on track.",
    snippet: {
      question: "Why doesn't my tarot spread make sense?",
      answer:
        "A tarot spread usually feels confusing for one of four reasons: the question was too vague, you read cards without their positions, you skipped the synthesis step, or the spread is answering a truer underlying question you didn't consciously ask. Fixing the question and rereading for patterns resolves most 'incoherent' spreads.",
    },
    intro: [
      "Every reader hits this: the cards are face up, you know what each one means, and yet the spread as a whole says nothing. It feels random, contradictory, or just blank. This is one of the most common and most demoralising experiences in tarot — and it's almost always fixable.",
      "The confusion rarely comes from the cards. It comes from how the question was framed or how the spread was read. Here are the real causes and what to do about each.",
    ],
    sections: [
      {
        heading: "Cause 1 — The question was too vague",
        body: [
          "Fuzzy questions produce fuzzy spreads. If you asked 'what's going on with my life?', the cards have nothing specific to organise around, so they scatter. The fix is to re-ask something concrete — name a relationship, a decision, a fear — and reread the same cards through that sharper lens. Often they snap into focus immediately.",
        ],
      },
      {
        heading: "Cause 2 — You read the cards but not the positions",
        body: [
          "If you interpreted each card by its general meaning and ignored what its slot was asking, the spread will feel like a pile of unrelated facts. Go back and reread each card strictly as an answer to its position's question. The same cards usually start cohering once they're anchored to their roles.",
        ],
      },
      {
        heading: "Cause 3 — You stopped before synthesising",
        body: [
          "Describing cards one by one is not reading a spread. If you never forced the cards into a single message, of course it doesn't 'make sense' — you stopped at the raw material. Make yourself summarise the whole thing in one sentence, even a clumsy one. The act of compressing reveals the meaning.",
        ],
      },
      {
        heading: "Cause 4 — The spread answered a truer question",
        body: [
          "Sometimes a spread ignores your stated question and answers the real one underneath. You ask 'will they call?' and the cards talk about your self-worth. That's not failure — it's the reading redirecting you to what actually matters. Ask yourself what the spread IS about before deciding it's wrong.",
        ],
      },
      {
        heading: "When contradictions are the point",
        body: [
          "Apparent contradictions — a hopeful card next to a bleak one — feel like the spread is breaking, but they're usually the most honest part of it. Real situations are contradictory. Two opposing cards often describe a genuine push-pull you're living. There's a full guide on reading those tensions deliberately.",
        ],
      },
    ],
    faq: [
      { q: "Is a confusing tarot spread a bad sign?", a: "No. Confusion almost always reflects a vague question or an unfinished interpretation, not a bad omen. Sharpen the question and reread for patterns." },
      { q: "Should I redo a reading that doesn't make sense?", a: "Reread the same cards first — most 'failed' spreads resolve once you fix the question or finish the synthesis. Pulling new cards on the same question usually just adds noise." },
      { q: "Why do the cards seem to contradict each other?", a: "Because real situations contain contradictions. Two opposing cards often describe a genuine inner conflict. That tension is information, not error." },
      { q: "Can asking the wrong question break a reading?", a: "It can scatter it. Vague or loaded questions give the cards nothing to organise around. A concrete, open question produces a far clearer spread." },
      { q: "What if the spread answers a different question than I asked?", a: "Take it seriously — spreads often surface the truer underlying question. Read what it IS saying before concluding it missed the mark." },
    ],
    related: [
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
      { to: "/how-to-interpret-contradictory-tarot-cards", label: "Contradictory Cards" },
      { to: "/how-to-read-tarot-spreads", label: "How to Read Spreads" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },

  /* ───────────────── 5. THREE-CARD MEANING ───────────────── */
  {
    slug: "three-card-tarot-spread-meaning",
    title: "Three-Card Tarot Spread Meaning — Read It Properly",
    h1: "Three-Card Tarot Spread Meaning: Reading Three Cards as One",
    description:
      "What a three-card tarot spread really means and how to read it. Learn the common layouts, how the three positions interact, and how to turn three cards into a single clear answer.",
    snippet: {
      question: "What does a three-card tarot spread mean?",
      answer:
        "A three-card tarot spread gives a compact, three-part answer — most often past, present, future, but also situation/challenge/advice or mind/body/spirit. The meaning comes from reading the three positions as a sequence or a relationship, not as three separate cards, and summarising them in one sentence.",
    },
    intro: [
      "The three-card spread is the workhorse of tarot — fast, flexible, and surprisingly deep once you read it as a unit rather than three isolated draws. It's the best place to master spread interpretation before scaling up.",
      "This guide covers the common three-card layouts, how the positions relate, and how to read across all three to land a single answer.",
    ],
    sections: [
      {
        heading: "The common three-card layouts",
        body: ["The same three cards mean different things depending on the frame you choose before you draw:"],
        list: [
          "Past · Present · Future — how a situation has moved and where it's tending.",
          "Situation · Challenge · Advice — what's happening, what's in the way, what to do.",
          "Mind · Body · Spirit — an internal check-in across three layers of self.",
          "You · The Other · The Connection — for relationship questions.",
          "Option A · Option B · What to weigh — for decisions.",
        ],
      },
      {
        heading: "Read it as a sequence or a relationship",
        body: [
          "In a past/present/future layout, read left to right as a story with momentum — does it build or decline? In a situation/challenge/advice layout, read it as a relationship: the advice card is a response to the challenge card, so read those two together closely.",
          "Either way, the middle card is usually the pivot. It's the present moment, the core challenge, or the body — the thing everything else turns around.",
        ],
      },
      {
        heading: "Patterns still matter in three cards",
        body: [
          "Even with only three cards, watch for two of the same suit (a strong thematic lean), two Majors (a weighty, fated situation), or a clear upward or downward arc across the three. Small spreads still carry patterns.",
        ],
      },
      {
        heading: "Land it in one sentence",
        body: [
          "Three cards should compress easily. After reading the positions and any pattern, say the whole thing in one line: 'You've done the work, you've gone numb, and change is coming fast.' That sentence is the meaning of the spread.",
        ],
      },
    ],
    examples: [
      {
        title: "Worked example: situation / challenge / advice",
        body: [
          "Cards: Ten of Cups (situation), Seven of Cups (challenge), Knight of Swords (advice).",
          "You have something genuinely good (Ten of Cups), but you're lost in too many options or fantasies about something else (Seven of Cups). The advice is decisive: pick one and move on it directly (Knight of Swords). In one line — 'Stop window-shopping and commit to the good thing in front of you.'",
        ],
      },
    ],
    faq: [
      { q: "What do the three cards in a three-card spread represent?", a: "It depends on the layout you choose before drawing — most often past/present/future, but also situation/challenge/advice, mind/body/spirit, or you/other/connection." },
      { q: "How do I read three tarot cards together?", a: "Read each card in its position, then read them as a sequence or relationship — the middle card is usually the pivot — and summarise all three in one sentence." },
      { q: "Is a three-card spread accurate?", a: "It's as accurate as the question and the reading. Three cards are plenty for a focused question; the limit is breadth, not depth." },
      { q: "What does it mean if two of my three cards are the same suit?", a: "It signals a strong thematic lean toward that suit's arena — emotional (Cups), practical (Pentacles), mental (Swords), or action (Wands)." },
      { q: "Can I use a three-card spread for yes/no questions?", a: "Yes — read the overall lean of the three cards, but three-card spreads shine more for 'what's going on' than for hard yes/no answers." },
    ],
    related: [
      { to: "/past-present-future-tarot-spread", label: "Past Present Future Spread" },
      { to: "/three-card-spread-love", label: "Three-Card Spread for Love" },
      { to: "/three-card-spread-career", label: "Three-Card Spread for Career" },
      { to: "/tarot-spreads/three-card-spread", label: "Three-Card Layout Guide" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },

  /* ───────────────── 6. PAST PRESENT FUTURE ───────────────── */
  {
    slug: "past-present-future-tarot-spread",
    title: "Past Present Future Tarot Spread — Meaning & Reading",
    h1: "Past, Present, Future Tarot Spread: How to Read the Arc",
    description:
      "How to read the past, present, future tarot spread. Understand what each position means, how to read the arc between them, and how to interpret a future card without treating it as fixed fate.",
    snippet: {
      question: "What does the past, present, future tarot spread mean?",
      answer:
        "The past, present, future spread shows the arc of a situation: the first card is the influences that shaped it, the second is where you stand now, and the third is the likely direction if nothing changes. The future card shows a trajectory, not a fixed fate — it changes if you change.",
    },
    intro: [
      "Past, present, future is the most popular three-card layout for good reason: it maps a situation's movement in a single glance. But it's easy to misread the future card as a locked prediction, which is exactly what tarot doesn't do.",
      "This guide shows you how to read the three positions, how to read the arc between them, and how to treat the future card honestly.",
    ],
    sections: [
      {
        heading: "What each position is asking",
        body: ["Read each card as an answer to its slot's question:"],
        list: [
          "Past — what influences, choices, or events led here? What's still echoing?",
          "Present — where do you actually stand right now, including your own state of mind?",
          "Future — where is this heading on the current trajectory, if nothing shifts?",
        ],
      },
      {
        heading: "Read the arc, not just the points",
        body: [
          "The real insight is in the movement between cards. Is the spread climbing toward something better, or sliding toward something worse? Is the present a clean break from the past, or more of the same? The story lives in the transitions, not only the three snapshots.",
        ],
      },
      {
        heading: "The future card is a trajectory, not a verdict",
        body: [
          "The third card answers 'where does this go if you keep doing what you're doing?' It's a forecast based on current momentum, and momentum can be changed. A difficult future card is useful precisely because it's a warning you can act on, not a sentence you're stuck with.",
        ],
      },
      {
        heading: "Reading the present as the lever",
        body: [
          "The present card is where your agency lives. The past is fixed and the future is provisional, but the present is the point you can actually move from. Pay extra attention to it — it usually holds the action the spread is recommending.",
        ],
      },
    ],
    examples: [
      {
        title: "Worked example: reading the arc",
        body: [
          "Cards: The Tower (past), Six of Swords (present), The Star (future).",
          "Something collapsed (Tower past), you're in transit away from it, tired but moving (Six of Swords present), and genuine healing and hope are ahead (Star future). The arc climbs — from rupture, through recovery, toward renewal. One line: 'The worst is behind you and you're already moving toward calmer water.'",
        ],
      },
    ],
    faq: [
      { q: "What does the future card mean in a past present future spread?", a: "It shows the likely direction of the situation on its current trajectory — a forecast you can change, not a fixed fate." },
      { q: "Which card is most important in this spread?", a: "The present card. It's where your agency lives and usually holds the action the spread is recommending." },
      { q: "How do I read the arc between the three cards?", a: "Look at the movement — does the spread climb toward something better or slide toward something worse, and is the present a break from the past or more of the same?" },
      { q: "Can the future card change?", a: "Yes. It reflects current momentum. Change what you're doing in the present and the future card's outcome shifts with you." },
      { q: "Is past present future good for relationship questions?", a: "Yes, especially for understanding how a relationship has moved over time. For deeper relationship work, a you/other/connection layout adds dimension." },
    ],
    related: [
      { to: "/three-card-tarot-spread-meaning", label: "Three-Card Spread Meaning" },
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
      { to: "/how-to-read-reversals-in-a-spread", label: "Reading Reversals" },
      { to: "/tarot-spreads/three-card-spread", label: "Three-Card Layout Guide" },
    ],
  },

  /* ───────────────── 7. CONTRADICTORY CARDS ───────────────── */
  {
    slug: "how-to-interpret-contradictory-tarot-cards",
    title: "How to Interpret Contradictory Tarot Cards",
    h1: "How to Interpret Contradictory Tarot Cards in a Spread",
    description:
      "When tarot cards seem to contradict each other, the tension is usually the message. Learn how to read opposing cards, reconcile mixed signals, and turn contradictions into the most honest part of your reading.",
    snippet: {
      question: "How do you interpret contradictory tarot cards?",
      answer:
        "Contradictory tarot cards usually describe a real push-pull in your situation rather than an error. Read the tension itself as the message: name what each card wants, then ask where in your life both things are true at once. The contradiction often points straight to the heart of the matter.",
    },
    intro: [
      "You draw the Ten of Cups and the Three of Swords. Joy and heartbreak, side by side. The instinct is to think one of them is 'wrong.' Neither is. Contradictory cards are one of tarot's most honest features, because real situations are full of contradictions.",
      "This guide shows you how to read opposing cards as a single truth rather than a glitch.",
    ],
    sections: [
      {
        heading: "Contradiction is information, not error",
        body: [
          "When two cards clash, the spread isn't malfunctioning — it's reflecting a genuine tension you're living. People love and resent the same person. They want change and fear it. A spread that shows only one side would be the inaccurate one. Treat the clash as data.",
        ],
      },
      {
        heading: "Name what each card wants",
        body: [
          "Take each opposing card and state plainly what it's pushing for. The Four of Pentacles wants safety; the Fool wants the leap. Once you've named both desires, the contradiction becomes a clear, human dilemma rather than a confusing mess.",
        ],
      },
      {
        heading: "Find where both are true at once",
        body: [
          "Ask: where in my situation are both of these things true simultaneously? Usually you'll find it instantly — 'I'm happy in this relationship AND grieving something inside it.' That sentence, holding both cards, is the interpretation. The 'and' is the message.",
        ],
      },
      {
        heading: "Use position to resolve the tension",
        body: [
          "Positions often dissolve apparent contradictions. A bleak card in the 'past' and a bright card in the 'outcome' isn't a contradiction at all — it's a story of recovery. Always check whether the clash is real or just two stages of the same arc sitting next to each other.",
        ],
      },
    ],
    examples: [
      {
        title: "Worked example: joy beside heartbreak",
        body: [
          "Cards: Ten of Cups (present) and Three of Swords (challenge).",
          "The Ten of Cups wants to celebrate a fulfilling connection; the Three of Swords names a real wound inside it. Both are true: you have something good and you're carrying a specific hurt within it. The reading isn't 'happy or sad' — it's 'address the hurt so the good thing can hold.'",
        ],
      },
    ],
    faq: [
      { q: "Why do my tarot cards contradict each other?", a: "Because real situations are contradictory. Opposing cards usually describe a genuine push-pull you're living, not a mistake in the reading." },
      { q: "How do I read two opposite tarot cards together?", a: "Name what each card wants, then find where both are true at once in your life. The 'and' that holds both cards is the message." },
      { q: "Does a contradiction mean I should redo the reading?", a: "No. Contradictions are often the most honest part of a spread. Read the tension rather than pulling new cards." },
      { q: "Can positions explain a contradiction?", a: "Often, yes. A dark card in the past and a bright card in the outcome is a recovery story, not a true contradiction. Check the positions before assuming conflict." },
      { q: "What if one card is clearly positive and one clearly negative?", a: "Hold both. The reading is usually that something good and something painful coexist, and the work is to address the painful part so the good can stand." },
    ],
    related: [
      { to: "/why-my-tarot-spread-doesnt-make-sense", label: "When a Spread Doesn't Make Sense" },
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
      { to: "/how-to-read-reversals-in-a-spread", label: "Reading Reversals" },
      { to: "/tarot-combinations", label: "Card Combinations" },
    ],
  },

  /* ───────────────── 8. MULTIPLE ACES ───────────────── */
  {
    slug: "what-do-multiple-aces-mean-in-tarot",
    title: "What Do Multiple Aces Mean in Tarot?",
    h1: "What Multiple Aces Mean in a Tarot Spread",
    description:
      "Drew two, three, or four Aces in one spread? Multiple Aces signal powerful new beginnings. Learn what each combination means and how to read repeating Aces alongside the rest of your spread.",
    snippet: {
      question: "What does it mean to get multiple Aces in a tarot reading?",
      answer:
        "Multiple Aces in a tarot spread signal strong new beginnings and fresh energy entering your life. Two Aces is a meaningful new start; three is a significant turning point on several fronts; four is a major life threshold. The suits involved tell you which areas — emotional, material, mental, or creative — are beginning.",
    },
    intro: [
      "Aces are the seeds of the tarot — pure potential, the first spark of each suit. Drawing more than one in a single spread is uncommon enough to be worth pausing on, because repeating Aces amplify each other into a clear signal: something is beginning.",
      "This guide explains what two, three, and four Aces mean, and how the suits shape the message.",
    ],
    sections: [
      {
        heading: "Why repeating numbers amplify meaning",
        body: [
          "When a number repeats across a spread, it turns up the volume on that number's theme. Aces are about beginnings and potential, so multiple Aces mean beginnings are the dominant story — not a side note, but the headline of the reading.",
        ],
      },
      {
        heading: "What each count means",
        body: ["Read the count as intensity:"],
        list: [
          "Two Aces — a meaningful fresh start, often where two areas of life begin together (a new job and a new outlook, say).",
          "Three Aces — a significant turning point touching several fronts at once; real momentum building.",
          "Four Aces — a major life threshold, a clean slate across the board. Rare and weighty.",
        ],
      },
      {
        heading: "The suits tell you where",
        body: ["Each Ace opens a different door:"],
        list: [
          "Ace of Cups — new emotional beginnings: love, connection, openness.",
          "Ace of Pentacles — new material beginnings: money, work, stability, a tangible opportunity.",
          "Ace of Swords — new mental beginnings: clarity, truth, a breakthrough idea or decision.",
          "Ace of Wands — new creative beginnings: passion, drive, a project or spark of action.",
        ],
      },
      {
        heading: "Read the Aces with the rest of the spread",
        body: [
          "Aces announce a beginning, but the surrounding cards tell you the conditions. Supportive neighbours mean the start is well-timed; challenging ones mean the beginning arrives with obstacles to navigate. Don't read the Aces in isolation — read what the spread says about how the new start unfolds.",
        ],
      },
    ],
    faq: [
      { q: "What does it mean to draw two Aces in a tarot reading?", a: "Two Aces signal a meaningful fresh start, often where two areas of life begin at once. The suits tell you which areas — emotional, material, mental, or creative." },
      { q: "Are multiple Aces a good sign?", a: "Generally yes — they point to new beginnings and fresh potential. The surrounding cards show how smoothly those beginnings unfold." },
      { q: "What do all four Aces mean together?", a: "Four Aces is a major life threshold — a clean slate across emotional, material, mental, and creative areas at once. It's rare and carries real weight." },
      { q: "Do reversed Aces still count as beginnings?", a: "Yes, but reversed Aces suggest a beginning that's delayed, blocked, or not yet ready — the potential is there but the timing or conditions need work." },
      { q: "How do the suits change the meaning of multiple Aces?", a: "Cups = emotional starts, Pentacles = material starts, Swords = mental clarity, Wands = creative drive. The mix tells you which parts of life are beginning." },
    ],
    related: [
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
      { to: "/how-to-read-tarot-spreads", label: "How to Read Spreads" },
      { to: "/tarot-card-meanings", label: "All Card Meanings" },
      { to: "/tarot-combinations", label: "Card Combinations" },
    ],
  },

  /* ───────────────── 9. REVERSALS IN A SPREAD ───────────────── */
  {
    slug: "how-to-read-reversals-in-a-spread",
    title: "How to Read Reversals in a Tarot Spread",
    h1: "How to Read Reversed Tarot Cards in a Spread",
    description:
      "Reversed tarot cards aren't simply 'bad.' Learn the main ways to read reversals — blocked, internal, or weakened energy — and how to interpret them within the context of a full spread.",
    snippet: {
      question: "How do you read reversed cards in a tarot spread?",
      answer:
        "A reversed tarot card usually means its energy is blocked, turned inward, delayed, or weakened rather than simply 'bad.' Read the upright meaning first, then ask how it's being internalised or resisted. In a spread, reversals add nuance — they show where energy is stuck or still developing.",
    },
    intro: [
      "Reversals intimidate beginners because they seem to double the memorisation. They don't. A reversed card is the same card with its energy turned a different way — and there are only a few ways it can turn.",
      "This guide gives you a simple framework for reading reversals and shows how they function inside a full spread.",
    ],
    sections: [
      {
        heading: "The main ways a card can be reversed",
        body: ["Start from the upright meaning, then pick the reversal mode that fits the question:"],
        list: [
          "Blocked — the upright energy is being resisted or prevented (Ace of Cups reversed: love that's held back).",
          "Internal — the energy is turned inward rather than expressed outward (Strength reversed: courage you feel but don't show).",
          "Delayed — the energy is coming but not yet (Eight of Wands reversed: momentum stalled, not cancelled).",
          "Excess or depletion — too much or too little of the card's quality (The Emperor reversed: control tipping into rigidity, or collapsing into none).",
        ],
      },
      {
        heading: "Read upright first, then turn it",
        body: [
          "Never memorise reversals as separate cards. Read the upright meaning, then ask which way it's turned given the position and question. This keeps your readings consistent and stops reversals from feeling like a second deck to learn.",
        ],
      },
      {
        heading: "Reversals in the context of a spread",
        body: [
          "A reversal's job changes with its position. A reversed card in 'obstacle' shows internalised resistance; in 'advice' it might mean 'ease off this energy' rather than 'do this.' And a spread heavy with reversals often signals a situation that's stuck, internal, or still forming — not yet ready for action.",
        ],
      },
      {
        heading: "You don't have to use reversals",
        body: [
          "Reading all cards upright is a legitimate approach — many skilled readers do. Reversals add nuance, not accuracy. Use them when they deepen the reading, skip them when they only add confusion. Either choice is valid as long as you're consistent.",
        ],
      },
    ],
    faq: [
      { q: "Does a reversed tarot card mean the opposite?", a: "Not usually. A reversal more often means the card's energy is blocked, internal, delayed, or excessive — not flipped to the opposite meaning." },
      { q: "How do I read a reversed card in a spread?", a: "Read the upright meaning first, then ask how it's turned — blocked, inward, delayed, or excessive — given the position and your question." },
      { q: "What does a spread full of reversals mean?", a: "It often signals a situation that's stuck, internal, or still forming — energy that isn't yet ready to express outwardly or move into action." },
      { q: "Do I have to read reversals?", a: "No. Reading all cards upright is a valid approach used by many experienced readers. Reversals add nuance, not accuracy." },
      { q: "Are reversed cards negative?", a: "Not inherently. Many reversals are neutral or even positive — a reversed 'difficult' card can mean a hard energy is fading or being released." },
    ],
    related: [
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
      { to: "/how-to-interpret-contradictory-tarot-cards", label: "Contradictory Cards" },
      { to: "/how-to-read-tarot-spreads", label: "How to Read Spreads" },
      { to: "/tarot-card-meanings", label: "All Card Meanings" },
    ],
  },

  /* ───────────────── 10. BEST SPREADS FOR LOVE/CAREER/CLARITY ───────────────── */
  {
    slug: "best-tarot-spreads-for-love-career-clarity",
    title: "Best Tarot Spreads for Love, Career & Clarity",
    h1: "The Best Tarot Spreads for Love, Career, and Clarity",
    description:
      "Which tarot spread should you use? A practical guide to choosing the right spread for love, career, decisions, and clarity — with the layouts that work best for each kind of question.",
    snippet: {
      question: "What is the best tarot spread for love and career questions?",
      answer:
        "For love, a you/the-other/the-connection three-card spread works best. For career, situation/challenge/advice gives the clearest direction. For decisions, lay option A / option B / what-to-weigh. For broad clarity, past/present/future or the Celtic Cross. Match the spread shape to the question's shape.",
    },
    intro: [
      "Choosing the wrong spread is a quiet cause of confusing readings. A ten-card Celtic Cross on a simple yes/no question buries the answer; a single card on a complex relationship undershoots it. The fix is to match the spread to the shape of your question.",
      "This guide pairs common question types with the spreads that read most clearly for them.",
    ],
    sections: [
      {
        heading: "For love and relationships",
        body: [
          "Relationships are about dynamics between people, so use a spread that shows both sides. A you / the other person / the connection three-card layout reveals where each person stands and what's actually happening between them. For deeper situations, add a 'what's blocking us' and 'where it's heading' to make a five-card relationship spread.",
        ],
      },
      {
        heading: "For career and work decisions",
        body: [
          "Career questions usually want direction, so a situation / challenge / advice spread is ideal — it names what's happening, what's in the way, and what to do. For a specific choice like staying or leaving, use a stay / go / what-you're-not-seeing layout.",
        ],
      },
      {
        heading: "For decisions between options",
        body: [
          "When you're weighing two paths, lay them side by side: option A / option B / the deciding factor. This shows the likely texture of each road plus the thing you should be weighting most. It's far clearer than asking the cards to just pick for you.",
        ],
      },
      {
        heading: "For broad clarity and overwhelm",
        body: [
          "When you don't even know the question, start with past / present / future to map the arc, or go to the Celtic Cross for a full picture. Big spreads are for big, unclear situations — not for simple questions that a few cards would answer better.",
        ],
      },
      {
        heading: "Match the spread to the question",
        body: [
          "The rule underneath all of this: the spread's shape should mirror the question's shape. Two options? Two-sided spread. One relationship? A spread that shows both people. Simple question? Few cards. Get the shape right and interpretation gets dramatically easier.",
        ],
      },
    ],
    faq: [
      { q: "What is the best tarot spread for love?", a: "A you / the other person / the connection three-card spread, because it shows both sides and the dynamic between them. Expand to five cards for deeper situations." },
      { q: "What is the best tarot spread for career questions?", a: "Situation / challenge / advice gives the clearest direction. For a stay-or-leave choice, use a stay / go / what-you're-not-seeing layout." },
      { q: "Which spread is best for making a decision?", a: "Lay option A / option B / the deciding factor side by side. It shows the texture of each path plus what to weight most heavily." },
      { q: "What spread should I use when I feel overwhelmed?", a: "Start with past / present / future to map the arc, or use the Celtic Cross for a full picture when the situation is large and unclear." },
      { q: "How do I choose the right tarot spread?", a: "Match the spread's shape to the question's shape — two options need a two-sided spread, a relationship needs a both-sides spread, and simple questions need fewer cards." },
    ],
    related: [
      { to: "/three-card-spread-love", label: "Three-Card Spread for Love" },
      { to: "/three-card-spread-career", label: "Three-Card Spread for Career" },
      { to: "/three-card-spread-decision-making", label: "Decision-Making Spread" },
      { to: "/tarot-spreads", label: "All Spread Guides" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter Tool" },
    ],
  },
];

export function getInterpretationGuide(slug: string): InterpretationGuide | undefined {
  return interpretationGuides.find((g) => g.slug === slug);
}
