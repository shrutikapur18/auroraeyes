import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Layers, Scale, Hexagon, Feather, Calendar, Compass, Sun, BookOpen, FileText, Home } from "lucide-react";
import CosmicBackground from "./CosmicBackground";

const navLinks = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/free-tarot-reading", label: "Tarot", Icon: Layers },
  { to: "/yes-no-tarot-reading", label: "Yes/No", Icon: Scale },
  { to: "/pick-a-card-reading", label: "Pick a Card", Icon: Sparkles },
  { to: "/rune-reading", label: "Runes", Icon: Hexagon },
  { to: "/angel-card-reading", label: "Angel Cards", Icon: Feather },
  { to: "/daily-tarot-reading", label: "Today", Icon: Calendar },
  { to: "/horary-reading", label: "Horary", Icon: Compass },
  { to: "/daily-tarot-card", label: "Daily Draw", Icon: Sun },
  { to: "/tarot-card-meanings", label: "Meanings", Icon: BookOpen },
  { to: "/blog", label: "Blog", Icon: FileText },
];

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarBackground theme={getBackgroundTheme()} />

      {/* Navigation */}
      <nav className="relative z-30 border-b border-border/30 bg-background/80 backdrop-blur-lg sticky top-0">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-heading text-lg md:text-xl gold-text tracking-wider flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Sparkles className="w-5 h-5 text-primary icon-glow" />
              Mystic Divination
            </Link>

            {/* Desktop nav — improved spacing and sizing */}
            <div className="hidden md:flex gap-1 lg:gap-2">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-heading tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    location.pathname === link.to || location.pathname.startsWith(link.to + "/")
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <link.Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-lg text-primary hover:bg-muted/30 transition-colors active:scale-95"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                className="fixed top-0 right-0 h-full w-72 bg-card/95 backdrop-blur-xl border-l border-border/30 z-50 md:hidden overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center justify-between p-4 border-b border-border/30">
                  <span className="font-heading text-sm gold-text tracking-wider">Navigate</span>
                  <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg text-muted-foreground hover:text-primary">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-3 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-heading tracking-wider transition-all active:scale-[0.98] ${
                        location.pathname === link.to
                          ? "bg-primary/15 text-primary border border-primary/20 gold-glow"
                          : "text-foreground/80 hover:bg-muted/30 hover:text-primary"
                      }`}
                    >
                      <link.Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <div className="relative z-10 px-4 lg:px-8 pb-20 max-w-[1400px] mx-auto">
        {children}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 bg-background/60 backdrop-blur-md py-12 lg:py-16 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-10">
            <div>
              <h3 className="font-heading text-sm lg:text-base gold-text mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Readings
              </h3>
              <div className="space-y-2.5 lg:space-y-3">
                <Link to="/free-tarot-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Free Tarot Reading</Link>
                <Link to="/yes-no-tarot-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Yes/No Tarot</Link>
                <Link to="/pick-a-card-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Pick a Card</Link>
                <Link to="/rune-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Rune Reading</Link>
                <Link to="/angel-card-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Angel Card Reading</Link>
                <Link to="/horary-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Horary Astrology</Link>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-sm lg:text-base gold-text mb-4 flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Daily
              </h3>
              <div className="space-y-2.5 lg:space-y-3">
                <Link to="/daily-tarot-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Today's Tarot Reading</Link>
                <Link to="/tarot-reading-archive" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Reading Archive</Link>
                <Link to="/daily-tarot-card" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Daily Tarot Card</Link>
                <Link to="/daily-rune" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Daily Rune</Link>
                <Link to="/daily-angel-message" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Daily Angel Message</Link>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-sm lg:text-base gold-text mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Learn
              </h3>
              <div className="space-y-2.5 lg:space-y-3">
                <Link to="/tarot-card-meanings" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Tarot Card Meanings</Link>
                <Link to="/rune-meanings" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Rune Meanings</Link>
                <Link to="/horary-astrology" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Horary Astrology Guide</Link>
                <Link to="/what-is-horary-astrology" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">What Is Horary Astrology</Link>
                <Link to="/how-horary-astrology-works" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">How Horary Works</Link>
                <Link to="/horary-astrology-beginners-guide" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Horary Beginner's Guide</Link>
                <Link to="/blog" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Blog & Articles</Link>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-sm lg:text-base gold-text mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Zodiac
              </h3>
              <div className="space-y-2.5 lg:space-y-3">
                {["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo"].map((z) => (
                  <Link key={z} to={`/zodiac/${z.toLowerCase()}-tarot-reading`} className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">{z} Tarot</Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            <Sparkles className="w-4 h-4 text-primary/50" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          </div>
          
          <div className="text-center">
            <p className="font-heading text-sm lg:text-base gold-text mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Mystic Divination
              <Sparkles className="w-4 h-4" />
            </p>
            <p className="text-xs lg:text-sm text-muted-foreground mb-4">For entertainment and spiritual guidance purposes. © {new Date().getFullYear()}</p>
            
            <div className="flex items-center justify-center gap-3 flex-wrap mb-3">
              <Link to="/about" className="text-xs lg:text-sm text-muted-foreground/70 hover:text-primary transition-colors">About</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/methodology" className="text-xs lg:text-sm text-muted-foreground/70 hover:text-primary transition-colors">Methodology</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/editorial-policy" className="text-xs lg:text-sm text-muted-foreground/70 hover:text-primary transition-colors">Editorial Policy</Link>
            </div>
            
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/privacy-policy" className="text-xs lg:text-sm text-muted-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/terms-of-service" className="text-xs lg:text-sm text-muted-foreground/70 hover:text-primary transition-colors">Terms of Service</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/disclaimer" className="text-xs lg:text-sm text-muted-foreground/70 hover:text-primary transition-colors">Disclaimer</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/sitemap-html" className="text-xs lg:text-sm text-muted-foreground/70 hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <FloatingParticles count={8} color="gold" />
      </div>
    </div>
  );
};

export default SiteLayout;
