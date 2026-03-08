import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import StarBackground from "./StarBackground";
import FloatingParticles from "./FloatingParticles";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/free-tarot-reading", label: "Tarot" },
  { to: "/yes-no-tarot-reading", label: "Yes/No" },
  { to: "/pick-a-card-reading", label: "Pick a Card" },
  { to: "/rune-reading", label: "Runes" },
  { to: "/angel-card-reading", label: "Angel Cards" },
  { to: "/daily-tarot-card", label: "Daily" },
  { to: "/tarot-card-meanings", label: "Meanings" },
  { to: "/blog", label: "Blog" },
];

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarBackground />

      {/* Navigation */}
      <nav className="relative z-20 border-b border-border/30 bg-background/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-heading text-lg md:text-xl gold-text tracking-wider">
              ✦ Mystic Divination
            </Link>
            <div className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-2 md:px-3 py-1.5 rounded-md text-[10px] md:text-xs font-heading tracking-wider whitespace-nowrap transition-all ${
                    location.pathname === link.to || location.pathname.startsWith(link.to + "/")
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 px-4 pb-20">
        {children}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 bg-background/60 backdrop-blur-md py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h3 className="font-heading text-sm gold-text mb-3">Readings</h3>
              <div className="space-y-2">
                <Link to="/free-tarot-reading" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Free Tarot Reading</Link>
                <Link to="/yes-no-tarot-reading" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Yes/No Tarot</Link>
                <Link to="/pick-a-card-reading" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Pick a Card</Link>
                <Link to="/rune-reading" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Rune Reading</Link>
                <Link to="/angel-card-reading" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Angel Card Reading</Link>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-sm gold-text mb-3">Daily</h3>
              <div className="space-y-2">
                <Link to="/daily-tarot-card" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Daily Tarot Card</Link>
                <Link to="/daily-rune" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Daily Rune</Link>
                <Link to="/daily-angel-message" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Daily Angel Message</Link>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-sm gold-text mb-3">Learn</h3>
              <div className="space-y-2">
                <Link to="/tarot-card-meanings" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Tarot Card Meanings</Link>
                <Link to="/rune-meanings" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Rune Meanings</Link>
                <Link to="/blog" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Blog & Articles</Link>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-sm gold-text mb-3">Zodiac</h3>
              <div className="space-y-2">
                {["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo"].map((z) => (
                  <Link key={z} to={`/zodiac/${z.toLowerCase()}-tarot-reading`} className="block text-xs text-muted-foreground hover:text-primary transition-colors">{z} Tarot</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border/20 pt-6 text-center">
            <p className="font-heading text-xs gold-text mb-1">✦ Mystic Divination ✦</p>
            <p className="text-[10px] text-muted-foreground">For entertainment and spiritual guidance purposes. © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <FloatingParticles count={12} color="gold" />
      </div>
    </div>
  );
};

export default SiteLayout;
