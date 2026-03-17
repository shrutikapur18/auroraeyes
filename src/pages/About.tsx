import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const About = () => (
  <div className="max-w-3xl mx-auto py-10">
    <SEOHead
      title="About Aurora Eyes"
      description="Learn about Aurora Eyes — a platform offering spiritual guidance through tarot, rune casting, angel cards, and horary astrology."
      canonicalPath="/about"
    />
    <Breadcrumbs items={[{ label: "About" }]} />

    <h1 className="font-heading text-3xl gold-text mb-6">About Aurora Eyes</h1>

    <div className="space-y-6 text-foreground/85 text-sm leading-relaxed">
      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Our Purpose</h2>
        <p>Mystic Divination is a platform dedicated to making the wisdom of traditional divination systems accessible to everyone. We offer spiritual guidance through tarot, rune casting, angel card readings, and horary astrology — ancient practices that have helped people reflect on life's questions for centuries.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">What We Do</h2>
        <p>Our tools invite you to pause, focus on a question that matters to you, and explore its dimensions through symbolic interpretation. Whether you're drawn to the archetypal imagery of the tarot, the primal symbols of the runes, the gentle messages of angel cards, or the celestial precision of horary astrology, each system offers a unique lens for self-reflection.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Our Approach</h2>
        <p>We believe that divination is most valuable when it encourages thoughtful introspection rather than passive consumption. That's why we've designed each reading experience to feel immersive and intentional — from the moment you formulate your question to the final interpretation.</p>
        <p className="mt-2">Every reading is generated using AI trained on traditional symbolic meanings, ensuring interpretations remain rooted in authentic divinatory traditions while being accessible to modern seekers.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">For Everyone</h2>
        <p>Whether you're a seasoned practitioner or simply curious about what the cards might reveal, Mystic Divination welcomes you. Our educational guides, card meaning references, and interactive tools are designed to support your journey — wherever it leads.</p>
      </section>
    </div>
  </div>
);

export default About;
