import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDeferredPrompt(null);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-card/90 backdrop-blur-xl px-4 py-3 shadow-lg shadow-primary/5">
        <Download className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm text-foreground/90 font-heading tracking-wide flex-1">
          Install <span className="text-primary">Aurora Eyes</span>
        </p>
        <button
          onClick={handleInstall}
          className="shrink-0 rounded-lg bg-primary/15 border border-primary/30 px-3 py-1.5 text-xs font-heading text-primary hover:bg-primary/25 transition-colors"
        >
          Install
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
