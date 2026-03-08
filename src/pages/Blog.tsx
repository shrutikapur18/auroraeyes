import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";

const articles = [
  { slug: "how-tarot-readings-work", title: "How Tarot Readings Work: A Complete Guide", excerpt: "Learn the fundamentals of tarot reading — from the structure of the deck to how cards are interpreted in different spreads.", category: "Tarot", icon: "🃏" },
  { slug: "major-arcana-guide", title: "The Major Arcana: Understanding the 22 Trump Cards", excerpt: "Discover the profound symbolism and spiritual journey depicted in the 22 Major Arcana cards of the tarot.", category: "Tarot", icon: "✨" },
  { slug: "how-rune-casting-works", title: "How Rune Casting Works: Ancient Norse Divination", excerpt: "Explore the history and practice of Elder Futhark rune casting — from ancient Norse tradition to modern divination.", category: "Runes", icon: "ᚱ" },
  { slug: "angel-card-guidance-beginners", title: "Angel Card Guidance for Beginners", excerpt: "Learn how angel oracle cards provide loving, uplifting messages from archangels and guardian angels.", category: "Angels", icon: "👼" },
  { slug: "tarot-spreads-explained", title: "Tarot Spreads Explained: Three Card vs Celtic Cross", excerpt: "Compare the most popular tarot spreads and learn when to use each one for the most insightful readings.", category: "Tarot", icon: "🔮" },
  { slug: "reversed-tarot-cards", title: "What Do Reversed Tarot Cards Mean?", excerpt: "Understanding reversed cards is essential for nuanced readings. Learn how reversals add depth to your interpretations.", category: "Tarot", icon: "↻" },
  { slug: "zodiac-and-tarot-connection", title: "The Connection Between Zodiac Signs and Tarot", excerpt: "Each zodiac sign has a corresponding tarot card. Discover how astrology and tarot interweave for deeper insight.", category: "Astrology", icon: "⭐" },
  { slug: "daily-divination-practice", title: "Building a Daily Divination Practice", excerpt: "Create a meaningful daily ritual with tarot, runes, or angel cards. Tips for consistency and deeper connection.", category: "Practice", icon: "🌅" },
];

const Blog = () => (
  <>
    <SEOHead title="Divination Blog & Guides" description="Learn about tarot, rune casting, and angel card readings. Educational articles, guides, and spiritual insights for beginners and experienced readers." canonicalPath="/blog" />
    <motion.header className="text-center pt-8 pb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Blog & Guides</h1>
      <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">Deepen your understanding of tarot, runes, and angel guidance with our educational articles.</p>
    </motion.header>
    <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
      {articles.map((a) => (
        <Link key={a.slug} to={`/blog/${a.slug}`} className="reading-panel rounded-xl p-5 hover:gold-glow transition-all group">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{a.icon}</span>
            <div>
              <span className="text-[10px] font-heading text-primary/60 tracking-wider uppercase">{a.category}</span>
              <h2 className="font-heading text-sm text-foreground group-hover:text-primary transition-colors mt-0.5">{a.title}</h2>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{a.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </>
);

export default Blog;
