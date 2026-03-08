import { useCallback, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, Share2, Check } from "lucide-react";
import { generateShareImage, downloadImage, type ShareImageData } from "@/lib/generateShareImage";
import { encodeReading, generateShareMessage, generateTeaser, type SharedReading } from "@/lib/shareReading";
import type { DrawnCard } from "@/data/tarotDeck";

interface ShareButtonsProps {
  text: string;
  url?: string;
  cardData?: ShareImageData;
  drawnCards?: DrawnCard[];
  question?: string;
  reading?: string;
  type?: "tarot" | "rune" | "angel";
}

const ShareButtons = ({ text, url, cardData, drawnCards, question, reading, type = "tarot" }: ShareButtonsProps) => {
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Build the shareable URL with encoded reading data
  const shareUrl = useMemo(() => {
    if (url) return url;
    if (!drawnCards || !question) return window.location.href;

    const cards = drawnCards
      .filter(dc => dc.isRevealed)
      .map(dc => ({
        name: dc.card.name,
        reversed: dc.isReversed,
        position: dc.position || "",
        symbol: dc.card.symbol,
      }));

    if (cards.length === 0) return window.location.href;

    const teaser = generateTeaser(reading || "", cards);
    const data: SharedReading = { question, cards, teaser, type };
    const encoded = encodeReading(data);

    if (!encoded) return window.location.href;
    const base = window.location.origin;
    return `${base}/shared-reading?r=${encoded}`;
  }, [url, drawnCards, question, reading, type]);

  // Generate a viral share message
  const viralMessage = useMemo(() => {
    if (!drawnCards) return text;
    const cards = drawnCards
      .filter(dc => dc.isRevealed)
      .map(dc => ({ name: dc.card.name, reversed: dc.isReversed }));
    return generateShareMessage(cards, type);
  }, [drawnCards, text, type]);

  const encoded = encodeURIComponent(viralMessage);
  const encodedUrl = encodeURIComponent(shareUrl);

  const links = [
    { label: "𝕏", href: `https://twitter.com/intent/tweet?text=${encoded}&url=${encodedUrl}`, color: "hover:bg-foreground/10" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encoded}`, color: "hover:bg-blue-500/10" },
    { label: "WhatsApp", href: `https://wa.me/?text=${encoded}%20${encodedUrl}`, color: "hover:bg-green-500/10" },
    { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encoded}`, color: "hover:bg-red-500/10" },
  ];

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(`${viralMessage}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [viralMessage, shareUrl]);

  const handleDownloadImage = useCallback(async () => {
    if (!cardData) return;
    setGenerating(true);
    try {
      const blob = await generateShareImage(cardData);
      downloadImage(blob, `reading-${cardData.cardName.toLowerCase().replace(/\s+/g, "-")}.png`);
    } finally {
      setGenerating(false);
    }
  }, [cardData]);

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return;

    try {
      if (cardData && navigator.canShare) {
        const blob = await generateShareImage(cardData);
        const file = new File([blob], "reading.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ title: "My Mystic Reading", text: viralMessage, files: [file] });
          return;
        }
      }
      await navigator.share({ title: "My Mystic Reading", text: viralMessage, url: shareUrl });
    } catch {
      // User cancelled
    }
  }, [cardData, viralMessage, shareUrl]);

  return (
    <div className="space-y-4 mt-6">
      {/* Share heading */}
      <div className="text-center">
        <h3 className="font-heading text-sm gold-text tracking-wider mb-1">Share Your Reading</h3>
        <p className="text-[10px] text-muted-foreground">Invite friends to discover their own cards</p>
      </div>

      {/* Social buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground transition-all cursor-pointer ${l.color}`}
          >
            {l.label}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground hover:bg-primary/10 transition-all"
        >
          {copied ? <Check className="w-3 h-3 text-primary" /> : null}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      {/* Download / Native share */}
      <div className="flex justify-center gap-2">
        {cardData && (
          <motion.button
            onClick={handleDownloadImage}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/25 text-xs font-heading tracking-wider text-primary hover:bg-primary/20 transition-all disabled:opacity-50"
            whileTap={{ scale: 0.97 }}
          >
            {generating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
            Download Image
          </motion.button>
        )}

        {typeof navigator !== "undefined" && navigator.share && (
          <motion.button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/25 text-xs font-heading tracking-wider text-primary hover:bg-primary/20 transition-all"
            whileTap={{ scale: 0.97 }}
          >
            <Share2 className="w-3 h-3" />
            Share
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ShareButtons;
