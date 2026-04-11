import { supabase } from "@/integrations/supabase/client";

interface SaveReadingParams {
  type: "tarot" | "rune" | "angel";
  question: string;
  cards: { name: string; reversed: boolean; position: string; symbol: string }[];
  interpretation: string;
}

const VALID_TYPES = ["tarot", "rune", "angel"] as const;

/**
 * Saves a reading to the database and returns its unique ID for sharing.
 */
export async function saveReading(params: SaveReadingParams): Promise<string> {
  // Client-side validation
  if (!VALID_TYPES.includes(params.type)) {
    throw new Error("Invalid reading type");
  }

  const question = (params.question || "").slice(0, 500);
  const interpretation = (params.interpretation || "").slice(0, 10000);
  const cards = (params.cards || []).slice(0, 20).map(c => ({
    name: String(c.name || "").slice(0, 100),
    reversed: Boolean(c.reversed),
    position: String(c.position || "").slice(0, 100),
    symbol: String(c.symbol || "").slice(0, 10),
  }));

  const { data, error } = await supabase
    .from("shared_readings")
    .insert({
      reading_type: params.type,
      question,
      cards: cards as any,
      interpretation,
    })
    .select("id")
    .single();

  if (error) throw new Error("Failed to save reading");
  return data.id;
}
