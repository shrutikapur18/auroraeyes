import { Link } from "react-router-dom";
import { getRecentReadings } from "@/lib/dailyReading";

const RecentReadings = () => {
  const recent = getRecentReadings(7);

  return (
    <section className="max-w-4xl mx-auto mt-10 mb-6 px-1">
      <h2 className="font-heading text-lg md:text-xl gold-text text-center mb-4">Recent Daily Readings</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {recent.map((r) => (
          <Link
            key={r.dateSlug}
            to={`/daily-tarot/${r.dateSlug}`}
            className="reading-panel rounded-lg p-3 text-center hover:gold-glow transition-all group"
          >
            <span className="text-2xl block mb-1">{r.card.symbol || "🃏"}</span>
            <span className="text-[10px] font-heading text-foreground group-hover:text-primary transition-colors leading-tight block">
              {r.card.name}
            </span>
            <span className="text-[9px] text-muted-foreground block mt-0.5">
              {r.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </Link>
        ))}
      </div>
      <div className="text-center mt-3">
        <Link to="/tarot-reading-archive" className="text-xs text-primary/70 hover:text-primary font-heading tracking-wider transition-colors">
          View Full Archive →
        </Link>
      </div>
    </section>
  );
};

export default RecentReadings;
