import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GradualReadingProps {
  text: string;
  /** Delay in ms between paragraphs */
  interval?: number;
}

/** Highlights **bold** markers and key mystical phrases */
function formatParagraph(text: string) {
  // Convert **bold** to styled spans
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="text-primary font-heading font-medium">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const GradualReading = ({ text, interval = 600 }: GradualReadingProps) => {
  const paragraphs = useMemo(() => {
    return text
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }, [text]);

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (visibleCount >= paragraphs.length) return;
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, interval);
    return () => clearTimeout(timer);
  }, [visibleCount, paragraphs.length, interval]);

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {paragraphs.slice(0, visibleCount).map((para, i) => (
          <motion.p
            key={i}
            className="text-foreground font-body leading-relaxed text-sm md:text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {formatParagraph(para)}
          </motion.p>
        ))}
      </AnimatePresence>

      {visibleCount < paragraphs.length && (
        <motion.div
          className="flex justify-center py-2"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GradualReading;
