import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import SnippetBox from "@/components/SnippetBox";
import ReadingCTA from "@/components/ReadingCTA";
import MiniCardDraw from "@/components/MiniCardDraw";
import { getDailyReading, slugToDate, dateToSlug, dateToLabel, type DailyReading } from "@/lib/dailyReading";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const DailyTarotReading = () => {
  const { dateSlug } = useParams<{ dateSlug: string }>();

  const reading: DailyReading | null = useMemo(() => {
    if (!dateSlug) {
      // /daily-tarot-reading → today
      return getDailyReading(new Date());
    }
    const date = slugToDate(dateSlug);
    if (!date) return null;
    return getDailyReading(date);
  }, [dateSlug]);

  if (!reading) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Date Not Found</h1>
        <Link to="/daily-tarot-reading" className="text-primary hover:underline">← Today's Reading</Link>
      </div>
    );
  }

  const { card, isReversed, dateLabel, date } = reading;
  const isToday = dateToSlug(new Date()) === dateToSlug(date);
  const title = isToday ? `Tarot Reading for Today – ${dateLabel}` : `Tarot Reading for ${dateLabel}`;
  const description = `Today's tarot card is ${card.name}${isReversed ? " (reversed)" : ""}. ${reading.guidance.split(".")[0]}.`;

  // Prev/next day navigation
  const prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  const showNext = nextDate <= new Date();

  const breadcrumbs = [
    { label: "Daily Tarot", href: "/daily-tarot-reading" },
    ...(!isToday ? [{ label: dateLabel }] : []),
  ];

  const faqItems = [
    { q: `What is today's tarot card for ${dateLabel}?`, a: `The tarot card for ${dateLabel} is ${card.name}${isReversed ? " (reversed)" : ""}. This card represents ${card.keywords.join(", ")} and suggests: ${reading.guidance.split(".")[0]}.` },
    { q: "How is the daily tarot card chosen?", a: "Each day's card is determined by a cosmic algorithm that assigns a specific card to each date. Every visitor sees the same card on the same day, creating a shared daily experience." },
    { q: "Should I draw my own card or use the daily card?", a: "Both approaches have value. The daily card offers a shared universal energy for the day, while a personal draw responds to your specific question and energy. Try both and see which resonates." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date.toISOString().split("T")[0],
    breadcrumb: generateBreadcrumbJsonLd(breadcrumbs),
    mainEntity: generateFAQJsonLd(faqItems).mainEntity,
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalPath={isToday ? "/daily-tarot-reading" : `/tarot-reading-for-${dateToSlug(date)}`}
        jsonLd={jsonLd}
      />
      <motion.div className="max-w-3xl mx-auto pt-6 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={breadcrumbs} />

        <header className="text-center mb-8">
          <p className="text-xs text-muted-foreground mb-2">{isToday ? "Today's Reading" : dateLabel}</p>
          <h1 className="font-heading text-2xl md:text-4xl gold-text mb-3 tracking-wider">{title}</h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {isToday ? "Discover what the cosmos has aligned for you today." : `The tarot card drawn for ${dateLabel}.`}
          </p>
        </header>

        {/* Card display */}
        <div className="reading-panel rounded-xl p-6 md:p-8 mb-8">
          <div className="text-center mb-6">
            <span
              className={`text-6xl block mb-3 ${isReversed ? "rotate-180 inline-block" : ""}`}
              role="img"
              aria-label={`${card.name} tarot card${isReversed ? " reversed" : ""}`}
            >
              {card.symbol}
            </span>
            <h2 className="font-heading text-xl md:text-2xl text-foreground mb-1">
              {card.name} {isReversed && <span className="text-sm text-muted-foreground">(Reversed)</span>}
            </h2>
            <p className="text-xs text-muted-foreground">
              {card.arcana} Arcana {card.suit ? `· ${card.suit}` : ""} {card.number !== undefined ? `· ${card.number}` : ""}
            </p>
            <div className="flex justify-center gap-2 mt-3 flex-wrap">
              {card.keywords.map((k) => (
                <span key={k} className="px-2 py-1 rounded-md bg-primary/10 text-[10px] font-heading text-primary border border-primary/20">{k}</span>
              ))}
            </div>
          </div>

          {/* Featured snippet */}
          <SnippetBox
            question={`What does ${card.name} mean for ${dateLabel}?`}
            answer={reading.guidance}
          />

          <section>
            <h3 className="font-heading text-base text-foreground mb-2">
              {isReversed ? "↻ Reversed" : "↑ Upright"} Guidance for the Day
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{reading.guidance}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isReversed ? card.meaning_rev : card.meaning_up}
            </p>
          </section>
        </div>

        {/* Interactive draw */}
        <MiniCardDraw prompt="Draw your own personal card for today alongside the daily card." />

        {/* CTA */}
        <ReadingCTA
          title="Go Deeper with a Full Reading"
          description={`See how ${card.name} interacts with other cards in a personalized spread.`}
        />

        {/* Day navigation */}
        <div className="flex justify-between items-center my-8">
          <Link
            to={`/tarot-reading-for-${dateToSlug(prevDate)}`}
            className="text-xs text-primary hover:underline"
          >
            ← {dateToLabel(prevDate)}
          </Link>
          {showNext ? (
            <Link
              to={isToday ? "/daily-tarot-reading" : `/tarot-reading-for-${dateToSlug(nextDate)}`}
              className="text-xs text-primary hover:underline"
            >
              {dateToLabel(nextDate)} →
            </Link>
          ) : (
            <span className="text-xs text-muted-foreground/50">Today</span>
          )}
        </div>

        <FAQSection items={faqItems} />

        <InternalLinks links={[
          { to: `/tarot-card-meanings/${slugify(card.name)}`, label: `${card.name} Full Meaning` },
          { to: `/tarot-card-meanings/${slugify(card.name)}/love`, label: `${card.name} in Love` },
          { to: "/free-tarot-reading", label: "Free Tarot Reading" },
          { to: "/tarot-reading-archive", label: "Past Daily Readings" },
          { to: "/daily-tarot-card", label: "Interactive Daily Draw" },
          { to: "/tarot-guide", label: "Tarot Guide" },
        ]} />
      </motion.div>
    </>
  );
};

export default DailyTarotReading;
