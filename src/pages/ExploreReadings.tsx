import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layers, Scale, Sparkles, Hexagon, Feather, Compass, BookOpen, Sun } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const ExploreReadings = () => {
  const sections = [
    {
      title: "Tarot Readings",
      items: [
        { to: "/free-tarot-reading", label: "Free Tarot Reading", Icon: Layers, desc: "Three Card or Celtic Cross spread" },
        { to: "/yes-no-tarot-reading", label: "Yes/No Tarot", Icon: Scale, desc: "Quick clarity on any yes-or-no question" },
        { to: "/pick-a-card-reading", label: "Pick a Card", Icon: Sparkles, desc: "Let your intuition choose" },
      ],
    },
    {
      title: "Other Divination",
      items: [
        { to: "/rune-reading", label: "Rune Reading", Icon: Hexagon, desc: "Ancient Norse wisdom stones" },
        { to: "/angel-card-reading", label: "Angel Card Reading", Icon: Feather, desc: "Messages from the divine" },
        { to: "/horary-reading", label: "Horary Astrology", Icon: Compass, desc: "Ask the stars a specific question" },
      ],
    },
    {
      title: "Daily Guidance",
      items: [
        { to: "/daily-tarot-card", label: "Daily Tarot Card", Icon: Sun, desc: "Your card for today" },
        { to: "/daily-rune", label: "Daily Rune", Icon: Hexagon, desc: "Today's runic message" },
        { to: "/daily-angel-message", label: "Daily Angel Message", Icon: Feather, desc: "Divine guidance for the day" },
      ],
    },
    {
      title: "Learn & Explore",
      items: [
        { to: "/tarot-card-meanings", label: "Tarot Card Meanings", Icon: BookOpen, desc: "All 78 cards explained" },
        { to: "/rune-meanings", label: "Rune Meanings", Icon: Hexagon, desc: "Elder Futhark rune guide" },
        { to: "/blog", label: "Blog & Articles", Icon: BookOpen, desc: "Insights and guidance" },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Explore Readings — Tarot, Runes, Angel Cards & More"
        description="Discover all divination methods available on Aurora Eyes. Free tarot readings, rune casting, angel cards, horary astrology, and daily guidance."
        canonicalPath="/explore"
      />

      <motion.header
        className="text-center pt-10 md:pt-14 pb-8 px-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-5xl font-heading gold-text mb-3 tracking-wider">
          Explore Readings
        </h1>
        <p className="text-sm md:text-base text-muted-foreground font-body max-w-xl mx-auto">
          Every path holds a different kind of truth. Choose what calls to you.
        </p>
      </motion.header>

      <div className="max-w-4xl mx-auto pb-16 space-y-10 px-2">
        {sections.map((section, si) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
          >
            <h2 className="font-heading text-lg gold-text mb-4 tracking-wider">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="divination-card rounded-xl p-4 md:p-5 group active:scale-[0.97] transition-transform"
                >
                  <item.Icon className="w-6 h-6 mb-2 text-primary/60 group-hover:text-primary transition-colors icon-glow" />
                  <h3 className="font-heading text-sm text-foreground/90 group-hover:text-primary transition-colors mb-1">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-muted-foreground/60 leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </>
  );
};

export default ExploreReadings;
