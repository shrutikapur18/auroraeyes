import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const EditorialPolicy = () => (
  <div className="max-w-3xl mx-auto py-10">
    <SEOHead
      title="Editorial Policy"
      description="Learn how educational content, guides, and interpretations are created and maintained on Mystic Divination."
      canonicalPath="/editorial-policy"
    />
    <Breadcrumbs items={[{ label: "Editorial Policy" }]} />

    <h1 className="font-heading text-3xl gold-text mb-6">Editorial Policy</h1>

    <div className="space-y-6 text-foreground/85 text-sm leading-relaxed">
      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Our Commitment to Quality</h2>
        <p>Mystic Divination is committed to providing accurate, thoughtful, and well-researched content about divination systems. Our educational articles, card meaning references, and guides are created with care and a deep respect for the traditions they represent.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">How Content Is Created</h2>
        <p>Our articles and guides aim to explain divination systems — including tarot, runes, angel cards, and horary astrology — in a clear, accessible manner. Content is developed by drawing on established sources, traditional symbolism, and widely recognized interpretive frameworks.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Traditional Foundations</h2>
        <p>Card meanings, rune interpretations, and astrological analyses are grounded in traditional symbolic systems. We reference the Rider-Waite-Smith tradition for tarot, the Elder Futhark for runes, and classical astrological principles for horary readings. Where multiple interpretive traditions exist, we aim to present the most widely accepted perspective while acknowledging alternative viewpoints.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Review & Improvement</h2>
        <p>Content is periodically reviewed and updated to ensure accuracy, clarity, and relevance. We refine interpretations, correct errors, and expand guides as our understanding deepens and user feedback is received.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Balanced Perspective</h2>
        <p>We present divination as a reflective and symbolic practice. Our content does not make claims of supernatural prediction or medical, legal, or financial advice. We encourage readers to approach divination with an open mind and personal discernment.</p>
      </section>
    </div>
  </div>
);

export default EditorialPolicy;
