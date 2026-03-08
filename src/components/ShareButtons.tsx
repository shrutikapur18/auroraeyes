import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { generateShareImage, downloadImage, type ShareImageData } from "@/lib/generateShareImage";

interface ShareButtonsProps {
  text: string;
  url?: string;
  cardData?: ShareImageData;
}

const ShareButtons = ({ text, url = window.location.href, cardData }: ShareButtonsProps) => {
  const [generating, setGenerating] = useState(false);
  const encoded = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    { label: "𝕏", href: `https://twitter.com/intent/tweet?text=${encoded}&url=${encodedUrl}`, color: "hover:bg-foreground/10" },
    { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encoded}`, color: "hover:bg-red-500/10" },
    { label: "WhatsApp", href: `https://wa.me/?text=${encoded}%20${encodedUrl}`, color: "hover:bg-green-500/10" },
    { label: "Instagram", href: "#", color: "hover:bg-purple-500/10", isInstagram: true },
  ];

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(`${text}\n${url}`);
  }, [text, url]);

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

  const handleInstagram = useCallback(async () => {
    // Instagram doesn't have a direct share URL — download the image for the user
    if (cardData) {
      await handleDownloadImage();
    }
  }, [cardData, handleDownloadImage]);

  const handleShareWithImage = useCallback(async () => {
    if (!cardData || !navigator.canShare) {
      // Fallback to text share
      if (navigator.share) {
        await navigator.share({ title: "My Mystic Reading", text, url });
      }
      return;
    }

    try {
      const blob = await generateShareImage(cardData);
      const file = new File([blob], "reading.png", { type: "image/png" });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Mystic Reading",
          text,
          files: [file],
        });
      } else {
        await navigator.share({ title: "My Mystic Reading", text, url });
      }
    } catch {
      // User cancelled
    }
  }, [cardData, text, url]);

  return (
    <div className="space-y-3 mt-4">
      {/* Share buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.isInstagram ? undefined : l.href}
            onClick={l.isInstagram ? handleInstagram : undefined}
            target={l.isInstagram ? undefined : "_blank"}
            rel={l.isInstagram ? undefined : "noopener noreferrer"}
            className={`px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground transition-all cursor-pointer ${l.color}`}
          >
            {l.label}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground hover:bg-primary/10 transition-all"
        >
          Copy Link
        </button>
      </div>

      {/* Download / Native share with image */}
      {cardData && (
        <div className="flex justify-center gap-2">
          <motion.button
            onClick={handleDownloadImage}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/25 text-xs font-heading tracking-wider text-primary hover:bg-primary/20 transition-all disabled:opacity-50"
            whileTap={{ scale: 0.97 }}
          >
            {generating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
            Download Image
          </motion.button>

          {typeof navigator !== "undefined" && navigator.share && (
            <motion.button
              onClick={handleShareWithImage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/25 text-xs font-heading tracking-wider text-primary hover:bg-primary/20 transition-all"
              whileTap={{ scale: 0.97 }}
            >
              ✦ Share with Image
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
