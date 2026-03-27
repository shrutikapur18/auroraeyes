import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SIGN_ABBR_TO_FULL: Record<string, string> = {
  Ari: "Aries", Tau: "Taurus", Gem: "Gemini", Can: "Cancer",
  Leo: "Leo", Vir: "Virgo", Lib: "Libra", Sco: "Scorpio",
  Sag: "Sagittarius", Cap: "Capricorn", Aqu: "Aquarius", Pis: "Pisces",
};

const ZODIAC_SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

function expandSign(abbr: string): string {
  return SIGN_ABBR_TO_FULL[abbr] || abbr;
}

function getMoonPhase(moonDeg: number, sunDeg: number): string {
  let diff = moonDeg - sunDeg;
  if (diff < 0) diff += 360;
  if (diff < 45) return "New Moon";
  if (diff < 90) return "Waxing Crescent";
  if (diff < 135) return "First Quarter";
  if (diff < 180) return "Waxing Gibbous";
  if (diff < 225) return "Full Moon";
  if (diff < 270) return "Waning Gibbous";
  if (diff < 315) return "Last Quarter";
  return "Waning Crescent";
}

function buildChartSummary(chartData: any) {
  const planetSummary = chartData.planets
    .map((p: any) => `${p.name} in ${p.sign} (House ${p.house})${p.isRetro ? " ℞" : ""}`)
    .join(", ");

  const aspectSummary = chartData.aspects
    .slice(0, 10)
    .map((a: any) => `${a.planet1} ${a.type} ${a.planet2} (orb ${a.orb.toFixed(1)}°)`)
    .join("; ");

  const ascHouse = chartData.houses.find((h: any) => h.house === 1);
  const ascDeg = ascHouse ? (ascHouse.degree % 30) : -1;

  const moonAspects = chartData.aspects.filter((a: any) => a.planet1 === "Moon" || a.planet2 === "Moon");
  const vocMoon = moonAspects.length === 0;

  // Derive key signals for the AI
  const querentPlanet = chartData.planets.find((p: any) => p.house === 1);
  const outcomePlanet = chartData.planets.find((p: any) => p.house === 7 || p.house === 10);

  const DIGNITIES: Record<string, string[]> = {
    Sun: ["Leo","Aries"], Moon: ["Cancer","Taurus"], Mercury: ["Gemini","Virgo"],
    Venus: ["Taurus","Libra","Pisces"], Mars: ["Aries","Scorpio","Capricorn"],
    Jupiter: ["Sagittarius","Pisces","Cancer"], Saturn: ["Capricorn","Aquarius","Libra"],
  };

  function isStrong(p: any): boolean {
    if (!p) return false;
    const digs = DIGNITIES[p.name] || [];
    return digs.includes(p.sign) && !p.isRetro;
  }

  const querentStrength = querentPlanet ? (isStrong(querentPlanet) ? "strong" : "weak") : "unknown";
  const outcomeStrength = outcomePlanet ? (isStrong(outcomePlanet) ? "strong" : "weak") : "unknown";

  const hasConnection = chartData.aspects.some((a: any) =>
    (a.type === "Conjunction" || a.type === "Trine" || a.type === "Sextile") && a.orb < 6
  );

  const moonFlow = vocMoon ? "delay" : "progress";

  const retroCount = chartData.planets.filter((p: any) => p.isRetro).length;
  const timingSpeed = retroCount >= 3 ? "slow" : retroCount >= 1 ? "medium" : "fast";

  const keySignals = {
    querentStrength,
    outcomeStrength,
    connection: hasConnection ? "yes" : "no",
    moonFlow,
    timingSpeed,
  };

  return { planetSummary, aspectSummary, ascDeg, vocMoon, keySignals };
}

function buildMainPrompt(question: string, chartData: any, meta: any) {
  const { planetSummary, aspectSummary, ascDeg, vocMoon, radicalityNote } = buildChartSummary(chartData);

  return `You are an experienced traditional horary astrologer interpreting a chart for someone who has asked a sincere question.

The question is: "${question}"

The horary chart was cast at ${meta.year}-${meta.month}-${meta.date} ${meta.hours}:${String(meta.minutes).padStart(2, "0")} at ${meta.location} (${meta.latitude}, ${meta.longitude}).

Chart data:
- Ascendant: ${chartData.ascendantSign} (degree in sign: ${ascDeg >= 0 ? ascDeg.toFixed(1) + "°" : "unknown"})
- Moon: ${chartData.moonSign}, Phase: ${chartData.moonPhase}${vocMoon ? " (void of course)" : ""}
- Planets: ${planetSummary}
- Key aspects: ${aspectSummary}
${radicalityNote ? "\nRadicality: " + radicalityNote : ""}

INSTRUCTIONS:

1. QUESTION VALIDATION: If the question is vague, unrealistic, or too broad, gently encourage a clearer question. Say something like: "Horary astrology works best with clear and specific questions about real situations."

2. Begin with a brief, natural reflection (1-2 sentences) on the emotional tone or intention behind the question. Acknowledge what the person may be seeking — clarity, reassurance, direction, or understanding. Example: "Your question suggests a desire to understand how this situation may unfold."

3. INTERPRETATION: Organize the reading using these section headers (use **bold** for headers):

**Chart Radicality**
If there are radicality warnings above, explain gently that the situation may still be developing. If the chart is radical, state briefly that the chart is fit to judge and proceed.

**Main Significators**
Identify the key planets representing the querent and the quesited (the person or matter asked about). Explain their roles in plain language.

**Condition of the Planets**
Describe the condition of the main significators — are they strong or weak? In what signs and houses? Translate this into real-life meaning.

**Reception Between People**
If the question involves another person, explain whether the planets show mutual reception, one-sided interest, or indifference. Translate into feelings.

**Aspect Analysis**
Describe the key aspects between significators. Are they applying (moving toward contact) or separating (moving apart)? Explain what this means for the situation. Use grounded, direct language.

**Moon and the Flow of Events**
Describe the Moon's current sign, phase, and next aspects. Explain what this reveals about how events will unfold. If the Moon is void of course, explain its meaning clearly.

**Hidden Insights from This Chart**
Analyze the chart for additional information the querent did not explicitly ask about. Only include insights strongly supported by the chart. Possible hidden insights:
- Hidden feelings of another person
- Obstacles blocking the situation
- Presence of a third party influencing the matter
- Timing of a future development
- Whether the situation will change
- Advice for the querent
Format each insight as: "Hidden Insight #1 — [Topic]" followed by a brief explanation.

**What Is Most Likely to Happen**
Summarize clearly:
- The most probable outcome
- The main obstacle
- The expected timing (soon, within weeks, within months, gradual long-term — never exact dates)
Base this on aspects between significators, reception, and the Moon's next aspects.

**Follow-Up Questions**
Suggest 3 thoughtful follow-up questions the user might naturally ask next, related to timing, obstacles, emotional dynamics, or personal guidance. Format as: "You may also want to explore:" followed by bullet points.

STYLE RULES:
- Use warm, natural, conversational language — calm, reflective, thoughtful.
- Keep the full interpretation between 350 and 500 words.
- Use short paragraphs for easy mobile reading.
- When using astrology terms, briefly explain them in plain language.
- Translate astrological symbolism into real-life situations.
- Do NOT use vague phrases like "the energy suggests", "it could mean", "possibly".
- Give grounded interpretations based on the chart data.
- Do NOT use phrases like "My dear friend", "Cosmic snapshot", or "Cosmic characters".
- Use direct language: "The chart suggests...", "There is strong indication that...", "Because [aspect], the situation is likely to..."
- Ensure the response finishes clearly and does not cut off mid-sentence.
- All follow-up answers must refer back to this same chart. Never create a new interpretation unless new chart data is provided.`;
}

function buildFollowUpPrompt(followUpQuestion: string, originalQuestion: string, originalInterpretation: string, chartData: any, conversationHistory: any[]) {
  const { planetSummary, aspectSummary, ascDeg, vocMoon, radicalityNote } = buildChartSummary(chartData);

  const historyText = conversationHistory
    .map((m: any) => `${m.role === "user" ? "Querent" : "Astrologer"}: ${m.content}`)
    .join("\n\n");

  return `You are an experienced traditional horary astrologer. You previously interpreted a horary chart and the querent is now asking a follow-up question about the SAME chart. You must NOT generate a new chart. You must use the EXACT SAME chart data provided below.

ORIGINAL QUESTION: "${originalQuestion}"

FOLLOW-UP QUESTION: "${followUpQuestion}"

ACTIVE HORARY CHART (do NOT change this data):
- Ascendant: ${chartData.ascendantSign} (degree in sign: ${ascDeg >= 0 ? ascDeg.toFixed(1) + "°" : "unknown"})
- Moon: ${chartData.moonSign}, Phase: ${chartData.moonPhase}${vocMoon ? " (void of course)" : ""}
- Planets: ${planetSummary}
- Key aspects: ${aspectSummary}
${radicalityNote ? "\nRadicality: " + radicalityNote : ""}

YOUR ORIGINAL INTERPRETATION:
${originalInterpretation}

${historyText ? "CONVERSATION SO FAR:\n" + historyText : ""}

INSTRUCTIONS:
1. Begin with a brief emotional reflection (1-2 sentences) acknowledging the follow-up question.
2. Answer the follow-up question by re-analyzing the SAME chart, focusing specifically on what was asked.
3. Reference specific planets, houses, and aspects from the chart to support your answer.
4. Stay fully consistent with your original interpretation — do NOT contradict it.
5. If the follow-up asks about timing, use the Moon's aspects and planetary movements from this chart.
6. If the follow-up asks about another person's feelings, analyze the relevant house ruler and its receptions.
7. If the follow-up asks about obstacles, identify afflicted planets or malefics in relevant houses.

STYLE RULES:
- Keep the response between 120 and 200 words.
- Use warm, direct, conversational language.
- Translate astrological terms into plain language.
- Do NOT use vague phrases like "the energy suggests", "it could mean", "possibly".
- Do NOT use phrases like "My dear friend", "Cosmic snapshot", or "Cosmic characters".
- End with one brief sentence suggesting what else the querent might explore from this chart.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { followUp, chartData: existingChartData, originalQuestion, originalInterpretation, conversationHistory } = body;

    // ─── FOLLOW-UP MODE: Reuse existing chart ───
    if (followUp && existingChartData) {
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (!LOVABLE_API_KEY) throw new Error("AI key not configured");

      const prompt = buildFollowUpPrompt(
        body.question,
        originalQuestion,
        originalInterpretation,
        existingChartData,
        conversationHistory || []
      );

      const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1500,
        }),
      });

      let reading = "The stars are quiet for now. Please try again.";
      if (aiRes.ok) {
        const aiData = await aiRes.json();
        reading = aiData.choices?.[0]?.message?.content || reading;
      }

      return new Response(
        JSON.stringify({ reading }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── NEW CHART MODE ───
    const ASTRO_API_KEY = Deno.env.get("FREE_ASTRO_API_KEY");
    if (!ASTRO_API_KEY) throw new Error("FREE_ASTRO_API_KEY is not configured");

    const { question, location, latitude, longitude, year, month, date, hours, minutes, seconds, timezone } = body;

    if (!question || !latitude || !longitude) {
      throw new Error("Missing required fields: question, latitude, longitude");
    }

    const natalBody = {
      name: "Horary Chart",
      year: year || new Date().getFullYear(),
      month: month || new Date().getMonth() + 1,
      day: date || new Date().getDate(),
      hour: hours ?? new Date().getHours(),
      minute: minutes ?? new Date().getMinutes(),
      time_known: true,
      city: location || "Unknown",
      lat: latitude,
      lng: longitude,
      tz_str: "AUTO",
      house_system: "placidus",
      zodiac_type: "tropical",
      include_speed: true,
      include_minor_aspects: true,
      include_features: ["chiron", "true_node"],
    };

    const astroRes = await fetch("https://api.freeastroapi.com/api/v1/natal/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ASTRO_API_KEY,
      },
      body: JSON.stringify(natalBody),
    });

    if (!astroRes.ok) {
      const errText = await astroRes.text();
      throw new Error(`FreeAstroAPI failed [${astroRes.status}]: ${errText}`);
    }

    const astroData = await astroRes.json();

    const planets = (astroData.planets || []).map((p: any) => ({
      name: p.name || p.id,
      sign: expandSign(p.sign),
      signNumber: ZODIAC_SIGNS.indexOf(expandSign(p.sign)) + 1,
      fullDegree: p.abs_pos || 0,
      normDegree: p.pos || 0,
      isRetro: p.retrograde || false,
      house: p.house || 1,
    }));

    const houses = (astroData.houses || []).map((h: any) => ({
      house: h.house,
      sign: expandSign(h.sign),
      signNumber: ZODIAC_SIGNS.indexOf(expandSign(h.sign)) + 1,
      degree: h.pos || 0,
    }));

    const aspects = (astroData.aspects || []).slice(0, 20).map((a: any) => ({
      planet1: a.p1 || "",
      planet2: a.p2 || "",
      type: a.type || "",
      orb: a.orb || 0,
      applying: false,
    }));

    const moonPlanet = planets.find((p: any) => p.name === "Moon");
    const sunPlanet = planets.find((p: any) => p.name === "Sun");

    const ascSign = astroData.angles_details?.asc
      ? expandSign(astroData.angles_details.asc.sign)
      : (houses[0]?.sign || "Aries");

    const chartData = {
      planets,
      houses,
      aspects,
      ascendantSign: ascSign,
      moonSign: moonPlanet?.sign || "Unknown",
      moonPhase: moonPlanet && sunPlanet
        ? getMoonPhase(moonPlanet.fullDegree, sunPlanet.fullDegree)
        : "Unknown",
    };

    // Generate AI interpretation
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    let interpretation = "Chart cast successfully. Interpretation unavailable.";

    if (LOVABLE_API_KEY) {
      const prompt = buildMainPrompt(question, chartData, { year, month, date, hours, minutes, location, latitude, longitude });

      try {
        const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 3000,
          }),
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          interpretation = aiData.choices?.[0]?.message?.content || interpretation;
        }
      } catch (e) {
        console.error("AI interpretation error:", e);
      }
    }

    return new Response(
      JSON.stringify({ chartData, interpretation }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Horary reading error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
