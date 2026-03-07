import { motion } from "framer-motion";
import type { DrawnCard } from "@/data/tarotDeck";

interface ReadingPanelProps {
  reading: string;
  drawnCards: DrawnCard[];
  question: string;
}

const ReadingPanel = ({ reading, drawnCards, question }: ReadingPanelProps) => {
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

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {drawnCards.filter(dc => dc.isRevealed).map((dc, i) => (
            <div key={i} className="text-center">
              <span className="text-xs font-heading text-primary/70 block">{dc.position}</span>
              <span className="text-sm font-heading text-foreground">{dc.card.name}</span>
              <span className="text-xs text-muted-foreground block">
                {dc.isReversed ? "↻ Rev" : "↑ Up"}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border/30 pt-6">
          <div className="text-foreground font-body leading-relaxed text-sm md:text-base whitespace-pre-line">
            {reading}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReadingPanel;
