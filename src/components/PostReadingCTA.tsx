import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface PostReadingCTAProps {
  onTryAnother?: () => void;
}

const suggestedPrompts = [
  "Ask about your relationship",
  "Ask about career clarity",
  "Ask about a difficult decision",
  "Ask about what's holding you back",
];

const PostReadingCTA = ({ onTryAnother }: PostReadingCTAProps) => (
  <motion.div
    className="max-w-xl mx-auto mt-8 space-y-6 px-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    {/* Try another */}
    {onTryAnother && (
      <div className="text-center space-y-3">
        <motion.button
          onClick={onTryAnother}
          className="px-8 py-3.5 rounded-xl bg-secondary/50 border border-primary/20 text-primary/80 font-heading text-sm tracking-widest hover:bg-primary/10 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Try Another Question
        </motion.button>

        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              onClick={onTryAnother}
              className="text-[11px] px-3 py-1.5 rounded-full border border-border/30 text-muted-foreground/60 hover:text-primary hover:border-primary/30 transition-all font-heading tracking-wider"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Deeper insight CTA */}
    <motion.div
      className="reading-panel rounded-xl p-5 md:p-6 text-center border border-primary/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="font-heading text-base md:text-lg text-foreground mb-2">
        Want deeper, personal insight?
      </h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
        Talk to a real intuitive reader for detailed guidance on your situation.
      </p>
      <Link
        to="/talk-to-a-reader"
        className="inline-block px-6 py-3 rounded-lg bg-primary/15 border border-primary/20 text-primary font-heading text-sm tracking-wider hover:bg-primary/25 transition-all"
      >
        Talk to a Reader
      </Link>
    </motion.div>
  </motion.div>
);

export default PostReadingCTA;
