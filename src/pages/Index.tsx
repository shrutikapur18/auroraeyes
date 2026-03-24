import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Layers, Scale, Sparkles, Hexagon, Feather, Compass, BookOpen, Sun } from "lucide-react";
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
import TopicalClusterNav from "@/components/TopicalClusterNav";
import RecentReadings from "@/components/RecentReadings";
import HoraryHomepageSection from "@/components/HoraryHomepageSection";
import DivinationPhilosophy from "@/components/DivinationPhilosophy";
import { threeCardPositions, celticCrossPositions } from "@/data/tarotDeck";
import type { DrawnCard, ReadingMode } from "@/data/tarotDeck";
import { generateLocalReading } from "@/lib/tarotReading";

type Phase = "input" | "focus" | "shuffling" | "fan" | "spread" | "reading" | "loading";

const Index = () => {
  const [question, setQuestion] = useState("");
  const [divinationMethod, setDivinationMethod] = useState<DivinationMethod | null>(null);
  const [tarotMode, setTarotMode] = useState<ReadingMode>("three-card");
  const [phase, setPhase] = useState<Phase>("input");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [reading, setReading] = useState("");
  const [error, setError] = useState("");
  const [angelAutoStart, setAngelAutoStart] = useState(false);
  const [runeAutoStart, setRuneAutoStart] = useState(false);

  const cardCount = tarotMode === "three-card" ? 3 : tarotMode === "celtic-cross" ? 10 : 1;
  const positions = tarotMode === "three-card" ? threeCardPositions : tarotMode === "celtic-cross" ? celticCrossPositions : ["Your Card"];

  const handleStartShuffle = () => {
    setError(""); setPhase("focus");
  };

  const handleContinue = () => {
    if (!divinationMethod) return;
    setError("");
    if (divinationMethod === "tarot") {
      setPhase("focus");
    } else if (divinationMethod === "runes") {
      setRuneAutoStart(true);
    } else if (divinationMethod === "angel") {
      setAngelAutoStart(true);
    }
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

  const handleReset = () => { setPhase("input"); setDrawnCards([]); setReading(""); setError(""); setQuestion(""); setDivinationMethod(null); };

  const handleMethodChange = (m: DivinationMethod) => { setDivinationMethod(m); setError(""); };

  const isTarotMethod = divinationMethod === "tarot";

  return (
    <>
      <SEOHead
        title="Free Tarot, Rune & Angel Card Readings"
        description="Experience immersive divination readings online. Free tarot, rune casting, and angel card guidance with beautiful animations and personalized interpretations."
        canonicalPath="/"
        jsonLd={{ "@context": "https://schema.org", "@type": "WebSite", name: "Aurora Eyes", url: "https://tarotguidance.lovable.app", description: "Free online divination readings — tarot, runes, and angel cards." }}
      />

      {/* Hero section */}
      <motion.header className="text-center pt-12 md:pt-16 lg:pt-20 pb-8 lg:pb-12 px-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
        <motion.div
          className="mb-4 lg:mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 rounded-full border border-primary/20 flex items-center justify-center"
            style={{ background: "radial-gradient(circle, hsl(43 70% 65% / 0.08), transparent)" }}
            animate={{
              boxShadow: [
                "0 0 20px hsl(43 70% 65% / 0.1)",
                "0 0 40px hsl(43 70% 65% / 0.2)",
                "0 0 20px hsl(43 70% 65% / 0.1)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="text-primary text-2xl md:text-3xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.span>
          </motion.div>
        </motion.div>
        
        <motion.h1
          className="text-3xl md:text-6xl lg:text-7xl font-heading gold-text mb-4 lg:mb-6 tracking-wider"
          animate={{ textShadow: ["0 0 20px hsl(45 80% 55% / 0.15)", "0 0 40px hsl(45 80% 55% / 0.3)", "0 0 20px hsl(45 80% 55% / 0.15)"] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          Aurora Eyes
        </motion.h1>
        <motion.p
          className="text-sm md:text-lg lg:text-xl text-muted-foreground font-body font-light tracking-wide max-w-xl lg:max-w-2xl mx-auto lg:leading-relaxed italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          A sacred space where ancient wisdom meets your deepest questions
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mt-6 lg:mt-8 flex justify-center items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </motion.div>
      </motion.header>

      <AnimatePresence mode="wait">
        {phase === "input" && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }}>
            <DivinationMethodSelector method={divinationMethod} setMethod={handleMethodChange} />

            <AnimatePresence>
              {divinationMethod && (
                <motion.div
                  key="question-section"
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <QuestionInput question={question} setQuestion={setQuestion} />
                  {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}

                  {isTarotMethod && (
                    <ReadingModeSelector mode={tarotMode} setMode={setTarotMode} />
                  )}

                  {divinationMethod !== "horary" && (
                    <div className="flex flex-col items-center gap-3 mb-12 lg:mb-16">
                      <motion.button
                        onClick={() => {
                          if (divinationMethod === "tarot") {
                            handleStartShuffle();
                          } else if (divinationMethod === "runes" || divinationMethod === "angel") {
                            handleContinue();
                          }
                        }}
                        className="mystical-button px-10 lg:px-14 py-4 lg:py-5 rounded-xl font-heading text-base md:text-lg lg:text-xl tracking-[0.2em]"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 35px hsl(43 70% 65% / 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Reveal Your Reading
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setQuestion("");
                          if (divinationMethod === "tarot") {
                            handleStartShuffle();
                          } else if (divinationMethod === "runes" || divinationMethod === "angel") {
                            handleContinue();
                          }
                        }}
                        className="text-xs text-muted-foreground/60 hover:text-primary/50 transition-colors tracking-widest font-heading uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Draw without a question
                      </motion.button>
                    </div>
                  )}

                  {divinationMethod === "angel" && <AngelCardSpread question={question} onError={setError} />}
                  {divinationMethod === "runes" && <RuneSpread question={question} onError={setError} />}
                </motion.div>
              )}
            </AnimatePresence>
            <DailyDivination />

            {/* Horary Astrology Section */}
            <HoraryHomepageSection />

            {/* SEO: Quick links */}
            <section className="max-w-5xl lg:max-w-6xl mx-auto mt-14 md:mt-18 lg:mt-24 mb-8 lg:mb-12 px-2">
              <motion.div
                className="text-center mb-8 lg:mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-lg md:text-xl lg:text-2xl gold-text mb-2">Explore the Mysteries</h2>
                <p className="text-xs text-muted-foreground/60 italic">Each path holds a different kind of truth</p>
              </motion.div>
              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5">
                {[
                  { to: "/free-tarot-reading", label: "Tarot Reading", Icon: Layers },
                  { to: "/yes-no-tarot-reading", label: "The Oracle's Whisper", Icon: Scale },
                  { to: "/pick-a-card-reading", label: "Let Intuition Choose", Icon: Sparkles },
                  { to: "/rune-reading", label: "Ancient Runes", Icon: Hexagon },
                  { to: "/angel-card-reading", label: "Divine Messages", Icon: Feather },
                  { to: "/horary-reading", label: "Ask the Stars", Icon: Compass },
                  { to: "/tarot-card-meanings", label: "Card Meanings", Icon: BookOpen },
                  { to: "/rune-meanings", label: "Rune Wisdom", Icon: Hexagon },
                  { to: "/daily-tarot-card", label: "Daily Guidance", Icon: Sun },
                ].map((l) => (
                  <Link key={l.to} to={l.to} className="divination-card rounded-lg p-3 md:p-4 lg:p-6 text-center group active:scale-[0.97]">
                    <l.Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mx-auto mb-1.5 lg:mb-2 text-primary/60 group-hover:text-primary transition-colors duration-500 icon-glow" />
                    <span className="text-[10px] md:text-xs lg:text-sm font-heading text-foreground/80 group-hover:text-primary transition-colors duration-300 leading-tight">{l.label}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Philosophy Section */}
            <DivinationPhilosophy />

            <RecentReadings />
            <TopicalClusterNav />
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
            {question && <p className="text-center text-xs text-muted-foreground/60 italic mb-4 px-4">"{question}"</p>}
            <TarotDeckPicker requiredCount={cardCount} positions={positions} onComplete={(cards) => { setDrawnCards(cards); setPhase("spread"); }} />
          </motion.div>
        )}
        {(phase === "spread" || phase === "reading" || phase === "loading") && (
          <motion.div key="spread" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {question && <p className="text-center text-xs md:text-sm text-muted-foreground/60 italic mb-4 px-4">"{question}"</p>}
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
              <motion.div className="flex flex-col items-center mt-10 md:mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div
                  className="w-10 h-10 border border-primary/30 border-t-primary rounded-full mb-5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <p className="font-heading text-primary/70 text-sm tracking-[0.2em]">
                  Interpreting the energies...
                </p>
              </motion.div>
            )}
            {phase === "reading" && (
              <div className="flex justify-center mt-8 mb-6">
                <motion.button
                  onClick={handleReset}
                  className="px-8 lg:px-10 py-3.5 md:py-4 rounded-xl bg-secondary/50 border border-primary/20 text-primary/80 font-heading text-sm lg:text-base tracking-widest hover:bg-primary/10 hover:border-primary/30 transition-all duration-500"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Begin a New Reading
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
