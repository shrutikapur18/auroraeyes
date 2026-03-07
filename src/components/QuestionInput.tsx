import { motion } from "framer-motion";

interface QuestionInputProps {
  question: string;
  setQuestion: (q: string) => void;
  disabled?: boolean;
}

const QuestionInput = ({ question, setQuestion, disabled }: QuestionInputProps) => {
  return (
    <motion.div
      className="max-w-lg mx-auto mb-6 relative z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <label className="block text-sm font-heading text-primary mb-2 tracking-widest uppercase">
        Ask your question
      </label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={disabled}
        placeholder="What do you seek guidance on?"
        className="w-full px-5 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50"
      />
    </motion.div>
  );
};

export default QuestionInput;
