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

    const systemPrompt = `You are generating a concise, clear, and emotionally relevant tarot reading. Give the user a satisfying and accurate-feeling interpretation — not a deep or overly detailed analysis.

Rules:
- Keep the reading between 120–140 words total.
- Speak directly using "you".
- Be specific to the situation, not generic.
- Do NOT explain tarot card meanings or definitions.
- Do NOT use mystical or vague phrases like "the universe is guiding you", "divine", "cosmic", "energy shift".
- Avoid filler and repetition.
- Use natural, calm, human tone — emotionally aware but not too deep, slightly intriguing.

Structure:
1. Opening Insight (1–2 sentences): A direct statement about the user's situation that feels immediately relevant.
2. Past Influence (1–2 sentences): How the past card is still affecting their mindset or behavior.
3. Present Situation (2–3 sentences): What is happening right now in a clear, relatable way. If there's a pattern or loop, hint at it.
4. Likely Direction (2–3 sentences): Where things are heading in a realistic, grounded way — not overly positive or dramatic.
5. Closing Line (1 sentence): A simple but slightly intriguing or reflective line that makes the user pause.

The user should feel "this is accurate and helpful" and naturally want a deeper analysis.
Keep paragraphs short for mobile. Ensure the response finishes clearly.`;

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

    // Generate follow-up suggestions
    let suggestedQuestions: string[] = [];
    try {
      const suggestionRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            {
              role: "user",
              content: `Based on this tarot reading, suggest exactly 3 thoughtful follow-up questions the user might naturally want to explore next. The original question was: "${question}". The reading given was: "${reading}".

The questions should help explore timing, obstacles, emotional dynamics, or personal guidance. Each question should be specific to the user's situation, not generic.

Return ONLY the 3 questions, one per line, without numbering or bullet points.`,
            },
          ],
          max_tokens: 200,
        }),
      });
      if (suggestionRes.ok) {
        const suggestionData = await suggestionRes.json();
        const raw = suggestionData.choices?.[0]?.message?.content || "";
        suggestedQuestions = raw.split("\n").map((q: string) => q.trim()).filter((q: string) => q.length > 10).slice(0, 3);
      }
    } catch (e) {
      console.error("Follow-up suggestion error:", e);
    }

    return new Response(JSON.stringify({ reading, suggestedQuestions }), {
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
