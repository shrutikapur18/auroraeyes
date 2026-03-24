import { useState } from "react";
import { motion } from "framer-motion";
import { drawCards } from "@/data/tarotDeck";
import { drawAngelCards, type DrawnAngelCard } from "@/data/angelCards";
import { drawRunes, type DrawnRune } from "@/data/runes";
import type { DrawnCard } from "@/data/tarotDeck";
import TarotCardComponent from "./TarotCardComponent";
import AngelCardComponent from "./AngelCardComponent";
import RuneComponent from "./RuneComponent";
import { generateAIReading } from "@/lib/tarotReading";
import { generateAngelReading } from "@/lib/angelReading";
import { generateRuneReading } from "@/lib/runeReading";
import { TarotCardIcon, AngelWingsIcon, RuneStoneIcon } from "./MysticalIcons";

type DailyType = "tarot" | "angel" | "rune";

const DailyDivination = () => {
  const [type, setType] = useState<DailyType | null>(null);
  const [tarotCard, setTarotCard] = useState<DrawnCard | null>(null);
  const [angelCard, setAngelCard] = useState<DrawnAngelCard | null>(null);
  const [runeCard, setRuneCard] = useState<DrawnRune | null>(null);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);

  const drawDaily = (t: DailyType) => {
    setType(t);
    setReading("");
    if (t === "tarot") {
      const cards = drawCards(1);
      setTarotCard({ ...cards[0], position: "Daily Guidance", isRevealed: false });
    } else if (t === "angel") {
      const cards = drawAngelCards(1);
      setAngelCard({ ...cards[0], position: "Daily Angel Message", isRevealed: false });
    } else {
      const runes = drawRunes(1);
      setRuneCard({ ...runes[0], position: "Daily Rune", isRevealed: false });
    }
  };

  const revealTarot = async () => {
    if (!tarotCard) return;
    const revealed = { ...tarotCard, isRevealed: true };
    setTarotCard(revealed);
    setLoading(true);
    const result = await generateAIReading("What does today hold for me?", [revealed]);
    setReading(result.reading);
    setLoading(false);
  };

  const revealAngel = async () => {
    if (!angelCard) return;
    const revealed = { ...angelCard, isRevealed: true };
    setAngelCard(revealed);
    setLoading(true);
    const text = await generateAngelReading("What message do the angels have for me today?", [revealed]);
    setReading(text);
    setLoading(false);
  };

  const revealRune = async () => {
    if (!runeCard) return;
    const revealed = { ...runeCard, isRevealed: true };
    setRuneCard(revealed);
    setLoading(true);
    const text = await generateRuneReading("What wisdom do the runes offer me today?", [revealed]);
    setReading(text);
    setLoading(false);
  };

  const dailyOptions: { type: DailyType; icon: React.ReactNode; label: string }[] = [
    {
      type: "tarot",
      icon: <TarotCardIcon className="w-8 h-8 text-primary" animated={false} />,
      label: "Daily Tarot",
    },
    {
      type: "angel",
      icon: <AngelWingsIcon className="w-8 h-8 text-primary" animated={false} />,
      label: "Daily Angel",
    },
    {
      type: "rune",
      icon: <RuneStoneIcon className="w-8 h-8 text-primary" animated={false} />,
      label: "Daily Rune",
    },
  ];

  return (
    <motion.div
      className="relative z-10 mt-12 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <div className="text-center mb-4">
        <h2 className="font-heading text-xl gold-text mb-1">Daily Divination</h2>
        <p className="text-xs text-muted-foreground">Draw one card or rune for today's guidance</p>
      </div>

      {!type ? (
        <div className="flex justify-center gap-3 flex-wrap">
          {dailyOptions.map((opt) => (
            <button
              key={opt.type}
              onClick={() => drawDaily(opt.type)}
              className="px-5 py-3 rounded-lg bg-secondary border border-primary/30 text-primary font-heading text-sm tracking-wider hover:bg-primary/20 transition-all gold-glow-hover flex flex-col items-center gap-1.5"
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {type === "tarot" && tarotCard && (
            <TarotCardComponent drawnCard={tarotCard} index={0} onReveal={revealTarot} label="Today's Card" />
          )}
          {type === "angel" && angelCard && (
            <AngelCardComponent drawnCard={angelCard} index={0} onReveal={revealAngel} label="Today's Angel" />
          )}
          {type === "rune" && runeCard && (
            <RuneComponent drawnRune={runeCard} index={0} onReveal={revealRune} label="Today's Rune" />
          )}

          {loading && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-xs text-muted-foreground">Reading the stars...</span>
            </div>
          )}
          {reading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="reading-panel rounded-xl p-5 max-w-md text-sm text-foreground font-body leading-relaxed whitespace-pre-line"
            >
              {reading}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default DailyDivination;
