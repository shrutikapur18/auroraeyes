import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { tarotDeck } from "@/data/tarotDeck";
import { elderFuthark } from "@/data/runes";
import { questionPages, spreadGuides, generateCombinationPages, generateComparisonPages } from "@/data/seoData";

const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="font-heading text-lg gold-text mb-3">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">{children}</div>
  </section>
);

const SL = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="block text-sm text-muted-foreground hover:text-primary transition-colors py-0.5">{label}</Link>
);

const HTMLSitemap = () => {
  const combos = generateCombinationPages();
  const comparisons = generateComparisonPages();

  return (
    <>
      <SEOHead
        title="Sitemap — All Pages"
        description="Browse all pages on Mystic Divination. Find tarot readings, card meanings, rune guides, angel card readings, and more."
        canonicalPath="/sitemap-html"
      />

      <div className="max-w-5xl mx-auto py-10 px-2">
        <h1 className="font-heading text-2xl md:text-4xl gold-text text-center mb-8">Site Map</h1>

        <Section title="Readings">
          <SL to="/" label="Home" />
          <SL to="/free-tarot-reading" label="Free Tarot Reading" />
          <SL to="/yes-no-tarot-reading" label="Yes/No Tarot Reading" />
          <SL to="/pick-a-card-reading" label="Pick a Card Reading" />
          <SL to="/rune-reading" label="Rune Reading" />
          <SL to="/angel-card-reading" label="Angel Card Reading" />
          <SL to="/daily-tarot-reading" label="Today's Tarot Reading" />
          <SL to="/tarot-reading-archive" label="Reading Archive" />
        </Section>

        <Section title="Daily Guidance">
          <SL to="/daily-tarot-card" label="Daily Tarot Card" />
          <SL to="/daily-rune" label="Daily Rune" />
          <SL to="/daily-angel-message" label="Daily Angel Message" />
        </Section>

        <Section title="Topic Readings">
          {questionPages.map(q => (
            <SL key={q.slug} to={`/${q.slug}`} label={q.title} />
          ))}
        </Section>

        <Section title="Guides">
          <SL to="/tarot-guide" label="Complete Tarot Guide" />
          <SL to="/rune-guide" label="Rune Guide" />
          <SL to="/angel-cards-guide" label="Angel Cards Guide" />
          <SL to="/tarot-spreads" label="Tarot Spreads" />
          {spreadGuides.map(s => (
            <SL key={s.slug} to={`/tarot-spreads/${s.slug}`} label={s.title} />
          ))}
        </Section>

        <Section title="Tarot Card Meanings">
          <SL to="/tarot-card-meanings" label="All Tarot Card Meanings" />
          {tarotDeck.map(c => (
            <SL key={c.id} to={`/tarot-card-meanings/${slugify(c.name)}`} label={c.name} />
          ))}
        </Section>

        <Section title="Rune Meanings">
          <SL to="/rune-meanings" label="All Rune Meanings" />
          {elderFuthark.map(r => (
            <SL key={r.name} to={`/rune-meanings/${r.name.toLowerCase()}`} label={`${r.symbol} ${r.name}`} />
          ))}
        </Section>

        <Section title="Tarot Combinations">
          <SL to="/tarot-combinations" label="All Combinations" />
          {combos.map(c => (
            <SL key={c.slug} to={`/tarot-combinations/${c.slug}`} label={`${c.card1Name} & ${c.card2Name}`} />
          ))}
        </Section>

        <Section title="Tarot Comparisons">
          <SL to="/tarot-comparisons" label="All Comparisons" />
          {comparisons.map(c => (
            <SL key={c.slug} to={`/tarot-comparisons/${c.slug}`} label={`${c.card1Name} vs ${c.card2Name}`} />
          ))}
        </Section>

        <Section title="Zodiac Tarot">
          {signs.map(s => (
            <SL key={s} to={`/zodiac/${s.toLowerCase()}-tarot-reading`} label={`${s} Tarot Reading`} />
          ))}
        </Section>

        <Section title="Blog">
          <SL to="/blog" label="All Articles" />
          <SL to="/blog/how-tarot-readings-work" label="How Tarot Readings Work" />
          <SL to="/blog/major-arcana-guide" label="Major Arcana Guide" />
          <SL to="/blog/how-rune-casting-works" label="How Rune Casting Works" />
          <SL to="/blog/angel-card-guidance-beginners" label="Angel Card Guidance for Beginners" />
          <SL to="/blog/tarot-spreads-explained" label="Tarot Spreads Explained" />
          <SL to="/blog/reversed-tarot-cards" label="Reversed Tarot Cards" />
          <SL to="/blog/zodiac-and-tarot-connection" label="Zodiac & Tarot Connection" />
          <SL to="/blog/daily-divination-practice" label="Daily Divination Practice" />
        </Section>
      </div>
    </>
  );
};

export default HTMLSitemap;
