import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import InternalLinks from "@/components/InternalLinks";
import ReadingCTA from "@/components/ReadingCTA";
import { horaryContentPages } from "@/data/horaryContentPages";

const faqs = [
  { question: "What is horary astrology?", answer: "Horary astrology is a branch of traditional astrology that answers a specific question by casting a chart for the exact moment the question is asked. The positions of the planets at that instant hold the key to the answer." },
  { question: "How does horary astrology work?", answer: "When you sincerely ask a question, a chart is cast for that precise moment and location. The astrologer examines the Ascendant, the Moon, and the planetary rulers of the houses related to your question. The relationships between these planets reveal the answer." },
  { question: "How accurate is horary astrology?", answer: "Horary astrology has been practiced for centuries and many astrologers consider it one of the most precise branches of astrology. Its accuracy depends on the sincerity and clarity of the question." },
  { question: "What types of questions can horary astrology answer?", answer: 'Horary works best with specific, time-sensitive questions that have a clear outcome — for example "Will I get the job?", "Should I move?", or "Will my relationship improve?"' },
  { question: "What information is needed to create a horary chart?", answer: "You need the exact time the question is asked, the location where you are when asking, and a clearly defined question. Our tool automatically captures the time and can detect your location." },
  { question: "How is horary astrology different from natal astrology?", answer: "Natal astrology uses your birth chart to describe your personality and life themes. Horary astrology focuses on answering a specific question using the chart of the moment the question is asked." },
  { question: "Can I ask more than one horary question at a time?", answer: "Traditional horary practice recommends asking one question at a time. Each question deserves its own chart and its own moment." },
];

const sections = [
  { heading: "How Horary Astrology Works", content: "Horary astrology reads the celestial map at the exact moment your question takes form. When you ask a sincere question, the positions of the planets, the Ascendant, and the Moon all become meaningful. The astrologer identifies which planets represent you (the querent) and the subject of your question (the quesited), then examines the relationship between them to find the answer." },
  { heading: "Key Elements of a Horary Chart", content: "Every horary chart revolves around a few key elements: the Ascendant sign (which represents you), the ruler of the house governing your question's topic, the Moon (which shows how events unfold), and the aspects between these planets. Applying aspects — connections that are forming — are especially important because they show what's coming next." },
  { heading: "Types of Questions Horary Can Answer", content: 'Horary excels at specific, outcome-based questions. Relationship questions ("Will they call me back?"), career questions ("Will I get the promotion?"), lost object questions ("Where did I leave my keys?"), and timing questions ("When will I hear back?") are all classic horary topics.' },
  { heading: "The Role of the Moon in Horary", content: "The Moon is the co-significator of every horary question. It shows the flow of events — where things have been and where they're heading. A void-of-course Moon often suggests nothing will come of the matter." },
  { heading: "Horary Astrology vs Other Divination Methods", content: "While tarot cards tap into intuition and symbolism, and runes connect with ancient Norse wisdom, horary astrology uses precise mathematical calculations of actual planetary positions. Each method has its strengths — many practitioners combine horary with tarot for a more complete picture." },
];

const educationalPages = horaryContentPages.filter((p) => p.type === "educational");
const questionBasedPages = horaryContentPages.filter((p) => p.type === "question");

const HoraryGuide = () => (
  <>
    <SEOHead
      title="Horary Astrology — Complete Guide, FAQ & Free Reading"
      description="Learn horary astrology from scratch. Understand how it works, what questions it answers, and try a free horary reading. Complete guide with FAQ and examples."
      canonicalPath="/horary-astrology"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        name: "Horary Astrology Guide & FAQ",
        description: "Complete guide to horary astrology with frequently asked questions.",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />

    <motion.div className="max-w-4xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Horary Astrology Guide" }]} />

      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">
          ✦ Horary Astrology Guide ✦
        </h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">
          Discover how horary astrology uses the exact moment of your question to find answers in the stars.
          Learn the principles, explore examples, and try your own horary reading.
        </p>
      </header>

      {/* Content sections */}
      <div className="space-y-8 mb-12">
        {sections.map((s, i) => (
          <motion.section
            key={s.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="reading-panel rounded-xl p-6"
          >
            <h2 className="font-heading text-lg text-primary tracking-wider mb-3">{s.heading}</h2>
            <p className="text-sm text-foreground/80 font-body leading-relaxed">{s.content}</p>
          </motion.section>
        ))}
      </div>

      {/* Educational Pages Hub */}
      <section className="mb-12">
        <h2 className="font-heading text-xl gold-text text-center mb-6 tracking-wider">
          Learn Horary Astrology
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {educationalPages.map((page, i) => (
            <motion.div
              key={page.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/${page.slug}`}
                className="block reading-panel rounded-xl p-5 border border-primary/10 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-heading text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                  {page.h1}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{page.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Question-Based Pages Hub */}
      <section className="mb-12">
        <h2 className="font-heading text-xl gold-text text-center mb-6 tracking-wider">
          Horary Questions Answered
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {questionBasedPages.map((page, i) => (
            <motion.div
              key={page.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/${page.slug}`}
                className="block reading-panel rounded-xl p-5 border border-primary/10 hover:border-primary/30 transition-colors group"
              >
                <span className="text-lg mb-1 block">🪐</span>
                <h3 className="font-heading text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                  {page.h1}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{page.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ReadingCTA
        title="Try a Horary Reading Now"
        description="Ask the stars a question and receive a personalized horary chart with AI-powered interpretation."
        to="/horary-reading"
        label="Cast Your Horary Chart"
      />

      {/* FAQ */}
      <section className="mt-12 mb-8">
        <h2 className="font-heading text-xl gold-text text-center mb-6 tracking-wider">
          Horary Astrology FAQ
        </h2>
        <FAQSection items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      </section>

      {/* Internal links */}
      <InternalLinks
        title="Explore More Divination"
        links={[
          { to: "/free-tarot-reading", label: "Free Tarot Reading" },
          { to: "/rune-reading", label: "Rune Reading" },
          { to: "/angel-card-reading", label: "Angel Card Reading" },
          { to: "/horary-reading", label: "Horary Reading" },
          { to: "/tarot-guide", label: "Tarot Guide" },
          { to: "/rune-guide", label: "Rune Guide" },
          { to: "/angel-cards-guide", label: "Angel Cards Guide" },
          { to: "/blog", label: "Blog & Articles" },
        ]}
      />
    </motion.div>
  </>
);

export default HoraryGuide;
