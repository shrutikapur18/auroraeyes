import type { DrawnRune } from "@/data/runes";
import { supabase } from "@/integrations/supabase/client";

export async function generateRuneReading(question: string, runes: DrawnRune[]): Promise<string> {
  const runeData = runes
    .filter((dr) => dr.isRevealed)
    .map((dr) => ({
      name: dr.rune.name,
      symbol: dr.rune.symbol,
      orientation: dr.isReversed ? "reversed" : "upright",
      position: dr.position || "Drawn Rune",
      meaning: dr.isReversed ? dr.rune.reversed_meaning : dr.rune.meaning,
      keywords: dr.rune.keywords.join(", "),
    }));

  try {
    const { data, error } = await supabase.functions.invoke("divination-reading", {
      body: { question, type: "rune", runes: runeData },
    });

    if (error || data?.error) {
      console.error("Rune reading error:", error || data?.error);
      return generateLocalRuneReading(runes);
    }

    return data?.reading || generateLocalRuneReading(runes);
  } catch (e) {
    console.error("Failed to get rune reading:", e);
    return generateLocalRuneReading(runes);
  }
}

function generateLocalRuneReading(runes: DrawnRune[]): string {
  const descriptions = runes
    .filter((dr) => dr.isRevealed)
    .map((dr) => {
      const meaning = dr.isReversed ? dr.rune.reversed_meaning : dr.rune.meaning;
      return `**${dr.rune.name} (${dr.rune.symbol})** — ${dr.isReversed ? "Reversed" : "Upright"}: ${meaning}`;
    })
    .join("\n\n");

  return `The runes have been cast and their wisdom revealed.\n\n${descriptions}\n\nMeditate on these ancient symbols and let their guidance illuminate your path forward.`;
}
