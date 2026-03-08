import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RefreshCw, Share2, Copy, Check } from "lucide-react";
import type { HoraryReading } from "@/lib/horaryAstrology";

interface HoraryPostReadingCTAProps {
  reading: HoraryReading;
  onAskAnother: () => void;
}

const HoraryPostReadingCTA = ({ reading, onAskAnother }: HoraryPostReadingCTAProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    const params = new URLSearchParams({
      q: reading.question,
      t: reading.timestamp,
    });
    return `${window.location.origin}/horary-reading?${params.toString()}`;
  }, [reading]);

  const handleCopy = useCallback(async () => {
    const text = `✦ My Horary Astrology Reading ✦\n\n"${reading.question}"\n\nAscendant: ${reading.chartData.ascendantSign}\nMoon: ${reading.chartData.moonSign} (${reading.chartData.moonPhase})\n\n${shareUrl}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [reading, shareUrl]);

  const shareText = encodeURIComponent(
    `✦ I just asked the stars: "${reading.question}" — Horary Astrology Reading`
  );
  const shareUrlEncoded = encodeURIComponent(shareUrl);

  const explorations = [
    { to: "/free-tarot-reading", label: "Try a Tarot Reading", icon: "🃏" },
    { to: "/rune-reading", label: "Try Rune Casting", icon: "ᚱ" },
    { to: "/angel-card-reading", label: "Angel Card Guidance", icon: "👼" },
    { to: "/yes-no-tarot-reading", label: "Yes/No Tarot", icon: "⚖️" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-6 max-w-xl mx-auto"
    >
      {/* Share section */}
      <div className="bg-card/30 border border-border/20 rounded-xl p-5 text-center space-y-3">
        <h3 className="font-heading text-sm text-primary tracking-wider">Share This Reading</h3>
        <div className="flex flex-wrap justify-center gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrlEncoded}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground hover:bg-foreground/10 transition-all"
          >
            𝕏
          </a>
          <a
            href={`https://wa.me/?text=${shareText}%20${shareUrlEncoded}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground hover:bg-green-500/10 transition-all"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}&quote=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground hover:bg-blue-500/10 transition-all"
          >
            Facebook
          </a>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground hover:bg-primary/10 transition-all"
          >
            {copied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* Ask another */}
      <div className="text-center">
        <motion.button
          onClick={onAskAnother}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/20 border border-primary/40 text-primary font-heading text-sm tracking-wider hover:bg-primary/30 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <RefreshCw className="w-4 h-4" />
          Ask Another Horary Question
        </motion.button>
      </div>

      {/* Explore other divination */}
      <div className="space-y-3">
        <p className="text-center text-xs text-muted-foreground font-heading tracking-wider">
          EXPLORE MORE DIVINATION
        </p>
        <div className="grid grid-cols-2 gap-2">
          {explorations.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="reading-panel rounded-lg p-3 text-center hover:gold-glow transition-all group active:scale-[0.97]"
            >
              <span className="text-lg block mb-1">{item.icon}</span>
              <span className="text-[10px] font-heading text-foreground group-hover:text-primary transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HoraryPostReadingCTA;
