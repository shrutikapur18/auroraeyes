import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AngelCardSpread from "@/components/AngelCardSpread";
import QuestionInput from "@/components/QuestionInput";
import { useState } from "react";
import { Link } from "react-router-dom";

const AngelCardReading = () => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <SEOHead title="Free Angel Card Reading" description="Receive divine messages from your angels. Draw angel oracle cards for loving guidance on relationships, healing, and spiritual growth." canonicalPath="/angel-card-reading" />
      <motion.header className="text-center pt-8 pb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Angel Card Reading</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">Open your heart to divine messages. Draw angel oracle cards for loving guidance and celestial support.</p>
      </motion.header>

      <QuestionInput question={question} setQuestion={setQuestion} />
      {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
      <AngelCardSpread question={question} onError={setError} />

      <section className="max-w-3xl mx-auto mt-16 reading-panel rounded-xl p-6 md:p-8">
        <h2 className="font-heading text-xl gold-text mb-4">What Is an Angel Card Reading?</h2>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">Angel card readings connect you with the loving energy of archangels and guardian angels. Each card carries a message of hope, healing, and encouragement.</p>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">Unlike tarot, angel cards never carry fear-based messages. Every draw is uplifting and focuses on empowerment, comfort, and spiritual guidance.</p>
        <div className="mt-6 flex gap-2">
          <Link to="/daily-angel-message" className="text-xs text-primary hover:underline">Daily Angel Message →</Link>
          <Link to="/free-tarot-reading" className="text-xs text-primary hover:underline">Tarot Reading →</Link>
        </div>
      </section>
    </>
  );
};

export default AngelCardReading;
