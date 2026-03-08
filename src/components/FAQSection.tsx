import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQSectionProps {
  items: { q: string; a: string }[];
}

export function generateFAQJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

const FAQSection = ({ items }: FAQSectionProps) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mt-8">
      <h2 className="font-heading text-lg text-foreground mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {items.map((faq, i) => (
          <div key={i} className="reading-panel rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left p-4 flex justify-between items-center gap-2"
            >
              <span className="text-sm font-heading text-foreground">{faq.q}</span>
              <span className="text-muted-foreground text-lg shrink-0">{open === i ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
