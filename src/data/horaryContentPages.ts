/* ── Horary Astrology SEO Content Cluster ── */

export interface HoraryContentPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  type: "educational" | "question";
  intro: string[];
  sections: { heading: string; content: string }[];
  faq: { q: string; a: string }[];
  relatedSlugs: string[];
  showHoraryTool?: boolean;
}

export const horaryContentPages: HoraryContentPage[] = [
  /* ────────── EDUCATIONAL PAGES ────────── */
  {
    slug: "what-is-horary-astrology",
    title: "What Is Horary Astrology? — Complete Explanation",
    h1: "What Is Horary Astrology?",
    description:
      "Learn what horary astrology is, how it works, and why astrologers have used it for centuries to answer specific questions using the stars.",
    type: "educational",
    intro: [
      "Horary astrology is one of the oldest and most focused branches of astrology. Instead of using your birth chart, horary casts a chart for the exact moment you ask a question — and reads the answer from the positions of the planets at that instant.",
      "Think of it like taking a snapshot of the sky when your question forms in your mind. That snapshot holds the answer.",
    ],
    sections: [
      {
        heading: "The Core Idea Behind Horary",
        content:
          "The word 'horary' comes from the Latin 'hora,' meaning hour. The principle is simple: the moment a question is sincerely asked, the universe aligns to provide the answer. An astrologer casts a chart for that exact moment and location, then reads the planetary positions to find the response.",
      },
      {
        heading: "A Brief History",
        content:
          "Horary astrology has roots going back to the Hellenistic period and was refined by medieval Arabic astrologers. William Lilly, the famous 17th-century English astrologer, wrote extensively about horary in his work 'Christian Astrology,' which remains a foundational text today.",
      },
      {
        heading: "How It Differs from Natal Astrology",
        content:
          "Natal astrology describes who you are based on your birth chart. Horary astrology answers a specific question based on when you ask it. You don't need your birth time or birth place — only the time and place of the question itself.",
      },
      {
        heading: "When to Use Horary Astrology",
        content:
          "Horary works best when you have a clear, specific question with a definite outcome — like 'Will I get the job?', 'Should I move?', or 'Where are my lost keys?' Vague or hypothetical questions tend to produce unclear charts.",
      },
    ],
    faq: [
      { q: "What is horary astrology in simple terms?", a: "It's a way to answer a specific question by looking at where the planets are at the exact moment you ask the question." },
      { q: "Do I need my birth chart for horary?", a: "No. Horary uses the time and place of the question, not your birth data." },
      { q: "Is horary astrology accurate?", a: "Many astrologers consider horary one of the most precise forms of astrology because it focuses on one specific question at one specific moment." },
    ],
    relatedSlugs: ["how-horary-astrology-works", "horary-astrology-beginners-guide"],
  },
  {
    slug: "how-horary-astrology-works",
    title: "How Horary Astrology Works — Step by Step",
    h1: "How Horary Astrology Works",
    description:
      "Understand the step-by-step process of horary astrology — from asking the question to reading the chart and interpreting the answer.",
    type: "educational",
    intro: [
      "Horary astrology follows a clear, structured process. Once you understand the steps, you can appreciate how each element of the chart contributes to the answer.",
      "Here's how a horary reading unfolds from start to finish.",
    ],
    sections: [
      {
        heading: "Step 1: Formulate Your Question",
        content:
          "The most important step. Your question should be specific, sincere, and about something you genuinely need to know. Questions like 'Will I get the promotion at work?' are ideal. Questions like 'What does my future hold?' are too vague for horary.",
      },
      {
        heading: "Step 2: Record the Time and Place",
        content:
          "The chart is cast for the exact moment and location where the question is asked. This is why horary readings capture the current time and your location — every minute and every degree of longitude matters.",
      },
      {
        heading: "Step 3: Cast the Horary Chart",
        content:
          "Using the time and coordinates, the astrologer calculates the positions of all planets, the Ascendant (rising sign), and the twelve houses. The Ascendant sign represents you, the querent.",
      },
      {
        heading: "Step 4: Identify the Significators",
        content:
          "The planet that rules the Ascendant represents you. The planet that rules the house connected to your question represents the thing you're asking about. For example, the 7th house ruler represents a partner, the 10th house ruler represents your career.",
      },
      {
        heading: "Step 5: Analyze the Aspects",
        content:
          "The astrologer looks at the aspects (angles) between the significator planets. An applying trine or sextile between them often suggests a positive outcome. A square or opposition may indicate obstacles. No aspect at all can mean nothing will happen.",
      },
      {
        heading: "Step 6: Read the Moon",
        content:
          "The Moon is always a co-significator in horary. Its last aspect shows what just happened, and its next aspect shows what's coming. A void-of-course Moon (making no aspects before leaving its sign) often means 'nothing will come of this matter.'",
      },
    ],
    faq: [
      { q: "How long does a horary reading take?", a: "Casting the chart takes seconds. A thoughtful interpretation typically takes a few minutes." },
      { q: "Can I ask a horary question at any time?", a: "Yes, but the question should arise naturally. Asking the same question repeatedly or testing the method weakens the chart's clarity." },
      { q: "What if the chart shows a negative answer?", a: "A horary chart describes the current trajectory. It shows what is likely to happen if things continue on their current path — but you always have the power to make different choices." },
    ],
    relatedSlugs: ["what-is-horary-astrology", "how-to-read-a-horary-chart"],
  },
  {
    slug: "how-to-read-a-horary-chart",
    title: "How to Read a Horary Chart — Practical Guide",
    h1: "How to Read a Horary Chart",
    description:
      "Learn how to read and interpret a horary astrology chart. Understand houses, significators, aspects, and the Moon's role in answering your question.",
    type: "educational",
    intro: [
      "Reading a horary chart is like solving a puzzle. Each piece — the Ascendant, the houses, the planets, and their aspects — contributes to the answer.",
      "This guide walks you through the key elements you need to understand when looking at a horary chart.",
    ],
    sections: [
      {
        heading: "The Ascendant and Your Significator",
        content:
          "The Ascendant (the sign rising on the eastern horizon) represents you, the person asking. The planet that rules this sign is your significator. For example, if Aries is rising, Mars represents you.",
      },
      {
        heading: "The Houses and Your Question",
        content:
          "Each of the 12 houses governs a different area of life. The 1st house is you, the 7th is relationships and partners, the 10th is career and reputation, the 4th is home, the 2nd is money, and so on. The house connected to your question's topic holds the key.",
      },
      {
        heading: "Aspects: The Conversation Between Planets",
        content:
          "Aspects are the angles planets make to each other. Trines (120°) and sextiles (60°) are harmonious and suggest easy progress. Squares (90°) show tension and obstacles. Conjunctions (0°) are powerful meetings. Oppositions (180°) show two sides pulling apart.",
      },
      {
        heading: "The Moon's Story",
        content:
          "The Moon moves quickly and tells the story of how events unfold. Check what sign the Moon is in, what aspects it has already made (past events), and what aspects it will make next (upcoming events). The Moon is your timeline.",
      },
      {
        heading: "Reception and Dignity",
        content:
          "If two significator planets are in each other's signs (mutual reception), there's cooperation and willingness. If a planet is in its own sign or exaltation, it's strong and capable. If it's in detriment or fall, it's weakened or struggling.",
      },
    ],
    faq: [
      { q: "What does it mean if my significator is retrograde?", a: "A retrograde significator can suggest delays, reconsideration, or the querent changing their mind about the matter." },
      { q: "What is a void-of-course Moon in horary?", a: "When the Moon makes no more aspects before leaving its current sign, it's void-of-course. This usually means nothing significant will happen regarding the question." },
      { q: "Do I need to know astrology to get a horary reading?", a: "Not at all. Our tool interprets the chart for you in plain, everyday language." },
    ],
    relatedSlugs: ["how-horary-astrology-works", "horary-astrology-beginners-guide"],
  },
  {
    slug: "horary-astrology-beginners-guide",
    title: "Horary Astrology Beginner's Guide — Start Here",
    h1: "Beginner's Guide to Horary Astrology",
    description:
      "New to horary astrology? This beginner-friendly guide explains everything you need to know to ask your first horary question and understand the answer.",
    type: "educational",
    intro: [
      "If you're curious about horary astrology but don't know where to start, you're in the right place. This guide breaks everything down in simple, easy-to-follow language.",
      "By the end, you'll understand how horary works and feel confident asking your first question.",
    ],
    sections: [
      {
        heading: "What Makes Horary Special",
        content:
          "Unlike other forms of astrology that require your exact birth time, horary only needs the moment you ask your question. This makes it accessible to everyone — no birth certificate needed.",
      },
      {
        heading: "How to Ask a Good Horary Question",
        content:
          "The best horary questions are specific and sincere. Instead of 'What will happen in my love life?', try 'Will the person I met last week ask me on a date?' The clearer your question, the clearer the chart's answer.",
      },
      {
        heading: "Understanding the Answer",
        content:
          "A horary reading identifies the planets that represent you and the subject of your question, then looks at how those planets relate to each other. If they're forming a positive connection, that's encouraging. If they're separating or blocked, it may suggest challenges.",
      },
      {
        heading: "Common Beginner Mistakes",
        content:
          "Asking the same question multiple times dilutes the chart's power. Asking hypothetical questions ('What if I applied?') doesn't give clear results. And testing horary with questions you already know the answer to defeats the purpose.",
      },
      {
        heading: "Your First Horary Reading",
        content:
          "Ready to try? Think of a question that's been on your mind — something you genuinely want to know. Focus on it clearly, then use our horary reading tool below. The chart will be calculated for this exact moment.",
      },
    ],
    faq: [
      { q: "Is horary astrology free to try?", a: "Yes! Our horary reading tool is completely free. Just enter your question and location, and we'll generate your chart and interpretation." },
      { q: "Can beginners understand horary charts?", a: "Absolutely. Our tool provides interpretations in plain language so you don't need any astrology background." },
      { q: "How is horary different from tarot?", a: "Tarot uses cards drawn randomly to provide symbolic insight. Horary uses the actual positions of planets at the moment of your question for a precise astronomical reading." },
    ],
    relatedSlugs: ["what-is-horary-astrology", "how-to-read-a-horary-chart"],
    showHoraryTool: true,
  },

  /* ────────── QUESTION-BASED PAGES ────────── */
  {
    slug: "horary-astrology-will-i-get-the-job",
    title: "Will I Get the Job? — Horary Astrology Reading",
    h1: "Will I Get the Job? — Horary Astrology",
    description:
      "Use horary astrology to find out if you'll get the job. Learn how the chart answers career questions and try a free horary reading.",
    type: "question",
    intro: [
      "'Will I get the job?' is one of the most common horary astrology questions — and one of the clearest to answer. The chart looks at the relationship between you (1st house) and the job (10th house) to reveal the likely outcome.",
      "Career questions work especially well in horary because they have a definite outcome: you either get the job or you don't.",
    ],
    sections: [
      {
        heading: "How Horary Answers Career Questions",
        content:
          "In a horary chart about getting a job, the 1st house and its ruler represent you. The 10th house and its ruler represent the job or career opportunity. If the rulers of these houses are forming a positive aspect (trine, sextile, or conjunction), the chart favors you getting the position.",
      },
      {
        heading: "What a Positive Chart Looks Like",
        content:
          "A strong indicator is when your significator and the 10th house ruler are applying to a trine or conjunction. If there's mutual reception (each planet is in the other's sign), it means both you and the employer want the same thing. The Moon applying to the 10th house ruler also supports a positive outcome.",
      },
      {
        heading: "What a Challenging Chart Looks Like",
        content:
          "If the significators are separating rather than applying, the opportunity may have already passed. A square between them suggests obstacles. If a third planet interrupts the aspect (called 'prohibition'), someone or something may block the outcome.",
      },
      {
        heading: "Example Interpretation",
        content:
          "Imagine Virgo rising with Mercury (your significator) at 15° Gemini applying a trine to Saturn (10th house ruler) at 18° Aquarius. The aspect is applying and harmonious — the chart suggests you'll likely get the job, and the process may feel smooth and natural.",
      },
    ],
    faq: [
      { q: "Can horary tell me when I'll hear back about the job?", a: "Yes. The number of degrees before the aspect completes can suggest timing — each degree might represent days, weeks, or months depending on the signs involved." },
      { q: "What if the chart says I won't get the job?", a: "The chart describes the current trajectory. It doesn't mean you're powerless — it means you might want to prepare alternatives or improve your approach." },
      { q: "Can I ask about a specific job interview?", a: "Absolutely. The more specific your question, the clearer the horary chart reads." },
    ],
    relatedSlugs: ["horary-astrology-career-question", "horary-astrology-will-i-get-married"],
    showHoraryTool: true,
  },
  {
    slug: "horary-astrology-will-my-ex-come-back",
    title: "Will My Ex Come Back? — Horary Astrology Reading",
    h1: "Will My Ex Come Back? — Horary Astrology",
    description:
      "Ask horary astrology if your ex will return. Understand how the chart reads relationship questions and try a free horary reading.",
    type: "question",
    intro: [
      "Wondering if your ex will come back is one of the most emotionally charged horary questions. The chart examines the connection between you and your former partner through the 1st and 7th houses.",
      "Horary doesn't judge your feelings — it simply reads the current planetary alignments to show what's likely to happen.",
    ],
    sections: [
      {
        heading: "The 1st and 7th Houses in Relationship Questions",
        content:
          "In horary, the 1st house represents you and the 7th house represents your partner or ex-partner. The rulers of these houses become the key significators. The chart looks at whether these planets are moving toward each other (applying aspect) or moving apart (separating).",
      },
      {
        heading: "Signs Your Ex May Return",
        content:
          "If your significator and the 7th house ruler are applying to a conjunction, trine, or sextile, it suggests reconnection. Mutual reception between the two planets means there's mutual interest. The Moon translating light between the two significators can also bring them together.",
      },
      {
        heading: "Signs They May Not Return",
        content:
          "If the significators are separating and making no new aspects, the connection is fading. If one planet is in the sign of its detriment, that person may feel uncomfortable or disinterested. A void-of-course Moon suggests nothing will change.",
      },
      {
        heading: "A Word of Wisdom",
        content:
          "Whether or not your ex returns, horary can also reveal what you need emotionally. Sometimes the chart shows that moving forward is the healthier path, even when the heart wants to go back.",
      },
    ],
    faq: [
      { q: "Can horary tell me if my ex still has feelings?", a: "Yes. If the 7th house ruler is in a sign ruled by your significator or making a positive aspect to it, there may still be emotional connection." },
      { q: "What if I'm not sure I want them back?", a: "The chart will show the current dynamic. You can use the information to make your own decision with more clarity." },
      { q: "How soon could they come back?", a: "Timing in horary is read through the degrees between applying aspects. The sign type (cardinal, fixed, mutable) helps determine whether that's days, weeks, or months." },
    ],
    relatedSlugs: ["horary-astrology-will-i-get-married", "horary-astrology-will-i-get-the-job"],
    showHoraryTool: true,
  },
  {
    slug: "horary-astrology-will-i-get-married",
    title: "Will I Get Married? — Horary Astrology Reading",
    h1: "Will I Get Married? — Horary Astrology",
    description:
      "Use horary astrology to explore whether marriage is in your future. Learn how the chart interprets marriage questions and try a free reading.",
    type: "question",
    intro: [
      "'Will I get married?' is a timeless question that horary astrology is well-equipped to answer. The chart focuses on the 1st house (you) and the 7th house (marriage and committed partnership).",
      "Marriage questions often reveal not just whether it will happen, but the emotional dynamics and timing surrounding it.",
    ],
    sections: [
      {
        heading: "Marriage in the Horary Chart",
        content:
          "The 7th house is the traditional house of marriage. Its ruler represents your potential spouse or the concept of marriage itself. A strong, dignified 7th house ruler applying to your significator is the clearest positive sign.",
      },
      {
        heading: "Positive Indicators for Marriage",
        content:
          "Venus or Jupiter involved in positive aspects to your significator are classic marriage indicators. The Moon applying to the 7th house ruler suggests things are moving in that direction. The Part of Marriage falling in a favorable position adds further confirmation.",
      },
      {
        heading: "Potential Delays or Obstacles",
        content:
          "Saturn aspecting the significators can delay marriage without necessarily denying it. A retrograde 7th house ruler may mean a return to a past relationship before marriage happens. No aspect between the significators suggests marriage isn't on the immediate horizon.",
      },
      {
        heading: "Timing of Marriage",
        content:
          "The degrees between applying aspects give timing clues. If your significator applies to the 7th house ruler at 5 degrees in a cardinal sign, it might suggest roughly 5 weeks or 5 months. The specific sign modality refines this further.",
      },
    ],
    faq: [
      { q: "Can horary predict who I will marry?", a: "Horary can describe characteristics of a future partner through the 7th house ruler's sign and condition, but it won't name a specific person." },
      { q: "What if I'm already in a relationship?", a: "You can ask specifically 'Will my current partner and I get married?' and the chart will address that relationship directly." },
      { q: "Does a negative chart mean I'll never get married?", a: "No. Horary answers based on the current moment and trajectory. Circumstances change, and a chart cast at a different time may show a different picture." },
    ],
    relatedSlugs: ["horary-astrology-will-my-ex-come-back", "horary-astrology-career-question"],
    showHoraryTool: true,
  },
  {
    slug: "horary-astrology-career-question",
    title: "Horary Astrology Career Questions — Ask the Stars",
    h1: "Horary Astrology for Career Questions",
    description:
      "Explore how horary astrology answers career questions. Learn which houses and planets reveal job prospects, promotions, and professional changes.",
    type: "question",
    intro: [
      "Career is one of the strongest topics for horary astrology. Whether you're asking about a new job, a promotion, starting a business, or a career change, the horary chart provides focused insight.",
      "Career questions are ideal for horary because they typically have clear outcomes and timelines.",
    ],
    sections: [
      {
        heading: "Key Houses for Career Questions",
        content:
          "The 10th house rules career, reputation, and professional standing. The 6th house governs your daily work and job conditions. The 2nd house represents income and financial reward. Together, these houses paint the full career picture.",
      },
      {
        heading: "Asking About a Promotion",
        content:
          "For promotion questions, look at whether your significator (1st house ruler) is applying to the 10th house ruler in a positive aspect. Jupiter or the Sun connecting to your significator are encouraging signs of advancement and recognition.",
      },
      {
        heading: "Starting a Business",
        content:
          "Business questions involve the 1st house (you), the 10th house (the venture's reputation), and the 2nd house (its profitability). Strong connections between these house rulers suggest the business could succeed. A debilitated 10th house ruler warns of challenges.",
      },
      {
        heading: "Changing Careers",
        content:
          "If you're considering a career change, the chart can show whether the new path (10th house) is welcoming and whether leaving the current situation (4th house, as the end of the matter) leads to improvement.",
      },
    ],
    faq: [
      { q: "Can horary tell me which career is right for me?", a: "Horary works best with specific questions. Instead of 'What career should I choose?', try 'Will this specific opportunity work out for me?'" },
      { q: "When will I get a new job?", a: "Timing in horary is estimated through the degrees between applying aspects. The element and modality of the signs involved help determine the time scale." },
      { q: "Can I ask about my boss or coworkers?", a: "Yes. The 10th house can represent your boss, and the 6th house represents coworkers. The chart can reveal dynamics with specific people in your professional life." },
    ],
    relatedSlugs: ["horary-astrology-will-i-get-the-job", "horary-astrology-will-i-get-married"],
    showHoraryTool: true,
  },
];
