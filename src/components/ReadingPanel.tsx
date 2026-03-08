import { useCallback } from "react";
import { motion } from "framer-motion";
import type { DrawnCard } from "@/data/tarotDeck";
import ReadingAudioPlayer from "@/components/ReadingAudioPlayer";

interface ReadingPanelProps {
  reading: string;
  drawnCards: DrawnCard[];
  question: string;
}

const ReadingPanel = ({ reading, drawnCards, question }: ReadingPanelProps) => {
  if (!reading) return null;

  // Split reading into main interpretation and sections
  const sections = reading.split(/\n\n/);

  const handleShare = useCallback(async () => {
    const cardNames = drawnCards
      .filter((dc) => dc.isRevealed)
      .map((dc) => `${dc.card.name} (${dc.isReversed ? "Reversed" : "Upright"})`)
      .join(", ");

    const shareText = `🔮 My Mystic Reading\n\nQuestion: "${question}"\nCards: ${cardNames}\n\n${reading.slice(0, 200)}…`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "My Mystic Divination Reading", text: shareText });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      // Could use toast here
    }
  }, [drawnCards, question, reading]);

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
            {reading}
          </div>
        </div>

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

        {/* Share button */}
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={handleShare}
            className="px-5 py-2.5 rounded-lg bg-muted/50 border border-primary/20 text-primary font-heading text-xs tracking-widest hover:bg-primary/10 transition-all flex items-center gap-2"
          >
            <span>✦</span>
            Share My Reading
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReadingPanel;
