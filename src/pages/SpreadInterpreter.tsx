import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import SnippetBox from "@/components/SnippetBox";
import InternalLinks from "@/components/InternalLinks";
import { tarotDeck, type TarotCard } from "@/data/tarotDeck";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type SpreadType = "single" | "three-card" | "celtic-cross" | "custom";

interface Slot {
  position: string;
  cardId: number | null;
  reversed: boolean;
}

const SPREAD_LAYOUTS: Record<SpreadType, string[]> = {
  single: ["Card"],
  "three-card": ["Past", "Present", "Future"],
  "celtic-cross": [
    "Present",
    "Challenge",
    "Foundation",
    "Recent Past",
    "Possible Outcome",
    "Near Future",
    "You",
    "External",
    "Hopes & Fears",
    "Outcome",
  ],
  custom: ["Position 1", "Position 2", "Position 3"],
};

const SITE_URL = "https://auroraeyes.com";

function makeSlots(type: SpreadType): Slot[] {
  return SPREAD_LAYOUTS[type].map((p) => ({ position: p, cardId: null, reversed: false }));
}

function selectedCards(slots: Slot[]) {
  return slots
    .map((s) => ({ slot: s, card: tarotDeck.find((c) => c.id === s.cardId) }))
    .filter((x): x is { slot: Slot; card: TarotCard } => !!x.card);
}

/** Instant client-side rule-based synthesis. */
function buildLocalSynthesis(slots: Slot[], question: string): string {
  const drawn = selectedCards(slots);
  if (drawn.length === 0) return "";

  const majorCount = drawn.filter((d) => d.card.arcana === "Major").length;
  const suitTally: Record<string, number> = { Cups: 0, Wands: 0, Swords: 0, Pentacles: 0 };
  drawn.forEach((d) => {
    if (d.card.suit) suitTally[d.card.suit]++;
  });
  const dominantSuit = Object.entries(suitTally).sort((a, b) => b[1] - a[1])[0];
  const reversedCount = drawn.filter((d) => d.slot.reversed).length;

  const suitTheme: Record<string, string> = {
    Cups: "emotion, relationships, and inner life",
    Wands: "drive, action, and momentum",
    Swords: "thought, conflict, and clarity",
    Pentacles: "money, work, and material reality",
  };

  const lines: string[] = [];
  lines.push(`## Overall Shape`);
  lines.push(
    `You drew ${drawn.length} card${drawn.length === 1 ? "" : "s"} for ${question ? `the question "${question.trim()}"` : "this reading"}. ` +
      (majorCount >= Math.ceil(drawn.length / 2)
        ? `${majorCount} of them are Major Arcana — this reading is about a larger pattern in your life, not a small moment.`
        : majorCount === 0
        ? `There are no Major Arcana — the situation is everyday, not a turning point.`
        : `${majorCount} Major Arcana sit among the smaller cards, marking the parts that matter most.`),
  );

  if (dominantSuit && dominantSuit[1] >= 2) {
    lines.push(
      `The reading leans into ${dominantSuit[0]} (${dominantSuit[1]} cards), so the centre of gravity is ${suitTheme[dominantSuit[0]]}.`,
    );
  }
  if (reversedCount >= Math.ceil(drawn.length / 2) && drawn.length > 1) {
    lines.push(
      `Most cards are reversed — energies here are blocked, internal, or not yet ready to express themselves outwardly.`,
    );
  }

  lines.push(`## Position by Position`);
  drawn.forEach((d) => {
    const meaning = d.slot.reversed ? d.card.meaning_rev : d.card.meaning_up;
    lines.push(
      `**${d.slot.position} — ${d.card.name}${d.slot.reversed ? " (reversed)" : ""}.** ${meaning}.`,
    );
  });

  lines.push(`## How They Talk to Each Other`);
  if (drawn.length >= 2) {
    const first = drawn[0];
    const last = drawn[drawn.length - 1];
    lines.push(
      `Read ${first.card.name} (${first.slot.position}) and ${last.card.name} (${last.slot.position}) as the two ends of the story. The cards in between show how you get from one to the other.`,
    );
  } else {
    lines.push(`With a single card, the answer is direct: hold it next to your question and let it answer literally.`);
  }

  lines.push(`## A Grounded Next Step`);
  const advice = drawn[drawn.length - 1];
  lines.push(
    `Use ${advice.card.name} as your cue: turn ${advice.slot.reversed ? advice.card.meaning_rev.toLowerCase() : advice.card.meaning_up.toLowerCase()} into one specific thing you can do this week.`,
  );

  return lines.join("\n\n");
}

const FAQS = [
  {
    q: "How do I read a tarot spread when the cards seem to contradict each other?",
    a: "Contradictions are usually the most useful part of a spread. They show real tension in your situation. Read each card in its position first, then ask which one describes how things actually are versus how you'd like them to be.",
  },
  {
    q: "Do I need to be a tarot reader to use this?",
    a: "No. Pick your spread, choose the cards you drew, toggle reversals, and the tool produces a synthesis. The local summary is instant; the AI synthesis adds a deeper read.",
  },
  {
    q: "Why does the same spread mean different things in different positions?",
    a: "Each position asks a different question of the card. The Tower in the past is something that already shook things up; the Tower in the future is a warning of upheaval ahead. The card stays the same — the role changes.",
  },
  {
    q: "Is this an AI reading or a rule-based one?",
    a: "Both. The instant synthesis is rule-based — it runs on your device using the card data. The 'Deeper AI Synthesis' button uses a grounded, no-jargon AI to weave a longer interpretation.",
  },
];

const SpreadInterpreter = () => {
  const [spreadType, setSpreadType] = useState<SpreadType>("three-card");
  const [slots, setSlots] = useState<Slot[]>(() => makeSlots("three-card"));
  const [question, setQuestion] = useState("");
  const [aiReading, setAiReading] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);

  const local = useMemo(() => buildLocalSynthesis(slots, question), [slots, question]);
  const ready = selectedCards(slots).length === slots.length;

  function changeSpread(type: SpreadType) {
    setSpreadType(type);
    setSlots(makeSlots(type));
    setAiReading("");
  }

  function updateSlot(i: number, patch: Partial<Slot>) {
    setSlots((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
    setAiReading("");
  }

  function addSlot() {
    setSlots((prev) => [...prev, { position: `Position ${prev.length + 1}`, cardId: null, reversed: false }]);
  }

  function removeSlot(i: number) {
    setSlots((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function fetchAiSynthesis() {
    if (!ready) {
      toast({ title: "Pick a card for every position first." });
      return;
    }
    setLoadingAi(true);
    try {
      const cards = selectedCards(slots).map(({ slot, card }) => ({
        name: card.name,
        orientation: slot.reversed ? "reversed" : "upright",
        position: slot.position,
        meaning: slot.reversed ? card.meaning_rev : card.meaning_up,
      }));

      const { data, error } = await supabase.functions.invoke("divination-reading", {
        body: {
          question: question.trim() || "What does this spread reveal about my situation?",
          type: "spread-synthesis",
          spreadType,
          cards,
        },
      });

      if (error || data?.error) throw new Error(data?.error || error?.message || "Unknown error");
      setAiReading(data?.reading || "");
    } catch (e) {
      toast({
        title: "Couldn't reach the AI right now.",
        description: "The instant synthesis above is still accurate — try the AI again in a moment.",
      });
    } finally {
      setLoadingAi(false);
    }
  }

  const jsonLd = [
    { "@context": "https://schema.org", ...generateBreadcrumbJsonLd([{ label: "Spread Interpretation", href: "/tarot-spread-interpretation" }, { label: "Spread Interpreter" }]) },
    { "@context": "https://schema.org", ...generateFAQJsonLd(FAQS) },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Tarot Spread Interpreter",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      url: `${SITE_URL}/what-does-my-spread-mean`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ];

  return (
    <>
      <SEOHead
        title="What Does My Tarot Spread Mean? — Free Interpreter"
        description="Enter the cards you drew, the positions, and your question. Get an instant spread synthesis plus an optional grounded AI interpretation. No jargon."
        canonicalPath="/what-does-my-spread-mean"
        jsonLd={jsonLd}
      />
      <motion.main
        className="max-w-3xl mx-auto pt-6 px-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Breadcrumbs
          items={[
            { label: "Tarot Guide", href: "/tarot-guide" },
            { label: "Spread Interpretation", href: "/tarot-spread-interpretation" },
            { label: "Spread Interpreter" },
          ]}
        />

        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-3 tracking-wide leading-tight">
          What Does My Tarot Spread Mean?
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
          Enter the cards you drew, mark reversals, and write the question you asked. You get an instant
          synthesis from the cards themselves, plus an optional deeper read.
        </p>

        <SnippetBox
          question="How do I figure out what my tarot spread means?"
          answer="Read each card in its position first, then look for repeating suits, Major Arcana, and reversals. Treat the cards as one story — start with the present or root card, follow the spread across to the outcome, and let the cards in the middle explain how you get from one end to the other."
        />

        {/* Inputs */}
        <section className="reading-panel rounded-xl p-5 md:p-6 mb-6 space-y-5">
          <div>
            <label className="block text-xs font-heading text-foreground mb-2 uppercase tracking-wider">Spread</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(["single", "three-card", "celtic-cross", "custom"] as SpreadType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => changeSpread(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-heading border transition-colors ${
                    spreadType === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-primary/20 text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {t === "single" ? "Single" : t === "three-card" ? "Three Card" : t === "celtic-cross" ? "Celtic Cross" : "Custom"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading text-foreground mb-2 uppercase tracking-wider">
              Your Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, 300))}
              placeholder="e.g. What do I need to know about the job offer?"
              rows={2}
              className="w-full rounded-lg bg-background/40 border border-primary/20 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-heading text-foreground uppercase tracking-wider">
              Cards
            </label>
            {slots.map((slot, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                {spreadType === "custom" ? (
                  <input
                    type="text"
                    value={slot.position}
                    onChange={(e) => updateSlot(i, { position: e.target.value })}
                    className="col-span-4 rounded-lg bg-background/40 border border-primary/20 px-2 py-2 text-xs text-foreground"
                  />
                ) : (
                  <span className="col-span-4 text-xs text-muted-foreground truncate">{slot.position}</span>
                )}
                <select
                  value={slot.cardId ?? ""}
                  onChange={(e) => updateSlot(i, { cardId: e.target.value ? Number(e.target.value) : null })}
                  className="col-span-6 rounded-lg bg-background/40 border border-primary/20 px-2 py-2 text-xs text-foreground"
                >
                  <option value="">— pick a card —</option>
                  {tarotDeck.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <label className="col-span-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={slot.reversed}
                    onChange={(e) => updateSlot(i, { reversed: e.target.checked })}
                    className="accent-primary"
                  />
                  Rev
                </label>
                {spreadType === "custom" && slots.length > 1 && (
                  <button
                    onClick={() => removeSlot(i)}
                    className="col-span-12 text-[10px] text-muted-foreground/70 hover:text-primary text-right"
                  >
                    remove
                  </button>
                )}
              </div>
            ))}
            {spreadType === "custom" && (
              <button
                onClick={addSlot}
                className="text-xs text-primary hover:underline"
              >
                + add another position
              </button>
            )}
          </div>
        </section>

        {/* Instant synthesis */}
        {local && (
          <section className="reading-panel rounded-xl p-5 md:p-6 mb-6 border-l-4 border-primary/40">
            <h2 className="font-heading text-base md:text-lg text-foreground mb-3">Instant Synthesis</h2>
            <div className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed [&_strong]:text-foreground [&_h2]:font-heading [&_h2]:text-foreground [&_h2]:text-sm [&_h2]:mt-4">
              <ReactMarkdown>{local}</ReactMarkdown>
            </div>
          </section>
        )}

        {/* AI synthesis */}
        <div className="text-center mb-6">
          <button
            onClick={fetchAiSynthesis}
            disabled={loadingAi || !ready}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loadingAi ? "Reading the spread…" : aiReading ? "Re-read with AI" : "Deeper AI Synthesis"}
          </button>
          {!ready && (
            <p className="text-[10px] text-muted-foreground/60 mt-2">Pick a card for every position to unlock.</p>
          )}
        </div>

        {aiReading && (
          <section className="reading-panel rounded-xl p-5 md:p-6 mb-8 border-l-4 border-primary/60">
            <h2 className="font-heading text-base md:text-lg text-foreground mb-3">Deeper Synthesis</h2>
            <div className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed [&_strong]:text-foreground">
              <ReactMarkdown>{aiReading}</ReactMarkdown>
            </div>
          </section>
        )}

        <FAQSection items={FAQS} />

        <InternalLinks
          links={[
            { to: "/tarot-spread-interpretation", label: "Spread Interpretation Hub" },
            { to: "/how-to-read-tarot-spreads", label: "How to Read a Spread" },
            { to: "/why-my-tarot-spread-doesnt-make-sense", label: "Why My Spread Doesn't Make Sense" },
            { to: "/tarot-spreads", label: "All Spreads" },
          ]}
        />
      </motion.main>
    </>
  );
};

export default SpreadInterpreter;
