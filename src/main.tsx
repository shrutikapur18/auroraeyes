import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { precacheTarotImages } from "./lib/precacheCards";

createRoot(document.getElementById("root")!).render(<App />);

// Signal to the prerenderer that the app is ready to be captured.
// We use BOTH a sentinel attribute on <html> (race-free, picked up by
// `renderAfterElementExists`) AND a repeated event dispatch as a fallback.
// SEOHead's useEffect runs synchronously after mount, so by the next animation
// frame the document head has <title>, meta, OG, Twitter, canonical, JSON-LD.
if (typeof window !== "undefined") {
  const markReady = () => {
    document.documentElement.setAttribute("data-prerender-ready", "true");
    document.dispatchEvent(new Event("render-event"));
  };
  // Fire on next frame, then again 200ms later in case any effect was deferred.
  requestAnimationFrame(() => {
    markReady();
    setTimeout(markReady, 200);
  });
}

// Warm the image cache for offline use
precacheTarotImages();
