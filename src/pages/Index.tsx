import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarBackground from "@/components/StarBackground";
import Header from "@/components/Header";
import QuestionInput from "@/components/QuestionInput";
import ReadingModeSelector from "@/components/ReadingModeSelector";
import ThreeCardSpread from "@/components/ThreeCardSpread";
import CelticCrossSpread from "@/components/CelticCrossSpread";
import PickACardSpread from "@/components/PickACardSpread";
import ReadingPanel from "@/components/ReadingPanel";
import DailyCard from "@/components/DailyCard";
import { drawCards, threeCardPositions, celticCrossPositions } from "@/data/tarotDeck";
import type { DrawnCard, ReadingMode } from "@/data/tarotDeck";
import { canDoReading, recordReading, generateAIReading } from "@/lib/tarotReading";
import cardBackImage from "@/assets/card-back.jpg";

type Phase = "input" | "shuffling" | "spread" | "reading";

const Index = () => {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState<ReadingMode>("three-card");
  const [phase, setPhase] = useState<Phase>("input");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [reading, setReading] = useState("");
  const [error, setError] = useState("");

  const cardCount = mode === "three-card" ? 3 : mode === "celtic-cross" ? 10 : 3;

  const positions = mode === "three-card"
    ? threeCardPositions
    : mode === "celtic-cross"
    ? celticCrossPositions
    : ["Your Card", "Card 2", "Card 3"];

  const handleShuffle = () => {
    if (!question.trim()) {
      setError("Please enter your question first.");
      return;
    }
    setError("");
    setPhase("shuffling");

    const cards = drawCards(cardCount).map((dc, i) => ({
      ...dc,
      position: positions[i],
    }));
    setDrawnCards(cards);

    setTimeout(() => setPhase("spread"), 2000);
  };

  const handleReveal = useCallback(
    (index: number) => {
      // For pick-a-card, only allow one reveal
      if (mode === "pick-a-card" && drawnCards.some((c) => c.isRevealed)) return;

      setDrawnCards((prev) => {
        const updated = prev.map((dc, i) =>
          i === index ? { ...dc, isRevealed: true } : dc
        );

        // Check if reading should trigger
        const revealedCount = updated.filter((c) => c.isRevealed).length;
        const shouldRead =
          mode === "pick-a-card"
            ? revealedCount >= 1
            : revealedCount >= cardCount;

        if (shouldRead) {
          setTimeout(() => {
            const check = canDoReading();
            if (!check.allowed) {
              setError(check.reason || "");
              return;
            }
            recordReading();
            const readingText = generateLocalReading(question, updated);
            setReading(readingText);
            setPhase("reading");
          }, 800);
        }

        return updated;
      });
    },
    [mode, cardCount, question, drawnCards]
  );

  const handleReset = () => {
    setPhase("input");
    setDrawnCards([]);
    setReading("");
    setError("");
    setQuestion("");
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarBackground />

      <div className="relative z-10 px-4 pb-20">
        <Header />

        <AnimatePresence mode="wait">
          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuestionInput question={question} setQuestion={setQuestion} />
              <ReadingModeSelector mode={mode} setMode={setMode} />

              {error && (
                <p className="text-center text-sm text-destructive mb-4">{error}</p>
              )}

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

              {/* Deck preview */}
              <div className="flex justify-center mb-8">
                <div className="relative w-32 h-48">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-lg overflow-hidden border border-primary/20"
                      style={{
                        top: -i * 2,
                        left: i * 1.5,
                        zIndex: 5 - i,
                      }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 3,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <img
                        src={cardBackImage}
                        alt="Tarot deck"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <DailyCard />
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
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      repeat: 3,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={cardBackImage}
                      alt="Shuffling"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="font-heading text-primary text-lg tracking-widest animate-pulse">
                Shuffling the cards...
              </p>
            </motion.div>
          )}

          {(phase === "spread" || phase === "reading") && (
            <motion.div
              key="spread"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-4 text-center">
                <p className="text-sm text-muted-foreground italic">"{question}"</p>
              </div>

              {error && (
                <p className="text-center text-sm text-destructive mb-4">{error}</p>
              )}

              <div className="py-4">
                {mode === "three-card" && (
                  <ThreeCardSpread cards={drawnCards} onReveal={handleReveal} />
                )}
                {mode === "celtic-cross" && (
                  <CelticCrossSpread cards={drawnCards} onReveal={handleReveal} />
                )}
                {mode === "pick-a-card" && (
                  <PickACardSpread cards={drawnCards} onReveal={handleReveal} />
                )}
              </div>

              {reading && (
                <ReadingPanel
                  reading={reading}
                  drawnCards={drawnCards}
                  question={question}
                />
              )}

              {phase === "reading" && (
                <motion.div
                  className="flex justify-center gap-4 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-lg bg-secondary border border-primary/30 text-primary font-heading text-sm tracking-wider hover:bg-primary/20 transition-all"
                  >
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
