import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const Disclaimer = () => (
  <div className="max-w-3xl mx-auto py-10">
    <SEOHead
      title="Disclaimer"
      description="Important disclaimer about the use of tarot readings, horary astrology, rune castings, and angel card readings on Aurora Eyes."
      canonicalPath="/disclaimer"
    />
    <Breadcrumbs items={[{ label: "Disclaimer" }]} />

    <h1 className="font-heading text-3xl gold-text mb-6">Disclaimer</h1>
    <p className="text-muted-foreground text-sm mb-2">Last updated: March 9, 2026</p>

    <div className="space-y-6 text-foreground/85 text-sm leading-relaxed">
      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Entertainment & Personal Reflection</h2>
        <p>All divination services offered on Aurora Eyes—including tarot readings, horary astrology interpretations, rune castings, and angel card readings—are intended for <strong>personal reflection, spiritual exploration, and entertainment purposes only</strong>.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Not Professional Advice</h2>
        <p>Readings and interpretations provided on this platform should <strong>not</strong> be used as a substitute for professional advice. Specifically, our services do not replace:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li><strong>Medical advice</strong> — Always consult a qualified healthcare professional for health-related concerns.</li>
          <li><strong>Legal counsel</strong> — Seek guidance from a licensed attorney for any legal matters.</li>
          <li><strong>Financial or investment advice</strong> — Consult a qualified financial advisor before making financial decisions.</li>
          <li><strong>Mental health support</strong> — If you are experiencing a mental health crisis, please contact a licensed therapist or your local crisis helpline.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">AI-Generated Content</h2>
        <p>Readings on this platform are generated using artificial intelligence. While we strive to provide meaningful and thoughtful interpretations, the content is algorithmically produced and should be understood in that context.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">No Guarantees</h2>
        <p>We make no claims regarding the accuracy, reliability, or predictive power of any reading or interpretation. Divination is a centuries-old practice rooted in symbolism and personal meaning—it is not a science, and outcomes are not guaranteed.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Your Responsibility</h2>
        <p>By using this platform, you acknowledge that you are solely responsible for any actions or decisions you make based on the readings you receive. Aurora Eyes and its creators accept no liability for outcomes resulting from the use of this service.</p>
      </section>
    </div>
  </div>
);

export default Disclaimer;
