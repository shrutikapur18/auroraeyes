import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, type, cards, runes, followUp, conversationHistory } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let symbolsDescription = "";
    let systemPrompt = "";

    if (type === "angel") {
      symbolsDescription = (cards || [])
        .map((c: { name: string; position: string; meaning: string; keywords: string }) =>
          `${c.position}: ${c.name} – ${c.meaning} (Keywords: ${c.keywords})`
        )
        .join("\n");

      systemPrompt = `You are a gentle and intuitive angel card reader speaking directly to someone seeking guidance.

Interpret the angel cards in relation to the user's question — never describe cards in isolation.

Structure:
1. Acknowledge the user's question warmly.
2. Interpret the main symbols drawn, weaving them into a cohesive story about the user's situation. Focus on what they suggest together rather than explaining each separately.
3. Describe how the situation may develop with supportive, encouraging insight.
4. End with a brief reflective thought that encourages deeper consideration.

Style rules:
- Write naturally as if speaking during a personal consultation.
- Use confident phrasing: "The cards suggest…", "There is strong indication that…", "The symbolism points toward…"
- Avoid weak phrases like "maybe", "possibly", "it could mean".
- Do NOT present interpretations as absolute certainty.
- Do NOT use robotic, mechanical, or generic AI language.
- Do NOT use phrases like "My dear friend" or "Cosmic snapshot".
- Keep paragraphs short for mobile readability.
- Keep readings between 120 and 180 words.
- Ensure the response finishes clearly and does not cut off mid-sentence.
- Focus on meaningful insight, not textbook descriptions.`;
    } else if (type === "rune") {
      symbolsDescription = (runes || [])
        .map((r: { name: string; symbol: string; orientation: string; position: string; meaning: string; keywords: string }) =>
          `${r.position}: ${r.name} (${r.symbol}) – ${r.orientation} – ${r.meaning} (Keywords: ${r.keywords})`
        )
        .join("\n");

      systemPrompt = `You are a wise and grounded rune reader with deep knowledge of the Elder Futhark, speaking directly to someone seeking clarity.

Interpret the runes in relation to the user's question — explain what they suggest about the situation in practical terms such as growth, obstacles, transformation, or opportunity.

Structure:
1. Acknowledge the user's question.
2. Interpret the main runes drawn, focusing on the story they create together rather than explaining each separately. Show how they interact and influence one another across positions.
3. Describe how the situation may develop based on the symbolic energy.
4. End with a brief reflective insight that encourages deeper consideration.

Style rules:
- Write naturally as if speaking during a personal consultation.
- Use confident phrasing: "The runes suggest…", "There is strong indication that…", "The symbolism points toward…"
- Avoid weak phrases like "maybe", "possibly", "it could mean".
- Do NOT present interpretations as absolute certainty.
- Do NOT use robotic, mechanical, or generic AI language.
- Do NOT use phrases like "My dear friend" or "Cosmic snapshot".
- Keep paragraphs short for mobile readability.
- Keep readings between 120 and 180 words.
- Ensure the response finishes clearly and does not cut off mid-sentence.
- Be mystical but grounded. Focus on meaningful insight.`;
    } else {
      // Fallback tarot-style
      symbolsDescription = (cards || [])
        .map((c: { name: string; orientation: string; position: string; meaning: string }) =>
          `${c.position}: ${c.name} (${c.orientation}) – ${c.meaning}`
        )
        .join("\n");

      systemPrompt = `You are a thoughtful and insightful tarot reader speaking directly to someone seeking guidance about their situation.

Interpret the tarot cards in relation to the user's question — never describe cards in isolation or give textbook definitions.

Structure:
1. Acknowledge the user's question.
2. Interpret the cards drawn, focusing on the story they create together. If multiple cards are present (such as past, present, future), explain how they interact and influence one another rather than explaining each separately.
3. Describe how the situation may develop based on the card symbolism.
4. End with a brief reflective thought that encourages deeper consideration.

Style rules:
- Write naturally as if speaking during a personal consultation.
- Use confident phrasing: "The cards suggest…", "There is strong indication that…", "The symbolism points toward…"
- Avoid weak phrases like "maybe", "possibly", "it could mean".
- Do NOT present interpretations as absolute certainty.
- Do NOT use robotic, mechanical, or generic AI language.
- Do NOT use phrases like "My dear friend" or "Cosmic snapshot".
- Keep paragraphs short for mobile readability.
- Keep readings between 120 and 180 words.
- Ensure the response finishes clearly and does not cut off mid-sentence.
- Avoid deterministic predictions. Focus on meaningful insight.`;
    }

    // Build messages array
    const messages: { role: string; content: string }[] = [
      { role: "system", content: systemPrompt },
    ];

    if (followUp && conversationHistory?.length) {
      // For follow-ups, include the original reading context and conversation history
      const contextPrompt = `Original question: "${question}"

${type === "rune" ? "Runes" : "Cards"} drawn:
${symbolsDescription}

The reading has already been given. The user is now asking follow-up questions about the same reading. Stay in character as their reader, referencing the same ${type === "rune" ? "runes" : "cards"} and their meanings. Keep responses between 80 and 120 words. Write naturally and conversationally. Use confident language. Do not use robotic or generic AI phrasing.`;

      messages.push({ role: "user", content: contextPrompt });
      messages.push({ role: "assistant", content: "I understand. I'll continue interpreting these symbols for you." });

      // Add conversation history
      for (const msg of conversationHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }
    } else {
      // Initial reading
      const userPrompt = `User question: "${question}"

${type === "rune" ? "Runes" : "Cards"} drawn:
${symbolsDescription}

Interpret these ${type === "rune" ? "runes" : "cards"} and connect their meanings to the user's question.`;

      messages.push({ role: "user", content: userPrompt });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Failed to generate reading" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const reading = data.choices?.[0]?.message?.content || "The spirits remain silent for now. Please try again.";

    return new Response(JSON.stringify({ reading }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("divination-reading error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
