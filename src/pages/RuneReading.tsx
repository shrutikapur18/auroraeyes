import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import RuneSpread from "@/components/RuneSpread";
import QuestionInput from "@/components/QuestionInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import { elderFuthark } from "@/data/runes";

const RuneReading = () => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);

  return (
    <>
      <SEOHead title="Free Rune Reading Online" description="Cast the Elder Futhark runes for ancient wisdom. Get a free rune reading for guidance on your questions about life, love, and destiny." canonicalPath="/rune-reading" />
      <motion.header className="text-center pt-8 pb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Rune Reading</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">Cast the Elder Futhark runes and discover ancient Norse wisdom for your path ahead.</p>
      </motion.header>

      <QuestionInput question={question} setQuestion={setQuestion} />
      {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}

      {!started && (
        <div className="flex flex-col items-center gap-3 mb-8">
          <motion.button
            onClick={() => setStarted(true)}
            className="mystical-button px-10 py-4 rounded-xl font-heading text-base md:text-lg tracking-[0.2em]"
            whileHover={{ scale: 1.05, boxShadow: "0 0 35px hsl(43 70% 65% / 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            ✨ Reveal Your Guidance
          </motion.button>
          <motion.button
            onClick={() => { setQuestion(""); setStarted(true); }}
            className="text-xs text-muted-foreground/60 hover:text-primary/50 transition-colors tracking-widest font-heading uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Draw without a question
          </motion.button>
        </div>
      )}

      <RuneSpread question={question} onError={setError} autoStart={started} />

      <section className="max-w-3xl mx-auto mt-16 reading-panel rounded-xl p-6 md:p-8">
        <h2 className="font-heading text-xl gold-text mb-4">What Are Rune Readings?</h2>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">Rune casting is an ancient Norse divination practice using the 24 symbols of the Elder Futhark alphabet. Each rune carries deep symbolic meaning tied to mythology, nature, and the human experience.</p>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">In a three-rune reading, the stones represent your <strong>Past</strong>, <strong>Present</strong>, and <strong>Future</strong>, weaving a narrative of where you've been, where you are, and where you're headed.</p>
        <h3 className="font-heading text-base text-foreground mb-3">All Elder Futhark Runes</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {elderFuthark.map((r) => (
            <Link key={r.id} to={`/rune-meanings/${r.name.toLowerCase()}`} className="text-center p-2 rounded-lg bg-muted/30 hover:bg-primary/10 transition-all border border-border/20 hover:border-primary/30">
              <span className="text-lg text-primary block">{r.symbol}</span>
              <span className="text-[10px] text-muted-foreground">{r.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default RuneReading;
