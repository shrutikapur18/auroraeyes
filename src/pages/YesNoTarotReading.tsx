import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import YesNoSpread from "@/components/YesNoSpread";
import QuestionInput from "@/components/QuestionInput";
import { useState } from "react";
import { Link } from "react-router-dom";

const YesNoTarotReading = () => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <SEOHead
        title="Yes or No Tarot Reading"
        description="Get instant yes or no answers from the tarot. Ask your question and draw a single card for clear guidance on life's decisions."
        canonicalPath="/yes-no-tarot-reading"
      />
      <motion.header className="text-center pt-8 pb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Yes or No Tarot Reading</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">
          Need a quick answer? Focus on your yes-or-no question and draw a single card for clear, immediate guidance.
        </p>
      </motion.header>

      <QuestionInput question={question} setQuestion={setQuestion} />
      {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
      <YesNoSpread question={question} onError={setError} />

      <section className="max-w-3xl mx-auto mt-16 reading-panel rounded-xl p-6 md:p-8">
        <h2 className="font-heading text-xl gold-text mb-4">How Does Yes/No Tarot Work?</h2>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">The Yes/No tarot reading draws a single card from the deck. Based on the card's energy — upright or reversed — and its inherent symbolism, you'll receive a clear Yes, No, or Maybe answer.</p>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">This method is ideal for quick decisions and moments when you need clarity without a full spread.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link to="/free-tarot-reading" className="text-xs text-primary hover:underline">Full Tarot Reading →</Link>
          <Link to="/tarot-card-meanings" className="text-xs text-primary hover:underline">Card Meanings →</Link>
        </div>
      </section>
    </>
  );
};

export default YesNoTarotReading;
