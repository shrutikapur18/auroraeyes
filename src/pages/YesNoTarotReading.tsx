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

      <section className="max-w-3xl mx-auto mt-16 space-y-8">
        <div className="reading-panel rounded-xl p-6 md:p-8">
          <h2 className="font-heading text-xl gold-text mb-4">How Does Yes/No Tarot Work?</h2>
          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">The Yes/No tarot reading draws a single card from the deck. Based on the card's energy — upright or reversed — and its inherent symbolism, you'll receive a clear Yes, No, or Maybe answer.</p>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">This method is ideal for quick decisions and moments when you need clarity without a full spread. It works best when your question is specific and binary — something that genuinely has a yes or no answer.</p>
        </div>

        <div className="reading-panel rounded-xl p-6 md:p-8">
          <h2 className="font-heading text-lg text-foreground mb-3">Tips for Better Yes/No Readings</h2>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground leading-relaxed flex gap-2"><span className="text-primary shrink-0">✦</span><span>Be specific. "Will I get the promotion by December?" is better than "Will my career improve?"</span></li>
            <li className="text-sm text-muted-foreground leading-relaxed flex gap-2"><span className="text-primary shrink-0">✦</span><span>Ask once. Pulling multiple cards for the same question muddies the reading.</span></li>
            <li className="text-sm text-muted-foreground leading-relaxed flex gap-2"><span className="text-primary shrink-0">✦</span><span>Accept "maybe." Some questions don't have binary answers yet — and that's useful information too.</span></li>
            <li className="text-sm text-muted-foreground leading-relaxed flex gap-2"><span className="text-primary shrink-0">✦</span><span>Use it for momentum. Yes/No tarot is best for action-oriented decisions, not deep emotional analysis.</span></li>
          </ul>
        </div>

        <div className="reading-panel rounded-xl p-6 md:p-8">
          <h2 className="font-heading text-lg text-foreground mb-3">When to Use a Full Spread Instead</h2>
          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">Yes/No tarot excels at quick, specific questions. But if you're dealing with complex emotions, relationship dynamics, or major life transitions, a Three Card or Celtic Cross spread provides the depth those situations require.</p>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">Think of it this way: Yes/No gives you direction. A full spread gives you understanding. Both have their place — knowing which to use is part of reading tarot well.</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 mb-8">
          <Link to="/free-tarot-reading" className="text-xs text-primary hover:underline">Full Tarot Reading →</Link>
          <Link to="/tarot-card-meanings" className="text-xs text-primary hover:underline">Card Meanings →</Link>
          <Link to="/yes-or-no-tarot" className="text-xs text-primary hover:underline">Yes/No Guide →</Link>
          <Link to="/love-tarot-reading" className="text-xs text-primary hover:underline">Love Tarot →</Link>
        </div>
      </section>
    </>
  );
};

export default YesNoTarotReading;
