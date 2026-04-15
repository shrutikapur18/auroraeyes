import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Layers, Compass, User, Info, Home } from "lucide-react";
import CosmicBackground from "./CosmicBackground";
import InstallPrompt from "./InstallPrompt";

const navLinks = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/free-tarot-reading", label: "Free Reading", Icon: Layers, primary: true },
  { to: "/explore", label: "Explore Readings", Icon: Compass },
  { to: "/talk-to-a-reader", label: "Talk to a Reader", Icon: User },
  { to: "/about", label: "About", Icon: Info },
];

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CosmicBackground />

      {/* Navigation */}
      <nav className="relative z-30 border-b border-border/30 bg-background/80 backdrop-blur-lg sticky top-0">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-heading text-lg md:text-xl gold-text tracking-wider flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Sparkles className="w-5 h-5 text-primary icon-glow" />
              Aurora Eyes
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex gap-1 lg:gap-2 items-center">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-heading tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    link.primary
                      ? "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"
                      : location.pathname === link.to || location.pathname.startsWith(link.to + "/")
                        ? "bg-primary/15 text-primary border border-primary/25"
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
            <div>
              <h3 className="font-heading text-sm lg:text-base gold-text mb-4">Quick Links</h3>
              <div className="space-y-2.5">
                <Link to="/" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/free-tarot-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Free Reading</Link>
                <Link to="/explore" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Explore Readings</Link>
                <Link to="/talk-to-a-reader" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Talk to a Reader</Link>
                <Link to="/about" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
                <Link to="/privacy-policy" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-sm lg:text-base gold-text mb-4">Readings</h3>
              <div className="space-y-2.5">
                <Link to="/free-tarot-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Tarot Reading</Link>
                <Link to="/yes-no-tarot-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Yes/No Tarot</Link>
                <Link to="/rune-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Rune Reading</Link>
                <Link to="/angel-card-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Angel Cards</Link>
                <Link to="/horary-reading" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Horary Astrology</Link>
                <Link to="/daily-tarot-card" className="block text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">Daily Guidance</Link>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-heading text-sm lg:text-base gold-text mb-4">Connect</h3>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/auroraeyes111?igsh=NmF2azdoN2luNmJs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  AuroraEyes on Instagram
                </a>
                <p className="text-[11px] text-muted-foreground/50">Daily intuitive insights & guidance</p>
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
              Aurora Eyes
              <Sparkles className="w-4 h-4" />
            </p>
            <p className="text-xs lg:text-sm text-muted-foreground mb-4">For entertainment and spiritual guidance purposes. © {new Date().getFullYear()}</p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/privacy-policy" className="text-xs text-muted-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/terms-of-service" className="text-xs text-muted-foreground/70 hover:text-primary transition-colors">Terms of Service</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/disclaimer" className="text-xs text-muted-foreground/70 hover:text-primary transition-colors">Disclaimer</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/sitemap-html" className="text-xs text-muted-foreground/70 hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      {location.pathname === "/" && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-background/90 backdrop-blur-lg border-t border-border/30">
          <Link
            to="/free-tarot-reading"
            className="block w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-heading text-sm tracking-[0.15em]"
          >
            Start Free Reading
          </Link>
        </div>
      )}

      <InstallPrompt />
    </div>
  );
};

export default SiteLayout;
