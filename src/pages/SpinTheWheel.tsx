import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import SpinWheel from "@/components/SpinWheel";

const SpinTheWheel = () => {
  return (
    <>
      <SEOHead
        title="Spin the Wheel — Aurora Eyes"
        description="Let destiny choose your reward. Spin the mystical wheel and discover what the universe has in store for you."
        canonicalPath="/spin-the-wheel"
      />

      <motion.div
        className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h1 className="font-heading text-2xl md:text-4xl gold-text tracking-wider mb-3">
            The Wheel of Fate
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground/60 italic font-body max-w-md mx-auto">
            Every turn is written in the stars — let destiny reveal your reward
          </p>

          <motion.div
            className="mt-5 flex justify-center items-center gap-3"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
          </motion.div>
        </motion.div>

        <SpinWheel />
      </motion.div>
    </>
  );
};

export default SpinTheWheel;
