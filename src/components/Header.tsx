import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="text-center pt-8 pb-6 relative z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1 className="text-4xl md:text-6xl font-heading gold-text mb-3 tracking-wider">
        Aurora Eyes
      </h1>
      <p className="text-sm md:text-lg text-muted-foreground/70 font-body font-light tracking-wide max-w-xl mx-auto italic">
        Ancient wisdom for the modern seeker
      </p>
    </motion.header>
  );
};

export default Header;
