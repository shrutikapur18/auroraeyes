import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { drawCards } from "@/data/tarotDeck";
import { drawRunes } from "@/data/runes";
import { drawAngelCards } from "@/data/angelCards";
import TarotCardComponent from "@/components/TarotCardComponent";
import RuneComponent from "@/components/RuneComponent";
import AngelCardComponent from "@/components/AngelCardComponent";
import { generateAIReading } from "@/lib/tarotReading";
import { generateRuneReading } from "@/lib/runeReading";
import { generateAngelReading } from "@/lib/angelReading";
import type { DrawnCard } from "@/data/tarotDeck";
import type { DrawnRune } from "@/data/runes";
import type { DrawnAngelCard } from "@/data/angelCards";

const pageConfig: Record<string, { title: string; description: string; type: "tarot" | "rune" | "angel" }> = {
  "/daily-tarot-card": { title: "Daily Tarot Card", description: "Draw your daily tarot card for today's guidance. A new card every day to illuminate your path.", type: "tarot" },
  "/daily-rune": { title: "Daily Rune", description: "Cast your daily rune for ancient Norse guidance. Discover what wisdom the runes hold for you today.", type: "rune" },
  "/daily-angel-message": { title: "Daily Angel Message", description: "Receive your daily angel message. Let divine guidance and comfort light your way today.", type: "angel" },
};

const DailyPage = () => {
  const location = useLocation();
  const config = pageConfig[location.pathname] || pageConfig["/daily-tarot-card"];

  const [tarotCard, setTarotCard] = useState<DrawnCard | null>(null);
  const [runeCard, setRuneCard] = useState<DrawnRune | null>(null);
  const [angelCard, setAngelCard] = useState<DrawnAngelCard | null>(null);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawn, setDrawn] = useState(false);

  const handleDraw = () => {
    setDrawn(true);
    if (config.type === "tarot") {
      const cards = drawCards(1);
      setTarotCard({ ...cards[0], position: "Daily Guidance", isRevealed: false });
    } else if (config.type === "rune") {
      const runes = drawRunes(1);
      setRuneCard({ ...runes[0], position: "Daily Rune", isRevealed: false });
    } else {
      const cards = drawAngelCards(1);
      setAngelCard({ ...cards[0], position: "Daily Angel", isRevealed: false });
    }
  };

  const revealTarot = async () => {
    if (!tarotCard) return;
    const revealed = { ...tarotCard, isRevealed: true };
    setTarotCard(revealed); setLoading(true);
    const text = await generateAIReading("What does today hold for me?", [revealed]);
    setReading(text); setLoading(false);
  };
  const revealRune = async () => {
    if (!runeCard) return;
    const revealed = { ...runeCard, isRevealed: true };
    setRuneCard(revealed); setLoading(true);
    const text = await generateRuneReading("What wisdom do the runes offer today?", [revealed]);
    setReading(text); setLoading(false);
  };
  const revealAngel = async () => {
    if (!angelCard) return;
    const revealed = { ...angelCard, isRevealed: true };
    setAngelCard(revealed); setLoading(true);
    const text = await generateAngelReading("What message do the angels have for me today?", [revealed]);
    setReading(text); setLoading(false);
  };

  return (
    <>
      <SEOHead title={config.title} description={config.description} canonicalPath={location.pathname} />
      <motion.header className="text-center pt-8 pb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">{config.title}</h1>
        <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">{config.description}</p>
        <p className="text-xs text-muted-foreground mt-2">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
      </motion.header>

      <div className="flex flex-col items-center gap-6">
        {!drawn && (
          <motion.button onClick={handleDraw} className="px-8 py-4 rounded-xl bg-primary/20 border-2 border-primary text-primary font-heading text-lg tracking-widest hover:bg-primary/30 transition-all gold-glow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Draw Today's {config.type === "tarot" ? "Card" : config.type === "rune" ? "Rune" : "Message"}
          </motion.button>
        )}
        {config.type === "tarot" && tarotCard && <TarotCardComponent drawnCard={tarotCard} index={0} onReveal={revealTarot} label="Today" />}
        {config.type === "rune" && runeCard && <RuneComponent drawnRune={runeCard} index={0} onReveal={revealRune} label="Today" />}
        {config.type === "angel" && angelCard && <AngelCardComponent drawnCard={angelCard} index={0} onReveal={revealAngel} label="Today" />}
        {loading && (<div className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /><span className="text-xs text-muted-foreground">Reading…</span></div>)}
        {reading && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="reading-panel rounded-xl p-6 max-w-lg text-sm text-foreground font-body leading-relaxed whitespace-pre-line">{reading}</motion.div>)}
      </div>

      <div className="max-w-3xl mx-auto mt-12 text-center space-y-2">
        <p className="text-xs text-muted-foreground">More daily guidance:</p>
        <div className="flex justify-center gap-4">
          <Link to="/daily-tarot-card" className="text-xs text-primary hover:underline">Daily Tarot</Link>
          <Link to="/daily-rune" className="text-xs text-primary hover:underline">Daily Rune</Link>
          <Link to="/daily-angel-message" className="text-xs text-primary hover:underline">Daily Angel</Link>
        </div>
      </div>
    </>
  );
};

export default DailyPage;
