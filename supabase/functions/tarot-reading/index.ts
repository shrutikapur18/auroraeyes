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

    const systemPrompt = `You are a compassionate and insightful tarot reader. Your tone is mystical but grounded, compassionate, and reflective. Never use fear-based language or generic responses.

Follow this structure:
1. Begin with a short intuitive summary of the overall energy surrounding the user's question (1-2 sentences).
2. Interpret each card individually based on the user's question, the card position, and whether the card is upright or reversed. Explain the symbolism of each card.
3. Connect the cards together into a cohesive narrative.
4. End with thoughtful reflection or guidance (1-2 sentences).

Keep readings between 120 and 220 words. Avoid deterministic predictions.`;

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
