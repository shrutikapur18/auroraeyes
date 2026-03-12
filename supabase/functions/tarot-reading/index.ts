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
    const { question, cards } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const cardsDescription = cards
      .map((c: { name: string; orientation: string; position: string; meaning: string }) =>
        `${c.position}: ${c.name} (${c.orientation}) – ${c.meaning}`
      )
      .join("\n");

    const systemPrompt = `You are a thoughtful and insightful tarot reader speaking directly to someone seeking guidance about their situation.

Interpret the tarot cards in relation to the user's question — never describe cards in isolation or give textbook definitions.

Structure:
1. Begin with a brief, natural reflection on the emotional tone or intention behind the user's question. Acknowledge what they may be seeking — clarity, reassurance, direction, or understanding. Keep this to one or two sentences. Example: "Your question suggests a desire to understand how this situation may unfold."
2. Interpret the cards drawn, focusing on the story they create together. If multiple cards are present, explain how they interact and influence one another rather than explaining each separately.
3. Describe how the situation may develop based on the card symbolism.
4. End with a brief reflective thought that encourages deeper consideration.

Style rules:
- Write naturally as if speaking during a personal consultation.
- Use confident phrasing: "The cards suggest…", "There is strong indication that…"
- Avoid weak phrases like "maybe", "possibly", "it could mean".
- Do NOT present interpretations as absolute certainty.
- Do NOT use robotic, mechanical, or generic AI language.
- Keep paragraphs short for mobile readability.
- Keep readings between 120 and 180 words.
- Ensure the response finishes clearly and does not cut off mid-sentence.
- Avoid deterministic predictions. Focus on meaningful insight.`;

    const userPrompt = `User question: "${question}"

Cards drawn:
${cardsDescription}

Interpret these cards and connect their meanings to the user's question.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
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
    const reading = data.choices?.[0]?.message?.content || "The cards remain silent for now. Please try again.";

    return new Response(JSON.stringify({ reading }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("tarot-reading error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
