import type { DrawnCard } from "@/data/tarotDeck";
import { supabase } from "@/integrations/supabase/client";
import { generateRuleBasedReading } from "@/lib/tarotInterpretationEngine";
import { getCachedReading, setCachedReading } from "@/lib/readingCache";

/**
 * Generate a free reading using the local rule-based engine.
 * No limits, no API calls — always available.
 */
export function generateLocalReading(question: string, cards: DrawnCard[]): string {
  return generateRuleBasedReading(question, cards);
}

/**
 * Generate a premium AI-powered reading via the edge function.
 * Returns the AI text on success, or throws on failure so the caller can show an error.
 */
export async function generateAIReading(question: string, cards: DrawnCard[], spreadType?: string): Promise<string> {
  const cached = getCachedReading(cards, spreadType);
  if (cached) {
    console.log("[ReadingCache] Cache hit — returning stored AI reading");
    return cached;
  }

  const cardData = cards
    .filter((dc) => dc.isRevealed)
    .map((dc) => ({
      name: dc.card.name,
      orientation: dc.isReversed ? "reversed" : "upright",
      position: dc.position || "Selected Card",
      meaning: dc.isReversed ? dc.card.meaning_rev : dc.card.meaning_up,
    }));

  const { data, error } = await supabase.functions.invoke("divination-reading", {
    body: { question, type: "tarot", cards: cardData },
  });

  if (error) {
    console.error("Edge function error:", error);
    throw new Error("AI interpretations are temporarily unavailable. Please try again later.");
  }

  if (data?.error) {
    console.error("AI error:", data.error);
    throw new Error("AI interpretations are temporarily unavailable. Please try again later.");
  }

  const reading = data?.reading;
  if (!reading) {
    throw new Error("AI interpretations are temporarily unavailable. Please try again later.");
  }

  setCachedReading(cards, reading, "ai", spreadType);
  return reading;
}
