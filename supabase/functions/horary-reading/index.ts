import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ZODIAC_SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

const FREE_ASTRO_BASE = "https://json.freeastrologyapi.com";

interface AstroPlanet {
  name: string;
  fullDegree: number;
  normDegree: number;
  speed: number;
  isRetro: string;
  sign: string;
  current_sign: number;
  house_number?: number;
}

async function fetchAstroData(endpoint: string, body: Record<string, unknown>, apiKey: string) {
  const res = await fetch(`${FREE_ASTRO_BASE}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`FreeAstroAPI ${endpoint} failed [${res.status}]: ${text}`);
  }
  return res.json();
}

function parsePlanets(data: Record<string, AstroPlanet>) {
  return Object.values(data)
    .filter((p) => p.name)
    .map((p) => ({
      name: p.name,
      sign: ZODIAC_SIGNS[(p.current_sign || 1) - 1] || p.sign,
      signNumber: p.current_sign || 1,
      fullDegree: p.fullDegree || 0,
      normDegree: p.normDegree || 0,
      isRetro: p.isRetro === "true",
      house: p.house_number || 1,
    }));
}

function parseHouses(data: Record<string, { sign: string; degree: number; current_sign?: number }>) {
  return Object.entries(data).map(([key, h]) => ({
    house: parseInt(key) + 1,
    sign: ZODIAC_SIGNS[(h.current_sign || 1) - 1] || h.sign || "",
    signNumber: h.current_sign || 1,
    degree: h.degree || 0,
  }));
}

function parseAspects(data: unknown[]) {
  if (!Array.isArray(data)) return [];
  return data.slice(0, 20).map((a: any) => ({
    planet1: a.aspecting_planet || a.planet1 || "",
    planet2: a.aspected_planet || a.planet2 || "",
    type: a.type || a.aspect || "",
    orb: a.orb || 0,
    applying: a.movement === "Applying" || a.applying || false,
  }));
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
    if (!ASTRO_API_KEY) {
      throw new Error("FREE_ASTRO_API_KEY is not configured");
    }

    const body = await req.json();
    const { question, location, latitude, longitude, year, month, date, hours, minutes, seconds, timezone } = body;

    if (!question || !latitude || !longitude) {
      throw new Error("Missing required fields: question, latitude, longitude");
    }

    const astroBody = {
      year: year || new Date().getFullYear(),
      month: month || new Date().getMonth() + 1,
      date: date || new Date().getDate(),
      hours: hours || new Date().getHours(),
      minutes: minutes || new Date().getMinutes(),
      seconds: seconds || 0,
      latitude,
      longitude,
      timezone: timezone || 0,
      settings: {
        observation_point: "geocentric",
        ayanamsha: "tropical",
      },
    };

    // Fetch planets, houses, and aspects in parallel
    const [planetsRaw, housesRaw, aspectsRaw] = await Promise.all([
      fetchAstroData("western/planets", astroBody, ASTRO_API_KEY),
      fetchAstroData("western/houses", astroBody, ASTRO_API_KEY),
      fetchAstroData("western/aspects", astroBody, ASTRO_API_KEY).catch(() => []),
    ]);

    const planetsData = planetsRaw.output || planetsRaw;
    const housesData = housesRaw.output || housesRaw;
    const aspectsData = aspectsRaw.output || aspectsRaw;

    const planets = parsePlanets(planetsData);
    const houses = parseHouses(housesData);
    const aspects = parseAspects(Array.isArray(aspectsData) ? aspectsData : []);

    const moonPlanet = planets.find((p) => p.name === "Moon");
    const sunPlanet = planets.find((p) => p.name === "Sun");
    const ascendant = planets.find((p) => p.name === "Ascendant") || houses[0];

    const chartData = {
      planets,
      houses,
      aspects,
      ascendantSign: ascendant ? (ascendant as any).sign || ZODIAC_SIGNS[0] : ZODIAC_SIGNS[0],
      moonSign: moonPlanet?.sign || "Unknown",
      moonPhase: moonPlanet && sunPlanet
        ? getMoonPhase(moonPlanet.fullDegree, sunPlanet.fullDegree)
        : "Unknown",
    };

    // Generate AI interpretation using Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    let interpretation = "Chart cast successfully. Interpretation unavailable.";

    if (LOVABLE_API_KEY) {
      const planetSummary = planets
        .filter((p) => !["Ascendant", "Midheaven"].includes(p.name))
        .map((p) => `${p.name} in ${p.sign} (House ${p.house})${p.isRetro ? " ℞" : ""}`)
        .join(", ");

      const aspectSummary = aspects
        .slice(0, 10)
        .map((a) => `${a.planet1} ${a.type} ${a.planet2} (orb ${a.orb.toFixed(1)}°, ${a.applying ? "applying" : "separating"})`)
        .join("; ");

      const prompt = `You are a master horary astrologer. A querent has asked: "${question}"

The horary chart was cast at ${year}-${month}-${date} ${hours}:${String(minutes).padStart(2, "0")} (timezone UTC${timezone >= 0 ? "+" : ""}${timezone}) at ${location} (${latitude}, ${longitude}).

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
