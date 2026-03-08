import { useCallback } from "react";

interface ShareButtonsProps {
  text: string;
  url?: string;
}

const ShareButtons = ({ text, url = window.location.href }: ShareButtonsProps) => {
  const encoded = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    { label: "𝕏", href: `https://twitter.com/intent/tweet?text=${encoded}&url=${encodedUrl}`, color: "hover:bg-foreground/10" },
    { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encoded}`, color: "hover:bg-red-500/10" },
    { label: "WhatsApp", href: `https://wa.me/?text=${encoded}%20${encodedUrl}`, color: "hover:bg-green-500/10" },
  ];

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(`${text}\n${url}`);
  }, [text, url]);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-4 py-2 rounded-lg bg-muted/50 border border-border/30 text-xs font-heading tracking-wider text-muted-foreground transition-all ${l.color}`}
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
  );
};

export default ShareButtons;
