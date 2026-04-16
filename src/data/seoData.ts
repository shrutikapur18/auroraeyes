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
    sections: [
      {
        heading: "Why Relationships Hit Plateaus",
        body: [
          "Every relationship encounters stretches where connection feels stale, communication breaks down, or resentment quietly accumulates. These aren't signs of failure — they're invitations for deeper work. Tarot can name the specific energy creating the stagnation.",
          "The Four of Cups frequently appears during relationship plateaus. It shows emotional apathy — not hatred or conflict, but a quiet disengagement that's often harder to address than outright fighting. The Five of Pentacles suggests one or both partners feeling isolated within the relationship itself.",
          "What makes tarot valuable here is its ability to identify root causes that conversations miss. You might argue about dishes, but the cards reveal it's really about feeling unseen. That distinction changes everything."
        ]
      },
      {
        heading: "Cards That Signal Growth and Renewal",
        body: [
          "The Star is the strongest healing card in relationship readings. After difficulty — represented by The Tower or Three of Swords — The Star emerges as genuine hope built on honest vulnerability, not wishful thinking.",
          "Temperance shows two energies finding balance. In a relationship context, it means both partners are willing to adjust, compromise, and meet each other halfway. This card doesn't promise effortless harmony — it promises that the effort will be worthwhile.",
          "The Ace of Cups signals a fresh emotional beginning within an existing relationship. Sometimes long-term partnerships need to fall in love again — not with a new person, but with the person beside them. This card says that renewal is possible if both partners choose it."
        ]
      },
      {
        heading: "What the Cards Can't Do for Your Relationship",
        body: [
          "Tarot can illuminate patterns, but it can't do the work for you. If The Emperor keeps appearing, the reading is pointing to a power imbalance — but it's up to you and your partner to address it through real conversation and changed behavior.",
          "Beware of using tarot to avoid difficult conversations. Pulling cards about your relationship every day is often a form of procrastination — you already know what needs to be said, but you're hoping the cards will say it for you.",
          "The most transformative relationship readings end with action: a conversation you've been postponing, a boundary you need to set, or an apology you owe. The cards provide clarity. What you do with it determines whether the relationship actually improves."
        ]
      },
      {
        heading: "How to Frame Relationship Questions for Tarot",
        body: [
          "Questions focused on understanding produce better readings than questions focused on prediction. 'What does my partner need from me right now?' is more actionable than 'Will we stay together?' The first gives you something to work with; the second gives you something to worry about.",
          "Consider asking about your own role: 'What am I not seeing in this relationship?' or 'Where am I contributing to the disconnection?' These aren't about blame — they're about the only thing you can actually change: yourself.",
          "If both partners are open to it, doing a reading together can be powerful. The cards create a neutral language for discussing difficult feelings, making it easier to address issues that normal conversation keeps circling around."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards indicate a relationship improving?", a: "The Star (hope and healing), Temperance (balance), Two of Cups (partnership), and The Sun (joy) are strong indicators of positive relationship development." },
      { q: "Can tarot save a relationship?", a: "Tarot can't save a relationship directly, but it can reveal blind spots, communication blocks, and areas where both partners can grow — which can be the catalyst for positive change." },
      { q: "How often should I read tarot about my relationship?", a: "Once every few weeks is ideal. Reading too frequently about the same issue creates anxiety and prevents you from implementing the guidance you've already received." },
      { q: "What if the cards say my relationship won't improve?", a: "Cards showing endings — like Death or Ten of Swords — don't always mean the relationship is over. They often indicate that the current dynamic needs to end so a healthier pattern can emerge. Context matters." },
      { q: "Can I do a relationship reading without my partner knowing?", a: "Yes, but the reading will reflect your energy and perspective. For the most balanced insight, focus questions on your own growth within the relationship rather than trying to read your partner's intentions." }
    ],
    relatedSlugs: ["love-tarot-reading", "soulmate-tarot-reading", "breakup-tarot-reading"]
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
    sections: [
      {
        heading: "What Career Tarot Actually Reveals",
        body: [
          "Career readings aren't fortune-telling about promotions. They reveal the internal dynamics driving your professional life — ambition versus fear, skill versus self-doubt, comfort versus growth. The cards show you the emotional architecture behind your career decisions.",
          "Most people come to career tarot when they feel stuck. They know something needs to change but can't identify what. The cards cut through mental fog by naming the specific energy at play: are you afraid of failure, comfortable with mediocrity, or unconsciously sabotaging your success?",
          "The Pentacles suit dominates career readings because work is ultimately about what you build in the material world. But don't ignore Wands (passion), Cups (fulfillment), and Swords (clarity) — a career without those elements will always feel incomplete."
        ]
      },
      {
        heading: "Reading the Cards for Professional Decisions",
        body: [
          "The Three of Pentacles is the master craftsman card — when it appears, your skills are being recognized and collaboration will serve you well. The Eight of Pentacles shows dedicated effort paying off through consistent, focused work.",
          "The Magician in a career reading is powerful: it says you have every tool you need to succeed. The only question is whether you'll use them. Paired with The Emperor, it suggests leadership potential waiting to be claimed.",
          "Be honest when The Tower or Ten of Swords appears. These cards don't mean career disaster — they mean the current situation has run its course. Fighting to preserve a dead-end position wastes energy that could build something better."
        ]
      },
      {
        heading: "Using Your Career Reading Effectively",
        body: [
          "The best career readings produce one clear action step. Not a vague affirmation, but something specific: update your resume, have the difficult conversation with your boss, start the side project you've been postponing, or accept that this job was only meant to be temporary.",
          "Avoid reading about the same career question repeatedly. If you asked about a promotion last week and the cards said 'not yet,' pulling again three days later won't change the answer. It will just increase your anxiety.",
          "Consider pairing career tarot with practical planning. The cards show you the energy — your job is to translate that insight into concrete professional moves."
        ]
      }
    ],
    faq: [
      { q: "Can tarot help with career decisions?", a: "Tarot provides insight into the energies and patterns affecting your career. It can reveal hidden opportunities, potential obstacles, and the inner motivations driving your professional choices." },
      { q: "What tarot cards indicate career success?", a: "The Sun, Six of Wands (victory), Ace of Pentacles (new opportunity), Three of Pentacles (mastery), and The Emperor (leadership) are strong career success indicators." },
      { q: "Should I quit my job based on a tarot reading?", a: "Tarot is one input among many. It can reveal what you're feeling beneath the surface, but major life decisions should also consider finances, timing, and practical alternatives." },
      { q: "What does it mean if I keep getting Pentacles in career readings?", a: "Pentacles dominating a career reading emphasize the material and practical aspects — finances, skill development, patience, and long-term building. The cards are saying: focus on craft and stability." }
    ],
    relatedSlugs: ["should-i-change-careers-tarot", "will-i-get-the-job-tarot", "money-tarot-reading"]
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
    sections: [
      {
        heading: "The Real Reason You're Considering a Career Change",
        body: [
          "Most people who ask tarot about changing careers already know the answer. They're not looking for permission — they're looking for courage. The cards don't grant permission, but they do name the fear that's keeping you stuck.",
          "The Eight of Cups appears frequently in career-change readings. It shows someone walking away from something that looks fine from the outside but feels hollow inside. This card validates the quiet dissatisfaction that others might dismiss as ungrateful.",
          "If The Devil appears, check whether golden handcuffs are part of the equation. Good salary, comfortable routine, impressive title — but no soul in the work. The Devil in career readings is about staying in a situation because of what you'd lose, not because of what you gain."
        ]
      },
      {
        heading: "Cards That Encourage the Leap",
        body: [
          "The Fool is the ultimate career-change card. It doesn't promise success — it promises that the unknown is worth exploring. Paired with the Ace of Wands, it suggests a new path ignited by genuine passion rather than desperation.",
          "Death in a career reading isn't about losing your livelihood. It's the most natural transformation card in the deck — the old role dies so the new one can emerge. If Death appears alongside The Star, the transition may involve difficulty but leads somewhere hopeful.",
          "The Wheel of Fortune reminds you that career cycles are natural. The job that was perfect five years ago may no longer fit who you've become. Growth isn't disloyalty — it's evolution."
        ]
      },
      {
        heading: "Cards That Urge Caution",
        body: [
          "Not every urge to quit is wisdom. The Seven of Swords in a career-change reading suggests you might be running from something rather than toward something. Make sure the desire for change isn't actually avoidance in disguise.",
          "The Four of Pentacles says: evaluate the financial reality honestly. Passion is important, but so is paying rent. This card doesn't discourage change — it advises planning first. Build the bridge before you burn the current one.",
          "The Hanged Man asks you to pause. Sometimes the timing isn't right, even when the desire is genuine. Waiting three months while saving money isn't cowardice — it's strategy."
        ]
      },
      {
        heading: "Making the Decision: A Practical Tarot Framework",
        body: [
          "Pull three cards: one for 'What happens if I stay,' one for 'What happens if I go,' and one for 'What I'm not seeing.' This spread gives you a balanced view without the bias that a single-card reading can carry.",
          "Pay attention to your emotional reaction to the cards, not just their textbook meanings. If the 'stay' card is the Ten of Pentacles but you feel dread looking at it, your gut is telling you something the card's surface meaning isn't.",
          "After the reading, set a concrete timeline. 'I will make a decision by [date].' Indefinite deliberation is its own form of suffering. The cards have spoken — now it's your turn to act."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards suggest I should change careers?", a: "Death (transformation), The Fool (new beginnings), Ace of Wands (new creative path), and The Tower (necessary upheaval) often appear when career change is aligned with your path." },
      { q: "Is it safe to make career decisions based on tarot?", a: "Use tarot as one of many inputs in your decision-making process. The cards highlight patterns and blind spots — combine their insights with practical research and trusted advice." },
      { q: "What if tarot says to stay but I want to leave?", a: "The cards reflect energy, not commands. If stability cards appear but your heart says go, the reading may be highlighting fears to address before transitioning — not telling you to stay forever." },
      { q: "How do I know if it's the right time to change careers?", a: "Look for action cards (Aces, The Chariot, The Magician) combined with your own readiness — financial preparation, clear alternatives, and genuine excitement rather than just escape from discomfort." }
    ],
    relatedSlugs: ["career-tarot-reading", "will-i-get-the-job-tarot", "money-tarot-reading"]
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
    sections: [
      {
        heading: "Why Job Seekers Turn to Tarot",
        body: [
          "Job searching is emotionally exhausting in ways people rarely talk about. The repeated vulnerability of interviews, the silence after applications, the overthinking about what you said wrong — it erodes confidence. Tarot offers something the hiring process doesn't: honest feedback without judgment.",
          "When you ask the cards about a specific job, you're not really asking for a prediction. You're asking: am I on the right track? Is this role aligned with who I'm becoming, or am I chasing it out of desperation? The cards answer both the practical question and the deeper one you're afraid to ask out loud.",
          "The most useful job readings reveal your internal state — are you approaching this opportunity from confidence or scarcity? The energy you carry into an interview matters as much as your resume, and the cards can show you exactly where your energy stands."
        ]
      },
      {
        heading: "Cards That Signal Professional Success",
        body: [
          "The Ace of Pentacles is the strongest 'new job' card in the deck. It represents a tangible opportunity arriving — a real offer, a real chance. When it appears upright, the energy favors material beginnings.",
          "The Six of Wands is the victory card. Public recognition, being chosen, standing out from competitors. In a job reading, this card says: you're the one they'll remember. The Three of Pentacles reinforces this — your craft, your skill, your collaborative ability are being noticed.",
          "The Emperor brings authority and structure. In a job context, it often means a stable company, a strong manager, or a role that gives you real responsibility. Paired with The Magician, it suggests you have every qualification needed — the only question is whether you believe it yourself."
        ]
      },
      {
        heading: "When the Cards Show Challenges",
        body: [
          "The Five of Pentacles in a job reading can feel devastating, but it's more nuanced than 'you won't get it.' This card often points to financial anxiety clouding your judgment — you might be applying for the wrong role because you need money, not because it fits.",
          "The Tower doesn't mean career collapse. In a job reading, it suggests the role you're fixated on might not be the one that serves you. Sometimes not getting the job is the cards protecting you from a situation that would have been miserable.",
          "Reversed cards in job readings often indicate internal blocks: the reversed Magician suggests imposter syndrome, the reversed Emperor points to authority issues, and the reversed Sun means you're not showing your authentic self in interviews. These are actionable insights, not sentences."
        ]
      },
      {
        heading: "How to Use Your Reading Strategically",
        body: [
          "After your reading, sit with the cards for a moment before rushing to interpret. Your first emotional reaction often carries the most honest signal — relief, anxiety, surprise, disappointment. That reaction tells you something your conscious mind might be filtering.",
          "If the cards are positive, channel that confidence into your preparation. Not arrogance — grounded self-assurance. Walk into the interview knowing the energy supports you. That shift in demeanor is visible to interviewers.",
          "If the cards suggest this specific job isn't aligned, don't spiral. Ask a follow-up question: 'What kind of role IS aligned with my energy right now?' The cards may redirect you toward something you hadn't considered — and that redirection often leads somewhere better."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards mean I'll get the job?", a: "Ace of Pentacles (new opportunity), Six of Wands (success), The Sun (positive outcome), and The World (achievement) are among the most positive indicators for job prospects." },
      { q: "What if the tarot says I won't get the job?", a: "Challenging cards don't mean failure — they may suggest timing isn't right, or that a better opportunity awaits. Use the reading's guidance to strengthen your approach." },
      { q: "When should I do a job tarot reading?", a: "The best time is after you've submitted your application or completed an interview. Reading before you've taken action tends to amplify anxiety rather than provide clarity." },
      { q: "Can I do multiple readings about the same job?", a: "One focused reading per opportunity is ideal. Repeated readings about the same position reflect your anxiety, not the cards' accuracy. Trust the first pull." },
      { q: "What if I keep getting the same card for every job reading?", a: "A recurring card is a clear message. Look at what that card represents — it's pointing to a persistent energy or lesson that applies across all your professional pursuits, not just one job." }
    ],
    relatedSlugs: ["career-tarot-reading", "should-i-change-careers-tarot", "money-tarot-reading"]
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
    sections: [
      {
        heading: "Your Relationship with Money — What Tarot Reveals",
        body: [
          "Money readings aren't about predicting lottery numbers. They expose the beliefs, fears, and habits that shape your financial reality. Most people carry inherited money stories — scarcity mindsets from childhood, guilt about wanting more, or the belief that wealth requires suffering.",
          "The cards act as a financial mirror. The Four of Pentacles appears when you're gripping too tightly — hoarding out of fear rather than managing with intention. The reversed Nine of Pentacles suggests you're living beyond your means or measuring self-worth through possessions.",
          "Understanding your money energy changes how you make financial decisions. When you see your patterns clearly, you stop repeating them unconsciously. That awareness alone is worth more than any specific financial prediction."
        ]
      },
      {
        heading: "Key Cards for Financial Readings",
        body: [
          "The Pentacles suit is your financial roadmap. The Ace signals incoming opportunity — a raise, a new income stream, a smart investment materializing. The Three of Pentacles shows earning through skilled work and collaboration. The Ten of Pentacles represents generational wealth and long-term financial stability.",
          "The Nine of Pentacles is the self-made success card. Financial independence achieved through your own effort and discipline. When this card appears, the message is clear: you can build the abundance you want, and you may be closer than you think.",
          "Outside the Pentacles, The Empress embodies natural abundance — money flowing easily when you're aligned with your creative gifts. The Wheel of Fortune in financial readings signals a turning point: your financial luck is about to shift, for better or worse depending on surrounding cards."
        ]
      },
      {
        heading: "Common Money Questions — and What the Cards Actually Answer",
        body: [
          "'Will I become rich?' is the wrong question. The cards will redirect you toward: 'What's blocking my abundance?' or 'What financial decision deserves my focus right now?' Tarot works with energy and patterns, not specific dollar amounts.",
          "'Should I take this financial risk?' is a question tarot handles beautifully. The Seven of Pentacles says: the investment needs more time — don't harvest too early. The Two of Pentacles warns about juggling too many financial commitments at once. The Knight of Pentacles advises a slow, methodical approach.",
          "'Why do I always end up broke?' is the most important money question you can ask the cards. The answer usually involves the Five of Pentacles (poverty consciousness) or The Devil reversed (breaking free from materialistic patterns that drain rather than build)."
        ]
      },
      {
        heading: "Turning Your Money Reading into Action",
        body: [
          "The best financial readings produce one concrete shift. Maybe it's finally starting the budget you've been avoiding. Maybe it's asking for the raise you deserve. Maybe it's releasing the guilt around spending on yourself. One shift, applied consistently, changes your financial trajectory.",
          "If the cards show abundance energy, don't just feel good about it — act. Send the proposal, open the savings account, have the money conversation with your partner. Positive cards without action are just nice pictures.",
          "If the cards show financial challenges, don't panic. Five of Pentacles doesn't mean bankruptcy — it means you're focused on what you lack instead of what you have. Shifting that perspective is the first step toward financial recovery."
        ]
      }
    ],
    faq: [
      { q: "Can tarot predict financial outcomes?", a: "Tarot reveals the energies and patterns surrounding your finances rather than specific monetary outcomes. It can highlight opportunities, warn of potential pitfalls, and suggest shifts in mindset." },
      { q: "What tarot cards indicate money coming in?", a: "Ace of Pentacles, Nine of Pentacles, Ten of Pentacles, The Empress, and The Sun are strong indicators of financial abundance and incoming resources." },
      { q: "How often should I do money tarot readings?", a: "Monthly readings work well for tracking financial energy shifts. Avoid reading obsessively during financial stress — it amplifies anxiety rather than providing clarity." },
      { q: "What tarot cards warn about financial loss?", a: "The Five of Pentacles (hardship), Ten of Swords (an ending), reversed Wheel of Fortune (downturn), and The Tower (sudden disruption) suggest caution with finances." },
      { q: "Can tarot help me with debt?", a: "Tarot can reveal the emotional and behavioral patterns behind debt — overspending, avoidance, or scarcity mindset. Understanding these patterns is the first step toward changing your financial habits." }
    ],
    relatedSlugs: ["career-tarot-reading", "will-i-get-the-job-tarot", "personal-growth-tarot-reading"]
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
    sections: [
      {
        heading: "Why Personal Growth Readings Hit Different",
        body: [
          "Most people come to tarot asking about love or money. Personal growth readings require a different kind of courage — the willingness to look at yourself honestly, without the distraction of another person or external goal.",
          "These readings strip away the 'what will happen to me?' and replace it with 'who am I becoming?' That shift in question changes everything about how the cards speak. Instead of predictions, you get mirrors. Instead of answers, you get awareness.",
          "Growth readings often bring up uncomfortable truths. The cards might show you the self-sabotage you've normalized, the comfort zone you've mistaken for safety, or the version of yourself you've outgrown but refuse to release. That discomfort is the beginning of change."
        ]
      },
      {
        heading: "The Major Arcana as a Growth Map",
        body: [
          "The Fool's Journey through the Major Arcana is the original personal development framework. Each card represents a stage: The Magician (discovering your power), The High Priestess (trusting your intuition), The Emperor (building structure), The Hierophant (questioning inherited beliefs).",
          "Mid-journey cards mark the real transformation. The Wheel of Fortune shows you that change is constant and resistance is futile. The Hanged Man asks you to surrender control and see the world from a completely different angle. Death — the most misunderstood card — simply means: let go of what no longer serves you.",
          "The final cards — Judgement and The World — represent integration. You've gathered the lessons, survived the transformations, and arrived at a version of yourself that's more whole than where you started. Growth readings frequently pull from this late-journey energy when you're on the verge of a breakthrough."
        ]
      },
      {
        heading: "Questions That Unlock Deep Readings",
        body: [
          "'What pattern am I repeating?' is the single most powerful personal growth question for tarot. The cards will show you the loop — the same relationship dynamic, the same career fear, the same emotional avoidance pattern — with startling clarity.",
          "'What am I ready to release?' invites Death, The Tower, or the Eight of Cups to speak honestly about what's expired in your life. These cards aren't punishing you — they're freeing you. The reading shows what you already know but haven't acted on.",
          "'What strength am I underestimating?' often brings Strength, The Star, or the Queen of Swords — cards that reflect capabilities you've minimized or forgotten. Personal growth isn't always about fixing weaknesses. Sometimes it's about finally claiming what's already strong."
        ]
      },
      {
        heading: "Making Growth Readings a Practice",
        body: [
          "Single readings create insight. Regular readings create transformation. Consider a monthly pull focused exclusively on your inner development — not events, not other people, just you and your evolving self.",
          "Keep a growth journal alongside your readings. Write down the cards, your initial reaction, and what you think they're pointing to. Review it quarterly. You'll see patterns the individual readings couldn't show you — recurring cards, shifting themes, progress you couldn't feel in the moment.",
          "The most important rule for growth readings: don't use them as another form of self-criticism. If every reading becomes 'what's wrong with me?', you're using tarot as a weapon against yourself. Growth includes celebrating progress, not just cataloging flaws."
        ]
      }
    ],
    faq: [
      { q: "How can tarot help with personal growth?", a: "Tarot acts as a mirror for self-reflection, revealing unconscious patterns, emotional blind spots, and untapped potential. Regular readings create a practice of intentional self-awareness." },
      { q: "What tarot cards indicate spiritual growth?", a: "The Hermit, The Star, The High Priestess, Judgement, and The World are among the strongest indicators of spiritual awakening and personal evolution." },
      { q: "How often should I do personal growth readings?", a: "Monthly readings provide enough space for genuine change to occur between sessions. Weekly pulls can work if focused on different aspects of your development each time." },
      { q: "Can tarot replace therapy?", a: "No. Tarot is a reflective tool, not a therapeutic intervention. It can complement professional support by providing symbolic language for inner experiences, but it's not a substitute for trained mental health care." },
      { q: "What if my growth reading feels negative?", a: "Challenging cards in growth readings aren't negative — they're honest. The Tower in a growth context means breakthrough, not breakdown. Death means necessary release. Reframe 'negative' as 'what needs attention.'" }
    ],
    relatedSlugs: ["spiritual-awakening-tarot", "anxiety-tarot-reading", "love-tarot-reading"]
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
    sections: [
      {
        heading: "How Yes/No Tarot Readings Work",
        body: [
          "Yes/no readings strip tarot down to its most direct form. Instead of layered spreads and positional meanings, you draw a single card and let its energy answer your question. Upright cards generally point toward 'yes.' Reversed cards lean toward 'no.' Some cards — like The Wheel of Fortune or The Moon — sit in 'maybe' territory because the outcome genuinely depends on factors still in motion.",
          "This simplicity is the format's strength. You're not asking for a life narrative. You're asking: should I or shouldn't I? Will it or won't it? The cards respond to that clarity with equally clear energy.",
          "The key to a reliable yes/no reading is a well-formed question. Vague questions get vague answers. 'Will I be happy?' is unanswerable. 'Will accepting this job offer improve my daily satisfaction?' gives the cards something specific to work with."
        ]
      },
      {
        heading: "Which Cards Mean Yes, No, or Maybe",
        body: [
          "Strong yes cards: The Sun radiates pure positivity — almost always yes. The World signals completion and achievement. The Star suggests the answer is yes, with hope and patience. The Ace of any suit says yes, a new beginning is favored.",
          "Strong no cards: The Tower means the situation will collapse if you proceed. The Five of Swords suggests conflict and Pyrrhic victories — technically possible, but not worth it. Death reversed doesn't mean literal danger; it means you're resisting a necessary ending.",
          "Maybe cards: The Wheel of Fortune says the answer is in motion — check back later. The Moon means something is hidden; you don't have enough information yet. The Hanged Man suggests waiting is the answer right now."
        ]
      },
      {
        heading: "When to Use Yes/No Tarot vs. Full Spreads",
        body: [
          "Use yes/no for decisions that need momentum, not analysis. 'Should I apply for this position?' 'Should I text them back?' 'Is this a good day for an important conversation?' These are action-oriented questions that benefit from a direct push.",
          "Avoid yes/no for complex emotional situations. 'Will my marriage survive?' requires a Three Card or Celtic Cross spread because the answer depends on multiple factors that a single card can't capture.",
          "A good rule: if your question can be answered with a single sentence, use yes/no. If it needs a paragraph, use a full spread."
        ]
      }
    ],
    faq: [
      { q: "How accurate are yes or no tarot readings?", a: "Yes/no readings work best for simple, specific questions. Complex life decisions benefit from more detailed spreads like the Three Card or Celtic Cross." },
      { q: "What if I get a 'maybe' answer?", a: "A 'maybe' answer often indicates that the outcome depends on choices you haven't yet made. It's the universe's way of saying the situation is still in flux." },
      { q: "Can I ask yes/no questions about other people?", a: "You can, but the reading reflects the energy between you and the situation — not the other person's private intentions. Keep that distinction in mind." },
      { q: "How many times can I ask the same yes/no question?", a: "Once. Pulling repeatedly for the same question dilutes the reading's accuracy and usually reflects anxiety rather than genuine inquiry. Trust the first card." }
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
    sections: [
      {
        heading: "What Makes Twin Flame Readings Different",
        body: [
          "Twin flame readings aren't regular love readings with a spiritual label. The energy is fundamentally different — more volatile, more transformative, more confronting. Where a soulmate reading feels like warmth, a twin flame reading often feels like fire.",
          "The Tower appears in twin flame readings more than any other context. This isn't bad news — it's the defining feature. Twin flames demolish the false self you've been living as. The relationship forces you to confront everything you've been avoiding about yourself.",
          "If your reading is full of Major Arcana cards — especially Judgement, The Tower, Death, and The Lovers — you're likely dealing with a twin flame connection rather than a conventional romantic attachment."
        ]
      },
      {
        heading: "The Twin Flame Stages in Tarot",
        body: [
          "Recognition phase: The Lovers and The Magician appear together, showing instant recognition and an electric sense of possibility. You feel like you've known this person forever.",
          "Union and crisis: The Devil and The Tower dominate this phase. The Devil shows the intense magnetic pull — it feels addictive and all-consuming. The Tower arrives when the relationship exposes your deepest wounds and forces growth you didn't sign up for.",
          "Separation and reunion: The Hermit appears during separation, showing necessary solo work. The Star signals hope during the dark night. Judgement marks the moment of potential reunion — but only if both people have done their inner work."
        ]
      },
      {
        heading: "Honest Guidance for Twin Flame Seekers",
        body: [
          "Not every intense relationship is a twin flame connection. Trauma bonding, anxious attachment, and codependency can mimic twin flame intensity. If your reading shows the Five of Cups, Nine of Swords, and The Devil together, the cards may be saying: this is painful attachment, not spiritual union.",
          "The healthiest twin flame readings show growth alongside intensity. Look for Strength, Temperance, and The World — cards that indicate you're integrating the lessons rather than just surviving the chaos.",
          "If you're in twin flame separation and the cards keep showing The Hermit and Strength, stop trying to force reunion. The cards are telling you the work is internal right now. Reunion happens naturally once both mirrors are clear."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards indicate a twin flame connection?", a: "The Lovers (soul union), The Tower (intense transformation), Judgement (spiritual awakening), and the Two of Cups (deep connection) are common twin flame indicators." },
      { q: "Can tarot tell me if someone is my twin flame?", a: "Tarot can reveal the energy and depth of a connection, but twin flame recognition ultimately comes from within. Look for cards suggesting intense transformation and spiritual growth." },
      { q: "What's the difference between twin flame and toxic relationship cards?", a: "Twin flame readings show transformation alongside pain (Tower + Star). Toxic relationships show repeated suffering without growth (Five of Cups + Nine of Swords). The presence of growth-oriented Major Arcana is the key difference." },
      { q: "How long does twin flame separation last?", a: "Tarot can't give exact timelines, but The Hermit suggests a period of necessary solitude, while The Wheel of Fortune indicates the cycle will turn when internal work is complete." }
    ],
    relatedSlugs: ["soulmate-tarot-reading", "love-tarot-reading", "breakup-tarot-reading"]
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
    sections: [
      {
        heading: "What Tarot Understands About Heartbreak",
        body: [
          "Tarot doesn't sugarcoat breakups. The Three of Swords shows up and names the pain directly — heartbreak, betrayal, grief. But the cards also show what comes next, and that's where the real value lives. Behind every Three of Swords is a Star waiting to emerge.",
          "Breakup readings often reveal truths you weren't ready to see during the relationship. The Moon may show you the illusions you were maintaining. The Eight of Cups appears when you already know you need to walk away but haven't found the courage yet.",
          "The cards treat breakups as transformative events, not failures. Death doesn't mean something bad happened — it means a necessary ending is creating space for growth that couldn't happen inside the old relationship."
        ]
      },
      {
        heading: "The Emotional Timeline in the Cards",
        body: [
          "Immediately after a breakup, expect heavy cards. The Three of Swords, Five of Cups, and The Tower are honest about where you are. Don't fight them or try to pull 'better' cards. Sitting with the grief is part of the healing.",
          "As weeks pass, the cards shift. Temperance arrives, showing emotional rebalancing. Strength appears, reminding you that resilience isn't about not feeling pain — it's about feeling it and staying whole. The Hermit may suggest a period of intentional solitude.",
          "The turning point comes when cards like the Ace of Cups, The Star, or The Sun start appearing. These signal genuine emotional renewal — not moving on because you should, but because you genuinely feel ready for something new."
        ]
      },
      {
        heading: "What to Ask (and What to Avoid Asking)",
        body: [
          "Helpful questions: 'What lesson does this breakup carry for me?' 'What do I need to heal before I'm ready for a new connection?' 'What strength am I developing through this experience?' These questions empower you.",
          "Unhelpful questions: 'Does my ex miss me?' 'Are they seeing someone else?' 'Will they realize what they lost?' These questions keep you focused on someone who isn't in your life anymore, which is the opposite of healing.",
          "The hardest but most valuable question you can ask post-breakup: 'What was my role in this ending?' Not to blame yourself — but to understand your patterns so the next relationship is genuinely different."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards help with breakup healing?", a: "The Star (renewal and hope), The Empress (self-nurturing), Temperance (emotional balance), and the Ace of Cups (new emotional beginnings) support healing after heartbreak." },
      { q: "Should I do a tarot reading right after a breakup?", a: "Give yourself a few days for the initial shock to settle. Readings done from a place of slight calm yield clearer, more helpful guidance than those driven by acute emotional pain." },
      { q: "Can tarot help me get over a breakup faster?", a: "Tarot doesn't speed up grief, but it provides structure for processing it. Naming your emotions through the cards makes them feel more manageable and less overwhelming." },
      { q: "What if breakup cards keep appearing in unrelated readings?", a: "This means the emotional residue is still affecting other areas of your life. The cards are saying: address the grief before expecting progress elsewhere." }
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
    sections: [
      {
        heading: "The Beautiful Uncertainty of New Love",
        body: [
          "New relationships exist in a liminal space — full of possibility but fragile. You're attracted, excited, maybe already falling, but you don't know if the other person feels the same intensity. Tarot reads this in-between energy with remarkable precision.",
          "The cards won't tell you if this person is 'the one.' But they'll show you the quality of the connection's energy right now — whether it's built on genuine compatibility or projection, mutual interest or one-sided hope, sustainable warmth or just chemistry.",
          "What makes new relationship readings valuable is their ability to name what you can't see through infatuation's lens. When you're caught up in someone new, objectivity disappears. The cards provide the outside perspective your friends are trying to give you, but without the bias."
        ]
      },
      {
        heading: "Cards That Reveal Relationship Potential",
        body: [
          "The Two of Cups is the strongest mutual attraction card. When it appears in a new relationship reading, the energy between you is balanced and reciprocated. This isn't one-sided — they feel it too. Paired with The Lovers, the connection has potential to become deeply significant.",
          "The Ace of Cups signals emotional availability — you're genuinely open to this, not just filling a void. The Page of Cups brings playful, curious energy — the early texts, the discovering each other phase, the 'I can't stop smiling' feeling.",
          "The Knight of Cups riding in suggests someone actively pursuing the connection with romantic intention. If this card appears representing the other person, they're not just casually interested — they're emotionally invested and moving toward you."
        ]
      },
      {
        heading: "Warning Signs to Watch For",
        body: [
          "The Seven of Swords in a new relationship reading raises a question: is someone being fully honest? This doesn't necessarily mean deception — it might mean someone is holding back their true feelings or hasn't disclosed something important yet.",
          "The Moon suggests something you can't see yet. In new relationships, this often means you're falling for a version of the person they're presenting, not who they fully are. Give it time. Real compatibility reveals itself gradually, not in the honeymoon phase.",
          "The reversed Ace of Cups warns about emotional unavailability — either yours or theirs. If you just left a relationship and immediately started a new one, the cards may be asking: are you genuinely ready, or are you using this connection to avoid grieving the last one?"
        ]
      },
      {
        heading: "Nurturing What's Growing",
        body: [
          "The best new relationship readings end with guidance, not just assessment. Temperance appearing suggests: slow down. You don't need to define everything right now. Let the connection develop at its natural pace instead of rushing toward commitment.",
          "The Three of Pentacles in a romantic context says: build something together. Shared activities, collaborative efforts, working on a project — connections strengthen through doing, not just talking and texting.",
          "If the reading is overwhelmingly positive, receive that without immediately searching for problems. Not every new connection needs to be analyzed to death. Sometimes the cards simply say: this is good. Enjoy it. Let yourself be happy without needing to know exactly where it's going."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards mean a new relationship is promising?", a: "Ace of Cups (new love), Two of Cups (mutual connection), The Sun (joy), and The Star (hope) all suggest a promising new relationship with strong positive energy." },
      { q: "When should I do a tarot reading about a new relationship?", a: "Wait until you've had meaningful interactions. Readings about someone you've barely met tend to reflect your projections rather than the actual connection's energy." },
      { q: "Can tarot tell me if a new relationship will last?", a: "Tarot shows the current energy and trajectory, not guaranteed outcomes. Strong foundational cards suggest staying power, but all relationships require ongoing effort regardless of what the cards show." },
      { q: "What if the cards show challenges in my new relationship?", a: "Challenge cards in new relationships often point to personal patterns you're bringing in — not flaws in the connection itself. Address the pattern, and the relationship has room to grow." },
      { q: "Should I tell my new partner I did a tarot reading about us?", a: "That depends on their openness to spiritual tools. If they're receptive, it can be a bonding conversation. If not, keep the insights private and apply them quietly to how you show up in the relationship." }
    ],
    relatedSlugs: ["love-tarot-reading", "soulmate-tarot-reading", "twin-flame-tarot-reading"]
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
    sections: [
      {
        heading: "Why Moving Decisions Carry So Much Weight",
        body: [
          "A home is more than an address. It's where you sleep, where you feel safe, where you become most yourself. Changing that foundation shakes everything above it — routines, relationships, your sense of identity tied to a place.",
          "People turn to tarot for moving decisions because the practical pros-and-cons list never captures the full picture. You can list square footage and commute times, but what about the feeling of a place? The energy of a neighborhood? The intuition that says 'this is right' or 'something feels off'?",
          "Tarot bridges the gap between practical analysis and gut feeling. The cards articulate what your intuition already knows but can't quite put into words."
        ]
      },
      {
        heading: "Cards That Support a Move",
        body: [
          "The Four of Wands is the homecoming card — celebration, stability, and domestic happiness. When it appears in a moving reading, the energy strongly favors the transition. You're moving toward something that will feel like home.",
          "The Chariot represents determined forward movement. In a moving context, it says: you're ready, the path is clear, and momentum is on your side. The Wheel of Fortune suggests the timing is aligned — change is favored right now.",
          "The Ten of Pentacles is the ultimate 'put down roots' card. Legacy, stability, family, long-term investment. If you're asking whether to buy versus rent, or whether this location is a long-term fit, this card says: think generationally, not temporarily."
        ]
      },
      {
        heading: "Cards That Suggest Waiting",
        body: [
          "The Four of Swords says: you need rest, not upheaval. If you're moving to escape something rather than move toward something, the cards will call it out. Running away and starting fresh look similar from the outside, but the energy is completely different.",
          "The reversed Chariot suggests obstacles you haven't accounted for. Hidden costs, timing issues, a lease that falls through, or renovations that snowball. The cards aren't saying 'never move' — they're saying 'not yet, and here's why.'",
          "The Eight of Cups reversed warns about leaving behind something you'll regret losing. Community, a neighborhood you love, proximity to people who matter. Make sure you're accounting for what you're giving up, not just what you're gaining."
        ]
      },
      {
        heading: "Making the Most of Your Moving Reading",
        body: [
          "Ask specific questions: 'What energy surrounds a move to [specific city]?' is more useful than 'Should I move?' The more precise your question, the more actionable the reading becomes.",
          "If you're choosing between two locations, do a separate pull for each and compare the energy. The cards may favor one clearly, or they may show that both are viable but for different reasons — career growth in one place, emotional healing in another.",
          "After your reading, sit with the cards for a day before acting. Moving decisions made in emotional heat — whether excitement or fear — tend to produce regret. The best relocations happen from a place of centered clarity, not reactive urgency."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards suggest a successful move?", a: "The Four of Wands (happy home), Ten of Pentacles (stable foundation), The Chariot (successful transition), and Ace of Pentacles (new material beginning) all suggest positive relocation energy." },
      { q: "Can tarot help me decide where to move?", a: "Tarot won't give you an address, but it can reveal what qualities to prioritize in your new location — stability, community, adventure, or solitude." },
      { q: "What if the cards say don't move but I have to?", a: "Cautionary cards during a necessary move suggest preparing more carefully, not canceling entirely. Address what the cards highlight — finances, timing, emotional readiness — before the move date." },
      { q: "Should I do a reading before signing a lease?", a: "A reading during the decision phase is most valuable. Once you've signed, shift your question to: 'What energy should I bring to this new home?' to make the best of the transition." },
      { q: "Can tarot sense energy about a specific house or apartment?", a: "Tarot can read the energy of your relationship to a place. If a specific property consistently pulls challenging cards, pay attention to your instinct about it — the cards may be confirming something you already sense." }
    ],
    relatedSlugs: ["career-tarot-reading", "personal-growth-tarot-reading", "money-tarot-reading"]
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
    sections: [
      {
        heading: "What Tarot Can (and Cannot) Say About Pregnancy",
        body: [
          "Let's be clear upfront: tarot is not a pregnancy test. The cards read energy and potential, not biology. Fertility-related cards can absolutely appear in a pregnancy reading, but they can also signify creative projects, business ventures, or personal transformation.",
          "That said, tarot has a remarkable ability to reflect the energy surrounding conception and parenthood. Women have reported The Empress or Page of Cups appearing repeatedly in the weeks before discovering a pregnancy. Whether that's coincidence or intuition speaking through symbols, it's a pattern experienced readers recognize.",
          "The most helpful approach: use pregnancy tarot readings for emotional preparation and spiritual alignment, not as a diagnostic tool. The cards can show you your readiness, your fears, and the energy you're bringing to this chapter of life."
        ]
      },
      {
        heading: "Fertility and Motherhood Cards",
        body: [
          "The Empress is the undisputed fertility card. She embodies creation in all its forms — biological, artistic, nurturing. In a pregnancy reading, she signals abundant creative energy and a body or life in harmony with bringing something new into being.",
          "The Ace of Cups represents the beginning of a profound emotional experience. In pregnancy context, it's the overwhelm of new love — the moment you realize everything has changed. The Page of Cups delivers messages and happy news, often associated with announcements.",
          "The Sun radiates pure vitality and joy. In fertility readings, it's the healthiest, most optimistic energy possible — suggesting conditions that support new life and new beginnings. The Three of Cups adds celebration to the mix, often pointing to shared joy with family and friends."
        ]
      },
      {
        heading: "When Challenging Cards Appear",
        body: [
          "The reversed Empress in a pregnancy reading doesn't mean infertility. It often points to creative blocks, self-nurturing issues, or the pressure of societal expectations around motherhood. The cards may be asking: is this desire genuinely yours, or are you responding to external pressure?",
          "The Moon in pregnancy readings signals uncertainty — and that's honest. Trying to conceive, navigating fertility treatments, or facing an unexpected pregnancy all live in the Moon's territory. The card isn't negative; it's acknowledging that you don't have all the answers yet, and that's okay.",
          "The Ten of Swords might feel alarming, but in this context it usually represents the end of a difficult chapter — perhaps the conclusion of a challenging fertility journey, the release of anxiety, or letting go of a specific timeline. Endings create space for beginnings."
        ]
      },
      {
        heading: "Emotional Preparation Through the Cards",
        body: [
          "Pregnancy changes everything — identity, relationships, daily life, your body, your priorities. Tarot can help you prepare emotionally by naming what you're actually feeling beneath the excitement or anxiety.",
          "The Hermit in a pregnancy reading suggests taking time for inner reflection before this major life change. What kind of parent do you want to be? What patterns from your own childhood do you want to break? The Hermit asks these questions gently but directly.",
          "Strength appears frequently in pregnancy readings, reminding you that you have the resilience for this journey. Not brute strength — the quiet, sustained kind. The kind that shows up at 3 AM and keeps going. The cards see that capacity in you, even when you doubt it."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards indicate pregnancy?", a: "The Empress (fertility), Ace of Cups (new emotional life), The Sun (vitality), Page of Cups (happy news), and the Three of Cups (celebration) are commonly associated with pregnancy and new life." },
      { q: "Can tarot predict pregnancy?", a: "Tarot reads energy and potential rather than medical outcomes. Fertility-associated cards may appear to reflect creative energy, new beginnings, or literal pregnancy — context and intuition guide interpretation." },
      { q: "Is it appropriate to do tarot readings about pregnancy?", a: "Yes, when approached as a reflective and emotional tool rather than a medical one. Pregnancy readings can help with emotional readiness, processing fears, and connecting with your intuitive sense of timing." },
      { q: "What if I get 'negative' cards in a pregnancy reading?", a: "Challenging cards usually address emotional blocks, timing, or readiness — not fertility itself. The Tower might mean your timeline needs adjusting, not that pregnancy is impossible." },
      { q: "Can tarot help with fertility anxiety?", a: "Tarot can help externalize fertility anxieties and examine them with some distance. The ritual of a reading creates a container for difficult emotions, which can reduce the spiral of worry." }
    ],
    relatedSlugs: ["love-tarot-reading", "personal-growth-tarot-reading", "new-relationship-tarot-reading"]
  },
  {
    slug: "spiritual-awakening-tarot",
    title: "Spiritual Awakening Tarot Reading — Free",
    h1: "Spiritual Awakening Tarot — Where Are You on the Journey?",
    description: "Free spiritual awakening tarot reading. Discover what stage of spiritual development you're in and what the cards reveal.",
    topic: "growth" as const,
    intro: [
      "Spiritual awakening is not a single moment but an unfolding journey. Tarot's Major Arcana maps this path perfectly — from The Fool's innocent beginning through The World's integrated completion.",
      "The High Priestess signals deepening intuition. The Hermit calls for contemplative withdrawal. The Tower shatters illusions to reveal truth, and The Star promises the hope and clarity that follow dark nights of the soul.",
      "This reading helps you understand where you are on your awakening path and what the next stage of your spiritual evolution may look like."
    ],
    sections: [
      {
        heading: "What Spiritual Awakening Actually Feels Like",
        body: [
          "Social media portrays spiritual awakening as blissful — light, peace, higher consciousness. The reality is messier. Awakening often starts with disorientation. Things that used to satisfy you don't anymore. Relationships feel shallow. Your career seems pointless. You're not depressed — you're outgrowing your old life.",
          "Tarot captures this transition with unflinching honesty. The Tower doesn't show up because something went wrong — it shows up because something went right. Your illusions are cracking, and the truth underneath is demanding your attention.",
          "The cards normalize this uncomfortable process. When The Hermit appears, it validates your need to withdraw. When Death arrives, it confirms that the old version of you is supposed to dissolve. The reading doesn't fix the discomfort — it places it in context."
        ]
      },
      {
        heading: "Stages of Awakening in the Major Arcana",
        body: [
          "The Fool begins in innocence — before the awakening, when you lived on autopilot. The Magician marks the first realization that you can shape your own reality. The High Priestess deepens this into intuitive knowing: there's more to existence than what's visible.",
          "The middle journey is where most awakening people find themselves. The Wheel of Fortune shows you that everything is cyclical. The Hanged Man forces surrender — stop trying to control the process. Death strips away what no longer serves your emerging self.",
          "Late-stage awakening cards carry tremendous power. The Star is the quiet peace after the storm. Judgement calls you to live in alignment with your highest truth. The World represents integration — not perfection, but wholeness. You've gathered every lesson and arrived at yourself."
        ]
      },
      {
        heading: "Common Awakening Reading Patterns",
        body: [
          "If your reading is heavy with Major Arcana cards, you're in an active awakening phase. The soul is demanding attention, and everyday concerns are taking a back seat. This is normal and temporary — your life isn't falling apart, it's rearranging.",
          "The Tower followed by The Star is the most classic awakening sequence. Destruction of illusions followed by genuine hope and clarity. If you're in the Tower phase, know that the Star is coming — but you can't skip to it. The rubble needs to be acknowledged first.",
          "The High Priestess appearing repeatedly suggests your intuition is trying to guide you. You already know the answers — you're just not trusting them yet. This card is a gentle reminder: the voice inside you is wiser than the noise around you."
        ]
      },
      {
        heading: "Supporting Your Awakening Through Tarot Practice",
        body: [
          "Regular readings during a spiritual awakening create continuity in a process that can feel chaotic. Pull a weekly card focused on: 'What is my soul asking me to understand this week?' This creates a spiritual dialogue that deepens over time.",
          "Keep an awakening journal alongside your cards. Note synchronicities, dreams, and the feelings each card evokes. Patterns will emerge that individual readings can't show — recurring themes, cards that stalk you across weeks, gradual shifts from heavy energy to lighter cards.",
          "Be patient with yourself. Awakening isn't a race, and there's no final destination where you're 'done.' Even The World card is a temporary resting place before The Fool begins again. The journey is circular, not linear — and each cycle brings you deeper."
        ]
      }
    ],
    faq: [
      { q: "What tarot cards indicate spiritual awakening?", a: "The High Priestess (intuition), The Hermit (inner wisdom), The Tower (ego dissolution), The Star (spiritual renewal), and Judgement (higher calling) are the primary spiritual awakening cards." },
      { q: "How can tarot support spiritual growth?", a: "Tarot provides a symbolic language for inner experiences that may be hard to articulate. Regular readings create a practice of self-reflection that supports ongoing spiritual development." },
      { q: "Am I having a spiritual awakening or just anxiety?", a: "Both can coexist. Awakening often triggers anxiety as old structures dissolve. If you're questioning reality, feeling disconnected from your former self, and drawn to deeper meaning — that's awakening. Professional support can help you navigate it." },
      { q: "How long does spiritual awakening last?", a: "There's no fixed timeline. Some people experience acute awakening periods lasting months, while others have gradual shifts over years. Tarot can help you identify which phase you're currently in." },
      { q: "Can tarot readings accelerate spiritual awakening?", a: "Tarot doesn't accelerate awakening, but it deepens your engagement with the process. Regular practice builds the self-awareness muscles that make each phase more conscious and less frightening." }
    ],
    relatedSlugs: ["personal-growth-tarot-reading", "anxiety-tarot-reading", "soulmate-tarot-reading"]
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
    sections: [
      {
        heading: "How Tarot Becomes a Grounding Practice",
        body: [
          "Anxiety lives in the future — the 'what ifs,' the catastrophizing, the mental rehearsals of worst-case scenarios. Tarot pulls you into the present moment. The act of shuffling, focusing on a question, turning a card — each step requires presence. And presence is the antidote to anxiety.",
          "The reading itself creates structure for shapeless worry. Instead of a fog of dread, you're looking at specific cards with specific meanings. The Nine of Swords names your anxiety. The Eight of Swords shows where you feel trapped. Suddenly the overwhelming feeling has a shape, a name, and boundaries.",
          "This externalization is therapeutic in itself. Worry that stays inside your head grows. Worry that gets placed on a table in the form of cards becomes manageable. You're not solving the anxiety — you're containing it in a way that lets you examine it without drowning."
        ]
      },
      {
        heading: "Anxiety Cards and What They're Telling You",
        body: [
          "The Nine of Swords is the anxiety card. A figure sitting up in bed, head in hands, swords hanging above. But look closely — the swords aren't touching them. The threat is perceived, not actual. This card's deepest message: your worst fears are mental constructions, not reality.",
          "The Eight of Swords shows a blindfolded figure surrounded by swords, loosely bound. The trap is psychological. The restrictions you feel — about your options, your abilities, your future — are beliefs, not facts. The card literally shows you that movement is possible if you remove the blindfold.",
          "The Moon represents the deep anxiety that comes from not understanding what you're feeling. It's the 3 AM fear, the nameless dread, the sense that something is wrong but you can't identify what. The Moon's gift is this: it passes. What feels overwhelming in darkness becomes clear in morning light."
        ]
      },
      {
        heading: "Cards That Bring Relief",
        body: [
          "Temperance is anxiety's medicine. Balance, patience, moderation — everything that anxiety distorts, Temperance restores. When this card appears, the message is: you don't need to solve everything right now. One step at a time. One breath at a time.",
          "The Star is the card of quiet hope after crisis. Not the manic optimism of 'everything will be fine!' but the gentle knowing that you've survived hard things before and you'll survive this too. It's the dawn after the dark night.",
          "Strength — the woman gently closing the lion's mouth — shows that calming your inner beast doesn't require force. You don't need to fight your anxiety. You need to meet it with patience and steady compassion. That's a fundamentally different approach, and the cards are teaching it."
        ]
      },
      {
        heading: "Building a Tarot Practice for Anxious Minds",
        body: [
          "If you're anxiety-prone, set boundaries around your tarot practice. Don't read obsessively about the same worry. Don't read during a panic attack. Use tarot as a preventive practice — a morning pull that sets your intention, not a reactive tool you reach for in crisis mode.",
          "Try a daily single-card practice focused on: 'What energy supports me today?' This isn't about prediction. It's about shifting your morning focus from dread to curiosity. Over time, this practice rewires how you start your day.",
          "Important reminder: tarot is a complementary tool, not a replacement for professional mental health care. If anxiety is significantly impacting your daily life, the most powerful card you can play is reaching out to a therapist. Tarot and professional support work beautifully together."
        ]
      }
    ],
    faq: [
      { q: "Can tarot help with anxiety?", a: "Tarot can serve as a mindfulness tool, helping you externalize worries and examine them with detachment. The focused ritual of a reading provides grounding structure during anxious moments." },
      { q: "What tarot cards relate to anxiety?", a: "Nine of Swords (worry, overthinking), The Moon (uncertainty, fear), Eight of Swords (feeling trapped), and Five of Cups (dwelling on loss) commonly appear when anxiety is present." },
      { q: "Is it okay to do tarot readings when anxious?", a: "Gentle, structured readings can be calming. But avoid obsessive pulling or reading during acute panic. The best anxiety readings happen from a place of curiosity, not desperation." },
      { q: "What if a tarot reading increases my anxiety?", a: "If cards consistently increase your anxiety, pause the practice. Tarot should reduce worry, not amplify it. Consider whether you're approaching readings seeking reassurance rather than genuine insight." },
      { q: "Can tarot replace therapy for anxiety?", a: "No. Tarot is a reflective tool that complements professional support. If anxiety significantly impacts your daily functioning, a therapist is the most important first step. Tarot can then support the therapeutic process." }
    ],
    relatedSlugs: ["personal-growth-tarot-reading", "spiritual-awakening-tarot", "breakup-tarot-reading"]
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
  const base = "https://auroraeyes.com";
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
