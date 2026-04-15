import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import noorImage from "@/assets/noor-reader.jpg";

const readers = [
  {
    name: "Noor",
    title: "Intuitive Tarot Reader",
    description: "Deep, honest, situation-specific guidance. Noor reads patterns, not predictions — helping you understand what's really happening and what your next step should be.",
    traits: ["Calm & direct", "Emotionally intuitive", "Honest always"],
    image: noorImage,
    cta: "https://wa.me/919876543210",
    available: true,
  },
];

const TalkToReader = () => (
  <>
    <SEOHead
      title="Talk to a Reader — Personal Intuitive Guidance"
      description="Connect with a real intuitive reader for deep, personal clarity on love, career, and life decisions. Private one-on-one sessions."
      canonicalPath="/talk-to-a-reader"
    />

    <motion.header
      className="text-center pt-10 md:pt-14 pb-8 px-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl md:text-5xl font-heading gold-text mb-3 tracking-wider">
        Talk to a Reader
      </h1>
      <p className="text-sm md:text-base text-muted-foreground font-body max-w-xl mx-auto">
        Sometimes you need more than a card — you need a real conversation with someone who listens and sees clearly.
      </p>
    </motion.header>

    <section className="max-w-3xl mx-auto px-2 pb-16">
      {readers.map((reader) => (
        <motion.div
          key={reader.name}
          className="reading-panel rounded-2xl p-6 md:p-8 border border-primary/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            <div className="w-40 h-52 md:w-48 md:h-60 rounded-xl overflow-hidden shrink-0 shadow-lg">
              <img
                src={reader.image}
                alt={`${reader.name} — ${reader.title}`}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="font-heading text-xl md:text-2xl text-foreground">{reader.name}</h2>
                <p className="text-sm text-primary/70 font-heading tracking-wider">{reader.title}</p>
                {reader.available && (
                  <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] tracking-widest uppercase text-emerald-400/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                    Available
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{reader.description}</p>

              <ul className="flex flex-wrap justify-center md:justify-start gap-2">
                {reader.traits.map((t) => (
                  <li key={t} className="text-[11px] px-3 py-1 rounded-full border border-primary/15 text-primary/60 font-heading tracking-wider">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <motion.a
                  href={reader.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading text-sm tracking-[0.15em] hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book Session
                </motion.a>
                <p className="text-[10px] text-muted-foreground/50 mt-2 tracking-wide">
                  Private, one-on-one sessions via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="text-center mt-12 space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-xs text-muted-foreground/50 italic">
          More readers coming soon. Each one personally vetted.
        </p>
      </motion.div>
    </section>
  </>
);

export default TalkToReader;
