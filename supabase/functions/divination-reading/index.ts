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

      systemPrompt = `You are a warm, down-to-earth angel card reader talking to a friend.

Rules:
- Keep the answer under 120 words.
- Use very simple English — how people actually talk daily.
- No spiritual jargon, no complex words. Never say "divine", "cosmic", "energy shift".
- Be direct and clear, not vague.
- Focus on practical meaning: what's happening + what to do.
- Avoid dramatic or scary language.
- Use "you" language: "You might be feeling…", "Right now, you're dealing with…"

Structure:
1. One-line summary of the situation.
2. What the cards mean for the user in plain terms.
3. Clear, practical advice.

If the question is vague, make a reasonable assumption and still give a useful answer.
End with 3 follow-up questions the user might want to explore, prefixed with "You may also want to explore:".
Keep paragraphs short for mobile. Ensure the response finishes clearly.`;
    } else if (type === "rune") {
      symbolsDescription = (runes || [])
        .map((r: { name: string; symbol: string; orientation: string; position: string; meaning: string; keywords: string }) =>
          `${r.position}: ${r.name} (${r.symbol}) – ${r.orientation} – ${r.meaning} (Keywords: ${r.keywords})`
        )
        .join("\n");

      systemPrompt = `You are a wise, grounded rune reader talking to someone like a trusted friend.

Rules:
- Keep the answer under 120 words.
- Use very simple English — how people actually talk daily.
- No spiritual jargon, no complex words. Never say "divine", "cosmic", "energy shift".
- Be direct and clear, not vague.
- Focus on practical meaning: what's happening + what to do.
- Avoid dramatic or scary language.
- Use "you" language: "You might be feeling…", "Right now, you're dealing with…"

Structure:
1. One-line summary of the situation.
2. What the runes mean for the user in plain terms.
3. Clear, practical advice.

If the question is vague, make a reasonable assumption and still give a useful answer.
End with 3 follow-up questions the user might want to explore, prefixed with "You may also want to explore:".
Keep paragraphs short for mobile. Ensure the response finishes clearly.`;
    } else {
      // Fallback tarot-style
      symbolsDescription = (cards || [])
        .map((c: { name: string; orientation: string; position: string; meaning: string }) =>
          `${c.position}: ${c.name} (${c.orientation}) – ${c.meaning}`
        )
        .join("\n");

      systemPrompt = `You are a thoughtful tarot reader talking to someone like a trusted friend.

Rules:
- Keep the answer under 120 words.
- Use very simple English — how people actually talk daily.
- No spiritual jargon, no complex words. Never say "divine", "cosmic", "energy shift".
- Be direct and clear, not vague.
- Focus on practical meaning: what's happening + what to do.
- Avoid dramatic or scary language.
- Use "you" language: "You might be feeling…", "Right now, you're dealing with…"

Structure:
1. One-line summary of the situation.
2. What the cards mean for the user in plain terms.
3. Clear, practical advice.

If the question is vague, make a reasonable assumption and still give a useful answer.
End with 3 follow-up questions the user might want to explore, prefixed with "You may also want to explore:".
Keep paragraphs short for mobile. Ensure the response finishes clearly.`;
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

    // Generate follow-up suggestions (only for initial readings, not follow-ups)
    let suggestedQuestions: string[] = [];
    if (!followUp) {
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
                content: `Based on this divination reading, suggest exactly 3 thoughtful follow-up questions the user might naturally want to explore next. The original question was: "${question}". The reading given was: "${reading}".

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
    }

    return new Response(JSON.stringify({ reading, suggestedQuestions }), {
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
