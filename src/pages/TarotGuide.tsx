import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { tarotDeck } from "@/data/tarotDeck";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const sections = [
  {
    heading: "Tarot Readings",
    description: "Get free AI-powered tarot readings for love, career, money, and personal growth.",
    links: [
      { to: "/free-tarot-reading", label: "Free Tarot Reading" },
      { to: "/yes-no-tarot-reading", label: "Yes/No Tarot Reading" },
      { to: "/pick-a-card-reading", label: "Pick a Card Reading" },
      { to: "/love-tarot-reading", label: "Love Tarot Reading" },
      { to: "/career-tarot-reading", label: "Career Tarot Reading" },
      { to: "/money-tarot-reading", label: "Money Tarot Reading" },
      { to: "/soulmate-tarot-reading", label: "Soulmate Tarot Reading" },
      { to: "/will-my-ex-come-back-tarot", label: "Will My Ex Come Back?" },
      { to: "/should-i-change-careers-tarot", label: "Should I Change Careers?" },
      { to: "/will-i-get-the-job-tarot", label: "Will I Get the Job?" },
    ],
  },
  {
    heading: "Tarot Card Meanings",
    description: "Learn the meaning of all 78 tarot cards — Major and Minor Arcana.",
    links: [
      { to: "/tarot-card-meanings", label: "All 78 Card Meanings" },
      ...tarotDeck.filter(c => c.arcana === "Major").slice(0, 8).map(c => ({
        to: `/tarot-card-meanings/${slugify(c.name)}`,
        label: c.name,
      })),
    ],
  },
  {
    heading: "Tarot Spreads",
    description: "Master every tarot spread from beginner to advanced.",
    links: [
      { to: "/tarot-spreads", label: "All Spread Guides" },
      { to: "/tarot-spreads/three-card-spread", label: "Three Card Spread" },
      { to: "/tarot-spreads/celtic-cross-spread", label: "Celtic Cross" },
      { to: "/tarot-spreads/yes-no-spread", label: "Yes/No Spread" },
    ],
  },
  {
    heading: "Card Combinations",
    description: "Understand what it means when specific cards appear together.",
    links: [
      { to: "/tarot-combinations", label: "All Combinations" },
    ],
  },
  {
    heading: "Learn Tarot",
    description: "Educational guides and articles about tarot reading.",
    links: [
      { to: "/blog/how-tarot-readings-work", label: "How Tarot Readings Work" },
      { to: "/blog/major-arcana-guide", label: "Major Arcana Guide" },
      { to: "/blog/tarot-spreads-explained", label: "Spreads Explained" },
      { to: "/blog/reversed-tarot-cards", label: "Reversed Cards Guide" },
      { to: "/blog/zodiac-and-tarot-connection", label: "Zodiac & Tarot" },
    ],
  },
];

const TarotGuide = () => (
  <>
    <SEOHead
      title="Complete Tarot Guide — Readings, Meanings & Spreads"
      description="Your complete guide to tarot. Free readings, all 78 card meanings, spread guides, card combinations, and educational resources for beginners and advanced readers."
      canonicalPath="/tarot-guide"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Complete Tarot Guide",
        description: "Comprehensive tarot resource covering readings, card meanings, spreads, and combinations.",
      }}
    />
    <motion.div className="max-w-4xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Breadcrumbs items={[{ label: "Tarot Guide" }]} />

      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Complete Tarot Guide</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">
          Everything you need to explore the world of tarot — free readings, card meanings, spread guides, and educational resources.
        </p>
      </header>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.heading} className="reading-panel rounded-xl p-6">
            <h2 className="font-heading text-lg gold-text mb-1">{section.heading}</h2>
            <p className="text-xs text-muted-foreground mb-4">{section.description}</p>
            <div className="flex flex-wrap gap-2">
              {section.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  </>
);

export default TarotGuide;
