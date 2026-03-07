import { motion } from "framer-motion";

interface QuestionInputProps {
  question: string;
  setQuestion: (q: string) => void;
  disabled?: boolean;
}

const QuestionInput = ({ question, setQuestion, disabled }: QuestionInputProps) => {
  return (
    <motion.div
      className="max-w-lg mx-auto mb-8 relative z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <label className="block text-sm font-heading text-primary mb-2 tracking-widest uppercase">
        Ask your question
      </label>
      <p className="text-xs text-muted-foreground mb-3 italic">
        Take a moment to focus on your question before beginning the reading.
      </p>
      <div className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={disabled}
          placeholder="What do you seek guidance on?"
          className="w-full px-5 py-4 rounded-xl bg-muted/60 border border-border/60 text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all disabled:opacity-50 backdrop-blur-sm"
        />
        <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
          background: "linear-gradient(135deg, hsl(var(--gold) / 0.03), transparent, hsl(var(--gold) / 0.03))",
        }} />
      </div>
    </motion.div>
  );
};

export default QuestionInput;
