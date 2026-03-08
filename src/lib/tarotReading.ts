import type { DrawnCard } from "@/data/tarotDeck";
import { supabase } from "@/integrations/supabase/client";
import { generateRuleBasedReading } from "@/lib/tarotInterpretationEngine";

const READING_COUNT_KEY = "tarot_reading_count";
const READING_RESET_KEY = "tarot_reading_reset";
const MAX_READINGS = 3;
const COOLDOWN_MS = 20_000;
const COOLDOWN_KEY = "tarot_last_reading";

export function canDoReading(): { allowed: boolean; reason?: string } {
  const resetTime = localStorage.getItem(READING_RESET_KEY);
  const now = Date.now();
  if (!resetTime || now - parseInt(resetTime) > 24 * 60 * 60 * 1000) {
    localStorage.setItem(READING_COUNT_KEY, "0");
    localStorage.setItem(READING_RESET_KEY, now.toString());
  }

  const count = parseInt(localStorage.getItem(READING_COUNT_KEY) || "0");
  if (count >= MAX_READINGS) {
    return { allowed: false, reason: "You have reached the free reading limit. Please return later for another reading." };
  }

  const lastReading = localStorage.getItem(COOLDOWN_KEY);
  if (lastReading && now - parseInt(lastReading) < COOLDOWN_MS) {
    const remaining = Math.ceil((COOLDOWN_MS - (now - parseInt(lastReading))) / 1000);
    return { allowed: false, reason: `Please wait ${remaining} seconds before your next reading.` };
  }

  return { allowed: true };
}

export function recordReading() {
  const count = parseInt(localStorage.getItem(READING_COUNT_KEY) || "0");
  localStorage.setItem(READING_COUNT_KEY, (count + 1).toString());
  localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
}

export async function generateAIReading(question: string, cards: DrawnCard[]): Promise<string> {
  const cardData = cards
    .filter((dc) => dc.isRevealed)
    .map((dc) => ({
      name: dc.card.name,
      orientation: dc.isReversed ? "reversed" : "upright",
      position: dc.position || "Selected Card",
      meaning: dc.isReversed ? dc.card.meaning_rev : dc.card.meaning_up,
    }));

  try {
    const { data, error } = await supabase.functions.invoke("divination-reading", {
      body: { question, type: "tarot", cards: cardData },
    });

    if (error) {
      console.error("Edge function error:", error);
      return generateLocalReading(question, cards);
    }

    if (data?.error) {
      console.error("AI error:", data.error);
      return generateLocalReading(question, cards);
    }

    return data?.reading || generateLocalReading(question, cards);
  } catch (e) {
    console.error("Failed to get AI reading:", e);
    return generateLocalReading(question, cards);
  }
}

/** Rule-based local reading using the interpretation engine */
export function generateLocalReading(question: string, cards: DrawnCard[]): string {
  return generateRuleBasedReading(question, cards);
}
