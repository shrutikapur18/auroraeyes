import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { HoraryChartData } from "@/lib/horaryAstrology";
import { ZODIAC_SYMBOLS, PLANET_SYMBOLS, formatDegree } from "@/lib/horaryAstrology";

interface HoraryInterpretationProps {
  question: string;
  chartData: HoraryChartData;
  interpretation: string;
  timestamp: string;
}

/** Try to split the AI interpretation into labeled sections */
function parseInterpretationSections(text: string) {
  // Try splitting on markdown-style headers (## or **Header**)
  const sectionRegex = /(?:^|\n)(?:#{1,3}\s*|[\*]{2})(.+?)(?:[\*]{2})?\s*\n/g;
  const parts: { title: string; body: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const matches: { title: string; start: number; end: number }[] = [];

  while ((match = sectionRegex.exec(text)) !== null) {
    matches.push({ title: match[1].trim(), start: match.index, end: match.index + match[0].length });
  }

  if (matches.length >= 3) {
    // We have structured sections
    const preamble = text.slice(0, matches[0].start).trim();
    if (preamble) parts.push({ title: "Overview", body: preamble });

    matches.forEach((m, i) => {
      const bodyEnd = i < matches.length - 1 ? matches[i + 1].start : text.length;
      const body = text.slice(m.end, bodyEnd).trim();
      if (body) parts.push({ title: m.title, body });
    });
    return parts;
  }

  // Fallback: split into paragraphs and assign default section names
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
  const defaultTitles = [
    "Chart Overview",
    "Significators of the Question",
    "Aspect Analysis",
    "Moon Analysis",
    "Final Judgment",
  ];

  paragraphs.forEach((para, i) => {
    parts.push({
      title: defaultTitles[i] || `Insight ${i + 1}`,
      body: para.trim(),
    });
  });

  return parts;
}

const SectionAccordion = ({ title, body, index, defaultOpen }: { title: string; body: string; index: number; defaultOpen: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="border border-border/20 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-card/40 transition-colors"
      >
        <span className="font-heading text-xs text-primary tracking-wider uppercase">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pb-4">
              {body.split("\n").map((line, i) =>
                line.trim() ? (
                  <p key={i} className="text-foreground/80 font-body text-sm leading-relaxed mb-2">
                    {line}
                  </p>
                ) : null
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HoraryInterpretation = ({ question, chartData, interpretation, timestamp }: HoraryInterpretationProps) => {
  const sections = parseInterpretationSections(interpretation);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Question recap */}
      <div className="bg-card/40 border border-border/30 rounded-xl p-5">
        <p className="text-xs text-muted-foreground font-heading tracking-wider mb-1">YOUR QUESTION</p>
        <p className="text-foreground/90 italic font-body text-base">"{question}"</p>
        <p className="text-[10px] text-muted-foreground mt-2">
          Chart cast: {new Date(timestamp).toLocaleString()}
        </p>
      </div>

      {/* Key significators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Ascendant", value: chartData.ascendantSign, desc: "Your significator" },
          { label: "Moon", value: chartData.moonSign, desc: "How things unfold" },
          { label: "Moon Phase", value: chartData.moonPhase, desc: "Timing indicator" },
          { label: "Key Planets", value: `${chartData.planets.filter(p => !["North Node", "South Node", "Ascendant", "Midheaven"].includes(p.name)).length} bodies`, desc: "Active influences" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
            className="bg-card/30 border border-border/20 rounded-lg p-3 text-center"
          >
            <p className="text-[10px] text-muted-foreground font-heading tracking-wider">{item.label}</p>
            <p className="text-sm text-primary font-heading mt-1">{item.value}</p>
            <p className="text-[9px] text-muted-foreground/60 mt-0.5">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Structured interpretation */}
      <div className="bg-gradient-to-b from-card/60 to-card/30 border border-primary/20 rounded-xl p-5 space-y-2">
        <h3 className="font-heading text-primary tracking-wider text-sm mb-3">✦ HORARY INTERPRETATION</h3>
        {sections.map((section, i) => (
          <SectionAccordion
            key={i}
            title={section.title}
            body={section.body}
            index={i}
            defaultOpen={i === 0 || i === sections.length - 1}
          />
        ))}
      </div>

      {/* Expandable technical details */}
      <div className="space-y-3">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground/60 font-heading tracking-wider hover:text-muted-foreground transition-colors"
        >
          {showDetails ? "Hide" : "Show"} Chart Details
          <ChevronDown className={`w-3 h-3 transition-transform ${showDetails ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4 overflow-hidden"
            >
              {/* Planetary positions table */}
              <div className="bg-card/30 border border-border/20 rounded-xl p-5">
                <h3 className="font-heading text-primary tracking-wider text-xs mb-3">PLANETARY POSITIONS</h3>
                <div className="space-y-1.5">
                  {chartData.planets
                    .filter((p) => !["Ascendant", "Midheaven", "North Node", "South Node"].includes(p.name))
                    .map((planet) => (
                      <div key={planet.name} className="flex items-center justify-between text-xs py-1 border-b border-border/10">
                        <span className="flex items-center gap-2 text-foreground/80 font-body">
                          <span className="text-primary text-sm">{PLANET_SYMBOLS[planet.name] || "•"}</span>
                          {planet.name}
                          {planet.isRetro && <span className="text-destructive text-[10px]">℞</span>}
                        </span>
                        <span className="text-muted-foreground font-body">
                          {formatDegree(planet.fullDegree)} · House {planet.house}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* House cusps */}
              <div className="bg-card/30 border border-border/20 rounded-xl p-5">
                <h3 className="font-heading text-primary tracking-wider text-xs mb-3">HOUSE CUSPS</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {chartData.houses.map((house) => (
                    <div key={house.house} className="flex items-center gap-2 text-xs py-1">
                      <span className="text-primary font-heading w-6">{house.house}</span>
                      <span className="text-foreground/70 font-body">
                        {ZODIAC_SYMBOLS[house.signNumber - 1]} {house.sign} {Math.floor(house.degree % 30)}°
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-muted-foreground/60 text-center">
        Horary astrology reading for entertainment and spiritual guidance. Planetary data via FreeAstrologyAPI.
      </p>
    </motion.div>
  );
};

export default HoraryInterpretation;
