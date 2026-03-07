import type { DrawnAngelCard } from "@/data/angelCards";
import { supabase } from "@/integrations/supabase/client";

export async function generateAngelReading(question: string, cards: DrawnAngelCard[]): Promise<string> {
  const cardData = cards
    .filter((dc) => dc.isRevealed)
    .map((dc) => ({
      name: dc.card.name,
      orientation: "upright",
      position: dc.position || "Your Message",
      meaning: dc.card.message,
      keywords: dc.card.keywords.join(", "),
    }));

  try {
    const { data, error } = await supabase.functions.invoke("divination-reading", {
      body: { question, type: "angel", cards: cardData },
    });

    if (error || data?.error) {
      console.error("Angel reading error:", error || data?.error);
      return generateLocalAngelReading(cards);
    }

    return data?.reading || generateLocalAngelReading(cards);
  } catch (e) {
    console.error("Failed to get angel reading:", e);
    return generateLocalAngelReading(cards);
  }
}

function generateLocalAngelReading(cards: DrawnAngelCard[]): string {
  const descriptions = cards
    .filter((dc) => dc.isRevealed)
    .map((dc) => `**${dc.card.name}**: ${dc.card.message}`)
    .join("\n\n");

  return `The angels have heard your call.\n\n${descriptions}\n\nTrust in this divine guidance and know that you are supported on your path.`;
}
