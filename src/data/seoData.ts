import { tarotDeck } from "./tarotDeck";
import { cardCombinations } from "./tarotCombinations";
import { elderFuthark } from "./runes";

const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

/* ── Question-based reading pages ── */
export interface ContentSection {
  heading: string;
  body: string[];
}

export interface QuestionPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  topic: "love" | "career" | "decision" | "money" | "growth";
  intro: string[];
  sections?: ContentSection[];
  faq: { q: string; a: string }[];
  relatedSlugs: string[];
}

export const questionPages: QuestionPage[] = [
  {
    slug: "love-tarot-reading",
    title: "Free Love Tarot Reading",
    h1: "Love Tarot Reading — What Do the Cards Say About Your Heart?",
    description: "Get a free love tarot reading. Discover what the cards reveal about your romantic life, relationships, and emotional connections.",
    topic: "love",
    intro: [
      "Love tarot readings focus specifically on matters of the heart — romantic relationships, emotional connections, attraction, and partnership dynamics.",
      "When you ask the tarot about love, the cards speak through the language of emotion, attachment, and vulnerability. Cups cards carry particular weight in love readings, while Major Arcana cards like The Lovers, The Empress, and The Moon reveal deeper soul-level patterns.",
      "Whether you're in a relationship, seeking one, or navigating a breakup, a love tarot reading provides insight into the emotional currents shaping your romantic life."
    ],
    sections: [
      {
        heading: "Why People Turn to Love Tarot Readings",
        body: [
          "Love is the area where we feel most vulnerable, and that vulnerability makes it the hardest to see clearly. We project, we hope, we fear — and tarot cuts through all of it. A love reading doesn't tell you what you want to hear. It shows you what's actually happening beneath the surface.",
          "Most people come to love tarot at a crossroads: a new attraction that feels significant, a relationship that's lost its spark, or a breakup they can't stop replaying. The cards don't judge any of these situations. They simply reflect the emotional reality you're living in.",
          "What makes tarot particularly effective for love questions is its ability to show dynamics between two people — not just your feelings, but the energy between you and the person you're asking about."
        ]
      },
      {
        heading: "Key Cards in a Love Tarot Reading",
        body: [
          "The Cups suit is the emotional heart of the tarot deck. The Ace of Cups signals a fresh wave of feeling — new love, renewed affection, or emotional openness you haven't felt in a while. The Two of Cups is the classic mutual attraction card, showing two people meeting as equals.",
          "Among the Major Arcana, The Lovers is the most obvious love indicator, but it's more about choice than romance. It asks: are you choosing this person consciously, or are you on autopilot? The Empress brings warmth, sensuality, and nurturing energy — she often appears when a relationship is ready to deepen.",
          "Watch for The Moon in love readings. It reveals confusion, illusions, or something hidden. If this card shows up, there's a truth you're not seeing yet — and it's worth paying attention."
        ]
      },
      {
        heading: "How to Ask Effective Love Questions",
        body: [
          "The quality of your question determines the quality of your reading. Avoid vague questions like 'What about my love life?' Instead, try: 'What energy surrounds my connection with [name]?' or 'What do I need to understand about my pattern in relationships?'",
          "Questions that focus on your own agency get the clearest answers. 'What can I do to attract a healthy relationship?' is more powerful than 'When will I find love?' because it puts you in the active role.",
          "If you're asking about a specific person, be honest about what you actually want to know. The cards respond to the real question, not the one you're comfortable asking out loud."
        ]
      },
      {
        heading: "What Your Love Reading Can (and Can't) Tell You",
        body: [
          "A love tarot reading reveals emotional patterns, relational dynamics, and the energy surrounding your romantic life. It can show you blind spots — the fear of commitment you're not acknowledging, the red flags you've been ignoring, or the self-worth issue that keeps attracting the wrong partners.",
          "What tarot cannot do is tell you exactly who you'll marry or give you a date when love will arrive. Anyone who promises that is misrepresenting how tarot works. The cards illuminate potential, not certainty.",
          "The most valuable love readings leave you with clarity about yourself. When you understand your own emotional patterns, you naturally make better choices in love — and that's where real change happens."
        ]
      }
    ],
    faq: [
      { q: "Can tarot predict who I will marry?", a: "Tarot doesn't predict specific people but reveals emotional patterns, timing, and the energy surrounding your love life. It helps you understand what you attract and why." },
      { q: "What cards indicate love in a tarot reading?", a: "The Lovers, Two of Cups, Ace of Cups, Ten of Cups, and The Empress are among the strongest love indicators in tarot." },
      { q: "How accurate are love tarot readings?", a: "Love readings are most accurate when they reflect your emotional truth. They work best as a mirror for self-awareness rather than as predictive tools." },
      { q: "How often should I do a love tarot reading?", a: "Once a month is ideal for tracking emotional shifts. Reading too frequently about the same question can create anxiety rather than clarity." },
      { q: "Can I do a love reading about someone who doesn't know?", a: "Yes, but the reading will reflect the energy between you rather than the other person's private thoughts. Respect their autonomy in how you interpret the cards." }
    ],
    relatedSlugs: ["will-my-ex-come-back-tarot", "will-my-relationship-improve-tarot", "soulmate-tarot-reading"]
  },
  {
    slug: "will-my-ex-come-back-tarot",
    title: "Will My Ex Come Back? Tarot Reading",
    h1: "Will My Ex Come Back? — Free Tarot Reading",
    description: "Free tarot reading to explore whether your ex may return. Understand the energies surrounding your past relationship and what the cards suggest.",
    topic: "love",
    intro: [
      "One of the most common questions asked of tarot is whether a former partner will return. The cards don't give simple yes-or-no answers to complex emotional questions — instead, they illuminate the energies, patterns, and lessons at play.",
      "Cards like The Wheel of Fortune suggest cycles and returns, while Death and The Tower may indicate that the chapter has truly closed. The Six of Cups often points to nostalgia and past connections resurfacing.",
      "Rather than fixating on a specific outcome, allow the reading to show you what you need to understand about this connection and your own emotional growth."
    ],
    sections: [
      {
        heading: "Why You're Still Thinking About Your Ex",
        body: [
          "The question isn't really 'will they come back?' — it's 'why can't I let go?' And that's what tarot answers honestly. Breakups leave emotional residue, and the cards show you exactly where it's stuck.",
          "Sometimes the attachment is about the person. More often, it's about what they represented — security, validation, a version of yourself you liked. Understanding the difference changes everything about how you move forward.",
          "Tarot reads energy, not destiny. If you're constantly pulling cards about an ex, the deck is mirroring your fixation more than their intentions. The most useful readings shift the focus from 'will they?' to 'should I?'"
        ]
      },
      {
        heading: "Cards That Suggest Reconnection — and Cards That Don't",
        body: [
          "The Six of Cups is the strongest 'past returning' card. It signals nostalgia, old feelings resurfacing, and childhood or early connections coming back around. When paired with The Wheel of Fortune, it suggests the cycle isn't complete yet.",
          "Judgement is a card of second chances and reckoning — it often appears when both people need to confront truths before reconnecting. The Star suggests hope, but only if genuine healing has happened first.",
          "On the other side, Death is unambiguous: this chapter is over, and transformation requires releasing it. The Tower means whatever reunion you're imagining would collapse anyway. The Three of Swords followed by the Ace of Swords suggests painful clarity — it hurt, but now you see clearly."
        ]
      },
      {
        heading: "How to Get an Honest Reading About Your Ex",
        body: [
          "The biggest obstacle to an accurate ex reading is emotional bias. When you desperately want a specific answer, you'll unconsciously interpret every card to match your hope. That's not the cards being wrong — it's you not being ready to hear them.",
          "Ask specific, neutral questions: 'What energy remains between me and [name]?' is better than 'Will they text me this week?' One invites insight; the other invites disappointment.",
          "Consider doing the reading when you're in a calm state, not during a 2 AM spiral. The cards respond to the energy you bring to the session. Desperation gets confused readings. Genuine curiosity gets honest ones."
        ]
      },
      {
        heading: "Moving Forward — Whether They Return or Not",
        body: [
          "The most empowering ex readings are the ones that set you free. When tarot shows you the pattern — the codependency, the fear of being alone, the idealization of someone who wasn't right — it breaks the spell.",
          "If the cards suggest the connection has life left, they're also showing you what needs to change before it can work. Going back to the same dynamic produces the same result. Growth has to happen first.",
          "If the cards say it's over, they're making space for something that actually fits. Every card reader has watched clients desperately seek reunion readings, only to return months later grateful the ex didn't come back because something better arrived."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards mean my ex will come back?", a: "The Six of Cups (nostalgia), Wheel of Fortune (cycles), Judgement (second chances), and The Star (renewed hope) may suggest reconnection — but always in context with surrounding cards." },
      { q: "Should I do a tarot reading about my ex?", a: "A reading can provide clarity and closure, but approach it seeking understanding rather than a specific answer. The most helpful readings focus on your own growth." },
      { q: "How long should I wait after a breakup to do a reading?", a: "Give yourself at least a week for the initial emotional wave to settle. Readings done from genuine curiosity are far more accurate than those driven by raw pain." },
      { q: "What if the cards keep showing my ex coming back?", a: "Repeated cards may reflect your energy and desire rather than their actions. Try asking what you need to focus on for yourself, and see if the cards shift." }
    ],
    relatedSlugs: ["love-tarot-reading", "will-my-relationship-improve-tarot", "breakup-tarot-reading"]
  },
  {
    slug: "will-my-relationship-improve-tarot",
    title: "Will My Relationship Improve? Tarot",
    h1: "Will My Relationship Improve? — Tarot Card Reading",
    description: "Free tarot reading about your relationship's future. Discover what the cards reveal about your partnership's trajectory and potential for growth.",
    topic: "love",
    intro: [
      "Relationships move through seasons — and tarot can illuminate where yours currently stands and where it may be heading.",
      "Cards like Temperance and the Two of Cups suggest harmony and balance, while the Five of Cups or Three of Swords may point to unresolved grief that needs healing before progress can occur.",
      "The most powerful relationship readings don't just predict outcomes — they reveal the dynamics, communication patterns, and emotional needs that shape your partnership."
    ],
    faq: [
      { q: "What tarot cards indicate a relationship improving?", a: "The Star (hope and healing), Temperance (balance), Two of Cups (partnership), and The Sun (joy) are strong indicators of positive relationship development." },
      { q: "Can tarot save a relationship?", a: "Tarot can't save a relationship directly, but it can reveal blind spots, communication blocks, and areas where both partners can grow — which can be the catalyst for positive change." }
    ],
    relatedSlugs: ["love-tarot-reading", "soulmate-tarot-reading"]
  },
  {
    slug: "soulmate-tarot-reading",
    title: "Soulmate Tarot Reading — Free",
    h1: "Soulmate Tarot Reading — Is Your Soulmate Near?",
    description: "Free soulmate tarot reading. Explore what the cards reveal about soul connections, twin flames, and the energy of deep partnership.",
    topic: "love",
    intro: [
      "A soulmate reading goes beyond surface-level romance to explore the deeper spiritual connections in your life. These readings examine karmic bonds, twin flame energy, and the soul lessons embedded in your closest relationships.",
      "The Lovers, The World, and the Two of Cups are among the strongest soulmate indicators in tarot. When these cards appear alongside Major Arcana cards, they often signal a connection that transcends the ordinary.",
      "Remember that soulmates aren't always romantic partners — they can be friends, family, or mentors who appear at pivotal moments to catalyze your spiritual growth."
    ],
    sections: [
      {
        heading: "What a Soulmate Really Means in Tarot",
        body: [
          "Pop culture sells soulmates as effortless perfection — the person who completes you. Tarot tells a different story. In the cards, soulmate connections are often intense, challenging, and deeply transformative. They don't always feel comfortable.",
          "A soulmate is someone whose energy accelerates your growth. The Two of Cups shows two people meeting at an equal depth. The World suggests a relationship that feels fated or karmically complete. But The Tower can also appear in soulmate readings — because some soul connections blow your old life apart to make room for something real.",
          "The distinction between a soulmate and someone you're simply attached to matters. Tarot can show you which one you're dealing with by revealing the quality of the connection's energy, not just its intensity."
        ]
      },
      {
        heading: "Signs Your Reading Points to a Soul Connection",
        body: [
          "Multiple Major Arcana cards in a relationship reading suggest something bigger than ordinary romance. When The Lovers, Judgement, and The World appear together, you're looking at a connection with spiritual significance.",
          "The Six of Cups paired with the Ace of Cups suggests a past-life connection re-emerging in present time. It's that feeling of already knowing someone — tarot confirms it's not just your imagination.",
          "Pay attention to the Temperance card. Unlike the dramatic passion of The Tower or The Devil, Temperance shows a connection built on genuine harmony and mutual understanding. This is the soulmate energy that actually lasts."
        ]
      },
      {
        heading: "Preparing Yourself to Attract a Soulmate",
        body: [
          "The most consistent pattern in soulmate readings is this: the person who keeps asking 'where is my soulmate?' often gets cards about self-work. The Hermit. Strength. The High Priestess. The cards are saying: your soulmate will arrive when you've done the inner work to recognize them.",
          "Tarot frequently shows that we miss soulmate connections because we're looking for the wrong things — physical attraction, financial security, someone who fits our checklist. Soulmates rarely match the picture in your head. They match the need in your soul.",
          "If your reading keeps pointing inward, trust that. The cards aren't stalling. They're building the foundation that will allow you to sustain a soul-level connection when it arrives."
        ]
      }
    ],
    faq: [
      { q: "What tarot card represents a soulmate?", a: "The Lovers (VI) most directly represents soulmate energy, along with the Two of Cups for mutual soul connection and The World for destined completeness." },
      { q: "Can tarot tell me when I'll meet my soulmate?", a: "Tarot can suggest timing through suit associations — Wands indicate weeks, Cups suggest months — but the most valuable insight comes from understanding what you need to cultivate within yourself to attract this connection." },
      { q: "What's the difference between a soulmate and a twin flame?", a: "Soulmates bring harmony and growth. Twin flames mirror you intensely — including your shadow. Both are soul connections, but twin flames tend to be more turbulent and transformative." },
      { q: "Can you have more than one soulmate?", a: "Yes. Tarot recognizes multiple soul connections across a lifetime. Different soulmates serve different purposes — some teach, some heal, some stay." }
    ],
    relatedSlugs: ["love-tarot-reading", "will-my-relationship-improve-tarot", "twin-flame-tarot-reading"]
  },
  {
    slug: "career-tarot-reading",
    title: "Free Career Tarot Reading",
    h1: "Career Tarot Reading — What's Next in Your Professional Life?",
    description: "Get a free career tarot reading. Explore what the cards reveal about your professional path, opportunities, and workplace dynamics.",
    topic: "career",
    intro: [
      "Career tarot readings focus on your professional life — job opportunities, workplace dynamics, leadership challenges, and the trajectory of your career path.",
      "Pentacles cards carry special significance in career readings, representing material achievement, financial stability, and practical progress. The Emperor, The Magician, and the Three of Pentacles often indicate professional mastery and recognition.",
      "Whether you're considering a career change, seeking a promotion, or navigating workplace challenges, a career tarot reading provides perspective on the energies shaping your professional journey."
    ],
    faq: [
      { q: "Can tarot help with career decisions?", a: "Tarot provides insight into the energies and patterns affecting your career. It can reveal hidden opportunities, potential obstacles, and the inner motivations driving your professional choices." },
      { q: "What tarot cards indicate career success?", a: "The Sun, Six of Wands (victory), Ace of Pentacles (new opportunity), Three of Pentacles (mastery), and The Emperor (leadership) are strong career success indicators." }
    ],
    relatedSlugs: ["should-i-change-careers-tarot", "will-i-get-the-job-tarot"]
  },
  {
    slug: "should-i-change-careers-tarot",
    title: "Should I Change Careers? Tarot Reading",
    h1: "Should I Change Careers? — Free Tarot Reading",
    description: "Free tarot reading for career change decisions. Discover what the cards suggest about changing your professional direction.",
    topic: "career",
    intro: [
      "Standing at a career crossroads is one of life's most significant moments. Tarot can illuminate the energies surrounding your decision — not by telling you what to do, but by revealing what you may not be seeing.",
      "The Wheel of Fortune suggests that change is inevitable and may be favorable. Death indicates a necessary professional transformation. The Fool invites you to take a brave leap into the unknown.",
      "Pay attention to whether your reading is dominated by Pentacles (material security concerns), Wands (passion and creative drive), or Swords (mental clarity about the decision)."
    ],
    faq: [
      { q: "What tarot cards suggest I should change careers?", a: "Death (transformation), The Fool (new beginnings), Ace of Wands (new creative path), and The Tower (necessary upheaval) often appear when career change is aligned with your path." },
      { q: "Is it safe to make career decisions based on tarot?", a: "Use tarot as one of many inputs in your decision-making process. The cards highlight patterns and blind spots — combine their insights with practical research and trusted advice." }
    ],
    relatedSlugs: ["career-tarot-reading", "will-i-get-the-job-tarot"]
  },
  {
    slug: "will-i-get-the-job-tarot",
    title: "Will I Get the Job? Tarot Reading",
    h1: "Will I Get the Job? — Free Tarot Reading",
    description: "Free tarot reading about job prospects. Explore what the cards say about your chances and what energy to bring to the process.",
    topic: "career",
    intro: [
      "Waiting to hear back about a job can be nerve-wracking. Tarot can offer insight into the energies surrounding your application and what you can do to strengthen your position.",
      "The Ace of Pentacles suggests new material opportunity is close. The Three of Pentacles indicates that your skills are being recognized. The Six of Wands promises victory and public recognition.",
      "Even if the cards suggest challenges ahead, remember that each interview and application is a stepping stone. The reading's greatest value lies in helping you understand what energy to bring to the process."
    ],
    faq: [
      { q: "What tarot cards mean I'll get the job?", a: "Ace of Pentacles (new opportunity), Six of Wands (success), The Sun (positive outcome), and The World (achievement) are among the most positive indicators for job prospects." },
      { q: "What if the tarot says I won't get the job?", a: "Challenging cards don't mean failure — they may suggest timing isn't right, or that a better opportunity awaits. Use the reading's guidance to strengthen your approach." }
    ],
    relatedSlugs: ["career-tarot-reading", "should-i-change-careers-tarot"]
  },
  {
    slug: "money-tarot-reading",
    title: "Free Money & Finance Tarot Reading",
    h1: "Money Tarot Reading — Financial Guidance from the Cards",
    description: "Free money tarot reading. Discover what the cards reveal about your financial situation, abundance potential, and material well-being.",
    topic: "money",
    intro: [
      "Money tarot readings focus on your relationship with abundance, financial decisions, and material well-being. The Pentacles suit is central to financial readings, representing earth energy, practicality, and material resources.",
      "The Ace of Pentacles signals new financial opportunity, while the Ten of Pentacles represents lasting wealth and family prosperity. The Nine of Pentacles embodies self-made abundance and financial independence.",
      "Remember that tarot reads energy, not bank balances. These readings are most valuable when they reveal your relationship with money — your fears, hopes, and the patterns that shape your financial life."
    ],
    faq: [
      { q: "Can tarot predict financial outcomes?", a: "Tarot reveals the energies and patterns surrounding your finances rather than specific monetary outcomes. It can highlight opportunities, warn of potential pitfalls, and suggest shifts in mindset." },
      { q: "What tarot cards indicate money coming in?", a: "Ace of Pentacles, Nine of Pentacles, Ten of Pentacles, The Empress, and The Sun are strong indicators of financial abundance and incoming resources." }
    ],
    relatedSlugs: ["career-tarot-reading", "should-i-change-careers-tarot"]
  },
  {
    slug: "personal-growth-tarot-reading",
    title: "Personal Growth Tarot Reading — Free",
    h1: "Personal Growth Tarot Reading — What Is Your Soul Learning?",
    description: "Free personal growth tarot reading. Explore what the cards reveal about your spiritual development, inner journey, and life lessons.",
    topic: "growth",
    intro: [
      "Personal growth tarot readings focus on your inner journey — the spiritual lessons, emotional patterns, and transformative experiences that shape who you are becoming.",
      "The Major Arcana cards carry special weight in growth readings, as each one represents a stage of The Fool's Journey — the archetypal path of spiritual awakening. The Hermit invites introspection, Death signals transformation, and The Star promises renewal.",
      "These readings are most powerful when approached with openness and honest self-reflection. The cards mirror your inner landscape, helping you see patterns that may be invisible from within."
    ],
    faq: [
      { q: "How can tarot help with personal growth?", a: "Tarot acts as a mirror for self-reflection, revealing unconscious patterns, emotional blind spots, and untapped potential. Regular readings create a practice of intentional self-awareness." },
      { q: "What tarot cards indicate spiritual growth?", a: "The Hermit, The Star, The High Priestess, Judgement, and The World are among the strongest indicators of spiritual awakening and personal evolution." }
    ],
    relatedSlugs: ["love-tarot-reading", "career-tarot-reading"]
  },
  {
    slug: "yes-or-no-tarot",
    title: "Yes or No Tarot Reading — Free",
    h1: "Yes or No Tarot Reading — Get a Clear Answer",
    description: "Free yes or no tarot reading. Ask a simple question and receive a clear answer from the tarot cards.",
    topic: "decision",
    intro: [
      "Sometimes you need a straightforward answer. Yes or no tarot readings cut through complexity to provide clear directional guidance on specific questions.",
      "In yes/no readings, each card carries a positive, negative, or neutral energy. Major Arcana cards like The Sun and The World lean strongly positive, while The Tower and the Five of Swords suggest challenges ahead.",
      "For best results, phrase your question clearly and specifically. Instead of 'What about my love life?' try 'Will this relationship deepen in the next three months?'"
    ],
    faq: [
      { q: "How accurate are yes or no tarot readings?", a: "Yes/no readings work best for simple, specific questions. Complex life decisions benefit from more detailed spreads like the Three Card or Celtic Cross." },
      { q: "What if I get a 'maybe' answer?", a: "A 'maybe' answer often indicates that the outcome depends on choices you haven't yet made. It's the universe's way of saying the situation is still in flux." }
    ],
    relatedSlugs: ["love-tarot-reading", "career-tarot-reading"]
  },
  {
    slug: "twin-flame-tarot-reading",
    title: "Twin Flame Tarot Reading — Free",
    h1: "Twin Flame Tarot Reading — Is This Your Mirror Soul?",
    description: "Free twin flame tarot reading. Discover what the cards reveal about your twin flame connection, soul mirror, and spiritual union.",
    topic: "love" as const,
    intro: [
      "Twin flame connections are among the most intense spiritual experiences. Unlike soulmates, twin flames mirror your deepest self — reflecting both your light and shadow.",
      "Cards like The Lovers, The Tower, and Judgement frequently appear in twin flame readings, signaling the transformative intensity of these connections. The Devil may indicate the magnetic but sometimes painful attachment phase.",
      "A twin flame reading can help you understand where you are in the twin flame journey — whether you're in separation, reunion, or the challenging runner-chaser dynamic."
    ],
    faq: [
      { q: "What tarot cards indicate a twin flame connection?", a: "The Lovers (soul union), The Tower (intense transformation), Judgement (spiritual awakening), and the Two of Cups (deep connection) are common twin flame indicators." },
      { q: "Can tarot tell me if someone is my twin flame?", a: "Tarot can reveal the energy and depth of a connection, but twin flame recognition ultimately comes from within. Look for cards suggesting intense transformation and spiritual growth." }
    ],
    relatedSlugs: ["soulmate-tarot-reading", "love-tarot-reading"]
  },
  {
    slug: "breakup-tarot-reading",
    title: "Breakup Tarot Reading — Free Guidance",
    h1: "Breakup Tarot Reading — Healing After Heartbreak",
    description: "Free breakup tarot reading. Find guidance, clarity, and healing after a breakup through the wisdom of the tarot cards.",
    topic: "love" as const,
    intro: [
      "Breakups shake our foundations. A tarot reading during this time doesn't predict whether you'll reconcile — it illuminates the lessons embedded in the experience and guides your healing.",
      "The Three of Swords often appears, acknowledging heartbreak directly. The Star follows, promising renewal. Death signals the transformation already underway, and The Empress reminds you to nurture yourself.",
      "The most healing breakup readings focus not on the other person, but on your own journey toward wholeness and self-love."
    ],
    faq: [
      { q: "What tarot cards help with breakup healing?", a: "The Star (renewal and hope), The Empress (self-nurturing), Temperance (emotional balance), and the Ace of Cups (new emotional beginnings) support healing after heartbreak." },
      { q: "Should I do a tarot reading right after a breakup?", a: "Give yourself a few days for the initial shock to settle. Readings done from a place of slight calm yield clearer, more helpful guidance than those driven by acute emotional pain." }
    ],
    relatedSlugs: ["will-my-ex-come-back-tarot", "love-tarot-reading", "personal-growth-tarot-reading"]
  },
  {
    slug: "new-relationship-tarot-reading",
    title: "New Relationship Tarot Reading — Free",
    h1: "New Relationship Tarot — What Energy Surrounds This Connection?",
    description: "Free tarot reading for new relationships. Explore the potential, challenges, and energy of a budding romantic connection.",
    topic: "love" as const,
    intro: [
      "The beginning of a relationship brims with possibility and uncertainty. Tarot can illuminate the energy surrounding this new connection without spoiling its natural unfolding.",
      "The Ace of Cups signals fresh emotional beginnings, while the Two of Cups confirms mutual attraction. The Page of Cups brings playful romantic energy, and The Fool invites you to embrace the adventure.",
      "Use this reading to understand what you bring to the connection, what the other person may be experiencing, and what potential lies ahead."
    ],
    faq: [
      { q: "What tarot cards mean a new relationship is promising?", a: "Ace of Cups (new love), Two of Cups (mutual connection), The Sun (joy), and The Star (hope) all suggest a promising new relationship with strong positive energy." },
      { q: "When should I do a tarot reading about a new relationship?", a: "Wait until you've had meaningful interactions. Readings about someone you've barely met tend to reflect your projections rather than the actual connection's energy." }
    ],
    relatedSlugs: ["love-tarot-reading", "soulmate-tarot-reading"]
  },
  {
    slug: "moving-house-tarot-reading",
    title: "Moving House Tarot Reading — Free",
    h1: "Moving House Tarot — Should You Make the Move?",
    description: "Free tarot reading about moving house. Discover what the cards reveal about relocating, new homes, and life transitions.",
    topic: "decision" as const,
    intro: [
      "Moving house is one of life's most significant transitions. Tarot can reveal the energies surrounding your potential move — whether it's aligned with your path and what to prepare for.",
      "The Wheel of Fortune suggests change is favored. The Four of Wands points to a happy new home. The Chariot indicates forward movement, while the Ten of Pentacles suggests long-term stability awaits.",
      "Consider what the cards reveal about both the practical and emotional aspects of your move. A home is more than a location — it's an energetic foundation for your life."
    ],
    faq: [
      { q: "What tarot cards suggest a successful move?", a: "The Four of Wands (happy home), Ten of Pentacles (stable foundation), The Chariot (successful transition), and Ace of Pentacles (new material beginning) all suggest positive relocation energy." },
      { q: "Can tarot help me decide where to move?", a: "Tarot won't give you an address, but it can reveal what qualities to prioritize in your new location — stability, community, adventure, or solitude." }
    ],
    relatedSlugs: ["career-tarot-reading", "personal-growth-tarot-reading"]
  },
  {
    slug: "pregnancy-tarot-reading",
    title: "Pregnancy Tarot Reading — Free",
    h1: "Pregnancy Tarot Reading — What Do the Cards Reveal?",
    description: "Free pregnancy tarot reading. Explore what the cards suggest about fertility, new beginnings, and the energy of creation.",
    topic: "growth" as const,
    intro: [
      "Pregnancy readings in tarot explore the broader themes of creation, fertility, and new life — whether literal or metaphorical. The cards speak to the energy of bringing something new into being.",
      "The Empress is the quintessential fertility and motherhood card. The Ace of Cups represents new emotional beginnings, while The Sun radiates joy and vitality. The Page of Cups often signals happy news.",
      "Approach pregnancy readings with openness — the cards may speak to creative projects, new ventures, or personal rebirth alongside or instead of literal pregnancy."
    ],
    faq: [
      { q: "What tarot cards indicate pregnancy?", a: "The Empress (fertility), Ace of Cups (new emotional life), The Sun (vitality), Page of Cups (happy news), and the Three of Cups (celebration) are commonly associated with pregnancy and new life." },
      { q: "Can tarot predict pregnancy?", a: "Tarot reads energy and potential rather than medical outcomes. Fertility-associated cards may appear to reflect creative energy, new beginnings, or literal pregnancy — context and intuition guide interpretation." }
    ],
    relatedSlugs: ["love-tarot-reading", "personal-growth-tarot-reading"]
  },
  {
    slug: "spiritual-awakening-tarot",
    title: "Spiritual Awakening Tarot Reading — Free",
    h1: "Spiritual Awakening Tarot — Where Are You on the Journey?",
    description: "Free spiritual awakening tarot reading. Discover what stage of spiritual development you're in and what the universe is guiding you toward.",
    topic: "growth" as const,
    intro: [
      "Spiritual awakening is not a single moment but an unfolding journey. Tarot's Major Arcana maps this path perfectly — from The Fool's innocent beginning through The World's integrated completion.",
      "The High Priestess signals deepening intuition. The Hermit calls for contemplative withdrawal. The Tower shatters illusions to reveal truth, and The Star promises the hope and clarity that follow dark nights of the soul.",
      "This reading helps you understand where you are on your awakening path and what the next stage of your spiritual evolution may look like."
    ],
    faq: [
      { q: "What tarot cards indicate spiritual awakening?", a: "The High Priestess (intuition), The Hermit (inner wisdom), The Tower (ego dissolution), The Star (spiritual renewal), and Judgement (higher calling) are the primary spiritual awakening cards." },
      { q: "How can tarot support spiritual growth?", a: "Tarot provides a symbolic language for inner experiences that may be hard to articulate. Regular readings create a practice of self-reflection that supports ongoing spiritual development." }
    ],
    relatedSlugs: ["personal-growth-tarot-reading", "soulmate-tarot-reading"]
  },
  {
    slug: "anxiety-tarot-reading",
    title: "Tarot for Anxiety — Free Guidance Reading",
    h1: "Tarot for Anxiety — Finding Calm Through the Cards",
    description: "Free tarot reading for anxiety. Discover what the cards reveal about your worries and find guidance toward inner peace.",
    topic: "growth" as const,
    intro: [
      "When anxiety takes hold, tarot offers a structured way to externalize swirling thoughts and examine them one by one. The act of focusing on a reading itself can be grounding.",
      "The Nine of Swords directly represents anxiety and overthinking. Temperance offers the antidote — patience, balance, and emotional moderation. The Star brings hope, and Strength reminds you of your inner resilience.",
      "Tarot doesn't replace professional mental health support, but it can complement it by providing moments of structured reflection and self-compassion."
    ],
    faq: [
      { q: "Can tarot help with anxiety?", a: "Tarot can serve as a mindfulness tool, helping you externalize worries and examine them with detachment. The focused ritual of a reading provides grounding structure during anxious moments." },
      { q: "What tarot cards relate to anxiety?", a: "Nine of Swords (worry, overthinking), The Moon (uncertainty, fear), Eight of Swords (feeling trapped), and Five of Cups (dwelling on loss) commonly appear when anxiety is present." }
    ],
    relatedSlugs: ["personal-growth-tarot-reading", "spiritual-awakening-tarot"]
  },
];

/* ── Spread guide pages ── */
export interface SpreadGuide {
  slug: string;
  title: string;
  h1: string;
  description: string;
  cardCount: number;
  difficulty: string;
  bestFor: string;
  positions: { name: string; description: string }[];
  howTo: string[];
  tips: string[];
}

export const spreadGuides: SpreadGuide[] = [
  {
    slug: "three-card-spread",
    title: "Three Card Tarot Spread Guide",
    h1: "Three Card Tarot Spread — Past, Present, Future",
    description: "Learn the three card tarot spread. Understand card positions, interpretation tips, and how to read Past, Present, and Future cards.",
    cardCount: 3,
    difficulty: "Beginner",
    bestFor: "Quick insights, daily guidance, and straightforward questions",
    positions: [
      { name: "Past", description: "Represents the influences, events, and energies from your past that are shaping the current situation. This card reveals what has led you to where you are now." },
      { name: "Present", description: "Reflects your current circumstances, emotional state, and the energies actively at work in your life right now. This is where you stand today." },
      { name: "Future", description: "Suggests the direction events are heading based on the current trajectory. This isn't fixed — it shows what is likely if things continue as they are." }
    ],
    howTo: [
      "Shuffle the deck while focusing on your question or intention.",
      "When you feel ready, draw three cards and lay them from left to right.",
      "The first card represents the Past, the second the Present, and the third the Future.",
      "Read each card individually, then look for patterns and connections across all three cards."
    ],
    tips: [
      "The Three Card Spread is incredibly versatile. Try alternative layouts like Situation/Challenge/Advice or Mind/Body/Spirit.",
      "Pay attention to the suits — a spread dominated by one suit suggests a strong thematic focus.",
      "If all three cards are Major Arcana, the situation carries significant weight and involves important life lessons."
    ]
  },
  {
    slug: "celtic-cross-spread",
    title: "Celtic Cross Tarot Spread Guide",
    h1: "Celtic Cross Spread — The Complete 10-Card Layout",
    description: "Master the Celtic Cross tarot spread. Learn all 10 card positions, interpretation techniques, and how to read this powerful layout.",
    cardCount: 10,
    difficulty: "Intermediate to Advanced",
    bestFor: "Complex situations, deep analysis, and comprehensive life readings",
    positions: [
      { name: "Present", description: "The heart of the matter — what you are experiencing right now." },
      { name: "Challenge", description: "The immediate obstacle or opposing force you face." },
      { name: "Foundation", description: "The root cause or underlying basis of the situation." },
      { name: "Recent Past", description: "Events or influences that have recently affected the situation." },
      { name: "Crown", description: "The best possible outcome or what you are working toward." },
      { name: "Near Future", description: "What will happen in the immediate future." },
      { name: "Self", description: "How you see yourself and your role in the situation." },
      { name: "Environment", description: "External influences, other people's perspectives and energies." },
      { name: "Hopes & Fears", description: "Your deepest hopes and fears about the outcome." },
      { name: "Outcome", description: "The likely outcome based on all the preceding factors." }
    ],
    howTo: [
      "Shuffle the deck thoroughly while focusing on your question.",
      "Draw 10 cards and lay them in the Celtic Cross pattern.",
      "Read the central cross (cards 1-6) first for the core narrative.",
      "Then read the staff (cards 7-10) for deeper psychological and outcome insights.",
      "Finally, synthesize the entire spread into a cohesive interpretation."
    ],
    tips: [
      "Don't rush through the Celtic Cross. Take time with each position before synthesizing.",
      "The relationship between cards 1 (Present) and 2 (Challenge) reveals the core tension.",
      "Cards 9 (Hopes & Fears) and 10 (Outcome) together reveal whether your fears or hopes are more likely to manifest."
    ]
  },
  {
    slug: "yes-no-spread",
    title: "Yes or No Tarot Spread Guide",
    h1: "Yes or No Tarot Spread — Simple Answers to Direct Questions",
    description: "Learn how to use the yes or no tarot spread for quick, clear answers. Understand which cards mean yes, no, or maybe.",
    cardCount: 1,
    difficulty: "Beginner",
    bestFor: "Quick decisions, simple questions, and directional guidance",
    positions: [
      { name: "Answer", description: "A single card drawn to provide a yes, no, or maybe answer to your specific question." }
    ],
    howTo: [
      "Formulate a clear yes-or-no question.",
      "Shuffle the deck while focusing on your question.",
      "Draw a single card.",
      "Interpret the card's energy as positive (yes), negative (no), or neutral (maybe)."
    ],
    tips: [
      "Upright Major Arcana cards generally lean toward 'yes' with the exception of The Tower, The Devil, and Death.",
      "Reversed cards typically lean toward 'no' or suggest delays.",
      "For more nuanced answers, draw three cards — if two or more are positive, the answer leans yes."
    ]
  },
];

/* ── Combination page helpers ── */
export interface CombinationPage {
  slug: string;
  card1Name: string;
  card2Name: string;
  theme: string;
  meaning: string;
  love?: string;
  career?: string;
  card1Slug: string;
  card2Slug: string;
}

export function generateCombinationPages(): CombinationPage[] {
  return cardCombinations.map((combo) => {
    const c1 = tarotDeck.find((c) => c.id === combo.cards[0]);
    const c2 = tarotDeck.find((c) => c.id === combo.cards[1]);
    if (!c1 || !c2) return null;
    return {
      slug: `${slugify(c1.name)}-and-${slugify(c2.name)}`,
      card1Name: c1.name,
      card2Name: c2.name,
      theme: combo.theme,
      meaning: combo.meaning,
      love: combo.love,
      career: combo.career,
      card1Slug: slugify(c1.name),
      card2Slug: slugify(c2.name),
    };
  }).filter(Boolean) as CombinationPage[];
}

/* ── Comparison pages ── */
export interface ComparisonPage {
  slug: string;
  card1Name: string;
  card2Name: string;
  card1Slug: string;
  card2Slug: string;
  summary: string;
  description: string;
}

const comparisonPairs: [number, number, string][] = [
  [0, 21, "The Fool begins the journey while The World completes it — together they represent the full cycle of experience."],
  [1, 2, "The Magician acts through will and conscious skill, while The High Priestess works through intuition and passive knowing."],
  [3, 4, "The Empress nurtures through abundance and softness, while The Emperor builds through structure and authority."],
  [6, 15, "The Lovers represent conscious choice and harmony, while The Devil reveals unconscious attachment and shadow bonds."],
  [13, 16, "Death transforms gradually and naturally, while The Tower brings sudden, unavoidable change."],
  [17, 18, "The Star offers clarity and hope, while The Moon obscures with illusion and uncertainty."],
  [8, 7, "Strength works through patience and inner power, while The Chariot conquers through willpower and external drive."],
  [9, 17, "The Hermit seeks wisdom in solitude, while The Star finds inspiration in openness and vulnerability."],
  [10, 11, "The Wheel of Fortune turns through fate and chance, while Justice operates through cause and effect."],
  [19, 18, "The Sun radiates clarity and joy, while The Moon speaks to mystery and the unconscious."],
  [12, 13, "The Hanged Man surrenders to gain perspective, while Death releases what no longer serves."],
  [5, 0, "The Hierophant follows tradition and structure, while The Fool breaks free of convention."],
];

export function generateComparisonPages(): ComparisonPage[] {
  return comparisonPairs.map(([id1, id2, summary]) => {
    const c1 = tarotDeck.find(c => c.id === id1);
    const c2 = tarotDeck.find(c => c.id === id2);
    if (!c1 || !c2) return null;
    const s1 = slugify(c1.name);
    const s2 = slugify(c2.name);
    return {
      slug: `${s1}-vs-${s2}`,
      card1Name: c1.name,
      card2Name: c2.name,
      card1Slug: s1,
      card2Slug: s2,
      summary,
      description: `Compare ${c1.name} and ${c2.name} tarot cards. Understand the key differences in love, career, and general readings.`,
    };
  }).filter(Boolean) as ComparisonPage[];
}

/* ── All dynamic URLs for sitemap ── */
export function getAllSEOUrls(): { loc: string; changefreq: string; priority: string }[] {
  const base = "https://tarotguidance.lovable.app";
  const urls: { loc: string; changefreq: string; priority: string }[] = [];

  // Static pages
  const statics = [
    { path: "/", freq: "weekly", pri: "1.0" },
    { path: "/free-tarot-reading", freq: "weekly", pri: "0.9" },
    { path: "/yes-no-tarot-reading", freq: "weekly", pri: "0.9" },
    { path: "/pick-a-card-reading", freq: "weekly", pri: "0.9" },
    { path: "/rune-reading", freq: "weekly", pri: "0.9" },
    { path: "/angel-card-reading", freq: "weekly", pri: "0.9" },
    { path: "/tarot-card-meanings", freq: "monthly", pri: "0.8" },
    { path: "/rune-meanings", freq: "monthly", pri: "0.8" },
    { path: "/daily-tarot-card", freq: "daily", pri: "0.8" },
    { path: "/daily-rune", freq: "daily", pri: "0.7" },
    { path: "/daily-angel-message", freq: "daily", pri: "0.7" },
    { path: "/blog", freq: "weekly", pri: "0.7" },
    // Hub pages
    { path: "/tarot-guide", freq: "monthly", pri: "0.9" },
    { path: "/rune-guide", freq: "monthly", pri: "0.8" },
    { path: "/angel-cards-guide", freq: "monthly", pri: "0.8" },
    { path: "/tarot-spreads", freq: "monthly", pri: "0.8" },
    { path: "/tarot-combinations", freq: "monthly", pri: "0.8" },
    { path: "/tarot-comparisons", freq: "monthly", pri: "0.8" },
    { path: "/daily-tarot-reading", freq: "daily", pri: "0.9" },
    { path: "/tarot-reading-archive", freq: "daily", pri: "0.7" },
  ];
  statics.forEach(s => urls.push({ loc: `${base}${s.path}`, changefreq: s.freq, priority: s.pri }));

  // Tarot card meanings
  tarotDeck.forEach(c => urls.push({ loc: `${base}/tarot-card-meanings/${slugify(c.name)}`, changefreq: "monthly", priority: "0.6" }));

  // Card context pages (love, career, advice, yes-or-no) — Major Arcana only for manageable scale
  const contexts = ["love", "career", "advice", "yes-or-no"];
  tarotDeck.filter(c => c.arcana === "Major").forEach(c => {
    contexts.forEach(ctx => urls.push({ loc: `${base}/tarot-card-meanings/${slugify(c.name)}/${ctx}`, changefreq: "monthly", priority: "0.5" }));
  });

  // Rune meanings
  elderFuthark.forEach(r => urls.push({ loc: `${base}/rune-meanings/${r.name.toLowerCase()}`, changefreq: "monthly", priority: "0.6" }));

  // Zodiac
  const signs = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"];
  signs.forEach(s => urls.push({ loc: `${base}/zodiac/${s}-tarot-reading`, changefreq: "monthly", priority: "0.6" }));

  // Question pages
  questionPages.forEach(q => urls.push({ loc: `${base}/${q.slug}`, changefreq: "monthly", priority: "0.8" }));

  // Spread guides
  spreadGuides.forEach(s => urls.push({ loc: `${base}/tarot-spreads/${s.slug}`, changefreq: "monthly", priority: "0.7" }));

  // Combination pages
  generateCombinationPages().forEach(c => urls.push({ loc: `${base}/tarot-combinations/${c.slug}`, changefreq: "monthly", priority: "0.6" }));

  // Comparison pages
  generateComparisonPages().forEach(c => urls.push({ loc: `${base}/tarot-comparisons/${c.slug}`, changefreq: "monthly", priority: "0.6" }));

  // Daily reading pages (last 30 days for sitemap)
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    urls.push({ loc: `${base}/daily-tarot/${y}-${m}-${day}`, changefreq: "daily", priority: "0.5" });
  }

  // Blog articles
  const blogSlugs = ["how-tarot-readings-work","major-arcana-guide","how-rune-casting-works","angel-card-guidance-beginners","tarot-spreads-explained","reversed-tarot-cards","zodiac-and-tarot-connection","daily-divination-practice"];
  blogSlugs.forEach(s => urls.push({ loc: `${base}/blog/${s}`, changefreq: "monthly", priority: "0.5" }));

  return urls;
}
