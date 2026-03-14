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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ASTRO_API_KEY = Deno.env.get("FREE_ASTRO_API_KEY");
    if (!ASTRO_API_KEY) throw new Error("FREE_ASTRO_API_KEY is not configured");

    const body = await req.json();
    const { question, location, latitude, longitude, year, month, date, hours, minutes, seconds, timezone } = body;

    if (!question || !latitude || !longitude) {
      throw new Error("Missing required fields: question, latitude, longitude");
    }

    // Use freeastroapi.com natal/calculate endpoint for chart data
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

    // Parse planets
    const planets = (astroData.planets || []).map((p: any) => ({
      name: p.name || p.id,
      sign: expandSign(p.sign),
      signNumber: ZODIAC_SIGNS.indexOf(expandSign(p.sign)) + 1,
      fullDegree: p.abs_pos || 0,
      normDegree: p.pos || 0,
      isRetro: p.retrograde || false,
      house: p.house || 1,
    }));

    // Parse houses
    const houses = (astroData.houses || []).map((h: any) => ({
      house: h.house,
      sign: expandSign(h.sign),
      signNumber: ZODIAC_SIGNS.indexOf(expandSign(h.sign)) + 1,
      degree: h.pos || 0,
    }));

    // Parse aspects
    const aspects = (astroData.aspects || []).slice(0, 20).map((a: any) => ({
      planet1: a.p1 || "",
      planet2: a.p2 || "",
      type: a.type || "",
      orb: a.orb || 0,
      applying: false, // API doesn't provide applying info directly
    }));

    // Extract key data
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
      const planetSummary = planets
        .map((p: any) => `${p.name} in ${p.sign} (House ${p.house})${p.isRetro ? " ℞" : ""}`)
        .join(", ");

      const aspectSummary = aspects
        .slice(0, 10)
        .map((a: any) => `${a.planet1} ${a.type} ${a.planet2} (orb ${a.orb.toFixed(1)}°)`)
        .join("; ");

      // Compute Ascendant degree for radicality check
      const ascHouse = houses.find((h: any) => h.house === 1);
      const ascDeg = ascHouse ? (ascHouse.degree % 30) : -1;

      // Check void-of-course Moon (no applying aspects from Moon)
      const moonAspects = aspects.filter((a: any) => a.planet1 === "Moon" || a.planet2 === "Moon");
      const vocMoon = moonAspects.length === 0;

      let radicalityNote = "";
      if (ascDeg >= 0 && ascDeg <= 3) {
        radicalityNote = "Note: The Ascendant is at a very early degree, which traditionally suggests the situation may be too new or still forming for a clear answer.";
      } else if (ascDeg >= 27 && ascDeg <= 30) {
        radicalityNote = "Note: The Ascendant is at a very late degree, which traditionally suggests the matter may already be resolving or past the point of intervention.";
      }
      if (vocMoon) {
        radicalityNote += " The Moon is void of course, which traditionally indicates the situation may not develop further or that nothing will come of the matter as asked.";
      }

      const prompt = `You are an experienced traditional horary astrologer interpreting a chart for someone who has asked a sincere question.

The question is: "${question}"

The horary chart was cast at ${year}-${month}-${date} ${hours}:${String(minutes).padStart(2, "0")} at ${location} (${latitude}, ${longitude}).

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
Identify the key planets representing the querent and the quesited (the person or matter asked about). Explain their roles in plain language. Example: "Mars represents you in this chart, while Venus represents the person you are asking about."

**Condition of the Planets**
Describe the condition of the main significators — are they strong or weak? In what signs and houses? Translate this into real-life meaning. Example: "Venus in Pisces suggests the other person may be emotionally sensitive and compassionate."

**Reception Between People**
If the question involves another person, explain whether the planets show mutual reception, one-sided interest, or indifference. Translate into feelings. Example: "The chart suggests genuine interest from both sides, though one person may be more hesitant."

**Aspect Analysis**
Describe the key aspects between significators. Are they applying (moving toward contact) or separating (moving apart)? Explain what this means for the situation. Use grounded, direct language. Example: "Because Venus applies to a trine with Mars in an angular house, the chart suggests the relationship is likely to develop."

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
            max_tokens: 1500,
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
