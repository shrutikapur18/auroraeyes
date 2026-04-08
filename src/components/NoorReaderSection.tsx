import { motion } from "framer-motion";
import noorImage from "@/assets/noor-reader.jpg";

const NoorReaderSection = () => (
  <section className="max-w-5xl mx-auto my-16 md:my-24 px-4">
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Image */}
      <div className="flex justify-center md:justify-end">
        <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.25)]">
          <img
            src={noorImage}
            alt="Noor — Intuitive Tarot Reader"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        <span className="text-[11px] tracking-[0.25em] uppercase text-primary/70 font-heading">
          Real reader &middot; Private sessions
        </span>

        <h2 className="font-heading text-2xl md:text-3xl text-foreground leading-tight">
          Some answers need more than a card
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
          A real, one-on-one conversation with someone who listens — and sees what the cards are actually saying about your situation.
        </p>

        {/* Noor intro */}
        <div className="border-l-2 border-primary/20 pl-4 space-y-1.5">
          <p className="text-sm text-foreground/90 leading-relaxed">
            Noor is an intuitive tarot reader who focuses on clarity over mystery. She reads patterns, not predictions — helping you understand what's really happening and what your next step should be.
          </p>
          <p className="text-xs text-muted-foreground/70 italic">
            Calm, direct, and always honest.
          </p>
        </div>

        {/* Value points */}
        <ul className="space-y-2.5 pt-1">
          {[
            "Clear, direct answers you can actually use",
            "Personal guidance tailored to your situation",
            "A private space to ask anything openly",
          ].map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <span className="w-1 h-1 rounded-full bg-primary/60 mt-2 shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        {/* Session hint */}
        <p className="text-xs text-muted-foreground/60 leading-relaxed">
          Choose a short session for quick clarity or go deeper with a longer conversation.
        </p>

        {/* CTA */}
        <div className="pt-2 space-y-2">
          <motion.a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading text-sm tracking-[0.15em] hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Session with Noor
          </motion.a>
          <p className="text-[10px] text-muted-foreground/50 tracking-wide">
            Limited slots available
          </p>
        </div>

        {/* Trust line */}
        <p className="text-[10px] text-muted-foreground/40 tracking-wider uppercase pt-1">
          Private, one-on-one sessions. No automation.
        </p>
      </div>
    </motion.div>
  </section>
);

export default NoorReaderSection;
