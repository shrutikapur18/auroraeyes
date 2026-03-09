import { useCallback, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, Share2, Check, Copy } from "lucide-react";
import { generateShareImage, downloadImage, type ShareImageData } from "@/lib/generateShareImage";
import { saveReading } from "@/lib/saveReading";
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

const SITE_DOMAIN = "tarotguidance.lovable.app";

/** Build a concise share caption: cards + link */
function buildCaption(
  drawnCards: DrawnCard[] | undefined,
  type: string,
  readingUrl: string
): string {
  if (!drawnCards) return `✨ Check out my reading\n${readingUrl}`;
  const revealed = drawnCards.filter(dc => dc.isRevealed);
  if (revealed.length === 0) return `✨ Check out my reading\n${readingUrl}`;

  const label = type === "rune" ? "rune" : type === "angel" ? "angel card" : "tarot";
  const names = revealed.map(dc => {
    const r = dc.isReversed ? " ↻" : "";
    return `${dc.card.name}${r}`;
  });

  return `🔮 My ${label} reading: ${names.join(" · ")}\n${readingUrl}`;
}

const ShareButtons = ({ text, url, cardData, drawnCards, question, reading, type = "tarot" }: ShareButtonsProps) => {
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [permanentUrl, setPermanentUrl] = useState<string | null>(null);

  /** Ensure we have a permanent URL, saving to DB if needed */
  const ensurePermanentUrl = useCallback(async (): Promise<string> => {
    if (permanentUrl) return permanentUrl;
    if (url) return url;

    if (!drawnCards || !question || !reading) {
      return `https://${SITE_DOMAIN}`;
    }

    const cards = drawnCards
      .filter(dc => dc.isRevealed)
      .map(dc => ({
        name: dc.card.name,
        reversed: dc.isReversed,
        position: dc.position || "",
        symbol: dc.card.symbol,
      }));

    const readingId = await saveReading({ type, question, cards, interpretation: reading });
    const newUrl = `https://${SITE_DOMAIN}/reading/${readingId}`;
    setPermanentUrl(newUrl);
    return newUrl;
  }, [permanentUrl, url, drawnCards, question, reading, type]);

  /** Share caption with permanent link */
  const getCaption = useCallback(async () => {
    const link = await ensurePermanentUrl();
    return buildCaption(drawnCards, type, link);
  }, [ensurePermanentUrl, drawnCards, type]);

  // ─── Social share handlers ───
  const handleSocialShare = useCallback(async (platform: string) => {
    setSaving(true);
    try {
      const caption = await getCaption();
      const link = permanentUrl || url || `https://${SITE_DOMAIN}`;
      const enc = encodeURIComponent(caption);
      const encUrl = encodeURIComponent(link);

      const urls: Record<string, string> = {
        twitter: `https://twitter.com/intent/tweet?text=${enc}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}&quote=${enc}`,
        whatsapp: `https://wa.me/?text=${enc}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encUrl}&description=${enc}`,
      };
      window.open(urls[platform], "_blank", "noopener,noreferrer");
    } catch {
      // Fallback: open with site URL
      const fallback = `https://${SITE_DOMAIN}`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🔮 Check out my reading\n${fallback}`)}`, "_blank");
    } finally {
      setSaving(false);
    }
  }, [getCaption, permanentUrl, url]);

  const handleCopyLink = useCallback(async () => {
    setSaving(true);
    try {
      const caption = await getCaption();
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      await navigator.clipboard.writeText(`https://${SITE_DOMAIN}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } finally {
      setSaving(false);
    }
  }, [getCaption]);

  const handleDownloadImage = useCallback(async () => {
    if (!cardData) return;
    setGenerating(true);
    try {
      const blob = await generateShareImage(cardData);
      downloadImage(blob, "reading-spread.png");
    } finally {
      setGenerating(false);
    }
  }, [cardData]);

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return;
    setSaving(true);
    try {
      const link = await ensurePermanentUrl();
      const caption = buildCaption(drawnCards, type, link);

      // Try sharing with image
      if (cardData && navigator.canShare) {
        const blob = await generateShareImage(cardData);
        const file = new File([blob], "reading.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ text: caption, files: [file] });
          return;
        }
      }
      await navigator.share({ text: caption, url: link });
    } catch {
      // User cancelled or error
    } finally {
      setSaving(false);
    }
  }, [cardData, drawnCards, type, ensurePermanentUrl]);

  const socialButtons = [
    { key: "twitter", label: "𝕏", color: "hover:bg-foreground/10" },
    { key: "facebook", label: "Facebook", color: "hover:bg-blue-500/10" },
    { key: "whatsapp", label: "WhatsApp", color: "hover:bg-green-500/10" },
    { key: "pinterest", label: "Pinterest", color: "hover:bg-red-500/10" },
  ];

  return (
    <div className="space-y-4 mt-6">
      <div className="text-center">
        <h3 className="font-heading text-sm gold-text tracking-wider mb-1">Share Your Reading</h3>
        <p className="text-[10px] text-muted-foreground">
          Share a snapshot of your reading with a clean link
        </p>
      </div>

      {/* Social + Copy */}
      <div className="flex flex-wrap justify-center gap-2">
        {socialButtons.map((s) => (
          <button
            key={s.key}
            onClick={() => handleSocialShare(s.key)}
            disabled={saving}
            className={`px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground transition-all cursor-pointer disabled:opacity-50 ${s.color}`}
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={handleCopyLink}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground hover:bg-primary/10 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : copied ? (
            <Check className="w-3 h-3 text-primary" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {saving ? "Saving…" : copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Download image + Native share */}
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
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/25 text-xs font-heading tracking-wider text-primary hover:bg-primary/20 transition-all disabled:opacity-50"
            whileTap={{ scale: 0.97 }}
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Share2 className="w-3 h-3" />}
            Share with Image
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ShareButtons;
