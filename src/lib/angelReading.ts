import type { DrawnAngelCard } from "@/data/angelCards";
import { supabase } from "@/integrations/supabase/client";

/** Free local reading — always available */
export function generateLocalAngelReading(cards: DrawnAngelCard[]): string {
  const descriptions = cards
    .filter((dc) => dc.isRevealed)
    .map((dc) => `**${dc.card.name}**: ${dc.card.message}`)
    .join("\n\n");

  return `The angels have heard your call.\n\n${descriptions}\n\nTrust in this divine guidance and know that you are supported on your path.`;
}

/** Default reading — uses local engine */
export function generateAngelReading(_question: string, cards: DrawnAngelCard[]): string {
  return generateLocalAngelReading(cards);
}

/** Premium AI reading — calls the edge function */
export async function generateAIAngelReading(question: string, cards: DrawnAngelCard[]): Promise<string> {
  const cardData = cards
    .filter((dc) => dc.isRevealed)
    .map((dc) => ({
      name: dc.card.name,
      orientation: "upright",
      position: dc.position || "Your Message",
      meaning: dc.card.message,
      keywords: dc.card.keywords.join(", "),
    }));

  const { data, error } = await supabase.functions.invoke("divination-reading", {
    body: { question, type: "angel", cards: cardData },
  });

  if (error || data?.error) {
    console.error("Angel AI reading error:", error || data?.error);
    throw new Error("AI interpretations are temporarily unavailable. Please try again later.");
  }

  if (!data?.reading) {
    throw new Error("AI interpretations are temporarily unavailable. Please try again later.");
  }

  return data.reading;
}
