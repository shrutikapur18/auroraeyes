import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import QuestionInput from "@/components/QuestionInput";
import YesNoSpread from "@/components/YesNoSpread";

const zodiacData: Record<string, { name: string; dates: string; element: string; symbol: string; traits: string; tarotCard: string; description: string }> = {
  aries: { name: "Aries", dates: "Mar 21 – Apr 19", element: "Fire", symbol: "♈", traits: "Bold, ambitious, energetic, competitive", tarotCard: "The Emperor", description: "Aries is the first sign of the zodiac — a natural leader driven by passion and courage. In tarot, Aries energy connects to The Emperor, symbolizing authority, structure, and decisive action." },
  taurus: { name: "Taurus", dates: "Apr 20 – May 20", element: "Earth", symbol: "♉", traits: "Reliable, patient, devoted, sensual", tarotCard: "The Hierophant", description: "Taurus is grounded and steadfast, valuing security and beauty. In tarot, Taurus connects to The Hierophant, representing tradition, wisdom, and spiritual guidance." },
  gemini: { name: "Gemini", dates: "May 21 – Jun 20", element: "Air", symbol: "♊", traits: "Curious, adaptable, communicative, witty", tarotCard: "The Lovers", description: "Gemini is the sign of duality and communication. In tarot, Gemini connects to The Lovers, representing choices, harmony, and the union of opposites." },
  cancer: { name: "Cancer", dates: "Jun 21 – Jul 22", element: "Water", symbol: "♋", traits: "Intuitive, nurturing, protective, emotional", tarotCard: "The Chariot", description: "Cancer is deeply intuitive and caring. In tarot, Cancer connects to The Chariot, symbolizing emotional determination and the will to overcome challenges." },
  leo: { name: "Leo", dates: "Jul 23 – Aug 22", element: "Fire", symbol: "♌", traits: "Creative, passionate, generous, dramatic", tarotCard: "Strength", description: "Leo radiates warmth and creativity. In tarot, Leo connects to the Strength card, representing courage, inner power, and compassionate influence." },
  virgo: { name: "Virgo", dates: "Aug 23 – Sep 22", element: "Earth", symbol: "♍", traits: "Analytical, practical, loyal, hardworking", tarotCard: "The Hermit", description: "Virgo is methodical and service-oriented. In tarot, Virgo connects to The Hermit, symbolizing introspection, wisdom, and the search for inner truth." },
  libra: { name: "Libra", dates: "Sep 23 – Oct 22", element: "Air", symbol: "♎", traits: "Diplomatic, harmonious, fair-minded, social", tarotCard: "Justice", description: "Libra seeks balance and beauty in all things. In tarot, Libra connects to Justice, representing fairness, truth, and karmic balance." },
  scorpio: { name: "Scorpio", dates: "Oct 23 – Nov 21", element: "Water", symbol: "♏", traits: "Passionate, resourceful, transformative, intense", tarotCard: "Death", description: "Scorpio embodies transformation and depth. In tarot, Scorpio connects to the Death card — not literal death, but powerful endings that lead to rebirth." },
  sagittarius: { name: "Sagittarius", dates: "Nov 22 – Dec 21", element: "Fire", symbol: "♐", traits: "Optimistic, adventurous, philosophical, honest", tarotCard: "Temperance", description: "Sagittarius is the seeker and philosopher. In tarot, Sagittarius connects to Temperance, symbolizing balance, patience, and purposeful moderation." },
  capricorn: { name: "Capricorn", dates: "Dec 22 – Jan 19", element: "Earth", symbol: "♑", traits: "Disciplined, responsible, ambitious, patient", tarotCard: "The Devil", description: "Capricorn is driven and pragmatic. In tarot, Capricorn connects to The Devil, representing the material world, ambition, and the shadow self that must be understood." },
  aquarius: { name: "Aquarius", dates: "Jan 20 – Feb 18", element: "Air", symbol: "♒", traits: "Progressive, independent, humanitarian, inventive", tarotCard: "The Star", description: "Aquarius is visionary and humanitarian. In tarot, Aquarius connects to The Star, symbolizing hope, inspiration, and the courage to dream differently." },
  pisces: { name: "Pisces", dates: "Feb 19 – Mar 20", element: "Water", symbol: "♓", traits: "Compassionate, intuitive, artistic, dreamy", tarotCard: "The Moon", description: "Pisces is the most mystical sign. In tarot, Pisces connects to The Moon, representing intuition, dreams, and the mysteries of the unconscious mind." },
};

const ZodiacTarotReading = () => {
  const { sign } = useParams<{ sign: string }>();
  const signKey = sign?.replace("-tarot-reading", "") || "";
  const data = zodiacData[signKey];
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  if (!data) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Sign Not Found</h1>
        <Link to="/" className="text-primary hover:underline">← Home</Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${data.name} Tarot Reading`}
        description={`Get a personalized tarot reading for ${data.name} (${data.dates}). Discover what the cards reveal for your zodiac sign.`}
        canonicalPath={`/zodiac/${signKey}-tarot-reading`}
      />
      <motion.header className="text-center pt-8 pb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-5xl block mb-3">{data.symbol}</span>
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-2 tracking-wider">{data.name} Tarot Reading</h1>
        <p className="text-sm text-muted-foreground">{data.dates} · {data.element} Sign</p>
      </motion.header>

      <div className="max-w-3xl mx-auto reading-panel rounded-xl p-6 mb-8">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{data.description}</p>
        <p className="text-xs text-muted-foreground"><strong>Key traits:</strong> {data.traits}</p>
        <p className="text-xs text-muted-foreground mt-1"><strong>Associated card:</strong> <Link to={`/tarot-card-meanings/${data.tarotCard.toLowerCase().replace(/\s+/g, "-")}`} className="text-primary hover:underline">{data.tarotCard}</Link></p>
      </div>

      <h2 className="text-center font-heading text-lg gold-text mb-4">Your {data.name} Reading</h2>
      <QuestionInput question={question} setQuestion={setQuestion} />
      {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}
      <YesNoSpread question={question || `What guidance do the cards have for ${data.name}?`} onError={setError} />

      <div className="max-w-3xl mx-auto mt-12 text-center">
        <h3 className="font-heading text-sm text-foreground mb-3">Other Zodiac Readings</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(zodiacData).filter(([k]) => k !== signKey).map(([k, v]) => (
            <Link key={k} to={`/zodiac/${k}-tarot-reading`} className="text-xs text-muted-foreground hover:text-primary transition-colors">{v.symbol} {v.name}</Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ZodiacTarotReading;
