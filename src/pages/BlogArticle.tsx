import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs, { generateBreadcrumbJsonLd } from "@/components/Breadcrumbs";
import FAQSection, { generateFAQJsonLd } from "@/components/FAQSection";
import ReadingCTA from "@/components/ReadingCTA";
import { blogArticles } from "@/data/blogArticles";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? blogArticles[slug] : undefined;

  if (!article) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-2xl text-foreground mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or may have moved.</p>
        <div className="flex flex-col items-center gap-3">
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Link to="/tarot-guide" className="text-xs text-muted-foreground hover:text-primary transition-colors">Tarot Guide</Link>
            <Link to="/rune-guide" className="text-xs text-muted-foreground hover:text-primary transition-colors">Rune Guide</Link>
            <Link to="/horary-astrology" className="text-xs text-muted-foreground hover:text-primary transition-colors">Horary Astrology</Link>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: article.title.length > 40 ? article.title.slice(0, 37) + "…" : article.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    ...(article.faq.length > 0 ? { mainEntity: generateFAQJsonLd(article.faq).mainEntity } : {}),
  };

  return (
    <>
      <SEOHead title={article.title} description={article.description} canonicalPath={`/blog/${slug}`} jsonLd={jsonLd} />
      <motion.div className="max-w-3xl mx-auto pt-8 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs items={breadcrumbs} />

        <article className="reading-panel rounded-xl p-6 md:p-8">
          <h1 className="font-heading text-2xl md:text-3xl gold-text mb-6">{article.title}</h1>
          {article.content.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground font-body leading-relaxed mb-4">{p}</p>
          ))}
        </article>

        <ReadingCTA />

        {article.faq.length > 0 && <FAQSection items={article.faq} />}

        <div className="mt-8 reading-panel rounded-xl p-5">
          <h3 className="font-heading text-sm gold-text mb-3">Related</h3>
          <div className="flex flex-wrap gap-2">
            {article.relatedLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-xs text-primary hover:underline">{l.label} →</Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogArticle;
