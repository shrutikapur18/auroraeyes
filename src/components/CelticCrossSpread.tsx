import { motion } from "framer-motion";
import TarotCardComponent from "./TarotCardComponent";
import type { DrawnCard } from "@/data/tarotDeck";
import { celticCrossPositions } from "@/data/tarotDeck";

interface CelticCrossSpreadProps {
  cards: DrawnCard[];
  onReveal: (index: number) => void;
}

const CelticCrossSpread = ({ cards, onReveal }: CelticCrossSpreadProps) => {
  const allRevealed = cards.every((c) => c.isRevealed);

  return (
    <div className="relative z-10">
      {!allRevealed && (
        <motion.p
          className="text-center text-sm text-muted-foreground mb-6 font-body italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Reveal each card to uncover the Celtic Cross reading.
        </motion.p>
      )}

      {/* Mobile: simple grid. Desktop: Celtic Cross layout */}
      <div className="block md:hidden">
        <div className="flex flex-wrap justify-center gap-3">
          {cards.map((dc, i) => (
            <TarotCardComponent
              key={i}
              drawnCard={{ ...dc, position: celticCrossPositions[i] }}
              index={i}
              onReveal={onReveal}
              rotation={(Math.random() - 0.5) * 6}
              label={celticCrossPositions[i]}
              compact
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="relative w-[700px] h-[520px] mx-auto">
          {/* Cross center: card 0 */}
          <div className="absolute" style={{ left: 220, top: 180 }}>
            <TarotCardComponent drawnCard={{ ...cards[0], position: celticCrossPositions[0] }} index={0} onReveal={onReveal} label="Present" compact />
          </div>
          {/* Challenge: card 1, rotated across */}
          <div className="absolute" style={{ left: 245, top: 180 }}>
            <TarotCardComponent drawnCard={{ ...cards[1], position: celticCrossPositions[1] }} index={1} onReveal={onReveal} rotation={90} label="Challenge" compact />
          </div>
          {/* Above: card 4 */}
          <div className="absolute" style={{ left: 220, top: 20 }}>
            <TarotCardComponent drawnCard={{ ...cards[4], position: celticCrossPositions[4] }} index={4} onReveal={onReveal} label="Conscious" compact />
          </div>
          {/* Below: card 5 */}
          <div className="absolute" style={{ left: 220, top: 350 }}>
            <TarotCardComponent drawnCard={{ ...cards[5], position: celticCrossPositions[5] }} index={5} onReveal={onReveal} label="Subconscious" compact />
          </div>
          {/* Left: card 2 (past) */}
          <div className="absolute" style={{ left: 60, top: 180 }}>
            <TarotCardComponent drawnCard={{ ...cards[2], position: celticCrossPositions[2] }} index={2} onReveal={onReveal} label="Past" compact />
          </div>
          {/* Right: card 3 (future) */}
          <div className="absolute" style={{ left: 390, top: 180 }}>
            <TarotCardComponent drawnCard={{ ...cards[3], position: celticCrossPositions[3] }} index={3} onReveal={onReveal} label="Future" compact />
          </div>
          {/* Right column: cards 6-9 */}
          {[6, 7, 8, 9].map((idx, col) => (
            <div key={idx} className="absolute" style={{ left: 560, top: 350 - col * 110 }}>
              <TarotCardComponent drawnCard={{ ...cards[idx], position: celticCrossPositions[idx] }} index={idx} onReveal={onReveal} label={celticCrossPositions[idx]} compact />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CelticCrossSpread;
