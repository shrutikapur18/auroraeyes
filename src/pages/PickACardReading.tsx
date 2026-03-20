import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import QuestionInput from "@/components/QuestionInput";
import FocusMoment from "@/components/FocusMoment";
import InteractiveShuffle from "@/components/InteractiveShuffle";
import ReadingTable from "@/components/ReadingTable";
import PickACardSpread from "@/components/PickACardSpread";
import ReadingPanel from "@/components/ReadingPanel";
import ShareButtons from "@/components/ShareButtons";
import type { DrawnCard } from "@/data/tarotDeck";
import { drawCards } from "@/data/tarotDeck";
import { generateLocalReading } from "@/lib/tarotReading";
import { Link } from "react-router-dom";

type Phase = "input" | "focus" | "shuffling" | "spread" | "reading" | "loading";

const PickACardReading = () => {
  const [question, setQuestion] = useState("");
  const [phase, setPhase] = useState<Phase>("input");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [reading, setReading] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (!question.trim()) { setError("Please enter your question first."); return; }
    setError(""); setPhase("focus");
  };

  const handleReveal = useCallback((index: number) => {
    if (drawnCards.some((c) => c.isRevealed)) return;
    setDrawnCards((prev) => {
      const updated = prev.map((dc, i) => (i === index ? { ...dc, isRevealed: true } : dc));
      setTimeout(() => {
        setPhase("loading");
        const text = generateLocalReading(question, updated);
        setReading(text); setPhase("reading");
      }, 800);
      return updated;
    });
  }, [question, drawnCards]);

  const handleReset = () => { setPhase("input"); setDrawnCards([]); setReading(""); setError(""); setQuestion(""); };

  return (
    <>
      <SEOHead title="Pick a Card Reading" description="Choose the card you feel drawn to for an intuitive tarot reading. Trust your instincts and uncover personalized guidance." canonicalPath="/pick-a-card-reading" />
      <motion.header className="text-center pt-8 pb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Pick a Card Reading</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">Choose the card you feel most drawn to and receive a message crafted just for you.</p>
      </motion.header>

      <AnimatePresence mode="wait">
        {phase === "input" && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuestionInput question={question} setQuestion={setQuestion} />
            {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
            <div className="flex justify-center mb-10">
              <motion.button onClick={handleStart} className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Shuffle & Pick</motion.button>
            </div>
            <section className="max-w-3xl mx-auto mt-8 reading-panel rounded-xl p-6">
              <h2 className="font-heading text-xl gold-text mb-4">What is a Pick a Card Reading?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">A Pick a Card reading invites you to trust your intuition. Three cards are laid before you — choose the one that resonates, and its message will illuminate your path.</p>
              <div className="mt-4 flex gap-2"><Link to="/free-tarot-reading" className="text-xs text-primary hover:underline">Full Reading →</Link></div>
            </section>
          </motion.div>
        )}
        {phase === "focus" && <FocusMoment key="focus" onComplete={() => setPhase("shuffling")} method="tarot" />}
        {phase === "shuffling" && (
          <motion.div key="shuffling" className="py-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <InteractiveShuffle onComplete={() => setPhase("fan")} minPresses={3} />
          </motion.div>
        )}
        {phase === "fan" && (
          <motion.div key="fan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-center text-xs text-muted-foreground italic mb-4">"{question}"</p>
            <CardFanSpread requiredCount={3} positions={["Card 1", "Card 2", "Card 3"]} onComplete={(cards) => { setDrawnCards(cards); setPhase("spread"); }} />
          </motion.div>
        )}
        {(phase === "spread" || phase === "reading" || phase === "loading") && (
          <motion.div key="spread" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-center text-sm text-muted-foreground italic mb-4">"{question}"</p>
            {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
            <ReadingTable><div className="py-4"><PickACardSpread cards={drawnCards} onReveal={handleReveal} /></div></ReadingTable>
            {reading && (<><ReadingPanel reading={reading} drawnCards={drawnCards} question={question} /><ShareButtons text={`✨ My Pick a Card message — Get yours at`} /></>)}
            {phase === "loading" && (<motion.div className="flex flex-col items-center mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4" /><p className="font-heading text-primary text-sm tracking-widest animate-pulse">Channeling the cosmos...</p></motion.div>)}
            {phase === "reading" && (<div className="flex justify-center mt-6"><button onClick={handleReset} className="px-6 py-3 rounded-lg bg-secondary border border-primary/30 text-primary font-heading text-sm tracking-wider hover:bg-primary/20 transition-all">Pick Again</button></div>)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PickACardReading;
