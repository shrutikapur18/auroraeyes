import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRecentReadings } from "@/lib/dailyReading";
import tarotCardImage from "@/assets/tarot-card-back.jpg";

const RecentReadings = () => {
  const recent = getRecentReadings(7);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <section className="max-w-5xl lg:max-w-6xl mx-auto mt-10 mb-6 px-2">
      <h2 className="font-heading text-lg md:text-xl gold-text text-center mb-6">Recent Daily Readings</h2>
      
      <div className="relative group/scroll">
        {/* Scroll arrows */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/40 transition-all opacity-0 group-hover/scroll:opacity-100 -translate-x-1/2"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/40 transition-all opacity-0 group-hover/scroll:opacity-100 translate-x-1/2"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {recent.map((r, i) => (
            <Link
              key={r.dateSlug}
              to={`/daily-tarot/${r.dateSlug}`}
              className="flex-shrink-0 snap-center group"
            >
              <motion.div
                className="relative w-24 md:w-28 lg:w-32 overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.08, y: -6, rotateZ: 0 }}
                style={{ transform: `rotate(${(i % 2 === 0 ? -2 : 2)}deg)` }}
              >
                {/* Card thumbnail */}
                <div className="aspect-[2/3] relative overflow-hidden rounded-lg ring-1 ring-primary/10 group-hover:ring-primary/30 transition-all duration-500 shadow-lg shadow-black/40 group-hover:shadow-[0_8px_30px_hsl(43_70%_65%/0.15)]">
                  <img
                    src={r.card.image || tarotCardImage}
                    alt={r.card.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                  
                  {/* Card name at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <span className="text-[9px] md:text-[10px] font-heading text-white/90 group-hover:text-primary transition-colors leading-tight block text-center drop-shadow-lg">
                      {r.card.name}
                    </span>
                    <span className="text-[8px] text-white/40 block mt-0.5 text-center">
                      {r.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/tarot-reading-archive" className="text-xs text-primary/50 hover:text-primary font-heading tracking-wider transition-colors">
          View Full Archive
        </Link>
      </div>
    </section>
  );
};

export default RecentReadings;
