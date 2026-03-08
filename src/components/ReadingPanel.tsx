import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import type { DrawnCard } from "@/data/tarotDeck";
import type { ShareImageData } from "@/lib/generateShareImage";
import { generateAIReading } from "@/lib/tarotReading";
import ReadingAudioPlayer from "@/components/ReadingAudioPlayer";
import FollowUpChat from "@/components/FollowUpChat";
import ShareButtons from "@/components/ShareButtons";

interface ReadingPanelProps {
  reading: string;
  drawnCards: DrawnCard[];
  question: string;
  type?: "tarot" | "rune" | "angel";
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

const ReadingPanel = ({ reading, drawnCards, question, type = "tarot", runes, angelCards }: ReadingPanelProps) => {
  const [aiReading, setAiReading] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const displayedReading = aiReading || reading;

  const handleUnlockAI = useCallback(async () => {
    setAiLoading(true);
    setAiError("");
    try {
      const text = await generateAIReading(question, drawnCards);
      setAiReading(text);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "AI interpretations are temporarily unavailable. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  }, [question, drawnCards]);

  const shareText = useMemo(() => {
    const cardNames = drawnCards
      .filter((dc) => dc.isRevealed)
      .map((dc) => `${dc.card.name} (${dc.isReversed ? "Reversed" : "Upright"})`)
      .join(", ");
    return `🔮 My Mystic Reading\n\nQuestion: "${question}"\nCards: ${cardNames}\n\n${displayedReading.slice(0, 200)}…`;
  }, [drawnCards, question, displayedReading]);

  const shareImageData: ShareImageData | undefined = useMemo(() => {
    const revealed = drawnCards.filter((dc) => dc.isRevealed);
    if (revealed.length === 0) return undefined;
    const primary = revealed[0];
    const firstSentence = displayedReading
      .replace(/\*\*/g, "")
      .split(/\.\s/)
      .filter((s) => s.length > 20)
      .slice(0, 3)
      .join(". ") + ".";
    return {
      cardName: primary.card.name,
      orientation: primary.isReversed ? "Reversed" : "Upright",
      message: firstSentence.slice(0, 280),
      position: primary.position,
    };
  }, [drawnCards, displayedReading]);

  if (!reading) return null;

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-10 mb-16 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="reading-panel rounded-xl p-6 md:p-8">
        <h2 className="font-heading text-xl md:text-2xl gold-text mb-2 text-center">
          Your Reading
        </h2>
        <p className="text-xs text-muted-foreground text-center mb-6 italic">
          "{question}"
        </p>

        {/* Cards summary */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {drawnCards
            .filter((dc) => dc.isRevealed)
            .map((dc, i) => (
              <motion.div
                key={i}
                className="text-center px-3 py-2 rounded-lg bg-muted/30 border border-border/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-xs font-heading text-primary/70 block">{dc.position}</span>
                <span className="text-sm font-heading text-foreground">{dc.card.name}</span>
                <span className="text-xs text-muted-foreground block">
                  {dc.isReversed ? "↻ Reversed" : "↑ Upright"}
                </span>
              </motion.div>
            ))}
        </div>

        {/* Main reading */}
        <div className="border-t border-border/30 pt-6">
          <div className="text-foreground font-body leading-relaxed text-sm md:text-base whitespace-pre-line">
            {displayedReading}
          </div>
        </div>

        {/* Unlock deeper AI interpretation */}
        {!aiReading && (
          <motion.div
            className="mt-8 pt-6 border-t border-primary/20"
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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 text-primary font-heading text-sm tracking-wider hover:from-primary/30 hover:to-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={{ scale: aiLoading ? 1 : 1.03 }}
                whileTap={{ scale: aiLoading ? 1 : 0.97 }}
              >
                {aiLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Channeling deeper wisdom...
                  </>
                ) : (
                  <>
                    <span className="text-base">✦</span>
                    Unlock deeper AI interpretation
                  </>
                )}
              </motion.button>
              <p className="text-[10px] text-muted-foreground/60">
                Get a personalized AI-powered reading with richer insights
              </p>
            </div>
          </motion.div>
        )}

        {/* AI badge when upgraded */}
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
          className="mt-8 pt-6 border-t border-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="font-heading text-sm gold-text mb-3 tracking-wider">
            Take a moment to reflect
          </h3>
          <div className="space-y-2">
            {[
              "Does this message connect with something currently unfolding in your life?",
              "What feelings arose as you read the interpretation?",
              "What is one small step you might take based on this guidance?",
            ].map((prompt, i) => (
              <p key={i} className="text-xs text-muted-foreground italic pl-3 border-l border-primary/20">
                {prompt}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Voice reading */}
        <ReadingAudioPlayer reading={displayedReading} />

        {/* Share section */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <ShareButtons text={shareText} cardData={shareImageData} />
        </motion.div>
      </div>

      {/* Follow-up chat */}
      <FollowUpChat
        originalQuestion={question}
        drawnCards={drawnCards}
        initialReading={displayedReading}
        type={type}
        runes={runes}
        angelCards={angelCards}
      />
    </motion.div>
  );
};

export default ReadingPanel;
