import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { elderFuthark } from "@/data/runes";

const RuneMeanings = () => (
  <>
    <SEOHead title="All Elder Futhark Rune Meanings" description="Complete guide to the 24 Elder Futhark rune meanings. Learn the symbolism, divination interpretations, and ancient wisdom of each rune." canonicalPath="/rune-meanings" />
    <motion.header className="text-center pt-8 pb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl md:text-5xl font-heading gold-text mb-3 tracking-wider">Rune Meanings</h1>
      <p className="text-base text-muted-foreground font-body max-w-2xl mx-auto">Explore the 24 runes of the Elder Futhark — ancient symbols of Norse wisdom and divination.</p>
    </motion.header>
    <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {elderFuthark.map((r) => (
        <Link key={r.id} to={`/rune-meanings/${r.name.toLowerCase()}`} className="reading-panel rounded-xl p-5 hover:gold-glow transition-all text-center group">
          <span className="text-3xl text-primary block mb-2 group-hover:scale-110 transition-transform">{r.symbol}</span>
          <span className="font-heading text-sm text-foreground block">{r.name}</span>
          <span className="text-[10px] text-muted-foreground block mt-1">{r.keywords.join(", ")}</span>
        </Link>
      ))}
    </div>
    <div className="text-center py-10"><Link to="/rune-reading" className="text-sm text-primary hover:underline font-heading">Cast the Runes →</Link></div>
  </>
);

export default RuneMeanings;
