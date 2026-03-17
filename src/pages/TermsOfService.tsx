import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const TermsOfService = () => (
  <div className="max-w-3xl mx-auto py-10">
    <SEOHead
      title="Terms of Service"
      description="Read the Terms of Service for Aurora Eyes, including acceptable use, intellectual property, and platform rules."
      canonicalPath="/terms-of-service"
    />
    <Breadcrumbs items={[{ label: "Terms of Service" }]} />

    <h1 className="font-heading text-3xl gold-text mb-6">Terms of Service</h1>
    <p className="text-muted-foreground text-sm mb-2">Last updated: March 9, 2026</p>

    <div className="space-y-6 text-foreground/85 text-sm leading-relaxed">
      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Acceptance of Terms</h2>
        <p>By accessing or using Aurora Eyes, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Use of the Platform</h2>
        <p>Aurora Eyes provides AI-powered divination tools including tarot readings, rune castings, angel card readings, and horary astrology. These tools are offered for personal reflection, spiritual exploration, and entertainment.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Acceptable Use</h2>
        <p>You agree to use the platform responsibly. The following activities are prohibited:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Using automated tools, bots, or scripts to access the service or generate readings in bulk.</li>
          <li>Attempting to reverse-engineer, copy, or redistribute the platform's proprietary content or algorithms.</li>
          <li>Using the platform for any unlawful, harmful, or abusive purpose.</li>
          <li>Misrepresenting readings obtained from this platform as your own professional services.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Intellectual Property</h2>
        <p>All content on this website—including text, interpretations, card descriptions, imagery, design elements, and code—is the intellectual property of Aurora Eyes and is protected by applicable copyright laws. You may not reproduce, distribute, or create derivative works from this content without express written permission.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Service Availability</h2>
        <p>We reserve the right to modify, suspend, or discontinue any part of the platform at any time without prior notice. We are not liable for any interruption or discontinuation of the service.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Limitation of Liability</h2>
        <p>Mystic Divination is provided "as is" without warranties of any kind. We are not liable for any decisions you make based on readings or content provided through this platform. See our <a href="/disclaimer" className="text-primary hover:underline">Disclaimer</a> for more details.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Changes to These Terms</h2>
        <p>We may update these Terms of Service at any time. Continued use of the platform after changes are posted constitutes acceptance of the revised terms.</p>
      </section>
    </div>
  </div>
);

export default TermsOfService;
