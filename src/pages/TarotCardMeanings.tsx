import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import SnippetBox from "@/components/SnippetBox";
import ReadingCTA from "@/components/ReadingCTA";
import { tarotDeck } from "@/data/tarotDeck";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const CardLink = ({ name }: { name: string }) => (
  <Link to={`/tarot-card-meanings/${slugify(name)}`} className="text-primary hover:underline font-medium">{name}</Link>
);

const faqItems = [
  { q: "How many cards are in a tarot deck?", a: "A standard tarot deck contains 78 cards. Twenty-two belong to the Major Arcana, representing significant life themes, spiritual lessons, and turning points. The remaining 56 form the Minor Arcana, split across four suits — Wands, Cups, Swords, and Pentacles — each reflecting a different dimension of everyday human experience." },
  { q: "What is the difference between Major and Minor Arcana?", a: "The Major Arcana charts the soul's journey from innocence (The Fool) to wholeness (The World). These cards mark pivotal moments — the kind you remember years later. The Minor Arcana captures the texture of daily life: the arguments, the quiet joys, the decisions that feel small but reshape everything. Neither is more important; they need each other to tell the full story." },
  { q: "Can I read tarot for myself?", a: "Yes, and many experienced readers consider self-reading the most honest form of the practice. The challenge is staying open to answers you didn't want to hear. A useful technique: read as though you're advising a close friend. That slight distance helps you interpret without projecting." },
  { q: "Do reversed tarot cards always mean something negative?", a: "Not at all. A reversed card often signals that the energy of the upright meaning is turned inward, delayed, or being reconsidered. The Tower reversed, for instance, can indicate that you've already survived the upheaval and are quietly rebuilding. Context within the spread matters far more than a blanket 'reversed equals bad' rule." },
  { q: "How long does it take to learn tarot?", a: "You can start giving meaningful readings within a few weeks of consistent daily practice. Mastery — the ability to weave cards into a coherent narrative across any spread — typically takes one to three years. The cards themselves are simple; learning to trust the connections your mind draws between them is what takes time." },
  { q: "What tarot card represents love?", a: "The Lovers (VI) is the most direct symbol, but love appears throughout the deck. The Two of Cups represents mutual attraction and emotional partnership. The Empress embodies nurturing, sensual love. The Ten of Cups shows domestic happiness. Even the Devil can speak to love — specifically, the kind of attachment that consumes rather than nourishes." },
  { q: "Should I ask yes-or-no questions in tarot?", a: "You can, but the cards respond better to open-ended questions. Instead of 'Will I get the job?', try 'What do I need to understand about this career opportunity?' The first question limits the reading to a binary answer; the second invites nuance, warnings, and advice you wouldn't otherwise receive." },
  { q: "What is the most powerful tarot card?", a: "There is no single most powerful card — power depends on context. The World represents ultimate completion. The Tower destroys what no longer serves you. The High Priestess holds knowledge that hasn't surfaced yet. Death guarantees transformation. In practice, the most powerful card in any reading is the one that makes you uncomfortable, because that's where your growth lives." },
];

const TarotCardMeanings = () => {
  const majors = tarotDeck.filter((c) => c.arcana === "Major");
  const suits = ["Wands", "Cups", "Swords", "Pentacles"] as const;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      name: "Tarot Card Meanings — Complete 78-Card Guide",
      headline: "Tarot Card Meanings — Complete Guide to All 78 Cards",
      description: "In-depth guide to all 78 tarot card meanings. Learn the Major Arcana, Minor Arcana suits, upright and reversed interpretations, and how to read tarot with confidence.",
      author: { "@type": "Organization", name: "Aurora Eyes" },
      publisher: { "@type": "Organization", name: "Aurora Eyes" },
    },
    { "@context": "https://schema.org", ...generateFAQJsonLd(faqItems) },
  ];

  return (
    <>
      <SEOHead
        title="Tarot Card Meanings — Complete 78-Card Guide"
        description="In-depth guide to all 78 tarot card meanings. Learn Major Arcana, Minor Arcana, upright & reversed interpretations, and how to read tarot with real insight."
        canonicalPath="/tarot-card-meanings"
        jsonLd={jsonLd}
      />
      <motion.article className="max-w-4xl mx-auto pt-6 px-4 pb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={[{ label: "Tarot Guide", href: "/tarot-guide" }, { label: "Card Meanings" }]} />

        {/* ─── HERO / H1 ─── */}
        <header className="text-center pb-8">
          <h1 className="text-3xl md:text-5xl font-heading gold-text mb-4 tracking-wider leading-tight">
            Tarot Card Meanings
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            A complete guide to every card in the deck — what each one reveals, why it appears, and how to read it in context.
          </p>
        </header>

        <SnippetBox
          question="What are the 78 tarot card meanings?"
          answer="A tarot deck holds 78 cards. The 22 Major Arcana — from The Fool to The World — trace the arc of human experience: innocence, challenge, transformation, and integration. The 56 Minor Arcana divide into four suits (Wands, Cups, Swords, Pentacles), each governing a domain of daily life. Every card carries an upright and reversed meaning, shaped by its position in the spread and the cards surrounding it."
        />

        {/* ─── INTRODUCTION ─── */}
        <section className="prose-section mb-10">
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Tarot is older than most of the institutions we trust to explain the world. The earliest known decks date to 15th-century northern Italy, where they were used for a card game called <em>tarocchi</em>. Somewhere between the gaming tables of Milan and the occult salons of 18th-century Paris, the cards acquired a second life — as a mirror for the psyche, a language for things we sense but struggle to articulate.
            </p>
            <p>
              What makes tarot endure isn't mysticism. It's pattern recognition. Each card encodes a human situation — loss, ambition, intimacy, stagnation, breakthrough — and when you lay them out, you're forced to confront which patterns are running your life right now. The cards don't predict the future in the way a weather forecast does. They illuminate the trajectory you're on, and what happens if you stay on it.
            </p>
            <p>
              This guide covers every card in the standard 78-card Rider-Waite-Smith tradition: what it depicts, what it means upright and reversed, and — most importantly — how to read it as part of a larger story rather than an isolated symbol. Whether you've been reading for years or picked up your first deck yesterday, the goal here is the same: depth over memorisation.
            </p>
          </div>
        </section>

        {/* ─── WHAT ARE TAROT CARDS? ─── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl md:text-2xl gold-text mb-4">What Are Tarot Cards?</h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              A tarot deck is a structured symbolic system. Seventy-eight images, arranged in a specific hierarchy, covering the full range of human psychology and circumstance. The deck splits into two groups:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Major Arcana (22 cards)</strong> — Archetypal forces. These are the big currents: identity crises, spiritual awakenings, relationships that redefine you, losses that reshape your worldview. When Major Arcana cards dominate a reading, the situation is significant and often beyond your immediate control.</li>
              <li><strong>Minor Arcana (56 cards)</strong> — The texture of lived experience. Four suits of fourteen cards each, covering practical matters, emotional states, mental patterns, and material concerns. These are the choices you make every day — the ones that, accumulated, become your life.</li>
            </ul>
            <p>
              The Rider-Waite-Smith deck, published in 1909 and illustrated by Pamela Colman Smith under the direction of Arthur Edward Waite, remains the most widely used system. Its imagery draws from Kabbalah, astrology, numerology, and Christian symbolism — but you don't need to study any of those traditions to read it effectively. The images are designed to be intuitive. A person drowning in cups. A figure walking away from stacked pentacles. A tower struck by lightning. The cards speak in a visual grammar that predates language.
            </p>
            <h3 className="font-heading text-base md:text-lg text-foreground mt-6 mb-2">How Tarot Is Used Today</h3>
            <p>
              Modern tarot practice spans a wide spectrum. Some readers approach the cards as a divination tool — a way to access information beyond ordinary perception. Others use them as a psychological framework, similar to active imagination techniques in Jungian therapy. Many fall somewhere between: they don't claim the cards are supernatural, but they've noticed that the "random" card they pull has an uncanny way of addressing exactly what they were avoiding thinking about.
            </p>
            <p>
              The most honest answer is that tarot works as a focusing mechanism. It gives you seventy-eight possible lenses through which to examine a situation. The act of shuffling, asking a question, and laying out cards forces you to slow down and consider angles you'd otherwise dismiss. Whether the insight comes from the cards or from your own subconscious is, for practical purposes, beside the point.
            </p>
          </div>
        </section>

        {/* ─── MAJOR ARCANA ─── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl md:text-2xl gold-text mb-4">The Major Arcana — 22 Cards of the Soul's Journey</h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
            <p>
              The Major Arcana tells a single story, sometimes called "The Fool's Journey." It begins with <CardLink name="The Fool" /> — pure potential, standing at the edge of a cliff, unburdened by experience — and ends with <CardLink name="The World" />, which represents integration, completion, and the wisdom that comes from having lived through everything in between.
            </p>
            <p>
              Along the way, The Fool encounters every fundamental human experience: the creative spark of <CardLink name="The Magician" />, the hidden knowledge of <CardLink name="The High Priestess" />, the nurturing abundance of <CardLink name="The Empress" />, the structural authority of <CardLink name="The Emperor" />. There are trials — the sudden collapse of <CardLink name="The Tower" />, the disorientation of <CardLink name="The Moon" />, the necessary endings of <CardLink name="Death" />. And there are gifts: the quiet clarity of <CardLink name="The Hermit" />, the karmic balance of <CardLink name="Justice" />, the radiant vitality of <CardLink name="The Sun" />.
            </p>
            <p>
              When these cards appear in a reading, pay attention. They mark moments that matter — the kind you'll look back on as turning points.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {majors.map((card) => (
              <Link key={card.id} to={`/tarot-card-meanings/${slugify(card.name)}`} className="reading-panel rounded-lg p-3 hover:gold-glow transition-all text-center group flex flex-col items-center">
                <div className="w-14 h-[84px] md:w-16 md:h-24 rounded overflow-hidden mb-2 border border-primary/15 group-hover:border-primary/40 transition-colors">
                  <img src={card.image} alt={`${card.name} tarot card`} className="w-full h-full object-cover" loading="lazy" width={64} height={96} />
                </div>
                <span className="text-xs font-heading text-primary">{card.name}</span>
                <span className="text-[10px] text-muted-foreground block mt-1">{card.keywords.slice(0, 2).join(", ")}</span>
              </Link>
            ))}
          </div>
        </section>

        <ReadingCTA
          title="Experience the Cards First-Hand"
          description="Theory only goes so far. Pull three cards and see what they reveal about where you are right now."
          label="Start a Free Three-Card Reading"
        />

        {/* ─── MINOR ARCANA ─── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl md:text-2xl gold-text mb-4">The Minor Arcana — Four Suits, Four Dimensions of Life</h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
            <p>
              If the Major Arcana is the plot, the Minor Arcana is the dialogue — the daily exchanges, small decisions, and shifting moods that determine how the larger story actually plays out. Fifty-six cards across four suits, each suit governing a specific element and life domain:
            </p>
          </div>

          {/* Wands */}
          <div className="mb-8">
            <h3 className="font-heading text-lg text-foreground mb-3">♦ Wands — Fire, Ambition, Creative Drive</h3>
            <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              <p>
                Wands are the suit of action. They govern willpower, inspiration, entrepreneurial energy, sexual desire, and the raw impulse to create something that didn't exist before. When Wands dominate a spread, the situation is moving fast — sometimes faster than you're ready for.
              </p>
              <p>
                The Ace of Wands is a spark: a new idea, a sudden attraction, the feeling that something exciting is about to begin. By the Ten of Wands, that spark has become a burden — too many commitments, creative exhaustion, the weight of projects you started with enthusiasm but now carry out of obligation. The journey from Ace to Ten mirrors the lifecycle of any passion.
              </p>
              <p>
                Court cards — Page, Knight, Queen, King — represent people or energies at different stages of maturity. The Page of Wands is enthusiastic but untested. The Knight charges forward without looking back. The Queen channels creative energy with warmth and confidence. The King commands with vision and authority but risks becoming controlling.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {tarotDeck.filter((c) => c.suit === "Wands").map((card) => (
                <Link key={card.id} to={`/tarot-card-meanings/${slugify(card.name)}`} className="reading-panel rounded-lg p-3 hover:gold-glow transition-all text-center group flex flex-col items-center">
                  <div className="w-14 h-[84px] md:w-16 md:h-24 rounded overflow-hidden mb-2 border border-primary/15 group-hover:border-primary/40 transition-colors">
                    <img src={card.image} alt={`${card.name} tarot card`} className="w-full h-full object-cover" loading="lazy" width={64} height={96} />
                  </div>
                  <span className="text-xs font-heading text-primary">{card.name}</span>
                  <span className="text-[10px] text-muted-foreground block mt-1">{card.keywords.slice(0, 2).join(", ")}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Cups */}
          <div className="mb-8">
            <h3 className="font-heading text-lg text-foreground mb-3">♥ Cups — Water, Emotions, Relationships</h3>
            <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              <p>
                Cups govern the inner world: feelings, relationships, intuition, dreams, and the stories we tell ourselves about love. Water is the element here — fluid, deep, capable of nurturing and of drowning.
              </p>
              <p>
                The Ace of Cups overflows with emotional potential — new love, creative inspiration, spiritual opening. The Five of Cups shows grief, focused on what's been lost while two full cups stand untouched behind. The Ten of Cups is the emotional ideal: family harmony, lasting contentment, the rare feeling that everything is exactly as it should be.
              </p>
              <p>
                Watch for the Seven of Cups when someone is lost in fantasy, and the Four of Cups when emotional apathy has set in. These cards don't judge — they describe. The reading's job is to help you see what you're doing with your emotional energy and whether it's serving you.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {tarotDeck.filter((c) => c.suit === "Cups").map((card) => (
                <Link key={card.id} to={`/tarot-card-meanings/${slugify(card.name)}`} className="reading-panel rounded-lg p-3 hover:gold-glow transition-all text-center group flex flex-col items-center">
                  <div className="w-14 h-[84px] md:w-16 md:h-24 rounded overflow-hidden mb-2 border border-primary/15 group-hover:border-primary/40 transition-colors">
                    <img src={card.image} alt={`${card.name} tarot card`} className="w-full h-full object-cover" loading="lazy" width={64} height={96} />
                  </div>
                  <span className="text-xs font-heading text-primary">{card.name}</span>
                  <span className="text-[10px] text-muted-foreground block mt-1">{card.keywords.slice(0, 2).join(", ")}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Swords */}
          <div className="mb-8">
            <h3 className="font-heading text-lg text-foreground mb-3">♠ Swords — Air, Thought, Conflict, Truth</h3>
            <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              <p>
                Swords cut. They represent the mind in all its capacities: analysis, communication, decision-making, anxiety, and the particular cruelty of thoughts that won't stop circling. This is the suit people tend to fear, because mental suffering — unlike a broken bone — has no obvious endpoint.
              </p>
              <p>
                The Ace of Swords is clarity: a breakthrough insight, the moment you finally see the situation for what it is. The Three of Swords is heartbreak rendered in a single image — three blades through a red heart, rain falling. The Nine of Swords depicts insomnia-grade anxiety, head in hands at 3 AM. But the suit also contains liberation: the Six of Swords shows passage to calmer waters, and the Queen of Swords embodies someone who has survived enough to tell the truth without flinching.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {tarotDeck.filter((c) => c.suit === "Swords").map((card) => (
                <Link key={card.id} to={`/tarot-card-meanings/${slugify(card.name)}`} className="reading-panel rounded-lg p-3 hover:gold-glow transition-all text-center group flex flex-col items-center">
                  <div className="w-14 h-[84px] md:w-16 md:h-24 rounded overflow-hidden mb-2 border border-primary/15 group-hover:border-primary/40 transition-colors">
                    <img src={card.image} alt={`${card.name} tarot card`} className="w-full h-full object-cover" loading="lazy" width={64} height={96} />
                  </div>
                  <span className="text-xs font-heading text-primary">{card.name}</span>
                  <span className="text-[10px] text-muted-foreground block mt-1">{card.keywords.slice(0, 2).join(", ")}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Pentacles */}
          <div className="mb-8">
            <h3 className="font-heading text-lg text-foreground mb-3">♣ Pentacles — Earth, Material World, Body, Work</h3>
            <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              <p>
                Pentacles (sometimes called Coins or Discs) ground the deck in physical reality. Money, health, career, property, craft — anything you can touch, measure, or build with your hands. This suit moves slowly. Where Wands spark and Swords cut, Pentacles grow. The timeline is seasons, not days.
              </p>
              <p>
                The Ace of Pentacles is a seed: a job offer, a financial opportunity, the decision to invest in something tangible. The Eight of Pentacles shows mastery through repetition — the apprentice who has done the work so many times it's become art. The Ten of Pentacles depicts generational wealth, legacy, the fruits of decades of steady effort. On the shadow side, the Five of Pentacles shows material hardship and the isolation that accompanies it, while the Four of Pentacles warns against gripping so tightly to what you have that you can't receive anything new.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {tarotDeck.filter((c) => c.suit === "Pentacles").map((card) => (
                <Link key={card.id} to={`/tarot-card-meanings/${slugify(card.name)}`} className="reading-panel rounded-lg p-3 hover:gold-glow transition-all text-center group flex flex-col items-center">
                  <div className="w-14 h-[84px] md:w-16 md:h-24 rounded overflow-hidden mb-2 border border-primary/15 group-hover:border-primary/40 transition-colors">
                    <img src={card.image} alt={`${card.name} tarot card`} className="w-full h-full object-cover" loading="lazy" width={64} height={96} />
                  </div>
                  <span className="text-xs font-heading text-primary">{card.name}</span>
                  <span className="text-[10px] text-muted-foreground block mt-1">{card.keywords.slice(0, 2).join(", ")}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── UPRIGHT VS REVERSED ─── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl md:text-2xl gold-text mb-4">Upright vs. Reversed Tarot Card Meanings</h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              When a card lands upright, its energy is expressed outwardly and directly. <CardLink name="The Empress" /> upright radiates fertility, abundance, and creative power. She's fully present and active in your life.
            </p>
            <p>
              Reversed, the same card turns inward. The Empress reversed might indicate creative block, neglecting self-care, or difficulty receiving love. The archetype is still there — it's just operating in shadow, muted, or internalised.
            </p>
            <h3 className="font-heading text-base md:text-lg text-foreground mt-6 mb-2">Common Reversal Patterns</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Blocked energy:</strong> The quality is present but can't express itself. The Chariot reversed: willpower exists, but conflicting desires prevent forward motion.</li>
              <li><strong>Excess:</strong> Too much of a good thing. Strength reversed can indicate dominance rather than quiet confidence.</li>
              <li><strong>Delay:</strong> The outcome isn't cancelled, just postponed. The Wheel of Fortune reversed: the cycle will turn, but not on your preferred timeline.</li>
              <li><strong>Internalisation:</strong> The experience happens privately. <CardLink name="The Hermit" /> reversed: the withdrawal has become isolation rather than productive solitude.</li>
              <li><strong>Resistance:</strong> You're aware of what the card represents but are actively refusing to engage with it. <CardLink name="Death" /> reversed: clinging to something that has already ended.</li>
            </ul>
            <p>
              Not every reader uses reversals. Some prefer to read all cards upright and rely on surrounding cards for nuance. Neither approach is wrong — the key is consistency within your own practice.
            </p>
          </div>
        </section>

        {/* ─── HOW TO READ TAROT ─── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl md:text-2xl gold-text mb-4">How to Read Tarot Cards — A Practical Guide</h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Reading tarot is a skill, not a gift. You learn it the same way you learn any language: through immersion, repetition, and a willingness to be wrong until you're not. Here's a framework that works for both beginners and experienced readers revisiting fundamentals.
            </p>

            <h3 className="font-heading text-base md:text-lg text-foreground mt-6 mb-2">Step 1: Formulate a Clear Question</h3>
            <p>
              The quality of your reading depends almost entirely on the quality of your question. Vague questions produce vague readings. "What should I know about my career situation?" will always yield more useful information than "Will things get better?" Avoid yes/no framing when possible — the cards are narrative tools, not coin flips.
            </p>

            <h3 className="font-heading text-base md:text-lg text-foreground mt-6 mb-2">Step 2: Choose and Lay Your Spread</h3>
            <p>
              A <Link to="/tarot-spreads/three-card-spread" className="text-primary hover:underline">three-card spread</Link> (past-present-future or situation-challenge-advice) is the best starting point. It provides enough structure for a meaningful reading without overwhelming a new reader. As you develop confidence, explore the <Link to="/tarot-spreads/celtic-cross" className="text-primary hover:underline">Celtic Cross</Link> for complex situations or a <Link to="/yes-or-no-tarot" className="text-primary hover:underline">single-card draw</Link> for daily reflection.
            </p>

            <h3 className="font-heading text-base md:text-lg text-foreground mt-6 mb-2">Step 3: Read Individual Cards First</h3>
            <p>
              Before connecting cards to each other, spend time with each one independently. What's happening in the image? What emotions does it evoke? What's the traditional meaning, and how does it apply to the question? Only after you've sat with each card individually should you begin weaving them together.
            </p>

            <h3 className="font-heading text-base md:text-lg text-foreground mt-6 mb-2">Step 4: Find the Narrative Thread</h3>
            <p>
              The cards are telling a story. Your job is to find it. Look for recurring themes: multiple Cups suggest an emotionally driven situation; several Major Arcana cards indicate forces beyond your control; a progression from low-numbered to high-numbered cards suggests development over time. The narrative emerges from the connections, not from any single card.
            </p>

            <h3 className="font-heading text-base md:text-lg text-foreground mt-6 mb-2">Step 5: Sit With Discomfort</h3>
            <p>
              If the reading is uncomfortable, it's probably accurate. The temptation to re-draw "clarifier" cards or reinterpret something unpleasant is strong. Resist it. The most valuable readings are the ones that tell you what you already suspected but weren't ready to admit.
            </p>
          </div>
        </section>

        <ReadingCTA
          title="Put Theory Into Practice"
          description="Choose your spread, focus your question, and let the cards speak. No account needed."
          label="Begin Your Reading Now"
        />

        {/* ─── TAROT IN LOVE, CAREER, SPIRITUAL LIFE ─── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl md:text-2xl gold-text mb-4">Tarot in Love, Career, and Spiritual Life</h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <h3 className="font-heading text-base md:text-lg text-foreground mt-2 mb-2">Love and Relationships</h3>
            <p>
              Tarot excels at revealing relationship dynamics that are hard to articulate. The Two of Cups appearing with the Four of Swords, for example, might indicate a partnership where both people care deeply but have retreated into emotional silence. <CardLink name="The Lovers" /> in a career position often means the relationship <em>is</em> the decision — you're choosing between a person and something else.
            </p>
            <p>
              For <Link to="/love-tarot-reading" className="text-primary hover:underline">love readings</Link>, pay special attention to the Cups suit, The Empress, The Emperor, and the relationship cards in the Major Arcana. But don't ignore Swords — unspoken truths and communication failures show up there. Explore specific themes like <Link to="/soulmate-tarot-reading" className="text-primary hover:underline">soulmate readings</Link>, <Link to="/twin-flame-tarot-reading" className="text-primary hover:underline">twin flame dynamics</Link>, or the difficult question of <Link to="/will-my-ex-come-back-tarot" className="text-primary hover:underline">whether an ex will return</Link>.
            </p>

            <h3 className="font-heading text-base md:text-lg text-foreground mt-6 mb-2">Career and Finances</h3>
            <p>
              The Pentacles suit drives most <Link to="/career-tarot-reading" className="text-primary hover:underline">career readings</Link>, but some of the most revealing career cards sit outside it. The Eight of Wands can indicate rapid professional developments. <CardLink name="The Magician" /> suggests you have every tool you need — the question is whether you're using them. <CardLink name="The Hermit" /> in a career spread often means the answer isn't another application or meeting, but a period of strategic withdrawal to figure out what you actually want.
            </p>
            <p>
              For financial questions, the Ace of Pentacles and Ten of Pentacles are the two poles of the journey: opportunity and legacy. Everything between tells you what's required to get from one to the other. See also our <Link to="/money-tarot-reading" className="text-primary hover:underline">money-focused readings</Link> and <Link to="/should-i-change-careers-tarot" className="text-primary hover:underline">career change guidance</Link>.
            </p>

            <h3 className="font-heading text-base md:text-lg text-foreground mt-6 mb-2">Spiritual Growth and Self-Discovery</h3>
            <p>
              The Major Arcana is essentially a map of spiritual development. <CardLink name="The High Priestess" /> marks the threshold of intuitive knowing. <CardLink name="The Hanged Man" /> demands surrender — the recognition that some problems can't be solved through effort alone. <CardLink name="The Star" /> appears after The Tower's destruction, offering the quiet promise that meaning will return.
            </p>
            <p>
              For those on a <Link to="/spiritual-awakening-tarot" className="text-primary hover:underline">spiritual awakening path</Link> or working through <Link to="/anxiety-tarot-reading" className="text-primary hover:underline">anxiety</Link>, the cards serve as checkpoints. They won't tell you the destination, but they'll show you where you are on the map — and whether you're moving or stuck.
            </p>
          </div>
        </section>

        {/* ─── FAQS ─── */}
        <FAQSection items={faqItems} />

        {/* ─── INTERNAL LINKS ─── */}
        <InternalLinks
          links={[
            { to: "/tarot-combinations", label: "Card Combinations" },
            { to: "/tarot-spreads", label: "Spread Guides" },
            { to: "/tarot-comparisons", label: "Card Comparisons" },
            { to: "/free-tarot-reading", label: "Free Tarot Reading" },
            { to: "/yes-or-no-tarot", label: "Yes or No Tarot" },
            { to: "/love-tarot-reading", label: "Love Tarot Reading" },
            { to: "/career-tarot-reading", label: "Career Tarot Reading" },
            { to: "/tarot-guide", label: "Complete Tarot Guide" },
            { to: "/rune-meanings", label: "Rune Meanings" },
            { to: "/angel-cards-guide", label: "Angel Cards Guide" },
          ]}
        />
      </motion.article>
    </>
  );
};

export default TarotCardMeanings;
