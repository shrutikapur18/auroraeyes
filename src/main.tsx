import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { precacheTarotImages } from "./lib/precacheCards";

createRoot(document.getElementById("root")!).render(<App />);

// Warm the image cache for offline use
precacheTarotImages();
