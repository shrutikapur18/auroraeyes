import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarBackground from "@/components/StarBackground";
import QuestionInput from "@/components/QuestionInput";
import DivinationMethodSelector, { type DivinationMethod } from "@/components/DivinationMethodSelector";
import ReadingModeSelector from "@/components/ReadingModeSelector";
import ThreeCardSpread from "@/components/ThreeCardSpread";
import CelticCrossSpread from "@/components/CelticCrossSpread";
import PickACardSpread from "@/components/PickACardSpread";
import YesNoSpread from "@/components/YesNoSpread";
import AngelCardSpread from "@/components/AngelCardSpread";
import RuneSpread from "@/components/RuneSpread";
import ReadingPanel from "@/components/ReadingPanel";
import DailyDivination from "@/components/DailyDivination";
import { drawCards, threeCardPositions, celticCrossPositions } from "@/data/tarotDeck";
import type { DrawnCard, ReadingMode } from "@/data/tarotDeck";
import { canDoReading, recordReading, generateAIReading } from "@/lib/tarotReading";
import cardBackImage from "@/assets/card-back.jpg";

type Phase = "input" | "shuffling" | "spread" | "reading" | "loading";

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

  const handleShuffle = () => {
    if (!question.trim()) {
      setError("Please enter your question first.");
      return;
    }
    setError("");
    setPhase("shuffling");
    const cards = drawCards(cardCount).map((dc, i) => ({ ...dc, position: positions[i] }));
    setDrawnCards(cards);
    setTimeout(() => setPhase("spread"), 2000);
  };

  const handleReveal = useCallback((index: number) => {
    if (tarotMode === "pick-a-card" && drawnCards.some((c) => c.isRevealed)) return;
    setDrawnCards((prev) => {
      const updated = prev.map((dc, i) => (i === index ? { ...dc, isRevealed: true } : dc));
      const revealedCount = updated.filter((c) => c.isRevealed).length;
      const shouldRead = tarotMode === "pick-a-card" ? revealedCount >= 1 : revealedCount >= cardCount;
      if (shouldRead) {
        setTimeout(async () => {
          const check = canDoReading();
          if (!check.allowed) { setError(check.reason || ""); return; }
          recordReading();
          setPhase("loading");
          const readingText = await generateAIReading(question, updated);
          setReading(readingText);
          setPhase("reading");
        }, 800);
      }
      return updated;
    });
  }, [tarotMode, cardCount, question, drawnCards]);

  const handleReset = () => {
    setPhase("input");
    setDrawnCards([]);
    setReading("");
    setError("");
    setQuestion("");
  };

  const handleMethodChange = (m: DivinationMethod) => {
    setDivinationMethod(m);
    handleReset();
  };

  // For non-tarot methods, render their own self-contained components
  const isTarotMethod = divinationMethod === "tarot";
  const showTarotFlow = isTarotMethod && phase !== "input";

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarBackground />

      <div className="relative z-10 px-4 pb-20">
        {/* Header */}
        <motion.header
          className="text-center pt-8 pb-6 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-heading gold-text mb-3 tracking-wider">
            Mystic Divination
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-body font-light tracking-wide max-w-xl mx-auto">
            Choose a divination method and focus on your question.
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          {phase === "input" && (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DivinationMethodSelector method={divinationMethod} setMethod={handleMethodChange} />
              <QuestionInput question={question} setQuestion={setQuestion} />

              {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}

              {/* Tarot-specific sub-mode selector and shuffle button */}
              {isTarotMethod && (
                <>
                  <ReadingModeSelector mode={tarotMode} setMode={setTarotMode} />
                  <div className="flex justify-center mb-10">
                    <motion.button
                      onClick={handleShuffle}
                      className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Shuffle the Cards
                    </motion.button>
                  </div>
                  <div className="flex justify-center mb-8">
                    <div className="relative w-32 h-48">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-lg overflow-hidden border border-primary/20"
                          style={{ top: -i * 2, left: i * 1.5, zIndex: 5 - i }}
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <img src={cardBackImage} alt="Tarot deck" className="w-full h-full object-cover" loading="lazy" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Yes/No Tarot */}
              {divinationMethod === "yes-no" && (
                <YesNoSpread question={question} onError={setError} />
              )}

              {/* Pick a Card (standalone) */}
              {divinationMethod === "pick-a-card" && (
                <>
                  <div className="flex justify-center mb-10">
                    <motion.button
                      onClick={() => {
                        setTarotMode("pick-a-card");
                        handleShuffle();
                      }}
                      className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Shuffle & Pick
                    </motion.button>
                  </div>
                </>
              )}

              {/* Angel Cards */}
              {divinationMethod === "angel" && (
                <AngelCardSpread question={question} onError={setError} />
              )}

              {/* Rune Reading */}
              {divinationMethod === "runes" && (
                <RuneSpread question={question} onError={setError} />
              )}

              <DailyDivination />
            </motion.div>
          )}

          {phase === "shuffling" && (
            <motion.div
              key="shuffling"
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-32 h-48 mb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-lg overflow-hidden border border-primary/20"
                    animate={{
                      x: [0, (i % 2 === 0 ? 1 : -1) * 40, 0],
                      y: [0, -20, 0],
                      rotate: [0, (i % 2 === 0 ? 1 : -1) * 15, 0],
                    }}
                    transition={{ duration: 0.6, delay: i * 0.1, repeat: 3, ease: "easeInOut" }}
                  >
                    <img src={cardBackImage} alt="Shuffling" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
              <p className="font-heading text-primary text-lg tracking-widest animate-pulse">
                Shuffling the cards...
              </p>
            </motion.div>
          )}

          {(phase === "spread" || phase === "reading" || phase === "loading") && (
            <motion.div key="spread" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-4 text-center">
                <p className="text-sm text-muted-foreground italic">"{question}"</p>
              </div>

              {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}

              <div className="py-4">
                {tarotMode === "three-card" && <ThreeCardSpread cards={drawnCards} onReveal={handleReveal} />}
                {tarotMode === "celtic-cross" && <CelticCrossSpread cards={drawnCards} onReveal={handleReveal} />}
                {tarotMode === "pick-a-card" && <PickACardSpread cards={drawnCards} onReveal={handleReveal} />}
              </div>

              {reading && <ReadingPanel reading={reading} drawnCards={drawnCards} question={question} />}

              {phase === "loading" && (
                <motion.div className="flex flex-col items-center mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="font-heading text-primary text-sm tracking-widest animate-pulse">Channeling the cosmos...</p>
                </motion.div>
              )}

              {phase === "reading" && (
                <motion.div className="flex justify-center gap-4 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <button onClick={handleReset} className="px-6 py-3 rounded-lg bg-secondary border border-primary/30 text-primary font-heading text-sm tracking-wider hover:bg-primary/20 transition-all">
                    Draw New Cards
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
