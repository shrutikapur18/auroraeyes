import { motion } from "framer-motion";
import { Sparkles, Eye, Compass, Heart } from "lucide-react";

const DivinationPhilosophy = () => {
  const principles = [
    {
      icon: Sparkles,
      title: "Ancient Wisdom",
      description: "Our readings draw from centuries-old symbolic systems — the 78 cards of the Rider-Waite tarot, the Elder Futhark runes, and classical horary astrology."
    },
    {
      icon: Eye,
      title: "Symbolic Reflection",
      description: "Each card, rune, or planetary alignment serves as a mirror for your subconscious, revealing patterns and possibilities you may not consciously perceive."
    },
    {
      icon: Compass,
      title: "Guidance, Not Prediction",
      description: "We offer insight and perspective, not fortune-telling. The future is not fixed — these tools illuminate paths, empowering you to make informed choices."
    },
    {
      icon: Heart,
      title: "Personal Journey",
      description: "Your questions shape the reading. The cards respond to your energy and intention, creating a unique dialogue between you and the universal symbols."
    }
  ];

  return (
    <motion.section
      className="max-w-4xl mx-auto mt-16 md:mt-20 mb-12 px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <Sparkles className="w-5 h-5 text-primary" />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>
        <h2 className="font-heading text-2xl md:text-3xl gold-text mb-3 tracking-wide">
          How Our Divination Works
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We blend traditional symbolic systems with thoughtful interpretation to offer meaningful guidance for your life's questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {principles.map((principle, index) => (
          <motion.div
            key={principle.title}
            className="reading-panel rounded-xl p-5 md:p-6 hover:gold-glow transition-all duration-500 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <principle.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-base md:text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust indicators */}
      <motion.div
        className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
        {[
          { value: "78", label: "Tarot Cards" },
          { value: "24", label: "Elder Futhark Runes" },
          { value: "30", label: "Angel Cards" },
          { value: "∞", label: "Horary Charts" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-2xl md:text-3xl gold-text">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default DivinationPhilosophy;
