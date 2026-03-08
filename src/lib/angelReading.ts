import type { DrawnAngelCard } from "@/data/angelCards";
import { supabase } from "@/integrations/supabase/client";
import { detectEmotionalTone, detectQuestionContext, type EmotionalTone, type QuestionContext } from "@/lib/tarotInterpretationEngine";

// ─── Tone-Aware Templates ───

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const OPENINGS: Record<EmotionalTone, string[]> = {
  anxious: [
    "The angels sense the weight you are carrying and draw near with gentle reassurance.",
    "In this moment of uncertainty, the angels wrap you in their loving presence.",
  ],
  confused: [
    "When the path feels unclear, the angels offer a light to guide you through.",
    "The angels see your search for clarity and respond with compassion.",
  ],
  hopeful: [
    "The angels celebrate the hope you hold in your heart — it is a sacred force.",
    "Your hopefulness has called these messengers forward with an affirming word.",
  ],
  optimistic: [
    "The angels mirror your bright energy and amplify it with divine blessings.",
    "Your positivity is magnetic, and the angels respond with joyful guidance.",
  ],
  curious: [
    "The angels welcome your open-hearted curiosity with messages of warmth and wisdom.",
    "Your willingness to listen creates space for the angels to speak freely.",
  ],
  neutral: [
    "The angels have heard your call and respond with love and clarity.",
    "With open wings, the angels deliver the messages meant for you today.",
  ],
};

const CARD_INTROS: string[] = [
  "**{name}** {symbol} steps forward with this message: {message}",
  "The presence of **{name}** {symbol} brings a clear whisper: {message}",
  "**{name}** {symbol} enfolds you in light and speaks: {message}",
];

const KEYWORD_BRIDGES: string[] = [
  "The themes of {keywords} echo through this card, inviting you to explore what they mean in your life right now.",
  "Notice how {keywords} weave into your experience — the angels highlight these energies for a reason.",
  "Reflect on {keywords} as you hold this card's energy. These are the doorways the angels invite you to walk through.",
];

const CLOSINGS: Record<EmotionalTone, string[]> = {
  anxious: [
    "You are held, protected, and deeply loved. Whatever comes, you do not face it alone. Let the angels carry what feels too heavy.",
    "Breathe deeply. The angels remind you that this storm will pass, and you are stronger than you know.",
  ],
  confused: [
    "Clarity is coming — sometimes the angels guide us one step at a time. Trust that the next step will appear when you need it.",
    "You don't need all the answers today. The angels ask you to be gentle with yourself as understanding unfolds.",
  ],
  hopeful: [
    "Your hope is a prayer the angels have already received. Walk forward knowing that your faith is seen and honored.",
    "The angels affirm your hope and add their own light to it. Beautiful things are taking shape for you.",
  ],
  optimistic: [
    "Your radiant energy is a gift to the world. The angels encourage you to share it freely and trust where it leads.",
    "The angels bless your enthusiasm and remind you that joy is one of the highest forms of prayer.",
  ],
  curious: [
    "Stay open to signs and synchronicities in the days ahead — the angels continue their conversation with you beyond this reading.",
    "Your curiosity is a form of devotion. The angels will continue to reveal layers of meaning as you reflect.",
  ],
  neutral: [
    "Trust in this divine guidance and know that you are supported on your path. The angels walk beside you always.",
    "Carry these messages with you gently. The angels are always near — you need only ask to feel their presence.",
  ],
};

/** Free local reading — emotionally aware */
export function generateLocalAngelReading(cards: DrawnAngelCard[], question?: string): string {
  const revealed = cards.filter((dc) => dc.isRevealed);
  if (revealed.length === 0) return "No cards have been revealed yet.";

  const tone = question ? detectEmotionalTone(question) : "neutral" as EmotionalTone;
  const parts: string[] = [];

  // Opening
  parts.push(pick(OPENINGS[tone]));

  // Question context acknowledgment
  if (question && question.trim()) {
    const context = detectQuestionContext(question);
    if (context !== "general") {
      const contextPhrases: Record<string, string> = {
        love: "Your question about love and connection has drawn these angelic messengers to your side.",
        career: "The angels respond to your questions about your work and purpose with compassion.",
        money: "Regarding your concerns about abundance and security, the angels offer reassurance.",
        decision: "As you stand before a choice, the angels illuminate each path with loving clarity.",
        growth: "Your desire for growth and transformation is honored by the angels who guide you.",
      };
      if (contextPhrases[context]) parts.push(contextPhrases[context]);
    }
  }

  // Card-by-card
  parts.push("");
  for (const dc of revealed) {
    const template = pick(CARD_INTROS);
    const cardText = template
      .replace("{name}", dc.card.name)
      .replace("{symbol}", dc.card.symbol)
      .replace("{message}", dc.card.message);
    parts.push(cardText);

    // Keyword bridge
    const kwText = pick(KEYWORD_BRIDGES).replace("{keywords}", dc.card.keywords.join(", "));
    parts.push(kwText);
  }

  // Multi-card synthesis
  if (revealed.length >= 2) {
    parts.push("");
    const names = revealed.map((dc) => `**${dc.card.name}**`);
    const allKeywords = [...new Set(revealed.flatMap((dc) => dc.card.keywords))];
    const sharedThemes = allKeywords.slice(0, 3).join(", ");
    parts.push(`Together, ${names.join(" and ")} create a harmonious message centered on ${sharedThemes}. The angels speak as one voice when their guidance aligns this clearly.`);
  }

  // Closing
  parts.push("");
  parts.push(pick(CLOSINGS[tone]));

  return parts.join("\n\n");
}

/** Default reading — uses local engine */
export function generateAngelReading(question: string, cards: DrawnAngelCard[]): string {
  return generateLocalAngelReading(cards, question);
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
