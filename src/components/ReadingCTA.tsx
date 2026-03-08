import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ReadingCTAProps {
  title?: string;
  description?: string;
  to?: string;
  label?: string;
}

/**
 * Reusable call-to-action block to embed interactive reading prompts within content pages.
 */
const ReadingCTA = ({
  title = "Try Your Own Reading",
  description = "Focus on your question and let the cards reveal what you need to know.",
  to = "/free-tarot-reading",
  label = "Start Free Tarot Reading",
}: ReadingCTAProps) => (
  <motion.div
    className="reading-panel rounded-xl p-6 text-center my-8 border border-primary/20"
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
  >
    <span className="text-3xl block mb-2">🔮</span>
    <h3 className="font-heading text-lg text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">{description}</p>
    <Link
      to={to}
      className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm hover:opacity-90 transition-opacity"
    >
      {label}
    </Link>
  </motion.div>
);

export default ReadingCTA;
