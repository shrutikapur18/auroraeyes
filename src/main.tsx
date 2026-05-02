import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { precacheTarotImages } from "./lib/precacheCards";

createRoot(document.getElementById("root")!).render(<App />);

// Signal to the prerenderer that the app is ready to be captured.
// Fires after the browser has had a chance to mount components and run effects
// (so SEOHead has injected <title>, meta, and JSON-LD into the document head).
if (typeof window !== "undefined") {
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.dispatchEvent(new Event("render-event"));
    }, 50);
  });
}

// Warm the image cache for offline use
precacheTarotImages();
