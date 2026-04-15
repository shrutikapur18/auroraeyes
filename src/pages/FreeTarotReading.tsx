import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import PostReadingCTA from "@/components/PostReadingCTA";
import QuestionInput from "@/components/QuestionInput";
import ReadingModeSelector from "@/components/ReadingModeSelector";
import FocusMoment from "@/components/FocusMoment";
import InteractiveShuffle from "@/components/InteractiveShuffle";
import CardFanSpread from "@/components/CardFanSpread";
import TarotDeckPicker from "@/components/TarotDeckPicker";
import ReadingTable from "@/components/ReadingTable";
import ThreeCardSpread from "@/components/ThreeCardSpread";
import CelticCrossSpread from "@/components/CelticCrossSpread";
import ReadingPanel from "@/components/ReadingPanel";
import ShareButtons from "@/components/ShareButtons";
import { threeCardPositions, celticCrossPositions } from "@/data/tarotDeck";
import type { DrawnCard, ReadingMode } from "@/data/tarotDeck";
import { generateLocalReading } from "@/lib/tarotReading";
import { Link } from "react-router-dom";

type Phase = "input" | "focus" | "shuffling" | "fan" | "spread" | "reading" | "loading";

const FreeTarotReading = () => {
  const [question, setQuestion] = useState("");
  const [tarotMode, setTarotMode] = useState<ReadingMode>("three-card");
  const [phase, setPhase] = useState<Phase>("input");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [reading, setReading] = useState("");
  const [error, setError] = useState("");

  const cardCount = tarotMode === "three-card" ? 3 : 10;
  const positions = tarotMode === "three-card" ? threeCardPositions : celticCrossPositions;

  const handleStart = () => {
    if (!question.trim()) { setError("Please enter your question first."); return; }
    setError("");
    setPhase("focus");
  };

  const handleReveal = useCallback((index: number) => {
    setDrawnCards((prev) => {
      const updated = prev.map((dc, i) => (i === index ? { ...dc, isRevealed: true } : dc));
      if (updated.filter((c) => c.isRevealed).length >= cardCount) {
        setTimeout(() => {
          setPhase("loading");
          const text = generateLocalReading(question, updated);
          setReading(text);
          setPhase("reading");
        }, 800);
      }
      return updated;
    });
  }, [cardCount, question]);

  const handleReset = () => { setPhase("input"); setDrawnCards([]); setReading(""); setError(""); setQuestion(""); };

  return (
    <>
      <SEOHead
        title="Free Tarot Reading Online"
        description="Get a free tarot reading online. Choose Three Card or Celtic Cross spreads for insightful guidance on love, career, and life decisions."
        canonicalPath="/free-tarot-reading"
        jsonLd={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Free Tarot Reading", applicationCategory: "LifestyleApplication", description: "Interactive tarot reading with Three Card and Celtic Cross spreads." }}
      />

      <motion.header className="text-center pt-10 md:pt-8 pb-6 px-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Free Tarot Reading</h1>
        <p className="text-sm md:text-base text-muted-foreground font-body max-w-2xl mx-auto">
          Discover what the tarot cards reveal about your past, present, and future.
        </p>
      </motion.header>

      <AnimatePresence mode="wait">
        {phase === "input" && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuestionInput question={question} setQuestion={setQuestion} />
            {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
            <ReadingModeSelector mode={tarotMode} setMode={setTarotMode} />
            <div className="flex justify-center mb-10">
              <motion.button onClick={handleStart} className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-base md:text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow active:scale-95" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Begin Reading
              </motion.button>
            </div>

            {/* SEO content */}
            <section className="max-w-3xl mx-auto mt-12 space-y-8 px-1">
              <div className="reading-panel rounded-xl p-5 md:p-8">
                <h2 className="font-heading text-lg md:text-xl gold-text mb-4">How Does a Tarot Reading Work?</h2>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">A tarot reading uses a deck of 78 cards — 22 Major Arcana and 56 Minor Arcana — to provide insight into your life, relationships, and future possibilities.</p>
                <h3 className="font-heading text-sm md:text-base text-foreground mb-2">Three Card Spread</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">The Three Card Spread reveals your <strong>Past</strong>, <strong>Present</strong>, and <strong>Future</strong>. It's perfect for quick clarity on any question.</p>
                <h3 className="font-heading text-sm md:text-base text-foreground mb-2">Celtic Cross Spread</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">The Celtic Cross uses 10 cards to provide deep, layered insight covering your present situation, challenges, subconscious influences, and ultimate outcome.</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">Explore more:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link to="/tarot-card-meanings" className="text-xs text-primary hover:underline">Tarot Card Meanings</Link>
                  <Link to="/yes-no-tarot-reading" className="text-xs text-primary hover:underline">Yes/No Tarot</Link>
                  <Link to="/daily-tarot-card" className="text-xs text-primary hover:underline">Daily Tarot</Link>
                </div>
              </div>
            </section>
          </motion.div>
        )}
        {phase === "focus" && <FocusMoment key="focus" onComplete={() => setPhase("shuffling")} method="tarot" />}
        {phase === "shuffling" && (
          <motion.div key="shuffling" className="py-8 md:py-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <InteractiveShuffle onComplete={() => setPhase("fan")} minPresses={3} />
          </motion.div>
        )}
        {phase === "fan" && (
          <motion.div key="fan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-center text-xs text-muted-foreground italic mb-4 px-4">"{question}"</p>
            <TarotDeckPicker requiredCount={cardCount} positions={positions} onComplete={(cards) => { setDrawnCards(cards); setPhase("spread"); }} />
          </motion.div>
        )}
        {(phase === "spread" || phase === "reading" || phase === "loading") && (
          <motion.div key="spread" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-center text-xs md:text-sm text-muted-foreground italic mb-4 px-4">"{question}"</p>
            {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
            <ReadingTable>
              <div className="py-2 md:py-4">
                {tarotMode === "three-card" && <ThreeCardSpread cards={drawnCards} onReveal={handleReveal} />}
                {tarotMode === "celtic-cross" && <CelticCrossSpread cards={drawnCards} onReveal={handleReveal} />}
              </div>
            </ReadingTable>
            {reading && (
              <>
                <ReadingPanel reading={reading} drawnCards={drawnCards} question={question} />
                <ShareButtons text={`🔮 My Tarot Reading: "${question}" — Get yours at`} />
              </>
            )}
            {phase === "loading" && (
              <motion.div className="flex flex-col items-center mt-8 md:mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                <p className="font-heading text-primary text-sm tracking-widest animate-pulse">Channeling the cosmos...</p>
              </motion.div>
            )}
            {phase === "reading" && <PostReadingCTA onTryAnother={handleReset} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FreeTarotReading;
