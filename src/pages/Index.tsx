import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import DivinationMethodSelector, { type DivinationMethod } from "@/components/DivinationMethodSelector";
import QuestionInput from "@/components/QuestionInput";
import ReadingModeSelector from "@/components/ReadingModeSelector";
import FocusMoment from "@/components/FocusMoment";
import InteractiveShuffle from "@/components/InteractiveShuffle";
import CardFanSpread from "@/components/CardFanSpread";
import TarotDeckPicker from "@/components/TarotDeckPicker";
import ReadingTable from "@/components/ReadingTable";
import ThreeCardSpread from "@/components/ThreeCardSpread";
import CelticCrossSpread from "@/components/CelticCrossSpread";
import PickACardSpread from "@/components/PickACardSpread";
import YesNoSpread from "@/components/YesNoSpread";
import AngelCardSpread from "@/components/AngelCardSpread";
import RuneSpread from "@/components/RuneSpread";
import ReadingPanel from "@/components/ReadingPanel";
import DailyDivination from "@/components/DailyDivination";
import { threeCardPositions, celticCrossPositions } from "@/data/tarotDeck";
import type { DrawnCard, ReadingMode } from "@/data/tarotDeck";
import { generateLocalReading } from "@/lib/tarotReading";

type Phase = "input" | "focus" | "shuffling" | "fan" | "spread" | "reading" | "loading";

const Index = () => {
  const [question, setQuestion] = useState("");
  const [divinationMethod, setDivinationMethod] = useState<DivinationMethod>("tarot");
  const [tarotMode, setTarotMode] = useState<ReadingMode>("three-card");
  const [phase, setPhase] = useState<Phase>("input");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [reading, setReading] = useState("");
  const [error, setError] = useState("");

  const cardCount = tarotMode === "three-card" ? 3 : tarotMode === "celtic-cross" ? 10 : 3;
  const positions = tarotMode === "three-card" ? threeCardPositions : tarotMode === "celtic-cross" ? celticCrossPositions : ["Your Card", "Card 2", "Card 3"];

  const handleStartShuffle = () => {
    if (!question.trim()) { setError("Please enter your question first."); return; }
    setError(""); setPhase("focus");
  };

  const handleReveal = useCallback((index: number) => {
    if (tarotMode === "pick-a-card" && drawnCards.some((c) => c.isRevealed)) return;
    setDrawnCards((prev) => {
      const updated = prev.map((dc, i) => (i === index ? { ...dc, isRevealed: true } : dc));
      const revealedCount = updated.filter((c) => c.isRevealed).length;
      const shouldRead = tarotMode === "pick-a-card" ? revealedCount >= 1 : revealedCount >= cardCount;
      if (shouldRead) {
        setTimeout(() => {
          setPhase("loading");
          const readingText = generateLocalReading(question, updated);
          setReading(readingText); setPhase("reading");
        }, 800);
      }
      return updated;
    });
  }, [tarotMode, cardCount, question, drawnCards]);

  const handleReset = () => { setPhase("input"); setDrawnCards([]); setReading(""); setError(""); setQuestion(""); };

  const handleMethodChange = (m: DivinationMethod) => { setDivinationMethod(m); handleReset(); };

  const isTarotMethod = divinationMethod === "tarot";

  return (
    <>
      <SEOHead
        title="Free Tarot, Rune & Angel Card Readings"
        description="Experience immersive divination readings online. Free tarot, rune casting, and angel card guidance with beautiful animations and personalized interpretations."
        canonicalPath="/"
        jsonLd={{ "@context": "https://schema.org", "@type": "WebSite", name: "Mystic Divination", url: "https://tarotguidance.lovable.app", description: "Free online divination readings — tarot, runes, and angel cards." }}
      />

      <motion.header className="text-center pt-10 md:pt-8 pb-6 px-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <motion.h1
          className="text-3xl md:text-6xl font-heading gold-text mb-3 tracking-wider"
          animate={{ textShadow: ["0 0 20px hsl(45 80% 55% / 0.2)", "0 0 40px hsl(45 80% 55% / 0.4)", "0 0 20px hsl(45 80% 55% / 0.2)"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Mystic Divination
        </motion.h1>
        <p className="text-sm md:text-lg text-muted-foreground font-body font-light tracking-wide max-w-xl mx-auto">
          Choose a divination method and focus on your question.
        </p>
      </motion.header>

      <AnimatePresence mode="wait">
        {phase === "input" && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DivinationMethodSelector method={divinationMethod} setMethod={handleMethodChange} />
            <QuestionInput question={question} setQuestion={setQuestion} />
            {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}

            {isTarotMethod && (
              <>
                <ReadingModeSelector mode={tarotMode} setMode={setTarotMode} />
                <div className="flex justify-center mb-10">
                  <motion.button
                    onClick={handleStartShuffle}
                    className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-base md:text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow active:scale-95"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Begin Reading
                  </motion.button>
                </div>
              </>
            )}
            {divinationMethod === "yes-no" && <YesNoSpread question={question} onError={setError} />}
            {divinationMethod === "pick-a-card" && (
              <div className="flex justify-center mb-10">
                <motion.button
                  onClick={() => { setTarotMode("pick-a-card"); handleStartShuffle(); }}
                  className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-base md:text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shuffle & Pick
                </motion.button>
              </div>
            )}
            {divinationMethod === "angel" && <AngelCardSpread question={question} onError={setError} />}
            {divinationMethod === "runes" && <RuneSpread question={question} onError={setError} />}
            <DailyDivination />

            {/* SEO: Quick links */}
            <section className="max-w-4xl mx-auto mt-12 md:mt-16 mb-8 px-1">
              <h2 className="font-heading text-lg md:text-xl gold-text text-center mb-5 md:mb-6">Explore Our Readings</h2>
              <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-3">
                {[
                  { to: "/free-tarot-reading", label: "Tarot Reading", icon: "🃏" },
                  { to: "/yes-no-tarot-reading", label: "Yes/No Tarot", icon: "⚖️" },
                  { to: "/pick-a-card-reading", label: "Pick a Card", icon: "✨" },
                  { to: "/rune-reading", label: "Rune Reading", icon: "ᚱ" },
                  { to: "/angel-card-reading", label: "Angel Cards", icon: "👼" },
                  { to: "/tarot-card-meanings", label: "Card Meanings", icon: "📖" },
                  { to: "/rune-meanings", label: "Rune Meanings", icon: "ᚠ" },
                  { to: "/daily-tarot-card", label: "Daily Tarot", icon: "🌅" },
                  { to: "/blog", label: "Blog & Guides", icon: "📝" },
                ].map((l) => (
                  <Link key={l.to} to={l.to} className="reading-panel rounded-lg p-3 md:p-4 text-center hover:gold-glow transition-all group active:scale-[0.97]">
                    <span className="text-xl md:text-2xl block mb-1">{l.icon}</span>
                    <span className="text-[10px] md:text-xs font-heading text-foreground group-hover:text-primary transition-colors leading-tight">{l.label}</span>
                  </Link>
                ))}
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
            <CardFanSpread requiredCount={cardCount} positions={positions} onComplete={(cards) => { setDrawnCards(cards); setPhase("spread"); }} />
          </motion.div>
        )}
        {(phase === "spread" || phase === "reading" || phase === "loading") && (
          <motion.div key="spread" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-center text-xs md:text-sm text-muted-foreground italic mb-4 px-4">"{question}"</p>
            {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
            <ReadingTable>
              <div className="py-2 md:py-4">
                {tarotMode === "three-card" && <ThreeCardSpread cards={drawnCards} onReveal={handleReveal} />}
                {tarotMode === "celtic-cross" && <CelticCrossSpread cards={drawnCards} onReveal={handleReveal} />}
                {tarotMode === "pick-a-card" && <PickACardSpread cards={drawnCards} onReveal={handleReveal} />}
              </div>
            </ReadingTable>
            {reading && <ReadingPanel reading={reading} drawnCards={drawnCards} question={question} />}
            {phase === "loading" && (
              <motion.div className="flex flex-col items-center mt-8 md:mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                <p className="font-heading text-primary text-sm tracking-widest animate-pulse">Channeling the cosmos...</p>
              </motion.div>
            )}
            {phase === "reading" && (
              <div className="flex justify-center mt-6 mb-4">
                <button onClick={handleReset} className="px-6 py-3.5 md:py-3 rounded-lg bg-secondary border border-primary/30 text-primary font-heading text-sm tracking-wider hover:bg-primary/20 transition-all active:scale-95">Draw New Cards</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
