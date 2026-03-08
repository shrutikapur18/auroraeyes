import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import HoraryQuestionForm from "@/components/HoraryQuestionForm";
import HoraryChartWheel from "@/components/HoraryChartWheel";
import HoraryInterpretation from "@/components/HoraryInterpretation";
import HoraryPostReadingCTA from "@/components/HoraryPostReadingCTA";
import { supabase } from "@/integrations/supabase/client";
import type { HoraryReading } from "@/lib/horaryAstrology";
import { toast } from "@/hooks/use-toast";

const HoraryHomepageSection = () => {
  const [reading, setReading] = useState<HoraryReading | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const readingRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (data: {
    question: string;
    location: string;
    latitude: number;
    longitude: number;
    dateTime: Date;
    timezone: number;
  }) => {
    setIsLoading(true);
    setReading(null);

    try {
      const { data: result, error } = await supabase.functions.invoke("horary-reading", {
        body: {
          question: data.question,
          location: data.location,
          latitude: data.latitude,
          longitude: data.longitude,
          year: data.dateTime.getFullYear(),
          month: data.dateTime.getMonth() + 1,
          date: data.dateTime.getDate(),
          hours: data.dateTime.getHours(),
          minutes: data.dateTime.getMinutes(),
          seconds: data.dateTime.getSeconds(),
          timezone: data.timezone,
        },
      });

      if (error) throw error;

      setReading({
        chartData: result.chartData,
        interpretation: result.interpretation,
        question: data.question,
        timestamp: data.dateTime.toISOString(),
      });

      // Scroll to reading after a short delay
      setTimeout(() => {
        readingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } catch (err: any) {
      console.error("Horary reading error:", err);
      toast({
        title: "Chart Casting Failed",
        description: err.message || "Could not generate the horary chart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => setReading(null);

  return (
    <section id="horary-section" className="max-w-4xl mx-auto mt-14 md:mt-20 mb-10 px-2">
      {/* Section header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Star className="w-4 h-4 text-primary/60" />
          <span className="text-[10px] font-heading text-primary/60 tracking-[0.3em] uppercase">
            Celestial Guidance
          </span>
          <Star className="w-4 h-4 text-primary/60" />
        </div>

        <h2 className="font-heading text-2xl md:text-3xl gold-text tracking-wider mb-3">
          ✦ Ask a Horary Question ✦
        </h2>

        <p className="text-sm text-muted-foreground font-body max-w-lg mx-auto leading-relaxed">
          Horary astrology answers a specific question based on the exact moment the question is asked.
          The positions of the planets at that instant hold the key to your answer.
        </p>
      </motion.div>

      {/* Guidance message */}
      <motion.div
        className="max-w-xl mx-auto mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-3 bg-primary/5 border border-primary/15 rounded-xl p-4">
          <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-foreground/70 font-body leading-relaxed italic">
            Focus carefully on your question. Horary astrology works best when the question is sincere
            and clearly defined. Think of a specific yes/no or outcome-based question before you begin.
          </p>
        </div>
      </motion.div>

      {/* Question form */}
      <AnimatePresence mode="wait">
        {!reading ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <HoraryQuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
          </motion.div>
        ) : (
          <motion.div
            key="reading"
            ref={readingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            {/* Chart wheel with reveal animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HoraryChartWheel chartData={reading.chartData} />
            </motion.div>

            {/* Interpretation */}
            <HoraryInterpretation
              question={reading.question}
              chartData={reading.chartData}
              interpretation={reading.interpretation}
              timestamp={reading.timestamp}
            />

            {/* Post-reading CTAs */}
            <HoraryPostReadingCTA
              reading={reading}
              onAskAnother={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HoraryHomepageSection;
