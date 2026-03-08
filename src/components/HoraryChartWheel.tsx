import { motion } from "framer-motion";
import type { HoraryChartData } from "@/lib/horaryAstrology";
import { ZODIAC_SYMBOLS, PLANET_SYMBOLS, ZODIAC_SIGNS } from "@/lib/horaryAstrology";

interface HoraryChartWheelProps {
  chartData: HoraryChartData;
}

const SIZE = 400;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 180;
const SIGN_R = 160;
const INNER_R = 140;
const HOUSE_R = 100;
const PLANET_R = 115;

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const HoraryChartWheel = ({ chartData }: HoraryChartWheelProps) => {
  // If we have an SVG chart from the API, render it
  if (chartData.svgChart) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
        dangerouslySetInnerHTML={{ __html: chartData.svgChart }}
      />
    );
  }

  // Fallback: render our own SVG chart
  const ascDegree = chartData.houses[0]?.degree || 0;

  // Rotate so Ascendant is on the left (180°)
  const rotateAngle = 180 - ascDegree;

  const getChartAngle = (degree: number) => degree + rotateAngle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex justify-center"
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[400px] drop-shadow-2xl"
      >
        <defs>
          <radialGradient id="chartBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(250,25%,16%)" />
            <stop offset="100%" stopColor="hsl(250,30%,8%)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill="url(#chartBg)" stroke="hsl(45,80%,55%)" strokeWidth="1.5" opacity="0.9" />
        <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke="hsl(45,80%,55%)" strokeWidth="0.5" opacity="0.4" />
        <circle cx={CX} cy={CY} r={HOUSE_R} fill="none" stroke="hsl(45,80%,55%)" strokeWidth="0.3" opacity="0.3" />

        {/* Zodiac sign divisions (30° each) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = getChartAngle(i * 30);
          const p1 = polarToXY(CX, CY, INNER_R, angle);
          const p2 = polarToXY(CX, CY, OUTER_R, angle);
          const labelPos = polarToXY(CX, CY, SIGN_R, angle + 15);
          return (
            <g key={`sign-${i}`}>
              <line
                x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke="hsl(45,80%,55%)" strokeWidth="0.5" opacity="0.3"
              />
              <text
                x={labelPos.x} y={labelPos.y}
                textAnchor="middle" dominantBaseline="middle"
                fill="hsl(45,70%,70%)" fontSize="14" opacity="0.7"
              >
                {ZODIAC_SYMBOLS[i]}
              </text>
            </g>
          );
        })}

        {/* House cusps */}
        {chartData.houses.map((house, i) => {
          const angle = getChartAngle(house.degree);
          const p1 = polarToXY(CX, CY, HOUSE_R - 15, angle);
          const p2 = polarToXY(CX, CY, INNER_R, angle);
          const labelPos = polarToXY(CX, CY, HOUSE_R - 25, angle + (i < chartData.houses.length - 1
            ? ((chartData.houses[i + 1]?.degree || house.degree + 30) - house.degree) / 2
            : 15));
          const isAngular = [0, 3, 6, 9].includes(i);
          return (
            <g key={`house-${i}`}>
              <line
                x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={isAngular ? "hsl(45,80%,55%)" : "hsl(265,30%,40%)"}
                strokeWidth={isAngular ? "1.5" : "0.5"}
                opacity={isAngular ? 0.8 : 0.4}
              />
              <text
                x={labelPos.x} y={labelPos.y}
                textAnchor="middle" dominantBaseline="middle"
                fill="hsl(250,15%,55%)" fontSize="9" fontWeight={isAngular ? "bold" : "normal"}
              >
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* Planets */}
        {chartData.planets.map((planet) => {
          const symbol = PLANET_SYMBOLS[planet.name] || planet.name.slice(0, 2);
          const angle = getChartAngle(planet.fullDegree);
          const pos = polarToXY(CX, CY, PLANET_R, angle);
          const isMajor = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"].includes(planet.name);

          return (
            <g key={planet.name} filter={isMajor ? "url(#glow)" : undefined}>
              <circle cx={pos.x} cy={pos.y} r="10" fill="hsl(250,25%,12%)" stroke="hsl(45,80%,55%)" strokeWidth="0.5" opacity="0.8" />
              <text
                x={pos.x} y={pos.y}
                textAnchor="middle" dominantBaseline="middle"
                fill={planet.isRetro ? "hsl(0,70%,60%)" : "hsl(45,80%,65%)"}
                fontSize={isMajor ? "11" : "9"}
                fontWeight="bold"
              >
                {symbol}
              </text>
              {planet.isRetro && (
                <text
                  x={pos.x + 8} y={pos.y - 8}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="hsl(0,70%,60%)" fontSize="7"
                >
                  ℞
                </text>
              )}
            </g>
          );
        })}

        {/* Ascendant arrow */}
        {chartData.houses[0] && (() => {
          const angle = getChartAngle(chartData.houses[0].degree);
          const tip = polarToXY(CX, CY, OUTER_R + 8, angle);
          return (
            <text
              x={tip.x} y={tip.y}
              textAnchor="middle" dominantBaseline="middle"
              fill="hsl(45,80%,55%)" fontSize="10" fontWeight="bold"
            >
              ASC
            </text>
          );
        })()}

        {/* Center label */}
        <text x={CX} y={CY - 5} textAnchor="middle" fill="hsl(45,80%,55%)" fontSize="8" fontWeight="bold" opacity="0.6">
          HORARY
        </text>
        <text x={CX} y={CY + 7} textAnchor="middle" fill="hsl(45,70%,70%)" fontSize="7" opacity="0.4">
          CHART
        </text>

        {/* Aspect lines (major only) */}
        {chartData.aspects.slice(0, 8).map((aspect, i) => {
          const p1 = chartData.planets.find(p => p.name === aspect.planet1);
          const p2 = chartData.planets.find(p => p.name === aspect.planet2);
          if (!p1 || !p2) return null;
          const pos1 = polarToXY(CX, CY, HOUSE_R - 5, getChartAngle(p1.fullDegree));
          const pos2 = polarToXY(CX, CY, HOUSE_R - 5, getChartAngle(p2.fullDegree));

          const color = aspect.type === "Conjunction" ? "hsl(45,80%,55%)"
            : aspect.type === "Opposition" ? "hsl(0,70%,50%)"
            : aspect.type === "Trine" ? "hsl(120,50%,50%)"
            : aspect.type === "Square" ? "hsl(0,50%,40%)"
            : "hsl(210,50%,50%)";

          return (
            <line
              key={`aspect-${i}`}
              x1={pos1.x} y1={pos1.y} x2={pos2.x} y2={pos2.y}
              stroke={color} strokeWidth="0.7" opacity="0.4"
              strokeDasharray={aspect.type === "Opposition" ? "4,2" : undefined}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};

export default HoraryChartWheel;
