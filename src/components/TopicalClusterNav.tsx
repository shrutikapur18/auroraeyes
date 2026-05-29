import { Link } from "react-router-dom";

interface Cluster {
  heading: string;
  links: { to: string; label: string }[];
}

const clusters: Cluster[] = [
  {
    heading: "Tarot Meanings",
    links: [
      { to: "/tarot-card-meanings", label: "All 78 Cards" },
      { to: "/tarot-combinations", label: "Card Combinations" },
    ],
  },
  {
    heading: "Tarot Spreads",
    links: [
      { to: "/tarot-spreads", label: "Spread Guides" },
      { to: "/tarot-spread-interpretation", label: "Spread Interpretation" },
      { to: "/what-does-my-spread-mean", label: "Spread Interpreter" },
      { to: "/celtic-cross-tarot-spread", label: "Celtic Cross" },
    ],
  },
  {
    heading: "Readings",
    links: [
      { to: "/free-tarot-reading", label: "Free Tarot" },
      { to: "/yes-no-tarot-reading", label: "Yes/No" },
      { to: "/love-tarot-reading", label: "Love" },
      { to: "/career-tarot-reading", label: "Career" },
    ],
  },
  {
    heading: "Guides",
    links: [
      { to: "/tarot-guide", label: "Tarot Guide" },
      { to: "/rune-guide", label: "Rune Guide" },
      { to: "/angel-cards-guide", label: "Angel Cards" },
      { to: "/horary-astrology", label: "Horary Astrology" },
      { to: "/blog", label: "Blog" },
    ],
  },
];

/**
 * Sitewide topical-cluster navigation for internal linking and SEO siloing.
 */
const TopicalClusterNav = () => (
  <nav className="max-w-4xl mx-auto mt-12 mb-8 px-4" aria-label="Topic clusters">
    <h2 className="font-heading text-base gold-text text-center mb-4">Explore by Topic</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {clusters.map((c) => (
        <div key={c.heading}>
          <h3 className="font-heading text-xs text-foreground mb-2">{c.heading}</h3>
          <ul className="space-y-1">
            {c.links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </nav>
);

export default TopicalClusterNav;
