import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="text-center pt-8 pb-6 relative z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl md:text-6xl font-heading gold-text mb-3 tracking-wider">
        AI Tarot Reading
      </h1>
      <p className="text-base md:text-lg text-muted-foreground font-body font-light tracking-wide max-w-xl mx-auto">
        Focus on your question and choose the cards you feel drawn to.
      </p>
    </motion.header>
  );
};

export default Header;
