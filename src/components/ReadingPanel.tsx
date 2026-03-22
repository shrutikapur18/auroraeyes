import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import type { DrawnCard } from "@/data/tarotDeck";
import type { ShareImageData } from "@/lib/generateShareImage";
import { generateAIReading } from "@/lib/tarotReading";
import GradualReading from "@/components/GradualReading";
import ReadingAudioPlayer from "@/components/ReadingAudioPlayer";
import FollowUpChat from "@/components/FollowUpChat";
import ShareButtons from "@/components/ShareButtons";
import ReadingSummary from "@/components/ReadingSummary";

interface ReadingPanelProps {
  reading: string;
  drawnCards: DrawnCard[];
  question: string;
  type?: "tarot" | "rune" | "angel";
  suggestedQuestions?: string[];
  runes?: Array<{
    name: string;
    symbol: string;
    orientation: string;
    position: string;
    meaning: string;
    keywords: string;
  }>;
  angelCards?: Array<{
    name: string;
    position: string;
    meaning: string;
    keywords: string;
  }>;
}

const ReadingPanel = ({ reading, drawnCards, question, type = "tarot", suggestedQuestions: initialSuggestions = [], runes, angelCards }: ReadingPanelProps) => {
  const [aiReading, setAiReading] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiSuggestedQuestions, setAiSuggestedQuestions] = useState<string[]>([]);

  const displayedReading = aiReading || reading;
  const activeSuggestions = aiSuggestedQuestions.length > 0 ? aiSuggestedQuestions : initialSuggestions;

  const handleUnlockAI = useCallback(async () => {
    setAiLoading(true);
    setAiError("");
    try {
      const result = await generateAIReading(question, drawnCards);
      setAiReading(result.reading);
      setAiSuggestedQuestions(result.suggestedQuestions);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "AI interpretations are temporarily unavailable. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  }, [question, drawnCards]);

  const shareImageData: ShareImageData | undefined = useMemo(() => {
    const revealed = drawnCards.filter((dc) => dc.isRevealed);
    if (revealed.length === 0) return undefined;
    const firstSentence = displayedReading
      .replace(/\*\*/g, "")
      .split(/\.\s/)
      .filter((s) => s.length > 20)
      .slice(0, 3)
      .join(". ") + ".";
    return {
      cards: revealed.map((dc) => ({
        cardName: dc.card.name,
        orientation: dc.isReversed ? "Reversed" : "Upright",
        position: dc.position,
        symbol: dc.card.symbol,
      })),
      message: firstSentence.slice(0, 280),
    };
  }, [drawnCards, displayedReading]);

  if (!reading) return null;

  return (
    <motion.div
      className="max-w-2xl lg:max-w-3xl mx-auto mt-8 md:mt-10 lg:mt-12 mb-12 md:mb-16 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="reading-panel rounded-2xl p-6 md:p-10">
        <h2 className="font-heading text-lg md:text-2xl gold-text mb-2 text-center tracking-wider">
          What the Cards Reveal
        </h2>
        <p className="text-[11px] text-muted-foreground/50 text-center mb-6 md:mb-8 italic">
          {question ? `"${question}"` : "A general reading for this moment"}
        </p>

        {/* Cards summary */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-5 md:mb-6">
          {drawnCards
            .filter((dc) => dc.isRevealed)
            .map((dc, i) => (
              <motion.div
                key={i}
                className="text-center px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg bg-muted/30 border border-border/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-[10px] md:text-xs font-heading text-primary/70 block">{dc.position}</span>
                <span className="text-xs md:text-sm font-heading text-foreground">{dc.card.name}</span>
                <span className="text-[10px] text-muted-foreground block">
                  {dc.isReversed ? "↻ Reversed" : "↑ Upright"}
                </span>
              </motion.div>
            ))}
        </div>

        {/* Energy, Timing, and Combination Summary */}
        <ReadingSummary drawnCards={drawnCards} type={type} />

        {/* Main reading — gradual reveal */}
        <div className="border-t border-border/30 pt-5 md:pt-6 mt-6">
          <GradualReading text={displayedReading} interval={500} />
        </div>

        {/* Unlock deeper AI interpretation */}
        {!aiReading && (
          <motion.div
            className="mt-10 pt-8 border-t border-primary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {aiError && (
              <p className="text-center text-sm text-destructive mb-3">{aiError}</p>
            )}
            <div className="flex flex-col items-center gap-3">
              <motion.button
                onClick={handleUnlockAI}
                disabled={aiLoading}
                className="mystical-button px-8 py-4 rounded-xl font-heading text-sm tracking-[0.15em] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={{ scale: aiLoading ? 1 : 1.04, boxShadow: "0 0 30px hsl(43 70% 65% / 0.3)" }}
                whileTap={{ scale: aiLoading ? 1 : 0.97 }}
              >
                {aiLoading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border border-background/30 border-t-background rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Channeling deeper wisdom...
                  </>
                ) : (
                  <>
                    <span className="text-sm">✦</span>
                    Unlock Deeper Interpretation
                  </>
                )}
              </motion.button>
              <p className="text-[10px] text-muted-foreground/40 italic">
                A personalized reading with richer, more nuanced insights
              </p>
            </div>
          </motion.div>
        )}

        {/* AI badge */}
        {aiReading && (
          <motion.div
            className="mt-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-[10px] font-heading tracking-widest text-primary/50 bg-primary/5 border border-primary/10 rounded-full px-3 py-1">
              ✦ AI-ENHANCED READING
            </span>
          </motion.div>
        )}

        {/* Reflection prompts */}
        <motion.div
          className="mt-10 pt-6 md:pt-8 border-t border-primary/8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="font-heading text-xs gold-text mb-4 tracking-[0.2em] uppercase">
            Pause and Reflect
          </h3>
          <div className="space-y-2.5">
            {[
              "Does this resonate with something unfolding in your life right now?",
              "What feelings arose as you absorbed this reading?",
              "What is one quiet step you might take from this moment forward?",
            ].map((prompt, i) => (
              <p key={i} className="text-xs text-muted-foreground/50 italic pl-4 border-l border-primary/10">
                {prompt}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Voice reading */}
        <ReadingAudioPlayer reading={displayedReading} />

        {/* Share section — now with viral share links */}
        <motion.div
          className="mt-6 pt-6 border-t border-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <ShareButtons
            text=""
            cardData={shareImageData}
            drawnCards={drawnCards}
            question={question}
            reading={displayedReading}
            type={type}
          />
        </motion.div>
      </div>

      {/* Follow-up chat */}
      <FollowUpChat
        originalQuestion={question}
        drawnCards={drawnCards}
        initialReading={displayedReading}
        type={type}
        suggestedQuestions={activeSuggestions}
        runes={runes}
        angelCards={angelCards}
      />
    </motion.div>
  );
};

export default ReadingPanel;
