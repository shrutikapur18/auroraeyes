import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarBackground from "@/components/StarBackground";
import FloatingParticles from "@/components/FloatingParticles";
import QuestionInput from "@/components/QuestionInput";
import DivinationMethodSelector, { type DivinationMethod } from "@/components/DivinationMethodSelector";
import ReadingModeSelector from "@/components/ReadingModeSelector";
import ReadingTable from "@/components/ReadingTable";
import FocusMoment from "@/components/FocusMoment";
import InteractiveShuffle from "@/components/InteractiveShuffle";
import CardFanSpread from "@/components/CardFanSpread";
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
import { canDoReading, recordReading, generateAIReading } from "@/lib/tarotReading";

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
    if (!question.trim()) {
      setError("Please enter your question first.");
      return;
    }
    setError("");
    setPhase("focus");
  };

  const handleFocusComplete = useCallback(() => {
    setPhase("shuffling");
  }, []);

  const handleShuffleComplete = useCallback((_seed: number) => {
    // After shuffle, go to fan spread for card selection
    setPhase("fan");
  }, []);

  // Called when user finishes picking cards from the fan
  const handleFanComplete = useCallback(
    (selectedCards: DrawnCard[]) => {
      setDrawnCards(selectedCards);
      setPhase("spread");
    },
    []
  );

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

  const isTarotMethod = divinationMethod === "tarot";

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
          <motion.h1
            className="text-4xl md:text-6xl font-heading gold-text mb-3 tracking-wider"
            animate={{ textShadow: ["0 0 20px hsl(45 80% 55% / 0.2)", "0 0 40px hsl(45 80% 55% / 0.4)", "0 0 20px hsl(45 80% 55% / 0.2)"] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Mystic Divination
          </motion.h1>
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

              {isTarotMethod && (
                <>
                  <ReadingModeSelector mode={tarotMode} setMode={setTarotMode} />
                  <div className="flex justify-center mb-10">
                    <motion.button
                      onClick={handleStartShuffle}
                      className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Begin Reading
                    </motion.button>
                  </div>
                </>
              )}

              {divinationMethod === "yes-no" && (
                <YesNoSpread question={question} onError={setError} />
              )}

              {divinationMethod === "pick-a-card" && (
                <div className="flex justify-center mb-10">
                  <motion.button
                    onClick={() => {
                      setTarotMode("pick-a-card");
                      handleStartShuffle();
                    }}
                    className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Shuffle & Pick
                  </motion.button>
                </div>
              )}

              {divinationMethod === "angel" && (
                <AngelCardSpread question={question} onError={setError} />
              )}

              {divinationMethod === "runes" && (
                <RuneSpread question={question} onError={setError} />
              )}

              <DailyDivination />
            </motion.div>
          )}

          {phase === "focus" && (
            <FocusMoment key="focus" onComplete={handleFocusComplete} method="tarot" />
          )}

          {phase === "shuffling" && (
            <motion.div
              key="shuffling"
              className="py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InteractiveShuffle
                onComplete={handleShuffleComplete}
                minPresses={3}
                label="Shuffle the Cards"
              />
            </motion.div>
          )}

          {/* Fan spread: user picks cards from a realistic fan */}
          {phase === "fan" && (
            <motion.div
              key="fan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-4 text-center">
                <p className="text-xs text-muted-foreground italic">"{question}"</p>
              </div>
              <CardFanSpread
                requiredCount={cardCount}
                positions={positions}
                onComplete={handleFanComplete}
              />
            </motion.div>
          )}

          {(phase === "spread" || phase === "reading" || phase === "loading") && (
            <motion.div key="spread" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-4 text-center">
                <p className="text-sm text-muted-foreground italic">"{question}"</p>
              </div>

              {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}

              <ReadingTable>
                <div className="py-4">
                  {tarotMode === "three-card" && <ThreeCardSpread cards={drawnCards} onReveal={handleReveal} />}
                  {tarotMode === "celtic-cross" && <CelticCrossSpread cards={drawnCards} onReveal={handleReveal} />}
                  {tarotMode === "pick-a-card" && <PickACardSpread cards={drawnCards} onReveal={handleReveal} />}
                </div>
              </ReadingTable>

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

      {/* Ambient floating particles */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <FloatingParticles count={12} color="gold" />
      </div>
    </div>
  );
};

export default Index;
