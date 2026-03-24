import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReadingCTA from "@/components/ReadingCTA";
import { getRecentReadings, dateToSlug } from "@/lib/dailyReading";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const TarotReadingArchive = () => {
  const readings = useMemo(() => getRecentReadings(90), []);

  // Group by month
  const grouped = useMemo(() => {
    const map = new Map<string, typeof readings>();
    readings.forEach(r => {
      const key = `${r.date.toLocaleString("en-US", { month: "long" })} ${r.date.getFullYear()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    });
    return Array.from(map.entries());
  }, [readings]);

  return (
    <>
      <SEOHead
        title="Daily Tarot Reading Archive — Past Readings"
        description="Browse past daily tarot readings. See which card was drawn each day and explore the guidance and interpretations from previous dates."
        canonicalPath="/tarot-reading-archive"
      />
      <motion.div className="max-w-4xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={[{ label: "Daily Tarot", href: "/daily-tarot-reading" }, { label: "Archive" }]} />

        <header className="text-center mb-8">
          <h1 className="font-heading text-2xl md:text-4xl gold-text mb-3 tracking-wider">Daily Tarot Reading Archive</h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Browse the past 90 days of daily tarot readings. Each day's card was cosmically assigned and carries unique guidance.
          </p>
        </header>

        {/* Today's highlight */}
        {readings[0] && (
          <Link
            to="/daily-tarot-reading"
            className="reading-panel rounded-xl p-5 mb-8 flex items-center gap-4 hover:gold-glow transition-all group block"
          >
            <div className={`w-14 h-[84px] rounded overflow-hidden border border-primary/15 shrink-0 ${readings[0].isReversed ? "rotate-180" : ""}`}>
              <img src={readings[0].card.image} alt={readings[0].card.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <p className="text-[10px] text-primary font-heading uppercase tracking-wider">Today's Card</p>
              <p className="font-heading text-foreground group-hover:text-primary transition-colors">
                {readings[0].card.name} {readings[0].isReversed && "(Reversed)"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{readings[0].dateLabel}</p>
            </div>
          </Link>
        )}

        {/* Monthly groups */}
        {grouped.map(([month, items]) => (
          <section key={month} className="mb-8">
            <h2 className="font-heading text-base text-foreground mb-3 border-b border-primary/10 pb-2">{month}</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {items.map(r => {
                const isToday = dateToSlug(new Date()) === r.dateSlug;
                return (
                  <Link
                    key={r.dateSlug}
                    to={isToday ? "/daily-tarot-reading" : `/daily-tarot/${r.dateSlug}`}
                    className="reading-panel rounded-lg p-3 hover:gold-glow transition-all group flex items-center gap-3"
                  >
                    <span className={`text-2xl shrink-0 ${r.isReversed ? "rotate-180 inline-block" : ""}`}>{r.card.symbol}</span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{r.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                      <p className="text-sm font-heading text-foreground group-hover:text-primary transition-colors truncate">
                        {r.card.name} {r.isReversed && <span className="text-muted-foreground text-[10px]">(Rev)</span>}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <ReadingCTA
          title="Get a Personalized Reading"
          description="The daily card reveals universal energy. For guidance specific to your question, try a full reading."
        />
      </motion.div>
    </>
  );
};

export default TarotReadingArchive;
