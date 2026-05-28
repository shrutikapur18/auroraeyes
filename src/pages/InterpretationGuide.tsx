import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import InternalLinks from "@/components/InternalLinks";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import SnippetBox from "@/components/SnippetBox";
import ReadingCTA from "@/components/ReadingCTA";
import { getInterpretationGuide } from "@/data/interpretationGuides";

const SITE_URL = "https://auroraeyes.com";

interface InterpretationGuideProps {
  /** Optional explicit slug; otherwise read from the route. */
  slug?: string;
}

const InterpretationGuide = ({ slug: slugProp }: InterpretationGuideProps) => {
  const location = useLocation();
  const slug = slugProp ?? location.pathname.replace(/^\//, "").split("/")[0];
  const guide = getInterpretationGuide(slug);

  if (!guide) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Guide Not Found</h1>
        <Link to="/tarot-spread-interpretation" className="text-primary hover:underline">
          ← Spread Interpretation Hub
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Tarot Guide", href: "/tarot-guide" },
    { label: "Spread Interpretation", href: "/tarot-spread-interpretation" },
    { label: guide.h1.split(":")[0].trim() },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    author: { "@type": "Organization", name: "Aurora Eyes" },
    publisher: {
      "@type": "Organization",
      name: "Aurora Eyes",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png` },
    },
    mainEntityOfPage: `${SITE_URL}/${guide.slug}`,
  };

  const jsonLd = [
    articleJsonLd,
    { "@context": "https://schema.org", ...generateBreadcrumbJsonLd(breadcrumbs) },
    { "@context": "https://schema.org", ...generateFAQJsonLd(guide.faq) },
  ];

  return (
    <>
      <SEOHead
        title={guide.title}
        description={guide.description}
        canonicalPath={`/${guide.slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />
      <motion.article
        className="max-w-3xl mx-auto pt-6 px-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="font-heading text-2xl md:text-4xl gold-text mb-4 tracking-wide leading-tight">
          {guide.h1}
        </h1>

        <SnippetBox question={guide.snippet.question} answer={guide.snippet.answer} />

        <div className="space-y-4 mb-8">
          {guide.intro.map((p, i) => (
            <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {guide.sections.map((section, i) => (
          <section key={i} className="mb-8">
            <h2 className="font-heading text-lg md:text-xl text-foreground mb-3">{section.heading}</h2>
            <div className="space-y-3">
              {section.body.map((p, j) => (
                <p key={j} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            {section.list && (
              <ul className="mt-4 space-y-2">
                {section.list.map((item, k) => (
                  <li key={k} className="flex gap-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                    <span className="text-primary shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {guide.examples?.map((ex, i) => (
          <section key={i} className="reading-panel rounded-xl p-5 md:p-6 mb-8 border-l-4 border-primary/40">
            <h2 className="font-heading text-base md:text-lg text-foreground mb-3">{ex.title}</h2>
            <div className="space-y-3">
              {ex.body.map((p, j) => (
                <p key={j} className="text-sm text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        <ReadingCTA
          title={guide.cta?.title ?? "Interpret Your Own Spread"}
          description={
            guide.cta?.description ??
            "Enter your cards, positions, and question to get an instant synthesis of the whole spread."
          }
          to={guide.cta?.to ?? "/what-does-my-spread-mean"}
          label={guide.cta?.label ?? "Open the Spread Interpreter"}
        />

        <FAQSection items={guide.faq} />

        <InternalLinks links={guide.related} />
      </motion.article>
    </>
  );
};

export default InterpretationGuide;
