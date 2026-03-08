import { motion } from "framer-motion";

interface SnippetBoxProps {
  question: string;
  answer: string;
}

/**
 * Featured-snippet-optimised answer box.
 * Short paragraph format that Google can extract directly.
 */
const SnippetBox = ({ question, answer }: SnippetBoxProps) => (
  <motion.div
    className="reading-panel rounded-xl p-5 md:p-6 mb-8 border-l-4 border-primary/40"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h2 className="font-heading text-base md:text-lg text-foreground mb-2">{question}</h2>
    <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
  </motion.div>
);

export default SnippetBox;
