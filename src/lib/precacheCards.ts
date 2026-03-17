import { tarotDeck } from "@/data/tarotDeck";

/**
 * Preloads all tarot card images into the browser cache.
 * Called once on app init so cards are available offline.
 */
export function precacheTarotImages() {
  if (typeof window === "undefined") return;

  // Use requestIdleCallback to avoid blocking the main thread
  const schedule = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 2000));

  schedule(() => {
    tarotDeck.forEach((card) => {
      if (card.image) {
        const img = new Image();
        img.src = card.image;
      }
    });
  });
}
