import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto py-10">
    <SEOHead
      title="Privacy Policy"
      description="Learn how Aurora Eyes collects, uses, and protects your information when you use our tarot, rune, angel card, and horary astrology services."
      canonicalPath="/privacy-policy"
    />
    <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

    <h1 className="font-heading text-3xl gold-text mb-6">Privacy Policy</h1>
    <p className="text-muted-foreground text-sm mb-2">Last updated: March 9, 2026</p>

    <div className="prose-legal space-y-6 text-foreground/85 text-sm leading-relaxed">
      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Information We Collect</h2>
        <p>When you use Aurora Eyes, we may collect the following types of information:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Questions and prompts you submit during tarot, rune, angel card, or horary astrology readings.</li>
          <li>Optional location data you provide for horary astrology calculations (latitude, longitude, or city name).</li>
          <li>Analytics information such as pages visited, session duration, and device type, used to improve the website experience.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">How We Use Your Information</h2>
        <p>Your information is used solely to:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Generate personalized divination readings based on your questions.</li>
          <li>Calculate accurate astrological charts when location data is provided.</li>
          <li>Analyze usage patterns to improve site performance and content quality.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Data Sharing</h2>
        <p>We do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes. Data may be shared only with service providers who help us operate the platform (e.g., hosting and analytics), and only to the extent necessary to deliver the service.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Cookies</h2>
        <p>We may use basic cookies and similar technologies for:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Essential site functionality (e.g., remembering your session or preferences).</li>
          <li>Analytics to understand how the website is used so we can improve it.</li>
        </ul>
        <p>You can control cookie settings through your browser preferences.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Data Retention</h2>
        <p>Reading data submitted through the platform is processed in real time and is not permanently stored unless you explicitly save a reading. Analytics data is retained in aggregate, anonymized form.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Your Rights</h2>
        <p>You may request access to, correction of, or deletion of any personal data we hold about you by contacting us. We will respond to such requests within a reasonable time frame.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy;
