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

      const prompt = `You are a master horary astrologer. A querent has asked: "${question}"

The horary chart was cast at ${year}-${month}-${date} ${hours}:${String(minutes).padStart(2, "0")} at ${location} (${latitude}, ${longitude}).

Chart data:
- Ascendant: ${chartData.ascendantSign}
- Moon: ${chartData.moonSign}, Phase: ${chartData.moonPhase}
- Planets: ${planetSummary}
- Key aspects: ${aspectSummary}

Provide a detailed horary astrology interpretation (4-6 paragraphs) following traditional horary principles:
1. Identify the house ruling the question's subject matter
2. Examine the querent's significator (ruler of the Ascendant)
3. Examine the quesited's significator (ruler of the relevant house)
4. Analyze the Moon's condition and recent/upcoming aspects
5. Look for applying aspects between significators
6. Consider receptions, dignities, and any prohibiting factors
7. Give a clear answer to the question with reasoning

Write in a mystical but clear tone. Be specific about which planets and aspects support your interpretation.`;

      try {
        const aiRes = await fetch("https://ai-gateway.lovable.dev/api/chat/completions", {
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
