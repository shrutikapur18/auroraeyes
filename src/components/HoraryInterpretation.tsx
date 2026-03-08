import { motion } from "framer-motion";
import type { HoraryChartData } from "@/lib/horaryAstrology";
import { ZODIAC_SYMBOLS, ZODIAC_SIGNS, PLANET_SYMBOLS, HORARY_HOUSES_MEANINGS, formatDegree } from "@/lib/horaryAstrology";

interface HoraryInterpretationProps {
  question: string;
  chartData: HoraryChartData;
  interpretation: string;
  timestamp: string;
}

const HoraryInterpretation = ({ question, chartData, interpretation, timestamp }: HoraryInterpretationProps) => {
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
        <p className="text-foreground/90 italic font-body">"{question}"</p>
        <p className="text-[10px] text-muted-foreground mt-2">Chart cast: {new Date(timestamp).toLocaleString()}</p>
      </div>

      {/* Key chart info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Ascendant", value: chartData.ascendantSign },
          { label: "Moon", value: chartData.moonSign },
          { label: "Moon Phase", value: chartData.moonPhase },
          { label: "Planets", value: `${chartData.planets.length} bodies` },
        ].map((item) => (
          <div key={item.label} className="bg-card/30 border border-border/20 rounded-lg p-3 text-center">
            <p className="text-[10px] text-muted-foreground font-heading tracking-wider">{item.label}</p>
            <p className="text-sm text-primary font-heading mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* AI Interpretation */}
      <div className="bg-gradient-to-b from-card/60 to-card/30 border border-primary/20 rounded-xl p-6">
        <h3 className="font-heading text-primary tracking-wider text-sm mb-4">✦ HORARY INTERPRETATION</h3>
        <div className="prose prose-sm prose-invert max-w-none">
          {interpretation.split("\n").map((para, i) => (
            para.trim() ? (
              <p key={i} className="text-foreground/85 font-body text-sm leading-relaxed mb-3">
                {para}
              </p>
            ) : null
          ))}
        </div>
      </div>

      {/* Planetary positions table */}
      <div className="bg-card/30 border border-border/20 rounded-xl p-5">
        <h3 className="font-heading text-primary tracking-wider text-xs mb-3">PLANETARY POSITIONS</h3>
        <div className="space-y-1.5">
          {chartData.planets.filter(p => !["Ascendant", "Midheaven", "North Node", "South Node"].includes(p.name)).map((planet) => (
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

      {/* Disclaimer */}
      <p className="text-[10px] text-muted-foreground/60 text-center">
        Horary astrology reading for entertainment and spiritual guidance. Planetary data via FreeAstrologyAPI.
      </p>
    </motion.div>
  );
};

export default HoraryInterpretation;
