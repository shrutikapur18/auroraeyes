import type { DrawnRune } from "@/data/runes";
import { supabase } from "@/integrations/supabase/client";
import { detectEmotionalTone, detectQuestionContext, type EmotionalTone } from "@/lib/tarotInterpretationEngine";

// ─── Tone-Aware Templates ───

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const OPENINGS: Record<EmotionalTone, string[]> = {
  anxious: [
    "The runes sense the storm within you and offer their ancient steadiness as an anchor.",
    "In times of worry, the runes speak not to frighten but to steady — listen with a calm heart.",
  ],
  confused: [
    "When the way is unclear, the runes cut through fog with the sharpness of ancestral wisdom.",
    "Confusion is not weakness — it is the threshold before understanding. The runes light the way.",
  ],
  hopeful: [
    "The runes feel the warmth of your hope and respond with symbols of encouragement and power.",
    "Hope is a force the ancient Norse honored deeply — the runes affirm yours today.",
  ],
  optimistic: [
    "Your bold energy resonates with the warrior spirit of the runes. They respond with vigor.",
    "The runes celebrate your confidence and amplify it with symbols of strength and progress.",
  ],
  curious: [
    "The runes reward the seeker's mind. Your curiosity has called forth powerful symbols.",
    "With an open spirit, you approach the runes — and they answer with depth and honesty.",
  ],
  neutral: [
    "The runes have been cast and their ancient wisdom revealed.",
    "The stones have spoken — their symbols carry messages forged in the deep wells of time.",
  ],
};

const RUNE_NARRATIVES: Record<string, string[]> = {
  Past: [
    "In the position of the past, **{name} ({symbol})** ({orientation}) reveals: {meaning} This foundation still echoes in your present experience.",
    "Looking backward, **{name} ({symbol})** ({orientation}) speaks of what has shaped you: {meaning}",
  ],
  Present: [
    "At the center of now, **{name} ({symbol})** ({orientation}) defines the current energy: {meaning}",
    "The present rune, **{name} ({symbol})** ({orientation}), reflects your living reality: {meaning} Sit with this truth.",
  ],
  Future: [
    "Looking toward what is forming, **{name} ({symbol})** ({orientation}) points the way: {meaning}",
    "The future rune, **{name} ({symbol})** ({orientation}), suggests where the current flows: {meaning} This is the trajectory, not a fixed fate.",
  ],
  default: [
    "**{name} ({symbol})** ({orientation}) speaks: {meaning}",
    "The rune **{name} ({symbol})** ({orientation}) carries this message: {meaning}",
  ],
};

const KEYWORD_BRIDGES: string[] = [
  "The energies of {keywords} radiate from this rune, asking you to consider where they appear in your life.",
  "Meditate on {keywords} — these are the doorways this rune opens for you.",
  "The themes of {keywords} are woven into this rune's ancient meaning.",
];

const CLOSINGS: Record<EmotionalTone, string[]> = {
  anxious: [
    "The runes do not promise ease, but they promise that you have the strength to endure. You have survived every storm before this one.",
    "Take comfort in the runes' steadiness — they have held these truths for millennia. You are not facing this alone.",
  ],
  confused: [
    "The runes ask you to sit with uncertainty a little longer — clarity is forming just beyond the edge of your awareness.",
    "Not all is meant to be understood at once. The runes plant seeds of insight that blossom in their own time.",
  ],
  hopeful: [
    "The runes honor your hope and add the weight of ancient wisdom behind it. Walk forward with both.",
    "Your hope is not naive — the runes confirm it is rooted in something real. Trust what you feel.",
  ],
  optimistic: [
    "Channel this powerful energy wisely. The runes affirm your strength and encourage bold, thoughtful action.",
    "The old Norse valued both courage and wisdom — the runes encourage you to wield both as you move forward.",
  ],
  curious: [
    "Continue to explore — the runes reveal more the longer you sit with their symbols. New layers will emerge.",
    "The seeker's path is never complete. The runes have opened a conversation that will continue in dreams and quiet moments.",
  ],
  neutral: [
    "Meditate on these ancient symbols and let their guidance illuminate your path forward.",
    "The runes have spoken. Carry their wisdom with you and let it inform your choices in the days ahead.",
  ],
};

/** Free local reading — emotionally aware */
export function generateLocalRuneReading(runes: DrawnRune[], question?: string): string {
  const revealed = runes.filter((dr) => dr.isRevealed);
  if (revealed.length === 0) return "No runes have been revealed yet.";

  const tone = question ? detectEmotionalTone(question) : "neutral" as EmotionalTone;
  const parts: string[] = [];

  // Opening
  parts.push(pick(OPENINGS[tone]));

  // Question context
  if (question && question.trim()) {
    const context = detectQuestionContext(question);
    if (context !== "general") {
      const contextPhrases: Record<string, string> = {
        love: "Your question about love and connection has drawn runes rich with emotional truth.",
        career: "The runes respond to your professional inquiry with the clarity of ancestral counsel.",
        money: "Regarding material concerns, the runes speak of both practical wisdom and deeper values.",
        decision: "As you face a choice, the runes illuminate what lies along each path.",
        growth: "Your desire for growth resonates with the runes' ancient themes of transformation and becoming.",
      };
      if (contextPhrases[context]) parts.push(contextPhrases[context]);
    }
  }

  // Rune-by-rune
  parts.push("");
  for (const dr of revealed) {
    const position = dr.position || "default";
    const templates = RUNE_NARRATIVES[position] || RUNE_NARRATIVES.default;
    const orientation = dr.isReversed ? "reversed" : "upright";
    const meaning = dr.isReversed ? dr.rune.reversed_meaning : dr.rune.meaning;

    const runeText = pick(templates)
      .replace("{name}", dr.rune.name)
      .replace("{symbol}", dr.rune.symbol)
      .replace("{orientation}", orientation)
      .replace("{meaning}", meaning);
    parts.push(runeText);

    const kwText = pick(KEYWORD_BRIDGES).replace("{keywords}", dr.rune.keywords.join(", "));
    parts.push(kwText);
  }

  // Multi-rune synthesis
  if (revealed.length >= 2) {
    parts.push("");
    const allKeywords = [...new Set(revealed.flatMap((dr) => dr.rune.keywords))];
    const names = revealed.map((dr) => `**${dr.rune.name}**`);
    parts.push(`Reading ${names.join(" and ")} together, the runes weave a narrative of ${allKeywords.slice(0, 3).join(", ")}. When the runes speak in harmony like this, their message carries the weight of certainty.`);
  }

  // Closing
  parts.push("");
  parts.push(pick(CLOSINGS[tone]));

  return parts.join("\n\n");
}

/** Default reading — uses local engine */
export function generateRuneReading(question: string, runes: DrawnRune[]): string {
  return generateLocalRuneReading(runes, question);
}

/** Premium AI reading — calls the edge function */
export async function generateAIRuneReading(question: string, runes: DrawnRune[]): Promise<string> {
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

  const { data, error } = await supabase.functions.invoke("divination-reading", {
    body: { question, type: "rune", runes: runeData },
  });

  if (error || data?.error) {
    console.error("Rune AI reading error:", error || data?.error);
    throw new Error("AI interpretations are temporarily unavailable. Please try again later.");
  }

  if (!data?.reading) {
    throw new Error("AI interpretations are temporarily unavailable. Please try again later.");
  }

  return data.reading;
}
