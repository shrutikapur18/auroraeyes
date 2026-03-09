import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const Methodology = () => (
  <div className="max-w-3xl mx-auto py-10">
    <SEOHead
      title="Our Methodology"
      description="Understand how Mystic Divination generates tarot readings, rune castings, horary astrology charts, and angel card interpretations."
      canonicalPath="/methodology"
    />
    <Breadcrumbs items={[{ label: "Our Methodology" }]} />

    <h1 className="font-heading text-3xl gold-text mb-6">Our Methodology</h1>

    <div className="space-y-6 text-foreground/85 text-sm leading-relaxed">
      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">How Our Readings Work</h2>
        <p>Each divination system on Mystic Divination follows its own traditional framework. Our tools combine authentic symbolic knowledge with AI-powered interpretation to deliver meaningful, personalized readings.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Tarot Readings</h2>
        <p>Our tarot readings interpret the symbolic meanings of the 78 cards in the Rider-Waite tradition. Cards are drawn and placed into meaningful spreads — such as the three-card spread or Celtic Cross — and interpreted based on their position, orientation, and relationships with neighboring cards. Each interpretation considers the card's traditional symbolism, elemental associations, and numerological significance.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Rune Readings</h2>
        <p>Rune readings draw from the Elder Futhark, a system of 24 symbols used by Norse and Germanic peoples for divination and communication. Each rune carries layers of meaning rooted in mythology, nature, and human experience. Our interpretations honor these traditional associations while making them accessible to contemporary seekers.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Horary Astrology</h2>
        <p>Horary astrology is a branch of traditional astrology that generates a chart for the exact moment a question is asked. By analyzing planetary positions, house placements, and aspects at that specific time and location, the chart reveals symbolic answers to the querent's question. Our tool calculates these charts in real time and interprets the key significators relevant to your inquiry.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Angel Card Readings</h2>
        <p>Angel card readings offer gentle, uplifting guidance through messages associated with angelic and spiritual themes. Each card carries an affirmation or insight intended to provide comfort, clarity, and encouragement. Our interpretations focus on positive reflection and spiritual support.</p>
      </section>

      <section>
        <h2 className="font-heading text-lg text-foreground mb-2">Reflective Insight, Not Prediction</h2>
        <p>All of our readings are designed to provide <strong>reflective insight</strong> rather than deterministic predictions. Divination is a tool for contemplation — it illuminates possibilities, highlights patterns, and invites you to consider perspectives you might not have explored on your own. The meaning you find in a reading is ultimately shaped by your own intuition and circumstances.</p>
      </section>
    </div>
  </div>
);

export default Methodology;
