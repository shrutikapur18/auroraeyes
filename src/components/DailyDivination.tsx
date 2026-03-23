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
import tarotCardImage from "@/assets/tarot-card-back.jpg";
import angelCardImage from "@/assets/angel-card-back.jpg";
import runeCardImage from "@/assets/rune-card-back.jpg";

type DailyType = "tarot" | "angel" | "rune";

const dailyOptions: { type: DailyType; label: string; subtitle: string; image: string }[] = [
  { type: "tarot", label: "Daily Tarot", subtitle: "A card for today", image: tarotCardImage },
  { type: "angel", label: "Daily Angel", subtitle: "Today's message", image: angelCardImage },
  { type: "rune", label: "Daily Rune", subtitle: "Wisdom for today", image: runeCardImage },
];

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

  return (
    <motion.div
      className="relative z-10 mt-14 mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <div className="text-center mb-8">
        <h2 className="font-heading text-lg md:text-xl gold-text mb-2">Daily Divination</h2>
        <p className="text-xs text-muted-foreground/60 italic">Draw one card or rune for today's guidance</p>
      </div>

      {!type ? (
        <div className="flex justify-center gap-5 md:gap-6 px-4">
          {dailyOptions.map((opt, i) => (
            <motion.button
              key={opt.type}
              onClick={() => drawDaily(opt.type)}
              className="relative group focus:outline-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ scale: 1.06, y: -8 }}
              whileTap={{ scale: 0.96 }}
              style={{ width: "clamp(80px, 18vw, 110px)" }}
            >
              <div
                className="relative aspect-[2/3] w-full overflow-hidden rounded-lg transition-all duration-500 shadow-[0_6px_24px_rgba(0,0,0,0.5)] group-hover:shadow-[0_8px_30px_hsl(43_70%_55%/0.2)]"
                style={{
                  border: "1px solid hsl(43 70% 55% / 0.12)",
                  transform: `rotate(${i === 1 ? 0 : i === 0 ? -3 : 3}deg)`,
                }}
              >
                <img
                  src={opt.image}
                  alt={opt.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 20px hsl(43 70% 55% / 0.1)" }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <span className="block font-heading text-[9px] md:text-[10px] text-white/80 group-hover:text-primary tracking-wider text-center transition-colors duration-300 drop-shadow-lg">
                    {opt.label}
                  </span>
                  <span className="block text-[7px] md:text-[8px] text-white/35 mt-0.5 text-center italic">
                    {opt.subtitle}
                  </span>
                </div>
              </div>
            </motion.button>
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
              <div className="w-5 h-5 border border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-xs text-muted-foreground font-heading tracking-wider">Reading the stars...</span>
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
