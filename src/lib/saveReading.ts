import { supabase } from "@/integrations/supabase/client";

interface SaveReadingParams {
  type: "tarot" | "rune" | "angel";
  question: string;
  cards: { name: string; reversed: boolean; position: string; symbol: string }[];
  interpretation: string;
}

/**
 * Saves a reading to the database and returns its unique ID for sharing.
 */
export async function saveReading(params: SaveReadingParams): Promise<string> {
  const { data, error } = await supabase
    .from("shared_readings")
    .insert({
      reading_type: params.type,
      question: params.question,
      cards: params.cards as any,
      interpretation: params.interpretation,
    })
    .select("id")
    .single();

  if (error) throw new Error("Failed to save reading");
  return data.id;
}
