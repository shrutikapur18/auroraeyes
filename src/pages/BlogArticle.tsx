import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import ReadingCTA from "@/components/ReadingCTA";

const articles: Record<string, {
  title: string;
  description: string;
  content: string[];
  faq: { q: string; a: string }[];
  relatedLinks: { to: string; label: string }[];
}> = {
  "how-tarot-readings-work": {
    title: "How Tarot Readings Work: A Complete Guide",
    description: "Learn the fundamentals of tarot reading — deck structure, card meanings, spreads, and how to interpret your reading.",
    content: [
      "Tarot reading is a centuries-old practice of using a deck of 78 cards to gain insight into past, present, and future events. The deck is divided into two groups: the 22 Major Arcana cards, which represent major life themes and spiritual lessons, and the 56 Minor Arcana cards, which reflect everyday experiences across four suits.",
      "The four suits — Wands (fire/action), Cups (water/emotions), Swords (air/thought), and Pentacles (earth/material) — each tell different aspects of your story. When combined in a spread, these cards create a narrative that speaks directly to your question.",
      "A tarot reading begins with a question or intention. The cards are shuffled, focusing your energy into the deck. Cards are then drawn and placed in specific positions — each position adds context to the card's meaning.",
      "The most common spreads include the Three Card Spread (Past, Present, Future) for quick insights, and the Celtic Cross Spread for deep, layered analysis of complex situations.",
      "Whether you believe the cards are guided by the universe, your subconscious, or simply serve as a mirror for reflection, tarot readings provide a framework for exploring your questions with depth and nuance."
    ],
    faq: [
      { q: "How do tarot readings work?", a: "Tarot readings work by drawing cards from a 78-card deck and interpreting their symbolism in relation to your question. Each card carries specific meanings that shift depending on position, orientation (upright or reversed), and surrounding cards." },
      { q: "Are tarot readings accurate?", a: "Tarot readings are most accurate when used as a reflective tool. They reveal patterns, possibilities, and perspectives rather than fixed predictions. Their value lies in prompting self-awareness and informed decision-making." },
      { q: "Can I do a tarot reading for myself?", a: "Yes, self-readings are common and effective. Approach them with an open mind, ask clear questions, and trust your intuitive response to the cards." },
    ],
    relatedLinks: [
      { to: "/free-tarot-reading", label: "Get a Free Tarot Reading" },
      { to: "/tarot-card-meanings", label: "All Card Meanings" },
      { to: "/blog/tarot-spreads-explained", label: "Spreads Explained" },
    ],
  },
  "major-arcana-guide": {
    title: "The Major Arcana: Understanding the 22 Trump Cards",
    description: "Discover the profound symbolism and spiritual journey depicted in the 22 Major Arcana cards.",
    content: [
      "The Major Arcana consists of 22 cards numbered 0 through 21, representing significant life events, spiritual lessons, and archetypal energies. Together, they tell the story of The Fool's Journey — a metaphor for the path of personal growth.",
      "Beginning with The Fool (0), who represents new beginnings and unlimited potential, the journey progresses through stages of learning (The Magician, The High Priestess), worldly experience (The Emperor, The Empress), and spiritual awakening (The Star, The Moon, The Sun).",
      "The journey culminates with The World (21), symbolizing completion, wholeness, and the integration of all lessons learned. When a Major Arcana card appears in your reading, pay special attention — it signals a significant theme or turning point.",
      "Major Arcana cards carry more weight than Minor Arcana cards. A reading with multiple Major Arcana cards suggests a period of profound change and spiritual significance in your life."
    ],
    faq: [
      { q: "What are the 22 Major Arcana cards?", a: "The 22 Major Arcana cards are: The Fool, The Magician, The High Priestess, The Empress, The Emperor, The Hierophant, The Lovers, The Chariot, Strength, The Hermit, Wheel of Fortune, Justice, The Hanged Man, Death, Temperance, The Devil, The Tower, The Star, The Moon, The Sun, Judgement, and The World." },
      { q: "What is The Fool's Journey?", a: "The Fool's Journey is a narrative framework where The Fool (card 0) travels through each Major Arcana card in sequence, learning life lessons and undergoing spiritual transformation, ending with The World — completion and wholeness." },
    ],
    relatedLinks: [
      { to: "/tarot-card-meanings/the-fool", label: "The Fool" },
      { to: "/tarot-card-meanings/the-world", label: "The World" },
      { to: "/free-tarot-reading", label: "Free Tarot Reading" },
    ],
  },
  "how-rune-casting-works": {
    title: "How Rune Casting Works: Ancient Norse Divination",
    description: "Explore the history and practice of Elder Futhark rune casting for divination and guidance.",
    content: [
      "Rune casting is one of the oldest forms of divination in Northern Europe, dating back to the Viking Age and beyond. The Elder Futhark, the oldest runic alphabet, consists of 24 symbols carved into stone, bone, or wood.",
      "Each rune carries deep symbolic meaning drawn from Norse mythology, nature, and the human experience. Fehu (ᚠ) represents wealth, Uruz (ᚢ) embodies strength, and Ansuz (ᚨ) channels divine communication.",
      "In a rune reading, stones are cast or drawn and interpreted based on their position and orientation. A three-rune spread — representing Past, Present, and Future — is the most common layout for personal guidance.",
      "Some runes, like Hagalaz and Jera, have no reversed meaning — their message remains constant regardless of orientation. Others, when reversed, reveal shadow aspects or blocked energies."
    ],
    faq: [
      { q: "How does rune casting work?", a: "Rune casting involves drawing or tossing inscribed stones and interpreting the symbols based on their position and orientation. Each of the 24 Elder Futhark runes carries specific meanings related to forces of nature, human experience, and Norse cosmology." },
      { q: "How many runes are in the Elder Futhark?", a: "The Elder Futhark contains 24 runes, divided into three groups of eight called aettir (families). Each aett is associated with a different Norse deity." },
    ],
    relatedLinks: [
      { to: "/rune-reading", label: "Get a Rune Reading" },
      { to: "/rune-meanings", label: "All Rune Meanings" },
    ],
  },
  "angel-card-guidance-beginners": {
    title: "Angel Card Guidance for Beginners",
    description: "Learn how angel oracle cards provide loving, uplifting messages from archangels and guardian angels.",
    content: [
      "Angel cards are oracle cards designed to connect you with the loving energy of angels. Unlike tarot, angel cards never carry fear-based or negative messages — every card offers encouragement, comfort, and divine guidance.",
      "Angel card decks typically feature named archangels (Michael, Gabriel, Raphael) alongside themed angel messengers (Angel of Hope, Angel of Courage). Each card carries a specific message, keywords, and symbolic imagery.",
      "To use angel cards, simply quiet your mind, ask a question or set an intention, and draw one to three cards. The messages are meant to be taken at face value — no complex interpretation required.",
      "Angel card readings are ideal for those seeking comfort during difficult times, spiritual reassurance, or gentle guidance without the complexity of traditional tarot."
    ],
    faq: [
      { q: "What is the difference between angel cards and tarot cards?", a: "Angel cards are oracle cards that deliver only positive, encouraging messages. Tarot cards use a structured 78-card system with both positive and challenging cards. Angel cards are simpler to read and ideal for gentle guidance." },
    ],
    relatedLinks: [
      { to: "/angel-card-reading", label: "Angel Card Reading" },
      { to: "/daily-angel-message", label: "Daily Angel Message" },
    ],
  },
  "tarot-spreads-explained": {
    title: "Tarot Spreads Explained: Three Card vs Celtic Cross",
    description: "Compare popular tarot spreads and learn when to use each for the most insightful readings.",
    content: [
      "A tarot spread is the pattern in which cards are laid out during a reading. Each position in the spread adds a layer of meaning to the card placed there.",
      "The Three Card Spread is the most versatile and beginner-friendly layout. Cards represent Past, Present, and Future — giving you a clear narrative arc. It's perfect for quick questions and daily guidance.",
      "The Celtic Cross is a 10-card spread offering comprehensive analysis. It covers your present situation, immediate challenge, past influences, future energy, conscious and subconscious factors, advice, external influences, hopes and fears, and the final outcome.",
      "Choose the Three Card Spread for everyday questions and the Celtic Cross when you need deep insight into complex situations."
    ],
    faq: [
      { q: "What is the best tarot spread for beginners?", a: "The Three Card Spread (Past, Present, Future) is the best for beginners. It's simple to learn, versatile, and provides clear narrative structure for any question." },
      { q: "How many cards are in the Celtic Cross spread?", a: "The Celtic Cross uses 10 cards, each in a specific position covering your present situation, challenges, past, future, subconscious, advice, environment, hopes/fears, and outcome." },
    ],
    relatedLinks: [
      { to: "/free-tarot-reading", label: "Try Both Spreads" },
      { to: "/blog/how-tarot-readings-work", label: "How Tarot Works" },
    ],
  },
  "reversed-tarot-cards": {
    title: "What Do Reversed Tarot Cards Mean?",
    description: "Understanding reversed cards adds depth and nuance to your tarot readings.",
    content: [
      "When a tarot card appears upside-down (reversed), its meaning shifts. Reversals don't necessarily mean the opposite of the upright meaning — they often indicate blocked energy, internalized lessons, or the shadow side of the card's theme.",
      "For example, The Sun upright represents joy and success, while reversed it may suggest temporary setbacks or overconfidence rather than complete failure.",
      "Some readers choose not to use reversals at all, and that's perfectly valid. If you do use them, they add a second dimension to every card, effectively doubling the vocabulary of your readings.",
      "Pay attention to patterns: a reading with many reversals may suggest internal work is needed before external progress can occur."
    ],
    faq: [
      { q: "Should I read reversed tarot cards?", a: "It's a personal choice. Reversed cards add nuance and depth, effectively doubling your interpretive vocabulary. Beginners can start without reversals and add them later as they gain confidence." },
    ],
    relatedLinks: [
      { to: "/tarot-card-meanings", label: "All Card Meanings" },
      { to: "/free-tarot-reading", label: "Free Reading" },
    ],
  },
  "zodiac-and-tarot-connection": {
    title: "The Connection Between Zodiac Signs and Tarot",
    description: "Discover how each zodiac sign corresponds to a tarot card for deeper astrological insight.",
    content: [
      "Tarot and astrology are deeply interconnected. Each zodiac sign is associated with a Major Arcana card, and the four tarot suits correspond to the four elements of astrology.",
      "Fire signs (Aries, Leo, Sagittarius) connect to Wands — representing passion, action, and ambition. Water signs (Cancer, Scorpio, Pisces) connect to Cups — representing emotions, intuition, and relationships.",
      "Air signs (Gemini, Libra, Aquarius) connect to Swords — representing intellect, communication, and conflict. Earth signs (Taurus, Virgo, Capricorn) connect to Pentacles — representing material concerns, work, and stability.",
      "Understanding your zodiac-tarot connection can add a personal layer to your readings, highlighting themes that naturally resonate with your astrological energy."
    ],
    faq: [
      { q: "Which tarot card represents my zodiac sign?", a: "Each sign has a Major Arcana match: Aries=The Emperor, Taurus=The Hierophant, Gemini=The Lovers, Cancer=The Chariot, Leo=Strength, Virgo=The Hermit, Libra=Justice, Scorpio=Death, Sagittarius=Temperance, Capricorn=The Devil, Aquarius=The Star, Pisces=The Moon." },
    ],
    relatedLinks: [
      { to: "/zodiac/aries-tarot-reading", label: "Aries Reading" },
      { to: "/zodiac/pisces-tarot-reading", label: "Pisces Reading" },
    ],
  },
  "daily-divination-practice": {
    title: "Building a Daily Divination Practice",
    description: "Create a meaningful daily ritual with tarot, runes, or angel cards for spiritual growth.",
    content: [
      "A daily divination practice is one of the most effective ways to deepen your connection with these ancient tools. Drawing a single card or rune each morning sets an intention for the day and builds your interpretive skills over time.",
      "Start simple: each morning, shuffle your deck or gather your rune stones. Take a few deep breaths, ask 'What do I need to know today?' and draw one symbol. Sit with its meaning for a moment before starting your day.",
      "Keep a divination journal. Record the date, the card or rune drawn, and any initial impressions. At the end of the day, reflect on how the symbol's energy manifested. Over weeks and months, patterns will emerge.",
      "Whether you choose tarot, runes, or angel cards, consistency matters more than complexity. Even one minute of mindful drawing each day creates a powerful spiritual practice."
    ],
    faq: [
      { q: "How do I start a daily tarot practice?", a: "Draw one card each morning while asking 'What do I need to know today?' Record it in a journal. Reflect at the end of the day on how the card's themes appeared. Consistency is more important than complexity." },
    ],
    relatedLinks: [
      { to: "/daily-tarot-card", label: "Daily Tarot" },
      { to: "/daily-rune", label: "Daily Rune" },
      { to: "/daily-angel-message", label: "Daily Angel" },
    ],
  },
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : undefined;

  if (!article) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: article.title.length > 40 ? article.title.slice(0, 37) + "…" : article.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    ...(article.faq.length > 0 ? { mainEntity: generateFAQJsonLd(article.faq).mainEntity } : {}),
  };

  return (
    <>
      <SEOHead title={article.title} description={article.description} canonicalPath={`/blog/${slug}`} jsonLd={jsonLd} />
      <motion.div className="max-w-3xl mx-auto pt-8 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={breadcrumbs} />

        <article className="reading-panel rounded-xl p-6 md:p-8">
          <h1 className="font-heading text-2xl md:text-3xl gold-text mb-6">{article.title}</h1>
          {article.content.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground font-body leading-relaxed mb-4">{p}</p>
          ))}
        </article>

        <ReadingCTA />

        {article.faq.length > 0 && <FAQSection items={article.faq} />}

        <div className="mt-8 reading-panel rounded-xl p-5">
          <h3 className="font-heading text-sm gold-text mb-3">Related</h3>
          <div className="flex flex-wrap gap-2">
            {article.relatedLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-xs text-primary hover:underline">{l.label} →</Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogArticle;
